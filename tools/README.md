# Question-bank transcription

`src/content/data/official/questions-text-027.ts` and `questions-pictures.ts` are
**generated**. Do not hand-edit them — the next generator run overwrites the file.

## Source of truth

`question-transcriptions/*.json`, one file per page of the ministry bank
("دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة", 50 pages):

- `text_pNN.json` — the text series, questions 1–281 (pages 2–33). Questions
  1–26 live in the hand-written `questions.ts` and are **not** repeated here.
- `pic_pNN.json` — the picture series, questions 1–150 (pages 34–50).

Record shape:

```json
{"n": 27, "id": "q-kebab-id", "topic": "rules", "correct": 0,
 "img": "pic-001.png",
 "ar":  ["prompt", "choice a", "choice b", "choice c"],
 "en":  ["...", "...", "...", "..."],
 "ckb": ["...", "...", "...", "..."],
 "exp": {"ar": "...", "en": "...", "ckb": "..."}}
```

`correct` is the 0-based index of the option the source marks with the red check.
Choice order follows the page, top to bottom. `img` is omitted for questions with
no artwork.

## Running it

```bash
python tools/gen.py
```

It validates before writing — duplicate ids (across *both* series), missing or
empty languages, wrong choice counts, duplicate choice text within a question,
bad topics, missing explanations — and exits non-zero without touching the output
if anything fails. That is why the schema invariants hold across ~400 records
without anyone checking them by hand.

## How the transcription was done, and why this way

The PDF's text layer is unusable: its font encoding is not 1:1, so glyphs come
out mis-mapped (`دﻟᘭﻞ` for `دليل`) and deriving a remap table silently corrupts
answers. Pages were rendered to images (`page.get_pixmap(dpi=140)`, PyMuPDF) and
read visually.

The text layer **is** reliable for one thing and was used for it: the answer
markers, U+F058 (correct) and U+F057 (distractor), plus the question numbering.

Images were extracted with their y-position on the page and matched to questions
by order, which is unambiguous because the layout is a regular grid — one image
per question, evenly spaced. Page 49 is the only page where the counts differ
(8 images, 9 questions), and reading it confirms question 143 simply has no
artwork.

## Orthographic normalisation

The Arabic wording is verbatim, but its *spelling* has been normalised in one
narrow class of case: where the **same stem is spelt inconsistently between
records**. At most one variant of a repeated stem can be faithful to the page, so
the rest are transcription noise rather than something the publication does.

Four groups were reconciled, none of which touches a choice, an answer index or a
meaning:

| Was | Now | Count |
| --- | --- | --- |
| a space before `؟` (`… الصورة ؟`) | no space | 51 |
| `الصوره` | `الصورة` | 19 |
| `هذة` | `هذه` | 2 |
| `البيئة و تكن` | `البيئة وتكن` | 1 |

The picture series' priority stem was the worst of it — `لمن الأسبقية في هذه
الصورة؟` was printed five different ways across sixteen records, which made a
single question look like five.

Punctuation sitting against a fill-in-the-blank ellipsis (`عن ......... ،`) is
**left alone**: the space there is part of the blank, not a slip. Hamza spelling
(`الاسبقية` rather than `الأسبقية`) is also left alone — it is consistent across
every record, so there is nothing to reconcile it against, and changing it would
be editing the source rather than de-duplicating a transcription.

To re-check: group prompts by a skeleton that strips punctuation and folds
`أإآ→ا`, `ةه`, `ى→ي`, then look for groups with more than one distinct spelling.

## Two deliberate deviations from the source

Both are recorded here because they would otherwise look like transcription slips:

- **Picture question 150 is omitted.** It repeats 145's stem and options exactly
  but marks the opposite answer — 145 says stop completely in heavy rain or fog,
  150 says keep driving. One is wrong in the publication and 150 is the unsafe
  one, so shipping both would put a contradiction into graded attempts.
- **Picture question 104's stem was restored.** The guide misprints it as a
  statement that is also its own first distractor; it now uses the stem every
  other sign question uses, and its explanation says so.

Separately, `q-pass-mark` in the hand-written `questions.ts` carries an answer
that does **not** match the ministry's marking, by explicit product decision.
See the comment on that record and on `PASS_THRESHOLD`.
