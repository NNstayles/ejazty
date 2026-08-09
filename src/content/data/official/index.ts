import type { ContentBundle } from '../../schema';
import { officialQuestions } from './questions';
import { officialQuestionsPictures } from './questions-pictures';
import { officialQuestionsText27 } from './questions-text-027';
import { signQuestions } from './sign-questions';
import { signs } from './signs';

export { signs };

/**
 * Verified material transcribed from the ministry publications.
 *
 * Signs are complete (all 111 records from the traffic-signs manual, with the
 * original artwork). Questions are the whole bank — text series 1–281 and
 * picture series 1–150 — plus one identification question per sign.
 *
 * No notes: the study notes written from this material live in `data/study/`,
 * because they are condensations rather than transcriptions and their sources
 * name the questions they were condensed from.
 */
export const officialBundle: ContentBundle = {
  signs,
  notes: [],
  dashboard: [],
  questions: [
    ...officialQuestions,
    ...officialQuestionsText27,
    ...officialQuestionsPictures,
    ...signQuestions,
  ],
};
