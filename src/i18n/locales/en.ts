/**
 * English is the source of truth for the translation shape. `ar` and `ckb` are
 * typed against `TranslationShape`, so a missing or misspelled key in either of
 * them is a compile error rather than a silent fallback at runtime.
 */
const en = {
  common: {
    appName: 'Ejazty',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    cancel: 'Cancel',
    close: 'Close',
    retry: 'Try again',
    loading: 'Loading…',
    error: 'Something went wrong',
    done: 'Done',
    of: 'of',
  },
  onboarding: {
    chooseLanguage: 'Choose your language',
    chooseLanguageSubtitle: 'You can change this later in Settings.',
    tagline: 'Pass your theoretical driving exam — first try.',
  },
  auth: {
    signInTitle: 'Welcome back',
    signInSubtitle: 'Sign in to keep your progress in sync.',
    signUpTitle: 'Create your account',
    signUpSubtitle: 'Track your scores and pick up where you left off.',
    email: 'Email',
    password: 'Password',
    fullName: 'Full name',
    signIn: 'Sign in',
    signUp: 'Create account',
    signOut: 'Sign out',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    checkEmail: 'Check your email to confirm your account, then sign in.',
    continueAsGuest: 'Explore without an account',
    guest: 'Guest',
    notConfigured:
      'Sign-in is not configured yet. Add your Supabase URL and anon key to .env, then restart the app.',
    invalidEmail: 'Enter a valid email address.',
    passwordTooShort: 'Password must be at least 8 characters.',
    nameRequired: 'Enter your name.',
  },
  tabs: {
    learn: 'Learn',
    exam: 'Exam',
    settings: 'Settings',
  },
  learn: {
    title: 'Learn',
    subtitle: 'Official material, organised by topic.',
    signs: 'Traffic signs',
    signsDesc: 'Shapes, colours and what each sign requires of you.',
    violations: 'Traffic violations',
    violationsDesc: 'Offences, penalties and how to avoid them.',
    rules: 'Traffic rules',
    rulesDesc: 'Speed, lanes, documents and general conduct.',
    priority: 'Road priority',
    priorityDesc: 'Who goes first at junctions, circles and narrow roads.',
    itemsCount: '{{count}} topics',
    empty: 'No material here yet.',
    meaning: 'What it means',
    whatToDo: 'What you must do',
    penalty: 'Penalty',
    source: 'Source',
  },
  exam: {
    title: 'Exam',
    subtitle: 'Train, then simulate the real thing.',
    quick: 'Quick exam',
    quickDesc: 'A fast warm-up to keep the material fresh.',
    medium: 'Medium exam',
    mediumDesc: 'A longer set to test your consistency.',
    full: 'Full mock exam',
    fullDesc: 'Official simulation, timed like the real exam.',
    questions: '{{count}} questions',
    minutes: '{{count}} min',
    noTimer: 'No timer',
    start: 'Start exam',
    questionProgress: 'Question {{current}} of {{total}}',
    submit: 'Submit exam',
    finish: 'Finish',
    quitTitle: 'Leave the exam?',
    quitMessage: 'Your answers on this attempt will be lost.',
    quitConfirm: 'Leave',
    timeUp: "Time's up",
    timeUpMessage: 'Your exam was submitted automatically.',
    unanswered: 'You have {{count}} unanswered questions. Submit anyway?',
    notEnough:
      'Not enough questions in the official source yet to run this exam. Add the official material to enable it.',
  },
  result: {
    title: 'Result',
    passed: 'Passed',
    failed: 'Not passed',
    passedMessage: 'Well done. Keep the streak going.',
    failedMessage: 'Close. Review your mistakes and go again.',
    score: 'Score',
    correct: 'Correct',
    wrong: 'Wrong',
    skipped: 'Skipped',
    passMark: 'Pass mark: {{percent}}%',
    review: 'Review answers',
    retake: 'Retake exam',
    backToExams: 'Back to exams',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    noAnswer: 'Not answered',
    explanation: 'Explanation',
  },
  settings: {
    title: 'Settings',
    account: 'Account',
    app: 'App',
    language: 'Language',
    theme: 'Appearance',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'Follow system',
    notifications: 'Study reminders',
    notificationsDesc: 'A nudge every 6 hours, in your language.',
    notificationsBlocked:
      'Notifications are turned off for Ejazty in your device settings.',
    openSettings: 'Open device settings',
    about: 'About',
    version: 'Version',
    sources: 'Content sources',
    signedInAs: 'Signed in as',
  },
  content: {
    sampleTitle: 'Sample content',
    sampleBody:
      'This material is placeholder text for layout only. It is not official and must not be used to study. Replace it with the ministry source.',
    unofficial: 'SAMPLE',
  },
  notifications: {
    channelName: 'Study reminders',
    items: {
      didntStudy: {
        title: "Someone just failed because they didn't study…",
        body: "Don't be that person 😅",
      },
      licenseWaiting: {
        title: 'Your driving license is waiting…',
        body: "Your exam score isn't 😄",
      },
      stopScrolling: {
        title: 'Stop scrolling.',
        body: 'Start driving (legally).',
      },
      stopSign: {
        title: "That STOP sign won't memorize itself.",
        body: '',
      },
      beatYesterday: {
        title: '10 questions. 3 minutes.',
        body: "Can you beat yesterday's score?",
      },
      redMeansStop: {
        title: 'Red means stop.',
        body: "Ignoring this notification doesn't.",
      },
      futureYou: {
        title: 'Future you says:',
        body: '"Thanks for studying today."',
      },
      firstAttempt: {
        title: 'Imagine passing from the first attempt…',
        body: "Let's make it happen.",
      },
      oneQuickExam: {
        title: 'Only one quick exam today.',
        body: 'Your future license will thank you.',
      },
      examinerPractising: {
        title: 'Your driving examiner is practicing too.',
        body: 'You should too.',
      },
      parkingSpot: {
        title: 'We saved your parking spot…',
        body: 'Now come finish your exam.',
      },
      realChallenge: {
        title: 'Ready for the real challenge?',
        body: 'Try the Full Mock Exam.',
      },
      proveIt: {
        title: 'You learned everything.',
        body: 'Now prove it.',
      },
    },
  },
} as const;

/** Mirrors the `en` tree exactly, with every leaf widened to `string`. */
type Translated<T> = {
  [K in keyof T]: T[K] extends string ? string : Translated<T[K]>;
};

export type TranslationShape = Translated<typeof en>;

export default en;
