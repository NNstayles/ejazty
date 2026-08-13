import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { SUPPORT_EMAIL } from '@/features/support/contact';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/**
 * The privacy policy, in the app.
 *
 * ## Why it is a screen rather than a link
 *
 * There is no website to host it on, and both stores want the policy reachable
 * from inside the app as well as from the listing. A screen also means it is
 * translated like everything else — a learner reading the app in Kurdish should
 * not have the one page about their own data appear in English.
 *
 * The store *listing* still needs a URL, which a screen cannot satisfy. The
 * hostable copy of exactly this text lives at `docs/privacy-policy.html`, and
 * the two are written from the same facts and have to be edited together.
 *
 * ## The copy is a claim about code
 *
 * Every sentence here describes something the app actually does, and the
 * device/account split mirrors the one CLAUDE.md documents. If a feature starts
 * uploading something it did not before, this screen is wrong until it is
 * changed — which is why the strings sit in the locale files under one `privacy`
 * block rather than being scattered through the components that render them.
 */

/**
 * The address published as the privacy contact.
 *
 * Deliberately a named constant rather than a locale string: it is the same in
 * every language, and a policy contact that drifted between translations would
 * be worse than none.
 *
 * It used to be declared here, again in `i18n/privacy-html.test.ts`, and a
 * third time in the hosted pages, held together by a comment asking the reader
 * to keep them in step. It now comes from `features/support/contact.ts`, which
 * all three read — the same pair-that-drifts argument the page generator itself
 * rests on, finally applied to the one value the generator was copying by hand.
 */
const CONTACT_EMAIL = SUPPORT_EMAIL;

/** A heading and its paragraphs, as one card. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card style={styles.card}>
      <Text variant="bodyStrong">{title}</Text>
      {children}
    </Card>
  );
}

/**
 * One item in a list of what is stored where.
 *
 * The bullet is a `View` rather than a `•` in the string, so it cannot be
 * dragged to the wrong side of the line by the writing direction — the row
 * mirrors with everything else, and the dot goes with it.
 */
function Point({ children }: { children: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.point}>
      <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
      <Text style={styles.pointText} tone="textMuted" variant="caption">
        {children}
      </Text>
    </View>
  );
}

export default function PrivacyScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const clearance = useTabBarClearance();

  return (
    <>
      <Stack.Screen options={{ title: t('privacy.title') }} />
      {/*
        `edges={[]}`: `ScreenHeader` already applies the top inset. Claiming it
        here as well pushes the first card down by a second status bar.
      */}
      <Screen contentStyle={{ paddingBottom: clearance }} edges={[]}>
        <Text tone="textFaint" variant="caption">
          {t('privacy.updated')}
        </Text>
        <Text style={styles.intro} tone="textMuted" variant="body">
          {t('privacy.intro')}
        </Text>

        <Section title={t('privacy.summaryTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.summary')}
          </Text>
        </Section>

        <Section title={t('privacy.controllerTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.controllerBody')}
          </Text>
        </Section>

        <Section title={t('privacy.deviceTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.deviceBody')}
          </Text>
          <Point>{t('privacy.devicePhoto')}</Point>
          <Point>{t('privacy.deviceGoal')}</Point>
          <Point>{t('privacy.devicePrefs')}</Point>
          <Point>{t('privacy.deviceLock')}</Point>
          <Point>{t('privacy.deviceCache')}</Point>
        </Section>

        <Section title={t('privacy.accountTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.accountBody')}
          </Text>
          <Point>{t('privacy.accountIdentity')}</Point>
          <Point>{t('privacy.accountAttempts')}</Point>
          <Point>{t('privacy.accountQuestions')}</Point>
          <Text tone="textMuted" variant="caption">
            {t('privacy.accountHost')}
          </Text>
        </Section>

        <Section title={t('privacy.guestTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.guestBody')}
          </Text>
        </Section>

        <Section title={t('privacy.neverTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.neverBody')}
          </Text>
          <Point>{t('privacy.neverLocation')}</Point>
          <Point>{t('privacy.neverContacts')}</Point>
          <Point>{t('privacy.neverIdentifiers')}</Point>
          <Point>{t('privacy.neverBehaviour')}</Point>
          <Point>{t('privacy.neverSell')}</Point>
        </Section>

        <Section title={t('privacy.adsTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.adsBody')}
          </Text>
          <Text tone="textMuted" variant="caption">
            {t('privacy.adsConsent')}
          </Text>
          <Text tone="textMuted" variant="caption">
            {t('privacy.adsPartners')}
          </Text>
        </Section>

        <Section title={t('privacy.notificationsTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.notificationsBody')}
          </Text>
        </Section>

        <Section title={t('privacy.photosTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.photosBody')}
          </Text>
        </Section>

        <Section title={t('privacy.analyticsTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.analyticsBody')}
          </Text>
        </Section>

        <Section title={t('privacy.basisTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.basisBody')}
          </Text>
          <Point>{t('privacy.basisService')}</Point>
          <Point>{t('privacy.basisConsent')}</Point>
          <Point>{t('privacy.basisSecurity')}</Point>
        </Section>

        <Section title={t('privacy.transferTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.transferBody')}
          </Text>
        </Section>

        <Section title={t('privacy.rightsTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.rightsBody')}
          </Text>
          <Button
            label={t('privacy.manageAction')}
            onPress={() => router.push('/settings/account')}
            variant="secondary"
          />
        </Section>

        <Section title={t('privacy.deleteWebTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.deleteWebBody')}
          </Text>
        </Section>

        <Section title={t('privacy.legalRightsTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.legalRightsBody')}
          </Text>
          <Point>{t('privacy.rightAccess')}</Point>
          <Point>{t('privacy.rightCorrect')}</Point>
          <Point>{t('privacy.rightDelete')}</Point>
          <Point>{t('privacy.rightWithdraw')}</Point>
          <Point>{t('privacy.rightObject')}</Point>
          <Point>{t('privacy.rightComplain')}</Point>
        </Section>

        <Section title={t('privacy.retentionTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.retentionBody')}
          </Text>
        </Section>

        <Section title={t('privacy.securityTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.securityBody')}
          </Text>
        </Section>

        <Section title={t('privacy.childrenTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.childrenBody')}
          </Text>
        </Section>

        <Section title={t('privacy.changesTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.changesBody')}
          </Text>
        </Section>

        <Section title={t('privacy.contactTitle')}>
          <Text tone="textMuted" variant="caption">
            {t('privacy.contactBody')}
          </Text>
          {/*
            The address is shown as text as well as being behind the button: a
            phone with no mail client configured opens nothing, and the reader
            still needs to be able to write it down.
          */}
          <Text tone="primary" variant="bodyStrong">
            {CONTACT_EMAIL}
          </Text>
          <Button
            label={t('privacy.contactAction')}
            onPress={() => void Linking.openURL(`mailto:${CONTACT_EMAIL}`)}
            variant="secondary"
          />
        </Section>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: spacing.md,
  },
  card: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  point: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bullet: {
    borderRadius: radius.pill,
    height: 5,
    // Sits on the first line's optical centre rather than its top edge.
    marginTop: 7,
    width: 5,
  },
  pointText: {
    flex: 1,
  },
});
