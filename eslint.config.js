// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      /**
       * Barrel imports that cost megabytes.
       *
       * Both packages below re-export every asset they ship from their root
       * `index`, and each of those re-exports is a `require` of a `.ttf` —
       * which Metro resolves **eagerly**, whether or not the binding is used.
       * Tree shaking does not save you: the cost is in the module graph, not in
       * the JS.
       *
       * Measured on this project, with `expo export --platform ios`, by making
       * exactly one call site import from the root instead of the subpath:
       *
       * | import style                         | fonts | weight  | bundle |
       * | ------------------------------------ | ----- | ------- | ------ |
       * | `from '@expo/vector-icons'`          |    23 | 4.64 MB |  23 MB |
       * | `from '@expo/vector-icons/Ionicons'` |     5 | 1.12 MB |  19 MB |
       *
       * So a single root import bundles eighteen icon fonts nobody draws with
       * and adds ~3.5 MB. It is invisible in review, invisible in a typecheck,
       * and invisible at runtime — the app looks and behaves identically, it
       * is just four megabytes heavier to download. That is precisely the class
       * of regression this project pins rather than trusts, and a lint rule is
       * the right shape for it because the fix is mechanical: name the family
       * or the weight you actually want.
       *
       * The same rule and the same reasoning cover the Google Fonts packages,
       * whose roots re-export all sixteen cuts of a family to use four.
       */
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@expo/vector-icons',
              message:
                "Import the family directly — `@expo/vector-icons/Ionicons` — not the package root. The root re-exports every icon family, each a `require` of a .ttf that Metro resolves eagerly: measured at +18 fonts and +3.5 MB on this project.",
            },
            {
              name: '@expo-google-fonts/playfair-display',
              message:
                "Import the per-weight entry point — `@expo-google-fonts/playfair-display/700Bold` — not the package root, which bundles all sixteen cuts (~2.9 MB) to use four (~788 kB).",
            },
            {
              name: '@expo-google-fonts/noto-naskh-arabic',
              message:
                "Import the per-weight entry point — `@expo-google-fonts/noto-naskh-arabic/700Bold` — not the package root, which bundles every cut it ships to use two.",
            },
          ],
        },
      ],
    },
  },
]);
