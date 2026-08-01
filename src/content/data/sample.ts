/**
 * PLACEHOLDER CONTENT — NOT OFFICIAL. DELETE WHEN THE MINISTRY SOURCE LANDS.
 *
 * This file exists so the app has something to render and so the exam engine
 * can be exercised end to end. Every record is `verified: false`, which makes
 * the UI badge it as sample material.
 *
 * To replace it: add the real records under `src/content/data/official.ts`
 * with `verified: true` and a real `SourceRef`, then register that bundle in
 * `src/content/registry.ts`. Nothing else in the app needs to change.
 */

import type {
  PriorityScenario,
  Question,
  SourceRef,
  TrafficRule,
  TrafficSign,
  Violation,
} from '../schema';

const PLACEHOLDER: SourceRef = {
  authority: 'other-official',
  document: 'PLACEHOLDER — replace with the official ministry publication',
};

export const sampleSigns: TrafficSign[] = [
  {
    id: 'sample-sign-stop',
    verified: false,
    source: PLACEHOLDER,
    category: 'regulatory',
    title: { en: 'Stop', ar: 'قف', ckb: 'وەستە' },
    meaning: {
      en: 'An octagonal red sign marking a mandatory full stop.',
      ar: 'إشارة حمراء ثمانية الأضلاع تدل على وجوب التوقف التام.',
      ckb: 'هێمایەکی سووری هەشت لایەنە کە وەستانی تەواوی پێویست دەکات.',
    },
    action: {
      en: 'Come to a complete stop at the line, give way, then proceed when clear.',
      ar: 'توقف توقفًا تامًا عند الخط، وأعطِ الأولوية، ثم تابع عندما يخلو الطريق.',
      ckb: 'لە هێڵەکەدا بەتەواوی بوەستە، ڕێگا بدە، پاشان کاتێک ڕێگا چۆڵە بەردەوام بە.',
    },
  },
  {
    id: 'sample-sign-yield',
    verified: false,
    source: PLACEHOLDER,
    category: 'priority',
    title: { en: 'Give way', ar: 'أعطِ الأولوية', ckb: 'ڕێگا بدە' },
    meaning: {
      en: 'A downward-pointing triangle: traffic on the road ahead has priority.',
      ar: 'مثلث رأسه إلى الأسفل: الأولوية لحركة المرور على الطريق أمامك.',
      ckb: 'سێگۆشەیەک سەری بەرەو خوارەوە: پێشینەیی بۆ هاتوچۆی ڕێگای پێشەوەیە.',
    },
    action: {
      en: 'Slow down and be ready to stop; only continue without obstructing others.',
      ar: 'خفّف السرعة وكن مستعدًا للتوقف؛ ولا تتابع إلا دون إعاقة الآخرين.',
      ckb: 'خێرایی کەم بکەرەوە و ئامادەبە بۆ وەستان؛ تەنها بەبێ ڕێگرتن لە کەسانی تر بەردەوام بە.',
    },
  },
  {
    id: 'sample-sign-no-entry',
    verified: false,
    source: PLACEHOLDER,
    category: 'regulatory',
    title: { en: 'No entry', ar: 'ممنوع الدخول', ckb: 'چوونەژوورەوە قەدەغەیە' },
    meaning: {
      en: 'A red disc with a white horizontal bar: entry is prohibited for all vehicles.',
      ar: 'قرص أحمر بشريط أبيض أفقي: الدخول ممنوع لجميع المركبات.',
      ckb: 'بازنەیەکی سوور بە هێڵێکی سپی ئاسۆیی: چوونەژوورەوە بۆ هەموو ئۆتۆمبێلێک قەدەغەیە.',
    },
    action: {
      en: 'Do not enter. Find an alternative route.',
      ar: 'لا تدخل. ابحث عن طريق بديل.',
      ckb: 'مەچۆ ژوورەوە. ڕێگایەکی تر بدۆزەرەوە.',
    },
  },
  {
    id: 'sample-sign-speed-limit',
    verified: false,
    source: PLACEHOLDER,
    category: 'regulatory',
    title: { en: 'Speed limit', ar: 'الحد الأقصى للسرعة', ckb: 'سنووری خێرایی' },
    meaning: {
      en: 'A red-bordered circle with a number: the maximum permitted speed in km/h.',
      ar: 'دائرة بإطار أحمر بداخلها رقم: السرعة القصوى المسموح بها بالكيلومتر/ساعة.',
      ckb: 'بازنەیەک بە چوارچێوەی سوور و ژمارەیەک: زۆرترین خێرایی ڕێپێدراو بە کم/کاتژمێر.',
    },
    action: {
      en: 'Do not exceed the posted speed, and go slower when conditions require it.',
      ar: 'لا تتجاوز السرعة المحددة، وقُد بسرعة أقل عندما تستدعي الظروف ذلك.',
      ckb: 'لە خێرایی دیاریکراو تێمەپەڕە، و کاتێک بارودۆخ پێویستی دەکات هێواشتر بڕۆ.',
    },
  },
  {
    id: 'sample-sign-pedestrian-crossing',
    verified: false,
    source: PLACEHOLDER,
    category: 'warning',
    title: { en: 'Pedestrian crossing', ar: 'ممر مشاة', ckb: 'پەڕینەوەی پیادە' },
    meaning: {
      en: 'Warns of a marked crossing where pedestrians may be on the carriageway.',
      ar: 'تحذر من وجود ممر مخصص قد يعبر منه المشاة.',
      ckb: 'ئاگادارکردنەوەیە لە پەڕینەوەیەکی نیشانکراو کە لەوانەیە پیادە لەسەر ڕێگا بن.',
    },
    action: {
      en: 'Reduce speed and give way to pedestrians already crossing.',
      ar: 'خفّف السرعة وأعطِ الأولوية للمشاة الذين بدأوا العبور.',
      ckb: 'خێرایی کەم بکەرەوە و ڕێگا بدە بەو پیادانەی دەستیان بە پەڕینەوە کردووە.',
    },
  },
  {
    id: 'sample-sign-roundabout',
    verified: false,
    source: PLACEHOLDER,
    category: 'priority',
    title: { en: 'Roundabout ahead', ar: 'دوّار أمامك', ckb: 'بازنە لە پێشەوە' },
    meaning: {
      en: 'Indicates a circular junction where traffic flows in one direction.',
      ar: 'تشير إلى تقاطع دائري تسير فيه الحركة باتجاه واحد.',
      ckb: 'ئاماژە بە چوارڕیانێکی بازنەیی دەکات کە هاتوچۆ بە یەک ئاراستە دەڕوات.',
    },
    action: {
      en: 'Slow down, follow the arrows and give way as required at entry.',
      ar: 'خفّف السرعة، واتبع الأسهم، وأعطِ الأولوية عند الدخول حسب المطلوب.',
      ckb: 'خێرایی کەم بکەرەوە، شوێن تیرەکان بکەوە و لە کاتی چوونەژوورەوە ڕێگا بدە.',
    },
  },
];

