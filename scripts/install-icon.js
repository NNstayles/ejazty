/**
 * Build every app-icon asset from one source image.
 *
 *   node scripts/install-icon.js <path-to-source-image>
 *
 * Uses `jimp-compact`, already on disk as a dependency of `@expo/image-utils`
 * (itself pulled in by `expo`). Resolved through that package rather than added
 * to `package.json`: this runs a handful of times in a project's life, and a
 * native image toolchain is not worth carrying in the dependency tree for it.
 *
 * ## The three things this fixes, none of which are cosmetic
 *
 * **1. Alpha.** `icon.png` is the marketing icon, and Apple rejects a
 * submission whose 1024px icon carries an alpha channel — App Store Connect
 * returns ITMS-90717, "can't be transparent nor contain an alpha channel". A
 * rounded-corner source is the usual cause: the corners are transparent, so the
 * file looks correct everywhere except the one place that matters. The alpha
 * channel is dropped from the encode here, not merely filled to 255.
 *
 * **2. Pre-applied rounding.** Both platforms mask the icon to their own shape —
 * a superellipse on iOS, a device-chosen mask on Android. Artwork that already
 * has rounded corners inside a letterboxed border gets rounded a *second* time,
 * which cuts into the art and leaves slivers of the border colour around the
 * curve. The fix is to hand the OS full-bleed artwork: the border is detected
 * and cropped, and whatever sits outside the art's own curve is filled with the
 * art's own background colour so the second mask has nothing to expose.
 *
 * **3. The Android foreground is the exact opposite of the marketing icon.** It
 * must *keep* its transparency — the launcher masks it and paints
 * `adaptiveIcon.backgroundColor` behind it, so an opaque foreground shows as a
 * square inside the mask. It is also inset, because the outer third of that
 * canvas is reserved for the mask and for parallax.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const jimpPath = require.resolve('jimp-compact', {
  paths: [path.dirname(require.resolve('@expo/image-utils/package.json'))],
});
const Jimp = require(jimpPath);

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'images');

/** Any channel above this counts as artwork rather than letterbox border. */
const BORDER_LEVEL = 14;
/** A border thinner than this fraction of the canvas is not worth cropping. */
const BORDER_MIN = 0.01;
/**
 * Share of the adaptive-icon canvas the artwork may occupy. Android's guidance
 * is a 66dp safe zone inside the 108dp canvas.
 */
const ADAPTIVE_SAFE = 66 / 108;
/**
 * Corner radius as a share of the side, for the splash mark only. Matches the
 * ratio Apple's icon grid uses, so it reads as the same shape as the installed
 * icon sitting on the home screen behind it.
 */
const CORNER_RATIO = 0.2237;

