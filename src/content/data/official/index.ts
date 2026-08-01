import type { ContentBundle } from '../../schema';
import { informativeSigns } from './signs-informative';
import { regulatorySigns } from './signs-regulatory';
import { warningSigns } from './signs-warning';

/**
 * Verified material transcribed from the ministry publications.
 *
 * Signs are complete (all 111 records from the traffic-signs manual, with the
 * original artwork). Questions, violations and road-priority rules are not yet
 * transcribed — see README.
 */
export const officialBundle: ContentBundle = {
  signs: [...regulatorySigns, ...warningSigns, ...informativeSigns],
  violations: [],
  rules: [],
  priority: [],
  questions: [],
};
