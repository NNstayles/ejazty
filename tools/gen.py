"""Generates TypeScript question files from the per-page JSON transcriptions.

The JSON is the hand-transcribed source of truth (read from rendered page
images); this script only shapes it, so the schema invariants -- three choices,
exactly one correct id, all three languages present -- are guaranteed by
construction rather than by hand-editing 400 records.
"""
import glob, json, os, re, sys

SCRATCH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'question-transcriptions')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'content', 'data', 'official')
ASSETS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'exam')

ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩'


def arabic_num(n: int) -> str:
    return ''.join(ARABIC_INDIC[int(d)] for d in str(n))


def esc(s: str) -> str:
    return s.replace('\\', '\\\\').replace("'", "\\'")


def load(pattern):
    items = []
    for f in sorted(glob.glob(os.path.join(SCRATCH, pattern))):
        items.extend(json.load(open(f, encoding='utf-8')))
    return items


def validate(items, kind):
    problems = []
    seen_ids, seen_n = set(), set()
    for q in items:
        qid = q['id']
        if qid in seen_ids:
            problems.append(f'duplicate id {qid}')
        seen_ids.add(qid)
        if q['n'] in seen_n:
            problems.append(f'duplicate {kind} number {q["n"]}')
        seen_n.add(q['n'])
        if not re.fullmatch(r'qp?-[a-z0-9-]+', qid):
            problems.append(f'bad id shape {qid}')
        for lang in ('ar', 'en', 'ckb'):
            if lang not in q:
                problems.append(f'{qid}: missing {lang}')
                continue
            if len(q[lang]) != 4:
                problems.append(f'{qid}: {lang} needs prompt + 3 choices, got {len(q[lang])}')
            if any(not str(x).strip() for x in q[lang]):
                problems.append(f'{qid}: empty {lang} string')
            texts = q[lang][1:]
            if len(set(texts)) != len(texts):
                problems.append(f'{qid}: duplicate {lang} choice text')
        if not 0 <= q['correct'] <= 2:
            problems.append(f'{qid}: correct index out of range')
        if q['topic'] not in ('signs', 'rules', 'priority', 'mechanics', 'firstaid'):
            problems.append(f'{qid}: bad topic {q["topic"]}')
        for lang in ('ar', 'en', 'ckb'):
            if not q.get('exp', {}).get(lang, '').strip():
                problems.append(f'{qid}: missing {lang} explanation')
        # `img` names a file under assets/exam/, and the generated `require`
        # resolves at bundle time rather than here -- so a name that has drifted
        # from what is on disk fails as a Metro resolution error hundreds of
        # records later, pointing at a generated file nobody hand-edits. The
        # extension is part of that: the artwork was re-encoded from PNG to JPEG
        # for size and decode cost, and a stale `.png` here is exactly the drift
        # this catches.
        if q.get('img') and not os.path.isfile(os.path.join(ASSETS, q['img'])):
            problems.append(f'{qid}: no such artwork {q["img"]}')
    return problems


def render(q, locator_prefix, image=None):
    cid = 'abc'[q['correct']]
    lines = [
        '  {',
        f"    id: '{esc(q['id'])}',",
        f"    topic: '{q['topic']}',",
        '    verified: true,',
        f"    source: {{ ...S, locator: '{locator_prefix} {arabic_num(q['n'])}' }},",
    ]
    if image:
        lines.append(f'    image: {image},')
    lines.append('    prompt: {')
    for lang in ('ar', 'en', 'ckb'):
        lines.append(f"      {lang}: '{esc(q[lang][0])}',")
    lines.append('    },')
    lines.append('    choices: [')
    for i, letter in enumerate('abc'):
        lines.append(f"      {{ id: '{letter}', text: {{")
        for lang in ('ar', 'en', 'ckb'):
            lines.append(f"        {lang}: '{esc(q[lang][i + 1])}',")
        lines.append('      } },')
    lines.append('    ],')
    lines.append(f"    correctChoiceId: '{cid}',")
    lines.append('    explanation: {')
    for lang in ('ar', 'en', 'ckb'):
        lines.append(f"      {lang}: '{esc(q['exp'][lang])}',")
    lines.append('    },')
    lines.append('  },')
    return '\n'.join(lines)


HEADER_TEXT = '''/**
 * Questions transcribed from the official ministry bank — text section,
 * questions {lo}–{hi}.
 *
 * GENERATED from the per-page transcriptions; see CLAUDE.md. Arabic is verbatim
 * from "دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة"; English and
 * Kurdish Sorani are working translations of that Arabic and are NOT part of the
 * publication.
 *
 * The correct option is the one the source marks with a red check glyph. The
 * PDF's text layer is unusable (its font encoding is not 1:1), so the wording
 * was read from rendered page images and only the answer markers were taken
 * from the text layer.
 */
import type {{ Question }} from '../../schema';
import {{ EXAM_GUIDE as S }} from './source';

export const officialQuestionsText{lo}: Question[] = [
'''


HEADER_PIC = '''/**
 * Questions transcribed from the official ministry bank — picture section,
 * questions {lo}–{hi}.
 *
 * GENERATED from the per-page transcriptions; see CLAUDE.md. Arabic is verbatim
 * from "دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة"; English and
 * Kurdish Sorani are working translations of that Arabic and are NOT part of the
 * publication.
 *
 * The artwork under `@/assets/exam/` is extracted from the same publication, one
 * image per question, matched to its question by position on the rendered page.
 * The picture section restarts its own numbering at 1, so these locators read
 * "ص س N" (صورة/سؤال) to keep them distinct from the text section's "س N".
 */
import type {{ Question }} from '../../schema';
import {{ EXAM_GUIDE as S }} from './source';

export const officialQuestionsPictures: Question[] = [
'''


def main():
    text = load('text_p*.json')
    pics = load('pic_p*.json')
    problems = validate(text, 'question') + validate(pics, 'picture')
    # ids must be unique across BOTH series
    all_ids = [q['id'] for q in text + pics]
    for qid in {i for i in all_ids if all_ids.count(i) > 1}:
        problems.append(f'id {qid} used in both series')
    if problems:
        print('VALIDATION FAILED:')
        for p in problems:
            print(' -', p)
        sys.exit(1)

    if text:
        text.sort(key=lambda q: q['n'])
        lo, hi = text[0]['n'], text[-1]['n']
        body = '\n'.join(render(q, 'س') for q in text)
        out = HEADER_TEXT.format(lo=lo, hi=hi) + body + '\n];\n'
        path = os.path.join(OUT, f'questions-text-{lo:03d}.ts')
        open(path, 'w', encoding='utf-8', newline='\n').write(out)
        print(f'wrote {path}: {len(text)} questions ({lo}-{hi})')

    if pics:
        pics.sort(key=lambda q: q['n'])
        lo, hi = pics[0]['n'], pics[-1]['n']
        rendered = []
        for q in pics:
            img = None
            if q.get('img'):
                img = f"require('@/assets/exam/{q['img']}')"
            rendered.append(render(q, 'ص س', image=img))
        out = HEADER_PIC.format(lo=lo, hi=hi) + '\n'.join(rendered) + '\n];\n'
        path = os.path.join(OUT, 'questions-pictures.ts')
        open(path, 'w', encoding='utf-8', newline='\n').write(out)
        print(f'wrote {path}: {len(pics)} questions ({lo}-{hi})')


if __name__ == '__main__':
    main()