export const sampleViolations: Violation[] = [
  {
    id: 'sample-violation-speeding',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Exceeding the speed limit', ar: 'تجاوز السرعة المحددة', ckb: 'تێپەڕاندنی سنووری خێرایی' },
    description: {
      en: 'Driving faster than the limit posted for the road you are on.',
      ar: 'القيادة بسرعة تفوق الحد المقرر للطريق الذي تسير عليه.',
      ckb: 'لێخوڕین بە خێراییەکی زیاتر لە سنووری دیاریکراوی ئەو ڕێگایەی لەسەریت.',
    },
    penalty: {
      en: 'Penalty amount to be taken from the official schedule.',
      ar: 'قيمة الغرامة تُؤخذ من الجدول الرسمي.',
      ckb: 'بڕی سزاکە لە خشتەی فەرمییەوە وەردەگیرێت.',
    },
  },
  {
    id: 'sample-violation-phone',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Using a phone while driving', ar: 'استخدام الهاتف أثناء القيادة', ckb: 'بەکارهێنانی مۆبایل لە کاتی لێخوڕین' },
    description: {
      en: 'Holding or operating a mobile phone while the vehicle is in motion.',
      ar: 'حمل الهاتف المحمول أو استخدامه أثناء سير المركبة.',
      ckb: 'گرتن یان بەکارهێنانی مۆبایل لە کاتێکدا ئۆتۆمبێلەکە لە جوڵەدایە.',
    },
    penalty: {
      en: 'Penalty amount to be taken from the official schedule.',
      ar: 'قيمة الغرامة تُؤخذ من الجدول الرسمي.',
      ckb: 'بڕی سزاکە لە خشتەی فەرمییەوە وەردەگیرێت.',
    },
  },
  {
    id: 'sample-violation-seatbelt',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Not wearing a seat belt', ar: 'عدم ربط حزام الأمان', ckb: 'نەبەستنی پشتێنی سەلامەتی' },
    description: {
      en: 'Driver or passengers travelling without a fastened seat belt.',
      ar: 'قيادة أو ركوب دون ربط حزام الأمان.',
      ckb: 'شۆفێر یان سەرنشین بەبێ بەستنی پشتێنی سەلامەتی.',
    },
    penalty: {
      en: 'Penalty amount to be taken from the official schedule.',
      ar: 'قيمة الغرامة تُؤخذ من الجدول الرسمي.',
      ckb: 'بڕی سزاکە لە خشتەی فەرمییەوە وەردەگیرێت.',
    },
  },
];

