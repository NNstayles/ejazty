/**
 * Diesel-specific and remaining tell-tales — pages 10–11 of the source guide.
 *
 * The guide repeats most of these across both pages; each appears once here.
 * "Seat Temperature" is titled from the guide but described from the symbol
 * itself, which shows airflow directed at the seat rather than a heater.
 */
import type { DashboardLight } from '../../schema';
import { DASHBOARD_GUIDE as S } from './source';

export const dieselLights: DashboardLight[] = [
  {
    id: 'dash-speed-limiter', colour: 'white', verified: true, source: S,
    image: require('@/assets/dashboard/dash-speed-limiter.png'),
    title: { en: 'Speed limiter', ar: 'محدّد السرعة', ckb: 'سنووردارکەری خێرایی' },
    meaning: {
      en: 'The speed limiter is switched on.',
      ar: 'محدّد السرعة مفعّل.',
      ckb: 'سنووردارکەری خێرایی چالاکە.',
    },
  },
  {
    id: 'dash-seat-temperature', colour: 'white', verified: true, source: S,
    image: require('@/assets/dashboard/dash-seat-temperature.png'),
    title: { en: 'Seat ventilation', ar: 'تهوية المقعد', ckb: 'هەوادانی کورسی' },
    meaning: {
      en: 'Air is being directed to the seat area by the climate system.',
      ar: 'يقوم نظام التكييف بتوجيه الهواء إلى منطقة المقعد.',
      ckb: 'سیستەمی کەشوهەوا هەوا بەرەو ناوچەی کورسی ئاراستە دەکات.',
    },
  },
  {
    id: 'dash-glow-plug', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-glow-plug.png'),
    title: { en: 'Glow plugs', ar: 'شمعات التسخين', ckb: 'گڵۆپی گەرمکەرەوە' },
    meaning: {
      en: "The diesel glow plugs are warming up. Wait for the light to go out before starting. If it flashes after starting, a glow plug has probably failed.",
      ar: 'شمعات التسخين في محرك الديزل تسخن. انتظر انطفاء المصباح قبل التشغيل. وإذا ومض بعد التشغيل فغالبًا أن إحدى الشمعات تالفة.',
      ckb: 'گڵۆپە گەرمکەرەوەکانی دیزەل گەرم دەبنەوە. چاوەڕێ بکە چراکە بکوژێتەوە پێش پێکردن. ئەگەر دوای پێکردن بلیسەی دا، بەزۆری یەکێکیان خراپ بووە.',
    },
  },
  {
    id: 'dash-fuel-filter', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-fuel-filter.png'),
    title: { en: 'Fuel filter', ar: 'فلتر الوقود', ckb: 'فلتەری سووتەمەنی' },
    meaning: {
      en: 'The diesel fuel filter is full and must be emptied to avoid engine damage.',
      ar: 'فلتر وقود الديزل ممتلئ ويجب تفريغه لتفادي تلف المحرك.',
      ckb: 'فلتەری سووتەمەنی دیزەل پڕە و دەبێت بەتاڵ بکرێت بۆ ڕێگریکردن لە تێکچوونی بزوێنەر.',
    },
  },
  {
    id: 'dash-exhaust-fluid', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-exhaust-fluid.png'),
    title: { en: 'Exhaust fluid low', ar: 'انخفاض سائل العادم', ckb: 'کەمی شلەی دووکەڵ' },
    meaning: {
      en: 'The diesel exhaust fluid reservoir is running low.',
      ar: 'خزان سائل عادم الديزل منخفض.',
      ckb: 'تانکی شلەی دووکەڵی دیزەل کەم بووەتەوە.',
    },
  },
  {
    id: 'dash-adblue-empty', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-adblue-empty.png'),
    title: { en: 'AdBlue empty', ar: 'خزان AdBlue فارغ', ckb: 'تانکی AdBlue بەتاڵە' },
    meaning: {
      en: 'The AdBlue tank is empty and must be refilled with exhaust fluid.',
      ar: 'خزان AdBlue فارغ ويجب تعبئته بسائل العادم.',
      ckb: 'تانکی AdBlue بەتاڵە و دەبێت بە شلەی دووکەڵ پڕ بکرێتەوە.',
    },
    action: {
      en: 'Refill it, because many diesels will not restart once it runs dry.',
      ar: 'أعد تعبئته، فكثير من سيارات الديزل لا تعمل مجددًا عند نفاده.',
      ckb: 'پڕی بکەرەوە، چونکە زۆرێک لە ئۆتۆمبێلە دیزەلییەکان کە تەواو بێت دووبارە پێناکرێنەوە.',
    },
  },
  {
    id: 'dash-adblue-malfunction', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-adblue-malfunction.png'),
    title: { en: 'AdBlue fault', ar: 'خلل في نظام AdBlue', ckb: 'کێشە لە سیستەمی AdBlue' },
    meaning: {
      en: 'The AdBlue system is faulty, or it has been filled with the wrong fluid.',
      ar: 'نظام AdBlue معطّل، أو تمت تعبئته بسائل غير صحيح.',
      ckb: 'سیستەمی AdBlue خراپە، یان بە شلەیەکی هەڵە پڕ کراوەتەوە.',
    },
  },
  {
    id: 'dash-water-in-fuel-filter', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-water-in-fuel-filter.png'),
    title: { en: 'Water in fuel filter', ar: 'ماء في فلتر الوقود', ckb: 'ئاو لە فلتەری سووتەمەنیدا' },
    meaning: {
      en: 'Water in the fuel filter has reached its limit and must be drained.',
      ar: 'بلغ الماء في فلتر الوقود الحد الأقصى ويجب تصريفه.',
      ckb: 'ئاوی ناو فلتەری سووتەمەنی گەیشتووەتە سنووری خۆی و دەبێت بڕژێنرێت.',
    },
  },
  {
    id: 'dash-diesel-particulate-filter', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-diesel-particulate-filter.png'),
    title: { en: 'Diesel particulate filter', ar: 'فلتر جسيمات الديزل', ckb: 'فلتەری تۆزی دیزەل' },
    meaning: {
      en: 'The diesel particulate filter is blocked and needs servicing.',
      ar: 'فلتر جسيمات الديزل مسدود ويحتاج إلى صيانة.',
      ckb: 'فلتەری تۆزی دیزەل گیراوە و پێویستی بە خزمەتگوزارییە.',
    },
  },
];
