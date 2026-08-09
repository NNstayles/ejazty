/**
 * Study notes for the First aid section.
 *
 * The ministry bank carries exactly three first-aid questions — burns, battery
 * acid, and treating casualties where they lie — which made this the thinnest
 * section in the app by a wide margin. The rest was added on request, and is
 * standard roadside first-aid practice rather than ministry material: see
 * `FIRST_AID_PRACTICE` in `source.ts` for the provenance note, which is the same
 * product decision that covers the general road-code material elsewhere.
 *
 * The scope is deliberately narrow and should stay narrow: the small set of
 * things a driver is expected to do at the roadside before help arrives. It is
 * not a medical reference and must not grow into one.
 *
 * One note needs care if it is ever edited. `note-firstaid-burns` states the
 * guide's own answer — remove the burnt person's clothing quickly — because
 * that is the answer a graded attempt marks correct, and then adds the standard
 * caution about clothing stuck to the burn. Both halves are load-bearing:
 * dropping the first teaches the wrong exam answer, dropping the second teaches
 * something that can cause harm.
 */
import type { StudyNote } from '../../schema';
import { FIRST_AID_PRACTICE, FROM_EXAM_GUIDE } from './source';

export const firstAidNotes: StudyNote[] = [
  // ---------------------------------------------------------------- scene --
  {
    id: 'note-firstaid-make-it-safe',
    topic: 'firstaid',
    group: 'scene',
    verified: true,
    source: FIRST_AID_PRACTICE,
    title: {
      en: 'Make the scene safe before you help',
      ar: 'أمّن المكان قبل أن تساعد',
      ckb: 'پێش یارمەتیدان شوێنەکە سەلامەت بکە',
    },
    body: {
      en: 'The first casualty of a road accident is often someone who stopped to help. Hazard lights on, warning triangle out, and switch off the damaged vehicle\'s engine if you can reach the key safely.',
      ar: 'كثيرًا ما يكون أول ضحايا حادث الطريق من توقف ليساعد. فأضئ أضواء التحذير، وضع المثلث التحذيري، وأطفئ محرك المركبة المتضررة إن استطعت الوصول إلى المفتاح بأمان.',
      ckb: 'زۆرجار یەکەم قوربانی ڕووداوی ڕێگا ئەو کەسەیە کە وەستاوە بۆ یارمەتیدان. چرای مەترسی داگیرسێنە، سێگۆشەی ئاگادارکەرەوە دابنێ، و بزوێنەری ئۆتۆمبێلە زیانلێکەوتووەکە بکوژێنەوە ئەگەر بە سەلامەتی دەگەیتە کلیلەکە.',
    },
    points: [
      {
        en: 'Do not stand between the casualties and oncoming traffic.',
        ar: 'ولا تقف بين المصابين والسير القادم.',
        ckb: 'لە نێوان برینداران و هاتوچۆی هاتوودا مەوەستە.',
      },
      {
        en: 'Do not smoke and do not let anyone else smoke, because of spilt fuel.',
        ar: 'ولا تدخّن ولا تدع أحدًا يدخّن، فالسبب الوقود المنسكب.',
        ckb: 'جگەرە مەکێشە و لێمەگەڕێ کەسی تر بیکێشێت، چونکە سووتەمەنی ڕژاو هۆکارەکەیە.',
      },
    ],
  },
  {
    id: 'note-firstaid-call-for-help',
    topic: 'firstaid',
    group: 'scene',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩٦، س ٢٨٠' },
    title: {
      en: 'Calling for help',
      ar: 'طلب النجدة',
      ckb: 'داواکردنی یارمەتی',
    },
    body: {
      en: 'Call before you start treating anyone, unless someone else can call while you work. Both numbers are asked directly in the exam and are worth knowing by heart.',
      ar: 'اتصل قبل أن تبدأ بإسعاف أحد، إلا إذا وُجد من يتصل بينما تعمل أنت. وكلا الرقمين يُسأل عنه مباشرة في الاختبار ويستحق الحفظ.',
      ckb: 'پێش ئەوەی دەست بکەیت بە چارەسەری کەسێک پەیوەندی بکە، مەگەر کەسێکی تر بتوانێت پەیوەندی بکات لە کاتی کارکردنت. هەردوو ژمارەکە ڕاستەوخۆ لە تاقیکردنەوەکەدا دەپرسرێن و شایانی لەبەرکردنن.',
    },
    points: [
      {
        en: 'Civil Defence (emergency): 115.',
        ar: 'الدفاع المدني (الطوارئ): ١١٥.',
        ckb: 'بەرگری شارستانی (فریاگوزاری): ١١٥.',
      },
      {
        en: 'Traffic police: 188.',
        ar: 'شرطة المرور: ١٨٨.',
        ckb: 'پۆلیسی هاتوچۆ: ١٨٨.',
      },
      {
        en: 'Say where you are first, then how many people are hurt, and whether anyone is trapped or unconscious.',
        ar: 'واذكر موقعك أولًا، ثم عدد المصابين، وهل هناك محتجَز أو فاقد للوعي.',
        ckb: 'سەرەتا بڵێ لەکوێیت، پاشان چەند کەس بریندارن، و ئایا کەسێک گیراوە یان لەهۆش خۆی چووە.',
      },
    ],
  },
  {
    id: 'note-firstaid-at-the-scene',
    topic: 'firstaid',
    group: 'scene',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٨٤' },
    title: {
      en: 'Treat casualties where they lie',
      ar: 'أسعف المصابين في مكانهم',
      ckb: 'برینداران لە شوێنی خۆیاندا چارەسەر بکە',
    },
    body: {
      en: 'Treat casualties at the scene, moving them as little as possible. A damaged spine is made permanent by being moved, and nothing about how someone looks reveals one.',
      ar: 'يُقدَّم الإسعاف في مكان الحادث مع تحريك المصاب بأقل قدر ممكن. فالعمود الفقري المصاب يصير عطبه دائمًا بالتحريك، ولا شيء في مظهر المصاب يكشفه.',
      ckb: 'برینداران لە شوێنی ڕووداوەکەدا چارەسەر بکە، بە جوڵاندنێکی هەرچی کەمتر. بڕبڕەی پشتی برینداربوو بە جوڵاندن زیانەکەی هەمیشەیی دەبێت، و هیچ شتێک لە ڕواڵەتیدا ئەوە دەرناخات.',
    },
    points: [
      {
        en: 'Move someone only where staying put is the greater danger: fire, or a vehicle in the path of traffic that cannot be protected.',
        ar: 'ولا تنقل أحدًا إلا حيث يكون البقاء هو الخطر الأكبر: حريق، أو مركبة في مسار السير لا يمكن تأمينها.',
        ckb: 'تەنها لەو کاتەدا کەسێک بجووڵێنە کە مانەوە مەترسیی گەورەترە: ئاگر، یان ئۆتۆمبێلێک لە ڕێڕەوی هاتوچۆدا کە ناتوانرێت بپارێزرێت.',
      },
      {
        en: 'Do not give an injured person anything to eat or drink.',
        ar: 'ولا تعطِ المصاب طعامًا ولا شرابًا.',
        ckb: 'هیچ خواردن و خواردنەوەیەک مەدە بە برینداری.',
      },
    ],
  },
  {
    id: 'note-firstaid-unconscious',
    topic: 'firstaid',
    group: 'scene',
    verified: true,
    source: FIRST_AID_PRACTICE,
    title: {
      en: 'Someone who is unconscious',
      ar: 'المصاب فاقد الوعي',
      ckb: 'کەسێک لەهۆش خۆی چووە',
    },
    body: {
      en: 'Check whether they are breathing before anything else: an unconscious person can suffocate on their own tongue while a wound is being bandaged. If they are, keep the airway clear and stay with them.',
      ar: 'تحقّق من تنفّسه قبل كل شيء: فقد يختنق فاقد الوعي بلسانه بينما تُضمّد جرح نازف. فإن كان يتنفس فأبقِ مجرى الهواء خاليًا وابقَ معه.',
      ckb: 'پێش هەموو شتێک بزانە هەناسە دەدات یان نا: کەسێکی لەهۆش خۆیچوو دەکرێت بە زمانی خۆی بخنکێت لە کاتی پێچانەوەی برینێکدا. ئەگەر هەناسە دەدات، ڕێگای هەوا خاڵی ڕابگرە و لەگەڵی بمێنەرەوە.',
    },
    points: [
      {
        en: 'A motorcyclist\'s helmet is left on. Remove it only if they are not breathing and you cannot open the airway with it on, and then only with someone else steadying the head.',
        ar: 'وخوذة سائق الدراجة تُترك في مكانها. ولا تُنزع إلا إذا كان لا يتنفس ولم تستطع فتح مجرى الهواء وهي عليه، وعندها بمساعدة شخص آخر يثبّت الرأس.',
        ckb: 'قەپاغی لێخوڕەری ماتۆڕ لە جێی خۆی دەهێڵدرێتەوە. تەنها لەو کاتەدا لایببە کە هەناسە نادات و ناتوانیت بە بوونی ڕێگای هەوا بکەیتەوە، و ئەویش بە یارمەتی کەسێکی تر کە سەرەکە جێگیر دەکات.',
      },
    ],
  },

  // ------------------------------------------------------------- injuries --
  {
    id: 'note-firstaid-bleeding',
    topic: 'firstaid',
    group: 'injuries',
    verified: true,
    source: FIRST_AID_PRACTICE,
    title: {
      en: 'Heavy bleeding',
      ar: 'النزف الشديد',
      ckb: 'خوێنبەربوونی توند',
    },
    body: {
      en: 'Press directly on the wound with the cleanest cloth to hand and keep pressing: uninterrupted pressure is what stops bleeding, and lifting the cloth to look undoes it each time.',
      ar: 'اضغط على الجرح مباشرةً بأنظف قطعة قماش متوفرة واستمر في الضغط: فالضغط المتواصل هو ما يوقف النزف، ورفع القماش للنظر يُبطله في كل مرة.',
      ckb: 'ڕاستەوخۆ بە پاکترین پارچە قوماشی بەردەست پەستان بخەرە سەر برینەکە و بەردەوام بە: پەستانی بێ پچڕان ئەوەیە کە خوێنبەربوون دەوەستێنێت، و هەڵگرتنی قوماشەکە بۆ سەیرکردن هەموو جارێک پووچی دەکاتەوە.',
    },
    points: [
      {
        en: 'If blood soaks through, add another cloth on top rather than removing the first.',
        ar: 'وإذا نفذ الدم فأضف قطعة أخرى فوق الأولى بدل نزعها.',
        ckb: 'ئەگەر خوێن تێپەڕی، پارچەیەکی تر بخە سەری لەبری ئەوەی یەکەمی لاببەیت.',
      },
      {
        en: 'Do not try to remove anything embedded in a wound. Press around it, not on it.',
        ar: 'ولا تحاول نزع شيء غائر في الجرح. اضغط حوله لا عليه.',
        ckb: 'هەوڵ مەدە هیچ شتێک لە ناو برینەکەدا چەسپاوە دەربهێنیت. بە دەوریدا پەستان بخە، نەک بەسەریدا.',
      },
    ],
  },
  {
    id: 'note-firstaid-burns',
    topic: 'firstaid',
    group: 'injuries',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ٩٤' },
    title: {
      en: 'Burns',
      ar: 'الحروق',
      ckb: 'سووتان',
    },
    body: {
      en: 'The guide\'s answer is to remove the burnt person\'s clothing quickly, and that is what a graded attempt marks correct: clothing holds heat against the skin. Cool the burn with clean running water afterwards.',
      ar: 'جواب الدليل هو نزع ملابس المصاب المحترقة بسرعة، وهو ما تعدّه المحاولة المصحّحة صحيحًا: فالملابس تحبس الحرارة على الجلد. ثم برّد الحرق بماء نظيف جارٍ.',
      ckb: 'وەڵامی ڕێنماییەکە ئەوەیە کە جلی سووتاوی کەسەکە بە خێرایی لاببەیت، و ئەمە ئەو وەڵامەیە کە هەوڵێکی نمرەدراو بە دروستی دادەنێت: جل گەرمی لەسەر پێست ڕادەگرێت. پاشان سووتانەکە بە ئاوی پاکی ڕۆیشتوو سارد بکەرەوە.',
    },
    points: [
      {
        en: 'Clothing that is stuck to the burn is left alone. Pulling it away takes the skin with it.',
        ar: 'أما الملابس الملتصقة بالحرق فتُترك. فنزعها ينزع الجلد معها.',
        ckb: 'ئەو جلەی بە سووتانەکەوە نووساوە بەجێدەهێڵدرێت. ڕاکێشانی پێستەکەشی لەگەڵ دەبات.',
      },
      {
        en: 'Do not put anything else on a burn: no oil, no toothpaste, no ice.',
        ar: 'ولا تضع على الحرق شيئًا آخر: لا زيتًا ولا معجون أسنان ولا ثلجًا.',
        ckb: 'هیچ شتێکی تر مەخە سەر سووتان: نە زەیت، نە مەعجوونی ددان، نە سەهۆڵ.',
      },
    ],
  },
  {
    id: 'note-firstaid-battery-acid',
    topic: 'firstaid',
    group: 'injuries',
    verified: true,
    source: { ...FROM_EXAM_GUIDE, locator: 'س ١٤٣' },
    title: {
      en: 'Battery acid on the skin',
      ar: 'حامض البطارية على الجلد',
      ckb: 'ترشی باتری لەسەر پێست',
    },
    body: {
      en: 'The fluid in a vehicle battery is acid. If it touches the skin, wash the area with water as fast as you can and keep washing: the burning continues while any acid is left.',
      ar: 'سائل بطارية المركبة حامض. فإذا لامس الجلد فاغسل الموضع بالماء بأسرع ما يمكن واستمر: فالحرق يستمر ما بقي شيء من الحامض.',
      ckb: 'ئەو شلەیەی ناو باتری ئۆتۆمبێل ترشە. ئەگەر بەر پێست کەوت، شوێنەکە بە ئاو بشۆ بەخێرایی و بەردەوام بە: سووتانەکە بەردەوام دەبێت تا ترشەکە بمێنێتەوە.',
    },
    points: [
      {
        en: 'Acid in the eyes is the same answer and more urgent: water, immediately, and keep going.',
        ar: 'والحامض في العين جوابه نفسه وأشد إلحاحًا: ماء فورًا واستمرار في الغسل.',
        ckb: 'ترش لە چاودا هەمان وەڵامی هەیە و پەلەترە: ئاو، دەستبەجێ، و بەردەوامبوون.',
      },
    ],
  },
  {
    id: 'note-firstaid-shock-and-fractures',
    topic: 'firstaid',
    group: 'injuries',
    verified: true,
    source: FIRST_AID_PRACTICE,
    title: {
      en: 'Shock and broken bones',
      ar: 'الصدمة والكسور',
      ckb: 'شۆک و ئێسکشکان',
    },
    body: {
      en: 'Someone pale, cold, shaking or confused after a crash is going into shock, which can be serious even where the visible injuries are not. Keep them lying still, keep them warm, and stay and talk to them.',
      ar: 'من يبدو شاحبًا أو باردًا أو مرتعشًا أو مشوّشًا بعد الحادث يدخل في صدمة، وقد تكون خطيرة حتى لو لم تكن الإصابات الظاهرة كذلك. أبقِه مستلقيًا ساكنًا ودافئًا، وابقَ معه وحدّثه.',
      ckb: 'ئەو کەسەی دوای ڕووداو ڕەنگزەرد، سارد، لەرزۆک یان شێواو دیارە دەچێتە ناو شۆکەوە، و دەکرێت جددی بێت تەنانەت ئەگەر برینە دیارەکانیش جددی نەبن. بە هێمنی پاڵکەوتووی ڕابگرە، گەرمی ڕابگرە، و لەگەڵی بمێنەرەوە و قسەی لەگەڵ بکە.',
    },
    points: [
      {
        en: 'Do not try to straighten a broken limb. Support it in the position you found it.',
        ar: 'ولا تحاول تقويم طرف مكسور. ثبّته في الوضع الذي وجدته عليه.',
        ckb: 'هەوڵ مەدە ئەندامێکی شکاو ڕاست بکەیتەوە. لەو حاڵەتەدا کە دۆزیوتەتەوە پشتگیری بکە.',
      },
      {
        en: 'Do not sit someone up to make them comfortable if there is any chance of a spinal or head injury.',
        ar: 'ولا تُجلس أحدًا لإراحته إذا كان ثمة احتمال لإصابة في العمود الفقري أو الرأس.',
        ckb: 'کەس دامەنیشێنە بۆ ئاسوودەکردنی ئەگەر هیچ ئەگەرێکی برینداری بڕبڕەی پشت یان سەر هەبێت.',
      },
    ],
  },
];
