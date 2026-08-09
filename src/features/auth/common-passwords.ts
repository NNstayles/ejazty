/**
 * Base words that must not be used as passwords.
 *
 * ## Why a bundled list rather than a breach API
 *
 * NIST SP 800-63B §5.1.1.2 requires that new passwords be compared against "a
 * list that contains values known to be commonly-used, expected, or
 * compromised", and explicitly allows a *curated* list rather than a full breach
 * corpus. Supabase's own leaked-password check (HIBP) does the corpus version
 * server-side, but it is a paid-plan feature — and reaching HIBP's API from the
 * client would add a third-party network call to an app that deliberately talks
 * to nothing but Supabase, plus an app-store privacy disclosure, for a long tail
 * of passwords no real user picks.
 *
 * This list costs one string comparison, works offline, and catches what people
 * actually choose. The two compose: turn the Supabase toggle on when the project
 * moves to Pro and the long tail is covered too.
 *
 * ## These are *bases*, not whole passwords
 *
 * `MIN_PASSWORD_LENGTH` is 8, so a literal `123456` can never be set anyway and
 * listing it would be dead weight. What people do instead is pad a common word
 * to reach the minimum — `password1`, `Qwerty123`, `dragon2024`. So
 * `password-strength.ts` strips trailing digits and punctuation and undoes leet
 * substitutions before checking here, which means one entry covers the whole
 * family:
 *
 *   password · password1 · Password123 · P@ssw0rd! · passw0rd2024
 *
 * That is why the list is short. Adding `password1` here would be redundant.
 *
 * ## Region-specific entries are deliberate
 *
 * Published "worst password" rankings are overwhelmingly Anglophone and miss
 * what an Iraqi audience actually picks. The transliterated Arabic and Kurdish
 * names, places and phrases below are the entries most likely to earn their
 * keep for *this* app, and they are the ones a generic list would never have.
 *
 * Entries are lowercase and are matched after normalisation. Keep them as bare
 * words: a suffix or a capital here does nothing that the normaliser does not
 * already handle.
 */
