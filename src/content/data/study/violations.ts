/**
 * Study notes for the Traffic violations section.
 *
 * Two groups: the named offences, then the shape penalties take generally.
 *
 * **The penalties were corrected against the ministry bank while these were
 * written, and that is worth recording.** The fourteen offences here began life
 * as general road-code material with penalties described in kind — "a fine and
 * licence points", "a fine and impoundment". Several disagreed with the bank
 * outright: driving with no licence was described as a fine, where ص س ٦٧ gives
 * imprisonment, and driving under the influence as a suspension, where س ١٦٦
 * gives imprisonment or a fine or both. An app that teaches one thing and is
 * examined on another is worse than one that stays silent, so wherever the bank
 * answers, its answer is the one printed and the note carries the question
 * number to check it against.
 *
 * Where the bank says nothing — insurance, helmets, leaving the scene — the
 * penalty is still described in kind and never as a figure. A wrong fine
 * printed with authority is worse than no fine at all.
 *
 * The `penalties` group deliberately covers only offences that are *not* one of
 * the fourteen. Restating "parking where prohibited is a fine" in both groups
 * is exactly the duplication this section was rebuilt to remove.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE, GENERAL_PRACTICE } from './source';

export const violationNotes: StudyNote[] = [
  // ------------------------------------------------------------- offences --
  {
    id: 'violation-speeding',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: GENERAL_PRACTICE,
    title: { en: 'Speeding', ar: 'تجاوز السرعة', ckb: 'تێپەڕاندنی خێرایی' },
    body: {
      en: 'Driving faster than the limit posted for the road, or too fast for the conditions. The second is an offence even when the speedometer is under the sign.',
      ar: 'القيادة بسرعة تفوق الحد المقرر للطريق، أو أسرع مما تسمح به الظروف. والثانية مخالفة حتى لو كان عدّاد السرعة دون ما تشير إليه العلامة.',
      ckb: 'لێخوڕین بە خێرایی زیاتر لە سنووری دیاریکراوی ڕێگاکە، یان خێراتر لەوەی بارودۆخەکە ڕێگای پێدەدات. دووەمیان سەرپێچییە تەنانەت ئەگەر خێراییپێوەکە لە ژێر تابلۆکەش بێت.',
    },
    points: [
      {
        en: 'A fine that rises with the amount of excess, and suspension of the licence in serious cases.',
        ar: 'غرامة تزداد بزيادة مقدار التجاوز، مع سحب الإجازة في الحالات الخطيرة.',
        ckb: 'غەرامەیەک کە بەپێی بڕی تێپەڕاندن زیاد دەکات، لەگەڵ هەڵگرتنی مۆڵەت لە حاڵەتە جددییەکاندا.',
      },
    ],
  },
  {
    id: 'violation-red-light',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩٨' },
    title: {
      en: 'Disobeying the lights or the officer',
      ar: 'عدم الالتزام بالإشارة أو رجل المرور',
      ckb: 'گوێڕایەڵنەبوون بۆ چرا یان پۆلیس',
    },
    body: {
      en: 'Crossing the stop line after the signal has turned red, or failing to obey the traffic officer\'s signal. The two are treated as one offence because they are the same failure: ignoring the instruction that governs the junction.',
      ar: 'تجاوز خط التوقف بعد تحوّل الإشارة إلى الأحمر، أو عدم الالتزام بإشارة رجل المرور. ويُعاملان مخالفةً واحدة لأنهما التقصير نفسه: تجاهل التعليمة التي تحكم التقاطع.',
      ckb: 'تێپەڕاندنی هێڵی وەستان دوای سوورەوەبوونی چراکە، یان گوێڕایەڵنەبوون بۆ ئیشارەتی پۆلیسی هاتوچۆ. وەک یەک سەرپێچی مامەڵەیان لەگەڵ دەکرێت چونکە هەمان کەموکوڕین: پشتگوێخستنی ئەو ڕێنماییەی چوارڕیانەکە بەڕێوە دەبات.',
    },
    points: [
      {
        en: 'The guide gives the penalty as a fine.',
        ar: 'يعطي الدليل العقوبة: غرامة.',
        ckb: 'ڕێنماییەکە سزاکە دەداتە: غەرامە.',
      },
    ],
  },
  {
    id: 'violation-no-licence',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ٦٧، س ٢٧٣' },
    title: {
      en: 'Driving without a licence',
      ar: 'القيادة بدون إجازة',
      ckb: 'لێخوڕین بەبێ مۆڵەت',
    },
    body: {
      en: 'Driving with no licence at all, an expired one, or one that does not cover the class of vehicle. This is one of the few offences the guide does not answer with a fine.',
      ar: 'القيادة دون إجازة أصلًا، أو بإجازة منتهية، أو بإجازة لا تشمل صنف المركبة. وهي من المخالفات القليلة التي لا يجيب عنها الدليل بغرامة.',
      ckb: 'لێخوڕین بەبێ هیچ مۆڵەتێک، یان بە مۆڵەتێکی بەسەرچوو، یان مۆڵەتێک کە جۆری ئۆتۆمبێلەکە ناگرێتەوە. لەو سەرپێچییە کەمانەیە کە ڕێنماییەکە بە غەرامە وەڵامیان نادات.',
    },
    points: [
      {
        en: 'The guide gives the penalty for driving unlicensed as imprisonment.',
        ar: 'يعطي الدليل عقوبة القيادة بلا إجازة: الحبس.',
        ckb: 'ڕێنماییەکە سزای لێخوڕین بەبێ مۆڵەت دەداتە: زیندان.',
      },
      {
        en: 'Letting someone unlicensed drive your vehicle carries imprisonment or a fine, or both.',
        ar: 'والسماح لمن لا يحمل إجازة بقيادة مركبتك عقوبته الحبس أو الغرامة أو كلاهما.',
        ckb: 'ڕێگادان بە کەسێکی بێ مۆڵەت بۆ لێخوڕینی ئۆتۆمبێلەکەت سزاکەی زیندان یان غەرامە یان هەردووکیانە.',
      },
    ],
  },
  {
    id: 'violation-drink-driving',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٦٦، ص س ٧٠' },
    title: {
      en: 'Driving under the influence',
      ar: 'القيادة تحت التأثير',
      ckb: 'لێخوڕین لەژێر کاریگەری',
    },
    body: {
      en: 'Driving after alcohol or drugs that impair control of the vehicle. The guide classes this not as a traffic offence but as a crime, and as dangerous in itself.',
      ar: 'القيادة بعد الكحول أو المخدرات التي تُضعف السيطرة على المركبة. ولا يصنّفها الدليل مخالفة مرورية بل جريمة، وخطرًا بذاتها.',
      ckb: 'لێخوڕین دوای کحول یان ماددەی هۆشبەر کە کۆنترۆڵی ئۆتۆمبێل لاواز دەکات. ڕێنماییەکە ئەمە وەک سەرپێچییەکی هاتوچۆ پۆل بەندی ناکات بەڵکو وەک تاوان، و وەک مەترسییەک بە خۆی.',
    },
    points: [
      {
        en: 'Imprisonment or a fine, or both.',
        ar: 'الحبس أو الغرامة أو كلاهما.',
        ckb: 'زیندان یان غەرامە یان هەردووکیان.',
      },
    ],
  },
  {
    id: 'violation-phone',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Using a phone while driving',
      ar: 'استخدام الهاتف أثناء القيادة',
      ckb: 'بەکارهێنانی مۆبایل لە کاتی لێخوڕین',
    },
    body: {
      en: 'Holding or operating a mobile phone while the vehicle is moving, including at a red light or in a queue. The vehicle has to be stopped somewhere stopping is allowed.',
      ar: 'حمل الهاتف المحمول أو استخدامه أثناء سير المركبة، بما في ذلك عند الإشارة الحمراء أو في الطابور. فلا بد أن تكون المركبة متوقفة في مكان يُسمح فيه بالوقوف.',
      ckb: 'گرتن یان بەکارهێنانی مۆبایل لە کاتێکدا ئۆتۆمبێلەکە دەجوڵێت، لەوانەش لەلای چرای سوور یان لە ڕیزدا. دەبێت ئۆتۆمبێلەکە لە شوێنێک وەستابێت کە وەستانی تێدا ڕێپێدراوە.',
    },
    points: [
      { en: 'A fine.', ar: 'غرامة.', ckb: 'غەرامە.' },
    ],
  },
  {
    id: 'violation-seatbelt',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٤٣' },
    title: {
      en: 'Not wearing a seat belt',
      ar: 'عدم ربط حزام الأمان',
      ckb: 'نەبەستنی پشتێنی سەلامەتی',
    },
    body: {
      en: 'Travelling with the belt unfastened while the vehicle is moving, in any vehicle fitted with belts. The responsibility rests on the driver and the passenger together.',
      ar: 'السير وحزام الأمان غير مربوط أثناء حركة المركبة، في أي مركبة مزوّدة بأحزمة. والمسؤولية على السائق والراكب معًا.',
      ckb: 'ڕۆیشتن بە پشتێنی نەبەستراوەوە لە کاتی جوڵانی ئۆتۆمبێلەکەدا، لە هەر ئۆتۆمبێلێک کە پشتێنی تێدایە. بەرپرسیارێتییەکە لەسەر شۆفێر و سەرنشین پێکەوەیە.',
    },
    points: [
      { en: 'A fine.', ar: 'غرامة.', ckb: 'غەرامە.' },
    ],
  },
  {
    id: 'violation-wrong-way',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣٠، س ٩٩' },
    title: {
      en: 'Driving against the direction of traffic',
      ar: 'السير بالاتجاه المعاكس',
      ckb: 'لێخوڕین بە ئاراستەی پێچەوانە',
    },
    body: {
      en: 'Entering a one-way street against the flow, or crossing to the opposing carriageway. Only a traffic officer\'s order, in a special case that requires it, can make it lawful.',
      ar: 'دخول شارع باتجاه واحد عكس السير، أو الانتقال إلى المسار المقابل. ولا يجعله مشروعًا إلا أمر رجل المرور في حالة خاصة تستدعيه.',
      ckb: 'چوونە ناو شەقامێکی یەک ئاراستە بە پێچەوانەوە، یان گواستنەوە بۆ لەینی بەرامبەر. تەنها فەرمانی پۆلیسی هاتوچۆ، لە حاڵەتێکی تایبەتدا کە پێویستی پێبێت، یاساییی دەکات.',
    },
    points: [
      { en: 'A fine.', ar: 'غرامة.', ckb: 'غەرامە.' },
    ],
  },
  {
    id: 'violation-illegal-parking',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٦، س ٢١٩، س ٢٢٦' },
    title: {
      en: 'Parking where it is prohibited',
      ar: 'الوقوف في مكان ممنوع',
      ckb: 'پارککردن لە شوێنی قەدەغە',
    },
    body: {
      en: 'Leaving the vehicle where parking is banned, or where it obstructs traffic or pedestrians. It is still a fine where the parked vehicle causes an accident.',
      ar: 'ترك المركبة حيث يُمنع الوقوف، أو حيث تعيق السير أو المشاة. وتبقى العقوبة غرامة حتى إذا تسببت المركبة المتوقفة في حادث.',
      ckb: 'جێهێشتنی ئۆتۆمبێل لە شوێنێک کە پارککردنی تێدا قەدەغەیە، یان ڕێگر دەبێت لە هاتوچۆ یان پیادە. هێشتا غەرامەیە تەنانەت ئەگەر ئۆتۆمبێلە پارککراوەکە ببێتە هۆی ڕووداو.',
    },
    points: [
      {
        en: 'A fine, including for leaving goods and large vehicles overnight in alleys and inner streets, other than to load or unload.',
        ar: 'غرامة، بما في ذلك ترك مركبات الحمل والمركبات الكبيرة ليلًا في الأزقة والشوارع الداخلية، في غير التحميل والتفريغ.',
        ckb: 'غەرامە، لەوانەش جێهێشتنی ئۆتۆمبێلی بار و ئۆتۆمبێلە گەورەکان بە شەو لە کۆڵان و شەقامە ناوەکییەکان، جگە لە بارکردن و دابەزاندن.',
      },
    ],
  },
  {
    id: 'violation-no-give-way',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٢٢، س ٢٢٤' },
    title: {
      en: 'Failing to give way',
      ar: 'عدم إعطاء الأولوية',
      ckb: 'ڕێگانەدان',
    },
    body: {
      en: 'Not yielding where a sign, a marking or the rules require it, including failing to stop when coming out of a side street onto a main street, and failing to give way to a pedestrian who has entered a crossing.',
      ar: 'عدم إفساح الطريق حيث تفرض ذلك علامة أو خط أو قاعدة، بما في ذلك عدم التوقف عند الخروج من شارع فرعي إلى شارع رئيس، وعدم إعطاء الأولوية لمشاة دخل الممر.',
      ckb: 'ڕێگانەدان لەو شوێنەی تابلۆ یان هێڵ یان یاسا داوای دەکات، لەوانەش نەوەستان لە کاتی دەرچوون لە شەقامێکی لاوەکییەوە بۆ شەقامێکی سەرەکی، و ڕێگانەدان بە پیادەیەک کە چووەتە ناو پەڕینگەکە.',
    },
    points: [
      { en: 'A fine in both cases.', ar: 'غرامة في الحالتين.', ckb: 'غەرامە لە هەردوو حاڵەتدا.' },
    ],
  },
  {
    id: 'violation-dangerous-overtaking',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٣٠' },
    title: {
      en: 'Overtaking improperly',
      ar: 'التجاوز غير الصحيح',
      ckb: 'تێپەڕاندنی نادروست',
    },
    body: {
      en: 'Overtaking another vehicle on the right, or overtaking anywhere it is prohibited: on a bend, a crest, a bridge, in a tunnel, at a crossing, or where the road ahead cannot be seen.',
      ar: 'تجاوز مركبة أخرى من اليمين، أو التجاوز في أي موضع يُمنع فيه: عند منعطف أو قمة مرتفع أو جسر أو داخل نفق أو عند ممر عبور أو حيث لا تُرى الطريق أمامك.',
      ckb: 'تێپەڕاندنی ئۆتۆمبێلێکی تر لە لای ڕاستەوە، یان تێپەڕاندن لە هەر شوێنێک کە قەدەغەیە: لە سووڕانەوە، لووتکە، پرد، ناو تونێل، لەلای پەڕینگە، یان لەو شوێنەی ڕێگای پێشەوە نابینرێت.',
    },
    points: [
      { en: 'A fine.', ar: 'غرامة.', ckb: 'غەرامە.' },
    ],
  },
  {
    id: 'violation-negligent-driving',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢١٦، س ٢٣٣' },
    title: {
      en: 'Negligent or reckless driving',
      ar: 'القيادة بإهمال أو تهوّر',
      ckb: 'لێخوڕین بە کەمتەرخەمی یان بێباکی',
    },
    body: {
      en: 'The catch-all offence: driving without the care the road demands, and breaching the road-safety rules generally. It covers the conduct that does not have an offence of its own but would still be obvious to an officer watching.',
      ar: 'المخالفة الجامعة: القيادة دون العناية التي يقتضيها الطريق، ومخالفة قواعد السلامة المرورية عمومًا. وتشمل السلوك الذي لا مخالفة خاصة به لكنه يظل بيّنًا لرجل مرور يراقب.',
      ckb: 'سەرپێچییە گشتگیرەکە: لێخوڕین بەبێ ئەو ئاگاداریەی ڕێگاکە داوای دەکات، و پێشێلکردنی یاساکانی سەلامەتی هاتوچۆ بە گشتی. ئەو هەڵسوکەوتانە دەگرێتەوە کە سەرپێچی تایبەتیان نییە بەڵام هێشتا بۆ پۆلیسێکی چاودێر ئاشکران.',
    },
    points: [
      { en: 'A fine.', ar: 'غرامة.', ckb: 'غەرامە.' },
    ],
  },
  {
    id: 'violation-no-insurance',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Driving without insurance',
      ar: 'القيادة بدون تأمين',
      ckb: 'لێخوڕین بەبێ دڵنیایی',
    },
    body: {
      en: 'Using a vehicle with no valid insurance cover. The penalty is the smaller half of the consequence: without cover, the whole cost of any damage you cause falls on you personally.',
      ar: 'استخدام مركبة دون تغطية تأمينية سارية. والعقوبة هي النصف الأصغر من النتيجة: فبلا تغطية تقع كلفة أي ضرر تسبّبه عليك شخصيًّا بالكامل.',
      ckb: 'بەکارهێنانی ئۆتۆمبێلێک بەبێ داپۆشینی دڵنیایی کارا. سزاکە بەشی بچووکتری دەرئەنجامەکەیە: بەبێ داپۆشین، تێچووی هەموو زیانێک کە دروستی دەکەیت بە تەواوی دەکەوێتە سەر خۆت.',
    },
    points: [
      {
        en: 'A fine and impoundment of the vehicle, plus personal liability for any damage caused.',
        ar: 'غرامة وحجز المركبة، مع تحمّل المسؤولية الشخصية عن أي ضرر يقع.',
        ckb: 'غەرامە و ڕاگرتنی ئۆتۆمبێل، لەگەڵ بەرپرسیارێتی کەسی بۆ هەر زیانێک کە دروست دەبێت.',
      },
    ],
  },
  {
    id: 'violation-no-helmet',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Riding without a helmet',
      ar: 'قيادة الدراجة دون خوذة',
      ckb: 'لێخوڕینی ماتۆڕ بەبێ قەپاغ',
    },
    body: {
      en: 'Riding a motorcycle without a fastened helmet, rider or passenger. A rider needs a proper helmet with goggles and knee and hand protectors. The helmet is the single biggest factor in surviving a crash.',
      ar: 'قيادة دراجة نارية أو ركوبها دون خوذة مثبتة. ويجب على سائقها خوذة مناسبة مع نظارات واقية وواقيات للركبتين واليدين. والخوذة هي العامل الأهم في النجاة من الحوادث.',
      ckb: 'لێخوڕین یان سواربوونی ماتۆڕسکیل بەبێ قەپاغی بەستراو. پێویستە لێخوڕەرەکە قەپاغێکی گونجاوی هەبێت لەگەڵ چاویلکەی پارێزەر و پارێزەری ئەژنۆ و دەست. قەپاغ گرنگترین هۆکارە بۆ ڕزگاربوون لە ڕووداو.',
    },
    points: [
      { en: 'A fine.', ar: 'غرامة.', ckb: 'غەرامە.' },
    ],
  },
  {
    id: 'violation-hit-and-run',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: GENERAL_PRACTICE,
    title: {
      en: 'Leaving the scene of an accident',
      ar: 'الهروب من مكان الحادث',
      ckb: 'ڕاکردن لە شوێنی ڕووداو',
    },
    body: {
      en: 'Driving away from a collision without stopping, giving your details or helping the injured. It is treated as among the most serious offences there are, and the seriousness does not depend on how much damage was done.',
      ar: 'مغادرة موقع الحادث دون التوقف أو تقديم بياناتك أو مساعدة المصابين. وتُعدّ من أخطر المخالفات على الإطلاق، ولا تتوقف خطورتها على مقدار الضرر.',
      ckb: 'دوورکەوتنەوە لە شوێنی پێکدادان بەبێ وەستان یان دانی زانیارییەکانت یان یارمەتیدانی برینداران. لە جددیترین سەرپێچییەکان دادەنرێت، و جددییەتەکەی بە بڕی زیانەکەوە بەند نییە.',
    },
    points: [
      {
        en: 'Heavy penalties, loss of the licence, and criminal charges.',
        ar: 'عقوبات مشدّدة وسحب الإجازة وملاحقة جزائية.',
        ckb: 'سزای توند، لەدەستدانی مۆڵەت، و تاوانبارکردنی تاوانکاری.',
      },
    ],
  },
  {
    id: 'violation-unsafe-vehicle',
    topic: 'violations',
    group: 'offences',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٦٨، س ٩٥' },
    title: {
      en: 'Driving an unroadworthy vehicle',
      ar: 'قيادة مركبة غير صالحة',
      ckb: 'لێخوڕینی ئۆتۆمبێلی نەگونجاو',
    },
    body: {
      en: 'A vehicle that is unfit to drive, or has no valid inspection document, may not be driven at all. The same applies to one making an abnormal noise: the guide treats that as a bar on driving it rather than as something to attend to later.',
      ar: 'المركبة غير الصالحة للقيادة أو التي لا تحمل وثيقة فحص سارية لا يجوز قيادتها إطلاقًا. ويسري ذلك على المركبة التي تصدر صوتًا غير طبيعي: فالدليل يعدّه مانعًا من قيادتها لا أمرًا يُعالَج لاحقًا.',
      ckb: 'ئۆتۆمبێلێک کە گونجاو نییە بۆ لێخوڕین، یان بەڵگەنامەی پشکنینی کارای نییە، هەرگیز نابێت لێبخوڕدرێت. هەمان شت بۆ ئەو ئۆتۆمبێلەی دەنگێکی نائاسایی دەردەکات: ڕێنماییەکە وەک ڕێگرێک لە لێخوڕینی سەیری دەکات، نەک شتێک کە دواتر چارەسەر بکرێت.',
    },
    points: [
      {
        en: 'A fine and an order to repair, with the vehicle held until it is safe.',
        ar: 'غرامة وأمر بالإصلاح، مع حجز المركبة حتى تصبح آمنة.',
        ckb: 'غەرامە و فەرمانی چاککردنەوە، لەگەڵ ڕاگرتنی ئۆتۆمبێلەکە هەتا سەلامەت دەبێت.',
      },
    ],
  },

  // ------------------------------------------------------------ penalties --
  {
    id: 'note-penalty-fine-is-the-default',
    topic: 'violations',
    group: 'penalties',
    verified: true,
    source: {
      ...FROM_EXAM_GUIDE,
      locator: 'س ٦٩، س ١٠١، س ٢١٧، س ٢٢١، س ٢٢٨، س ٢٢٠، س ٢٣٥، س ٢٤٠',
    },
    title: {
      en: 'A fine is the default answer',
      ar: 'الغرامة هي الجواب الافتراضي',
      ckb: 'غەرامە وەڵامی بنەڕەتییە',
    },
    body: {
      en: 'Where the exam asks what an offence is punished by and gives a fine among the options, the answer is almost always the fine. Sixteen penalty questions answer exactly that.',
      ar: 'حيث يسأل الاختبار عن عقوبة مخالفة ويضع الغرامة بين الخيارات، يكون الجواب الغرامة في الغالب الأعم. وستّ عشرة مسألة جوابها ذلك بالضبط.',
      ckb: 'لەو شوێنەی تاقیکردنەوەکە دەپرسێت سزای سەرپێچییەک چییە و غەرامەش لە نێو هەڵبژاردەکاندایە، وەڵامەکە بەزۆری غەرامەیە. شازدە پرسیاری سزا هەر ئەوە وەڵام دەدەنەوە.',
    },
    points: [
      {
        en: 'Throwing anything at all out of a vehicle window.',
        ar: 'رمي أي شيء كان من نافذة المركبة.',
        ckb: 'فڕێدانی هەر شتێک لە پەنجەرەی ئۆتۆمبێلەوە.',
      },
      {
        en: 'Driving at night without front and rear lights.',
        ar: 'القيادة ليلًا بلا أضواء أمامية وخلفية.',
        ckb: 'لێخوڕین بە شەو بەبێ چرای پێشەوە و دواوە.',
      },
      {
        en: 'Turning where turning is not permitted.',
        ar: 'الاستدارة حيث لا تُسمح.',
        ckb: 'سووڕانەوە لەو شوێنەی ڕێپێدراو نییە.',
      },
      {
        en: 'Failing to cover a goods vehicle\'s load securely, and leaving debris on the road after a repair.',
        ar: 'عدم تغطية حمولة مركبة الحمل بإحكام، وترك مخلّفات على الطريق بعد الإصلاح.',
        ckb: 'داپۆشین نەکردنی باری ئۆتۆمبێلی بار بە توندی، و جێهێشتنی پاشماوە لەسەر ڕێگا دوای چاککردنەوە.',
      },
      {
        en: 'Tinted glass or curtains that block the view, decorative stickers on the front or rear glass, and an unclear or damaged registration plate.',
        ar: 'الزجاج المظلّل أو الستائر التي تحجب الرؤية، والملصقات الزخرفية على الزجاج الأمامي أو الخلفي، ولوحة التسجيل غير الواضحة أو التالفة.',
        ckb: 'شووشەی ڕەشکراو یان پەردەی دیمەن‌شارەوە، ستیکەری ڕازاندنەوە لەسەر شووشەی پێشەوە یان دواوە، و پلێتی تۆمارکردنی نادیار یان زیانلێکەوتوو.',
      },
    ],
  },
  {
    id: 'note-penalty-named-amounts',
    topic: 'violations',
    group: 'penalties',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٣٤، س ٢٧٤' },
    title: {
      en: 'The two fines the guide prices exactly',
      ar: 'الغرامتان اللتان يحدّد الدليل مبلغهما',
      ckb: 'ئەو دوو غەرامەیەی ڕێنماییەکە بڕەکەیان دیاری دەکات',
    },
    body: {
      en: 'Almost every penalty in the bank is given as "a fine" with no figure attached. Two are priced, which is precisely why they are worth memorising: an exam question offering a number expects that number back.',
      ar: 'تكاد كل عقوبة في الدليل تُذكر بوصفها «غرامة» دون مبلغ. واثنتان محدّدتا المبلغ، ولهذا بالذات تستحقان الحفظ: فالسؤال الذي يعرض رقمًا يتوقّع الرقم نفسه جوابًا.',
      ckb: 'بەنزیکەیی هەموو سزایەک لە ڕێنماییەکەدا وەک «غەرامە» دێت بەبێ هیچ بڕێک. دووانیان بڕیان دیاریکراوە، و هەر بۆیە شایانی لەبەرکردنن: ئەو پرسیارەی ژمارەیەک پێشکەش دەکات چاوەڕێی هەمان ژمارە دەکات.',
    },
    points: [
      {
        en: 'Opening the vehicle\'s left-hand door before checking the traffic side is clear: 15,000 dinars.',
        ar: 'فتح باب المركبة الأيسر قبل التأكد من خلوّ جهة السير: ١٥٬٠٠٠ دينار.',
        ckb: 'کردنەوەی دەرگای چەپی ئۆتۆمبێل پێش دڵنیابوون لە بەتاڵی لای هاتوچۆ: ١٥٬٠٠٠ دینار.',
      },
      {
        en: 'Putting a child on the driver\'s lap: 40,000 dinars.',
        ar: 'وضع طفل في حضن السائق: ٤٠٬٠٠٠ دينار.',
        ckb: 'دانانی منداڵ لە باوەشی شۆفێردا: ٤٠٬٠٠٠ دینار.',
      },
    ],
  },
  {
    id: 'note-penalty-officer-assault',
    topic: 'violations',
    group: 'penalties',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٣٤، س ١٣٦' },
    title: {
      en: 'Threatening or assaulting a traffic officer',
      ar: 'تهديد رجل المرور أو الاعتداء عليه',
      ckb: 'هەڕەشەکردن لە پۆلیسی هاتوچۆ یان هێرشکردنە سەری',
    },
    body: {
      en: 'This is the heaviest penalty in the bank, and it rises with the harm done. Both figures are asked directly.',
      ar: 'هذه أشد عقوبة في الدليل، وتزداد بازدياد الضرر. وكلا الرقمين يُسأل عنه مباشرة.',
      ckb: 'ئەمە قورسترین سزایە لە ڕێنماییەکەدا، و بەپێی زیانەکە زیاد دەکات. هەردوو ژمارەکە ڕاستەوخۆ پرسیاریان لێدەکرێت.',
    },
    points: [
      {
        en: 'Threatening or assaulting an officer in the course of duty: a term not exceeding three years.',
        ar: 'تهديد رجل المرور أو الاعتداء عليه أثناء أداء واجبه: مدة لا تتجاوز ثلاث سنوات.',
        ckb: 'هەڕەشەکردن یان هێرشکردنە سەر پۆلیس لە کاتی ئەنجامدانی ئەرکەکەیدا: ماوەیەک کە لە سێ ساڵ تێنەپەڕێت.',
      },
      {
        en: 'Where the assault and resistance cause a wound or harm: imprisonment for a term not exceeding five years.',
        ar: 'وإذا نتج عن الاعتداء والمقاومة جرح أو أذى: الحبس مدة لا تتجاوز خمس سنوات.',
        ckb: 'ئەگەر هێرشەکە و بەرگریکردنەکە بووە هۆی برین یان زیان: زیندانی بۆ ماوەیەک کە لە پێنج ساڵ تێنەپەڕێت.',
      },
    ],
  },
  {
    id: 'note-penalty-vehicle-paperwork',
    topic: 'violations',
    group: 'penalties',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٣٩، س ٤١، س ٨٥، س ١٠٣' },
    title: {
      en: 'Offences against the vehicle\'s paperwork',
      ar: 'مخالفات تتعلق بوثائق المركبة',
      ckb: 'سەرپێچییەکانی پەیوەست بە بەڵگەنامەکانی ئۆتۆمبێل',
    },
    body: {
      en: 'A separate family of offences, all of them punished by a fine, and all of them avoidable by keeping one appointment a year.',
      ar: 'أسرة مستقلة من المخالفات، عقوبتها جميعًا الغرامة، ويمكن تفاديها كلها بالالتزام بموعد واحد في السنة.',
      ckb: 'خێزانێکی سەربەخۆی سەرپێچییەکان، سزای هەموویان غەرامەیە، و هەموویان بە پابەندبوون بە یەک کاتی دیاریکراو لە ساڵێکدا دەتوانرێت خۆیان لێ بپارێزرێت.',
    },
    points: [
      {
        en: 'Failing to renew the annual technical inspection, or the vehicle\'s annual document.',
        ar: 'عدم تجديد الفحص الفني السنوي أو وثيقة المركبة السنوية.',
        ckb: 'نوێنەکردنەوەی پشکنینی تەکنیکی ساڵانە، یان بەڵگەنامەی ساڵانەی ئۆتۆمبێلەکە.',
      },
      {
        en: 'Driving a vehicle with no registration plates fitted.',
        ar: 'قيادة مركبة بلا لوحات تسجيل.',
        ckb: 'لێخوڕینی ئۆتۆمبێلێک بەبێ پلێتی تۆمارکردن.',
      },
      {
        en: 'Altering or tampering with the registration or the licence. Only the Traffic Directorate may change either.',
        ar: 'العبث بوثيقة التسجيل أو الإجازة أو تعديلهما، فلا يجوز التعديل إلا لمديرية المرور.',
        ckb: 'دەستکاری یان گۆڕینی بەڵگەنامەی تۆمارکردن یان مۆڵەتەکە، تەنها بەڕێوەبەرایەتی هاتوچۆ بۆی هەیە بیانگۆڕێت.',
      },
    ],
  },
];
