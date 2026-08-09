/**
 * Rules the exam teaches through a picture rather than a sentence.
 *
 * Two groups' worth. The three `markings` notes cover road markings the signs
 * manual does not illustrate — the hatched median and the two merge markings —
 * so they sit alongside the eleven marking cards from the catalogue rather than
 * in a group of their own.
 *
 * The `situations` notes are the picture questions whose content *is* the
 * situation: a child stepping out from between parked cars, two ways of passing
 * a motorcycle, a road with no signs on it at all. Each keeps the ministry's own
 * photograph or diagram, because the recognition is the thing being taught — a
 * hazard described in a sentence and a hazard spotted through a windscreen are
 * different skills, and the second is the one that matters at the wheel.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE } from './source';

export const rulePictureNotes: StudyNote[] = [
  // ------------------------------------------------------------- markings --
  {
    id: 'note-marking-hatched-median',
    topic: 'rules', group: 'markings', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٣٤' },
    image: require('@/assets/exam/pic-034.jpg'),
    title: {
      en: 'A hatched median between opposing lanes',
      ar: 'جزيرة مخطّطة بين اتجاهين متقابلين',
      ckb: 'دوورگەیەکی هێڵکێشراو لە نێوان دوو ئاراستەی بەرامبەر',
    },
    body: {
      en: 'A striped strip down the middle with a solid line each side. It means two things: no overtaking in either direction, and the hatched area must never be driven on or crossed. It is a painted wall, not a lane.',
      ar: 'شريط مخطّط في المنتصف، على جانبيه خط متصل. ويعني أمرين: يُمنع التجاوز في الاتجاهين، ولا يجوز السير على المنطقة المخطّطة ولا قطعها. فهي جدار مرسوم لا مسار.',
      ckb: 'تەنیشتێکی هێڵکێشراو لە ناوەڕاست، هێڵێکی بەردەوام لە هەردوو لای. دوو شت دەگەیەنێت: تێپەڕاندن لە هەردوو ئاراستە قەدەغەیە، و نابێت بەسەر ناوچە هێڵکێشراوەکەدا بڕۆیت یان ببڕیت. دیوارێکی کێشراوە، نەک لەین.',
    },
  },
  {
    id: 'note-marking-merge-start',
    topic: 'rules', group: 'markings', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٣٧' },
    image: require('@/assets/exam/pic-037.jpg'),
    title: {
      en: 'Where two roads begin to merge',
      ar: 'حيث يبدأ اندماج طريقين',
      ckb: 'لەو شوێنەی دوو ڕێگا دەست بە تێکەڵبوون دەکەن',
    },
    body: {
      en: 'Marks the start of two carriageways coming together, with the island between them closed to traffic. From here the space beside you stops being an empty lane, so check the mirror rather than speed up.',
      ar: 'يدلّ على بداية التقاء طريقين، والجزيرة بينهما مغلقة أمام السير. فمن هنا يكفّ الفراغ بجانبك عن كونه مسارًا خاليًا، فانظر في المرآة بدل زيادة السرعة.',
      ckb: 'دەستپێکی یەکگرتنی دوو ڕێگا دیاری دەکات، و دوورگەکەی نێوانیان بۆ هاتوچۆ داخراوە. لێرەوە ئەو بۆشاییەی تەنیشتت چیتر لەینێکی بەتاڵ نییە، بۆیە سەیری ئاوێنە بکە نەک خێرایی زیاد بکە.',
    },
  },
  {
    id: 'note-marking-merge-end',
    topic: 'rules', group: 'markings', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٣٩' },
    image: require('@/assets/exam/pic-039.jpg'),
    title: {
      en: 'Where the merge finishes',
      ar: 'حيث ينتهي الاندماج',
      ckb: 'لەو شوێنەی تێکەڵبوونەکە تەواو دەبێت',
    },
    body: {
      en: 'The closing end of the same marking: the two roads have become one and the central island tapers away. The lane change should already be finished by this point.',
      ar: 'الطرف المغلق للخط نفسه: صار الطريقان طريقًا واحدًا وتتلاشى الجزيرة الوسطية. وعند هذه النقطة يكون تغيير المسار قد انتهى.',
      ckb: 'کۆتایی داخراوی هەمان هێڵ: دوو ڕێگاکە بوونەتە یەک و دوورگەی ناوەڕاست لەناو دەچێت. تا ئەم خاڵە دەبێت گۆڕینی لەین تەواو ببێت.',
    },
  },

  {
    id: 'note-marking-double-yellow-kerb',
    topic: 'rules', group: 'markings', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣٢' },
    title: {
      en: 'Two yellow lines along the kerb',
      ar: 'خطان أصفران بمحاذاة الرصيف',
      ckb: 'دوو هێڵی زەرد بەدرێژایی ڕێڕەوی پیادە',
    },
    body: {
      en: 'Two continuous yellow lines beside the kerb mean parking is absolutely prohibited, not restricted to certain hours and not relaxed on holidays.',
      ar: 'خطّان أصفران متّصلان بجوار الرصيف يعنيان منع الوقوف منعًا مطلقًا، لا تقييدًا بساعات ولا تخفيفًا في العطل.',
      ckb: 'دوو هێڵی زەردی بەردەوام لەتەنیشت ڕێڕەوی پیادە واتای ئەوەیە کە پارککردن بە تەواوی قەدەغەیە، نەک بە کاتژمێر بەند بێت و نەک لە پشوودا سووک بکرێت.',
    },
  },

  // ----------------------------------------------------------- situations --
  {
    id: 'note-situation-child-between-cars',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٩٢' },
    image: require('@/assets/exam/pic-092.jpg'),
    title: {
      en: 'A ball, then a child',
      ar: 'كرة ثم طفل',
      ckb: 'تۆپێک، پاشان منداڵێک',
    },
    body: {
      en: 'Watch the sides of the street, not the road ahead. A line of parked cars is a wall you cannot see through, and a ball rolling out from behind it arrives a moment before the child does.',
      ar: 'انتبه لجانبَي الشارع لا للطريق أمامك. فصف المركبات المتوقفة جدار لا ترى من خلفه، والكرة التي تتدحرج من ورائه تسبق الطفل بلحظة.',
      ckb: 'چاودێری لاکانی شەقامەکە بکە نەک ڕێگای بەردەمت. ڕیزێک ئۆتۆمبێلی پارککراو دیوارێکە کە بەناویدا نابینیت، و تۆپێک کە لە دواوەیەوە دێت ساتێک پێش منداڵەکە دەگات.',
    },
  },
  {
    id: 'note-situation-overtaking-a-motorcycle',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٣' },
    image: require('@/assets/exam/pic-123.jpg'),
    title: {
      en: 'Two ways of passing a motorcycle',
      ar: 'طريقتان لتجاوز دراجة نارية',
      ckb: 'دوو ڕێگای تێپەڕاندنی ماتۆڕسکیل',
    },
    body: {
      en: 'Case A is correct. It crosses the centre line and gives the motorcycle a full vehicle\'s width, where B squeezes past inside the lane. A gust or a pothole can move a motorcycle sideways, and the rider has nothing around them.',
      ar: 'الحالة (أ) هي الصحيحة. فهي تتجاوز خط الوسط وتترك للدراجة عرض مركبة كاملة، بينما تمرّ (ب) بمحاذاتها داخل المسار. فهبّة ريح أو حفرة تزيح الدراجة جانبًا، وليس حول السائق شيء.',
      ckb: 'حاڵەتی (أ) دروستەکەیە. هێڵی ناوەڕاست تێدەپەڕێنێت و بە قەبارەی ئۆتۆمبێلێکی تەواو شوێن بۆ ماتۆڕەکە دەهێڵێتەوە، لە کاتێکدا (ب) لە ناو لەینەکەدا بە تەنیشتیدا دەپەڕێت. بایەک یان چاڵێک دەتوانێت ماتۆڕسکیل بەلایەکدا ببات، و هیچ شتێک لە دەوری سوارەکە نییە.',
    },
  },
  {
    id: 'note-situation-road-narrows',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢٩' },
    image: require('@/assets/exam/pic-129.jpg'),
    title: {
      en: 'The road narrows ahead: what to do',
      ar: 'الطريق يضيق أمامك: ماذا تفعل',
      ckb: 'ڕێگاکە لە پێشەوە تەنگ دەبێتەوە: چی بکەیت',
    },
    body: {
      en: 'Three actions, in this order: reduce speed, keep to the right-hand side, and do not overtake. The mistake the sign exists to prevent is arriving at the pinch beside another vehicle.',
      ar: 'ثلاثة إجراءات بهذا الترتيب: خفّف السرعة، والتزم بالجهة اليمنى، ولا تتجاوز. فالخطأ الذي وُجدت العلامة لمنعه هو الوصول إلى الاختناق بمحاذاة مركبة أخرى.',
      ckb: 'سێ کردار، بەم ڕیزبەندییە: خێرایی کەم بکەرەوە، پابەند بە بە لای ڕاست، و تێمەپەڕێنە. ئەو هەڵەیەی تابلۆکە بۆ ڕێگریکردنی لێ هەیە ئەوەیە کە لەتەنیشت ئۆتۆمبێلێکی تردا بگەیتە تەنگەڵەکە.',
    },
  },
  {
    id: 'note-situation-slippery-road-sign',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣١' },
    image: require('@/assets/exam/pic-131.jpg'),
    title: {
      en: 'A slippery-road sign: what to do',
      ar: 'علامة طريق زلق: ماذا تفعل',
      ckb: 'تابلۆی ڕێگای خلیسک: چی بکەیت',
    },
    body: {
      en: 'Reduce speed, and avoid changing lane or overtaking. Both involve steering and accelerating at once, which is exactly what a surface with no grip cannot take.',
      ar: 'خفّف السرعة، وتجنّب تغيير المسار أو التجاوز. فكلاهما يجمع بين التوجيه والتسارع في آنٍ واحد، وهو ما لا يحتمله سطح بلا تماسك.',
      ckb: 'خێرایی کەم بکەرەوە، و خۆت لە گۆڕینی لەین یان تێپەڕاندن بپارێزە. هەردووکیان ئاراستەکردن و خێراکردن پێکەوە دەگرنەوە، و هەر ئەمە ئەوەیە کە ڕوویەکی بێ گرتن هەڵینایەت.',
    },
  },
  {
    id: 'note-situation-residential-street',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٨٦' },
    image: require('@/assets/exam/pic-086.jpg'),
    title: {
      en: 'A residential street with no signs on it',
      ar: 'شارع سكني بلا علامات',
      ckb: 'شەقامێکی نیشتەجێبوون بەبێ تابلۆ',
    },
    body: {
      en: 'No sign tells you anything here, and you are still expected to read it: this is a residential area and it calls for care. Doors open, children appear, cars reverse out of driveways.',
      ar: 'لا علامة تخبرك بشيء هنا، ومع ذلك يُتوقّع منك أن تقرأ الموضع: منطقة سكنية تستدعي الحذر. تُفتح الأبواب، ويظهر الأطفال، وترجع المركبات من المداخل.',
      ckb: 'هیچ تابلۆیەک لێرەدا هیچت پێ ناڵێت، و هێشتا چاوەڕێ دەکرێت بیخوێنیتەوە: ئەمە ناوچەیەکی نیشتەجێبوونە و داوای وریایی دەکات. دەرگا دەکرێنەوە، منداڵ دەردەکەون، ئۆتۆمبێل لە دەروازەکانەوە دەگەڕێنەوە دواوە.',
    },
  },
  {
    id: 'note-situation-farm-road',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٨٧' },
    image: require('@/assets/exam/pic-087.jpg'),
    title: {
      en: 'A farm road with no signs on it',
      ar: 'طريق زراعي بلا علامات',
      ckb: 'ڕێگایەکی کێڵگە بەبێ تابلۆ',
    },
    body: {
      en: 'The same reading exercise with a different answer: this is a farm road. Expect a tractor at walking pace over the next crest, an animal, or mud carried onto the surface by machinery.',
      ar: 'التمرين نفسه في القراءة بجواب مختلف: هذا طريق زراعي. فتوقّع جرّارًا يسير بسرعة المشي خلف المرتفع التالي، أو حيوانًا، أو طينًا نقلته الآليات إلى السطح.',
      ckb: 'هەمان ڕاهێنانی خوێندنەوە بە وەڵامێکی جیاواز: ئەمە ڕێگایەکی کێڵگەیە. چاوەڕێی تراکتەرێک بە خێرایی ڕۆیشتن لە پشت بەرزایی داهاتوو بکە، ئاژەڵێک، یان قوڕێک کە ئامێرەکان هێناویانەتە سەر ڕێگا.',
    },
  },
  {
    id: 'note-situation-stopped-on-a-crossing',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٧' },
    image: require('@/assets/exam/pic-007.jpg'),
    title: {
      en: 'Which of these two is breaking the law',
      ar: 'أيّ المركبتين مخالفة',
      ckb: 'کام لەم دووانە یاسا دەشکێنێت',
    },
    body: {
      en: 'The blue vehicle, because it is standing on the pedestrian crossing. A car stopped there forces pedestrians into the lane beside it, which puts them where an overtaking driver cannot see them.',
      ar: 'المركبة الزرقاء، لأنها واقفة على ممر المشاة. فالمركبة الواقفة عليه تدفع المشاة إلى المسار المجاور، فيصيرون حيث لا يراهم السائق المتجاوز.',
      ckb: 'ئۆتۆمبێلە شینەکە، چونکە لەسەر پەڕینگەی پیادە وەستاوە. ئۆتۆمبێلێکی وەستاو لەسەری پیادەکان پاڵدەنێتە ناو لەینی تەنیشت، و ئەمە دەیانخاتە شوێنێک کە شۆفێری تێپەڕیو نایانبینێت.',
    },
  },
  {
    id: 'note-situation-reversing-at-a-junction',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١١٠' },
    image: require('@/assets/exam/pic-110.jpg'),
    title: {
      en: 'Reversing at a junction',
      ar: 'الرجوع للخلف عند تقاطع',
      ckb: 'گەڕانەوە بۆ دواوە لەلای چوارڕیان',
    },
    body: {
      en: 'Not permitted. Reversing is allowed when parking and in genuine necessity, and a junction is the one place where neither applies: traffic arrives from directions you cannot watch at once.',
      ar: 'غير مسموح. فالرجوع للخلف يجوز عند الوقوف وعند الضرورة الحقيقية، والتقاطع هو الموضع الذي لا ينطبق فيه أيّ منهما: فالسير يأتي من اتجاهات لا يمكنك مراقبتها معًا.',
      ckb: 'ڕێپێدراو نییە. گەڕانەوە بۆ دواوە لە کاتی پارککردن و لە پێویستیی ڕاستەقینەدا ڕێپێدراوە، و چوارڕیان ئەو شوێنەیە کە هیچیان تێیدا ناگونجێن: هاتوچۆ لە ئاراستەکانەوە دێت کە ناتوانیت پێکەوە چاودێرییان بکەیت.',
    },
  },
  {
    id: 'note-situation-night-lights-continuous',
    topic: 'rules', group: 'situations', verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٢١، ص س ١٢٢' },
    image: require('@/assets/exam/pic-121.jpg'),
    title: {
      en: 'At night the lights stay on, whatever the distance',
      ar: 'ليلًا تبقى الأضواء مضاءة مهما كانت المسافة',
      ckb: 'بە شەو چراکان داگیرساو دەمێننەوە، مەودا هەرچی بێت',
    },
    body: {
      en: 'The guide asks twice what distance you may dip your beam at, and gives the same answer both times: the lights must be kept on continuously. Dipping is about which beam, never about switching off.',
      ar: 'يسأل الدليل مرتين عن المسافة التي يجوز عندها التحويل إلى الضوء الواطئ، ويعطي الجواب نفسه في الحالتين: يجب إبقاء الأضواء مضاءة باستمرار. فالخفض يتعلق بأي ضوء تستعمل لا بإطفائه.',
      ckb: 'ڕێنماییەکە دوو جار دەپرسێت لە چ مەودایەکەوە دەکرێت چرا نزم بکرێتەوە، و هەردوو جار هەمان وەڵام دەداتەوە: دەبێت چراکان بەردەوام داگیرساو بن. نزمکردنەوە پەیوەندی بەوەوە هەیە کام چرا بەکاردەهێنیت، نەک بە کوژاندنەوەی.',
    },
  },
];
