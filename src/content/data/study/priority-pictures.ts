/**
 * The ministry's right-of-way diagrams, as worked examples.
 *
 * These are the 24 picture questions carrying `topic: 'priority'`. They were
 * left out of the first pass of the Learn tab on the reasoning that "Who has
 * right of way in this picture? — Vehicle B" is exam drill rather than
 * something a reader can study. That was wrong, and it lost a quarter of the
 * section: the *diagram* is the content. A right-of-way rule stated in a
 * sentence and a right-of-way rule recognised in a junction are two different
 * skills, and the second is the one the test measures.
 *
 * So each note keeps the ministry's own picture, describes what is in it, and
 * names the rule from `note-priority-ranking` that settles it. Read as a set
 * they are the ranking applied twenty-four times, which is the point.
 *
 * ## The one thing to be careful about when editing
 *
 * **The publication gives the answer and almost never gives the reason.** Where
 * the diagram makes the reason plain — a give-way triangle, a stop sign, one
 * car going straight while the other turns across it — the note says it.
 * Where it does not, the note describes the situation and states the answer
 * without inventing a rationale, because a confident wrong reason is worse here
 * than no reason at all: a learner who has memorised a rule that does not exist
 * will apply it at a junction the guide never showed them.
 *
 * `note-priority-two-on-a-roundabout` is the clearest case of that and should
 * stay as it is.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE } from './source';

const G = 'pictures';

export const priorityPictureNotes: StudyNote[] = [
  {
    id: 'note-priority-pic-open-crossroads',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٨٩' },
    image: require('@/assets/exam/pic-089.jpg'),
    title: {
      en: 'An open crossroads with nothing to settle it',
      ar: 'تقاطع مفتوح لا شيء يحسمه',
      ckb: 'چوارڕیانێکی کراوە کە هیچ شتێک بڕیاری نادات',
    },
    body: {
      en: 'No signs, no markings, no signal. The white car is approaching from the right, so it goes first and the car coming down from the top waits, even though it reached the junction first.',
      ar: 'لا علامات ولا خطوط ولا إشارة. المركبة البيضاء قادمة من يمين الأخرى، فلها الأولوية، وتنتظر المركبة النازلة من الأعلى، حتى لو وصلت إلى التقاطع أولًا.',
      ckb: 'نە تابلۆ، نە هێڵ، نە چرا. ئۆتۆمبێلە سپییەکە لە لای ڕاستەوە دێت، بۆیە ئەو پێشترە و ئەوەی لە سەرەوە دادەبەزێت چاوەڕێ دەکات، تەنانەت ئەگەر یەکەم جار گەیشتبێتە چوارڕیانەکە.',
    },
  },
  {
    id: 'note-priority-pic-crossroads-between-buildings',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٩٩' },
    image: require('@/assets/exam/pic-099.jpg'),
    title: {
      en: 'A crossroads hemmed in by buildings',
      ar: 'تقاطع تحيط به الأبنية',
      ckb: 'چوارڕیانێک کە بینا دەوری داوە',
    },
    body: {
      en: 'The green car comes from the right of the white one, so it goes first. Buildings this close to the corner are the reason the rule matters: neither driver sees the other until both are almost in the junction, and the only safe way through is to arrive slowly enough to give way whichever side the other car appears on.',
      ar: 'المركبة الخضراء قادمة من يمين البيضاء فلها الأولوية. وقرب الأبنية من الزاوية هو سبب أهمية القاعدة: فلا يرى أيّ من السائقين الآخر إلا وهما شبه داخلَين التقاطع، والطريقة الآمنة الوحيدة أن تصل ببطء يكفي للإفساح من أي جهة ظهرت المركبة الأخرى.',
      ckb: 'ئۆتۆمبێلە سەوزەکە لە لای ڕاستی سپییەکەوە دێت، بۆیە پێشترە. نزیکی بیناکان لە گۆشەکە هۆکاری گرنگی یاساکەیە: هیچ کام لە شۆفێرەکان ئەوی تر نابینێت تا هەردووکیان تەنیا لە چوارڕیانەکەن، و تاکە ڕێگای سەلامەت ئەوەیە ئەوەندە خاو بگەیت کە بتوانیت ڕێگا بدەیت لە هەر لایەکەوە ئۆتۆمبێلەکەی تر دەرکەوت.',
    },
  },
  {
    id: 'note-priority-pic-marked-crossroads-no-signs',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١٤' },
    image: require('@/assets/exam/pic-114.jpg'),
    title: {
      en: 'Lane markings, but no priority sign',
      ar: 'خطوط للمسارات دون علامة أولوية',
      ckb: 'هێڵی لەین هەیە، بەڵام تابلۆی پێشینەیی نا',
    },
    body: {
      en: 'A tidy crossroads with centre lines on both roads and no sign on either. Markings that only separate lanes decide nothing about priority, so the rule is unchanged: B is on A\'s right, and B goes first.',
      ar: 'تقاطع منظّم بخطوط وسطية على الطريقين وبلا علامة على أيّهما. والخطوط التي تفصل المسارات فقط لا تقرّر شيئًا في الأولوية، فتبقى القاعدة: المركبة (ب) على يمين (أ)، فتمرّ (ب) أولًا.',
      ckb: 'چوارڕیانێکی ڕێک بە هێڵی ناوەڕاست لەسەر هەردوو ڕێگا و بەبێ تابلۆ لەسەر هیچیان. ئەو هێڵانەی تەنها لەین جیا دەکەنەوە هیچ بڕیارێک لەسەر پێشینەیی نادەن، بۆیە یاساکە وەک خۆیەتی: (ب) لە لای ڕاستی (أ)یە، و (ب) پێشترە.',
    },
  },
  {
    id: 'note-priority-pic-straight-beats-turning',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٩٠' },
    image: require('@/assets/exam/pic-090.jpg'),
    title: {
      en: 'One car straight on, one turning across',
      ar: 'مركبة تسير مستقيمة وأخرى تنعطف أمامها',
      ckb: 'یەکێک ڕاست دەڕوات و ئەوی تر بەبەردەمیدا لادەدات',
    },
    body: {
      en: 'The two meet head-on and only one of them is changing direction. The red car is going straight through; the white one wants to turn across its path. Traffic going straight ahead has priority over traffic turning, so the red car goes and the white one waits.',
      ar: 'تلتقي المركبتان وجهًا لوجه وواحدة منهما فقط تغيّر اتجاهها. المركبة الحمراء تمضي مستقيمة، والبيضاء تريد الانعطاف أمام مسارها. والأولوية للسير المستقيم على السير المنعطف، فتمرّ الحمراء وتنتظر البيضاء.',
      ckb: 'هەردووکیان ڕووبەڕوو یەکتر دەبیننەوە و تەنها یەکێکیان ئاراستەکەی دەگۆڕێت. ئۆتۆمبێلە سوورەکە ڕاست بەردەوامە؛ سپییەکە دەیەوێت بەبەردەمیدا لابدات. ئەو هاتوچۆیەی ڕاست بەرەوپێش دەڕوات پێشینەیی بەسەر ئەوەی لادەدات هەیە، بۆیە سوورەکە دەڕوات و سپییەکە چاوەڕێ دەکات.',
    },
  },
  {
    id: 'note-priority-pic-crossing-while-other-turns',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١٧' },
    image: require('@/assets/exam/pic-117.jpg'),
    title: {
      en: 'Crossing straight through as the other car turns',
      ar: 'العبور مستقيمًا بينما تنعطف الأخرى',
      ckb: 'بە ڕاستی تێپەڕین لە کاتێکدا ئەوی تر لادەدات',
    },
    body: {
      en: 'B is coming down the road and carrying straight on; A has stopped opposite with its indicator going, waiting to turn. The same rule decides it: B is not changing direction, so B goes first, and A completes its turn behind it.',
      ar: 'تنزل (ب) في الطريق وتمضي مستقيمة، وتقف (أ) في المقابل وإشارتها تعمل بانتظار الانعطاف. والقاعدة نفسها تحسم الأمر: (ب) لا تغيّر اتجاهها فتمرّ أولًا، وتكمل (أ) انعطافها خلفها.',
      ckb: 'ئۆتۆمبێلی (ب) بە ڕێگاکەدا دادەبەزێت و ڕاست بەردەوام دەبێت؛ (أ) لە بەرامبەردا وەستاوە و ئیشارەتەکەی کار دەکات و چاوەڕێی لادانە. هەمان یاسا بڕیار دەدات: (ب) ئاراستەکەی ناگۆڕێت، بۆیە پێشترە، و (أ) لادانەکەی لە دوایەوە تەواو دەکات.',
    },
  },
  {
    id: 'note-priority-pic-indicating-left-across-you',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٤' },
    image: require('@/assets/exam/pic-124.jpg'),
    title: {
      en: 'A car indicating to turn across your lane',
      ar: 'مركبة تشير لتنعطف عبر مسارك',
      ckb: 'ئۆتۆمبێلێک ئیشارەت دەدات بۆ لادان بەناو لەینەکەتدا',
    },
    body: {
      en: 'A is indicating and about to turn off the road; B is travelling straight along it in the opposite direction. B keeps its priority: an indicator announces an intention, it does not create a right of way.',
      ar: 'تشير (أ) وتوشك أن تخرج من الطريق، بينما تسير (ب) مستقيمة عليه في الاتجاه المقابل. وتحتفظ (ب) بأولويتها: فالإشارة تُعلن نيّة ولا تنشئ حق أولوية.',
      ckb: '(أ) ئیشارەت دەدات و خەریکە لە ڕێگاکە لادات؛ (ب) بە ئاراستەی پێچەوانەدا ڕاست بەسەریدا دەڕوات. (ب) پێشینەییەکەی دەپارێزێت: ئیشارەت مەبەستێک ڕادەگەیەنێت، مافی پێشینەیی دروست ناکات.',
    },
  },
  {
    id: 'note-priority-pic-approaching-as-car-turns-in',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٧' },
    image: require('@/assets/exam/pic-127.jpg'),
    title: {
      en: 'Approaching a junction as a car turns into it',
      ar: 'الاقتراب من تقاطع بينما تنعطف مركبة إليه',
      ckb: 'نزیکبوونەوە لە چوارڕیان لە کاتێکدا ئۆتۆمبێلێک بۆی لادەدات',
    },
    body: {
      en: 'B is coming up the road and going straight on through the junction. A has slowed on the crossing road with its indicators on to turn into it. B goes first: A\'s turn crosses B\'s path, and a turn always yields to the traffic it has to cut across.',
      ar: 'تصعد (ب) في الطريق وتمضي مستقيمة عبر التقاطع، وقد خفّفت (أ) في الطريق العرضي وأشارت لتنعطف إليه. الأولوية لـ(ب): فانعطاف (أ) يقطع مسار (ب)، والمنعطف يفسح دائمًا للسير الذي يقطعه.',
      ckb: '(ب) بە ڕێگاکەدا سەردەکەوێت و ڕاست بەناو چوارڕیانەکەدا دەڕوات. (أ) لە ڕێگا بەرامبەرەکەدا خێرایی کەم کردووەتەوە و ئیشارەتی داوە بۆ لادان بۆی. (ب) پێشترە: لادانی (أ) ڕێڕەوی (ب) دەبڕێت، و لادان هەمیشە ڕێگا دەدات بەو هاتوچۆیەی دەبێت بەناویدا ببڕێت.',
    },
  },
  {
    id: 'note-priority-pic-both-turning',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٦' },
    image: require('@/assets/exam/pic-126.jpg'),
    title: {
      en: 'Both cars turning, one across the other',
      ar: 'كلتاهما تنعطف وإحداهما تقطع مسار الأخرى',
      ckb: 'هەردووکیان لادەدەن، یەکێکیان بەبەردەمی ئەوی تردا',
    },
    body: {
      en: 'The two are turning off the same road in opposite directions, and only one turn crosses the other car\'s path. B\'s turn keeps to its own side, while A\'s cuts across the oncoming lane, so B goes first.',
      ar: 'تنعطف المركبتان من الطريق نفسه في اتجاهين متقابلين، وواحد فقط من الانعطافين يقطع مسار الأخرى: انعطاف (ب) يبقى في جهته من الطريق، بينما انعطاف (أ) يقطع المسار المقابل. فتمرّ (ب) أولًا وتنتظر (أ) خلوّه.',
      ckb: 'هەردووکیان لە هەمان ڕێگاوە بە دوو ئاراستەی پێچەوانە لادەدەن، و تەنها یەکێک لە لادانەکان ڕێڕەوی ئەوی تر دەبڕێت. لادانی (ب) لە لای خۆیدا دەمێنێتەوە، لە کاتێکدا لادانی (أ) لەینی بەرامبەر دەبڕێت، بۆیە (ب) پێشترە.',
    },
  },
  {
    id: 'note-priority-pic-two-turns-that-do-not-cross',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٨' },
    image: require('@/assets/exam/pic-128.jpg'),
    title: {
      en: 'Two turns that never cross: both go together',
      ar: 'انعطافان لا يتقاطعان: تمرّان معًا',
      ckb: 'دوو لادان کە یەکتر نابڕن: هەردووکیان پێکەوە دەڕۆن',
    },
    body: {
      en: 'The one case in the set with no waiting in it. A and B are facing each other and both turning, but their paths run side by side into different lanes and never meet. Both may go at the same time.',
      ar: 'الحالة الوحيدة في المجموعة التي لا انتظار فيها. تتقابل (أ) و(ب) وكلتاهما تنعطف، لكن مسارَيهما يمضيان جنبًا إلى جنب نحو مسارين مختلفين ولا يلتقيان. فيجوز أن تمرّا معًا في الوقت نفسه.',
      ckb: 'تاکە حاڵەتی ئەم کۆمەڵەیە کە چاوەڕوانی تێدا نییە. (أ) و (ب) ڕووبەڕووی یەکترن و هەردووکیان لادەدەن، بەڵام ڕێڕەوەکانیان تەنیشت یەکەوە بەرەو دوو لەینی جیاواز دەڕۆن و هەرگیز یەکتر نابیننەوە. هەردووکیان لە هەمان کاتدا دەتوانن بڕۆن.',
    },
  },
  {
    id: 'note-priority-pic-side-road-onto-main',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠١' },
    image: require('@/assets/exam/pic-101.jpg'),
    title: {
      en: 'Coming out of a side road onto a main street',
      ar: 'الخروج من شارع فرعي إلى شارع رئيس',
      ckb: 'دەرچوون لە شەقامێکی لاوەکییەوە بۆ شەقامێکی سەرەکی',
    },
    body: {
      en: 'The red car is already on the main street and going straight along it. The white one is nosing out of the side road to join. Everything on the main road goes first, in both directions, and the side road waits.',
      ar: 'المركبة الحمراء تسير أصلًا على الشارع الرئيس مستقيمة عليه، والبيضاء تخرج من الشارع الفرعي للانضمام. والأولوية لكل ما على الطريق الرئيس في الاتجاهين، وينتظر الفرعي.',
      ckb: 'ئۆتۆمبێلە سوورەکە پێشتر لەسەر شەقامە سەرەکییەکەیە و ڕاست بەسەریدا دەڕوات. سپییەکە لە شەقامە لاوەکییەکەوە دەردەچێت بۆ چوونە ناوی. هەموو ئەوەی لەسەر ڕێگا سەرەکییەکەیە پێشترە، لە هەردوو ئاراستە، و لاوەکییەکە چاوەڕێ دەکات.',
    },
  },
  {
    id: 'note-priority-pic-main-road-white-car',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٩١' },
    image: require('@/assets/exam/pic-091.jpg'),
    title: {
      en: 'A wide main road with a side turning off it',
      ar: 'طريق رئيس واسع يتفرّع منه شارع جانبي',
      ckb: 'ڕێگایەکی سەرەکی پان کە شەقامێکی لاوەکی لێی جیا دەبێتەوە',
    },
    body: {
      en: 'The white car is travelling on the main road; the other is waiting at the mouth of the side street. The white car has priority because of the road it is on, not because of where it is in the junction.',
      ar: 'المركبة البيضاء تسير على الطريق الرئيس، والأخرى تنتظر عند مدخل الشارع الجانبي. وللبيضاء الأولوية بسبب الطريق الذي تسير عليه لا بسبب موضعها من التقاطع.',
      ckb: 'ئۆتۆمبێلە سپییەکە لەسەر ڕێگا سەرەکییەکە دەڕوات؛ ئەوی تر لە دەمی شەقامە لاوەکییەکە چاوەڕێیە. سپییەکە پێشینەیی هەیە بەهۆی ئەو ڕێگایەی لەسەریەتی، نەک بەهۆی شوێنی لە چوارڕیانەکەدا.',
    },
  },
  {
    id: 'note-priority-pic-through-road-t-junction',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٤' },
    image: require('@/assets/exam/pic-134.jpg'),
    title: {
      en: 'Turning out of a side road onto a through road',
      ar: 'الانعطاف من شارع فرعي إلى طريق نافذ',
      ckb: 'لادان لە شەقامێکی لاوەکییەوە بۆ ڕێگایەکی تێپەڕ',
    },
    body: {
      en: 'A T-junction: B runs along the through road, A comes up the side road and wants to turn onto it. B has priority twice over, being on the through road and going straight, so A waits at the mouth for a gap.',
      ar: 'تقاطع على شكل T: تسير (ب) على الطريق النافذ، وتصعد (أ) في الشارع الفرعي وتريد الانعطاف إليه. ولـ(ب) الأولوية من وجهين، فهي على الطريق النافذ وتسير مستقيمة، وتنتظر (أ) عند المدخل فرصةً تكفي للانضمام.',
      ckb: 'چوارڕیانێکی شێوە T: (ب) بەسەر ڕێگا تێپەڕەکەدا دەڕوات، (أ) بە شەقامە لاوەکییەکەدا سەردەکەوێت و دەیەوێت بۆی لابدات. (ب) دوو جار پێشینەیی هەیە، لەسەر ڕێگا تێپەڕەکەیە و ڕاست دەڕوات، بۆیە (أ) لە دەمەکە چاوەڕێی کەلێن دەکات.',
    },
  },
  {
    id: 'note-priority-pic-slip-road-at-crossroads',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٤' },
    image: require('@/assets/exam/pic-014.jpg'),
    title: {
      en: 'A slip road joining at a crossroads',
      ar: 'طريق فرعي منحرف ينضم عند تقاطع',
      ckb: 'ڕێگایەکی لاوەکی کە لەلای چوارڕیانێک دەچێتە ناوی',
    },
    body: {
      en: 'B is turning through the junction on the main carriageway. A is on the curved slip road at the corner, and the triangular marking painted across its mouth is a give-way line. B goes first: a slip road joins the traffic already flowing, it does not interrupt it.',
      ar: 'تنعطف (ب) عبر التقاطع على الطريق الرئيس، و(أ) على الطريق المنحرف عند الزاوية، والمثلث المرسوم عند مدخله خط إفساح. الأولوية لـ(ب): فالطريق المنحرف ينضم إلى السير الجاري ولا يقطعه.',
      ckb: '(ب) بەناو چوارڕیانەکەدا لەسەر ڕێگا سەرەکییەکە لادەدات. (أ) لەسەر ڕێگا سووڕاوەکەی گۆشەکەیە، و ئەو سێگۆشەیەی لە دەمیدا کێشراوە هێڵی ڕێگادانە. (ب) پێشترە: ڕێگای لاوەکی دەچێتە ناو ئەو هاتوچۆیەی هەیە، نایبڕێت.',
    },
  },
  {
    id: 'note-priority-pic-merge-line-ends',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٩' },
    image: require('@/assets/exam/pic-019.jpg'),
    title: {
      en: 'Two lanes merging where the broken line stops',
      ar: 'مسارَان يندمجان حيث ينتهي الخط المتقطع',
      ckb: 'دوو لەین تێکەڵ دەبن لەو شوێنەی هێڵە پچڕپچڕەکە کۆتایی دێت',
    },
    body: {
      en: 'Read the paint, not the cars. The broken line between the two lanes stops short of where they come together, and here the guide gives priority to A, in the upper lane. Compare it with the next picture.',
      ar: 'اقرأ الخطوط لا المركبات. الخط المتقطع بين المسارين ينتهي قبل موضع التقائهما، وفي هذه الحالة يعطي الدليل الأولوية لـ(أ)، المركبة في المسار الأعلى. وقارنها بالصورة التالية.',
      ckb: 'هێڵەکان بخوێنەرەوە نەک ئۆتۆمبێلەکان. هێڵە پچڕپچڕەکەی نێوان دوو لەینەکە پێش ئەو شوێنە کۆتایی دێت کە تێکەڵ دەبن، و لەم حاڵەتەدا ڕێنماییەکە پێشینەیی دەداتە (أ)، ئەو ئۆتۆمبێلەی لە لەینی سەرەوەیە. لەگەڵ وێنەی داهاتوو بەراوردی بکە.',
    },
  },
  {
    id: 'note-priority-pic-merge-line-continues',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٢٤' },
    image: require('@/assets/exam/pic-024.jpg'),
    title: {
      en: 'Two lanes merging where the broken line runs on',
      ar: 'مسارَان يندمجان حيث يستمر الخط المتقطع',
      ckb: 'دوو لەین تێکەڵ دەبن لەو شوێنەی هێڵە پچڕپچڕەکە بەردەوامە',
    },
    body: {
      en: 'The same geometry as the picture before it, with one difference: the broken line carries on through the merge. Here the guide gives priority to B, in the lower lane, so the marking alone changes the answer.',
      ar: 'الهندسة نفسها كالصورة السابقة مع فارق واحد: الخط المتقطع يستمر عبر موضع الاندماج. وهنا يعطي الدليل الأولوية لـ(ب) في المسار الأسفل، فالخط وحده هو ما يغيّر الجواب.',
      ckb: 'هەمان شێوەی وێنەی پێشوو، بە یەک جیاوازییەوە: هێڵە پچڕپچڕەکە بەناو شوێنی تێکەڵبووندا بەردەوام دەبێت. لێرەدا ڕێنماییەکە پێشینەیی دەداتە (ب) لە لەینی خوارەوە، بۆیە تەنها هێڵەکە وەڵامەکە دەگۆڕێت.',
    },
  },
  {
    id: 'note-priority-pic-rejoining-from-hatching',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١' },
    image: require('@/assets/exam/pic-011.jpg'),
    title: {
      en: 'Pulling back into the lane off a hatched area',
      ar: 'العودة إلى المسار من منطقة مخطّطة',
      ckb: 'گەڕانەوە بۆ لەین لە ناوچەیەکی هێڵکێشراوەوە',
    },
    body: {
      en: 'B is manoeuvring on the hatched area at the edge of the carriageway, which is not a lane: it is painted precisely so that nothing travels on it. A is in the running lane and has priority, because a driver rejoining the flow gives way to everything already in it.',
      ar: 'تناور (ب) على المنطقة المخطّطة عند حافة الطريق، وهي ليست مسارًا: فقد رُسمت تحديدًا لئلا يسير عليها شيء. و(أ) في مسار السير ولها الأولوية، فمن يعود إلى السير من خارجه يفسح لكل ما هو فيه.',
      ckb: '(ب) لەسەر ئەو ناوچە هێڵکێشراوەی لێواری ڕێگاکە دەجوڵێت، کە لەین نییە: بۆ ئەوە کێشراوە کە هیچ شتێک بەسەریدا نەڕوات. (أ) لە لەینی ڕۆیشتندایە و پێشینەیی هەیە، چونکە ئەو شۆفێرەی دەگەڕێتەوە ناو هاتوچۆکە ڕێگا دەدات بە هەموو ئەوەی تێیدایە.',
    },
  },
  {
    id: 'note-priority-pic-pedestrians-stepped-on',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٩٤' },
    image: require('@/assets/exam/pic-094.jpg'),
    title: {
      en: 'Pedestrians who have stepped onto the crossing',
      ar: 'مشاة وضعوا أقدامهم على الممر',
      ckb: 'پیادەی پێخستووەتە سەر پەڕینگەکە',
    },
    body: {
      en: 'Both pedestrians, at A and at B, are already on the crossing and walking. The car approaching the junction stops and waits until they have finished, not until they are merely out of its own lane.',
      ar: 'كلا المشاة، عند (أ) وعند (ب)، على الممر أصلًا ويسيران. فتقف المركبة المقتربة من التقاطع وتنتظر حتى ينتهيا، لا حتى يخرجا من مسارها وحده.',
      ckb: 'هەردوو پیادەکە، لە (أ) و لە (ب)، پێشتر لەسەر پەڕینگەکەن و دەڕۆن. ئەو ئۆتۆمبێلەی لە چوارڕیانەکە نزیک دەبێتەوە دەوەستێت و چاوەڕێ دەکات تا تەواو دەبن، نەک تەنها تا لە لەینی خۆی دەردەچن.',
    },
  },
  {
    id: 'note-priority-pic-pedestrians-still-waiting',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٠٥' },
    image: require('@/assets/exam/pic-105.jpg'),
    title: {
      en: 'Pedestrians still waiting on the kerb',
      ar: 'مشاة ما زالوا على الرصيف',
      ckb: 'پیادە هێشتا لەسەر ڕێڕەوی پیادە چاوەڕوانن',
    },
    body: {
      en: 'The same junction as the picture before, with one thing changed: the two people at A and B are standing on the pavement and have not stepped onto the crossing. The car keeps its priority and may go. The line between the two pictures is the foot on the road.',
      ar: 'التقاطع نفسه كالصورة السابقة مع تغيّر واحد: الشخصان عند (أ) و(ب) واقفان على الرصيف ولم يضعا قدمًا على الممر. فتحتفظ المركبة بأولويتها ولها المرور. والفاصل بين الصورتين هو القدم على الطريق.',
      ckb: 'هەمان شوێنی وێنەی پێشوو بە یەک گۆڕانکارییەوە: ئەو دوو کەسەی لە (أ) و (ب) لەسەر ڕێڕەوی پیادە وەستاون و پێیان نەخستووەتە سەر پەڕینگەکە. ئۆتۆمبێلەکە پێشینەییەکەی دەپارێزێت و دەتوانێت بڕوات. جیاوازی نێوان دوو وێنەکە ئەو پێیەیە کە خراوەتە سەر ڕێگاکە.',
    },
  },
  {
    id: 'note-priority-pic-waiting-to-enter-roundabout',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١٨' },
    image: require('@/assets/exam/pic-118.jpg'),
    title: {
      en: 'Waiting to enter a roundabout',
      ar: 'الانتظار عند مدخل الدوّار',
      ckb: 'چاوەڕوانی لە دەروازەی خولانەوە',
    },
    body: {
      en: 'A is already on the roundabout and circulating; B and C are queued at the entry below it. A goes first: traffic already on the roundabout has priority, and the queue waits at the line, not inside the circle.',
      ar: 'المركبة (أ) داخل الدوّار وتدور فيه أصلًا، و(ب) و(ج) في الطابور عند المدخل أسفله. الأولوية لـ(أ): فالأولوية لمن هو داخل الدوّار، وينتظر الطابور عند الخط لا داخل الدائرة.',
      ckb: '(أ) پێشتر لە خولانەوەکەدایە و دەسوڕێتەوە؛ (ب) و (ج) لە ڕیزی دەروازەکەی خوارەوەن. (أ) پێشترە: ئەو هاتوچۆیەی پێشتر لە خولانەوەکەدایە پێشینەیی هەیە، و ڕیزەکە لەسەر هێڵەکە چاوەڕێ دەکات نەک لە ناو بازنەکە.',
    },
  },
  {
    id: 'note-priority-two-on-a-roundabout',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١٩' },
    image: require('@/assets/exam/pic-119.jpg'),
    title: {
      en: 'Two cars already on the roundabout',
      ar: 'مركبتان داخل الدوّار معًا',
      ckb: 'دوو ئۆتۆمبێل پێکەوە لە ناو خولانەوەدا',
    },
    body: {
      en: 'Both G and H are circulating, G on the inner lane and H on the outer. The guide gives priority to G and does not say why, so nothing here should be turned into a rule. What is safe to take from it is the advice that governs every roundabout: hold the lane you entered in, never cut across the lane beside you, and signal before you leave so the driver in the other lane can read what you are about to do.',
      ar: 'كلٌّ من (ز) و(هـ) يدور داخل الدوّار، (ز) في المسار الداخلي و(هـ) في الخارجي. ويعطي الدليل الأولوية لـ(ز) دون أن يذكر السبب، فلا ينبغي تحويل ذلك إلى قاعدة. والمأخوذ الآمن منه هو ما يحكم كل دوّار: التزم بالمسار الذي دخلت به، ولا تقطع المسار المجاور أبدًا، وأشِر قبل الخروج ليقرأ سائق المسار الآخر ما أنت مقدم عليه.',
      ckb: 'هەردوو (ز) و (هـ) لە خولانەوەکەدا دەسوڕێنەوە، (ز) لە لەینی ناوەوە و (هـ) لە دەرەوە. ڕێنماییەکە پێشینەیی دەداتە (ز) و هۆکارەکەی ناڵێت، بۆیە نابێت هیچ لێرەدا بکرێتە یاسا. ئەوەی سەلامەتە لێی وەربگیرێت ئەو ئامۆژگارییەیە کە بەسەر هەموو خولانەوەیەکدا زاڵە: لەو لەینەدا بمێنەوە کە پێی چوویتە ژوورەوە، هەرگیز لەینی تەنیشتت مەبڕە، و پێش دەرچوون ئیشارەت بدە تاکو شۆفێری لەینەکەی تر بزانێت خەریکی چیت.',
    },
  },
  {
    id: 'note-priority-pic-both-stop-signs',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٠' },
    image: require('@/assets/exam/pic-130.jpg'),
    title: {
      en: 'Both approaches carry a stop sign',
      ar: 'كلا المدخلين تحمله علامة قف',
      ckb: 'هەردوو لاکە تابلۆی وەستانیان پێیە',
    },
    body: {
      en: 'A stop sign faces both A and B, so both must come to a complete halt first, and after that the sign decides nothing between them. The ordinary rule settles it: B is going straight through, A is turning across, so B goes first.',
      ar: 'علامة «قف» تواجه (أ) و(ب) معًا، فيجب أن تتوقف كلتاهما توقفًا تامًّا أولًا، وبعد ذلك لا تحسم العلامة شيئًا بينهما. والقاعدة المعتادة هي التي تحسمه: (ب) تمضي مستقيمة و(أ) تنعطف قاطعةً، فتمرّ (ب) أولًا.',
      ckb: 'تابلۆی وەستان ڕووەو هەردوو (أ) و (ب)ە، بۆیە دەبێت هەردووکیان سەرەتا بە تەواوی بوەستن، و دوای ئەوە تابلۆکە هیچ بڕیارێک لە نێوانیاندا نادات. یاسا ئاسایییەکە بڕیاری لەسەر دەدات: (ب) ڕاست دەڕوات و (أ) بەبەردەمیدا لادەدات، بۆیە (ب) پێشترە.',
    },
  },
  {
    id: 'note-priority-pic-both-give-way-signs',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٢' },
    image: require('@/assets/exam/pic-132.jpg'),
    title: {
      en: 'Both approaches carry a give-way sign',
      ar: 'كلا المدخلين تحمله علامة أفسح الطريق',
      ckb: 'هەردوو لاکە تابلۆی ڕێگادانیان پێیە',
    },
    body: {
      en: 'The mirror of the picture before it: a give-way sign faces both cars, so neither takes priority from the sign. A is turning the short way, into the near lane; B\'s turn has to cross A\'s path. A goes first.',
      ar: 'نظير الصورة السابقة: علامة «أفسح الطريق» تواجه المركبتين، فلا تأخذ أيّ منهما أولوية من العلامة. تنعطف (أ) الانعطاف القصير إلى المسار القريب، بينما يقطع انعطاف (ب) مسار (أ). فتمرّ (أ) أولًا.',
      ckb: 'وێنەی بەرامبەری ئەوەی پێشتر: تابلۆی ڕێگادان ڕووەو هەردوو ئۆتۆمبێلەکەیە، بۆیە هیچیان لە تابلۆکەوە پێشینەیی وەرناگرن. (أ) لادانە کورتەکە دەکات، بۆ لەینی نزیک؛ لادانی (ب) دەبێت ڕێڕەوی (أ) ببڕێت. (أ) پێشترە.',
    },
  },
  {
    id: 'note-priority-pic-crossroads-warning-sign',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٠' },
    image: require('@/assets/exam/pic-120.jpg'),
    title: {
      en: 'A crossroads-ahead warning on your approach',
      ar: 'تحذير تقاطع أمامك على مدخلك',
      ckb: 'ئاگادارکردنەوەی چوارڕیان لە پێشەوە لەسەر ڕێگاکەت',
    },
    body: {
      en: 'You are the green car, and the triangular sign on your side warns of the crossroads rather than forbidding anything. You may continue, while paying attention, which is the whole content of the sign.',
      ar: 'أنت المركبة الخضراء، والعلامة المثلثة في جهتك تحذّر من التقاطع ولا تمنع شيئًا. لك أن تستمر مع الانتباه، وهو كل ما تقوله العلامة.',
      ckb: 'تۆ ئۆتۆمبێلە سەوزەکەیت، و ئەو تابلۆ سێگۆشەیەی لای تۆ ئاگادارت دەکاتەوە لە چوارڕیانەکە و هیچ قەدەغە ناکات. دەتوانیت بەردەوام بیت، بە ئاگاداریەوە، کە هەموو ناوەڕۆکی تابلۆکەیە.',
    },
  },
  {
    id: 'note-priority-pic-officer-overrides',
    topic: 'priority', group: G, verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١٦' },
    image: require('@/assets/exam/pic-116.jpg'),
    title: {
      en: 'An officer waving you against the signs',
      ar: 'رجل مرور يشير لك عكس ما تقوله العلامات',
      ckb: 'پۆلیسێک ئاماژەت پێدەکات بە پێچەوانەی تابلۆکان',
    },
    body: {
      en: 'The blue sign behind the officer orders traffic to the right, and the officer is waving you the other way. You obey the officer. Their hand signal comes before the light, the signs and the markings: you will do something the sign forbids, and doing it is correct.',
      ar: 'العلامة الزرقاء خلف رجل المرور تأمر بالاتجاه يمينًا، وهو يشير لك بعكسها. الطاعة لرجل المرور. فإشارة يده تسبق الضوء والعلامات والخطوط: ستفعل ما تمنعه العلامة، وفعله هو الصواب.',
      ckb: 'ئەو تابلۆیە شینەی لە پشت پۆلیسەکەیە فەرمان بە ڕۆیشتن بۆ ڕاست دەدات، و پۆلیسەکە بە پێچەوانەوە ئاماژەت پێدەکات. گوێڕایەڵی پۆلیسەکە دەبیت. ئیشارەتی دەستی پێش چرا و تابلۆ و هێڵەکان دەکەوێت: شتێک دەکەیت کە تابلۆکە قەدەغەی دەکات، و کردنی دروستە.',
    },
  },
];
