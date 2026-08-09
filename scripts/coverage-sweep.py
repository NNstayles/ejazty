"""Exam <-> Learn concept-coverage sweep.

For every question in the bank, find the Learn material that teaches it and
report the ones with no plausible match. Run against the English text, because
the Arabic sides use deliberately different vocabulary -- the bank is transcribed
verbatim and prints colloquial and transliterated Iraqi forms while the notes are
written in MSA, so an Arabic word-overlap sweep reports a translation difference
as a coverage gap (see CLAUDE.md).

Output is a ranked list to be read by hand. It is a *finder*, not a verdict:
every previous run of this has been dominated by false positives.
"""

import json
import re
import sys
from collections import defaultdict

STOP = set("""
a an the this that these those is are was were be been being am
what which who whom whose when where why how
do does did done doing can could should would may might must shall will
of in on at to for from by with without within into onto over under
and or but if then than as so such not no nor only own same too very
you your yours it its his her their they them he she we our us i me my
there here all any both each few more most other some
mean means meaning following follows correct correctly answer question picture
image shown show shows below above vehicle vehicles driver drivers car cars
road roads sign signs case cases must should allowed permitted prohibited
""".split())

SYN = {
    'automobile': 'vehicle', 'auto': 'vehicle', 'motorcar': 'vehicle',
    'lorry': 'truck', 'lorries': 'truck', 'trucks': 'truck',
    'overtaking': 'overtake', 'overtakes': 'overtaken', 'overtaken': 'overtake',
    'passing': 'overtake', 'pass': 'overtake',
    'parking': 'park', 'parked': 'park', 'parks': 'park',
    'braking': 'brake', 'brakes': 'brake', 'braked': 'brake',
    'tyres': 'tyre', 'tires': 'tyre', 'tire': 'tyre',
    'lights': 'light', 'lamps': 'light', 'lamp': 'light',
    'speeds': 'speed', 'speeding': 'speed',
    'distances': 'distance',
    'pedestrians': 'pedestrian',
    'crossings': 'crossing', 'crosswalk': 'crossing',
    'junctions': 'junction', 'intersection': 'junction',
    'intersections': 'junction', 'crossroads': 'junction',
    'roundabouts': 'roundabout',
    'priorities': 'priority', 'way': 'priority',
    'penalties': 'penalty', 'fines': 'fine', 'fined': 'fine',
    'licence': 'license', 'licences': 'license', 'licenses': 'license',
    'engines': 'engine', 'oils': 'oil',
    'batteries': 'battery', 'batterys': 'battery',
    'seatbelt': 'belt', 'seatbelts': 'belt', 'belts': 'belt',
    'helmets': 'helmet',
    'alcohol': 'drink', 'drinking': 'drink', 'drunk': 'drink',
    'injuries': 'injury', 'injured': 'injury', 'wounds': 'injury',
    'bleeding': 'bleed', 'burns': 'burn', 'burned': 'burn',
    'children': 'child', 'kids': 'child',
    'motorcycles': 'motorcycle', 'motorbike': 'motorcycle',
    'bicycles': 'bicycle', 'bikes': 'bicycle',
    'signals': 'signal', 'signalling': 'signal',
    'headlamp': 'headlight', 'headlights': 'headlight',
    'wipers': 'wiper', 'mirrors': 'mirror',
    'documents': 'document', 'papers': 'document',
    'inspections': 'inspection', 'inspected': 'inspection',
    'insurances': 'insurance',
    'tunnels': 'tunnel', 'bridges': 'bridge',
    'weather': 'fog', 'foggy': 'fog', 'rains': 'rain', 'rainy': 'rain',
}


def tok(text):
    words = re.findall(r'[a-z]+|\d+', (text or '').lower())
    out = set()
    for w in words:
        w = SYN.get(w, w)
        if w in STOP or len(w) < 3:
            continue
        out.add(w)
    return out


def main():
    data = json.load(open('audit-dump.json', encoding='utf-8'))

    # Learn-side material, indexed by topic. A question is taught if any note in
    # its own section covers it; the signs catalogue counts too, because a sign
    # card is what teaches a sign-identification question.
    learn = defaultdict(list)
    for n in data['notes']:
        blob = ' '.join([n['title'], n['body']] + n['points'])
        learn[n['topic']].append(('note:' + n['id'], tok(blob), blob))
    for s in data['signs']:
        blob = f"{s['name']} {s['meaning']}"
        learn['signs'].append(('sign:' + s['id'], tok(blob), blob))
        # A sign is also priority material when the question is about who goes
        # first; index it there too rather than reporting a false gap.
        learn['priority'].append(('sign:' + s['id'], tok(blob), blob))

    everything = [item for items in learn.values() for item in items]

    rows = []
    for q in data['questions']:
        qt = tok(f"{q['prompt']} {q['answer']} {q['explanation']}")
        if not qt:
            continue
        pool = learn.get(q['topic'], []) or everything
        best, best_score, best_blob = None, 0.0, ''
        for ident, lt, blob in pool:
            if not lt:
                continue
            score = len(qt & lt) / len(qt)
            if score > best_score:
                best, best_score, best_blob = ident, score, blob
        # Also try the whole corpus: a question may be taught by a note filed in
        # a different section, which is coverage even if it is misfiled.
        alt, alt_score = None, 0.0
        for ident, lt, blob in everything:
            if not lt:
                continue
            score = len(qt & lt) / len(qt)
            if score > alt_score:
                alt, alt_score = ident, score
        rows.append((max(best_score, alt_score), best_score, q, best, alt, alt_score))

    rows.sort(key=lambda r: r[0])
    threshold = float(sys.argv[1]) if len(sys.argv) > 1 else 0.30
    weak = [r for r in rows if r[0] < threshold]

    print(f'questions swept: {len(rows)}')
    print(f'weak matches (< {threshold:.0%} overlap): {len(weak)}')
    by_topic = defaultdict(int)
    for r in weak:
        by_topic[r[2]['topic']] += 1
    print('weak by topic:', dict(by_topic))
    print()
    for score, own, q, best, alt, alt_score in weak:
        print(f'--- {score:.2f} [{q["topic"]}] {q["id"]}{" (derived)" if q["derived"] else ""}')
        print(f'    Q: {q["prompt"][:120]}')
        print(f'    A: {q["answer"][:110]}')
        print(f'    best-in-section: {best} ({own:.2f})   best-anywhere: {alt} ({alt_score:.2f})')


if __name__ == '__main__':
    main()