export const COMMON_PASSWORD_BASES: ReadonlySet<string> = new Set([
  // ---------------------------------------------------------------------
  // The perennial top of every published ranking
  // ---------------------------------------------------------------------
  'password', 'passwd', 'pass', 'letmein', 'welcome', 'admin', 'administrator',
  'login', 'root', 'guest', 'user', 'test', 'demo', 'default', 'changeme',
  'secret', 'access', 'master', 'super', 'system', 'manager', 'server',

  // Keyboard walks. The structural check catches unbroken runs; these are the
  // ones that read as words and survive stripping.
  'qwerty', 'qwertyuiop', 'asdfgh', 'asdfghjkl', 'zxcvbn', 'zxcvbnm',
  'qazwsx', 'qwertz', 'azerty', 'wasd', 'poiuy', 'lkjhg', 'mnbvcxz',
  'qweasd', 'qweasdzxc', 'asdzxc', '1qaz2wsx', 'zaqwsx', 'qwer', 'asdf', 'zxcv',

  // ---------------------------------------------------------------------
  // Words and phrases
  // ---------------------------------------------------------------------
  'iloveyou', 'loveyou', 'lovely', 'forever', 'princess', 'sunshine',
  'freedom', 'whatever', 'trustno', 'trustnoone', 'nothing', 'friend',
  'friends', 'family', 'happy', 'hello', 'helloworld', 'goodbye', 'please',
  'money', 'winner', 'summer', 'winter', 'spring', 'autumn', 'flower',
  'butterfly', 'chocolate', 'cookie', 'coffee', 'orange', 'purple', 'yellow',
  'silver', 'golden', 'diamond', 'crystal', 'shadow', 'phoenix', 'thunder',
  'lightning', 'warrior', 'hunter', 'ranger', 'legend', 'champion', 'victory',
  'destiny', 'miracle', 'angel', 'heaven', 'paradise', 'dream', 'dreamer',
  'believe', 'blessed', 'peace', 'hope', 'faith', 'lucky', 'magic', 'ninja',
  'samurai', 'gangster', 'killer', 'sniper', 'hacker', 'matrix', 'cyber',

  // Animals and creatures — a whole genre of the rankings
  'dragon', 'monkey', 'tiger', 'lion', 'eagle', 'falcon', 'panther', 'cobra',
  'viper', 'wolf', 'wolves', 'bear', 'shark', 'dolphin', 'horse', 'mustang',
  'stallion', 'rabbit', 'kitten', 'puppy', 'doggy', 'birdie',

  // Sport and pop culture
  'football', 'baseball', 'basketball', 'soccer', 'hockey', 'cricket',
  'tennis', 'boxing', 'chelsea', 'arsenal', 'liverpool', 'barcelona',
  'realmadrid', 'juventus', 'ronaldo', 'messi', 'united', 'manutd', 'madrid',
  'starwars', 'superman', 'batman', 'spiderman', 'pokemon', 'naruto',
  'minecraft', 'fortnite', 'playstation', 'nintendo', 'gaming', 'gamer',

  // Brands and services people reuse
  'google', 'facebook', 'youtube', 'twitter', 'instagram', 'snapchat',
  'tiktok', 'whatsapp', 'telegram', 'samsung', 'iphone', 'apple', 'android',
  'microsoft', 'windows', 'internet', 'computer', 'laptop', 'mobile',

  // ---------------------------------------------------------------------
  // Names — Anglophone
  // ---------------------------------------------------------------------
  'michael', 'jennifer', 'jessica', 'daniel', 'thomas', 'joshua', 'matthew',
  'andrew', 'charlie', 'jordan', 'hunter', 'george', 'william', 'robert',
  'richard', 'nicole', 'ashley', 'amanda', 'melissa', 'jasmine', 'natasha',
  'anthony', 'patrick', 'stephen', 'vincent', 'maria', 'sophia', 'olivia',

  // ---------------------------------------------------------------------
  // Region-specific. See the note above — these are the entries a generic
  // English list would miss entirely, and they are the likeliest to matter
  // for this app's actual audience.
  // ---------------------------------------------------------------------
  // Given names, in the transliterations people type on a Latin keyboard
  'mohammed', 'muhammad', 'mohamed', 'mohammad', 'muhammed', 'ahmed', 'ahmad',
  'mahmoud', 'mahmood', 'mustafa', 'mostafa', 'hassan', 'hasan', 'hussein',
  'hussain', 'husein', 'ali', 'omar', 'othman', 'abdullah', 'abdallah',
  'abdulrahman', 'abdulaziz', 'khalid', 'khaled', 'karim', 'kareem', 'yousef',
  'yusuf', 'youssef', 'ibrahim', 'ismail', 'jasim', 'qasim', 'kadhim',
  'sajjad', 'haider', 'hayder', 'zaid', 'zaid', 'saif', 'laith', 'bilal',
  'tariq', 'walid', 'ayman', 'nabil', 'samir', 'rami', 'firas', 'ammar',
  'fatima', 'fatma', 'zainab', 'zaynab', 'maryam', 'mariam', 'noor', 'nour',
  'huda', 'hiba', 'rania', 'rasha', 'shatha', 'dina', 'lina', 'reem',
  'sara', 'sarah', 'zahra', 'ruqaya', 'aisha', 'khadija', 'amal', 'israa',
  // Kurdish given names
  'rebaz', 'aram', 'dilan', 'diyar', 'hawkar', 'karwan', 'peshraw', 'rzgar',
  'shwan', 'sarbast', 'bahoz', 'hemin', 'kawa', 'shexo', 'rojin', 'evin',
  'berivan', 'shilan', 'nazdar', 'gulan', 'chnar', 'lana', 'helin',
  // Places
  'iraq', 'iraqi', 'baghdad', 'basra', 'basrah', 'mosul', 'najaf', 'karbala',
  'kirkuk', 'ramadi', 'fallujah', 'samarra', 'nasiriyah', 'diwaniya',
  'kurdistan', 'kurd', 'kurdi', 'erbil', 'hawler', 'sulaymaniyah', 'slemani',
  'duhok', 'dohuk', 'zakho', 'halabja', 'akre', 'soran', 'rania',
  'baghdadi', 'mesopotamia', 'furat', 'dijla', 'tigris', 'euphrates',
  // Words and phrases in transliteration
  'habibi', 'habibti', 'hayati', 'omri', 'salam', 'salaam', 'marhaba',
  'shukran', 'yalla', 'inshallah', 'mashallah', 'alhamdulillah', 'bismillah',
  'allah', 'allahu', 'akbar', 'islam', 'muslim', 'quran', 'koran', 'ramadan',
  'eid', 'jannah', 'sabah', 'layla', 'leila', 'shams', 'qamar', 'najma',
  'asad', 'nasr', 'watan', 'hurriya', 'salaam', 'azadi', 'kurda', 'newroz',
  'nawroz', 'peshmerga', 'zorbash', 'supas', 'silav', 'roj', 'rojava',

  // ---------------------------------------------------------------------
  // Context-specific. NIST calls these out by name: the service's own
  // vocabulary is exactly what users reach for.
  // ---------------------------------------------------------------------
  'ejazty', 'ejaza', 'ijaza', 'driving', 'driver', 'drive', 'license',
  'licence', 'permit', 'traffic', 'roadsign', 'highway', 'motor', 'vehicle',
  'car', 'cars', 'toyota', 'hyundai', 'nissan', 'kia', 'honda', 'bmw',
  'mercedes', 'lexus', 'prado', 'landcruiser', 'exam', 'test', 'study',
  'student', 'school', 'teacher', 'lesson', 'theory',
]);