export const sampleRules: TrafficRule[] = [
  {
    id: 'sample-rule-documents',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Documents you must carry', ar: 'الوثائق الواجب حملها', ckb: 'ئەو بەڵگەنامانەی دەبێت پێت بێت' },
    body: {
      en: 'Carry your driving licence, vehicle registration and valid insurance whenever you drive, and present them on request.',
      ar: 'احمل رخصة القيادة وسنوية المركبة والتأمين الساري كلما قدت، وقدّمها عند الطلب.',
      ckb: 'هەر کاتێک لێدەخوڕیت مۆڵەتی شۆفێری و تۆمارکردنی ئۆتۆمبێل و دڵنیایی کارا لەگەڵ خۆت بهێنە، و لە کاتی داواکردندا پیشانیان بدە.',
    },
  },
  {
    id: 'sample-rule-lanes',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Lane discipline', ar: 'الالتزام بالمسارات', ckb: 'پابەندبوون بە لاین' },
    body: {
      en: 'Keep to the right-hand lane except when overtaking, and signal before every lane change.',
      ar: 'التزم بالمسار الأيمن إلا عند التجاوز، وأشر قبل كل تغيير للمسار.',
      ckb: 'پابەند بە بە لاینی ڕاست جگە لە کاتی تێپەڕاندن، و پێش هەر گۆڕینی لاینێک ئاماژە بدە.',
    },
  },
  {
    id: 'sample-rule-distance',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Following distance', ar: 'مسافة الأمان', ckb: 'دووری سەلامەتی' },
    body: {
      en: 'Leave enough space to stop safely if the vehicle ahead brakes suddenly, and increase it in rain or poor visibility.',
      ar: 'اترك مسافة كافية للتوقف بأمان إذا كبح من أمامك فجأة، وزِدها في المطر أو ضعف الرؤية.',
      ckb: 'بۆشایی پێویست بهێڵەرەوە بۆ وەستانی سەلامەت ئەگەر ئۆتۆمبێلی پێشەوە لەناکاو بەرەکە بگرێت، و لە باران یان بینینی خراپدا زیادی بکە.',
    },
  },
  {
    id: 'sample-rule-alcohol',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Driving under the influence', ar: 'القيادة تحت التأثير', ckb: 'لێخوڕین لەژێر کاریگەریدا' },
    body: {
      en: 'Driving after consuming alcohol or any substance that impairs control is prohibited.',
      ar: 'يُمنع القيادة بعد تناول الكحول أو أي مادة تضعف السيطرة.',
      ckb: 'لێخوڕین دوای خواردنەوەی کحول یان هەر مادەیەک کە کۆنترۆڵ لاواز دەکات قەدەغەیە.',
    },
  },
];

