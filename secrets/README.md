# `secrets/`

Everything in this directory is gitignored except this file. Nothing here may be
committed — see the note in `.gitignore`.

## `play-service-account.json`

**Required for `eas submit --platform android`.** `eas.json` points
`submit.production.android.serviceAccountKeyPath` at `./secrets/play-service-account.json`,
and the submit fails if the file is absent. It is a Google Cloud service-account
private key with rights to publish to the Play listing, which is why it is not
in the repo: committing it hands anyone with repo access the ability to ship a
release.

It has to be obtained by hand — it cannot be generated from this repo:

1. **Google Play Console** → *Setup* → *API access*, and link a Google Cloud
   project if one is not linked already.
2. Create a **service account** (this drops you into Google Cloud IAM), then
   under *Keys* → *Add key* → *Create new key* → **JSON**. That download is the
   only copy; Google will not show it again.
3. Back in Play Console → *Users and permissions*, **invite the service account**
   by its email address and grant it, for this app:
   - *View app information*
   - *Manage production releases* (or *Manage testing track releases* alone, if
     you only ever submit to internal/alpha)
4. Save the JSON here as exactly `play-service-account.json`.

Permissions can take a few minutes to propagate. A submit that fails with a
permission error immediately after step 3 is usually just early.

**The first Android submit must be done by hand.** Google Play rejects an API
upload for an app that has never had a release, so the very first APK/AAB has to
go through the Play Console UI. Everything after that can use `eas submit`.

Note `submit.production.android` is configured with `track: "alpha"` and
`releaseStatus: "draft"`, so a successful submit does *not* go live — it lands as
a draft on the closed testing track for you to promote.

**`alpha` means closed testing, and the name is the Play Developer API's, not the
console's.** The API exposes four tracks — `production`, `beta` (open testing),
`alpha` (closed testing) and `internal` (internal testing) — while the console
labels the same tracks in words. There is no `closed` value; writing one fails
the submit.

**Why closed testing rather than internal.** This is a *personal* Play developer
account, and personal accounts registered after November 2023 must run a closed
test with a minimum number of testers opted in for a continuous period before
Google unlocks production access. Internal testing does **not** count toward it.
Check the exact tester count and duration on the Play Console dashboard, which
shows a live counter — Google has changed both numbers over time, so do not
trust a figure written down here or anywhere else.

**`releaseStatus: "draft"` does not start that clock.** A draft release is not
delivered to testers, so the continuous-days counter only begins once the
release is actually rolled out. Draft is kept as the default because it is the
safe one — a submit cannot surprise you by going live — but expect to promote
each closed-testing release by hand in the console, or change this to
`"completed"` once you are confident in the pipeline.

## The Apple side

Nothing is needed here. `submit.production.ios` carries only `appleId`;
`ascAppId` and `appleTeamId` are deliberately omitted so EAS resolves them
interactively on the first submit, because a wrong value in either fails in a way
that reads like an authentication problem. Paste them into `eas.json` afterwards
if you want CI to run unattended.

App Store Connect credentials are held by EAS, not by this repo. The
`*.p8`/`*.p12` rules in `.gitignore` cover the case where a key is downloaded
locally anyway.
