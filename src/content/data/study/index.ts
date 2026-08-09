/**
 * The Learn tab's study notes, as one bundle.
 *
 * These are what the Learn tab is made of, alongside the two reference
 * catalogues that carry their own artwork (the 111 signs and the 94 dashboard
 * tell-tales). The exam bank is untouched by any of it — `examPool()` still
 * draws on all ~430 transcribed questions, and `sections.test.ts` pins that
 * every topic it carries is taught by exactly one section here.
 */
import type { StudyNote } from '../../schema';
import { firstAidNotes } from './firstaid';
import { mechanicsNotes } from './mechanics';
import { priorityNotes } from './priority';
import { priorityPictureNotes } from './priority-pictures';
import { rulePictureNotes } from './rules-pictures';
import { ruleNotes } from './rules';
import { extraSignNotes } from './signs-extra';
import { signNotes } from './signs';
import { violationNotes } from './violations';

export const studyNotes: StudyNote[] = [
  ...signNotes,
  ...extraSignNotes,
  ...ruleNotes,
  ...rulePictureNotes,
  ...priorityNotes,
  ...priorityPictureNotes,
  ...violationNotes,
  ...mechanicsNotes,
  ...firstAidNotes,
];
