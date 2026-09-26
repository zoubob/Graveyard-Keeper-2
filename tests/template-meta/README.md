# template-meta — upstream AnvilWiki template's own test suite

These 8 suites test the TEMPLATE REPO ITSELF (demo content markers, the
marketing landing modules, the ja demo locale, `setup.yml` FORKER warning
blocks, demo ads files, `PROJECT_VERSION` in `landing-shared.ts`, handbook
redirects). `pnpm apply-template` removes those surfaces by design, so on
this rebranded site branch they can never pass.

They are `git mv`'d here (not deleted) and excluded via `vitest.config.ts`
so upstream merges keep resolving cleanly. If you merge upstream template
work, review changes to these files against the upstream copies.

Fork CI contract (per `scripts/e2e-apply-template.mjs`): `pnpm build` and
`pnpm check-config` must be green — the template-meta suite is not part of
the fork promise.
