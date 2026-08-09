import type { DashboardLight } from '../../schema';
import { advancedLights } from './advanced';
import { commonLights } from './common';
import { dieselLights } from './diesel';
import { lightingLights } from './lighting';
import { warningLights } from './warning';

/**
 * All 94 dashboard tell-tales, ordered so the ones that demand action come
 * first and the "system is on" confirmations come last.
 */
export const dashboardLights: DashboardLight[] = [
  ...warningLights,
  ...lightingLights,
  ...commonLights,
  ...advancedLights,
  ...dieselLights,
];