export const samplePriority: PriorityScenario[] = [
  {
    id: 'sample-priority-uncontrolled',
    verified: false,
    source: PLACEHOLDER,
    title: {
      en: 'Uncontrolled intersection',
      ar: 'تقاطع غير منظّم',
      ckb: 'چوارڕیانی بێ ڕێکخەر',
    },
    description: {
      en: 'At a junction with no signs, signals or officer, priority is determined by the rule stated in the official source. Confirm the exact rule before relying on it.',
      ar: 'عند تقاطع بلا إشارات أو لافتات أو شرطي، تُحدَّد الأولوية وفق القاعدة المنصوص عليها في المصدر الرسمي. تأكد من القاعدة الدقيقة قبل الاعتماد عليها.',
      ckb: 'لە چوارڕیانێکدا کە هێما و چرا و پۆلیسی تێدا نییە، پێشینەیی بەپێی ئەو یاسایە دیاری دەکرێت کە لە سەرچاوە فەرمییەکەدا هاتووە. پێش پشتبەستن پێی، لە یاسا وردەکە دڵنیا بەرەوە.',
    },
  },
  {
    id: 'sample-priority-roundabout',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Entering a roundabout', ar: 'الدخول إلى الدوّار', ckb: 'چوونە ناو بازنە' },
    description: {
      en: 'Approach at low speed and give way as directed by the signs at the entry. The governing rule must be taken from the official source.',
      ar: 'اقترب بسرعة منخفضة وأعطِ الأولوية وفق اللافتات عند المدخل. القاعدة الحاكمة تُؤخذ من المصدر الرسمي.',
      ckb: 'بە خێرایی کەم نزیک ببەرەوە و بەپێی هێماکانی دەروازە ڕێگا بدە. یاسای پەیڕەوکراو دەبێت لە سەرچاوە فەرمییەکەوە وەربگیرێت.',
    },
  },
  {
    id: 'sample-priority-emergency',
    verified: false,
    source: PLACEHOLDER,
    title: { en: 'Emergency vehicles', ar: 'مركبات الطوارئ', ckb: 'ئۆتۆمبێلی فریاگوزاری' },
    description: {
      en: 'Ambulance, fire and police vehicles using sirens or lights have priority. Pull aside safely and let them pass.',
      ar: 'لمركبات الإسعاف والإطفاء والشرطة التي تستخدم صفارات أو أضواء الأولوية. انزوِ جانبًا بأمان ودعها تمر.',
      ckb: 'ئۆتۆمبێلی فریاکەوتن و ئاگرکوژێنەوە و پۆلیس کە فیت یان چرا بەکاردەهێنن پێشینەییان هەیە. بە سەلامەتی لاببە و ڕێگایان پێبدە.',
    },
  },
];

