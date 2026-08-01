import type { SourceRef } from '../../schema';

/**
 * Federal Ministry of Interior — General Traffic Directorate.
 * "العلامات المرورية" (Traffic Signs), enrichment annex.
 *
 * Arabic text is transcribed verbatim from the manual. English and Kurdish
 * Sorani are working translations of that Arabic and are NOT part of the
 * official publication — have a fluent speaker review them before release.
 */
export const SIGNS_MANUAL: SourceRef = {
  authority: 'federal-moi',
  document: 'العلامات المرورية — وزارة الداخلية، مديرية المرور العامة',
  edition: 'ملحق إثرائي',
};

/**
 * Federal Ministry of Interior — General Traffic Directorate.
 * "دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة باللغة العربية".
 */
export const EXAM_GUIDE: SourceRef = {
  authority: 'federal-moi',
  document: 'دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة',
};
