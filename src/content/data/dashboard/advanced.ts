/**
 * Driver-assistance and comfort tell-tales — pages 8–9 of the source guide.
 */
import type { DashboardLight } from '../../schema';
import { DASHBOARD_GUIDE as S } from './source';

export const advancedLights: DashboardLight[] = [
  {
    id: 'dash-recirculated-cabin-air', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-recirculated-cabin-air.png'),
    title: { en: 'Air recirculation', ar: 'إعادة تدوير الهواء', ckb: 'سووڕانەوەی هەوا' },
    meaning: {
      en: 'The ventilation is recirculating the air already inside the car instead of drawing it from outside.',
      ar: 'نظام التهوية يعيد تدوير الهواء الموجود داخل السيارة بدل سحبه من الخارج.',
      ckb: 'سیستەمی هەوادان ئەو هەوایە دەسوڕێنێتەوە کە لە ناو ئۆتۆمبێلەکەدایە لەبری وەرگرتنی لە دەرەوە.',
    },
  },
  {
    id: 'dash-rear-spoiler', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-rear-spoiler.png'),
    title: { en: 'Rear spoiler', ar: 'الجناح الخلفي', ckb: 'سپۆیلەری دواوە' },
    meaning: {
      en: 'There is a fault in the rear spoiler system.',
      ar: 'هناك خلل في نظام الجناح الخلفي.',
      ckb: 'کێشەیەک لە سیستەمی سپۆیلەری دواوەدا هەیە.',
    },
  },
  {
    id: 'dash-park-assist', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-park-assist.png'),
    title: { en: 'Park assist', ar: 'مساعد الركن', ckb: 'یارمەتیدەری پارک' },
    meaning: {
      en: 'The park assist system is active.',
      ar: 'نظام مساعد الركن مفعّل.',
      ckb: 'سیستەمی یارمەتیدەری پارک چالاکە.',
    },
  },
  {
    id: 'dash-lane-departure', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-lane-departure.png'),
    title: { en: 'Lane departure', ar: 'مغادرة المسار', ckb: 'دەرچوون لە لەین' },
    meaning: {
      en: 'The car is drifting out of its lane without the indicator on.',
      ar: 'السيارة تغادر مسارها دون تشغيل إشارة الانعطاف.',
      ckb: 'ئۆتۆمبێلەکە بەبێ داگیرساندنی ئیشارەت لە لەینەکەی دەردەچێت.',
    },
  },
  {
    id: 'dash-lane-assist', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-lane-assist.png'),
    title: { en: 'Lane assist', ar: 'مساعد البقاء في المسار', ckb: 'یارمەتیدەری لەین' },
    meaning: {
      en: 'Lane assist is switched on and can see the road markings.',
      ar: 'نظام مساعد المسار مفعّل ويستطيع قراءة خطوط الطريق.',
      ckb: 'یارمەتیدەری لەین چالاکە و دەتوانێت هێڵەکانی سەر ڕێگا ببینێت.',
    },
  },
  {
    id: 'dash-key-fob-battery', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-key-fob-battery.png'),
    title: { en: 'Key battery low', ar: 'انخفاض بطارية المفتاح', ckb: 'کەمی پاتری کلیل' },
    meaning: {
      en: 'The battery in the remote key needs replacing.',
      ar: 'بطارية المفتاح تحتاج إلى تبديل.',
      ckb: 'پاتری کلیلە کۆنترۆڵەکە پێویستی بە گۆڕینە.',
    },
  },
  {
    id: 'dash-ignition-switch', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-ignition-switch.png'),
    title: { en: 'Ignition fault', ar: 'خلل في نظام التشغيل', ckb: 'کێشە لە سیستەمی پێکردن' },
    meaning: {
      en: 'There is a problem with the ignition system or the key itself.',
      ar: 'هناك مشكلة في نظام التشغيل أو في المفتاح نفسه.',
      ckb: 'کێشەیەک لە سیستەمی پێکردن یان خودی کلیلەکەدا هەیە.',
    },
  },
  {
    id: 'dash-hill-descent-control', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-hill-descent-control.png'),
    title: { en: 'Hill descent control', ar: 'التحكم بالنزول على المنحدرات', ckb: 'کۆنترۆڵی دابەزینی بنار' },
    meaning: {
      en: 'The system is active and holding a steady speed down the slope.',
      ar: 'النظام مفعّل ويحافظ على سرعة ثابتة أثناء النزول.',
      ckb: 'سیستەمەکە چالاکە و خێراییەکی جێگیر لە دابەزیندا دەپارێزێت.',
    },
  },
  {
    id: 'dash-forward-collision', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-forward-collision.png'),
    title: { en: 'Forward collision warning', ar: 'تحذير من اصطدام أمامي', ckb: 'ئاگاداری پێکدادانی پێشەوە' },
    meaning: {
      en: 'A possible collision with the vehicle ahead has been detected.',
      ar: 'تم رصد احتمال اصطدام بالمركبة التي أمامك.',
      ckb: 'ئەگەری پێکدادان لەگەڵ ئۆتۆمبێلی پێشەوە دۆزراوەتەوە.',
    },
    action: {
      en: 'Brake now. This warning only fires when a crash is close.',
      ar: 'اضغط الفرامل، فهذا التحذير لا يظهر إلا عند اقتراب الاصطدام.',
      ckb: 'بڕێک بگرە، چونکە ئەم ئاگادارییە تەنها کاتێک دەردەکەوێت کە پێکدادان نزیک بێت.',
    },
  },
  {
    id: 'dash-eco-driving', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-eco-driving.png'),
    title: { en: 'Eco mode', ar: 'وضع الاقتصاد', ckb: 'دۆخی ئیکۆ' },
    meaning: {
      en: 'The economy driving mode is switched on.',
      ar: 'وضع القيادة الاقتصادية مفعّل.',
      ckb: 'دۆخی لێخوڕینی ئابووری چالاکە.',
    },
  },
  {
    id: 'dash-cruise-control', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-cruise-control.png'),
    title: { en: 'Cruise control', ar: 'مثبّت السرعة', ckb: 'جێگیرکەری خێرایی' },
    meaning: {
      en: 'Cruise control is switched on.',
      ar: 'مثبّت السرعة مفعّل.',
      ckb: 'جێگیرکەری خێرایی چالاکە.',
    },
  },
  {
    id: 'dash-convertible-roof', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-convertible-roof.png'),
    title: { en: 'Convertible roof', ar: 'السقف المكشوف', ckb: 'سەقفی کراوە' },
    meaning: {
      en: 'The roof is opening or closing. If it stays lit, the roof is not fully closed or the system has a fault.',
      ar: 'السقف في طور الفتح أو الإغلاق. وإذا بقي المصباح مضاءً فالسقف غير مغلق تمامًا أو أن هناك خللًا.',
      ckb: 'سەقفەکە لە کاتی کردنەوە یان داخستندایە. ئەگەر داگیرساو مایەوە، سەقفەکە بە تەواوی داخراو نییە یان کێشەی هەیە.',
    },
  },
  {
    id: 'dash-brake-hold', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-brake-hold.png'),
    title: { en: 'Brake hold', ar: 'تثبيت الفرامل', ckb: 'گرتنی بڕێک' },
    meaning: {
      en: 'The automatic brake hold system is working, keeping the car still without the pedal.',
      ar: 'نظام تثبيت الفرامل يعمل ويُبقي السيارة ثابتة دون الضغط على الدواسة.',
      ckb: 'سیستەمی گرتنی ئۆتۆماتیکی بڕێک کار دەکات و ئۆتۆمبێلەکە بەبێ پێدان ڕادەگرێت.',
    },
  },
  {
    id: 'dash-blind-spot', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-blind-spot.png'),
    title: { en: 'Blind spot', ar: 'المنطقة العمياء', ckb: 'خاڵی کوێر' },
    meaning: {
      en: 'A vehicle or obstacle has been detected in your blind spot.',
      ar: 'تم رصد مركبة أو عائق في المنطقة العمياء.',
      ckb: 'ئۆتۆمبێلێک یان تەگەرەیەک لە خاڵی کوێرەکەتدا دۆزراوەتەوە.',
    },
    action: {
      en: 'Do not change lane until it clears.',
      ar: 'لا تغيّر المسار حتى تخلو المنطقة.',
      ckb: 'لەین مەگۆڕە هەتا چۆڵ دەبێت.',
    },
  },
  {
    id: 'dash-auto-wipers', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-auto-wipers.png'),
    title: { en: 'Automatic wipers', ar: 'المساحات التلقائية', ckb: 'سڕەرەوەی ئۆتۆماتیک' },
    meaning: {
      en: 'The windscreen wipers are running in automatic mode.',
      ar: 'المساحات تعمل في الوضع التلقائي.',
      ckb: 'سڕەرەوەکان لە دۆخی ئۆتۆماتیکدا کار دەکەن.',
    },
  },
  {
    id: 'dash-aeb', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-aeb.png'),
    title: { en: 'Automatic emergency braking', ar: 'الكبح الطارئ التلقائي', ckb: 'بڕێکی فریاگوزاری ئۆتۆماتیک' },
    meaning: {
      en: 'The emergency braking system is switched off, or its radar is blocked by dirt or snow.',
      ar: 'نظام الكبح الطارئ متوقف، أو أن الرادار الخاص به محجوب بالأوساخ أو الثلج.',
      ckb: 'سیستەمی بڕێکی فریاگوزاری کوژێنراوەتەوە، یان ڕادارەکەی بە پیس یان بەفر داپۆشراوە.',
    },
  },
  {
    id: 'dash-adaptive-cruise-control', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-adaptive-cruise-control.png'),
    title: { en: 'Adaptive cruise control', ar: 'مثبّت السرعة التكيّفي', ckb: 'جێگیرکەری خێرایی گونجاو' },
    meaning: {
      en: 'Adaptive cruise control is running and holding a gap to the car ahead.',
      ar: 'مثبّت السرعة التكيّفي يعمل ويحافظ على مسافة من المركبة التي أمامك.',
      ckb: 'جێگیرکەری خێرایی گونجاو کار دەکات و مەودا لەگەڵ ئۆتۆمبێلی پێشەوە دەپارێزێت.',
    },
  },
  {
    id: 'dash-winter-mode', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-winter-mode.png'),
    title: { en: 'Winter mode', ar: 'الوضع الشتوي', ckb: 'دۆخی زستان' },
    meaning: {
      en: 'The car is running in winter driving mode.',
      ar: 'السيارة تعمل في وضع القيادة الشتوي.',
      ckb: 'ئۆتۆمبێلەکە لە دۆخی لێخوڕینی زستاندا کار دەکات.',
    },
  },
  {
    id: 'dash-start-stop', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-start-stop.png'),
    title: { en: 'Stop/start system', ar: 'نظام التشغيل والإيقاف', ckb: 'سیستەمی وەستان و پێکردن' },
    meaning: {
      en: 'The stop/start system is active and has shut the engine down while you wait.',
      ar: 'نظام التشغيل والإيقاف مفعّل وقد أوقف المحرك أثناء الانتظار.',
      ckb: 'سیستەمی وەستان و پێکردن چالاکە و لە کاتی چاوەڕوانیدا بزوێنەرەکەی کوژاندووەتەوە.',
    },
  },
];
