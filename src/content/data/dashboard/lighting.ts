/**
 * Lighting tell-tales — page 6 of the source guide. Green and blue lamps here
 * are confirmations that a light is on, not faults.
 */
import type { DashboardLight } from '../../schema';
import { DASHBOARD_GUIDE as S } from './source';

export const lightingLights: DashboardLight[] = [
  {
    id: 'dash-low-beam', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-low-beam.png'),
    title: { en: 'Low beam', ar: 'الأضواء المنخفضة', ckb: 'ڕووناکی نزم' },
    meaning: {
      en: 'The dipped headlights are switched on.',
      ar: 'الأضواء الأمامية المنخفضة مضاءة.',
      ckb: 'چرا نزمەکانی پێشەوە داگیرساون.',
    },
  },
  {
    id: 'dash-lamp-out', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-lamp-out.png'),
    title: { en: 'Lamp out', ar: 'مصباح معطّل', ckb: 'گڵۆپی خراپ' },
    meaning: {
      en: 'An exterior light on the car is not working properly.',
      ar: 'أحد الأضواء الخارجية في السيارة لا يعمل بشكل صحيح.',
      ckb: 'یەکێک لە چرا دەرەکییەکانی ئۆتۆمبێل بە دروستی کار ناکات.',
    },
  },
  {
    id: 'dash-high-beam', colour: 'blue', verified: true, source: S,
    image: require('@/assets/dashboard/dash-high-beam.png'),
    title: { en: 'High beam', ar: 'الأضواء العالية', ckb: 'ڕووناکی بەرز' },
    meaning: {
      en: 'The main beam headlights are on, or you are flashing them.',
      ar: 'الأضواء الأمامية العالية مضاءة، أو أنك تستخدم الفلاش.',
      ckb: 'چرا بەرزەکانی پێشەوە داگیرساون، یان فلاش بەکاردەهێنیت.',
    },
    action: {
      en: 'Dip them for oncoming traffic and when following another vehicle.',
      ar: 'اخفضها عند قدوم مركبات مقابلة وعند السير خلف مركبة أخرى.',
      ckb: 'لە کاتی هاتنی ئۆتۆمبێلی بەرامبەر و دوای ئۆتۆمبێلێکی تر نزمیان بکەرەوە.',
    },
  },
  {
    id: 'dash-headlight-range-control', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-headlight-range-control.png'),
    title: { en: 'Headlight levelling', ar: 'ضبط مستوى الأضواء', ckb: 'ڕێکخستنی ئاستی چرا' },
    meaning: {
      en: 'A fault has been found in the headlight range control system.',
      ar: 'اكتُشف خلل في نظام ضبط مستوى الأضواء الأمامية.',
      ckb: 'کێشەیەک لە سیستەمی ڕێکخستنی ئاستی چرای پێشەوەدا دۆزراوەتەوە.',
    },
  },
  {
    id: 'dash-front-fog', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-front-fog.png'),
    title: { en: 'Front fog lights', ar: 'أضواء الضباب الأمامية', ckb: 'چرای تەمی پێشەوە' },
    meaning: {
      en: 'The front fog lights are switched on.',
      ar: 'أضواء الضباب الأمامية مضاءة.',
      ckb: 'چراکانی تەمی پێشەوە داگیرساون.',
    },
  },
  {
    id: 'dash-exterior-light-fault', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-exterior-light-fault.png'),
    title: { en: 'Exterior light fault', ar: 'خلل في الإضاءة الخارجية', ckb: 'کێشە لە ڕووناکی دەرەکی' },
    meaning: {
      en: 'One of the exterior lights on the car is not working.',
      ar: 'أحد الأضواء الخارجية في السيارة لا يعمل.',
      ckb: 'یەکێک لە چرا دەرەکییەکانی ئۆتۆمبێلەکە کار ناکات.',
    },
  },
  {
    id: 'dash-auto-high-beam', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-auto-high-beam.png'),
    title: { en: 'Automatic high beam', ar: 'الأضواء العالية التلقائية', ckb: 'ڕووناکی بەرزی ئۆتۆماتیک' },
    meaning: {
      en: 'The automatic high beam system has turned the main beam on for you.',
      ar: 'قام نظام الأضواء العالية التلقائي بتشغيل الضوء العالي.',
      ckb: 'سیستەمی ڕووناکی بەرزی ئۆتۆماتیک چرا بەرزەکەی بۆت داگیرساندووە.',
    },
  },
  {
    id: 'dash-adaptive-light-system', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-adaptive-light-system.png'),
    title: { en: 'Adaptive headlights', ar: 'الأضواء التكيّفية', ckb: 'چرای گونجاو' },
    meaning: {
      en: 'The adaptive headlights, which swivel with the steering, are switched on.',
      ar: 'الأضواء التكيّفية التي تدور مع المقود مفعّلة.',
      ckb: 'چرا گونجاوەکان کە لەگەڵ ئستیرن دەسوڕێنەوە چالاکن.',
    },
  },
  {
    id: 'dash-side-lights', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-side-lights.png'),
    title: { en: 'Side lights', ar: 'أضواء الوقوف الجانبية', ckb: 'چرای لاتەنیشت' },
    meaning: {
      en: 'The side lights are in use.',
      ar: 'أضواء الوقوف الجانبية مضاءة.',
      ckb: 'چراکانی لاتەنیشت بەکاردەهێنرێن.',
    },
  },
  {
    id: 'dash-rear-fog', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-rear-fog.png'),
    title: { en: 'Rear fog lights', ar: 'أضواء الضباب الخلفية', ckb: 'چرای تەمی دواوە' },
    meaning: {
      en: 'The rear fog lights are switched on.',
      ar: 'أضواء الضباب الخلفية مضاءة.',
      ckb: 'چراکانی تەمی دواوە داگیرساون.',
    },
    action: {
      en: 'Switch them off once visibility improves, because they dazzle the driver behind.',
      ar: 'أطفئها حين تتحسن الرؤية، فهي تُبهر السائق خلفك.',
      ckb: 'کە دیمەن باشتر بوو بیانکوژێنەوە، چونکە چاوی شۆفێری دواوە دەبەن.',
    },
  },
  {
    id: 'dash-rain-light-sensor', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-rain-light-sensor.png'),
    title: { en: 'Rain and light sensor', ar: 'حساس المطر والإضاءة', ckb: 'هەستەوەری باران و ڕووناکی' },
    meaning: {
      en: 'The sensor system has a fault, so the wipers and lights will not work automatically.',
      ar: 'هناك خلل في نظام الحساس، لذا لن تعمل المساحات والأضواء تلقائيًا.',
      ckb: 'سیستەمی هەستەوەر کێشەی هەیە، بۆیە سڕەرەوە و چراکان بە ئۆتۆماتیکی کار ناکەن.',
    },
  },
];
