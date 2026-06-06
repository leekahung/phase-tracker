# phase-tracker

## Fallow (codebase intelligence)

Run with `bunx fallow` — **not** `npx`. The `overrides` in package.json make npm
reject the install (`EOVERRIDE`); Bun is the package manager here.

Config lives in `.fallowrc.json`. Repo-specific gotchas the tool can't infer:

- **Netlify Functions** (`netlify/functions/**/*.mts`) are platform-invoked, not
  import-reachable. They're declared as entry points in `.fallowrc.json`; without
  that, they and their imported `netlify/utils` show up as false "unused files".
- **`isbot`** looks unused but isn't — React Router's default server entry depends
  on it. Never remove it; `react-router typegen` will just re-add it.
