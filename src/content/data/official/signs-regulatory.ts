/**
 * العلامات المرورية: علامات مانعة أو تنظيمية — pages 6–11 of the manual.
 * Arabic is verbatim from the source; en/ckb are translations pending review.
 */
import type { TrafficSign } from '../../schema';
import { SIGNS_MANUAL as S } from './source';

export const regulatorySigns: TrafficSign[] = [
  {
    id: 'sign-no-parking', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٦' },
    image: require('@/assets/signs/no-parking.png'),
    title: { ar: 'ممنوع الانتظار', en: 'No waiting', ckb: 'چاوەڕوانکردن قەدەغەیە' },
    meaning: {
      ar: 'ممنوع الانتظار حيث إن الانتظار غير مسموح به في هذا المكان.',
      en: 'Waiting is prohibited: stopping to wait is not permitted at this place.',
      ckb: 'چاوەڕوانکردن قەدەغەیە، چونکە لەم شوێنەدا ڕێگە بە وەستان نادرێت.',
    },
  },
  {
    id: 'sign-no-entry-both-directions', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٦' },
    image: require('@/assets/signs/no-entry-both-directions.png'),
    title: { ar: 'ممنوع المرور في اتجاهين', en: 'No through traffic (both directions)', ckb: 'ڕێپێدان نییە لە هەردوو ئاراستە' },
    meaning: {
      ar: 'طريق مغلق في الاتجاهين أمام مرور جميع أنواع المركبات.',
      en: 'The road is closed in both directions to all types of vehicle.',
      ckb: 'ڕێگاکە لە هەردوو ئاراستەدا داخراوە بۆ هەموو جۆرەکانی ئۆتۆمبێل.',
    },
  },
  {
    id: 'sign-no-u-turn', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٦' },
    image: require('@/assets/signs/no-u-turn.png'),
    title: { ar: 'ممنوع الدوران للخلف', en: 'No U-turn', ckb: 'سوڕانەوە بۆ دواوە قەدەغەیە' },
    meaning: {
      ar: 'منع المركبات من الدوران للخلف.',
      en: 'Vehicles are prohibited from making a U-turn.',
      ckb: 'ئۆتۆمبێلەکان لە سوڕانەوە بۆ دواوە قەدەغە کراون.',
    },
  },
  {
    id: 'sign-no-left-turn', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٦' },
    image: require('@/assets/signs/no-left-turn.png'),
    title: { ar: 'ممنوع الاتجاه لليسار', en: 'No left turn', ckb: 'لادان بۆ چەپ قەدەغەیە' },
    meaning: {
      ar: 'على جميع المركبات الالتزام بعدم الاتجاه إلى جهة اليسار.',
      en: 'All vehicles must not turn to the left.',
      ckb: 'پێویستە هەموو ئۆتۆمبێلەکان بەرەو لای چەپ لانەدەن.',
    },
  },
  {
    id: 'sign-no-right-turn', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٦' },
    image: require('@/assets/signs/no-right-turn.png'),
    title: { ar: 'ممنوع الاتجاه لليمين', en: 'No right turn', ckb: 'لادان بۆ ڕاست قەدەغەیە' },
    meaning: {
      ar: 'على جميع المركبات الالتزام بعدم الاتجاه إلى جهة اليمين.',
      en: 'All vehicles must not turn to the right.',
      ckb: 'پێویستە هەموو ئۆتۆمبێلەکان بەرەو لای ڕاست لانەدەن.',
    },
  },
  {
    id: 'sign-max-height-3-5m', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٧' },
    image: require('@/assets/signs/max-height-3-5m.png'),
    title: { ar: 'أقصى ارتفاع ٣٫٥ متر', en: 'Maximum height 3.5 m', ckb: 'زۆرترین بەرزی ٣٫٥ مەتر' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور سيارة يزيد ارتفاعها على ٣٫٥ مترًا.',
      en: 'The road does not permit a vehicle taller than 3.5 metres to pass.',
      ckb: 'ڕێگاکە ڕێگە نادات بە ئۆتۆمبێلێک کە بەرزییەکەی لە ٣٫٥ مەتر زیاتر بێت.',
    },
  },
  {
    id: 'sign-no-motorcycles', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٧' },
    image: require('@/assets/signs/no-motorcycles.png'),
    title: { ar: 'ممنوع مرور الدراجات النارية', en: 'No motorcycles', ckb: 'ڕێپێدان نییە بۆ ماتۆڕسکیل' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور الدراجات النارية.',
      en: 'The road does not permit motorcycles to pass.',
      ckb: 'ڕێگاکە ڕێگە بە تێپەڕبوونی ماتۆڕسکیل نادات.',
    },
  },
  {
    id: 'sign-no-cars', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٧' },
    image: require('@/assets/signs/no-cars.png'),
    title: { ar: 'ممنوع مرور السيارات', en: 'No cars', ckb: 'ڕێپێدان نییە بۆ ئۆتۆمبێل' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور السيارات ولكن يسمح بمرور باقي المركبات.',
      en: 'The road does not permit cars, but other vehicles may pass.',
      ckb: 'ڕێگاکە ڕێگە بە ئۆتۆمبێل نادات، بەڵام ئامرازە گواستنەوەکانی تر ڕێپێدراون.',
    },
  },
  {
    id: 'sign-no-buses', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٧' },
    image: require('@/assets/signs/no-buses.png'),
    title: { ar: 'ممنوع مرور الحافلات', en: 'No buses', ckb: 'ڕێپێدان نییە بۆ پاس' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور الأوتوبيسات ولكن يسمح بمرور باقي المركبات.',
      en: 'The road does not permit buses, but other vehicles may pass.',
      ckb: 'ڕێگاکە ڕێگە بە پاس نادات، بەڵام ئامرازە گواستنەوەکانی تر ڕێپێدراون.',
    },
  },
  {
    id: 'sign-no-trucks', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٧' },
    image: require('@/assets/signs/no-trucks.png'),
    title: { ar: 'ممنوع مرور الشاحنات', en: 'No lorries', ckb: 'ڕێپێدان نییە بۆ بارهەڵگر' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور الشاحنات ولكن يسمح بمرور باقي المركبات.',
      en: 'The road does not permit lorries, but other vehicles may pass.',
      ckb: 'ڕێگاکە ڕێگە بە بارهەڵگر نادات، بەڵام ئامرازە گواستنەوەکانی تر ڕێپێدراون.',
    },
  },
  {
    id: 'sign-no-cars-motorcycles', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٧' },
    image: require('@/assets/signs/no-cars-motorcycles.png'),
    title: { ar: 'ممنوع مرور السيارات والدراجات النارية', en: 'No cars or motorcycles', ckb: 'ڕێپێدان نییە بۆ ئۆتۆمبێل و ماتۆڕسکیل' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور السيارات والدراجات ولكن يسمح بمرور باقي المركبات.',
      en: 'The road does not permit cars or motorcycles, but other vehicles may pass.',
      ckb: 'ڕێگاکە ڕێگە بە ئۆتۆمبێل و ماتۆڕسکیل نادات، بەڵام ئامرازەکانی تر ڕێپێدراون.',
    },
  },
  {
    id: 'sign-no-animals', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٨' },
    image: require('@/assets/signs/no-animals.png'),
    title: { ar: 'ممنوع مرور الحيوانات', en: 'No animals', ckb: 'ڕێپێدان نییە بۆ ئاژەڵ' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور الحيوانات.',
      en: 'The road does not permit animals to pass.',
      ckb: 'ڕێگاکە ڕێگە بە تێپەڕبوونی ئاژەڵ نادات.',
    },
  },
  {
    id: 'sign-no-trailers', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٨' },
    image: require('@/assets/signs/no-trailers.png'),
    title: { ar: 'ممنوع مرور المقطورات', en: 'No trailers', ckb: 'ڕێپێدان نییە بۆ تریلە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور المقطورات ولكن يسمح بمرور باقي المركبات.',
      en: 'The road does not permit trailers, but other vehicles may pass.',
      ckb: 'ڕێگاکە ڕێگە بە تریلە نادات، بەڵام ئامرازە گواستنەوەکانی تر ڕێپێدراون.',
    },
  },
  {
    id: 'sign-min-distance-50m', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٨' },
    image: require('@/assets/signs/min-distance-50m.png'),
    title: { ar: 'أقل مسافة بين سيارتين ٥٠ مترًا', en: 'Minimum distance between vehicles 50 m', ckb: 'کەمترین دووری نێوان دوو ئۆتۆمبێل ٥٠ مەتر' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يجب توخي الحذر على الطريق وعلى أن تكون المسافة بين السيارات لا تقل عن ٥٠ مترًا منعًا من وقوع الحوادث.',
      en: 'Take care on this road and keep at least 50 metres between vehicles to prevent collisions.',
      ckb: 'دەبێت لەم ڕێگایەدا وریابیت و دووری نێوان ئۆتۆمبێلەکان لە ٥٠ مەتر کەمتر نەبێت بۆ ڕێگری لە ڕووداو.',
    },
  },
  {
    id: 'sign-no-bicycles', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٨' },
    image: require('@/assets/signs/no-bicycles.png'),
    title: { ar: 'ممنوع مرور الدراجات', en: 'No bicycles', ckb: 'ڕێپێدان نییە بۆ پاسکیل' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور الدراجات فقط.',
      en: 'The road does not permit bicycles.',
      ckb: 'ڕێگاکە ڕێگە بە تێپەڕبوونی پاسکیل نادات.',
    },
  },
  {
    id: 'sign-no-handcarts', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٨' },
    image: require('@/assets/signs/no-handcarts.png'),
    title: { ar: 'ممنوع مرور العربات التي تُدفع أو تُجر باليد', en: 'No hand-pushed or hand-drawn carts', ckb: 'ڕێپێدان نییە بۆ عەرەبانەی دەستی' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بمرور العربات التي تُجَرُّ أو تُدْفَعُ باليد.',
      en: 'The road does not permit carts that are pushed or pulled by hand.',
      ckb: 'ڕێگاکە ڕێگە نادات بەو عەرەبانانەی بە دەست پاڵدەنرێن یان ڕادەکێشرێن.',
    },
  },
  {
    id: 'sign-no-pedestrians', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٨' },
    image: require('@/assets/signs/no-pedestrians.png'),
    title: { ar: 'ممنوع مرور المشاة', en: 'No pedestrians', ckb: 'ڕێپێدان نییە بۆ پیادە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق لا يسمح بعبور المشاة (عادة على الطرق السريعة).',
      en: 'The road does not permit pedestrians to cross (usually on expressways).',
      ckb: 'ڕێگاکە ڕێگە بە پەڕینەوەی پیادە نادات (بەزۆری لەسەر ڕێگا خێراکان).',
    },
  },
  {
    id: 'sign-no-horn', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٩' },
    image: require('@/assets/signs/no-horn.png'),
    title: { ar: 'ممنوع استعمال آلة التنبيه', en: 'No horn', ckb: 'بەکارهێنانی بۆری قەدەغەیە' },
    meaning: {
      ar: 'تعني هذه العلامة عدم استخدام آلة التنبيه (عادة بالقرب من مستشفى أو في منطقة سكنية).',
      en: 'Do not use the horn (usually near a hospital or in a residential area).',
      ckb: 'بۆری بەکارمەهێنە (بەزۆری لە نزیک نەخۆشخانە یان لە ناوچەی نیشتەجێبووندا).',
    },
  },
  {
    id: 'sign-horn-allowed', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٩' },
    image: require('@/assets/signs/horn-allowed.png'),
    title: { ar: 'مسموح استخدام آلة التنبيه', en: 'Horn permitted', ckb: 'بەکارهێنانی بۆری ڕێپێدراوە' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يسمح باستخدام آلة التنبيه.',
      en: 'Use of the horn is permitted.',
      ckb: 'ڕێگە بە بەکارهێنانی بۆری دەدرێت.',
    },
  },
  {
    id: 'sign-no-stopping', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٩' },
    image: require('@/assets/signs/no-stopping.png'),
    title: { ar: 'ممنوع الوقوف قطعيًا', en: 'No stopping at all', ckb: 'وەستان بە تەواوی قەدەغەیە' },
    meaning: {
      ar: 'تمنع هذه العلامة الوقوف (نهائيًّا) لجميع المركبات.',
      en: 'Stopping is prohibited entirely, for all vehicles.',
      ckb: 'ئەم هێمایە وەستان بە تەواوی بۆ هەموو ئۆتۆمبێلێک قەدەغە دەکات.',
    },
  },
  {
    id: 'sign-no-entry', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٩' },
    image: require('@/assets/signs/no-entry.png'),
    title: { ar: 'ممنوع الدخول', en: 'No entry', ckb: 'چوونەژوورەوە قەدەغەیە' },
    meaning: {
      ar: 'تمنع هذه العلامة الدخول قطعيًّا.',
      en: 'Entry is absolutely prohibited.',
      ckb: 'ئەم هێمایە چوونەژوورەوە بە تەواوی قەدەغە دەکات.',
    },
  },
  {
    id: 'sign-priority-to-oncoming', category: 'regulatory', verified: true, priority: true, source: { ...S, locator: 'ص ٩' },
    image: require('@/assets/signs/priority-to-oncoming.png'),
    title: { ar: 'الأولوية للقادم', en: 'Priority to oncoming traffic', ckb: 'پێشینەیی بۆ هاتوو' },
    meaning: {
      ar: 'تعطي هذه العلامة الأفضلية للسيارات المواجهة.',
      en: 'This sign gives priority to oncoming vehicles.',
      ckb: 'ئەم هێمایە پێشینەیی دەداتە ئەو ئۆتۆمبێلانەی بەرەوڕووت دێن.',
    },
  },
  {
    id: 'sign-no-overtaking', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ٩' },
    image: require('@/assets/signs/no-overtaking.png'),
    title: { ar: 'ممنوع التجاوز', en: 'No overtaking', ckb: 'تێپەڕاندن قەدەغەیە' },
    meaning: {
      ar: 'تمنع هذه العلامة التجاوز، نظرًا لطبيعة الطريق، عند المنحنيات والمرتفعات.',
      en: 'Overtaking is prohibited because of the nature of the road, at bends and rises.',
      ckb: 'ئەم هێمایە تێپەڕاندن قەدەغە دەکات بەهۆی سروشتی ڕێگاکە، لە خواروخێچ و بەرزاییەکاندا.',
    },
  },
  {
    id: 'sign-end-no-overtaking', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١٠' },
    image: require('@/assets/signs/end-no-overtaking.png'),
    title: { ar: 'نهاية المنع من التخطّي', en: 'End of no-overtaking', ckb: 'کۆتایی قەدەغەکردنی تێپەڕاندن' },
    meaning: {
      ar: 'تسمح هذه العلامة بتجاوز السيارات الأمامية.',
      en: 'Overtaking vehicles ahead is again permitted.',
      ckb: 'ئەم هێمایە ڕێگە دەدات بە تێپەڕاندنی ئۆتۆمبێلەکانی پێشەوە.',
    },
  },
  {
    id: 'sign-no-overtaking-trucks', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١٠' },
    image: require('@/assets/signs/no-overtaking-trucks.png'),
    title: { ar: 'ممنوع التجاوز للشاحنات', en: 'No overtaking by lorries', ckb: 'تێپەڕاندن بۆ بارهەڵگر قەدەغەیە' },
    meaning: {
      ar: 'تمنع هذه العلامة الشاحنات من تخطّي السيارات في هذه المنطقة.',
      en: 'Lorries are prohibited from overtaking cars in this area.',
      ckb: 'ئەم هێمایە بارهەڵگرەکان لە تێپەڕاندنی ئۆتۆمبێل لەم ناوچەیەدا قەدەغە دەکات.',
    },
  },
  {
    id: 'sign-flammable-load', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١٠' },
    image: require('@/assets/signs/flammable-load.png'),
    title: { ar: 'حمولة قابلة للاشتعال', en: 'Flammable load', ckb: 'بارێکی ئاگرگرتوو' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يجب توخي الدقة والحذر أثناء السير نظرًا لوجود مواد قابلة للاشتعال.',
      en: 'Drive with precision and caution: flammable materials are present.',
      ckb: 'دەبێت لە کاتی ڕۆیشتندا وردی و وریایی بگرێتەبەر، چونکە مادەی ئاگرگرتوو هەیە.',
    },
  },
  {
    id: 'sign-max-load-10t', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١٠' },
    image: require('@/assets/signs/max-load-10t.png'),
    title: { ar: 'أقصى حمولة ١٠ طن', en: 'Maximum load 10 tonnes', ckb: 'زۆرترین بار ١٠ تەن' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق غير مجهز فنيًّا لسير مركبات يزيد وزنها على ١٠ طن وذلك لتأثيرها السلبي في الطرق والجسور.',
      en: 'The road is not engineered for vehicles over 10 tonnes, because of their damaging effect on roads and bridges.',
      ckb: 'ڕێگاکە لە ڕووی تەکنیکییەوە ئامادە نییە بۆ ئۆتۆمبێلی سەروو ١٠ تەن، بەهۆی کاریگەری خراپیان لەسەر ڕێگا و پردەکان.',
    },
  },
  {
    id: 'sign-max-width-2m', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١٠' },
    image: require('@/assets/signs/max-width-2m.png'),
    title: { ar: 'أقصى عرض لمرور السيارات ٢ متر', en: 'Maximum width 2 m', ckb: 'زۆرترین پانی ٢ مەتر' },
    meaning: {
      ar: 'تعني هذه العلامة أن عرض الطريق لا يسمح بمرور مركبات عرضها يتجاوز المترين (٢ متر) (توضع هذه العلامة عادة قبل الأنفاق والجسور العلويّة).',
      en: 'The road width does not permit vehicles wider than 2 metres. Usually placed before tunnels and overpasses.',
      ckb: 'پانی ڕێگاکە ڕێگە نادات بە ئۆتۆمبێلی پانتر لە دوو مەتر. بەزۆری پێش تونێل و پردە سەرەوەکان دادەنرێت.',
    },
  },
  {
    id: 'sign-stop', category: 'regulatory', verified: true, priority: true, source: { ...S, locator: 'ص ١٠' },
    image: require('@/assets/signs/stop.png'),
    title: { ar: 'قف', en: 'Stop', ckb: 'وەستە' },
    meaning: {
      ar: 'تعني هذه العلامة ضرورة الوقوف، نظرًا لخطورة مغزاها، ولتنبيه السائقين، وقد تمّ تغيير شكلها من دائري إلى شكل بثماني أضلاع.',
      en: 'Stopping is required. Because of the seriousness of its meaning and to alert drivers, its shape was changed from circular to octagonal.',
      ckb: 'وەستان پێویستە. بەهۆی گرنگی ماناکەی و بۆ ئاگادارکردنەوەی شۆفێران، شێوەکەی لە بازنەییەوە گۆڕدرا بۆ هەشت لایەنە.',
    },
  },
  {
    id: 'sign-speed-limit', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١١' },
    image: require('@/assets/signs/speed-limit.png'),
    title: { ar: 'أقصى حد للسرعة', en: 'Maximum speed limit', ckb: 'زۆرترین سنووری خێرایی' },
    meaning: {
      ar: 'تمنع هذه العلامة جميع المركبات من تجاوز السرعة المشار إليها في هذا الجزء من الطريق، نظرًا لطبيعته وظروفه.',
      en: 'All vehicles are prohibited from exceeding the indicated speed on this section of road, given its nature and conditions.',
      ckb: 'ئەم هێمایە هەموو ئۆتۆمبێلێک لە تێپەڕاندنی ئەو خێراییەی ئاماژەی پێکراوە قەدەغە دەکات لەم بەشەی ڕێگادا.',
    },
  },
  {
    id: 'sign-end-speed-limit', category: 'regulatory', verified: true, source: { ...S, locator: 'ص ١١' },
    image: require('@/assets/signs/end-speed-limit.png'),
    title: { ar: 'نهاية حد السرعة', en: 'End of speed limit', ckb: 'کۆتایی سنووری خێرایی' },
    meaning: {
      ar: 'تعني هذه العلامة نهاية المنع من القيادة بسرعة تفوق السرعة المشار إليها.',
      en: 'The restriction on driving faster than the indicated speed ends here.',
      ckb: 'کۆتایی دێت بەو قەدەغەیەی لێخوڕین بە خێراییەکی زیاتر لەوەی ئاماژەی پێکراوە.',
    },
  },
];
