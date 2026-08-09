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
    error: 'Something went wrong',
    /** Crash-screen detail line. Replaces the raw error text in release builds. */
    errorDetail: 'Please restart the app. If this keeps happening, reinstall it.',
  },
  /**
   * Relative dates, built from `lib/dates.ts`.
   *
   * Relative rather than absolute deliberately: Hermes ships a cut-down ICU and
   * what a build resolves for `ar-IQ` or `ckb` is not something this project can
   * assert, so an absolute date risks the wrong calendar or English month names
   * on one platform only. "3 days ago" needs no locale data at all.
   */
  time: {
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: '{{count}} days ago',
    daysAgo_one: '{{count}} day ago',
    weeksAgo: '{{count}} weeks ago',
    weeksAgo_one: '{{count}} week ago',
    monthsAgo: '{{count}} months ago',
    monthsAgo_one: '{{count}} month ago',
    yearsAgo: '{{count}} years ago',
    yearsAgo_one: '{{count}} year ago',
    /** A timestamp that would not parse. See `relativeDayKey`. */
    unknown: '',
  },
  onboarding: {
    chooseLanguage: 'Choose your language',
    chooseLanguageSubtitle: 'You can change this later in Settings.',
    tagline: 'Pass your theoretical driving exam on your first try.',
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
    // Separate from `invalidEmail`: an empty box and a malformed address are
    // different mistakes, and "enter a valid email address" over an empty field
    // reads as a complaint about something that was never typed.
    emailRequired: 'Enter your email address.',
    passwordRequired: 'Enter your password.',
    showPassword: 'Show password',
    unlockPrompt: 'Unlock Ejazty',
    unlock: 'Unlock',
    orContinueWith: 'or continue with',
    continueWithGoogle: 'Continue with Google',
    signingIn: 'Signing in…',
    lockedTitle: 'Ejazty is locked',
    lockedSubtitle:
      'Use your face or fingerprint to continue. If that is not working, sign out and use your password.',
    hidePassword: 'Hide password',
    passwordTooShort: 'Password must be at least 8 characters.',
    passwordTooWeak:
      'That password is too easy to guess. Try a few unrelated words instead of a common word with numbers on the end.',
    /**
     * The standing hint under a password box on the three screens where a
     * password is *chosen* — sign-up, reset, and the account screen.
     *
     * States the requirement and points at the shape that satisfies it. It is
     * deliberately not a strength score: see the heading in
     * `features/auth/password-strength.ts` for why a meter rewards exactly the
     * passwords that are easiest to crack.
     */
    passwordHint:
      'At least 8 characters. A few unrelated words are stronger than one word with numbers on the end.',
    nameRequired: 'Enter your name.',
    nameTooLong: 'That name is too long. Use 80 characters or fewer.',
    forgotPassword: 'Forgot your password?',
    forgotTitle: 'Reset your password',
    forgotSubtitle:
      'Enter the address you signed up with and we will send you a link to set a new password.',
    sendResetLink: 'Send reset link',
    resetLinkSent:
      'If an account exists for that address, a reset link is on its way. Check your inbox.',
    backToSignIn: 'Back to sign in',
    resetTitle: 'Choose a new password',
    resetSubtitle: 'Set a new password for your account.',
    resetChecking: 'Checking your link…',
    resetSave: 'Save new password',
    resetDone: 'Password changed. You are signed in.',
    resetLinkInvalid:
      'This link is no longer valid. Request a new one and try again.',
    requestNewLink: 'Request a new link',
    errors: {
      invalidCredentials: 'Wrong email or password.',
      emailNotConfirmed:
        'Confirm your email address first. Check your inbox for the link.',
      emailExists: 'An account already exists for this email address.',
      weakPassword: 'Choose a stronger password.',
      rateLimited: 'Too many attempts. Wait a moment, then try again.',
      network: 'Could not reach the server. Check your connection.',
      generic: 'Something went wrong. Please try again.',
      samePassword: 'That is already your password. Choose a different one.',
      emailNotAllowed: 'That email address cannot be used.',
      deleteNotSetUp:
        'Account deletion is not set up on the server yet. Ask the app maintainer to apply the delete_own_account migration.',
      sessionExpired: 'Your session has expired. Sign in again to continue.',
      recoveryLinkExpired:
        'This reset link has expired or has already been used. Request a new one.',
      captchaFailed:
        'This app needs to be updated before it can verify this request. Please install the latest version.',
      quotaExceeded:
        'You have reached the maximum number of saved attempts. Delete some older results to save new ones.',
      valueTooLong: 'That value is too long. Try something shorter.',
      oauthFailed:
        'That sign-in did not complete. Try again, or use your email and password.',
    },
  },
  account: {
    title: 'Your account',
    manage: 'Manage your account',
    manageDesc: 'Name, email, password and deletion',
    guestNotice:
      'You are exploring without an account. Create one to change these details and keep your progress.',
    photoSection: 'Profile picture',
    photoAdd: 'Add a picture',
    photoChange: 'Change picture',
    photoRemove: 'Remove picture',
    photoRemoved: 'Picture removed.',
    photoUpdated: 'Picture updated.',
    // Says outright that it is device-only, rather than leaving it to be
    // discovered on a second phone. See `features/profile/avatar.ts`.
    photoNotice: 'Your picture is kept on this device and is never uploaded.',
    photoDenied: 'Ejazty does not have permission to open your photos.',
    photoFailed: 'That picture could not be saved. Try another one.',
    // The small chip on the settings account row, hinting the row is editable.
    photoEdit: 'Edit profile',
    profileSection: 'Profile',
    displayName: 'Display name',
    saveName: 'Save name',
    nameUpdated: 'Name updated.',
    emailSection: 'Email address',
    currentEmail: 'Current address',
    newEmail: 'New address',
    changeEmail: 'Change email',
    emailReauthNotice:
      'Changing your address means whoever controls it can reset your password, so we ask for your current one first.',
    emailChangeRequested:
      'Check both inboxes and confirm the change. Your address stays the same until you do.',
    passwordSection: 'Password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
    changePassword: 'Change password',
    passwordUpdated: 'Password changed.',
    passwordMismatch: 'The two new passwords do not match.',
    currentPasswordRequired: 'Enter your current password to confirm.',
    dangerSection: 'Delete account',
    deleteWarning:
      'This permanently deletes your account and your exam history on this device. It cannot be undone.',
    deleteReauthNotice:
      'This cannot be undone, so we ask for your current password first.',
    deleteAccount: 'Delete my account',
    deleteConfirmTitle: 'Delete your account?',
    deleteConfirmMessage:
      'Your account and your exam history will be permanently deleted. This cannot be undone.',
    deleteConfirmAction: 'Delete permanently',
    /*
      Shown when the account has no password — one created with Apple or Google.
      Every operation below the profile card asks for a current password those
      accounts do not have, so without this the screen is three forms that
      cannot succeed and no way to delete the account at all.

      The wording names the provider rather than saying "your provider", because
      the reader knows which button they pressed and a generic sentence reads as
      the app not knowing who they are.
    */
    noPasswordTitle: 'This account signs in with {{providers}}',
    noPasswordBody:
      'Changing your email, changing your password and deleting your account all need a password, and this account does not have one yet. Set one by email and these will work straight away.',
    /* Fallback for a provider the app has no name for. */
    noPasswordTitleGeneric: 'This account signs in without a password',
    setPassword: 'Email me a link to set a password',
    /*
      Also offered to accounts that *do* have a password, worded as recovery.
      It is the escape hatch: somebody who has forgotten their current password
      would otherwise have to sign out to reach the forgot-password screen, and
      it means a wrong `hasPassword` reading still leaves a working route.
    */
    forgotCurrentPassword: 'Forgotten your current password?',
    passwordLinkSent:
      'If an account exists for that address, a link is on its way. Open it to set a new password.',
    /* Joins provider names in `noPasswordTitle`: "Apple and Google". */
    providerAnd: 'and',
  },
  tabs: {
    learn: 'Learn',
    exam: 'Exam',
    settings: 'Settings',
  },
  learn: {
    // Deliberately carries no `{{name}}`: the name is rendered on its own line
    // so a Latin name never has to share a line box with an Arabic display run.
    welcome: 'Welcome back',
    welcomeSubtitle: 'Pick up where you left off.',
    sectionsLabel: 'Study sections',
    signs: 'Traffic signs',
    signsDesc: 'Shapes, colours and what each sign requires of you.',
    violations: 'Violations and penalties',
    violationsDesc: 'The offences, and what each one costs.',
    rules: 'Traffic rules',
    rulesDesc: 'Speed, overtaking, lanes, parking, lights and weather.',
    priority: 'Road priority',
    priorityDesc: 'Who goes first at junctions, circles and narrow roads.',
    dashboard: 'Dashboard lights',
    dashboardDesc: 'What every warning light on your dashboard is telling you.',
    mechanics: 'Vehicle and maintenance',
    mechanicsDesc: 'Under the bonnet, tyres, the inspection and your licence.',
    firstaid: 'First aid',
    firstaidDesc: 'What to do at the scene, and the injuries you may meet.',
    itemsCount: '{{count}} topics',
    itemsCount_one: '{{count}} topic',
    empty: 'No material here yet.',
    // Labels for the catalogue cards. A study note carries none: its paragraph
    // is shown unlabelled, because an overline over prose reads as a form.
    meaning: 'What it means',
    whatToDo: 'What you must do',
    // Group headings. The dashboard reuses `learn.severity.*` instead of
    // declaring five more — see `groupTitleKey`.
    groups: {
      // Signs
      basics: 'How to read a sign',
      regulatory: 'Regulatory signs',
      warning: 'Warning signs',
      informative: 'Informative signs',
      // Signs the exam asks about that the signs manual does not illustrate —
      // including STOP and Give Way, which the catalogue never carried.
      bank: 'More signs the exam asks about',
      // Rules
      markings: 'Road markings',
      lights: 'Traffic lights',
      speed: 'Speed and distance',
      overtaking: 'Overtaking',
      lanes: 'Lanes, turning and reversing',
      parking: 'Stopping and parking',
      night: 'Lights and night driving',
      weather: 'Weather and road conditions',
      people: 'Pedestrians and passengers',
      conduct: 'The driver and the law',
      situations: 'Reading the road',
      // Priority
      order: 'The order of priority',
      scenarios: 'Situations',
      pictures: 'Worked examples',
      // Violations
      offences: 'The offences',
      penalties: 'How penalties work',
      // Vehicle and maintenance
      cockpit: 'Before you drive off',
      bonnet: 'Under the bonnet',
      care: 'Looking after the engine',
      tyres: 'Tyres',
      faults: 'Faults and warning signs',
      inspection: 'The annual inspection',
      licensing: 'Licences and documents',
      // First aid
      scene: 'At the scene',
      injuries: 'Common injuries',
    },
    searchPlaceholder: 'Search…',
    noMatches: 'Nothing matches “{{query}}”.',
    severity: {
      red: 'Stop now',
      amber: 'Check soon',
      green: 'Switched on',
      blue: 'Switched on',
      white: 'Information',
    },
  },
  exam: {
    title: 'Exam',
    subtitle: 'Train, then simulate the real thing.',
    // The four modes carry a title and two chips and no description. The
    // one-line explanations that used to sit under each were removed on the
    // owner's request: each restated the chips below it, and four of them made
    // a list of four choices into a page to read before choosing.
    quick: 'Quick exam',
    medium: 'Medium exam',
    full: 'Full mock exam',
    open: 'Open practice',
    drill: 'Mistake drill',
    // Shown on the drill card before the learner has got anything wrong. It
    // names the action that fills the drill rather than reporting a lack.
    drillEmpty: 'Sit an exam first — your mistakes collect here.',
    questions: '{{count}} questions',
    questions_one: '{{count}} question',
    allQuestions: 'All {{count}} questions',
    allQuestions_one: 'All {{count}} question',
    // Shown under each choice in open practice once an answer is picked.
    openCorrect: 'Correct',
    openWrong: 'Not quite',
    minutes: '{{count}} min',
    // Declared even though English abbreviates the same way for one, because
    // the stem has to exist here for Arabic to attach its own forms to it.
    minutes_one: '{{count}} min',
    noTimer: 'No timer',
    // Captions on the readiness card's ring and legend. Bare nouns, because the
    // figure itself is already printed beside them.
    passMarkLabel: 'Pass mark',
    poolLabel: 'Questions available',
    // The readiness card. `passRate` is how often attempts went the right way,
    // not the average score — the real test is pass or fail.
    passRate: 'Pass rate',
    passedLabel: 'Passed',
    failedLabel: 'Not passed',
    readyEmpty: 'Sit your first exam to start tracking this.',
    formatsLabel: 'Choose a format',
    startAction: 'Start',
    // The trend card. The mode is named beside the title because the line only
    // ever plots one mode — see the note where the series is built.
    trendTitle: 'Your progress',
    // The unsuffixed key is the mandatory one — every locale must carry it,
    // and i18next falls back to it for any plural form a locale does not
    // declare. See `Translated` at the foot of this file.
    trendCaption: 'Last {{count}} attempts',
    trendCaption_one: 'Last attempt',
    // The change across the plotted window, not against the single previous
    // attempt — the card answers "am I getting better", and one bad morning in
    // the middle of a rising run should not turn it red.
    trendUp: 'Up {{count}} points',
    trendUp_one: 'Up {{count}} point',
    trendDown: 'Down {{count}} points',
    trendDown_one: 'Down {{count}} point',
    trendFlat: 'No change',
    trendBest: 'best {{percent}}%',
    questionProgress: 'Question {{current}} of {{total}}',
    // The whole-paper grid, reached from the position readout in the top bar.
    navigatorTitle: 'All questions',
    navigatorHint: 'Tap a number to jump to that question.',
    questionNumber: 'Question {{number}}',
    answeredCount: '{{answered}} of {{total}} answered',
    // Open practice only. It draws the whole bank, so it has no last card to
    // reach — without this the only way out is Quit, which discards the run.
    finishNow: 'Finish and see results',
    submit: 'Submit exam',
    finish: 'Finish',
    quitTitle: 'Leave the exam?',
    quitMessage: 'Your answers on this attempt will be lost.',
    quitConfirm: 'Leave',
    unanswered: 'You have {{count}} unanswered questions. Submit anyway?',
    unanswered_one: 'You have {{count}} unanswered question. Submit anyway?',
    notEnough:
      'Not enough questions in the official source yet to run this exam. Add the official material to enable it.',
  },
  goal: {
    title: 'Daily goal',
    today: 'Today',
    met: 'Goal reached',
    // The remaining count, which is the actionable reading — "8 to go" is a
    // decision, "12 of 20" is a report.
    remaining: '{{count}} correct answers to go',
    remaining_one: '{{count}} correct answer to go',
    progress: '{{correct}} of {{goal}} correct',
    streak: '{{count}} day streak',
    streak_one: '{{count}} day streak',
    streakNone: 'Meet your goal to start a streak.',
    hint: 'Counts every question you answer correctly, in any exam format.',
  },
  result: {
    passed: 'Passed',
    failed: 'Not passed',
    passedMessage: 'Well done. Keep the streak going.',
    failedMessage: 'Close. Review your mistakes and go again.',
    correct: 'Correct',
    wrong: 'Wrong',
    skipped: 'Skipped',
    passMark: 'Pass mark: {{percent}}%',
    // The topic breakdown. `topicScore` is deliberately "4 of 12" rather than a
    // percentage: the row already carries a bar, and on a quick exam a topic
    // can be two questions, where "50%" overstates what one mistake means.
    breakdown: 'Where your marks went',
    breakdownHint: 'Tap a topic to study it.',
    topicScore: '{{correct}} of {{total}}',
    review: 'Review answers',
    reviewWrong: 'To review ({{count}})',
    reviewAll: 'All ({{count}})',
    reviewNothingWrong: 'Nothing to review. You answered every question correctly.',
    retake: 'Retake exam',
    backToExams: 'Back to exams',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    noAnswer: 'Not answered',
    explanation: 'Explanation',
    // On a wrong answer only, linking into the Learn section that teaches it.
    // The breakdown card answers "which subject overall"; this answers "where
    // do I read about the one in front of me".
    studyThis: 'Study this topic',
    progress: 'Your progress',
    attemptNumber: 'Attempt #{{number}}',
    firstAttempt: 'This is your first attempt, so it becomes your baseline.',
    improved: 'Up {{points}} points on your last {{mode}}',
    declined: 'Down {{points}} points on your last {{mode}}',
    unchanged: 'Same as your last {{mode}}',
    personalBest: 'New personal best',
    previousBest: 'Previous best {{percent}}%',
    recentAverage: 'Recent average {{percent}}%',
    history: 'Past attempts',
    timeTaken: 'Time taken',
  },
  settings: {
    title: 'Settings',
    account: 'Account',
    study: 'Study',
    app: 'App',
    haptics: 'Haptic feedback',
    hapticsDesc: 'A tap as you answer, and a longer one when a result lands.',
    biometricLock: 'Biometric lock',
    biometricLockDesc:
      'Ask for your face or fingerprint before opening Ejazty on this device.',
    // The provenance line in the About card. Deliberately says which material
    // is verbatim and which is translated — see the content notes in CLAUDE.md.
    sourceNote:
      'Arabic questions are transcribed from the official ministry material. English and Kurdish are translations.',
    language: 'Language',
    theme: 'Appearance',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'Follow system',
    notifications: 'Study reminders',
    notificationsDesc: 'A nudge during the day, in your language.',
    notificationsBlocked:
      'Notifications are turned off for Ejazty in your device settings.',
    openSettings: 'Open device settings',
    reminderFrequency: 'How often',
    // The count is the label on each segment; the unit is in the heading above.
    reminderPerDay: '{{count}}× a day',
    // The times the chosen frequency fires at. "Around", because every slot
    // carries up to 25 minutes of jitter so it never feels like a cron job.
    reminderTimes: 'Around {{times}}',
    // Why the evening's reminders may not arrive. Shown under the times, so the
    // schedule above it is never read as a promise the app then breaks.
    reminderGoalNote: 'Reminders stop for the day once you reach your goal.',
    about: 'About',
    version: 'Version',
  },
  content: {
    // Badge for any record still marked `verified: false`. Nothing shipping
    // today is, but the badge stays so unreviewed material can never slip in
    // looking official.
    unofficial: 'UNOFFICIAL',
  },
  notifications: {
    channelName: 'Study reminders',
    items: {
      didntStudy: {
        title: "Someone just failed because they didn't study…",
        body: "Don't be that person 😅",
      },
      licenseWaiting: {
        title: 'Your driving licence is waiting…',
        body: "Your exam score isn't 😄",
      },
      stopScrolling: {
        title: 'Stop scrolling.',
        body: 'Start driving (legally).',
      },
      stopSign: {
        title: "That STOP sign won't memorise itself.",
        body: 'But you can, in five minutes.',
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
        body: 'Your future licence will thank you.',
      },
      examinerPractising: {
        title: 'Your driving examiner is practising too.',
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

/** The CLDR categories i18next appends to a key when `count` is interpolated. */
type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

/** `'questions_one'` → `'questions'`. Any other key → `never`. */
type PluralStem<K> = K extends `${infer Stem}_${PluralSuffix}` ? Stem : never;

/**
 * Mirrors the `en` tree, with every leaf widened to `string`.
 *
 * Plural variants are the one deliberate exception to "the same keys in every
 * locale": English distinguishes two forms, Arabic six, Sorani one. So any
 * `key_<category>` entry is lifted out of the mandatory set and re-offered as
 * optional across all six categories, letting each locale declare exactly the
 * forms its grammar has. The unsuffixed key stays mandatory — i18next falls
 * back to it whenever the matching form is absent, so nothing can go missing.
 *
 * `[PluralStem<K>] extends [never]` is wrapped in tuples on purpose: the naked
 * form distributes, and distributing over `never` yields `never`, which would
 * silently drop every key in the tree.
 */
type Translated<T> = {
  [K in keyof T as [PluralStem<K>] extends [never] ? K : never]: T[K] extends string
    ? string
    : Translated<T[K]>;
} & Partial<Record<`${PluralStem<keyof T> & string}_${PluralSuffix}`, string>>;

export type TranslationShape = Translated<typeof en>;

export default en;
