/**
 * Questions transcribed from the official ministry bank — text section,
 * questions 27–281.
 *
 * GENERATED from the per-page transcriptions; see CLAUDE.md. Arabic is verbatim
 * from "دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة"; English and
 * Kurdish Sorani are working translations of that Arabic and are NOT part of the
 * publication.
 *
 * The correct option is the one the source marks with a red check glyph. The
 * PDF's text layer is unusable (its font encoding is not 1:1), so the wording
 * was read from rendered page images and only the answer markers were taken
 * from the text layer.
 */
import type { Question } from '../../schema';
import { EXAM_GUIDE as S } from './source';

export const officialQuestionsText27: Question[] = [
  {
    id: 'q-slow-before-u-turn',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧' },
    prompt: {
      ar: 'يجب تخفيض سرعة المركبة عند الاستدارة؟',
      en: 'When must you reduce the vehicle\'s speed for a turn?',
      ckb: 'دەبێت خێرایی ئۆتۆمبێل کەم بکرێتەوە لە کاتی سووڕانەوەدا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'قبل الاقتراب من الاستدارة',
        en: 'Before approaching the turn',
        ckb: 'پێش نزیکبوونەوە لە سووڕانەوەکە',
      } },
      { id: 'b', text: {
        ar: 'عند دخول الاستدارة',
        en: 'On entering the turn',
        ckb: 'لە کاتی چوونە ناو سووڕانەوەکە',
      } },
      { id: 'c', text: {
        ar: 'في نهاية الاستدارة',
        en: 'At the end of the turn',
        ckb: 'لە کۆتایی سووڕانەوەکە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب تخفيض السرعة قبل الاقتراب من الاستدارة، لا بعد الدخول فيها.',
      en: 'Speed must come down before you approach the turn, not once you are already in it.',
      ckb: 'دەبێت خێرایی پێش نزیکبوونەوە لە سووڕانەوەکە کەم بکرێتەوە، نەک دوای چوونە ناوی.',
    },
  },
  {
    id: 'q-approaching-school-bus',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٨' },
    prompt: {
      ar: 'عندما تقود مركبتك في شارع ذو اتجاه واحد أو ذو إتجاهين وتقترب من باص مدرسي عليك؟',
      en: 'When driving on a one-way or two-way street and approaching a school bus, you must:',
      ckb: 'کاتێک لە شەقامێکی یەک ئاراستە یان دوو ئاراستەدا لێدەخوڕیت و لە پاسی خوێندنگە نزیک دەبیتەوە، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'أن تخفض سرعة مركبتك وتستمر في السياقة بحذر',
        en: 'Reduce your speed and continue driving carefully',
        ckb: 'خێرایی کەم بکەیتەوە و بە وریاییەوە بەردەوام بیت',
      } },
      { id: 'b', text: {
        ar: 'أن تقف على بعد 10 م من الباص المدرسي',
        en: 'Stop 10 m short of the school bus',
        ckb: 'لە دووری ١٠ مەتر لە پاسەکە بوەستیت',
      } },
      { id: 'c', text: {
        ar: 'تتجاوز الباص المدرسي بأسرع وقت',
        en: 'Overtake the school bus as quickly as possible',
        ckb: 'بە خێراترین کات پاسی خوێندنگە تێپەڕێنیت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُخفض السائق سرعته ويستمر بحذر عند الاقتراب من باص مدرسي.',
      en: 'Slow down and proceed with caution when approaching a school bus.',
      ckb: 'خێرایی کەم بکەرەوە و بە وریاییەوە بەردەوام بە کاتێک لە پاسی خوێندنگە نزیک دەبیتەوە.',
    },
  },
  {
    id: 'q-emergency-vehicle-approach',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٢٩' },
    prompt: {
      ar: 'عند سماعك لصوت أو رؤيتك لأضوية تحذير مركبة طوارئ عليك؟',
      en: 'On hearing the siren or seeing the warning lights of an emergency vehicle, you must:',
      ckb: 'کاتێک دەنگ یان ڕووناکی ئاگادارکەرەوەی ئۆتۆمبێلی فریاگوزاری دەبیستیت یان دەبینیت، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خفض سرعة مركبتك والمحافظة على السير في نفس المسلك الذي تسلكه',
        en: 'Slow down and stay in the lane you are already in',
        ckb: 'خێرایی کەم بکەیتەوە و لە هەمان لاین بمێنیتەوە',
      } },
      { id: 'b', text: {
        ar: 'تأكد من خلو مسلك أقصى اليمين من الطريق وأتجه اليه وافتح الطريق لمركبة الطواريء',
        en: 'Check that the far right lane is clear, move into it and clear the way for the emergency vehicle',
        ckb: 'دڵنیابە لەوەی لاینی دوورترین ڕاست بەتاڵە و بەرەو ئەو بچۆ و ڕێگا بۆ ئۆتۆمبێلی فریاگوزاری خاڵی بکە',
      } },
      { id: 'c', text: {
        ar: 'زد سرعة مركبتك لتفسح المجال لمركبة الطوارئ',
        en: 'Speed up to make room for the emergency vehicle',
        ckb: 'خێرایی زیاد بکە بۆ ئەوەی ڕێگا بۆ ئۆتۆمبێلی فریاگوزاری بکەیتەوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يجب إفساح الطريق لمركبة الطوارئ بالانتقال إلى أقصى اليمين بعد التأكد من خلوه.',
      en: 'Give way to the emergency vehicle by moving to the far right once you have checked it is clear.',
      ckb: 'ڕێگا بدە بە ئۆتۆمبێلی فریاگوزاری بە گواستنەوە بۆ دوورترین لای ڕاست دوای دڵنیابوون لە بەتاڵییەکەی.',
    },
  },
  {
    id: 'q-wrong-way-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٣٠' },
    prompt: {
      ar: 'قيادة المركبة عكس إتجاه السير عقوبتها؟',
      en: 'Driving against the direction of traffic is punishable by:',
      ckb: 'لێخوڕینی ئۆتۆمبێل بە پێچەوانەی ئاراستەی هاتوچۆ سزاکەی چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'الحبس والغرامة',
        en: 'Imprisonment and a fine',
        ckb: 'زیندان و غەرامە',
      } },
      { id: 'c', text: {
        ar: 'سحب الإجازة مدى الحياة',
        en: 'Lifetime withdrawal of the licence',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ هەتاهەتایە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبتها الغرامة بحسب دليل الأسئلة الرسمي.',
      en: 'The official question guide gives the penalty as a fine.',
      ckb: 'بەپێی ڕێنمایی فەرمی پرسیارەکان، سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-dirt-road-onto-paved',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٣١' },
    prompt: {
      ar: 'عندما تخرج الى الشارع المعبد من شارع ترابي يجب عليك؟',
      en: 'When you come out onto a paved road from a dirt road you must:',
      ckb: 'کاتێک لە ڕێگایەکی خۆڵاوییەوە دەچیتە سەر ڕێگای قیرتاوکراو، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اعطاء حق الاسبقيه للمركبات التي تسير في الشارع المعبد',
        en: 'Give right of way to vehicles travelling on the paved road',
        ckb: 'مافی پێشینەیی بدەیت بە ئۆتۆمبێلەکانی سەر ڕێگا قیرتاوکراوەکە',
      } },
      { id: 'b', text: {
        ar: 'اعطاء حق الاسبقيه للمركبات التي على الشارع المبلط فقط اذا كان الشارع باتجاهين',
        en: 'Give right of way to vehicles on the paved road only if it is a two-way street',
        ckb: 'تەنها ئەگەر ڕێگاکە دوو ئاراستە بێت مافی پێشینەیی بدەیت',
      } },
      { id: 'c', text: {
        ar: 'لايوجد حق باعطاء الاسبقيه بل ذلك يعتمد على الرغبة والطيبة من قبلك',
        en: 'There is no right of way; it depends on your own goodwill',
        ckb: 'مافی پێشینەیی نییە، بەڵکو بە خواستی خۆت دەبێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'للمركبات على الشارع المعبد حق الأسبقية دائماً على القادم من شارع ترابي.',
      en: 'Vehicles already on the paved road always have priority over one entering from a dirt road.',
      ckb: 'ئۆتۆمبێلەکانی سەر ڕێگا قیرتاوکراوەکە هەمیشە مافی پێشینەییان هەیە.',
    },
  },
  {
    id: 'q-double-yellow-kerb-lines',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'س ٣٢' },
    prompt: {
      ar: 'الخطان المستمران بلون أصفر في الجهة اليمنى من مسلك الطريق بالقرب من الرصيف يعني',
      en: 'Two continuous yellow lines on the right-hand side of the carriageway near the kerb mean:',
      ckb: 'دوو هێڵی بەردەوامی زەرد لە لای ڕاستی ڕێگا نزیک ڕێڕەوی پیادە واتە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع الوقوف أيام العطل الرسمية',
        en: 'Parking is prohibited on official holidays',
        ckb: 'لە ڕۆژانی پشووی فەرمیدا وەستان قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يمنع الوقوف بشكل مطلق',
        en: 'Parking is absolutely prohibited',
        ckb: 'وەستان بە تەواوی قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'مسموح الوقوف',
        en: 'Parking is allowed',
        ckb: 'وەستان ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الخطان الأصفران المستمران يمنعان الوقوف بشكل مطلق.',
      en: 'Double continuous yellow lines prohibit parking absolutely.',
      ckb: 'دوو هێڵی بەردەوامی زەرد وەستان بە تەواوی قەدەغە دەکەن.',
    },
  },
  {
    id: 'q-overtaking-at-pedestrian-crossing',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٣٣' },
    prompt: {
      ar: 'الاجتياز في مناطق عبور المشاة أو بالقرب منها مسموح او ممنوع؟',
      en: 'Is overtaking at or near a pedestrian crossing permitted or prohibited?',
      ckb: 'تێپەڕاندن لە ناوچەی پەڕینەوەی پیادە یان نزیکی ڕێپێدراوە یان قەدەغە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مسموح الاجتياز إذا لم يكن هناك مشاة في منطقة عبور المشاة',
        en: 'Permitted if there are no pedestrians on the crossing',
        ckb: 'ڕێپێدراوە ئەگەر پیادە لەسەر پەڕینەوەکە نەبێت',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الاجتياز او محاولة الاجتياز بالقرب او على مناطق عبور المشاة بشكل مطلق',
        en: 'Overtaking, or attempting to overtake, at or near a pedestrian crossing is absolutely prohibited',
        ckb: 'تێپەڕاندن یان هەوڵی تێپەڕاندن لە نزیک یان لەسەر ناوچەی پەڕینەوەی پیادە بە تەواوی قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'مسموح الاجتياز قبل الوصول الى مكان عبور المشاة في الطرق الخارجية',
        en: 'Permitted before reaching the crossing on rural roads',
        ckb: 'لە ڕێگا دەرەکییەکاندا پێش گەیشتن بە شوێنی پەڕینەوە ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الاجتياز ممنوع بشكل مطلق عند مناطق عبور المشاة أو بالقرب منها.',
      en: 'Overtaking is absolutely prohibited at or near pedestrian crossings.',
      ckb: 'تێپەڕاندن لە نزیک یان لەسەر پەڕینەوەی پیادە بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-flashing-amber-light',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'س ٣٤' },
    prompt: {
      ar: 'الضوء الاصفر (المتقطع) في الطرق يعني؟',
      en: 'A flashing amber light on the road means:',
      ckb: 'ڕووناکی زەردی پچڕپچڕ لە ڕێگادا واتە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر هناك مخاطر أمامك',
        en: 'Caution: there are hazards ahead',
        ckb: 'ئاگاداربە، مەترسی لە بەردەمتدایە',
      } },
      { id: 'b', text: {
        ar: 'توقف',
        en: 'Stop',
        ckb: 'بوەستە',
      } },
      { id: 'c', text: {
        ar: 'تهيئ للحركة',
        en: 'Prepare to move off',
        ckb: 'ئامادەبە بۆ جوڵان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الضوء الأصفر المتقطع تنبيه إلى وجود خطر يستوجب الحذر.',
      en: 'A flashing amber light warns of a hazard and calls for caution.',
      ckb: 'ڕووناکی زەردی پچڕپچڕ ئاگادارکردنەوەیە لە مەترسی و داوای وریایی دەکات.',
    },
  },
  {
    id: 'q-emergency-warning-devices',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٣٥' },
    prompt: {
      ar: 'هل يجوز إستخدام الاشارات التحذيرية او وضع أو إستعمال الاجهزة التحذيرية الضوئية أو الصوتية التي يقتصر إستخدامها على مركبات الطوارئ؟',
      en: 'May you use, fit or operate the warning lights or sirens reserved for emergency vehicles?',
      ckb: 'ئایا بۆت هەیە ئەو ئامێرە ئاگادارکەرەوە ڕووناکی یان دەنگییانە بەکاربهێنیت کە تەنها بۆ ئۆتۆمبێلی فریاگوزارین؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'كلا لا يجوز بشكل مطلق',
        en: 'No, it is absolutely prohibited',
        ckb: 'نەخێر، بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يجوز لبعض الاشخاص بشكل استثنائي',
        en: 'Permitted for certain people as an exception',
        ckb: 'بۆ هەندێک کەس بە شێوەی ئیستیسنایی ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يجوز للشاحنات الكبيرة',
        en: 'Permitted for large lorries',
        ckb: 'بۆ بارهەڵگرە گەورەکان ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يقتصر استخدام هذه الأجهزة على مركبات الطوارئ ولا يجوز لغيرها مطلقاً.',
      en: 'These devices are reserved for emergency vehicles and may not be used by anyone else.',
      ckb: 'ئەم ئامێرانە تەنها بۆ ئۆتۆمبێلی فریاگوزارین و بۆ کەسی تر ڕێپێدراو نییە.',
    },
  },
  {
    id: 'q-uncontrolled-junction-right',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٣٦' },
    prompt: {
      ar: 'عندما تقترب من تقاطع طريق خالي من العلامات المرورية وتلاحظ مركبة أتية من اليمين عليك؟',
      en: 'Approaching a junction with no traffic signs and seeing a vehicle coming from your right, you must:',
      ckb: 'کاتێک لە چوارڕیانێکی بێ تابلۆ نزیک دەبیتەوە و ئۆتۆمبێلێک لە لای ڕاستەوە دێت، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التوقف وإعطاء حق الاسبقيه للمركبة الآتية من اليمين بالمرور اولاً',
        en: 'Stop and give right of way to the vehicle coming from the right',
        ckb: 'بوەستیت و مافی پێشینەیی بدەیت بە ئۆتۆمبێلەکەی لای ڕاست',
      } },
      { id: 'b', text: {
        ar: 'تستمر بالسير وبنفس السرعة لان الأسبقيه لك',
        en: 'Continue at the same speed because you have priority',
        ckb: 'بە هەمان خێرایی بەردەوام بیت چونکە پێشینەیی هی تۆیە',
      } },
      { id: 'c', text: {
        ar: 'تزيد سرعة مركبتك لتتجاوز التقاطع قبله',
        en: 'Speed up to clear the junction before it',
        ckb: 'خێرایی زیاد بکەیت بۆ تێپەڕاندنی چوارڕیانەکە پێش ئەو',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'في التقاطع غير المنظم، الأسبقية للمركبة القادمة من اليمين.',
      en: 'At an unmarked junction, the vehicle coming from the right has priority.',
      ckb: 'لە چوارڕیانی بێ ڕێکخستن، پێشینەیی بۆ ئۆتۆمبێلی لای ڕاستە.',
    },
  },
  {
    id: 'q-following-distance-30kmh',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٣٧' },
    prompt: {
      ar: 'عند قيادة المركبة بسرعة 30 كم/ساعة يجب ترك مسافة بين المركبة والتي امامها بحدود؟',
      en: 'Driving at 30 km/h, the gap you must leave to the vehicle in front is about:',
      ckb: 'لە خێرایی ٣٠ کم/کاتژمێردا، ماوەی نێوان ئۆتۆمبێلەکەت و ئەوەی پێشەوە دەبێت نزیکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: '10متر',
        en: '10 metres',
        ckb: '١٠ مەتر',
      } },
      { id: 'b', text: {
        ar: '5متر',
        en: '5 metres',
        ckb: '٥ مەتر',
      } },
      { id: 'c', text: {
        ar: '20متر',
        en: '20 metres',
        ckb: '٢٠ مەتر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عند سرعة 30 كم/ساعة تُترك مسافة بحدود 10 أمتار.',
      en: 'At 30 km/h leave a gap of roughly 10 metres.',
      ckb: 'لە خێرایی ٣٠ کم/کاتژمێر نزیکەی ١٠ مەتر ماوە بهێڵەوە.',
    },
  },
  {
    id: 'q-night-driving-care',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٣٨' },
    prompt: {
      ar: 'القيادة الليلية تتطلب إهتماماً وحذراً أكثر من القيادة أثناء النهار بسبب؟',
      en: 'Night driving demands more care than daytime driving because:',
      ckb: 'لێخوڕین بە شەو زیاتر وریایی دەوێت لە ڕۆژ، چونکە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'محدودية الرؤية وفق ما توفر لك أضواء مركبتك',
        en: 'Vision is limited to what your vehicle\'s lights reach',
        ckb: 'بینین سنووردارە بەو ڕووناکییەی چراکانی ئۆتۆمبێلەکەت دەیدات',
      } },
      { id: 'b', text: {
        ar: 'زيادة عدد مستعملي الطريق في الليل',
        en: 'There are more road users at night',
        ckb: 'ژمارەی بەکارهێنەرانی ڕێگا بە شەو زیاترە',
      } },
      { id: 'c', text: {
        ar: 'انخفاض قدرة المركبات في الليل',
        en: 'Vehicles perform worse at night',
        ckb: 'توانای ئۆتۆمبێلەکان بە شەو کەمدەبێتەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'في الليل تقتصر الرؤية على المدى الذي تضيئه مصابيح المركبة.',
      en: 'At night you can only see as far as your headlights reach.',
      ckb: 'بە شەو بینین تەنها بەو ماوەیە دەبێت کە چراکان ڕووناکی دەکەنەوە.',
    },
  },
  {
    id: 'q-no-annual-inspection-penalty',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٣٩' },
    prompt: {
      ar: 'عدم تجديد الفحص الفني سنوياً عقوبتها؟',
      en: 'Failing to renew the annual technical inspection is punishable by:',
      ckb: 'نوێنەکردنەوەی پشکنینی تەکنیکی ساڵانە سزاکەی چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'c', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبة عدم تجديد الفحص الفني السنوي هي الغرامة.',
      en: 'The penalty for not renewing the annual inspection is a fine.',
      ckb: 'سزای نوێنەکردنەوەی پشکنینی ساڵانە غەرامەیە.',
    },
  },
  {
    id: 'q-legal-speed-definition',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٠' },
    prompt: {
      ar: 'السرعة المحددة قانونا في اى طريق؟',
      en: 'The legally prescribed speed on any road is:',
      ckb: 'خێرایی دیاریکراوی یاسایی لە هەر ڕێگایەکدا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'هي السرعة المسموح بها والمحددة بالاشارات المرورية في الظروف الطبيعيه',
        en: 'The speed permitted and set by the traffic signs under normal conditions',
        ckb: 'ئەو خێراییەیە کە ڕێپێدراوە و بە تابلۆکانی هاتوچۆ دیاریکراوە لە بارودۆخی ئاسایی',
      } },
      { id: 'b', text: {
        ar: 'هي السير بسرعة 80كم بداخل المدن و100كم في الطرق الخارجية',
        en: '80 km/h inside cities and 100 km/h on rural roads',
        ckb: '٨٠ کم لە ناو شار و ١٠٠ کم لە ڕێگا دەرەکییەکان',
      } },
      { id: 'c', text: {
        ar: 'هي السرعة التي احددها بنفسي اثناء القيادة وحسب المكان الذي اذهب اليه',
        en: 'Whatever speed I choose while driving, according to where I am going',
        ckb: 'ئەو خێراییەیە کە خۆم دیاری دەکەم',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'السرعة القانونية هي المحددة بالإشارات المرورية في الظروف الطبيعية.',
      en: 'The legal speed is the one set by traffic signs under normal conditions.',
      ckb: 'خێرایی یاسایی ئەوەیە کە تابلۆکانی هاتوچۆ لە بارودۆخی ئاساییدا دیاری دەکەن.',
    },
  },
  {
    id: 'q-no-vehicle-document-penalty',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٤١' },
    prompt: {
      ar: 'عدم تجديد وثيقة المركبة (السنوية) عقوبتها هي؟',
      en: 'Failing to renew the vehicle\'s annual document is punishable by:',
      ckb: 'نوێنەکردنەوەی بەڵگەنامەی ساڵانەی ئۆتۆمبێل سزاکەی چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة عدم تجديد وثيقة المركبة السنوية هي الغرامة.',
      en: 'The penalty for not renewing the annual vehicle document is a fine.',
      ckb: 'سزای نوێنەکردنەوەی بەڵگەنامەی ساڵانە غەرامەیە.',
    },
  },
  {
    id: 'q-continuous-white-lines-two-way',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'س ٤٢' },
    prompt: {
      ar: 'الخطوط البيضاء المستمرة في الطرق ذو الاتجاهين تعني؟',
      en: 'Continuous white lines on a two-way road mean:',
      ckb: 'هێڵە سپییە بەردەوامەکان لە ڕێگای دوو ئاراستەدا واتە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع اجتيازها على الإطلاق',
        en: 'Crossing them is absolutely prohibited',
        ckb: 'بە تەواوی قەدەغەیە بەسەریاندا بپەڕیت',
      } },
      { id: 'b', text: {
        ar: 'يمكن الاجتياز في حالة عدم وجود مركبة آتية',
        en: 'You may cross when no vehicle is coming',
        ckb: 'دەکرێت بپەڕیت ئەگەر ئۆتۆمبێل نەیەت',
      } },
      { id: 'c', text: {
        ar: 'يمكن الاجتياز في حالة توقف مركبة في المسار الذي تسلكه',
        en: 'You may cross when a vehicle is stopped in your lane',
        ckb: 'دەکرێت بپەڕیت ئەگەر ئۆتۆمبێلێک لە لاینەکەت وەستابێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخط الأبيض المستمر لا يجوز اجتيازه مطلقاً.',
      en: 'A continuous white line may never be crossed.',
      ckb: 'هێڵی سپی بەردەوام بە هیچ شێوەیەک نابێت بەسەریدا بپەڕیت.',
    },
  },
  {
    id: 'q-racing-public-roads',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٣' },
    prompt: {
      ar: 'هل يجوز المسابقة أو إجراء الفعاليات على الطرق العامة؟',
      en: 'May races or events be held on public roads?',
      ckb: 'ئایا ڕێپێدراوە پێشبڕکێ یان چالاکی لەسەر ڕێگا گشتییەکان ئەنجام بدرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا يجوز بشكل مطلق على الطرق العامة',
        en: 'Absolutely not on public roads',
        ckb: 'بە تەواوی قەدەغەیە لەسەر ڕێگا گشتییەکان',
      } },
      { id: 'b', text: {
        ar: 'يجوز للمركبات الرياضية',
        en: 'Permitted for sports vehicles',
        ckb: 'بۆ ئۆتۆمبێلە وەرزشییەکان ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يجوز في ساحات الوقوف',
        en: 'Permitted in car parks',
        ckb: 'لە شوێنی وەستاندا ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُمنع المسابقات والفعاليات على الطرق العامة منعاً مطلقاً.',
      en: 'Races and events are absolutely prohibited on public roads.',
      ckb: 'پێشبڕکێ و چالاکی لەسەر ڕێگا گشتییەکان بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-blind-pedestrian-crossing',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٤٤' },
    prompt: {
      ar: 'عند رؤية شخص كفيف (فاقد البصر) أو شخص يساعده في عبور الشارع يجب أن؟',
      en: 'On seeing a blind person, or someone helping them cross the street, you must:',
      ckb: 'کاتێک کەسێکی نابینا یان کەسێک کە یارمەتی دەدات لە پەڕینەوەی شەقام دەبینیت، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تتوقف كاملاً وتسمح له بالعبور',
        en: 'Stop completely and let them cross',
        ckb: 'بە تەواوی بوەستیت و ڕێگای بدەیت بپەڕێتەوە',
      } },
      { id: 'b', text: {
        ar: 'تخفض سرعة المركبة وتسمح له بالعبور',
        en: 'Slow down and let them cross',
        ckb: 'خێرایی کەم بکەیتەوە و ڕێگای بدەیت',
      } },
      { id: 'c', text: {
        ar: 'تستمر في السير وتقود المركبة بحذر إستعداداً للتوقف المفاجئ',
        en: 'Continue driving carefully, ready to stop suddenly',
        ckb: 'بە وریاییەوە بەردەوام بیت و ئامادەبیت بۆ وەستانی لەناکاو',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب التوقف التام لتمكين الكفيف من العبور بأمان.',
      en: 'You must come to a full stop so the blind pedestrian can cross safely.',
      ckb: 'دەبێت بە تەواوی بوەستیت تا کەسە نابیناکە بە سەلامەتی بپەڕێتەوە.',
    },
  },
  {
    id: 'q-horn-when-and-how',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٥' },
    prompt: {
      ar: 'متى وكيف يجب إستخدام المنبه (الهورن)؟',
      en: 'When and how should the horn be used?',
      ckb: 'کەی و چۆن دەبێت بۆری (هۆرن) بەکاربهێنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يستخدم الهورن في حالات الضرورة القصوى والتي تستدعي تنبيه الاخرين ولمرة واحدة ولفترة قصيرة',
        en: 'Only in cases of extreme necessity that require warning others, once and briefly',
        ckb: 'تەنها لە کاتی پێویستی زۆردا کە پێویستی بە ئاگادارکردنەوەی کەسانی تر هەیە، یەک جار و بۆ ماوەیەکی کورت',
      } },
      { id: 'b', text: {
        ar: 'يستخدم لتنبيه السائقين المخالفين بمخالفتهم',
        en: 'To tell offending drivers about their offence',
        ckb: 'بۆ ئاگادارکردنەوەی شۆفێرە سەرپێچیکەرەکان',
      } },
      { id: 'c', text: {
        ar: 'يستخدم للسلام أو الشكر أو إستدعاء أحد',
        en: 'To greet, thank or call someone',
        ckb: 'بۆ سڵاو یان سوپاس یان بانگکردنی کەسێک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يقتصر استعمال المنبه على الضرورة القصوى، ولمرة واحدة ولفترة قصيرة.',
      en: 'The horn is for extreme necessity only: one short sound.',
      ckb: 'بۆری تەنها بۆ پێویستی زۆرە، یەک جار و بە کورتی.',
    },
  },
  {
    id: 'q-night-speed-dual-carriageway',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٦' },
    prompt: {
      ar: 'أعلى سرعة قيادة المركبات بإختلاف أنواعها ليلاً في الطرق المزدوجة هي؟',
      en: 'At night on dual carriageways, the maximum speed for vehicles of every type is:',
      ckb: 'بەرزترین خێرایی بە شەو لە ڕێگا دووانییەکاندا بۆ هەموو جۆرەکانی ئۆتۆمبێل:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نصف السرعة المحددة قانوناً لذلك الطريق',
        en: 'Half the speed legally set for that road',
        ckb: 'نیوەی ئەو خێراییەی بە یاسا بۆ ئەو ڕێگایە دیاریکراوە',
      } },
      { id: 'b', text: {
        ar: 'نفس السرعة المحددة قانوناً',
        en: 'The same as the legally set speed',
        ckb: 'هەمان خێرایی یاسایی',
      } },
      { id: 'c', text: {
        ar: '80كم / ساعة',
        en: '80 km/h',
        ckb: '٨٠ کم/کاتژمێر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'ليلاً تُخفض السرعة إلى نصف السرعة المحددة قانوناً للطريق المزدوج.',
      en: 'At night the limit drops to half the road\'s legal speed.',
      ckb: 'بە شەو خێرایی دەبێتە نیوەی خێرایی یاسایی ڕێگاکە.',
    },
  },
  {
    id: 'q-obscured-junction',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٧' },
    prompt: {
      ar: 'التقاطعات التي تحجبها الاشجار والمباني تقلل الرؤية عليك:',
      en: 'At junctions where trees and buildings block your view you must:',
      ckb: 'لەو چوارڕیانانەی درەخت و بینا بینین کەم دەکەنەوە، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التوقف عند بداية التقاطع وتتأكد من خلو الشارع وتتقدم ببطء لتجاوز التقاطع',
        en: 'Stop at the start of the junction, check the road is clear, then move forward slowly to cross',
        ckb: 'لە سەرەتای چوارڕیانەکە بوەستیت، دڵنیابیت لە بەتاڵی ڕێگاکە و بە هێواشی بڕۆیت',
      } },
      { id: 'b', text: {
        ar: 'تبطئ السرعة وتتجاوز التقاطع',
        en: 'Slow down and cross the junction',
        ckb: 'خێرایی کەم بکەیتەوە و بپەڕیتەوە',
      } },
      { id: 'c', text: {
        ar: 'تستعمل المنبه الهورن للتحذير وتتجاوز التقاطع',
        en: 'Sound the horn as a warning and cross the junction',
        ckb: 'بۆری لێبدەیت و بپەڕیتەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عند انعدام الرؤية يجب التوقف والتأكد قبل التقدم ببطء.',
      en: 'Where the view is blocked, stop and check before creeping forward.',
      ckb: 'لە شوێنی بینین کەم، بوەستە و دڵنیابە پێش ئەوەی بە هێواشی بڕۆیت.',
    },
  },
  {
    id: 'q-max-speed-small-vehicles',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٨' },
    prompt: {
      ar: 'أقصى سرعة لقيادة المركبات الصغيرة',
      en: 'The maximum driving speed for small vehicles is:',
      ckb: 'بەرزترین خێرایی بۆ ئۆتۆمبێلە بچووکەکان:',
    },
    choices: [
      { id: 'a', text: {
        ar: '90كم / ساعة',
        en: '90 km/h',
        ckb: '٩٠ کم/کاتژمێر',
      } },
      { id: 'b', text: {
        ar: '100كم / ساعة',
        en: '100 km/h',
        ckb: '١٠٠ کم/کاتژمێر',
      } },
      { id: 'c', text: {
        ar: '120كم / ساعة',
        en: '120 km/h',
        ckb: '١٢٠ کم/کاتژمێر',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'أقصى سرعة للمركبات الصغيرة 100 كم/ساعة.',
      en: 'The maximum for small vehicles is 100 km/h.',
      ckb: 'بەرزترین خێرایی بۆ ئۆتۆمبێلە بچووکەکان ١٠٠ کم/کاتژمێرە.',
    },
  },
  {
    id: 'q-expressway-speed-kurdistan',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٤٩' },
    prompt: {
      ar: 'ما هي اقصى سرعة مسموح بها للمركبات في الطرق السريعة في إقليم كوردستان؟',
      en: 'What is the maximum speed allowed on expressways in the Kurdistan Region?',
      ckb: 'بەرزترین خێرایی ڕێپێدراو لە ڕێگا خێراکانی هەرێمی کوردستان چەندە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا توجد سرعة محددة ممكن القيادة بأية سرعة',
        en: 'There is no set speed; you may drive at any speed',
        ckb: 'خێرایی دیاریکراو نییە، بە هەر خێراییەک دەکرێت',
      } },
      { id: 'b', text: {
        ar: 'سرعة 110 كم/ساعة للمركبات الصغيرة و 80 كم/ساعة للشاحنات في الطرق السريعة',
        en: '110 km/h for small vehicles and 80 km/h for lorries on expressways',
        ckb: '١١٠ کم/کاتژمێر بۆ ئۆتۆمبێلە بچووکەکان و ٨٠ کم/کاتژمێر بۆ بارهەڵگرەکان',
      } },
      { id: 'c', text: {
        ar: 'سرعة 80 كم/ساعة لجميع المركبات',
        en: '80 km/h for all vehicles',
        ckb: '٨٠ کم/کاتژمێر بۆ هەموو ئۆتۆمبێلەکان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: '110 كم/ساعة للمركبات الصغيرة و80 كم/ساعة للشاحنات على الطرق السريعة.',
      en: '110 km/h for small vehicles and 80 km/h for lorries on expressways.',
      ckb: '١١٠ کم/کاتژمێر بۆ ئۆتۆمبێلە بچووکەکان و ٨٠ بۆ بارهەڵگرەکان.',
    },
  },
  {
    id: 'q-mountain-road-hot-brakes',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٥٠' },
    prompt: {
      ar: 'في الطرق الجبلية يلزم استخدام الفرامل باستمرار ونتيجة لذلك تسخن؟مالذي يجب القيام به في هذه الحالة؟',
      en: 'On mountain roads the brakes are used constantly and overheat. What should you do?',
      ckb: 'لە ڕێگا شاخاوییەکاندا بەردەوام برێک بەکاردەهێنرێت و گەرم دەبێت. دەبێت چی بکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تستمر في القيادة بسرعة اكبر لتبرد ديسكات الفرامل',
        en: 'Drive faster so the brake discs cool down',
        ckb: 'بە خێراتر لێبخوڕە بۆ ئەوەی برێکەکان سارد ببنەوە',
      } },
      { id: 'b', text: {
        ar: 'تتوقف وتنتظر الى ان تبرد الفرامل',
        en: 'Stop and wait until the brakes cool',
        ckb: 'بوەستە و چاوەڕێبکە تا برێکەکان سارد دەبنەوە',
      } },
      { id: 'c', text: {
        ar: 'استعمال الهاندبريك الى ان تبرد الفرامل بشكل كامل',
        en: 'Use the handbrake until the brakes have fully cooled',
        ckb: 'هاندبرێک بەکاربهێنە تا برێکەکان بە تەواوی سارد دەبنەوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'عند سخونة الفرامل يجب التوقف وانتظار بردها قبل المتابعة.',
      en: 'When the brakes overheat, stop and let them cool before continuing.',
      ckb: 'کاتێک برێک گەرم دەبێت، بوەستە و چاوەڕێی ساردبوونەوەی بکە.',
    },
  },
  {
    id: 'q-main-road-priority',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٥١' },
    prompt: {
      ar: 'اسبقية المرور ل؟',
      en: 'Right of way belongs to:',
      ckb: 'مافی پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة التي تسير في الطريق الفرعي على الطريق الرئيسي',
        en: 'The vehicle on the side road over the main road',
        ckb: 'ئۆتۆمبێلی ڕێگای لاوەکی بەسەر ڕێگای سەرەکیدا',
      } },
      { id: 'b', text: {
        ar: 'المركبة الواقفة على المركبة السائرة',
        en: 'A stopped vehicle over a moving one',
        ckb: 'ئۆتۆمبێلی وەستاو بەسەر ئۆتۆمبێلی ڕۆیشتوودا',
      } },
      { id: 'c', text: {
        ar: 'المركبة التي تسير في الطريق الرئيسي على التي تسير في الطريق الفرعي',
        en: 'The vehicle on the main road over the one on the side road',
        ckb: 'ئۆتۆمبێلی ڕێگای سەرەکی بەسەر ئەوەی ڕێگای لاوەکی',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الأسبقية للمركبة السائرة في الطريق الرئيسي.',
      en: 'Priority goes to the vehicle travelling on the main road.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی ڕێگای سەرەکییە.',
    },
  },
  {
    id: 'q-rejoining-traffic-after-stop',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٥٢' },
    prompt: {
      ar: 'عند محاولة الدخول لمسار السير في أي طريق في حالة التوقف يجب أن:',
      en: 'When pulling out into the traffic lane from a stop you must:',
      ckb: 'کاتێک لە وەستانەوە دەچیتەوە ناو لاینی هاتوچۆ، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تشغل اضوية التحذير الرباعية لتنبيه المركبات التي تسير على الطريق',
        en: 'Switch on the hazard lights to warn vehicles on the road',
        ckb: 'چرا ئاگادارکەرەوە چوارەکان دابگیرسێنیت',
      } },
      { id: 'b', text: {
        ar: 'تشغل الاشارة الضوئية نحو اليمين بعد التأكد من خلو الطريق (مسلك أقصى اليمين للسير)',
        en: 'Signal right after checking the road is clear (the far right lane)',
        ckb: 'دوای دڵنیابوون لە بەتاڵی ڕێگا، ئاماژەی ڕاست بدەیت (لاینی دوورترین ڕاست)',
      } },
      { id: 'c', text: {
        ar: 'تشغيل الاشارة الضوئية اليسار والدخول مباشرةً الى مسلك الطريق',
        en: 'Signal left and pull straight out into the lane',
        ckb: 'ئاماژەی چەپ بدەیت و ڕاستەوخۆ بچیتە ناو لاینەکە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُشغّل مؤشر اليمين بعد التأكد من خلو الطريق قبل الدخول.',
      en: 'Signal right after checking the road is clear, then join.',
      ckb: 'دوای دڵنیابوون لە بەتاڵی ڕێگا ئاماژەی ڕاست بدە و بچۆ ناوی.',
    },
  },
  {
    id: 'q-median-island-pedestrians',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٥٣' },
    prompt: {
      ar: 'في حالة وجود جزرة وسطية في الطريق على المشاة الذين يرومون العبور في مناطق عبور المشاة؟',
      en: 'Where the road has a central island, pedestrians wishing to cross at a crossing should:',
      ckb: 'ئەگەر دوورگەی ناوەڕاست لە ڕێگادا هەبێت، پیادەکانی پەڕینەوە دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'العبور بسرعة للوصول للجزرة الوسطية',
        en: 'Cross quickly to reach the central island',
        ckb: 'بە خێرایی بپەڕنەوە بۆ گەیشتن بە دوورگەکە',
      } },
      { id: 'b', text: {
        ar: 'العبور الى الجزرة الوسطية بعد التأكد من خلو الطريق من المركبات كمرحلة اولى والانتظار للتأكد من خلو الطريق في الجهة الاخرى من المركبات وإكمال العبور',
        en: 'Cross to the central island once the road is clear as a first stage, then wait until the other side is clear and complete the crossing',
        ckb: 'وەک قۆناغی یەکەم دوای دڵنیابوون لە بەتاڵی ڕێگا بپەڕنە دوورگەی ناوەڕاست، پاشان چاوەڕێ بکەن تا لای تریش بەتاڵ بێت و پەڕینەوەکە تەواو بکەن',
      } },
      { id: 'c', text: {
        ar: 'العبور من أوسع منطقة في الطريق',
        en: 'Cross at the widest part of the road',
        ckb: 'لە فراوانترین شوێنی ڕێگا بپەڕنەوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يتم العبور على مرحلتين: إلى الجزرة الوسطية أولاً ثم إكمال العبور بعد التأكد.',
      en: 'Cross in two stages: to the central island first, then complete once clear.',
      ckb: 'بە دوو قۆناغ بپەڕەوە: سەرەتا بۆ دوورگەی ناوەڕاست، پاشان تەواوی بکە.',
    },
  },
  {
    id: 'q-driver-conduct-pedestrians',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٥٤' },
    prompt: {
      ar: 'سلوك السائقين تجاه المشاة يجب ان تكون؟',
      en: 'A driver\'s conduct towards pedestrians must be:',
      ckb: 'ڕەفتاری شۆفێران بەرامبەر پیادەکان دەبێت چۆن بێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اعطاء الاسبقيه للمشاة بالعبور و يجب إيقاف المركبة بشكل تام لحين إتمام العبور',
        en: 'Give pedestrians right of way and stop the vehicle completely until they have finished crossing',
        ckb: 'مافی پێشینەیی بدرێت بە پیادەکان و ئۆتۆمبێل بە تەواوی بوەستێت تا پەڕینەوەکە تەواو دەبێت',
      } },
      { id: 'b', text: {
        ar: 'اعطاء الاسبقيه لسائقي المركبات',
        en: 'Give right of way to vehicle drivers',
        ckb: 'مافی پێشینەیی بدرێت بە شۆفێرانی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الاسبقيه للواقفين على الرصيف',
        en: 'Priority goes to those standing on the pavement',
        ckb: 'پێشینەیی بۆ ئەوانەیە کە لەسەر ڕێڕەوی پیادە وەستاون',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُعطى الأسبقية للمشاة مع الإيقاف التام حتى إتمام العبور.',
      en: 'Pedestrians get right of way, and you stop completely until they have crossed.',
      ckb: 'پێشینەیی بۆ پیادەکانە و بە تەواوی دەوەستیت تا دەپەڕنەوە.',
    },
  },
  {
    id: 'q-temporary-customs-plates',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٥٥' },
    prompt: {
      ar: 'المركبات التي تحمل لوحات (فحص كمركي مؤقت) تمنع من السير في إقليم كوردستان / العراق بعد مرور مدة؟',
      en: 'Vehicles on temporary customs-inspection plates are barred from driving in the Kurdistan Region / Iraq after:',
      ckb: 'ئەو ئۆتۆمبێلانەی پلێتی (پشکنینی گومرگی کاتی) هەڵدەگرن، دوای چەند ماوەیەک لە هەرێمی کوردستان/عێراق لە ڕۆیشتن قەدەغە دەکرێن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ستون يوماً من تاريخ توقيع عقد الشراء',
        en: 'Sixty days from the date the purchase contract was signed',
        ckb: 'شەست ڕۆژ لە بەرواری واژووکردنی گرێبەستی کڕین',
      } },
      { id: 'b', text: {
        ar: 'ثلاثون يوماً من تاريخ عقد الشراء',
        en: 'Thirty days from the date of the purchase contract',
        ckb: 'سی ڕۆژ لە بەرواری گرێبەستی کڕین',
      } },
      { id: 'c', text: {
        ar: 'تسعون يوماً من تاريخ عقد الشراء',
        en: 'Ninety days from the date of the purchase contract',
        ckb: 'نەوەد ڕۆژ لە بەرواری گرێبەستی کڕین',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'المدة ستون يوماً من تاريخ توقيع عقد الشراء.',
      en: 'The period is sixty days from the signing of the purchase contract.',
      ckb: 'ماوەکە شەست ڕۆژە لە واژووکردنی گرێبەستی کڕین.',
    },
  },
  {
    id: 'q-illegal-parking-causing-accident',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٥٦' },
    prompt: {
      ar: 'عقوبة من يوقف مركبته في مكان يمنع الوقوف ويؤدي الى حادثة؟',
      en: 'The penalty for parking where parking is prohibited and thereby causing an accident is:',
      ckb: 'سزای ئەو کەسەی ئۆتۆمبێلەکەی لە شوێنێکی قەدەغەدا دەوەستێنێت و دەبێتە هۆی ڕووداو:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الغرامة وحجز المركبة',
        en: 'A fine and impounding the vehicle',
        ckb: 'غەرامە و دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العقوبة هي الغرامة بحسب دليل الأسئلة الرسمي.',
      en: 'The official guide gives the penalty as a fine.',
      ckb: 'بەپێی ڕێنمایی فەرمی، سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-side-mirror-adjustment',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٥٧' },
    prompt: {
      ar: 'عليك ضبط المرايا الجانبية لمركبتك بالشكل التالي؟',
      en: 'You should adjust your vehicle\'s side mirrors so that:',
      ckb: 'دەبێت ئاوێنە لاتەنیشتەکانی ئۆتۆمبێلەکەت بەم شێوەیە ڕێک بخەیت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ان ترى الاطارات الخلفية لمركبتك وأنت جالس في مقعد السياقة',
        en: 'You can see your rear tyres while sitting in the driver\'s seat',
        ckb: 'تایە دواوەکان ببینیت لە کاتی دانیشتن لە شوێنی لێخوڕین',
      } },
      { id: 'b', text: {
        ar: 'ان ترى النوافذ الخلفية لمركبتك وأنت جالس في مقعد السياقة',
        en: 'You can see your rear windows while sitting in the driver\'s seat',
        ckb: 'پەنجەرە دواوەکان ببینیت',
      } },
      { id: 'c', text: {
        ar: 'أن ترى اكبر قدر من الطريق واقل قدر من جانبي مركبتك',
        en: 'You see as much of the road and as little of your own vehicle\'s sides as possible',
        ckb: 'زۆرترین بەشی ڕێگا و کەمترین بەشی لاتەنیشتی ئۆتۆمبێلەکەت ببینیت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تُضبط المرايا لرؤية أكبر قدر من الطريق وأقل قدر من جسم المركبة.',
      en: 'Set the mirrors to show as much road and as little of your own car as possible.',
      ckb: 'ئاوێنەکان ڕێک بخە بۆ بینینی زۆرترین ڕێگا و کەمترین لەشی ئۆتۆمبێل.',
    },
  },
  {
    id: 'q-stopping-on-expressway',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٥٨' },
    prompt: {
      ar: 'هل يجوز التوقف في الطرق السريعة لصعود وإنزال الركاب؟',
      en: 'May you stop on an expressway to pick up or set down passengers?',
      ckb: 'ئایا ڕێپێدراوە لە ڕێگا خێراکاندا بۆ سەرکەوتن و دابەزینی سەرنشین بوەستیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مسموح فقط في ساعات النهار',
        en: 'Allowed during daylight hours only',
        ckb: 'تەنها لە کاتژمێرەکانی ڕۆژدا ڕێپێدراوە',
      } },
      { id: 'b', text: {
        ar: 'مسموح عند التوقف في أماكن التوقف',
        en: 'Allowed when stopping in designated stopping places',
        ckb: 'لە شوێنە دیاریکراوەکانی وەستاندا ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع منعاً باتاً',
        en: 'Strictly prohibited',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'التوقف على الطرق السريعة لصعود الركاب أو إنزالهم ممنوع منعاً باتاً.',
      en: 'Stopping on an expressway for passengers is strictly prohibited.',
      ckb: 'وەستان لە ڕێگا خێراکاندا بۆ سەرنشین بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-front-tyre-blowout',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٥٩' },
    prompt: {
      ar: 'ما هي الاجراءات التي تقوم بها حال إنفجار الاطار الامامي لمركبتك؟',
      en: 'What should you do if your front tyre blows out?',
      ckb: 'ئەگەر تایەی پێشەوەی ئۆتۆمبێلەکەت تەقییەوە چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إضغط على دواسة الوقود لحظة الانفجار لثوان وارفع قدمك بعدها تدريجياً وابقي كلتا يديك ممسكة بالمقود (الستيرن) للسيطرة على المركبة ولا تحاول الضغط على الموقف قدر الامكان',
        en: 'Press the accelerator for a moment at the blowout, then lift your foot gradually, keep both hands on the steering wheel to control the vehicle, and avoid braking as far as possible',
        ckb: 'لە ساتی تەقینەوەدا چەند چرکەیەک پێ بنێ بەسەر پێدانی سووتەمەنی، پاشان بە پلە پێت هەڵبگرە و هەردوو دەستت لەسەر ئستێرن بهێڵەوە و تا دەکرێت برێک مەگرە',
      } },
      { id: 'b', text: {
        ar: 'إستخدم الموقف اليدوي (الهاندبريك)',
        en: 'Use the handbrake',
        ckb: 'هاندبرێک بەکاربهێنە',
      } },
      { id: 'c', text: {
        ar: 'إستخدم عتلة تبديل الكير',
        en: 'Use the gear lever',
        ckb: 'قۆڵی گێڕ بەکاربهێنە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُحافظ على السيطرة بالمقود ويُتجنب الكبح المفاجئ عند انفجار الإطار الأمامي.',
      en: 'Keep control with the steering wheel and avoid sudden braking on a front blowout.',
      ckb: 'بە ئستێرن کۆنترۆڵ بکە و لە برێکی لەناکاو دووربکەوە.',
    },
  },
  {
    id: 'q-where-parking-prohibited',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٦٠' },
    prompt: {
      ar: 'اي من هذه الاماكن يمنع فيها وقوف المركبات؟',
      en: 'In which of these places is parking prohibited?',
      ckb: 'لە کام لەم شوێنانەدا وەستانی ئۆتۆمبێل قەدەغەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في مناطق الاستدارة والانفاق وعلى ممرات عبور المشاة',
        en: 'At turning areas, in tunnels and on pedestrian crossings',
        ckb: 'لە ناوچەی سووڕانەوە و تونێل و لەسەر پەڕینەوەی پیادە',
      } },
      { id: 'b', text: {
        ar: 'في الطرق الخارجية',
        en: 'On rural roads',
        ckb: 'لە ڕێگا دەرەکییەکان',
      } },
      { id: 'c', text: {
        ar: 'مواقف المركبات',
        en: 'In car parks',
        ckb: 'لە شوێنی وەستانی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يمنع الوقوف في مناطق الاستدارة والأنفاق وعلى ممرات المشاة.',
      en: 'Parking is prohibited at turning areas, tunnels and pedestrian crossings.',
      ckb: 'وەستان لە ناوچەی سووڕانەوە و تونێل و پەڕینەوەی پیادە قەدەغەیە.',
    },
  },
  {
    id: 'q-avoiding-skid',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٦١' },
    prompt: {
      ar: 'لتلافي تأثير انزلاق المركبة على الطريق أثناء حدوثه عليك؟',
      en: 'To counter a skid while it is happening you should:',
      ckb: 'بۆ ڕووبەڕووبوونەوەی خلیسکانی ئۆتۆمبێل لە کاتی ڕوودانیدا، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خفض سرعة مركبتك برفع قدمك من على دواسة الوقود وعدم الضغط على دواسة الموقف بقوة',
        en: 'Reduce speed by lifting your foot off the accelerator and not braking hard',
        ckb: 'خێرایی کەم بکەیتەوە بە هەڵگرتنی پێت لەسەر پێدانی سووتەمەنی و برێکی بەهێز مەگرە',
      } },
      { id: 'b', text: {
        ar: 'إستعمل الموقف اليدوي (الهاندبريك)',
        en: 'Use the handbrake',
        ckb: 'هاندبرێک بەکاربهێنە',
      } },
      { id: 'c', text: {
        ar: 'أدر مقود المركبة (السكان) عكس إتجاه الانزلاق',
        en: 'Turn the steering wheel against the direction of the skid',
        ckb: 'ئستێرن بە پێچەوانەی ئاراستەی خلیسکانەکە بسووڕێنە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُرفع القدم عن دواسة الوقود دون كبح عنيف عند الانزلاق.',
      en: 'Lift off the accelerator and avoid harsh braking in a skid.',
      ckb: 'پێت لەسەر پێدانی سووتەمەنی هەڵبگرە و برێکی توند مەگرە.',
    },
  },
  {
    id: 'q-rear-tyre-blowout',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٦٢' },
    prompt: {
      ar: 'ما هي الاجراءات التي تقوم بها حال إنفجار الاطار الخلفي لمركبتك؟',
      en: 'What should you do if your rear tyre blows out?',
      ckb: 'ئەگەر تایەی دواوەی ئۆتۆمبێلەکەت تەقییەوە چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'السيطرة على عجلة القيادة (الستيرن) بقوة وحاول تقليل سرعة المركبة تدريجياً وتوجيه المركبة نحو اليمين بإتجاه كتف الطريق مراعياً المركبات اللاحقة بك والمقابلة',
        en: 'Hold the steering wheel firmly, reduce speed gradually and steer right towards the hard shoulder, watching for vehicles behind and oncoming',
        ckb: 'ئستێرن بە توندی بگرە و بە پلە خێرایی کەم بکەرەوە و بەرەو ڕاست بۆ شانی ڕێگا بیبە، لەگەڵ ئاگاداری ئۆتۆمبێلەکانی دواوە و بەرامبەر',
      } },
      { id: 'b', text: {
        ar: 'الضغط بقوة على الموقف وتوجيه المركبة نحو اليمين',
        en: 'Brake hard and steer the vehicle to the right',
        ckb: 'بە توندی برێک بگرە و بەرەو ڕاست بیبە',
      } },
      { id: 'c', text: {
        ar: 'توجيه الستيرن بإتجاه الاطار المنفجرة',
        en: 'Steer towards the blown tyre',
        ckb: 'ئستێرن بەرەو تایە تەقیوەکە بسووڕێنە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُمسك المقود بإحكام وتُخفض السرعة تدريجياً مع التوجه نحو كتف الطريق.',
      en: 'Grip the wheel, slow gradually and move to the hard shoulder.',
      ckb: 'ئستێرن توند بگرە، بە پلە خێرایی کەم بکەرەوە و بەرەو شانی ڕێگا بڕۆ.',
    },
  },
  {
    id: 'q-parking-on-expressway-allowed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٦٣' },
    prompt: {
      ar: 'هل يجوز إيقاف أو وقوف المركبات في الطرق السريعه؟',
      en: 'May vehicles stop or park on expressways?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل لە ڕێگا خێراکاندا بوەستێت یان پارک بکات؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يجوز في الاماكن المخصصة للوقوف أو التوقف في الطرق السريعة',
        en: 'Yes, in the places designated for parking or stopping on expressways',
        ckb: 'بەڵێ، لەو شوێنانەی بۆ وەستان دیاریکراون لە ڕێگا خێراکان',
      } },
      { id: 'b', text: {
        ar: 'نعم يجوز الايقاف أو الوقوف في ممر مركبات الطوارئ',
        en: 'Yes, stopping or parking in the emergency-vehicle lane is allowed',
        ckb: 'بەڵێ، لە لاینی ئۆتۆمبێلی فریاگوزاری ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'نعم يجوز إيقاف المركبات في المناطق المجهزة بعلامات مرورية لمنع الوقوف',
        en: 'Yes, vehicles may stop in areas signed as no-parking',
        ckb: 'بەڵێ، لەو ناوچانەی تابلۆی قەدەغەی وەستانیان هەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الوقوف مسموح فقط في الأماكن المخصصة له على الطرق السريعة.',
      en: 'Stopping is only allowed in the designated places on an expressway.',
      ckb: 'وەستان تەنها لە شوێنە دیاریکراوەکاندا ڕێپێدراوە.',
    },
  },
  {
    id: 'q-air-filter-service',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٦٤' },
    prompt: {
      ar: 'ينظف أو يبدل مصفي الهواء (فلتر الشوتة)',
      en: 'The air filter should be cleaned or replaced:',
      ckb: 'فلتەری هەوا کەی پاک دەکرێتەوە یان دەگۆڕدرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'كل 5000 كم',
        en: 'Every 5,000 km',
        ckb: 'هەر ٥٠٠٠ کم',
      } },
      { id: 'b', text: {
        ar: 'كل 10000كم',
        en: 'Every 10,000 km',
        ckb: 'هەر ١٠٠٠٠ کم',
      } },
      { id: 'c', text: {
        ar: 'ينظف دورياً حسب البيئة التي تستخدم فيها المركبة باعتماد مواصفات المركبة',
        en: 'Periodically, according to the environment the vehicle is used in and the vehicle\'s specifications',
        ckb: 'بە شێوەی خولی بەپێی ئەو ژینگەیەی ئۆتۆمبێلەکە تێیدا بەکاردەهێنرێت و تایبەتمەندییەکانی',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'ينظف دورياً وفق بيئة الاستعمال ومواصفات المركبة.',
      en: 'Clean it periodically according to the operating environment and the vehicle\'s specification.',
      ckb: 'بە خولی بەپێی ژینگەی بەکارهێنان و تایبەتمەندی ئۆتۆمبێلەکە.',
    },
  },
  {
    id: 'q-required-documents-when-driving',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٦٥' },
    prompt: {
      ar: 'ما هي أهم الوثائق التي يجب توفرها في المركبة أثناء قيادتك لها؟',
      en: 'Which documents must be in the vehicle while you are driving it?',
      ckb: 'گرنگترین بەڵگەنامەکان کە دەبێت لە ئۆتۆمبێلدا هەبن لە کاتی لێخوڕین:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'رخصة قيادة المركبة، سارية المفعول ولنفس صنف المركبة مع سنوية المركبة ويجب ان تكون سارية المفعول',
        en: 'A valid driving licence for that class of vehicle, plus the vehicle\'s valid annual document',
        ckb: 'مۆڵەتی لێخوڕینی کارا بۆ هەمان جۆری ئۆتۆمبێل، لەگەڵ بەڵگەنامەی ساڵانەی کارای ئۆتۆمبێلەکە',
      } },
      { id: 'b', text: {
        ar: 'هوية الاحوال الشخصية والجنسية العراقية',
        en: 'The civil status identity card and the Iraqi nationality certificate',
        ckb: 'ناسنامەی بارودۆخی شارستانی و ڕەگەزنامەی عێراقی',
      } },
      { id: 'c', text: {
        ar: 'كاتالوك المركبة',
        en: 'The vehicle\'s handbook',
        ckb: 'کاتالۆگی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب حمل إجازة سوق سارية لنفس الصنف مع سنوية المركبة السارية.',
      en: 'Carry a valid licence for that vehicle class together with the vehicle\'s valid annual document.',
      ckb: 'مۆڵەتی کارا بۆ هەمان جۆر لەگەڵ بەڵگەنامەی ساڵانەی کارا.',
    },
  },
  {
    id: 'q-motorcycle-protective-gear',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٦٦' },
    prompt: {
      ar: 'سائق الدراجة النارية عليه استخدام مايلي؟',
      en: 'A motorcyclist must use:',
      ckb: 'شۆفێری ماتۆڕسکیل دەبێت ئەمانە بەکاربهێنێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خوذة خاصة لقيادة الدراجة مع نظارات و واقيات للركبة واليد',
        en: 'A proper motorcycle helmet with goggles and knee and hand protectors',
        ckb: 'کڵاوی پارێزەری تایبەت بە ماتۆڕسکیل لەگەڵ چاویلکە و پارێزەری ئەژنۆ و دەست',
      } },
      { id: 'b', text: {
        ar: 'فقط حذاء خاص بقيادة الدراجات',
        en: 'Only special motorcycling boots',
        ckb: 'تەنها پێڵاوی تایبەت بە ماتۆڕسکیل',
      } },
      { id: 'c', text: {
        ar: 'ملابس إعتيادية مع غطاء رأس إعتيادي',
        en: 'Ordinary clothes with an ordinary head covering',
        ckb: 'جلی ئاسایی لەگەڵ سەرپۆشی ئاسایی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يلزم ارتداء خوذة مع نظارات وواقيات للركبة واليد.',
      en: 'A helmet with goggles and knee and hand protection is required.',
      ckb: 'کڵاوی پارێزەر لەگەڵ چاویلکە و پارێزەری ئەژنۆ و دەست پێویستە.',
    },
  },
  {
    id: 'q-writing-on-vehicle-body',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٦٧' },
    prompt: {
      ar: 'لا يجوز كتابة أي كلمات أو جمل على المركبات غير تلك الواجبة بحكم التعليمات على هيكل المركبة؟',
      en: 'No words or sentences may be written on a vehicle body other than those required by the regulations:',
      ckb: 'نابێت هیچ وشە یان ڕستەیەک لەسەر لەشی ئۆتۆمبێل بنووسرێت جگە لەوانەی بەپێی ڕێنماییەکان پێویستن:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'على المركبات الخصوصي',
        en: 'On private vehicles',
        ckb: 'لەسەر ئۆتۆمبێلی تایبەت',
      } },
      { id: 'b', text: {
        ar: 'على المركبات التاكسي',
        en: 'On taxis',
        ckb: 'لەسەر تاکسی',
      } },
      { id: 'c', text: {
        ar: 'على الشاحنات حسب التعليمات',
        en: 'On lorries, as the regulations require',
        ckb: 'لەسەر بارهەڵگرەکان بەپێی ڕێنماییەکان',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُسمح بالكتابة على الشاحنات وفق التعليمات فقط.',
      en: 'Writing is permitted on lorries only as the regulations prescribe.',
      ckb: 'نووسین تەنها لەسەر بارهەڵگرەکان بەپێی ڕێنمایی ڕێپێدراوە.',
    },
  },
  {
    id: 'q-abnormal-vehicle-noise',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٦٨' },
    prompt: {
      ar: 'ماذا يتوجب عليك عمله إذا أصدرت مركبتك ضوضاء غير اعتيادية؟',
      en: 'What must you do if your vehicle makes an abnormal noise?',
      ckb: 'ئەگەر ئۆتۆمبێلەکەت دەنگێکی نائاسایی دەرکرد، دەبێت چی بکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا يجوز سياقة مركبة تصدر عنها ضوضاء غير اعتيادي',
        en: 'A vehicle that makes an abnormal noise may not be driven',
        ckb: 'نابێت ئۆتۆمبێلێک لێبخوڕدرێت کە دەنگی نائاسایی لێدێت',
      } },
      { id: 'b', text: {
        ar: 'مسموح سياقة مركبة تصدر عنها ضوضاء غير اعتيادي وبدون أي قيد',
        en: 'Driving it is allowed with no restriction',
        ckb: 'بێ هیچ مەرجێک ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'مسموح سياقة مركبة تصدر عنها ضوضاء غير اعتيادي ولكن بقيود محددة',
        en: 'Driving it is allowed but under specific restrictions',
        ckb: 'بە مەرجی دیاریکراو ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يمنع سوق مركبة تصدر ضوضاء غير اعتيادية.',
      en: 'A vehicle producing abnormal noise must not be driven.',
      ckb: 'ئۆتۆمبێلی خاوەن دەنگی نائاسایی نابێت لێبخوڕدرێت.',
    },
  },
  {
    id: 'q-throwing-items-from-window',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٦٩' },
    prompt: {
      ar: 'عقوبة رمي المواد أي كان نوعها من نوافذ المركبات هي؟',
      en: 'The penalty for throwing anything, of any kind, out of a vehicle window is:',
      ckb: 'سزای فڕێدانی هەر شتێک لە پەنجەرەی ئۆتۆمبێلەوە چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'c', text: {
        ar: 'الغرامة مع حجز المركبة',
        en: 'A fine together with impounding the vehicle',
        ckb: 'غەرامە لەگەڵ دەستبەسەرداگرتن',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'عقوبة رمي المواد من نوافذ المركبة هي الغرامة.',
      en: 'The penalty for throwing things from a vehicle window is a fine.',
      ckb: 'سزای فڕێدانی شت لە پەنجەرەوە غەرامەیە.',
    },
  },
  {
    id: 'q-when-stopping-prohibited',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧٠' },
    prompt: {
      ar: 'متى وأين تمنع المركبات من التوقف أو الايقاف؟',
      en: 'When and where are vehicles prohibited from stopping or parking?',
      ckb: 'کەی و لەکوێ ئۆتۆمبێل لە وەستان قەدەغە دەکرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إذ كانت الموقع الذي تقف فيه يؤدي الى عرقلة السير أو حجب علامة مرورية أو يؤدي الى حادثة أو بالقرب من نقطة ماء حريق أو الوقوف في أماكن خاصة بذوي الاحتياجات الخاصة',
        en: 'Where stopping would obstruct traffic, hide a traffic sign, cause an accident, sit near a fire hydrant, or occupy a space reserved for people with disabilities',
        ckb: 'ئەگەر شوێنەکە ببێتە هۆی تێکدانی هاتوچۆ یان شاردنەوەی تابلۆ یان ڕووداو، یان نزیک لە سەرچاوەی ئاوی ئاگرکوژێنەوە، یان لە شوێنی تایبەت بە خاوەن پێداویستی تایبەت',
      } },
      { id: 'b', text: {
        ar: 'إذ كان محرك المركبة لا يشتغل',
        en: 'When the vehicle\'s engine will not start',
        ckb: 'ئەگەر بزوێنەری ئۆتۆمبێلەکە کار نەکات',
      } },
      { id: 'c', text: {
        ar: 'إذ كانت لا تحمل ركاب',
        en: 'When it is carrying no passengers',
        ckb: 'ئەگەر سەرنشینی هەڵنەگرتبێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يمنع الوقوف حيث يعرقل السير أو يحجب علامة أو يشغل مكاناً مخصصاً لذوي الاحتياجات الخاصة.',
      en: 'Parking is prohibited where it obstructs traffic, hides a sign or takes a disabled space.',
      ckb: 'وەستان قەدەغەیە لە شوێنی تێکدانی هاتوچۆ یان شاردنەوەی تابلۆ یان شوێنی تایبەت.',
    },
  },
  {
    id: 'q-responsible-driver-trait',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧١' },
    prompt: {
      ar: 'اي من الصفات التالية تعود الى سائق يتمتع بشعور الحس بالمسؤلية؟',
      en: 'Which of the following describes a driver with a sense of responsibility?',
      ckb: 'کام لەم تایبەتمەندییانە بۆ شۆفێرێکی بەرپرسیارە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'القيادة دون القلق بشان قواعد المرور والاسبقيات',
        en: 'Driving without worrying about traffic rules and priorities',
        ckb: 'لێخوڕین بەبێ نیگەرانی لە یاساکانی هاتوچۆ و پێشینەییەکان',
      } },
      { id: 'b', text: {
        ar: 'الذي يفكر بنتائج افعاله',
        en: 'One who thinks about the consequences of their actions',
        ckb: 'ئەوەی بیر لە ئەنجامی کردەوەکانی دەکاتەوە',
      } },
      { id: 'c', text: {
        ar: 'الذي لايتردد في تعريض نفسه واحبائه للخطر',
        en: 'One who does not hesitate to put themselves and their loved ones at risk',
        ckb: 'ئەوەی دوودڵ نییە لە خستنە مەترسی خۆی و خۆشەویستانی',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'السائق المسؤول هو من يفكر بنتائج أفعاله.',
      en: 'A responsible driver is one who thinks about the consequences of their actions.',
      ckb: 'شۆفێری بەرپرسیار ئەوەیە بیر لە ئەنجامی کردەوەکانی دەکاتەوە.',
    },
  },
  {
    id: 'q-owner-duty-unlicensed-driver',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧٢' },
    prompt: {
      ar: 'على صاحب المركبة او من يملك السيطرة عليها؟',
      en: 'The vehicle\'s owner, or whoever controls it, must:',
      ckb: 'خاوەنی ئۆتۆمبێل یان ئەوەی کۆنترۆڵی هەیە دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عدم السماح للأشخاص الذين لا يحملون إجازة سياقة من قيادة سيارته',
        en: 'Not allow people without a driving licence to drive it',
        ckb: 'ڕێگا نەدات بەو کەسانەی مۆڵەتی لێخوڕینیان نییە لێیبخوڕن',
      } },
      { id: 'b', text: {
        ar: 'السماح باستخدام سيارته من قبل كل شخص يطلب إعارتها',
        en: 'Allow anyone who asks to borrow it to use it',
        ckb: 'ڕێگا بدات بە هەر کەسێک کە داوای بکات',
      } },
      { id: 'c', text: {
        ar: 'السماح بإستخدام سيارته من دون توفر متطلبات السلامة والامان (وثيقة الفحص الفني) فيها',
        en: 'Allow it to be used without the safety requirements (the technical inspection document)',
        ckb: 'ڕێگا بدات بەبێ بوونی مەرجەکانی سەلامەتی (بەڵگەنامەی پشکنینی تەکنیکی)',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا يجوز السماح لمن لا يحمل إجازة سوق بقيادة المركبة.',
      en: 'The owner must not let an unlicensed person drive the vehicle.',
      ckb: 'خاوەنەکە نابێت ڕێگا بدات بە کەسی بێ مۆڵەت لێیبخوڕێت.',
    },
  },
  {
    id: 'q-parking-left-side-two-way',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧٣' },
    prompt: {
      ar: 'هل يسمح بإيقاف المركبة في الجهة اليسرى لشارع باتجاهين؟',
      en: 'May a vehicle be parked on the left-hand side of a two-way street?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل لە لای چەپی شەقامێکی دوو ئاراستە بوەستێنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'كلا لا يسمح بشكل مطلق',
        en: 'No, it is absolutely not allowed',
        ckb: 'نەخێر، بە تەواوی ڕێپێدراو نییە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بشرط إيقاف المركبة بجوار الرصيف بشكل صحيح',
        en: 'Allowed provided the vehicle is parked correctly beside the kerb',
        ckb: 'ڕێپێدراوە بە مەرجی وەستاندنی دروست لەتەنیشت ڕێڕەوی پیادە',
      } },
      { id: 'c', text: {
        ar: 'يسمح بشرط ان يكون الشارع له أكثر من مسارين',
        en: 'Allowed provided the street has more than two lanes',
        ckb: 'ڕێپێدراوە بە مەرجی ئەوەی شەقامەکە زیاتر لە دوو لاینی هەبێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يمنع الوقوف على الجهة اليسرى في شارع ذي اتجاهين منعاً مطلقاً.',
      en: 'Parking on the left of a two-way street is absolutely prohibited.',
      ckb: 'وەستان لە لای چەپی شەقامی دوو ئاراستە بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-traffic-officer-precedence',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٧٤' },
    prompt: {
      ar: 'تكون أسبقية المرور ل؟',
      en: 'Precedence goes to:',
      ckb: 'پێشینەیی بۆ کامیانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إشارة رجل المرور اليدوية على الاشارة الضوئية وعلامات الطرق',
        en: 'The traffic officer\'s hand signal over the traffic light and the road signs',
        ckb: 'ئاماژەی دەستی پۆلیسی هاتوچۆ بەسەر چرا و تابلۆکاندا',
      } },
      { id: 'b', text: {
        ar: 'الاشارة الضوئية وعلامات الطرق على إشارة رجل المرور',
        en: 'The traffic light and road signs over the traffic officer\'s signal',
        ckb: 'چرا و تابلۆکان بەسەر ئاماژەی پۆلیسی هاتوچۆدا',
      } },
      { id: 'c', text: {
        ar: 'علامات الطرق على الاشارات الضوئية',
        en: 'Road signs over traffic lights',
        ckb: 'تابلۆکان بەسەر چراکاندا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'إشارة رجل المرور اليدوية تعلو على الإشارة الضوئية وعلامات الطرق.',
      en: 'The traffic officer\'s hand signal overrides both the lights and the road signs.',
      ckb: 'ئاماژەی دەستی پۆلیس بەسەر چرا و تابلۆکاندایە.',
    },
  },
  {
    id: 'q-lighting-time-by-law',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧٥' },
    prompt: {
      ar: 'ما هو وقت الانارة حسب القانون؟',
      en: 'What is the lighting-up time under the law?',
      ckb: 'کاتی ڕووناککردنەوە بەپێی یاسا کەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إستخدام الاضوية مبكراً قبل حلول الظلام (بدأ من قبل الغروب ولغاية ما بعد الشروق)',
        en: 'Use the lights early, before dark: from before sunset until after sunrise',
        ckb: 'بەکارهێنانی چراکان زوو پێش تاریکی (لە پێش ئاوابوونەوە تا دوای خۆرهەڵاتن)',
      } },
      { id: 'b', text: {
        ar: 'أثناء القيادة في طريق مزدحم',
        en: 'While driving on a congested road',
        ckb: 'لە کاتی لێخوڕین لە ڕێگای قەرەباڵغ',
      } },
      { id: 'c', text: {
        ar: 'في النهار أثناء القيادة في الطرق الخارجية',
        en: 'In the daytime when driving on rural roads',
        ckb: 'بە ڕۆژ لە ڕێگا دەرەکییەکان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُشغّل الأضوية من قبل الغروب ولغاية ما بعد الشروق.',
      en: 'Lights are used from before sunset until after sunrise.',
      ckb: 'چراکان لە پێش ئاوابوونەوە تا دوای خۆرهەڵاتن بەکاردەهێنرێن.',
    },
  },
  {
    id: 'q-seatbelt-responsibility',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧٦' },
    prompt: {
      ar: 'على من تقع مسؤولية عدم ربط حزام الامان لجميع ركاب المركبة؟',
      en: 'Who is responsible when the vehicle\'s occupants are not wearing seat belts?',
      ckb: 'بەرپرسیاریەتی نەبەستنی پشتێنی سەلامەتی بۆ هەموو سەرنشینەکان لەسەر کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'على السائق والراكب سويةً',
        en: 'The driver and the passenger together',
        ckb: 'لەسەر شۆفێر و سەرنشین بە یەکەوە',
      } },
      { id: 'b', text: {
        ar: 'على السائق فقط',
        en: 'The driver only',
        ckb: 'تەنها لەسەر شۆفێر',
      } },
      { id: 'c', text: {
        ar: 'على الراكب الذي لم يربط حزام الامان',
        en: 'The passenger who did not fasten the belt',
        ckb: 'لەسەر ئەو سەرنشینەی پشتێنەکەی نەبەستووە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'المسؤولية تقع على السائق والراكب معاً.',
      en: 'Responsibility rests on the driver and the passenger together.',
      ckb: 'بەرپرسیاریەتی لەسەر شۆفێر و سەرنشین پێکەوەیە.',
    },
  },
  {
    id: 'q-priority-moving-over-stopped',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٧٧' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة المتحركة على المركبة الواقفة',
        en: 'A moving vehicle over a stopped one',
        ckb: 'ئۆتۆمبێلی جوڵاو بەسەر ئۆتۆمبێلی وەستاودا',
      } },
      { id: 'b', text: {
        ar: 'المركبة الواقفة على المركبة المتحركة',
        en: 'A stopped vehicle over a moving one',
        ckb: 'ئۆتۆمبێلی وەستاو بەسەر جوڵاودا',
      } },
      { id: 'c', text: {
        ar: 'المركبة النازلة على المركبة الصاعدة',
        en: 'A descending vehicle over an ascending one',
        ckb: 'ئۆتۆمبێلی دابەزیو بەسەر سەرکەوتوودا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة المتحركة على الواقفة.',
      en: 'A moving vehicle has priority over a stopped one.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی جوڵاوە بەسەر وەستاودا.',
    },
  },
  {
    id: 'q-priority-main-over-side-road',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٧٨' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة التي تسير على الطريق الرئيسي على التي تسير في الطريق الفرعي',
        en: 'A vehicle on the main road over one on the side road',
        ckb: 'ئۆتۆمبێلی ڕێگای سەرەکی بەسەر ئەوەی ڕێگای لاوەکی',
      } },
      { id: 'b', text: {
        ar: 'المركبة التي تسير على الطريق الفرعي على المركبة التي تسير في الطريق الرئيسي',
        en: 'A vehicle on the side road over one on the main road',
        ckb: 'ئۆتۆمبێلی ڕێگای لاوەکی بەسەر ئەوەی ڕێگای سەرەکی',
      } },
      { id: 'c', text: {
        ar: 'المركبة الواقفة على المركبة المتحركة',
        en: 'A stopped vehicle over a moving one',
        ckb: 'ئۆتۆمبێلی وەستاو بەسەر جوڵاودا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة السائرة على الطريق الرئيسي.',
      en: 'Priority belongs to the vehicle on the main road.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی ڕێگای سەرەکییە.',
    },
  },
  {
    id: 'q-overtaking-two-vehicles',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٧٩' },
    prompt: {
      ar: 'متى يسمح بتجاوز مركبتين (في آنٍ واحد) تسيران امامك في مسلك سيرك؟',
      en: 'When may you overtake two vehicles at once travelling ahead of you in your lane?',
      ckb: 'کەی ڕێپێدراوە دوو ئۆتۆمبێل بە یەک جار تێپەڕێنیت کە لە پێشتەوە لە لاینەکەتدان؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عند خلو المسار المقابل بشكل كامل من المركبات وعدم وجود موانع اخرى للاجتياز',
        en: 'When the opposing lane is completely clear of vehicles and there is no other bar to overtaking',
        ckb: 'کاتێک لاینی بەرامبەر بە تەواوی بەتاڵە و هیچ ڕێگرێکی تر نییە',
      } },
      { id: 'b', text: {
        ar: 'يمنع القانون مثل هذا الاجتياز بشكل مطلق',
        en: 'The law prohibits such overtaking absolutely',
        ckb: 'یاسا بە تەواوی قەدەغەی کردووە',
      } },
      { id: 'c', text: {
        ar: 'عندما تكون المركبتين المراد إجتيازهما من النوع الصغير (صالون) فقط',
        en: 'Only when both vehicles to be overtaken are small saloons',
        ckb: 'تەنها کاتێک هەردوو ئۆتۆمبێلەکە بچووک بن',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجوز عند خلو المسار المقابل تماماً وانتفاء الموانع.',
      en: 'Permitted when the opposing lane is entirely clear and nothing else bars the manoeuvre.',
      ckb: 'ڕێپێدراوە کاتێک لاینی بەرامبەر بە تەواوی بەتاڵ بێت.',
    },
  },
  {
    id: 'q-parking-on-pavement',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٨٠' },
    prompt: {
      ar: 'هل يجوز إيقاف المركبة على الرصيف؟',
      en: 'May a vehicle be parked on the pavement?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل لەسەر ڕێڕەوی پیادە بوەستێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مسموح على الرصيف المبني من الكونكريت',
        en: 'Allowed on a concrete-built pavement',
        ckb: 'ڕێپێدراوە لەسەر ڕێڕەوی کۆنکریتی',
      } },
      { id: 'b', text: {
        ar: 'مسموح على الرصيف المؤدي الى الكراج',
        en: 'Allowed on the pavement leading to a garage',
        ckb: 'ڕێپێدراوە لەسەر ئەو ڕێڕەوەی بەرەو گاراج دەچێت',
      } },
      { id: 'c', text: {
        ar: 'ممنوع منعاً باتاً',
        en: 'Strictly prohibited',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'إيقاف المركبة على الرصيف ممنوع منعاً باتاً.',
      en: 'Parking on the pavement is strictly prohibited.',
      ckb: 'وەستان لەسەر ڕێڕەوی پیادە بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-priority-straight-over-turning',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٨١' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'السير المستقيم على السير المستدير',
        en: 'Traffic going straight over traffic turning',
        ckb: 'ڕۆیشتنی ڕاست بەسەر سووڕانەوەدا',
      } },
      { id: 'b', text: {
        ar: 'السير المستدير على السير المستقيم',
        en: 'Traffic turning over traffic going straight',
        ckb: 'سووڕانەوە بەسەر ڕۆیشتنی ڕاستدا',
      } },
      { id: 'c', text: {
        ar: 'السير في الطريق الفرعي على الرئيسي',
        en: 'Traffic on the side road over the main road',
        ckb: 'ڕۆیشتن لە ڕێگای لاوەکی بەسەر سەرەکیدا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للسير المستقيم على السير المستدير.',
      en: 'Traffic going straight ahead has priority over turning traffic.',
      ckb: 'پێشینەیی بۆ ڕۆیشتنی ڕاستە بەسەر سووڕانەوەدا.',
    },
  },
  {
    id: 'q-paid-passengers-private-vehicle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٨٢' },
    prompt: {
      ar: 'هل يجوز نقل ركاب بأجر في المركبات الخصوصية؟',
      en: 'May passengers be carried for a fare in private vehicles?',
      ckb: 'ئایا ڕێپێدراوە سەرنشین بە کرێ لە ئۆتۆمبێلی تایبەتدا بگوێزرێتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع ولا يجوز ذلك',
        en: 'It is prohibited and not permitted',
        ckb: 'قەدەغەیە و ڕێپێدراو نییە',
      } },
      { id: 'b', text: {
        ar: 'مسموح بعد الساعة 12 ليلاً',
        en: 'Allowed after 12 midnight',
        ckb: 'دوای کاتژمێر ١٢ی شەو ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'مسموح في حالة عدم توفر مركبات اجرة(تكسي)',
        en: 'Allowed when no taxis are available',
        ckb: 'کاتێک تاکسی نەبێت ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نقل الركاب بأجر في المركبات الخصوصية ممنوع.',
      en: 'Carrying passengers for a fare in a private vehicle is prohibited.',
      ckb: 'گواستنەوەی سەرنشین بە کرێ لە ئۆتۆمبێلی تایبەتدا قەدەغەیە.',
    },
  },
  {
    id: 'q-priority-leading-over-following',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٨٣' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة المتقدمة على المركبة اللاحقة',
        en: 'The leading vehicle over the following vehicle',
        ckb: 'ئۆتۆمبێلی پێشەوە بەسەر ئۆتۆمبێلی دواوەدا',
      } },
      { id: 'b', text: {
        ar: 'المركبة اللاحقة على المركبة المتقدمة',
        en: 'The following vehicle over the leading vehicle',
        ckb: 'ئۆتۆمبێلی دواوە بەسەر پێشەوەدا',
      } },
      { id: 'c', text: {
        ar: 'المركبة الواقفة على المركبة المتحركة',
        en: 'A stopped vehicle over a moving one',
        ckb: 'ئۆتۆمبێلی وەستاو بەسەر جوڵاودا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة المتقدمة على اللاحقة.',
      en: 'The leading vehicle has priority over the one following.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی پێشەوەیە.',
    },
  },
  {
    id: 'q-double-parking',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٨٤' },
    prompt: {
      ar: 'هل يجوز إيقاف مركبة بجانب مركبة اخرى واقفة بجانب الطريق (وقوف صف ثانٍ)؟',
      en: 'May a vehicle be parked alongside another already parked at the roadside (double parking)?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل لەتەنیشت ئۆتۆمبێلێکی تری وەستاو بوەستێت (وەستانی ڕیزی دووەم)؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع في الطرق الخارجية',
        en: 'Prohibited on rural roads',
        ckb: 'لە ڕێگا دەرەکییەکان قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع منعاً باتاً في جميع الطرق',
        en: 'Strictly prohibited on all roads',
        ckb: 'لە هەموو ڕێگاکاندا بە تەواوی قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع إذ كان عرض الطريق أقل من 15 م',
        en: 'Prohibited if the road is less than 15 m wide',
        ckb: 'قەدەغەیە ئەگەر پانی ڕێگاکە کەمتر لە ١٥ مەتر بێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الوقوف بصف ثانٍ ممنوع منعاً باتاً في جميع الطرق.',
      en: 'Double parking is strictly prohibited on every road.',
      ckb: 'وەستانی ڕیزی دووەم لە هەموو ڕێگاکاندا بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-tampering-with-registration',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٨٥' },
    prompt: {
      ar: 'هل يجوز التلاعب أو إجراء تغييرات في اجازة تسجيل المركبه (السنوية) أو إجازة السوق؟',
      en: 'May the vehicle registration (annual document) or the driving licence be altered or tampered with?',
      ckb: 'ئایا ڕێپێدراوە دەستکاری یان گۆڕانکاری لە بەڵگەنامەی ساڵانە یان مۆڵەتی لێخوڕین بکرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع منعاً باتاً التلاعب أو إجراء أي تغيرات إلا من قبل مديرية المرور',
        en: 'Tampering or any alteration is strictly prohibited except by the Traffic Directorate',
        ckb: 'دەستکاری یان هەر گۆڕانکارییەک بە تەواوی قەدەغەیە جگە لەلایەن بەڕێوەبەرایەتی هاتوچۆوە',
      } },
      { id: 'b', text: {
        ar: 'يسمح في حالات عدم وضوح بعض الكلمات والارقام التي تحويها',
        en: 'Allowed where some of the words or numbers it contains are unclear',
        ckb: 'ڕێپێدراوە ئەگەر هەندێک وشە و ژمارە ڕوون نەبن',
      } },
      { id: 'c', text: {
        ar: 'يسمح في حالة إستخدام نسخة مستنسخة',
        en: 'Allowed when using a photocopy',
        ckb: 'ڕێپێدراوە لە کاتی بەکارهێنانی کۆپی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا يجوز التعديل إلا من قبل مديرية المرور.',
      en: 'Only the Traffic Directorate may make changes.',
      ckb: 'تەنها بەڕێوەبەرایەتی هاتوچۆ بۆی هەیە گۆڕانکاری بکات.',
    },
  },
  {
    id: 'q-priority-inside-junction',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٨٦' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة التي في التقاطع أو الساحة على التي تحاول الدخول إلى التقاطع أو الساحة',
        en: 'A vehicle already in the junction or square over one trying to enter it',
        ckb: 'ئەو ئۆتۆمبێلەی لە ناو چوارڕیانەکەدایە بەسەر ئەوەی هەوڵی چوونە ناوی دەدات',
      } },
      { id: 'b', text: {
        ar: 'المركبة التي تحاول الدخول إلى التقاطع أو الساحة على المركبة التي في التقاطع',
        en: 'A vehicle trying to enter the junction or square over one already in it',
        ckb: 'ئەوەی هەوڵی چوونە ناوی دەدات بەسەر ئەوەی تێیدایە',
      } },
      { id: 'c', text: {
        ar: 'المركبة اللاحقة على المركبة المتقدمة',
        en: 'The following vehicle over the leading vehicle',
        ckb: 'ئۆتۆمبێلی دواوە بەسەر پێشەوەدا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة الموجودة داخل التقاطع أو الساحة.',
      en: 'A vehicle already inside the junction or square has priority.',
      ckb: 'پێشینەیی بۆ ئەو ئۆتۆمبێلەیە کە لە ناو چوارڕیانەکەدایە.',
    },
  },
  {
    id: 'q-pedestrians-obey-signs',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٨٧' },
    prompt: {
      ar: 'هل على المشاة الامتثال لعلامات السير و أوامر شرطي المرور؟',
      en: 'Must pedestrians obey traffic signs and the traffic officer\'s orders?',
      ckb: 'ئایا پیادەکان دەبێت گوێڕایەڵی تابلۆکان و فەرمانی پۆلیسی هاتوچۆ بن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم على المشاة الإمتثال لجميع علامات السير و أوامر شرطي المرور في أي مكان',
        en: 'Yes, pedestrians must obey all traffic signs and the officer\'s orders anywhere',
        ckb: 'بەڵێ، لە هەر شوێنێک گوێڕایەڵی هەموو تابلۆکان و فەرمانەکان بن',
      } },
      { id: 'b', text: {
        ar: 'نعم على المشاة الإمتثال للعلامات التي على الطريق فقط',
        en: 'Yes, but only the signs on the road',
        ckb: 'بەڵێ، تەنها ئەو تابلۆیانەی لەسەر ڕێگان',
      } },
      { id: 'c', text: {
        ar: 'نعم على المشاة الإمتثال للعلامات التي على الرصيف فقط',
        en: 'Yes, but only the signs on the pavement',
        ckb: 'بەڵێ، تەنها ئەو تابلۆیانەی لەسەر ڕێڕەوی پیادەن',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يلتزم المشاة بجميع علامات السير وأوامر شرطي المرور في أي مكان.',
      en: 'Pedestrians must obey every traffic sign and the officer\'s orders, anywhere.',
      ckb: 'پیادەکان لە هەر شوێنێک گوێڕایەڵی هەموو تابلۆکان دەبن.',
    },
  },
  {
    id: 'q-priority-from-right-at-crossroads',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٨٨' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'للمركبات القادمة من جهة اليمين في التقاطعات النافذة',
        en: 'Vehicles coming from the right at open crossroads',
        ckb: 'ئۆتۆمبێلەکانی لای ڕاست لە چوارڕیانی کراوەدا',
      } },
      { id: 'b', text: {
        ar: 'للمركبات القادمة من جهة اليسار في التقاطعات النافذة',
        en: 'Vehicles coming from the left at open crossroads',
        ckb: 'ئۆتۆمبێلەکانی لای چەپ لە چوارڕیانی کراوەدا',
      } },
      { id: 'c', text: {
        ar: 'المركبات القادمة من الجهة المعاكسة',
        en: 'Vehicles coming from the opposite direction',
        ckb: 'ئۆتۆمبێلەکانی ئاراستەی بەرامبەر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبات القادمة من اليمين في التقاطعات النافذة.',
      en: 'At open crossroads, vehicles coming from the right have priority.',
      ckb: 'لە چوارڕیانی کراوەدا پێشینەیی بۆ ئۆتۆمبێلەکانی لای ڕاستە.',
    },
  },
  {
    id: 'q-priority-ascending-over-descending',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٨٩' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة الصاعدة على المركبة النازلة',
        en: 'The ascending vehicle over the descending one',
        ckb: 'ئۆتۆمبێلی سەرکەوتوو بەسەر دابەزیودا',
      } },
      { id: 'b', text: {
        ar: 'المركبة النازلة على المركبة الصاعدة',
        en: 'The descending vehicle over the ascending one',
        ckb: 'ئۆتۆمبێلی دابەزیو بەسەر سەرکەوتوودا',
      } },
      { id: 'c', text: {
        ar: 'المركبة الواقفة على المتحركة',
        en: 'A stopped vehicle over a moving one',
        ckb: 'ئۆتۆمبێلی وەستاو بەسەر جوڵاودا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة الصاعدة على النازلة.',
      en: 'An ascending vehicle has priority over a descending one.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی سەرکەوتووە بەسەر دابەزیودا.',
    },
  },
  {
    id: 'q-officer-signal-binding',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٩٠' },
    prompt: {
      ar: 'إشارة شرطي المرور ملزمة للجميع وإطاعتها واجب؟',
      en: 'The traffic officer\'s signal binds everyone and must be obeyed:',
      ckb: 'ئاماژەی پۆلیسی هاتوچۆ بۆ هەموان ئەرکە و گوێڕایەڵی پێویستە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم في الشوارع الرئيسية والتقاطعات',
        en: 'Yes, on main streets and at junctions',
        ckb: 'بەڵێ، لە شەقامە سەرەکییەکان و چوارڕیانەکان',
      } },
      { id: 'b', text: {
        ar: 'نعم في كل الحالات والامكنة',
        en: 'Yes, in all cases and all places',
        ckb: 'بەڵێ، لە هەموو حاڵەت و شوێنێکدا',
      } },
      { id: 'c', text: {
        ar: 'نعم في توجيه حركة السير فقط',
        en: 'Yes, only when directing the flow of traffic',
        ckb: 'بەڵێ، تەنها لە ڕێنمایی جوڵەی هاتوچۆدا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'إشارة شرطي المرور ملزمة في كل الحالات والأمكنة.',
      en: 'The officer\'s signal is binding in every case and every place.',
      ckb: 'ئاماژەی پۆلیس لە هەموو حاڵەت و شوێنێکدا ئەرکە.',
    },
  },
  {
    id: 'q-priority-emergency-vehicles',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٩١' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مركبات الطوارئ على كافة المركبات',
        en: 'Emergency vehicles over all other vehicles',
        ckb: 'ئۆتۆمبێلی فریاگوزاری بەسەر هەموو ئۆتۆمبێلەکاندا',
      } },
      { id: 'b', text: {
        ar: 'المركبات الانشائية على كافة المركبات',
        en: 'Construction vehicles over all other vehicles',
        ckb: 'ئۆتۆمبێلی بیناسازی بەسەر هەموویاندا',
      } },
      { id: 'c', text: {
        ar: 'المركبات الخصوصية على الطوارئ',
        en: 'Private vehicles over emergency vehicles',
        ckb: 'ئۆتۆمبێلی تایبەت بەسەر فریاگوزاریدا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية المطلقة لمركبات الطوارئ على كافة المركبات.',
      en: 'Emergency vehicles have priority over every other vehicle.',
      ckb: 'ئۆتۆمبێلی فریاگوزاری پێشینەیی هەیە بەسەر هەموواندا.',
    },
  },
  {
    id: 'q-driving-after-medication',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٩٢' },
    prompt: {
      ar: 'هل يجوز قيادة المركبة بعد تناول ادوية لها تأثير على القدرة والرؤية؟',
      en: 'May you drive after taking medicines that affect your ability or vision?',
      ckb: 'ئایا ڕێپێدراوە دوای خواردنی دەرمانی کاریگەر لەسەر توانا و بینین لێبخوڕیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الا بعد إنقضاء الفترة المحددة لزوال تأثيرها',
        en: 'Prohibited until the stated period for their effect to wear off has passed',
        ckb: 'قەدەغەیە تا ئەو ماوەیە تێپەڕێت کە بۆ نەمانی کاریگەرییەکەی دیاریکراوە',
      } },
      { id: 'b', text: {
        ar: 'مسموح لان الادوية لا تؤثر على مستوى السياقة',
        en: 'Allowed, because medicines do not affect driving',
        ckb: 'ڕێپێدراوە چونکە دەرمان کاریگەری نییە',
      } },
      { id: 'c', text: {
        ar: 'مسموح بعد إنقضاء ساعتين على اخذ الادوية',
        en: 'Allowed two hours after taking the medicine',
        ckb: 'دوای دوو کاتژمێر ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا يجوز القيادة إلا بعد زوال تأثير الدواء خلال الفترة المحددة.',
      en: 'Do not drive until the medicine\'s effect has worn off over the stated period.',
      ckb: 'نابێت لێبخوڕیت تا کاریگەری دەرمانەکە نەڕەوێتەوە.',
    },
  },
  {
    id: 'q-priority-pedestrians-on-crossing',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٩٣' },
    prompt: {
      ar: 'تكون أسبقية المرور لاحدى الحالات التالية؟',
      en: 'Right of way belongs to which of the following?',
      ckb: 'مافی پێشینەیی بۆ کام لەمانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المشاة الذين وطئوا منطقة العبور على المركبات',
        en: 'Pedestrians who have already stepped onto the crossing, over vehicles',
        ckb: 'ئەو پیادانەی چوونەتە سەر پەڕینەوەکە بەسەر ئۆتۆمبێلەکاندا',
      } },
      { id: 'b', text: {
        ar: 'المركبات على المشاة الذين وطئوا منطقة العبور',
        en: 'Vehicles, over pedestrians who have stepped onto the crossing',
        ckb: 'ئۆتۆمبێلەکان بەسەر ئەو پیادانەی چوونەتە سەری',
      } },
      { id: 'c', text: {
        ar: 'المشاة الذين لم يوطئوا منطقة العبور على المركبات',
        en: 'Pedestrians who have not yet stepped onto the crossing, over vehicles',
        ckb: 'ئەو پیادانەی هێشتا نەچوونەتە سەری',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمشاة الذين وطئوا منطقة العبور فعلاً.',
      en: 'Pedestrians who have already stepped onto the crossing have priority.',
      ckb: 'پێشینەیی بۆ ئەو پیادانەیە کە چوونەتە سەر پەڕینەوەکە.',
    },
  },
  {
    id: 'q-first-aid-burn-victim',
    topic: 'firstaid',
    verified: true,
    source: { ...S, locator: 'س ٩٤' },
    prompt: {
      ar: 'يجب ان يعالج المحترق بـ؟',
      en: 'A burn casualty should be treated by:',
      ckb: 'کەسی سووتاو دەبێت بەم شێوەیە چارەسەر بکرێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'وضع الكريم مرهم في مكان الحرق',
        en: 'Putting cream or ointment on the burn',
        ckb: 'دانانی کرێم لەسەر شوێنی سووتانەکە',
      } },
      { id: 'b', text: {
        ar: 'تغطية المكان المحترق ونقله إلى المستشفى',
        en: 'Covering the burnt area and taking them to hospital',
        ckb: 'داپۆشینی شوێنە سووتاوەکە و گواستنەوەی بۆ نەخۆشخانە',
      } },
      { id: 'c', text: {
        ar: 'نزع ملابس المحترق بسرعة',
        en: 'Quickly removing the burnt person\'s clothing',
        ckb: 'بە خێرایی داکەندنی جلەکانی کەسە سووتاوەکە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تُنزع ملابس المحترق بسرعة بحسب دليل الأسئلة الرسمي.',
      en: 'The official guide gives the answer as removing the burnt person\'s clothing quickly.',
      ckb: 'بەپێی ڕێنمایی فەرمی، جلەکانی کەسە سووتاوەکە بە خێرایی دادەکەنرێت.',
    },
  },
  {
    id: 'q-driving-unroadworthy-vehicle',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٩٥' },
    prompt: {
      ar: 'هل يجوز قيادة مركبة غير صالحة للسير؟',
      en: 'May an unroadworthy vehicle be driven?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێلی ناتەندروست لێبخوڕدرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا يجوز قيادة مركبة غير صالحة للقيادة ولا تحمل وثيقة فحص فني سارية المفعول',
        en: 'No, a vehicle unfit to drive and without a valid inspection document may not be driven',
        ckb: 'نەخێر، ئۆتۆمبێلی نەشیاو بۆ لێخوڕین و بێ بەڵگەنامەی پشکنینی کارا نابێت لێبخوڕدرێت',
      } },
      { id: 'b', text: {
        ar: 'مسموح إذ كان الخلل ليس في جهاز الموقف (البريك)',
        en: 'Allowed if the fault is not in the braking system',
        ckb: 'ڕێپێدراوە ئەگەر کێشەکە لە برێکدا نەبێت',
      } },
      { id: 'c', text: {
        ar: 'مسموح إذ كان الخلل في منظومة الانارة',
        en: 'Allowed if the fault is in the lighting system',
        ckb: 'ڕێپێدراوە ئەگەر کێشەکە لە سیستەمی ڕووناکیدا بێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يمنع سوق مركبة غير صالحة أو بلا وثيقة فحص فني سارية.',
      en: 'An unfit vehicle, or one without a valid inspection document, must not be driven.',
      ckb: 'ئۆتۆمبێلی نەشیاو یان بێ بەڵگەنامەی کارا نابێت لێبخوڕدرێت.',
    },
  },
  {
    id: 'q-civil-defence-phone',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٩٦' },
    prompt: {
      ar: 'رقم هاتف الدفاع المدني (طوارئ)؟',
      en: 'The Civil Defence (emergency) telephone number is:',
      ckb: 'ژمارەی تەلەفۆنی بەرگری شارستانی (فریاگوزاری):',
    },
    choices: [
      { id: 'a', text: {
        ar: '188',
        en: '188',
        ckb: '١٨٨',
      } },
      { id: 'b', text: {
        ar: '104',
        en: '104',
        ckb: '١٠٤',
      } },
      { id: 'c', text: {
        ar: '115',
        en: '115',
        ckb: '١١٥',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'رقم الدفاع المدني للطوارئ هو 115.',
      en: 'The Civil Defence emergency number is 115.',
      ckb: 'ژمارەی فریاگوزاری بەرگری شارستانی ١١٥ە.',
    },
  },
  {
    id: 'q-mobile-phone-while-driving',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٩٧' },
    prompt: {
      ar: 'اين يسمح بإستعمال جهاز الهاتف النقال (الموبايل) أثناء القيادة؟',
      en: 'Where is using a mobile phone permitted while driving?',
      ckb: 'لەکوێ ڕێپێدراوە مۆبایل بەکاربهێنرێت لە کاتی لێخوڕیندا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يسمح بإستعمال جهاز الهاتف النقال أثناء توقف المركبة في المواقف او الاماكن المسموح بها للتوقف فقط',
        en: 'Only while the vehicle is stopped in a car park or a place where stopping is allowed',
        ckb: 'تەنها کاتێک ئۆتۆمبێلەکە لە شوێنی وەستان یان شوێنی ڕێپێدراودا وەستاوە',
      } },
      { id: 'b', text: {
        ar: 'أثناء القيادة في الطرق الخارجية',
        en: 'While driving on rural roads',
        ckb: 'لە کاتی لێخوڕین لە ڕێگا دەرەکییەکان',
      } },
      { id: 'c', text: {
        ar: 'إذ كان السائق يمسك بجهاز الهاتف في اليد اليسرى',
        en: 'If the driver holds the phone in the left hand',
        ckb: 'ئەگەر شۆفێرەکە بە دەستی چەپ مۆبایلەکە بگرێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُسمح باستعمال الهاتف فقط والمركبة متوقفة في مكان مسموح.',
      en: 'The phone may only be used while the vehicle is stopped somewhere stopping is allowed.',
      ckb: 'تەنها کاتێک ئۆتۆمبێل لە شوێنی ڕێپێدراودا وەستاوە.',
    },
  },
  {
    id: 'q-disobeying-lights-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٩٨' },
    prompt: {
      ar: 'عدم امتثال السائق لإشارات المرور الضوئية أو إشارة رجل المرور عقوبته هو؟',
      en: 'A driver failing to obey the traffic lights or the traffic officer\'s signal is punished by:',
      ckb: 'سزای ئەو شۆفێرەی گوێڕایەڵی چرای هاتوچۆ یان ئاماژەی پۆلیس نەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'السجن',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'c', text: {
        ar: 'السجن و الغرامة',
        en: 'Imprisonment and a fine',
        ckb: 'زیندان و غەرامە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبة عدم الامتثال هي الغرامة.',
      en: 'The penalty for failing to obey is a fine.',
      ckb: 'سزای گوێڕایەڵنەبوون غەرامەیە.',
    },
  },
  {
    id: 'q-against-traffic-direction-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٩٩' },
    prompt: {
      ar: 'قيادة مركبة بصورة معاكسة لوجهة المرور (عكس السير) المقرر من سلطات المرور عقوبته؟',
      en: 'Driving a vehicle against the direction of traffic set by the traffic authorities is punished by:',
      ckb: 'لێخوڕینی ئۆتۆمبێل بە پێچەوانەی ئاراستەی دیاریکراوی دەسەڵاتەکانی هاتوچۆ سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'غرامة وحجز المركبة',
        en: 'A fine and impounding the vehicle',
        ckb: 'غەرامە و دەستبەسەرداگرتن',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبتها الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-far-right-lane-streets',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٠' },
    prompt: {
      ar: 'الشوارع التي يجوز إستعمال الجهة اليمنى القصوى فيها أثناء القيادة هي؟',
      en: 'The streets on which the far right-hand side may be used while driving are:',
      ckb: 'ئەو شەقامانەی دەکرێت لای ڕاستی دوورترین تێیاندا بەکاربهێنرێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الشارع ذو مسارين واكثر',
        en: 'Streets with two or more lanes',
        ckb: 'شەقامی دوو لاین یان زیاتر',
      } },
      { id: 'b', text: {
        ar: 'الشارع ذو الاتجاه الواحد',
        en: 'One-way streets',
        ckb: 'شەقامی یەک ئاراستە',
      } },
      { id: 'c', text: {
        ar: 'جميع الشوارع',
        en: 'All streets',
        ckb: 'هەموو شەقامەکان',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُستعمل أقصى اليمين في جميع الشوارع.',
      en: 'The far right is used on all streets.',
      ckb: 'دوورترین لای ڕاست لە هەموو شەقامەکاندا بەکاردەهێنرێت.',
    },
  },
  {
    id: 'q-no-lights-at-night-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠١' },
    prompt: {
      ar: 'قيادة المركبة بدون أضوية أمامية وخلفية ليلاً عقوبته؟',
      en: 'Driving at night without front and rear lights is punished by:',
      ckb: 'لێخوڕین بە شەو بەبێ چرای پێشەوە و دواوە سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'b', text: {
        ar: 'الغرامة والحبس',
        en: 'A fine and imprisonment',
        ckb: 'غەرامە و زیندان',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبتها الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-reverse-direction-one-way',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٢' },
    prompt: {
      ar: 'متى يسمح بالسياقة بعكس إتجاه السير في شارع باتجاه واحد؟',
      en: 'When is driving against the flow on a one-way street allowed?',
      ckb: 'کەی ڕێپێدراوە بە پێچەوانەی ئاراستە لە شەقامی یەک ئاراستەدا بڕۆیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'بأمر من شرطي المرور في حالات خاصة تستوجب ذلك',
        en: 'On the order of a traffic officer in special cases that require it',
        ckb: 'بە فەرمانی پۆلیسی هاتوچۆ لە حاڵەتی تایبەتدا',
      } },
      { id: 'b', text: {
        ar: 'السائقين الاخرين يستطيعون السماح بذلك',
        en: 'Other drivers can permit it',
        ckb: 'شۆفێرەکانی تر دەتوانن ڕێگا بدەن',
      } },
      { id: 'c', text: {
        ar: 'ممنوع بشكل مطلق حتى لو كان بأمر من شرطي المرور',
        en: 'Absolutely prohibited, even on a traffic officer\'s order',
        ckb: 'بە تەواوی قەدەغەیە تەنانەت بە فەرمانی پۆلیسیش',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجوز فقط بأمر من شرطي المرور في حالات خاصة.',
      en: 'Only on the order of a traffic officer in special cases.',
      ckb: 'تەنها بە فەرمانی پۆلیسی هاتوچۆ لە حاڵەتی تایبەتدا.',
    },
  },
  {
    id: 'q-no-registration-plates-penalty',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٠٣' },
    prompt: {
      ar: 'قيادة مركبة خالية من لوحات التسجيل عقوبته؟',
      en: 'Driving a vehicle with no registration plates is punished by:',
      ckb: 'لێخوڕینی ئۆتۆمبێلی بێ پلێتی تۆمارکردن سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة مع الحبس',
        en: 'Impounding the vehicle and imprisonment',
        ckb: 'دەستبەسەرداگرتن لەگەڵ زیندان',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبتها الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-driving-on-pavement',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٤' },
    prompt: {
      ar: 'متى يسمح بالسياقة على الرصيف؟',
      en: 'When is driving on the pavement allowed?',
      ckb: 'کەی ڕێپێدراوە بەسەر ڕێڕەوی پیادەدا لێبخوڕیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع بشكل مطلق',
        en: 'Absolutely prohibited',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'مسموح في حالة خلو الرصيف من المشاة',
        en: 'Allowed when the pavement is clear of pedestrians',
        ckb: 'ڕێپێدراوە ئەگەر پیادەی لەسەر نەبێت',
      } },
      { id: 'c', text: {
        ar: 'مسموح في حالة الرصيف الذي يزيد عرضه عن 5 م',
        en: 'Allowed where the pavement is more than 5 m wide',
        ckb: 'ڕێپێدراوە ئەگەر پانییەکەی زیاتر لە ٥ مەتر بێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'السياقة على الرصيف ممنوعة بشكل مطلق.',
      en: 'Driving on the pavement is absolutely prohibited.',
      ckb: 'لێخوڕین بەسەر ڕێڕەوی پیادەدا بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-parking-on-bridge-or-tunnel',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٥' },
    prompt: {
      ar: 'متى يسمح بإيقاف مركبة على جسر أو داخل نفق؟',
      en: 'When may a vehicle be stopped on a bridge or inside a tunnel?',
      ckb: 'کەی ڕێپێدراوە ئۆتۆمبێل لەسەر پرد یان ناو تونێل بوەستێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع منعاً باتاً',
        en: 'Strictly prohibited',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'مسموح في النهار',
        en: 'Allowed in daylight',
        ckb: 'بە ڕۆژ ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'مسموح إذ كان الجسر أو النفق له اكثر من ثلاث مسارات',
        en: 'Allowed if the bridge or tunnel has more than three lanes',
        ckb: 'ڕێپێدراوە ئەگەر زیاتر لە سێ لاینی هەبێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الوقوف على الجسور وداخل الأنفاق ممنوع منعاً باتاً.',
      en: 'Stopping on bridges or in tunnels is strictly prohibited.',
      ckb: 'وەستان لەسەر پرد و ناو تونێل بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-tractor-lane',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٦' },
    prompt: {
      ar: 'في أي مسلك يستطيع سائق الساحبة الزراعية (التراكتور) قيادتها؟',
      en: 'In which lane may the driver of an agricultural tractor drive?',
      ckb: 'لە کام لاینێکدا شۆفێری تراکتۆری کشتوکاڵی دەتوانێت لێبخوڕێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'استخدام كتف الطريق في الطرق الخارجية',
        en: 'Using the hard shoulder on rural roads',
        ckb: 'بەکارهێنانی شانی ڕێگا لە ڕێگا دەرەکییەکان',
      } },
      { id: 'b', text: {
        ar: 'في كل اجزاء الطريق',
        en: 'In any part of the road',
        ckb: 'لە هەموو بەشەکانی ڕێگا',
      } },
      { id: 'c', text: {
        ar: 'مسلك اليسار في الطرق الخارجية',
        en: 'The left-hand lane on rural roads',
        ckb: 'لاینی چەپ لە ڕێگا دەرەکییەکان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يستخدم التراكتور كتف الطريق في الطرق الخارجية.',
      en: 'A tractor uses the hard shoulder on rural roads.',
      ckb: 'تراکتۆر شانی ڕێگا بەکاردەهێنێت لە ڕێگا دەرەکییەکان.',
    },
  },
  {
    id: 'q-where-tractors-allowed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٧' },
    prompt: {
      ar: 'في اي الطرق يسمح بإستخدام الساحبات الزراعية (التراكتور)؟',
      en: 'On which roads may agricultural tractors be used?',
      ckb: 'لە کام ڕێگایەکدا ڕێپێدراوە تراکتۆری کشتوکاڵی بەکاربهێنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'على الطرق الزراعية وشوارع حدود القرى',
        en: 'On farm roads and the streets within village boundaries',
        ckb: 'لەسەر ڕێگا کشتوکاڵییەکان و شەقامی سنووری گوندەکان',
      } },
      { id: 'b', text: {
        ar: 'على الطرق السريعة',
        en: 'On expressways',
        ckb: 'لەسەر ڕێگا خێراکان',
      } },
      { id: 'c', text: {
        ar: 'على الطرق الداخلية',
        en: 'On inner-city roads',
        ckb: 'لەسەر ڕێگا ناوەکییەکان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُستخدم على الطرق الزراعية وشوارع حدود القرى.',
      en: 'They are used on farm roads and village-boundary streets.',
      ckb: 'لەسەر ڕێگا کشتوکاڵییەکان و شەقامی سنووری گوندەکان.',
    },
  },
  {
    id: 'q-correct-right-turn-method',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٨' },
    prompt: {
      ar: 'ما هي الطريقة الصحيحة لتنفيذ الإستدارة نحو اليمين؟',
      en: 'What is the correct way to make a right turn?',
      ckb: 'ڕێگای دروستی سووڕانەوە بەرەو ڕاست چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التوجه نحو مسلك اليمين بعد التأكد من خلو المسلك بعد تشغيل إشارة الاستدارة نحو اليمين وتخفيض السرعة',
        en: 'Move into the right-hand lane after checking it is clear, having signalled right and reduced speed',
        ckb: 'دوای ئاماژەدان بۆ ڕاست و کەمکردنەوەی خێرایی، دوای دڵنیابوون لە بەتاڵی لاینەکە بەرەو لاینی ڕاست بڕۆ',
      } },
      { id: 'b', text: {
        ar: 'تشغيل الاشارة في اي مسلك كنت والتوجه الى فتحة الاستدارة فوراً',
        en: 'Signal from whichever lane you are in and head straight for the turning',
        ckb: 'لە هەر لاینێک بیت ئاماژە بدە و ڕاستەوخۆ بەرەو کەلێنی سووڕانەوە بڕۆ',
      } },
      { id: 'c', text: {
        ar: 'التوجه نحو فتحة الاستدارة المراد التوجه لها بدون تردد لتلافي الازدحام',
        en: 'Head for the turning without hesitating, to avoid congestion',
        ckb: 'بەبێ دوودڵی بەرەو کەلێنەکە بڕۆ بۆ دوورکەوتنەوە لە قەرەباڵغی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُشغّل المؤشر، تُخفض السرعة، ويُتأكد من خلو المسلك قبل التوجه يميناً.',
      en: 'Signal, slow down and check the lane is clear before moving right.',
      ckb: 'ئاماژە بدە، خێرایی کەم بکەرەوە و دڵنیابە لە بەتاڵی لاینەکە.',
    },
  },
  {
    id: 'q-after-parking-procedure',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٠٩' },
    prompt: {
      ar: 'ما هي الاجراءات التي يجب أن يقوم بها السائق بعد إيقاف سيارته وتركه لها في موقف نظامي',
      en: 'What must a driver do after parking and leaving the vehicle in a regular parking space?',
      ckb: 'دوای وەستاندن و بەجێهێشتنی ئۆتۆمبێل لە شوێنی وەستانی یاسایی، شۆفێر دەبێت چی بکات؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يتأكد من إيقاف عمل محرك المركبات وغلق الابواب وتفعيل الموقف اليدوي (الهاندبريك)',
        en: 'Make sure the engine is switched off, the doors are locked and the handbrake is applied',
        ckb: 'دڵنیابێت لە کوژاندنەوەی بزوێنەر و داخستنی دەرگاکان و کارپێکردنی هاندبرێک',
      } },
      { id: 'b', text: {
        ar: 'يتركها بدون تفعيل الموقف اليدوي ويضع يدة الكير على الحياد (البوش)',
        en: 'Leave it without the handbrake, with the gear lever in neutral',
        ckb: 'بەبێ هاندبرێک بەجێی بهێڵێت و گێڕەکە لەسەر بێلایەنی دابنێت',
      } },
      { id: 'c', text: {
        ar: 'وضع المثلث الفسفوري خلف المركبة',
        en: 'Place the reflective triangle behind the vehicle',
        ckb: 'سێگۆشەی فۆسفۆری لە پشت ئۆتۆمبێلەکە دابنێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُطفأ المحرك وتُغلق الأبواب ويُفعّل الموقف اليدوي.',
      en: 'Switch off the engine, lock the doors and apply the handbrake.',
      ckb: 'بزوێنەر بکوژێنەوە، دەرگاکان دابخە و هاندبرێک کاراکە.',
    },
  },
  {
    id: 'q-checks-before-right-turn',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١٠' },
    prompt: {
      ar: 'ما هي النقاط التي يجب التأكد منها قبل بدء الاستدارة نحو اليمين؟',
      en: 'What must you check before beginning a right turn?',
      ckb: 'پێش دەستپێکردنی سووڕانەوە بەرەو ڕاست دەبێت لە چی دڵنیابیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خلو الطريق في المسارات التي على يمينك',
        en: 'That the lanes to your right are clear',
        ckb: 'بەتاڵی ڕێگا لەو لاینانەی لای ڕاستتن',
      } },
      { id: 'b', text: {
        ar: 'خلو الطريق في المسار الايسر',
        en: 'That the left-hand lane is clear',
        ckb: 'بەتاڵی ڕێگا لە لاینی چەپ',
      } },
      { id: 'c', text: {
        ar: 'تشغيل اضوئة التحذير',
        en: 'That the hazard lights are on',
        ckb: 'داگیرساندنی چرا ئاگادارکەرەوەکان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُتأكد من خلو المسارات التي على اليمين.',
      en: 'Check that the lanes on your right are clear.',
      ckb: 'دڵنیابە لە بەتاڵی ئەو لاینانەی لای ڕاستتن.',
    },
  },
  {
    id: 'q-reversing-conditions',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١١' },
    prompt: {
      ar: 'ما هي شروط السماح بالقيادة للخلف في الطرق الداخلية؟',
      en: 'What are the conditions for reversing on inner-city roads?',
      ckb: 'مەرجەکانی ڕێپێدان بە دواوەچوون لە ڕێگا ناوەکییەکان چین؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التأكد من خلو الطريق خلف المركبة والرؤيا الواضحة وتشغيل إشارات التحذير الرباعيه والرجوع يجب أن لا يزيد عن 10 م',
        en: 'Check the road behind is clear with a clear view, switch on the hazard lights, and reverse no more than 10 m',
        ckb: 'دڵنیابوون لە بەتاڵی ڕێگای دواوە و بینینی ڕوون و داگیرساندنی چرا ئاگادارکەرەوەکان و نەچوونە دواوە زیاتر لە ١٠ مەتر',
      } },
      { id: 'b', text: {
        ar: 'الرجوع للخلف غير مشروط بمسافة',
        en: 'Reversing is not limited by distance',
        ckb: 'چوونە دواوە بە دووری مەرجدار نییە',
      } },
      { id: 'c', text: {
        ar: 'رجوع المركبة غير مشروط بوجود الضياء الابيض الخلفي',
        en: 'Reversing does not require the white reversing light',
        ckb: 'پێویستی بە چرای سپی دواوە نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُشترط خلو الطريق ووضوح الرؤية وتشغيل التحذير وألا يزيد الرجوع عن 10 م.',
      en: 'The road must be clear, the view good, hazards on, and the reverse no more than 10 m.',
      ckb: 'ڕێگا بەتاڵ، بینین ڕوون، چراکان داگیرساو و نەزیاتر لە ١٠ مەتر.',
    },
  },
  {
    id: 'q-how-to-park-at-kerb',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١٢' },
    prompt: {
      ar: 'كيف توقف مركبتك في الشارع؟',
      en: 'How should you park your vehicle in the street?',
      ckb: 'چۆن ئۆتۆمبێلەکەت لە شەقامدا دەوەستێنیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ايقاف المركبة بجانب الرصيف بشكل متوازي بمسافة لا تزيد عن 30سم',
        en: 'Parallel to the kerb, no more than 30 cm from it',
        ckb: 'بە شێوەی هاوتەریب لەتەنیشت ڕێڕەوی پیادە بە دووری نەزیاتر لە ٣٠ سم',
      } },
      { id: 'b', text: {
        ar: 'إيقاف المركبة بزاوية 30 درجة عن حافة الرصيف في كل الطرق',
        en: 'At a 30-degree angle to the kerb on every road',
        ckb: 'بە گۆشەی ٣٠ پلە لە لێواری ڕێڕەوەکە',
      } },
      { id: 'c', text: {
        ar: 'إيقاف المركبة في مناطق عبور المشاة كي يسهل العبور للجهة الاخرى',
        en: 'On a pedestrian crossing, to make crossing to the other side easier',
        ckb: 'لە ناوچەی پەڕینەوەی پیادە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُوقف المركبة موازية للرصيف على بعد لا يزيد عن 30 سم.',
      en: 'Park parallel to the kerb, within 30 cm of it.',
      ckb: 'هاوتەریب لەگەڵ ڕێڕەوەکە و بە دووری کەمتر لە ٣٠ سم.',
    },
  },
  {
    id: 'q-meeting-on-narrow-street',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١٣' },
    prompt: {
      ar: 'عند تقابل مركبتين في شارع ضيق ومستوى ما هو الاجراء الذي عليك فعله؟',
      en: 'When two vehicles meet on a narrow, level street, what should you do?',
      ckb: 'کاتێک دوو ئۆتۆمبێل لە شەقامێکی تەسک و تەختدا بەریەککەوتن، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التمهل والاتجاه بالمركبة الى حافة الشارع في اوسع منطقة من الشارع كي تتفادى الاصطدام',
        en: 'Slow down and move to the edge of the street at its widest point to avoid a collision',
        ckb: 'هێواش بە و بەرەو لێواری شەقامەکە بڕۆ لە فراوانترین شوێن بۆ دوورکەوتنەوە لە پێکدادان',
      } },
      { id: 'b', text: {
        ar: 'التقابل في اضيق مقطع من الشارع وإغلاق الطريق',
        en: 'Meet at the narrowest section and block the road',
        ckb: 'لە تەسکترین بەشدا بەریەک بکەون و ڕێگا دابخەن',
      } },
      { id: 'c', text: {
        ar: 'محاولة سائق المركبة الكبيرة أن يزيد من سرعته ويعبر الاول في المقطع الضيق',
        en: 'The larger vehicle\'s driver should speed up and pass through the narrow section first',
        ckb: 'شۆفێری ئۆتۆمبێلە گەورەکە خێرایی زیاد بکات و یەکەم بپەڕێتەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُتمهل ويُتجه إلى حافة الشارع عند أوسع منطقة لتفادي الاصطدام.',
      en: 'Slow and pull to the edge at the widest point to avoid a collision.',
      ckb: 'هێواش بە و لە فراوانترین شوێن بەرەو لێوار بڕۆ.',
    },
  },
  {
    id: 'q-steep-narrow-road-priority',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١١٤' },
    prompt: {
      ar: 'كيف يتصرف سائقوا المركبات في طرق ضيقة ومنحدرة او صعود شديد؟',
      en: 'How should drivers behave on narrow roads with a steep descent or climb?',
      ckb: 'شۆفێران لە ڕێگای تەسک و لێژ یان هەڵدێری توندا چۆن ڕەفتار دەکەن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'من يصل اولاً يدخل اولاً للمقطع الضيق',
        en: 'Whoever arrives first enters the narrow section first',
        ckb: 'هەرکەسێک یەکەم بگات یەکەم دەچێتە ناو بەشە تەسکەکە',
      } },
      { id: 'b', text: {
        ar: 'يجب على سائق المركبة النازلة ايقاف مركبته كي يمكن المركبة الصاعدة من مواصلة السير',
        en: 'The driver of the descending vehicle must stop so the ascending vehicle can continue',
        ckb: 'شۆفێری ئۆتۆمبێلی دابەزیو دەبێت بوەستێت تا ئۆتۆمبێلی سەرکەوتوو بەردەوام بێت',
      } },
      { id: 'c', text: {
        ar: 'يجب على سائق المركبة الصاعدة ايقاف مركبته كي يمكن سائق المركبة النازلة من مواصلة السير',
        en: 'The driver of the ascending vehicle must stop so the descending vehicle can continue',
        ckb: 'شۆفێری ئۆتۆمبێلی سەرکەوتوو دەبێت بوەستێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تتوقف المركبة النازلة لتمكين الصاعدة من مواصلة السير.',
      en: 'The descending vehicle stops so the ascending one can continue.',
      ckb: 'ئۆتۆمبێلی دابەزیو دەوەستێت تا سەرکەوتووەکە بەردەوام بێت.',
    },
  },
  {
    id: 'q-body-part-outside-vehicle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١٥' },
    prompt: {
      ar: 'هل يجوز لنا قيادة المركبة وكل أو جزء من جسمنا خارج المركبة؟',
      en: 'May we drive with all or part of our body outside the vehicle?',
      ckb: 'ئایا ڕێپێدراوە بە هەموو یان بەشێکی لەشمان لە دەرەوەی ئۆتۆمبێل لێبخوڕین؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع منعاً باتاً',
        en: 'Strictly prohibited',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'مسموح في الشاحنات ومركبات الطوارئ',
        en: 'Allowed in lorries and emergency vehicles',
        ckb: 'لە بارهەڵگر و ئۆتۆمبێلی فریاگوزاریدا ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'مسموح في الطرق الخارجية',
        en: 'Allowed on rural roads',
        ckb: 'لە ڕێگا دەرەکییەکان ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'ممنوع منعاً باتاً إخراج الجسم أو جزء منه خارج المركبة أثناء القيادة.',
      en: 'Having any part of the body outside the vehicle while driving is strictly prohibited.',
      ckb: 'دەرهێنانی لەش یان بەشێکی لە دەرەوەی ئۆتۆمبێل بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-high-beam-two-way-road',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١٦' },
    prompt: {
      ar: 'تستخدم الاضاءة العالية في الليل في طريق ذو سايد واحد والمستخدمة للذهاب والاياب في حالة؟',
      en: 'Main beam is used at night on a single-carriageway road carrying both directions when:',
      ckb: 'ڕووناکی بەرز بە شەو لە ڕێگای یەک سایدی هاتوچۆدا کەی بەکاردەهێنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عدم وجود المركبات في الاتجاه المقابل',
        en: 'There are no vehicles coming the other way',
        ckb: 'کاتێک ئۆتۆمبێل لە ئاراستەی بەرامبەردا نییە',
      } },
      { id: 'b', text: {
        ar: 'بشكل مستمر',
        en: 'Continuously',
        ckb: 'بە بەردەوامی',
      } },
      { id: 'c', text: {
        ar: 'في حالة وجود المركبات في الاتجاه المقابل بعدد قليل',
        en: 'There are only a few vehicles coming the other way',
        ckb: 'کاتێک ژمارەیەکی کەم ئۆتۆمبێل لە بەرامبەردایە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُستخدم الإضاءة العالية عند خلو الاتجاه المقابل من المركبات.',
      en: 'Use main beam only when no vehicles are coming the other way.',
      ckb: 'تەنها کاتێک ئۆتۆمبێل لە بەرامبەردا نییە.',
    },
  },
  {
    id: 'q-carry-licence-every-time',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١١٧' },
    prompt: {
      ar: 'هل يلزم حمل اجازة السياقة في كل مرة تقوم فيها بالقيادة؟',
      en: 'Must you carry your driving licence every time you drive?',
      ckb: 'ئایا پێویستە هەر جارێک لێدەخوڕیت مۆڵەتی لێخوڕین لەگەڵ خۆت بێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لايلزم و يكفي ان يكون لديك اجازة السياقة',
        en: 'No, it is enough simply to hold a licence',
        ckb: 'پێویست نییە، بەسە مۆڵەتت هەبێت',
      } },
      { id: 'b', text: {
        ar: 'لا وانما يلزم هذا في الرحلات الطويلة فقط',
        en: 'No, only on long journeys',
        ckb: 'نەخێر، تەنها لە گەشتە دوورەکاندا',
      } },
      { id: 'c', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يلزم حمل إجازة السياقة في كل مرة تقود فيها.',
      en: 'You must carry the licence every time you drive.',
      ckb: 'دەبێت هەر جارێک لێدەخوڕیت مۆڵەتەکەت لەگەڵ بێت.',
    },
  },
  {
    id: 'q-junction-vehicle-from-right',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١١٨' },
    prompt: {
      ar: 'عندما تقترب من تقاطع طريق وترى مركبة اتية من اليمين يجب عليك ان؟',
      en: 'When you approach a junction and see a vehicle coming from the right, you must:',
      ckb: 'کاتێک لە چوارڕیانێک نزیک دەبیتەوە و ئۆتۆمبێلێک لە لای ڕاستەوە دەبینیت، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تستعد للتوقف وتعطي السائق الاخر حق المرور',
        en: 'Prepare to stop and give the other driver right of way',
        ckb: 'ئامادەبیت بۆ وەستان و مافی ڕۆیشتن بدەیت بە شۆفێرەکەی تر',
      } },
      { id: 'b', text: {
        ar: 'تزيد من سرعة المركبة لتعبر التقاطع',
        en: 'Speed up to cross the junction',
        ckb: 'خێرایی زیاد بکەیت بۆ پەڕینەوەی چوارڕیانەکە',
      } },
      { id: 'c', text: {
        ar: 'تستخدم جهاز التنبيه(الهورن) لتنبيه السائق لعدم الاقتراب من التقاطع',
        en: 'Sound the horn to warn the other driver away from the junction',
        ckb: 'بۆری لێبدەیت بۆ ئاگادارکردنەوەی شۆفێرەکە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُستعد للتوقف وتُعطى الأسبقية للقادم من اليمين.',
      en: 'Prepare to stop and give way to the vehicle from the right.',
      ckb: 'ئامادەبە بۆ وەستان و پێشینەیی بدە بە ئەوەی لای ڕاستەوە دێت.',
    },
  },
  {
    id: 'q-check-before-moving-off',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١١٩' },
    prompt: {
      ar: 'عند دخولك للسير والبدء بالحركة يجب عليك ان تنظر في مرايا مركبتك للتاكد من ان؟',
      en: 'Before joining traffic and moving off you must look in your mirrors to check that:',
      ckb: 'پێش دەستپێکردنی جوڵان دەبێت لە ئاوێنەکان بڕوانیت بۆ دڵنیابوون لەوەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الشارع خالي من المشاة',
        en: 'The street is clear of pedestrians',
        ckb: 'شەقامەکە لە پیادە بەتاڵە',
      } },
      { id: 'b', text: {
        ar: 'الشارع خالي من السيارات',
        en: 'The street is clear of cars',
        ckb: 'شەقامەکە لە ئۆتۆمبێل بەتاڵە',
      } },
      { id: 'c', text: {
        ar: 'الشارع خالي من جميع انواع المركبات والمشاة',
        en: 'The street is clear of every kind of vehicle and of pedestrians',
        ckb: 'شەقامەکە لە هەموو جۆرەکانی ئۆتۆمبێل و پیادە بەتاڵە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُتأكد من خلو الشارع من جميع المركبات والمشاة قبل الحركة.',
      en: 'Check the street is clear of all vehicles and pedestrians before moving off.',
      ckb: 'دڵنیابە لە بەتاڵی شەقامەکە لە هەموو ئۆتۆمبێل و پیادە.',
    },
  },
  {
    id: 'q-driving-in-fog-procedure',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٢٠' },
    prompt: {
      ar: 'ما هي الاجراءات التي يجب ان تقوم بها عند القيادة في جو ضبابي؟',
      en: 'What must you do when driving in fog?',
      ckb: 'لە کاتی لێخوڕین لە کەشی تەمناکدا دەبێت چی بکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تقليل السرعة وإستخدام الضياء الواطئ (الناصي)',
        en: 'Reduce speed and use the dipped beam',
        ckb: 'خێرایی کەم بکەیتەوە و ڕووناکی نزم بەکاربهێنیت',
      } },
      { id: 'b', text: {
        ar: 'القيادة بشكل إعتيادي وإستخدام أضوية التحذير',
        en: 'Drive normally and use the hazard lights',
        ckb: 'بە ئاسایی لێبخوڕیت و چرا ئاگادارکەرەوەکان بەکاربهێنیت',
      } },
      { id: 'c', text: {
        ar: 'إستخدام الضياء العالي والوقوف على كتف الطريق',
        en: 'Use main beam and stop on the hard shoulder',
        ckb: 'ڕووناکی بەرز بەکاربهێنیت و لەسەر شانی ڕێگا بوەستیت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُخفض السرعة ويُستخدم الضياء الواطئ في الضباب.',
      en: 'Slow down and use dipped beam in fog.',
      ckb: 'خێرایی کەم بکەرەوە و ڕووناکی نزم بەکاربهێنە.',
    },
  },
  {
    id: 'q-overtaking-two-in-same-lane',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٢١' },
    prompt: {
      ar: 'متى يسمح باجتياز مركبتين تسيران امامك في نفس المسار؟',
      en: 'When may you overtake two vehicles travelling ahead of you in the same lane?',
      ckb: 'کەی ڕێپێدراوە دوو ئۆتۆمبێل تێپەڕێنیت کە لە هەمان لایندان؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اذا كان مجال الرؤية ضيقا والطريق كان مزدحما',
        en: 'When visibility is restricted and the road is busy',
        ckb: 'ئەگەر بینین تەسک و ڕێگا قەرەباڵغ بێت',
      } },
      { id: 'b', text: {
        ar: 'اذا كانت المركبتين من نوع مركبات الحمل',
        en: 'When both vehicles are goods vehicles',
        ckb: 'ئەگەر هەردووکیان بارهەڵگر بن',
      } },
      { id: 'c', text: {
        ar: 'في حال لم يكن هناك موانع للاجتياز اوعندما يكون بالامكان اكمال الاجتياز دون خطر',
        en: 'When there is nothing barring the manoeuvre, or when it can be completed without danger',
        ckb: 'ئەگەر هیچ ڕێگرێک نەبێت یان بتوانرێت بەبێ مەترسی تەواو بکرێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يجوز عند انتفاء الموانع وإمكان إكمال الاجتياز دون خطر.',
      en: 'Permitted when nothing bars it and it can be completed safely.',
      ckb: 'ڕێپێدراوە کاتێک ڕێگر نییە و بەبێ مەترسی تەواو دەبێت.',
    },
  },
  {
    id: 'q-meeting-on-uneven-narrow-road',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٢٢' },
    prompt: {
      ar: 'ماهو واجب السائقين عندما يتقابلون بمركباتهم في الطرق الغير مستوية والضيقة؟',
      en: 'What must drivers do when they meet on uneven, narrow roads?',
      ckb: 'ئەرکی شۆفێران چییە کاتێک لە ڕێگای ناتەخت و تەسکدا بەریەککەوتن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ان يسلكوا الجانب الايسر من الطريق',
        en: 'Take the left-hand side of the road',
        ckb: 'لای چەپی ڕێگا بگرنە بەر',
      } },
      { id: 'b', text: {
        ar: 'ان يسرعوا لكي ينجوا من الخطر',
        en: 'Speed up to escape the danger',
        ckb: 'خێرا بن بۆ ڕزگاربوون لە مەترسی',
      } },
      { id: 'c', text: {
        ar: 'ان يتمهلوا ويتجهوا الى اقصى اليمين اولى حافة الطريق ليتجنبوا الاصطدام',
        en: 'Slow down and move to the far right, to the road\'s edge, to avoid a collision',
        ckb: 'هێواش بن و بەرەو دوورترین لای ڕاست و لێواری ڕێگا بڕۆن بۆ دوورکەوتنەوە لە پێکدادان',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يتمهل السائقان ويتجهان إلى أقصى اليمين لتجنب الاصطدام.',
      en: 'Both slow down and move as far right as possible to avoid a collision.',
      ckb: 'هەردووکیان هێواش دەبن و بەرەو دوورترین لای ڕاست دەڕۆن.',
    },
  },
  {
    id: 'q-narrow-steep-two-way-duty',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١٢٣' },
    prompt: {
      ar: 'ماهو واجب السائقين عندما يتقابلون في طريق ضيق ذو صعود شاهق ومستخدم للذهاب والاياب؟',
      en: 'What must drivers do when they meet on a narrow road with a steep climb used in both directions?',
      ckb: 'ئەرکی شۆفێران چییە لە ڕێگای تەسکی هەڵدێری توندی دوو ئاراستەدا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ان يمشوا بالسرعة العادية ودون ان يفتح الطريق احدهم للاخر',
        en: 'Carry on at normal speed without either giving way',
        ckb: 'بە خێرایی ئاسایی بڕۆن و ڕێگا بۆ یەکتر نەکەنەوە',
      } },
      { id: 'b', text: {
        ar: 'ان يقف المركبة الصاعدة ان اقتضت الحاجة ويعطي المجال للمركبة النازلة',
        en: 'The ascending vehicle stops if necessary and gives way to the descending one',
        ckb: 'ئۆتۆمبێلی سەرکەوتوو بوەستێت و ڕێگا بدات بە دابەزیو',
      } },
      { id: 'c', text: {
        ar: 'ان يقف المركبة النازلة ان اقتضت الحاجة ويعطي المجال للمركبة الصاعدة',
        en: 'The descending vehicle stops if necessary and gives way to the ascending one',
        ckb: 'ئۆتۆمبێلی دابەزیو بوەستێت و ڕێگا بدات بە سەرکەوتوو',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تقف المركبة النازلة وتفسح المجال للمركبة الصاعدة.',
      en: 'The descending vehicle stops and gives way to the ascending one.',
      ckb: 'ئۆتۆمبێلی دابەزیو دەوەستێت و ڕێگا دەدات بە سەرکەوتوو.',
    },
  },
  {
    id: 'q-safety-element-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٢٤' },
    prompt: {
      ar: 'احد العناصر المهمة للسلامة والامان في المركبات اثناء السير في الطرق هو؟',
      en: 'One of the important elements of vehicle safety while travelling on the road is:',
      ckb: 'یەکێک لە پێکهاتە گرنگەکانی سەلامەتی ئۆتۆمبێل لە کاتی ڕۆیشتندا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'توفر متطلبات السلامة والامان (الفحص الفني الدوري للمركبات)',
        en: 'Meeting the safety requirements (the periodic technical inspection of vehicles)',
        ckb: 'دابینکردنی مەرجەکانی سەلامەتی (پشکنینی تەکنیکی خولی)',
      } },
      { id: 'b', text: {
        ar: 'لا علاقة للسلامة والامان بفحص المركبات',
        en: 'Safety has nothing to do with vehicle inspection',
        ckb: 'سەلامەتی پەیوەندی بە پشکنینەوە نییە',
      } },
      { id: 'c', text: {
        ar: 'لا تعتمد مديريات المرور على الفحص الفني في تجديد سنوية المركبة',
        en: 'Traffic directorates do not rely on the technical inspection to renew the vehicle\'s annual document',
        ckb: 'بەڕێوەبەرایەتی هاتوچۆ پشت بە پشکنین نابەستێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الفحص الفني الدوري من عناصر السلامة الأساسية.',
      en: 'The periodic technical inspection is a basic element of safety.',
      ckb: 'پشکنینی تەکنیکی خولی یەکێکە لە پێکهاتە بنەڕەتییەکانی سەلامەتی.',
    },
  },
  {
    id: 'q-medicines-affecting-driving',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٢٥' },
    prompt: {
      ar: 'الادوية التي تؤثر على القيادة والتي يجب عدم تناولها قبل واثناء القيادة؟',
      en: 'Which medicines affect driving and must not be taken before or while driving?',
      ckb: 'کام دەرمانانە کاریگەرن لەسەر لێخوڕین و نابێت پێش و لە کاتی لێخوڕیندا بخورێن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المهدئات والمسكنات والمنومات',
        en: 'Sedatives, painkillers and sleeping pills',
        ckb: 'هێورکەرەوە و ئازارشکێن و خەوهێنەرەکان',
      } },
      { id: 'b', text: {
        ar: 'بعض الادوية الخاصة بعلاج ضغط الدم والغثيان والحساسية والتهابات العدوى الفطرية',
        en: 'Some medicines for blood pressure, nausea, allergies and fungal infections',
        ckb: 'هەندێک دەرمانی پەستانی خوێن و ڕشانەوە و هەستیاری و هەوکردنی کەڕووی',
      } },
      { id: 'c', text: {
        ar: 'جميع ماذكر',
        en: 'All of the above',
        ckb: 'هەموو ئەوانەی باسکران',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'جميع ما ذُكر من الأدوية يؤثر على القيادة.',
      en: 'All of the listed medicines affect driving.',
      ckb: 'هەموو ئەو دەرمانانەی باسکران کاریگەرن لەسەر لێخوڕین.',
    },
  },
  {
    id: 'q-safe-refuelling',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٢٦' },
    prompt: {
      ar: 'من اجل الحصول على تعبئة وقود امنة يجب؟',
      en: 'For safe refuelling you must:',
      ckb: 'بۆ پڕکردنەوەی سووتەمەنی بە سەلامەتی دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اطفاء المحرك اثناء التزود بالوقود',
        en: 'Switch off the engine while refuelling',
        ckb: 'بزوێنەر بکوژێنرێتەوە لە کاتی پڕکردنەوەدا',
      } },
      { id: 'b', text: {
        ar: 'عدم التدخين في محطات الوقود',
        en: 'Not smoke at the filling station',
        ckb: 'جگەرە نەکێشرێت لە بۆریگەی سووتەمەنی',
      } },
      { id: 'c', text: {
        ar: 'جميع ماذكر',
        en: 'All of the above',
        ckb: 'هەموو ئەوانەی باسکران',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُطفأ المحرك ويُمنع التدخين أثناء التزود بالوقود.',
      en: 'Switch off the engine and do not smoke while refuelling.',
      ckb: 'بزوێنەر بکوژێنەوە و جگەرە مەکێشە.',
    },
  },
  {
    id: 'q-after-alcohol-or-drugs',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٢٧' },
    prompt: {
      ar: 'إذا تناولت مواد كحولية أو مخدرة غير قانونية؟',
      en: 'If you have taken alcohol or illegal drugs:',
      ckb: 'ئەگەر کحول یان ماددەی هۆشبەری نایاسایی وەرگرت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يجب عدم القيادة',
        en: 'You must not drive',
        ckb: 'نابێت لێبخوڕیت',
      } },
      { id: 'b', text: {
        ar: 'يجب شرب القهوة قبل القيادة',
        en: 'You must drink coffee before driving',
        ckb: 'دەبێت پێش لێخوڕین قاوە بخۆیتەوە',
      } },
      { id: 'c', text: {
        ar: 'يمكنك القيادة بسرعة واطئة وفي طرق خالية فقط',
        en: 'You may drive slowly and only on empty roads',
        ckb: 'دەتوانیت بە خێرایی نزم و تەنها لە ڕێگای بەتاڵدا لێبخوڕیت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب عدم القيادة مطلقاً بعد تناول الكحول أو المخدرات.',
      en: 'You must not drive at all after alcohol or drugs.',
      ckb: 'بە هیچ شێوەیەک نابێت لێبخوڕیت.',
    },
  },
  {
    id: 'q-blue-exhaust-smoke',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٢٨' },
    prompt: {
      ar: 'ما سبب ظهور دخان أزرق اللون من إنبوبة العادم (صالنصة)؟',
      en: 'What causes blue smoke from the exhaust pipe?',
      ckb: 'هۆکاری دەرچوونی دووکەڵی شین لە بۆری دووکەڵ چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إستهلاك المحرك أو كسر المكابس أو حلقاتها',
        en: 'Engine wear, or broken pistons or piston rings',
        ckb: 'داڕزانی بزوێنەر یان شکانی پیستۆن یان بازنەکانی',
      } },
      { id: 'b', text: {
        ar: 'قلة الزيت في المحرك',
        en: 'Too little oil in the engine',
        ckb: 'کەمی زەیت لە بزوێنەردا',
      } },
      { id: 'c', text: {
        ar: 'إستخدام زيت كثيف اللزوجة',
        en: 'Using oil that is too thick',
        ckb: 'بەکارهێنانی زەیتی زۆر ئەستوور',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الدخان الأزرق يدل على استهلاك المحرك أو كسر المكابس أو حلقاتها.',
      en: 'Blue smoke indicates engine wear or broken pistons or rings.',
      ckb: 'دووکەڵی شین ئاماژەیە بۆ داڕزانی بزوێنەر یان شکانی پیستۆن.',
    },
  },
  {
    id: 'q-age-public-vehicle-licence',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٢٩' },
    prompt: {
      ar: 'من الناحية القانونية الشخص الذي يرغب في الحصول على اجازة المركبات العمومية يجب ان يكون مكملا ل؟',
      en: 'Legally, a person wishing to obtain a public-vehicle licence must have completed:',
      ckb: 'لە ڕووی یاساییەوە، ئەو کەسەی دەیەوێت مۆڵەتی ئۆتۆمبێلی گشتی وەربگرێت دەبێت تەواوی کردبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: '18الثامنة عشر من العمر',
        en: '18 years of age',
        ckb: '١٨ ساڵ',
      } },
      { id: 'b', text: {
        ar: '20العشرين من العمر',
        en: '20 years of age',
        ckb: '٢٠ ساڵ',
      } },
      { id: 'c', text: {
        ar: '22الثانية والعشرين من العمر',
        en: '22 years of age',
        ckb: '٢٢ ساڵ',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يشترط إكمال العشرين من العمر لإجازة المركبات العمومية.',
      en: 'A public-vehicle licence requires the applicant to be 20.',
      ckb: 'بۆ مۆڵەتی ئۆتۆمبێلی گشتی تەمەنی ٢٠ ساڵ پێویستە.',
    },
  },
  {
    id: 'q-night-following-gap',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٣٠' },
    prompt: {
      ar: 'أثناء القيادة في الليل يجب؟',
      en: 'When driving at night you must:',
      ckb: 'لە کاتی لێخوڕین بە شەو دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'القيادة على مسافة أقرب الى المركبة التي امامك حتى يتمكن السائق من رؤيتك بوضوح',
        en: 'Drive closer to the vehicle in front so its driver can see you clearly',
        ckb: 'نزیکتر لە ئۆتۆمبێلی پێشەوە لێبخوڕیت',
      } },
      { id: 'b', text: {
        ar: 'ترك مسافة اطول خلف المركبة التي امامك',
        en: 'Leave a longer gap behind the vehicle in front',
        ckb: 'ماوەیەکی درێژتر لە پشت ئۆتۆمبێلی پێشەوە بهێڵیتەوە',
      } },
      { id: 'c', text: {
        ar: 'إستخدام أضواء التحذير من الخطر عند تخطي مركبة اخرى',
        en: 'Use the hazard lights when overtaking another vehicle',
        ckb: 'چرا ئاگادارکەرەوەکان بەکاربهێنیت لە کاتی تێپەڕاندندا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تُترك مسافة أطول خلف المركبة التي أمامك ليلاً.',
      en: 'Leave a longer gap behind the vehicle ahead at night.',
      ckb: 'بە شەو ماوەیەکی درێژتر بهێڵەوە.',
    },
  },
  {
    id: 'q-age-construction-vehicle-licence',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٣١' },
    prompt: {
      ar: 'من الناحية القانونية الشخص الذي يرغب في الحصول على اجازة المركبات الانشائية يجب ان يكون مكملا ل؟',
      en: 'Legally, a person wishing to obtain a construction-vehicle licence must have completed:',
      ckb: 'لە ڕووی یاساییەوە، ئەو کەسەی مۆڵەتی ئۆتۆمبێلی بیناسازی دەوێت دەبێت تەواوی کردبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: '20سنة من العمر',
        en: '20 years of age',
        ckb: '٢٠ ساڵ',
      } },
      { id: 'b', text: {
        ar: '18سنة من العمر',
        en: '18 years of age',
        ckb: '١٨ ساڵ',
      } },
      { id: 'c', text: {
        ar: '22سنة من العمر',
        en: '22 years of age',
        ckb: '٢٢ ساڵ',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يشترط إكمال 20 سنة لإجازة المركبات الإنشائية.',
      en: 'A construction-vehicle licence requires the applicant to be 20.',
      ckb: 'بۆ مۆڵەتی ئۆتۆمبێلی بیناسازی تەمەنی ٢٠ ساڵ پێویستە.',
    },
  },
  {
    id: 'q-night-three-second-rule',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٣٢' },
    prompt: {
      ar: 'عند القيادة الليلية وسط صف من المركبات ما هي المسافة التي يجب تركها بين مركبتك والمركبات التي أمامك (حسب نظام الثلاث ثواني)؟',
      en: 'Driving at night in a line of vehicles, what gap should you leave to the vehicles ahead (under the three-second rule)?',
      ckb: 'لە لێخوڕینی شەوانە لە ناو ڕیزێک ئۆتۆمبێلدا، چ ماوەیەک بهێڵیتەوە (بەپێی سیستەمی سێ چرکە)؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اربع ثوان تقريباً حيث إنه من السهل الخطأ في تقدير المسافات ليلاً',
        en: 'About four seconds, because distances are easy to misjudge at night',
        ckb: 'نزیکەی چوار چرکە، چونکە بە شەو هەڵە لە خەمڵاندنی ماوە ئاسانە',
      } },
      { id: 'b', text: {
        ar: 'ثانيتان تقريباً حتى يمكنك مراقبة المركبات التي امامك عن قرب ورؤيتها عندما تقف',
        en: 'About two seconds, so you can watch the vehicles ahead closely and see them stop',
        ckb: 'نزیکەی دوو چرکە',
      } },
      { id: 'c', text: {
        ar: 'نفس مسافة الثلاث ثوان التي تتركها نهاراً',
        en: 'The same three-second gap you leave during the day',
        ckb: 'هەمان ماوەی سێ چرکەی ڕۆژانە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُترك نحو أربع ثوانٍ ليلاً لصعوبة تقدير المسافات.',
      en: 'Leave about four seconds at night, as distances are hard to judge.',
      ckb: 'بە شەو نزیکەی چوار چرکە بهێڵەوە.',
    },
  },
  {
    id: 'q-age-private-vehicle-licence',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٣٣' },
    prompt: {
      ar: 'من الناحية القانونية الشخص الذي يسعى للحصول على اجازة المركبات الخصوصية يجب ان يكون مكملا ل؟',
      en: 'Legally, a person seeking a private-vehicle licence must have completed:',
      ckb: 'لە ڕووی یاساییەوە، ئەو کەسەی مۆڵەتی ئۆتۆمبێلی تایبەتی دەوێت دەبێت تەواوی کردبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: '18سنة من العمر',
        en: '18 years of age',
        ckb: '١٨ ساڵ',
      } },
      { id: 'b', text: {
        ar: '20سنة من العمر',
        en: '20 years of age',
        ckb: '٢٠ ساڵ',
      } },
      { id: 'c', text: {
        ar: '22سنة من العمر',
        en: '22 years of age',
        ckb: '٢٢ ساڵ',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يشترط إكمال 18 سنة لإجازة المركبات الخصوصية.',
      en: 'A private-vehicle licence requires the applicant to be 18.',
      ckb: 'بۆ مۆڵەتی ئۆتۆمبێلی تایبەت تەمەنی ١٨ ساڵ پێویستە.',
    },
  },
  {
    id: 'q-assaulting-traffic-officer',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٣٤' },
    prompt: {
      ar: 'كل من هدد واعتدى على رجل المرور اثناء تأدية واجبه يعاقب بعقوبة؟',
      en: 'Anyone who threatens or assaults a traffic officer in the course of duty is punished by:',
      ckb: 'هەر کەسێک هەڕەشە بکات یان پەلاماری پۆلیسی هاتوچۆ بدات لە کاتی ئەرکەکەیدا، سزا دەدرێت بە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'مدة لا تزيد على ثلاث سنوات',
        en: 'A term not exceeding three years',
        ckb: 'ماوەیەک کە لە سێ ساڵ زیاتر نەبێت',
      } },
      { id: 'c', text: {
        ar: 'لايتخذ بحقه اي اجراء',
        en: 'No action is taken against them',
        ckb: 'هیچ کارێکی لە دژ ناکرێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العقوبة مدة لا تزيد على ثلاث سنوات.',
      en: 'The penalty is a term not exceeding three years.',
      ckb: 'سزاکە ماوەیەکە کە لە سێ ساڵ زیاتر نییە.',
    },
  },
  {
    id: 'q-night-high-beam-except-meeting',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٣٥' },
    prompt: {
      ar: 'أثناء القيادة الليلية يجب إستخدام الضياء العالي بصورة مستمرة إلا في حالة التقابل مع مركبة مواجهة أو الاقتراب من المركبة التي أمامك؟',
      en: 'When driving at night, main beam should be used continuously except when meeting an oncoming vehicle or closing on the vehicle ahead?',
      ckb: 'لە لێخوڕینی شەوانەدا دەبێت ڕووناکی بەرز بە بەردەوامی بەکاربهێنرێت جگە لە کاتی بەریەککەوتن یان نزیکبوونەوە لە ئۆتۆمبێلی پێشەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
      { id: 'b', text: {
        ar: 'كلا',
        en: 'No',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'يجب استخدام الضياء الواطئ',
        en: 'Dipped beam must be used',
        ckb: 'دەبێت ڕووناکی نزم بەکاربهێنرێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نعم، مع التحويل إلى الواطئ عند التقابل أو الاقتراب.',
      en: 'Yes, dip it when meeting or closing on another vehicle.',
      ckb: 'بەڵێ، بەڵام لە کاتی بەریەککەوتندا بۆ نزم بگۆڕە.',
    },
  },
  {
    id: 'q-assault-officer-with-injury',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٣٦' },
    prompt: {
      ar: 'كل من اعتدى على رجل المرور اثناء تأدية واجبه واذا حصل نتيجة الاعتداء والمقاومة جرح او اذى يعاقب ب؟',
      en: 'Anyone who assaults a traffic officer on duty, where the assault and resistance cause a wound or harm, is punished by:',
      ckb: 'هەر کەسێک پەلاماری پۆلیسی هاتوچۆ بدات و بریندارکردن یان زیانی لێبکەوێتەوە، سزا دەدرێت بە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يسحب منه اجازة السوق مدى الحياة',
        en: 'Lifetime withdrawal of the driving licence',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ هەتاهەتایە',
      } },
      { id: 'b', text: {
        ar: 'دفع غرامة مالية',
        en: 'Payment of a fine',
        ckb: 'دانی غەرامەی دارایی',
      } },
      { id: 'c', text: {
        ar: 'الحبس مدة لا تزيد على خمسة سنوات',
        en: 'Imprisonment for a term not exceeding five years',
        ckb: 'زیندانی ماوەیەک کە لە پێنج ساڵ زیاتر نەبێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العقوبة الحبس مدة لا تزيد على خمس سنوات.',
      en: 'The penalty is imprisonment for up to five years.',
      ckb: 'سزاکە زیندانە بۆ ماوەی نەزیاتر لە پێنج ساڵ.',
    },
  },
  {
    id: 'q-exceeding-max-speed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٣٧' },
    prompt: {
      ar: 'السير بسرعة اعلى من الحد الاقصى للطريق مسموح به فقط؟',
      en: 'Travelling faster than the road\'s maximum limit is permitted only:',
      ckb: 'ڕۆیشتن بە خێراتر لە سنووری بەرزی ڕێگا تەنها کەی ڕێپێدراوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عند تجاوز مركبة اخرى',
        en: 'When overtaking another vehicle',
        ckb: 'لە کاتی تێپەڕاندنی ئۆتۆمبێلێکی تر',
      } },
      { id: 'b', text: {
        ar: 'عندما تكون المركبات الاخرى تسير بسرعة اكثر من الحد الاقصى',
        en: 'When other vehicles are travelling above the limit',
        ckb: 'کاتێک ئۆتۆمبێلەکانی تر خێراتر دەڕۆن',
      } },
      { id: 'c', text: {
        ar: 'لا يسمح به قانونياً على الاطلاق',
        en: 'It is never legally permitted',
        ckb: 'بە هیچ شێوەیەک بە یاسا ڕێپێدراو نییە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تجاوز الحد الأقصى للسرعة غير مسموح قانوناً على الإطلاق.',
      en: 'Exceeding the speed limit is never legally permitted.',
      ckb: 'تێپەڕاندنی سنووری خێرایی بە هیچ شێوەیەک ڕێپێدراو نییە.',
    },
  },
  {
    id: 'q-bald-spare-tyre',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٣٨' },
    prompt: {
      ar: 'إذ كان الاطار الاحتياطي مستهلك او أملس وإضطررت لإستبداله، هل ستكون القيادة بالاطار الاحتياطي قانونية؟',
      en: 'If the spare tyre is worn or bald and you have to fit it, is driving on that spare legal?',
      ckb: 'ئەگەر تایەی یەدەگ داڕزاو یان لووس بێت و ناچار بیت بیگۆڕیت، ئایا لێخوڕین بەو تایەیە یاساییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم مادام الإطار مملوء الهواء وبالضغط المطلوب',
        en: 'Yes, as long as it is inflated to the required pressure',
        ckb: 'بەڵێ، تا ئەو کاتەی بە پەستانی پێویست پڕە',
      } },
      { id: 'b', text: {
        ar: 'نعم ولكن ينبغي عليك إصلاح الاطار المثقوب خلال اربع وعشرون ساعة',
        en: 'Yes, but you must repair the punctured tyre within twenty-four hours',
        ckb: 'بەڵێ، بەڵام دەبێت لە ماوەی ٢٤ کاتژمێردا چاکی بکەیتەوە',
      } },
      { id: 'c', text: {
        ar: 'لا، فالقيادة بإطار أملس أمر غير قانوني حتى لو كان إطاراً إحتياطياً',
        en: 'No, driving on a bald tyre is illegal even if it is the spare',
        ckb: 'نەخێر، لێخوڕین بە تایەی لووس نایاساییە تەنانەت ئەگەر یەدەگیش بێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'القيادة بإطار أملس غير قانونية ولو كان احتياطياً.',
      en: 'Driving on a bald tyre is illegal, spare or not.',
      ckb: 'لێخوڕین بە تایەی لووس نایاساییە.',
    },
  },
  {
    id: 'q-moving-off-priority',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١٣٩' },
    prompt: {
      ar: 'بحسب اسبقيات المرور عندما تنوي البدء بتحريك المركبة والدخول الى الطريق يجب ان؟',
      en: 'Under the rules of priority, when you intend to move off and join the road you must:',
      ckb: 'بەپێی پێشینەییەکانی هاتوچۆ، کاتێک دەتەوێت بجوڵێیت و بچیتە ناو ڕێگا، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تبدا بالحركة فورا دون النظر الى الشارع',
        en: 'Move off at once without looking at the street',
        ckb: 'دەستبەجێ بجوڵێیت بەبێ سەیرکردنی شەقام',
      } },
      { id: 'b', text: {
        ar: 'تتمهل وتنتظر الى الشارع من خلال المراة وعندما تحين الفرصة تبدا بالحركة',
        en: 'Take your time, watch the street in the mirror, and move off when the opportunity comes',
        ckb: 'هێواش بیت و لە ئاوێنەوە شەقامەکە ببینیت و کاتێک دەرفەت هات بجوڵێیت',
      } },
      { id: 'c', text: {
        ar: 'لاتعطي الفرصة للمركبات التي تمشي في الطريق باستثناء مركبات الطواريء',
        en: 'Not give way to vehicles already on the road, except emergency vehicles',
        ckb: 'ڕێگا نەدەیت بەو ئۆتۆمبێلانەی لە ڕێگادان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُنتظر ويُراقب الشارع عبر المرآة ثم تبدأ الحركة عند سنوح الفرصة.',
      en: 'Wait, watch the street in the mirror, and pull out when it is safe.',
      ckb: 'چاوەڕێ بکە، لە ئاوێنەوە سەیر بکە و کاتێک دەرفەت هات بجوڵێ.',
    },
  },
  {
    id: 'q-eco-driving-speed',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٤٠' },
    prompt: {
      ar: 'كيف تحافظ على البيئة وتكن صديقاً لها؟',
      en: 'How do you protect the environment and stay friendly to it?',
      ckb: 'چۆن ژینگە دەپارێزیت و دۆستی دەبیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'بقيادة المركبة بالسرعة القصوى 110 كم / ساعة',
        en: 'By driving at the maximum speed of 110 km/h',
        ckb: 'بە لێخوڕین بە بەرزترین خێرایی ١١٠ کم/کاتژمێر',
      } },
      { id: 'b', text: {
        ar: 'بقيادة المركبة بالسرعة 100 كم / ساعة',
        en: 'By driving at 100 km/h',
        ckb: 'بە لێخوڕین بە ١٠٠ کم/کاتژمێر',
      } },
      { id: 'c', text: {
        ar: 'بقيادة المركبة بالسرعة الاقتصادية والتي تتراوح بين 60كم و70 كم / ساعة',
        en: 'By driving at the economical speed, between 60 and 70 km/h',
        ckb: 'بە لێخوڕین بە خێرایی ئابووری نێوان ٦٠ و ٧٠ کم/کاتژمێر',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'القيادة بالسرعة الاقتصادية بين 60 و70 كم/ساعة أفضل للبيئة.',
      en: 'Driving at the economical 60–70 km/h is best for the environment.',
      ckb: 'لێخوڕین بە خێرایی ئابووری ٦٠–٧٠ باشترە بۆ ژینگە.',
    },
  },
  {
    id: 'q-engine-warm-up-time',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٤١' },
    prompt: {
      ar: 'كيف تحافظ على البيئة وتكن صديقاً لها؟',
      en: 'How do you protect the environment and stay friendly to it?',
      ckb: 'چۆن ژینگە دەپارێزیت و دۆستی دەبیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ترك محرك المركبة يشتغل للتسخين لأكثر من ثلاثة دقائق في الشتاء',
        en: 'Leave the engine warming up for more than three minutes in winter',
        ckb: 'بزوێنەر زیاتر لە سێ خولەک بۆ گەرمبوون بەجێبهێڵیت لە زستاندا',
      } },
      { id: 'b', text: {
        ar: 'ترك محرك المركبة يشتغل للتسخين دقيقة واحدة في الشتاء او الصيف',
        en: 'Leave the engine warming up for one minute, in winter or summer',
        ckb: 'بزوێنەر یەک خولەک بۆ گەرمبوون بەجێبهێڵیت لە زستان یان هاویندا',
      } },
      { id: 'c', text: {
        ar: 'ترك محرك المركبة يشتغل للتسخين لاكثر من خمسة دقائق في الشتاء',
        en: 'Leave the engine warming up for more than five minutes in winter',
        ckb: 'بزوێنەر زیاتر لە پێنج خولەک بەجێبهێڵیت لە زستاندا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يكفي تشغيل المحرك للتسخين دقيقة واحدة صيفاً أو شتاءً.',
      en: 'One minute of warm-up is enough, summer or winter.',
      ckb: 'یەک خولەک گەرمبوونەوە بەسە، هاوین یان زستان.',
    },
  },
  {
    id: 'q-breakdown-procedure',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٤٢' },
    prompt: {
      ar: 'ما هي الاجراءات التي يجب أن تتبع في حالة عطل المركبة في الشارع؟',
      en: 'What must you do if the vehicle breaks down in the street?',
      ckb: 'لە کاتی تێکچوونی ئۆتۆمبێل لە شەقامدا چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تشغيل إضوية التحذير الرباعية ومحاولة تحريك المركبة لإيقافها في مسلك أقصى اليمين بأسرع وقت ثم وضع المثلث الفسفوري',
        en: 'Switch on the hazard lights, move the vehicle to the far right lane as quickly as possible, then place the reflective triangle',
        ckb: 'چرا ئاگادارکەرەوە چوارەکان داگیرسێنە و بە خێرایی ئۆتۆمبێلەکە بۆ لاینی دوورترین ڕاست ببە، پاشان سێگۆشەی فۆسفۆری دابنێ',
      } },
      { id: 'b', text: {
        ar: 'ترك المركبة في موقعها ووضع المثلث الفسفوري خلفها بمسافة 50 م',
        en: 'Leave the vehicle where it is and place the reflective triangle 50 m behind it',
        ckb: 'ئۆتۆمبێلەکە لە شوێنی خۆی بهێڵەوە و سێگۆشەکە ٥٠ مەتر لە دواوە دابنێ',
      } },
      { id: 'c', text: {
        ar: 'البدء بتصليح المركبة في موقع توقفها ايا كان المسار',
        en: 'Begin repairing the vehicle where it stopped, whatever lane that is',
        ckb: 'لە هەمان شوێندا دەست بکە بە چاککردنەوەی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُشغّل أضوية التحذير وتُنقل المركبة إلى أقصى اليمين ثم يوضع المثلث.',
      en: 'Hazards on, move to the far right, then set out the triangle.',
      ckb: 'چراکان داگیرسێنە، بۆ لای ڕاست ببە و سێگۆشەکە دابنێ.',
    },
  },
  {
    id: 'q-battery-acid-on-skin',
    topic: 'firstaid',
    verified: true,
    source: { ...S, locator: 'س ١٤٣' },
    prompt: {
      ar: 'سائل بطارية المركبة هو حامض عند ملامسة الجلد يجب ان؟',
      en: 'The vehicle battery\'s fluid is acid; if it touches the skin you must:',
      ckb: 'شلەی باتری ئۆتۆمبێل ترشە، ئەگەر بەر پێست کەوت دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ينقل الشخص الى المستشفى',
        en: 'Take the person to hospital',
        ckb: 'کەسەکە بۆ نەخۆشخانە بگوێزرێتەوە',
      } },
      { id: 'b', text: {
        ar: 'تركه لحين وصول مركبة الاسعاف لغرض نقله',
        en: 'Leave them until the ambulance arrives to move them',
        ckb: 'بەجێبهێڵدرێت تا ئەمبولانس دێت',
      } },
      { id: 'c', text: {
        ar: 'يجب غسل المنطقة التي تلامس الحامض بالماء باسرع وقت',
        en: 'Wash the area the acid touched with water as quickly as possible',
        ckb: 'ئەو ناوچەیەی بەر ترشەکە کەوتووە بە خێرایی بە ئاو بشۆردرێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تُغسل المنطقة الملامسة للحامض بالماء بأسرع وقت.',
      en: 'Wash the affected area with water as quickly as possible.',
      ckb: 'ناوچە بەرکەوتووەکە بە خێرایی بە ئاو بشۆ.',
    },
  },
  {
    id: 'q-when-to-signal',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٤٤' },
    prompt: {
      ar: 'متى يسري على السائق واجب اعطاء الاشارة الضوئيه؟',
      en: 'When does the duty to signal apply to a driver?',
      ckb: 'کەی ئەرکی ئاماژەدان بە چرا لەسەر شۆفێر جێبەجێ دەبێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عندما ينوي الانحراف عن مسلكه',
        en: 'When intending to move out of their lane',
        ckb: 'کاتێک دەیەوێت لە لاینەکەی لابدات',
      } },
      { id: 'b', text: {
        ar: 'عندما يصل الى منحدر شديد',
        en: 'When reaching a steep descent',
        ckb: 'کاتێک دەگاتە لێژاییەکی توند',
      } },
      { id: 'c', text: {
        ar: 'عندما يصل الى شرطي المرور',
        en: 'When reaching a traffic officer',
        ckb: 'کاتێک دەگاتە پۆلیسی هاتوچۆ',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُعطى الإشارة عند نية الانحراف عن المسلك.',
      en: 'Signal when you intend to change lane.',
      ckb: 'کاتێک دەتەوێت لاین بگۆڕیت ئاماژە بدە.',
    },
  },
  {
    id: 'q-switch-off-engine-in-jam',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٤٥' },
    prompt: {
      ar: 'عند توقف الحركة في الشوارع المزدحمة إطفي محرك مركبتك اذا كانت المدة تزيد عن؟',
      en: 'When traffic is at a standstill on congested streets, switch off your engine if the wait exceeds:',
      ckb: 'کاتێک جوڵە لە شەقامە قەرەباڵغەکاندا دەوەستێت، بزوێنەر بکوژێنەوە ئەگەر ماوەکە زیاتر بوو لە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خمسة دقائق',
        en: 'Five minutes',
        ckb: 'پێنج خولەک',
      } },
      { id: 'b', text: {
        ar: 'ثلاثة دقائق',
        en: 'Three minutes',
        ckb: 'سێ خولەک',
      } },
      { id: 'c', text: {
        ar: 'سبعة دقائق',
        en: 'Seven minutes',
        ckb: 'حەوت خولەک',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُطفأ المحرك إذا زادت المدة عن ثلاث دقائق.',
      en: 'Switch off if the wait is longer than three minutes.',
      ckb: 'ئەگەر زیاتر لە سێ خولەک بوو بیکوژێنەوە.',
    },
  },
  {
    id: 'q-engine-knocking-cause',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٤٦' },
    prompt: {
      ar: 'ما سبب سماع صوت الطرق (الدق) أثناء تشغيل المحرك أو إستخدام المركبة تحت حمل أو بدونه؟',
      en: 'What causes knocking when the engine runs, whether the vehicle is loaded or not?',
      ckb: 'هۆکاری دەنگی لێدان لە کاتی کارکردنی بزوێنەردا چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عند إستعمال بنزين ذات درجة اوكتان واطئه',
        en: 'Using petrol with a low octane rating',
        ckb: 'بەکارهێنانی بەنزینی ئۆکتانی نزم',
      } },
      { id: 'b', text: {
        ar: 'عدم تعرض المحرك لحمل كبير فوق طاقته',
        en: 'The engine not being loaded beyond its capacity',
        ckb: 'بەرنەکەوتنی بزوێنەر بۆ باری زۆر',
      } },
      { id: 'c', text: {
        ar: 'كمية البنزين في الخزان قليلة',
        en: 'There being little petrol in the tank',
        ckb: 'کەمی بەنزین لە تانکەکەدا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'صوت الطرق ناتج عن استعمال بنزين بدرجة أوكتان واطئة.',
      en: 'Knocking comes from using low-octane petrol.',
      ckb: 'دەنگی لێدان لە بەنزینی ئۆکتان نزمەوە دێت.',
    },
  },
  {
    id: 'q-slippery-road-danger',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٤٧' },
    prompt: {
      ar: 'اهم المخاطر لقيادة المركبة في الطرق الزلقة هي؟',
      en: 'The greatest danger when driving on slippery roads is:',
      ckb: 'گەورەترین مەترسی لێخوڕین لە ڕێگا خلیسکەکاندا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'السرعة البطيئة',
        en: 'Low speed',
        ckb: 'خێرایی کەم',
      } },
      { id: 'b', text: {
        ar: 'استخدام حزام الامان',
        en: 'Wearing the seat belt',
        ckb: 'بەستنی پشتێنی سەلامەتی',
      } },
      { id: 'c', text: {
        ar: 'السرعة العالية',
        en: 'High speed',
        ckb: 'خێرایی بەرز',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'السرعة العالية هي أهم المخاطر على الطرق الزلقة.',
      en: 'High speed is the main danger on slippery roads.',
      ckb: 'خێرایی بەرز گەورەترین مەترسییە.',
    },
  },
  {
    id: 'q-fire-extinguisher-required',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٤٨' },
    prompt: {
      ar: 'هل من الضروري تواجد جهاز إطفاء الحريق في المركبة؟',
      en: 'Is it necessary to carry a fire extinguisher in the vehicle?',
      ckb: 'ئایا پێویستە ئامێری ئاگرکوژێنەوە لە ئۆتۆمبێلدا هەبێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
      { id: 'b', text: {
        ar: 'كلا',
        en: 'No',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'غير ضروري',
        en: 'Not necessary',
        ckb: 'پێویست نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نعم، وجود جهاز إطفاء الحريق ضروري في المركبة.',
      en: 'Yes, a fire extinguisher is required in the vehicle.',
      ckb: 'بەڵێ، ئامێری ئاگرکوژێنەوە پێویستە.',
    },
  },
  {
    id: 'q-overtaking-on-bridge-legal',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٤٩' },
    prompt: {
      ar: 'من الناحية القانونية عندما تسير بمركبتك فوق جسر وتسبقك مركبة اخرى؟',
      en: 'Legally, when you are driving over a bridge and another vehicle is ahead of you:',
      ckb: 'لە ڕووی یاساییەوە، کاتێک لەسەر پردێک لێدەخوڕیت و ئۆتۆمبێلێکی تر لە پێشتە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يسمح لك باجتيازه',
        en: 'You are allowed to overtake it',
        ckb: 'بۆت هەیە تێیپەڕێنیت',
      } },
      { id: 'b', text: {
        ar: 'يمنع اجتيازه',
        en: 'Overtaking is prohibited',
        ckb: 'تێپەڕاندن قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'فقط في حالة كنت تقود مركبة حمل لايسمح بالاجتياز',
        en: 'Overtaking is only prohibited if you are driving a goods vehicle',
        ckb: 'تەنها ئەگەر بارهەڵگر لێبخوڕیت قەدەغەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الاجتياز فوق الجسور ممنوع.',
      en: 'Overtaking on bridges is prohibited.',
      ckb: 'تێپەڕاندن لەسەر پرد قەدەغەیە.',
    },
  },
  {
    id: 'q-engine-overheating-cause',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٠' },
    prompt: {
      ar: 'أحد أسباب إرتفاع درجة حرارة المحرك؟',
      en: 'One cause of the engine overheating is:',
      ckb: 'یەکێک لە هۆکارەکانی بەرزبوونەوەی پلەی گەرمی بزوێنەر:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'قلة ماء منظومة التبريد أو عطل غطاء الراديتر',
        en: 'Too little coolant, or a faulty radiator cap',
        ckb: 'کەمی ئاوی سیستەمی ساردکردنەوە یان تێکچوونی سەرپۆشی ڕادیەتەر',
      } },
      { id: 'b', text: {
        ar: 'قيادة المركبة في جو ضبابي',
        en: 'Driving in foggy weather',
        ckb: 'لێخوڕین لە کەشی تەمناک',
      } },
      { id: 'c', text: {
        ar: 'القيادة في جو بارد',
        en: 'Driving in cold weather',
        ckb: 'لێخوڕین لە کەشی سارد',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'قلة ماء التبريد أو عطل غطاء الراديتر يرفع حرارة المحرك.',
      en: 'Low coolant or a faulty radiator cap makes the engine overheat.',
      ckb: 'کەمی ئاوی ساردکەرەوە یان تێکچوونی سەرپۆش.',
    },
  },
  {
    id: 'q-motorcycle-licence-age',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥١' },
    prompt: {
      ar: 'من الناحية القانونية تمنح اجازة سوق قيادة دراجة نارية لمن اكمل؟',
      en: 'Legally, a motorcycle driving licence is granted to someone who has completed:',
      ckb: 'لە ڕووی یاساییەوە، مۆڵەتی لێخوڕینی ماتۆڕسکیل بەو کەسە دەدرێت کە تەواوی کردبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: '17السابعة عشر من العمر',
        en: '17 years of age',
        ckb: '١٧ ساڵ',
      } },
      { id: 'b', text: {
        ar: '16السادس عشر من العمر',
        en: '16 years of age',
        ckb: '١٦ ساڵ',
      } },
      { id: 'c', text: {
        ar: '18الثامنة عشر من العمر',
        en: '18 years of age',
        ckb: '١٨ ساڵ',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تُمنح إجازة الدراجة النارية لمن أكمل السادسة عشرة.',
      en: 'A motorcycle licence is granted at 16.',
      ckb: 'مۆڵەتی ماتۆڕسکیل لە تەمەنی ١٦ ساڵییەوە دەدرێت.',
    },
  },
  {
    id: 'q-reflective-triangle-required',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٢' },
    prompt: {
      ar: 'هل من الضروري تواجد المثلث الفسفوري في المركبة؟',
      en: 'Is it necessary to carry the reflective triangle in the vehicle?',
      ckb: 'ئایا پێویستە سێگۆشەی فۆسفۆری لە ئۆتۆمبێلدا هەبێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
      { id: 'b', text: {
        ar: 'كلا',
        en: 'No',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'غير ضروري',
        en: 'Not necessary',
        ckb: 'پێویست نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نعم، وجود المثلث الفسفوري ضروري في المركبة.',
      en: 'Yes, the reflective triangle is required in the vehicle.',
      ckb: 'بەڵێ، سێگۆشەی فۆسفۆری پێویستە.',
    },
  },
  {
    id: 'q-spare-tyre-required',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٣' },
    prompt: {
      ar: 'هل من الضروري تواجد الإطار الإحتياطي ومستلزماته في المركبة؟',
      en: 'Is it necessary to carry the spare tyre and its equipment in the vehicle?',
      ckb: 'ئایا پێویستە تایەی یەدەگ و پێداویستییەکانی لە ئۆتۆمبێلدا هەبن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
      { id: 'b', text: {
        ar: 'كلا',
        en: 'No',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'غير ضروري',
        en: 'Not necessary',
        ckb: 'پێویست نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نعم، الإطار الاحتياطي ومستلزماته ضرورية في المركبة.',
      en: 'Yes, the spare tyre and its equipment are required.',
      ckb: 'بەڵێ، تایەی یەدەگ و پێداویستییەکانی پێویستن.',
    },
  },
  {
    id: 'q-fuel-leak-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٤' },
    prompt: {
      ar: 'هل يؤثر تسرب الوقود في نظام الوقود على الفحص الفني السنوي للمركبة؟',
      en: 'Does a leak in the fuel system affect the vehicle\'s annual technical inspection?',
      ckb: 'ئایا دزەکردنی سووتەمەنی کاریگەری هەیە لەسەر پشکنینی تەکنیکی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail the inspection',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن لە پشکنیندا',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تسرب الوقود يؤدي إلى فشل المركبة في الفحص.',
      en: 'A fuel leak causes the vehicle to fail the inspection.',
      ckb: 'دزەکردنی سووتەمەنی دەبێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-overloading-passengers',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٥٥' },
    prompt: {
      ar: 'حمل ركاب اكثر من المقرر ممنوع لانه يؤدي الى؟',
      en: 'Carrying more passengers than permitted is prohibited because it leads to:',
      ckb: 'هەڵگرتنی سەرنشینی زیاتر لە دیاریکراو قەدەغەیە چونکە دەبێتە هۆی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حوادث لاعاقة وحجب رؤية السائق',
        en: 'Accidents, obstruction and blocking the driver\'s view',
        ckb: 'ڕووداو و ڕێگرتن و شاردنەوەی بینینی شۆفێر',
      } },
      { id: 'b', text: {
        ar: 'ازعاج الركاب',
        en: 'Discomfort for the passengers',
        ckb: 'ناڕەحەتی سەرنشینەکان',
      } },
      { id: 'c', text: {
        ar: 'استهلاك المركبة',
        en: 'Wear on the vehicle',
        ckb: 'داڕزانی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الحمل الزائد يعيق السائق ويحجب رؤيته ويؤدي إلى الحوادث.',
      en: 'Overloading obstructs the driver\'s view and causes accidents.',
      ckb: 'باری زیادە بینینی شۆفێر دەشارێتەوە و دەبێتە هۆی ڕووداو.',
    },
  },
  {
    id: 'q-brake-fluid-leak-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٦' },
    prompt: {
      ar: 'هل يؤثر تسرب زيت الفرامل على الفحص الفني السنوي للمركبة؟',
      en: 'Does a brake-fluid leak affect the vehicle\'s annual technical inspection?',
      ckb: 'ئایا دزەکردنی زەیتی برێک کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail the inspection',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن لە پشکنیندا',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تسرب زيت الفرامل يؤدي إلى فشل المركبة في الفحص.',
      en: 'A brake-fluid leak causes the vehicle to fail.',
      ckb: 'دزەکردنی زەیتی برێک دەبێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-handbrake-fault-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٧' },
    prompt: {
      ar: 'هل يؤثر عطل الهاند بريك على الفحص الفني السنوي للمركبة؟',
      en: 'Does a faulty handbrake affect the vehicle\'s annual technical inspection?',
      ckb: 'ئایا تێکچوونی هاندبرێک کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail the inspection',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن لە پشکنیندا',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عطل الهاند بريك يؤدي إلى فشل المركبة في الفحص.',
      en: 'A faulty handbrake causes the vehicle to fail.',
      ckb: 'تێکچوونی هاندبرێک دەبێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-residential-junction-blocked-view',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٥٨' },
    prompt: {
      ar: 'عند تقاطع الطرق داخل الاحياء السكنية حيث تحجب المباني والاشجار رؤيتك يجب عليك؟',
      en: 'At junctions inside residential areas where buildings and trees block your view you must:',
      ckb: 'لە چوارڕیانی ناو گەڕەکە نیشتەجێبووەکاندا کە بینا و درەخت بینینت دەشارنەوە، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ان تتوقف عند التقاطع وبعد التاكد من خلوه تبدا بالحركة بتمهل',
        en: 'Stop at the junction and, once sure it is clear, move off slowly',
        ckb: 'لە چوارڕیانەکە بوەستیت و دوای دڵنیابوون لە بەتاڵی بە هێواشی بجوڵێیت',
      } },
      { id: 'b', text: {
        ar: 'ان تتوقف في وسط التقاطع وتنظر الى كل الجهات ومن ثم تبدا بالحركة من جديد',
        en: 'Stop in the middle of the junction, look all ways, then move off again',
        ckb: 'لە ناوەڕاستی چوارڕیانەکە بوەستیت و سەیری هەموو لایەک بکەیت',
      } },
      { id: 'c', text: {
        ar: 'ان لاتتوقف وفقط تستخدم التنبية (الهورن) لتنبيه السائقين الاخرين',
        en: 'Not stop, and just sound the horn to warn other drivers',
        ckb: 'نەوەستیت و تەنها بۆری لێبدەیت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُتوقف عند التقاطع ويُتأكد من خلوه قبل التقدم بتمهل.',
      en: 'Stop at the junction, confirm it is clear, then creep forward.',
      ckb: 'لە چوارڕیانەکە بوەستە، دڵنیابە و بە هێواشی بڕۆ.',
    },
  },
  {
    id: 'q-front-tyre-wear-cause',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٥٩' },
    prompt: {
      ar: 'ما أسباب ظهور استهلاك الاطارات (خصوصاً الامامية) بسرعة؟',
      en: 'What causes the tyres (especially the front ones) to wear quickly?',
      ckb: 'هۆکاری داڕزانی خێرای تایەکان (بەتایبەت پێشەوەکان) چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تعليق المركبة وموازنتها يحتاج الى إصلاح وتنظيم',
        en: 'The suspension and wheel alignment need repair and adjustment',
        ckb: 'هەڵواسین و هاوسەنگی ئۆتۆمبێلەکە پێویستی بە چاککردنەوە و ڕێکخستن هەیە',
      } },
      { id: 'b', text: {
        ar: 'قيادة المركبة من دون ركاب',
        en: 'Driving the vehicle without passengers',
        ckb: 'لێخوڕین بەبێ سەرنشین',
      } },
      { id: 'c', text: {
        ar: 'قيادة المركبة في الطرق الداخلية',
        en: 'Driving the vehicle on inner-city roads',
        ckb: 'لێخوڕین لە ڕێگا ناوەکییەکان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'خلل التعليق والموازنة يسبب استهلاك الإطارات بسرعة.',
      en: 'Faulty suspension and alignment wear the tyres quickly.',
      ckb: 'کێشەی هەڵواسین و هاوسەنگی تایەکان زوو دەڕزێنێت.',
    },
  },
  {
    id: 'q-side-mirrors-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٦٠' },
    prompt: {
      ar: 'هل يؤثر إنكسار أو إنعدام المرايا الجانبية على الفحص الفني السنوي للمركبة؟',
      en: 'Do broken or missing side mirrors affect the vehicle\'s annual technical inspection?',
      ckb: 'ئایا شکان یان نەبوونی ئاوێنە لاتەنیشتەکان کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail the inspection',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن لە پشکنیندا',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'انكسار المرايا الجانبية أو انعدامها يؤدي إلى فشل الفحص.',
      en: 'Broken or missing side mirrors cause the vehicle to fail.',
      ckb: 'شکان یان نەبوونی ئاوێنەکان دەبێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-wiper-fault-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٦١' },
    prompt: {
      ar: 'هل يؤثر عطل الماسحة على الفحص الفني السنوي للمركبة؟',
      en: 'Does a faulty windscreen wiper affect the vehicle\'s annual technical inspection?',
      ckb: 'ئایا تێکچوونی سڕەوە کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail the inspection',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن لە پشکنیندا',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عطل الماسحة يؤدي إلى فشل المركبة في الفحص.',
      en: 'A faulty wiper causes the vehicle to fail.',
      ckb: 'تێکچوونی سڕەوە دەبێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-hard-shoulder-width',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٦٢' },
    prompt: {
      ar: 'كتف الطريق هو جزء الطريق الذي يكون على جانبي الطريق ويكون اما مبلط او ترابي لا يتجاوز عرضه عن؟',
      en: 'The hard shoulder is the part at the sides of the road, either paved or unpaved, no wider than:',
      ckb: 'شانی ڕێگا ئەو بەشەیە لە هەردوو لای ڕێگاوە و پانییەکەی تێناپەڕێت لە:',
    },
    choices: [
      { id: 'a', text: {
        ar: '2,5متر',
        en: '2.5 metres',
        ckb: '٢٫٥ مەتر',
      } },
      { id: 'b', text: {
        ar: '3,5متر',
        en: '3.5 metres',
        ckb: '٣٫٥ مەتر',
      } },
      { id: 'c', text: {
        ar: '4,0متر',
        en: '4.0 metres',
        ckb: '٤٫٠ مەتر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عرض كتف الطريق لا يتجاوز 2.5 متر.',
      en: 'The hard shoulder is no wider than 2.5 m.',
      ckb: 'پانی شانی ڕێگا لە ٢٫٥ مەتر تێناپەڕێت.',
    },
  },
  {
    id: 'q-parking-beside-parked-vehicle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٦٣' },
    prompt: {
      ar: 'هل يجوز ايقاف المركبة بجانب مركبة اخرى واقفة بجانب الطريق؟',
      en: 'May a vehicle be parked beside another vehicle already parked at the roadside?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل لەتەنیشت ئۆتۆمبێلێکی تری وەستاو بوەستێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لايجوز وممنوع منعا باتا',
        en: 'No, it is strictly prohibited',
        ckb: 'نەخێر، بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'مسموح به اذا كان عرض الطريق يساعد على ذلك',
        en: 'Allowed if the width of the road permits',
        ckb: 'ڕێپێدراوە ئەگەر پانی ڕێگاکە ڕێگا بدات',
      } },
      { id: 'c', text: {
        ar: 'نعم يجوز لمدة قصيرة',
        en: 'Yes, for a short time',
        ckb: 'بەڵێ، بۆ ماوەیەکی کورت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الوقوف بجانب مركبة واقفة ممنوع منعاً باتاً.',
      en: 'Parking beside an already parked vehicle is strictly prohibited.',
      ckb: 'وەستان لەتەنیشت ئۆتۆمبێلی وەستاو بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-parking-bridge-tunnel-allowed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٦٤' },
    prompt: {
      ar: 'متى يسمح بايقاف المركبة فوق جسر او بداخل النفق؟',
      en: 'When is parking on a bridge or inside a tunnel allowed?',
      ckb: 'کەی ڕێپێدراوە ئۆتۆمبێل لەسەر پرد یان ناو تونێل بوەستێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لايسمح وممنوع منعا باتا',
        en: 'It is not allowed and is strictly prohibited',
        ckb: 'ڕێپێدراو نییە، بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع فقط في الليل',
        en: 'Prohibited only at night',
        ckb: 'تەنها بە شەو قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'مسموح اذا كان الوقوف لمدة قصيرة',
        en: 'Allowed if the stop is brief',
        ckb: 'ڕێپێدراوە ئەگەر بۆ ماوەیەکی کورت بێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'ممنوع منعاً باتاً إيقاف المركبة فوق جسر أو داخل نفق.',
      en: 'Parking on a bridge or in a tunnel is strictly prohibited.',
      ckb: 'وەستان لەسەر پرد یان ناو تونێل بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-engine-oil-change-interval',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٦٥' },
    prompt: {
      ar: 'متى يتم تبديل زيت المحرك؟',
      en: 'When should the engine oil be changed?',
      ckb: 'کەی زەیتی بزوێنەر دەگۆڕدرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يتم تبديل زيت المحرك حسب قياس عداد المركبه بالمسافة التي قطعتها ونوعية ومواصفات الزيت',
        en: 'According to the odometer reading for the distance covered, and the type and specification of the oil',
        ckb: 'بەپێی ژمێرەری ئۆتۆمبێل بۆ ئەو ماوەیەی بڕیوێتی و جۆر و تایبەتمەندی زەیتەکە',
      } },
      { id: 'b', text: {
        ar: 'يتم تبديل زيت المحرك كل 1000 كم',
        en: 'Every 1,000 km',
        ckb: 'هەر ١٠٠٠ کم',
      } },
      { id: 'c', text: {
        ar: 'يتم تبديل زيت المحرك في فصل الشتاء والصيف',
        en: 'In winter and in summer',
        ckb: 'لە وەرزی زستان و هاویندا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُبدل الزيت وفق المسافة المقطوعة ونوعية الزيت ومواصفاته.',
      en: 'Change it according to distance covered and the oil\'s specification.',
      ckb: 'بەپێی ماوەی بڕاو و جۆری زەیتەکە بگۆڕە.',
    },
  },
  {
    id: 'q-drink-drive-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٦٦' },
    prompt: {
      ar: 'كل من قاد مركبته تحت تأثير الكحول او المخدر يعاقب بـ؟',
      en: 'Anyone driving under the influence of alcohol or drugs is punished by:',
      ckb: 'هەر کەسێک لەژێر کاریگەری کحول یان ماددەی هۆشبەردا لێبخوڕێت، سزا دەدرێت بە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اعطائه ورقة محاسبة',
        en: 'Being issued a penalty notice',
        ckb: 'دانی پەڕەی سزا',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الحبس او الغرامة او بكلتا العقوبتين',
        en: 'Imprisonment or a fine, or both',
        ckb: 'زیندان یان غەرامە یان هەردووکیان',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العقوبة الحبس أو الغرامة أو كلتاهما.',
      en: 'The penalty is imprisonment or a fine, or both.',
      ckb: 'سزاکە زیندان یان غەرامە یان هەردووکیانە.',
    },
  },
  {
    id: 'q-engine-warning-light-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٦٧' },
    prompt: {
      ar: 'هل يؤثر إضاءة زر المحرك في ال داشبورد على فشل المركبة في الفحص الفني السنوي؟',
      en: 'Does the engine warning light being on in the dashboard cause the vehicle to fail the annual inspection?',
      ckb: 'ئایا داگیرسانی چرای بزوێنەر لە داشبۆرد دەبێتە هۆی سەرنەکەوتن لە پشکنینی ساڵانەدا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ستنخفض الدرجة فقط',
        en: 'Only the score will be reduced',
        ckb: 'تەنها پلەکە کەم دەبێتەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'إضاءة زر المحرك تُخفض الدرجة فقط ولا تُفشل المركبة.',
      en: 'The engine light only reduces the score; it does not fail the vehicle.',
      ckb: 'تەنها پلەکە کەم دەکاتەوە و نابێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-original-xenon-lights-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٦٨' },
    prompt: {
      ar: 'إذا كانت الإضاءات العالية والناصية للمركبة من الزينون الأصلي، هل سيؤثر ذلك على فشل المركبة في الفحص الفني السنوي؟',
      en: 'If the vehicle\'s main and dipped beams are original xenon units, will that cause it to fail the annual inspection?',
      ckb: 'ئەگەر ڕووناکی بەرز و نزمی ئۆتۆمبێلەکە زینۆنی ڕەسەن بن، ئایا دەبێتە هۆی سەرنەکەوتن لە پشکنیندا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم لايؤثر و يؤدي إلى نجاح المركبة في الفحص',
        en: 'No, it does not affect it; the vehicle passes the inspection',
        ckb: 'نەخێر، کاریگەری نییە و ئۆتۆمبێلەکە سەردەکەوێت',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى نجاح المركبة في الفحص',
        en: 'No, it will not cause the vehicle to pass',
        ckb: 'نەخێر، نابێتە هۆی سەرکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الزينون الأصلي لا يؤثر وتنجح المركبة في الفحص.',
      en: 'Original xenon does not affect it; the vehicle passes.',
      ckb: 'زینۆنی ڕەسەن کاریگەری نییە و سەردەکەوێت.',
    },
  },
  {
    id: 'q-overtaking-side-two-lane',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٦٩' },
    prompt: {
      ar: 'يسمح بالاجتياز في الطريق ذو المسلكين؟',
      en: 'On a two-lane road, overtaking is permitted:',
      ckb: 'لە ڕێگای دوو لایندا تێپەڕاندن ڕێپێدراوە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'من جهة اليمين',
        en: 'On the right-hand side',
        ckb: 'لە لای ڕاستەوە',
      } },
      { id: 'b', text: {
        ar: 'اذا كانت هناك علامة شاخصة تمنع ذلك',
        en: 'If there is a sign prohibiting it',
        ckb: 'ئەگەر تابلۆیەک قەدەغەی بکات',
      } },
      { id: 'c', text: {
        ar: 'من جهة اليسار',
        en: 'On the left-hand side',
        ckb: 'لە لای چەپەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الاجتياز يكون من جهة اليسار.',
      en: 'Overtaking is done on the left.',
      ckb: 'تێپەڕاندن لە لای چەپەوە دەبێت.',
    },
  },
  {
    id: 'q-bonnet-lock-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٧٠' },
    prompt: {
      ar: 'في حالة عدم فتح قفل الغطاء (البونيد) للمركبة، هل سيؤثر ذلك على الفحص الفني السنوي؟',
      en: 'If the vehicle\'s bonnet catch will not open, does that affect the annual technical inspection?',
      ckb: 'ئەگەر قوفڵی سەرپۆشی بزوێنەر نەکرێتەوە، ئایا کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى فشل المركبة في الفحص',
        en: 'Yes, it causes the vehicle to fail the inspection',
        ckb: 'بەڵێ، دەبێتە هۆی سەرنەکەوتن لە پشکنیندا',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى فشل المركبة في الفحص',
        en: 'No, it will not cause the vehicle to fail',
        ckb: 'نەخێر، نابێتە هۆی سەرنەکەوتن',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عدم فتح قفل البونيد يؤدي إلى فشل المركبة في الفحص.',
      en: 'A bonnet catch that will not open causes the vehicle to fail.',
      ckb: 'نەکرانەوەی قوفڵی سەرپۆش دەبێتە هۆی سەرنەکەوتن.',
    },
  },
  {
    id: 'q-overtaking-prohibited-near-crossing',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٧١' },
    prompt: {
      ar: 'يمنع القيام بمناورة الاجتياز؟',
      en: 'An overtaking manoeuvre is prohibited:',
      ckb: 'مانۆڕی تێپەڕاندن قەدەغەیە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'من جهة اليسار',
        en: 'On the left-hand side',
        ckb: 'لە لای چەپەوە',
      } },
      { id: 'b', text: {
        ar: 'قرب مناطق عبور المشاة',
        en: 'Near pedestrian crossings',
        ckb: 'لە نزیک ناوچەی پەڕینەوەی پیادە',
      } },
      { id: 'c', text: {
        ar: 'دون تنبيه السائق الذي تروم اجتياز مركبته',
        en: 'Without warning the driver of the vehicle you intend to overtake',
        ckb: 'بەبێ ئاگادارکردنەوەی شۆفێری ئەو ئۆتۆمبێلەی دەتەوێت تێیپەڕێنیت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يمنع الاجتياز قرب مناطق عبور المشاة.',
      en: 'Overtaking is prohibited near pedestrian crossings.',
      ckb: 'تێپەڕاندن لە نزیک پەڕینەوەی پیادە قەدەغەیە.',
    },
  },
  {
    id: 'q-exhaust-amplifier-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٧٢' },
    prompt: {
      ar: 'في حالة نصب مضخم صوت لـ إكزوز المركبة، هل سيؤثر ذلك على الفحص الفني السنوي؟',
      en: 'If a sound amplifier is fitted to the vehicle\'s exhaust, does that affect the annual technical inspection?',
      ckb: 'ئەگەر بەرزکەرەوەی دەنگ بۆ ئێکزۆزی ئۆتۆمبێل دانرابێت، کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم لايؤثر ويؤدي إلى نجاح المركبة في الفحص',
        en: 'No, it does not affect it; the vehicle passes',
        ckb: 'نەخێر، کاریگەری نییە و سەردەکەوێت',
      } },
      { id: 'b', text: {
        ar: 'كلا يؤدي إلى فشل المركبة في الفحص،و يجب أن يكون حسب المصنع',
        en: 'No, it causes the vehicle to fail; it must be as the manufacturer made it',
        ckb: 'نەخێر، دەبێتە هۆی سەرنەکەوتن و دەبێت بەپێی کارگە بێت',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'مضخم صوت الإكزوز يؤدي إلى فشل المركبة؛ يجب أن يكون حسب المصنع.',
      en: 'An exhaust amplifier fails the vehicle; it must be as the factory fitted it.',
      ckb: 'بەرزکەرەوەی دەنگ دەبێتە هۆی سەرنەکەوتن؛ دەبێت بەپێی کارگە بێت.',
    },
  },
  {
    id: 'q-mobile-allowed-when-stopped',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٧٣' },
    prompt: {
      ar: 'يجوز استخدام الهاتف النقال (الموبايل) من قبل السائق عند؟',
      en: 'A driver may use a mobile phone when:',
      ckb: 'شۆفێر کەی دەتوانێت مۆبایل بەکاربهێنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'جلوس راكب امامي معه',
        en: 'A front-seat passenger is sitting with them',
        ckb: 'کاتێک سەرنشینێکی پێشەوە لەگەڵیدایە',
      } },
      { id: 'b', text: {
        ar: 'حمل النقال باليد اليسرى',
        en: 'Holding the phone in the left hand',
        ckb: 'کاتێک بە دەستی چەپ مۆبایلەکە دەگرێت',
      } },
      { id: 'c', text: {
        ar: 'توقف المركبة بشكل كامل في مكان آمن',
        en: 'The vehicle is completely stopped in a safe place',
        ckb: 'کاتێک ئۆتۆمبێلەکە بە تەواوی لە شوێنێکی سەلامەتدا وەستاوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُسمح باستخدام الهاتف عند التوقف التام في مكان آمن.',
      en: 'Phone use is allowed only when fully stopped somewhere safe.',
      ckb: 'تەنها کاتێک بە تەواوی لە شوێنێکی سەلامەتدا وەستاوە.',
    },
  },
  {
    id: 'q-brake-pipe-oil-leak-inspection',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٧٤' },
    prompt: {
      ar: 'هل يؤثر تسرب الزيت في أنبوب الفرامل على الفحص الفني السنوي للمركبة؟',
      en: 'Does an oil leak in the brake pipe affect the vehicle\'s annual technical inspection?',
      ckb: 'ئایا دزەکردنی زەیت لە بۆری برێکدا کاریگەری هەیە لەسەر پشکنینی ساڵانە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يؤثر ويؤدي إلى نجاح المركبة في الفحص',
        en: 'Yes, it affects it and makes the vehicle pass the inspection',
        ckb: 'بەڵێ، کاریگەری هەیە و وا دەکات سەربکەوێت',
      } },
      { id: 'b', text: {
        ar: 'كلا لن يؤدي إلى نجاح المركبة في الفحص',
        en: 'No, it will not let the vehicle pass the inspection',
        ckb: 'نەخێر، ناهێڵێت ئۆتۆمبێلەکە سەربکەوێت',
      } },
      { id: 'c', text: {
        ar: 'ليس مهماً',
        en: 'It does not matter',
        ckb: 'گرنگ نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تسرب الزيت في أنبوب الفرامل يمنع نجاح المركبة في الفحص.',
      en: 'An oil leak in the brake pipe stops the vehicle passing.',
      ckb: 'دزەکردنی زەیت لە بۆری برێک ناهێڵێت سەربکەوێت.',
    },
  },
  {
    id: 'q-seatbelt-benefits',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٧٥' },
    prompt: {
      ar: 'فوائد حزام الأمان؟',
      en: 'The benefits of the seat belt are:',
      ckb: 'سوودەکانی پشتێنی سەلامەتی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'للسائق فقط',
        en: 'For the driver only',
        ckb: 'تەنها بۆ شۆفێر',
      } },
      { id: 'b', text: {
        ar: 'للسائق والراكبين',
        en: 'For the driver and the passengers',
        ckb: 'بۆ شۆفێر و سەرنشینەکان',
      } },
      { id: 'c', text: {
        ar: 'ليست له فوائد وليس مهماً',
        en: 'It has no benefit and is not important',
        ckb: 'هیچ سوودێکی نییە و گرنگ نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'حزام الأمان يفيد السائق والراكبين معاً.',
      en: 'The seat belt benefits both the driver and the passengers.',
      ckb: 'پشتێنی سەلامەتی بۆ شۆفێر و سەرنشینەکانە.',
    },
  },
  {
    id: 'q-cold-engine-warm-up',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٧٦' },
    prompt: {
      ar: 'لاتحاول قيادة مركبتك بمحرك بارد ولا تترك المحرك يشتغل للتسخين لاكثر من؟',
      en: 'Do not try to drive with a cold engine, and do not leave the engine warming up for more than:',
      ckb: 'هەوڵ مەدە بە بزوێنەری سارد لێبخوڕیت و بزوێنەر بۆ گەرمبوون زیاتر لەمە بەجێمەهێڵە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ثلاثة دقائق في الشتاء',
        en: 'Three minutes in winter',
        ckb: 'سێ خولەک لە زستاندا',
      } },
      { id: 'b', text: {
        ar: 'خمسة دقائق في الشتاء',
        en: 'Five minutes in winter',
        ckb: 'پێنج خولەک لە زستاندا',
      } },
      { id: 'c', text: {
        ar: 'دقيقة واحدة في الشتاء',
        en: 'One minute in winter',
        ckb: 'یەک خولەک لە زستاندا',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يكفي تشغيل المحرك للتسخين دقيقة واحدة في الشتاء.',
      en: 'One minute of warm-up in winter is enough.',
      ckb: 'یەک خولەک گەرمبوونەوە لە زستاندا بەسە.',
    },
  },
  {
    id: 'q-battery-stability-benefits',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٧٧' },
    prompt: {
      ar: 'ماهي فوائد إستقرار البطارية؟',
      en: 'What are the benefits of the battery being secured?',
      ckb: 'سوودەکانی جێگیری باتری چین؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'سرعة إشتغال المركبة',
        en: 'The vehicle starts faster',
        ckb: 'خێرایی کارپێکردنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'المحافظة على السلف',
        en: 'It protects the starter motor',
        ckb: 'پاراستنی سلف',
      } },
      { id: 'c', text: {
        ar: 'يحمي المركبة من أي مشكلة مثل تعطل وإنقطاع التيار الكهربائي والحرائق',
        en: 'It protects the vehicle from problems such as breakdown, loss of electrical power and fires',
        ckb: 'ئۆتۆمبێل دەپارێزێت لە هەر کێشەیەک وەک تێکچوون و پچڕانی کارەبا و ئاگرکەوتنەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'استقرار البطارية يحمي المركبة من التعطل وانقطاع التيار والحرائق.',
      en: 'A secured battery protects against breakdown, power loss and fire.',
      ckb: 'جێگیری باتری دەپارێزێت لە تێکچوون و پچڕانی کارەبا و ئاگر.',
    },
  },
  {
    id: 'q-being-overtaken',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٧٨' },
    prompt: {
      ar: 'في حالة محاولة مركبة إجتياز مركبتك عليك؟',
      en: 'If another vehicle is trying to overtake you, you must:',
      ckb: 'ئەگەر ئۆتۆمبێلێک هەوڵی تێپەڕاندنت دەدات، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'أن تساعده من خلال الحفاظ على بقاءك في المسلك الايمن وتقليل سرعة مركبتك',
        en: 'Help by keeping to the right-hand lane and reducing your speed',
        ckb: 'یارمەتی بدەیت بە مانەوە لە لاینی ڕاست و کەمکردنەوەی خێرایی',
      } },
      { id: 'b', text: {
        ar: 'إخراج يدك لإعطاء الاشارة بالتجاوز',
        en: 'Put your hand out to signal them past',
        ckb: 'دەستت دەربهێنیت بۆ ئاماژەدان',
      } },
      { id: 'c', text: {
        ar: 'تزيد من سرعة مركبتك كي لا يتم التجاوز',
        en: 'Speed up so the overtake cannot be completed',
        ckb: 'خێرایی زیاد بکەیت تا تێپەڕاندن نەکرێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُساعد المجتاز بالبقاء في المسلك الأيمن وتقليل السرعة.',
      en: 'Help the overtaker by staying right and easing off.',
      ckb: 'یارمەتی بدە بە مانەوە لە لای ڕاست و کەمکردنەوەی خێرایی.',
    },
  },
  {
    id: 'q-air-resistance-consequence',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٧٩' },
    prompt: {
      ar: 'يجب عدم زيادة مقاومة الهواء التي تتعرض لها المركبة بزيادة اجنحة للسيارة او اي شيء اخر تسبب مقاومة الهواء لان زيادة مقاومة الهواء تؤدي الى؟',
      en: 'Air resistance on the vehicle should not be increased by adding wings or anything else that causes drag, because greater air resistance leads to:',
      ckb: 'نابێت بەرگری هەوا زیاد بکرێت بە زیادکردنی باڵ یان هەر شتێکی تر، چونکە زیادبوونی بەرگری هەوا دەبێتە هۆی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تلف الاطارات',
        en: 'Damage to the tyres',
        ckb: 'تێکچوونی تایەکان',
      } },
      { id: 'b', text: {
        ar: 'استهلاك وقود اضافي',
        en: 'Extra fuel consumption',
        ckb: 'خەرجکردنی سووتەمەنی زیادە',
      } },
      { id: 'c', text: {
        ar: 'اطالة عمر المركبة',
        en: 'A longer life for the vehicle',
        ckb: 'درێژکردنەوەی تەمەنی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'زيادة مقاومة الهواء تؤدي إلى استهلاك وقود إضافي.',
      en: 'Greater air resistance causes extra fuel consumption.',
      ckb: 'زیادبوونی بەرگری هەوا سووتەمەنی زیادە دەخوات.',
    },
  },
  {
    id: 'q-fuel-leak-other-parts',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٨٠' },
    prompt: {
      ar: 'هل يعتبر تسرب الوقود من الأجزاء الأخرى للمركبة خطرة؟',
      en: 'Is a fuel leak from the vehicle\'s other parts dangerous?',
      ckb: 'ئایا دزەکردنی سووتەمەنی لە بەشەکانی تری ئۆتۆمبێل مەترسیدارە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'فقط إذا كان التسرب في خزان الوقود',
        en: 'Only if the leak is in the fuel tank',
        ckb: 'تەنها ئەگەر لە تانکی سووتەمەنیدا بێت',
      } },
      { id: 'b', text: {
        ar: 'فقط إذا كان التسرب في الأنابيب',
        en: 'Only if the leak is in the pipes',
        ckb: 'تەنها ئەگەر لە بۆرییەکاندا بێت',
      } },
      { id: 'c', text: {
        ar: 'التسرب خطر في جميع أجزاء المركبة',
        en: 'A leak is dangerous anywhere on the vehicle',
        ckb: 'دزەکردن لە هەموو بەشەکانی ئۆتۆمبێلدا مەترسیدارە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تسرب الوقود خطر في أي جزء من المركبة.',
      en: 'A fuel leak is dangerous anywhere on the vehicle.',
      ckb: 'دزەکردنی سووتەمەنی لە هەر بەشێکدا مەترسیدارە.',
    },
  },
  {
    id: 'q-used-oil-disposal',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٨١' },
    prompt: {
      ar: 'عند تبديل زيت المحرك يسكب الزيت المبدل؟',
      en: 'When the engine oil is changed, the used oil should be poured:',
      ckb: 'لە کاتی گۆڕینی زەیتی بزوێنەردا، زەیتە بەکارهاتووەکە بۆ کوێ دەڕژێنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في المجاري',
        en: 'Into the drains',
        ckb: 'بۆ ناو ئاوەڕۆ',
      } },
      { id: 'b', text: {
        ar: 'على الارض',
        en: 'On the ground',
        ckb: 'بەسەر زەویدا',
      } },
      { id: 'c', text: {
        ar: 'في الاماكن المخصصة له',
        en: 'In the places designated for it',
        ckb: 'لەو شوێنانەی بۆی دیاریکراون',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُسكب الزيت المبدل في الأماكن المخصصة له.',
      en: 'Used oil goes in the places designated for it.',
      ckb: 'زەیتی بەکارهاتوو لە شوێنی دیاریکراودا دەڕژێنرێت.',
    },
  },
  {
    id: 'q-annual-inspection-benefits',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٨٢' },
    prompt: {
      ar: 'ما هي فوائد إجراء الفحص الفني السنوي وتأهيل المركبة؟',
      en: 'What are the benefits of the annual technical inspection and vehicle certification?',
      ckb: 'سوودەکانی پشکنینی تەکنیکی ساڵانە چین؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لحماية المركبة',
        en: 'To protect the vehicle',
        ckb: 'بۆ پاراستنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'لحماية السائق',
        en: 'To protect the driver',
        ckb: 'بۆ پاراستنی شۆفێر',
      } },
      { id: 'c', text: {
        ar: 'لحماية المركبة والسائق وأشخاص آخرين',
        en: 'To protect the vehicle, the driver and other people',
        ckb: 'بۆ پاراستنی ئۆتۆمبێل و شۆفێر و کەسانی تر',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الفحص السنوي يحمي المركبة والسائق والآخرين.',
      en: 'The annual inspection protects the vehicle, the driver and others.',
      ckb: 'پشکنینی ساڵانە ئۆتۆمبێل و شۆفێر و کەسانی تر دەپارێزێت.',
    },
  },
  {
    id: 'q-load-overhang-sides',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٨٣' },
    prompt: {
      ar: 'ان تجاوز الحمولة (من جانبي المركبة) محددة بمسافة مقدارها',
      en: 'A load overhanging the sides of the vehicle is limited to:',
      ckb: 'تێپەڕاندنی بار لە هەردوو لای ئۆتۆمبێلەوە سنووردارە بە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحد الاقصى15 سم',
        en: 'A maximum of 15 cm',
        ckb: 'زۆرترین ١٥ سم',
      } },
      { id: 'b', text: {
        ar: 'الحد الاقصى 50 سم',
        en: 'A maximum of 50 cm',
        ckb: 'زۆرترین ٥٠ سم',
      } },
      { id: 'c', text: {
        ar: 'الحد الاقصى 80 سم',
        en: 'A maximum of 80 cm',
        ckb: 'زۆرترین ٨٠ سم',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الحد الأقصى لتجاوز الحمولة من الجانبين 15 سم.',
      en: 'The maximum side overhang is 15 cm.',
      ckb: 'زۆرترین تێپەڕاندن لە لاکانەوە ١٥ سمە.',
    },
  },
  {
    id: 'q-first-aid-at-accident-scene',
    topic: 'firstaid',
    verified: true,
    source: { ...S, locator: 'س ١٨٤' },
    prompt: {
      ar: 'يجب اجراء الاسعافات الاولية للمصابين في الحوادث المرورية؟',
      en: 'First aid for casualties of road accidents should be given:',
      ckb: 'فریاگوزاری سەرەتایی بۆ برینداران لە ڕووداوەکاندا لەکوێ دەکرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في المستشفى',
        en: 'At the hospital',
        ckb: 'لە نەخۆشخانە',
      } },
      { id: 'b', text: {
        ar: 'في مسكن المصاب',
        en: 'At the casualty\'s home',
        ckb: 'لە ماڵی برینداری',
      } },
      { id: 'c', text: {
        ar: 'في موقع الحادث وعدم تحريك المصابين قدر الامكان',
        en: 'At the scene of the accident, moving the casualties as little as possible',
        ckb: 'لە شوێنی ڕووداوەکە و بەبێ جوڵاندنی برینداران تا دەکرێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تُجرى الإسعافات في موقع الحادث دون تحريك المصابين قدر الإمكان.',
      en: 'Give first aid at the scene and move casualties as little as possible.',
      ckb: 'لە شوێنی ڕووداوەکە و بەبێ جوڵاندنیان.',
    },
  },
  {
    id: 'q-windscreen-cracks',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٨٥' },
    prompt: {
      ar: 'مخاطر بروز صدع وشقوق في النافذة الأمامية المواجهة للسائق؟',
      en: 'The danger of cracks and splits appearing in the windscreen in front of the driver is that:',
      ckb: 'مەترسی دروستبوونی درز و شەق لە پەنجەرەی پێشەوەی بەرامبەر شۆفێر:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يؤثر على جمال المركبة',
        en: 'It affects the vehicle\'s appearance',
        ckb: 'کاریگەری لەسەر جوانی ئۆتۆمبێل دەبێت',
      } },
      { id: 'b', text: {
        ar: 'ليس لها أي مخاطر، وتؤثر فقط في أيام البرد والحر',
        en: 'There is no danger; it only matters in cold and hot weather',
        ckb: 'هیچ مەترسییەکی نییە',
      } },
      { id: 'c', text: {
        ar: 'يؤثر على رؤية السائق',
        en: 'It affects the driver\'s vision',
        ckb: 'کاریگەری لەسەر بینینی شۆفێر دەبێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الصدوع في النافذة الأمامية تؤثر على رؤية السائق.',
      en: 'Cracks in the windscreen affect the driver\'s vision.',
      ckb: 'درز لە شووشەی پێشەوە بینینی شۆفێر تێکدەدات.',
    },
  },
  {
    id: 'q-night-driving-most-important',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٨٦' },
    prompt: {
      ar: 'عند القيادة في الليل الاهم بالنسبة لك ان؟',
      en: 'When driving at night, the most important thing for you is to:',
      ckb: 'لە لێخوڕینی شەوانەدا گرنگترین شت بۆ تۆ:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تكون مستعدا لاستخدام الفرامل بسرعة اكبر',
        en: 'Be ready to brake more quickly',
        ckb: 'ئامادەبیت بۆ بەکارهێنانی خێراتری برێک',
      } },
      { id: 'b', text: {
        ar: 'تستخدم الاضواء العالية طوال الوقت',
        en: 'Use main beam the whole time',
        ckb: 'بە درێژایی کات ڕووناکی بەرز بەکاربهێنیت',
      } },
      { id: 'c', text: {
        ar: 'تقود بحدود ماتوفره اضواء مركبتك',
        en: 'Drive within the range your vehicle\'s lights give you',
        ckb: 'لە سنووری ئەو ڕووناکییەدا لێبخوڕیت کە چراکانت دەیدەن',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُقاد ضمن حدود ما توفره أضواء المركبة من رؤية.',
      en: 'Drive within the range your headlights actually light.',
      ckb: 'لە سنووری ڕووناکی چراکانتدا لێبخوڕە.',
    },
  },
  {
    id: 'q-battery-charged-by',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٨٧' },
    prompt: {
      ar: 'تشحن بطارية المركبة بواسطة؟',
      en: 'The vehicle\'s battery is charged by:',
      ckb: 'باتری ئۆتۆمبێل بە چی پڕ دەکرێتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الديلكو',
        en: 'The distributor',
        ckb: 'دیلکۆ',
      } },
      { id: 'b', text: {
        ar: 'الداينمو',
        en: 'The dynamo (alternator)',
        ckb: 'داینەمۆ',
      } },
      { id: 'c', text: {
        ar: 'الفيت بمب',
        en: 'The fuel pump',
        ckb: 'پەمپی سووتەمەنی',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تُشحن البطارية بواسطة الداينمو.',
      en: 'The battery is charged by the dynamo (alternator).',
      ckb: 'باتری بە داینەمۆ پڕ دەکرێتەوە.',
    },
  },
  {
    id: 'q-load-overhang-front-rear',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٨٨' },
    prompt: {
      ar: 'إن تجاوز الحمولة لمقدمة و مؤخرة المركبة محددة بمسافة مقدارها؟',
      en: 'A load overhanging the front and rear of the vehicle is limited to:',
      ckb: 'تێپەڕاندنی بار لە پێشەوە و دواوەی ئۆتۆمبێل سنووردارە بە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحد الاقصى 50سم مع وضع علم احمر اللون',
        en: 'A maximum of 50 cm, with a red flag attached',
        ckb: 'زۆرترین ٥٠ سم لەگەڵ دانانی ئاڵای سوور',
      } },
      { id: 'b', text: {
        ar: 'الحد الاقصى 1 متر مع وضع علم احمر اللون',
        en: 'A maximum of 1 metre, with a red flag attached',
        ckb: 'زۆرترین ١ مەتر لەگەڵ ئاڵای سوور',
      } },
      { id: 'c', text: {
        ar: 'الحد الاقصى 1.5 متر مع وضع علم احمر اللون',
        en: 'A maximum of 1.5 metres, with a red flag attached',
        ckb: 'زۆرترین ١٫٥ مەتر لەگەڵ ئاڵای سوور',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الحد الأقصى 50 سم مع وضع علم أحمر اللون.',
      en: 'The maximum is 50 cm, with a red flag attached.',
      ckb: 'زۆرترین ٥٠ سمە لەگەڵ ئاڵای سوور.',
    },
  },
  {
    id: 'q-vehicle-fire-causes',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٨٩' },
    prompt: {
      ar: 'من اهم اسباب اندلاع الحريق في المركبة هو؟',
      en: 'One of the main causes of a vehicle fire is:',
      ckb: 'یەکێک لە سەرەکیترین هۆکارەکانی ئاگرکەوتنەوە لە ئۆتۆمبێلدا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التدخين في محطات الوقود والاهمال في استخدام السكائر والولاعة او الكبريت',
        en: 'Smoking at filling stations and careless use of cigarettes, lighters or matches',
        ckb: 'جگەرەکێشان لە بۆریگەی سووتەمەنی و بێئاگایی لە بەکارهێنانی جگەرە و داگیرسێنەر',
      } },
      { id: 'b', text: {
        ar: 'قيادة المركبة بدون اضوية امامية وخلفية',
        en: 'Driving without front and rear lights',
        ckb: 'لێخوڕین بەبێ چرای پێشەوە و دواوە',
      } },
      { id: 'c', text: {
        ar: 'قيادة المركبة باطارات ملساء',
        en: 'Driving on bald tyres',
        ckb: 'لێخوڕین بە تایەی لووس',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'التدخين قرب الوقود والإهمال في استخدام السكائر والولاعة سبب رئيسي للحريق.',
      en: 'Smoking near fuel and careless use of cigarettes or lighters is a main cause.',
      ckb: 'جگەرەکێشان لە نزیک سووتەمەنی هۆکاری سەرەکی ئاگرکەوتنەوەیە.',
    },
  },
  {
    id: 'q-oil-level-on-dipstick',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٩٠' },
    prompt: {
      ar: 'يجب ان يكون مستوى زيت المحرك على عصا القياس؟',
      en: 'The engine oil level on the dipstick must be:',
      ckb: 'ئاستی زەیتی بزوێنەر لەسەر دارەکەی پێوان دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'على الحرف (L)',
        en: 'At the letter (L)',
        ckb: 'لەسەر پیتی (L)',
      } },
      { id: 'b', text: {
        ar: 'على الحرف (H)',
        en: 'At the letter (H)',
        ckb: 'لەسەر پیتی (H)',
      } },
      { id: 'c', text: {
        ar: 'بين الحرفين (L) و (H)',
        en: 'Between the letters (L) and (H)',
        ckb: 'لە نێوان پیتەکانی (L) و (H)',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يجب أن يكون مستوى الزيت بين الحرفين (L) و(H).',
      en: 'The oil level must sit between (L) and (H).',
      ckb: 'ئاستی زەیت دەبێت لە نێوان (L) و (H) بێت.',
    },
  },
  {
    id: 'q-mobile-use-when-parked',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٩١' },
    prompt: {
      ar: 'إستعمال الهاتف النقال (الموبايل) يتم؟',
      en: 'A mobile phone may be used:',
      ckb: 'بەکارهێنانی مۆبایل کەی دەبێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عند وقوف المركبة وقوفاً كاملاً في الاماكن المخصصة للوقوف لحين إنتهاء المكالمة',
        en: 'When the vehicle is fully stopped in a designated parking place, until the call ends',
        ckb: 'کاتێک ئۆتۆمبێلەکە بە تەواوی لە شوێنی دیاریکراودا وەستاوە تا تەواوبوونی پەیوەندییەکە',
      } },
      { id: 'b', text: {
        ar: 'إستخدامه بعد تخفيض سرعة المركبة',
        en: 'After reducing the vehicle\'s speed',
        ckb: 'دوای کەمکردنەوەی خێرایی',
      } },
      { id: 'c', text: {
        ar: 'إستخدامه عند التوقف في الاشارات الضوئية (الترافيك لايت)',
        en: 'When stopped at the traffic lights',
        ckb: 'کاتێک لە چرای هاتوچۆدا وەستاویت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُستعمل الهاتف عند الوقوف التام في مكان مخصص للوقوف.',
      en: 'Use the phone only when fully parked in a designated place.',
      ckb: 'تەنها کاتێک بە تەواوی لە شوێنی دیاریکراودا وەستاویت.',
    },
  },
  {
    id: 'q-vehicle-boot-use',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ١٩٢' },
    prompt: {
      ar: 'يستخدم صندوق المركبة؟',
      en: 'The vehicle\'s boot is used:',
      ckb: 'سندوقی ئۆتۆمبێل بۆ چی بەکاردێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لنقل الركاب',
        en: 'To carry passengers',
        ckb: 'بۆ گواستنەوەی سەرنشین',
      } },
      { id: 'b', text: {
        ar: 'مكان لوضع عدة الصيانة والطوارئ والاسعافات الضرورية فقط',
        en: 'As a place for maintenance tools, emergency equipment and essential first-aid supplies only',
        ckb: 'تەنها بۆ دانانی ئامێری چاککردنەوە و فریاگوزاری و پێداویستی سەرەتایی',
      } },
      { id: 'c', text: {
        ar: 'مكان لحمل الحيوانات والطيور المنزلية',
        en: 'As a place to carry household animals and birds',
        ckb: 'بۆ هەڵگرتنی ئاژەڵ و باڵندەی ماڵی',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الصندوق مخصص لعدة الصيانة والطوارئ والإسعافات فقط.',
      en: 'The boot is for maintenance tools, emergency kit and first aid only.',
      ckb: 'سندوق تەنها بۆ ئامێری چاککردنەوە و فریاگوزارییە.',
    },
  },
  {
    id: 'q-pavement-purpose',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٩٣' },
    prompt: {
      ar: 'الرصيف يقع على جانبي الشوارع الداخلية ويستخدم ل؟',
      en: 'The pavement lies along the sides of inner-city streets and is used for:',
      ckb: 'ڕێڕەوی پیادە لە هەردوو لای شەقامە ناوەکییەکانە و بۆ چی بەکاردێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'وقوف المركبات',
        en: 'Parking vehicles',
        ckb: 'وەستانی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'سير المشاة',
        en: 'Pedestrians to walk on',
        ckb: 'ڕۆیشتنی پیادەکان',
      } },
      { id: 'c', text: {
        ar: 'سير الدراجات النارية',
        en: 'Motorcycles to ride on',
        ckb: 'ڕۆیشتنی ماتۆڕسکیل',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الرصيف مخصص لسير المشاة.',
      en: 'The pavement is for pedestrians to walk on.',
      ckb: 'ڕێڕەوی پیادە بۆ ڕۆیشتنی پیادەکانە.',
    },
  },
  {
    id: 'q-driver-must-stop-safe-place',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٩٤' },
    prompt: {
      ar: 'على السائق ان؟',
      en: 'The driver must:',
      ckb: 'شۆفێر دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يستمر في قيادة المركبة',
        en: 'Carry on driving the vehicle',
        ckb: 'بەردەوام بێت لە لێخوڕین',
      } },
      { id: 'b', text: {
        ar: 'استعمال الاضوية العالية',
        en: 'Use the main beam',
        ckb: 'ڕووناکی بەرز بەکاربهێنێت',
      } },
      { id: 'c', text: {
        ar: 'يوقف المركبة في مكان امن',
        en: 'Stop the vehicle in a safe place',
        ckb: 'ئۆتۆمبێلەکە لە شوێنێکی سەلامەتدا بوەستێنێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يوقف السائق المركبة في مكان آمن.',
      en: 'The driver should stop the vehicle in a safe place.',
      ckb: 'شۆفێر دەبێت لە شوێنێکی سەلامەتدا بوەستێت.',
    },
  },
  {
    id: 'q-priority-vehicles-on-road',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١٩٥' },
    prompt: {
      ar: 'الاسبقية تكون للمركبات؟',
      en: 'Priority belongs to vehicles:',
      ckb: 'پێشینەیی بۆ کام ئۆتۆمبێلانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الخارجة من مواقف المركبات (الكراج)',
        en: 'Coming out of car parks (garages)',
        ckb: 'ئەوانەی لە شوێنی وەستانەوە دەردەچن',
      } },
      { id: 'b', text: {
        ar: 'الخارجة من محطات تعبئة الوقود',
        en: 'Coming out of filling stations',
        ckb: 'ئەوانەی لە بۆریگەی سووتەمەنییەوە دەردەچن',
      } },
      { id: 'c', text: {
        ar: 'التي تسير في الطريق على من يروم الدخول اليها',
        en: 'Already travelling on the road, over those wishing to join it',
        ckb: 'ئەوانەی لە ڕێگادا دەڕۆن بەسەر ئەوانەی دەیانەوێت بچنە ناوی',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الأسبقية للمركبة السائرة في الطريق على الراغب بالدخول إليه.',
      en: 'Vehicles already on the road have priority over those joining.',
      ckb: 'پێشینەیی بۆ ئەوانەیە کە لە ڕێگادان.',
    },
  },
  {
    id: 'q-overtaking-clear-view',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٩٦' },
    prompt: {
      ar: 'جميع الاماكن التي يسمح بالاجتياز يجب ان؟',
      en: 'In every place where overtaking is allowed, it is required that:',
      ckb: 'لە هەموو ئەو شوێنانەی تێپەڕاندن ڕێپێدراوە دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تكون الرؤية فيها واضحة',
        en: 'Visibility there is clear',
        ckb: 'بینین ڕوون بێت',
      } },
      { id: 'b', text: {
        ar: 'يكون الطريق مبلل',
        en: 'The road is wet',
        ckb: 'ڕێگاکە تەڕ بێت',
      } },
      { id: 'c', text: {
        ar: 'الخط الابيض في منتصف الطريق ذو اتجاه واحد متصل',
        en: 'The white line in the middle of a one-way road is continuous',
        ckb: 'هێڵی سپی ناوەڕاست بەردەوام بێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُشترط وضوح الرؤية في كل مكان يُسمح فيه بالاجتياز.',
      en: 'Clear visibility is required wherever overtaking is allowed.',
      ckb: 'لە هەموو شوێنێکدا دەبێت بینین ڕوون بێت.',
    },
  },
  {
    id: 'q-priority-in-square',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١٩٧' },
    prompt: {
      ar: 'تكون الاسبقية في التقاطعات للمركبات التي؟',
      en: 'At junctions, priority belongs to the vehicles that are:',
      ckb: 'لە چوارڕیانەکاندا پێشینەیی بۆ کام ئۆتۆمبێلانەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التي تدخل الساحة',
        en: 'Entering the square',
        ckb: 'ئەوانەی دەچنە ناو گۆڕەپانەکە',
      } },
      { id: 'b', text: {
        ar: 'في الساحة',
        en: 'Already in the square',
        ckb: 'ئەوانەی لە گۆڕەپانەکەدان',
      } },
      { id: 'c', text: {
        ar: 'لا توجد اسبقية',
        en: 'There is no priority',
        ckb: 'پێشینەیی نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبات الموجودة داخل الساحة.',
      en: 'Priority belongs to vehicles already in the square.',
      ckb: 'پێشینەیی بۆ ئەوانەیە کە لە گۆڕەپانەکەدان.',
    },
  },
  {
    id: 'q-passengers-in-boot-or-bed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ١٩٨' },
    prompt: {
      ar: 'هل يسمح بنقل الركاب في صندوق المركبات الصغيرة أو حوض الحمل في مركبات البيك اب والشاحنات؟',
      en: 'May passengers be carried in the boot of a small vehicle or the load bed of a pick-up or lorry?',
      ckb: 'ئایا ڕێپێدراوە سەرنشین لە سندوقی ئۆتۆمبێلی بچووک یان حەوزی بارهەڵگردا بگوێزرێتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع منعاً باتاً',
        en: 'It is strictly prohibited',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'نعم يسمح بنقلهم إذا كان العدد قليلاً',
        en: 'Yes, if the number is small',
        ckb: 'بەڵێ، ئەگەر ژمارەکە کەم بێت',
      } },
      { id: 'c', text: {
        ar: 'نعم مسموح في كل اماكن المركبات',
        en: 'Yes, it is allowed anywhere in the vehicle',
        ckb: 'بەڵێ، لە هەموو شوێنێکی ئۆتۆمبێلدا ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نقل الركاب في الصندوق أو حوض الحمل ممنوع منعاً باتاً.',
      en: 'Carrying passengers in the boot or load bed is strictly prohibited.',
      ckb: 'گواستنەوەی سەرنشین لە سندوق یان حەوزدا بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-priority-paved-over-unpaved',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ١٩٩' },
    prompt: {
      ar: 'اسبقية السير للطريق؟',
      en: 'Right of way belongs to the road that is:',
      ckb: 'پێشینەیی ڕۆیشتن بۆ کام ڕێگایەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المبلط على الطريق غير المبلط',
        en: 'Paved, over the unpaved road',
        ckb: 'قیرتاوکراو بەسەر ناقیرتاوکراودا',
      } },
      { id: 'b', text: {
        ar: 'غير المبلط على الطريق المبلط',
        en: 'Unpaved, over the paved road',
        ckb: 'ناقیرتاوکراو بەسەر قیرتاوکراودا',
      } },
      { id: 'c', text: {
        ar: 'لايوجد اسبقية',
        en: 'There is no priority',
        ckb: 'پێشینەیی نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للطريق المبلط على غير المبلط.',
      en: 'The paved road has priority over the unpaved one.',
      ckb: 'پێشینەیی بۆ ڕێگا قیرتاوکراوەکەیە.',
    },
  },
  {
    id: 'q-fog-avoid',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٠' },
    prompt: {
      ar: 'عند الضباب عليك تفادي؟',
      en: 'In fog you should avoid:',
      ckb: 'لە کاتی تەمدا دەبێت خۆت لەمانە بەدوور بگریت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عدم القيام بالاجتياز',
        en: 'Overtaking',
        ckb: 'تێپەڕاندن',
      } },
      { id: 'b', text: {
        ar: 'عدم القيام بتغيير الممرات',
        en: 'Changing lanes',
        ckb: 'گۆڕینی لاین',
      } },
      { id: 'c', text: {
        ar: 'جميع ماذكر',
        en: 'All of the above',
        ckb: 'هەموو ئەوانەی باسکران',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُتفادى الاجتياز وتغيير الممرات في الضباب.',
      en: 'Avoid both overtaking and lane changes in fog.',
      ckb: 'لە تەمدا تێپەڕاندن و گۆڕینی لاین مەکە.',
    },
  },
  {
    id: 'q-priority-pedestrians-over-driveway',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٢٠١' },
    prompt: {
      ar: 'تكون الاسبقية ل؟',
      en: 'Priority belongs to:',
      ckb: 'پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبات التي تقطع الرصيف للدخول الى الكراج على المشاة السائرين على الرصيف',
        en: 'Vehicles crossing the pavement to enter a garage, over pedestrians walking on it',
        ckb: 'ئەو ئۆتۆمبێلانەی ڕێڕەوی پیادە دەبڕن بۆ چوونە ناو گاراج',
      } },
      { id: 'b', text: {
        ar: 'للمشاة السائرين على الرصيف على المركبات التي تقطع الرصيف للدخول او الخروج من الكراجات',
        en: 'Pedestrians walking on the pavement, over vehicles crossing it to enter or leave garages',
        ckb: 'پیادەکانی سەر ڕێڕەوەکە بەسەر ئەو ئۆتۆمبێلانەی ڕێڕەوەکە دەبڕن',
      } },
      { id: 'c', text: {
        ar: 'المركبات التي تقطع الرصيف للخروج من الكراج على المشاة السائرين على الرصيف',
        en: 'Vehicles crossing the pavement to leave a garage, over pedestrians walking on it',
        ckb: 'ئەو ئۆتۆمبێلانەی بۆ دەرچوون لە گاراج ڕێڕەوەکە دەبڕن',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمشاة على الرصيف أمام المركبات الداخلة أو الخارجة من الكراجات.',
      en: 'Pedestrians on the pavement have priority over vehicles crossing it.',
      ckb: 'پێشینەیی بۆ پیادەکانی سەر ڕێڕەوەکەیە.',
    },
  },
  {
    id: 'q-best-way-avoid-collision',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٢' },
    prompt: {
      ar: 'افضل طريقة لتفادي التصادم هي؟',
      en: 'The best way to avoid a collision is:',
      ckb: 'باشترین ڕێگا بۆ دوورکەوتنەوە لە پێکدادان:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تقليل السرعة',
        en: 'Reducing speed',
        ckb: 'کەمکردنەوەی خێرایی',
      } },
      { id: 'b', text: {
        ar: 'زيادة السرعة',
        en: 'Increasing speed',
        ckb: 'زیادکردنی خێرایی',
      } },
      { id: 'c', text: {
        ar: 'تغيير المسارات بشكل مستمر والمشي بصورة لولبية',
        en: 'Changing lanes constantly and weaving',
        ckb: 'گۆڕینی بەردەوامی لاین و ڕۆیشتنی خواروخێچ',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تقليل السرعة أفضل وسيلة لتفادي التصادم.',
      en: 'Reducing speed is the best way to avoid a collision.',
      ckb: 'کەمکردنەوەی خێرایی باشترین ڕێگایە.',
    },
  },
  {
    id: 'q-priority-train',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٢٠٣' },
    prompt: {
      ar: 'تكون الاسبقية ل؟',
      en: 'Priority belongs to:',
      ckb: 'پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبات الانشائية على القطار او اي واسطة نقل تسير على سكة الحديد',
        en: 'Construction vehicles, over the train or any rail transport',
        ckb: 'ئۆتۆمبێلی بیناسازی بەسەر شەمەندەفەردا',
      } },
      { id: 'b', text: {
        ar: 'للقطار او اي واسطة نقل تسير على سكة الحديد على المركبات الاخرى',
        en: 'The train or any rail transport, over all other vehicles',
        ckb: 'شەمەندەفەر یان هەر گواستنەوەیەکی سەر هێڵی ئاسن بەسەر ئۆتۆمبێلەکانی تر',
      } },
      { id: 'c', text: {
        ar: 'المركبات الزراعية والدراجات النارية على القطار او اي واسطة نقل تسير على سكة الحديد',
        en: 'Agricultural vehicles and motorcycles, over the train or any rail transport',
        ckb: 'ئۆتۆمبێلی کشتوکاڵی و ماتۆڕسکیل بەسەر شەمەندەفەردا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية المطلقة للقطار وما يسير على سكة الحديد.',
      en: 'The train and anything on rails has absolute priority.',
      ckb: 'پێشینەیی تەواو بۆ شەمەندەفەرە.',
    },
  },
  {
    id: 'q-construction-licence-scope',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٠٤' },
    prompt: {
      ar: 'حامل إجازة سوق المركبات الانشائية يستطيع قيادة؟',
      en: 'The holder of a construction-vehicle driving licence may drive:',
      ckb: 'خاوەنی مۆڵەتی ئۆتۆمبێلی بیناسازی دەتوانێت چی لێبخوڕێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبات الزراعية',
        en: 'Agricultural vehicles',
        ckb: 'ئۆتۆمبێلی کشتوکاڵی',
      } },
      { id: 'b', text: {
        ar: 'الإنشائية فقط',
        en: 'Construction vehicles only',
        ckb: 'تەنها بیناسازی',
      } },
      { id: 'c', text: {
        ar: 'مركبات الحمل والاجرة',
        en: 'Goods vehicles and taxis',
        ckb: 'بارهەڵگر و تاکسی',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'إجازة المركبات الإنشائية تخوّل قيادة الإنشائية فقط.',
      en: 'A construction-vehicle licence covers construction vehicles only.',
      ckb: 'تەنها بۆ ئۆتۆمبێلی بیناسازییە.',
    },
  },
  {
    id: 'q-passing-stopped-bus',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٥' },
    prompt: {
      ar: 'عند توقف حافلة (باص) لنقل الركاب في الشارع ماذا عليك ان تفعل؟',
      en: 'When a passenger bus has stopped in the street, what should you do?',
      ckb: 'کاتێک پاسێک بۆ سەرنشین لە شەقامدا وەستاوە، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الاستمرار بالسير بالسرعة التي اقودها',
        en: 'Carry on at the speed I am driving',
        ckb: 'بە هەمان خێرایی بەردەوام دەبم',
      } },
      { id: 'b', text: {
        ar: 'أتجاوز الحافلة المتوقفة بحذر واخفف السرعة',
        en: 'Pass the stopped bus carefully and slow down',
        ckb: 'بە وریاییەوە تێیدەپەڕێنم و خێرایی کەم دەکەمەوە',
      } },
      { id: 'c', text: {
        ar: 'السير بسرعة عالية امام حافلة الباص',
        en: 'Drive at high speed in front of the bus',
        ckb: 'بە خێرایی بەرز لە پێش پاسەکەوە دەڕۆم',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُتجاوز الباص المتوقف بحذر مع تخفيف السرعة.',
      en: 'Pass the stopped bus carefully, slowing down.',
      ckb: 'بە وریاییەوە و بە خێرایی کەم تێیبپەڕێنە.',
    },
  },
  {
    id: 'q-standing-water-brakes',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٦' },
    prompt: {
      ar: 'المياه الفائضة على الطريق؟',
      en: 'With standing water on the road you should:',
      ckb: 'ئاوی زیادە لەسەر ڕێگا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'القيادة بالضغط المتواصل على الفرامل',
        en: 'Drive with continuous pressure on the brakes',
        ckb: 'لێخوڕین بە پەستانی بەردەوام لەسەر برێک',
      } },
      { id: 'b', text: {
        ar: 'التوقف حتى تجف الفرامل',
        en: 'Stop until the brakes dry out',
        ckb: 'وەستان تا برێکەکان وشک دەبنەوە',
      } },
      { id: 'c', text: {
        ar: 'الضغط على الفرامل بشكل متكرر',
        en: 'Apply the brakes repeatedly',
        ckb: 'پەستان لەسەر برێک بە شێوەی دووبارە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُضغط على الفرامل بشكل متكرر لتجفيفها بعد المياه.',
      en: 'Apply the brakes repeatedly to dry them after water.',
      ckb: 'بە دووبارە پەستان لەسەر برێک بکە بۆ وشککردنەوەی.',
    },
  },
  {
    id: 'q-oncoming-full-beam',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٧' },
    prompt: {
      ar: 'ماذا عليك ان تفعل عند قيادتك في الليل والمركبة القادمة نحوك تستخدم الاضاءة العالية (فول لايت) ولم يقوم باطفائها؟',
      en: 'What should you do when driving at night and the oncoming vehicle keeps its main beam on?',
      ckb: 'بە شەو کاتێک ئۆتۆمبێلی بەرامبەر ڕووناکی بەرز بەکاردەهێنێت و ناکوژێنێتەوە، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تخفيف السرعة كي لاتعرض لاي حادث',
        en: 'Slow down so as not to be involved in an accident',
        ckb: 'خێرایی کەم دەکەمەوە',
      } },
      { id: 'b', text: {
        ar: 'تشغيل الاشارة اليمنى والاتجاه الى الجهة اليمنى من الطريق وتخفيف السرعة والنظر الى خطوط الشارع وعدم تجاوزها',
        en: 'Signal right, move to the right-hand side of the road, slow down, watch the road markings and do not cross them',
        ckb: 'ئاماژەی ڕاست دەدەم و بەرەو لای ڕاستی ڕێگا دەڕۆم و خێرایی کەم دەکەمەوە و سەیری هێڵەکانی شەقام دەکەم',
      } },
      { id: 'c', text: {
        ar: 'تشغيل الاضوية العالية كي يقوم السائق المقابل بتقليل الاضوية',
        en: 'Switch your own main beam on so the other driver dips theirs',
        ckb: 'ڕووناکی بەرز داگیرسێنم بۆ ئەوەی ئەو کەمی بکاتەوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُتجه يميناً مع تخفيف السرعة ومتابعة خطوط الشارع دون تجاوزها.',
      en: 'Move right, slow down and follow the road markings without crossing them.',
      ckb: 'بەرەو ڕاست بڕۆ، خێرایی کەم بکەرەوە و هێڵەکان بپارێزە.',
    },
  },
  {
    id: 'q-boarding-side',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٨' },
    prompt: {
      ar: 'الركوب والنزول للركاب يجب ان؟',
      en: 'Passengers getting in and out must:',
      ckb: 'سەرکەوتن و دابەزینی سەرنشین دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يتم في الاماكن الغير مخصصة لتوقف المركبات',
        en: 'Do so in places not designated for stopping',
        ckb: 'لە شوێنی نادیاریکراودا بێت',
      } },
      { id: 'b', text: {
        ar: 'يكون الركوب او النزول من الجانب الايمن اذا كانت المركبة متوقفة على الجانب الايسر من الطريق',
        en: 'Get in or out on the right when the vehicle is stopped on the left of the road',
        ckb: 'لە لای ڕاستەوە بێت ئەگەر ئۆتۆمبێلەکە لە لای چەپی ڕێگا وەستابێت',
      } },
      { id: 'c', text: {
        ar: 'يكون الركوب او النزول من الجانب الايمن اذا كانت المركبة متوقفة على الجانب الايمن من الطريق',
        en: 'Get in or out on the right when the vehicle is stopped on the right of the road',
        ckb: 'لە لای ڕاستەوە بێت ئەگەر ئۆتۆمبێلەکە لە لای ڕاستی ڕێگا وەستابێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يكون الركوب والنزول من الجانب الأيمن والمركبة متوقفة على يمين الطريق.',
      en: 'Get in and out on the right, with the vehicle stopped on the right of the road.',
      ckb: 'لە لای ڕاستەوە و ئۆتۆمبێلەکە لە لای ڕاستی ڕێگا وەستابێت.',
    },
  },
  {
    id: 'q-passengers-on-expressway',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٠٩' },
    prompt: {
      ar: 'هل يسمح بنزول اوصعود الركاب في الطرق السريعة؟',
      en: 'May passengers get in or out on expressways?',
      ckb: 'ئایا ڕێپێدراوە سەرنشین لە ڕێگا خێراکاندا دابەزێت یان سەربکەوێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع منعا باتا ولا يسمح',
        en: 'Strictly prohibited and not allowed',
        ckb: 'بە تەواوی قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'مسموح بشرط ان تكون حاشية الطريق عريضة',
        en: 'Allowed provided the verge is wide',
        ckb: 'ڕێپێدراوە ئەگەر شانی ڕێگاکە پان بێت',
      } },
      { id: 'c', text: {
        ar: 'مسموح فقط في ساعات النهار',
        en: 'Allowed during daylight hours only',
        ckb: 'تەنها بە ڕۆژ ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'صعود الركاب ونزولهم على الطرق السريعة ممنوع منعاً باتاً.',
      en: 'Passengers getting in or out on expressways is strictly prohibited.',
      ckb: 'بە تەواوی قەدەغەیە.',
    },
  },
  {
    id: 'q-where-writing-allowed-on-vehicle',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢١٠' },
    prompt: {
      ar: 'في اي مكان يجوز كتابة كلمات او جمل على المركبة؟',
      en: 'Where may words or sentences be written on a vehicle?',
      ckb: 'لە کوێی ئۆتۆمبێل ڕێپێدراوە وشە یان ڕستە بنووسرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'على زجاج المركبة الخلفية',
        en: 'On the rear window',
        ckb: 'لەسەر شووشەی دواوە',
      } },
      { id: 'b', text: {
        ar: 'على صندوق المركبة الخلفية',
        en: 'On the boot lid',
        ckb: 'لەسەر سندوقی دواوە',
      } },
      { id: 'c', text: {
        ar: 'الواجب كتابتها بموجب التعليمات وفي الاماكن المحددة لها',
        en: 'Only what the regulations require, in the places designated for it',
        ckb: 'تەنها ئەوەی بەپێی ڕێنمایی پێویستە و لە شوێنی دیاریکراودا',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُسمح فقط بالكتابة الواجبة بموجب التعليمات وفي أماكنها المحددة.',
      en: 'Only writing required by the regulations, in its designated places.',
      ckb: 'تەنها ئەوەی بەپێی ڕێنمایی پێویستە.',
    },
  },
  {
    id: 'q-lane-change-in-roundabout',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١١' },
    prompt: {
      ar: 'أثناء الدخول للاستدارة الدائرية (فلكة) هل يسمح بتبديل المسار؟',
      en: 'When entering a roundabout, is changing lanes permitted?',
      ckb: 'لە کاتی چوونە ناو خولانەوە (فەلەکە) ئایا گۆڕینی لاین ڕێپێدراوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
      { id: 'b', text: {
        ar: 'كلا',
        en: 'No',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'كلا أثناء الليل',
        en: 'No, at night',
        ckb: 'نەخێر، بە شەو',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'لا يُسمح بتبديل المسار أثناء الدخول إلى الاستدارة الدائرية.',
      en: 'Changing lanes when entering a roundabout is not permitted.',
      ckb: 'گۆڕینی لاین لە کاتی چوونە ناو خولانەوەدا ڕێپێدراو نییە.',
    },
  },
  {
    id: 'q-hitting-parked-vehicle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١٢' },
    prompt: {
      ar: 'اذا اصدمت إحدى المركبات المتوقفة في موقف المركبات كيف تتصرف؟',
      en: 'If you hit one of the parked vehicles in a car park, what should you do?',
      ckb: 'ئەگەر لە شوێنی وەستاندا لە ئۆتۆمبێلێکی وەستاوت دا، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'انتظر صاحب المركبة التي صدمتها لاعلمه بالامر او اكتب له ورقة فيها عنواني ورقم هاتفي في حالة تأخر عودته وأضعها على المركبة المصدومة',
        en: 'Wait for its owner to tell them, or leave a note with my address and phone number on the damaged vehicle if they are delayed',
        ckb: 'چاوەڕێی خاوەنەکەی دەکەم بۆ ئاگادارکردنەوەی، یان پەڕەیەک بە ناونیشان و ژمارەی تەلەفۆنمەوە لەسەری دادەنێم',
      } },
      { id: 'b', text: {
        ar: 'أترك الموقع بدون اي اشعار',
        en: 'Leave the scene without any notice',
        ckb: 'بەبێ هیچ ئاگادارکردنەوەیەک شوێنەکە بەجێدەهێڵم',
      } },
      { id: 'c', text: {
        ar: 'أغير مكان وقوف مركبتي',
        en: 'Move my vehicle to a different space',
        ckb: 'شوێنی وەستانی ئۆتۆمبێلەکەم دەگۆڕم',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُنتظر صاحب المركبة أو تُترك ورقة بالعنوان ورقم الهاتف عليها.',
      en: 'Wait for the owner, or leave a note with your address and phone number.',
      ckb: 'چاوەڕێی خاوەنەکەی بکە یان پەڕەیەک دابنێ.',
    },
  },
  {
    id: 'q-required-item-in-vehicle',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢١٣' },
    prompt: {
      ar: 'عند قيادة اية مركبة يجب ان يتواجد بداخلها احد هذه الاشياء؟',
      en: 'When driving any vehicle, one of these items must be inside it:',
      ckb: 'لە کاتی لێخوڕینی هەر ئۆتۆمبێلێکدا دەبێت یەکێک لەمانە تێیدا بێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'بطل ماء',
        en: 'A bottle of water',
        ckb: 'بوتڵێک ئاو',
      } },
      { id: 'b', text: {
        ar: 'مثلث فسفوري',
        en: 'A reflective triangle',
        ckb: 'سێگۆشەی فۆسفۆری',
      } },
      { id: 'c', text: {
        ar: 'قنينة صغيرة من البنزين',
        en: 'A small bottle of petrol',
        ckb: 'بوتڵێکی بچووکی بەنزین',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يجب توفر المثلث الفسفوري داخل المركبة.',
      en: 'A reflective triangle must be carried in the vehicle.',
      ckb: 'دەبێت سێگۆشەی فۆسفۆری لە ئۆتۆمبێلدا بێت.',
    },
  },
  {
    id: 'q-vehicle-ahead-stops-suddenly',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١٤' },
    prompt: {
      ar: 'عند قيادتك للمركبة في الشارع والمركبة التي امامك يقوم بايقاف مفاجا ماذا عليك ان تفعل؟',
      en: 'When driving and the vehicle in front stops suddenly, what should you do?',
      ckb: 'کاتێک لێدەخوڕیت و ئۆتۆمبێلی پێشەوە لەناکاو دەوەستێت، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عدم الوقوف والاجتياز',
        en: 'Do not stop, and overtake',
        ckb: 'ناوەستم و تێدەپەڕێنم',
      } },
      { id: 'b', text: {
        ar: 'الوقوف او تقليل السرعه لانه من الممكن ان يكون امامك خطر',
        en: 'Stop or slow down, because there may be a hazard ahead of you',
        ckb: 'دەوەستم یان خێرایی کەم دەکەمەوە چونکە لەوانەیە مەترسی لە پێشدا بێت',
      } },
      { id: 'c', text: {
        ar: 'لاتوجد علاقه بينك و بين المركبات الواقفه امامك',
        en: 'There is no connection between you and the vehicles stopped ahead',
        ckb: 'هیچ پەیوەندییەک نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُتوقف أو تُخفض السرعة لاحتمال وجود خطر أمامك.',
      en: 'Stop or slow down, because there may be a hazard ahead.',
      ckb: 'بوەستە یان خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'q-before-leaving-parked-vehicle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١٥' },
    prompt: {
      ar: 'ماذا تفعل قبل ترك مركبتك المتوقفة في موقف على الطريق يسمح للوقوف فيه لفترة معينة؟',
      en: 'What do you do before leaving your vehicle in a roadside space where parking is allowed for a limited time?',
      ckb: 'پێش بەجێهێشتنی ئۆتۆمبێلەکەت لە شوێنێکی وەستانی کاتی، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'أتاكد من وقوفي في المكان المناسب والمسموح به قانونياً',
        en: 'Make sure I am parked in a suitable and legally permitted place',
        ckb: 'دڵنیا دەبمەوە لەوەی لە شوێنی گونجاو و ڕێپێدراوی یاسایی وەستاوم',
      } },
      { id: 'b', text: {
        ar: 'أترك المركبة موازية للطريق وبمسافة لا تقل عن 1 م عن الرصيف',
        en: 'Leave the vehicle parallel to the road, no less than 1 m from the kerb',
        ckb: 'ئۆتۆمبێلەکە هاوتەریب و بە دووری کەمتر نەبێت لە ١ مەتر لە ڕێڕەوەکە',
      } },
      { id: 'c', text: {
        ar: 'أترك محرك المركبة في حالة إشتعال إذ اكنت سأعود اليها خلال 5 دقائق',
        en: 'Leave the engine running if I will return within 5 minutes',
        ckb: 'بزوێنەرەکە کار دەکات ئەگەر لە ماوەی ٥ خولەکدا بگەڕێمەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُتأكد من الوقوف في مكان مناسب ومسموح به قانوناً.',
      en: 'Make sure you are parked somewhere suitable and legally permitted.',
      ckb: 'دڵنیابە لە وەستان لە شوێنی یاسایی.',
    },
  },
  {
    id: 'q-negligent-driving-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١٦' },
    prompt: {
      ar: 'قيادة المركبة بإهمال أو رعونة ممنوع وعقوبته؟',
      en: 'Driving negligently or recklessly is prohibited and punished by:',
      ckb: 'لێخوڕین بە بێئاگایی یان سەرکەشی قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحبس وحجز المركبة',
        en: 'Imprisonment and impounding the vehicle',
        ckb: 'زیندان و دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'c', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'عقوبة القيادة بإهمال أو رعونة هي الغرامة.',
      en: 'The penalty for negligent or reckless driving is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-uncovered-load-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١٧' },
    prompt: {
      ar: 'عدم تغطية حمولة مركبات الحمل بصورة محكمة ممنوع وعقوبته؟',
      en: 'Failing to cover a goods vehicle\'s load securely is prohibited and punished by:',
      ckb: 'نەداپۆشینی باری بارهەڵگر بە شێوەیەکی توند قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز الحمولة',
        en: 'Impounding the load',
        ckb: 'دەستبەسەرداگرتنی بارەکە',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة عدم تغطية الحمولة بإحكام هي الغرامة.',
      en: 'The penalty for not covering the load securely is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-when-licence-cancelled',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢١٨' },
    prompt: {
      ar: 'متى تلغى إجازة السوق؟',
      en: 'When is a driving licence cancelled?',
      ckb: 'کەی مۆڵەتی لێخوڕین هەڵدەوەشێتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في حالة فقدان اللياقة الصحية بقرار من اللجنة الطبية',
        en: 'When medical fitness is lost, by decision of the medical committee',
        ckb: 'لە کاتی لەدەستدانی لەبارێتی تەندروستی بە بڕیاری لیژنەی پزیشکی',
      } },
      { id: 'b', text: {
        ar: 'قيادة المركبة في الاتجاه المعاكس لحركة السير',
        en: 'Driving against the direction of traffic',
        ckb: 'لێخوڕین بە پێچەوانەی ئاراستەی هاتوچۆ',
      } },
      { id: 'c', text: {
        ar: 'صدور حكم قضائي بسجن السائق',
        en: 'When a court sentences the driver to prison',
        ckb: 'دەرچوونی بڕیاری دادگا بە زیندانیکردنی شۆفێر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُلغى الإجازة عند فقدان اللياقة الصحية بقرار اللجنة الطبية.',
      en: 'The licence is cancelled on loss of medical fitness, by the medical committee\'s decision.',
      ckb: 'بە بڕیاری لیژنەی پزیشکی لە کاتی لەدەستدانی لەبارێتی تەندروستی.',
    },
  },
  {
    id: 'q-parking-prohibited-place-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢١٩' },
    prompt: {
      ar: 'ايقاف المركبة في الأماكن التي يمنع الوقوف فيها ممنوع وعقوبته؟',
      en: 'Parking where parking is prohibited is punished by:',
      ckb: 'وەستاندنی ئۆتۆمبێل لە شوێنی قەدەغەدا سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'حبس السائق',
        en: 'Imprisoning the driver',
        ckb: 'زیندانیکردنی شۆفێر',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة الوقوف في مكان ممنوع هي الغرامة.',
      en: 'The penalty for parking where prohibited is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-tinted-glass-penalty',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٢٠' },
    prompt: {
      ar: 'استخدام الزجاج المضلل في نوافذ المركبات أو وضع الستائر حاجبة للرؤيا ممنوع وعقوبته؟',
      en: 'Using tinted glass in vehicle windows, or fitting curtains that block the view, is prohibited and punished by:',
      ckb: 'بەکارهێنانی شووشەی تاریک لە پەنجەرەکان یان دانانی پەردەی بینین‌شێوێن قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'حبس السائق',
        en: 'Imprisoning the driver',
        ckb: 'زیندانیکردنی شۆفێر',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة الزجاج المضلل أو الستائر الحاجبة للرؤية هي الغرامة.',
      en: 'The penalty for tinted glass or view-blocking curtains is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-illegal-u-turn-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٢١' },
    prompt: {
      ar: 'الاستدارة في الاماكن الغير مسموح فيها بالاستدارة ممنوع وعقوبته؟',
      en: 'Turning where turning is not permitted is prohibited and punished by:',
      ckb: 'سووڕانەوە لە شوێنی نەڕێپێدراودا قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'حبس السائق',
        en: 'Imprisoning the driver',
        ckb: 'زیندانیکردنی شۆفێر',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة الاستدارة في مكان غير مسموح هي الغرامة.',
      en: 'The penalty for turning where it is not allowed is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-not-stopping-side-to-main-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٢٢' },
    prompt: {
      ar: 'عدم التوقف عند الخروج من شارع فرعي إلى شارع رئيسي ممنوع وعقوبته؟',
      en: 'Failing to stop when coming out of a side street onto a main street is prohibited and punished by:',
      ckb: 'نەوەستان لە کاتی دەرچوون لە شەقامی لاوەکییەوە بۆ سەرەکی قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'c', text: {
        ar: 'حجز المركبة والغرامة',
        en: 'Impounding the vehicle and a fine',
        ckb: 'دەستبەسەرداگرتن و غەرامە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'عقوبة عدم التوقف عند الخروج إلى شارع رئيسي هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-blocked-lane-left-turner',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٢٣' },
    prompt: {
      ar: 'انت تقود مركبتك في حركة سير كثيفة ومسارك مسدود بسيارة تنعطف الى اليسار ماذا يجب ان تفعل؟',
      en: 'You are driving in heavy traffic and your lane is blocked by a car turning left. What should you do?',
      ckb: 'لە هاتوچۆیەکی قەرەباڵغدا لاینەکەت بە ئۆتۆمبێلێک داخراوە کە بەرەو چەپ دەسووڕێتەوە. چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تحاول ان تحشر مركبتك على رصيف المشاة على يمين المركبة',
        en: 'Try to squeeze your vehicle onto the pavement to the right of it',
        ckb: 'هەوڵدەدەم ئۆتۆمبێلەکەم بخەمە سەر ڕێڕەوی پیادە',
      } },
      { id: 'b', text: {
        ar: 'تستخدم جهاز التنبيه الى ان تنعطف المركبة',
        en: 'Sound the horn until it turns',
        ckb: 'بۆری لێدەدەم تا دەسووڕێتەوە',
      } },
      { id: 'c', text: {
        ar: 'تنتظر الى ان تنعطف المركبة و من ثم تتقدم',
        en: 'Wait until it has turned, then move forward',
        ckb: 'چاوەڕێ دەکەم تا دەسووڕێتەوە پاشان دەڕۆم',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُنتظر حتى تنعطف المركبة ثم تتقدم.',
      en: 'Wait until it completes the turn, then proceed.',
      ckb: 'چاوەڕێ بکە تا دەسووڕێتەوە، پاشان بڕۆ.',
    },
  },
  {
    id: 'q-not-yielding-pedestrians-penalty',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٢٢٤' },
    prompt: {
      ar: 'عدم إعطاء الاسبقية للمشاة الذين دخلوا منطقة العبور ممنوع وعقوبته؟',
      en: 'Failing to give right of way to pedestrians who have entered the crossing is prohibited and punished by:',
      ckb: 'نەدانی پێشینەیی بە پیادەکانی ناو پەڕینەوەکە قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'سحب الاجازة لمدة سنة واحدة',
        en: 'Withdrawal of the licence for one year',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ ماوەی ساڵێک',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة عدم إعطاء الأسبقية للمشاة هي الغرامة.',
      en: 'The penalty for not yielding to pedestrians is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-prevent-ejection',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٢٥' },
    prompt: {
      ar: 'في حالات الاصطدام من المحتمل ان ترمى الى خارج مركبتك. يمكن الوقاية من هذا عن طريق؟',
      en: 'In a collision you may be thrown out of your vehicle. This can be prevented by:',
      ckb: 'لە پێکداداندا لەوانەیە فڕێ بدرێیتە دەرەوەی ئۆتۆمبێلەکەت. بەم شێوەیە ڕێگری لێدەکرێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ربط حزام الامان بالطريقة الصحيحة',
        en: 'Wearing the seat belt correctly',
        ckb: 'بەستنی پشتێنی سەلامەتی بە شێوەی دروست',
      } },
      { id: 'b', text: {
        ar: 'المسك بقوة بلوحة عدادات السيارة',
        en: 'Gripping the instrument panel tightly',
        ckb: 'گرتنی توندی تابلۆی ژمێرەرەکان',
      } },
      { id: 'c', text: {
        ar: 'شراء مركبة مزودة بالاكياس الهوائية',
        en: 'Buying a vehicle fitted with airbags',
        ckb: 'کڕینی ئۆتۆمبێلی خاوەن کیسەی هەوا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'ربط حزام الأمان بالطريقة الصحيحة يمنع القذف خارج المركبة.',
      en: 'Wearing the seat belt correctly prevents ejection.',
      ckb: 'بەستنی دروستی پشتێن ڕێگری لە فڕێدان دەکات.',
    },
  },
  {
    id: 'q-parking-lorries-in-alleys-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٢٦' },
    prompt: {
      ar: 'ترك او مبيت مركبات الحمل والكبيرة في الازقة والشوارع الداخلية ممنوع ولا يشمل ذلك ايقافها ضمن المدة المتضمنة للتفريغ او التحميل والشخص الذي يخالف ذلك يعاقب ب؟',
      en: 'Leaving or parking goods and large vehicles overnight in alleys and inner streets is prohibited, excluding stops for loading or unloading, and an offender is punished by:',
      ckb: 'بەجێهێشتن یان شەوگاری بارهەڵگر و ئۆتۆمبێلی گەورە لە کۆڵان و شەقامە ناوەکییەکاندا قەدەغەیە، و سەرپێچیکەر سزا دەدرێت بە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'سحب اجازة السوق لمدة 6اشهر',
        en: 'Withdrawal of the driving licence for 6 months',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ ٦ مانگ',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة ترك مركبات الحمل في الأزقة هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-broken-white-lines-meaning',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'س ٢٢٧' },
    prompt: {
      ar: 'من العلامات الارضية التي تسمح بالانتقال بين المسارات والقيام بمناورة الاجتياز هي خطوط؟',
      en: 'The road markings that allow moving between lanes and performing an overtaking manoeuvre are:',
      ckb: 'ئەو نیشانە زەمینییانەی ڕێگا بە گۆڕینی لاین و تێپەڕاندن دەدەن:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'البيضاء المتقطعة',
        en: 'Broken white lines',
        ckb: 'هێڵە سپییە پچڕپچڕەکان',
      } },
      { id: 'b', text: {
        ar: 'البيضاء المتصلة',
        en: 'Continuous white lines',
        ckb: 'هێڵە سپییە بەردەوامەکان',
      } },
      { id: 'c', text: {
        ar: 'البيضاء المتصلة والمزدوجة',
        en: 'Double continuous white lines',
        ckb: 'هێڵە سپییە بەردەوام و دووانەکان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخطوط البيضاء المتقطعة تسمح بالانتقال بين المسارات والاجتياز.',
      en: 'Broken white lines allow lane changes and overtaking.',
      ckb: 'هێڵە پچڕپچڕەکان ڕێگا دەدەن.',
    },
  },
  {
    id: 'q-unclear-plate-penalty',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٢٨' },
    prompt: {
      ar: 'قيادة مركبة ذات لوحة تسجيل غير واضحة أو تالفة ممنوع وعقوبته؟',
      en: 'Driving a vehicle with an unclear or damaged registration plate is prohibited and punished by:',
      ckb: 'لێخوڕینی ئۆتۆمبێلی خاوەن پلێتی ناڕوون یان تێکچوو قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'b', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'c', text: {
        ar: 'سحب الاجازة لمدة شهر واحد',
        en: 'Withdrawal of the licence for one month',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ مانگێک',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'عقوبة اللوحة غير الواضحة أو التالفة هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-stop-line-meaning',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'س ٢٢٩' },
    prompt: {
      ar: 'من العلامات الارضية التي ترسم على الطرق خط عرضي متصل بالقرب من اعمدة الاشارات الضوئية (الترافك لايت) ماذا تعني هذه العلامة؟',
      en: 'Among the road markings is a continuous transverse line drawn near the traffic-light poles. What does this marking mean?',
      ckb: 'لە نیشانە زەمینییەکان هێڵێکی پانی بەردەوام لە نزیک کۆڵەکەی چرای هاتوچۆ دەکێشرێت. واتای چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'قف',
        en: 'Stop',
        ckb: 'بوەستە',
      } },
      { id: 'b', text: {
        ar: 'انتبه',
        en: 'Take care',
        ckb: 'ئاگاداربە',
      } },
      { id: 'c', text: {
        ar: 'لاتعني شيئا وهي للجمالية فقط',
        en: 'It means nothing and is only decorative',
        ckb: 'هیچ واتایەکی نییە و تەنها بۆ جوانییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخط العرضي المتصل قرب الإشارة الضوئية يعني قف.',
      en: 'The continuous transverse line at the lights means Stop.',
      ckb: 'هێڵی پانی بەردەوام واتە بوەستە.',
    },
  },
  {
    id: 'q-overtaking-on-right-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٠' },
    prompt: {
      ar: 'اجتياز السائق لمركبة اخرى من الجهة اليمنى او الاجتياز الخاطئ ممنوع وعقوبته؟',
      en: 'A driver overtaking another vehicle on the right, or overtaking improperly, is prohibited and punished by:',
      ckb: 'تێپەڕاندنی ئۆتۆمبێلێکی تر لە لای ڕاستەوە یان تێپەڕاندنی هەڵە قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'حجز المركبة والغرامة',
        en: 'Impounding the vehicle and a fine',
        ckb: 'دەستبەسەرداگرتن و غەرامە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبة الاجتياز من اليمين أو الاجتياز الخاطئ هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-indicator-use',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣١' },
    prompt: {
      ar: 'تستخدم الاضاءة المتقطعة الصفراء (الاشارات) على جانبي المركبة؟',
      en: 'The flashing amber lights (indicators) on the sides of the vehicle are used:',
      ckb: 'ڕووناکی زەردی پچڕپچڕ (ئاماژەکان) لە هەردوو لای ئۆتۆمبێل کەی بەکاردێن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في حالة السير بسرعات منخفضة',
        en: 'When travelling at low speeds',
        ckb: 'لە کاتی ڕۆیشتن بە خێرایی نزم',
      } },
      { id: 'b', text: {
        ar: 'في حالة الانعطاف وتغير المسار',
        en: 'When turning and changing lane',
        ckb: 'لە کاتی سووڕانەوە و گۆڕینی لاین',
      } },
      { id: 'c', text: {
        ar: 'في حالة السير بسرعات عالية',
        en: 'When travelling at high speeds',
        ckb: 'لە کاتی ڕۆیشتن بە خێرایی بەرز',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تُستخدم الإشارات عند الانعطاف وتغيير المسار.',
      en: 'Indicators are used when turning and changing lane.',
      ckb: 'ئاماژەکان لە کاتی سووڕانەوە و گۆڕینی لاین بەکاردێن.',
    },
  },
  {
    id: 'q-towing-broken-vehicles',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٣٢' },
    prompt: {
      ar: 'يجب قطر أو نقل المركبات المتعطلة بواسطة؟',
      en: 'Broken-down vehicles must be towed or moved by:',
      ckb: 'ئۆتۆمبێلە تێکچووەکان دەبێت بە چی بگوێزرێنەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مركبات متخصصة لنقل المركبة (Recovery vehicles)',
        en: 'Specialised vehicle-transport units (recovery vehicles)',
        ckb: 'ئۆتۆمبێلی تایبەت بۆ گواستنەوە (Recovery vehicles)',
      } },
      { id: 'b', text: {
        ar: 'سحبها بوساطة مركبة صغيرة عن طريق الحبال',
        en: 'Towing with a small vehicle using ropes',
        ckb: 'ڕاکێشان بە ئۆتۆمبێلی بچووک بە پەت',
      } },
      { id: 'c', text: {
        ar: 'سحبها بوساطة مركبة كبيرة (شاحنة)',
        en: 'Towing with a large vehicle (a lorry)',
        ckb: 'ڕاکێشان بە ئۆتۆمبێلی گەورە (بارهەڵگر)',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُنقل المركبات المتعطلة بمركبات متخصصة (Recovery vehicles).',
      en: 'Broken-down vehicles are moved by specialised recovery vehicles.',
      ckb: 'بە ئۆتۆمبێلی تایبەتی گواستنەوە.',
    },
  },
  {
    id: 'q-safety-rules-violation-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٣' },
    prompt: {
      ar: 'مخالفة قواعد سير الامان ممنوع وعقوبته؟',
      en: 'Breaching the road-safety rules is prohibited and punished by:',
      ckb: 'سەرپێچی یاساکانی سەلامەتی هاتوچۆ قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'سحب اجازة السوق لمدة شهر واحد',
        en: 'Withdrawal of the driving licence for one month',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ مانگێک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبة مخالفة قواعد سير الأمان هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-opening-left-door-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٤' },
    prompt: {
      ar: 'فتح باب المركبة من جهة اليسار قبل التاكد من خلو جهة المرور ممنوع وعقوبته؟',
      en: 'Opening the vehicle\'s left-hand door before checking that the traffic side is clear is prohibited and punished by:',
      ckb: 'کردنەوەی دەرگای لای چەپی ئۆتۆمبێل پێش دڵنیابوون لە بەتاڵی لای هاتوچۆ قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة بمقدار30,000 دينار',
        en: 'A fine of 30,000 dinars',
        ckb: 'غەرامەی ٣٠٬٠٠٠ دینار',
      } },
      { id: 'b', text: {
        ar: 'الغرامة بمقدار 15,000 دينار',
        en: 'A fine of 15,000 dinars',
        ckb: 'غەرامەی ١٥٬٠٠٠ دینار',
      } },
      { id: 'c', text: {
        ar: 'الغرامة بمقدار20.000 دينار',
        en: 'A fine of 20,000 dinars',
        ckb: 'غەرامەی ٢٠٬٠٠٠ دینار',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العقوبة غرامة بمقدار 15,000 دينار بحسب دليل الأسئلة الرسمي.',
      en: 'The official guide gives the penalty as a 15,000-dinar fine.',
      ckb: 'بەپێی ڕێنمایی فەرمی، غەرامەی ١٥٬٠٠٠ دینارە.',
    },
  },
  {
    id: 'q-window-stickers-penalty',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٣٥' },
    prompt: {
      ar: 'وضع ملصقات الزينة وكتابة ورسم على الزجاج الامامي والخلفي للمركبات ممنوع وعقوبته؟',
      en: 'Putting decorative stickers, writing or drawings on a vehicle\'s front and rear glass is prohibited and punished by:',
      ckb: 'دانانی ستیکەری ڕازاندنەوە و نووسین و وێنە لەسەر شووشەی پێشەوە و دواوە قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'b', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'سحب الاجازة لمدة شهر واحد',
        en: 'Withdrawal of the licence for one month',
        ckb: 'هەڵگرتنەوەی مۆڵەت بۆ مانگێک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبة الملصقات والكتابة على الزجاج هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-max-width-without-escort',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٦' },
    prompt: {
      ar: 'لا يجوز سير اية مركبة في طريق المرور السريع يزيد عرضها عن ......... ، ما لم يرافقها مركبة من مركبات المرور لارشادها وتنبيه مستعملي الطريق ليلاً ونهاراً',
      en: 'No vehicle wider than ......... may travel on an expressway unless escorted by a traffic vehicle guiding it and warning other road users, day and night:',
      ckb: 'نابێت هیچ ئۆتۆمبێلێک لە ڕێگای خێرادا بڕوات کە پانییەکەی زیاتر بێت لە ......... مەگەر ئۆتۆمبێلێکی هاتوچۆ هاوڕێیەتی بکات:',
    },
    choices: [
      { id: 'a', text: {
        ar: '2متر',
        en: '2 metres',
        ckb: '٢ مەتر',
      } },
      { id: 'b', text: {
        ar: '2.5متر',
        en: '2.5 metres',
        ckb: '٢٫٥ مەتر',
      } },
      { id: 'c', text: {
        ar: '3متر',
        en: '3 metres',
        ckb: '٣ مەتر',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الحد هو 2.5 متر ما لم ترافقها مركبة مرور.',
      en: 'The limit is 2.5 m unless escorted by a traffic vehicle.',
      ckb: 'سنوورەکە ٢٫٥ مەترە.',
    },
  },
  {
    id: 'q-lorry-lane',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٧' },
    prompt: {
      ar: 'في اية جهة من الشارع تستطيع الشاحنات السير عليها؟',
      en: 'On which side of the street may lorries travel?',
      ckb: 'لە کام لای شەقامدا بارهەڵگرەکان دەتوانن بڕۆن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في مسلك اقصى اليمين',
        en: 'In the far right-hand lane',
        ckb: 'لە لاینی دوورترین ڕاست',
      } },
      { id: 'b', text: {
        ar: 'تستطيع الشاحنات السير في أي مسار بالسرعة المحددة لها',
        en: 'Lorries may travel in any lane at the speed set for them',
        ckb: 'لە هەر لاینێک بە خێرایی دیاریکراو',
      } },
      { id: 'c', text: {
        ar: 'تستطيع الشاحنات ذوات المحورين من السير في أي مسلك تشاء',
        en: 'Two-axle lorries may travel in whichever lane they wish',
        ckb: 'بارهەڵگری دوو تەوەری لە هەر لاینێک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تسير الشاحنات في مسلك أقصى اليمين.',
      en: 'Lorries travel in the far right lane.',
      ckb: 'لە لاینی دوورترین ڕاستدا دەڕۆن.',
    },
  },
  {
    id: 'q-dipped-lights-daytime',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٨' },
    prompt: {
      ar: 'يجب استخدام الضياء الواطئ في النهار إذا كان هناك؟',
      en: 'Dipped beam must be used in the daytime when there is:',
      ckb: 'دەبێت ڕووناکی نزم بە ڕۆژ بەکاربهێنرێت ئەگەر ئەمە هەبوو:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مشاة',
        en: 'Pedestrians',
        ckb: 'پیادە',
      } },
      { id: 'b', text: {
        ar: 'رتل من المركبات',
        en: 'A convoy of vehicles',
        ckb: 'ڕیزێک ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'ضباب او غبار',
        en: 'Fog or dust',
        ckb: 'تەم یان تۆز',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُستخدم الضياء الواطئ نهاراً عند الضباب أو الغبار.',
      en: 'Use dipped beam in daylight in fog or dust.',
      ckb: 'لە تەم یان تۆزدا ڕووناکی نزم بەکاربهێنە.',
    },
  },
  {
    id: 'q-material-falling-from-lorries',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٣٩' },
    prompt: {
      ar: 'ماهي عقوبة ترك المواد المتساقطة من الشاحنات (كالاتربة والحصى ومواد البناء)؟',
      en: 'What is the penalty for leaving material that has fallen from lorries (such as soil, gravel and building materials)?',
      ckb: 'سزای بەجێهێشتنی ئەو ماددانەی لە بارهەڵگرەوە دەکەونە خوارەوە (وەک خۆڵ و بەرد) چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يتحمل السائق مسؤولية رفع المواد وتنظيف الشارع وتعويض الاضرار',
        en: 'The driver bears responsibility for removing the material, cleaning the street and compensating for damage',
        ckb: 'شۆفێر بەرپرسیارە لە لابردنی ماددەکان و پاککردنەوەی شەقام و قەرەبووکردنەوەی زیانەکان',
      } },
      { id: 'b', text: {
        ar: 'غرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
      { id: 'c', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يتحمل السائق رفع المواد وتنظيف الشارع وتعويض الأضرار.',
      en: 'The driver must remove the material, clean the street and pay for damage.',
      ckb: 'شۆفێر بەرپرسیارە لە لابردن و پاککردنەوە و قەرەبوو.',
    },
  },
  {
    id: 'q-leaving-debris-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٠' },
    prompt: {
      ar: 'عقوبة ترك أي مواد مخلفة على الطريق بعد إصلاح المركبة العاطلة كاجزاء الإطارات المتفجرة وغيرها هي؟',
      en: 'The penalty for leaving debris on the road after repairing a broken-down vehicle, such as pieces of a blown tyre, is:',
      ckb: 'سزای بەجێهێشتنی پاشماوە لەسەر ڕێگا دوای چاککردنەوەی ئۆتۆمبێلی تێکچوو:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة ترك المخلفات على الطريق هي الغرامة.',
      en: 'The penalty is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'q-left-turn-signal',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤١' },
    prompt: {
      ar: 'الاستدارة نحو جهة اليسار تتم عن طريق؟',
      en: 'A turn to the left is made by:',
      ckb: 'سووڕانەوە بەرەو چەپ بە چی دەکرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إخراج اليد اليسرى من نافذة المركبة',
        en: 'Putting the left hand out of the vehicle window',
        ckb: 'دەرهێنانی دەستی چەپ لە پەنجەرەوە',
      } },
      { id: 'b', text: {
        ar: 'إستخدام الاشارة الضوئية لجهة اليسار',
        en: 'Using the left-hand indicator',
        ckb: 'بەکارهێنانی ئاماژەی ڕووناکی لای چەپ',
      } },
      { id: 'c', text: {
        ar: 'إستخدام إشارة الوقوف الاضطراري',
        en: 'Using the hazard warning lights',
        ckb: 'بەکارهێنانی ئاماژەی وەستانی ناچاری',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تُستخدم الإشارة الضوئية لجهة اليسار عند الاستدارة يساراً.',
      en: 'Use the left indicator when turning left.',
      ckb: 'ئاماژەی چەپ بەکاربهێنە.',
    },
  },
  {
    id: 'q-idling-over-three-minutes',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٤٢' },
    prompt: {
      ar: 'هل يجوز ترك محرك المركبة يعمل على سرعة التباطؤ (السلولي) لفترة تزيد عن ثلاث دقائق',
      en: 'May the engine be left idling for more than three minutes?',
      ckb: 'ئایا ڕێپێدراوە بزوێنەر زیاتر لە سێ خولەک لەسەر خێرایی هێواش کار بکات؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'كلا لا حاجة لاكثر من دقيقة واحدة',
        en: 'No, there is no need for more than one minute',
        ckb: 'نەخێر، پێویست ناکات زیاتر لە یەک خولەک',
      } },
      { id: 'b', text: {
        ar: 'يجوز وليس له تأثير على المحرك',
        en: 'It is allowed and has no effect on the engine',
        ckb: 'ڕێپێدراوە و کاریگەری نییە',
      } },
      { id: 'c', text: {
        ar: 'لا يجوز لانه يؤدي الى زيادة حرارة المحرك',
        en: 'It is not allowed because it makes the engine overheat',
        ckb: 'ڕێپێدراو نییە چونکە گەرمی بزوێنەر زیاد دەکات',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا حاجة لتشغيل المحرك على التباطؤ أكثر من دقيقة واحدة.',
      en: 'There is no need to idle for more than one minute.',
      ckb: 'پێویست ناکات زیاتر لە یەک خولەک.',
    },
  },
  {
    id: 'q-when-lorries-may-overtake',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٣' },
    prompt: {
      ar: 'متى يحق للشاحنات إجتياز المركبات الاخرى؟',
      en: 'When may lorries overtake other vehicles?',
      ckb: 'کەی بۆ بارهەڵگرەکان هەیە ئۆتۆمبێلەکانی تر تێبپەڕێنن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا يجوز قيام الشاحنات باجتياز المركبات الاخرى إلا في الاماكن المخصصة لها بالعلامات المرورية',
        en: 'Lorries may not overtake except in places designated for it by traffic signs',
        ckb: 'نابێت بارهەڵگرەکان تێپەڕاندن بکەن جگە لەو شوێنانەی بە تابلۆ دیاریکراون',
      } },
      { id: 'b', text: {
        ar: 'ممكن للشاحنات القيام بالإجتياز في الطرق في اي وقت يشاء سائقها',
        en: 'Lorries may overtake on the road whenever their driver wishes',
        ckb: 'لە هەر کاتێکدا شۆفێرەکەی بیەوێت',
      } },
      { id: 'c', text: {
        ar: 'يسمح للشاحنات إجتياز بعضها البعض فقط',
        en: 'Lorries are only allowed to overtake each other',
        ckb: 'تەنها ڕێپێدراوە یەکتری تێبپەڕێنن',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا تجتاز الشاحنات إلا في الأماكن المخصصة لذلك بالعلامات المرورية.',
      en: 'Lorries may only overtake where traffic signs allow it.',
      ckb: 'تەنها لەو شوێنانەی بە تابلۆ دیاریکراون.',
    },
  },
  {
    id: 'q-children-alone-in-vehicle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٤' },
    prompt: {
      ar: 'يمنع ترك الاطفال في المركبة لوحدهم؟',
      en: 'Leaving children alone in the vehicle is prohibited:',
      ckb: 'بەجێهێشتنی منداڵان بە تەنها لە ئۆتۆمبێلدا قەدەغەیە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لمدة نصف ساعة',
        en: 'For half an hour',
        ckb: 'بۆ ماوەی نیو کاتژمێر',
      } },
      { id: 'b', text: {
        ar: 'لمدة تزيد عن ساعة واحدة',
        en: 'For more than one hour',
        ckb: 'بۆ ماوەی زیاتر لە کاتژمێرێک',
      } },
      { id: 'c', text: {
        ar: 'لا يجوز تركهم بشكل مطلق بدون مرافق',
        en: 'They may never be left without an adult, under any circumstances',
        ckb: 'بە هیچ شێوەیەک نابێت بەبێ هاوڕێ بەجێبهێڵدرێن',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'لا يجوز ترك الأطفال في المركبة بدون مرافق مطلقاً.',
      en: 'Children must never be left in the vehicle without an adult.',
      ckb: 'بە هیچ شێوەیەک نابێت بەتەنها بەجێبهێڵدرێن.',
    },
  },
  {
    id: 'q-overtaking-on-slippery-road',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٥' },
    prompt: {
      ar: 'يمنع القيام بمناورة الاجتياز في حال؟',
      en: 'An overtaking manoeuvre is prohibited when:',
      ckb: 'مانۆڕی تێپەڕاندن کەی قەدەغەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إذا وجدت علامة ممنوع الوقوف',
        en: 'There is a no-parking sign',
        ckb: 'ئەگەر تابلۆی قەدەغەی وەستان هەبێت',
      } },
      { id: 'b', text: {
        ar: 'في الطرق الخارجية',
        en: 'On rural roads',
        ckb: 'لە ڕێگا دەرەکییەکان',
      } },
      { id: 'c', text: {
        ar: 'في حال كان الطريق زلقا حتى مع عدم وجود علامة منع الاجتياز',
        en: 'The road is slippery, even where there is no no-overtaking sign',
        ckb: 'ئەگەر ڕێگاکە خلیسک بێت، تەنانەت ئەگەر تابلۆی قەدەغەش نەبێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يمنع الاجتياز على الطريق الزلق ولو لم توجد علامة منع.',
      en: 'Overtaking is prohibited on a slippery road even without a sign.',
      ckb: 'لە ڕێگای خلیسکدا قەدەغەیە تەنانەت بەبێ تابلۆ.',
    },
  },
  {
    id: 'q-passengers-board-right-side',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٦' },
    prompt: {
      ar: 'يلزم ركاب أية مركبة أثناء الصعود اليها أو النزول منها، مراعاة أن لا يؤدي ذلك الى تعريض أنفسهم و الاخرين من مستخدمي الطريق للخطر ولهذا يجب؟',
      en: 'Passengers getting in or out of any vehicle must ensure they do not endanger themselves or other road users, and therefore must:',
      ckb: 'سەرنشینانی هەر ئۆتۆمبێلێک لە کاتی سەرکەوتن و دابەزیندا دەبێت خۆیان و کەسانی تر نەخەنە مەترسییەوە، بۆیە دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'النزول والصعود من يمين المركبة',
        en: 'Get in and out on the right-hand side of the vehicle',
        ckb: 'لە لای ڕاستی ئۆتۆمبێلەوە دابەزن و سەربکەون',
      } },
      { id: 'b', text: {
        ar: 'النزول والصعود من جميع الابواب',
        en: 'Get in and out through any of the doors',
        ckb: 'لە هەموو دەرگاکانەوە',
      } },
      { id: 'c', text: {
        ar: 'السائق ممكن أن يصعد و ينزل من جهة اليمين',
        en: 'The driver may get in and out on the right',
        ckb: 'شۆفێر دەتوانێت لە لای ڕاستەوە بێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يكون الصعود والنزول من جهة يمين المركبة.',
      en: 'Get in and out on the right-hand side.',
      ckb: 'لە لای ڕاستەوە.',
    },
  },
  {
    id: 'q-towed-vehicle-needs-driver',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٧' },
    prompt: {
      ar: 'هل يجوز ترك المركبة تتحرك بدون وجود سائق يتولى قيادتها لو كانت تقطر بواسطة مركبة مخصصه بالسحب',
      en: 'May a vehicle be left moving without a driver at its wheel when it is being towed by a recovery vehicle?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل بەبێ شۆفێر بجوڵێت کاتێک بە ئۆتۆمبێلی ڕاکێشان دەگوێزرێتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم لجميع انواع المركبات',
        en: 'Yes, for all types of vehicle',
        ckb: 'بەڵێ، بۆ هەموو جۆرەکانی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'نعم الشاحنات فقط',
        en: 'Yes, for lorries only',
        ckb: 'بەڵێ، تەنها بارهەڵگرەکان',
      } },
      { id: 'c', text: {
        ar: 'المركبات الانشائية',
        en: 'Construction vehicles',
        ckb: 'ئۆتۆمبێلی بیناسازی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'نعم، لجميع أنواع المركبات عند القطر بمركبة مخصصة للسحب.',
      en: 'Yes, for all vehicle types when towed by a recovery vehicle.',
      ckb: 'بەڵێ، بۆ هەموو جۆرەکان.',
    },
  },
  {
    id: 'q-pedestrians-on-expressway',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٨' },
    prompt: {
      ar: 'هل يجوز للمشاة السير أو العبور من جهة الى اخرى في الطرق السريعة (شارع ال120 السريع كمثال)؟',
      en: 'May pedestrians walk along or cross from one side to the other on expressways (the 120 expressway, for example)?',
      ckb: 'ئایا بۆ پیادەکان هەیە لە ڕێگا خێراکاندا بڕۆن یان بپەڕنەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا يجوز مطلقاً',
        en: 'Never permitted',
        ckb: 'بە هیچ شێوەیەک ڕێپێدراو نییە',
      } },
      { id: 'b', text: {
        ar: 'يجوز أثناء النهار',
        en: 'Permitted during the daytime',
        ckb: 'بە ڕۆژ ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يجوز العبور بسرعة (ركضاً)',
        en: 'Permitted if they cross quickly (running)',
        ckb: 'بە خێرایی (بە ڕاکردن) ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا يجوز للمشاة السير أو العبور في الطرق السريعة مطلقاً.',
      en: 'Pedestrians may never walk on or cross an expressway.',
      ckb: 'بە هیچ شێوەیەک ڕێپێدراو نییە.',
    },
  },
  {
    id: 'q-cracked-glass-obstructing-view',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٤٩' },
    prompt: {
      ar: 'هل يجوز قيادة أية مركبة بوجود ما يعيق رؤية السائق؟',
      en: 'May any vehicle be driven when something obstructs the driver\'s view?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێل لێبخوڕدرێت کاتێک شتێک بینینی شۆفێر ڕێدەگرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'كلا لايجوز في حال وجود كسور في الزجاج الامامي أو الجانبي تحجب الرؤية الجيدة',
        en: 'No, not where cracks in the windscreen or side glass block a clear view',
        ckb: 'نەخێر، ئەگەر شکان لە شووشەی پێشەوە یان لاتەنیشت بینینی باش بشارێتەوە',
      } },
      { id: 'b', text: {
        ar: 'يجوز قيادة المركبة وزجاج الابواب معتم',
        en: 'The vehicle may be driven with the door glass tinted',
        ckb: 'ڕێپێدراوە بە شووشەی تاریکی دەرگاکان',
      } },
      { id: 'c', text: {
        ar: 'لاعلاقة بحمولة المركبة بالامر',
        en: 'The vehicle\'s load has nothing to do with it',
        ckb: 'پەیوەندی بە باری ئۆتۆمبێلەوە نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لا يجوز القيادة مع كسور في الزجاج تحجب الرؤية الجيدة.',
      en: 'Driving with cracks that block a clear view is not allowed.',
      ckb: 'نابێت بە شکانی شووشەی بینین‌شێوێن لێبخوڕدرێت.',
    },
  },
  {
    id: 'q-rest-break-per-hour',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٥٠' },
    prompt: {
      ar: 'قيادة المركبة لمسافات طويلة قد تسبب الشعور بالنعاس أو التعب ولتلافي ذلك يجب أن تكون هناك لكل ساعة قيادة؟',
      en: 'Driving long distances can cause drowsiness or fatigue; to avoid this there should be, for every hour of driving:',
      ckb: 'لێخوڕین بۆ ماوەی دوور دەبێتە هۆی خەواڵووبوون، بۆیە بۆ هەر کاتژمێرێک لێخوڕین دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: '30دقيقة إستراحة',
        en: 'A 30-minute break',
        ckb: '٣٠ خولەک پشوو',
      } },
      { id: 'b', text: {
        ar: '20دقيقة إستراحة',
        en: 'A 20-minute break',
        ckb: '٢٠ خولەک پشوو',
      } },
      { id: 'c', text: {
        ar: '5دقائق إستراحة',
        en: 'A 5-minute break',
        ckb: '٥ خولەک پشوو',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تُؤخذ استراحة 5 دقائق لكل ساعة قيادة.',
      en: 'Take a 5-minute break for every hour of driving.',
      ckb: '٥ خولەک پشوو بۆ هەر کاتژمێرێک.',
    },
  },
  {
    id: 'q-daily-vehicle-check',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٥١' },
    prompt: {
      ar: 'سائق المركبة مسؤول عن سلامة مركبته وعليه الكشف عليها يومياً ودورياً قبل ركوبها للتأكد من',
      en: 'A driver is responsible for their vehicle\'s safety and must inspect it daily and periodically before getting in, to confirm:',
      ckb: 'شۆفێر بەرپرسیارە لە سەلامەتی ئۆتۆمبێلەکەی و دەبێت ڕۆژانە پشکنینی بکات بۆ دڵنیابوون لە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'صلاحيتها للقيادة',
        en: 'That it is fit to drive',
        ckb: 'شیاوبوونی بۆ لێخوڕین',
      } },
      { id: 'b', text: {
        ar: 'نظافتها',
        en: 'That it is clean',
        ckb: 'پاکی',
      } },
      { id: 'c', text: {
        ar: 'لوحات التسجيل',
        en: 'The registration plates',
        ckb: 'پلێتەکانی تۆمارکردن',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يتأكد السائق يومياً من صلاحية المركبة للقيادة.',
      en: 'The driver checks daily that the vehicle is fit to drive.',
      ckb: 'ڕۆژانە دڵنیابە لە شیاوبوونی بۆ لێخوڕین.',
    },
  },
  {
    id: 'q-keep-far-right-when-slow',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٥٢' },
    prompt: {
      ar: 'يلزم سائق المركبة بالسير في أقصى يمين الشارع أثناء قيادة المركبة في الحالات التالية؟',
      en: 'A driver must keep to the far right of the street in the following case:',
      ckb: 'شۆفێر دەبێت لە دوورترین لای ڕاستی شەقامدا بڕوات لەم حاڵەتەدا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إذ كان يقود مركبته بسرعة تقل عن الحد الاقصى المقرر للسرعة',
        en: 'When driving at less than the maximum prescribed speed',
        ckb: 'ئەگەر بە خێراییەکی کەمتر لە سنووری بەرز لێبخوڕێت',
      } },
      { id: 'b', text: {
        ar: 'خلال اجتيازه للمركبة التي أمامه',
        en: 'While overtaking the vehicle in front',
        ckb: 'لە کاتی تێپەڕاندنی ئۆتۆمبێلی پێشەوە',
      } },
      { id: 'c', text: {
        ar: 'خلال قيادته المركبة بسرعة في مسلك آخر',
        en: 'While driving fast in another lane',
        ckb: 'لە کاتی لێخوڕینی خێرا لە لاینێکی تر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يلتزم أقصى اليمين من يقود بسرعة أقل من الحد الأقصى.',
      en: 'Keep far right if driving below the maximum speed.',
      ckb: 'ئەگەر خێراییەکەت کەمتر بێت لە دوورترین لای ڕاست بڕۆ.',
    },
  },
  {
    id: 'q-stop-for-pedestrians-on-crossing',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'س ٢٥٣' },
    prompt: {
      ar: 'يجب التوقف للمشاة والسماح لهم بالعبور في مناطق العبور إذا كانوا؟',
      en: 'You must stop for pedestrians and let them cross at crossings if they:',
      ckb: 'دەبێت بۆ پیادەکان بوەستیت و ڕێگایان بدەیت بپەڕنەوە ئەگەر:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'وطؤا منطقة العبور',
        en: 'Have stepped onto the crossing',
        ckb: 'چوونەتە سەر پەڕینەوەکە',
      } },
      { id: 'b', text: {
        ar: 'وقفوا على الرصيف',
        en: 'Are standing on the pavement',
        ckb: 'لەسەر ڕێڕەوی پیادە وەستاون',
      } },
      { id: 'c', text: {
        ar: 'وقفوا في الجزرة الوسطية',
        en: 'Are standing on the central island',
        ckb: 'لە دوورگەی ناوەڕاست وەستاون',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب التوقف لمن وطئ منطقة العبور من المشاة.',
      en: 'Stop for pedestrians who have stepped onto the crossing.',
      ckb: 'بۆ ئەوانەی چوونەتە سەر پەڕینەوەکە بوەستە.',
    },
  },
  {
    id: 'q-pedestrian-visible-clothing',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٥٤' },
    prompt: {
      ar: 'من الممكن رؤية المشاة بصورة اوضح من قبل سائق المركبة في الظلام او في الجو المعتم إذا كان مرتدياً ملابس؟',
      en: 'A driver can see a pedestrian more clearly in the dark or in gloomy weather if they are wearing clothes that are:',
      ckb: 'شۆفێر پیادە ڕوونتر دەبینێت لە تاریکیدا ئەگەر جلی ئەم جۆرەی لەبەردابێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'غامقة',
        en: 'Dark',
        ckb: 'تاریک',
      } },
      { id: 'b', text: {
        ar: 'فاتحة اللون او عاكسة',
        en: 'Light-coloured or reflective',
        ckb: 'ڕەنگ ڕووناک یان ڕەنگدانەوەیی',
      } },
      { id: 'c', text: {
        ar: 'ملونة',
        en: 'Coloured',
        ckb: 'ڕەنگاوڕەنگ',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الملابس فاتحة اللون أو العاكسة تجعل المشاة أوضح للسائق.',
      en: 'Light or reflective clothing makes pedestrians more visible.',
      ckb: 'جلی ڕووناک یان ڕەنگدانەوەیی پیادە ڕوونتر دەکات.',
    },
  },
  {
    id: 'q-headlamp-colour',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٥٥' },
    prompt: {
      ar: 'لون المصباح الرئيسي (العالي والناصي) للمركبات يجب ان يكون باللون؟',
      en: 'The colour of a vehicle\'s main headlamp (main and dipped beam) must be:',
      ckb: 'ڕەنگی چرای سەرەکی (بەرز و نزم) دەبێت چی بێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الأبيض',
        en: 'White',
        ckb: 'سپی',
      } },
      { id: 'b', text: {
        ar: 'الاحمر',
        en: 'Red',
        ckb: 'سوور',
      } },
      { id: 'c', text: {
        ar: 'الاخضر',
        en: 'Green',
        ckb: 'سەوز',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'لون المصباح الرئيسي يجب أن يكون أبيض.',
      en: 'The main headlamp must be white.',
      ckb: 'دەبێت سپی بێت.',
    },
  },
  {
    id: 'q-bend-without-speed-sign',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٥٦' },
    prompt: {
      ar: 'عند عدم وجود علامة تشير الى الحد الاقصى للسرعة المسموح بها عند اي منعطف يجب ان؟',
      en: 'Where no sign shows the maximum permitted speed at a bend, you must:',
      ckb: 'ئەگەر تابلۆی سنووری خێرایی لە سووڕانەوەیەکدا نەبوو، دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تعادل تقدير حدة المنعطف وتقلل السرعة تبعا لذلك',
        en: 'Judge how sharp the bend is and reduce speed accordingly',
        ckb: 'تیژی سووڕانەوەکە خەمڵێنیت و خێرایی بەپێی ئەو کەم بکەیتەوە',
      } },
      { id: 'b', text: {
        ar: 'تفترض انه من الافضل ان تجتاز هذا المنعطف باقصى سرعة',
        en: 'Assume it is better to take the bend at maximum speed',
        ckb: 'وابزانیت باشترە بە بەرزترین خێرایی تێیبپەڕیت',
      } },
      { id: 'c', text: {
        ar: 'تستمر بالسير بالسرعة التي كنت تقود بها قبل الوصول الى المنعطف',
        en: 'Carry on at the speed you were driving before reaching the bend',
        ckb: 'بە هەمان خێرایی پێشوو بەردەوام بیت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُقدَّر حدة المنعطف وتُخفض السرعة تبعاً لذلك.',
      en: 'Judge the sharpness of the bend and slow accordingly.',
      ckb: 'تیژی سووڕانەوەکە بخەمڵێنە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'q-low-tyre-pressure',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٥٧' },
    prompt: {
      ar: 'الضغط المنخفض في الاطارات يؤدي الى؟',
      en: 'Low tyre pressure leads to:',
      ckb: 'پەستانی نزم لە تایەکاندا دەبێتە هۆی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تلف الاطار نتيجة سخونة وتلف كتف الاطار',
        en: 'Damage to the tyre from heat, and damage to the tyre shoulder',
        ckb: 'تێکچوونی تایە بەهۆی گەرمی و تێکچوونی شانی تایە',
      } },
      { id: 'b', text: {
        ar: 'سهولة تسيير المركبة',
        en: 'Easier handling of the vehicle',
        ckb: 'ئاسانی جوڵانی ئۆتۆمبێل',
      } },
      { id: 'c', text: {
        ar: 'الشعور بالراحة اثناء الركوب',
        en: 'A more comfortable ride',
        ckb: 'هەستکردن بە ئاسوودەیی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الضغط المنخفض يُتلف الإطار نتيجة السخونة ويتلف كتفه.',
      en: 'Low pressure damages the tyre through heat and wears its shoulder.',
      ckb: 'پەستانی نزم تایە تێکدەدات بەهۆی گەرمی.',
    },
  },
  {
    id: 'q-expressway-prohibited-users',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٥٨' },
    prompt: {
      ar: 'طريق السريع للمرور لا يجوز استخدامه من قبل؟',
      en: 'The expressway may not be used by:',
      ckb: 'ڕێگای خێرا نابێت لەلایەن ئەمانەوە بەکاربهێنرێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'سيارات الصالون',
        en: 'Saloon cars',
        ckb: 'ئۆتۆمبێلی سالۆن',
      } },
      { id: 'b', text: {
        ar: 'سيارات الحمل الكبيرة',
        en: 'Large goods vehicles',
        ckb: 'بارهەڵگرە گەورەکان',
      } },
      { id: 'c', text: {
        ar: 'المشاة والدراجات الهوائية والمكائن الزراعية والانشائية',
        en: 'Pedestrians, bicycles, and agricultural and construction machinery',
        ckb: 'پیادە و دووچەرخە و ئامێری کشتوکاڵی و بیناسازی',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُمنع المشاة والدراجات الهوائية والمكائن الزراعية والإنشائية من الطرق السريعة.',
      en: 'Pedestrians, bicycles and farm or construction machinery are barred from expressways.',
      ckb: 'پیادە و دووچەرخە و ئامێری کشتوکاڵی قەدەغەن.',
    },
  },
  {
    id: 'q-high-tyre-pressure',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٥٩' },
    prompt: {
      ar: 'الضغط العالي للهواء في الاطارات يؤدي الى؟',
      en: 'Excessive air pressure in the tyres leads to:',
      ckb: 'پەستانی بەرزی هەوا لە تایەکاندا دەبێتە هۆی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عدم الشعور بالراحة اثناء الركوب',
        en: 'An uncomfortable ride',
        ckb: 'نائاسوودەیی لە کاتی سواربووندا',
      } },
      { id: 'b', text: {
        ar: 'تلف الاطار وزيادة احتمال انفجاره',
        en: 'Damage to the tyre and a greater chance of a blowout',
        ckb: 'تێکچوونی تایە و زیادبوونی ئەگەری تەقینەوەی',
      } },
      { id: 'c', text: {
        ar: 'يتلف اجزاء تعليق المركبة',
        en: 'Damage to the vehicle\'s suspension parts',
        ckb: 'تێکچوونی بەشەکانی هەڵواسین',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الضغط العالي يُتلف الإطار ويزيد احتمال انفجاره.',
      en: 'Over-inflation damages the tyre and raises the risk of a blowout.',
      ckb: 'پەستانی بەرز تایە تێکدەدات و ئەگەری تەقینەوەی زیاد دەکات.',
    },
  },
  {
    id: 'q-drowsiness-while-driving',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٠' },
    prompt: {
      ar: 'إذا شعرت بالنعاس أثناء القيادة من الافضل؟',
      en: 'If you feel drowsy while driving, it is best to:',
      ckb: 'ئەگەر لە کاتی لێخوڕیندا هەستت بە خەواڵووبوون کرد، باشترە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تشغيل الراديو بصوت مرتفع جداً',
        en: 'Turn the radio up very loud',
        ckb: 'ڕادیۆ بە دەنگی زۆر بەرز داگیرسێنیت',
      } },
      { id: 'b', text: {
        ar: 'التوقف والاستراحة وتغيير السائق إذ أمكن ذلك',
        en: 'Stop, rest, and change driver if possible',
        ckb: 'بوەستیت و پشوو بدەیت و شۆفێر بگۆڕیت ئەگەر بکرێت',
      } },
      { id: 'c', text: {
        ar: 'تشغيل مكيف الهواء أو فتح نوافذ المركبة',
        en: 'Turn on the air conditioning or open the windows',
        ckb: 'کۆندیشن داگیرسێنیت یان پەنجەرەکان بکەیتەوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأفضل التوقف والاستراحة وتغيير السائق إن أمكن.',
      en: 'Stop, rest and swap drivers if you can.',
      ckb: 'بوەستە، پشوو بدە و شۆفێر بگۆڕە.',
    },
  },
  {
    id: 'q-absolute-no-stopping-places',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦١' },
    prompt: {
      ar: 'لايجوز التوقف أو الانتظار في الاماكن التالية بشكل مطلق؟',
      en: 'Stopping or waiting is absolutely prohibited in the following places:',
      ckb: 'وەستان یان چاوەڕوانی لەم شوێنانەدا بە تەواوی قەدەغەیە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مسالك وممرات الطريق',
        en: 'The road\'s lanes and carriageways',
        ckb: 'لاین و ڕێڕەوەکانی ڕێگا',
      } },
      { id: 'b', text: {
        ar: 'فوق الجسور وداخل الانفاق وعلى خطوط عبور المشاة',
        en: 'On bridges, inside tunnels and on pedestrian crossings',
        ckb: 'لەسەر پرد و ناو تونێل و لەسەر پەڕینەوەی پیادە',
      } },
      { id: 'c', text: {
        ar: 'كل ماتم ذكره',
        en: 'All of the above',
        ckb: 'هەموو ئەوانەی باسکران',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يمنع التوقف في جميع تلك الأماكن.',
      en: 'Stopping is prohibited in all of those places.',
      ckb: 'لە هەموو ئەو شوێنانەدا قەدەغەیە.',
    },
  },
  {
    id: 'q-horn-prohibited-places',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٢' },
    prompt: {
      ar: 'يمنع إستخدام المنبه (الهورن) بالاماكن التالية؟',
      en: 'Using the horn is prohibited in the following places:',
      ckb: 'بەکارهێنانی بۆری لەم شوێنانەدا قەدەغەیە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مناطق الدوائر الحكومية',
        en: 'Areas around government offices',
        ckb: 'ناوچەی فەرمانگە حکومییەکان',
      } },
      { id: 'b', text: {
        ar: 'المناطق السكنية',
        en: 'Residential areas',
        ckb: 'ناوچە نیشتەجێبووەکان',
      } },
      { id: 'c', text: {
        ar: 'المدارس والمستشفيات وجميع الاماكن بصورة عامة إلا عند الضرورة القصوى',
        en: 'Schools, hospitals and everywhere in general, except in cases of extreme necessity',
        ckb: 'قوتابخانە و نەخۆشخانە و هەموو شوێنێک بە گشتی جگە لە پێویستی زۆر',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يمنع استخدام المنبه في جميع الأماكن إلا عند الضرورة القصوى.',
      en: 'The horn is prohibited everywhere except in extreme necessity.',
      ckb: 'لە هەموو شوێنێک قەدەغەیە جگە لە پێویستی زۆر.',
    },
  },
  {
    id: 'q-double-parking-crowded-places',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٣' },
    prompt: {
      ar: 'هل يجوز التوقف في صف ثاني امام الاماكن المزدحمة كالمساجد وغيرها؟',
      en: 'May you double-park in front of crowded places such as mosques?',
      ckb: 'ئایا ڕێپێدراوە لە ڕیزی دووەم لە بەردەم شوێنە قەرەباڵغەکان وەک مزگەوت بوەستیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لا يجوز مطلقاً',
        en: 'Never permitted',
        ckb: 'بە هیچ شێوەیەک ڕێپێدراو نییە',
      } },
      { id: 'b', text: {
        ar: 'يمكن التوقف',
        en: 'You may stop',
        ckb: 'دەکرێت بوەستیت',
      } },
      { id: 'c', text: {
        ar: 'نعم يجوز التوقف في الجانب الايسر',
        en: 'Yes, you may stop on the left-hand side',
        ckb: 'بەڵێ، لە لای چەپەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الوقوف بصف ثانٍ أمام الأماكن المزدحمة لا يجوز مطلقاً.',
      en: 'Double parking outside crowded places is never permitted.',
      ckb: 'بە هیچ شێوەیەک ڕێپێدراو نییە.',
    },
  },
  {
    id: 'q-when-reversing-allowed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٤' },
    prompt: {
      ar: 'متى يسمح بالرجوع الى الخلف بالمركبة؟',
      en: 'When is reversing the vehicle permitted?',
      ckb: 'کەی ڕێپێدراوە بە دواوە بچیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عند ركن المركبة و في حالات الضرورة القصوى وفي الاماكن التي يكون فيها مدى الرؤوية جيدة ولمسافة لا تزيد عن 5 م وبسرعة واطئة جداً',
        en: 'When parking, and in cases of extreme necessity, in places with good visibility, for no more than 5 m and at a very low speed',
        ckb: 'لە کاتی پارککردن و لە حاڵەتی پێویستی زۆردا، لە شوێنی بینینی باش، بۆ ماوەی نەزیاتر لە ٥ مەتر و بە خێرایی زۆر نزم',
      } },
      { id: 'b', text: {
        ar: 'عند السير في الطريق السريع ولمسافة 50متر',
        en: 'When travelling on the expressway, for 50 metres',
        ckb: 'لە ڕێگای خێرادا بۆ ٥٠ مەتر',
      } },
      { id: 'c', text: {
        ar: 'عندما تكون محاصرا في شارع مزدحم',
        en: 'When you are boxed in on a congested street',
        ckb: 'کاتێک لە شەقامێکی قەرەباڵغدا گیراویت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُسمح بالرجوع عند الركن والضرورة القصوى بمسافة لا تزيد عن 5 م وبسرعة واطئة.',
      en: 'Reversing is allowed when parking or in extreme necessity, under 5 m and very slowly.',
      ckb: 'لە کاتی پارککردن و پێویستی زۆردا، کەمتر لە ٥ مەتر.',
    },
  },
  {
    id: 'q-warning-devices-restricted-to',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٥' },
    prompt: {
      ar: 'لا يجوز استعمال الاجهزة التحذيرية أو الضوئية ويقتصر استعمالها فقط للمركبات؟',
      en: 'Warning or light devices may not be used; their use is restricted to the vehicles of:',
      ckb: 'ئامێرە ئاگادارکەرەوە یان ڕووناکییەکان تەنها بۆ ئەم ئۆتۆمبێلانەن:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التي تحمل لوحات تسجيل الاجرة',
        en: 'Vehicles carrying taxi registration plates',
        ckb: 'ئەوانەی پلێتی تاکسییان هەیە',
      } },
      { id: 'b', text: {
        ar: 'مركبات الطوارئ والشرطة والمرور والدفاع المدني',
        en: 'Emergency, police, traffic and civil defence vehicles',
        ckb: 'ئۆتۆمبێلی فریاگوزاری و پۆلیس و هاتوچۆ و بەرگری شارستانی',
      } },
      { id: 'c', text: {
        ar: 'المركبات التي تحمل لوحات تسجيل الحمل',
        en: 'Vehicles carrying goods registration plates',
        ckb: 'ئەوانەی پلێتی بارهەڵگرییان هەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يقتصر استعمالها على مركبات الطوارئ والشرطة والمرور والدفاع المدني.',
      en: 'Their use is limited to emergency, police, traffic and civil defence vehicles.',
      ckb: 'تەنها بۆ فریاگوزاری و پۆلیس و هاتوچۆ و بەرگری شارستانی.',
    },
  },
  {
    id: 'q-hot-engine-radiator-cap',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٦٦' },
    prompt: {
      ar: 'عندما يكون المحرك ساخناً ماذا يجب ان تفعل؟',
      en: 'When the engine is hot, what should you do?',
      ckb: 'کاتێک بزوێنەر گەرمە چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يتم رفع غطاء ماء الراديتر وتركها لحين ان يبرد المحرك',
        en: 'Lift the radiator cap and leave it until the engine cools',
        ckb: 'سەرپۆشی ڕادیەتەر هەڵدەگریت و بەجێی دەهێڵیت',
      } },
      { id: 'b', text: {
        ar: 'يتم رفع غطاء ماء الراديتر واضافة الماء لحين برودة الراديتر',
        en: 'Lift the radiator cap and add water until the radiator cools',
        ckb: 'سەرپۆشەکە هەڵدەگریت و ئاوی بۆ زیاد دەکەیت',
      } },
      { id: 'c', text: {
        ar: 'لا تقم مطلقاً برفع غطاء ماء الراديتر عندما يكون المحرك ساخناً واحذر من اضافة الماء',
        en: 'Never lift the radiator cap while the engine is hot, and beware of adding water',
        ckb: 'هەرگیز سەرپۆشی ڕادیەتەر هەڵمەگرە کاتێک بزوێنەر گەرمە و ئاگاداربە لە زیادکردنی ئاو',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'لا يُرفع غطاء الراديتر والمحرك ساخن، ويُحذر من إضافة الماء.',
      en: 'Never open the radiator cap on a hot engine, and beware of adding water.',
      ckb: 'هەرگیز سەرپۆشەکە هەڵمەگرە کاتێک گەرمە.',
    },
  },
  {
    id: 'q-child-in-front-seat',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٧' },
    prompt: {
      ar: 'هل يجوز قيادة مركبة بجلوس طفل في المعقد الامامي او في حضن امه او احد الركاب؟',
      en: 'May a vehicle be driven with a child sitting in the front seat, or on their mother\'s or a passenger\'s lap?',
      ckb: 'ئایا ڕێپێدراوە منداڵ لە کورسی پێشەوە یان لە باوەشی دایکیدا دانیشێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع و لايجوز بشكل مطلق',
        en: 'Prohibited and never permitted',
        ckb: 'قەدەغەیە و بە هیچ شێوەیەک ڕێپێدراو نییە',
      } },
      { id: 'b', text: {
        ar: 'نعم يجوز اذا كان الطفل يقل عمره عن 2 سنة',
        en: 'Yes, if the child is under 2 years old',
        ckb: 'بەڵێ، ئەگەر تەمەنی کەمتر لە ٢ ساڵ بێت',
      } },
      { id: 'c', text: {
        ar: 'نعم يجوز اذا كان عمره يقل عن 5 سنوات',
        en: 'Yes, if the child is under 5 years old',
        ckb: 'بەڵێ، ئەگەر کەمتر لە ٥ ساڵ بێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'جلوس الطفل في المقعد الأمامي أو في الحضن ممنوع مطلقاً.',
      en: 'A child in the front seat or on a lap is never permitted.',
      ckb: 'بە هیچ شێوەیەک ڕێپێدراو نییە.',
    },
  },
  {
    id: 'q-children-under-ten-seating',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٨' },
    prompt: {
      ar: 'يكون جلوس الاطفال و الذين لا يتجاوز عمرهم عن 10 سنوات',
      en: 'Children aged 10 or under must sit:',
      ckb: 'منداڵانی تەمەن ١٠ ساڵ و کەمتر دەبێت لەکوێ دانیشن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في صندوق المركبة',
        en: 'In the boot of the vehicle',
        ckb: 'لە سندوقی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'في احضان الراكب الامامي',
        en: 'On the front passenger\'s lap',
        ckb: 'لە باوەشی سەرنشینی پێشەوە',
      } },
      { id: 'c', text: {
        ar: 'في المقعد الخلفي وفي الكرسي المخصص بجلوسهم',
        en: 'In the rear seat, in the child seat provided for them',
        ckb: 'لە کورسی دواوە و لە کورسی تایبەتی خۆیاندا',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يجلس الأطفال في المقعد الخلفي وفي الكرسي المخصص لهم.',
      en: 'Children sit in the rear, in the child seat provided.',
      ckb: 'لە کورسی دواوە و کورسی تایبەتیان.',
    },
  },
  {
    id: 'q-high-beam-prohibited-when',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٦٩' },
    prompt: {
      ar: 'يمنع استعمال الضوء العالي عند؟',
      en: 'Using main beam is prohibited when:',
      ckb: 'بەکارهێنانی ڕووناکی بەرز کەی قەدەغەیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اثناء الذهاب الى التنزه والسفر',
        en: 'Going on an outing or a journey',
        ckb: 'لە کاتی گەشت و سەفەردا',
      } },
      { id: 'b', text: {
        ar: 'في الطرق الداخلية',
        en: 'On inner-city roads',
        ckb: 'لە ڕێگا ناوەکییەکان',
      } },
      { id: 'c', text: {
        ar: 'التقابل مع مركبة اخرى او عند الاقتراب من مركبة متقدمة',
        en: 'Meeting another vehicle, or closing on a vehicle ahead',
        ckb: 'لە کاتی بەریەککەوتن لەگەڵ ئۆتۆمبێلێکی تر یان نزیکبوونەوە لە ئۆتۆمبێلی پێشەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يمنع الضوء العالي عند التقابل أو الاقتراب من مركبة متقدمة.',
      en: 'Main beam is prohibited when meeting or closing on another vehicle.',
      ckb: 'لە کاتی بەریەککەوتن یان نزیکبوونەوە قەدەغەیە.',
    },
  },
  {
    id: 'q-safety-distance-importance',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧٠' },
    prompt: {
      ar: 'ترك مسافة امان كافية بين المركبة والمركبة المتقدمة ضرورية وتزداد اهمية هذه المسافة اذا كان الطريق؟',
      en: 'Leaving a sufficient safety gap to the vehicle ahead is essential, and this gap matters even more when the road is:',
      ckb: 'هێشتنەوەی ماوەی سەلامەتی پێویستە و گرنگی زیاتر دەبێت ئەگەر ڕێگاکە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مزدحم',
        en: 'Congested',
        ckb: 'قەرەباڵغ بێت',
      } },
      { id: 'b', text: {
        ar: 'مبلل او اذا كانت السياقة بسرعة في طريق المرور السريع',
        en: 'Wet, or when driving fast on an expressway',
        ckb: 'تەڕ بێت یان لێخوڕین بە خێرایی لە ڕێگای خێرادا بێت',
      } },
      { id: 'c', text: {
        ar: 'ترابي اومفروش بالحصى',
        en: 'Unpaved or gravelled',
        ckb: 'خۆڵاوی یان بەردڕژاو بێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تزداد أهمية مسافة الأمان على الطريق المبلل أو عند السرعة في الطريق السريع.',
      en: 'The gap matters most on a wet road or at speed on an expressway.',
      ckb: 'لە ڕێگای تەڕ یان بە خێرایی زیاتر گرنگە.',
    },
  },
  {
    id: 'q-public-licence-scope',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٧١' },
    prompt: {
      ar: 'حامل إجازة السوق العمومية يمكنه قيادة؟',
      en: 'The holder of a public driving licence may drive:',
      ckb: 'خاوەنی مۆڵەتی گشتی دەتوانێت چی لێبخوڕێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'جميع أنواع المركبات في الاقليم عدا الانشائية والزراعية والدراجة النارية',
        en: 'All types of vehicle in the region except construction, agricultural and motorcycles',
        ckb: 'هەموو جۆرەکانی ئۆتۆمبێل لە هەرێمدا جگە لە بیناسازی و کشتوکاڵی و ماتۆڕسکیل',
      } },
      { id: 'b', text: {
        ar: 'الشاحنات فقط',
        en: 'Lorries only',
        ckb: 'تەنها بارهەڵگر',
      } },
      { id: 'c', text: {
        ar: 'الدراجات الالية والمركبات العمومية الصغيرة',
        en: 'Motorcycles and small public vehicles',
        ckb: 'ماتۆڕسکیل و ئۆتۆمبێلی گشتی بچووک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تخوّل الإجازة العمومية قيادة جميع الأنواع عدا الإنشائية والزراعية والدراجة النارية.',
      en: 'A public licence covers all types except construction, agricultural and motorcycles.',
      ckb: 'هەموو جۆرەکان جگە لە بیناسازی و کشتوکاڵی و ماتۆڕسکیل.',
    },
  },
  {
    id: 'q-speed-near-crossings-schools',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧٢' },
    prompt: {
      ar: 'اقصى سرعة مسموح بها عند الاقتراب من مناطق عبور المشاة وروضة الاطفال والمدارس والدوائر الحكومية هي؟',
      en: 'The maximum speed allowed when approaching pedestrian crossings, nurseries, schools and government offices is:',
      ckb: 'بەرزترین خێرایی ڕێپێدراو لە نزیکبوونەوە لە پەڕینەوەی پیادە و باخچەی ساوایان و قوتابخانە:',
    },
    choices: [
      { id: 'a', text: {
        ar: '70كم / ساعة',
        en: '70 km/h',
        ckb: '٧٠ کم/کاتژمێر',
      } },
      { id: 'b', text: {
        ar: '30كم / ساعة',
        en: '30 km/h',
        ckb: '٣٠ کم/کاتژمێر',
      } },
      { id: 'c', text: {
        ar: '50كم / ساعة',
        en: '50 km/h',
        ckb: '٥٠ کم/کاتژمێر',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'أقصى سرعة قرب هذه المناطق 30 كم/ساعة.',
      en: 'The maximum near these areas is 30 km/h.',
      ckb: 'بەرزترین خێرایی ٣٠ کم/کاتژمێرە.',
    },
  },
  {
    id: 'q-allowing-unlicensed-driver-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧٣' },
    prompt: {
      ar: 'عقوبة الشخص الذي يسمح بقيادة مركبته من قبل شخص غير مجاز هي؟',
      en: 'The penalty for someone who lets an unlicensed person drive their vehicle is:',
      ckb: 'سزای ئەو کەسەی ڕێگا دەدات کەسێکی بێ مۆڵەت ئۆتۆمبێلەکەی لێبخوڕێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حجز المركبة',
        en: 'Impounding the vehicle',
        ckb: 'دەستبەسەرداگرتنی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'الحبس او الغرامة او بكلتا العقوبتين',
        en: 'Imprisonment or a fine, or both',
        ckb: 'زیندان یان غەرامە یان هەردووکیان',
      } },
      { id: 'c', text: {
        ar: 'تنبيه المالك فقط',
        en: 'A warning to the owner only',
        ckb: 'تەنها ئاگادارکردنەوەی خاوەنەکە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العقوبة الحبس أو الغرامة أو كلتاهما.',
      en: 'The penalty is imprisonment or a fine, or both.',
      ckb: 'زیندان یان غەرامە یان هەردووکیان.',
    },
  },
  {
    id: 'q-child-on-lap-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧٤' },
    prompt: {
      ar: 'مخالفة وضع الاطفال في حضن السائق هي:',
      en: 'The offence of putting children on the driver\'s lap carries:',
      ckb: 'سزای دانانی منداڵ لە باوەشی شۆفێردا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'سحب الاجازة السوق',
        en: 'Withdrawal of the driving licence',
        ckb: 'هەڵگرتنەوەی مۆڵەتی لێخوڕین',
      } },
      { id: 'b', text: {
        ar: 'الحبس',
        en: 'Imprisonment',
        ckb: 'زیندان',
      } },
      { id: 'c', text: {
        ar: 'الغرامة بمبلغ 40,000 دينار',
        en: 'A fine of 40,000 dinars',
        ckb: 'غەرامەی ٤٠٬٠٠٠ دینار',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العقوبة غرامة بمبلغ 40,000 دينار بحسب دليل الأسئلة الرسمي.',
      en: 'The official guide gives a 40,000-dinar fine.',
      ckb: 'بەپێی ڕێنمایی فەرمی، غەرامەی ٤٠٬٠٠٠ دینارە.',
    },
  },
  {
    id: 'q-boiling-radiator',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٧٥' },
    prompt: {
      ar: 'في حالة غليان ماء المحرك (الراديتر) على السائق؟',
      en: 'If the engine coolant (radiator) boils, the driver should:',
      ckb: 'ئەگەر ئاوی ڕادیەتەر کوڵا، شۆفێر دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'فتح غطاء الراديتر لإزالة الضغط',
        en: 'Open the radiator cap to release the pressure',
        ckb: 'سەرپۆشەکە بکاتەوە بۆ لابردنی پەستان',
      } },
      { id: 'b', text: {
        ar: 'إطفاء المحرك فوراً',
        en: 'Switch the engine off at once',
        ckb: 'دەستبەجێ بزوێنەر بکوژێنێتەوە',
      } },
      { id: 'c', text: {
        ar: 'ترك المحرك في حاله اشتغال وتبريد الراديتر من خلال صب الماء عليه من الخارج لمدة 20 دقيقة وبعدها فتح غطاء الراديتر',
        en: 'Leave the engine running and cool the radiator by pouring water over the outside for 20 minutes, then open the cap',
        ckb: 'بزوێنەر بەکارکردن بهێڵێتەوە و ڕادیەتەر سارد بکاتەوە بە ڕشتنی ئاو بەسەریدا بۆ ٢٠ خولەک، پاشان سەرپۆشەکە بکاتەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُترك المحرك يعمل ويُبرَّد الراديتر من الخارج 20 دقيقة قبل فتح الغطاء.',
      en: 'Leave the engine running, cool the radiator externally for 20 minutes, then open the cap.',
      ckb: 'بزوێنەر بەکارکردن بهێڵەوە و ٢٠ خولەک ساردی بکەرەوە.',
    },
  },
  {
    id: 'q-children-playing-ball',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧٦' },
    prompt: {
      ar: 'كيف يجب ان تتصرف عند الاقتراب من مجموعة اطفال يلعبون الكرة في الشارع او على الرصيف؟',
      en: 'How should you behave when approaching a group of children playing ball in the street or on the pavement?',
      ckb: 'چۆن ڕەفتار دەکەیت کاتێک لە کۆمەڵێک منداڵ نزیک دەبیتەوە کە تۆپ دەیانەوێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تخفيف السرعة والقيادة بانتباه وحذر تام',
        en: 'Slow down and drive with full attention and care',
        ckb: 'خێرایی کەم بکەرەوە و بە وریایی تەواو لێبخوڕە',
      } },
      { id: 'b', text: {
        ar: 'عليك الانتباه للكرة فقط',
        en: 'You only need to watch the ball',
        ckb: 'تەنها ئاگاداری تۆپەکە بە',
      } },
      { id: 'c', text: {
        ar: 'متابعة السير بالسرعة التي كنت تقود بها لعدم اعاقة السير القادم من الخلف',
        en: 'Carry on at the same speed so as not to obstruct traffic behind you',
        ckb: 'بە هەمان خێرایی بەردەوام بە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُخفف السرعة ويُقاد بانتباه وحذر تام قرب الأطفال.',
      en: 'Slow down and drive with complete care near children.',
      ckb: 'خێرایی کەم بکەرەوە و بە وریایی تەواو لێبخوڕە.',
    },
  },
  {
    id: 'q-busy-main-street',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٧٧' },
    prompt: {
      ar: 'تسير على شارع رئيسي مكتظ ومزدحم. مالذي يجب عليك فعله؟',
      en: 'You are travelling on a busy, congested main street. What should you do?',
      ckb: 'لە شەقامێکی سەرەکی قەرەباڵغدا دەڕۆیت. چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحفاظ على مسافة امان كافية مع المركبات الامامية وعدم الانحراف عن خط السير والانتباه جيدا',
        en: 'Keep a sufficient safety gap to the vehicles ahead, stay in your lane and pay close attention',
        ckb: 'ماوەی سەلامەتی گونجاو بهێڵەوە و لە لاینەکەت لامەدە و باش ئاگاداربە',
      } },
      { id: 'b', text: {
        ar: 'تجاوز القافلة بانحراف عن خط السير بمرة واحدة',
        en: 'Overtake the queue by pulling out of your lane in one go',
        ckb: 'بە یەک جار لە لاینەکە لابدە و ڕیزەکە تێبپەڕێنە',
      } },
      { id: 'c', text: {
        ar: 'اجبار السائقين في المقدمة لفتح الطريق لي وتجاوزهم باي شكل كان',
        en: 'Force the drivers ahead to make way and overtake them however you can',
        ckb: 'شۆفێرەکانی پێشەوە ناچار بکە ڕێگا بکەنەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُحافظ على مسافة أمان وعدم الانحراف عن خط السير مع الانتباه.',
      en: 'Keep a safe gap, stay in lane and pay attention.',
      ckb: 'ماوەی سەلامەتی بهێڵەوە و لە لاینەکەت بمێنەوە.',
    },
  },
  {
    id: 'q-brake-overheating-signs',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٧٨' },
    prompt: {
      ar: 'كيف تشخص السخونة الزائدة في الفرامل؟',
      en: 'How do you detect overheating in the brakes?',
      ckb: 'چۆن گەرمی زیادەی برێک دەناسیتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'من اضاءة لمبة المحرك في تابلو المركبة',
        en: 'From the engine light on the dashboard',
        ckb: 'لە داگیرسانی چرای بزوێنەر لە داشبۆرد',
      } },
      { id: 'b', text: {
        ar: 'من الفقدان التدريجي لقوة المحرك',
        en: 'From a gradual loss of engine power',
        ckb: 'لە لەدەستدانی پلەبەپلەی هێزی بزوێنەر',
      } },
      { id: 'c', text: {
        ar: 'من ضعف الفرملة وانبعاث رائحة محترقة',
        en: 'From weak braking and a burning smell',
        ckb: 'لە لاوازی برێک و هاتنی بۆنی سووتاو',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'تُشخّص السخونة الزائدة من ضعف الفرملة ورائحة الاحتراق.',
      en: 'Overheating shows as weak braking and a burning smell.',
      ckb: 'بە لاوازی برێک و بۆنی سووتاو.',
    },
  },
  {
    id: 'q-tyre-damage-causes',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٧٩' },
    prompt: {
      ar: 'الأسباب التي تسرع من تلف إطارات المركبات؟',
      en: 'The causes that speed up wear on a vehicle\'s tyres are:',
      ckb: 'ئەو هۆکارانەی داڕزانی تایەکان خێرا دەکەن:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'القيادة بإطارات ذات ضغط هواء واطئ',
        en: 'Driving on under-inflated tyres',
        ckb: 'لێخوڕین بە تایەی پەستان نزم',
      } },
      { id: 'b', text: {
        ar: 'إرتفاع درجات الحرارة والحمولة الزائدة',
        en: 'High temperatures and excess load',
        ckb: 'بەرزی پلەی گەرمی و باری زیادە',
      } },
      { id: 'c', text: {
        ar: 'كل ماذكر اعلاه',
        en: 'All of the above',
        ckb: 'هەموو ئەوانەی سەرەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'جميع ما ذُكر يسرّع تلف الإطارات.',
      en: 'All of the listed causes speed up tyre wear.',
      ckb: 'هەموو ئەوانەی باسکران.',
    },
  },
  {
    id: 'q-traffic-police-phone',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'س ٢٨٠' },
    prompt: {
      ar: 'رقم هاتف الطوارئ لشرطة المرور',
      en: 'The traffic police emergency telephone number is:',
      ckb: 'ژمارەی تەلەفۆنی فریاگوزاری پۆلیسی هاتوچۆ:',
    },
    choices: [
      { id: 'a', text: {
        ar: '188',
        en: '188',
        ckb: '١٨٨',
      } },
      { id: 'b', text: {
        ar: '122',
        en: '122',
        ckb: '١٢٢',
      } },
      { id: 'c', text: {
        ar: '104',
        en: '104',
        ckb: '١٠٤',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'رقم الطوارئ لشرطة المرور هو 188.',
      en: 'The traffic police emergency number is 188.',
      ckb: 'ژمارەکە ١٨٨ە.',
    },
  },
  {
    id: 'q-non-iraqi-licence',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'س ٢٨١' },
    prompt: {
      ar: 'يجوز منح غير العراقي اجازة سوق؟',
      en: 'A non-Iraqi may be granted a driving licence that is:',
      ckb: 'بۆ ناعێراقی مۆڵەتی لێخوڕین دەدرێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'عمومي فقط',
        en: 'Public only',
        ckb: 'تەنها گشتی',
      } },
      { id: 'b', text: {
        ar: 'خصوصي فقط',
        en: 'Private only',
        ckb: 'تەنها تایبەت',
      } },
      { id: 'c', text: {
        ar: 'خصوصي و عمومي',
        en: 'Private and public',
        ckb: 'تایبەت و گشتی',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يُمنح غير العراقي إجازة سوق خصوصي فقط.',
      en: 'A non-Iraqi may only be granted a private licence.',
      ckb: 'تەنها مۆڵەتی تایبەت.',
    },
  },
];
