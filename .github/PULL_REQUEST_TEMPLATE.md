## Summary

<!-- What does this change, and why? A few bullet points is fine. -->

## Type of change

<!-- Match the conventional-commit type of your commit(s) — see commitlint.config.js. -->

- [ ] `feat` — new feature
- [ ] `fix` — bug fix
- [ ] `docs` — documentation only (CLAUDE.md, README.md, comments)
- [ ] `style` — formatting/lint only, no behavior change
- [ ] `refactor` — code change that neither fixes a bug nor adds a feature
- [ ] `content` — copy/translation changes under `content/data/**`, `content/i18n/**`
- [ ] `chore` — tooling, dependencies, CI

## Test plan

<!--
This repo has no automated test suite (see CLAUDE.md). Describe how you
verified the change: which page(s), which locale tree(s) (docs/ / docs/de/),
which theme(s) if visual, and what you clicked through.
-->

- [ ] `npm run build` runs clean and regenerates both `docs/` and `docs/de/`
- [ ] `npm run verify` (lint + format check + build) passes
- [ ] Manually verified in a browser: <!-- pages / locales / themes touched -->

## Checklist

- [ ] If I touched `content/` or `src/`, I ran `npm run build` and committed the regenerated `docs/` output
- [ ] Commit message(s) follow [Conventional Commits](https://www.conventionalcommits.org/)
