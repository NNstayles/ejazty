/**
 * Study notes for the Traffic rules section.
 *
 * This is the largest section in the app and the one the exam draws on most
 * heavily: 206 bank questions carry `topic: 'rules'`. Those questions are still
 * the exam; these notes are what a learner reads *first*.
 *
 * Two rules were followed while condensing them, and both are worth keeping:
 *
 * - **One fact, one note.** The bank asks the same thing from several
 *   directions — five separate questions establish that overtaking is
 *   prohibited near a pedestrian crossing, four that parking on a bridge or in
 *   a tunnel is not allowed. Each is stated once here.
 * - **Rules say what to do; the Violations section says what it costs.** The
 *   bank attaches a penalty to most of these, and printing the fine beside
 *   every rule would restate the whole Violations section inside this one. Any
 *   figure — a fine, a term of imprisonment — belongs there.
 *
 * The fourteen general road-code rules that used to sit here as their own
 * record type have been folded into these notes rather than kept alongside
 * them: a "Keep your distance" card and a "Speed and following distance" note
 * in the same list is exactly the duplication a reader notices.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE } from './source';

export const ruleNotes: StudyNote[] = [
  // ---------------------------------------------------------------- speed --
  {
    id: 'note-speed-limits',
    topic: 'rules',
    group: 'speed',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٤٦، س ٤٨، س ٤٩، س ٢٧٢' },
    title: {
      en: 'The speed limits worth memorising',
      ar: 'حدود السرعة التي يجب حفظها',
      ckb: 'ئەو سنوورە خێراییانەی شایانی لەبەرکردنن',
    },
    body: {
      en: 'Four figures cover almost every road you will be asked about. Learn them as numbers, and remember that each is a maximum for good conditions rather than a speed you are entitled to hold.',
      ar: 'أربعة أرقام تغطي تقريبًا كل طريق ستُسأل عنه. احفظها كأرقام، وتذكّر أن كلًّا منها حدّ أقصى للظروف الجيدة لا سرعة تستحقّ الالتزام بها دائمًا.',
      ckb: 'چوار ژمارە بەنزیکەیی هەموو ئەو ڕێگایانە دەگرێتەوە کە لێت دەپرسرێت. وەک ژمارە فێریان بە، و لەبیرت بێت هەریەکەیان زۆرترین بڕە بۆ بارودۆخی باش، نەک خێراییەک کە مافی تۆ بێت.',
    },
    points: [
      {
        en: '100 km/h: the maximum for small vehicles.',
        ar: '١٠٠ كم/س: الحد الأقصى للمركبات الصغيرة.',
        ckb: '١٠٠ کم/کاتژمێر: زۆرترین بڕ بۆ ئۆتۆمبێلە بچووکەکان.',
      },
      {
        en: '110 km/h on expressways in the Kurdistan Region for small vehicles, and 80 km/h there for lorries.',
        ar: '١١٠ كم/س على الطرق السريعة في إقليم كردستان للمركبات الصغيرة، و٨٠ كم/س عليها للشاحنات.',
        ckb: '١١٠ کم/کاتژمێر لەسەر ڕێگا خێراکانی هەرێمی کوردستان بۆ ئۆتۆمبێلە بچووکەکان، و ٨٠ کم/کاتژمێر بۆ بارهەڵگرەکان.',
      },
      {
        en: '30 km/h approaching pedestrian crossings, nurseries, schools, government offices and crowded markets.',
        ar: '٣٠ كم/س عند الاقتراب من ممرات المشاة ودور الحضانة والمدارس والدوائر الحكومية والأسواق المزدحمة.',
        ckb: '٣٠ کم/کاتژمێر لە نزیکبوونەوە لە پەڕینگەی پیادە و باخچەی ساوایان و قوتابخانە و فەرمانگە حکوومییەکان و بازاڕە قەرەباڵغەکان.',
      },
      {
        en: 'At night on a dual carriageway, half the speed legally set for that road.',
        ar: 'ليلًا على الطرق المزدوجة: نصف السرعة المقررة قانونًا لذلك الطريق.',
        ckb: 'بە شەو لەسەر ڕێگا دووقۆڵییەکان: نیوەی ئەو خێراییەی بە یاسا بۆ ئەو ڕێگایە دیاریکراوە.',
      },
    ],
  },
  {
    id: 'note-following-distance',
    topic: 'rules',
    group: 'speed',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣٧، س ١٣٠، س ١٣٢، س ٢٧٠' },
    title: {
      en: 'The gap in front of you',
      ar: 'المسافة أمامك',
      ckb: 'ئەو مەودایەی لەبەردەمتە',
    },
    body: {
      en: 'The gap to the vehicle ahead is the only part of a collision you control after it has begun. Pick a fixed point at the roadside and count as the car in front passes it: at least three seconds by day, and about four at night, because distance is far harder to judge in the dark.',
      ar: 'المسافة إلى المركبة التي أمامك هي الجزء الوحيد من الحادث الذي تتحكم فيه بعد أن يبدأ. اختر نقطة ثابتة على جانب الطريق وابدأ العدّ عند تجاوز المركبة أمامك لها: ثلاث ثوانٍ على الأقل نهارًا، ونحو أربع ليلًا، لأن تقدير المسافة في الظلام أصعب بكثير.',
      ckb: 'ئەو مەودایەی بۆ ئۆتۆمبێلی پێشەوە تاکە بەشی ڕووداوەکەیە کە دوای دەستپێکردنی کۆنترۆڵی دەکەیت. خاڵێکی جێگیر لە قەراغی ڕێگا هەڵبژێرە و کاتێک ئۆتۆمبێلی پێشەوە پێیدا تێدەپەڕێت بژمێرە: بەلایەنی کەم سێ چرکە بە ڕۆژ، و نزیکەی چوار چرکە بە شەو، چونکە هەڵسەنگاندنی مەودا لە تاریکیدا زۆر قورستەرە.',
    },
    points: [
      {
        en: 'At 30 km/h the gap works out at roughly 10 metres.',
        ar: 'عند ٣٠ كم/س تكون المسافة نحو ١٠ أمتار.',
        ckb: 'لە ٣٠ کم/کاتژمێردا مەودایەکە نزیکەی ١٠ مەترە.',
      },
      {
        en: 'Stretch it on a wet road and at expressway speed, the two places it matters most.',
        ar: 'وسّعها على الطريق المبتل وعند السرعات العالية على الطرق السريعة، وهما أكثر ما تهمّ فيه.',
        ckb: 'لە ڕێگای تەڕ و لە خێرایی بەرزی ڕێگا خێراکاندا فراوانتری بکە، ئەو دوو شوێنەی زۆرترین گرنگی هەیە.',
      },
      {
        en: 'If the vehicle ahead stops suddenly, slow or stop rather than pulling out. It has probably seen something you have not.',
        ar: 'إذا توقفت المركبة أمامك فجأة، فخفّف أو قف بدل الانحراف، فالأرجح أنها رأت ما لم تره أنت.',
        ckb: 'ئەگەر ئۆتۆمبێلی پێشەوە لەناکاو وەستا، خێرایی کەم بکەرەوە یان بوەستە لەبری لادان، لەوانەیە شتێکی بینیبێت کە تۆ نەتبینیوە.',
      },
    ],
  },
  {
    id: 'note-speed-is-what-you-change',
    topic: 'rules',
    group: 'speed',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٧، س ١٤٧، س ٢٠٢، ص س ١٤٧' },
    title: {
      en: 'Speed is the first thing to change',
      ar: 'السرعة أول ما يُغيَّر',
      ckb: 'خێرایی یەکەم شتە کە دەگۆڕدرێت',
    },
    body: {
      en: 'Almost every hazard in the exam has the same first answer: reduce speed. It buys time for every other decision. Slowing has to happen before the hazard: speed comes down before you approach a turn, not once you are already in it.',
      ar: 'لكل خطر تقريبًا في الاختبار الجواب الأول نفسه: خفّف السرعة. فهي تشتري وقتًا لكل قرار آخر. لكن التخفيف يجب أن يسبق الخطر: السرعة تنخفض قبل الاقتراب من الاستدارة، لا بعد الدخول فيها.',
      ckb: 'بەنزیکەیی هەموو مەترسییەک لە تاقیکردنەوەکەدا هەمان یەکەم وەڵامی هەیە: خێرایی کەم بکەرەوە. کات بۆ هەموو بڕیارێکی تر دەکڕێت. بەڵام کەمکردنەوەکە دەبێت پێش مەترسییەکە بێت: خێرایی پێش نزیکبوونەوە لە سووڕانەوەکە دادەبەزێت، نەک دوای چوونە ناوی.',
    },
    points: [
      {
        en: 'Judge your speed from the speedometer, not from how fast the road feels.',
        ar: 'قدّر سرعتك من عدّاد السرعة، لا من إحساسك بالطريق.',
        ckb: 'خێراییەکەت لە خێراییپێوەکەوە هەڵبسەنگێنە، نەک لەو هەستەی ڕێگاکە پێت دەدات.',
      },
      {
        en: 'On a busy main street: keep the gap, stay in your lane and pay attention, and do not weave.',
        ar: 'في شارع رئيس مزدحم: حافظ على المسافة والتزم بمسارك وانتبه، ولا تتنقّل بين المسارات.',
        ckb: 'لە شەقامێکی سەرەکی قەرەباڵغدا: مەودا بپارێزە، لە لەینەکەت بمێنەرەوە و ئاگاداربە، مەگەڕێ بەناو لەینەکاندا.',
      },
    ],
  },

  // ----------------------------------------------------------- overtaking --
  {
    id: 'note-overtaking-how',
    topic: 'rules',
    group: 'overtaking',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥، س ١٠، س ١٤، س ١٦٩، س ١٩٦، ص س ١٤٦' },
    title: {
      en: 'Overtake on the left, and only when you are sure',
      ar: 'التجاوز من اليسار وعند التأكد التام',
      ckb: 'لە لای چەپەوە تێپەڕێنە، تەنها کاتێک دڵنیایت',
    },
    body: {
      en: 'Overtaking is done on the left. The responsibility for the road being clear rests entirely on the overtaking driver, not on the driver ahead, who owes you no signal and no consent.',
      ar: 'يكون التجاوز من جهة اليسار. ومسؤولية خلوّ الطريق تقع كاملة على السائق المتجاوز، لا على السائق الذي أمامك، فهو لا يدين لك بإشارة ولا بموافقة.',
      ckb: 'تێپەڕاندن لە لای چەپەوە دەکرێت. بەرپرسیارێتی بەتاڵبوونی ڕێگاکە بە تەواوی لەسەر شانی ئەو شۆفێرەیە کە تێدەپەڕێنێت، نەک ئەو شۆفێرەی پێشەوە، چونکە نە ئیشارەت و نە ڕەزامەندیت لێ قەرزارە.',
    },
    points: [
      {
        en: 'Signal before you pull out, not as you pull out.',
        ar: 'أشِر قبل الانحراف، لا أثناءه.',
        ckb: 'پێش لادان ئیشارەت بدە، نەک لە کاتی لاداندا.',
      },
      {
        en: 'Clear visibility is a condition everywhere overtaking is allowed, and a broken line does not create it.',
        ar: 'وضوح الرؤية شرط في كل مكان يُسمح فيه بالتجاوز، والخط المتقطّع لا يصنعه.',
        ckb: 'ڕوونی دیمەن مەرجێکە لە هەر شوێنێک تێپەڕاندنی تێدا ڕێپێدراوە، هێڵی پچڕپچڕ دروستی ناکات.',
      },
      {
        en: 'The right-hand lane may be used to overtake in one case only: the driver ahead has signalled a left turn.',
        ar: 'لا يُستخدم المسار الأيمن للتجاوز إلا في حالة واحدة: أن يكون السائق أمامك قد أشار إلى الانعطاف يسارًا.',
        ckb: 'لەینی ڕاست تەنها لە یەک حاڵەتدا بۆ تێپەڕاندن بەکاردێت: کاتێک شۆفێری پێشەوە ئیشارەتی لادان بۆ چەپی داوە.',
      },
      {
        en: 'Two vehicles at once only when the opposing lane is completely clear and nothing else bars the manoeuvre.',
        ar: 'ولا تتجاوز مركبتين معًا إلا إذا كان المسار المقابل خاليًا تمامًا ولا مانع آخر من التجاوز.',
        ckb: 'دوو ئۆتۆمبێل بە یەکجار تەنها کاتێک لەینی بەرامبەر بە تەواوی بەتاڵە و هیچ ڕێگرێکی تر نییە.',
      },
    ],
  },
  {
    id: 'note-overtaking-prohibited',
    topic: 'rules',
    group: 'overtaking',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٨، س ١٦، س ١٧، س ٣٣، س ١٤٩، س ٢٤٣، س ٢٤٥' },
    title: {
      en: 'Where overtaking is prohibited outright',
      ar: 'أين يُمنع التجاوز منعًا مطلقًا',
      ckb: 'لەکوێ تێپەڕاندن بە تەواوی قەدەغەیە',
    },
    body: {
      en: 'These are absolute: no sign is needed to create them, and a clear road does not excuse them. The exam asks about the list far more often than about any single one of them.',
      ar: 'هذه الحالات مطلقة: لا تحتاج إلى علامة كي تسري، وخلوّ الطريق لا يبرّرها. والاختبار يسأل عن القائمة أكثر بكثير مما يسأل عن أيّ حالة منها بمفردها.',
      ckb: 'ئەمانە ڕەهان: پێویستیان بە تابلۆ نییە بۆ ئەوەی کاربکەن، و بەتاڵی ڕێگاش بیانووی بۆ ناهێنێتەوە. تاقیکردنەوەکە زۆر زیاتر لەسەر لیستەکە دەپرسێت وەک لەسەر هەر یەکێکیان بە تەنها.',
    },
    points: [
      {
        en: 'At or near a pedestrian crossing, even with nobody on it.',
        ar: 'عند ممرات المشاة أو بالقرب منها، حتى لو لم يكن عليها أحد.',
        ckb: 'لەسەر یان لە نزیک پەڕینگەی پیادە، تەنانەت ئەگەر کەسی لەسەر نەبێت.',
      },
      {
        en: 'On a bridge, inside a tunnel, and for a short distance before a tunnel.',
        ar: 'على الجسور وداخل الأنفاق وقبل النفق بمسافة قصيرة.',
        ckb: 'لەسەر پرد، لە ناو تونێل، و بە مەودایەکی کورت پێش تونێل.',
      },
      {
        en: 'Climbing a slope on a mountain road, and anywhere your view is too short to confirm the road is clear.',
        ar: 'عند صعود المنحدرات في الطرق الجبلية، وفي أي مكان لا تكفي فيه الرؤية لتأكيد خلوّ الطريق.',
        ckb: 'لە کاتی سەرکەوتنی بنار لە ڕێگا شاخاوییەکان، و لە هەر شوێنێک دیمەنەکەت کورتە بۆ دڵنیابوون لە بەتاڵی ڕێگا.',
      },
      {
        en: 'On a slippery road, even where there is no no-overtaking sign.',
        ar: 'على الطريق الزلق، حتى حيث لا توجد علامة منع تجاوز.',
        ckb: 'لەسەر ڕێگای خلیسک، تەنانەت لەو شوێنانەی تابلۆی قەدەغەی تێپەڕاندن نییە.',
      },
      {
        en: 'Lorries may overtake only where a traffic sign designates the place for it.',
        ar: 'ولا يجوز للشاحنات التجاوز إلا في الأماكن التي تخصّصها علامات المرور لذلك.',
        ckb: 'بارهەڵگرەکان تەنها لەو شوێنانەدا دەتوانن تێپەڕێنن کە تابلۆی هاتوچۆ بۆی تەرخان کردووە.',
      },
    ],
  },
  {
    id: 'note-being-overtaken',
    topic: 'rules',
    group: 'overtaking',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٧٨' },
    title: {
      en: 'When someone is overtaking you',
      ar: 'عندما يتجاوزك أحد',
      ckb: 'کاتێک یەکێک تێت دەپەڕێنێت',
    },
    body: {
      en: 'Help the manoeuvre finish. Keep to the right-hand lane, hold a steady line and ease off the accelerator so the pass takes less road. Accelerating while you are being overtaken strands the other driver on the wrong side with nowhere to go, which is how a routine pass becomes a head-on collision.',
      ar: 'ساعد على إنهاء المناورة. التزم بالمسار الأيمن، وحافظ على خط ثابت، وارفع قدمك قليلًا عن دوّاسة الوقود كي يستغرق التجاوز طريقًا أقل. أما زيادة السرعة أثناء تجاوزك فتترك السائق الآخر في الجهة المقابلة بلا مخرج، وهكذا يتحوّل تجاوز عادي إلى اصطدام وجهًا لوجه.',
      ckb: 'یارمەتی بدە جوڵەکە تەواو بێت. لە لەینی ڕاست بمێنەوە، هێڵێکی جێگیر بگرە و پێت لەسەر پەدالی سووتەمەنی سووک بکە تاکو تێپەڕاندنەکە ڕێگای کەمتری بوێت. زیادکردنی خێرایی لە کاتی تێپەڕاندنتدا شۆفێرەکەی تر لە لای بەرامبەر بەبێ دەرچە جێدەهێڵێت، و بەم شێوەیە تێپەڕاندنێکی ئاسایی دەبێتە پێکدادانێکی ڕووبەڕوو.',
    },
  },

  // ---------------------------------------------------------------- lanes --
  {
    id: 'note-lane-discipline',
    topic: 'rules',
    group: 'lanes',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٠٠، س ١٠٦، س ١٠٧، س ١٦٢، س ٢٣٧، س ٢٥٢' },
    title: {
      en: 'Which lane you belong in',
      ar: 'في أي مسار موضعك',
      ckb: 'لە کام لەیندا شوێنی تۆیە',
    },
    body: {
      en: 'The far right is the default lane on every street. You are required to be in it whenever you are travelling below the road\'s maximum speed, so the lanes to your left stay available for traffic moving faster than you.',
      ar: 'أقصى اليمين هو المسار الافتراضي في كل شارع. ويجب أن تلتزم به كلما كنت تسير بأقل من السرعة القصوى للطريق، لتبقى المسارات على يسارك متاحة لمن يسير أسرع منك.',
      ckb: 'دوورترین لای ڕاست لەینی بنەڕەتییە لە هەموو شەقامێکدا. پێویستە تێیدا بیت هەر کاتێک بە کەمتر لە زۆرترین خێرایی ڕێگاکە دەڕۆیت، تاکو لەینەکانی لای چەپت بۆ ئەوانە بمێنێتەوە کە لە تۆ خێراترن.',
    },
    points: [
      {
        en: 'Lorries travel in the far right lane.',
        ar: 'تسير الشاحنات في المسار الأيمن الأقصى.',
        ckb: 'بارهەڵگرەکان لە دوورترین لەینی ڕاستدا دەڕۆن.',
      },
      {
        en: 'Agricultural tractors use the hard shoulder on rural roads, and are allowed only on farm roads and streets inside village boundaries.',
        ar: 'تستخدم الجرارات الزراعية الكتف على الطرق الخارجية، ولا يُسمح لها إلا بطرق المزارع والشوارع داخل حدود القرى.',
        ckb: 'تراکتەری کشتوکاڵی لە ڕێگا دەرەکییەکاندا شانی ڕێگا بەکاردەهێنێت، و تەنها لە ڕێگای کێڵگە و شەقامەکانی ناو سنووری گوند ڕێپێدراوە.',
      },
      {
        en: 'The hard shoulder is the strip at the road\'s edge, paved or not, no wider than 2.5 m.',
        ar: 'الكتف هو الشريط عند حافة الطريق، معبّدًا كان أو غير معبّد، بعرض لا يزيد على ٢٫٥ متر.',
        ckb: 'شانی ڕێگا ئەو تەنیشتەیە لە لێواری ڕێگا، قیرتاوکراو بێت یان نا، بە پانی نەک زیاتر لە ٢٫٥ مەتر.',
      },
    ],
  },
  {
    id: 'note-signalling',
    topic: 'rules',
    group: 'lanes',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٤٤، س ٢٣١، س ٢٤١' },
    title: {
      en: 'Signal every time you leave your lane',
      ar: 'أشِر كلما غادرت مسارك',
      ckb: 'هەر کاتێک لەینەکەت بەجێدەهێڵیت ئیشارەت بدە',
    },
    body: {
      en: 'The duty to indicate is triggered by one thing: intending to move out of your lane. That covers turning, changing lane, overtaking, pulling out from a stop and rejoining afterwards. Signal early, then check your mirrors and blind spot before you move: the indicator announces the manoeuvre, it does not make it safe.',
      ar: 'واجب الإشارة يقوم على أمر واحد: نيّة الخروج من مسارك. ويشمل ذلك الانعطاف وتغيير المسار والتجاوز والانطلاق من الوقوف والعودة إلى السير. أشِر مبكرًا، ثم افحص المرايا والمنطقة العمياء قبل التحرك: فالإشارة تُعلن المناورة ولا تجعلها آمنة.',
      ckb: 'ئەرکی ئیشارەتدان لەسەر یەک شت دەوەستێت: مەبەستی دەرچوون لە لەینەکەت. ئەمە لادان و گۆڕینی لەین و تێپەڕاندن و دەستپێکردن لە وەستان و گەڕانەوە بۆ ڕێگا دەگرێتەوە. زوو ئیشارەت بدە، پاشان پێش جوڵان ئاوێنە و خاڵی کوێر بپشکنە: ئیشارەت جوڵەکە ڕادەگەیەنێت، سەلامەتی ناکات.',
    },
    points: [
      {
        en: 'Left turn, left indicator. The side you signal is the side you are going to.',
        ar: 'الانعطاف يسارًا بالإشارة اليسرى. فالجهة التي تشير إليها هي الجهة التي ستذهب إليها.',
        ckb: 'لادان بۆ چەپ بە ئیشارەتی چەپ. ئەو لایەی ئیشارەتی بۆ دەدەیت ئەو لایەیە کە بۆی دەچیت.',
      },
      {
        en: 'Rejoining the traffic lane after a stop: check the road is clear, then signal right and move.',
        ar: 'وعند العودة إلى مسار السير بعد الوقوف: تأكد من خلوّ الطريق ثم أشِر يمينًا وتحرّك.',
        ckb: 'کاتی گەڕانەوە بۆ لەینی هاتوچۆ دوای وەستان: دڵنیابە ڕێگاکە بەتاڵە، پاشان ئیشارەت بۆ ڕاست بدە و بجووڵێ.',
      },
    ],
  },
  {
    id: 'note-turning',
    topic: 'rules',
    group: 'lanes',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٠٨، س ١١٠، ص س ١٤٨' },
    title: {
      en: 'Turning and turning back',
      ar: 'الانعطاف والاستدارة',
      ckb: 'لادان و سووڕانەوە',
    },
    body: {
      en: 'A right turn is four steps in order: signal right, reduce speed, check the lanes to your right are clear, then move across. Doing them in any other order, moving first and checking afterwards, is where a cyclist already alongside you gets hit.',
      ar: 'الانعطاف يمينًا أربع خطوات بترتيب: أشِر يمينًا، ثم خفّف السرعة، ثم تأكد من خلوّ المسارات على يمينك، ثم انتقل. وأي ترتيب آخر، أن تنتقل أولًا ثم تتحقق، هو ما يُصدَم فيه دراج أو دراجة نارية كانت بجانبك أصلًا.',
      ckb: 'لادان بۆ ڕاست چوار هەنگاوە بە ڕیزبەندی: ئیشارەت بۆ ڕاست بدە، خێرایی کەم بکەرەوە، دڵنیابە لەینەکانی لای ڕاستت بەتاڵن، پاشان بجووڵێ. هەر ڕیزبەندییەکی تر، یەکەم بجووڵێیت و پاشان بپشکنیت، ئەو شوێنەیە کە پاسکیل یان ماتۆڕسکیلێکی لەتەنیشتت لێی دەدرێت.',
    },
    points: [
      {
        en: 'A U-turn at traffic lights is not allowed unless a sign specifically permits it.',
        ar: 'الاستدارة عند الإشارات الضوئية غير مسموحة ما لم تسمح بها علامة صراحةً.',
        ckb: 'سووڕانەوە لەلای چرای هاتوچۆ ڕێپێدراو نییە مەگەر تابلۆیەک بە ڕوونی ڕێگای پێبدات.',
      },
      {
        en: 'A continuous line settles it: where the marking does not allow the turn, the turn is not allowed.',
        ar: 'والخط المتصل يحسم الأمر: حيث لا يسمح الخط بالاستدارة فهي غير مسموحة.',
        ckb: 'هێڵی بەردەوام بڕیارەکە دەدات: لەو شوێنەی هێڵەکە ڕێگا بە سووڕانەوە نادات، سووڕانەوە ڕێپێدراو نییە.',
      },
      {
        en: 'Changing lane while entering a roundabout is not permitted.',
        ar: 'ولا يجوز تغيير المسار عند دخول الدوّار.',
        ckb: 'گۆڕینی لەین لە کاتی چوونە ناو خولانەوەدا ڕێپێدراو نییە.',
      },
    ],
  },
  {
    id: 'note-reversing',
    topic: 'rules',
    group: 'lanes',
    verified: true,
    // The guide states the distance twice and not identically: س ١١١ gives 10 m
    // for a reverse on an inner-city road, س ٢٦٤ gives 5 m for the general case
    // of reversing out of necessity. Both are printed here rather than one being
    // chosen, because a learner meets both wordings in the bank.
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١١١، س ٢٦٤' },
    title: {
      en: 'Reversing is a last resort',
      ar: 'الرجوع للخلف حلّ أخير',
      ckb: 'گەڕانەوە بۆ دواوە دوا چارەیە',
    },
    body: {
      en: 'You may reverse when parking, and otherwise only where there is a real necessity. It is permitted only in a place with good visibility, at a very low speed, with the hazard lights on and after checking the road behind is clear. You have priority over nobody while you are doing it.',
      ar: 'يجوز الرجوع للخلف عند الوقوف، وفي غير ذلك عند الضرورة الحقيقية فقط. ولا يُسمح به إلا في مكان جيّد الرؤية، وبسرعة بطيئة جدًّا، مع تشغيل أضواء التحذير، وبعد التأكد من خلوّ الطريق خلفك. ولا أولوية لك على أحد وأنت تفعله.',
      ckb: 'دەتوانیت لە کاتی پارککردندا بۆ دواوە بگەڕێیتەوە، و لەوەی تر تەنها لە کاتی پێویستیی ڕاستەقینەدا. تەنها لە شوێنێکی باشی دیمەن، بە خێراییەکی زۆر کەم، بە داگیرساندنی چرای مەترسی و دوای دڵنیابوون لە بەتاڵی ڕێگای دواوە ڕێپێدراوە. لە کاتی ئەنجامدانیدا بەسەر هیچ کەسێکدا پێشینەییت نییە.',
    },
    points: [
      {
        en: 'On an inner-city road the guide sets the limit at no more than 10 m.',
        ar: 'وعلى الطرق داخل المدينة يحدّد الدليل المسافة بما لا يزيد على ١٠ أمتار.',
        ckb: 'لە ڕێگاکانی ناو شاردا ڕێنماییەکە سنوورەکە بە نەک زیاتر لە ١٠ مەتر دادەنێت.',
      },
      {
        en: 'For reversing out of necessity it gives 5 m as the limit.',
        ar: 'وللرجوع عند الضرورة يعطي الدليل حدًّا قدره ٥ أمتار.',
        ckb: 'بۆ گەڕانەوە لە کاتی پێویستیدا سنوورەکە بە ٥ مەتر دەدات.',
      },
    ],
  },
  {
    id: 'note-expressways',
    topic: 'rules',
    group: 'lanes',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٨، س ٦٣، س ٢٠٩، س ٢٣٦، س ٢٤٨، س ٢٥٨' },
    title: {
      en: 'What an expressway does not allow',
      ar: 'ما لا يسمح به الطريق السريع',
      ckb: 'ئەوەی ڕێگای خێرا ڕێگای پێنادات',
    },
    body: {
      en: 'An expressway is built on the assumption that nothing on it is slow and nothing on it is stationary. Almost every extra rule follows from that.',
      ar: 'الطريق السريع مبني على افتراض ألّا يكون عليه شيء بطيء ولا شيء متوقّف. ومن ذلك تنبع كل قاعدة إضافية تقريبًا.',
      ckb: 'ڕێگای خێرا لەسەر ئەو بنەمایە دروستکراوە کە هیچ شتێکی خاو و هیچ شتێکی وەستاوی لەسەر نەبێت. بەنزیکەیی هەموو یاسایەکی زیادە لەوەوە دێت.',
    },
    points: [
      {
        en: 'Stopping to pick up or set down passengers is strictly prohibited; stopping at all is allowed only in the designated places.',
        ar: 'يُمنع منعًا باتًّا التوقف لإنزال الركاب أو تحميلهم؛ ولا يُسمح بالوقوف أصلًا إلا في الأماكن المخصصة له.',
        ckb: 'وەستان بۆ سواربوون یان دابەزینی سەرنشین بە تەواوی قەدەغەیە؛ وەستان تەنها لە شوێنە تەرخانکراوەکاندا ڕێپێدراوە.',
      },
      {
        en: 'Pedestrians, bicycles and agricultural or construction machinery may not use it at all.',
        ar: 'ولا يجوز استخدامه للمشاة ولا للدراجات ولا للآليات الزراعية أو الإنشائية.',
        ckb: 'پیادە و پاسکیل و ئامێری کشتوکاڵی یان بیناسازی هەرگیز ناتوانن بەکاریبهێنن.',
      },
      {
        en: 'No vehicle wider than 2.5 m may travel on it without a traffic vehicle escorting it and warning other road users, day or night.',
        ar: 'ولا تسير عليه مركبة يزيد عرضها على ٢٫٥ متر دون مركبة مرور ترافقها وتنبّه مستخدمي الطريق، ليلًا أو نهارًا.',
        ckb: 'هیچ ئۆتۆمبێلێکی پانتر لە ٢٫٥ مەتر ناتوانێت بەسەریدا بڕوات بەبێ ئۆتۆمبێلێکی هاتوچۆ کە هاوڕێیەتی بکات و بەکارهێنەرانی ڕێگا ئاگادار بکاتەوە، بە شەو یان بە ڕۆژ.',
      },
    ],
  },

  // -------------------------------------------------------------- parking --
  {
    id: 'note-how-to-park',
    topic: 'rules',
    group: 'parking',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٠٩، س ١١٢، س ٢١٥، ص س ٢٨، ص س ١٣٣' },
    title: {
      en: 'Parking done properly',
      ar: 'الوقوف الصحيح',
      ckb: 'پارککردنی دروست',
    },
    body: {
      en: 'Park parallel to the kerb and no more than 30 cm from it, reversing into the space rather than driving in forwards. Reversing in gives you the steering you need in the tighter half of the manoeuvre, and lets you leave facing the traffic.',
      ar: 'اركن موازيًا للرصيف وعلى بُعد لا يزيد على ٣٠ سم منه، بالدخول إلى المكان بالرجوع للخلف لا بالتقدم. فالدخول بالرجوع يمنحك التوجيه اللازم في الجزء الأضيق من المناورة، ويتيح لك الخروج في مواجهة السير.',
      ckb: 'هاوتەریب لەگەڵ ڕێڕەوی پیادە پارک بکە و بە دووریی نەک زیاتر لە ٣٠ سم لێی، بە گەڕانەوە بۆ دواوە بچۆ ناو شوێنەکە نەک بە پێشەوەچوون. گەڕانەوە ئەو ئستیرنەت پێدەدات کە لە بەشە تەنگەکەی جوڵەکەدا پێویستە، و ڕێگات دەدات بەرەو هاتوچۆکە دەربچیت.',
    },
    points: [
      {
        en: 'Leave at least 1 metre between your vehicle and the one parked next to it.',
        ar: 'اترك مترًا واحدًا على الأقل بين مركبتك والمركبة المتوقفة بجوارها.',
        ckb: 'لانیکەم ١ مەتر لە نێوان ئۆتۆمبێلەکەت و ئەوەی تەنیشتی بهێڵەرەوە.',
      },
      {
        en: 'Before you walk away: engine off, handbrake applied, doors locked.',
        ar: 'قبل أن تغادر: أطفئ المحرك، وشدّ فرامل اليد، وأقفل الأبواب.',
        ckb: 'پێش ئەوەی بڕۆیت: بزوێنەر بکوژێنەوە، بڕێکی دەستی ڕابگرە، دەرگاکان قوفڵ بدە.',
      },
      {
        en: 'Check the place itself is one where parking is legally permitted, and for how long.',
        ar: 'وتأكد من أن المكان نفسه مما يُسمح فيه بالوقوف قانونًا، ولكم من الوقت.',
        ckb: 'دڵنیابە کە خودی شوێنەکە لەوانەیە کە بە یاسا پارککردنی تێدا ڕێپێدراوە، و بۆ چەند کاتێک.',
      },
    ],
  },
  {
    id: 'note-where-not-to-park',
    topic: 'rules',
    group: 'parking',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٦٠، س ٧٠، س ٧٣، س ٨٠، س ٨٤، س ١٦٤، س ٢٦٣، ص س ٣٥، ص س ٤٢' },
    title: {
      en: 'Where you may not stop or park',
      ar: 'أين يُمنع الوقوف',
      ckb: 'لەکوێ ناتوانیت بوەستیت یان پارک بکەیت',
    },
    body: {
      en: 'The test for most of these is the same: would leaving the vehicle here force someone else into the traffic, or hide something a driver needs to see? Where the answer is yes, parking is prohibited whether or not a sign says so.',
      ar: 'المعيار في معظمها واحد: هل يدفع ترك المركبة هنا شخصًا آخر إلى وسط السير، أو يحجب شيئًا يحتاج السائق إلى رؤيته؟ فحيث يكون الجواب نعم، يُمنع الوقوف سواء وُجدت علامة أم لا.',
      ckb: 'پێوەری زۆربەیان یەکە: ئایا جێهێشتنی ئۆتۆمبێلەکە لێرە کەسێکی تر پاڵدەنێتە ناو هاتوچۆکە، یان شتێک دەشارێتەوە کە شۆفێر پێویستە بیبینێت؟ لەو شوێنەی وەڵامەکە بەڵێیە، پارککردن قەدەغەیە، تابلۆ هەبێت یان نا.',
    },
    points: [
      {
        en: 'On a pedestrian crossing, at a turning area, in a tunnel, on a bridge, or on the pavement.',
        ar: 'على ممر المشاة، وفي أماكن الاستدارة، وداخل الأنفاق، وعلى الجسور، وعلى الرصيف.',
        ckb: 'لەسەر پەڕینگەی پیادە، لە شوێنی سووڕانەوە، لە ناو تونێل، لەسەر پرد، یان لەسەر ڕێڕەوی پیادە.',
      },
      {
        en: '20 m before a bus stop or a pedestrian crossing, and 10 m after it.',
        ar: 'وعلى بُعد ٢٠ م قبل موقف الباص أو ممر المشاة و١٠ م بعده.',
        ckb: '٢٠ مەتر پێش وێستگەی پاس یان پەڕینگەی پیادە، و ١٠ مەتر دوای.',
      },
      {
        en: 'On the left-hand side of a two-way street, and alongside a vehicle already parked. Double parking is prohibited on every road, including outside mosques and other crowded places.',
        ar: 'وعلى الجهة اليسرى من شارع ذي اتجاهين، وبمحاذاة مركبة متوقفة أصلًا، فالوقوف المزدوج ممنوع في كل الطرق، بما في ذلك أمام الجوامع وسائر الأماكن المزدحمة.',
        ckb: 'لە لای چەپی شەقامێکی دوو ئاراستە، و لەتەنیشت ئۆتۆمبێلێکی پارککراو، پارککردنی دووقات لە هەموو ڕێگایەکدا قەدەغەیە، لەوانەش بەردەم مزگەوت و شوێنە قەرەباڵغەکان.',
      },
      {
        en: 'Anywhere it would obstruct traffic, hide a traffic sign, sit beside a fire hydrant, or take a space reserved for people with disabilities.',
        ar: 'وفي أي مكان يعيق السير أو يحجب علامة مرور أو يجاور صنبور إطفاء أو يشغل موقفًا مخصّصًا لذوي الإعاقة.',
        ckb: 'لە هەر شوێنێک ڕێگر بێت بۆ هاتوچۆ، یان تابلۆیەکی هاتوچۆ بشارێتەوە، یان لەتەنیشت بۆریی ئاگرکوژێنەوە بێت، یان شوێنی تەرخانکراوی کەمئەندامان بگرێت.',
      },
    ],
  },

  // ---------------------------------------------------------------- night --
  {
    id: 'note-lighting-up-time',
    topic: 'rules',
    group: 'night',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١١، س ٧٥، س ٢٥٥' },
    title: {
      en: 'When the lights go on',
      ar: 'متى تُضاء الأضواء',
      ckb: 'کەی چراکان داگیرسێنرێن',
    },
    body: {
      en: 'The law sets lighting-up time as from before sunset until after sunrise, early rather than late, because the point is being seen by others. Dusk is the part of the day in which you are least visible while still feeling that you can see perfectly well.',
      ar: 'يحدّد القانون وقت الإضاءة من قبل غروب الشمس إلى ما بعد شروقها، مبكرًا لا متأخرًا، لأن الغرض أن يراك الآخرون. والغسق هو الوقت الذي تكون فيه أقلّ ظهورًا بينما تشعر أنك ترى جيدًا تمامًا.',
      ckb: 'یاسا کاتی داگیرساندنی چرا لە پێش ئاوابوونی خۆرەوە تا دوای خۆرهەڵاتن دیاری دەکات، زوو نەک درەنگ، چونکە مەبەست ئەوەیە ئەوانی تر بتبینن. کاتی ئێوارە ئەو بەشەی ڕۆژە کە تۆ لە هەموو کات کەمتر دیاریت لە کاتێکدا هەست دەکەیت زۆر باش دەبینیت.',
    },
    points: [
      {
        en: 'Driving is prohibited unless every one of the standard lights is fitted and working, not just the headlights.',
        ar: 'ويُمنع القيادة ما لم تكن جميع الأضواء القياسية موجودة وعاملة، لا المصابيح الأمامية وحدها.',
        ckb: 'لێخوڕین قەدەغەیە مەگەر هەموو چرا ستانداردەکان دانرابن و کاربکەن، نەک تەنها چرا پێشەوەکان.',
      },
      {
        en: 'The main headlamp, main and dipped beam, must be white.',
        ar: 'ويجب أن يكون لون المصباح الرئيس، العالي والواطئ، أبيض.',
        ckb: 'ڕەنگی چرای سەرەکی، بەرز و نزم، دەبێت سپی بێت.',
      },
    ],
  },
  {
    id: 'note-main-beam',
    topic: 'rules',
    group: 'night',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١١٦، س ١٣٥، س ٢٠٧، س ٢٦٩' },
    title: {
      en: 'Main beam, and when to drop it',
      ar: 'الضوء العالي ومتى تخفضه',
      ckb: 'چرای بەرز، و کەی نزمی بکەیتەوە',
    },
    body: {
      en: 'At night on an open road you use main beam continuously; that is what it is for. There are exactly two moments to dip it: when you meet a vehicle coming the other way, and when you close on the vehicle in front.',
      ar: 'ليلًا على الطريق المفتوح تستخدم الضوء العالي باستمرار، فهذا هو الغرض منه. وهناك لحظتان اثنتان فقط لخفضه: عند ملاقاة مركبة قادمة في الاتجاه المعاكس، وعند الاقتراب من المركبة التي أمامك.',
      ckb: 'بە شەو لەسەر ڕێگای کراوە بەردەوام چرای بەرز بەکاردەهێنیت؛ ئەمە مەبەستی ئەوە. تەنها دوو ساتی هەیە کە نزمی بکەیتەوە: کاتێک ئۆتۆمبێلێکی بەرامبەرت دەبینیت، و کاتێک لە ئۆتۆمبێلی پێشەوە نزیک دەبیتەوە.',
    },
    points: [
      {
        en: 'On a single carriageway carrying both directions, main beam is for when nothing at all is coming towards you.',
        ar: 'وعلى الطريق الواحد ذي الاتجاهين يكون الضوء العالي حين لا يأتي شيء نحوك إطلاقًا.',
        ckb: 'لەسەر ڕێگایەکی تاک کە هەردوو ئاراستە هەڵدەگرێت، چرای بەرز بۆ ئەو کاتەیە کە هیچ شتێک بەرەو تۆ نایەت.',
      },
      {
        en: 'Dazzled by an oncoming driver who will not dip: signal right, move right, slow down, and steer by the road markings without crossing them.',
        ar: 'وإذا أبهرك قادم لا يخفض ضوءه: أشِر يمينًا وانتقل يمينًا وخفّف السرعة واسترشد بخطوط الطريق دون تجاوزها.',
        ckb: 'ئەگەر هاتوویەک کوێری کردیت و چراکەی نزم ناکاتەوە: ئیشارەت بۆ ڕاست بدە، بۆ ڕاست بجووڵێ، خێرایی کەم بکەرەوە، و بە هێڵەکانی ڕێگا ئاراستە بکە بەبێ ئەوەی تێیان بپەڕیت.',
      },
    ],
  },
  {
    id: 'note-night-vision',
    topic: 'rules',
    group: 'night',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣٨، س ١٨٦، س ٢٥٤' },
    title: {
      en: 'At night you can only see as far as your lights',
      ar: 'ليلًا لا ترى أبعد من ضوئك',
      ckb: 'بە شەو تەنها بەقەد چراکانت دەبینیت',
    },
    body: {
      en: 'Night driving demands more care for one concrete reason: your vision ends where the beam ends. Drive within that range, slowly enough that you could stop inside the lit road ahead of you.',
      ar: 'تتطلب القيادة الليلية حذرًا أكبر لسبب واحد ملموس: رؤيتك تنتهي حيث ينتهي الضوء. فقد ضمن هذا المدى، ببطء يكفي للتوقف داخل الجزء المضاء أمامك.',
      ckb: 'لێخوڕینی شەو وریایی زیاتر دەوێت بۆ یەک هۆکاری بەرچاو: بینینت لەو شوێنە کۆتایی دێت کە ڕووناکییەکە کۆتایی دێت. لە ناو ئەو مەودایەدا لێبخوڕە، ئەوەندە خاو کە بتوانیت لە ناو ئەو بەشە ڕووناکەی بەردەمت بوەستیت.',
    },
    points: [
      {
        en: 'Leave a longer gap than you would by day, about four seconds.',
        ar: 'واترك مسافة أطول مما تتركه نهارًا: نحو أربع ثوانٍ.',
        ckb: 'مەودایەکی درێژتر لەوەی بە ڕۆژ بهێڵەرەوە، نزیکەی چوار چرکە.',
      },
      {
        en: 'A pedestrian in light-coloured or reflective clothing is visible far sooner than one in dark clothes. Expect the ones you cannot see.',
        ar: 'والمشاة بملابس فاتحة أو عاكسة يُرَون قبل غيرهم بكثير، فتوقّع من لا تراهم.',
        ckb: 'ئەو پیادانەی جلی ڕەنگ ڕووناک یان ڕەنگدانەوەیان لەبەرە زۆر زووتر دەبینرێن، چاوەڕێی ئەوانە بە کە نایانبینیت.',
      },
    ],
  },

  // -------------------------------------------------------------- weather --
  {
    id: 'note-fog-and-dust',
    topic: 'rules',
    group: 'weather',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٢٠، س ٢٠٠، س ٢٣٨، ص س ١٤٥' },
    title: {
      en: 'Fog and dust',
      ar: 'الضباب والغبار',
      ckb: 'تەم و تۆز',
    },
    body: {
      en: 'Slow down and switch to dipped beam. Main beam is the instinctive move and the wrong one: fog and dust are suspended particles, and a strong light bounces straight back off them into your own eyes. Dipped beam must be used in daylight too whenever fog or dust is about.',
      ar: 'خفّف السرعة وحوّل إلى الضوء الواطئ. فالضوء العالي هو التصرف الغريزي وهو الخطأ: الضباب والغبار جسيمات عالقة، والضوء القوي يرتدّ عنها مباشرة إلى عينيك. ويجب استخدام الضوء الواطئ نهارًا أيضًا كلما وُجد ضباب أو غبار.',
      ckb: 'خێرایی کەم بکەرەوە و بگۆڕە بۆ چرای نزم. چرای بەرز جوڵەی غەریزییە و هەڵەیە: تەم و تۆز تۆزەڵەی هەڵواسراون، و ڕووناکی بەهێز ڕاستەوخۆ لێیان دەکەوێتەوە ناو چاوی خۆت. چرای نزم بە ڕۆژیش دەبێت بەکاربهێنرێت هەر کاتێک تەم یان تۆز هەبێت.',
    },
    points: [
      {
        en: 'Avoid overtaking and avoid changing lane: both need a view you do not have.',
        ar: 'وتجنّب التجاوز وتجنّب تغيير المسار، فكلاهما يحتاج رؤية لا تملكها.',
        ckb: 'خۆت لە تێپەڕاندن و گۆڕینی لەین بپارێزە: هەردووکیان دیمەنێکیان دەوێت کە تۆ نیتە.',
      },
      {
        en: 'If visibility goes altogether, in fog or heavy rain, stop completely and in an orderly way rather than feeling your way along.',
        ar: 'وإذا ذهبت الرؤية تمامًا في ضباب أو مطر غزير، فتوقف توقفًا كاملًا ومنظّمًا بدل التلمّس في الطريق.',
        ckb: 'ئەگەر دیمەن بە تەواوی نەما، لە تەم یان بارانی بەهێزدا، بە تەواوی و بە ڕێکی بوەستە لەبری ئەوەی بە دەستەویەخە بڕۆیت.',
      },
    ],
  },
  {
    id: 'note-snow-and-slippery',
    topic: 'rules',
    group: 'weather',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٢، س ١٣، س ٦١، س ١٤٧، س ٢٠٦، ص س ٧٨، ص س ٨٨' },
    title: {
      en: 'Snow, water and skids',
      ar: 'الثلج والماء والانزلاق',
      ckb: 'بەفر و ئاو و خلیسکان',
    },
    body: {
      en: 'On a slippery road the greatest danger is speed: brake softly, steer smoothly, and change nothing suddenly. If snow starts falling as you drive, slow down gently. Use dipped beam in daytime snow, because main beam reflects off it and blinds you.',
      ar: 'على الطريق الزلق أكبر خطر هو السرعة: اكبح برفق، ووجّه بسلاسة، ولا تغيّر شيئًا فجأة. وإذا بدأ الثلج بالتساقط وأنت تسير فخفّف السرعة برفق. وأضئ الضوء الواطئ في الثلج نهارًا، فالضوء العالي ينعكس عنه ويُعميك.',
      ckb: 'لەسەر ڕێگای خلیسک گەورەترین مەترسی خێراییە: بە نەرمی بڕێک بگرە، بە هێمنی ئاراستە بکە، هیچ شتێک بە لەناکاو مەگۆڕە. ئەگەر بەفر دەستی بە بارین کرد و تۆ لە ڕێگادایت، بە نەرمی خێرایی کەم بکەرەوە. بە ڕۆژ لە بەفردا چرای نزم داگیرسێنە، چونکە چرای بەرز لێی دەکەوێتەوە و کوێرت دەکات.',
    },
    points: [
      {
        en: 'A skid comes from speed, worn tyres or an uneven surface, usually more than one at once.',
        ar: 'والانزلاق ينشأ من السرعة أو الإطارات المتهالكة أو الطريق غير المستوي، وغالبًا من أكثر من سبب معًا.',
        ckb: 'خلیسکان لە خێرایی یان تایەی ساوە یان ڕووی ناتەختەوە دێت، بەزۆری زیاتر لە یەکێکیان پێکەوە.',
      },
      {
        en: 'To recover from one, lift off the accelerator and do not brake hard.',
        ar: 'وللخروج منه ارفع قدمك عن دوّاسة الوقود ولا تكبح بعنف.',
        ckb: 'بۆ دەرچوون لێی، پێت لەسەر پەدالی سووتەمەنی هەڵبگرە و بە توندی بڕێک مەگرە.',
      },
      {
        en: 'After driving through standing water, apply the brakes repeatedly to dry them out.',
        ar: 'وبعد المرور في مياه راكدة اضغط الفرامل مرارًا لتجفيفها.',
        ckb: 'دوای تێپەڕبوون بەناو ئاوی ڕاوەستاودا، چەند جارێک بڕێک بگرە بۆ وشککردنەوەیان.',
      },
      {
        en: 'Braking distance increases in rain. The gap that was enough on a dry road is not enough on a wet one.',
        ar: 'وتزداد مسافة الكبح في المطر. فالمسافة التي كانت تكفي على طريق جاف لا تكفي على طريق مبتلّ.',
        ckb: 'مەودای بڕێکگرتن لە بارانەوە زیاد دەکات. ئەو مەودایەی لەسەر ڕێگای وشک بەس بوو، لەسەر ڕێگای تەڕ بەس نییە.',
      },
    ],
  },
  {
    id: 'note-mountain-and-narrow-roads',
    topic: 'rules',
    group: 'weather',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٠، س ١١٣، س ١٢٢، س ٢٧٨' },
    title: {
      en: 'Mountain roads and narrow roads',
      ar: 'الطرق الجبلية والطرق الضيقة',
      ckb: 'ڕێگا شاخاوی و ڕێگا تەنگەکان',
    },
    body: {
      en: 'On a long descent the brakes are in constant use and heat up until they stop working. Weak braking and a burning smell are the warning, and the correct response is to stop and wait for them to cool, not to press harder.',
      ar: 'في النزول الطويل تُستخدم الفرامل باستمرار فتسخن حتى تكفّ عن العمل. وضعف الكبح ورائحة الاحتراق هما الإنذار، والتصرف الصحيح أن تتوقف وتنتظر حتى تبرد، لا أن تضغط أكثر.',
      ckb: 'لە داهاتنێکی درێژدا بڕێکەکان بەردەوام بەکاردێن و گەرم دەبن تا لە کارکردن دەوەستن. لاوازی بڕێکگرتن و بۆنی سووتان ئاگادارکردنەوەکەن، و کاردانەوەی دروست ئەوەیە بوەستیت و چاوەڕێ بکەیت تا سارد دەبنەوە، نەک زیاتر پەلامارییان بدەیت.',
    },
    points: [
      {
        en: 'Meeting another vehicle on a narrow or uneven road: both slow down and move as far right as the road allows, at its widest point.',
        ar: 'وعند ملاقاة مركبة أخرى على طريق ضيّق أو غير مستوٍ: يخفّف الطرفان السرعة وينتقلان إلى أقصى اليمين عند أوسع نقطة.',
        ckb: 'کاتی یەکترگرتن لەگەڵ ئۆتۆمبێلێکی تر لەسەر ڕێگایەکی تەنگ یان ناتەخت: هەردووکیان خێرایی کەم دەکەنەوە و بەرەو دوورترین لای ڕاست دەچن، لە پانترین خاڵیدا.',
      },
    ],
  },

  // --------------------------------------------------------------- people --
  {
    id: 'note-pedestrian-crossings',
    topic: 'rules',
    group: 'people',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٣، س ٥٤، س ١٩٣، س ٢٥٣' },
    title: {
      en: 'Pedestrians and crossings',
      ar: 'المشاة والممرات',
      ckb: 'پیادە و پەڕینگەکان',
    },
    body: {
      en: 'Once a pedestrian has stepped onto the crossing they have right of way, and your duty is a complete stop until they have finished crossing, not a slow roll past behind them.',
      ar: 'متى وضع أحد المشاة قدمه على الممر صارت له الأولوية، وواجبك التوقف التام حتى ينتهي من العبور، لا المرور البطيء من خلفه.',
      ckb: 'کاتێک پیادەیەک پێی خستە سەر پەڕینگەکە، مافی پێشینەیی بۆ ئەو دەبێت، و ئەرکی تۆ وەستانێکی تەواوە تا پەڕینەوەکەی تەواو دەبێت، نەک تێپەڕبوونێکی خاو لە دوایەوە.',
    },
    points: [
      {
        en: 'Where the road has a central island, pedestrians cross in two stages, so expect someone to be waiting in the middle.',
        ar: 'وحيث يوجد جزيرة وسطية يعبر المشاة على مرحلتين، فتوقّع وجود من ينتظر في المنتصف.',
        ckb: 'لەو ڕێگایانەی دوورگەی ناوەڕاستیان هەیە، پیادە بە دوو قۆناغ دەپەڕنەوە، چاوەڕێی ئەوە بە کە کەسێک لە ناوەڕاستدا چاوەڕوان بێت.',
      },
      {
        en: 'Pedestrians are bound by the traffic signs and the officer\'s orders too, anywhere, but their mistake is never your excuse.',
        ar: 'والمشاة ملزمون أيضًا بعلامات المرور وأوامر رجل المرور في كل مكان، لكن خطأهم ليس عذرًا لك أبدًا.',
        ckb: 'پیادەکانیش پابەندن بە تابلۆکانی هاتوچۆ و فەرمانی پۆلیس، لە هەر شوێنێک، بەڵام هەڵەی ئەوان هەرگیز بیانووی تۆ نییە.',
      },
    ],
  },
  {
    id: 'note-vulnerable-road-users',
    topic: 'rules',
    group: 'people',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٨، س ٤٤، س ٢٠٥، س ٢٧٦، ص س ٩٢، ص س ٩٧' },
    title: {
      en: 'The people you must slow down for',
      ar: 'من يجب أن تخفّف السرعة لأجلهم',
      ckb: 'ئەو کەسانەی دەبێت بۆیان خێرایی کەم بکەیتەوە',
    },
    body: {
      en: 'Some road users cannot be relied on to behave predictably, and the rule for all of them is the same: reduce speed and give your full attention early, before you find out whether you needed to.',
      ar: 'بعض مستخدمي الطريق لا يُعتمد على تصرفهم المتوقّع، والقاعدة معهم جميعًا واحدة: خفّف السرعة وأعطِ انتباهك الكامل مبكرًا، قبل أن تعرف إن كنت محتاجًا إليه.',
      ckb: 'هەندێک بەکارهێنەری ڕێگا ناتوانرێت پشت بەوە ببەسترێت کە بە پێشبینیکراوی هەڵسوکەوت بکەن، و یاساکە بۆ هەموویان یەکە: خێرایی کەم بکەرەوە و سەرنجی تەواو بدە بە زوویی، پێش ئەوەی بزانیت پێویستت پێی بووە یان نا.',
    },
    points: [
      {
        en: 'A blind pedestrian, or anyone helping one across: stop completely and let them cross.',
        ar: 'الكفيف أو من يساعده على العبور: قف توقفًا تامًّا ودعه يعبر.',
        ckb: 'پیادەیەکی نابینا، یان هەرکەسێک یارمەتی دەدات بپەڕێتەوە: بە تەواوی بوەستە و ڕێگای پێبدە.',
      },
      {
        en: 'Approaching a school bus, on a one-way or a two-way street: reduce speed and continue carefully.',
        ar: 'وعند الاقتراب من باص مدرسي في شارع ذي اتجاه واحد أو اتجاهين: خفّف السرعة واستمر بحذر.',
        ckb: 'لە نزیکبوونەوە لە پاسی خوێندنگە، لە شەقامی یەک ئاراستە یان دوو ئاراستە: خێرایی کەم بکەرەوە و بە وریاییەوە بەردەوام بە.',
      },
      {
        en: 'Children playing near the road, and a horse or its rider on it: slow right down.',
        ar: 'والأطفال يلعبون قرب الطريق، والخيل أو راكبه عليه: خفّف السرعة كثيرًا.',
        ckb: 'منداڵانی یاریکەر لە نزیک ڕێگا، و ئەسپ یان سوارەکەی لەسەری: زۆر خێرایی کەم بکەرەوە.',
      },
      {
        en: 'A bus stopped at the kerb hides whoever is about to walk out from in front of it.',
        ar: 'والباص المتوقف عند الرصيف يحجب من يوشك أن يخرج من أمامه.',
        ckb: 'پاسێکی وەستاو لەلای ڕێڕەوی پیادە ئەو کەسە دەشارێتەوە کە خەریکە لە پێشیەوە دەربچێت.',
      },
    ],
  },
  {
    id: 'note-passengers',
    topic: 'rules',
    group: 'people',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٤، س ٨٢، س ١٥٥، س ١٩٨، س ٢٠٨، س ٢٤٦' },
    title: {
      en: 'Carrying passengers',
      ar: 'نقل الركاب',
      ckb: 'گواستنەوەی سەرنشین',
    },
    body: {
      en: 'Passengers get in and out on the right-hand side, in every vehicle without exception, with the car stopped on the right of the road. The left side faces moving traffic, and a door opened into it is the one manoeuvre a passing driver has no chance at all of avoiding.',
      ar: 'يركب الركاب وينزلون من الجهة اليمنى، في جميع المركبات دون استثناء، والمركبة متوقفة على يمين الطريق. فالجهة اليسرى تواجه السير، والباب الذي يُفتح فيها هو الحركة الوحيدة التي لا يملك السائق المارّ أي فرصة لتفاديها.',
      ckb: 'سەرنشینەکان لە لای ڕاستەوە سوار و دادەبەزن، لە هەموو ئۆتۆمبێلێکدا بەبێ ئیستیسنا، و ئۆتۆمبێلەکە لە لای ڕاستی ڕێگا وەستابێت. لای چەپ ڕووەو هاتوچۆیە، و دەرگایەک کە بۆ ئەوێ بکرێتەوە تاکە جوڵەیەکە کە شۆفێری تێپەڕیو هیچ دەرفەتێکی نییە خۆی لێ بپارێزێت.',
    },
    points: [
      {
        en: 'Never in the boot of a car or the load bed of a pick-up or lorry.',
        ar: 'ولا يجوز أبدًا في صندوق السيارة أو حوض البيك أب أو الشاحنة.',
        ckb: 'هەرگیز لە سندووقی ئۆتۆمبێل یان بەشی بارهەڵگرتنی پیکاپ یان بارهەڵگر نا.',
      },
      {
        en: 'Never for a fare in a private vehicle.',
        ar: 'ولا بأجرة في المركبات الخصوصية.',
        ckb: 'هەرگیز بە کرێ لە ئۆتۆمبێلی تایبەتدا نا.',
      },
      {
        en: 'More passengers than the vehicle is allowed obstructs your view and your control of it. That is why the limit exists.',
        ar: 'وحمل ركاب أكثر مما تسمح به المركبة يحجب رؤيتك ويضعف سيطرتك عليها، ولهذا وُضع الحد.',
        ckb: 'سەرنشینی زیاتر لەوەی ئۆتۆمبێلەکە ڕێگای پێدراوە دیمەن و کۆنترۆڵت لەسەری کەم دەکاتەوە، بۆیە سنوورەکە هەیە.',
      },
    ],
  },
  {
    id: 'note-children-in-the-car',
    topic: 'rules',
    group: 'people',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٤٤، س ٢٦٧، س ٢٦٨' },
    title: {
      en: 'Children in the vehicle',
      ar: 'الأطفال في المركبة',
      ckb: 'منداڵان لە ناو ئۆتۆمبێلدا',
    },
    body: {
      en: 'Children aged ten or under travel in the rear, in the child seat provided for them. A child in the front seat, or held on an adult\'s lap, is never permitted: an airbag deploying into a child at that distance does the injuring itself.',
      ar: 'يجلس الأطفال في العاشرة فما دون في المقعد الخلفي، في مقعد الأطفال المخصّص لهم. أما الطفل في المقعد الأمامي أو في حضن راكب فغير مسموح به إطلاقًا: فالوسادة الهوائية التي تنفتح على طفل من تلك المسافة هي نفسها ما يصيبه.',
      ckb: 'منداڵانی دە ساڵ و کەمتر لە پشتەوە دادەنیشن، لەو کورسییەی بۆیان دانراوە. منداڵ لە کورسی پێشەوە، یان لە باوەشی کەسێکدا، لە هیچ بارودۆخێکدا ڕێپێدراو نییە: ئەو باڵگە هەواییەی لەو دووریەوە بۆ سەر منداڵێک دەکرێتەوە خۆی برینداری دەکات.',
    },
    points: [
      {
        en: 'Children must never be left alone in a vehicle, under any circumstances.',
        ar: 'ولا يجوز ترك الأطفال وحدهم في المركبة في أي حال.',
        ckb: 'هەرگیز نابێت منداڵ بە تەنها لە ناو ئۆتۆمبێلدا بەجێبهێڵدرێت، لە هیچ بارودۆخێکدا.',
      },
    ],
  },
  {
    id: 'note-seat-belts',
    topic: 'rules',
    group: 'people',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٧٦، س ١٧٥، س ٢٢٥' },
    title: {
      en: 'Seat belts',
      ar: 'أحزمة الأمان',
      ckb: 'پشتێنی سەلامەتی',
    },
    body: {
      en: 'The belt benefits the driver and the passengers alike, and the responsibility for it being worn rests on both of them together. Its main job in a serious collision is keeping you inside the vehicle: being thrown out is what turns a survivable crash into a fatal one.',
      ar: 'الحزام نافع للسائق والركاب على السواء، ومسؤولية ربطه تقع عليهما معًا. ووظيفته الأساسية في الحوادث الشديدة أن يبقيك داخل المركبة: فالاندفاع إلى الخارج هو ما يحوّل حادثًا يمكن النجاة منه إلى حادث قاتل.',
      ckb: 'پشتێنەکە سوودی بۆ شۆفێر و سەرنشینەکان وەک یەکە، و بەرپرسیارێتی بەستنی لەسەر هەردووکیانە پێکەوە. ئەرکی سەرەکی لە پێکدادانێکی توندا ئەوەیە لە ناو ئۆتۆمبێلەکەدا بتهێڵێتەوە: فڕێدرانە دەرەوە ئەوەیە کە ڕووداوێکی ڕزگاربوونی لێدەکرێت دەکاتە یەکێکی کوشندە.',
    },
  },

  // -------------------------------------------------------------- conduct --
  {
    id: 'note-officer-authority',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩٠، س ١٠٢، ص س ٦٢' },
    title: {
      en: 'The traffic officer',
      ar: 'رجل المرور',
      ckb: 'پۆلیسی هاتوچۆ',
    },
    body: {
      en: 'An officer\'s signal binds everyone, in every case and every place. It is also the only thing that can authorise something the rules forbid: driving against the flow on a one-way street is permitted on an officer\'s order in special cases, and in no other circumstance at all.',
      ar: 'إشارة رجل المرور مُلزِمة للجميع في كل حال وكل مكان. وهي أيضًا الشيء الوحيد الذي يجيز ما تمنعه القواعد: فالسير عكس الاتجاه في شارع باتجاه واحد يجوز بأمر رجل المرور في حالات خاصة، ولا يجوز في غير ذلك إطلاقًا.',
      ckb: 'ئیشارەتی پۆلیس بۆ هەمووان پابەندکەرە، لە هەموو حاڵەت و هەموو شوێنێکدا. هەروەها تاکە شتە کە دەتوانێت ڕێگا بدات بەوەی یاساکان قەدەغەیان کردووە: ڕۆیشتن بە پێچەوانەی ئاراستە لە شەقامێکی یەک ئاراستە بە فەرمانی پۆلیس لە حاڵەتی تایبەتدا ڕێپێدراوە، و لە هیچ بارودۆخێکی تردا نا.',
    },
    points: [
      {
        en: 'The traffic officer is the one entitled to stop vehicles and check they meet the soundness and safety requirements.',
        ar: 'ورجل المرور هو المخوّل بإيقاف المركبات والتأكد من استيفائها شروط الصلاحية والسلامة.',
        ckb: 'پۆلیسی هاتوچۆ ئەو کەسەیە کە مافی هەیە ئۆتۆمبێل ڕابگرێت و دڵنیا بێتەوە لە جێبەجێکردنی مەرجەکانی گونجاوی و سەلامەتی.',
      },
    ],
  },
  {
    id: 'note-alcohol-and-medicines',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩٢، س ١٢٥، س ١٢٧، ص س ٧٠' },
    title: {
      en: 'Alcohol, drugs and medicines',
      ar: 'الكحول والمخدرات والأدوية',
      ckb: 'کحول و ماددەی هۆشبەر و دەرمان',
    },
    body: {
      en: 'Driving after alcohol or illegal drugs is not merely an offence, it is treated as a crime and as dangerous in itself. You must not drive at all, and there is no quantity that makes it acceptable: alcohol slows reactions and distorts judgement long before it feels as though it has.',
      ar: 'القيادة بعد الكحول أو المخدرات ليست مجرد مخالفة، بل تُعامَل بوصفها جريمة وخطرًا بذاتها. ويجب ألّا تقود مطلقًا، ولا توجد كمية تجعل ذلك مقبولًا: فالكحول يبطئ ردود الفعل ويشوّه التقدير قبل أن تشعر بذلك بوقت طويل.',
      ckb: 'لێخوڕین دوای کحول یان ماددەی هۆشبەری نایاسایی تەنها سەرپێچییەک نییە، بەڵکو وەک تاوان و وەک مەترسییەک بە خۆی مامەڵەی لەگەڵ دەکرێت. هەرگیز نابێت لێبخوڕیت، و هیچ بڕێک نییە کە قبوڵی بکات: کحول وەڵامدانەوە خاو دەکاتەوە و هەڵسەنگاندن تێکدەدات زۆر پێش ئەوەی هەستی پێبکەیت.',
    },
    points: [
      {
        en: 'Medicines that affect your ability or your vision are the same rule: do not drive until the stated period for the effect to pass has elapsed.',
        ar: 'والأدوية التي تؤثر في قدرتك أو بصرك تخضع للقاعدة نفسها: لا تقد حتى تنقضي المدة المذكورة لزوال المفعول.',
        ckb: 'ئەو دەرمانانەی کاریگەرییان لەسەر توانا یان بینینتە هەمان یاسایان هەیە: لێمەخوڕە تا ئەو ماوەیەی بۆ نەمانی کاریگەرییەکە دیاریکراوە تێپەڕ نەبووە.',
      },
    ],
  },
  {
    id: 'note-fatigue',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٥٠، س ٢٦٠' },
    title: {
      en: 'Tiredness',
      ar: 'التعب',
      ckb: 'ماندووبوون',
    },
    body: {
      en: 'Long distances cause drowsiness, and drowsiness affects driving in much the way alcohol does. Build in a five-minute break for every hour at the wheel, before you need it rather than after.',
      ar: 'المسافات الطويلة تسبّب النعاس، والنعاس يؤثر في القيادة تأثيرًا قريبًا من تأثير الكحول. فاجعل لكل ساعة قيادة استراحة خمس دقائق، قبل أن تحتاج إليها لا بعد ذلك.',
      ckb: 'مەودای دوور خەواڵووبوون دروست دەکات، و خەواڵووبوون کاریگەری لەسەر لێخوڕین هەیە بە شێوەیەکی نزیک لە کحول. بۆ هەر کاتژمێرێکی لێخوڕین پشوویەکی پێنج خولەکی دابنێ، پێش ئەوەی پێویستت پێی بێت نەک دوای.',
    },
    points: [
      {
        en: 'If drowsiness arrives anyway: stop, rest, and change driver if you can. Opening a window is not a substitute for sleep.',
        ar: 'وإذا جاء النعاس رغم ذلك: توقف واسترح وبدّل السائق إن أمكن. وفتح النافذة ليس بديلًا عن النوم.',
        ckb: 'ئەگەر سەرەڕای ئەمە خەواڵووبوون هات: بوەستە، پشوو بدە، و ئەگەر دەتوانیت شۆفێر بگۆڕە. کردنەوەی پەنجەرە جێگرەوەی خەو نییە.',
      },
    ],
  },
  {
    id: 'note-phone-use',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩٧، س ١٧٣، س ١٩١' },
    title: {
      en: 'The phone',
      ar: 'الهاتف',
      ckb: 'مۆبایل',
    },
    body: {
      en: 'There is exactly one situation in which a mobile phone may be used: the vehicle is completely stopped, in a car park or somewhere else stopping is allowed, and it stays stopped until the call ends. Not at a red light, not in a queue, not held low out of sight.',
      ar: 'ثمة حالة واحدة فقط يجوز فيها استخدام الهاتف: أن تكون المركبة متوقفة تمامًا، في موقف أو مكان آخر يُسمح فيه بالوقوف، وأن تبقى متوقفة حتى تنتهي المكالمة. لا عند الإشارة الحمراء، ولا في الطابور، ولا ممسوكًا في الأسفل بعيدًا عن النظر.',
      ckb: 'تەنها یەک بارودۆخ هەیە کە تێیدا مۆبایل بەکاردێت: ئۆتۆمبێلەکە بە تەواوی وەستابێت، لە پارکینگ یان شوێنێکی تر کە وەستانی تێدا ڕێپێدراوە، و وەستاو بمێنێتەوە تا پەیوەندییەکە کۆتایی دێت. نە لەلای چرای سوور، نە لە ڕیزدا، نە بە نزمی و بەدوور لە چاو.',
    },
  },
  {
    id: 'note-horn-and-warning',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٦، س ٤٥، س ٢٦٢، ص س ١٤٤' },
    title: {
      en: 'The horn, and how to warn another driver',
      ar: 'المنبّه وكيف تنبّه سائقًا آخر',
      ckb: 'بۆری، و چۆن شۆفێرێکی تر ئاگادار بکەیتەوە',
    },
    body: {
      en: 'The horn is for extreme necessity only, a danger that has to be pointed out right now, and then as one short sound, not a held note. It is prohibited near schools and hospitals, and generally prohibited everywhere else except in that case.',
      ar: 'المنبّه للضرورة القصوى فقط، خطر يجب التنبيه إليه الآن، ثم بصوت واحد قصير لا بضغط مستمر. ويُمنع قرب المدارس والمستشفيات، ويُمنع عمومًا في كل مكان آخر إلا في حالة الضرورة تلك.',
      ckb: 'بۆری تەنها بۆ پێویستیی زۆرە، مەترسییەک کە دەبێت هەر ئێستا ئاماژەی پێبدرێت، و ئەویش بە یەک دەنگی کورت، نەک دەنگێکی درێژ. لە نزیک قوتابخانە و نەخۆشخانە قەدەغەیە، و بە گشتی لە هەموو شوێنێکی تریش جگە لەو حاڵەتی پێویستییە.',
    },
    points: [
      {
        en: 'The best way to alert another driver is a flash of the headlights, once or twice at most.',
        ar: 'وأفضل طريقة لتنبيه سائق آخر ومضة من المصابيح، مرة أو مرتين على الأكثر.',
        ckb: 'باشترین ڕێگا بۆ ئاگادارکردنەوەی شۆفێرێکی تر، فلاشی چراکانە، جارێک یان دوو جار بەزۆرەوە.',
      },
      {
        en: 'The warning lights and sirens fitted to emergency, police, traffic and civil-defence vehicles are reserved for them. Fitting or using one otherwise is prohibited absolutely.',
        ar: 'وأجهزة التحذير والصفارات في مركبات الطوارئ والشرطة والمرور والدفاع المدني مقصورة عليها. وتركيبها أو استعمالها في غيرها ممنوع منعًا مطلقًا.',
        ckb: 'ئەو ئامێرە ئاگادارکەرەوە و زوڕنایانەی لە ئۆتۆمبێلی فریاگوزاری و پۆلیس و هاتوچۆ و بەرگری شارستانین تەنها بۆ ئەوانن. دانان یان بەکارهێنانیان لە شوێنی تر بە تەواوی قەدەغەیە.',
      },
    ],
  },
  {
    id: 'note-breakdown',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    // The guide gives the triangle distance twice: ص س ٤٦ as 50 m in the city and
    // 100–150 m outside it according to the road's speed, ص س ١٤٩ as 50 m on
    // inner roads and 130 m on rural roads. Both are stated rather than one
    // being picked, because both wordings appear in the bank.
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٤٢، س ٢٣٢، ص س ٤٦، ص س ١٤٩' },
    title: {
      en: 'If the vehicle breaks down',
      ar: 'إذا تعطّلت المركبة',
      ckb: 'ئەگەر ئۆتۆمبێلەکە خراپ بوو',
    },
    body: {
      en: 'Three things, in this order: switch on the hazard lights, move the vehicle to the far right lane as quickly as you can, and then place the reflective triangle behind it. The order matters, because setting the triangle out first means standing in traffic to do it.',
      ar: 'ثلاثة أمور بهذا الترتيب: أضئ أضواء التحذير، وانقل المركبة إلى أقصى المسار الأيمن بأسرع ما يمكن، ثم ضع المثلث العاكس خلفها. والترتيب مهم، لأن وضع المثلث أولًا يعني الوقوف وسط السير لفعل ذلك.',
      ckb: 'سێ شت، بەم ڕیزبەندییە: چرای مەترسی داگیرسێنە، بە خێراترین شێوە ئۆتۆمبێلەکە ببە بۆ دوورترین لەینی ڕاست، پاشان سێگۆشە ڕەنگدانەوەکە لە دواوەی دابنێ. ڕیزبەندییەکە گرنگە، چونکە دانانی سەرەتا واتە وەستان لە ناو هاتوچۆدا بۆ ئەنجامدانی.',
    },
    points: [
      {
        en: 'The triangle goes where it can be seen from 50 m on inner-city roads. On rural roads the guide gives 130 m, and elsewhere 100–150 m according to the road\'s speed.',
        ar: 'ويوضع المثلث حيث يُرى من ٥٠ م على الطرق داخل المدينة. وعلى الطرق الخارجية يعطي الدليل ١٣٠ م، وفي موضع آخر ١٠٠–١٥٠ م بحسب سرعة الطريق.',
        ckb: 'سێگۆشەکە لەو شوێنە دادەنرێت کە لە ٥٠ مەترەوە ببینرێت لە ڕێگاکانی ناو شار. لە ڕێگا دەرەکییەکاندا ڕێنماییەکە ١٣٠ مەتر دەدات، و لە شوێنێکی تر ١٠٠–١٥٠ مەتر بەپێی خێرایی ڕێگاکە.',
      },
      {
        en: 'A broken-down vehicle is moved by a specialised recovery vehicle, and needs nobody at its wheel while it is being towed.',
        ar: 'وتُنقل المركبة المعطّلة بمركبة سحب متخصّصة، ولا تحتاج إلى أحد خلف مقودها أثناء السحب.',
        ckb: 'ئۆتۆمبێلی خراپبوو بە ئۆتۆمبێلێکی تایبەتی ڕاکێشان دەگوازرێتەوە، و لە کاتی ڕاکێشاندا پێویستی بە کەس نییە لە پشت ئستیرنەکەی.',
      },
    ],
  },
  {
    id: 'note-after-a-collision',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢١٢، س ٢٣٩، س ٢٤٠' },
    title: {
      en: 'After a collision, you do not leave',
      ar: 'بعد الحادث لا تغادر',
      ckb: 'دوای پێکدادان، ناڕۆیت',
    },
    body: {
      en: 'Stopping is the obligation, whatever the damage and whoever was at fault. Even where the other vehicle is parked and its owner is nowhere to be seen, you wait for them, or leave a note on the damaged vehicle with your address and telephone number.',
      ar: 'التوقف واجب مهما كان الضرر ومهما كان المخطئ. وحتى إذا كانت المركبة الأخرى متوقفة ولا أثر لصاحبها، فانتظره، أو اترك على المركبة المتضرّرة ورقة فيها عنوانك ورقم هاتفك إذا طال غيابه.',
      ckb: 'وەستان ئەرکە، زیانەکە هەرچی بێت و هەرکێ هەڵەکەی کردبێت. تەنانەت ئەگەر ئۆتۆمبێلەکەی تر پارککرابێت و خاوەنەکەی دیار نەبێت، چاوەڕێی بکە، یان ئەگەر زۆری خایاند، نووسراوێک لەسەر ئۆتۆمبێلە زیانلێکەوتووەکە بەجێبهێڵە کە ناونیشان و ژمارە تەلەفۆنەکەتی تێدابێت.',
    },
    points: [
      {
        en: 'Anything shed on the road, such as soil, gravel, building material or the remains of a burst tyre, is the driver\'s to remove and clean up, and to compensate for.',
        ar: 'وكل ما يسقط على الطريق، من تراب أو حصى أو مواد بناء أو بقايا إطار منفجر، على السائق رفعه وتنظيف الشارع والتعويض عن الضرر.',
        ckb: 'هەر شتێک لەسەر ڕێگا دەکەوێت، وەک خۆڵ، بەرد، کەرەستەی بیناسازی یان پاشماوەی تایەیەکی تەقیو، لەسەر شۆفێرە لایبەرێت و شەقامەکە پاک بکاتەوە و قەرەبووی زیانەکە بکاتەوە.',
      },
    ],
  },
  // The two emergency numbers (س ٩٦، س ٢٨٠) are deliberately not here. They are
  // asked as rules questions but they are only ever wanted at a crash, so they
  // live in the First aid section's `note-firstaid-call-for-help`. Printing them
  // in both places is the duplication this rewrite exists to remove.
  {
    id: 'note-loads',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٨٣، س ١٨٨، س ٢١٧' },
    title: {
      en: 'Loads and what may stick out',
      ar: 'الحمولة وما يجوز أن يبرز منها',
      ckb: 'بار و ئەوەی بۆی هەیە دەربکەوێت',
    },
    body: {
      en: 'A load has to be covered and secured before the vehicle moves, and there are hard limits on how far it may project beyond the bodywork.',
      ar: 'يجب تغطية الحمولة وتثبيتها قبل تحرّك المركبة، وثمة حدود صارمة لمقدار بروزها عن هيكل المركبة.',
      ckb: 'دەبێت بارەکە پێش جوڵانی ئۆتۆمبێلەکە داپۆشرێت و توند بکرێت، و سنووری توند هەیە بۆ ئەوەی چەند لە جەستەی ئۆتۆمبێلەکە دەربکەوێت.',
    },
    points: [
      {
        en: 'To the sides: 15 cm at most.',
        ar: 'إلى الجانبين: ١٥ سم على الأكثر.',
        ckb: 'بۆ لاکان: ١٥ سم بەزۆرەوە.',
      },
      {
        en: 'To the front or rear: 50 cm at most, with a red flag attached to the end.',
        ar: 'وإلى الأمام أو الخلف: ٥٠ سم على الأكثر، مع تثبيت راية حمراء في طرفها.',
        ckb: 'بۆ پێشەوە یان دواوە: ٥٠ سم بەزۆرەوە، لەگەڵ ئاڵایەکی سوور کە بە کۆتاییەکەیەوە ببەسترێت.',
      },
    ],
  },
  {
    id: 'note-never-allowed',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٤٣، س ٦٩، س ١٠٤، س ١١٥، س ٢٤٩' },
    title: {
      en: 'Things that are never allowed',
      ar: 'أمور لا تُباح أبدًا',
      ckb: 'ئەو شتانەی هەرگیز ڕێپێدراو نین',
    },
    body: {
      en: 'A short list with no exceptions attached to any entry: no conditions, no quiet road, no time of day that makes them permissible.',
      ar: 'قائمة قصيرة لا استثناء لأي بند فيها: لا شروط ولا طريق خالٍ ولا وقت من اليوم يجعلها مباحة.',
      ckb: 'لیستێکی کورت کە هیچ ئیستیسنایەک بە هیچ خاڵێکیەوە نییە: نە مەرج، نە ڕێگای بەتاڵ، نە کاتێکی ڕۆژ کە ڕێپێدراویان بکات.',
    },
    points: [
      {
        en: 'Races or events on public roads.',
        ar: 'السباقات أو الفعاليات على الطرق العامة.',
        ckb: 'پێشبڕکێ یان چالاکی لەسەر ڕێگا گشتییەکان.',
      },
      {
        en: 'Driving on the pavement.',
        ar: 'القيادة على الرصيف.',
        ckb: 'لێخوڕین لەسەر ڕێڕەوی پیادە.',
      },
      {
        en: 'Any part of your body outside the vehicle while it is moving.',
        ar: 'إخراج أي جزء من الجسم خارج المركبة أثناء سيرها.',
        ckb: 'دەرکردنی هیچ بەشێکی جەستە بۆ دەرەوەی ئۆتۆمبێل لە کاتی ڕۆیشتنیدا.',
      },
      {
        en: 'Throwing anything at all out of a window.',
        ar: 'رمي أي شيء كائنًا ما كان من النافذة.',
        ckb: 'فڕێدانی هەر شتێک لە پەنجەرەوە.',
      },
      {
        en: 'Driving when anything blocks your clear view, including cracks in the windscreen or side glass.',
        ar: 'القيادة وشيء يحجب وضوح رؤيتك، بما في ذلك شقوق الزجاج الأمامي أو الجانبي.',
        ckb: 'لێخوڕین کاتێک شتێک دیمەنی ڕوونت دەشارێتەوە، لەوانەش شەقی شووشەی پێشەوە یان لاتەنیشت.',
      },
    ],
  },
  {
    id: 'note-the-test-itself',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    // The pass mark is the one answer in the bundle that does not match the
    // ministry's own — the publication passes at 80% and this app grades at 60%
    // by an explicit product decision. `q-pass-mark` carries the same figure and
    // a comment saying so; the three sites move together. See CLAUDE.md.
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٤' },
    title: {
      en: 'The test itself',
      ar: 'الاختبار نفسه',
      ckb: 'خودی تاقیکردنەوەکە',
    },
    body: {
      en: 'The bank asks about the theory test as one of its own questions, and it is the sort of thing worth knowing before you sit it rather than during. The pass mark in this app is 60%.',
      ar: 'يسأل الدليل عن الاختبار النظري بوصفه أحد أسئلته، وهو مما يستحق أن يُعرف قبل الجلوس له لا أثناءه. ودرجة النجاح في هذا التطبيق ٦٠٪.',
      ckb: 'ڕێنماییەکە دەربارەی تاقیکردنەوە تیۆرییەکە وەک یەکێک لە پرسیارەکانی خۆی دەپرسێت، و لەو شتانەیە کە شایانی زانینە پێش دانیشتن بۆی نەک لە کاتیدا. نمرەی دەرچوون لەم ئەپەدا ٦٠٪ە.',
    },
  },
  {
    id: 'note-driver-responsibility',
    topic: 'rules',
    group: 'conduct',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٧١، س ٧٢، س ١٩٤، ص س ٨١، ص س ٩٣' },
    title: {
      en: 'What a responsible driver is',
      ar: 'ما السائق المسؤول',
      ckb: 'شۆفێری بەرپرسیار چییە',
    },
    body: {
      en: 'The bank defines it in one line, and it is worth taking literally: a driver with a sense of responsibility is one who thinks about the consequences of their actions. Every other rule in this section is an instance of that.',
      ar: 'يعرّفه الدليل بسطر واحد يستحق أن يُؤخذ حرفيًّا: السائق ذو الحسّ بالمسؤولية هو من يفكّر في عواقب أفعاله. وكل قاعدة أخرى في هذا القسم مثال على ذلك.',
      ckb: 'ڕێنماییەکە بە یەک دێڕ پێناسەی دەکات و شایانی ئەوەیە بە وشە وەربگیرێت: شۆفێری خاوەن هەستی بەرپرسیارێتی ئەو کەسەیە کە بیر لە دەرئەنجامی کردەوەکانی دەکاتەوە. هەموو یاسایەکی تری ئەم بەشە نموونەیەکی ئەوەیە.',
    },
    points: [
      {
        en: 'The owner of a vehicle, or whoever controls it, must not let anyone without a licence drive it.',
        ar: 'وعلى مالك المركبة أو من يسيطر عليها ألّا يسمح لمن لا يحمل إجازة بقيادتها.',
        ckb: 'خاوەنی ئۆتۆمبێل، یان ئەوەی کۆنترۆڵی دەکات، نابێت ڕێگا بدات کەسێکی بێ مۆڵەت لێیبخوڕێت.',
      },
      {
        en: 'A learner with no experience at all begins in an enclosed yard, away from public roads.',
        ar: 'والمتعلم الذي لا خبرة له إطلاقًا يبدأ في ساحة مغلقة بعيدًا عن الطرق العامة.',
        ckb: 'فێرخوازێک کە هیچ ئەزموونی نییە لە حەوشەیەکی داخراودا دەست پێدەکات، دوور لە ڕێگا گشتییەکان.',
      },
      {
        en: 'During instruction, the instructor carries responsibility for any offence committed.',
        ar: 'وأثناء التدريب يتحمّل المدرّب مسؤولية أي مخالفة تقع.',
        ckb: 'لە کاتی ڕاهێناندا، ڕاهێنەرەکە بەرپرسیارێتی هەر سەرپێچییەک هەڵدەگرێت.',
      },
    ],
  },
];
