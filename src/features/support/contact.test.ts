import { SUPPORT_EMAIL, supportMailto } from './contact';

const CONTEXT = {
  version: '1.0.0',
  platform: 'android',
  osVersion: '14',
  language: 'ar',
};

/**
 * The support link.
 *
 * Everything here fails the same quiet way: the mail client opens, a draft
 * appears, the learner types and sends, and what arrives is missing the part
 * that mattered. Nothing throws and nothing on screen looks wrong — which is
 * why the encoding is asserted rather than trusted to `encodeURIComponent`
 * being called somewhere in the file.
 */
describe('the support mailto', () => {
  it('addresses the published support address', () => {
    const url = supportMailto('Ejazty 1.0.0', 'Sent with:', CONTEXT);
    expect(url.startsWith(`mailto:${SUPPORT_EMAIL}?`)).toBe(true);
  });

  /*
    The load-bearing case, and the reason this is a module rather than a string
    template at the call site.

    `&` is the query delimiter. A subject or body carrying one, unencoded, ends
    the field there — so a learner reporting "the answer to Q40 & Q41 is wrong"
    sends a mail that stops at "Q40 ". The subject is localised copy that may
    gain an ampersand at any time, and the body is free text.
  */
  it('encodes an ampersand rather than ending the field at it', () => {
    const url = supportMailto('Feedback & bugs', 'Sent with:', CONTEXT);

    expect(url).toContain('Feedback%20%26%20bugs');
    // One `&` in the whole URL: the genuine separator between subject and body.
    expect(url.split('&')).toHaveLength(2);
  });

  /*
    The diagnostic block is four lines under a separator. Unencoded newlines
    either terminate the URL or collapse the block onto one unreadable line;
    either way the context that makes a report actionable is the part lost.
  */
  it('encodes the newlines that separate the diagnostic lines', () => {
    const url = supportMailto('Ejazty 1.0.0', 'Sent with:', CONTEXT);

    expect(url).toContain('%0A');
    expect(url).not.toContain('\n');
  });

  /*
    Arabic and Sorani are the whole point of the app, and neither is in the URL
    character set — so this is not a truncation risk here but a certainty. A
    version that skipped encoding would work perfectly in the language it was
    written in, which is the failure mode `direction.test.ts` and
    `choice-markers.test.ts` both exist for.
  */
  it('encodes a subject written in Arabic', () => {
    const url = supportMailto('ملاحظات', 'Sent with:', CONTEXT);

    expect(url).toContain(encodeURIComponent('ملاحظات'));
    expect(url).not.toContain('ملاحظات');
  });

  /*
    The context has to survive, or the block is decoration. Asserted by decoding
    the body back rather than by matching encoded fragments, so the test says
    what the reader of the mail actually sees.
  */
  it('carries the version, platform and language into the body', () => {
    const url = supportMailto('Ejazty 1.0.0', 'Sent with:', CONTEXT);
    const body = decodeURIComponent(url.split('&body=')[1]);

    expect(body).toContain('App: 1.0.0');
    expect(body).toContain('Platform: android 14');
    expect(body).toContain('Language: ar');
  });

  /*
    The learner's cursor lands above the separator, not inside the diagnostics.
    A draft that opens with the machine-readable block at the top reads as a
    form to fill in rather than a message to write, and the first thing a person
    does with it is delete the lot.
  */
  it('opens the body with empty space above the separator', () => {
    const url = supportMailto('Ejazty 1.0.0', 'Sent with:', CONTEXT);
    const body = decodeURIComponent(url.split('&body=')[1]);

    expect(body.startsWith('\n\n---')).toBe(true);
  });

  /*
    Nothing identifying travels with a report. This project wrote a privacy
    section listing what it never collects; a support link quietly attaching an
    account id would make that section wrong.
  */
  it('sends nothing beyond the four stated fields', () => {
    const url = supportMailto('Ejazty 1.0.0', 'Sent with:', CONTEXT);
    const body = decodeURIComponent(url.split('&body=')[1]);

    const labels = body
      .split('\n')
      .filter((line) => line.includes(': '))
      .map((line) => line.split(': ')[0]);

    expect(labels).toEqual(['App', 'Platform', 'Language']);
  });
});
