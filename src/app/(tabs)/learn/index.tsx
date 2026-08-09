import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  DashboardIcon,
  FirstAidIcon,
  MechanicsIcon,
  PriorityIcon,
  RulesIcon,
  SignsIcon,
  ViolationsIcon,
} from '@/components/icons/section-icons';
import type { AnimatedIconProps } from '@/components/icons/use-playback';
import { Avatar } from '@/components/ui/avatar';
import { Chevron } from '@/components/ui/chevron';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { Gradient } from '@/components/ui/gradient';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import {
  dashboardLights,
  markingsAndLights,
  roadSigns,
  studyNotesFor,
} from '@/content/registry';
import { useAuth } from '@/features/auth/auth-provider';
import {
  SECTION_IDS,
  SECTION_TITLE_KEYS,
  type LearnSectionId,
} from '@/features/learn/sections';
import { useAvatar } from '@/features/profile/avatar-provider';
import { useGoal } from '@/features/progress/goal-provider';
import { useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing, type TintName } from '@/theme/tokens';

type SectionCard = {
  id: LearnSectionId;
  titleKey: string;
  descKey: string;
  Icon: (props: AnimatedIconProps) => React.ReactElement;
  count: number;
  tint: TintName;
};

const SECTION_ICONS: Record<LearnSectionId, SectionCard['Icon']> = {
  signs: SignsIcon,
  rules: RulesIcon,
  priority: PriorityIcon,
  violations: ViolationsIcon,
  mechanics: MechanicsIcon,
  dashboard: DashboardIcon,
  firstaid: FirstAidIcon,
};

/**
 * Which pastel a section's card is drawn on.
 *
 * ## The colour is not identifying the section, and that is the point
 *
 * These tiles used to be monochrome, for a good reason: before that they ran
 * four hues with two sections sharing `danger`, so the colour was carrying no
 * information the glyph did not already carry — worse, it implied a grouping
 * that did not exist. Nothing about that has changed, and this table is not an
 * attempt to re-encode meaning in colour.
 *
 * What it does is make the grid legible *as a grid*. Eight identical tiles read
 * as a wall; four alternating surfaces give the eye somewhere to break, and the
 * icon still does the identifying. It is assigned by position rather than by
 * meaning — deliberately, so nobody has to wonder what "mint" says about first
 * aid — and it is a total `Record`, so a new section has to state its answer
 * rather than falling through to a default.
 *
 * Adjacent sections never share a tint, which is the one property the cycle has
 * to hold: two same-coloured cards side by side in the grid read as a single
 * merged block.
 */
const SECTION_TINTS: Record<LearnSectionId, TintName> = {
  signs: 'lavender',
  rules: 'mint',
  priority: 'periwinkle',
  violations: 'blush',
  mechanics: 'mint',
  dashboard: 'lavender',
  firstaid: 'blush',
};

/**
 * How many catalogue cards a section shows on top of its study notes.
 *
 * Only two sections have any — signs owns the 111-record sign catalogue, rules
 * owns the markings and light signals, dashboard is the tell-tales — so this is
 * zero for the rest. A count that left them out would advertise the notes alone
 * and understate the signs section by two orders of magnitude.
 */
const CATALOGUE_COUNTS: Record<LearnSectionId, number> = {
  signs: roadSigns.length,
  rules: markingsAndLights.length,
  priority: 0,
  violations: 0,
  mechanics: 0,
  dashboard: dashboardLights.length,
  firstaid: 0,
};

/**
 * Derived from `SECTION_IDS` rather than listed here, so the home screen cannot
 * silently omit a section that exists — which is how `mechanics` and `firstaid`
 * came to be unreachable in the first place.
 */
const SECTIONS: SectionCard[] = SECTION_IDS.map((id) => ({
  id,
  titleKey: SECTION_TITLE_KEYS[id],
  descKey: `learn.${id}Desc`,
  Icon: SECTION_ICONS[id],
  count: CATALOGUE_COUNTS[id] + studyNotesFor(id).length,
  tint: SECTION_TINTS[id],
}));