/** Tight bounding box of everything that is not letterbox border. */
function contentBounds(img) {
  const W = img.getWidth();
  const H = img.getHeight();
  let minX = W;
  let minY = H;
  let maxX = -1;
  let maxY = -1;
  img.scan(0, 0, W, H, function scanner(x, y, idx) {
    const d = this.bitmap.data;
    if (d[idx] > BORDER_LEVEL || d[idx + 1] > BORDER_LEVEL || d[idx + 2] > BORDER_LEVEL) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  });
  return { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

/**
 * Replace the letterbox with the artwork nearest to it, by edge extension.
 *
 * Two decisions here, both learned the hard way on this icon:
 *
 * **A flood fill from the corners, not a threshold pass over the image.** The
 * artwork contains genuinely dark pixels of its own — the road surface, the
 * windscreen — and "replace everything near-black" eats them. Only the region
 * actually connected to a corner is letterbox.
 *
 * **Extended from the neighbouring pixels, not filled with one sampled colour.**
 * Sampling "the background" assumes there is one. This source has a gradient
 * backdrop *and* artwork reaching the edge — the blue check badge at one corner,
 * the book at two others — so any single sample is either wrong for three
 * corners or an average of all four, which is a colour that appears nowhere in
 * the image. Growing the existing pixels outward is seamless by construction
 * and needs no assumption about what the backdrop looks like.
 */
function extendIntoBorder(img) {
  const W = img.getWidth();
  const H = img.getHeight();
  const data = img.bitmap.data;
  const isBorder = new Uint8Array(W * H);
  const stack = [0, 0, W - 1, 0, 0, H - 1, W - 1, H - 1];
  const seen = new Uint8Array(W * H);
  let count = 0;

  // Pass 1 — mark the region connected to a corner.
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const key = y * W + x;
    if (seen[key]) continue;
    seen[key] = 1;
    const idx = key * 4;
    if (
      data[idx] > BORDER_LEVEL ||
      data[idx + 1] > BORDER_LEVEL ||
      data[idx + 2] > BORDER_LEVEL
    ) {
      continue;
    }
    isBorder[key] = 1;
    count++;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  // Kept because pass 2 clears `isBorder` as it goes, so by the time the
  // smoothing pass runs nothing else still describes what was changed.
  const wasBorder = Uint8Array.from(isBorder);

  // Pass 2 — grow the artwork outward one ring at a time until none is left.
  const NEIGHBOURS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  let remaining = count;
  while (remaining > 0) {
    const resolved = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const key = y * W + x;
        if (!isBorder[key]) continue;
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        for (const [dx, dy] of NEIGHBOURS) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const nkey = ny * W + nx;
          if (isBorder[nkey]) continue;
          const nidx = nkey * 4;
          r += data[nidx];
          g += data[nidx + 1];
          b += data[nidx + 2];
          n++;
        }
        if (n > 0) resolved.push(key, Math.round(r / n), Math.round(g / n), Math.round(b / n));
      }
    }
    // Nothing on the frontier: the remainder is unreachable, so stop rather
    // than spin. Cannot happen for a connected border, but a malformed source
    // should not hang the build.
    if (resolved.length === 0) break;
    for (let i = 0; i < resolved.length; i += 4) {
      const key = resolved[i];
      const idx = key * 4;
      data[idx] = resolved[i + 1];
      data[idx + 1] = resolved[i + 2];
      data[idx + 2] = resolved[i + 3];
      data[idx + 3] = 255;
      isBorder[key] = 0;
      remaining--;
    }
  }

  /*
    Pass 3 — smooth the region that was just filled.

    Growing pixels radially outward amplifies whatever noise and gradient the
    source edge carries into visible streaks fanning out from the curve. A few
    box-blur passes restricted to the filled region average them away while
    still following the backdrop's gradient, which a flat fill of one sampled
    colour would flatten into a seam.

    Restricted to the mask so the artwork itself is never touched.
  */
  const filledMask = wasBorder;
  for (let pass = 0; pass < 3; pass++) {
    const snapshot = Buffer.from(data);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const key = y * W + x;
        if (!filledMask[key]) continue;
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const nidx = (ny * W + nx) * 4;
            r += snapshot[nidx];
            g += snapshot[nidx + 1];
            b += snapshot[nidx + 2];
            n++;
          }
        }
        const idx = key * 4;
        data[idx] = Math.round(r / n);
        data[idx + 1] = Math.round(g / n);
        data[idx + 2] = Math.round(b / n);
      }
    }
  }

  return count;
}

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(data.length + 12);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

/**
 * Write a true 3-channel PNG — colour type 2, no alpha channel present at all.
 *
 * Hand-rolled because **`jimp.rgba(false)` produces a corrupt file**: it sets
 * the IHDR colour type to 2 but hands the encoder the untouched 4-channel
 * buffer, so every scanline is read at three-quarters of its real stride. The
 * header parses as valid — width, height and colour type all read correctly —
 * and the image renders as a sheared, tiled mess. That is worth knowing about:
 * a header-only check calls the file fine, so this has to be *looked at* after
 * it is generated, not just parsed.
 *
 * Alpha is discarded rather than composited here because every caller has
 * already drawn onto an opaque plate, so the channel is 255 throughout.
 */
function writeOpaquePng(img, file) {
  const W = img.getWidth();
  const H = img.getHeight();
  const src = img.bitmap.data;
  const raw = Buffer.alloc((W * 3 + 1) * H);
  let p = 0;
  for (let y = 0; y < H; y++) {
    raw[p++] = 0; // filter: none
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      raw[p++] = src[i];
      raw[p++] = src[i + 1];
      raw[p++] = src[i + 2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour, no alpha
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  fs.writeFileSync(
    file,
    Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk('IHDR', ihdr),
      chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
      chunk('IEND', Buffer.alloc(0)),
    ]),
  );
}

/**
 * Punch rounded corners into the alpha channel.
 *
 * A plain circular-arc corner, not Apple's continuous squircle — this is only
 * ever drawn as the splash mark at a couple of hundred points, where the
 * difference between the two curves is well under a pixel. The marketing icon,
 * where the shape genuinely matters, is left square for the OS to mask itself.
 *
 * Antialiased over one pixel so the curve does not come out with a stair edge
 * against the splash background.
 */
function roundCorners(img, radius) {
  const W = img.getWidth();
  const H = img.getHeight();
  const data = img.bitmap.data;
  img.scan(0, 0, W, H, (x, y, idx) => {
    // Distance past the corner arc, in each axis independently.
    const dx = x < radius ? radius - x : x >= W - radius ? x - (W - radius) + 1 : 0;
    const dy = y < radius ? radius - y : y >= H - radius ? y - (H - radius) + 1 : 0;
    if (dx === 0 || dy === 0) return;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d <= radius - 0.5) return;
    // One-pixel feather from fully inside to fully outside.
    const coverage = Math.max(0, Math.min(1, radius + 0.5 - d));
    data[idx + 3] = Math.round(data[idx + 3] * coverage);
  });
}

