/**
 * Everyday tell-tales — page 7 of the source guide. Mostly confirmations that
 * something is switched on or a door is open.
 */
import type { DashboardLight } from '../../schema';
import { DASHBOARD_GUIDE as S } from './source';

export const commonLights: DashboardLight[] = [
  {
    id: 'dash-windshield-defrost', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-windshield-defrost.png'),
    title: { en: 'Windscreen demister', ar: 'مزيل ضباب الزجاج الأمامي', ckb: 'تەمبەرەوەی شووشەی پێشەوە' },
    meaning: {
      en: 'The front windscreen demister is running.',
      ar: 'مزيل الضباب عن الزجاج الأمامي يعمل.',
      ckb: 'تەمبەرەوەی شووشەی پێشەوە کار دەکات.',
    },
  },
  {
    id: 'dash-washer-fluid', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-washer-fluid.png'),
    title: { en: 'Washer fluid low', ar: 'انخفاض ماء المساحات', ckb: 'کەمی ئاوی سڕەرەوە' },
    meaning: {
      en: 'The windscreen washer reservoir is nearly empty.',
      ar: 'خزان ماء المساحات شارف على الفراغ.',
      ckb: 'تانکی ئاوی سڕەرەوە خەریکە بەتاڵ دەبێت.',
    },
  },
  {
    id: 'dash-rear-window-defrost', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-rear-window-defrost.png'),
    title: { en: 'Rear demister', ar: 'مزيل ضباب الزجاج الخلفي', ckb: 'تەمبەرەوەی شووشەی دواوە' },
    meaning: {
      en: 'The rear window demister is running.',
      ar: 'مزيل الضباب عن الزجاج الخلفي يعمل.',
      ckb: 'تەمبەرەوەی شووشەی دواوە کار دەکات.',
    },
  },
  {
    id: 'dash-low-fuel', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-low-fuel.png'),
    title: { en: 'Low fuel', ar: 'انخفاض الوقود', ckb: 'کەمی سووتەمەنی' },
    meaning: {
      en: 'The car is running low on fuel and needs refuelling soon.',
      ar: 'الوقود في السيارة منخفض ويحتاج إلى التعبئة قريبًا.',
      ckb: 'سووتەمەنی ئۆتۆمبێلەکە کەمە و بەم زووانە پێویستی بە پڕکردنەوەیە.',
    },
  },
  {
    id: 'dash-key-not-in-vehicle', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-key-not-in-vehicle.png'),
    title: { en: 'Key not in vehicle', ar: 'المفتاح خارج المركبة', ckb: 'کلیل لە ئۆتۆمبێلدا نییە' },
    meaning: {
      en: 'The smart key cannot be found inside the car.',
      ar: 'لا يمكن العثور على المفتاح الذكي داخل السيارة.',
      ckb: 'کلیلە زیرەکەکە لە ناو ئۆتۆمبێلەکەدا نادۆزرێتەوە.',
    },
  },
  {
    id: 'dash-hood-open', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-hood-open.png'),
    title: { en: 'Bonnet open', ar: 'غطاء المحرك مفتوح', ckb: 'کاپۆتی پێشەوە کراوەیە' },
    meaning: {
      en: 'The bonnet is not closed properly.',
      ar: 'غطاء المحرك غير مغلق بإحكام.',
      ckb: 'کاپۆتی پێشەوە بە دروستی داخراو نییە.',
    },
  },
  {
    id: 'dash-hazard-lights', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-hazard-lights.png'),
    title: { en: 'Hazard lights', ar: 'أضواء التحذير', ckb: 'چرای مەترسی' },
    meaning: {
      en: 'The hazard warning lights are switched on.',
      ar: 'أضواء التحذير مضاءة.',
      ckb: 'چراکانی ئاگادارکردنەوەی مەترسی داگیرساون.',
    },
  },
  {
    id: 'dash-fan', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-fan.png'),
    title: { en: 'Cabin fan', ar: 'مروحة المقصورة', ckb: 'فانی ناوەوە' },
    meaning: {
      en: 'The interior ventilation fan is running.',
      ar: 'مروحة التهوية الداخلية تعمل.',
      ckb: 'فانی هەوادانی ناوەوە کار دەکات.',
    },
  },
  {
    id: 'dash-door-ajar', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-door-ajar.png'),
    title: { en: 'Door open', ar: 'باب مفتوح', ckb: 'دەرگا کراوەیە' },
    meaning: {
      en: 'One or more doors are not shut properly.',
      ar: 'أحد الأبواب أو أكثر غير مغلق بإحكام.',
      ckb: 'یەک دەرگا یان زیاتر بە دروستی داخراو نییە.',
    },
  },
  {
    id: 'dash-turn-signals', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-turn-signals.png'),
    title: { en: 'Indicators', ar: 'إشارات الانعطاف', ckb: 'ئیشارەتی لادان' },
    meaning: {
      en: 'A turn signal, left or right, is flashing.',
      ar: 'إحدى إشارات الانعطاف، يمين أو يسار، تعمل.',
      ckb: 'یەکێک لە ئیشارەتەکانی لادان، ڕاست یان چەپ، دەبلیسێتەوە.',
    },
  },
  {
    id: 'dash-car-on-ramp', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-car-on-ramp.png'),
    title: { en: 'Vehicle jacked up', ar: 'المركبة مرفوعة', ckb: 'ئۆتۆمبێل بەرزکراوەتەوە' },
    meaning: {
      en: 'The car is raised on a ramp or jack.',
      ar: 'السيارة مرفوعة على رافعة أو منصة.',
      ckb: 'ئۆتۆمبێلەکە لەسەر ڕامپ یان جەک بەرزکراوەتەوە.',
    },
  },
];
