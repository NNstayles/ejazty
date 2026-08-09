/**
 * Red and amber tell-tales — the ones that report a fault or a hazard.
 * Pages 1–5 of the source guide.
 */
import type { DashboardLight } from '../../schema';
import { DASHBOARD_GUIDE as S } from './source';

export const warningLights: DashboardLight[] = [
  {
    id: 'dash-engine-temperature', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-engine-temperature.png'),
    title: { en: 'Engine temperature', ar: 'حرارة المحرك', ckb: 'پلەی گەرمی بزوێنەر' },
    meaning: {
      en: 'The engine has passed its normal operating temperature.',
      ar: 'تجاوز المحرك درجة حرارة التشغيل الطبيعية.',
      ckb: 'بزوێنەرەکە لە پلەی گەرمی ئاسایی کارکردن تێپەڕیوە.',
    },
    action: {
      en: 'Stop as soon as it is safe and let the engine cool. Check the coolant level, the radiator cap and for leaks. Driving on can destroy the engine.',
      ar: 'توقف حالما يكون ذلك آمنًا ودع المحرك يبرد. افحص مستوى سائل التبريد وغطاء الرادياتير والتسريبات. الاستمرار في القيادة قد يُتلف المحرك.',
      ckb: 'هەرکە سەلامەت بوو بوەستە و لێگەڕێ بزوێنەرەکە سارد بێتەوە. ئاستی ئاوی ساردکەرەوە و سەرپۆشی ڕادیەتەر و دزەکردن بپشکنە. بەردەوامبوون لە لێخوڕین دەکرێت بزوێنەرەکە تێکبدات.',
    },
  },
  {
    id: 'dash-battery-charge', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-battery-charge.png'),
    title: { en: 'Battery charge', ar: 'شحن البطارية', ckb: 'بارگاوی پاتری' },
    meaning: {
      en: 'The charging system is not charging the battery properly. The cause is usually the alternator or the battery itself.',
      ar: 'نظام الشحن لا يشحن البطارية بشكل صحيح، وغالبًا يكون السبب المولّد أو البطارية نفسها.',
      ckb: 'سیستەمی بارگاوی بە دروستی پاتریەکە بارگاوی ناکات، زۆربەی کات بەهۆی جێنەراتۆر یان خودی پاتریەکەوە.',
    },
    action: {
      en: 'Switch off what you do not need and drive to a workshop. The car runs on battery alone until it stops.',
      ar: 'أطفئ ما لا تحتاجه وتوجّه إلى الورشة. تعمل السيارة على البطارية وحدها حتى تتوقف.',
      ckb: 'ئەوەی پێویستت نییە بیکوژێنەوە و بەرەو کارگە بڕۆ. ئۆتۆمبێلەکە تەنها بە پاتری کار دەکات هەتا دەوەستێت.',
    },
  },
  {
    id: 'dash-oil-pressure', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-oil-pressure.png'),
    title: { en: 'Oil pressure', ar: 'ضغط الزيت', ckb: 'پەستانی زەیت' },
    meaning: {
      en: 'Oil pressure has been lost, so the engine is not being lubricated.',
      ar: 'فقدان ضغط الزيت، ما يعني أن المحرك لا يجري تزييته.',
      ckb: 'پەستانی زەیت لەدەست چووە، واتا بزوێنەرەکە چەورکاری ناکرێت.',
    },
    action: {
      en: 'Stop the engine immediately and check the oil level. Running an engine without oil pressure ruins it within minutes.',
      ar: 'أوقف المحرك فورًا وافحص مستوى الزيت. تشغيل المحرك دون ضغط زيت يُتلفه خلال دقائق.',
      ckb: 'دەستبەجێ بزوێنەرەکە بکوژێنەوە و ئاستی زەیت بپشکنە. کارپێکردنی بزوێنەر بەبێ پەستانی زەیت لە ماوەی چەند خولەکێکدا تێکی دەدات.',
    },
  },
  {
    id: 'dash-brake-warning', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-brake-warning.png'),
    title: { en: 'Brake warning', ar: 'تحذير الفرامل', ckb: 'ئاگاداری بڕێک' },
    meaning: {
      en: 'Normally it means the handbrake is on. If it stays lit with the handbrake released, hydraulic pressure has been lost on one side of the brake system or the fluid is dangerously low.',
      ar: 'عادةً يعني أن فرامل اليد مشدودة. وإذا بقي مضاءً بعد إرخائها، فقد فُقد الضغط الهيدروليكي في أحد جانبي نظام الفرامل أو أن مستوى السائل منخفض بشكل خطير.',
      ckb: 'بەزۆری واتای ئەوەیە کە بڕێکی دەستی گیراوە. ئەگەر دوای کردنەوەی بڕێکی دەستی هێشتا داگیرسا بێت، پەستانی هیدرۆلیکی لە لایەکی سیستەمی بڕێک لەدەست چووە یان ئاستی شلەکە بە شێوەیەکی مەترسیدار نزمە.',
    },
    action: {
      en: 'Test the brakes gently at low speed. If the pedal feels soft or long, do not drive. Have it recovered.',
      ar: 'اختبر الفرامل برفق على سرعة منخفضة. إذا كانت الدواسة لينة أو طويلة، فلا تقد السيارة واطلب سحبها.',
      ckb: 'بە هێواشی و بە خێرایی کەم بڕێکەکان تاقی بکەرەوە. ئەگەر پێدانەکە نەرم یان درێژ بوو، لێمەخوڕە و داوای ڕاکێشان بکە.',
    },
  },
  {
    id: 'dash-transmission-temperature', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-transmission-temperature.png'),
    title: { en: 'Transmission temperature', ar: 'حرارة ناقل الحركة', ckb: 'پلەی گەرمی گێڕبۆکس' },
    meaning: {
      en: 'The automatic transmission fluid is hotter than normal, often after towing or long climbs.',
      ar: 'زيت ناقل الحركة الأوتوماتيكي أسخن من المعتاد، غالبًا بعد القطر أو الصعود الطويل.',
      ckb: 'زەیتی گێڕبۆکسی ئۆتۆماتیک لە ئاسایی گەرمترە، زۆرجار دوای ڕاکێشان یان سەرکەوتنی درێژ.',
    },
    action: {
      en: 'Stop and let it cool before driving on. Continuing can damage the gearbox.',
      ar: 'توقف ودعه يبرد قبل متابعة السير. الاستمرار قد يُتلف ناقل الحركة.',
      ckb: 'بوەستە و لێگەڕێ سارد بێتەوە پێش بەردەوامبوون. بەردەوامبوون دەکرێت گێڕبۆکسەکە تێکبدات.',
    },
  },
  {
    id: 'dash-tire-pressure', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-tire-pressure.png'),
    title: { en: 'Tyre pressure', ar: 'ضغط الإطارات', ckb: 'پەستانی تایە' },
    meaning: {
      en: 'The pressure in one or more tyres is low.',
      ar: 'ضغط الهواء منخفض في أحد الإطارات أو أكثر.',
      ckb: 'پەستانی با لە یەک تایە یان زیاتر نزمە.',
    },
    action: {
      en: 'Check and inflate all four tyres when cold, and look for a puncture.',
      ar: 'افحص جميع الإطارات الأربعة وانفخها وهي باردة، وابحث عن ثقب.',
      ckb: 'هەر چوار تایەکە بپشکنە و بە ساردی پڕیان بکەرەوە، و بەدوای کونێکدا بگەڕێ.',
    },
  },
  {
    id: 'dash-traction-control-off', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-traction-control-off.png'),
    title: { en: 'Traction control off', ar: 'إيقاف نظام التحكم بالجر', ckb: 'کوژاندنەوەی کۆنترۆڵی گرتن' },
    meaning: {
      en: 'The traction control system has been switched off, so the wheels are no longer stopped from spinning.',
      ar: 'تم إيقاف نظام التحكم بالجر، فلم تعد العجلات محميّة من الدوران في المكان.',
      ckb: 'سیستەمی کۆنترۆڵی گرتن کوژێنراوەتەوە، بۆیە چیتر ڕێگری لە خولانەوەی چەرخەکان ناکرێت.',
    },
  },
  {
    id: 'dash-steering-wheel-lock', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-steering-wheel-lock.png'),
    title: { en: 'Steering lock', ar: 'قفل المقود', ckb: 'قوفڵی ئستیرن' },
    meaning: {
      en: 'The steering wheel is locked and cannot be turned.',
      ar: 'المقود مقفل ولا يمكن تحريكه.',
      ckb: 'ئستیرنەکە قوفڵ کراوە و ناتوانرێت بسوڕێنرێت.',
    },
    action: {
      en: 'Put the key in the ignition, turn it to the first position and move the wheel either way to release it.',
      ar: 'أدخل المفتاح في وضع التشغيل وأدره إلى الوضع الأول مع تحريك المقود في أي اتجاه لتحريره.',
      ckb: 'کلیلەکە بخەرە ناو سویچەکە و بیسوڕێنە بۆ یەکەم دۆخ لەگەڵ جوڵاندنی ئستیرنەکە بۆ هەر لایەک بۆ کردنەوەی.',
    },
  },
  {
    id: 'dash-trailer-tow-hitch', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-trailer-tow-hitch.png'),
    title: { en: 'Tow hitch', ar: 'خطاف القطر', ckb: 'قولاپی ڕاکێشان' },
    meaning: {
      en: 'The tow hitch is unlocked, or there is a fault in the trailer lighting.',
      ar: 'خطاف القطر غير مقفل، أو هناك خلل في إضاءة المقطورة.',
      ckb: 'قولاپی ڕاکێشان قوفڵ نەکراوە، یان کێشەیەک لە ڕووناکی تریلەرەکەدا هەیە.',
    },
  },
  {
    id: 'dash-traction-control', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-traction-control.png'),
    title: { en: 'Traction control active', ar: 'نظام التحكم بالجر يعمل', ckb: 'کۆنترۆڵی گرتن چالاکە' },
    meaning: {
      en: 'The traction control system is working right now, usually because a wheel has lost grip.',
      ar: 'نظام التحكم بالجر يعمل الآن، عادةً لأن إحدى العجلات فقدت تماسكها.',
      ckb: 'سیستەمی کۆنترۆڵی گرتن ئێستا کار دەکات، زۆرجار لەبەر ئەوەی چەرخێک گرتنی لەدەست داوە.',
    },
    action: {
      en: 'Ease off and slow down, because the surface is slippery.',
      ar: 'خفّف الضغط على الدواسة وأبطئ، فالطريق زلق.',
      ckb: 'پێدانەکە کەم بکەرەوە و خێراییەکەت کەم بکەرەوە، چونکە ڕووی ڕێگاکە لووسە.',
    },
  },
  {
    id: 'dash-service-vehicle-soon', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-service-vehicle-soon.png'),
    title: { en: 'Service vehicle soon', ar: 'صيانة المركبة قريبًا', ckb: 'بەم زووانە خزمەتگوزاری ئۆتۆمبێل' },
    meaning: {
      en: 'A fault has been found somewhere in the chassis systems: ABS, traction control, suspension or the brake hydraulics.',
      ar: 'اكتُشف خلل في أحد أنظمة الهيكل: نظام منع الانغلاق أو التحكم بالجر أو التعليق أو هيدروليك الفرامل.',
      ckb: 'کێشەیەک لە یەکێک لە سیستەمەکانی شاسیدا دۆزراوەتەوە: ABS یان کۆنترۆڵی گرتن یان هەڵواسین یان هیدرۆلیکی بڕێک.',
    },
  },
  {
    id: 'dash-security-alert', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-security-alert.png'),
    title: { en: 'Security alert', ar: 'تنبيه نظام الحماية', ckb: 'ئاگاداری سیستەمی پاراستن' },
    meaning: {
      en: 'The immobiliser is active and needs the correct coded key. If it shows while the engine runs, the security system has a fault.',
      ar: 'نظام منع التشغيل مفعّل ويحتاج إلى المفتاح المشفّر الصحيح. وإذا ظهر أثناء عمل المحرك فهناك خلل في نظام الحماية.',
      ckb: 'سیستەمی ڕێگریکردن چالاکە و پێویستی بە کلیلی کۆدکراوی دروستە. ئەگەر لە کاتی کارکردنی بزوێنەردا دەرکەوت، سیستەمی پاراستن کێشەی هەیە.',
    },
  },
  {
    id: 'dash-side-airbag', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-side-airbag.png'),
    title: { en: 'Side airbag', ar: 'الوسادة الهوائية الجانبية', ckb: 'ئێرباگی لاتەنیشت' },
    meaning: {
      en: 'There is a fault in the side airbag, so it may not deploy in a crash.',
      ar: 'هناك خلل في الوسادة الهوائية الجانبية، وقد لا تنفتح عند الاصطدام.',
      ckb: 'کێشەیەک لە ئێرباگی لاتەنیشتدا هەیە، لەوانەیە لە کاتی پێکدادانەکەدا نەکرێتەوە.',
    },
  },
  {
    id: 'dash-reduced-power', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-reduced-power.png'),
    title: { en: 'Reduced engine power', ar: 'انخفاض قدرة المحرك', ckb: 'کەمبوونەوەی هێزی بزوێنەر' },
    meaning: {
      en: 'The engine computer has deliberately limited power to protect the engine.',
      ar: 'قام حاسوب المحرك بتقليل القدرة عمدًا لحماية المحرك.',
      ckb: 'کۆمپیوتەری بزوێنەر بە ئەنقەست هێزەکەی کەم کردووەتەوە بۆ پاراستنی بزوێنەرەکە.',
    },
  },
  {
    id: 'dash-seat-belt', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-seat-belt.png'),
    title: { en: 'Seat belt', ar: 'حزام الأمان', ckb: 'پشتێنی سەلامەتی' },
    meaning: {
      en: 'A seat belt in the car has not been fastened.',
      ar: 'أحد أحزمة الأمان في السيارة غير مربوط.',
      ckb: 'یەکێک لە پشتێنەکانی سەلامەتی لە ئۆتۆمبێلەکەدا نەبەستراوە.',
    },
  },
  {
    id: 'dash-press-clutch-pedal', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-press-clutch-pedal.png'),
    title: { en: 'Press the clutch', ar: 'اضغط دواسة القابض', ckb: 'پێدانی کلاچ دابگرە' },
    meaning: {
      en: 'A prompt to press the clutch pedal, usually before the engine will start.',
      ar: 'تنبيه للضغط على دواسة القابض، عادةً قبل أن يبدأ المحرك بالعمل.',
      ckb: 'ئاگادارییەکە بۆ داگرتنی پێدانی کلاچ، بەزۆری پێش ئەوەی بزوێنەرەکە کار بکات.',
    },
  },
  {
    id: 'dash-powertrain-fault', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-powertrain-fault.png'),
    title: { en: 'Powertrain fault', ar: 'خلل في مجموعة نقل الحركة', ckb: 'کێشە لە سیستەمی وزە' },
    meaning: {
      en: 'A fault has been detected in the powertrain or the all-wheel-drive system.',
      ar: 'اكتُشف خلل في مجموعة نقل الحركة أو نظام الدفع الرباعي.',
      ckb: 'کێشەیەک لە سیستەمی گواستنەوەی وزە یان سیستەمی هەردوو ئەقس دۆزراوەتەوە.',
    },
  },
  {
    id: 'dash-power-steering', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-power-steering.png'),
    title: { en: 'Power steering', ar: 'مقود القوة', ckb: 'ئستیرنی هێزدار' },
    meaning: {
      en: 'There is a problem with the power steering, and the assistance is disabled until it is repaired.',
      ar: 'هناك مشكلة في نظام مقود القوة، وسيبقى التعزيز معطلًا حتى الإصلاح.',
      ckb: 'کێشەیەک لە سیستەمی ئستیرنی هێزداردا هەیە، و یارمەتیدانەکە ناچالاک دەبێت هەتا چاک دەکرێتەوە.',
    },
    action: {
      en: 'Expect the steering to feel very heavy, especially when parking.',
      ar: 'توقّع أن يصبح المقود ثقيلًا جدًا، خصوصًا عند ركن السيارة.',
      ckb: 'چاوەڕێ بکە ئستیرنەکە زۆر قورس بێت، بەتایبەتی لە کاتی پارککردندا.',
    },
  },
  {
    id: 'dash-press-brake-pedal', colour: 'green', verified: true, source: S,
    image: require('@/assets/dashboard/dash-press-brake-pedal.png'),
    title: { en: 'Press the brake', ar: 'اضغط دواسة الفرامل', ckb: 'پێدانی بڕێک دابگرە' },
    meaning: {
      en: 'A prompt to press the brake pedal, usually before starting or shifting out of park.',
      ar: 'تنبيه للضغط على دواسة الفرامل، عادةً قبل التشغيل أو الخروج من وضع الركن.',
      ckb: 'ئاگادارییەکە بۆ داگرتنی پێدانی بڕێک، بەزۆری پێش پێکردن یان دەرچوون لە دۆخی پارک.',
    },
  },
  {
    id: 'dash-parking-brake', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-parking-brake.png'),
    title: { en: 'Parking brake on', ar: 'فرملة الركن مشدودة', ckb: 'بڕێکی پارک گیراوە' },
    meaning: {
      en: 'The parking brake is applied.',
      ar: 'فرملة الركن مشدودة.',
      ckb: 'بڕێکی پارک گیراوە.',
    },
  },
  {
    id: 'dash-overdrive-off', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-overdrive-off.png'),
    title: { en: 'Overdrive off', ar: 'إيقاف الأوفردرايف', ckb: 'ئۆڤەردرایڤ کوژێنراوەتەوە' },
    meaning: {
      en: "The car's overdrive top gear has been switched off by hand.",
      ar: 'تم إيقاف الترس الأعلى (الأوفردرايف) يدويًا.',
      ckb: 'گێڕی بەرزی ئۆڤەردرایڤ بە دەست کوژێنراوەتەوە.',
    },
  },
  {
    id: 'dash-oil-change-reminder', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-oil-change-reminder.png'),
    title: { en: 'Oil change due', ar: 'موعد تغيير الزيت', ckb: 'کاتی گۆڕینی زەیت' },
    meaning: {
      en: 'The service interval has been reached and the oil needs changing.',
      ar: 'انتهت مدة الخدمة وحان وقت تغيير الزيت.',
      ckb: 'ماوەی خزمەتگوزاری تەواو بووە و پێویستە زەیت بگۆڕدرێت.',
    },
  },
  {
    id: 'dash-master-warning', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-master-warning.png'),
    title: { en: 'Master warning', ar: 'التحذير الرئيسي', ckb: 'ئاگاداری سەرەکی' },
    meaning: {
      en: 'A general alert that comes on with another lamp or a message. Read the display to find the real fault.',
      ar: 'تنبيه عام يظهر مع مصباح آخر أو رسالة. اقرأ الشاشة لمعرفة الخلل الفعلي.',
      ckb: 'ئاگادارییەکی گشتییە کە لەگەڵ چرایەکی تر یان نامەیەک دەردەکەوێت. پیشاندەرەکە بخوێنەوە بۆ زانینی کێشە ڕاستەقینەکە.',
    },
  },
  {
    id: 'dash-information', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-information.png'),
    title: { en: 'Information message', ar: 'رسالة معلومات', ckb: 'نامەی زانیاری' },
    meaning: {
      en: 'A new message is waiting in the information display. Its colour reflects how serious it is.',
      ar: 'هناك رسالة جديدة في شاشة المعلومات، ولونها يدل على درجة أهميتها.',
      ckb: 'نامەیەکی نوێ لە پیشاندەری زانیاریدا چاوەڕوانە. ڕەنگەکەی گرنگی نامەکە دەردەخات.',
    },
  },
  {
    id: 'dash-icy-road', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-icy-road.png'),
    title: { en: 'Icy road warning', ar: 'تحذير من تجمّد الطريق', ckb: 'ئاگاداری ڕێگای بەستوو' },
    meaning: {
      en: 'The outside temperature has dropped near freezing, so ice is possible.',
      ar: 'انخفضت درجة الحرارة الخارجية قرب التجمّد، لذا قد يتكوّن الجليد.',
      ckb: 'پلەی گەرمی دەرەوە بەرەو خاڵی بەستن دابەزیوە، بۆیە لەوانەیە سەهۆڵ دروست بێت.',
    },
    action: {
      en: 'Slow down and leave a much bigger gap, because bridges freeze first.',
      ar: 'خفّف السرعة واترك مسافة أكبر بكثير، فالجسور تتجمّد أولًا.',
      ckb: 'خێراییەکەت کەم بکەرەوە و مەودایەکی زۆر گەورەتر بهێڵەرەوە، چونکە پردەکان یەکەم جار دەبەستن.',
    },
  },
  {
    id: 'dash-fuel-cap', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-fuel-cap.png'),
    title: { en: 'Fuel cap', ar: 'غطاء خزان الوقود', ckb: 'سەرپۆشی تانکی سووتەمەنی' },
    meaning: {
      en: 'The fuel cap is loose or not sealed properly.',
      ar: 'غطاء خزان الوقود غير محكم الإغلاق.',
      ckb: 'سەرپۆشی تانکی سووتەمەنی شل یان بە دروستی داخراو نییە.',
    },
  },
  {
    id: 'dash-esp-fault', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-esp-fault.png'),
    title: { en: 'Stability control fault', ar: 'خلل في نظام الثبات', ckb: 'کێشە لە سیستەمی جێگیری' },
    meaning: {
      en: "There is a problem with the car's stability or traction control system.",
      ar: 'هناك مشكلة في نظام الثبات أو التحكم بالجر في السيارة.',
      ckb: 'کێشەیەک لە سیستەمی جێگیری یان کۆنترۆڵی گرتنی ئۆتۆمبێلەکەدا هەیە.',
    },
  },
  {
    id: 'dash-electric-park-brake', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-electric-park-brake.png'),
    title: { en: 'Electric parking brake', ar: 'فرملة الركن الكهربائية', ckb: 'بڕێکی پارکی کارەبایی' },
    meaning: {
      en: 'The electric parking brake has a fault.',
      ar: 'هناك خلل في فرملة الركن الكهربائية.',
      ckb: 'بڕێکی پارکی کارەبایی کێشەی هەیە.',
    },
  },
  {
    id: 'dash-distance-warning', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-distance-warning.png'),
    title: { en: 'Distance warning', ar: 'تحذير المسافة', ckb: 'ئاگاداری مەودا' },
    meaning: {
      en: 'You are too close to the vehicle ahead, closing on it too fast, or there is an obstacle in your path.',
      ar: 'أنت قريب جدًا من المركبة التي أمامك أو تقترب منها بسرعة كبيرة، أو هناك عائق في مسارك.',
      ckb: 'زۆر لە ئۆتۆمبێلی پێشەوە نزیکیت، یان بە خێرایی لێی نزیک دەبیتەوە، یان تەگەرەیەک لە ڕێگاکەتدایە.',
    },
    action: {
      en: 'Ease off and drop back to a safe following distance.',
      ar: 'خفّف السرعة وابتعد لمسافة أمان مناسبة.',
      ckb: 'خێراییەکەت کەم بکەرەوە و بۆ مەودایەکی سەلامەت دووربکەرەوە.',
    },
  },
  {
    id: 'dash-clogged-air-filter', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-clogged-air-filter.png'),
    title: { en: 'Clogged air filter', ar: 'انسداد فلتر الهواء', ckb: 'فلتەری هەوای گیراو' },
    meaning: {
      en: 'Airflow to the engine has dropped. The air filter needs inspecting or replacing.',
      ar: 'انخفض تدفق الهواء إلى المحرك. يحتاج فلتر الهواء إلى الفحص أو التبديل.',
      ckb: 'ڕۆیشتنی هەوا بۆ بزوێنەر کەم بووەتەوە. پێویستە فلتەری هەوا بپشکنرێت یان بگۆڕدرێت.',
    },
  },
  {
    id: 'dash-child-safety-lock', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-child-safety-lock.png'),
    title: { en: 'Child safety lock', ar: 'قفل أمان الأطفال', ckb: 'قوفڵی سەلامەتی منداڵ' },
    meaning: {
      en: 'The child safety lock is engaged, so the rear doors cannot be opened from inside.',
      ar: 'قفل أمان الأطفال مفعّل، فلا يمكن فتح الأبواب الخلفية من الداخل.',
      ckb: 'قوفڵی سەلامەتی منداڵ چالاکە، بۆیە دەرگاکانی دواوە لە ناوەوە ناکرێنەوە.',
    },
  },
  {
    id: 'dash-check-engine', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-check-engine.png'),
    title: { en: 'Check engine', ar: 'افحص المحرك', ckb: 'بزوێنەر بپشکنە' },
    meaning: {
      en: 'It lights briefly at every start as a bulb check. If it stays on, the diagnostic system has found a fault. A flashing light means a serious misfire.',
      ar: 'يضيء لحظيًا عند كل تشغيل للتأكد من سلامة المصباح. وإذا بقي مضاءً فقد اكتشف نظام التشخيص خللًا. أما وميضه فيدل على احتراق غير منتظم خطير.',
      ckb: 'لە هەر پێکردنێکدا بۆ ساتێک داگیرسێت وەک پشکنینی گڵۆپەکە. ئەگەر داگیرساو مایەوە، سیستەمی دەستنیشانکردن کێشەیەکی دۆزیوەتەوە. ئەگەر بلیسەی دا، واتا کێشەیەکی جددی لە سووتاندندا هەیە.',
    },
    action: {
      en: 'A steady light means have it read soon. A flashing light means stop driving, because it can wreck the catalytic converter.',
      ar: 'الضوء الثابت يعني افحصه قريبًا. أما الوميض فيعني توقف عن القيادة، إذ قد يُتلف المحوّل الحفّاز.',
      ckb: 'ڕووناکی جێگیر واتا بەم زووانە بیپشکنە. بلیسەدان واتا لە لێخوڕین بوەستە، چونکە دەکرێت کاتالیتیک کۆنڤێرتەر تێکبدات.',
    },
  },
  {
    id: 'dash-catalytic-converter', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-catalytic-converter.png'),
    title: { en: 'Catalytic converter', ar: 'المحوّل الحفّاز', ckb: 'کاتالیتیک کۆنڤێرتەر' },
    meaning: {
      en: 'The catalytic converter is overheating or not working as it should.',
      ar: 'المحوّل الحفّاز يسخن بشكل زائد أو لا يعمل كما ينبغي.',
      ckb: 'کاتالیتیک کۆنڤێرتەر زیاد لە پێویست گەرم دەبێت یان وەک پێویست کار ناکات.',
    },
  },
  {
    id: 'dash-brake-fluid', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-brake-fluid.png'),
    title: { en: 'Brake fluid low', ar: 'انخفاض سائل الفرامل', ckb: 'کەمی شلەی بڕێک' },
    meaning: {
      en: 'The brake fluid level is low.',
      ar: 'مستوى سائل الفرامل منخفض.',
      ckb: 'ئاستی شلەی بڕێک نزمە.',
    },
    action: {
      en: 'Top it up and find the leak, because brake fluid does not get used up on its own.',
      ar: 'أضف السائل وابحث عن التسريب، فسائل الفرامل لا ينفد من تلقاء نفسه.',
      ckb: 'پڕی بکەرەوە و بەدوای دزەکردنەکەدا بگەڕێ، چونکە شلەی بڕێک خۆی بەخۆی تەواو نابێت.',
    },
  },
  {
    id: 'dash-brake-pad', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-brake-pad.png'),
    title: { en: 'Brake pads worn', ar: 'تآكل تيل الفرامل', ckb: 'ساییەوەی بڕێک' },
    meaning: {
      en: 'The brake pads have worn down and need replacing.',
      ar: 'تآكل تيل الفرامل ويحتاج إلى التبديل.',
      ckb: 'پەڕەکانی بڕێک ساوەتەوە و پێویستە بگۆڕدرێن.',
    },
  },
  {
    id: 'dash-brake-lights-fault', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-brake-lights-fault.png'),
    title: { en: 'Brake light fault', ar: 'خلل في أضواء الفرامل', ckb: 'کێشە لە چرای بڕێک' },
    meaning: {
      en: 'One of the outside brake light bulbs has failed.',
      ar: 'أحد مصابيح الفرامل الخارجية معطّل.',
      ckb: 'یەکێک لە گڵۆپەکانی دەرەوەی بڕێک خراپ بووە.',
    },
  },
  {
    id: 'dash-automatic-gearbox', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-automatic-gearbox.png'),
    title: { en: 'Automatic gearbox', ar: 'ناقل الحركة الأوتوماتيكي', ckb: 'گێڕبۆکسی ئۆتۆماتیک' },
    meaning: {
      en: 'There is a fault in the gearbox or transmission.',
      ar: 'هناك خلل في ناقل الحركة.',
      ckb: 'کێشەیەک لە گێڕبۆکس یان گواستنەوەی هێزدا هەیە.',
    },
  },
  {
    id: 'dash-abs', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-abs.png'),
    title: { en: 'ABS', ar: 'نظام منع انغلاق الفرامل', ckb: 'ABS' },
    meaning: {
      en: 'There may be a fault in the anti-lock braking system. The brakes still work, but the wheels can lock under hard braking.',
      ar: 'قد يكون هناك خلل في نظام منع انغلاق الفرامل. تبقى الفرامل تعمل، لكن قد تنغلق العجلات عند الكبح الشديد.',
      ckb: 'لەوانەیە کێشەیەک لە سیستەمی ABS دا هەبێت. بڕێکەکان هێشتا کار دەکەن، بەڵام لە کاتی بڕێکی توندا چەرخەکان دەتوانن قوفڵ ببن.',
    },
  },
  {
    id: 'dash-awd-4wd', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-awd-4wd.png'),
    title: { en: 'All-wheel drive', ar: 'الدفع الرباعي', ckb: 'هەردوو ئەقس' },
    meaning: {
      en: 'There is a malfunction in the four-wheel-drive system.',
      ar: 'هناك خلل في نظام الدفع الرباعي.',
      ckb: 'کێشەیەک لە سیستەمی هەردوو ئەقسدا هەیە.',
    },
  },
  {
    id: 'dash-airbag-fault', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-airbag-fault.png'),
    title: { en: 'Airbag fault', ar: 'خلل في الوسادة الهوائية', ckb: 'کێشە لە ئێرباگ' },
    meaning: {
      en: 'There is a fault in the airbag or seat-belt tensioner system, so it may not work in a crash.',
      ar: 'هناك خلل في نظام الوسائد الهوائية أو شدّادات أحزمة الأمان، وقد لا يعمل عند الاصطدام.',
      ckb: 'کێشەیەک لە سیستەمی ئێرباگ یان توندکەرەوەی پشتێندا هەیە، لەوانەیە لە کاتی پێکدادانەکەدا کار نەکات.',
    },
  },
  {
    id: 'dash-airbag-deactivated', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-airbag-deactivated.png'),
    title: { en: 'Passenger airbag off', ar: 'إيقاف وسادة الراكب الهوائية', ckb: 'ئێرباگی سەرنشین کوژێنراوەتەوە' },
    meaning: {
      en: 'The front passenger airbag has been switched off, normally so a rear-facing child seat can be fitted.',
      ar: 'تم إيقاف الوسادة الهوائية للراكب الأمامي، عادةً لتركيب مقعد أطفال يواجه الخلف.',
      ckb: 'ئێرباگی سەرنشینی پێشەوە کوژێنراوەتەوە، بەزۆری بۆ دانانی کورسی منداڵی ڕووەو دواوە.',
    },
  },
  {
    id: 'dash-adaptive-suspension', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-adaptive-suspension.png'),
    title: { en: 'Adaptive dampers', ar: 'المخمدات التكيّفية', ckb: 'دامپەری گونجاو' },
    meaning: {
      en: 'The adaptive suspension needs attention from an approved repairer.',
      ar: 'يحتاج نظام التعليق التكيّفي إلى فحص لدى ورشة معتمدة.',
      ckb: 'سیستەمی هەڵواسینی گونجاو پێویستی بە پشکنینە لەلایەن کارگەیەکی پەسەندکراو.',
    },
  },
  {
    id: 'dash-4wd-lock', colour: 'amber', verified: true, source: S,
    image: require('@/assets/dashboard/dash-4wd-lock.png'),
    title: { en: '4WD lock', ar: 'قفل الدفع الرباعي', ckb: 'قوفڵی هەردوو ئەقس' },
    meaning: {
      en: 'Four-wheel-drive lock mode is switched on.',
      ar: 'وضع قفل الدفع الرباعي مفعّل.',
      ckb: 'دۆخی قوفڵی هەردوو ئەقس چالاکە.',
    },
  },
  {
    id: 'dash-air-suspension', colour: 'red', verified: true, source: S,
    image: require('@/assets/dashboard/dash-air-suspension.png'),
    title: { en: 'Air suspension', ar: 'التعليق الهوائي', ckb: 'هەڵواسینی هەوایی' },
    meaning: {
      en: 'There is a problem with the air suspension bags, most often a leak or an inflation fault.',
      ar: 'هناك مشكلة في وسائد التعليق الهوائي، غالبًا تسريب أو خلل في النفخ.',
      ckb: 'کێشەیەک لە کیسەکانی هەڵواسینی هەوایی هەیە، زۆرجار دزەکردن یان کێشەی پڕکردنەوە.',
    },
  },
];
