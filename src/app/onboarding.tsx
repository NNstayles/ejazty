/**
 * What the app is, shown once, between the language picker and sign-in.
 *
 * The gap it closes: the app ships five exam formats, a drill built from the
 * learner's own mistakes, a daily goal and seven study sections, and until this
 * screen it explained none of them anywhere. The mode cards on the exam home
 * deliberately carry no description line — that was removed on purpose, because
 * four one-line explanations turned a list of four choices into a page of prose
 * to read before choosing — so the explanation had to go somewhere that is not
 * the cards, and "once, at the start" is the only place left.
 *
 * ## It is one screen, not a swipeable carousel
 *
 * Two reasons, and the second is the one that decided it. A carousel makes three
 * taps mandatory to reach a sign-in screen the reader may already be sure they
 * want, which is the classic way onboarding costs more than it earns. And a
 * horizontal pager is the single worst control to build in this app: paging is
 * driven by `contentOffset`, which is physical, while the tree above it is
 * mirrored by Yoga's `direction` with `I18nManager.isRTL` deliberately left
 * false — so the page indicator, the swipe direction and the scroll offset each
 * have to be mirrored by hand, and getting one of the three wrong is invisible
 * in the language you develop in. A vertical list of three cards has no
 * horizontal component at all, so it mirrors for free with everything else.
 *
 * ## Where `onboarded` is written
 *
 * Here, at the end, rather than in the language picker where it used to be. So
 * an app killed part-way through this flow resumes at the language picker with
 * the previous choice already selected and applied — the language is persisted
 * the moment it is tapped, independently of this flag. That is the right
 * resume point: the alternative is a second storage key whose only job is to
 * remember that a one-screen tour was seen.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useMotion } from '@/lib/motion';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing, type TintName } from '@/theme/tokens';

/**
 * The three things worth knowing before the first screen.
 *
 * Each names a feature that exists rather than describing an ambition, because
 * this is the one screen a reader will hold the app to. The tints cycle the
 * same closed set the Learn grid uses, and the icons are plain Ionicons rather
 * than the animated section icons: three glyphs drawing themselves at once on a
 * screen whose only job is to be read is decoration competing with the copy.
 */
const HIGHLIGHTS = [
  { key: 'study', icon: 'library-outline', tint: 'lavender' },
  { key: 'practise', icon: 'timer-outline', tint: 'periwinkle' },
  { key: 'progress', icon: 'flame-outline', tint: 'mint' },
] as const satisfies readonly {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: TintName;
}[];

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const { tints } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { completeOnboarding } = usePreferences();
  const [busy, setBusy] = useState(false);

  const finish = async () => {
    setBusy(true);
    await completeOnboarding();
    // Back to the entry gate rather than straight to sign-in, for the reason
    // the language picker hands off the same way: `index.tsx` is the one place
    // that waits for `auth.ready` and sends a user who already has a session to
    // the tabs instead of to a sign-in screen they do not need.
    router.replace('/');
  };

  return (
    <Screen contentStyle={styles.content} wash="heroWash">
      <View style={styles.header}>
        <Text variant="display">{t('onboarding.title')}</Text>
        <Text tone="textMuted" variant="body">
          {t('onboarding.subtitle')}
        </Text>
      </View>

      <View style={styles.list}>
        {HIGHLIGHTS.map((item, index) => {
          const tint = tints[item.tint];
          return (
            <Animated.View
              entering={motion.entrance(index)}
              key={item.key}
              // The tint is the card's whole surface, so the border goes with
              // it — a hairline of `colors.border` around a coloured fill reads
              // as a card that failed to load its background. Same rule the
              // Learn grid follows.
              style={[styles.item, { backgroundColor: tint.fill }]}>
              <View style={styles.itemIcon}>
                <Ionicons color={tint.ink} name={item.icon} size={24} />
              </View>
              <View style={styles.itemText}>
                {/*
                  Both take the tint's own ink. `textMuted` is only checked for
                  contrast against `surface`, so it is not safe on a tinted
                  fill; the body is dimmed with opacity instead, which keeps the
                  checked pair.
                */}
                <Text style={{ color: tint.ink }} variant="heading">
                  {t(`onboarding.${item.key}Title`)}
                </Text>
                <Text
                  style={[styles.itemBody, { color: tint.ink }]}
                  variant="body">
                  {t(`onboarding.${item.key}Body`)}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Button
          label={t('common.continue')}
          loading={busy}
          onPress={() => void finish()}
        />
        {/*
          Said here rather than discovered at the sign-in screen. The app has a
          guest path precisely so it can be used without an account, and a
          reader who does not know that reads the next screen as a wall.
        */}
        <Text center tone="textFaint" variant="caption">
          {t('onboarding.guestHint')}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.xxl },
  header: { gap: spacing.xs },
  list: { gap: spacing.md },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    // Deliberately no fill: on a pastel card the icon reads as part of the
    // surface, and a white disc behind it would be a third plane on a card
    // carrying two lines of text.
  },
  itemText: { flex: 1, gap: 2 },
  itemBody: { opacity: 0.8 },
  footer: { gap: spacing.md },
});
