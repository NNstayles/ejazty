/**
 * Questions transcribed from the official ministry bank — picture section,
 * questions 1–149.
 *
 * GENERATED from the per-page transcriptions; see CLAUDE.md. Arabic is verbatim
 * from "دليل الأسئلة والأجوبة للاختبار النظري لرخصة القيادة"; English and
 * Kurdish Sorani are working translations of that Arabic and are NOT part of the
 * publication.
 *
 * The artwork under `@/assets/exam/` is extracted from the same publication, one
 * image per question, matched to its question by position on the rendered page.
 * The picture section restarts its own numbering at 1, so these locators read
 * "ص س N" (صورة/سؤال) to keep them distinct from the text section's "س N".
 */
import type { Question } from '../../schema';
import { EXAM_GUIDE as S } from './source';

export const officialQuestionsPictures: Question[] = [
  {
    id: 'qp-overtake-motorcycle-broken-line',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١' },
    image: require('@/assets/exam/pic-001.jpg'),
    prompt: {
      ar: 'هل تستطيع المركبة اجتياز الدراجة النارية في هذه الصورة؟',
      en: 'Can the vehicle overtake the motorcycle in this picture?',
      ckb: 'ئایا ئۆتۆمبێلەکە دەتوانێت ماتۆڕسکیلەکە تێبپەڕێنێت لەم وێنەیەدا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم لوجود خط متقطع على يسار المركبة',
        en: 'Yes, because there is a broken line to the left of the vehicle',
        ckb: 'بەڵێ، چونکە هێڵێکی پچڕپچڕ لە لای چەپی ئۆتۆمبێلەکەیە',
      } },
      { id: 'b', text: {
        ar: 'كلا',
        en: 'No',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'كلا لوجود خط منقطع وآخر مستمر على يسار المركبة',
        en: 'No, because there is a broken line and a continuous one to the left of the vehicle',
        ckb: 'نەخێر، چونکە هێڵێکی پچڕپچڕ و یەکێکی بەردەوام لە لای چەپیەتی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخط المتقطع على يسار المركبة يسمح بالاجتياز.',
      en: 'The broken line to the vehicle\'s left permits overtaking.',
      ckb: 'هێڵی پچڕپچڕ ڕێگا بە تێپەڕاندن دەدات.',
    },
  },
  {
    id: 'qp-slippery-road-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢' },
    image: require('@/assets/exam/pic-002.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر من مخاطر السقوط',
        en: 'Beware of the danger of falling',
        ckb: 'ئاگاداری مەترسی کەوتن بە',
      } },
      { id: 'b', text: {
        ar: 'إحذر أمامك طريق منزلق',
        en: 'Beware: slippery road ahead',
        ckb: 'ئاگاداربە، ڕێگای خلیسک لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'إحذر أمامك مطبات صناعية',
        en: 'Beware: speed humps ahead',
        ckb: 'ئاگاداربە، قەڵشی دەستکرد لە پێشتە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من طريق منزلق أمامك.',
      en: 'The sign warns of a slippery road ahead.',
      ckb: 'تابلۆکە ئاگادارت دەکاتەوە لە ڕێگای خلیسک.',
    },
  },
  {
    id: 'qp-crossroads-priority-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣' },
    image: require('@/assets/exam/pic-003.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر امامك اشارة ضوئية (ترافيكلايت)',
        en: 'Beware: traffic lights ahead',
        ckb: 'ئاگاداربە، چرای هاتوچۆ لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'احذر امامك ممر لعبور المشاة',
        en: 'Beware: pedestrian crossing ahead',
        ckb: 'ئاگاداربە، پەڕینەوەی پیادە لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'احذر الاسبقية لطريق الرئيسى على الطريق الفرعين من الجهتين اليمين واليسار',
        en: 'Beware: the main road has priority over the side roads on both the right and the left',
        ckb: 'ئاگاداربە، پێشینەیی بۆ ڕێگا سەرەکییەکەیە بەسەر ڕێگا لاوەکییەکانی ڕاست و چەپ',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تنبه إلى أسبقية الطريق الرئيسي على الفرعيين يميناً ويساراً.',
      en: 'The sign warns that the main road has priority over the side roads either side.',
      ckb: 'تابلۆکە ئاماژە بە پێشینەیی ڕێگا سەرەکییەکە دەکات.',
    },
  },
  {
    id: 'qp-blue-cannot-overtake-green',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٤' },
    image: require('@/assets/exam/pic-004.jpg'),
    prompt: {
      ar: 'ما سبب عدم تمكن المركبة الزرقاء من اجتياز المركبة الخضراء التي تسير أمامها؟',
      en: 'Why can the blue vehicle not overtake the green vehicle travelling ahead of it?',
      ckb: 'بۆچی ئۆتۆمبێلە شینەکە ناتوانێت سەوزەکە تێبپەڕێنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'وجود خط متصل الى يسار المركبة الزرقاء',
        en: 'There is a continuous line to the left of the blue vehicle',
        ckb: 'هێڵێکی بەردەوام لە لای چەپی شینەکەیە',
      } },
      { id: 'b', text: {
        ar: 'وجود مركبة اخرى على يسار المركبة الزرقاء',
        en: 'There is another vehicle to the left of the blue vehicle',
        ckb: 'ئۆتۆمبێلێکی تر لە لای چەپیەتی',
      } },
      { id: 'c', text: {
        ar: 'ممكن للمركبة الزرقاء الاجتياز',
        en: 'The blue vehicle can overtake',
        ckb: 'دەتوانێت تێیبپەڕێنێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخط المتصل على يسار المركبة الزرقاء يمنع الاجتياز.',
      en: 'The continuous line on the blue vehicle\'s left prohibits overtaking.',
      ckb: 'هێڵی بەردەوام ڕێگری لە تێپەڕاندن دەکات.',
    },
  },
  {
    id: 'qp-side-road-left-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥' },
    image: require('@/assets/exam/pic-005.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر أمامك طريق فرعي إلى اليسار',
        en: 'Beware: side road to the left ahead',
        ckb: 'ئاگاداربە، ڕێگای لاوەکی بۆ لای چەپ لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'احذر أمامك طريق فرعي إلى اليمين',
        en: 'Beware: side road to the right ahead',
        ckb: 'ئاگاداربە، ڕێگای لاوەکی بۆ لای ڕاست لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك استداره إلى اليسار',
        en: 'Beware: a turn to the left ahead',
        ckb: 'ئاگاداربە، سووڕانەوە بۆ چەپ لە پێشتە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحذر من طريق فرعي إلى اليسار.',
      en: 'The sign warns of a side road to the left.',
      ckb: 'تابلۆکە ئاگادارت دەکاتەوە لە ڕێگای لاوەکی لای چەپ.',
    },
  },
  {
    id: 'qp-traffic-lights-ahead-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦' },
    image: require('@/assets/exam/pic-006.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر أمامك تقاطع منظم بالترفيك لايت',
        en: 'Beware: a junction controlled by traffic lights ahead',
        ckb: 'ئاگاداربە، چوارڕیانی ڕێکخراو بە چرای هاتوچۆ لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'الوقوف ممنوع',
        en: 'No parking',
        ckb: 'وەستان قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'إحذر أمامك معبر للمشاة',
        en: 'Beware: pedestrian crossing ahead',
        ckb: 'ئاگاداربە، پەڕینەوەی پیادە لە پێشتە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تنبه إلى تقاطع منظم بالإشارة الضوئية.',
      en: 'The sign warns of a junction controlled by traffic lights.',
      ckb: 'تابلۆکە ئاماژە بە چوارڕیانی ڕێکخراو بە چرا دەکات.',
    },
  },
  {
    id: 'qp-which-vehicle-violates',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٧' },
    image: require('@/assets/exam/pic-007.jpg'),
    prompt: {
      ar: 'أي من المركبتين مخالف بموجب القانون؟',
      en: 'Which of the two vehicles is breaking the law?',
      ckb: 'کام لەم دوو ئۆتۆمبێلە سەرپێچی یاسا دەکات؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة الخضراء',
        en: 'The green vehicle',
        ckb: 'ئۆتۆمبێلە سەوزەکە',
      } },
      { id: 'b', text: {
        ar: 'المركبة الزرقاء',
        en: 'The blue vehicle',
        ckb: 'ئۆتۆمبێلە شینەکە',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردووکیان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'المركبة الزرقاء مخالفة لوقوفها على ممر عبور المشاة.',
      en: 'The blue vehicle is at fault for being on the pedestrian crossing.',
      ckb: 'ئۆتۆمبێلە شینەکە سەرپێچی دەکات.',
    },
  },
  {
    id: 'qp-give-way-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٨' },
    image: require('@/assets/exam/pic-008.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الدخول',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'قف واسمح لمرور المركبات ذات الاسبقية',
        en: 'Stop and give way to vehicles that have priority',
        ckb: 'بوەستە و ڕێگا بدە بەو ئۆتۆمبێلانەی پێشینەییان هەیە',
      } },
      { id: 'c', text: {
        ar: 'الطريق الرئيسي لاسبقية المرور (لك الأسبقية)',
        en: 'Main road with priority (you have right of way)',
        ckb: 'ڕێگا سەرەکی خاوەن پێشینەیی (پێشینەیی هی تۆیە)',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تعني قف وأعطِ الأسبقية للمركبات ذات الأسبقية.',
      en: 'The sign means stop and give way to vehicles with priority.',
      ckb: 'بوەستە و ڕێگا بدە بەوانەی پێشینەییان هەیە.',
    },
  },
  {
    id: 'qp-stop-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٩' },
    image: require('@/assets/exam/pic-009.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'قف في التقاطع وإسمح لمرور المركبات ذات الأسبقية',
        en: 'Stop at the junction and give way to vehicles with priority',
        ckb: 'لە چوارڕیانەکە بوەستە و ڕێگا بدە بەو ئۆتۆمبێلانەی پێشینەییان هەیە',
      } },
      { id: 'b', text: {
        ar: 'إسمح بمرور المركبات التي أمامك',
        en: 'Give way to the vehicles in front of you',
        ckb: 'ڕێگا بدە بەو ئۆتۆمبێلانەی لە پێشتن',
      } },
      { id: 'c', text: {
        ar: 'قف للاشارة الضوئية الحمراء في الترفكلايت',
        en: 'Stop for the red traffic light',
        ckb: 'بۆ چرای سووری هاتوچۆ بوەستە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'علامة قف: تُلزم بالتوقف وإعطاء الأسبقية.',
      en: 'The stop sign requires you to stop and give way.',
      ckb: 'تابلۆی وەستان: دەبێت بوەستیت و پێشینەیی بدەیت.',
    },
  },
  {
    id: 'qp-two-directions-only-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠' },
    image: require('@/assets/exam/pic-010.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الطريق مغلق',
        en: 'The road is closed',
        ckb: 'ڕێگاکە داخراوە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بالمرور فقط لهذين الاتجاهين',
        en: 'Traffic is permitted only in these two directions',
        ckb: 'تەنها بەم دوو ئاراستەیە ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'الأستداره إلى جهة اليمين واليسار',
        en: 'Turn to the right and to the left',
        ckb: 'سووڕانەوە بۆ ڕاست و چەپ',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تسمح بالمرور في هذين الاتجاهين فقط.',
      en: 'The sign permits travel in those two directions only.',
      ckb: 'تەنها بەم دوو ئاراستەیە ڕێپێدراوە.',
    },
  },
  {
    id: 'qp-priority-picture-a',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١١' },
    image: require('@/assets/exam/pic-011.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردوو ئۆتۆمبێلەکە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة A بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle A has priority, per the official question guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Aیە.',
    },
  },
  {
    id: 'qp-general-danger-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٢' },
    image: require('@/assets/exam/pic-012.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر من الأبراج ذات الفولتية العالية',
        en: 'Beware of high-voltage pylons',
        ckb: 'ئاگاداری تاوەری کارەبای بەرزە بە',
      } },
      { id: 'b', text: {
        ar: 'إحذر أمامك طريق منزلق',
        en: 'Beware: slippery road ahead',
        ckb: 'ئاگاداربە، ڕێگای خلیسک لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'إحذر من مخاطر متنوعة',
        en: 'Beware of various hazards',
        ckb: 'ئاگاداری مەترسی جۆراوجۆر بە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'علامة تحذير عام من مخاطر متنوعة.',
      en: 'A general warning sign for various hazards.',
      ckb: 'تابلۆی ئاگادارکردنەوەی گشتی.',
    },
  },
  {
    id: 'qp-roundabout-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٣' },
    image: require('@/assets/exam/pic-013.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'قد بإتجاه عقارب الساعة',
        en: 'Drive clockwise',
        ckb: 'بە ئاراستەی میلی کاتژمێر بڕۆ',
      } },
      { id: 'b', text: {
        ar: 'اتجه الى الامام',
        en: 'Go straight ahead',
        ckb: 'بەرەو پێشەوە بڕۆ',
      } },
      { id: 'c', text: {
        ar: 'دخول الميدان قد باتجاه السهم للاستداره',
        en: 'Entering the roundabout: drive in the direction of the arrows',
        ckb: 'چوونە ناو خولانەوە، بە ئاراستەی تیرەکان بڕۆ',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تدل على ميدان دوار يُسار فيه باتجاه السهم.',
      en: 'The sign marks a roundabout to be driven in the arrows\' direction.',
      ckb: 'تابلۆی خولانەوە، بە ئاراستەی تیرەکان.',
    },
  },
  {
    id: 'qp-priority-picture-b',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٤' },
    image: require('@/assets/exam/pic-014.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردوو ئۆتۆمبێلەکە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official question guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-road-narrows-right-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٥' },
    image: require('@/assets/exam/pic-015.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر سيضيق الطريق من جهة اليمين',
        en: 'Beware: the road narrows on the right',
        ckb: 'ئاگاداربە، ڕێگاکە لە لای ڕاستەوە تەسک دەبێتەوە',
      } },
      { id: 'b', text: {
        ar: 'إحذر سيضيق الطريق من جهة اليسار',
        en: 'Beware: the road narrows on the left',
        ckb: 'ئاگاداربە، لە لای چەپەوە تەسک دەبێتەوە',
      } },
      { id: 'c', text: {
        ar: 'إحذر من الطريق ذو الإتجاهين',
        en: 'Beware of the two-way road',
        ckb: 'ئاگاداری ڕێگای دوو ئاراستە بە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحذر من ضيق الطريق من جهة اليمين.',
      en: 'The sign warns that the road narrows on the right.',
      ckb: 'ڕێگاکە لە لای ڕاستەوە تەسک دەبێتەوە.',
    },
  },
  {
    id: 'qp-u-turn-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٦' },
    image: require('@/assets/exam/pic-016.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الإستداره إلى اليمين',
        en: 'Turn to the right',
        ckb: 'سووڕانەوە بۆ ڕاست',
      } },
      { id: 'b', text: {
        ar: 'الإستداره إلى اليسار',
        en: 'Turn to the left',
        ckb: 'سووڕانەوە بۆ چەپ',
      } },
      { id: 'c', text: {
        ar: 'الإستداره إلى الطريق المعاكس',
        en: 'U-turn onto the opposite carriageway',
        ckb: 'سووڕانەوە بۆ ڕێگای بەرامبەر',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تدل على الاستدارة إلى الطريق المعاكس.',
      en: 'The sign indicates a U-turn onto the opposite carriageway.',
      ckb: 'سووڕانەوە بۆ ڕێگای بەرامبەر.',
    },
  },
  {
    id: 'qp-road-narrows-both-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٧' },
    image: require('@/assets/exam/pic-017.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر سيضيق الطريق من الجانبين',
        en: 'Beware: the road narrows on both sides',
        ckb: 'ئاگاداربە، ڕێگاکە لە هەردوو لاوە تەسک دەبێتەوە',
      } },
      { id: 'b', text: {
        ar: 'إحذر أمامك منطقة لعبور تلاميذ المدارس',
        en: 'Beware: a school-children crossing area ahead',
        ckb: 'ئاگاداربە، ناوچەی پەڕینەوەی قوتابیان لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'إحذر سيضيق الطريق من جهة اليمين',
        en: 'Beware: the road narrows on the right',
        ckb: 'ئاگاداربە، لە لای ڕاستەوە تەسک دەبێتەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحذر من ضيق الطريق من الجانبين.',
      en: 'The sign warns that the road narrows on both sides.',
      ckb: 'ڕێگاکە لە هەردوو لاوە تەسک دەبێتەوە.',
    },
  },
  {
    id: 'qp-double-continuous-lines',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٨' },
    image: require('@/assets/exam/pic-018.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الاجتياز ممنوع',
        en: 'Overtaking is prohibited',
        ckb: 'تێپەڕاندن قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'الاجتياز مسموح به',
        en: 'Overtaking is permitted',
        ckb: 'تێپەڕاندن ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'معبر للمشاة',
        en: 'A pedestrian crossing',
        ckb: 'پەڕینەوەی پیادە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخطان المتصلان يمنعان الاجتياز.',
      en: 'Double continuous lines prohibit overtaking.',
      ckb: 'دوو هێڵی بەردەوام تێپەڕاندن قەدەغە دەکەن.',
    },
  },
  {
    id: 'qp-merge-broken-lines-end',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٩' },
    image: require('@/assets/exam/pic-019.jpg'),
    prompt: {
      ar: 'في هذه الصورة لمن الاسبقية؟ عند إندماج مسارين بعدم إستمرار الخطوط المتقطعة',
      en: 'In this picture, who has right of way when two lanes merge and the broken lines do not continue?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە کاتێک دوو لاین تێکەڵ دەبن و هێڵە پچڕپچڕەکان بەردەوام نین؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردووکیان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة A بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle A has priority, per the official question guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Aیە.',
    },
  },
  {
    id: 'qp-road-narrows-left-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٠' },
    image: require('@/assets/exam/pic-020.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر سيضيق الطريق من الجانبين',
        en: 'Beware: the road narrows on both sides',
        ckb: 'ئاگاداربە، ڕێگاکە لە هەردوو لاوە تەسک دەبێتەوە',
      } },
      { id: 'b', text: {
        ar: 'إحذر سيضيق الطريق من جهة اليمين',
        en: 'Beware: the road narrows on the right',
        ckb: 'ئاگاداربە، لە لای ڕاستەوە تەسک دەبێتەوە',
      } },
      { id: 'c', text: {
        ar: 'إحذر سيضيق الطريق من جهة اليسار',
        en: 'Beware: the road narrows on the left',
        ckb: 'ئاگاداربە، لە لای چەپەوە تەسک دەبێتەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تحذر من ضيق الطريق من جهة اليسار.',
      en: 'The sign warns that the road narrows on the left.',
      ckb: 'ڕێگاکە لە لای چەپەوە تەسک دەبێتەوە.',
    },
  },
  {
    id: 'qp-broken-line-overtaking',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢١' },
    image: require('@/assets/exam/pic-021.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع القيام بمناورة الاجتياز من الجهة اليسرى',
        en: 'Overtaking on the left is prohibited',
        ckb: 'تێپەڕاندن لە لای چەپەوە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بالاجتياز عند الحاجة',
        en: 'Overtaking is permitted when needed',
        ckb: 'لە کاتی پێویستدا تێپەڕاندن ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يمنع القيام بمناورة الاجتياز',
        en: 'Overtaking manoeuvres are prohibited',
        ckb: 'تێپەڕاندن قەدەغەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الخط المتقطع يسمح بالاجتياز عند الحاجة.',
      en: 'A broken line permits overtaking when needed.',
      ckb: 'هێڵی پچڕپچڕ ڕێگا بە تێپەڕاندن دەدات.',
    },
  },
  {
    id: 'qp-falling-rocks-left-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٢' },
    image: require('@/assets/exam/pic-022.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر من تساقط الصخور من جهة اليسار',
        en: 'Beware of falling rocks from the left',
        ckb: 'ئاگاداری کەوتنی بەرد بە لە لای چەپەوە',
      } },
      { id: 'b', text: {
        ar: 'إحذر من تساقط الصخور من جهة اليمين',
        en: 'Beware of falling rocks from the right',
        ckb: 'ئاگاداری کەوتنی بەرد بە لە لای ڕاستەوە',
      } },
      { id: 'c', text: {
        ar: 'إحذر من تساقط الصخور من الجانبين',
        en: 'Beware of falling rocks from both sides',
        ckb: 'لە هەردوو لاوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحذر من تساقط الصخور من جهة اليسار.',
      en: 'The sign warns of rocks falling from the left.',
      ckb: 'ئاگادارکردنەوە لە کەوتنی بەرد لە لای چەپەوە.',
    },
  },
  {
    id: 'qp-continuous-and-broken-line',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٣' },
    image: require('@/assets/exam/pic-023.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع القيام بمناورة الاجتياز من الإتجاهين',
        en: 'Overtaking is prohibited in both directions',
        ckb: 'تێپەڕاندن لە هەردوو ئاراستە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يسمح القيام بمناورة الاجتياز للمركبات التي تسير في الجهة اليمنى من الطريق عند الحاجة ويمنع القيام بها للمركبات التي تسير في الإتجاه المقابل',
        en: 'Vehicles travelling on the right-hand side may overtake when needed, while vehicles travelling in the opposite direction may not',
        ckb: 'ئەو ئۆتۆمبێلانەی لە لای ڕاستەوە دەڕۆن لە کاتی پێویستدا دەتوانن تێبپەڕێنن، بەڵام ئەوانەی بەرامبەر نا',
      } },
      { id: 'c', text: {
        ar: 'مسموح القيام بمناورة الاجتياز للمركبات التي تسير في الجانب الايسر من الطريق',
        en: 'Vehicles travelling on the left-hand side of the road may overtake',
        ckb: 'ئەوانەی لە لای چەپەوە دەڕۆن دەتوانن تێبپەڕێنن',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الجانب ذو الخط المتقطع يسمح بالاجتياز، والجانب ذو الخط المتصل يمنعه.',
      en: 'The side with the broken line may overtake; the side with the continuous line may not.',
      ckb: 'لای هێڵی پچڕپچڕ دەتوانێت تێبپەڕێنێت، لای بەردەوام نا.',
    },
  },
  {
    id: 'qp-merge-broken-lines-continue',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ٢٤' },
    image: require('@/assets/exam/pic-024.jpg'),
    prompt: {
      ar: 'في هذه الصورة لمن الاسبقية عند اندماج مسارين باستمرار الخطوط المتقطعة؟',
      en: 'In this picture, who has right of way when two lanes merge and the broken lines continue?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە کاتێک دوو لاین تێکەڵ دەبن و هێڵە پچڕپچڕەکان بەردەوامن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردووکیان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official question guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-speed-hump-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٥' },
    image: require('@/assets/exam/pic-025.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر من مخاطر متنوعة',
        en: 'Beware of various hazards',
        ckb: 'ئاگاداری مەترسی جۆراوجۆر بە',
      } },
      { id: 'b', text: {
        ar: 'إحذر أمامك مطبات اصطناعية',
        en: 'Beware: artificial speed humps ahead',
        ckb: 'ئاگاداربە، قەڵشی دەستکرد لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'إحذر من العوائق',
        en: 'Beware of obstacles',
        ckb: 'ئاگاداری بەربەستەکان بە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من مطبات اصطناعية أمامك.',
      en: 'The sign warns of artificial speed humps ahead.',
      ckb: 'ئاگادارکردنەوە لە قەڵشی دەستکرد.',
    },
  },
  {
    id: 'qp-tunnel-ahead-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٦' },
    image: require('@/assets/exam/pic-026.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر أمامك نفق',
        en: 'Beware: a tunnel ahead',
        ckb: 'ئاگاداربە، تونێل لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'الدخول ممنوع',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'إحذر من الصخور المتساقطة',
        en: 'Beware of falling rocks',
        ckb: 'ئاگاداری بەردی کەوتوو بە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تنبه إلى وجود نفق أمامك.',
      en: 'The sign warns of a tunnel ahead.',
      ckb: 'ئاگادارکردنەوە لە تونێل.',
    },
  },
  {
    id: 'qp-level-crossing-100m-marker',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٧' },
    image: require('@/assets/exam/pic-027.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر أمامك خط سكة الحديد',
        en: 'Beware: a railway line ahead',
        ckb: 'ئاگاداربە، هێڵی شەمەندەفەر لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'توخى الحذر طول 100 متر',
        en: 'Take care for the next 100 metres',
        ckb: 'بۆ ماوەی ١٠٠ مەتر وریابە',
      } },
      { id: 'c', text: {
        ar: 'توخى الحذر بطول 200 متر',
        en: 'Take care for the next 200 metres',
        ckb: 'بۆ ماوەی ٢٠٠ مەتر وریابە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على توخي الحذر بطول 100 متر.',
      en: 'The marker means take care for 100 metres.',
      ckb: 'بۆ ماوەی ١٠٠ مەتر وریابە.',
    },
  },
  {
    id: 'qp-gap-between-parked-vehicles',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٢٨' },
    image: require('@/assets/exam/pic-028.jpg'),
    prompt: {
      ar: 'ما هي ادنى مسافة التي يجب أن تترك بين مركبة واخرى عند الوقوف؟',
      en: 'What is the minimum distance that must be left between one parked vehicle and another?',
      ckb: 'کەمترین ماوە کە دەبێت لە نێوان دوو ئۆتۆمبێلی وەستاودا بهێڵدرێتەوە:',
    },
    choices: [
      { id: 'a', text: {
        ar: '1متر',
        en: '1 metre',
        ckb: '١ مەتر',
      } },
      { id: 'b', text: {
        ar: '1/2متر',
        en: 'Half a metre',
        ckb: 'نیو مەتر',
      } },
      { id: 'c', text: {
        ar: '2متر',
        en: '2 metres',
        ckb: '٢ مەتر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'أدنى مسافة بين المركبتين عند الوقوف متر واحد.',
      en: 'The minimum gap between parked vehicles is one metre.',
      ckb: 'کەمترین ماوە یەک مەترە.',
    },
  },
  {
    id: 'qp-two-way-road-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٢٩' },
    image: require('@/assets/exam/pic-029.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر امامك تقاطع',
        en: 'Beware: a junction ahead',
        ckb: 'ئاگاداربە، چوارڕیان لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'احذر الطريق يضيق من اليمين واليسار',
        en: 'Beware: the road narrows on the right and left',
        ckb: 'ئاگاداربە، ڕێگاکە لە ڕاست و چەپەوە تەسک دەبێتەوە',
      } },
      { id: 'c', text: {
        ar: 'احذر الطريق ذو اتجاهين',
        en: 'Beware: two-way road',
        ckb: 'ئاگاداربە، ڕێگای دوو ئاراستە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تحذر من طريق ذي اتجاهين.',
      en: 'The sign warns of a two-way road.',
      ckb: 'ئاگادارکردنەوە لە ڕێگای دوو ئاراستە.',
    },
  },
  {
    id: 'qp-broken-line-left-side',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٠' },
    image: require('@/assets/exam/pic-030.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يسمح القيام بمناورة الاجتياز للمركبات التي تسير في الجهة اليسرى من الطريق',
        en: 'Vehicles travelling on the left-hand side of the road may overtake',
        ckb: 'ئەو ئۆتۆمبێلانەی لە لای چەپەوە دەڕۆن دەتوانن تێبپەڕێنن',
      } },
      { id: 'b', text: {
        ar: 'ممنوع القيام بمناورة الاجتياز من الإتجاهين',
        en: 'Overtaking is prohibited in both directions',
        ckb: 'تێپەڕاندن لە هەردوو ئاراستە قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'يسمح القيام بمناورة الاجتياز من الإتجاهين',
        en: 'Overtaking is permitted in both directions',
        ckb: 'لە هەردوو ئاراستە ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الجانب ذو الخط المتقطع (اليسرى هنا) يسمح بالاجتياز.',
      en: 'The side with the broken line may overtake.',
      ckb: 'لای هێڵی پچڕپچڕ دەتوانێت تێبپەڕێنێت.',
    },
  },
  {
    id: 'qp-radar-enforced-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣١' },
    image: require('@/assets/exam/pic-031.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر التصوير ممنوع',
        en: 'Beware: photography prohibited',
        ckb: 'ئاگاداربە، وێنەگرتن قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'إحذر من الرياح الجانبية',
        en: 'Beware of side winds',
        ckb: 'ئاگاداری بای لاتەنیشت بە',
      } },
      { id: 'c', text: {
        ar: 'إحذر الطريق مراقب بالرادار',
        en: 'Beware: the road is monitored by radar',
        ckb: 'ئاگاداربە، ڕێگاکە بە ڕادار چاودێری دەکرێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تنبه إلى أن الطريق مراقب بالرادار.',
      en: 'The sign warns that the road is radar-monitored.',
      ckb: 'ڕێگاکە بە ڕادار چاودێری دەکرێت.',
    },
  },
  {
    id: 'qp-bicycle-crossing-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٢' },
    image: require('@/assets/exam/pic-032.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع مرور الدراجات الهوائية',
        en: 'Bicycles prohibited',
        ckb: 'تێپەڕبوونی دووچەرخە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'طريق خاص بسير الدراجات الهوائية',
        en: 'A road reserved for bicycles',
        ckb: 'ڕێگای تایبەت بە دووچەرخە',
      } },
      { id: 'c', text: {
        ar: 'احذر عبور الدراجات الهوائية',
        en: 'Beware: bicycles crossing',
        ckb: 'ئاگاداربە، پەڕینەوەی دووچەرخە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تحذر من عبور الدراجات الهوائية.',
      en: 'The sign warns of bicycles crossing.',
      ckb: 'ئاگادارکردنەوە لە پەڕینەوەی دووچەرخە.',
    },
  },
  {
    id: 'qp-no-overtaking-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٣' },
    image: require('@/assets/exam/pic-033.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حافظ على مسافة مناسبة بين مركبتك والمركبة التي تتحرك أمامك',
        en: 'Keep a suitable distance from the vehicle moving ahead of you',
        ckb: 'ماوەی گونجاو بهێڵەوە لەگەڵ ئۆتۆمبێلی پێشەوە',
      } },
      { id: 'b', text: {
        ar: 'لك الأسبقية',
        en: 'You have right of way',
        ckb: 'پێشینەیی هی تۆیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع القيام بمناورة الاجتياز',
        en: 'Overtaking is prohibited',
        ckb: 'تێپەڕاندن قەدەغەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تمنع القيام بمناورة الاجتياز.',
      en: 'The sign prohibits overtaking.',
      ckb: 'تێپەڕاندن قەدەغەیە.',
    },
  },
  {
    id: 'qp-median-hatching-markings',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٤' },
    image: require('@/assets/exam/pic-034.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الإلتفاف ممنوع',
        en: 'Turning is prohibited',
        ckb: 'سووڕانەوە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'التجاوز ممنوع من كلا الإتجاهين ويمنع السير في الجزرة الوسطية على الخطوط',
        en: 'Overtaking is prohibited in both directions, and driving on the hatched central island is prohibited',
        ckb: 'تێپەڕاندن لە هەردوو ئاراستە قەدەغەیە و ڕۆیشتن لەسەر دوورگەی ناوەڕاست قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'منطقة عبور المشاة',
        en: 'A pedestrian crossing area',
        ckb: 'ناوچەی پەڕینەوەی پیادە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'يمنع التجاوز من كلا الاتجاهين ويمنع السير على الجزرة الوسطية.',
      en: 'Overtaking is prohibited both ways, as is driving on the hatched island.',
      ckb: 'تێپەڕاندن لە هەردوو لاوە قەدەغەیە.',
    },
  },
  {
    id: 'qp-parking-near-bus-stop',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٣٥' },
    image: require('@/assets/exam/pic-035.jpg'),
    prompt: {
      ar: 'ما هي المسافة المسموح بها لوقوف المركبات بالقرب من موقف الباصات؟',
      en: 'What distance is allowed for parking near a bus stop?',
      ckb: 'چ ماوەیەک ڕێپێدراوە بۆ وەستانی ئۆتۆمبێل لە نزیک وێستگەی پاس؟',
    },
    choices: [
      { id: 'a', text: {
        ar: '20م قبل و 10 بعد موقف الباص',
        en: '20 m before and 10 m after the bus stop',
        ckb: '٢٠ مەتر پێش و ١٠ مەتر دوای وێستگەکە',
      } },
      { id: 'b', text: {
        ar: 'ممكن التوقف في موقف الباصات لمدة 3 دقائق',
        en: 'You may stop at the bus stop for 3 minutes',
        ckb: 'دەکرێت بۆ ٣ خولەک لە وێستگەکەدا بوەستیت',
      } },
      { id: 'c', text: {
        ar: '15م قبل و 10 م بعد موقف الباص',
        en: '15 m before and 10 m after the bus stop',
        ckb: '١٥ مەتر پێش و ١٠ مەتر دوای وێستگەکە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'المسافة 20 م قبل الموقف و10 م بعده.',
      en: 'The distance is 20 m before and 10 m after the stop.',
      ckb: '٢٠ مەتر پێش و ١٠ مەتر دوای وێستگەکە.',
    },
  },
  {
    id: 'qp-end-no-overtaking-all',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٦' },
    image: require('@/assets/exam/pic-036.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نهاية حظر تجاوز كافة انواع المركبات',
        en: 'End of the overtaking ban for all types of vehicle',
        ckb: 'کۆتایی قەدەغەی تێپەڕاندن بۆ هەموو جۆرەکانی ئۆتۆمبێل',
      } },
      { id: 'b', text: {
        ar: 'نهاية حظر تجاوز للمركبات الصغيرة',
        en: 'End of the overtaking ban for small vehicles',
        ckb: 'کۆتایی قەدەغە بۆ ئۆتۆمبێلە بچووکەکان',
      } },
      { id: 'c', text: {
        ar: 'النهاية المحددة',
        en: 'The prescribed end',
        ckb: 'کۆتایی دیاریکراو',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تنهي حظر التجاوز لكافة أنواع المركبات.',
      en: 'The sign ends the overtaking ban for all vehicle types.',
      ckb: 'کۆتایی بە قەدەغەی تێپەڕاندن دەهێنێت بۆ هەموو جۆرەکان.',
    },
  },
  {
    id: 'qp-merge-start-median',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٧' },
    image: require('@/assets/exam/pic-037.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'بداية إندماج طريقين وحظر المرور في الجزره الوسطية',
        en: 'The start of two roads merging, with traffic prohibited on the central island',
        ckb: 'دەستپێکی تێکەڵبوونی دوو ڕێگا و قەدەغەی ڕۆیشتن لە دوورگەی ناوەڕاست',
      } },
      { id: 'b', text: {
        ar: 'منطقة عبور المشاة',
        en: 'A pedestrian crossing area',
        ckb: 'ناوچەی پەڕینەوەی پیادە',
      } },
      { id: 'c', text: {
        ar: 'الاجتياز ممنوع',
        en: 'Overtaking is prohibited',
        ckb: 'تێپەڕاندن قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تدل على بداية اندماج طريقين مع حظر المرور في الجزرة الوسطية.',
      en: 'It marks the start of a merge, with the central island closed to traffic.',
      ckb: 'دەستپێکی تێکەڵبوونی دوو ڕێگا.',
    },
  },
  {
    id: 'qp-no-overtaking-lorries',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٨' },
    image: require('@/assets/exam/pic-038.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع على الشاحنات القيام بمناورة الاجتياز',
        en: 'Lorries are prohibited from overtaking',
        ckb: 'بارهەڵگرەکان لە تێپەڕاندن قەدەغەن',
      } },
      { id: 'b', text: {
        ar: 'نهاية حظر تجاوز للشاحنات',
        en: 'End of the overtaking ban for lorries',
        ckb: 'کۆتایی قەدەغەی تێپەڕاندن بۆ بارهەڵگرەکان',
      } },
      { id: 'c', text: {
        ar: 'يمنع مرور المركبات التي تزيد طولها عن 10 أمتار',
        en: 'Vehicles longer than 10 metres are prohibited',
        ckb: 'ئۆتۆمبێلی درێژتر لە ١٠ مەتر قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع الشاحنات من الاجتياز.',
      en: 'The sign prohibits lorries from overtaking.',
      ckb: 'بارهەڵگرەکان ناتوانن تێبپەڕێنن.',
    },
  },
  {
    id: 'qp-merge-end-median',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٣٩' },
    image: require('@/assets/exam/pic-039.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this marking mean?',
      ckb: 'ئەم نیشانەیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'بداية إندماج طريقين وحظر المرور في الجزره الوسطية',
        en: 'The start of two roads merging, with traffic prohibited on the central island',
        ckb: 'دەستپێکی تێکەڵبوونی دوو ڕێگا',
      } },
      { id: 'b', text: {
        ar: 'نهاية إندماج طريقين وحظر المرور في الجزرة الوسطية',
        en: 'The end of two roads merging, with traffic prohibited on the central island',
        ckb: 'کۆتایی تێکەڵبوونی دوو ڕێگا و قەدەغەی ڕۆیشتن لە دوورگەی ناوەڕاست',
      } },
      { id: 'c', text: {
        ar: 'الاجتياز ممنوع',
        en: 'Overtaking is prohibited',
        ckb: 'تێپەڕاندن قەدەغەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تدل على نهاية اندماج طريقين مع حظر المرور في الجزرة الوسطية.',
      en: 'It marks the end of the merge, with the central island closed to traffic.',
      ckb: 'کۆتایی تێکەڵبوونی دوو ڕێگا.',
    },
  },
  {
    id: 'qp-end-no-overtaking-lorries',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٠' },
    image: require('@/assets/exam/pic-040.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع على الشاحنات القيام بمناورة الاجتياز',
        en: 'Lorries are prohibited from overtaking',
        ckb: 'بارهەڵگرەکان لە تێپەڕاندن قەدەغەن',
      } },
      { id: 'b', text: {
        ar: 'نهاية منع الشاحنات للقيام بمناورة الاجتياز',
        en: 'End of the ban on lorries overtaking',
        ckb: 'کۆتایی قەدەغەی تێپەڕاندن بۆ بارهەڵگرەکان',
      } },
      { id: 'c', text: {
        ar: 'نهاية حظر القيام بمناورة الاجتياز لكافة أنواع المركبات',
        en: 'End of the overtaking ban for all types of vehicle',
        ckb: 'کۆتایی قەدەغە بۆ هەموو جۆرەکان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تنهي منع الشاحنات من الاجتياز.',
      en: 'The sign ends the ban on lorries overtaking.',
      ckb: 'کۆتایی قەدەغەی تێپەڕاندنی بارهەڵگرەکان.',
    },
  },
  {
    id: 'qp-expressway-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤١' },
    image: require('@/assets/exam/pic-041.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الطريق السريع',
        en: 'Expressway',
        ckb: 'ڕێگای خێرا',
      } },
      { id: 'b', text: {
        ar: 'نهاية الطريق السريع',
        en: 'End of expressway',
        ckb: 'کۆتایی ڕێگای خێرا',
      } },
      { id: 'c', text: {
        ar: 'الطريق مسدود',
        en: 'Road closed',
        ckb: 'ڕێگا داخراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تدل على بداية الطريق السريع.',
      en: 'The sign marks the start of an expressway.',
      ckb: 'دەستپێکی ڕێگای خێرا.',
    },
  },
  {
    id: 'qp-parking-near-crossing',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٤٢' },
    image: require('@/assets/exam/pic-042.jpg'),
    prompt: {
      ar: 'ما هي المسافة المسموح بها لوقوف المركبات بالقرب من خطوط عبور المشاة؟',
      en: 'What distance is allowed for parking near a pedestrian crossing?',
      ckb: 'چ ماوەیەک ڕێپێدراوە بۆ وەستان لە نزیک هێڵەکانی پەڕینەوەی پیادە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: '20م قبل الخط و 10م بعد الخط',
        en: '20 m before the crossing and 10 m after it',
        ckb: '٢٠ مەتر پێش هێڵەکە و ١٠ مەتر دوای',
      } },
      { id: 'b', text: {
        ar: 'المسافة غير مهمة المهم عدم الوقوف على خطوط العبور المشاة',
        en: 'The distance does not matter; what matters is not parking on the crossing',
        ckb: 'ماوەکە گرنگ نییە، گرنگ ئەوەیە لەسەر هێڵەکان نەوەستیت',
      } },
      { id: 'c', text: {
        ar: '5م قبل خط العبور و 5 م بعده',
        en: '5 m before the crossing and 5 m after it',
        ckb: '٥ مەتر پێش و ٥ مەتر دوای',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'المسافة 20 م قبل الخط و10 م بعده.',
      en: 'The distance is 20 m before and 10 m after the crossing.',
      ckb: '٢٠ مەتر پێش و ١٠ مەتر دوای.',
    },
  },
  {
    id: 'qp-end-expressway-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٣' },
    image: require('@/assets/exam/pic-043.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الطريق مسدود',
        en: 'Road closed',
        ckb: 'ڕێگا داخراوە',
      } },
      { id: 'b', text: {
        ar: 'نهاية الطريق السريع',
        en: 'End of expressway',
        ckb: 'کۆتایی ڕێگای خێرا',
      } },
      { id: 'c', text: {
        ar: 'الطريق السريع',
        en: 'Expressway',
        ckb: 'ڕێگای خێرا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على نهاية الطريق السريع.',
      en: 'The sign marks the end of the expressway.',
      ckb: 'کۆتایی ڕێگای خێرا.',
    },
  },
  {
    id: 'qp-no-cars-motorcycles-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٤' },
    image: require('@/assets/exam/pic-044.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع مرور كافة أنواع المركبات',
        en: 'All types of vehicle are prohibited',
        ckb: 'هەموو جۆرەکانی ئۆتۆمبێل قەدەغەن',
      } },
      { id: 'b', text: {
        ar: 'ممنوع مرور المركبات الصغيرة والدراجات النارية',
        en: 'Small vehicles and motorcycles are prohibited',
        ckb: 'ئۆتۆمبێلە بچووکەکان و ماتۆڕسکیل قەدەغەن',
      } },
      { id: 'c', text: {
        ar: 'يسمح بمرور المركبات الصغيرة والدراجات النارية',
        en: 'Small vehicles and motorcycles are permitted',
        ckb: 'ڕێپێدراون',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تمنع مرور المركبات الصغيرة والدراجات النارية.',
      en: 'The sign prohibits small vehicles and motorcycles.',
      ckb: 'ئۆتۆمبێلە بچووکەکان و ماتۆڕسکیل قەدەغەن.',
    },
  },
  {
    id: 'qp-parking-place-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٥' },
    image: require('@/assets/exam/pic-045.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'محطة وقود',
        en: 'A filling station',
        ckb: 'بۆریگەی سووتەمەنی',
      } },
      { id: 'b', text: {
        ar: 'مركز تصليح',
        en: 'A repair centre',
        ckb: 'ناوەندی چاککردنەوە',
      } },
      { id: 'c', text: {
        ar: 'مكان لوقوف المركبات',
        en: 'A parking place for vehicles',
        ckb: 'شوێنی وەستانی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تدل على مكان لوقوف المركبات.',
      en: 'The sign indicates a parking place.',
      ckb: 'شوێنی وەستانی ئۆتۆمبێل.',
    },
  },
  {
    id: 'qp-warning-triangle-distance',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٤٦' },
    image: require('@/assets/exam/pic-046.jpg'),
    prompt: {
      ar: 'على أي بعد يتم تثبيت إشارة الفسفور المثلث في حالة تعطل المركبة؟',
      en: 'At what distance is the reflective triangle placed when the vehicle breaks down?',
      ckb: 'لە چ دوورییەکدا سێگۆشەی فۆسفۆری دادەنرێت کاتێک ئۆتۆمبێل تێکدەچێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: '100متر عن المركبة داخل المدينة',
        en: '100 metres from the vehicle inside the city',
        ckb: '١٠٠ مەتر لە ئۆتۆمبێلەکەوە لە ناو شار',
      } },
      { id: 'b', text: {
        ar: '50متراً داخل المدينة و 100 - 150 متراً وفقاً للسرعة المحددة للطريق',
        en: '50 metres inside the city, and 100–150 metres according to the road\'s speed limit',
        ckb: '٥٠ مەتر لە ناو شار و ١٠٠–١٥٠ مەتر بەپێی خێرایی دیاریکراوی ڕێگاکە',
      } },
      { id: 'c', text: {
        ar: 'ليس من الضروري وضع الإشارة',
        en: 'There is no need to put out the sign',
        ckb: 'پێویست ناکات دابنرێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: '50 م داخل المدينة و100-150 م خارجها وفقاً لسرعة الطريق.',
      en: '50 m inside the city, 100–150 m outside according to the road\'s speed.',
      ckb: '٥٠ مەتر لە ناو شار و ١٠٠–١٥٠ مەتر لە دەرەوە.',
    },
  },
  {
    id: 'qp-hospital-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٧' },
    image: require('@/assets/exam/pic-047.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مستشفى',
        en: 'A hospital',
        ckb: 'نەخۆشخانە',
      } },
      { id: 'b', text: {
        ar: 'فندق',
        en: 'A hotel',
        ckb: 'هوتێل',
      } },
      { id: 'c', text: {
        ar: 'مطعم',
        en: 'A restaurant',
        ckb: 'چێشتخانە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تدل على مستشفى.',
      en: 'The sign indicates a hospital.',
      ckb: 'نەخۆشخانە.',
    },
  },
  {
    id: 'qp-no-entry-both-directions',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٨' },
    image: require('@/assets/exam/pic-048.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع المرور في الاتجاهين',
        en: 'Traffic is prohibited in both directions',
        ckb: 'ڕۆیشتن لە هەردوو ئاراستە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'أمامك نقطة جمركية توقف',
        en: 'A customs point ahead, so stop',
        ckb: 'خاڵی گومرگی لە پێشتە، بوەستە',
      } },
      { id: 'c', text: {
        ar: 'الوقوف ممنوع',
        en: 'No parking',
        ckb: 'وەستان قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع المرور في الاتجاهين.',
      en: 'The sign prohibits traffic in both directions.',
      ckb: 'ڕۆیشتن لە هەردوو ئاراستە قەدەغەیە.',
    },
  },
  {
    id: 'qp-dead-end-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٤٩' },
    image: require('@/assets/exam/pic-049.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'طريق ذو إتجاه واحد',
        en: 'A one-way road',
        ckb: 'ڕێگای یەک ئاراستە',
      } },
      { id: 'b', text: {
        ar: 'الطريق مسدود',
        en: 'A dead end',
        ckb: 'ڕێگا داخراوە',
      } },
      { id: 'c', text: {
        ar: 'نهاية الطريق السريع',
        en: 'End of expressway',
        ckb: 'کۆتایی ڕێگای خێرا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على طريق مسدود.',
      en: 'The sign indicates a dead end.',
      ckb: 'ڕێگا داخراوە.',
    },
  },
  {
    id: 'qp-pedestrian-crossing-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٠' },
    image: require('@/assets/exam/pic-050.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'منطقة عبور المشاة',
        en: 'A pedestrian crossing area',
        ckb: 'ناوچەی پەڕینەوەی پیادە',
      } },
      { id: 'b', text: {
        ar: 'منطقة وقوف ذوي الإحتياجات الخاصة',
        en: 'A parking area for people with disabilities',
        ckb: 'شوێنی وەستانی خاوەن پێداویستی تایبەت',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك مدرسة',
        en: 'Beware: a school ahead',
        ckb: 'ئاگاداربە، قوتابخانە لە پێشتە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تدل على منطقة عبور المشاة.',
      en: 'The sign marks a pedestrian crossing area.',
      ckb: 'ناوچەی پەڕینەوەی پیادە.',
    },
  },
  {
    id: 'qp-speed-limit-100-80-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥١' },
    image: require('@/assets/exam/pic-051.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'أقصى سرعة مسموح بها للمركبات الصغيرة 100كم و للشاحنات 80كم',
        en: 'The maximum speed is 100 km/h for small vehicles and 80 km/h for lorries',
        ckb: 'بەرزترین خێرایی ١٠٠ کم بۆ ئۆتۆمبێلی بچووک و ٨٠ کم بۆ بارهەڵگر',
      } },
      { id: 'b', text: {
        ar: 'أقصى سرعة مسموح بها للمركبات الصغيرة 80كم وللشاحنات 60كم',
        en: 'The maximum speed is 80 km/h for small vehicles and 60 km/h for lorries',
        ckb: '٨٠ کم بۆ بچووکەکان و ٦٠ کم بۆ بارهەڵگر',
      } },
      { id: 'c', text: {
        ar: 'أقصى المستويات المحددة للسرعة',
        en: 'The highest prescribed speed levels',
        ckb: 'بەرزترین ئاستە دیاریکراوەکانی خێرایی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: '100 كم/ساعة للمركبات الصغيرة و80 كم/ساعة للشاحنات.',
      en: '100 km/h for small vehicles, 80 km/h for lorries.',
      ckb: '١٠٠ کم بۆ بچووکەکان و ٨٠ کم بۆ بارهەڵگر.',
    },
  },
  {
    id: 'qp-private-licence-double-cab',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ٥٢' },
    image: require('@/assets/exam/pic-052.jpg'),
    prompt: {
      ar: 'هل يمكن لحامل اجازة المركبة الخصوصية قيادة مركبة من نوع بيك آب دبل قمارة؟',
      en: 'May the holder of a private-vehicle licence drive a double-cab pick-up?',
      ckb: 'ئایا خاوەنی مۆڵەتی ئۆتۆمبێلی تایبەت دەتوانێت پیکئەپی دوو قەمارە لێبخوڕێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يمكن، بشرط عدم إستخدام المركبة للأجرة وأن يكتب عليها "نقل خاص"',
        en: 'Yes, provided the vehicle is not used for hire and is marked "private transport"',
        ckb: 'بەڵێ، بەمەرجێک بۆ کرێ بەکارنەهێنرێت و لەسەری بنووسرێت "گواستنەوەی تایبەت"',
      } },
      { id: 'b', text: {
        ar: 'كلا، اجازة المركبات الخصوصية محددة للمركبات الخصوصية فقط',
        en: 'No, a private licence covers private vehicles only',
        ckb: 'نەخێر، تەنها بۆ ئۆتۆمبێلی تایبەتە',
      } },
      { id: 'c', text: {
        ar: 'نعم وبدون شروط',
        en: 'Yes, with no conditions',
        ckb: 'بەڵێ بەبێ هیچ مەرجێک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجوز بشرط عدم استخدامها للأجرة وكتابة "نقل خاص" عليها.',
      en: 'Permitted provided it is not used for hire and is marked as private transport.',
      ckb: 'ڕێپێدراوە بەو مەرجەی بۆ کرێ نەبێت.',
    },
  },
  {
    id: 'qp-weighbridge-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٣' },
    image: require('@/assets/exam/pic-053.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'منطقة عبور المشاة',
        en: 'A pedestrian crossing area',
        ckb: 'ناوچەی پەڕینەوەی پیادە',
      } },
      { id: 'b', text: {
        ar: 'منطقة وزن الشاحنات الكبيرة',
        en: 'A weighing area for large lorries',
        ckb: 'ناوچەی کێشانی بارهەڵگرە گەورەکان',
      } },
      { id: 'c', text: {
        ar: 'مستشفى',
        en: 'A hospital',
        ckb: 'نەخۆشخانە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على منطقة وزن الشاحنات الكبيرة.',
      en: 'The sign marks a weighbridge for large lorries.',
      ckb: 'ناوچەی کێشانی بارهەڵگرە گەورەکان.',
    },
  },
  {
    id: 'qp-no-stopping-waiting-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٤' },
    image: require('@/assets/exam/pic-054.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الوقوف لمدة تزيد عن 5 دقائق',
        en: 'No stopping for more than 5 minutes',
        ckb: 'وەستان زیاتر لە ٥ خولەک قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الوقوف والإنتظار',
        en: 'No stopping and no waiting',
        ckb: 'وەستان و چاوەڕوانی قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع الدخول',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تمنع الوقوف والانتظار.',
      en: 'The sign prohibits both stopping and waiting.',
      ckb: 'وەستان و چاوەڕوانی قەدەغەیە.',
    },
  },
  {
    id: 'qp-disabled-parking-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٥' },
    image: require('@/assets/exam/pic-055.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'منطقة وقوف ذوي الإحتياجات الخاصة',
        en: 'A parking area for people with disabilities',
        ckb: 'شوێنی وەستانی خاوەن پێداویستی تایبەت',
      } },
      { id: 'b', text: {
        ar: 'مستشفى',
        en: 'A hospital',
        ckb: 'نەخۆشخانە',
      } },
      { id: 'c', text: {
        ar: 'منطقة عبور المشاة',
        en: 'A pedestrian crossing area',
        ckb: 'ناوچەی پەڕینەوەی پیادە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تدل على منطقة وقوف لذوي الاحتياجات الخاصة.',
      en: 'The sign marks disabled parking.',
      ckb: 'شوێنی وەستانی خاوەن پێداویستی تایبەت.',
    },
  },
  {
    id: 'qp-taxi-rank-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٦' },
    image: require('@/assets/exam/pic-056.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'منطقة وقوف الحافلات',
        en: 'A bus parking area',
        ckb: 'شوێنی وەستانی پاس',
      } },
      { id: 'b', text: {
        ar: 'منطقة وقوف المركبات الخاصة والأجرة',
        en: 'A parking area for private and hire vehicles',
        ckb: 'شوێنی وەستانی ئۆتۆمبێلی تایبەت و کرێ',
      } },
      { id: 'c', text: {
        ar: 'منطقة وقوف مركبات الأجرة',
        en: 'A taxi rank',
        ckb: 'شوێنی وەستانی تاکسی',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تدل على منطقة وقوف مركبات الأجرة.',
      en: 'The sign marks a taxi rank.',
      ckb: 'شوێنی وەستانی تاکسی.',
    },
  },
  {
    id: 'qp-covering-plate-or-glass',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ٥٧' },
    image: require('@/assets/exam/pic-057.jpg'),
    prompt: {
      ar: 'هل يسمح بتغطية لوحة المركبة أو الزجاج بالأعلام أو الصور؟',
      en: 'May the vehicle\'s plate or glass be covered with flags or pictures?',
      ckb: 'ئایا ڕێپێدراوە پلێت یان شووشەی ئۆتۆمبێل بە ئاڵا یان وێنە داپۆشرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يسمح شرط أن يكون العلم علم كوردستان',
        en: 'Yes, provided the flag is the Kurdistan flag',
        ckb: 'بەڵێ، بەمەرجێک ئاڵای کوردستان بێت',
      } },
      { id: 'b', text: {
        ar: 'تغطية النوافذ ممنوع فقط',
        en: 'Only covering the windows is prohibited',
        ckb: 'تەنها داپۆشینی پەنجەرەکان قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'كلا ممنوع، لا يسمح بأي شكل من الاشكال تغطية لوحة المركبة أو النوافذ',
        en: 'No, covering the plate or the windows is prohibited in any form',
        ckb: 'نەخێر قەدەغەیە، بە هیچ شێوەیەک ڕێپێدراو نییە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'لا يجوز تغطية لوحة المركبة أو النوافذ بأي شكل.',
      en: 'Covering the plate or windows is prohibited in any form.',
      ckb: 'بە هیچ شێوەیەک ڕێپێدراو نییە.',
    },
  },
  {
    id: 'qp-no-waiting-over-5-min-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٨' },
    image: require('@/assets/exam/pic-058.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الوقوف لمدة تزيد عن 5 دقائق',
        en: 'No stopping for more than 5 minutes',
        ckb: 'وەستان زیاتر لە ٥ خولەک قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الوقوف والإنتظار',
        en: 'No stopping and no waiting',
        ckb: 'وەستان و چاوەڕوانی قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع الدخول',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع الوقوف لمدة تزيد عن 5 دقائق.',
      en: 'The sign prohibits stopping for more than 5 minutes.',
      ckb: 'وەستان زیاتر لە ٥ خولەک قەدەغەیە.',
    },
  },
  {
    id: 'qp-low-flying-aircraft-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٥٩' },
    image: require('@/assets/exam/pic-059.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر امامك خط سكة القطار',
        en: 'Beware: a railway line ahead',
        ckb: 'ئاگاداربە، هێڵی شەمەندەفەر لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'إحذر من الطيران المنخفض للطائرات في هذه المنطقة',
        en: 'Beware of low-flying aircraft in this area',
        ckb: 'ئاگاداری فڕینی نزمی فڕۆکە بە لەم ناوچەیەدا',
      } },
      { id: 'c', text: {
        ar: 'إحذر من عبور الحيوانات البرية',
        en: 'Beware of wild animals crossing',
        ckb: 'ئاگاداری پەڕینەوەی ئاژەڵی کێوی بە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من الطيران المنخفض للطائرات في المنطقة.',
      en: 'The sign warns of low-flying aircraft.',
      ckb: 'ئاگادارکردنەوە لە فڕینی نزمی فڕۆکە.',
    },
  },
  {
    id: 'qp-no-left-turn-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٠' },
    image: require('@/assets/exam/pic-060.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الإستداره إلى جهة اليمين',
        en: 'No turning to the right',
        ckb: 'سووڕانەوە بۆ ڕاست قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الدخول',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع الإستداره إلى جهة اليسار',
        en: 'No turning to the left',
        ckb: 'سووڕانەوە بۆ چەپ قەدەغەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تمنع الاستدارة إلى جهة اليسار.',
      en: 'The sign prohibits turning left.',
      ckb: 'سووڕانەوە بۆ چەپ قەدەغەیە.',
    },
  },
  {
    id: 'qp-bridge-ahead-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦١' },
    image: require('@/assets/exam/pic-061.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر أمامك جسر',
        en: 'Beware: a bridge ahead',
        ckb: 'ئاگاداربە، پرد لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الوقوف',
        en: 'No parking',
        ckb: 'وەستان قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'احذر سيضيق الطريق من الجانبين',
        en: 'Beware: the road narrows on both sides',
        ckb: 'ئاگاداربە، ڕێگاکە لە هەردوو لاوە تەسک دەبێتەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تنبه إلى وجود جسر أمامك.',
      en: 'The sign warns of a bridge ahead.',
      ckb: 'ئاگادارکردنەوە لە پرد.',
    },
  },
  {
    id: 'qp-who-may-stop-for-inspection',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٦٢' },
    image: require('@/assets/exam/pic-062.jpg'),
    prompt: {
      ar: 'وفقاً للقانون من يحق له إيقاف المركبات لفحص شروط المتانة والامان؟',
      en: 'Under the law, who may stop vehicles to check that they meet the soundness and safety requirements?',
      ckb: 'بەپێی یاسا کێ بۆی هەیە ئۆتۆمبێل بوەستێنێت بۆ پشکنینی مەرجەکانی سەلامەتی؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'رجل المرور',
        en: 'The traffic officer',
        ckb: 'پۆلیسی هاتوچۆ',
      } },
      { id: 'b', text: {
        ar: 'مفوض المرور',
        en: 'The traffic commissioner',
        ckb: 'مفەوزی هاتوچۆ',
      } },
      { id: 'c', text: {
        ar: 'ضابط المرور',
        en: 'The traffic superintendent',
        ckb: 'ئەفسەری هاتوچۆ',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'رجل المرور هو من يحق له إيقاف المركبات للفحص.',
      en: 'The traffic officer is the one entitled to stop vehicles for inspection.',
      ckb: 'پۆلیسی هاتوچۆ بۆی هەیە.',
    },
  },
  {
    id: 'qp-no-right-turn-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٣' },
    image: require('@/assets/exam/pic-063.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الإستداره إلى الاتجاه المعاكس',
        en: 'No U-turn onto the opposite carriageway',
        ckb: 'سووڕانەوە بۆ ئاراستەی بەرامبەر قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الإستداره إلى جهة اليمين',
        en: 'No turning to the right',
        ckb: 'سووڕانەوە بۆ ڕاست قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع الإستداره إلى جهة اليسار',
        en: 'No turning to the left',
        ckb: 'سووڕانەوە بۆ چەپ قەدەغەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تمنع الاستدارة إلى جهة اليمين.',
      en: 'The sign prohibits turning right.',
      ckb: 'سووڕانەوە بۆ ڕاست قەدەغەیە.',
    },
  },
  {
    id: 'qp-no-u-turn-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٤' },
    image: require('@/assets/exam/pic-064.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الإستداره',
        en: 'No U-turn',
        ckb: 'سووڕانەوە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع الوقوف',
        en: 'No parking',
        ckb: 'وەستان قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع الدخول',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع الاستدارة.',
      en: 'The sign prohibits a U-turn.',
      ckb: 'سووڕانەوە قەدەغەیە.',
    },
  },
  {
    id: 'qp-weight-limit-10t-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٥' },
    image: require('@/assets/exam/pic-065.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع مرور المركبات التي يزيد طولها عن 10 أمتار',
        en: 'Vehicles longer than 10 metres are prohibited',
        ckb: 'ئۆتۆمبێلی درێژتر لە ١٠ مەتر قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بمرور المركبات التي يزيد طولها عن 10 أمتار',
        en: 'Vehicles longer than 10 metres are permitted',
        ckb: 'ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يمنع مرور المركبات التي تزيد وزن حمولتها عن 10 أطنان',
        en: 'Vehicles with a load weighing more than 10 tonnes are prohibited',
        ckb: 'ئۆتۆمبێلی خاوەن باری قورستر لە ١٠ تەن قەدەغەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تمنع المركبات التي تزيد حمولتها عن 10 أطنان.',
      en: 'The sign prohibits vehicles loaded above 10 tonnes.',
      ckb: 'باری قورستر لە ١٠ تەن قەدەغەیە.',
    },
  },
  {
    id: 'qp-width-limit-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٦' },
    image: require('@/assets/exam/pic-066.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع مرور المركبات التي تزيد إرتفاعها عن 2.5 متر',
        en: 'Vehicles taller than 2.5 metres are prohibited',
        ckb: 'ئۆتۆمبێلی بەرزتر لە ٢٫٥ مەتر قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يمنع مرور المركبات التي تزيد عرضها عن 2.5 متر',
        en: 'Vehicles wider than 2.5 metres are prohibited',
        ckb: 'ئۆتۆمبێلی پانتر لە ٢٫٥ مەتر قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'يمنع مرور المركبات التي تزيد طولها عن 2.5 متر',
        en: 'Vehicles longer than 2.5 metres are prohibited',
        ckb: 'ئۆتۆمبێلی درێژتر لە ٢٫٥ مەتر قەدەغەیە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تمنع المركبات التي يزيد عرضها عن 2.5 متر.',
      en: 'The sign prohibits vehicles wider than 2.5 m.',
      ckb: 'پانتر لە ٢٫٥ مەتر قەدەغەیە.',
    },
  },
  {
    id: 'qp-driving-without-licence-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٦٧' },
    image: require('@/assets/exam/pic-067.jpg'),
    prompt: {
      ar: 'يعاقب السائق الذي لا يملك رخصة القيادة بـ؟',
      en: 'A driver who holds no driving licence is punished by:',
      ckb: 'ئەو شۆفێرەی مۆڵەتی لێخوڕینی نییە سزا دەدرێت بە:',
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
        ar: 'الحبس والغرامة',
        en: 'Imprisonment and a fine',
        ckb: 'زیندان و غەرامە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'عقوبة القيادة بلا رخصة هي الحبس بحسب دليل الأسئلة الرسمي.',
      en: 'The official guide gives imprisonment as the penalty for driving unlicensed.',
      ckb: 'بەپێی ڕێنمایی فەرمی، سزاکە زیندانە.',
    },
  },
  {
    id: 'qp-height-limit-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٨' },
    image: require('@/assets/exam/pic-068.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يمنع مرور المركبات التي تزيد إرتفاعها عن 3.5 متر',
        en: 'Vehicles taller than 3.5 metres are prohibited',
        ckb: 'ئۆتۆمبێلی بەرزتر لە ٣٫٥ مەتر قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بمرور المركبات التي تزيد إرتفاعها عن 3.5 متر',
        en: 'Vehicles taller than 3.5 metres are permitted',
        ckb: 'ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يمنع مرور الشاحنات',
        en: 'Lorries are prohibited',
        ckb: 'بارهەڵگر قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع المركبات التي يزيد ارتفاعها عن 3.5 متر.',
      en: 'The sign prohibits vehicles taller than 3.5 m.',
      ckb: 'بەرزتر لە ٣٫٥ مەتر قەدەغەیە.',
    },
  },
  {
    id: 'qp-no-horn-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٦٩' },
    image: require('@/assets/exam/pic-069.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نهاية حظر إستخدام بوق التنبيه',
        en: 'End of the ban on using the horn',
        ckb: 'کۆتایی قەدەغەی بەکارهێنانی بۆری',
      } },
      { id: 'b', text: {
        ar: 'إستخدام بوق التنبيه ممنوع',
        en: 'Using the horn is prohibited',
        ckb: 'بەکارهێنانی بۆری قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'يسمح باستخدام بوق التنبيه',
        en: 'Using the horn is permitted',
        ckb: 'ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تمنع استخدام بوق التنبيه.',
      en: 'The sign prohibits use of the horn.',
      ckb: 'بەکارهێنانی بۆری قەدەغەیە.',
    },
  },
  {
    id: 'qp-driving-under-influence-nature',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٧٠' },
    image: require('@/assets/exam/pic-070.jpg'),
    prompt: {
      ar: 'تعتبر السياقة تحت تأثير المسكرات والمخدرات؟',
      en: 'Driving under the influence of alcohol or drugs is considered:',
      ckb: 'لێخوڕین لەژێر کاریگەری کحول و ماددەی هۆشبەردا بە چی دادەنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'جريمه و خطيرة',
        en: 'A crime, and dangerous',
        ckb: 'تاوان و مەترسیدار',
      } },
      { id: 'b', text: {
        ar: 'خطرة',
        en: 'Dangerous',
        ckb: 'مەترسیدار',
      } },
      { id: 'c', text: {
        ar: 'طبيعية',
        en: 'Normal',
        ckb: 'ئاسایی',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'السياقة تحت تأثير المسكرات والمخدرات جريمة وخطيرة.',
      en: 'Driving under the influence is a crime and dangerous.',
      ckb: 'تاوان و مەترسیدارە.',
    },
  },
  {
    id: 'qp-no-photography-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧١' },
    image: require('@/assets/exam/pic-071.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التصوير ممنوع',
        en: 'Photography is prohibited',
        ckb: 'وێنەگرتن قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بالتصوير',
        en: 'Photography is permitted',
        ckb: 'وێنەگرتن ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'يسمح للسياح بالتصوير',
        en: 'Tourists may take photographs',
        ckb: 'بۆ گەشتیاران ڕێپێدراوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع التصوير.',
      en: 'The sign prohibits photography.',
      ckb: 'وێنەگرتن قەدەغەیە.',
    },
  },
  {
    id: 'qp-priority-road-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧٢' },
    image: require('@/assets/exam/pic-072.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الطريق الرئيسي لأسبقية المرور (الأسبقية ليست لك)',
        en: 'Main road with priority (you do not have right of way)',
        ckb: 'ڕێگا سەرەکی خاوەن پێشینەیی (پێشینەیی هی تۆ نییە)',
      } },
      { id: 'b', text: {
        ar: 'نهاية طريق أسبقية المرور (نهاية الأسبقية)',
        en: 'End of the priority road (end of priority)',
        ckb: 'کۆتایی ڕێگای پێشینەیی',
      } },
      { id: 'c', text: {
        ar: 'الطريق الرئيسي لأسبقية المرور (لك الأسبقية)',
        en: 'Main road with priority (you have right of way)',
        ckb: 'ڕێگا سەرەکی خاوەن پێشینەیی (پێشینەیی هی تۆیە)',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تدل على الطريق الرئيسي وأن لك الأسبقية.',
      en: 'The sign marks the priority road, so you have right of way.',
      ckb: 'ڕێگا سەرەکی و پێشینەیی هی تۆیە.',
    },
  },
  {
    id: 'qp-winding-road-right-first',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧٣' },
    image: require('@/assets/exam/pic-073.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر أمامك طريق ذو التفافات الأول نحو اليمين',
        en: 'Beware: a winding road ahead, the first bend to the right',
        ckb: 'ئاگاداربە، ڕێگای خواروخێچ، یەکەم سووڕانەوە بۆ ڕاست',
      } },
      { id: 'b', text: {
        ar: 'احذر أمامك طريق ذو التفافات الأول نحو اليسار',
        en: 'Beware: a winding road ahead, the first bend to the left',
        ckb: 'یەکەم سووڕانەوە بۆ چەپ',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك التفافات لكلا الجانبين',
        en: 'Beware: bends to both sides ahead',
        ckb: 'سووڕانەوە بۆ هەردوو لا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحذر من طريق ملتوٍ أول التفافاته نحو اليمين.',
      en: 'The sign warns of a winding road with the first bend to the right.',
      ckb: 'یەکەم سووڕانەوە بۆ ڕاستە.',
    },
  },
  {
    id: 'qp-parked-on-crossing',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٧٤' },
    image: require('@/assets/exam/pic-074.jpg'),
    prompt: {
      ar: 'في هذه الصورة المركبة البيضاء مركونة هنا هل يجوز ذلك؟',
      en: 'In this picture the white vehicle is parked here. Is that allowed?',
      ckb: 'لەم وێنەیەدا ئۆتۆمبێلە سپییەکە لێرە وەستاوە، ئایا ڕێپێدراوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع الوقوف هنا',
        en: 'Parking here is prohibited',
        ckb: 'وەستان لێرە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'يسمح بالوقوف هنا',
        en: 'Parking here is permitted',
        ckb: 'وەستان لێرە ڕێپێدراوە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع عبور المشاة',
        en: 'Pedestrian crossing is prohibited',
        ckb: 'پەڕینەوەی پیادە قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الوقوف على ممر عبور المشاة ممنوع.',
      en: 'Parking on the pedestrian crossing is prohibited.',
      ckb: 'وەستان لەسەر پەڕینەوەی پیادە قەدەغەیە.',
    },
  },
  {
    id: 'qp-winding-road-left-first',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧٥' },
    image: require('@/assets/exam/pic-075.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر أمامك طريق ذو التفافات الأول نحو اليسار',
        en: 'Beware: a winding road ahead, the first bend to the left',
        ckb: 'ئاگاداربە، یەکەم سووڕانەوە بۆ چەپ',
      } },
      { id: 'b', text: {
        ar: 'احذر أمامك طريق ذو التفافات الأول نحو اليمين',
        en: 'Beware: a winding road ahead, the first bend to the right',
        ckb: 'یەکەم سووڕانەوە بۆ ڕاست',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك طريق ذو التفافات لكلا الجانبين',
        en: 'Beware: a winding road with bends to both sides',
        ckb: 'سووڕانەوە بۆ هەردوو لا',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تحذر من طريق ملتوٍ أول التفافاته نحو اليسار.',
      en: 'The sign warns of a winding road with the first bend to the left.',
      ckb: 'یەکەم سووڕانەوە بۆ چەپە.',
    },
  },
  {
    id: 'qp-fuel-station-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧٦' },
    image: require('@/assets/exam/pic-076.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ورشة تصليح',
        en: 'A repair workshop',
        ckb: 'کارگەی چاککردنەوە',
      } },
      { id: 'b', text: {
        ar: 'محطة وقود',
        en: 'A filling station',
        ckb: 'بۆریگەی سووتەمەنی',
      } },
      { id: 'c', text: {
        ar: 'مكان لوقوف المركبات',
        en: 'A parking place for vehicles',
        ckb: 'شوێنی وەستانی ئۆتۆمبێل',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على محطة وقود.',
      en: 'The sign indicates a filling station.',
      ckb: 'بۆریگەی سووتەمەنی.',
    },
  },
  {
    id: 'qp-straight-ahead-only-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧٧' },
    image: require('@/assets/exam/pic-077.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الأسبقية لك',
        en: 'You have right of way',
        ckb: 'پێشینەیی هی تۆیە',
      } },
      { id: 'b', text: {
        ar: 'الأسبقية ليست لك',
        en: 'You do not have right of way',
        ckb: 'پێشینەیی هی تۆ نییە',
      } },
      { id: 'c', text: {
        ar: 'يجب السير فقط إلى الأمام',
        en: 'You must proceed straight ahead only',
        ckb: 'تەنها دەبێت بەرەو پێشەوە بڕۆیت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تلزم بالسير إلى الأمام فقط.',
      en: 'The sign requires proceeding straight ahead only.',
      ckb: 'تەنها بەرەو پێشەوە.',
    },
  },
  {
    id: 'qp-snowy-winding-road',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٧٨' },
    image: require('@/assets/exam/pic-078.jpg'),
    prompt: {
      ar: 'تقود في ظرف كهذا كما مبين في الصورة الطريق ضيق وذو انعطاف ومغطاة بالثلج ما الذي يجب فعله في هذه الحالة؟',
      en: 'You are driving in conditions like those in the picture: the road is narrow, winding and snow-covered. What should you do?',
      ckb: 'لە بارودۆخێکی وەک وێنەکەدا لێدەخوڕیت، ڕێگاکە تەسک و خواروخێچ و بە بەفر داپۆشراوە. چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الضغط على الفرامل بنعومة وتخفيف السرعة',
        en: 'Brake gently and reduce speed',
        ckb: 'بە نەرمی برێک بگرە و خێرایی کەم بکەرەوە',
      } },
      { id: 'b', text: {
        ar: 'زيادة السرعة للخروج من المنطقة بأقصى سرعة',
        en: 'Speed up to get out of the area as fast as possible',
        ckb: 'خێرایی زیاد بکە بۆ دەرچوون لە ناوچەکە',
      } },
      { id: 'c', text: {
        ar: 'القيادة بنفس السرعة التي كنت امشي بها من قبل',
        en: 'Carry on at the same speed as before',
        ckb: 'بە هەمان خێرایی پێشوو بەردەوام بە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُضغط على الفرامل بنعومة مع تخفيف السرعة على الطريق الثلجي.',
      en: 'Brake gently and slow down on a snow-covered road.',
      ckb: 'بە نەرمی برێک بگرە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'qp-no-large-vehicles-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٧٩' },
    image: require('@/assets/exam/pic-079.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع مرور المركبات الكبيرة (تريلة)',
        en: 'Large vehicles (articulated lorries) are prohibited',
        ckb: 'ئۆتۆمبێلە گەورەکان (تریلە) قەدەغەن',
      } },
      { id: 'b', text: {
        ar: 'يسمح بمرور المركبات الكبيرة (تريلة)',
        en: 'Large vehicles (articulated lorries) are permitted',
        ckb: 'ڕێپێدراون',
      } },
      { id: 'c', text: {
        ar: 'ممنوع وقوف المركبات الكبيرة',
        en: 'Parking of large vehicles is prohibited',
        ckb: 'وەستانی ئۆتۆمبێلە گەورەکان قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع مرور المركبات الكبيرة.',
      en: 'The sign prohibits large vehicles.',
      ckb: 'ئۆتۆمبێلە گەورەکان قەدەغەن.',
    },
  },
  {
    id: 'qp-no-tractors-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٨٠' },
    image: require('@/assets/exam/pic-080.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع مرور الجرارات',
        en: 'Tractors are prohibited',
        ckb: 'تراکتۆر قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'الطريق مخصص لمرور الجرارات',
        en: 'The road is reserved for tractors',
        ckb: 'ڕێگاکە تایبەتە بە تراکتۆر',
      } },
      { id: 'c', text: {
        ar: 'أمامك طريق لمرور الجرارات (الآليات الزراعية)',
        en: 'A road for tractors (agricultural machinery) ahead',
        ckb: 'ڕێگای تراکتۆر لە پێشتە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع مرور الجرارات.',
      en: 'The sign prohibits tractors.',
      ckb: 'تراکتۆر قەدەغەیە.',
    },
  },
  {
    id: 'qp-learner-closed-yard',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٨١' },
    image: require('@/assets/exam/pic-081.jpg'),
    prompt: {
      ar: 'يجب على الشخص الذي لا يتمتع بأية خبرة في السياقة أن',
      en: 'A person with no driving experience at all must:',
      ckb: 'ئەو کەسەی هیچ ئەزموونێکی لێخوڕینی نییە دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يتعلم السياقة قرب المدارس',
        en: 'Learn to drive near schools',
        ckb: 'لە نزیک قوتابخانەکان فێربێت',
      } },
      { id: 'b', text: {
        ar: 'يتعلم السياقة في المناطق السكنية ومناطق لعب الأطفال',
        en: 'Learn to drive in residential areas and children\'s play areas',
        ckb: 'لە ناوچە نیشتەجێبووەکان و شوێنی یاری منداڵان فێربێت',
      } },
      { id: 'c', text: {
        ar: 'ان يتعلم في ساحة مغلقة',
        en: 'Learn in an enclosed yard',
        ckb: 'لە گۆڕەپانێکی داخراودا فێربێت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يتعلم المبتدئ في ساحة مغلقة بعيداً عن الطريق العام.',
      en: 'A beginner learns in an enclosed yard, away from public roads.',
      ckb: 'لە گۆڕەپانێکی داخراودا فێردەبێت.',
    },
  },
  {
    id: 'qp-one-way-road-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٨٢' },
    image: require('@/assets/exam/pic-082.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'بداية الطريق السريع',
        en: 'The start of an expressway',
        ckb: 'دەستپێکی ڕێگای خێرا',
      } },
      { id: 'b', text: {
        ar: 'طريق ذو إتجاه واحد',
        en: 'A one-way road',
        ckb: 'ڕێگای یەک ئاراستە',
      } },
      { id: 'c', text: {
        ar: 'نهاية الطريق مسدود',
        en: 'A dead end ahead',
        ckb: 'ڕێگا داخراوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على طريق ذي اتجاه واحد.',
      en: 'The sign indicates a one-way road.',
      ckb: 'ڕێگای یەک ئاراستە.',
    },
  },
  {
    id: 'qp-no-entry-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٨٣' },
    image: require('@/assets/exam/pic-083.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الدخول ممنوع',
        en: 'No entry',
        ckb: 'چوونە ژوورەوە قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع مرور المركبات الصغيرة',
        en: 'Small vehicles are prohibited',
        ckb: 'ئۆتۆمبێلە بچووکەکان قەدەغەن',
      } },
      { id: 'c', text: {
        ar: 'المرور ممنوع من كلا الإتجاهين',
        en: 'Traffic is prohibited in both directions',
        ckb: 'ڕۆیشتن لە هەردوو ئاراستە قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تعني ممنوع الدخول.',
      en: 'The sign means no entry.',
      ckb: 'چوونە ژوورەوە قەدەغەیە.',
    },
  },
  {
    id: 'qp-give-way-triangle-circle',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٨٤' },
    image: require('@/assets/exam/pic-084.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'أسبقية الطريق السريع (لك الأسبقية)',
        en: 'Expressway priority (you have right of way)',
        ckb: 'پێشینەیی ڕێگای خێرا',
      } },
      { id: 'b', text: {
        ar: 'إحذر من تجاوز المركبات على الإتجاه المعاكس',
        en: 'Beware of vehicles overtaking in the opposite direction',
        ckb: 'ئاگاداری تێپەڕاندنی بەرامبەر بە',
      } },
      { id: 'c', text: {
        ar: 'قف و إسمح لمرور المركبات التي تتمتع بالأسبقية',
        en: 'Stop and give way to vehicles that have priority',
        ckb: 'بوەستە و ڕێگا بدە بەو ئۆتۆمبێلانەی پێشینەییان هەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تُلزم بالتوقف وإعطاء الأسبقية.',
      en: 'The sign requires stopping and giving way.',
      ckb: 'بوەستە و پێشینەیی بدە.',
    },
  },
  {
    id: 'qp-steep-descent-12-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٨٥' },
    image: require('@/assets/exam/pic-085.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'أمامك مرتفع شاهق بحدة 12% درجة',
        en: 'A steep rise of 12% ahead',
        ckb: 'هەڵدێرێکی بەرز بە ١٢٪ لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'أمامك منحدر خطير بحدة 12% درجة',
        en: 'A dangerous descent of 12% ahead',
        ckb: 'لێژاییەکی مەترسیدار بە ١٢٪ لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'أمامك مطبات بحدة 12% درجة',
        en: 'Speed humps of 12% ahead',
        ckb: 'قەڵشی ١٢٪ لە پێشتە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من منحدر خطير بنسبة 12%.',
      en: 'The sign warns of a dangerous 12% descent.',
      ckb: 'لێژاییەکی مەترسیدار بە ١٢٪.',
    },
  },
  {
    id: 'qp-residential-no-signs',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٨٦' },
    image: require('@/assets/exam/pic-086.jpg'),
    prompt: {
      ar: 'ماذا تستنتج من هذه الصورة في حالة عدم وجود علامات مرورية؟',
      en: 'What do you conclude from this picture when there are no traffic signs?',
      ckb: 'لەم وێنەیەدا کە تابلۆی هاتوچۆ نییە، چی لێدەردەهێنیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحيطة والحذر حي سكني',
        en: 'Take care: a residential area',
        ckb: 'وریایی، ناوچەی نیشتەجێبوونە',
      } },
      { id: 'b', text: {
        ar: 'طريق زراعي',
        en: 'A farm road',
        ckb: 'ڕێگای کشتوکاڵی',
      } },
      { id: 'c', text: {
        ar: 'مكان للاستراحة',
        en: 'A rest area',
        ckb: 'شوێنی پشوودان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الصورة تدل على حي سكني يستوجب الحيطة والحذر.',
      en: 'The picture shows a residential area calling for care.',
      ckb: 'ناوچەی نیشتەجێبوونە و وریایی دەوێت.',
    },
  },
  {
    id: 'qp-farm-road-no-signs',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٨٧' },
    image: require('@/assets/exam/pic-087.jpg'),
    prompt: {
      ar: 'ماذا تستنتج من هذه الصورة في حالة عدم وجود علامات مرورية؟',
      en: 'What do you conclude from this picture when there are no traffic signs?',
      ckb: 'لەم وێنەیەدا کە تابلۆ نییە، چی لێدەردەهێنیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'منطقة سكنية (الحيطة والحذر)',
        en: 'A residential area (take care)',
        ckb: 'ناوچەی نیشتەجێبوون (وریایی)',
      } },
      { id: 'b', text: {
        ar: 'طريق زراعي',
        en: 'A farm road',
        ckb: 'ڕێگای کشتوکاڵی',
      } },
      { id: 'c', text: {
        ar: 'حي سكني مكتظ',
        en: 'A crowded residential area',
        ckb: 'گەڕەکی قەرەباڵغ',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الصورة تدل على طريق زراعي.',
      en: 'The picture shows a farm road.',
      ckb: 'ڕێگای کشتوکاڵییە.',
    },
  },
  {
    id: 'qp-driving-80-when-snow-starts',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٨٨' },
    image: require('@/assets/exam/pic-088.jpg'),
    prompt: {
      ar: 'ما العمل خلال السياقة بسرعة 80كم/ في الساعة بعد أن بدأ الثلج بالهطول؟',
      en: 'What should you do when driving at 80 km/h and snow starts to fall?',
      ckb: 'کاتێک بە ٨٠ کم/کاتژمێر لێدەخوڕیت و بەفر دەست بە باران دەکات، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الإستمرار في القيادة بنفس السرعة',
        en: 'Carry on at the same speed',
        ckb: 'بە هەمان خێرایی بەردەوام دەبم',
      } },
      { id: 'b', text: {
        ar: 'زيادة السرعة',
        en: 'Increase speed',
        ckb: 'خێرایی زیاد دەکەم',
      } },
      { id: 'c', text: {
        ar: 'الضغط على الفرامل بلطف وتخفيف السرعة',
        en: 'Brake gently and reduce speed',
        ckb: 'بە نەرمی برێک دەگرم و خێرایی کەم دەکەمەوە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُضغط على الفرامل بلطف مع تخفيف السرعة عند بدء تساقط الثلج.',
      en: 'Brake gently and slow down when snow begins to fall.',
      ckb: 'بە نەرمی برێک بگرە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'qp-priority-white-vehicle',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ٨٩' },
    image: require('@/assets/exam/pic-089.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة البيضاء',
        en: 'The white vehicle',
        ckb: 'ئۆتۆمبێلە سپییەکە',
      } },
      { id: 'b', text: {
        ar: 'المركبة الحمراء',
        en: 'The red vehicle',
        ckb: 'ئۆتۆمبێلە سوورەکە',
      } },
      { id: 'c', text: {
        ar: 'او كلاهما',
        en: 'Or both of them',
        ckb: 'یان هەردووکیان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة البيضاء بحسب دليل الأسئلة الرسمي.',
      en: 'The white vehicle has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلە سپییەکەیە.',
    },
  },
  {
    id: 'qp-priority-red-vehicle',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ٩٠' },
    image: require('@/assets/exam/pic-090.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة البيضاء',
        en: 'The white vehicle',
        ckb: 'ئۆتۆمبێلە سپییەکە',
      } },
      { id: 'b', text: {
        ar: 'المركبة الحمراء',
        en: 'The red vehicle',
        ckb: 'ئۆتۆمبێلە سوورەکە',
      } },
      { id: 'c', text: {
        ar: 'او كلاهما',
        en: 'Or both of them',
        ckb: 'یان هەردووکیان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة الحمراء بحسب دليل الأسئلة الرسمي.',
      en: 'The red vehicle has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلە سوورەکەیە.',
    },
  },
  {
    id: 'qp-priority-main-road-white',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ٩١' },
    image: require('@/assets/exam/pic-091.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة الحمراء الخارجة من محطة الوقود',
        en: 'The red vehicle coming out of the filling station',
        ckb: 'ئۆتۆمبێلە سوورەکەی لە بۆریگەی سووتەمەنییەوە دێت',
      } },
      { id: 'b', text: {
        ar: 'المركبة البيضاء لانها تسير في الطريق الرئيسي',
        en: 'The white vehicle, because it is travelling on the main road',
        ckb: 'ئۆتۆمبێلە سپییەکە چونکە لە ڕێگا سەرەکییەکەدا دەڕوات',
      } },
      { id: 'c', text: {
        ar: 'كلاهما',
        en: 'Both of them',
        ckb: 'هەردووکیان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة السائرة في الطريق الرئيسي.',
      en: 'The vehicle on the main road has priority.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی ڕێگا سەرەکییەکەیە.',
    },
  },
  {
    id: 'qp-beware-roadside-surroundings',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٩٢' },
    image: require('@/assets/exam/pic-092.jpg'),
    prompt: {
      ar: 'في هذه الصورة ما الذي يجب توخي الحذر منه؟',
      en: 'In this picture, what must you be careful of?',
      ckb: 'لەم وێنەیەدا دەبێت ئاگاداری چی بیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الأطراف المحيطة بالشارع',
        en: 'The surroundings at the sides of the street',
        ckb: 'دەوروبەری شەقامەکە',
      } },
      { id: 'b', text: {
        ar: 'كاميرات مراقبة السرعة',
        en: 'Speed cameras',
        ckb: 'کامێرای چاودێری خێرایی',
      } },
      { id: 'c', text: {
        ar: 'المحمول',
        en: 'The mobile phone',
        ckb: 'مۆبایل',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب الحذر من الأطراف المحيطة بالشارع (كخروج طفل خلف مركبة).',
      en: 'Be careful of the roadside surroundings, such as a child emerging behind a car.',
      ckb: 'ئاگاداری دەوروبەری شەقامەکە بە.',
    },
  },
  {
    id: 'qp-training-violation-responsibility',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٩٣' },
    image: require('@/assets/exam/pic-093.jpg'),
    prompt: {
      ar: 'في حالة حدوث أية مخالفة أثناء التدريب على السياقة',
      en: 'If any offence occurs during driving instruction:',
      ckb: 'ئەگەر لە کاتی ڕاهێنانی لێخوڕیندا سەرپێچییەک ڕوویدا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يكون المتدرب مسؤولاً عن المخالفة',
        en: 'The trainee is responsible for the offence',
        ckb: 'ڕاهێنەرەکە بەرپرسیارە',
      } },
      { id: 'b', text: {
        ar: 'يكون المدرب مسؤولاً عن المخالفة',
        en: 'The instructor is responsible for the offence',
        ckb: 'مامۆستای ڕاهێنان بەرپرسیارە',
      } },
      { id: 'c', text: {
        ar: 'لا يكون أي منهما مسؤولاً عن المخالفة',
        en: 'Neither of them is responsible for the offence',
        ckb: 'هیچیان بەرپرسیار نین',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'المدرب هو المسؤول عن المخالفة أثناء التدريب.',
      en: 'The instructor bears responsibility for offences during training.',
      ckb: 'مامۆستای ڕاهێنان بەرپرسیارە.',
    },
  },
  {
    id: 'qp-priority-pedestrians-stepped',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ٩٤' },
    image: require('@/assets/exam/pic-094.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة البيضاء',
        en: 'The white vehicle',
        ckb: 'ئۆتۆمبێلە سپییەکە',
      } },
      { id: 'b', text: {
        ar: 'المشاة لانهم وطؤا باقدامهم على الشارع في معبر المشاة',
        en: 'The pedestrians, because they have stepped onto the street at the crossing',
        ckb: 'پیادەکان، چونکە پێیان ناوەتە سەر شەقامەکە لە پەڕینەوەکەدا',
      } },
      { id: 'c', text: {
        ar: 'لا توجد اسبقية',
        en: 'There is no right of way',
        ckb: 'پێشینەیی نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمشاة الذين وطئوا معبر المشاة.',
      en: 'The pedestrians who have stepped onto the crossing have priority.',
      ckb: 'پێشینەیی بۆ پیادەکانە.',
    },
  },
  {
    id: 'qp-when-adjust-mirrors',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ٩٥' },
    image: require('@/assets/exam/pic-095.jpg'),
    prompt: {
      ar: 'متى يجب ضبط المرايا؟',
      en: 'When should the mirrors be adjusted?',
      ckb: 'کەی دەبێت ئاوێنەکان ڕێک بخرێن؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'اثناء القيادة يجب ضبط المرايا',
        en: 'The mirrors should be adjusted while driving',
        ckb: 'لە کاتی لێخوڕیندا',
      } },
      { id: 'b', text: {
        ar: 'قبل قيادة المركبة يجب ضبط المرايا الثلاث',
        en: 'All three mirrors should be adjusted before driving off',
        ckb: 'پێش لێخوڕین دەبێت هەر سێ ئاوێنەکە ڕێک بخرێن',
      } },
      { id: 'c', text: {
        ar: 'يمكن ضبط المرايا في اي وقت',
        en: 'The mirrors can be adjusted at any time',
        ckb: 'لە هەر کاتێکدا',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'تُضبط المرايا الثلاث قبل قيادة المركبة.',
      en: 'Adjust all three mirrors before you drive off.',
      ckb: 'پێش لێخوڕین هەر سێکیان ڕێک بخە.',
    },
  },
  {
    id: 'qp-steep-rise-12-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٩٦' },
    image: require('@/assets/exam/pic-096.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر أمامك مطبات بحدة 12% درجة',
        en: 'Beware: speed humps of 12% ahead',
        ckb: 'قەڵشی ١٢٪ لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'احذر أمامك منحدر خطير بحدة 12% درجة',
        en: 'Beware: a dangerous descent of 12% ahead',
        ckb: 'لێژاییەکی مەترسیدار بە ١٢٪',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك مرتفع شاهق بحدة 12% درجة',
        en: 'Beware: a steep rise of 12% ahead',
        ckb: 'هەڵدێرێکی بەرز بە ١٢٪ لە پێشتە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تحذر من مرتفع شاهق بنسبة 12%.',
      en: 'The sign warns of a steep 12% rise.',
      ckb: 'هەڵدێرێکی بەرز بە ١٢٪.',
    },
  },
  {
    id: 'qp-horse-rider-on-road',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ٩٧' },
    image: require('@/assets/exam/pic-097.jpg'),
    prompt: {
      ar: 'كيف تتصرف عند مشاهدتك لهذه الحالة؟',
      en: 'How do you act when you see this situation?',
      ckb: 'کاتێک ئەم بارودۆخە دەبینیت چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر و اخفض السرعة',
        en: 'Take care and reduce speed',
        ckb: 'وریابە و خێرایی کەم بکەرەوە',
      } },
      { id: 'b', text: {
        ar: 'اسرع كي أتجاوزه',
        en: 'Speed up so as to get past',
        ckb: 'خێرا بە بۆ تێپەڕاندنی',
      } },
      { id: 'c', text: {
        ar: 'استمر في السير حسب السرعة المقررة للطريق',
        en: 'Carry on at the road\'s prescribed speed',
        ckb: 'بە خێرایی دیاریکراوی ڕێگاکە بەردەوام بە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب الحذر وتخفيض السرعة عند وجود فارس على الطريق.',
      en: 'Take care and slow down when a horse rider is on the road.',
      ckb: 'وریابە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'qp-loose-gravel-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ٩٨' },
    image: require('@/assets/exam/pic-098.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'إحذر من تساقط الصخور من جهة اليمين',
        en: 'Beware of falling rocks from the right',
        ckb: 'ئاگاداری کەوتنی بەرد بە لە لای ڕاستەوە',
      } },
      { id: 'b', text: {
        ar: 'احذر لوجود الحصى على الطريق',
        en: 'Beware: loose gravel on the road',
        ckb: 'ئاگاداربە، بەردی وردی لەسەر ڕێگایە',
      } },
      { id: 'c', text: {
        ar: 'احذر الطريق منزلق',
        en: 'Beware: slippery road',
        ckb: 'ئاگاداربە، ڕێگا خلیسکە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من وجود الحصى على الطريق.',
      en: 'The sign warns of loose gravel on the road.',
      ckb: 'بەردی ورد لەسەر ڕێگایە.',
    },
  },
  {
    id: 'qp-priority-green-from-right',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ٩٩' },
    image: require('@/assets/exam/pic-099.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة البيضاء',
        en: 'The white vehicle',
        ckb: 'ئۆتۆمبێلە سپییەکە',
      } },
      { id: 'b', text: {
        ar: 'المركبة الخضراء لانها قادمة من اليمين',
        en: 'The green vehicle, because it is coming from the right',
        ckb: 'ئۆتۆمبێلە سەوزەکە چونکە لە لای ڕاستەوە دێت',
      } },
      { id: 'c', text: {
        ar: 'لا توجد اسبقية',
        en: 'There is no right of way',
        ckb: 'پێشینەیی نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للقادم من اليمين.',
      en: 'The vehicle coming from the right has priority.',
      ckb: 'پێشینەیی بۆ ئەوەیە کە لە لای ڕاستەوە دێت.',
    },
  },
  {
    id: 'qp-roadworks-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٠' },
    image: require('@/assets/exam/pic-100.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر الطريق منزلق',
        en: 'Beware: slippery road',
        ckb: 'ئاگاداربە، ڕێگا خلیسکە',
      } },
      { id: 'b', text: {
        ar: 'احذر أمامك أعمال إنشائية',
        en: 'Beware: roadworks ahead',
        ckb: 'ئاگاداربە، کاری بیناسازی لە پێشتە',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك منحدر خطير',
        en: 'Beware: a dangerous descent ahead',
        ckb: 'ئاگاداربە، لێژایی مەترسیدار لە پێشتە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من أعمال إنشائية أمامك.',
      en: 'The sign warns of roadworks ahead.',
      ckb: 'کاری بیناسازی لە پێشتە.',
    },
  },
  {
    id: 'qp-priority-red-main-straight',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٠١' },
    image: require('@/assets/exam/pic-101.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة الحمراء لانها في الشارع الرئيسي وتمشي بالمستقيم',
        en: 'The red vehicle, because it is on the main street and going straight ahead',
        ckb: 'ئۆتۆمبێلە سوورەکە چونکە لە شەقامی سەرەکییە و ڕاست دەڕوات',
      } },
      { id: 'b', text: {
        ar: 'المركبة البيضاء لانها تمشي باتجاه شبه دائري',
        en: 'The white vehicle, because it is following a semi-circular path',
        ckb: 'ئۆتۆمبێلە سپییەکە',
      } },
      { id: 'c', text: {
        ar: 'لا توجد اسبقية',
        en: 'There is no right of way',
        ckb: 'پێشینەیی نییە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة السائرة بالمستقيم في الشارع الرئيسي.',
      en: 'The vehicle going straight on the main street has priority.',
      ckb: 'پێشینەیی بۆ ئەوەی ڕاست لە شەقامی سەرەکیدا دەڕوات.',
    },
  },
  {
    id: 'qp-left-bend-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٢' },
    image: require('@/assets/exam/pic-102.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر أمامك طريق فرعي إلى اليسار',
        en: 'Beware: a side road to the left ahead',
        ckb: 'ڕێگای لاوەکی بۆ چەپ لە پێشتە',
      } },
      { id: 'b', text: {
        ar: 'احذر أمامك التفافات عديدة اولها الى جهة اليسار',
        en: 'Beware: several bends ahead, the first to the left',
        ckb: 'چەند سووڕانەوەیەک، یەکەمیان بۆ چەپ',
      } },
      { id: 'c', text: {
        ar: 'احذر أمامك إلتفافة إلى اليسار',
        en: 'Beware: a bend to the left ahead',
        ckb: 'سووڕانەوەیەک بۆ چەپ لە پێشتە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تحذر من التفافة واحدة إلى اليسار.',
      en: 'The sign warns of a single bend to the left.',
      ckb: 'سووڕانەوەیەک بۆ چەپ.',
    },
  },
  {
    id: 'qp-u-turn-over-solid-line',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٣' },
    image: require('@/assets/exam/pic-103.jpg'),
    prompt: {
      ar: 'المركبة الزرقاء في هذه الصورة تنوي الاستدارة هنا. هل هذا تصرف سليم؟',
      en: 'The blue vehicle in this picture intends to turn here. Is that correct behaviour?',
      ckb: 'ئۆتۆمبێلە شینەکە لەم وێنەیەدا دەیەوێت لێرە بسووڕێتەوە. ئایا ڕەفتارێکی دروستە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم صحيح لانه اعطى الاشارة للاستدارة',
        en: 'Yes, correct, because it signalled the turn',
        ckb: 'بەڵێ، چونکە ئاماژەی داوە',
      } },
      { id: 'b', text: {
        ar: 'كلا ليس صحيحا لان الاشارة الارضية لاتسمح بذلك',
        en: 'No, not correct, because the road marking does not permit it',
        ckb: 'نەخێر، چونکە نیشانە زەمینییەکە ڕێگا نادات',
      } },
      { id: 'c', text: {
        ar: 'نعم صحيح مالم توجد مركبة قادمة من الجهة المقابلة',
        en: 'Yes, correct, as long as no vehicle is coming the other way',
        ckb: 'بەڵێ، ئەگەر ئۆتۆمبێل لە بەرامبەرەوە نەیەت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الإشارة الأرضية (الخط المتصل) لا تسمح بالاستدارة هنا.',
      en: 'The road marking (a continuous line) does not permit the turn here.',
      ckb: 'نیشانە زەمینییەکە ڕێگا نادات.',
    },
  },
  {
    id: 'qp-speed-limit-60-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٤' },
    image: require('@/assets/exam/pic-104.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع مرور المركبات التي تزيد وزنها عن 60 طن',
        en: 'Vehicles weighing more than 60 tonnes are prohibited',
        ckb: 'ئۆتۆمبێلی قورستر لە ٦٠ تەن قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'اقصى سرعة مسموح بها 60 كم / ساعة',
        en: 'The maximum permitted speed is 60 km/h',
        ckb: 'بەرزترین خێرایی ڕێپێدراو ٦٠ کم/کاتژمێرە',
      } },
      { id: 'c', text: {
        ar: 'السرعة المحددة يسمح تجاوزها 60 كم / ساعة',
        en: 'The prescribed speed of 60 km/h may be exceeded',
        ckb: 'دەکرێت لە ٦٠ کم/کاتژمێر تێبپەڕێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تعني أقصى سرعة مسموح بها 60 كم/ساعة. (طُبع نص هذا السؤال في الدليل كعبارة بدل صيغة السؤال؛ أُعيد إلى الصيغة المستعملة في بقية أسئلة العلامات.)',
      en: 'The sign means a 60 km/h maximum. (The guide misprints this item\'s stem as a statement; it has been restored to the stem used by every other sign question.)',
      ckb: 'تابلۆکە واتە بەرزترین خێرایی ٦٠ کم/کاتژمێرە.',
    },
  },
  {
    id: 'qp-priority-white-over-pedestrians',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٥' },
    image: require('@/assets/exam/pic-105.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المشاة الواقفين على الرصيف',
        en: 'The pedestrians standing on the pavement',
        ckb: 'ئەو پیادانەی لەسەر ڕێڕەوی پیادە وەستاون',
      } },
      { id: 'b', text: {
        ar: 'المركبة البيضاء',
        en: 'The white vehicle',
        ckb: 'ئۆتۆمبێلە سپییەکە',
      } },
      { id: 'c', text: {
        ar: 'لا توجد اسبقية',
        en: 'There is no right of way',
        ckb: 'پێشینەیی نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة البيضاء لأن المشاة لم يطؤوا معبر المشاة بعد.',
      en: 'The white vehicle has priority, as the pedestrians have not yet stepped onto the crossing.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلە سپییەکەیە.',
    },
  },
  {
    id: 'qp-length-limit-10m-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٦' },
    image: require('@/assets/exam/pic-106.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ممنوع مرور المركبات التي تزيد طولها عن 10 م',
        en: 'Vehicles longer than 10 m are prohibited',
        ckb: 'ئۆتۆمبێلی درێژتر لە ١٠ مەتر قەدەغەیە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع مرور المركبات التي تزيد عرضها عن 10 م',
        en: 'Vehicles wider than 10 m are prohibited',
        ckb: 'ئۆتۆمبێلی پانتر لە ١٠ مەتر قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع مرور مركبات الحمل',
        en: 'Goods vehicles are prohibited',
        ckb: 'بارهەڵگر قەدەغەیە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تمنع المركبات التي يزيد طولها عن 10 أمتار.',
      en: 'The sign prohibits vehicles longer than 10 m.',
      ckb: 'درێژتر لە ١٠ مەتر قەدەغەیە.',
    },
  },
  {
    id: 'qp-minimum-gap-70m-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٧' },
    image: require('@/assets/exam/pic-107.jpg'),
    prompt: {
      ar: 'انت تقود مركبتك وترى امامك هذه العلامة. ما الذي يجب ان تقوم به؟',
      en: 'You are driving and you see this sign ahead. What must you do?',
      ckb: 'لێدەخوڕیت و ئەم تابلۆیە دەبینیت. دەبێت چی بکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ترك مسافة امان بين مركبتي والمركبة الامامية بمدى لاتقل عن 70 متر',
        en: 'Leave a safety gap of no less than 70 metres between my vehicle and the one in front',
        ckb: 'ماوەی سەلامەتی کەمتر نەبێت لە ٧٠ مەتر لە نێوان ئۆتۆمبێلەکەم و ئەوەی پێشەوە',
      } },
      { id: 'b', text: {
        ar: 'المشي بسرعة 70كم في الساعة',
        en: 'Travel at 70 km/h',
        ckb: 'بە خێرایی ٧٠ کم/کاتژمێر بڕۆم',
      } },
      { id: 'c', text: {
        ar: 'انتبه جيدا لوجود منحدر امامي',
        en: 'Pay close attention: there is a descent ahead',
        ckb: 'ئاگاداربم لە لێژایی پێشەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تُلزم بترك مسافة أمان لا تقل عن 70 متراً.',
      en: 'The sign requires a minimum 70-metre gap.',
      ckb: 'ماوەیەکی کەمتر نەبێت لە ٧٠ مەتر.',
    },
  },
  {
    id: 'qp-axle-weight-2t-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٨' },
    image: require('@/assets/exam/pic-108.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يسمح مرور المركبات التي تزيد وزن حمولتها عن 2 طن',
        en: 'Vehicles with a load over 2 tonnes are permitted',
        ckb: 'ئۆتۆمبێلی قورستر لە ٢ تەن ڕێپێدراوە',
      } },
      { id: 'b', text: {
        ar: 'ممنوع مرور المركبات التي تزيد عرضها عن 2 م',
        en: 'Vehicles wider than 2 m are prohibited',
        ckb: 'ئۆتۆمبێلی پانتر لە ٢ مەتر قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'ممنوع مرور المركبات التي تزيد وزن حمولتها عن 2 طن',
        en: 'Vehicles with a load weighing more than 2 tonnes are prohibited',
        ckb: 'ئۆتۆمبێلی خاوەن باری قورستر لە ٢ تەن قەدەغەیە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'العلامة تمنع المركبات التي تزيد حمولتها عن 2 طن.',
      en: 'The sign prohibits vehicles loaded above 2 tonnes.',
      ckb: 'باری قورستر لە ٢ تەن قەدەغەیە.',
    },
  },
  {
    id: 'qp-school-crossing-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٠٩' },
    image: require('@/assets/exam/pic-109.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر امامك تصليحات واشغال على الطريق',
        en: 'Beware: repairs and works on the road ahead',
        ckb: 'ئاگاداربە، چاککردنەوە و کار لەسەر ڕێگا',
      } },
      { id: 'b', text: {
        ar: 'احذر امامك منطقة عبور اطفال المدارس',
        en: 'Beware: a school-children crossing area ahead',
        ckb: 'ئاگاداربە، ناوچەی پەڕینەوەی منداڵانی قوتابخانە',
      } },
      { id: 'c', text: {
        ar: 'احذر من مخاطر متنوعة ومتعددة المصادر',
        en: 'Beware of various hazards from several sources',
        ckb: 'ئاگاداری مەترسی جۆراوجۆر بە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تحذر من منطقة عبور أطفال المدارس.',
      en: 'The sign warns of a school-children crossing.',
      ckb: 'ناوچەی پەڕینەوەی منداڵانی قوتابخانە.',
    },
  },
  {
    id: 'qp-reversing-at-junction',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١١٠' },
    image: require('@/assets/exam/pic-110.jpg'),
    prompt: {
      ar: 'هل يجوز رجوع المركبة البيضاء للخلف في هذه الصورة؟',
      en: 'May the white vehicle reverse in this picture?',
      ckb: 'ئایا ڕێپێدراوە ئۆتۆمبێلە سپییەکە بەرەو دواوە بچێت لەم وێنەیەدا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يجوز',
        en: 'It is permitted',
        ckb: 'ڕێپێدراوە',
      } },
      { id: 'b', text: {
        ar: 'لا يجوز',
        en: 'It is not permitted',
        ckb: 'ڕێپێدراو نییە',
      } },
      { id: 'c', text: {
        ar: 'يجوز عند وجود اشارة الرجوع',
        en: 'It is permitted if the reversing light is on',
        ckb: 'ڕێپێدراوە ئەگەر ئاماژەی گەڕانەوە هەبێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'لا يجوز الرجوع للخلف في هذا الموقع.',
      en: 'Reversing is not permitted in this situation.',
      ckb: 'ڕێپێدراو نییە.',
    },
  },
  {
    id: 'qp-farm-animals-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١١١' },
    image: require('@/assets/exam/pic-111.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'احذر الطريق يمر بمنطقة زراعية واحتمالية وجود الحيوانات الداجنة واردة',
        en: 'Beware: the road passes through farmland and domestic animals may be present',
        ckb: 'ئاگاداربە، ڕێگاکە بە ناوچەی کشتوکاڵیدا تێدەپەڕێت و ئەگەری بوونی ئاژەڵی ماڵی هەیە',
      } },
      { id: 'b', text: {
        ar: 'احذر من الحيوانات الشاردة',
        en: 'Beware of stray animals',
        ckb: 'ئاگاداری ئاژەڵی ون بە',
      } },
      { id: 'c', text: {
        ar: 'احذر من راكبي الاحصنة',
        en: 'Beware of horse riders',
        ckb: 'ئاگاداری ئەسپ‌سواران بە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'العلامة تنبه إلى مرور الطريق بمنطقة زراعية واحتمال وجود حيوانات داجنة.',
      en: 'The sign warns that the road crosses farmland where livestock may be present.',
      ckb: 'ڕێگاکە بە ناوچەی کشتوکاڵیدا تێدەپەڕێت.',
    },
  },
  {
    id: 'qp-continuous-line-along-road',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١١٢' },
    image: require('@/assets/exam/pic-112.jpg'),
    prompt: {
      ar: 'عند وجود خط متواصل بطول الطريق ماذا يجب عليك ان تراعي؟',
      en: 'Where there is a continuous line along the road, what must you observe?',
      ckb: 'ئەگەر هێڵێکی بەردەوام بە درێژایی ڕێگا هەبوو، دەبێت چی ڕەچاو بکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'لاتقوم بمناورة الاجتياز للسيارات المتقدمة',
        en: 'Do not overtake the vehicles ahead',
        ckb: 'ئۆتۆمبێلەکانی پێشەوە تێمەپەڕێنە',
      } },
      { id: 'b', text: {
        ar: 'ان تقوم بمناورة الاجتياز اذا سمح لك حركة المرور في الاتجاه المعاكس بذلك',
        en: 'Overtake if the traffic in the opposite direction allows it',
        ckb: 'تێبپەڕێنە ئەگەر هاتوچۆی بەرامبەر ڕێگای دا',
      } },
      { id: 'c', text: {
        ar: 'ان تجتازها وتمشي عليها فقط عند القيام بمناورة الاجتياز',
        en: 'Cross it and drive on it only when overtaking',
        ckb: 'تەنها لە کاتی تێپەڕاندندا بەسەریدا بڕۆ',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الخط المتواصل يمنع الاجتياز.',
      en: 'A continuous line prohibits overtaking.',
      ckb: 'هێڵی بەردەوام تێپەڕاندن قەدەغە دەکات.',
    },
  },
  {
    id: 'qp-steering-wheel-grip',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١١٣' },
    image: require('@/assets/exam/pic-113.jpg'),
    prompt: {
      ar: 'ما هي الطريقة الصحيحة لمسك مقود المركبة (الستيرن)؟',
      en: 'What is the correct way to hold the steering wheel?',
      ckb: 'ڕێگای دروستی گرتنی ئستێرن چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مسك المقود بكلتا اليدين في وضع الساعة عشرة وعشرة دقائق',
        en: 'Hold it with both hands at the ten-past-ten position',
        ckb: 'بە هەردوو دەست لە دۆخی کاتژمێر دە و دە خولەک',
      } },
      { id: 'b', text: {
        ar: 'مسك المقود باليد اليمنى فقط',
        en: 'Hold it with the right hand only',
        ckb: 'تەنها بە دەستی ڕاست',
      } },
      { id: 'c', text: {
        ar: 'مسك المقود بكلتا اليدين في وضع الساعة ثمانية وعشرون دقيقة',
        en: 'Hold it with both hands at the twenty-eight-minutes-past-eight position',
        ckb: 'بە هەردوو دەست لە دۆخی هەشت و بیست و هەشت خولەک',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُمسك المقود بكلتا اليدين في وضع الساعة عشرة وعشر دقائق.',
      en: 'Hold the wheel with both hands at ten-past-ten.',
      ckb: 'بە هەردوو دەست لە دۆخی دە و دە خولەک.',
    },
  },
  {
    id: 'qp-priority-b-from-right',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١١٤' },
    image: require('@/assets/exam/pic-114.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'ايهما الاقرب للتقاطع',
        en: 'Whichever is closer to the junction',
        ckb: 'ئەوەی نزیکترە لە چوارڕیانەکە',
      } },
      { id: 'b', text: {
        ar: 'المركبة B لانها قادمة من جهة اليمين',
        en: 'Vehicle B, because it is coming from the right',
        ckb: 'ئۆتۆمبێلی B چونکە لە لای ڕاستەوە دێت',
      } },
      { id: 'c', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B لأنها قادمة من جهة اليمين.',
      en: 'Vehicle B has priority because it comes from the right.',
      ckb: 'پێشینەیی بۆ Bیە چونکە لە لای ڕاستەوە دێت.',
    },
  },
  {
    id: 'qp-a-cannot-overtake-solid',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١١٥' },
    image: require('@/assets/exam/pic-115.jpg'),
    prompt: {
      ar: 'المركبة (A) في هذه الصورة لاتستطيع القيام بمناورة الاجتياز لان؟',
      en: 'Vehicle (A) in this picture cannot overtake because:',
      ckb: 'ئۆتۆمبێلی (A) لەم وێنەیەدا ناتوانێت تێبپەڕێنێت چونکە:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'سرعتها منخفضة',
        en: 'Its speed is low',
        ckb: 'خێراییەکەی نزمە',
      } },
      { id: 'b', text: {
        ar: 'لوجود خط ابيض متصل بطول الطريق من جهتها',
        en: 'There is a continuous white line along the road on its side',
        ckb: 'هێڵێکی سپی بەردەوام لە لای ئەوەوە هەیە',
      } },
      { id: 'c', text: {
        ar: 'السائق غير كفوء',
        en: 'The driver is not competent',
        ckb: 'شۆفێرەکە شارەزا نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الخط الأبيض المتصل على جهتها يمنع الاجتياز.',
      en: 'The continuous white line on its side prohibits overtaking.',
      ckb: 'هێڵی سپی بەردەوام ڕێگری دەکات.',
    },
  },
  {
    id: 'qp-obey-officer-over-signs',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١١٦' },
    image: require('@/assets/exam/pic-116.jpg'),
    prompt: {
      ar: 'تقود مركبتك ويشير اليك رجل المرور بسلك اتجاه معاكس لاتجاه السير. ماذا تفعل؟',
      en: 'You are driving and the traffic officer signals you to take a direction against the flow of traffic. What do you do?',
      ckb: 'لێدەخوڕیت و پۆلیسی هاتوچۆ ئاماژەت بۆ دەکات بە ئاراستەی پێچەوانە بڕۆیت. چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'التزم باشارة رجل المرور اليدوية حتى لوكان ذلك يخالف قواعد المرور واللوحات الارشادية',
        en: 'Obey the officer\'s hand signal, even if it conflicts with the traffic rules and the signs',
        ckb: 'گوێڕایەڵی ئاماژەی دەستی پۆلیس دەبم، تەنانەت ئەگەر پێچەوانەی یاسا و تابلۆکانیش بێت',
      } },
      { id: 'b', text: {
        ar: 'اخالف اشارة رجل المرور لان اشارته عكس اتجاه السير في الطريق',
        en: 'Disobey the officer, because the signal is against the road\'s direction of travel',
        ckb: 'گوێڕایەڵی نابم',
      } },
      { id: 'c', text: {
        ar: 'اقف في مكاني ولاتحرك',
        en: 'Stay where I am and do not move',
        ckb: 'لە شوێنی خۆم دەوەستم و ناجوڵێم',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'إشارة رجل المرور اليدوية تعلو على القواعد واللوحات.',
      en: 'The officer\'s hand signal overrides the rules and the signs.',
      ckb: 'ئاماژەی پۆلیس بەسەر یاسا و تابلۆکاندایە.',
    },
  },
  {
    id: 'qp-priority-b-junction',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١١٧' },
    image: require('@/assets/exam/pic-117.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة التي على اليمين',
        en: 'The vehicle on the right',
        ckb: 'ئەو ئۆتۆمبێلەی لای ڕاستە',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-roundabout-priority-a',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١١٨' },
    image: require('@/assets/exam/pic-118.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في الدوار (الفلكة) في هذه الصورة؟',
      en: 'Who has right of way in the roundabout in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی لە خولانەوەکەدا بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'المركبة C',
        en: 'Vehicle C',
        ckb: 'ئۆتۆمبێلی C',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة A بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle A has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Aیە.',
    },
  },
  {
    id: 'qp-roundabout-priority-g',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١١٩' },
    image: require('@/assets/exam/pic-119.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في الدوار (الفلكة) في هذه الصورة؟',
      en: 'Who has right of way in the roundabout in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی لە خولانەوەکەدا بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة H',
        en: 'Vehicle H',
        ckb: 'ئۆتۆمبێلی H',
      } },
      { id: 'b', text: {
        ar: 'المركبة G',
        en: 'Vehicle G',
        ckb: 'ئۆتۆمبێلی G',
      } },
      { id: 'c', text: {
        ar: 'كلاهما لا يملك الاسبقية',
        en: 'Neither of them has right of way',
        ckb: 'هیچیان پێشینەییان نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة G بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle G has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Gیە.',
    },
  },
  {
    id: 'qp-green-vehicle-may-continue',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٠' },
    image: require('@/assets/exam/pic-120.jpg'),
    prompt: {
      ar: 'انت قائد المركبة الخضراء هل يحق لك الاستمرار في السير؟',
      en: 'You are the driver of the green vehicle. May you continue?',
      ckb: 'تۆ شۆفێری ئۆتۆمبێلە سەوزەکەیت، ئایا بۆت هەیە بەردەوام بیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يحق لك الاستمرار في السير مع الانتباه',
        en: 'Yes, you may continue, while paying attention',
        ckb: 'بەڵێ، بە وریاییەوە بەردەوام بە',
      } },
      { id: 'b', text: {
        ar: 'لايحق لك الاستمرار في السير',
        en: 'You may not continue',
        ckb: 'نەخێر',
      } },
      { id: 'c', text: {
        ar: 'يجب عليك اعطاء حق الاولوية للمركبة الحمراء لانها قادمة من اليمين',
        en: 'You must give priority to the red vehicle because it comes from the right',
        ckb: 'دەبێت پێشینەیی بدەیت بە سوورەکە چونکە لە لای ڕاستەوە دێت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يحق لك الاستمرار في السير مع الانتباه بحسب دليل الأسئلة الرسمي.',
      en: 'You may continue while paying attention, per the official guide.',
      ckb: 'بە وریاییەوە بەردەوام بە.',
    },
  },
  {
    id: 'qp-night-oncoming-dipped',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٢١' },
    image: require('@/assets/exam/pic-121.jpg'),
    prompt: {
      ar: 'في القيادة الليلية ما هي المسافة المقبولة بين مركبتين متقابلين كي تستخدما الضياء الواطئ؟',
      en: 'When driving at night, what is the acceptable distance between two oncoming vehicles for them to use dipped beam?',
      ckb: 'لە لێخوڕینی شەوانەدا، چ ماوەیەک لە نێوان دوو ئۆتۆمبێلی بەرامبەردا گونجاوە بۆ بەکارهێنانی ڕووناکی نزم؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يجب ان تكون المصابيح مضاءة باستمرار',
        en: 'The lights must be kept on continuously',
        ckb: 'دەبێت چراکان بە بەردەوامی داگیرساو بن',
      } },
      { id: 'b', text: {
        ar: '200متر',
        en: '200 metres',
        ckb: '٢٠٠ مەتر',
      } },
      { id: 'c', text: {
        ar: '150متر',
        en: '150 metres',
        ckb: '١٥٠ مەتر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب أن تبقى المصابيح مضاءة باستمرار بحسب دليل الأسئلة الرسمي.',
      en: 'The lights must stay on continuously, per the official guide.',
      ckb: 'دەبێت چراکان بە بەردەوامی داگیرساو بن.',
    },
  },
  {
    id: 'qp-night-following-dipped',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٢' },
    image: require('@/assets/exam/pic-122.jpg'),
    prompt: {
      ar: 'في القيادة الليلية ما هي المسافة المقبولة في حالة استخدام الضياء الواطئ بين المركبة والتي تلاحقها؟',
      en: 'When driving at night, what is the acceptable distance for using dipped beam between a vehicle and the one following it?',
      ckb: 'لە لێخوڕینی شەوانەدا، چ ماوەیەک گونجاوە بۆ بەکارهێنانی ڕووناکی نزم لە نێوان ئۆتۆمبێل و ئەوەی بەدوایدا دێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'يجب ان تكون المصابيح مضاءة باستمرار',
        en: 'The lights must be kept on continuously',
        ckb: 'دەبێت چراکان بە بەردەوامی داگیرساو بن',
      } },
      { id: 'b', text: {
        ar: '200متر',
        en: '200 metres',
        ckb: '٢٠٠ مەتر',
      } },
      { id: 'c', text: {
        ar: '300متر',
        en: '300 metres',
        ckb: '٣٠٠ مەتر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يجب أن تبقى المصابيح مضاءة باستمرار بحسب دليل الأسئلة الرسمي.',
      en: 'The lights must stay on continuously, per the official guide.',
      ckb: 'دەبێت چراکان بە بەردەوامی داگیرساو بن.',
    },
  },
  {
    id: 'qp-safe-motorcycle-overtake',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٣' },
    image: require('@/assets/exam/pic-123.jpg'),
    prompt: {
      ar: 'ما هي الحالة الصحيحة لسلامة القيادة اثناء اجتياز الدراجة النارية في هاتين الصورتين؟',
      en: 'Which case is the correct one for safe driving when overtaking the motorcycle in these two pictures?',
      ckb: 'کام حاڵەت دروستە بۆ سەلامەتی لە کاتی تێپەڕاندنی ماتۆڕسکیل لەم دوو وێنەیەدا؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الحالة A',
        en: 'Case A',
        ckb: 'حاڵەتی A',
      } },
      { id: 'b', text: {
        ar: 'الحالة B',
        en: 'Case B',
        ckb: 'حاڵەتی B',
      } },
      { id: 'c', text: {
        ar: 'كلاهما لا يملك الاسبقية',
        en: 'Neither of them has right of way',
        ckb: 'هیچیان',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الحالة A هي الصحيحة بحسب دليل الأسئلة الرسمي.',
      en: 'Case A is the correct one, per the official guide.',
      ckb: 'حاڵەتی A دروستە.',
    },
  },
  {
    id: 'qp-priority-b-turning',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٤' },
    image: require('@/assets/exam/pic-124.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردووکیان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-no-overtake-near-crossing',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٥' },
    image: require('@/assets/exam/pic-125.jpg'),
    prompt: {
      ar: 'تقود مركبتك وترى امامك هذه الاشارة وتسبقك سيارة تمشي بسرعة قليلة وتسبب الضيق لك هل يجوز لك اجتيازه؟',
      en: 'You are driving and see this sign ahead, with a slow car in front of you that is frustrating you. May you overtake it?',
      ckb: 'لێدەخوڕیت و ئەم تابلۆیە دەبینیت، ئۆتۆمبێلێکی هێواش لە پێشتە. ئایا بۆت هەیە تێیبپەڕێنیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم يجوز لك اجتيازه لان الضيق يسبب العصبية',
        en: 'Yes, you may, because the frustration causes irritation',
        ckb: 'بەڵێ، چونکە بێزاری دروست دەکات',
      } },
      { id: 'b', text: {
        ar: 'لايجوز لك اجتيازه لان احدى الاماكن التي تمنع فيها القيام بالاجتياز هي قرب امكان العبور',
        en: 'No, you may not, because one of the places where overtaking is prohibited is near a crossing',
        ckb: 'نەخێر، چونکە یەکێک لەو شوێنانەی تێپەڕاندنی تێدا قەدەغەیە نزیک پەڕینەوەیە',
      } },
      { id: 'c', text: {
        ar: 'نعم يجوز اجتيازه لان الطريق للمركبات وليست للمشاة',
        en: 'Yes, you may, because the road is for vehicles and not for pedestrians',
        ckb: 'بەڵێ، چونکە ڕێگا بۆ ئۆتۆمبێلە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الاجتياز ممنوع قرب أماكن عبور المشاة.',
      en: 'Overtaking is prohibited near pedestrian crossings.',
      ckb: 'تێپەڕاندن لە نزیک پەڕینەوەی پیادە قەدەغەیە.',
    },
  },
  {
    id: 'qp-priority-b-turn-left',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٦' },
    image: require('@/assets/exam/pic-126.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'كلتا المركبتين',
        en: 'Both vehicles',
        ckb: 'هەردووکیان',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-priority-b-straight',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٧' },
    image: require('@/assets/exam/pic-127.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'المركبة الاقرب للتقاطع',
        en: 'The vehicle closer to the junction',
        ckb: 'ئەوەی نزیکترە لە چوارڕیانەکە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-priority-both-together',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٨' },
    image: require('@/assets/exam/pic-128.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'الاثنان في آن واحد',
        en: 'Both at the same time',
        ckb: 'هەردووکیان لە یەک کاتدا',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الأسبقية للمركبتين في آن واحد بحسب دليل الأسئلة الرسمي.',
      en: 'Both have priority at the same time, per the official guide.',
      ckb: 'هەردووکیان لە یەک کاتدا.',
    },
  },
  {
    id: 'qp-road-narrows-action',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٢٩' },
    image: require('@/assets/exam/pic-129.jpg'),
    prompt: {
      ar: 'الاجراء الصحيح في حال رؤيتك لهذه العلامة هي؟',
      en: 'What is the correct action when you see this sign?',
      ckb: 'کردەی دروست کاتێک ئەم تابلۆیە دەبینیت چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تخفيض سرعة مركبتك وسلك الجانب الايمن من الطريق وعدم الاجتياز',
        en: 'Reduce speed, keep to the right-hand side of the road and do not overtake',
        ckb: 'خێرایی کەم بکەرەوە و لای ڕاستی ڕێگا بگرە و تێمەپەڕێنە',
      } },
      { id: 'b', text: {
        ar: 'تخفيض سرعة مركبتك وسلك الجانب الايسر مع امكانية الاجتياز',
        en: 'Reduce speed, keep to the left-hand side, with overtaking possible',
        ckb: 'خێرایی کەم بکەرەوە و لای چەپ بگرە',
      } },
      { id: 'c', text: {
        ar: 'زيادة سرعة مركبتك وسلك الجانب الايسر من الطريق وعدم الاجتياز',
        en: 'Increase speed, keep to the left-hand side and do not overtake',
        ckb: 'خێرایی زیاد بکە و لای چەپ بگرە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُخفض السرعة ويُسلك الجانب الأيمن دون اجتياز.',
      en: 'Slow down, keep right and do not overtake.',
      ckb: 'خێرایی کەم بکەرەوە و لای ڕاست بگرە.',
    },
  },
  {
    id: 'qp-priority-with-stop-sign',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٠' },
    image: require('@/assets/exam/pic-130.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة بوجود علامة التوقف؟',
      en: 'Who has right of way in this picture, given the stop sign?',
      ckb: 'لەم وێنەیەدا بە بوونی تابلۆی وەستان، پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'المركبة الاقرب للتقاطع',
        en: 'The vehicle closer to the junction',
        ckb: 'ئەوەی نزیکترە لە چوارڕیانەکە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-slippery-sign-action',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٣١' },
    image: require('@/assets/exam/pic-131.jpg'),
    prompt: {
      ar: 'ما الاجراء الواجب اتخاذه عند رؤية هذه العلامة اثناء القيادة؟',
      en: 'What action must be taken when you see this sign while driving?',
      ckb: 'کاتێک ئەم تابلۆیە دەبینیت چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تقليل السرعة وعدم تغير المسار ومناورة الاجتياز',
        en: 'Reduce speed and avoid changing lane or overtaking',
        ckb: 'خێرایی کەم بکەرەوە و لاین مەگۆڕە و تێمەپەڕێنە',
      } },
      { id: 'b', text: {
        ar: 'زيادة السرعة للخروج من المنطقة بسرعة',
        en: 'Increase speed to leave the area quickly',
        ckb: 'خێرایی زیاد بکە بۆ دەرچوون لە ناوچەکە',
      } },
      { id: 'c', text: {
        ar: 'اعطاء الطريق للمركبات الاخرى لاجتيازك وتقليل السرعة',
        en: 'Give way to other vehicles to overtake you and reduce speed',
        ckb: 'ڕێگا بدە بەوانەی تر تێت بپەڕێنن',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُقلل السرعة ويُتجنب تغيير المسار والاجتياز على الطريق الزلق.',
      en: 'Slow down and avoid lane changes or overtaking on a slippery road.',
      ckb: 'خێرایی کەم بکەرەوە و لاین مەگۆڕە.',
    },
  },
  {
    id: 'qp-priority-with-give-way-sign',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٢' },
    image: require('@/assets/exam/pic-132.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة بوجود علامة الاسبقية؟',
      en: 'Who has right of way in this picture, given the priority sign?',
      ckb: 'لەم وێنەیەدا بە بوونی تابلۆی پێشینەیی، پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'b', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'c', text: {
        ar: 'المركبتين معاً',
        en: 'Both vehicles together',
        ckb: 'هەردووکیان پێکەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة A بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle A has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Aیە.',
    },
  },
  {
    id: 'qp-correct-parking-method',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٣' },
    image: require('@/assets/exam/pic-133.jpg'),
    prompt: {
      ar: 'ما هي طريقة الصحيحة في رص المركبة البيضاء في الصورة ادناه؟',
      en: 'What is the correct way to park the white vehicle in the picture below?',
      ckb: 'ڕێگای دروستی وەستاندنی ئۆتۆمبێلە سپییەکە لەم وێنەیەدا چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'طريقة الرص في الدخول بإتجاه السير',
        en: 'Parking by driving in facing the direction of travel',
        ckb: 'بە ئاراستەی ڕۆیشتن بچێتە ژوورەوە',
      } },
      { id: 'b', text: {
        ar: 'طريقة الرص في الدخول بإتجاه عكس السير (الرجوع للخلف)',
        en: 'Parking by entering against the direction of travel (reversing in)',
        ckb: 'بە پێچەوانەی ئاراستەی ڕۆیشتن (بە دواوە چوون)',
      } },
      { id: 'c', text: {
        ar: 'لا يسمح بكلتا الطريقين',
        en: 'Neither method is permitted',
        ckb: 'هیچیان ڕێپێدراو نییە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الرص الصحيح يكون بالرجوع للخلف عكس اتجاه السير.',
      en: 'The correct method is to reverse in, against the direction of travel.',
      ckb: 'بە دواوەچوون دروستە.',
    },
  },
  {
    id: 'qp-priority-b-final',
    topic: 'priority',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٤' },
    image: require('@/assets/exam/pic-134.jpg'),
    prompt: {
      ar: 'لمن الاسبقية في هذه الصورة؟',
      en: 'Who has right of way in this picture?',
      ckb: 'لەم وێنەیەدا پێشینەیی بۆ کێیە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'المركبة B',
        en: 'Vehicle B',
        ckb: 'ئۆتۆمبێلی B',
      } },
      { id: 'b', text: {
        ar: 'المركبة A',
        en: 'Vehicle A',
        ckb: 'ئۆتۆمبێلی A',
      } },
      { id: 'c', text: {
        ar: 'الاقرب للتقاطع',
        en: 'The one closer to the junction',
        ckb: 'ئەوەی نزیکترە لە چوارڕیانەکە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الأسبقية للمركبة B بحسب دليل الأسئلة الرسمي.',
      en: 'Vehicle B has priority, per the official guide.',
      ckb: 'پێشینەیی بۆ ئۆتۆمبێلی Bیە.',
    },
  },
  {
    id: 'qp-engine-power-steering-tank',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٥' },
    image: require('@/assets/exam/pic-135.jpg'),
    prompt: {
      ar: 'ما هو تسمية الجزء المؤشر داخل المحرك؟',
      en: 'What is the name of the part indicated inside the engine bay?',
      ckb: 'ناوی ئەو بەشەی ئاماژەی پێدراوە لە ناو بزوێنەردا چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خزان سائل باور',
        en: 'The power-steering fluid reservoir',
        ckb: 'تانکی شلەی پاوەر',
      } },
      { id: 'b', text: {
        ar: 'خزان سائل البريك',
        en: 'The brake fluid reservoir',
        ckb: 'تانکی شلەی برێک',
      } },
      { id: 'c', text: {
        ar: 'خزان سائل الماسحات',
        en: 'The windscreen washer reservoir',
        ckb: 'تانکی شلەی سڕەوە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'الجزء المؤشر هو خزان سائل الباور (التوجيه المعزز).',
      en: 'The part indicated is the power-steering fluid reservoir.',
      ckb: 'تانکی شلەی پاوەرە.',
    },
  },
  {
    id: 'qp-cannot-overtake-motorcycle-solid',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٦' },
    image: require('@/assets/exam/pic-136.jpg'),
    prompt: {
      ar: 'هل تستطيع المركبة اجتياز الدراجة النارية في هذه الصورة؟',
      en: 'Can the vehicle overtake the motorcycle in this picture?',
      ckb: 'ئایا ئۆتۆمبێلەکە دەتوانێت ماتۆڕسکیلەکە تێبپەڕێنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم',
        en: 'Yes',
        ckb: 'بەڵێ',
      } },
      { id: 'b', text: {
        ar: 'كلا لوجود خط ابيض متصل بطول الطريق مما يعني منع الاجتياز',
        en: 'No, because there is a continuous white line along the road, which means overtaking is prohibited',
        ckb: 'نەخێر، چونکە هێڵێکی سپی بەردەوام بە درێژایی ڕێگا هەیە واتە تێپەڕاندن قەدەغەیە',
      } },
      { id: 'c', text: {
        ar: 'نعم لانها دراجة',
        en: 'Yes, because it is a motorcycle',
        ckb: 'بەڵێ، چونکە ماتۆڕسکیلە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الخط الأبيض المتصل يمنع الاجتياز.',
      en: 'The continuous white line prohibits overtaking.',
      ckb: 'هێڵی سپی بەردەوام تێپەڕاندن قەدەغە دەکات.',
    },
  },
  {
    id: 'qp-engine-brake-fluid-tank',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٧' },
    image: require('@/assets/exam/pic-137.jpg'),
    prompt: {
      ar: 'ما هو تسمية الجزء المؤشر داخل المحرك؟',
      en: 'What is the name of the part indicated inside the engine bay?',
      ckb: 'ناوی ئەو بەشەی ئاماژەی پێدراوە چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خزان سائل الماسحات',
        en: 'The windscreen washer reservoir',
        ckb: 'تانکی شلەی سڕەوە',
      } },
      { id: 'b', text: {
        ar: 'خزان سائل باور',
        en: 'The power-steering fluid reservoir',
        ckb: 'تانکی شلەی پاوەر',
      } },
      { id: 'c', text: {
        ar: 'خزان سائل البريك',
        en: 'The brake fluid reservoir',
        ckb: 'تانکی شلەی برێک',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'الجزء المؤشر هو خزان سائل البريك.',
      en: 'The part indicated is the brake fluid reservoir.',
      ckb: 'تانکی شلەی برێکە.',
    },
  },
  {
    id: 'qp-engine-air-filter',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٨' },
    image: require('@/assets/exam/pic-138.jpg'),
    prompt: {
      ar: 'ما هو تسمية الجزء المؤشر داخل المحرك؟',
      en: 'What is the name of the part indicated inside the engine bay?',
      ckb: 'ناوی ئەو بەشەی ئاماژەی پێدراوە چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الباتري',
        en: 'The battery',
        ckb: 'باتری',
      } },
      { id: 'b', text: {
        ar: 'فلتر هواء',
        en: 'The air filter',
        ckb: 'فلتەری هەوا',
      } },
      { id: 'c', text: {
        ar: 'خزان سائل بريك',
        en: 'The brake fluid reservoir',
        ckb: 'تانکی شلەی برێک',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الجزء المؤشر هو فلتر الهواء.',
      en: 'The part indicated is the air filter.',
      ckb: 'فلتەری هەوایە.',
    },
  },
  {
    id: 'qp-engine-battery',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١٣٩' },
    image: require('@/assets/exam/pic-139.jpg'),
    prompt: {
      ar: 'ما هو تسمية الجزء المؤشر داخل المحرك؟',
      en: 'What is the name of the part indicated inside the engine bay?',
      ckb: 'ناوی ئەو بەشەی ئاماژەی پێدراوە چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'فلتر هواء',
        en: 'The air filter',
        ckb: 'فلتەری هەوا',
      } },
      { id: 'b', text: {
        ar: 'الباتري',
        en: 'The battery',
        ckb: 'باتری',
      } },
      { id: 'c', text: {
        ar: 'خزان سائل الماسحات',
        en: 'The windscreen washer reservoir',
        ckb: 'تانکی شلەی سڕەوە',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الجزء المؤشر هو الباتري (البطارية).',
      en: 'The part indicated is the battery.',
      ckb: 'باترییە.',
    },
  },
  {
    id: 'qp-engine-oil-dipstick',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٠' },
    image: require('@/assets/exam/pic-140.jpg'),
    prompt: {
      ar: 'ما هو تسمية الجزء المؤشر داخل المحرك؟',
      en: 'What is the name of the part indicated inside the engine bay?',
      ckb: 'ناوی ئەو بەشەی ئاماژەی پێدراوە چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'مقياس زيت البريك',
        en: 'The brake fluid dipstick',
        ckb: 'پێوەری زەیتی برێک',
      } },
      { id: 'b', text: {
        ar: 'مقياس زيت المحرك',
        en: 'The engine oil dipstick',
        ckb: 'پێوەری زەیتی بزوێنەر',
      } },
      { id: 'c', text: {
        ar: 'مقياس زيت باور',
        en: 'The power-steering fluid dipstick',
        ckb: 'پێوەری زەیتی پاوەر',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الجزء المؤشر هو مقياس زيت المحرك.',
      en: 'The part indicated is the engine oil dipstick.',
      ckb: 'پێوەری زەیتی بزوێنەرە.',
    },
  },
  {
    id: 'qp-engine-washer-tank',
    topic: 'mechanics',
    verified: true,
    source: { ...S, locator: 'ص س ١٤١' },
    image: require('@/assets/exam/pic-141.jpg'),
    prompt: {
      ar: 'ما هو تسمية الجزء المؤشر داخل المحرك؟',
      en: 'What is the name of the part indicated inside the engine bay?',
      ckb: 'ناوی ئەو بەشەی ئاماژەی پێدراوە چییە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'خزان سائل البريك',
        en: 'The brake fluid reservoir',
        ckb: 'تانکی شلەی برێک',
      } },
      { id: 'b', text: {
        ar: 'خزان سائل الماسحات',
        en: 'The windscreen washer reservoir',
        ckb: 'تانکی شلەی سڕەوە',
      } },
      { id: 'c', text: {
        ar: 'خزان سائل باور',
        en: 'The power-steering fluid reservoir',
        ckb: 'تانکی شلەی پاوەر',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'الجزء المؤشر هو خزان سائل الماسحات.',
      en: 'The part indicated is the windscreen washer reservoir.',
      ckb: 'تانکی شلەی سڕەوەیە.',
    },
  },
  {
    id: 'qp-end-priority-road-sign',
    topic: 'signs',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٢' },
    image: require('@/assets/exam/pic-142.jpg'),
    prompt: {
      ar: 'ماذا تعني هذه العلامة؟',
      en: 'What does this sign mean?',
      ckb: 'ئەم تابلۆیە چی دەگەیەنێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الطريق الرئيسي لأسبقية المرور (لك الأسبقية)',
        en: 'Main road with priority (you have right of way)',
        ckb: 'ڕێگا سەرەکی خاوەن پێشینەیی (پێشینەیی هی تۆیە)',
      } },
      { id: 'b', text: {
        ar: 'نهاية طريق اسبقية المرور (نهاية الأسبقية)',
        en: 'End of the priority road (end of priority)',
        ckb: 'کۆتایی ڕێگای پێشینەیی',
      } },
      { id: 'c', text: {
        ar: 'الطريق الرئيسي لأسبقية المرور (الأسبقية ليست لك )',
        en: 'Main road with priority (you do not have right of way)',
        ckb: 'ڕێگا سەرەکی (پێشینەیی هی تۆ نییە)',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'العلامة تدل على نهاية طريق أسبقية المرور.',
      en: 'The sign marks the end of the priority road.',
      ckb: 'کۆتایی ڕێگای پێشینەیی.',
    },
  },
  {
    id: 'qp-no-seatbelt-penalty',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٣' },
    prompt: {
      ar: 'عدم استعمال حزام الامان في المركبات التي يتوفر فيها احزمة الامان اثناء سيرها ممنوع وعقوبته؟',
      en: 'Not wearing the seat belt, in vehicles fitted with belts, while the vehicle is moving is prohibited and punished by:',
      ckb: 'نەبەستنی پشتێنی سەلامەتی لەو ئۆتۆمبێلانەی پشتێنیان تێدایە لە کاتی ڕۆیشتندا قەدەغەیە و سزاکەی:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'الغرامة وسحب الاجازة لمدة شهر واحد',
        en: 'A fine and withdrawal of the licence for one month',
        ckb: 'غەرامە و هەڵگرتنەوەی مۆڵەت بۆ مانگێک',
      } },
      { id: 'b', text: {
        ar: 'سحب الاجازة',
        en: 'Withdrawal of the licence',
        ckb: 'هەڵگرتنەوەی مۆڵەت',
      } },
      { id: 'c', text: {
        ar: 'الغرامة',
        en: 'A fine',
        ckb: 'غەرامە',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عقوبة عدم استعمال حزام الأمان هي الغرامة.',
      en: 'The penalty for not wearing the seat belt is a fine.',
      ckb: 'سزاکە غەرامەیە.',
    },
  },
  {
    id: 'qp-when-horn-allowed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٤' },
    prompt: {
      ar: 'متى يجوز استخدام جهاز التنبيه (الهورن)؟',
      en: 'When may the horn be used?',
      ckb: 'کەی ڕێپێدراوە بۆری بەکاربهێنرێت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'في الاماكن المزدحمة',
        en: 'In crowded places',
        ckb: 'لە شوێنە قەرەباڵغەکان',
      } },
      { id: 'b', text: {
        ar: 'قرب المدارس والمستشفيات',
        en: 'Near schools and hospitals',
        ckb: 'لە نزیک قوتابخانە و نەخۆشخانە',
      } },
      { id: 'c', text: {
        ar: 'في حالات الضرورة التي تدعي الى استخدامه او تفادي خطر محتمل',
        en: 'In cases of necessity that call for it, or to avoid a possible danger',
        ckb: 'لە کاتی پێویستیدا یان بۆ دوورکەوتنەوە لە مەترسییەکی ئەگەری',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'يُستخدم المنبه عند الضرورة أو لتفادي خطر محتمل.',
      en: 'Use the horn only when necessary or to avoid a possible danger.',
      ckb: 'تەنها لە کاتی پێویستیدا یان بۆ دوورکەوتنەوە لە مەترسی.',
    },
  },
  {
    id: 'qp-no-visibility-rain-fog',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٥' },
    prompt: {
      ar: 'في حالة انعدام الرؤية الجيدة وخصوصاً أثناء هطول الامطار الغزيرة او الضباب؟',
      en: 'When good visibility is lost, especially during heavy rain or fog:',
      ckb: 'لە کاتی نەمانی بینینی باش، بەتایبەت لە بارانی بەخوڕ یان تەمدا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'حاول الاستمرار بالقيادة',
        en: 'Try to carry on driving',
        ckb: 'هەوڵ بدە بەردەوام بیت لە لێخوڕین',
      } },
      { id: 'b', text: {
        ar: 'استخدام ماسحات المطر بالسرعة البطيئة',
        en: 'Use the windscreen wipers on the slow setting',
        ckb: 'سڕەوەکان بە خێرایی هێواش بەکاربهێنە',
      } },
      { id: 'c', text: {
        ar: 'حاول التوقف تماماً وبشكل نظامي',
        en: 'Try to stop completely and in an orderly manner',
        ckb: 'هەوڵ بدە بە تەواوی و بە شێوەیەکی ڕێکوپێک بوەستیت',
      } },
    ],
    correctChoiceId: 'c',
    explanation: {
      ar: 'عند انعدام الرؤية يُحاول التوقف تماماً وبشكل نظامي.',
      en: 'When visibility is lost, try to stop completely and safely.',
      ckb: 'هەوڵ بدە بە تەواوی بوەستیت.',
    },
  },
  {
    id: 'qp-before-overtaking-signal',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٦' },
    prompt: {
      ar: 'عندما تنوي القيام بمناورة الاجتياز للمركبة المتقدمة يجب عليك اولا؟',
      en: 'When you intend to overtake the vehicle ahead, you must first:',
      ckb: 'کاتێک دەتەوێت ئۆتۆمبێلی پێشەوە تێبپەڕێنیت، سەرەتا دەبێت:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'تشغيل الاشارات',
        en: 'Switch on the indicators',
        ckb: 'ئاماژەکان داگیرسێنیت',
      } },
      { id: 'b', text: {
        ar: 'استخدام الهورن او جهاز التنبيه',
        en: 'Use the horn or warning device',
        ckb: 'بۆری بەکاربهێنیت',
      } },
      { id: 'c', text: {
        ar: 'تسير بنفس السرعة دون اعطاء اية اشارة',
        en: 'Carry on at the same speed without giving any signal',
        ckb: 'بە هەمان خێرایی بەبێ ئاماژە بڕۆیت',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يُشغّل المؤشر أولاً قبل مناورة الاجتياز.',
      en: 'Signal first before starting the overtaking manoeuvre.',
      ckb: 'سەرەتا ئاماژە بدە.',
    },
  },
  {
    id: 'qp-best-way-monitor-speed',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٧' },
    prompt: {
      ar: 'أفضل طريقة لمراقبة سرعتك أثناء القيادة هي...؟',
      en: 'The best way to monitor your speed while driving is...',
      ckb: 'باشترین ڕێگا بۆ چاودێری خێراییەکەت لە کاتی لێخوڕیندا:',
    },
    choices: [
      { id: 'a', text: {
        ar: 'النظر الى عداد السرعة في مركبتك',
        en: 'Looking at the speedometer in your vehicle',
        ckb: 'سەیرکردنی ژمێرەری خێرایی لە ئۆتۆمبێلەکەت',
      } },
      { id: 'b', text: {
        ar: 'النظر الى مرافق الطريق',
        en: 'Looking at the roadside features',
        ckb: 'سەیرکردنی دەوروبەری ڕێگا',
      } },
      { id: 'c', text: {
        ar: 'الانصات الى صوت المحرك',
        en: 'Listening to the engine note',
        ckb: 'گوێگرتن لە دەنگی بزوێنەر',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'تُراقب السرعة بالنظر إلى عداد السرعة.',
      en: 'Monitor your speed by looking at the speedometer.',
      ckb: 'بە سەیرکردنی ژمێرەری خێرایی.',
    },
  },
  {
    id: 'qp-u-turn-at-traffic-lights',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٨' },
    prompt: {
      ar: 'هل يسمح لك بالاستدارة راجعاً؟ (على شكل حرف U) عند إشارات المرور الضوئية؟',
      en: 'Are you allowed to make a U-turn at traffic lights?',
      ckb: 'ئایا ڕێپێدراوە لە چرای هاتوچۆدا بە شێوەی U بسووڕێیتەوە؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'نعم في جميع الاوقات',
        en: 'Yes, at all times',
        ckb: 'بەڵێ، لە هەموو کاتێکدا',
      } },
      { id: 'b', text: {
        ar: 'لا، ما لم تكن هناك إشارة (مسموح بالانعطاف) على شكل حرف U',
        en: 'No, unless there is a sign permitting a U-turn',
        ckb: 'نەخێر، مەگەر تابلۆیەک هەبێت کە ڕێگا بدات',
      } },
      { id: 'c', text: {
        ar: 'نعم إذا لم يكن هناك خطر وقوع تصادم مع مركبة اخرى',
        en: 'Yes, if there is no risk of colliding with another vehicle',
        ckb: 'بەڵێ، ئەگەر مەترسی پێکدادان نەبێت',
      } },
    ],
    correctChoiceId: 'b',
    explanation: {
      ar: 'لا يجوز إلا بوجود إشارة تسمح بالانعطاف على شكل حرف U.',
      en: 'Not permitted unless a sign allows the U-turn.',
      ckb: 'تەنها ئەگەر تابلۆ ڕێگای دا.',
    },
  },
  {
    id: 'qp-emergency-stop-triangle',
    topic: 'rules',
    verified: true,
    source: { ...S, locator: 'ص س ١٤٩' },
    prompt: {
      ar: 'ما هي الاجراءات التي يجب إتباعها عند إيقاف مركبة إضطرارياً على أي طريق؟',
      en: 'What procedures must be followed when a vehicle is stopped in an emergency on any road?',
      ckb: 'کاتێک ئۆتۆمبێل بە ناچاری لە هەر ڕێگایەکدا دەوەستێت، چی دەکەیت؟',
    },
    choices: [
      { id: 'a', text: {
        ar: 'وضع مثلث التحذير الفسفوري في مكان يمكن رؤيته من بعد لا يقل عن 50 م في الطرق الداخلية و 130م في الطرق الخارجية من المركبة المتوقفة إضطرارياً',
        en: 'Place the reflective warning triangle where it can be seen from no less than 50 m on inner roads and 130 m on rural roads from the vehicle',
        ckb: 'سێگۆشەی ئاگادارکەرەوە لە شوێنێک دابنێ کە لە دووری کەمتر نەبێت لە ٥٠ مەتر لە ڕێگا ناوەکی و ١٣٠ مەتر لە ڕێگا دەرەکییەکان ببینرێت',
      } },
      { id: 'b', text: {
        ar: 'وضع مثلث التحذير الفسفوري على بعد 20 م أياً كان نوع الطريق',
        en: 'Place the reflective warning triangle 20 m away, whatever the road type',
        ckb: 'لە دووری ٢٠ مەتر دایبنێ',
      } },
      { id: 'c', text: {
        ar: 'إضاءة مصباح التحذير تكفي للتحذير عن توقف المركبة إضطرارياً',
        en: 'Switching on the hazard lamp is enough to warn of the emergency stop',
        ckb: 'داگیرساندنی چرای ئاگادارکەرەوە بەسە',
      } },
    ],
    correctChoiceId: 'a',
    explanation: {
      ar: 'يوضع المثلث بحيث يُرى من 50 م داخل المدن و130 م خارجها.',
      en: 'Place the triangle so it is visible from 50 m on inner roads and 130 m on rural roads.',
      ckb: '٥٠ مەتر لە ناوەکی و ١٣٠ مەتر لە دەرەکی.',
    },
  },
];
