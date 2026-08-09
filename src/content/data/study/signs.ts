/**
 * Study notes for the Traffic signs section.
 *
 * Deliberately short. The 111-record sign catalogue underneath is the study
 * material here — these notes are only what the catalogue cannot show you: the
 * rules that let a learner read a sign they have never seen before, from its
 * shape and colour alone.
 *
 * Nothing here restates a sign's meaning. That is what the catalogue card is
 * for, and a note repeating it would put the same sentence on screen twice.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE, FROM_SIGNS_MANUAL } from './source';

export const signNotes: StudyNote[] = [
  {
    id: 'note-sign-families',
    topic: 'signs',
    group: 'basics',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١، س ٢، س ٣، س ٩' },
    title: {
      en: 'Read a sign from its shape',
      ar: 'اقرأ العلامة من شكلها',
      ckb: 'تابلۆکە لە شێوەکەیەوە بخوێنەرەوە',
    },
    body: {
      en: 'Shape and border colour tell you what kind of instruction a sign gives before you read a word of it. That is what lets you act on one you have never seen.',
      ar: 'يخبرك شكل العلامة ولون إطارها بنوع التعليمة قبل أن تقرأ ما كُتب عليها. وهذا ما يتيح لك التصرّف تجاه علامة لم ترها من قبل.',
      ckb: 'شێوەی تابلۆکە و ڕەنگی چوارچێوەکەی جۆری فەرمانەکەت پێ دەڵێن، پێش ئەوەی وشەیەکی لەسەر بخوێنیتەوە. ئەمە وا دەکات کاردانەوەت هەبێت بۆ تابلۆیەک کە هەرگیز نەتبینیوە.',
    },
    points: [
      {
        en: 'Prohibitory and regulatory signs are circular with a red border. They give an order: something is forbidden here.',
        ar: 'العلامات المانعة والتنظيمية دائرية بإطار أحمر. وهي تعطي أمرًا: شيء ما ممنوع هنا.',
        ckb: 'تابلۆ قەدەغەکەر و ڕێکخەرەکان خڕن بە چوارچێوەی سوور. فەرمان دەدەن: شتێک لێرە قەدەغەیە.',
      },
      {
        en: 'Warning signs are equilateral triangles. They warn of a hazard ahead; they do not forbid anything.',
        ar: 'العلامات التحذيرية مثلثات متساوية الأضلاع. وهي تحذّر من خطر أمامك، ولا تمنع شيئًا.',
        ckb: 'تابلۆ ئاگادارکەرەوەکان سێگۆشەی یەکسان لایەنن. ئاگادارت دەکەنەوە لە مەترسییەک لە پێشەوە؛ هیچ قەدەغە ناکەن.',
      },
      {
        en: 'Mandatory signs are circular too. They tell you the one thing you may do: the direction you must take, the lane you must keep.',
        ar: 'العلامات الإلزامية دائرية أيضًا. وهي تحدّد لك الشيء الوحيد المسموح به: الاتجاه الذي يجب أن تسلكه، والمسار الذي يجب أن تلتزم به.',
        ckb: 'تابلۆ ناچارکەرەکانیش خڕن. ئەو یەک شتەت پێ دەڵێن کە بۆت هەیە: ئەو ئاراستەیەی دەبێت بیگریتەبەر، ئەو لەینەی دەبێت تێیدا بمێنیتەوە.',
      },
      {
        en: 'Informative signs are rectangular. They point to something, such as a hospital, a fuel station or an exit, rather than ordering or warning.',
        ar: 'العلامات الإرشادية مستطيلة. وهي تدلّ على شيء كمستشفى أو محطة وقود أو مخرج، ولا تأمر ولا تحذّر.',
        ckb: 'تابلۆ ڕێنماییکەرەکان لاکێشەن. ئاماژە بە شتێک دەکەن وەک نەخۆشخانە، وێستگەی سووتەمەنی یان دەرچوون، نە فەرمان دەدەن و نە ئاگادار دەکەنەوە.',
      },
    ],
  },
  {
    id: 'note-sign-warning-placement',
    topic: 'signs',
    group: 'basics',
    verified: true,
    source: { ...FROM_SIGNS_MANUAL, locator: 'ص ١٢' },
    title: {
      en: 'A warning sign stands before the hazard',
      ar: 'العلامة التحذيرية تسبق الخطر',
      ckb: 'تابلۆی ئاگادارکەرەوە پێش مەترسییەکە دەوەستێت',
    },
    body: {
      en: 'A warning sign stands far enough before the hazard for you to slow comfortably. Act when you read it, not when you reach the bend, the school or the hump.',
      ar: 'تُوضع العلامة التحذيرية قبل الخطر بمسافة تكفي لتخفيف السرعة براحة. فتصرّف حين تقرأها، لا حين تصل إلى المنعطف أو المدرسة أو المطبّ.',
      ckb: 'تابلۆی ئاگادارکەرەوە بەو دووریە پێش مەترسییەکە دادەنرێت کە بە ئاسوودەیی خێرایی کەم بکەیتەوە. کاتێک دەیخوێنیتەوە کاردانەوەت هەبێت، نەک کاتێک دەگەیتە سووڕانەوەکە یان قوتابخانەکە یان بەرزاییەکە.',
    },
    points: [
      {
        en: 'Some warnings carry a distance plate: a level-crossing marker means take care for the next 100 metres.',
        ar: 'بعض التحذيرات تحمل لوحة مسافة: فعلامة المزلقان تعني الانتباه على مدى ١٠٠ متر التالية.',
        ckb: 'هەندێک ئاگادارکردنەوە تابلۆی دووریان پێیە: نیشانەی پەڕینگەی شەمەندەفەر واتە بۆ ١٠٠ مەتری داهاتوو ئاگاداربە.',
      },
      {
        en: 'A radar-enforcement sign is a warning like any other: the limit it enforces applied before the sign as well.',
        ar: 'علامة الرادار تحذير كغيرها: فالحد الذي تراقبه كان ساريًا قبل العلامة أيضًا.',
        ckb: 'تابلۆی ڕادار ئاگادارکردنەوەیەکە وەک هەر یەکێکی تر: ئەو سنوورەی چاودێری دەکات پێش تابلۆکەش کاری پێدەکرا.',
      },
    ],
  },
  {
    id: 'note-sign-speed-limit-meaning',
    topic: 'signs',
    group: 'basics',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٧، س ٤٠، س ١٣٧' },
    title: {
      en: 'A speed-limit sign is a ceiling, not a target',
      ar: 'علامة السرعة حدّ أقصى لا هدف',
      ckb: 'تابلۆی خێرایی سنوورە، نەک ئامانج',
    },
    body: {
      en: 'The number is the maximum for good conditions, never a speed you are entitled to hold. In rain, fog, dust, snow, heavy traffic or darkness you must drive below it.',
      ar: 'الرقم هو الحد الأقصى للظروف الجيدة، لا سرعة تستحقّ الالتزام بها دائمًا. ففي المطر أو الضباب أو الغبار أو الثلج أو الزحام أو الظلام يجب أن تقود بأقل منه.',
      ckb: 'ژمارەکە زۆرترین بڕە بۆ بارودۆخی باش، نەک خێراییەک کە مافی تۆ بێت بیپارێزیت. لە باران و تەم و تۆز و بەفر و قەرەباڵغی یان تاریکیدا دەبێت کەمتر لێبخوڕیت.',
    },
    points: [
      {
        en: 'Where a bend carries no speed sign at all, judge how sharp it is and slow accordingly.',
        ar: 'وحيث لا تحمل المنعطفات علامة سرعة، قدّر حدّة المنعطف وخفّف السرعة بحسبه.',
        ckb: 'لەو سووڕانەوانەی هیچ تابلۆی خێراییان پێوە نییە، توندی سووڕانەوەکە هەڵبسەنگێنە و بەپێی ئەو خێرایی کەم بکەرەوە.',
      },
    ],
  },
  {
    id: 'note-sign-right-of-way-signs',
    topic: 'signs',
    group: 'basics',
    verified: true,
    source: { ...FROM_SIGNS_MANUAL, locator: 'ص ٦، ص ١٢، ص ١٨' },
    title: {
      en: 'The signs that settle who goes first',
      ar: 'العلامات التي تحسم مَن يمرّ أولًا',
      ckb: 'ئەو تابلۆیانەی بڕیار دەدەن کێ سەرەتا دەڕوات',
    },
    body: {
      en: 'A few signs override the ordinary rules of priority. Learn them as a group: they appear only where the answer would otherwise be in doubt.',
      ar: 'عدد قليل من العلامات يعلو على قواعد الأولوية المعتادة. تعلّمها كمجموعة: فهي لا تظهر إلا حيث يكون الجواب موضع شكّ.',
      ckb: 'ژمارەیەکی کەم لە تابلۆکان لەسەروو یاسا ئاساییەکانی پێشینەیین. وەک کۆمەڵێک فێریان بە: تەنها لەو شوێنانە دەردەکەون کە وەڵامەکە گومانی تێدایە.',
    },
    points: [
      {
        en: 'Stop: come to a complete halt at the line, then give way. Slowing is not enough.',
        ar: 'قف: توقف توقفًا تامًّا عند الخط ثم أفسح الطريق. والتخفيف وحده لا يكفي.',
        ckb: 'بوەستە: لەسەر هێڵەکە بە تەواوی بوەستە، پاشان ڕێگا بدە. کەمکردنەوەی خێرایی بەس نییە.',
      },
      {
        en: 'Give way: you may roll through without stopping, but only if nothing with priority is coming.',
        ar: 'أفسح الطريق: يجوز أن تمرّ دون توقف، لكن فقط إذا لم يكن قادمًا من له الأولوية.',
        ckb: 'ڕێگا بدە: دەتوانیت بەبێ وەستان تێپەڕیت، بەڵام تەنها ئەگەر هیچ ئۆتۆمبێلێکی خاوەن پێشینەیی نەهاتبێت.',
      },
      {
        en: 'Priority road: traffic on your road goes first, at this junction and at the ones the sign covers.',
        ar: 'طريق ذو أولوية: الأولوية للسير على طريقك، عند هذا التقاطع وما تشمله العلامة.',
        ckb: 'ڕێگای خاوەن پێشینەیی: هاتوچۆی سەر ڕێگاکەت پێشترە، لەم چوارڕیانە و لەوانەی تابلۆکە دەیانگرێتەوە.',
      },
      {
        en: 'Priority to oncoming traffic: you wait at the narrowing even when your own side looks clear.',
        ar: 'الأولوية للقادم: تنتظر عند الاختناق حتى لو بدت جهتك خالية.',
        ckb: 'پێشینەیی بۆ هاتوو: لە تەنگەڵەکە چاوەڕێ دەکەیت تەنانەت ئەگەر لای خۆت بەتاڵ دیار بێت.',
      },
    ],
  },
];
