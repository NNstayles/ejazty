/**
 * العلامات المرورية: علامات إرشادية أو توجيهية، علامات أرضيّة، إشارات ضوئيّة
 * — pages 18–28 of the manual.
 * Arabic is verbatim from the source; en/ckb are translations pending review.
 */
import type { TrafficSign } from '../../schema';
import { SIGNS_MANUAL as S } from './source';

export const informativeSigns: TrafficSign[] = [
  {
    id: 'sign-mandatory-right-ahead', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٨' },
    image: require('@/assets/signs/mandatory-right-ahead.png'),
    title: { ar: 'أمامك اتجاه إجباري إلى اليمين', en: 'Mandatory right turn ahead', ckb: 'ئاراستەی ناچاری بۆ ڕاست لە پێشەوە' },
    meaning: { ar: 'تعني هذه العلامة أن الطريق يتجه نحو اليمين فقط.', en: 'The road goes to the right only.', ckb: 'ڕێگاکە تەنها بەرەو لای ڕاست دەڕوات.' },
  },
  {
    id: 'sign-mandatory-straight-or-left', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٨' },
    image: require('@/assets/signs/mandatory-straight-or-left.png'),
    title: { ar: 'اتجاهات سير إجباري', en: 'Mandatory directions: straight or left', ckb: 'ئاراستەی ناچاری: ڕاست بەرەوپێش یان چەپ' },
    meaning: { ar: 'تعني هذه العلامة أنه يجب على المركبات جميعها الالتزام بالسير إلى الأمام أو إلى اليسار.', en: 'All vehicles must travel straight ahead or to the left.', ckb: 'دەبێت هەموو ئۆتۆمبێلەکان بەرەوپێش یان بەرەو چەپ بڕۆن.' },
  },
  {
    id: 'sign-keep-left', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٨' },
    image: require('@/assets/signs/keep-left.png'),
    title: { ar: 'الزم اليسار', en: 'Keep left', ckb: 'پابەند بە بە چەپ' },
    meaning: { ar: 'تعني هذه العلامة أنه يجب على المركبات جميعها الالتزام بيسار الطريق.', en: 'All vehicles must keep to the left of the road.', ckb: 'دەبێت هەموو ئۆتۆمبێلەکان پابەند بن بە لای چەپی ڕێگاکە.' },
  },
  {
    id: 'sign-keep-right', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٨' },
    image: require('@/assets/signs/keep-right.png'),
    title: { ar: 'الزم اليمين', en: 'Keep right', ckb: 'پابەند بە بە ڕاست' },
    meaning: { ar: 'تعني هذه العلامة أنه يجب على المركبات جميعها الالتزام بيمين الطريق.', en: 'All vehicles must keep to the right of the road.', ckb: 'دەبێت هەموو ئۆتۆمبێلەکان پابەند بن بە لای ڕاستی ڕێگاکە.' },
  },
  {
    id: 'sign-mandatory-roundabout', category: 'informative', verified: true, priority: true, source: { ...S, locator: 'ص ١٨' },
    image: require('@/assets/signs/mandatory-roundabout.png'),
    title: { ar: 'اتجاه مستدير', en: 'Mandatory roundabout', ckb: 'ئاراستەی بازنەیی' },
    meaning: { ar: 'تعني هذه العلامة أن الطريق دائري إلى الأمام.', en: 'The road ahead is circular.', ckb: 'ڕێگاکەی پێشەوە بازنەییە.' },
  },
  {
    id: 'sign-mandatory-straight', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٩' },
    image: require('@/assets/signs/mandatory-straight.png'),
    title: { ar: 'اتجاه إجباري إلى الأمام', en: 'Mandatory straight ahead', ckb: 'ئاراستەی ناچاری بەرەوپێش' },
    meaning: { ar: 'تعني هذه العلامة أن اتجاه السير هو إلى الأمام فقط.', en: 'The direction of travel is straight ahead only.', ckb: 'ئاراستەی ڕۆیشتن تەنها بەرەوپێشە.' },
  },
  {
    id: 'sign-keep-left-exit', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٩' },
    image: require('@/assets/signs/keep-left-exit.png'),
    title: { ar: 'إلزم اليسار', en: 'Keep left (at exits)', ckb: 'پابەند بە بە چەپ (لە دەرچەکان)' },
    meaning: { ar: 'تُلزِم هذه العلامة سائقي المركبات بالسير لجهة اليسار وغالبًا ما تكون عند مخارج الطرق.', en: 'Obliges drivers to travel to the left; usually found at road exits.', ckb: 'شۆفێران ناچار دەکات بەرەو لای چەپ بڕۆن؛ بەزۆری لە دەرچەی ڕێگاکاندایە.' },
  },
  {
    id: 'sign-mandatory-left-ahead', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٩' },
    image: require('@/assets/signs/mandatory-left-ahead.png'),
    title: { ar: 'أمامك اتجاه إجباري إلى اليسار', en: 'Mandatory left turn ahead', ckb: 'ئاراستەی ناچاری بۆ چەپ لە پێشەوە' },
    meaning: { ar: 'تعني هذه العلامة أن الطريق يتجه نحو اليسار فقط.', en: 'The road goes to the left only.', ckb: 'ڕێگاکە تەنها بەرەو لای چەپ دەڕوات.' },
  },
  {
    id: 'sign-mandatory-pedestrian-path', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٩' },
    image: require('@/assets/signs/mandatory-pedestrian-path.png'),
    title: { ar: 'طريق إجباري للمشاة', en: 'Mandatory pedestrian route', ckb: 'ڕێگای ناچاری بۆ پیادە' },
    meaning: { ar: 'تعني هذه العلامة أن هذا الطريق إجباري لعبور المشاة.', en: 'This route is compulsory for pedestrians crossing.', ckb: 'ئەم ڕێگایە بۆ پەڕینەوەی پیادە ناچارییە.' },
  },
  {
    id: 'sign-mandatory-speed-30', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٩' },
    image: require('@/assets/signs/mandatory-speed-30.png'),
    title: { ar: 'سرعة إجبارية', en: 'Mandatory speed', ckb: 'خێرایی ناچاری' },
    meaning: { ar: 'تعني هذه العلامة أنه يجب على سائقي المركبات عدم زيادة السرعة على ٣٠ كم/ساعة.', en: 'Drivers must not exceed 30 km/h.', ckb: 'دەبێت شۆفێران خێرایی لە ٣٠ کم/کاتژمێر زیاتر نەکەن.' },
  },
  {
    id: 'sign-mandatory-right-or-left', category: 'informative', verified: true, source: { ...S, locator: 'ص ١٩' },
    image: require('@/assets/signs/mandatory-right-or-left.png'),
    title: { ar: 'أمامك اتجاه إجباري نحو اليمين ونحو اليسار', en: 'Mandatory right or left ahead', ckb: 'ئاراستەی ناچاری بۆ ڕاست یان چەپ' },
    meaning: { ar: 'تعني هذه العلامة أنه يجب على جميع سائقي المركبات التوجه الإجباري نحو اليمين ونحو اليسار.', en: 'All drivers must turn either right or left.', ckb: 'دەبێت هەموو شۆفێران بەرەو ڕاست یان چەپ بڕۆن.' },
  },
  {
    id: 'sign-pass-either-side', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٠' },
    image: require('@/assets/signs/pass-either-side.png'),
    title: { ar: 'المرور على أحد جانبي الطريق', en: 'Pass on either side', ckb: 'تێپەڕبوون بە یەکێک لە دوو لای ڕێگا' },
    meaning: { ar: 'تعني هذه العلامة أنه يجب المرور على أحد جانبي الطريق: الأيسر والأيمن.', en: 'You must pass on one of the two sides of the road, left or right.', ckb: 'دەبێت بە یەکێک لە دوو لای ڕێگاکەدا تێپەڕیت: چەپ یان ڕاست.' },
  },
  {
    id: 'sign-end-of-priority', category: 'informative', verified: true, priority: true, source: { ...S, locator: 'ص ٢٠' },
    image: require('@/assets/signs/end-of-priority.png'),
    title: { ar: 'انتهاء أولوية المرور', en: 'End of priority', ckb: 'کۆتایی پێشینەیی هاتوچۆ' },
    meaning: { ar: 'تعني هذه العلامة الانتهاء من أولويَّة المرور وأنّه بإمكان جميع السيارات استخدام الطريق.', en: 'Priority of way ends here and all vehicles may use the road.', ckb: 'پێشینەیی هاتوچۆ کۆتایی دێت و هەموو ئۆتۆمبێلێک دەتوانێت ڕێگاکە بەکاربهێنێت.' },
  },
  {
    id: 'sign-priority-road', category: 'informative', verified: true, priority: true, source: { ...S, locator: 'ص ٢٠' },
    image: require('@/assets/signs/priority-road.png'),
    title: { ar: 'طريق له الأولوية في المرور', en: 'Priority road', ckb: 'ڕێگای خاوەن پێشینەیی' },
    meaning: { ar: 'تعني هذه العلامة أن الطريق له الأولويّة في المرور.', en: 'This road has priority of way.', ckb: 'ئەم ڕێگایە پێشینەیی هەیە لە هاتوچۆدا.' },
  },
  {
    id: 'sign-mandatory-animal-path', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٠' },
    image: require('@/assets/signs/mandatory-animal-path.png'),
    title: { ar: 'طريق إجباري للحيوانات', en: 'Mandatory route for animals', ckb: 'ڕێگای ناچاری بۆ ئاژەڵ' },
    meaning: { ar: 'تعني هذه العلامة أن هذا الطريق مخصّص لعبور الحيوانات فقط.', en: 'This route is reserved for animals crossing only.', ckb: 'ئەم ڕێگایە تەنها بۆ پەڕینەوەی ئاژەڵ تەرخانکراوە.' },
  },
  {
    id: 'sign-mandatory-cycle-path', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٠' },
    image: require('@/assets/signs/mandatory-cycle-path.png'),
    title: { ar: 'طريق إجباري للدراجات', en: 'Mandatory cycle route', ckb: 'ڕێگای ناچاری بۆ پاسکیل' },
    meaning: { ar: 'تعني هذه العلامة أن هذا الطريق مخصّص لسير الدراجات.', en: 'This route is reserved for bicycles.', ckb: 'ئەم ڕێگایە بۆ ڕۆیشتنی پاسکیل تەرخانکراوە.' },
  },
  {
    id: 'sign-restaurant', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢١' },
    image: require('@/assets/signs/restaurant.png'),
    title: { ar: 'مطعم', en: 'Restaurant', ckb: 'چێشتخانە' },
    meaning: { ar: 'تعني هذه العلامة وجود مطعم في هذه المنطقة.', en: 'There is a restaurant in this area.', ckb: 'چێشتخانەیەک لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-fuel-station', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢١' },
    image: require('@/assets/signs/fuel-station.png'),
    title: { ar: 'محطة وقود', en: 'Fuel station', ckb: 'بنکەی سووتەمەنی' },
    meaning: { ar: 'تعني هذه العلامة وجود محطة للوقود في هذه المنطقة.', en: 'There is a fuel station in this area.', ckb: 'بنکەیەکی سووتەمەنی لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-repair-centre', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢١' },
    image: require('@/assets/signs/repair-centre.png'),
    title: { ar: 'مركز للتصليح', en: 'Repair centre', ckb: 'ناوەندی چاککردنەوە' },
    meaning: { ar: 'تعني هذه العلامة وجود مركز للتصليح في هذه المنطقة.', en: 'There is a repair centre in this area.', ckb: 'ناوەندێکی چاککردنەوە لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-first-aid', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢١' },
    image: require('@/assets/signs/first-aid.png'),
    title: { ar: 'مركز إسعاف', en: 'First-aid centre', ckb: 'ناوەندی فریاگوزاری' },
    meaning: { ar: 'تعني هذه العلامة وجود مركز إسعاف في هذه المنطقة.', en: 'There is a first-aid centre in this area.', ckb: 'ناوەندێکی فریاگوزاری لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-camping', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢١' },
    image: require('@/assets/signs/camping.png'),
    title: { ar: 'مخيّم', en: 'Campsite', ckb: 'خێوەتگە' },
    meaning: { ar: 'تعني هذه العلامة وجود مخيَّم في هذه المنطقة.', en: 'There is a campsite in this area.', ckb: 'خێوەتگەیەک لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-bus-stop', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٢' },
    image: require('@/assets/signs/bus-stop.png'),
    title: { ar: 'موقف حافلات', en: 'Bus stop', ckb: 'وێستگەی پاس' },
    meaning: { ar: 'تعني هذه العلامة وجود موقف للحافلات في هذه المنطقة.', en: 'There is a bus stop in this area.', ckb: 'وێستگەیەکی پاس لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-telephone', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٢' },
    image: require('@/assets/signs/telephone.png'),
    title: { ar: 'تلفون', en: 'Telephone', ckb: 'تەلەفۆن' },
    meaning: { ar: 'تعني هذه العلامة وجود هاتف في هذه المنطقة.', en: 'There is a telephone in this area.', ckb: 'تەلەفۆنێک لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-diversion', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٢' },
    image: require('@/assets/signs/diversion.png'),
    title: { ar: 'تحويلة', en: 'Diversion', ckb: 'ڕێگای گۆڕدراو' },
    meaning: { ar: 'تعني هذه العلامة وجود تحويلة في هذه المنطقة لذلك يجب توخّي الدّقة والحذر وتخفيف السرعة.', en: 'There is a diversion in this area; be precise, careful and reduce speed.', ckb: 'ڕێگایەکی گۆڕدراو لەم ناوچەیەدا هەیە؛ وریا بە و خێرایی کەم بکەرەوە.' },
  },
  {
    id: 'sign-dead-end', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٢' },
    image: require('@/assets/signs/dead-end.png'),
    title: { ar: 'طريق مغلق', en: 'Dead end', ckb: 'ڕێگای داخراو' },
    meaning: { ar: 'تعني هذه العلامة أن الطريق غير نافذ.', en: 'The road is a dead end.', ckb: 'ڕێگاکە دەرچەی نییە.' },
  },
  {
    id: 'sign-hospital', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٢' },
    image: require('@/assets/signs/hospital.png'),
    title: { ar: 'مستشفى', en: 'Hospital', ckb: 'نەخۆشخانە' },
    meaning: { ar: 'تعني هذه العلامة وجود مستشفى في هذه المنطقة.', en: 'There is a hospital in this area.', ckb: 'نەخۆشخانەیەک لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-parking', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٢' },
    image: require('@/assets/signs/parking.png'),
    title: { ar: 'موقف سيارات', en: 'Car park', ckb: 'شوێنی ڕاگرتنی ئۆتۆمبێل' },
    meaning: { ar: 'تعني هذه العلامة وجود موقف للسيارات في هذه المنطقة.', en: 'There is a car park in this area.', ckb: 'شوێنی ڕاگرتنی ئۆتۆمبێل لەم ناوچەیەدا هەیە.' },
  },
  {
    id: 'sign-single-vehicle-road', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٣' },
    image: require('@/assets/signs/single-vehicle-road.png'),
    title: { ar: 'الطريق يسمح بمرور سيارة واحدة', en: 'Road admits one vehicle only', ckb: 'ڕێگا تەنها ڕێگە بە یەک ئۆتۆمبێل دەدات' },
    meaning: { ar: 'تعني هذه العلامة أن هذا الطريق لا يسمح إلا بمرور سيارة واحدة فقط.', en: 'This road permits only one vehicle to pass at a time.', ckb: 'ئەم ڕێگایە تەنها ڕێگە بە تێپەڕبوونی یەک ئۆتۆمبێل دەدات.' },
  },
  {
    id: 'sign-motorway-start', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٣' },
    image: require('@/assets/signs/motorway-start.png'),
    title: { ar: 'بداية الطريق الدولي', en: 'Start of the international road', ckb: 'دەستپێکی ڕێگای نێودەوڵەتی' },
    meaning: { ar: 'تعني هذه العلامة أن الطريق القادم هو بداية طريق دولي.', en: 'The road ahead is the beginning of an international road.', ckb: 'ڕێگای پێشەوە دەستپێکی ڕێگایەکی نێودەوڵەتییە.' },
  },
  {
    id: 'sign-cars-only-road', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٣' },
    image: require('@/assets/signs/cars-only-road.png'),
    title: { ar: 'طريق مخصص للسيارات فقط', en: 'Road for cars only', ckb: 'ڕێگا تەنها بۆ ئۆتۆمبێل' },
    meaning: { ar: 'تعني هذه العلامة أن هذا الطريق مخصّص لسير السيارات فقط من دون المركبات الأخرى.', en: 'This road is reserved for cars only, excluding other vehicles.', ckb: 'ئەم ڕێگایە تەنها بۆ ڕۆیشتنی ئۆتۆمبێل تەرخانکراوە، بەبێ ئامرازەکانی تر.' },
  },
  {
    id: 'sign-disabled-parking', category: 'informative', verified: true, source: { ...S, locator: 'ص ٢٣' },
    image: require('@/assets/signs/disabled-parking.png'),
    title: { ar: 'موقف المعوَّقين', en: 'Disabled parking', ckb: 'شوێنی ڕاگرتنی کەمئەندامان' },
    meaning: { ar: 'تعني هذه العلامة أنّ هذا الجزء من الطريق مخصَّص للأفراد المعوّقين، ولسير عجلاتهم فقط.', en: 'This part of the road is reserved for disabled people and their vehicles only.', ckb: 'ئەم بەشەی ڕێگاکە تەنها بۆ کەمئەندامان و ئۆتۆمبێلەکانیان تەرخانکراوە.' },
  },

  // ---- علامات أرضيّة (road markings) — pages 24–26 ----
  {
    id: 'mark-no-overtaking-double-solid', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٤' },
    image: require('@/assets/signs/mark-no-overtaking-double-solid.png'),
    title: { ar: 'ممنوع التجاوز قطعيًّا', en: 'No overtaking at all (double solid line)', ckb: 'تێپەڕاندن بە تەواوی قەدەغەیە' },
    meaning: { ar: 'خطّان متّصلان: في هذه الحالة لا يسمح بالتخطِّي للسيارات في الاتجاهين.', en: 'Two solid lines: overtaking is not permitted in either direction.', ckb: 'دوو هێڵی پێکەوەبەستراو: ڕێگە بە تێپەڕاندن نادرێت لە هیچ ئاراستەیەکدا.' },
  },
  {
    id: 'mark-overtake-allowed-right', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٤' },
    image: require('@/assets/signs/mark-overtake-allowed-right.png'),
    title: { ar: 'مسموح التجاوز في اتجاه واحد [اليمين]', en: 'Overtaking allowed in one direction (right)', ckb: 'تێپەڕاندن لە یەک ئاراستە ڕێپێدراوە (ڕاست)' },
    meaning: { ar: 'الخط المتقطّع على يسار السائق يسمح بالتخطِّي من ناحية هذا الخط، ويمنع المركبات القادمة من الاتجاه المعاكس.', en: 'The broken line on the driver’s left permits overtaking from that side, and prohibits it for vehicles coming the other way.', ckb: 'هێڵە پچڕپچڕەکەی لای چەپی شۆفێر ڕێگە بە تێپەڕاندن دەدات لەو لاوە، و قەدەغەی دەکات بۆ هاتووەکانی ئاراستەی پێچەوانە.' },
  },
  {
    id: 'mark-overtake-allowed-left', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٤' },
    image: require('@/assets/signs/mark-overtake-allowed-left.png'),
    title: { ar: 'مسموح التجاوز في اتجاه واحد [اليسار]', en: 'Overtaking allowed in one direction (left)', ckb: 'تێپەڕاندن لە یەک ئاراستە ڕێپێدراوە (چەپ)' },
    meaning: { ar: 'الخط المتقطع على يمين السائق يسمح بالتخطِّي للمركبات القادمة في الاتجاه المعاكس من ناحية الخط المتقطع فقط.', en: 'The broken line on the driver’s right permits overtaking only for vehicles coming from the opposite direction, on the side of the broken line.', ckb: 'هێڵە پچڕپچڕەکەی لای ڕاستی شۆفێر تەنها ڕێگە بە تێپەڕاندن دەدات بۆ ئەوانەی لە ئاراستەی پێچەوانەوە دێن.' },
  },
  {
    id: 'mark-hatched-separation', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٤' },
    image: require('@/assets/signs/mark-hatched-separation.png'),
    title: { ar: 'منطقة فاصلة بين اتجاهين', en: 'Hatched area separating two directions', ckb: 'ناوچەی جیاکەرەوەی نێوان دوو ئاراستە' },
    meaning: { ar: 'مساحة مرسومة يُمنع الدخول إليها أو الانتظار فيها أو السير عليها أو الانحراف من خلالها.', en: 'A marked area that must not be entered, waited in, driven over, or cut across.', ckb: 'ڕووبەرێکی نیشانکراو کە چوونەژوورەوە، وەستان، ڕۆیشتن بەسەریدا یان لادان بەناویدا قەدەغەیە.' },
  },
  {
    id: 'mark-broken-line', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٥' },
    image: require('@/assets/signs/mark-broken-line.png'),
    title: { ar: 'خط متقطع [مسموح بالتخطي]', en: 'Broken line (overtaking permitted)', ckb: 'هێڵی پچڕپچڕ (تێپەڕاندن ڕێپێدراوە)' },
    meaning: { ar: 'الخط الأبيض المتقطّع على الطريق يشير إلى إمكانية التخطِّي لتغيير مكان السير إذا كانت حالة الطريق تسمح بذلك.', en: 'A broken white line indicates you may cross to change lane if road conditions allow.', ckb: 'هێڵی سپی پچڕپچڕ ئاماژەیە بۆ ئەگەری تێپەڕاندن بۆ گۆڕینی لاین، ئەگەر بارودۆخی ڕێگا ڕێگە بدات.' },
  },
  {
    id: 'mark-junction-with-main', category: 'roadmarking', verified: true, priority: true, source: { ...S, locator: 'ص ٢٥' },
    image: require('@/assets/signs/mark-junction-with-main.png'),
    title: { ar: 'التقاء الطريق بآخر رئيس', en: 'Road meeting a main road', ckb: 'یەکگرتنی ڕێگا لەگەڵ ڕێگایەکی سەرەکی' },
    meaning: { ar: 'يدل على انتهاء طريق والتوجّه نحو طريق جديد له أولوية.', en: 'Indicates a road ending and joining a new road that has priority.', ckb: 'ئاماژە بە کۆتاییهاتنی ڕێگایەک و ڕوانگە بۆ ڕێگایەکی نوێ کە پێشینەیی هەیە.' },
  },
  {
    id: 'mark-white-right-edge', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٥' },
    image: require('@/assets/signs/mark-white-right-edge.png'),
    title: { ar: 'خط أبيض على يمين الطريق', en: 'White line on the right edge', ckb: 'هێڵی سپی لەسەر لای ڕاستی ڕێگا' },
    meaning: { ar: 'الخط الأبيض المتّصل الموجود على الجانب الأيمن من الطريق يمنع القيادة على يمين الخط.', en: 'The solid white line on the right-hand side prohibits driving to the right of it.', ckb: 'هێڵی سپی پێکەوەبەستراوی لای ڕاست، لێخوڕین لە ڕاستی هێڵەکە قەدەغە دەکات.' },
  },
  {
    id: 'mark-white-solid-centre', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٥' },
    image: require('@/assets/signs/mark-white-solid-centre.png'),
    title: { ar: 'خط أبيض متواصل في وسط الطريق', en: 'Solid white line in the centre', ckb: 'هێڵی سپی بەردەوام لە ناوەڕاستی ڕێگا' },
    meaning: { ar: 'الخط الأبيض المتواصل وسط الطريق يمنع الانتقال من جهة إلى أخرى.', en: 'A continuous white line in the centre prohibits moving from one side to the other.', ckb: 'هێڵی سپی بەردەوامی ناوەڕاست، گواستنەوە لە لایەکەوە بۆ لایەکی تر قەدەغە دەکات.' },
  },
  {
    id: 'mark-yellow-solid-left-edge', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٥' },
    image: require('@/assets/signs/mark-yellow-solid-left-edge.png'),
    title: { ar: 'خط أصفر متصل على يسار الطريق', en: 'Solid yellow line on the left edge', ckb: 'هێڵی زەردی پێکەوەبەستراو لە لای چەپی ڕێگا' },
    meaning: { ar: 'خط أصفر متّصل يحدّد الحافة اليسرى على الطرق ذات الاتجاه الواحد.', en: 'A solid yellow line marking the left edge on one-way roads.', ckb: 'هێڵێکی زەردی پێکەوەبەستراو کە لێواری چەپ دیاری دەکات لە ڕێگا یەک ئاراستەکاندا.' },
  },
  {
    id: 'mark-yellow-solid-centre', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٦' },
    image: require('@/assets/signs/mark-yellow-solid-centre.png'),
    title: { ar: 'خط أصفر متصل في وسط الطريق', en: 'Solid yellow line in the centre', ckb: 'هێڵی زەردی پێکەوەبەستراو لە ناوەڕاست' },
    meaning: { ar: 'خط أصفر متصّل يمنع التجاوز للمركبات في الاتجاهات المعاكسة.', en: 'A solid yellow line prohibits overtaking for vehicles in opposing directions.', ckb: 'هێڵی زەردی پێکەوەبەستراو تێپەڕاندن قەدەغە دەکات بۆ ئۆتۆمبێلەکانی ئاراستە پێچەوانەکان.' },
  },
  {
    id: 'mark-yellow-broken-centre', category: 'roadmarking', verified: true, source: { ...S, locator: 'ص ٢٦' },
    image: require('@/assets/signs/mark-yellow-broken-centre.png'),
    title: { ar: 'خط أصفر متقطَّع في وسط الطريق', en: 'Broken yellow line in the centre', ckb: 'هێڵی زەردی پچڕپچڕ لە ناوەڕاست' },
    meaning: { ar: 'الخط الأصفر المتقطّع يسمح بالتجاوز للمركبات في الاتجاهات المعاكسة.', en: 'A broken yellow line permits overtaking for vehicles in opposing directions.', ckb: 'هێڵی زەردی پچڕپچڕ ڕێگە بە تێپەڕاندن دەدات بۆ ئۆتۆمبێلەکانی ئاراستە پێچەوانەکان.' },
  },

  // ---- إشارات ضوئيّة (traffic lights) — pages 27–28 ----
  {
    id: 'light-flashing-amber', category: 'trafficlight', verified: true, priority: true, source: { ...S, locator: 'ص ٢٧' },
    image: require('@/assets/signs/light-flashing-amber.png'),
    title: { ar: '[أصفر متقطع]', en: 'Flashing amber', ckb: '[زەردی پچڕپچڕ]' },
    meaning: { ar: 'تعني هذه الإشارة أن يقوم سائق السيارة بتخفيف سرعة السيارة أثناء عبوره مع ملاحظة الاتجاهات الأخرى.', en: 'The driver must reduce speed while crossing and watch the other directions.', ckb: 'دەبێت شۆفێر خێرایی کەم بکاتەوە لە کاتی تێپەڕبووندا و ئاگای لە ئاراستەکانی تر بێت.' },
  },
  {
    id: 'light-amber-prepare', category: 'trafficlight', verified: true, priority: true, source: { ...S, locator: 'ص ٢٧' },
    image: require('@/assets/signs/light-amber-prepare.png'),
    title: { ar: '[أصفر] تهيأ للوقوف', en: 'Amber — prepare to stop', ckb: '[زەرد] ئامادەبە بۆ وەستان' },
    meaning: { ar: 'تعني هذه الإشارة أن يقوم سائق السيارة بالاستعداد للتوقّف.', en: 'The driver must prepare to stop.', ckb: 'دەبێت شۆفێر ئامادە بێت بۆ وەستان.' },
  },
  {
    id: 'light-red-stop', category: 'trafficlight', verified: true, priority: true, source: { ...S, locator: 'ص ٢٧' },
    image: require('@/assets/signs/light-red-stop.png'),
    title: { ar: '[أحمر] قف', en: 'Red — stop', ckb: '[سوور] وەستە' },
    meaning: { ar: 'تعني هذه الإشارة أن يتوقّف سائق السيارة توقّفًا تامًّا.', en: 'The driver must come to a complete stop.', ckb: 'دەبێت شۆفێر بە تەواوی بوەستێت.' },
  },
  {
    id: 'light-green-go', category: 'trafficlight', verified: true, priority: true, source: { ...S, locator: 'ص ٢٧' },
    image: require('@/assets/signs/light-green-go.png'),
    title: { ar: '[أخضر] سر', en: 'Green — go', ckb: '[سەوز] بڕۆ' },
    meaning: { ar: 'تعني هذه الإشارة أن يقوم سائق السيارة بعبور الطّريق.', en: 'The driver may proceed across the road.', ckb: 'دەبێت شۆفێر بەناو ڕێگاکەدا تێپەڕێت.' },
  },
  {
    id: 'light-pedestrian-green', category: 'trafficlight', verified: true, source: { ...S, locator: 'ص ٢٨' },
    image: require('@/assets/signs/light-pedestrian-green.png'),
    title: { ar: '[أخضر] اعبر بحذر', en: 'Green — cross with care', ckb: '[سەوز] بە وریاییەوە بپەڕەوە' },
    meaning: { ar: 'تعني هذه الإشارة أنّه يجب على المشاة العبور بحذر.', en: 'Pedestrians must cross with care.', ckb: 'دەبێت پیادەکان بە وریاییەوە بپەڕنەوە.' },
  },
  {
    id: 'light-pedestrian-red', category: 'trafficlight', verified: true, source: { ...S, locator: 'ص ٢٨' },
    image: require('@/assets/signs/light-pedestrian-red.png'),
    title: { ar: '[أحمر] قف', en: 'Red — stop', ckb: '[سوور] وەستە' },
    meaning: { ar: 'تعني هذه الإشارة أنه يجب على المشاة التوقّف التام.', en: 'Pedestrians must come to a complete stop.', ckb: 'دەبێت پیادەکان بە تەواوی بوەستن.' },
  },
];