export default function LearnHome() {
  const { t } = useTranslation();
  const { colors, tints } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { user, isGuest } = useAuth();
  const { uri: avatarUri } = useAvatar();
  const goal = useGoal();
  const clearance = useTabBarClearance();

  /**
   * Replays a section's icon when its card is pressed.
   *
   * A counter per section rather than a boolean: the icons replay on a *change*
   * of trigger, and a boolean can only change once. Tapping the same card twice
   * has to play the animation twice — that is the whole feedback the tap gives
   * before the next screen arrives.
   */
  const [plays, setPlays] = useState<Record<string, number>>({});
  const replay = useCallback((id: string) => {
    setPlays((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }, []);

  // Prefer the chosen display name, fall back to the local part of the email,
  // and greet a guest without inventing a name for them.
  const name = user?.displayName?.trim() || user?.email?.split('@')[0] || null;
  const showName = Boolean(name) && !isGuest;
  const goalPercent = Math.round(goal.fraction * 100);
  const remaining = Math.max(0, goal.goal - goal.correct);

  return (
    <Screen contentStyle={{ paddingBottom: clearance }} wash="heroWash">
      {/*
        The greeting is one control, not a block of text with a picture beside
        it. Everything it names — who you are signed in as, the picture, the
        name — lives on the account screen, so the row that shows them is the
        obvious place to press to get there, and it was previously inert.

        The greeting and the name stay two lines rather than one interpolated
        string. `welcome` used to carry `{{name}}`, which put a Latin name inside
        a 32pt Arabic display line — a mixed-script run has to reconcile two sets
        of vertical metrics in one line box, the naskh and the Latin serif do not
        agree, and the two runs overlapped and clipped against the top of the
        screen. Splitting them gives each script its own line at its own leading.
      */}
      <PressableScale
        accessibilityHint={t('account.manageDesc')}
        accessibilityLabel={showName && name ? name : t('learn.welcome')}
        accessibilityRole="button"
        onPress={() => router.push('/settings/account')}
        scaleTo={0.985}
        style={styles.hero}>
        <View style={styles.heroText}>
          <Text tone="textMuted" variant={showName ? 'body' : 'display'}>
            {t('learn.welcome')}
          </Text>
          {showName ? (
            <Text numberOfLines={2} variant="display">
              {name}
            </Text>
          ) : null}
          <Text tone="textMuted" variant="body">
            {t('learn.welcomeSubtitle')}
          </Text>
        </View>
        <View style={styles.heroAvatar}>
          <Avatar
            name={name ?? t('auth.guest')}
            ring
            size={62}
            uri={avatarUri}
          />
          {/*
            A small badge on the avatar saying it is editable. Without it the
            picture is just a picture: nothing on this screen would suggest that
            pressing it leads anywhere, and the account screen is where both the
            picture and everything else about the account are changed.
          */}
          <View
            style={[
              styles.heroBadge,
              { backgroundColor: colors.primary, borderColor: colors.background },
            ]}>
            <Ionicons color={colors.onPrimary} name="pencil" size={11} />
          </View>
        </View>
      </PressableScale>

      {/*
        The daily goal.

        The app could say how well you did and never how much you had done, so
        there was no reason to open it on a day you were not sitting a mock. See
        `features/progress/goal.ts` for why the unit is questions answered
        rather than exams finished.
      */}
      <Animated.View entering={motion.appear(80)}>
        <PressableScale
          accessibilityRole="button"
          onPress={() => router.push('/exam')}
          scaleTo={0.98}>
          <Card padded={false} style={styles.goalCard}>
            {/*
              The one gradient in the app that crosses hues, and the reference
              design's signature surface. Nothing is read at body size directly
              on it — the copy sits on the plain end of the sweep — so the pair
              is chosen for the sweep rather than for contrast. See `tintHero`.
            */}
            <Gradient
              direction="diagonal"
              pointerEvents="none"
              style={StyleSheet.absoluteFill}
              tone="tintHero"
            />
            <View style={styles.goalBody}>
              <View style={styles.goalText}>
                <Text
                  style={{ color: tints.lavender.ink }}
                  variant="overline">
                  {t('goal.today').toUpperCase()}
                </Text>
                <Text style={{ color: colors.text }} variant="heading">
                  {goal.correct >= goal.goal
                    ? t('goal.met')
                    : t('goal.remaining', { count: remaining })}
                </Text>
                <View style={styles.goalMeta}>
                  <Text style={{ color: tints.lavender.ink }} variant="caption">
                    {t('goal.progress', {
                      correct: goal.correct,
                      goal: goal.goal,
                    })}
                  </Text>
                  {goal.streak > 0 ? (
                    <View
                      style={[
                        styles.streakPill,
                        { backgroundColor: colors.surface },
                      ]}>
                      <Ionicons color={colors.warning} name="flame" size={12} />
                      <Text tone="textMuted" variant="overline">
                        {t('goal.streak', { count: goal.streak })}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>

              <ProgressRing
                accent={colors.primary}
                fraction={goal.fraction}
                size={86}>
                <Text style={{ color: colors.text }} variant="bodyStrong">
                  {goalPercent}%
                </Text>
              </ProgressRing>
            </View>
          </Card>
        </PressableScale>
      </Animated.View>

      <Text style={styles.gridLabel} tone="textMuted" variant="overline">
        {t('learn.sectionsLabel').toUpperCase()}
      </Text>

      <View style={styles.grid}>
        {SECTIONS.map((section, index) => {
          const { Icon } = section;
          const tint = tints[section.tint];
          return (
            <Animated.View
              // Staggered entrance, top card first, so the grid assembles
              // itself rather than appearing all at once. See `useMotion` for
              // the interval and the cap on it.
              entering={motion.entrance(index)}
              key={section.id}
              style={styles.gridItem}>
              <PressableScale
                accessibilityRole="button"
                onPress={() => {
                  // Replayed *before* navigating rather than instead of it: the
                  // push is not instantaneous, and the icon playing under the
                  // finger is what fills the gap.
                  replay(section.id);
                  router.push(`/learn/${section.id}`);
                }}
                style={styles.gridPress}>
                <Card
                  style={[
                    styles.card,
                    // The tint replaces the surface, so the border has to go
                    // with it — a hairline of `colors.border` around a coloured
                    // fill reads as a card that failed to load its background.
                    { backgroundColor: tint.fill, borderColor: 'transparent' },
                  ]}>
                  <View
                    style={[
                      styles.iconWrap,
                      // The disc is the card's own surface, one step brighter,
                      // rather than a fifth colour. In dark mode `surface` on a
                      // deep tint reads as a lifted plate for the same reason.
                      { backgroundColor: colors.surface },
                    ]}>
                    <Icon
                      color={tint.ink}
                      // Staggered to match the card's own entrance, so each
                      // icon draws itself as its card lands rather than seven
                      // of them playing at once behind a moving grid.
                      delayMs={index * 90 + 140}
                      size={24}
                      trigger={plays[section.id] ?? 0}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <Text
                      numberOfLines={2}
                      style={{ color: tint.ink }}
                      variant="heading">
                      {t(section.titleKey)}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[styles.cardDesc, { color: tint.ink }]}
                      variant="caption">
                      {t(section.descKey)}
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={{ color: tint.ink }} variant="overline">
                      {t('learn.itemsCount', { count: section.count })}
                    </Text>
                    <Chevron color={tint.ink} size={16} />
                  </View>
                </Card>
              </PressableScale>
            </Animated.View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  heroText: { flex: 1, gap: spacing.xs },
  heroAvatar: { position: 'relative' },
  heroBadge: {
    position: 'absolute',
    bottom: 0,
    // `end`, not `right`: the badge has to sit on the trailing corner of the
    // avatar in both directions.
    end: 0,
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCard: { overflow: 'hidden' },
  goalBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  goalText: { flex: 1, gap: spacing.xs },
  goalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  gridLabel: { marginBottom: -spacing.sm },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  /*
    Two to a row, and the odd one out spans.

    `flexGrow: 1` with a basis under half means a full row splits evenly between
    its two cards, while a row holding only the last card lets it take the whole
    width. That is a nicer answer than a half-width card with a hole beside it,
    and it needs no branch on `SECTIONS.length` — which would otherwise be a
    thing to remember when an eighth section is added.
  */
  gridItem: { flexGrow: 1, flexBasis: '46%' },
  gridPress: { flex: 1 },
  card: { flex: 1, gap: spacing.sm, minHeight: 168 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, gap: 2 },
  // The description is the quietest thing on a tinted card, but the tint's ink
  // is the only colour checked against that fill — so it is dimmed with opacity
  // rather than swapped for `textMuted`, which is checked against `surface`.
  cardDesc: { opacity: 0.75 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
});
