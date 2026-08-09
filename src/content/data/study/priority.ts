/**
 * Study notes for the Road priority section.
 *
 * Two groups, and the split is the point:
 *
 * - **`order`** states the ranking itself. The bank asks this abstractly, over
 *   and over — nine questions read "Right of way belongs to which of the
 *   following?" and differ only in which pair they offer — so the ranking is
 *   worth learning as one list rather than as nine facts.
 * - **`scenarios`** applies it to the situations a learner actually meets.
 *
 * The eleven scenarios were previously their own record type sitting beside the
 * ranking as undifferentiated cards, which put "give way to the vehicle on your
 * right" on screen twice. They are notes now, and each one has had the general
 * rule taken out of it and left in the `order` group where it belongs — a
 * scenario says what is special about *that* situation.
 *
 * The 24 picture questions in this topic ("Who has right of way in this
 * picture? — Vehicle B") are deliberately not represented here. Their answer is
 * a letter on a diagram, which is exam drill rather than something a reader can
 * study, and `examPool()` still draws on every one of them.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE, GENERAL_PRACTICE } from './source';

export const priorityNotes: StudyNote[] = [
  // ---------------------------------------------------------------- order --
  {
    id: 'note-priority-who-overrules',
    topic: 'priority',
    group: 'order',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٧٤، س ٩٠، ص س ١١٦' },
    title: {
      en: 'When two instructions disagree',
      ar: 'حين تتعارض تعليمتان',
      ckb: 'کاتێک دوو ڕێنمایی ناکۆک دەبن',
    },
    body: {
      en: 'A junction can carry an officer, a signal, signs and markings at once, and they do not always agree. The order of precedence is fixed.',
      ar: 'قد يجتمع في التقاطع رجل مرور وإشارة وعلامات وخطوط في وقت واحد، ولا تتفق دائمًا. وترتيب الأسبقية بينها ثابت.',
      ckb: 'لە چوارڕیانێکدا دەکرێت پۆلیس و چرا و تابلۆ و هێڵ پێکەوە هەبن، و هەمیشە یەک ناگرنەوە. ڕیزبەندی پێشینەیی نێوانیان جێگیرە.',
    },
    points: [
      {
        en: 'The traffic officer\'s hand signal comes first, before the light, the signs and the markings, in that order.',
        ar: 'إشارة رجل المرور بيده أولًا، قبل الضوء ثم العلامات ثم الخطوط، بهذا الترتيب.',
        ckb: 'ئیشارەتی دەستی پۆلیس یەکەمە، پێش چرا، پاشان تابلۆکان، پاشان هێڵەکان، بەم ڕیزبەندییە.',
      },
      {
        en: 'That means you move on a red light if the officer waves you through, and you wait on a green one if the officer holds you.',
        ar: 'ومعنى ذلك أن تتحرك رغم الضوء الأحمر إن أشار لك بالمرور، وأن تنتظر رغم الضوء الأخضر إن أوقفك.',
        ckb: 'واتە بە چرای سووریشەوە دەڕۆیت ئەگەر ئاماژەت پێبدات، و بە چرای سەوزەوە دەوەستیت ئەگەر ڕاتبگرێت.',
      },
      {
        en: 'The officer\'s signal binds everyone, in every case and every place, pedestrians included.',
        ar: 'وإشارة رجل المرور ملزمة للجميع في كل حال ومكان، والمشاة منهم.',
        ckb: 'ئیشارەتی پۆلیس بۆ هەمووان پابەندکەرە، لە هەموو حاڵەت و شوێنێکدا، پیادەکانیش لەوانە.',
      },
    ],
  },
  {
    id: 'note-priority-ranking',
    topic: 'priority',
    group: 'order',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٧٧، س ٧٨، س ٨١، س ٨٣، س ٨٦، س ٨٨، س ١٩٥، س ١٩٧، س ١٩٩' },
    title: {
      en: 'The ranking, in one list',
      ar: 'ترتيب الأولوية في قائمة واحدة',
      ckb: 'ڕیزبەندییەکە، لە یەک لیستدا',
    },
    body: {
      en: 'Where no officer, signal or sign settles it, priority goes by which of these describes the two vehicles. Learn the list rather than any one entry.',
      ar: 'حيث لا يحسم رجل مرور ولا إشارة ولا علامة الأمر، تُحدَّد الأولوية بأيّ من هذه الحالات ينطبق على المركبتين. فاحفظ القائمة لا بندًا واحدًا منها.',
      ckb: 'لەو شوێنەی نە پۆلیس و نە چرا و نە تابلۆ بڕیار نادات، پێشینەیی بەوە دیاری دەکرێت کە کامیان بەسەر هەردوو ئۆتۆمبێلەکەدا دەچێت. لیستەکە فێربە نەک یەکێکیان.',
    },
    points: [
      {
        en: 'The main road goes before the side road, and a paved road before an unpaved one.',
        ar: 'الطريق الرئيس قبل الطريق الفرعي، والطريق المعبّد قبل غير المعبّد.',
        ckb: 'ڕێگا سەرەکییەکە پێش ڕێگا لاوەکییەکە، و ڕێگای قیرتاوکراو پێش ئەوەی قیرتاو نەکراو.',
      },
      {
        en: 'A vehicle already in the junction or the square goes before one entering it, and a vehicle already on the road before one joining it.',
        ar: 'والمركبة الموجودة داخل التقاطع أو الساحة قبل الداخلة إليه، والمركبة السائرة على الطريق قبل الراغبة في الانضمام إليه.',
        ckb: 'ئەو ئۆتۆمبێلەی پێشتر لە چوارڕیان یان گۆڕەپانەکەدایە پێش ئەوەی دەچێتە ناوی، و ئەوەی پێشتر لەسەر ڕێگاکەیە پێش ئەوەی دەیەوێت بچێتە سەری.',
      },
      {
        en: 'A moving vehicle goes before a stopped one, and the leading vehicle before the one following it.',
        ar: 'والمركبة المتحركة قبل المتوقفة، والمركبة الأمامية قبل التي تليها.',
        ckb: 'ئۆتۆمبێلی جوڵاو پێش ئەوەی وەستاو، و ئۆتۆمبێلی پێشەوە پێش ئەوەی بەدوایدا دێت.',
      },
      {
        en: 'Traffic going straight ahead goes before traffic turning.',
        ar: 'والسير المستقيم قبل السير المنعطف.',
        ckb: 'ئەو هاتوچۆیەی ڕاست بەرەوپێش دەڕوات پێش ئەوەی لادەدات.',
      },
      {
        en: 'At open crossroads with nothing to settle it, the vehicle coming from the right goes first.',
        ar: 'وعند التقاطعات المفتوحة بلا ما يحسمها، تمرّ المركبة القادمة من اليمين أولًا.',
        ckb: 'لە چوارڕیانە کراوەکاندا کە هیچ شتێک بڕیاری نەدات، ئەو ئۆتۆمبێلەی لە لای ڕاستەوە دێت سەرەتا دەڕوات.',
      },
    ],
  },
  {
    id: 'note-priority-absolute',
    topic: 'priority',
    group: 'order',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩١، س ٩٣، س ٢٠١، س ٢٠٣' },
    title: {
      en: 'Who goes first no matter what',
      ar: 'من له الأولوية مهما كان',
      ckb: 'کێ پێشە، هەرچی ڕووبدات',
    },
    body: {
      en: 'Three claims to priority beat everything else here, including a green light in your favour. None is negotiable.',
      ar: 'ثلاث أولويات تعلو على كل ما هنا، بما في ذلك ضوء أخضر في صالحك. ولا شيء منها قابل للنقاش.',
      ckb: 'سێ پێشینەیی بەسەر هەموو ئەوەی لێرەدایە زاڵن، لەوانەش چرایەکی سەوز کە بۆ تۆیە. هیچیان جێی گفتوگۆ نین.',
    },
    points: [
      {
        en: 'A train, or anything else on rails, has absolute priority over every vehicle, and it can neither brake for you nor steer around you.',
        ar: 'القطار، وكل ما يسير على قضبان، له الأولوية المطلقة على كل مركبة، فهو لا يكبح لأجلك ولا ينحرف عنك.',
        ckb: 'شەمەندەفەر، یان هەر شتێکی تر لەسەر هێڵ، پێشینەیی ڕەهای بەسەر هەموو ئۆتۆمبێلێکدا هەیە، نە دەتوانێت بۆ تۆ بڕێک بگرێت و نە لێت لابدات.',
      },
      {
        en: 'Emergency vehicles go before all other vehicles.',
        ar: 'ومركبات الطوارئ تسبق كل المركبات الأخرى.',
        ckb: 'ئۆتۆمبێلی فریاگوزاری پێش هەموو ئۆتۆمبێلێکی ترە.',
      },
      {
        en: 'Pedestrians who have already stepped onto a crossing go before vehicles, and pedestrians on the pavement go before any vehicle crossing it into or out of a garage.',
        ar: 'والمشاة الذين وضعوا أقدامهم على الممر يسبقون المركبات، والمشاة على الرصيف يسبقون كل مركبة تقطعه دخولًا إلى مرآب أو خروجًا منه.',
        ckb: 'ئەو پیادانەی پێیان خستووەتە سەر پەڕینگەکە پێش ئۆتۆمبێلەکانن، و پیادەی سەر ڕێڕەوی پیادە پێش هەر ئۆتۆمبێلێکە کە بۆ چوونە ناو گەراج یان دەرچوون لێی بەسەریدا دەپەڕێت.',
      },
    ],
  },

  // ------------------------------------------------------------ scenarios --
  {
    id: 'priority-uncontrolled-crossroads',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣٦، س ١١٨' },
    title: {
      en: 'An unmarked crossroads',
      ar: 'تقاطع بدون علامات',
      ckb: 'چوارڕیانی بێ تابلۆ',
    },
    body: {
      en: 'No signs, no markings and no signal. The rule only works if both drivers apply it, so slow enough to stop and be ready to give way even when it favours you.',
      ar: 'لا علامات ولا خطوط ولا إشارة. والقاعدة لا تعمل إلا إذا التزم بها الطرفان، فخفّف سرعتك بما يكفي للتوقف وكن مستعدًّا للإفساح حتى حين تكون في صالحك.',
      ckb: 'نە تابلۆ، نە هێڵ، نە چرای ئاماژە. یاساکە تەنها کاتێک کاردەکات هەردوو شۆفێر پەیڕەوی بکەن، بۆیە ئەوەندە خێرایی کەم بکەرەوە کە بوەستیت و ئامادەبە ڕێگا بدەیت تەنانەت کاتێک لەگەڵ تۆیە.',
    },
    points: [
      {
        en: 'Give way to the vehicle on your right, and expect the driver on your left to give way to you.',
        ar: 'أفسح للمركبة القادمة من يمينك، وتوقّع أن يفسح لك القادم من يسارك.',
        ckb: 'ڕێگا بدە بەو ئۆتۆمبێلەی لای ڕاستت، و چاوەڕێ بکە شۆفێری لای چەپیش ڕێگات پێبدات.',
      },
      {
        en: 'Where trees or buildings block the view, stop at the start of the junction, check it is clear, then creep forward.',
        ar: 'وحيث تحجب الأشجار أو الأبنية الرؤية، قف عند بداية التقاطع وتأكد من خلوّه ثم تقدّم ببطء.',
        ckb: 'لەو شوێنانەی دار یان بینا دیمەن دەشارنەوە، لە سەرەتای چوارڕیانەکە بوەستە، دڵنیابە بەتاڵە، پاشان بە هێواشی بەرەوپێش بڕۆ.',
      },
    ],
  },
  {
    id: 'priority-minor-joins-main',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣١، س ٥١' },
    title: {
      en: 'Joining a main road',
      ar: 'الدخول إلى طريق رئيس',
      ckb: 'چوونە سەر ڕێگایەکی سەرەکی',
    },
    body: {
      en: 'You are on the smaller road, whether by sign, by a line across your lane, or simply by being the unpaved one. Everything on the main road goes first, in both directions.',
      ar: 'أنت على الطريق الأصغر، بعلامة أو بخط عرضي في مسارك أو ببساطة بكونه غير معبّد. والأولوية لكل ما يسير على الطريق الرئيس في الاتجاهين.',
      ckb: 'تۆ لەسەر ڕێگا بچووکەکەیت، بە تابلۆ یان بە هێڵێک بەناو لەینەکەت یان بەسادەیی بەوەی قیرتاو نەکراوە. هەموو ئەوەی لەسەر ڕێگا سەرەکییەکەیە پێشترە، لە هەردوو ئاراستە.',
    },
    points: [
      {
        en: 'A stop sign means a complete halt first, then the wait. Give way means you may keep rolling only if the road is genuinely clear.',
        ar: 'وعلامة «قف» تعني توقفًا تامًّا أولًا ثم الانتظار. أما «أفسح الطريق» فتعني أن تستمر فقط إذا كان الطريق خاليًا فعلًا.',
        ckb: 'تابلۆی وەستان واتە سەرەتا وەستانێکی تەواو، پاشان چاوەڕوانی. ڕێگادان واتە تەنها ئەگەر ڕێگاکە بەڕاستی بەتاڵ بوو بەردەوام دەبیت.',
      },
    ],
  },
  {
    id: 'priority-roundabout',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Entering a roundabout',
      ar: 'الدخول إلى الدوّار',
      ckb: 'چوونە ناو خولانەوە',
    },
    body: {
      en: 'Traffic already circulating has priority, so wait at the entry, not inside. Once in, hold your lane, do not overtake around the island, and signal as you leave.',
      ar: 'الأولوية للمركبات الدائرة، فانتظر عند المدخل لا في الداخل. وبعد الدخول التزم بمسارك، ولا تتجاوز حول الجزيرة، وأشِر عند الخروج.',
      ckb: 'ئەو ئۆتۆمبێلانەی پێشتر دەسوڕێنەوە پێشترن، بۆیە لە دەروازەکە چاوەڕێ بکە نەک لە ناوەوە. دوای چوونە ژوورەوە لە لەینەکەت بمێنەرەوە، بەدەوری دوورگەکەدا تێمەپەڕێنە، و لە دەرچووندا ئاماژە بدە.',
    },
    points: [
      {
        en: 'Changing lane as you enter is not permitted, so choose the lane before you get there.',
        ar: 'ولا يجوز تغيير المسار عند الدخول، فاختر مسارك قبل الوصول.',
        ckb: 'گۆڕینی لەین لە کاتی چوونە ژوورەوە ڕێپێدراو نییە، بۆیە پێش گەیشتن لەینەکە هەڵبژێرە.',
      },
    ],
  },
  {
    id: 'priority-turning-left-across',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Turning left across oncoming traffic',
      ar: 'الانعطاف يسارًا أمام المرور المقابل',
      ckb: 'لادان بۆ چەپ بەناو هاتوچۆی بەرامبەردا',
    },
    body: {
      en: 'Turning left crosses the opposing lanes, so everything coming towards you goes first, including anything overtaking on their side. Wait with your wheels straight, or being rear-ended pushes you into oncoming traffic.',
      ar: 'الانعطاف يسارًا يقطع المسارات المقابلة، فالأولوية لكل قادم نحوك، ومنه من يتجاوز في جهتهم. وانتظر وعجلاتك مستقيمة، وإلا دفعتك صدمة خلفية إلى المرور المقابل.',
      ckb: 'لادان بۆ چەپ لەینەکانی بەرامبەر دەبڕێت، بۆیە هەموو ئەوەی بەرەو تۆ دێت پێشترە، لەوانەش ئەوەی لەو لاوە تێدەپەڕێنێت. بە چەرخی ڕاستەوە چاوەڕێ بکە، ئەگەرنا لێدانی دواوە پاڵت دەنێتە ناو هاتوچۆی بەرامبەر.',
    },
  },
  {
    id: 'priority-pedestrian-crossing',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Stopped at a crossing with a lane beside you',
      ar: 'التوقف عند ممر ومسار آخر بجانبك',
      ckb: 'وەستان لەلای پەڕینگە و لەینێک لەتەنیشتت',
    },
    body: {
      en: 'When you have stopped for someone crossing, do not wave them across the next lane. You cannot see whether it has stopped, and the driver overtaking you cannot see the pedestrian your car hides.',
      ar: 'إذا توقفت لأحد يعبر فلا تُشِر له بالعبور أمام المسار المجاور. فأنت لا ترى إن كان قد توقف، والسائق الذي يتجاوزك لا يرى المشاة الذي تحجبه سيارتك.',
      ckb: 'کاتێک بۆ کەسێکی پەڕیوە وەستایت، ئاماژەی پێ مەکە بەناو لەینی تەنیشتدا بڕوات. تۆ نازانیت ئایا وەستاوە، و ئەو شۆفێرەی بەسەرتدا تێدەپەڕێت ئەو پیادەیە نابینێت کە ئۆتۆمبێلەکەت دەیشارێتەوە.',
    },
  },
  {
    id: 'priority-emergency-vehicle',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٩' },
    title: {
      en: 'An emergency vehicle behind you',
      ar: 'مركبة طوارئ خلفك',
      ckb: 'ئۆتۆمبێلی فریاگوزاری لە دواتەوە',
    },
    body: {
      en: 'Lights or siren means it goes first, whatever the signal says. Check the far right lane is clear and move into it. Do not merely slow down, and do not speed up to stay ahead.',
      ar: 'الأضواء أو الصفارة تعني أن الأولوية لها مهما كانت الإشارة. تأكد من خلوّ المسار الأيمن الأقصى وانتقل إليه. ولا تكتفِ بتخفيف السرعة، ولا تزد سرعتك لتبقى أمامها.',
      ckb: 'چرا یان زوڕنا واتە ئەو پێشترە، چرای ئاماژە هەرچی بڵێت. دڵنیابە دوورترین لەینی ڕاست بەتاڵە و بڕۆ بۆی. تەنها خێرایی کەمکردنەوە بەس نییە، و خێرایی زیاد مەکە بۆ ئەوەی لە پێشیدا بمێنیتەوە.',
    },
    points: [
      {
        en: 'Never brake hard inside a junction or mount a pavement to do it. Clearing the way must not create a second emergency.',
        ar: 'ولا تكبح بعنف داخل تقاطع ولا تصعد على الرصيف لفعل ذلك. فإفساح الطريق يجب ألّا يصنع حالة طوارئ ثانية.',
        ckb: 'هەرگیز لە ناو چوارڕیاندا بە توندی بڕێک مەگرە و بۆ ئەمە سەرمەکەوە بۆ سەر ڕێڕەوی پیادە. ڕێگاخۆشکردن نابێت دۆخێکی فریاگوزاریی دووەم دروست بکات.',
      },
      {
        en: 'Never follow one through the traffic it has opened up.',
        ar: 'ولا تسر خلفها أبدًا في الفجوة التي فتحتها.',
        ckb: 'هەرگیز بەدوایدا مەڕۆ بەناو ئەو کەلێنەی کردوویەتییەوە.',
      },
    ],
  },
  {
    id: 'priority-narrow-road',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'A narrow road where only one can pass',
      ar: 'طريق ضيّق لا يتّسع إلا لمركبة',
      ckb: 'ڕێگایەکی تەنگ کە تەنها یەکێک تێدەپەڕێت',
    },
    body: {
      en: 'Whoever has the obstruction on their own side gives way, because they are the one leaving their lane to pass it. Where a sign settles the matter, the sign wins.',
      ar: 'من كانت العرقلة في جهته هو من يفسح الطريق، لأنه المضطر إلى مغادرة مساره لتجاوزها. وحيث تحسم العلامة الأمر فالعلامة هي المرجع.',
      ckb: 'ئەوەی ڕێگرەکە لە لای خۆیەتی ڕێگا دەدات، چونکە ئەو لەینەکەی بەجێدەهێڵێت بۆ تێپەڕاندنی. لەو شوێنانەی تابلۆ بڕیار دەدات، تابلۆکە پێشترە.',
    },
    points: [
      {
        en: 'Where neither side is obstructed, both slow down and move as far right as the road allows, at its widest point.',
        ar: 'وحيث لا عرقلة في الجهتين، يخفّف الطرفان السرعة وينتقلان إلى أقصى اليمين عند أوسع نقطة.',
        ckb: 'لەو شوێنەی هیچ لایەک ڕێگری تێدا نییە، هەردووکیان خێرایی کەم دەکەنەوە و بەرەو دوورترین لای ڕاست دەچن، لە پانترین خاڵیدا.',
      },
    ],
  },
  {
    id: 'priority-mountain-road',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٨٩، س ١١٤، س ١٢٣' },
    title: {
      en: 'Meeting on a steep mountain road',
      ar: 'التلاقي على طريق جبلي منحدر',
      ckb: 'یەکترگرتن لەسەر ڕێگایەکی شاخاوی بنارە',
    },
    body: {
      en: 'The climbing vehicle has priority, and the descending driver stops, reversing to a wider point if need be. Restarting on a gradient loses traction, so the easier manoeuvre goes downhill.',
      ar: 'الأولوية للمركبة الصاعدة، والنازل هو من يتوقف ويرجع إلى موضع أوسع إن لزم. فالانطلاق من جديد على منحدر يفقد التماسك، والمناورة الأسهل هي النزول.',
      ckb: 'ئۆتۆمبێلی سەرکەوتوو پێشترە، و ئەوەی دادەبەزێت دەوەستێت و ئەگەر پێویست بوو بۆ شوێنێکی پانتر دەگەڕێتەوە. دەستپێکردنەوە لەسەر بنار گرتن لەدەست دەدات، بۆیە جوڵەی ئاسانتر بەرەو خوارەوەیە.',
    },
  },
  {
    id: 'priority-level-crossing',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'A railway level crossing',
      ar: 'مزلقان سكة الحديد',
      ckb: 'پەڕینگەی هێڵی شەمەندەفەر',
    },
    body: {
      en: 'Never start across until the far side is clear enough to drive off. A queue that stops with your car still on the rails is how this goes wrong. Never stop on the rails.',
      ar: 'لا تبدأ العبور قبل أن يخلو الجانب الآخر بما يكفي للخروج إليه. فالطابور الذي يتوقف وسيارتك على القضبان هو ما يسوء به الأمر. ولا تقف على القضبان أبدًا.',
      ckb: 'هەرگیز دەست بە پەڕینەوە مەکە پێش ئەوەی لای بەرامبەر بەتاڵ بێت بۆ دەرچوون. ڕیزێک کە دەوەستێت و ئۆتۆمبێلەکەت لەسەر هێڵەکانە ئەوەیە کە کارەکە تێکدەدات. هەرگیز لەسەر هێڵەکان مەوەستە.',
    },
  },
  {
    id: 'priority-reversing-and-leaving',
    topic: 'priority',
    group: 'scenarios',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١١٩، س ١٣٩، س ١٩٥' },
    title: {
      en: 'Moving off, reversing or pulling out',
      ar: 'الانطلاق أو الرجوع أو الخروج من الوقوف',
      ckb: 'دەستپێکردن، گەڕانەوە، یان دەرچوون لە وەستان',
    },
    body: {
      en: 'A driver moving off, reversing, leaving a parking space or coming out of a property has priority over nobody at all. Watch the mirror until the street is clear, and pull out when the gap comes.',
      ar: 'من ينطلق أو يرجع أو يخرج من موقف أو من عقار لا أولوية له على أحد إطلاقًا. راقب الشارع في المرآة حتى يخلو، وانطلق حين تسنح الفرصة.',
      ckb: 'ئەو شۆفێرەی دەست پێدەکات یان دەگەڕێتەوە یان لە پارک یان لە خانووێک دەردەچێت، بەسەر هیچ کەسێکدا پێشینەیی نییە. لە ئاوێنەکەدا چاودێری بکە تا شەقامەکە بەتاڵ دەبێت، و کاتێک دەرفەتەکە هات دەربچۆ.',
    },
    points: [
      {
        en: 'The responsibility for the manoeuvre being safe is entirely yours.',
        ar: 'ومسؤولية سلامة المناورة تقع عليك وحدك.',
        ckb: 'بەرپرسیارێتی سەلامەتی جوڵەکە تەنها هی تۆیە.',
      },
    ],
  },
];
