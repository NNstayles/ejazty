/**
 * Signs the exam asks about that the traffic-signs manual does not illustrate.
 *
 * The 111-record catalogue under `data/official/signs-*.ts` is transcribed from
 * the ministry's *signs* manual. The question bank is a different publication,
 * and it asks about signs that manual never shows — which meant a learner could
 * be examined on a sign the Learn tab had no card for at all.
 *
 * **The two worst cases were STOP and Give Way.** Both are asked (ص س ٩، ص س ٨،
 * ص س ٨٤), both decide who moves first at a junction, and neither existed
 * anywhere in the app. That is the gap this file was written to close.
 *
 * Every note here carries the bank's own artwork for the sign and states the
 * bank's own answer for it. They are notes rather than `TrafficSign` records
 * because a catalogue card promises the manual's wording and its provenance,
 * and these have neither — the `document` on each is the question guide, and
 * the locator names the question it came from.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE } from './source';

const G = 'bank';

export const extraSignNotes: StudyNote[] = [
  // No STOP note here, deliberately: `sign-stop` is in the catalogue already
  // (ص ١٠, with the manual's own artwork), and `entries.test.ts` fails on the
  // duplicate heading if one is added back.
  {
    id: 'note-sign-give-way',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٨' },
    image: require('@/assets/exam/pic-008.jpg'),
    title: { en: 'Give way', ar: 'أفسح الطريق', ckb: 'ڕێگا بدە' },
    body: {
      en: 'An inverted triangle, and the only sign with that shape. Give way to vehicles that have priority. You need not stop if the road is genuinely clear, but arrive slowly enough that stopping is still an option.',
      ar: 'مثلث مقلوب، وهو الشكل الوحيد من نوعه. ويعني إفساح الطريق للمركبات صاحبة الأولوية. ولا يلزمك التوقف إذا كان الطريق خاليًا فعلًا، لكن عليك أن تصل ببطء يبقي التوقف ممكنًا.',
      ckb: 'سێگۆشەیەکی سەروبنە، و تاکە تابلۆیە بەو شێوەیە. ڕێگا بدە بەو ئۆتۆمبێلانەی پێشینەییان هەیە. پێویست ناکات بوەستیت ئەگەر ڕێگاکە بەڕاستی بەتاڵ بێت، بەڵام دەبێت ئەوەندە خاو بگەیت کە وەستان هێشتا بکرێت.',
    },
  },
  {
    id: 'note-sign-give-way-in-circle',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٨٤' },
    image: require('@/assets/exam/pic-084.jpg'),
    title: {
      en: 'Give way (triangle inside a circle)',
      ar: 'أفسح الطريق (مثلث داخل دائرة)',
      ckb: 'ڕێگا بدە (سێگۆشە لە ناو بازنە)',
    },
    body: {
      en: 'The same instruction in the bank\'s second form: stop and give way to vehicles that have priority. The triangle inside carries the meaning, and the red circle around it does not change what you have to do.',
      ar: 'التعليمة نفسها في صورتها الثانية في الدليل: قف وأفسح الطريق للمركبات صاحبة الأولوية. فالمثلث في الداخل هو حامل المعنى، والدائرة الحمراء حوله لا تغيّر ما عليك فعله.',
      ckb: 'هەمان ڕێنمایی بە شێوەی دووەمی ناو ڕێنماییەکە: بوەستە و ڕێگا بدە بەو ئۆتۆمبێلانەی پێشینەییان هەیە. سێگۆشەکەی ناوەوە هەڵگری واتاکەیە، و بازنە سوورەکەی دەوری ئەوەی دەبێت بیکەیت ناگۆڕێت.',
    },
  },
  {
    id: 'note-sign-general-danger',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢' },
    image: require('@/assets/exam/pic-012.jpg'),
    title: {
      en: 'General danger',
      ar: 'خطر عام',
      ckb: 'مەترسی گشتی',
    },
    body: {
      en: 'A warning triangle that names no particular hazard. It is used where the danger is temporary, unusual, or several things at once, so it tells you to slow down and look rather than expect something specific.',
      ar: 'مثلث تحذيري لا يسمّي خطرًا بعينه. ويُستخدم حيث يكون الخطر مؤقتًا أو غير معتاد أو عدة أمور معًا، فهو يطلب منك التخفيف والنظر بدل توقّع شيء محدّد.',
      ckb: 'سێگۆشەیەکی ئاگادارکەرەوە کە هیچ مەترسییەکی دیاریکراو ناو نابات. لەو شوێنانە بەکاردێت کە مەترسییەکە کاتی یان نائاسایی یان چەند شتێکە پێکەوە، بۆیە پێت دەڵێت خێرایی کەم بکەرەوە و سەیر بکە، نەک چاوەڕێی شتێکی دیاریکراو بیت.',
    },
  },
  {
    id: 'note-sign-radar',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٣١' },
    image: require('@/assets/exam/pic-031.jpg'),
    title: {
      en: 'Road monitored by radar',
      ar: 'الطريق مراقب بالرادار',
      ckb: 'ڕێگاکە بە ڕادار چاودێری دەکرێت',
    },
    body: {
      en: 'Warns that speed on this road is measured by radar. It changes nothing about the limit, which applied just as much before the sign, but it is a reminder that the figure on the speed-limit sign is the one being checked.',
      ar: 'يحذّر من أن السرعة على هذا الطريق تُقاس بالرادار. وهو لا يغيّر الحد شيئًا، فالحد كان ساريًا قبل العلامة تمامًا، لكنه تذكير بأن الرقم على علامة السرعة هو ما يُراقَب.',
      ckb: 'ئاگادارت دەکاتەوە کە خێرایی لەسەر ئەم ڕێگایە بە ڕادار دەپێورێت. هیچ لە سنوورەکە ناگۆڕێت، چونکە پێش تابلۆکەش بە هەمان شێوە کاری پێدەکرا، بەڵام بیرخستنەوەیەکە کە ئەو ژمارەیەی سەر تابلۆی خێرایی ئەوەیە کە دەپشکنرێت.',
    },
  },
  {
    id: 'note-sign-u-turn-permitted',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٦' },
    image: require('@/assets/exam/pic-016.jpg'),
    title: {
      en: 'U-turn onto the opposite carriageway',
      ar: 'الاستدارة إلى الاتجاه المقابل',
      ckb: 'سووڕانەوە بۆ لەینی بەرامبەر',
    },
    body: {
      en: 'Marks the place where turning back onto the opposite carriageway is allowed. A U-turn is otherwise prohibited at traffic lights and anywhere a continuous line runs, so this sign is the exception that makes one lawful.',
      ar: 'يدلّ على الموضع الذي يُسمح فيه بالاستدارة إلى الاتجاه المقابل. والاستدارة ممنوعة أصلًا عند الإشارات الضوئية وحيثما يمتدّ خط متصل، فهذه العلامة هي الاستثناء الذي يجعلها قانونية.',
      ckb: 'ئەو شوێنە دیاری دەکات کە گەڕانەوە بۆ لەینی بەرامبەر ڕێپێدراوە. سووڕانەوە بە شێوەیەکی تر لەلای چرای هاتوچۆ و لە هەر شوێنێک هێڵێکی بەردەوام هەبێت قەدەغەیە، بۆیە ئەم تابلۆیە ئەو ئیستیسنایەیە کە یاساییی دەکات.',
    },
  },
  {
    id: 'note-sign-two-directions-only',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠' },
    image: require('@/assets/exam/pic-010.jpg'),
    title: {
      en: 'These two directions only',
      ar: 'هذان الاتجاهان فقط',
      ckb: 'تەنها ئەم دوو ئاراستەیە',
    },
    body: {
      en: 'A mandatory sign: traffic may go only in the two directions the arrows show. Anything they do not cover, including going straight on, is closed to you here.',
      ar: 'علامة إلزامية: لا يجوز السير إلا في الاتجاهين اللذين يشير إليهما السهمان. وكل ما لا يشمله السهمان، ومنه السير إلى الأمام، مغلق أمامك هنا.',
      ckb: 'تابلۆیەکی ناچارکەر: تەنها لەو دوو ئاراستەیەدا دەکرێت بڕۆیت کە تیرەکان پیشانیان دەدەن. هەرچی تیرەکان نایگرنەوە، لەوانەش ڕاست بەرەوپێش چوون، لێرەدا داخراوە.',
    },
  },
  {
    id: 'note-sign-expressway',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٤١' },
    image: require('@/assets/exam/pic-041.jpg'),
    title: { en: 'Expressway', ar: 'طريق سريع', ckb: 'ڕێگای خێرا' },
    body: {
      en: 'Marks the start of an expressway, and with it the rules that only apply there: no stopping except in the designated places, no passengers getting in or out, and no pedestrians, bicycles or agricultural and construction machinery.',
      ar: 'يدلّ على بداية الطريق السريع، ومعه القواعد التي لا تسري إلا عليه: لا وقوف إلا في الأماكن المخصّصة، ولا صعود ولا نزول للركاب، ولا مشاة ولا دراجات ولا آليات زراعية أو إنشائية.',
      ckb: 'دەستپێکی ڕێگای خێرا دیاری دەکات، و لەگەڵیدا هەموو ئەو یاسایانەی تەنها لەوێ کاردەکەن: وەستان نییە جگە لە شوێنە تەرخانکراوەکان، سواربوون و دابەزینی سەرنشین نییە، و پیادە و پاسکیل و ئامێری کشتوکاڵی یان بیناسازی بە تەواوی نییە.',
    },
  },
  {
    id: 'note-sign-expressway-end',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٤٣' },
    image: require('@/assets/exam/pic-043.jpg'),
    title: { en: 'End of expressway', ar: 'نهاية الطريق السريع', ckb: 'کۆتایی ڕێگای خێرا' },
    body: {
      en: 'The expressway rules stop here and ordinary road rules resume: junctions, pedestrians and slower traffic from this point on.',
      ar: 'تنتهي هنا قواعد الطريق السريع وتعود قواعد الطرق العادية: التقاطعات والمشاة والسير الأبطأ من هذه النقطة.',
      ckb: 'یاساکانی ڕێگای خێرا لێرە کۆتاییان دێت و یاساکانی ڕێگای ئاسایی دەگەڕێنەوە: چوارڕیان و پیادە و هاتوچۆی خاوتر لەم خاڵەوە.',
    },
  },
  // Nor a parking-place note: the catalogue's `sign-car-park` covers ص س ٤٥.
  {
    id: 'note-sign-taxi-rank',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٥٦' },
    image: require('@/assets/exam/pic-056.jpg'),
    title: { en: 'Taxi rank', ar: 'موقف سيارات الأجرة', ckb: 'وێستگەی تاکسی' },
    body: {
      en: 'A space reserved for taxis waiting for passengers. Other vehicles may not park in it, on the same principle as a disabled bay or a bus stop: a reserved space is reserved whether or not anyone is using it.',
      ar: 'مساحة مخصّصة لسيارات الأجرة المنتظرة للركاب. ولا يجوز لغيرها الوقوف فيها، والمبدأ نفسه في موقف ذوي الإعاقة أو موقف الباص: فالمكان المخصّص يبقى مخصّصًا سواء استُخدم أم لا.',
      ckb: 'شوێنێکی تەرخانکراو بۆ تاکسییەکان کە چاوەڕێی سەرنشینن. ئۆتۆمبێلی تر ناتوانن تێیدا پارک بکەن، بە هەمان بنەمای شوێنی کەمئەندامان یان وێستگەی پاس: شوێنی تەرخانکراو تەرخانکراو دەمێنێتەوە، جا کەسێک بەکاری بهێنێت یان نا.',
    },
  },
  {
    id: 'note-sign-no-waiting-five-minutes',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٥٨' },
    image: require('@/assets/exam/pic-058.jpg'),
    title: {
      en: 'No stopping for more than 5 minutes',
      ar: 'ممنوع الوقوف أكثر من ٥ دقائق',
      ckb: 'وەستان زیاتر لە ٥ خولەک قەدەغەیە',
    },
    body: {
      en: 'A time-limited prohibition rather than an absolute one: a brief stop is allowed, staying is not. The five minutes is the sign\'s own figure, not a rule of thumb.',
      ar: 'منع مقيّد بالزمن لا منع مطلق: يُسمح بالتوقف القصير ولا يُسمح بالبقاء. والدقائق الخمس رقم العلامة نفسها لا قاعدة تقريبية.',
      ckb: 'قەدەغەکردنێکی بە کات بەند نەک ڕەها: وەستانی کورت ڕێپێدراوە، مانەوە نا. پێنج خولەکەکە ژمارەی خودی تابلۆکەیە نەک یاسایەکی نزیکەیی.',
    },
  },
  {
    id: 'note-sign-low-flying-aircraft',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٥٩' },
    image: require('@/assets/exam/pic-059.jpg'),
    title: {
      en: 'Low-flying aircraft',
      ar: 'طائرات تحلّق على ارتفاع منخفض',
      ckb: 'فڕۆکەی نزم‌فڕ',
    },
    body: {
      en: 'Warns that aircraft pass low over this stretch of road. The hazard is not a collision but the surprise: sudden noise and a large shadow make a driver brake or swerve without deciding to.',
      ar: 'يحذّر من مرور الطائرات على ارتفاع منخفض فوق هذا الجزء من الطريق. والخطر ليس الاصطدام بل المفاجأة: فالضجيج المباغت والظلّ الكبير يجعلان السائق يكبح أو ينحرف دون قرار.',
      ckb: 'ئاگادارت دەکاتەوە کە فڕۆکە بە نزمی بەسەر ئەم بەشەی ڕێگادا تێدەپەڕن. مەترسییەکە پێکدادان نییە بەڵکو لەناکاوییەکەیە: دەنگی لەناکاو و سێبەرێکی گەورە وا لە شۆفێر دەکەن بەبێ بڕیار بڕێک بگرێت یان لابدات.',
    },
  },
  {
    id: 'note-sign-loose-gravel',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٩٨' },
    image: require('@/assets/exam/pic-098.jpg'),
    title: { en: 'Loose gravel', ar: 'حصى مفكّك على الطريق', ckb: 'بەردی لەق لەسەر ڕێگا' },
    body: {
      en: 'Warns of loose stones on the surface. Grip drops, so braking distances lengthen and the car can slide in a bend. Your tyres also throw stones at whatever is behind you, which is a reason to leave a longer gap.',
      ar: 'يحذّر من حجارة مفكّكة على السطح. يقلّ التماسك فتطول مسافات الكبح وقد تنزلق المركبة في المنعطف. وإطاراتك تقذف الحجارة على ما خلفك، وهذا سبب لترك مسافة أطول.',
      ckb: 'ئاگادارت دەکاتەوە لە بەردی لەق لەسەر ڕووی ڕێگا. گرتن کەم دەبێتەوە، بۆیە مەودای بڕێکگرتن درێژ دەبێت و ئۆتۆمبێلەکە لە سووڕانەوەدا دەخلیسکێت. تایەکانیشت بەرد فڕێدەدەنە سەر ئەوەی لە دواتە، و ئەمە هۆکارێکە بۆ هێشتنەوەی مەودای درێژتر.',
    },
  },
  {
    id: 'note-sign-minimum-gap',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠٧' },
    image: require('@/assets/exam/pic-107.jpg'),
    title: {
      en: 'Keep a gap of at least 70 metres',
      ar: 'اترك مسافة لا تقلّ عن ٧٠ مترًا',
      ckb: 'مەودای لانیکەم ٧٠ مەتر بهێڵەرەوە',
    },
    body: {
      en: 'A rare sign that sets a distance rather than a speed: leave no less than 70 metres between your vehicle and the one in front. It appears where a pile-up is the specific risk, and the figure is an order, not advice.',
      ar: 'علامة نادرة تحدّد مسافة لا سرعة: اترك ما لا يقلّ عن ٧٠ مترًا بينك وبين المركبة أمامك. وتظهر حيث يكون التصادم المتسلسل هو الخطر بعينه، والرقم أمر لا نصيحة.',
      ckb: 'تابلۆیەکی دەگمەن کە مەودا دیاری دەکات نەک خێرایی: کەمتر لە ٧٠ مەتر لە نێوان خۆت و ئۆتۆمبێلی پێشەوە مەهێڵە. لەو شوێنانە دەردەکەوێت کە پێکدادانی زنجیرەیی مەترسییە دیاریکراوەکەیە، و ژمارەکە فەرمانە نەک ئامۆژگاری.',
    },
  },
  {
    id: 'note-sign-load-over-two-tonnes',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠٨' },
    image: require('@/assets/exam/pic-108.jpg'),
    title: {
      en: 'No vehicles loaded above 2 tonnes',
      ar: 'ممنوع مرور المركبات فوق ٢ طن',
      ckb: 'ئۆتۆمبێلی بارکراوی زیاتر لە ٢ تەن قەدەغەیە',
    },
    body: {
      en: 'A weight prohibition, and the figure is the whole sign: the bank asks the same question at 10 tonnes elsewhere, so read the number rather than recognising the shape. It is posted where the road or a bridge cannot carry more.',
      ar: 'منع بحسب الوزن، والرقم هو العلامة كلها: فالدليل يسأل السؤال نفسه بعشرة أطنان في موضع آخر، فاقرأ الرقم بدل معرفة الشكل. ويُنصب حيث لا يحتمل الطريق أو جسر عليه أكثر من ذلك.',
      ckb: 'قەدەغەکردنێک بەپێی کێش، و ژمارەکە هەموو تابلۆکەیە: ڕێنماییەکە هەمان پرسیار بە دە تەن لە شوێنێکی تر دەکات، بۆیە ژمارەکە بخوێنەرەوە نەک تەنها شێوەکە بناسەوە. لەو شوێنانە دادەنرێت کە ڕێگاکە یان پردێکی سەری زیاتر هەڵناگرێت.',
    },
  },
  {
    id: 'note-sign-school-crossing',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠٩' },
    image: require('@/assets/exam/pic-109.jpg'),
    title: {
      en: 'School-children crossing ahead',
      ar: 'منطقة عبور تلاميذ أمامك',
      ckb: 'پەڕینەوەی قوتابیان لە پێشەوە',
    },
    body: {
      en: 'Warns of a place where children cross the road, which is a different sign from the one marking a school nearby. The maximum here is 30 km/h, and children are the road users least likely to behave the way the rules assume.',
      ar: 'يحذّر من موضع يعبر فيه الأطفال الطريق، وهو غير العلامة التي تدلّ على وجود مدرسة قريبة. والحد الأقصى هنا ٣٠ كم/س، والأطفال أقلّ مستخدمي الطريق تصرّفًا وفق ما تفترضه القواعد.',
      ckb: 'ئاگادارت دەکاتەوە لە شوێنێک کە منداڵان بە ڕێگادا دەپەڕنەوە، و ئەمە تابلۆیەکی جیاوازە لەوەی قوتابخانەیەکی نزیک دیاری دەکات. زۆرترین خێرایی لێرەدا ٣٠ کم/کاتژمێرە، و منداڵان ئەو بەکارهێنەرانەی ڕێگان کە کەمترین ئەگەری هەیە بەو شێوەیە هەڵسوکەوت بکەن کە یاساکان دەیانپێکێت.',
    },
  },
  {
    id: 'note-sign-no-tractors',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٨٠' },
    image: require('@/assets/exam/pic-080.jpg'),
    title: { en: 'No tractors', ar: 'ممنوع مرور الجرارات', ckb: 'تێپەڕبوونی تراکتەر قەدەغەیە' },
    body: {
      en: 'Agricultural tractors may not use this road. A road fast enough to post this sign is one where a vehicle travelling at walking pace is itself the hazard.',
      ar: 'لا يجوز للجرارات الزراعية استخدام هذا الطريق. فالطريق السريع بما يكفي لنصب هذه العلامة هو طريق تكون فيه المركبة السائرة بسرعة المشي هي الخطر نفسه.',
      ckb: 'تراکتەری کشتوکاڵی ناتوانێت ئەم ڕێگایە بەکاربهێنێت. ڕێگایەک کە ئەوەندە خێرا بێت ئەم تابلۆیەی لەسەر دابنرێت، ئۆتۆمبێلێکی بە خێرایی ڕۆیشتن خۆی مەترسییەکەیە.',
    },
  },
  {
    id: 'note-sign-length-limit',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠٦' },
    image: require('@/assets/exam/pic-106.jpg'),
    title: {
      en: 'No vehicles longer than 10 metres',
      ar: 'ممنوع مرور المركبات التي يزيد طولها على ١٠ أمتار',
      ckb: 'ئۆتۆمبێلی درێژتر لە ١٠ مەتر قەدەغەیە',
    },
    body: {
      en: 'A limit on length rather than on weight or height. It is posted where the road itself cannot be got round: a tight bend, a narrow street, a turning circle a long vehicle would have to reverse out of.',
      ar: 'حدّ يتعلق بالطول لا بالوزن ولا بالارتفاع. ويُنصب حيث لا يمكن اجتياز الطريق نفسه: منعطف ضيّق أو شارع ضيّق أو دوران لا تخرج منه المركبة الطويلة إلا بالرجوع.',
      ckb: 'سنوورێک بۆ درێژی نەک بۆ کێش یان بەرزی. لەو شوێنانە دادەنرێت کە خودی ڕێگاکە ناکرێت تێپەڕێنرێت: سووڕانەوەیەکی تەنگ، شەقامێکی تەنگ، خولانەوەیەک کە ئۆتۆمبێلی درێژ تەنها بە گەڕانەوە لێی دەردەچێت.',
    },
  },
  {
    id: 'note-sign-weighbridge',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٥٣' },
    image: require('@/assets/exam/pic-053.jpg'),
    title: { en: 'Weighing area for lorries', ar: 'منطقة وزن للشاحنات', ckb: 'ناوچەی کێشانی بارهەڵگرەکان' },
    body: {
      en: 'Marks a weighbridge where large lorries are checked. The weight limits on other signs have to be enforceable somewhere: a bridge rated for ten tonnes fails from repeated overloading long before it fails from one.',
      ar: 'يدلّ على ميزان تُفحص عنده الشاحنات الكبيرة. فحدود الوزن في العلامات الأخرى لا بد أن تكون قابلة للتطبيق في مكان ما: فالجسر المصنّف لعشرة أطنان يتلف من تكرار التحميل الزائد قبل أن يتلف من حمولة واحدة بكثير.',
      ckb: 'شوێنی کێشان دیاری دەکات کە بارهەڵگرە گەورەکانی تێدا دەپشکنرێن. سنوورەکانی کێش لە تابلۆکانی تردا دەبێت لە شوێنێک جێبەجێ بکرێن: پردێک کە بۆ دە تەن دیاریکراوە، بەهۆی دووبارەبوونەوەی بارگرانییەوە زۆر پێشتر تێکدەچێت نەک بە یەک بارەوە.',
    },
  },
  {
    id: 'note-sign-no-photography',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٧١' },
    image: require('@/assets/exam/pic-071.jpg'),
    title: { en: 'No photography', ar: 'ممنوع التصوير', ckb: 'وێنەگرتن قەدەغەیە' },
    body: {
      en: 'Photography is prohibited here. Unusual among road signs in governing what you do with your hands rather than with the vehicle, and posted at installations where missing it means being stopped and questioned.',
      ar: 'يُمنع التصوير هنا. وهي علامة غير معتادة بين علامات المرور لأنها تحكم ما تفعله بيديك لا بالمركبة، وتُنصب عند منشآت يكون إغفالها فيها سببًا للإيقاف والاستجواب.',
      ckb: 'وێنەگرتن لێرەدا قەدەغەیە. لە نێو تابلۆکانی هاتوچۆدا نائاسایییە، چونکە ئەوە ڕێک دەخات کە بە دەستەکانت چی دەکەیت نەک بە ئۆتۆمبێلەکە، و لەلای ئەو دامەزراوانە دادەنرێت کە پشتگوێخستنی مانای ڕاگیران و لێپرسینەوەیە.',
    },
  },
  {
    id: 'note-sign-speed-100-80',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٥١' },
    image: require('@/assets/exam/pic-051.jpg'),
    title: {
      en: 'Two limits on one sign: 100 and 80',
      ar: 'حدّان على علامة واحدة: ١٠٠ و٨٠',
      ckb: 'دوو سنوور لەسەر یەک تابلۆ: ١٠٠ و ٨٠',
    },
    body: {
      en: 'One sign carrying a different maximum for each class of vehicle: 100 km/h for small vehicles and 80 km/h for lorries. Read the row that applies to what you are driving, not the figure printed largest.',
      ar: 'علامة واحدة تحمل حدًّا مختلفًا لكل صنف من المركبات: ١٠٠ كم/س للمركبات الصغيرة و٨٠ كم/س للشاحنات. اقرأ السطر الذي ينطبق على ما تقوده، لا الرقم المطبوع بأكبر خط.',
      ckb: 'یەک تابلۆ کە بۆ هەر جۆرێکی ئۆتۆمبێل سنوورێکی جیاوازی هەیە: ١٠٠ کم/کاتژمێر بۆ ئۆتۆمبێلە بچووکەکان و ٨٠ کم/کاتژمێر بۆ بارهەڵگرەکان. ئەو دێڕە بخوێنەرەوە کە بۆ ئەوەیە کە لێی دەخوڕیت، نەک ئەو ژمارەیەی بە گەورەترین شێوە چاپکراوە.',
    },
  },
  /*
    The next two are *warning* signs whose prohibition and mandatory
    counterparts were already in the catalogue while the warning itself was not
    — which is the sharpest kind of gap this file exists to close, because the
    bank asks each one against precisely those neighbours.

    `qp-bicycle-crossing-sign` is the clearest case: its two distractors are
    "Bicycles prohibited" and "A road reserved for bicycles", which are exactly
    `sign-no-bicycles` and `sign-mandatory-cycle-path`. A learner who studied
    every card the app had was being taught both wrong answers and never the
    right one. Each note therefore names its neighbours rather than describing
    the triangle alone: the distinction is what the question measures.
  */
  {
    id: 'note-sign-bicycle-crossing',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٣٢' },
    image: require('@/assets/exam/pic-032.jpg'),
    title: {
      en: 'Bicycles crossing ahead',
      ar: 'عبور دراجات هوائية أمامك',
      ckb: 'پەڕینەوەی دوچەرخە لە پێشەوە',
    },
    body: {
      en: 'A warning that cyclists cross the road here — not an instruction about where they are allowed to ride. Three bicycle signs exist and the guide asks this one against the other two, so the shape is what settles it: this triangle warns, the red circle forbids bicycles, and the blue disc reserves the path for them.',
      ar: 'تحذير بأن راكبي الدراجات يعبرون الطريق هنا، وليس تعليمة عن المكان المسموح لهم بالسير فيه. وهناك ثلاث علامات للدراجات يسأل الدليل عن هذه في مقابل الأخريين، فالشكل هو الفيصل: هذا المثلث يحذّر، والدائرة الحمراء تمنع الدراجات، والقرص الأزرق يخصّص المسار لها.',
      ckb: 'ئاگادارکردنەوەیەکە کە دوچەرخەسوارەکان لێرەدا بە ڕێگادا دەپەڕنەوە، نەک ڕێنماییەک دەربارەی ئەو شوێنەی بۆیان ڕێگەپێدراوە لێی بسوڕێن. سێ تابلۆی دوچەرخە هەن و ڕێنماییەکە ئەمە بەرامبەر بە دووەکەی تر دەپرسێت، بۆیە شێوەکە بڕیاردەرە: ئەم سێگۆشەیە ئاگادار دەکاتەوە، بازنە سوورەکە دوچەرخە قەدەغە دەکات، و قورسە شینەکە ڕێڕەوەکە بۆیان تەرخان دەکات.',
    },
  },
  {
    id: 'note-sign-farm-animals',
    topic: 'signs', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١١' },
    image: require('@/assets/exam/pic-111.jpg'),
    title: {
      en: 'Farmland: animals may be on the road',
      ar: 'أرض زراعية: قد تكون الحيوانات على الطريق',
      ckb: 'زەوی کشتوکاڵی: لەوانەیە ئاژەڵ لەسەر ڕێگا بێت',
    },
    body: {
      en: 'Warns that the road runs through farmland where domestic animals may be crossing or standing on it. The same three-way distinction as the bicycle signs: this triangle warns, "No animals" forbids them the road, and the blue one reserves a route for them. Livestock does not check for traffic, so the only safe response is enough speed in hand to stop.',
      ar: 'يحذّر من أن الطريق يمرّ بأرض زراعية قد تعبره فيها الحيوانات الداجنة أو تقف عليه. والتمييز الثلاثي نفسه الذي في علامات الدراجات: هذا المثلث يحذّر، و«ممنوع مرور الحيوانات» تمنعها الطريق، والزرقاء تخصّص لها مسارًا. والماشية لا تتحقق من المرور، فالاستجابة الآمنة الوحيدة سرعة تكفي للتوقف.',
      ckb: 'ئاگادار دەکاتەوە کە ڕێگاکە بە زەوی کشتوکاڵیدا تێدەپەڕێت کە لەوانەیە ئاژەڵی ماڵی بیپەڕنەوە یان لەسەری بوەستن. هەمان جیاکردنەوەی سێقۆڵی تابلۆکانی دوچەرخە: ئەم سێگۆشەیە ئاگادار دەکاتەوە، «تێپەڕبوونی ئاژەڵ قەدەغەیە» ڕێگاکەیان لێ قەدەغە دەکات، و شینەکە ڕێڕەوێکیان بۆ تەرخان دەکات. ئاژەڵ هاتوچۆ ناپشکنێت، بۆیە تاکە وەڵامی سەلامەت ئەوەیە خێراییەکەت بەو ڕادەیە بێت کە بتوانیت بوەستیت.',
    },
  },
];
