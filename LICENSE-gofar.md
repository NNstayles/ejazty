# Dashboard tell-tale artwork — GoFar

The 94 images in `assets/dashboard/` are **not** original to this project. They
are the property of GoFar and are used here by permission.

| | |
| --- | --- |
| **Rights holder** | GoFar |
| **Source document** | *Car Dashboard Warning Lights & Symbols Guide* |
| **Source URL** | https://www.gofar.co/car-dashboard-warning-lights/ |
| **Files** | `assets/dashboard/*.png` (94 files) |
| **Grant** | Written permission to use the icons in this app |
| **Conditions** | None stated |
| **Recorded** | 2026-08-08 |

## What this record is, and what it is not

The grant above was obtained by the project owner, who contacted GoFar directly
and reported the outcome on 2026-08-08. **This file is a record of that report,
not a transcription of GoFar's own words** — no wording from their reply is
quoted here, because none was supplied to whoever wrote this file.

**Keep the written grant itself.** The email or message from GoFar is the actual
evidence; this file only points at it. A licence that exists solely as a
second-hand summary in a repository is not something to rely on if it is ever
questioned. If the reply states conditions that the "none stated" row above
contradicts, the reply wins and this file is wrong.

## The wordmark stays

Every icon carries GoFar's `GOFAR` wordmark, baked into the artwork by them. It
is preserved deliberately and **must not be cropped, painted over, or removed**,
including by re-running the normalise step with a tighter crop.

This holds even though no attribution was required. Removing a rights holder's
mark from artwork that remains theirs is a worse act than shipping it unlicensed
was: it takes the credit off while the ownership stays put. If GoFar later ask
for the mark to go, that is their call to make and it should be recorded here.

## How these files were produced

Extracted from GoFar's published PDF and normalised — trimmed to the tile edge,
then fitted onto one 168×168 canvas (`fit: contain`, so nothing is ever cropped)
and encoded as palette PNG. 168px is exactly 3× the 56pt tile the app draws them
in, which is the largest size any screen can display.

Nothing was redrawn, recoloured, or altered beyond scaling and padding. The
symbols themselves are the standardised ISO 2575 vocabulary, which is why they
look like every other set — but this rendering of them is GoFar's.

## History

The app previously shipped these same icons without a licence. They were deleted
on 2026-08-07 for that reason and replaced with 94 hand-drawn SVG glyphs. With
permission granted, the artwork was restored on 2026-08-08 and the drawn set was
deleted the same day.

**So there is no fallback in the working tree.** If this grant is ever withdrawn,
the glyphs are recoverable from git history — `src/components/icons/dashboard-glyph-data.ts`,
`dashboard-glyphs.tsx` and `tools/render_glyphs.py` — and the `dashboard artwork`
block in `src/content/registry.test.ts` is the set of rules they would need to
satisfy again.