export const sampleQuestions: Question[] = [
  {
    id: 'sample-q-01',
    verified: false,
    source: PLACEHOLDER,
    topic: 'signs',
    prompt: {
      en: 'What must you do at an octagonal red STOP sign?',
      ar: 'ماذا يجب أن تفعل عند إشارة "قف" الحمراء الثمانية؟',
      ckb: 'لە هێمای سووری هەشت لایەنەی "وەستە" دەبێت چی بکەیت؟',
    },
    choices: [
      { id: 'a', text: { en: 'Come to a complete stop', ar: 'التوقف التام', ckb: 'وەستانی تەواو' } },
      { id: 'b', text: { en: 'Slow down only', ar: 'التخفيف من السرعة فقط', ckb: 'تەنها خێرایی کەمکردنەوە' } },
      { id: 'c', text: { en: 'Sound the horn', ar: 'استخدام المنبّه', ckb: 'لێدانی بۆری' } },
      { id: 'd', text: { en: 'Keep the same speed', ar: 'الاستمرار بالسرعة نفسها', ckb: 'بەردەوامبوون بە هەمان خێرایی' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'A STOP sign requires a full stop at the line before proceeding.',
      ar: 'تستوجب إشارة "قف" التوقف التام عند الخط قبل المتابعة.',
      ckb: 'هێمای "وەستە" وەستانی تەواو لە هێڵەکەدا پێویست دەکات پێش بەردەوامبوون.',
    },
  },
  {
    id: 'sample-q-02',
    verified: false,
    source: PLACEHOLDER,
    topic: 'signs',
    prompt: {
      en: 'A downward-pointing triangle means:',
      ar: 'المثلث الذي رأسه إلى الأسفل يعني:',
      ckb: 'سێگۆشەیەک کە سەری بەرەو خوارەوەیە واتای:',
    },
    choices: [
      { id: 'a', text: { en: 'Give way', ar: 'أعطِ الأولوية', ckb: 'ڕێگا بدە' } },
      { id: 'b', text: { en: 'No entry', ar: 'ممنوع الدخول', ckb: 'چوونەژوورەوە قەدەغەیە' } },
      { id: 'c', text: { en: 'Parking allowed', ar: 'يُسمح بالوقوف', ckb: 'ڕاگرتن ڕێپێدراوە' } },
      { id: 'd', text: { en: 'End of restriction', ar: 'نهاية التقييد', ckb: 'کۆتایی سنووردارکردن' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'The inverted triangle is the give-way sign; traffic ahead has priority.',
      ar: 'المثلث المقلوب هو إشارة إعطاء الأولوية؛ الأولوية للحركة أمامك.',
      ckb: 'سێگۆشەی هەڵگەڕاوە هێمای ڕێگادانە؛ پێشینەیی بۆ هاتوچۆی پێشەوەیە.',
    },
  },
  {
    id: 'sample-q-03',
    verified: false,
    source: PLACEHOLDER,
    topic: 'signs',
    prompt: {
      en: 'A red circle with a white horizontal bar means:',
      ar: 'دائرة حمراء بشريط أبيض أفقي تعني:',
      ckb: 'بازنەیەکی سوور بە هێڵێکی سپی ئاسۆیی واتای:',
    },
    choices: [
      { id: 'a', text: { en: 'No entry', ar: 'ممنوع الدخول', ckb: 'چوونەژوورەوە قەدەغەیە' } },
      { id: 'b', text: { en: 'One way', ar: 'اتجاه واحد', ckb: 'یەک ئاراستە' } },
      { id: 'c', text: { en: 'Hospital ahead', ar: 'مستشفى أمامك', ckb: 'نەخۆشخانە لە پێشەوە' } },
      { id: 'd', text: { en: 'Road narrows', ar: 'ضيق الطريق', ckb: 'ڕێگا تەنگ دەبێتەوە' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'This is the no-entry sign: no vehicle may pass beyond it.',
      ar: 'هذه إشارة ممنوع الدخول: لا يجوز لأي مركبة تجاوزها.',
      ckb: 'ئەمە هێمای قەدەغەبوونی چوونەژوورەوەیە: هیچ ئۆتۆمبێلێک نابێت تێیپەڕێنێت.',
    },
  },
  {
    id: 'sample-q-04',
    verified: false,
    source: PLACEHOLDER,
    topic: 'signs',
    prompt: {
      en: 'A number inside a red-bordered circle indicates:',
      ar: 'رقم داخل دائرة بإطار أحمر يشير إلى:',
      ckb: 'ژمارەیەک لەناو بازنەیەکی چوارچێوە سووردا ئاماژەیە بۆ:',
    },
    choices: [
      { id: 'a', text: { en: 'The maximum permitted speed', ar: 'السرعة القصوى المسموح بها', ckb: 'زۆرترین خێرایی ڕێپێدراو' } },
      { id: 'b', text: { en: 'The minimum speed', ar: 'السرعة الدنيا', ckb: 'کەمترین خێرایی' } },
      { id: 'c', text: { en: 'The distance to the next town', ar: 'المسافة إلى المدينة التالية', ckb: 'دووری بۆ شاری دواتر' } },
      { id: 'd', text: { en: 'The lane number', ar: 'رقم المسار', ckb: 'ژمارەی لاین' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'A red-bordered circle is a prohibitory sign; the number caps your speed.',
      ar: 'الدائرة ذات الإطار الأحمر إشارة منع؛ والرقم يحدد سقف سرعتك.',
      ckb: 'بازنەی چوارچێوە سوور هێمای قەدەغەکردنە؛ ژمارەکە سنووری خێراییەکەت دیاری دەکات.',
    },
  },
  {
    id: 'sample-q-05',
    verified: false,
    source: PLACEHOLDER,
    topic: 'signs',
    prompt: {
      en: 'Triangular signs with a red border generally:',
      ar: 'الإشارات المثلثة ذات الإطار الأحمر عمومًا:',
      ckb: 'هێما سێگۆشەکان بە چوارچێوەی سوور بەگشتی:',
    },
    choices: [
      { id: 'a', text: { en: 'Warn of a hazard ahead', ar: 'تحذر من خطر أمامك', ckb: 'ئاگادار دەکەنەوە لە مەترسییەکی پێشەوە' } },
      { id: 'b', text: { en: 'Give directions', ar: 'تعطي الاتجاهات', ckb: 'ئاراستە دیاری دەکەن' } },
      { id: 'c', text: { en: 'Mark parking areas', ar: 'تحدد مواقف السيارات', ckb: 'شوێنی ڕاگرتن دیاری دەکەن' } },
      { id: 'd', text: { en: 'Show services', ar: 'تدل على الخدمات', ckb: 'خزمەتگوزارییەکان پیشان دەدەن' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Red-bordered triangles are the warning family of signs.',
      ar: 'المثلثات ذات الإطار الأحمر هي عائلة إشارات التحذير.',
      ckb: 'سێگۆشە چوارچێوە سوورەکان خێزانی هێماکانی ئاگادارکردنەوەن.',
    },
  },
  {
    id: 'sample-q-06',
    verified: false,
    source: PLACEHOLDER,
    topic: 'signs',
    prompt: {
      en: 'What does a pedestrian crossing warning sign require of you?',
      ar: 'ماذا تتطلب منك إشارة التحذير من ممر المشاة؟',
      ckb: 'هێمای ئاگادارکردنەوەی پەڕینەوەی پیادە چیت لێ داوا دەکات؟',
    },
    choices: [
      { id: 'a', text: { en: 'Reduce speed and be ready to give way', ar: 'تخفيف السرعة والاستعداد لإعطاء الأولوية', ckb: 'کەمکردنەوەی خێرایی و ئامادەبوون بۆ ڕێگادان' } },
      { id: 'b', text: { en: 'Accelerate to clear the area', ar: 'الإسراع لتجاوز المنطقة', ckb: 'خێراکردن بۆ بەجێهێشتنی ناوچەکە' } },
      { id: 'c', text: { en: 'Stop and park', ar: 'التوقف والوقوف', ckb: 'وەستان و ڕاگرتن' } },
      { id: 'd', text: { en: 'Nothing in particular', ar: 'لا شيء بالتحديد', ckb: 'هیچی تایبەت' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Warning signs demand anticipation: slow down and prepare to yield.',
      ar: 'تستوجب إشارات التحذير الاستباق: خفّف السرعة واستعد لإعطاء الأولوية.',
      ckb: 'هێماکانی ئاگادارکردنەوە پێشبینی دەخوازن: خێرایی کەم بکەرەوە و ئامادەبە بۆ ڕێگادان.',
    },
  },
  {
    id: 'sample-q-07',
    verified: false,
    source: PLACEHOLDER,
    topic: 'priority',
    prompt: {
      en: 'An ambulance approaches with siren and lights on. You should:',
      ar: 'تقترب سيارة إسعاف بصفارة وأضواء. عليك أن:',
      ckb: 'ئۆتۆمبێلێکی فریاکەوتن بە فیت و چراوە نزیک دەبێتەوە. دەبێت:',
    },
    choices: [
      { id: 'a', text: { en: 'Pull aside safely and let it pass', ar: 'تنزوي جانبًا بأمان وتدعها تمر', ckb: 'بە سەلامەتی لاببیت و ڕێگای پێبدەیت' } },
      { id: 'b', text: { en: 'Brake hard where you are', ar: 'تكبح بقوة في مكانك', ckb: 'لە شوێنی خۆت بە توندی بەرەکە بگریت' } },
      { id: 'c', text: { en: 'Speed up to stay ahead', ar: 'تسرع لتبقى أمامها', ckb: 'خێرا بکەیت بۆ ئەوەی لە پێشەوە بمێنیتەوە' } },
      { id: 'd', text: { en: 'Ignore it', ar: 'تتجاهلها', ckb: 'پشتگوێی بخەیت' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Emergency vehicles in service have priority; clear the way without creating a hazard.',
      ar: 'لمركبات الطوارئ أثناء المهمة الأولوية؛ أفسح الطريق دون خلق خطر.',
      ckb: 'ئۆتۆمبێلی فریاگوزاری لە کاتی ئەرکدا پێشینەییان هەیە؛ بەبێ دروستکردنی مەترسی ڕێگا خۆش بکە.',
    },
  },
  {
    id: 'sample-q-08',
    verified: false,
    source: PLACEHOLDER,
    topic: 'priority',
    prompt: {
      en: 'A police officer directing traffic signals you to stop, but the light is green. You:',
      ar: 'شرطي ينظّم المرور يشير لك بالتوقف، لكن الإشارة خضراء. أنت:',
      ckb: 'پۆلیسێکی ڕێکخەری هاتوچۆ ئاماژەت پێدەدات بوەستیت، بەڵام چراکە سەوزە. تۆ:',
    },
    choices: [
      { id: 'a', text: { en: 'Obey the officer', ar: 'تطيع الشرطي', ckb: 'گوێڕایەڵی پۆلیسەکە دەبیت' } },
      { id: 'b', text: { en: 'Obey the light', ar: 'تطيع الإشارة', ckb: 'گوێڕایەڵی چراکە دەبیت' } },
      { id: 'c', text: { en: 'Choose either', ar: 'تختار أيًا منهما', ckb: 'هەر یەکێکیان هەڵدەبژێریت' } },
      { id: 'd', text: { en: 'Sound the horn and continue', ar: 'تستخدم المنبّه وتتابع', ckb: 'بۆری لێدەدەیت و بەردەوام دەبیت' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Instructions from an authorised officer override signals and signs.',
      ar: 'تعليمات رجل المرور المخوّل تعلو على الإشارات واللافتات.',
      ckb: 'ڕێنمایی پۆلیسی دەسەڵاتدار لە چرا و هێماکان بەرزترە.',
    },
  },
  {
    id: 'sample-q-09',
    verified: false,
    source: PLACEHOLDER,
    topic: 'priority',
    prompt: {
      en: 'On a narrow road where two vehicles cannot pass, priority is decided by:',
      ar: 'في طريق ضيق لا يتسع لمركبتين، تُحدَّد الأولوية بواسطة:',
      ckb: 'لە ڕێگایەکی تەنگدا کە دوو ئۆتۆمبێل ناتوانن تێپەڕن، پێشینەیی دیاری دەکرێت بە:',
    },
    choices: [
      { id: 'a', text: { en: 'The rule stated in the official regulation', ar: 'القاعدة المنصوص عليها في النظام الرسمي', ckb: 'ئەو یاسایەی لە ڕێنمایی فەرمیدا هاتووە' } },
      { id: 'b', text: { en: 'Whoever sounds the horn first', ar: 'من يستخدم المنبّه أولًا', ckb: 'ئەوەی یەکەم بۆری لێدەدات' } },
      { id: 'c', text: { en: 'The larger vehicle always', ar: 'المركبة الأكبر دائمًا', ckb: 'هەمیشە ئۆتۆمبێلە گەورەکە' } },
      { id: 'd', text: { en: 'The faster vehicle', ar: 'المركبة الأسرع', ckb: 'ئۆتۆمبێلە خێراکە' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Right of way on narrow roads follows the regulation, not driver improvisation.',
      ar: 'حق المرور في الطرق الضيقة يتبع النظام، لا اجتهاد السائق.',
      ckb: 'مافی تێپەڕین لە ڕێگا تەنگەکاندا بەپێی ڕێنماییەکەیە، نەک بڕیاری شۆفێر.',
    },
  },
  {
    id: 'sample-q-10',
    verified: false,
    source: PLACEHOLDER,
    topic: 'priority',
    prompt: {
      en: 'Before changing lanes you must:',
      ar: 'قبل تغيير المسار يجب أن:',
      ckb: 'پێش گۆڕینی لاین دەبێت:',
    },
    choices: [
      { id: 'a', text: { en: 'Signal, check mirrors and blind spot', ar: 'تشير وتتحقق من المرايا والنقطة العمياء', ckb: 'ئاماژە بدەیت و ئاوێنە و خاڵی کوێر بپشکنیت' } },
      { id: 'b', text: { en: 'Signal only', ar: 'تشير فقط', ckb: 'تەنها ئاماژە بدەیت' } },
      { id: 'c', text: { en: 'Move first, then signal', ar: 'تنتقل أولًا ثم تشير', ckb: 'یەکەم بجوڵێیت، پاشان ئاماژە بدەیت' } },
      { id: 'd', text: { en: 'Accelerate sharply', ar: 'تسرع بشدة', ckb: 'بە توندی خێرا بکەیت' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Signal, mirrors and a blind-spot check together prevent side collisions.',
      ar: 'الإشارة والمرايا وفحص النقطة العمياء معًا تمنع الاصطدامات الجانبية.',
      ckb: 'ئاماژە و ئاوێنە و پشکنینی خاڵی کوێر پێکەوە ڕێگری لە پێکدادانی لاتەنیشت دەکەن.',
    },
  },
  {
    id: 'sample-q-11',
    verified: false,
    source: PLACEHOLDER,
    topic: 'priority',
    prompt: {
      en: 'When entering a roundabout you should:',
      ar: 'عند الدخول إلى الدوّار عليك أن:',
      ckb: 'کاتێک دەچیتە ناو بازنەوە دەبێت:',
    },
    choices: [
      { id: 'a', text: { en: 'Slow down and give way as the signs require', ar: 'تخفف السرعة وتعطي الأولوية حسب اللافتات', ckb: 'خێرایی کەم بکەیتەوە و بەپێی هێماکان ڕێگا بدەیت' } },
      { id: 'b', text: { en: 'Enter at full speed', ar: 'تدخل بأقصى سرعة', ckb: 'بە تەواوی خێرایی بچیتە ژوورەوە' } },
      { id: 'c', text: { en: 'Stop in the middle', ar: 'تتوقف في المنتصف', ckb: 'لە ناوەڕاستدا بوەستیت' } },
      { id: 'd', text: { en: 'Reverse if you miss the exit', ar: 'ترجع للخلف إذا فاتك المخرج', ckb: 'ئەگەر دەرچەکەت لەدەست چوو بگەڕێیتەوە دواوە' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'Approach slowly and yield per the entry signs; never reverse in a roundabout.',
      ar: 'اقترب ببطء وأعطِ الأولوية حسب لافتات المدخل؛ ولا ترجع للخلف أبدًا داخل الدوّار.',
      ckb: 'بە هێواشی نزیک ببەرەوە و بەپێی هێماکانی دەروازە ڕێگا بدە؛ هەرگیز لە بازنەدا مەگەڕێوە دواوە.',
    },
  },
  {
    id: 'sample-q-12',
    verified: false,
    source: PLACEHOLDER,
    topic: 'priority',
    prompt: {
      en: 'At a pedestrian crossing with someone already crossing, you must:',
      ar: 'عند ممر مشاة يعبره أحدهم بالفعل، يجب أن:',
      ckb: 'لە پەڕینەوەی پیادەدا کە کەسێک پێشتر دەست بە پەڕینەوە کردووە، دەبێت:',
    },
    choices: [
      { id: 'a', text: { en: 'Stop and let them finish crossing', ar: 'تتوقف وتدعه يكمل العبور', ckb: 'بوەستیت و ڕێگای بدەیت پەڕینەوەکەی تەواو بکات' } },
      { id: 'b', text: { en: 'Drive around them', ar: 'تلتف حوله', ckb: 'بەدەوریدا بسووڕێیتەوە' } },
      { id: 'c', text: { en: 'Sound the horn', ar: 'تستخدم المنبّه', ckb: 'بۆری لێبدەیت' } },
      { id: 'd', text: { en: 'Continue at the same speed', ar: 'تتابع بالسرعة نفسها', ckb: 'بە هەمان خێرایی بەردەوام بیت' } },
    ],
    correctChoiceId: 'a',
    explanation: {
      en: 'A pedestrian already on the crossing has priority until they reach the far side.',
      ar: 'للمشاة الذين بدأوا العبور الأولوية حتى يصلوا الجهة الأخرى.',
      ckb: 'پیادەیەک کە دەستی بە پەڕینەوە کردووە پێشینەیی هەیە هەتا دەگاتە ئەوبەر.',
    },
  },
];
