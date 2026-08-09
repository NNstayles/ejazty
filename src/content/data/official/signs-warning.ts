/**
 * العلامات المرورية: علامات تحذيرية — pages 12–17 of the manual.
 * Arabic is verbatim from the source; en/ckb are translations pending review.
 */
import type { TrafficSign } from '../../schema';
import { SIGNS_MANUAL as S } from './source';

export const warningSigns: TrafficSign[] = [
  {
    id: 'sign-signals-ahead', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٢' },
    image: require('@/assets/signs/signals-ahead.png'),
    title: { ar: 'إشارات مرور ضوئية', en: 'Traffic signals ahead', ckb: 'چرای هاتوچۆ لە پێشەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يجب على قائدي المركبات توخي الحيطة والحذر وتهدئة السرعة لوجود إشارة ضوئية.',
      en: 'Drivers must be alert and cautious and reduce speed because of a traffic signal ahead.',
      ckb: 'دەبێت شۆفێران وریا بن و خێرایی کەم بکەنەوە، چونکە چرای هاتوچۆ هەیە.',
    },
  },
  {
    id: 'sign-school', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٢' },
    image: require('@/assets/signs/school.png'),
    title: { ar: 'مدرسة', en: 'School', ckb: 'قوتابخانە' },
    meaning: {
      ar: 'تؤشّر هذه العلامة إلى وجود مدرسة في هذه المنطقة وإلى وجوب تهدئة السرعة حفاظًا على أرواح التلامذة.',
      en: 'A school is in this area; reduce speed to protect pupils\' lives.',
      ckb: 'قوتابخانەیەک لەم ناوچەیەدا هەیە؛ خێرایی کەم بکەرەوە بۆ پاراستنی گیانی قوتابیان.',
    },
  },
  {
    id: 'sign-pedestrian-crossing', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٢' },
    image: require('@/assets/signs/pedestrian-crossing.png'),
    title: { ar: 'عبور مشاة', en: 'Pedestrian crossing', ckb: 'پەڕینەوەی پیادە' },
    meaning: {
      ar: 'تؤشّر هذه العلامة إلى وجود ممر للمشاة (عادة على مداخل المدن) وإلى وجوب توخي الدقّة والحذر وتخفيف السرعة.',
      en: 'A pedestrian crossing is present (usually at city entrances); be precise and careful and reduce speed.',
      ckb: 'ڕێڕەوی پیادە هەیە (بەزۆری لە دەروازەی شارەکان)؛ وریا بە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-roadworks', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٢' },
    image: require('@/assets/signs/roadworks.png'),
    title: { ar: 'أعمال صيانة على الطريق', en: 'Roadworks', ckb: 'کاری چاککردنەوە لەسەر ڕێگا' },
    meaning: {
      ar: 'تؤشّر هذه العلامة إلى وجود أعمال صيانة على الطريق وإلى وجوب تخفيف السرعة منعًا من التفاجؤ بأعمال الصيانة.',
      en: 'Maintenance work is on the road; reduce speed so you are not taken by surprise.',
      ckb: 'کاری چاککردنەوە لەسەر ڕێگاکەیە؛ خێرایی کەم بکەرەوە تا لەناکاو ڕووبەڕووی نەبیتەوە.',
    },
  },
  {
    id: 'sign-agricultural-area', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٢' },
    image: require('@/assets/signs/agricultural-area.png'),
    title: { ar: 'منطقة زراعية', en: 'Agricultural area', ckb: 'ناوچەی کشتوکاڵی' },
    meaning: {
      ar: 'تؤشّر هذه العلامة إلى وجود منطقة زراعيّة وإلى وجوب تخفيف السّرعة منعًا للمفاجأة من عبور الطريق.',
      en: 'An agricultural area; reduce speed to avoid being surprised by something crossing the road.',
      ckb: 'ناوچەیەکی کشتوکاڵییە؛ خێرایی کەم بکەرەوە تا لە پەڕینەوەی لەناکاو بەدوور بیت.',
    },
  },
  {
    id: 'sign-general-danger', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٢' },
    image: require('@/assets/signs/general-danger.png'),
    title: { ar: 'إحذر: توقُّف طارئ', en: 'Caution: emergency stop', ckb: 'ئاگادار بە: وەستانی لەناکاو' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يجب السير بحذر على هذا الطريق.',
      en: 'You must drive with caution on this road.',
      ckb: 'دەبێت بە وریاییەوە لەم ڕێگایەدا بڕۆیت.',
    },
  },
  {
    id: 'sign-steep-ascent', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٣' },
    image: require('@/assets/signs/steep-ascent.png'),
    title: { ar: 'مرتفع خطر', en: 'Dangerous ascent', ckb: 'سەرەوژوورەی مەترسیدار' },
    meaning: {
      ar: 'تعني هذه العلامة وجود مرتفع، لذلك يجب توخي الدقّة والحذر وزيادة الضغط على دواسة الوقود.',
      en: 'There is a rise ahead; be precise and careful and increase pressure on the accelerator.',
      ckb: 'بەرزاییەک هەیە؛ دەبێت وریا بیت و پەستان لەسەر پێدانەی سووتەمەنی زیاد بکەیت.',
    },
  },
  {
    id: 'sign-steep-descent', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٣' },
    image: require('@/assets/signs/steep-descent.png'),
    title: { ar: 'منحدر خطر', en: 'Dangerous descent', ckb: 'نشێوی مەترسیدار' },
    meaning: {
      ar: 'تحذّر هذه العلامة سائقي المركبات من وجود منحدر، لذلك يجب عليهم توخي الدقّة والحذر وتخفيف السرعة.',
      en: 'Warns drivers of a descent; they must be precise, careful and reduce speed.',
      ckb: 'شۆفێران ئاگادار دەکاتەوە لە نشێوێک؛ دەبێت وریا بن و خێرایی کەم بکەنەوە.',
    },
  },
  {
    id: 'sign-level-crossing-no-gate', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٣' },
    image: require('@/assets/signs/level-crossing-no-gate.png'),
    title: { ar: 'تقاطع سكة حديد بدون بوابة', en: 'Level crossing without gate', ckb: 'خاچەڕێی هێڵی ئاسن بەبێ دەروازە' },
    meaning: {
      ar: 'تحذّر هذه العلامة قائدي المركبات من تقاطع سكة حديد بدون بوابة، لذلك يجب تخفيف السرعة.',
      en: 'Warns of a railway crossing with no gate; reduce speed.',
      ckb: 'ئاگادارکردنەوەیە لە خاچەڕێی هێڵی ئاسن بەبێ دەروازە؛ خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-level-crossing-gate', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٣' },
    image: require('@/assets/signs/level-crossing-gate.png'),
    title: { ar: 'تقاطع سكة حديد ببوابة', en: 'Level crossing with gate', ckb: 'خاچەڕێی هێڵی ئاسن بە دەروازە' },
    meaning: {
      ar: 'تحذّر هذه العلامة قائدي المركبات من تقاطع سكة حديد ببوابة، لذلك يجب تخفيف السرعة.',
      en: 'Warns of a railway crossing with a gate; reduce speed.',
      ckb: 'ئاگادارکردنەوەیە لە خاچەڕێی هێڵی ئاسن بە دەروازە؛ خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-falling-rocks', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٣' },
    image: require('@/assets/signs/falling-rocks.png'),
    title: { ar: 'صخور متساقطة', en: 'Falling rocks', ckb: 'بەردی کەوتوو' },
    meaning: {
      ar: 'تعني هذه العلامة أن هناك منطقة جبلية وتساقط صخور على الطريق، لذلك يجب توخِّي الدقة والحذر.',
      en: 'A mountainous area where rocks fall onto the road; be precise and careful.',
      ckb: 'ناوچەیەکی شاخاوییە و بەرد دەکەوێتە سەر ڕێگاکە؛ دەبێت وریا بیت.',
    },
  },
  {
    id: 'sign-electric-wires', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٣' },
    image: require('@/assets/signs/electric-wires.png'),
    title: { ar: 'أسلاك كهربائية', en: 'Electric cables', ckb: 'وایەری کارەبا' },
    meaning: {
      ar: 'تعني هذه العلامة أن هناك أعمال تركيبات وتوصيلات للأعمدة الكهربائية على الطريق.',
      en: 'Installation and connection work on electricity poles is taking place on the road.',
      ckb: 'کاری دانان و بەستنەوەی کۆڵەکەی کارەبا لەسەر ڕێگاکە هەیە.',
    },
  },
  {
    id: 'sign-movable-bridge', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٤' },
    image: require('@/assets/signs/movable-bridge.png'),
    title: { ar: 'جسر متحرك', en: 'Movable bridge', ckb: 'پردی جوڵاو' },
    meaning: {
      ar: 'تعني هذه العلامة أن أمامك جسر متحرك، لذلك يجب التأكد من فتح الجسر أو إغلاقه لاستكمال السير أو التوقّف.',
      en: 'A movable bridge is ahead; check whether it is open or closed before continuing or stopping.',
      ckb: 'پردێکی جوڵاو لە پێشتەیە؛ دڵنیا بەرەوە لە کراوەیی یان داخراویی پردەکە پێش بەردەوامبوون یان وەستان.',
    },
  },
  {
    id: 'sign-uneven-road-hump', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٤' },
    image: require('@/assets/signs/uneven-road-hump.png'),
    title: { ar: 'طريق غير مستوٍ: مطب صناعي', en: 'Uneven road: speed hump', ckb: 'ڕێگای ناتەخت: بەربەستی خێرایی' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد مرتفع أرضي للحد من سرعة المركبات.',
      en: 'There is a raised section of ground to limit vehicle speed.',
      ckb: 'بەرزاییەکی زەوی هەیە بۆ سنووردارکردنی خێرایی ئۆتۆمبێلەکان.',
    },
  },
  {
    id: 'sign-airport-runway', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٤' },
    image: require('@/assets/signs/airport-runway.png'),
    title: { ar: 'مطار / مدرج طيران', en: 'Airport / runway', ckb: 'فڕۆکەخانە / ڕێڕەوی فڕین' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق مجاور لمدرج طيران.',
      en: 'The road runs alongside an aircraft runway.',
      ckb: 'ڕێگاکە لەتەنیشت ڕێڕەوی فڕینە.',
    },
  },
  {
    id: 'sign-slippery-road', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٤' },
    image: require('@/assets/signs/slippery-road.png'),
    title: { ar: 'طريق زلق', en: 'Slippery road', ckb: 'ڕێگای خلیسک' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق زلق (أملس)، لذلك يجب توخي الدقّة والحذر وتخفيف السرعة أثناء عبور هذه المنطقة من الطريق.',
      en: 'The road is slippery (smooth); be precise, careful and reduce speed while crossing this section.',
      ckb: 'ڕێگاکە خلیسکە (لووسە)؛ دەبێت وریا بیت و خێرایی کەم بکەیتەوە لە کاتی تێپەڕبووندا.',
    },
  },
  {
    id: 'sign-bend-left', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٤' },
    image: require('@/assets/signs/bend-left.png'),
    title: { ar: 'منحنى يسار', en: 'Left bend', ckb: 'خواروخێچی چەپ' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد منحنى لجهة اليسار.',
      en: 'There is a bend to the left.',
      ckb: 'خواروخێچێک بەرەو لای چەپ هەیە.',
    },
  },
  {
    id: 'sign-bend-right', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٤' },
    image: require('@/assets/signs/bend-right.png'),
    title: { ar: 'منحنى يمين', en: 'Right bend', ckb: 'خواروخێچی ڕاست' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد منحنى لجهة اليمين.',
      en: 'There is a bend to the right.',
      ckb: 'خواروخێچێک بەرەو لای ڕاست هەیە.',
    },
  },
  {
    id: 'sign-double-bend-left-first', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٥' },
    image: require('@/assets/signs/double-bend-left-first.png'),
    title: { ar: 'منحنيان أولهما إلى اليسار', en: 'Double bend, first to the left', ckb: 'دوو خواروخێچ، یەکەمیان بۆ چەپ' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد منحنيان، أوّلهما لجهة اليسار.',
      en: 'There are two bends, the first of them to the left.',
      ckb: 'دوو خواروخێچ هەن، یەکەمیان بەرەو لای چەپە.',
    },
  },
  {
    id: 'sign-double-bend-right-first', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٥' },
    image: require('@/assets/signs/double-bend-right-first.png'),
    title: { ar: 'منحنيان أولهما إلى اليمين', en: 'Double bend, first to the right', ckb: 'دوو خواروخێچ، یەکەمیان بۆ ڕاست' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد منحنيان، أولهما لجهة اليمين.',
      en: 'There are two bends, the first of them to the right.',
      ckb: 'دوو خواروخێچ هەن، یەکەمیان بەرەو لای ڕاستە.',
    },
  },
  {
    id: 'sign-end-dual-carriageway', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٥' },
    image: require('@/assets/signs/end-dual-carriageway.png'),
    title: { ar: 'نهاية الطريق المزدوج', en: 'End of dual carriageway', ckb: 'کۆتایی ڕێگای دووانە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق المكوَّن من اتجاهين سوف ينتهي بطريق مكوَّن من اتجاه واحد.',
      en: 'The two-way carriageway will end in a road with a single direction.',
      ckb: 'ئەو ڕێگایەی لە دوو ئاراستە پێکهاتووە کۆتایی دێت بە ڕێگایەکی یەک ئاراستە.',
    },
  },
  {
    id: 'sign-side-road-left', category: 'warning', verified: true, priority: true, source: { ...S, locator: 'ص ١٥' },
    image: require('@/assets/signs/side-road-left.png'),
    title: { ar: 'طريق فرعي من اليسار', en: 'Side road from the left', ckb: 'ڕێگای لاوەکی لە چەپەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد نقطة التقاء طريق رئيس مع طريق فرعي من جهة اليسار، لذلك يجب اتّخاذ الحيطة والحذر وتخفيف السرعة.',
      en: 'A main road meets a side road from the left; take care and reduce speed.',
      ckb: 'ڕێگایەکی سەرەکی لەگەڵ ڕێگایەکی لاوەکی لە چەپەوە یەکدەگرن؛ وریا بە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-main-crosses-side', category: 'warning', verified: true, priority: true, source: { ...S, locator: 'ص ١٥' },
    image: require('@/assets/signs/main-crosses-side.png'),
    title: { ar: 'تقاطع طريق رئيس مع فرعي', en: 'Main road crossing a side road', ckb: 'خاچەڕێی ڕێگای سەرەکی لەگەڵ لاوەکی' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق الرئيس سوف يتقاطع مع طريق فرعي، لذلك يجب التوقف والنظر قبل المرور من نقطة التقاطع.',
      en: 'The main road will cross a side road; stop and look before passing the intersection.',
      ckb: 'ڕێگا سەرەکییەکە لەگەڵ ڕێگایەکی لاوەکی خاچ دەبێت؛ بوەستە و سەیر بکە پێش تێپەڕبوون.',
    },
  },
  {
    id: 'sign-side-road-right', category: 'warning', verified: true, priority: true, source: { ...S, locator: 'ص ١٥' },
    image: require('@/assets/signs/side-road-right.png'),
    title: { ar: 'طريق فرعي من اليمين', en: 'Side road from the right', ckb: 'ڕێگای لاوەکی لە ڕاستەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد نقطة التقاء طريق رئيس مع طريق فرعي من جهة اليمين، لذلك يجب توخِّي الدقّة والحذر وتخفيف السرعة.',
      en: 'A main road meets a side road from the right; be precise, careful and reduce speed.',
      ckb: 'ڕێگایەکی سەرەکی لەگەڵ ڕێگایەکی لاوەکی لە ڕاستەوە یەکدەگرن؛ وریا بە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-side-winds', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٦' },
    image: require('@/assets/signs/side-winds.png'),
    title: { ar: 'رياح جانبية', en: 'Side winds', ckb: 'بای لاتەنیشت' },
    meaning: {
      ar: 'تعني هذه العلامة أن هناك رياح في هذه المنطقة، لذلك يجب توخّي الدّقة والحذر وتخفيف السرعة منعًا من وقوع حوادث.',
      en: 'There are winds in this area; be precise, careful and reduce speed to prevent accidents.',
      ckb: 'با لەم ناوچەیەدا هەیە؛ وریا بە و خێرایی کەم بکەرەوە بۆ ڕێگری لە ڕووداو.',
    },
  },
  {
    id: 'sign-crossroads-ahead', category: 'warning', verified: true, priority: true, source: { ...S, locator: 'ص ١٦' },
    image: require('@/assets/signs/crossroads-ahead.png'),
    title: { ar: 'أمامك تقاطع طريق', en: 'Crossroads ahead', ckb: 'خاچەڕێ لە پێشەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أن هناك مفترق طرق، لذلك يجب التوقف والتأكد من خلو الطريق من المركبات قبل التخطِّي.',
      en: 'There is a junction; stop and make sure the road is clear of vehicles before proceeding.',
      ckb: 'خاچەڕێیەک هەیە؛ بوەستە و دڵنیابە لە چۆڵی ڕێگاکە پێش تێپەڕبوون.',
    },
  },
  {
    id: 'sign-road-narrows-both', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٦' },
    image: require('@/assets/signs/road-narrows-both.png'),
    title: { ar: 'الطريق يضيق من الجانبين', en: 'Road narrows on both sides', ckb: 'ڕێگا لە هەردوو لاوە تەنگ دەبێتەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق سوف يضيق من الجانبين الأيمن والأيسر، لذلك يجب توخي الحذر والالتزام بالجهة اليمنى من الطريق.',
      en: 'The road narrows on both the right and left; be careful and keep to the right-hand side.',
      ckb: 'ڕێگاکە لە هەردوو لای ڕاست و چەپەوە تەنگ دەبێتەوە؛ وریا بە و پابەند بە بە لای ڕاستی ڕێگاکە.',
    },
  },
  {
    id: 'sign-road-narrows-right', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٦' },
    image: require('@/assets/signs/road-narrows-right.png'),
    title: { ar: 'الطريق يضيق من اليمين', en: 'Road narrows on the right', ckb: 'ڕێگا لە ڕاستەوە تەنگ دەبێتەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق سوف يضيق من الجانب الأيمن، لذلك يجب توخّي الدّقة والحذر.',
      en: 'The road narrows on the right-hand side; be precise and careful.',
      ckb: 'ڕێگاکە لە لای ڕاستەوە تەنگ دەبێتەوە؛ دەبێت وریا بیت.',
    },
  },
  {
    id: 'sign-roundabout-ahead', category: 'warning', verified: true, priority: true, source: { ...S, locator: 'ص ١٦' },
    image: require('@/assets/signs/roundabout-ahead.png'),
    title: { ar: 'طريق دائري', en: 'Roundabout', ckb: 'ڕێگای بازنەیی' },
    meaning: {
      ar: 'تعني هذه العلامة أنه يوجد تقاطع دائري إلى الأمام، لذلك يجب الحذر وتخفيف السرعة.',
      en: 'There is a circular junction ahead; be careful and reduce speed.',
      ckb: 'خاچەڕێیەکی بازنەیی لە پێشەوەیە؛ وریا بە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-two-way-road', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٦' },
    image: require('@/assets/signs/two-way-road.png'),
    title: { ar: 'الطريق باتجاهين', en: 'Two-way road', ckb: 'ڕێگای دوو ئاراستە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق يستخدم للسير في الاتجاهين المعاكسين.',
      en: 'The road is used for travel in both opposing directions.',
      ckb: 'ڕێگاکە بۆ ڕۆیشتن لە هەردوو ئاراستەی پێچەوانەدا بەکاردێت.',
    },
  },
  {
    id: 'sign-main-road-ahead', category: 'warning', verified: true, priority: true, source: { ...S, locator: 'ص ١٧' },
    image: require('@/assets/signs/main-road-ahead.png'),
    title: { ar: 'أمامك طريق رئيس', en: 'Main road ahead', ckb: 'ڕێگای سەرەکی لە پێشەوە' },
    meaning: {
      ar: 'تعني هذه العلامة أن الطريق الفرعي المستخدم للسير سينتهي بطريق رئيس، لذلك يجب توخّي الدّقة والحذر وتخفيف السرعة منعًا من وقوع حوادث.',
      en: 'The side road you are on will end at a main road; be precise, careful and reduce speed to prevent accidents.',
      ckb: 'ئەو ڕێگا لاوەکییەی پێیدا دەڕۆیت کۆتایی دێت بە ڕێگایەکی سەرەکی؛ وریا بە و خێرایی کەم بکەرەوە.',
    },
  },
  {
    id: 'sign-staged-warning', category: 'warning', verified: true, source: { ...S, locator: 'ص ١٧' },
    image: require('@/assets/signs/staged-warning.png'),
    title: { ar: 'التحذير على مراحل', en: 'Staged warning markers', ckb: 'ئاگادارکردنەوە بە قۆناغ' },
    meaning: {
      ar: 'تعني هذه العلامة التحذير على مراحل مختلفة، وكل خط أحمر يعني ٥٠ مترًا [٥٠ مترًا، ١٠٠ متر، ١٥٠ مترًا].',
      en: 'Warning at successive stages: each red stripe represents 50 metres (50 m, 100 m, 150 m).',
      ckb: 'ئاگادارکردنەوە بە قۆناغی جیاواز؛ هەر هێڵێکی سوور ٥٠ مەتر دەگەیەنێت (٥٠، ١٠٠، ١٥٠ مەتر).',
    },
  },
];
