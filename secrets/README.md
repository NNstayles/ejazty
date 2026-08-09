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

Note `submit.production.android` is configured with `track: "internal"` and
`releaseStatus: "draft"`, so a successful submit does *not* go live — it lands as
a draft on the internal track for you to promote.

## The Apple side

Nothing is needed here. `submit.production.ios` carries only `appleId`;
`ascAppId` and `appleTeamId` are deliberately omitted so EAS resolves them
interactively on the first submit, because a wrong value in either fails in a way
that reads like an authentication problem. Paste them into `eas.json` afterwards
if you want CI to run unattended.

App Store Connect credentials are held by EAS, not by this repo. The
`*.p8`/`*.p12` rules in `.gitignore` cover the case where a key is downloaded
locally anyway.
