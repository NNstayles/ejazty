/**
 * Questions transcribed from the official ministry bank.
 *
 * Arabic is verbatim from "دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة";
 * English and Kurdish Sorani are working translations of that Arabic and are
 * NOT part of the publication.
 *
 * The correct option is the one the source marks with a red check glyph. The
 * PDF's text layer is unusable (its font encoding is not 1:1), so these were
 * read from rendered page images, as the project notes require.
 *
 * Covers questions 1–26, pages 1–3 of the bank. The remaining pages are not
 * transcribed yet.
 */
import type { Question } from '../../schema';
import { EXAM_GUIDE as S } from './source';

export const officialQuestions: Question[] = [
  {
    id: 'q-prohibitory-border-colour', topic: 'signs', verified: true, source: { ...S, locator: 'س ١' },
    prompt: {
      ar: 'العلامات المانعة وهي علامات دائرية الشكل ذات إطار؟',
      en: 'Prohibitory signs are circular with a border of which colour?',
      ckb: 'تابلۆ قەدەغەکەرەکان خڕن و چوارچێوەیەکیان هەیە بە چ ڕەنگێک؟',
    },
    choices: [
      { id: 'a', text: { ar: 'ازرق', en: 'Blue', ckb: 'شین' } },
      { id: 'b', text: { ar: 'اخضر', en: 'Green', ckb: 'سەوز' } },
      { id: 'c', text: { ar: 'احمر', en: 'Red', ckb: 'سوور' } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامات المانعة دائرية الشكل بإطار أحمر.',
      en: 'Prohibitory signs are circular with a red border.',
      ckb: 'تابلۆ قەدەغەکەرەکان خڕن و چوارچێوەیەکی سووریان هەیە.',
    },
  },
  {
    id: 'q-warning-sign-shape', topic: 'signs', verified: true, source: { ...S, locator: 'س ٢' },
    prompt: {
      ar: 'العلامات التحذيرية تكون على شكل؟',
      en: 'Warning signs take which shape?',
      ckb: 'تابلۆ ئاگادارکەرەوەکان بە چ شێوەیەکن؟',
    },
    choices: [
      { id: 'a', text: { ar: 'دائري', en: 'Circular', ckb: 'خڕ' } },
      { id: 'b', text: { ar: 'مربع', en: 'Square', ckb: 'چوارگۆشە' } },
      { id: 'c', text: { ar: 'مثلث متساوي الاضلاع', en: 'An equilateral triangle', ckb: 'سێگۆشەی یەکسان لایەن' } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامات التحذيرية مثلثة الشكل ومتساوية الأضلاع.',
      en: 'Warning signs are equilateral triangles.',
      ckb: 'تابلۆ ئاگادارکەرەوەکان سێگۆشەی یەکسان لایەنن.',
    },
  },
  {
    id: 'q-mandatory-sign-shape', topic: 'signs', verified: true, source: { ...S, locator: 'س ٣' },
    prompt: {
      ar: 'العلامات الالزامية (الاجبارية) هي علامات؟',
      en: 'Mandatory signs are signs that are:',
      ckb: 'تابلۆ ئەرکدارەکان (ناچارکەر) چ جۆرە تابلۆیەکن؟',
    },
    choices: [
      { id: 'a', text: { ar: 'مستطيلة الشكل', en: 'Rectangular', ckb: 'لاکێشە' } },
      { id: 'b', text: { ar: 'دائرية الشكل', en: 'Circular', ckb: 'خڕ' } },
      { id: 'c', text: { ar: 'مثلث الشكل', en: 'Triangular', ckb: 'سێگۆشە' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامات الإلزامية دائرية الشكل.',
      en: 'Mandatory signs are circular.',
      ckb: 'تابلۆ ئەرکدارەکان خڕن.',
    },
  },
  {
    id: 'q-alight-left-side', topic: 'rules', verified: true, source: { ...S, locator: 'س ٤' },
    prompt: {
      ar: 'يمنع نزول الركاب و صعودهم من الجهة اليسرى؟',
      en: 'Passengers are prohibited from getting in or out on the left-hand side:',
      ckb: 'دابەزین و سەرکەوتنی سەرنشینان لە لای چەپەوە قەدەغەیە:',
    },
    choices: [
      { id: 'a', text: { ar: 'في مركبات التاكسي', en: 'In taxis', ckb: 'لە تاکسییەکاندا' } },
      { id: 'b', text: { ar: 'في جميع المركبات', en: 'In all vehicles', ckb: 'لە هەموو ئۆتۆمبێلەکاندا' } },
      { id: 'c', text: { ar: 'في الباصات فقط', en: 'In buses only', ckb: 'تەنها لە پاسەکاندا' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُمنع ذلك في جميع المركبات، لأن الجهة اليسرى معرّضة للمرور.',
      en: 'It is prohibited in every vehicle, because the left side faces moving traffic.',
      ckb: 'لە هەموو ئۆتۆمبێلێکدا قەدەغەیە، چونکە لای چەپ ڕووەو هاتوچۆیە.',
    },
  },
  {
    id: 'q-overtake-side', topic: 'rules', verified: true, source: { ...S, locator: 'س ٥' },
    prompt: {
      ar: 'امامك مركبة وتريد ان تجتازها. في اية جهة يجب ان تقوم بذلك؟',
      en: 'There is a vehicle ahead and you want to overtake it. On which side must you do so?',
      ckb: 'ئۆتۆمبێلێک لە پێشتەیە و دەتەوێت تێیپەڕێنیت. لە چ لایەکەوە دەبێت ئەمە بکەیت؟',
    },
    choices: [
      { id: 'a', text: { ar: 'جهة اليسار فقط', en: 'On the left only', ckb: 'تەنها لە لای چەپەوە' } },
      { id: 'b', text: { ar: 'الجهتين اليمنى واليسرى', en: 'Either the right or the left', ckb: 'لە هەردوو لای ڕاست و چەپەوە' } },
      { id: 'c', text: { ar: 'الجهة اليمنى فقط', en: 'On the right only', ckb: 'تەنها لە لای ڕاستەوە' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الاجتياز يكون من جهة اليسار.',
      en: 'Overtaking is done on the left.',
      ckb: 'تێپەڕاندن لە لای چەپەوە دەبێت.',
    },
  },
  {
    id: 'q-warn-other-drivers', topic: 'rules', verified: true, source: { ...S, locator: 'س ٦' },
    prompt: {
      ar: 'أفضل طريق لتنبيه السائقين الاخرين؟',
      en: 'What is the best way to alert other drivers?',
      ckb: 'باشترین ڕێگا بۆ ئاگادارکردنەوەی شۆفێرانی تر چییە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'إستخدام المنبه (الهورن) بشكل مستمر', en: 'Sounding the horn continuously', ckb: 'بەردەوام بەکارهێنانی بۆری' } },
      { id: 'b', text: { ar: 'إستخدام الاضوية العالية (الفلاش) لمرة واحدة أو إثنتين كحد أقصى', en: 'Flashing the headlights once or twice at most', ckb: 'بەکارهێنانی فلاشی چرا بەرزەکان جارێک یان دووجار بەزۆرەوە' } },
      { id: 'c', text: { ar: 'التقرب من المركبة وتنبيه السائق عبر المحادثة معه', en: 'Getting close to the vehicle and speaking to the driver', ckb: 'نزیکبوونەوە لە ئۆتۆمبێلەکە و قسەکردن لەگەڵ شۆفێرەکە' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الفلاش مرة أو مرتين هو التنبيه المناسب.',
      en: 'A flash of the headlights once or twice is the appropriate warning.',
      ckb: 'فلاشدان جارێک یان دووجار ئاگادارکردنەوەی گونجاوە.',
    },
  },
  {
    id: 'q-speed-limit-meaning', topic: 'signs', verified: true, source: { ...S, locator: 'س ٧' },
    prompt: {
      ar: 'ماذا تعني علامة تحديد السرعة؟',
      en: 'What does a speed limit sign mean?',
      ckb: 'تابلۆی دیاریکردنی خێرایی واتای چییە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'الحد الاقصى للسرعة المسموحة في الظروف الجيدة', en: 'The maximum speed allowed in good conditions', ckb: 'زۆرترین خێرایی ڕێپێدراو لە بارودۆخی باشدا' } },
      { id: 'b', text: { ar: 'الحد الادنى للسرعة المسموحة للمركبة', en: 'The minimum speed allowed', ckb: 'کەمترین خێرایی ڕێپێدراو' } },
      { id: 'c', text: { ar: 'الحد الاقصى للسرعة المسموحة للمركبة اثناء تساقط الامطار', en: 'The maximum speed allowed while it is raining', ckb: 'زۆرترین خێرایی ڕێپێدراو لە کاتی بارانبارین' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحدد أقصى سرعة مسموحة في الظروف الجيدة، ويجب تخفيضها عند سوء الأحوال.',
      en: 'The sign gives the maximum speed in good conditions; you must go slower when conditions are poor.',
      ckb: 'تابلۆکە زۆرترین خێرایی لە بارودۆخی باشدا دیاری دەکات؛ لە بارودۆخی خراپدا دەبێت خێراییەکەت کەم بکەیتەوە.',
    },
  },
  {
    id: 'q-overtake-on-bridges', topic: 'rules', verified: true, source: { ...S, locator: 'س ٨' },
    prompt: {
      ar: 'هل يسمح بالاجتياز أثناء عبور الجسور؟',
      en: 'Is overtaking permitted while crossing bridges?',
      ckb: 'ئایا تێپەڕاندن لە کاتی پەڕینەوە بەسەر پردەکاندا ڕێپێدراوە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'لا يسمح بشكل مطلق', en: 'It is absolutely prohibited', ckb: 'بە تەواوی قەدەغەیە' } },
      { id: 'b', text: { ar: 'يسمح وبشكل إعتيادي', en: 'It is permitted as normal', ckb: 'وەک ئاسایی ڕێپێدراوە' } },
      { id: 'c', text: { ar: 'يسمح إذا كانت المركبات تقاد بسرع منخفضة', en: 'It is permitted if vehicles are moving slowly', ckb: 'ڕێپێدراوە ئەگەر ئۆتۆمبێلەکان بە خێرایی کەم بڕۆن' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُمنع الاجتياز على الجسور منعًا باتًا.',
      en: 'Overtaking on bridges is absolutely prohibited.',
      ckb: 'تێپەڕاندن لەسەر پردەکان بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-prohibitory-purpose', topic: 'signs', verified: true, source: { ...S, locator: 'س ٩' },
    prompt: {
      ar: 'العلامات المانعة هي علامات؟',
      en: 'Prohibitory signs are signs that:',
      ckb: 'تابلۆ قەدەغەکەرەکان ئەو تابلۆیانەن کە:',
    },
    choices: [
      { id: 'a', text: { ar: 'تنبيه السائق', en: 'Alert the driver', ckb: 'شۆفێر ئاگادار دەکەنەوە' } },
      { id: 'b', text: { ar: 'اعطاء اوامر المنع', en: 'Give orders of prohibition', ckb: 'فەرمانی قەدەغەکردن دەدەن' } },
      { id: 'c', text: { ar: 'اعطاء تحذير عن وجود مخاطر', en: 'Warn of the presence of hazards', ckb: 'ئاگاداری لە هەبوونی مەترسی دەدەن' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامات المانعة تُصدر أوامر المنع.',
      en: 'Prohibitory signs issue orders of prohibition.',
      ckb: 'تابلۆ قەدەغەکەرەکان فەرمانی قەدەغەکردن دەردەکەن.',
    },
  },
  {
    id: 'q-overtake-right-lane', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٠' },
    prompt: {
      ar: 'متى يمكن إستخدام المسلك الايمن للاجتياز؟',
      en: 'When may the right-hand lane be used to overtake?',
      ckb: 'کەی دەتوانرێت لەینی ڕاست بۆ تێپەڕاندن بەکاربهێنرێت؟',
    },
    choices: [
      { id: 'a', text: { ar: 'إذا كان سائق المركبة المراد اجتيازها ينوي الاستدارة الى اليسار واعطى الاشارة بذلك', en: 'When the driver ahead intends to turn left and has signalled to do so', ckb: 'کاتێک شۆفێری پێشەوە دەیەوێت بۆ چەپ بسوڕێتەوە و ئیشارەتی بۆ داوە' } },
      { id: 'b', text: { ar: 'إذا كان هناك مسلك خالي على يمين المركبة الاخرى', en: 'Whenever there is a free lane to the right of the other vehicle', ckb: 'کاتێک لەینێکی بەتاڵ لە لای ڕاستی ئۆتۆمبێلەکەی تر هەبێت' } },
      { id: 'c', text: { ar: 'يمكن إستخدام كلا المسلكين الايمن والايسر للاجتياز', en: 'Either the right or left lane may be used to overtake', ckb: 'دەتوانرێت هەردوو لەینی ڕاست و چەپ بۆ تێپەڕاندن بەکاربهێنرێن' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الاستثناء الوحيد هو أن المركبة أمامك تنوي الاستدارة يسارًا وأشارت لذلك.',
      en: 'The only exception is when the vehicle ahead is signalling a left turn.',
      ckb: 'تەنها ئیستیسنا ئەوەیە کە ئۆتۆمبێلی پێشەوە ئیشارەتی سووڕانەوە بۆ چەپ دەدات.',
    },
  },
  {
    id: 'q-standard-lighting', topic: 'rules', verified: true, source: { ...S, locator: 'س ١١' },
    prompt: {
      ar: 'يمنع قيادة المركبة عند عدم توفر الاضاءة القياسية اللازمة في المركبة؟',
      en: 'Driving is prohibited when the vehicle lacks which lighting?',
      ckb: 'لێخوڕین قەدەغەیە کاتێک ئۆتۆمبێلەکە کام ڕووناکی پێویستی نەبێت؟',
    },
    choices: [
      { id: 'a', text: { ar: 'جميع الاضوية القياسية', en: 'All of the standard lights', ckb: 'هەموو چرا ستانداردەکان' } },
      { id: 'b', text: { ar: 'اضوية التحديد (السكن)', en: 'The side/marker lights', ckb: 'چراکانی دیاریکردن' } },
      { id: 'c', text: { ar: 'الاضوية الرئيسية فقط', en: 'The main headlights only', ckb: 'تەنها چرا سەرەکییەکان' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب توفر جميع الأضوية القياسية في المركبة.',
      en: 'Every one of the standard lights must be present and working.',
      ckb: 'دەبێت هەموو چرا ستانداردەکان لە ئۆتۆمبێلەکەدا هەبن.',
    },
  },
  {
    id: 'q-skidding-causes', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٢' },
    prompt: {
      ar: 'تنزلق المركبة وتفقد السيطرة عليها عند قيادتها أثناء تساقط المطر أو الثلوج أو عندما يكون جزء من الطريق مبللاً بسبب:',
      en: 'A vehicle skids and control is lost in rain or snow, or where part of the road is wet, because of:',
      ckb: 'ئۆتۆمبێل دەخلیسکێت و کۆنترۆڵی لەدەست دەچێت لە باران یان بەفردا، یان کاتێک بەشێکی ڕێگاکە تەڕە، بەهۆی:',
    },
    choices: [
      { id: 'a', text: { ar: 'الطريق غير مستوي', en: 'An uneven road surface', ckb: 'ڕووی ناتەختی ڕێگا' } },
      { id: 'b', text: { ar: 'تسير المركبة بسرعة عالية او باطارات متهالكة', en: 'Driving at high speed or on worn tyres', ckb: 'ڕۆیشتن بە خێرایی بەرز یان بە تایەی ساوە' } },
      { id: 'c', text: { ar: 'كل ما ذكر', en: 'All of the above', ckb: 'هەموو ئەوانەی سەرەوە' } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'كل هذه العوامل تسهم في الانزلاق.',
      en: 'All of these factors contribute to skidding.',
      ckb: 'هەموو ئەم هۆکارانە بەشدارن لە خلیسکان.',
    },
  },
  {
    id: 'q-snow-daytime-lights', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٣' },
    prompt: {
      ar: 'عند تساقط الثلوج أثناء النهار يجب على السائق تشغيل:',
      en: 'When snow is falling during the day, the driver must switch on:',
      ckb: 'کاتێک بەفر بە ڕۆژ دەبارێت، دەبێت شۆفێر داگیرسێنێت:',
    },
    choices: [
      { id: 'a', text: { ar: 'الاضوية الواطئة (الناصي)', en: 'The dipped (low beam) headlights', ckb: 'چرا نزمەکان' } },
      { id: 'b', text: { ar: 'الاضوية العالية', en: 'The high beam headlights', ckb: 'چرا بەرزەکان' } },
      { id: 'c', text: { ar: 'اضوية التحذير', en: 'The hazard lights', ckb: 'چراکانی مەترسی' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُستخدم الأضوية الواطئة، لأن العالية تنعكس على الثلج وتُبهر الرؤية.',
      en: 'Dipped beams are used, because main beam reflects off the snow and dazzles.',
      ckb: 'چرا نزمەکان بەکاردەهێنرێن، چونکە چرا بەرزەکان لە بەفرەکە دەگەڕێنەوە و چاو دەبەن.',
    },
  },
  {
    id: 'q-overtaking-conditions', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٤' },
    prompt: {
      ar: 'ما هي شروط اجتياز المركبات؟',
      en: 'What are the conditions for overtaking?',
      ckb: 'مەرجەکانی تێپەڕاندنی ئۆتۆمبێل چین؟',
    },
    choices: [
      { id: 'a', text: { ar: 'إذا اشار سائق المركبة المنوي تجاوزها لسائق المركبة المتجاوزة بالموافقة على التجاوز', en: 'When the driver ahead signals his consent to be overtaken', ckb: 'کاتێک شۆفێری پێشەوە ئیشارەتی ڕەزامەندی بۆ تێپەڕاندن دەدات' } },
      { id: 'b', text: { ar: 'عند التأكد التام من سائق المركبة المتجاوزة بخلو الطريق وإمكانية الاجتياز بأمان', en: 'When the overtaking driver is completely sure the road is clear and it can be done safely', ckb: 'کاتێک شۆفێری تێپەڕێنەر بە تەواوی دڵنیا بێت ڕێگاکە بەتاڵە و بە سەلامەتی دەکرێت' } },
      { id: 'c', text: { ar: 'عندما تكون المركبة المنوي تجاوزها مركبة بطيئة ويجب تجاوزها فوراً', en: 'When the vehicle ahead is slow and must be passed at once', ckb: 'کاتێک ئۆتۆمبێلی پێشەوە خاوە و دەبێت دەستبەجێ تێپەڕێنرێت' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'مسؤولية التأكد من خلو الطريق تقع على السائق المُجتاز.',
      en: 'The responsibility for making sure the road is clear rests on the overtaking driver.',
      ckb: 'بەرپرسیاریەتی دڵنیابوون لە بەتاڵی ڕێگا لەسەر شۆفێری تێپەڕێنەرە.',
    },
  },
  {
    id: 'q-speed-near-schools', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٥' },
    prompt: {
      ar: 'أعلى سرعة قرب المدارس والاسواق المزدحمة هي؟',
      en: 'What is the maximum speed near schools and crowded markets?',
      ckb: 'زۆرترین خێرایی لەلای قوتابخانە و بازاڕە قەرەباڵغەکان چەندە؟',
    },
    choices: [
      { id: 'a', text: { ar: '٣٠ كم / ساعة', en: '30 km/h', ckb: '٣٠ کم/کاتژمێر' } },
      { id: 'b', text: { ar: '٤٠ كم / ساعة', en: '40 km/h', ckb: '٤٠ کم/کاتژمێر' } },
      { id: 'c', text: { ar: '٦٠ كم / ساعة', en: '60 km/h', ckb: '٦٠ کم/کاتژمێر' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الحد الأقصى قرب المدارس والأسواق المزدحمة هو ٣٠ كم/ساعة.',
      en: 'The limit near schools and crowded markets is 30 km/h.',
      ckb: 'سنووری خێرایی لەلای قوتابخانە و بازاڕە قەرەباڵغەکان ٣٠ کم/کاتژمێرە.',
    },
  },
  {
    id: 'q-overtaking-prohibited-cases', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٦' },
    prompt: {
      ar: 'في اية حالات يمنع الاجتياز او محاولة اجتياز مركبة اخرى؟',
      en: 'In which cases is overtaking, or attempting to overtake, prohibited?',
      ckb: 'لە چ حاڵەتێکدا تێپەڕاندن یان هەوڵی تێپەڕاندنی ئۆتۆمبێلێکی تر قەدەغەیە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'عند صعود المنحدرات في الطرق الجبلية', en: 'When climbing slopes on mountain roads', ckb: 'لە کاتی سەرکەوتنی بنار لە ڕێگا شاخاوییەکاندا' } },
      { id: 'b', text: { ar: 'عندما يكون مدى الرؤية غير كافٍ لتحديد خلو الطريق', en: 'When visibility is not enough to confirm the road is clear', ckb: 'کاتێک دیمەن بەس نییە بۆ دڵنیابوون لە بەتاڵی ڕێگا' } },
      { id: 'c', text: { ar: 'كل ما ذكر', en: 'All of the above', ckb: 'هەموو ئەوانەی سەرەوە' } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الاجتياز ممنوع في جميع هذه الحالات.',
      en: 'Overtaking is prohibited in all of these cases.',
      ckb: 'تێپەڕاندن لە هەموو ئەم حاڵەتانەدا قەدەغەیە.',
    },
  },
  {
    id: 'q-overtake-in-tunnel', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٧' },
    prompt: {
      ar: 'انت تقود مركبتك بداخل النفق وامامك مركبة تسير بسرعة ابطأ منك. هل يجوز لك ان تتجاوز هذه المركبة؟',
      en: 'You are driving inside a tunnel and the vehicle ahead is slower than you. May you overtake it?',
      ckb: 'لە ناو تونێلێکدا لێدەخوڕیت و ئۆتۆمبێلی پێشەوە لە تۆ خاوترە. ئایا بۆت هەیە تێیپەڕێنیت؟',
    },
    choices: [
      { id: 'a', text: { ar: 'نعم يجوز لي تجاوز هذه المركبة اذا كان يسير بسرعة بطيئة', en: 'Yes, if it is moving slowly', ckb: 'بەڵێ، ئەگەر بە خاوی دەڕوات' } },
      { id: 'b', text: { ar: 'لا يجوز القيام بالاجتياز مطلقا سواء داخل النفق او قبل الوصول اليه بمسافة قليلة', en: 'No, overtaking is prohibited inside a tunnel and shortly before it', ckb: 'نەخێر، تێپەڕاندن لە ناو تونێل و کەمێک پێش گەیشتن بۆی قەدەغەیە' } },
      { id: 'c', text: { ar: 'نعم يجوز لي اذا كان هذا الاجراء لا يسبب اية مشاكل او حوادث مرورية', en: 'Yes, if it causes no problems or accidents', ckb: 'بەڵێ، ئەگەر هیچ کێشە یان ڕووداوێک دروست نەکات' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُمنع الاجتياز داخل النفق وقبل الوصول إليه بمسافة قصيرة.',
      en: 'Overtaking is prohibited inside a tunnel and for a short distance before it.',
      ckb: 'تێپەڕاندن لە ناو تونێل و بۆ مەودایەکی کورت پێش ئەو قەدەغەیە.',
    },
  },
  {
    id: 'q-overtaking-allowed-line', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٨' },
    prompt: {
      ar: 'يسمح بالاجتياز في الحالات الآتية؟',
      en: 'Overtaking is permitted in which of these cases?',
      ckb: 'تێپەڕاندن لە کام لەم حاڵەتانەدا ڕێپێدراوە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'خط غير متقطع', en: 'A solid line', ckb: 'هێڵێکی بڕاوە نەبوو' } },
      { id: 'b', text: { ar: 'خط مزدوج غير متقطع في يسارك', en: 'A solid double line on your left', ckb: 'هێڵێکی دووانەی بڕاوە نەبوو لە لای چەپت' } },
      { id: 'c', text: { ar: 'في حالة خط متقطع من جهة يسارك', en: 'A broken line on your left', ckb: 'هێڵێکی بڕاوە لە لای چەپتەوە' } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الخط المتقطع من جهة اليسار يسمح بالاجتياز.',
      en: 'A broken line on your left permits overtaking.',
      ckb: 'هێڵی بڕاوە لە لای چەپەوە ڕێگە بە تێپەڕاندن دەدات.',
    },
  },
  {
    id: 'q-obstructed-view', topic: 'rules', verified: true, source: { ...S, locator: 'س ١٩' },
    prompt: {
      ar: 'لا يجوز قيادة مركبة بوجود ما يعيق رؤية السائق؟',
      en: 'A vehicle must not be driven when the driver\'s view is obstructed by:',
      ckb: 'نابێت ئۆتۆمبێل لێبخوڕدرێت کاتێک دیمەنی شۆفێر تێکدراوە بەهۆی:',
    },
    choices: [
      { id: 'a', text: { ar: 'كسور في الزجاج الامامي والجانبي او اية ملصقات', en: 'Cracks in the windscreen or side glass, or any stickers', ckb: 'شکان لە شووشەی پێشەوە و لاتەنیشت یان هەر لەبەرچەسپێک' } },
      { id: 'b', text: { ar: 'حمولة لا تعيق الرؤية', en: 'A load that does not obstruct the view', ckb: 'بارێک کە ڕێگر نییە لە دیمەن' } },
      { id: 'c', text: { ar: 'توفر المرايا', en: 'The presence of mirrors', ckb: 'هەبوونی ئاوێنەکان' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الكسور والملصقات التي تحجب الرؤية تمنع قيادة المركبة.',
      en: 'Cracks and stickers that block the view make the vehicle unfit to drive.',
      ckb: 'شکان و لەبەرچەسپ کە دیمەن دەگرن ئۆتۆمبێلەکە بۆ لێخوڕین ناگونجێنن.',
    },
  },
  {
    id: 'q-how-to-overtake', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢٠' },
    prompt: {
      ar: 'اجتياز المركبات يتم بـ؟',
      en: 'Overtaking is carried out by:',
      ckb: 'تێپەڕاندنی ئۆتۆمبێل بەم شێوەیە دەبێت:',
    },
    choices: [
      { id: 'a', text: { ar: 'التنبه باستخدام الضياء العالي (الفلاش) لمرات عديدة', en: 'Flashing the headlights repeatedly', ckb: 'چەند جارێک فلاشدان بە چرا بەرزەکان' } },
      { id: 'b', text: { ar: 'تقود مركبتك بجانب المركبة المراد إجتيازها الى أن يراك السائق', en: 'Driving alongside the other vehicle until its driver sees you', ckb: 'لێخوڕین بەلای ئۆتۆمبێلەکەدا هەتا شۆفێرەکەی دەتبینێت' } },
      { id: 'c', text: { ar: 'تنتقل الى مسار الاجتياز وتحاول إجتياز المركبة حسب تعليمات الاجتياز', en: 'Moving into the overtaking lane and passing according to the overtaking rules', ckb: 'گواستنەوە بۆ لەینی تێپەڕاندن و تێپەڕاندن بەپێی ڕێنمایییەکانی تێپەڕاندن' } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الاجتياز يتم بالانتقال إلى مسار الاجتياز والالتزام بتعليماته.',
      en: 'You overtake by moving into the overtaking lane and following the rules for it.',
      ckb: 'تێپەڕاندن بە گواستنەوە بۆ لەینی تێپەڕاندن و پەیڕەوکردنی ڕێنماییەکانی دەبێت.',
    },
  },
  {
    id: 'q-broken-down-vehicle', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢١' },
    prompt: {
      ar: 'هل يجوز لسائق المركبة ترك مركبته في وسط الطريق إذا تعرضت لعطل ما؟',
      en: 'May a driver leave the vehicle in the middle of the road if it breaks down?',
      ckb: 'ئایا بۆ شۆفێر هەیە ئۆتۆمبێلەکەی لە ناوەڕاستی ڕێگادا بەجێبهێڵێت ئەگەر تێکچوو؟',
    },
    choices: [
      { id: 'a', text: { ar: 'لا يجوز تركها مطلقاً', en: 'No, never', ckb: 'نەخێر، بە هیچ شێوەیەک' } },
      { id: 'b', text: { ar: 'نعم بشرط أثناء تواجده بالقرب منها', en: 'Yes, provided he stays near it', ckb: 'بەڵێ، بەمەرجێک لەلایەوە بمێنێتەوە' } },
      { id: 'c', text: { ar: 'نعم إذ وضع المثلث الفسفوري خلف سيارته', en: 'Yes, if he places the reflective triangle behind it', ckb: 'بەڵێ، ئەگەر سێگۆشە ڕەنگدانەوەییەکە لە دواوەی دابنێت' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا يجوز ترك المركبة في وسط الطريق مطلقًا.',
      en: 'The vehicle must never be left in the middle of the road.',
      ckb: 'هەرگیز نابێت ئۆتۆمبێلەکە لە ناوەڕاستی ڕێگادا بەجێبهێڵدرێت.',
    },
  },
  {
    id: 'q-fog-lights-use', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢٢' },
    prompt: {
      ar: 'عند القيادة في جو ضبابي عليك إستخدام؟',
      en: 'When driving in fog you must use:',
      ckb: 'لە کاتی لێخوڕین لە کەشی تەماویدا دەبێت بەکاربهێنیت:',
    },
    choices: [
      { id: 'a', text: { ar: 'أضواء التحذير', en: 'The hazard lights', ckb: 'چراکانی مەترسی' } },
      { id: 'b', text: { ar: 'الاضوية الواطئة', en: 'The dipped (low beam) headlights', ckb: 'چرا نزمەکان' } },
      { id: 'c', text: { ar: 'الاضوية العالية', en: 'The high beam headlights', ckb: 'چرا بەرزەکان' } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأضوية العالية تنعكس على الضباب وتقلل الرؤية، لذا تُستخدم الواطئة.',
      en: 'Main beam reflects off fog and reduces visibility, so dipped beams are used.',
      ckb: 'چرا بەرزەکان لە تەمەکە دەگەڕێنەوە و دیمەن کەم دەکەنەوە، بۆیە چرا نزمەکان بەکاردەهێنرێن.',
    },
  },
  {
    id: 'q-stopping-distance-rain', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢٣' },
    prompt: {
      ar: 'تزداد مسافة التوقف أثناء تسليط المكابح (البريك) عند قيادة المركبة في جو ممطر؟',
      en: 'Does braking distance increase when driving in rain?',
      ckb: 'ئایا مەودای وەستان زیاد دەکات کاتێک لە کەشی بارانیدا لێدەخوڕیت؟',
    },
    choices: [
      { id: 'a', text: { ar: 'نعم', en: 'Yes', ckb: 'بەڵێ' } },
      { id: 'b', text: { ar: 'كلا', en: 'No', ckb: 'نەخێر' } },
      { id: 'c', text: { ar: 'لا تتأثر بالمطر', en: 'It is not affected by rain', ckb: 'کاریگەری لێ ناکات' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الطريق المبلل يقلل التماسك فتزداد مسافة التوقف.',
      en: 'A wet road reduces grip, so the stopping distance grows.',
      ckb: 'ڕێگای تەڕ گرتن کەم دەکاتەوە، بۆیە مەودای وەستان زیاد دەکات.',
    },
  },
  {
    // DEVIATES FROM THE SOURCE, DELIBERATELY.
    //
    // The publication offers ٧٥٪ / ٨٠٪ / ٩٠٪ and marks ٨٠٪. On 2026-08-05 the
    // product owner asked for the app's pass mark to be 60% and for this
    // question to agree with it, so choice (a) was changed from ٧٥٪ to ٦٠٪ and
    // marked correct. This is the ONLY record in the bundle whose answer does
    // not match the ministry's marking, and it is recorded here rather than
    // being left to look like a transcription slip.
    //
    // Consequence worth keeping in view: a learner taught 60% here would be
    // wrong about the real theoretical test, which still passes at 80%. If that
    // trade is revisited, this record and `PASS_THRESHOLD` move back together.
    id: 'q-pass-mark', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢٤' },
    prompt: {
      ar: 'درجة النجاح في الامتحان (الاختبار النظري) لمنح إجازة السوق هي؟',
      en: 'What is the pass mark in the theoretical test for a driving licence?',
      ckb: 'نمرەی دەرچوون لە تاقیکردنەوەی تیۆری بۆ مۆڵەتی لێخوڕین چەندە؟',
    },
    choices: [
      { id: 'a', text: { ar: '٦٠٪', en: '60%', ckb: '٦٠٪' } },
      { id: 'b', text: { ar: '٨٠٪', en: '80%', ckb: '٨٠٪' } },
      { id: 'c', text: { ar: '٩٠٪', en: '90%', ckb: '٩٠٪' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'درجة النجاح المعتمدة في هذا التطبيق هي ٦٠٪.',
      en: 'The pass mark used by this app is 60%.',
      ckb: 'نمرەی دەرچوون لەم ئەپەدا ٦٠٪ە.',
    },
  },
  {
    id: 'q-overtake-railway', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢٥' },
    prompt: {
      ar: 'هل يسمح باجتياز المركبات بالقرب او على تقاطع سكة الحديد؟',
      en: 'Is overtaking permitted near or on a railway crossing?',
      ckb: 'ئایا تێپەڕاندن لەلای یان لەسەر پەڕینگەی شەمەندەفەر ڕێپێدراوە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'يمنع منعاً باتاً', en: 'It is absolutely prohibited', ckb: 'بە تەواوی قەدەغەیە' } },
      { id: 'b', text: { ar: 'يسمح إذا كانت المسافة ١٠٠ م فما دون بين الطريق وتقاطع سكة الحديد', en: 'It is permitted within 100 m of the crossing', ckb: 'ڕێپێدراوە ئەگەر مەودا ١٠٠ م یان کەمتر بێت' } },
      { id: 'c', text: { ar: 'يسمح عند خلو التقاطع', en: 'It is permitted when the crossing is clear', ckb: 'ڕێپێدراوە کاتێک پەڕینگەکە بەتاڵە' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُمنع الاجتياز قرب تقاطع سكة الحديد أو عليه منعًا باتًا.',
      en: 'Overtaking near or on a railway crossing is absolutely prohibited.',
      ckb: 'تێپەڕاندن لەلای یان لەسەر پەڕینگەی شەمەندەفەر بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-alcohol-drugs', topic: 'rules', verified: true, source: { ...S, locator: 'س ٢٦' },
    prompt: {
      ar: 'الكحول والمخدرات يؤثران على الانسان؟',
      en: 'Alcohol and drugs affect a person. What follows from that?',
      ckb: 'کحول و ماددە هۆشبەرەکان کاریگەرییان لەسەر مرۆڤ هەیە. ئەنجامەکەی چییە؟',
    },
    choices: [
      { id: 'a', text: { ar: 'لا أقود المركبة إذ كنت قد تناولت الكحول ولا أسمح بقيادتها من قبل اشخاص تناولوا الكحول', en: 'I do not drive after drinking, and I do not let anyone who has been drinking drive', ckb: 'دوای خواردنەوەی کحول لێناخوڕم و ڕێگە نادەم کەسێک کە خواردوویەتی لێیبخوڕێت' } },
      { id: 'b', text: { ar: 'النسب القليلة من الكحول والمخدرات لا تؤثر يمكنني قيادتها', en: 'Small amounts have no effect, so I can still drive', ckb: 'بڕی کەم کاریگەری نییە، بۆیە دەتوانم لێبخوڕم' } },
      { id: 'c', text: { ar: 'ليس لها تأثير على المهارات والقدرة على إتخاذ القرارات أثناء القيادة', en: 'They do not affect skill or decision-making while driving', ckb: 'کاریگەری لەسەر لێهاتوویی و بڕیاردان لە کاتی لێخوڕیندا نییە' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الكحول والمخدرات تُضعف المهارة والقدرة على اتخاذ القرار مهما قلّت الكمية.',
      en: 'Alcohol and drugs impair skill and judgement no matter how small the amount.',
      ckb: 'کحول و ماددە هۆشبەرەکان لێهاتوویی و هەڵسەنگاندن لاواز دەکەن، بڕەکەی هەرچەندە کەم بێت.',
    },
  },
];
