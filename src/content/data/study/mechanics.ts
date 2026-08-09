/**
 * Study notes for the Vehicle and maintenance section.
 *
 * This topic was the worst-served in the app before the Learn tab was rebuilt:
 * 82 transcribed questions carrying `topic: 'mechanics'`, excluded from
 * `EXAM_TOPICS` and therefore from graded attempts as well — material that
 * shipped in the bundle and was reachable from nowhere at all.
 *
 * The six `bonnet` notes carry the ministry's own engine-bay photographs, one
 * part per note. That is the one place in this file where an exam picture is
 * reused as study artwork, and it earns it: the question is "what is the part
 * indicated?", the answer is a name, and the picture is the entire content of
 * both. Each image was checked against the part it is captioned with before it
 * was attached here.
 */
import type { StudyNote } from '../../schema';
import { FROM_EXAM_GUIDE } from './source';

export const mechanicsNotes: StudyNote[] = [
  // -------------------------------------------------------------- cockpit --
  {
    id: 'note-before-you-drive-off',
    topic: 'mechanics',
    group: 'cockpit',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٧، س ٢٥١، ص س ٩٥، ص س ١١٣' },
    title: {
      en: 'Before you drive off',
      ar: 'قبل الانطلاق',
      ckb: 'پێش دەستپێکردن',
    },
    body: {
      en: 'A driver is responsible for the vehicle\'s safety and has to inspect it daily, before getting in. Everything else here follows from that being a habit rather than a rule you know about.',
      ar: 'السائق مسؤول عن سلامة مركبته وعليه فحصها يوميًّا قبل الركوب. وكل ما هنا يقوم على أن يكون ذلك عادة لا قاعدة تعرفها فحسب.',
      ckb: 'شۆفێر بەرپرسیارە لە سەلامەتی ئۆتۆمبێلەکەی و دەبێت ڕۆژانە پێش سواربوون بیپشکنێت. هەموو ئەوەی لێرەدایە لەسەر ئەوە دەوەستێت کە ئەمە ببێتە خوو، نەک تەنها یاسایەک کە دەیزانیت.',
    },
    points: [
      {
        en: 'Adjust all three mirrors before you move, not once you are rolling.',
        ar: 'اضبط المرايا الثلاث قبل التحرك، لا بعد أن تنطلق.',
        ckb: 'هەر سێ ئاوێنەکە پێش جوڵان ڕێک بخە، نەک دوای ئەوەی دەڕۆیت.',
      },
      {
        en: 'Set the side mirrors to show as much of the road and as little of your own vehicle as possible. The strip of your own car in the mirror is the blind spot you are giving away.',
        ar: 'واضبط المرايا الجانبية لتُظهر أكبر قدر من الطريق وأقل قدر من مركبتك. فشريط سيارتك في المرآة هو المنطقة العمياء التي تتنازل عنها.',
        ckb: 'ئاوێنە لاتەنیشتەکان ڕێک بخە تاکو زۆرترین بەشی ڕێگا و کەمترین بەشی ئۆتۆمبێلەکەی خۆت پیشان بدەن. ئەو تەنیشتەی ئۆتۆمبێلەکەی خۆت لە ئاوێنەکەدا ئەو خاڵە کوێرەیە کە دەستی لێ هەڵدەگریت.',
      },
      {
        en: 'Hold the wheel with both hands, at the ten-past-ten position.',
        ar: 'أمسك المقود بكلتا يديك عند وضع «العاشرة وعشر دقائق».',
        ckb: 'ئستیرنەکە بە هەردوو دەست بگرە، لە حاڵەتی «دەی و دە خولەک».',
      },
    ],
  },
  {
    id: 'note-what-to-carry',
    topic: 'mechanics',
    group: 'cockpit',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٤٨، س ١٥٢، س ١٥٣، س ١٩٢، س ٢١٣' },
    title: {
      en: 'What must be in the vehicle',
      ar: 'ما يجب وجوده في المركبة',
      ckb: 'ئەوەی دەبێت لە ناو ئۆتۆمبێلدا بێت',
    },
    body: {
      en: 'Three items are required rather than recommended, and the exam asks about each of them separately with a plain yes as the answer.',
      ar: 'ثلاثة أشياء مطلوبة لا موصى بها، ويسأل الاختبار عن كل منها على حدة والجواب «نعم» ببساطة.',
      ckb: 'سێ شت پێویستن نەک پێشنیارکراو، و تاقیکردنەوەکە لەسەر هەریەکەیان بە جیا دەپرسێت و وەڵامەکە بەسادەیی «بەڵێ»یە.',
    },
    points: [
      {
        en: 'The reflective warning triangle.',
        ar: 'المثلث العاكس التحذيري.',
        ckb: 'سێگۆشەی ئاگادارکەرەوەی ڕەنگدانەوە.',
      },
      {
        en: 'A fire extinguisher.',
        ar: 'طفاية الحريق.',
        ckb: 'ئاگرکوژێنەرەوە.',
      },
      {
        en: 'The spare tyre and the equipment that goes with it.',
        ar: 'الإطار الاحتياطي ومعداته.',
        ckb: 'تایەی یەدەگ و ئەو کەرەستانەی لەگەڵیدان.',
      },
      {
        en: 'The boot is for maintenance tools, emergency equipment and essential first-aid supplies only, not for storage and never for passengers.',
        ar: 'وصندوق المركبة لعدد الصيانة ومعدات الطوارئ ومستلزمات الإسعاف الأولية الضرورية فقط، لا للتخزين ولا للركاب أبدًا.',
        ckb: 'سندووقی ئۆتۆمبێل تەنها بۆ ئامرازی چاککردنەوە و کەرەستەی فریاگوزاری و پێداویستییە پێویستەکانی فریاگوزاری سەرەتاییە، نەک بۆ کۆگاکردن و هەرگیز بۆ سەرنشین.',
      },
    ],
  },

  // --------------------------------------------------------------- bonnet --
  {
    id: 'note-bonnet-oil-dipstick',
    topic: 'mechanics',
    group: 'bonnet',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٤٠' },
    image: require('@/assets/exam/pic-140.jpg'),
    title: {
      en: 'The engine oil dipstick',
      ar: 'مقياس زيت المحرك',
      ckb: 'پێوەری زەیتی بزوێنەر',
    },
    body: {
      en: 'The looped handle on the engine itself. With the engine cold and the car level, pull it out, wipe it, put it back fully, and pull it again to read the level. The first reading is always wrong.',
      ar: 'المقبض الحلقي القائم على المحرك نفسه. والمحرك بارد والمركبة على أرض مستوية: اسحبه وامسحه وأعده بالكامل ثم اسحبه ثانية لقراءة المستوى. فالقراءة الأولى خاطئة دائمًا.',
      ckb: 'ئەو دەسکە بازنەییەی لەسەر خودی بزوێنەرەکەیە. کاتێک بزوێنەرەکە سارد و ئۆتۆمبێلەکە تەخت بوو: ڕایبکێشە، پاکی بکەرەوە، بە تەواوی بیگەڕێنەوە، پاشان دووبارە ڕایبکێشە بۆ خوێندنەوەی ئاست. خوێندنەوەی یەکەم هەمیشە هەڵەیە.',
    },
    points: [
      {
        en: 'The level must sit between the letters (L) and (H).',
        ar: 'ويجب أن يقع المستوى بين الحرفين (L) و(H).',
        ckb: 'دەبێت ئاستەکە لە نێوان دوو پیتی (L) و (H) بێت.',
      },
    ],
  },
  {
    id: 'note-bonnet-brake-fluid',
    topic: 'mechanics',
    group: 'bonnet',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٧' },
    image: require('@/assets/exam/pic-137.jpg'),
    title: {
      en: 'The brake fluid reservoir',
      ar: 'خزان زيت الفرامل',
      ckb: 'تانکی زەیتی بڕێک',
    },
    body: {
      en: 'The small translucent tank at the back of the engine bay on the driver\'s side. A brake system is sealed, so a falling level means fluid is going somewhere, and a leak here fails the annual inspection outright.',
      ar: 'الخزان الصغير الشفاف في مؤخرة حيّز المحرك من جهة السائق. ونظام الفرامل مغلق، فانخفاض المستوى يعني أن الزيت يذهب إلى مكان ما، والتسرّب هنا يُرسِب المركبة في الفحص السنوي مباشرة.',
      ckb: 'ئەو تانکە بچووکە ڕووناکەی لە دواوەی جێگای بزوێنەرەکەیە لە لای شۆفێر. سیستەمی بڕێک داخراوە، بۆیە دابەزینی ئاستەکە واتە زەیتەکە بۆ شوێنێک دەڕوات، و دڵۆپین لێرە ڕاستەوخۆ لە پشکنینی ساڵانەدا دەڕوخێت.',
    },
  },
  {
    id: 'note-bonnet-power-steering',
    topic: 'mechanics',
    group: 'bonnet',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٥' },
    image: require('@/assets/exam/pic-135.jpg'),
    title: {
      en: 'The power-steering fluid reservoir',
      ar: 'خزان زيت مقود الدركسون',
      ckb: 'تانکی زەیتی ئستیرنی هێزدار',
    },
    body: {
      en: 'The capped tank towards the left of the bay. When this runs low the steering turns heavy and often groans at full lock, which is the fault a driver notices from the seat rather than from under the bonnet.',
      ar: 'الخزان ذو الغطاء في الجهة اليسرى من الحيّز. وعند انخفاضه يثقل المقود ويصدر أنينًا عند الاستدارة الكاملة غالبًا، وهو العطل الذي يلاحظه السائق من مقعده لا من تحت غطاء المحرك.',
      ckb: 'ئەو تانکە سەرپۆشدارەی بەرەو لای چەپی جێگاکەیە. کاتێک ئەمە کەم دەبێتەوە ئستیرنەکە قورس دەبێت و زۆرجار لە سووڕانەوەی تەواودا دەنگ دەکات، ئەمە ئەو خراپییەیە کە شۆفێر لە کورسییەکەیەوە هەستی پێدەکات نەک لە ژێر سەرپۆشی بزوێنەرەوە.',
    },
  },
  {
    id: 'note-bonnet-air-filter',
    topic: 'mechanics',
    group: 'bonnet',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٨، س ٦٤' },
    image: require('@/assets/exam/pic-138.jpg'),
    title: {
      en: 'The air filter',
      ar: 'فلتر الهواء',
      ckb: 'فلتەری هەوا',
    },
    body: {
      en: 'The large black box on the right of the bay. Clean or replace it periodically. How often depends on the environment and the vehicle\'s specification, which is why the exam answer is "periodically" rather than a distance.',
      ar: 'الصندوق الأسود الكبير في يمين الحيّز. ونظّفه أو بدّله دوريًّا. وتعتمد الفترة على البيئة وعلى مواصفات المركبة، ولهذا يكون جواب الاختبار «دوريًّا» لا مسافة محدّدة.',
      ckb: 'ئەو سندووقە ڕەشە گەورەیەی لای ڕاستی جێگاکەیە. بە شێوەی کاتی پاکی بکەرەوە یان بیگۆڕە. ماوەکە بە ژینگە و تایبەتمەندی ئۆتۆمبێلەکەوە بەندە، بۆیە وەڵامی تاقیکردنەوەکە «بە شێوەی کاتی»یە نەک مەودایەکی دیاریکراو.',
    },
  },
  {
    id: 'note-bonnet-battery',
    topic: 'mechanics',
    group: 'bonnet',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٣٩، س ١٧٧، س ١٨٧' },
    image: require('@/assets/exam/pic-139.jpg'),
    title: {
      en: 'The battery',
      ar: 'البطارية',
      ckb: 'باتری',
    },
    body: {
      en: 'The battery starts the engine; the alternator charges it afterwards, which is why a car can run for a while with a battery that will not start it again. It must be clamped down: a battery free to move loses electrical contact and can start a fire.',
      ar: 'البطارية تُشغّل المحرك، أما الذي يشحنها بعد ذلك فهو الدينمو (المولّد)، ولهذا قد تسير السيارة مدة ببطارية لا تعيد تشغيلها. ويجب تثبيتها جيدًا: فالبطارية الحرّة الحركة تفقد التماس الكهربائي وقد تُشعل حريقًا.',
      ckb: 'باتری بزوێنەرەکە دەخاتەڕێ؛ ئەوەی دواتر بارگاوی دەکات دینامۆیە (جەنەراتۆر)، بۆیە ئۆتۆمبێل ماوەیەک دەڕوات بە باترییەک کە دووبارە نایخاتەڕێ. دەبێت توند بکرێت: باترییەکی ئازاد لە جوڵان پەیوەندی کارەبایی لەدەست دەدات و دەکرێت ببێتە هۆی ئاگرکەوتنەوە.',
    },
  },
  {
    id: 'note-bonnet-washer-tank',
    topic: 'mechanics',
    group: 'bonnet',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'ص س ١٤١' },
    image: require('@/assets/exam/pic-141.jpg'),
    title: {
      en: 'The windscreen washer reservoir',
      ar: 'خزان ماء غسل الزجاج',
      ckb: 'تانکی ئاوی شوشتنی شووشە',
    },
    body: {
      en: 'The capped tank at the front corner of the bay. Easy to dismiss as cosmetic, and it is not: a dusty windscreen smeared by dry wipers in low sun is one of the commonest ways a driver loses the view ahead.',
      ar: 'الخزان ذو الغطاء في زاوية مقدمة الحيّز. ويسهل عدّه أمرًا تجميليًّا وليس كذلك: فالزجاج المغبرّ الذي تمسحه مساحات جافة والشمس منخفضة من أكثر ما يفقد السائق الرؤية أمامه.',
      ckb: 'ئەو تانکە سەرپۆشدارەی لە گۆشەی پێشەوەی جێگاکەیە. ئاسانە وەک شتێکی ڕازاندنەوە سەیر بکرێت و وا نییە: شووشەیەکی تۆزاوی کە بە پاککەرەوەی وشک سڕدرابێتەوە و خۆر نزم بێت، لە باوترین ڕێگاکانە کە شۆفێر دیمەنی بەردەمی لەدەست دەدات.',
    },
  },

  // ----------------------------------------------------------------- care --
  {
    id: 'note-engine-oil',
    topic: 'mechanics',
    group: 'care',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٦٥، س ١٨١، س ١٩٠' },
    title: {
      en: 'Engine oil',
      ar: 'زيت المحرك',
      ckb: 'زەیتی بزوێنەر',
    },
    body: {
      en: 'Oil is changed according to the distance on the odometer and the type and specification of the oil itself, not on a fixed calendar. The two together are the answer the exam wants.',
      ar: 'يُبدَّل الزيت بحسب المسافة التي يظهرها عدّاد المسافة وبحسب نوع الزيت ومواصفاته، لا وفق جدول زمني ثابت. والأمران معًا هما الجواب المطلوب.',
      ckb: 'زەیت بەپێی ئەو مەودایە دەگۆڕدرێت کە پێوەری مەودا پیشانی دەدات و بەپێی جۆر و تایبەتمەندی خودی زەیتەکە، نەک بەپێی ڕۆژژمێرێکی جێگیر. هەردووکیان پێکەوە ئەو وەڵامەن کە تاقیکردنەوەکە دەیەوێت.',
    },
    points: [
      {
        en: 'Used oil goes to the places designated for it. It is not poured away.',
        ar: 'والزيت المستعمل يُلقى في الأماكن المخصّصة له، ولا يُسكب في أي مكان.',
        ckb: 'زەیتی بەکارهێنراو بۆ ئەو شوێنانە دەبرێت کە بۆی تەرخانکراون. لە هیچ شوێنێک نایڕژێنرێت.',
      },
    ],
  },
  {
    id: 'note-cooling-system',
    topic: 'mechanics',
    group: 'care',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٥٠، س ٢٦٦، س ٢٧٥' },
    title: {
      en: 'Overheating and the radiator',
      ar: 'ارتفاع الحرارة والمشعّ (الرادييتر)',
      ckb: 'بەرزبوونەوەی پلەی گەرمی و ڕادیەتەر',
    },
    body: {
      en: 'An engine overheats because the coolant is low or the radiator cap has failed. Never lift the cap while the engine is hot: the system is under pressure and the coolant is above boiling.',
      ar: 'يسخن المحرك لنقص سائل التبريد أو لتلف غطاء المشعّ. ولا ترفع الغطاء أبدًا والمحرك ساخن: فالمنظومة تحت ضغط والسائل فوق درجة الغليان.',
      ckb: 'بزوێنەر گەرم دەبێت بەهۆی کەمی شلەی ساردکەرەوە یان خراپبوونی سەرپۆشی ڕادیەتەر. هەرگیز سەرپۆشەکە هەڵمەگرە لە کاتێکدا بزوێنەرەکە گەرمە: سیستەمەکە لەژێر پەستاندایە و شلەکە لەسەروو پلەی کوڵانەوەیە.',
    },
    points: [
      {
        en: 'If the coolant boils: leave the engine running, cool the radiator by pouring water over the outside of it for 20 minutes, and only then open the cap.',
        ar: 'وإذا غلا سائل التبريد: اترك المحرك يعمل، وبرّد المشعّ بصبّ الماء على سطحه الخارجي عشرين دقيقة، ثم افتح الغطاء بعد ذلك فقط.',
        ckb: 'ئەگەر شلە ساردکەرەوەکە کوڵا: بزوێنەرەکە بەکارکردن بهێڵەرەوە، ڕادیەتەرەکە بە ڕشتنی ئاو بەسەر ڕووی دەرەوەیدا بۆ ٢٠ خولەک سارد بکەرەوە، و تەنها پاشان سەرپۆشەکە بکەرەوە.',
      },
    ],
  },
  {
    id: 'note-fuel-and-economy',
    topic: 'mechanics',
    group: 'care',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٤٠، س ١٤١، س ١٤٥، س ١٧٦، س ١٧٩، س ٢٤٢' },
    title: {
      en: 'Fuel, idling and the environment',
      ar: 'الوقود والتشغيل على الفارغ والبيئة',
      ckb: 'سووتەمەنی، کارکردن بەبێ جوڵە، و ژینگە',
    },
    body: {
      en: 'The bank treats fuel economy as an environmental duty rather than a matter of cost, and asks about it in three concrete ways.',
      ar: 'يعامل الدليل اقتصاد الوقود بوصفه واجبًا بيئيًّا لا مسألة كلفة، ويسأل عنه بثلاث صور محدّدة.',
      ckb: 'ڕێنماییەکە کەمکردنەوەی سووتەمەنی وەک ئەرکێکی ژینگەیی سەیر دەکات نەک وەک بابەتێکی تێچوو، و بە سێ شێوەی دیاریکراو لێی دەپرسێت.',
    },
    points: [
      {
        en: 'The economical speed is 60 to 70 km/h.',
        ar: 'السرعة الاقتصادية بين ٦٠ و٧٠ كم/س.',
        ckb: 'خێراییە ئابوورییەکە لە نێوان ٦٠ و ٧٠ کم/کاتژمێردایە.',
      },
      {
        en: 'One minute of warm-up is enough, in winter as in summer. Do not drive off with a cold engine, and do not leave it running longer than that.',
        ar: 'ودقيقة واحدة للتسخين تكفي، شتاءً وصيفًا. ولا تنطلق بمحرك بارد، ولا تتركه يعمل أطول من ذلك.',
        ckb: 'یەک خولەک گەرمکردنەوە بەسە، لە زستان وەک لە هاوین. بە بزوێنەری سارد دەست پێمەکە، و لەوە زیاتریش بەکارکردن مەیهێڵەرەوە.',
      },
      {
        en: 'Where traffic is at a standstill for more than three minutes, switch the engine off.',
        ar: 'وحيث يتوقف السير أكثر من ثلاث دقائق، أطفئ المحرك.',
        ckb: 'لەو کاتەی هاتوچۆ زیاتر لە سێ خولەک ڕادەوەستێت، بزوێنەرەکە بکوژێنەوە.',
      },
      {
        en: 'Do not add wings or anything else that increases drag: more air resistance means more fuel burned.',
        ar: 'ولا تضف أجنحة ولا ما يزيد المقاومة: فزيادة مقاومة الهواء تعني استهلاك وقود أكثر.',
        ckb: 'باڵ یان هیچ شتێکی تر کە بەربەستی زیاد بکات مەخە سەری: بەربەستی هەوای زیاتر واتە سووتاندنی سووتەمەنی زیاتر.',
      },
    ],
  },

  // ---------------------------------------------------------------- tyres --
  {
    id: 'note-tyre-pressure',
    topic: 'mechanics',
    group: 'tyres',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٥٧، س ٢٥٩' },
    title: {
      en: 'Tyre pressure, both ways',
      ar: 'ضغط الإطارات في الاتجاهين',
      ckb: 'پەستانی تایە، بە هەردوو ئاراستە',
    },
    body: {
      en: 'The exam asks about under- and over-inflation separately, and they damage a tyre differently. Neither is the safe side to err on.',
      ar: 'يسأل الاختبار عن نقص الضغط وزيادته على حدة، وكلٌّ منهما يُتلف الإطار بطريقة مختلفة. ولا أحد منهما هو الجانب الآمن للخطأ.',
      ckb: 'تاقیکردنەوەکە بە جیا لەسەر کەمی و زۆری پەستان دەپرسێت، و هەریەکەیان بە شێوەیەکی جیاواز تایەکە تێکدەدەن. هیچیان ئەو لایە سەلامەتەی نین کە هەڵەی تێدا بکەیت.',
    },
    points: [
      {
        en: 'Too little pressure: heat damage, and wear on the tyre\'s shoulder.',
        ar: 'نقص الضغط: تلف بالحرارة وتآكل في كتف الإطار.',
        ckb: 'پەستانی کەم: زیانی گەرمی، و ساوانی شانی تایەکە.',
      },
      {
        en: 'Too much pressure: damage to the tyre and a greater chance of a blowout.',
        ar: 'وزيادة الضغط: تلف الإطار وازدياد احتمال الانفجار.',
        ckb: 'پەستانی زۆر: زیان بە تایەکە و بەرزبوونەوەی ئەگەری تەقینەوە.',
      },
    ],
  },
  {
    id: 'note-tyre-wear',
    topic: 'mechanics',
    group: 'tyres',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٣٨، س ١٥٩، س ٢٧٩' },
    title: {
      en: 'Why tyres wear out early',
      ar: 'لماذا تتآكل الإطارات مبكرًا',
      ckb: 'بۆچی تایە زوو دەساوێت',
    },
    body: {
      en: 'When the front tyres in particular wear quickly, the tyres are usually not the fault: the suspension and the wheel alignment need repair and adjustment, and until they get it a new pair will wear the same way.',
      ar: 'حين تتآكل الإطارات الأمامية خاصةً بسرعة، فالإطارات غالبًا ليست السبب: نظام التعليق وزوايا العجلات بحاجة إلى إصلاح وضبط، وحتى يتم ذلك سيتآكل الزوج الجديد بالطريقة نفسها.',
      ckb: 'کاتێک بەتایبەتی تایەکانی پێشەوە خێرا دەساون، بەزۆری تایەکان هۆکار نین: سیستەمی هەڵواسین و ڕێکخستنی چەرخەکان پێویستیان بە چاککردنەوە و ڕێکخستنە، و تا ئەوە نەکرێت جووتێکی نوێش بە هەمان شێوە دەساوێت.',
    },
    points: [
      {
        en: 'A worn or bald spare is illegal to drive on, spare or not. Fitting it does not make it legal.',
        ar: 'والإطار الاحتياطي المتهالك أو الأصلع لا يجوز السير عليه قانونًا، احتياطيًّا كان أو غيره، وتركيبه لا يجعله قانونيًّا.',
        ckb: 'تایەی یەدەگی ساو یان ڕووت بە یاسا نابێت لەسەری بڕۆیت، یەدەگ بێت یان نا، دانانی یاساییی ناکات.',
      },
    ],
  },
  {
    id: 'note-blowouts',
    topic: 'mechanics',
    group: 'tyres',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٩، س ٦٢' },
    title: {
      en: 'A tyre blows out',
      ar: 'انفجار إطار',
      ckb: 'تەقینەوەی تایە',
    },
    body: {
      en: 'The instinct is to brake, and braking is what turns a blowout into a crash: the car is already pulling hard to one side and braking adds to that pull. The steering wheel is what saves it.',
      ar: 'الغريزة أن تكبح، والكبح هو ما يحوّل الانفجار إلى حادث: فالسيارة تنحرف بقوة إلى جهة أصلًا، والكبح يزيد ذلك الانحراف. والمقود هو ما ينقذ الموقف.',
      ckb: 'غەریزە دەڵێت بڕێک بگرە، و بڕێکگرتن ئەوەیە کە تەقینەوەکە دەکاتە ڕووداو: ئۆتۆمبێلەکە پێشتر بە توندی بۆ لایەک ڕادەکێشرێت و بڕێکگرتن ئەو ڕاکێشانە زیاد دەکات. ئستیرنەکە ئەوەیە کە ڕزگاری دەکات.',
    },
    points: [
      {
        en: 'Front tyre: press the accelerator for a moment at the blowout, then lift your foot gradually, keep both hands on the wheel and avoid braking as far as you can.',
        ar: 'الإطار الأمامي: اضغط دوّاسة الوقود لحظة عند الانفجار، ثم ارفع قدمك تدريجيًّا، وأبقِ يديك على المقود، وتجنّب الكبح قدر المستطاع.',
        ckb: 'تایەی پێشەوە: لە ساتی تەقینەوەکەدا ساتێک پەدالی سووتەمەنی پەلامار بدە، پاشان پێت وردەوردە هەڵبگرە، هەردوو دەست لەسەر ئستیرنەکە بهێڵەرەوە و تا دەتوانیت لە بڕێکگرتن دووربکەوە.',
      },
      {
        en: 'Rear tyre: hold the wheel firmly, reduce speed gradually and steer right towards the hard shoulder, watching the traffic behind and coming the other way.',
        ar: 'والإطار الخلفي: أمسك المقود بإحكام، وخفّف السرعة تدريجيًّا، واتّجه يمينًا نحو كتف الطريق، مراقبًا السير خلفك والقادم من الجهة المقابلة.',
        ckb: 'تایەی دواوە: ئستیرنەکە بە توندی بگرە، وردەوردە خێرایی کەم بکەرەوە و بەرەو لای ڕاست بۆ شانی ڕێگا ئاراستە بکە، لە کاتێکدا ئاگات لە هاتوچۆی دواوە و بەرامبەر بێت.',
      },
    ],
  },

  // --------------------------------------------------------------- faults --
  {
    id: 'note-fault-warning-signs',
    topic: 'mechanics',
    group: 'faults',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٦٨، س ١٢٨، س ١٤٦، س ١٨٥' },
    title: {
      en: 'What the vehicle is telling you',
      ar: 'ماذا تقول لك المركبة',
      ckb: 'ئۆتۆمبێلەکە چیت پێدەڵێت',
    },
    body: {
      en: 'Three symptoms have a single, specific cause the exam expects you to name, and one of them is a bar on driving at all rather than something to look into.',
      ar: 'ثلاثة أعراض لكل منها سبب واحد محدّد يتوقع الاختبار أن تسمّيه، وأحدها مانع من القيادة أصلًا لا أمر يُنظر فيه لاحقًا.',
      ckb: 'سێ نیشانە هەریەکەیان یەک هۆکاری دیاریکراویان هەیە کە تاقیکردنەوەکە چاوەڕێ دەکات ناوی ببەیت، و یەکێکیان ڕێگرە لە لێخوڕین بە تەواوی نەک شتێک کە دواتر لێی بکۆڵدرێتەوە.',
    },
    points: [
      {
        en: 'Blue smoke from the exhaust: engine wear, or broken pistons or piston rings.',
        ar: 'الدخان الأزرق من العادم: تآكل المحرك أو كسر المكابس أو حلقاتها.',
        ckb: 'دووکەڵی شین لە ئێگزۆزەوە: ساوانی بزوێنەر، یان شکانی پیستۆن یان بازنەکانی.',
      },
      {
        en: 'Knocking while the engine runs, loaded or not: petrol with too low an octane rating.',
        ar: 'الطرق أثناء عمل المحرك، محمّلًا كان أو غير محمّل: بنزين ذو رقم أوكتان منخفض.',
        ckb: 'لێدان لە کاتی کارکردنی بزوێنەر، بارکراو بێت یان نا: بەنزینی خاوەن ڕێژەی ئۆکتانی نزم.',
      },
      {
        en: 'An abnormal noise of any kind: the vehicle may not be driven at all.',
        ar: 'وأي صوت غير طبيعي مهما كان: لا يجوز قيادة المركبة إطلاقًا.',
        ckb: 'هەر دەنگێکی نائاسایی لە هەر جۆرێک بێت: هەرگیز نابێت ئۆتۆمبێلەکە لێبخوڕدرێت.',
      },
      {
        en: 'Cracks and splits in the windscreen in front of the driver affect the driver\'s vision, which is why they are treated as a fault and not as damage.',
        ar: 'وشقوق الزجاج الأمامي أمام السائق تؤثر في رؤيته، ولهذا تُعدّ عطلًا لا مجرد ضرر.',
        ckb: 'شەق و درزەکانی شووشەی پێشەوە لەبەردەم شۆفێردا کاریگەرییان لەسەر بینینیەتی، بۆیە وەک خراپی سەیر دەکرێن نەک تەنها زیان.',
      },
    ],
  },
  {
    id: 'note-fire-risk',
    topic: 'mechanics',
    group: 'faults',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٢٦، س ١٨٠، س ١٨٩' },
    title: {
      en: 'Fuel and fire',
      ar: 'الوقود والحريق',
      ckb: 'سووتەمەنی و ئاگر',
    },
    body: {
      en: 'The main cause of a vehicle fire given by the guide is not a mechanical one: it is smoking at filling stations and careless use of cigarettes, lighters and matches. Petrol vapour, not liquid petrol, is what ignites, and it collects at ground level around a pump.',
      ar: 'السبب الرئيس لحريق المركبة بحسب الدليل ليس ميكانيكيًّا: إنه التدخين في محطات الوقود والاستعمال غير المبالي للسجائر والولاعات وأعواد الثقاب. فالمشتعل هو بخار البنزين لا سائله، وهو يتجمّع قرب الأرض حول المضخة.',
      ckb: 'هۆکاری سەرەکی ئاگرکەوتنەوەی ئۆتۆمبێل بەپێی ڕێنماییەکە میکانیکی نییە: جگەرەکێشانە لە وێستگەی سووتەمەنی و بەکارهێنانی بێباکانەی جگەرە و داگیرسێنەر و کبریت. ئەوەی دەگیرسێتەوە هەڵمی بەنزینە نەک شلەکەی، و لە نزیک زەوی لە دەوری پومپەکە کۆدەبێتەوە.',
    },
    points: [
      {
        en: 'Refuel with the engine switched off, and do not smoke while you do it.',
        ar: 'املأ الوقود والمحرك مطفأ، ولا تدخّن أثناء ذلك.',
        ckb: 'کاتێک سووتەمەنی پڕدەکەیتەوە بزوێنەرەکە کوژاوە بێت، و لە کاتیدا جگەرە مەکێشە.',
      },
      {
        en: 'A fuel leak is dangerous wherever on the vehicle it is. There is no minor one.',
        ar: 'وتسرّب الوقود خطر أينما كان في المركبة، فلا يوجد تسرّب بسيط.',
        ckb: 'دڵۆپینی سووتەمەنی لە هەر شوێنێکی ئۆتۆمبێلەکە بێت مەترسیدارە، هیچ دڵۆپینێکی بچووک نییە.',
      },
    ],
  },

  // ----------------------------------------------------------- inspection --
  {
    id: 'note-inspection-purpose',
    topic: 'mechanics',
    group: 'inspection',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٢٤، س ١٨٢' },
    title: {
      en: 'What the annual inspection is for',
      ar: 'ما الغرض من الفحص السنوي',
      ckb: 'پشکنینی ساڵانە بۆ چییە',
    },
    body: {
      en: 'The guide names the periodic technical inspection as one of the basic elements of a vehicle\'s safety on the road, and states its purpose plainly: to protect the vehicle, the driver, and other people.',
      ar: 'يسمّي الدليل الفحص الفني الدوري أحد العناصر الأساسية لسلامة المركبة على الطريق، ويذكر غرضه صراحة: حماية المركبة والسائق والآخرين.',
      ckb: 'ڕێنماییەکە پشکنینی تەکنیکی کاتی وەک یەکێک لە توخمە بنەڕەتییەکانی سەلامەتی ئۆتۆمبێل لەسەر ڕێگا ناو دەبات، و مەبەستەکەی بە ڕوونی دەڵێت: پاراستنی ئۆتۆمبێلەکە و شۆفێرەکە و کەسانی تر.',
    },
  },
  {
    id: 'note-inspection-what-fails',
    topic: 'mechanics',
    group: 'inspection',
    verified: true,
    source: {
      ...FROM_EXAM_GUIDE,
      locator: 'س ١٥٤، س ١٥٦، س ١٥٧، س ١٦٠، س ١٦١، س ١٧٠، س ١٧٢، س ١٧٤',
    },
    title: {
      en: 'What fails the inspection',
      ar: 'ما يُرسِب في الفحص',
      ckb: 'چی لە پشکنینەکەدا دەڕوخێت',
    },
    body: {
      en: 'Eight faults are asked about individually and every one fails the vehicle outright. The pattern is clear: anything that leaks, anything that stops you seeing, and anything that is not as the factory made it.',
      ar: 'ثمانية أعطال يُسأل عن كلٍّ منها على حدة، وكلها تُرسِب المركبة مباشرة. والنمط واضح: كل ما يسرّب، وكل ما يمنع الرؤية، وكل ما ليس كما صنعه المصنع.',
      ckb: 'هەشت خراپی بە جیا پرسیاریان لێدەکرێت و هەموویان ڕاستەوخۆ ئۆتۆمبێلەکە دەڕوخێنن. شێوازەکە ڕوونە: هەرچی دڵۆپێنێت، هەرچی ڕێگر بێت لە بینین، و هەرچی وەک ئەوە نەبێت کە کارگەکە دروستی کردووە.',
    },
    points: [
      {
        en: 'A leak in the fuel system, a brake-fluid leak, or an oil leak in a brake pipe.',
        ar: 'تسرّب في منظومة الوقود، أو تسرّب زيت الفرامل، أو تسرّب زيت في أنبوب الفرامل.',
        ckb: 'دڵۆپین لە سیستەمی سووتەمەنی، دڵۆپینی زەیتی بڕێک، یان دڵۆپینی زەیت لە بۆریی بڕێکدا.',
      },
      {
        en: 'A faulty handbrake.',
        ar: 'فرامل يد معطّلة.',
        ckb: 'بڕێکی دەستی خراپ.',
      },
      {
        en: 'Broken or missing side mirrors, or a faulty windscreen wiper.',
        ar: 'مرايا جانبية مكسورة أو مفقودة، أو مساحة زجاج معطّلة.',
        ckb: 'ئاوێنەی لاتەنیشتی شکاو یان نەبوو، یان پاککەرەوەی شووشەی خراپ.',
      },
      {
        en: 'A bonnet catch that will not open, and a sound amplifier fitted to the exhaust. It must be as the manufacturer made it.',
        ar: 'وقفل غطاء المحرك الذي لا يفتح، ومكبّر صوت مركّب على العادم، إذ يجب أن يكون كما صنعه المصنّع.',
        ckb: 'قوفڵی سەرپۆشی بزوێنەر کە ناکرێتەوە، و دەنگبەرزکەرەوەیەک کە بە ئێگزۆزەوە دانرابێت، دەبێت وەک ئەوە بێت کە بەرهەمهێنەرەکە دروستی کردووە.',
      },
      {
        en: 'Two things that do not fail it: original xenon main and dipped beams pass, and the engine warning light being on only reduces the score.',
        ar: 'وأمران لا يُرسِبان: أضواء الزينون الأصلية العالية والواطئة تجتاز الفحص، وإضاءة مؤشر عطل المحرك تخفض الدرجة فقط.',
        ckb: 'دوو شت کە نایڕوخێنن: چرای زینۆنی ڕەسەنی بەرز و نزم دەرباز دەبن، و داگیرسانی چرای ئاگادارکردنەوەی بزوێنەر تەنها نمرەکە کەم دەکاتەوە.',
      },
    ],
  },

  // ------------------------------------------------------------ licensing --
  {
    id: 'note-licence-ages',
    topic: 'mechanics',
    group: 'licensing',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٢٩، س ١٣١، س ١٣٣، س ١٥١' },
    title: {
      en: 'The age for each licence',
      ar: 'سنّ كل إجازة',
      ckb: 'تەمەنی هەر مۆڵەتێک',
    },
    body: {
      en: 'Four ages, asked as four separate questions. Two of them are the same number, which is the part most easily got wrong.',
      ar: 'أربعة أعمار تُسأل في أربعة أسئلة منفصلة. واثنان منها الرقم نفسه، وهو أكثر ما يقع فيه الخطأ.',
      ckb: 'چوار تەمەن، وەک چوار پرسیاری جیاواز پرسیاریان لێدەکرێت. دووانیان هەمان ژمارەن، و ئەمە ئەو بەشەیە کە زۆرترین هەڵەی تێدا دەکرێت.',
    },
    points: [
      {
        en: 'Motorcycle: 16 years completed.',
        ar: 'الدراجة النارية: إتمام ١٦ سنة.',
        ckb: 'ماتۆڕسکیل: تەواوکردنی ١٦ ساڵ.',
      },
      {
        en: 'Private vehicle: 18 years completed.',
        ar: 'المركبة الخصوصية: إتمام ١٨ سنة.',
        ckb: 'ئۆتۆمبێلی تایبەت: تەواوکردنی ١٨ ساڵ.',
      },
      {
        en: 'Public vehicle: 20 years completed.',
        ar: 'المركبة العمومية: إتمام ٢٠ سنة.',
        ckb: 'ئۆتۆمبێلی گشتی: تەواوکردنی ٢٠ ساڵ.',
      },
      {
        en: 'Construction vehicle: 20 years completed.',
        ar: 'مركبة الإنشاءات: إتمام ٢٠ سنة.',
        ckb: 'ئۆتۆمبێلی بیناسازی: تەواوکردنی ٢٠ ساڵ.',
      },
    ],
  },
  {
    id: 'note-licence-scope',
    topic: 'mechanics',
    group: 'licensing',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٢٠٤، س ٢٧١، س ٢٨١، ص س ٥٢' },
    title: {
      en: 'What each licence lets you drive',
      ar: 'ما تتيحه كل إجازة من قيادة',
      ckb: 'هەر مۆڵەتێک ڕێگای لێخوڕینی چی دەدات',
    },
    body: {
      en: 'A licence is granted for a class of vehicle, and driving outside that class is the same offence as driving with no licence at all.',
      ar: 'تُمنح الإجازة لصنف من المركبات، وقيادة ما هو خارج ذلك الصنف مخالفة كقيادة بلا إجازة أصلًا.',
      ckb: 'مۆڵەت بۆ جۆرێکی ئۆتۆمبێل دەدرێت، و لێخوڕینی دەرەوەی ئەو جۆرە هەمان سەرپێچییە وەک لێخوڕین بەبێ هیچ مۆڵەتێک.',
    },
    points: [
      {
        en: 'A public licence covers every type of vehicle in the region except construction and agricultural machinery and motorcycles.',
        ar: 'الإجازة العمومية تشمل كل أنواع المركبات في الإقليم عدا آليات الإنشاء والزراعة والدراجات النارية.',
        ckb: 'مۆڵەتی گشتی هەموو جۆرەکانی ئۆتۆمبێل لە هەرێمەکەدا دەگرێتەوە جگە لە ئامێری بیناسازی و کشتوکاڵی و ماتۆڕسکیل.',
      },
      {
        en: 'A construction-vehicle licence covers construction vehicles only.',
        ar: 'وإجازة مركبات الإنشاءات تشمل مركبات الإنشاءات فقط.',
        ckb: 'مۆڵەتی ئۆتۆمبێلی بیناسازی تەنها ئۆتۆمبێلی بیناسازی دەگرێتەوە.',
      },
      {
        en: 'A private licence holder may drive a double-cab pick-up, provided it is not used for hire and is marked "private transport".',
        ar: 'ولحامل الإجازة الخصوصية قيادة بيك أب مزدوج المقصورة، شريطة ألّا يُستخدم للأجرة وأن يكون مؤشّرًا «نقل خصوصي».',
        ckb: 'خاوەنی مۆڵەتی تایبەت دەتوانێت پیکاپی دوو کابین لێبخوڕێت، بەمەرجێک بۆ کرێ بەکارنەهێنرێت و بە «گواستنەوەی تایبەت» نیشانە کرابێت.',
      },
      {
        en: 'A non-Iraqi may be granted a private licence only.',
        ar: 'ولا يُمنح غير العراقي إلا إجازة خصوصية.',
        ckb: 'کەسێکی ناعێراقی تەنها مۆڵەتی تایبەتی پێدەدرێت.',
      },
    ],
  },
  {
    id: 'note-documents-and-plates',
    topic: 'mechanics',
    group: 'licensing',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٥٥، س ٦٥، س ٦٧، س ١١٧، س ٢١٠، س ٢١٨، ص س ٥٧' },
    title: {
      en: 'Documents, plates and what may be written on a vehicle',
      ar: 'الوثائق واللوحات وما يجوز كتابته على المركبة',
      ckb: 'بەڵگەنامە، پلێت، و ئەوەی بۆی هەیە لەسەر ئۆتۆمبێل بنووسرێت',
    },
    body: {
      en: 'Two documents must be in the vehicle every time you drive it: a valid driving licence for that class, and the vehicle\'s own valid annual document.',
      ar: 'وثيقتان يجب وجودهما في المركبة في كل مرة تقودها: إجازة سوق سارية لصنف تلك المركبة، ووثيقة المركبة السنوية السارية.',
      ckb: 'دوو بەڵگەنامە دەبێت هەموو جارێک کە لێی دەخوڕیت لە ناو ئۆتۆمبێلەکەدا بن: مۆڵەتێکی لێخوڕینی کارا بۆ ئەو جۆرە ئۆتۆمبێلە، و بەڵگەنامەی ساڵانەی کارای خودی ئۆتۆمبێلەکە.',
    },
    points: [
      {
        en: 'Covering the plate or the windows with flags or pictures is prohibited in any form.',
        ar: 'وتغطية اللوحة أو الزجاج برايات أو صور ممنوعة بأي شكل.',
        ckb: 'داپۆشینی پلێت یان شووشەکان بە ئاڵا یان وێنە بە هیچ شێوەیەک قەدەغەیە.',
      },
      {
        en: 'Words may be written on a vehicle body only where the regulations require it, in the places designated for it, and on lorries as the regulations prescribe.',
        ar: 'ولا تُكتب عبارات على هيكل المركبة إلا حيث تفرضه الأنظمة وفي أماكنه المخصّصة، وعلى الشاحنات كما تنصّ الأنظمة.',
        ckb: 'وشە تەنها لەو شوێنانە لەسەر جەستەی ئۆتۆمبێل دەنووسرێن کە ڕێساکان داوای دەکەن، لە شوێنە تەرخانکراوەکانیدا، و لەسەر بارهەڵگرەکان وەک ڕێساکان دەڵێن.',
      },
      {
        en: 'Vehicles on temporary customs-inspection plates may not be driven in the Region or Iraq after sixty days from the signing of the purchase contract.',
        ar: 'والمركبات ذات لوحات الفحص الكمركي المؤقتة لا يجوز سوقها في الإقليم أو العراق بعد ستين يومًا من توقيع عقد الشراء.',
        ckb: 'ئەو ئۆتۆمبێلانەی پلێتی کاتی پشکنینی گومرگیان پێیە، دوای شەست ڕۆژ لە واژووکردنی گرێبەستی کڕین نابێت لە هەرێم یان عێراقدا لێبخوڕدرێن.',
      },
      {
        en: 'A licence is cancelled when medical fitness is lost, by decision of the medical committee.',
        ar: 'وتُلغى الإجازة عند فقدان اللياقة الطبية بقرار من اللجنة الطبية.',
        ckb: 'مۆڵەت هەڵدەوەشێتەوە کاتێک شیاوی پزیشکی لەدەست بچێت، بە بڕیاری لیژنەی پزیشکی.',
      },
    ],
  },
];