/**
 * Median colour of the outermost ring, read *after* extension.
 *
 * This is what sits against the platform mask, so it is what
 * `adaptiveIcon.backgroundColor` should match. Median rather than mean: the
 * ring crosses the book and the badge, and a mean of a dark backdrop and a
 * bright accent is a colour present nowhere in the icon.
 */
function edgeColour(img) {
  const W = img.getWidth();
  const H = img.getHeight();
  const samples = [];
  const step = Math.max(1, Math.round(Math.min(W, H) / 256));
  const push = (x, y) => {
    const p = Jimp.intToRGBA(img.getPixelColor(x, y));
    samples.push(p);
  };
  for (let x = 0; x < W; x += step) {
    push(x, 1);
    push(x, H - 2);
  }
  for (let y = 0; y < H; y += step) {
    push(1, y);
    push(W - 2, y);
  }
  const median = (key) => {
    const v = samples.map((p) => p[key]).sort((a, b) => a - b);
    return v[Math.floor(v.length / 2)];
  };
  return { r: median('r'), g: median('g'), b: median('b') };
}

async function main() {
  const source = process.argv[2];
  if (!source) {
    console.error('usage: node scripts/install-icon.js <path-to-source-image>');
    process.exit(1);
  }
  if (!fs.existsSync(source)) {
    console.error(`no such file: ${source}`);
    process.exit(1);
  }

  let art = await Jimp.read(source);
  const W0 = art.getWidth();
  const H0 = art.getHeight();
  console.log(`source: ${path.basename(source)} — ${W0}x${H0}`);

  // 1. Crop the letterbox border, if there is one.
  const box = contentBounds(art);
  const border = Math.min(box.minX, box.minY, W0 - 1 - box.maxX, H0 - 1 - box.maxY);
  if (border > Math.min(W0, H0) * BORDER_MIN) {
    art = art.crop(box.minX, box.minY, box.w, box.h);
    console.log(
      `  cropped ${border}px letterbox border → ${box.w}x${box.h} ` +
        `(full-bleed, so the OS mask is the only rounding applied)`,
    );
  }

  // 2. Extend the artwork over whatever sits outside its own curve.
  const filled = extendIntoBorder(art);
  const plate = edgeColour(art);
  const hex = `#${[plate.r, plate.g, plate.b]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
  console.log(
    `  extended artwork over ${filled} letterbox px; edge colour ${hex}`,
  );

  const plateInt = Jimp.rgbaToInt(plate.r, plate.g, plate.b, 255);

  if (Math.min(W0, H0) < 1024) {
    console.log(
      `  WARNING: source is under 1024 on a side, so the marketing icon is ` +
        `upscaled and will look soft.`,
    );
  }

  // 3. Marketing / general icon — 1024x1024, no alpha channel at all.
  const icon = new Jimp(1024, 1024, plateInt);
  icon.composite(art.clone().cover(1024, 1024), 0, 0);
  writeOpaquePng(icon, path.join(OUT, 'icon.png'));
  console.log('wrote assets/images/icon.png                     1024x1024, opaque');

  // 4. Android adaptive foreground — inset, transparency preserved.
  const inset = Math.round(1024 * ADAPTIVE_SAFE);
  const foreground = new Jimp(1024, 1024, 0x00000000);
  foreground.composite(
    art.clone().cover(inset, inset),
    Math.round((1024 - inset) / 2),
    Math.round((1024 - inset) / 2),
  );
  await foreground.writeAsync(path.join(OUT, 'android-icon-foreground.png'));
  console.log('wrote assets/images/android-icon-foreground.png  inset to safe zone, alpha kept');

  /*
    5. Splash mark.

    Corners are rounded back on here, which is the opposite of what the
    marketing icon needs and for the opposite reason: nothing masks the splash.
    The plugin draws this image straight onto the background colour, so a
    full-bleed square renders as a hard-edged rectangle floating on the splash —
    the one place the artwork has to carry its own shape.

    Kept on transparency for the same reason: the background differs between
    light and dark, so baking either one in shows as a mismatched box against
    the other.
  */
  const splash = new Jimp(1024, 1024, 0x00000000);
  splash.composite(art.clone().cover(1024, 1024), 0, 0);
  roundCorners(splash, Math.round(1024 * CORNER_RATIO));
  await splash.writeAsync(path.join(OUT, 'splash-icon.png'));
  console.log('wrote assets/images/splash-icon.png              1024x1024, rounded, alpha kept');

  // 6. Favicon — opaque; a browser tab has no plate behind it.
  const favicon = new Jimp(48, 48, plateInt);
  favicon.composite(art.clone().cover(48, 48), 0, 0);
  writeOpaquePng(favicon, path.join(OUT, 'favicon.png'));
  console.log('wrote assets/images/favicon.png                  48x48, opaque');

  console.log(`\nSet android.adaptiveIcon.backgroundColor to ${hex} so the`);
  console.log('foreground plate blends into the background under the mask.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
