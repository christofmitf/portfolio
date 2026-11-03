# Christof Schuster - Portfolio

![CI/CD](https://github.com/christofmitf/portfolio/actions/workflows/deploy.yml/badge.svg)

My personal portfolio website, built as part of the SE Evolution course.

Live version: https://christofmitf.github.io/portfolio/

## Run (local)

Requires [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal.

## CI/CD

The site is built and deployed with GitHub Actions ([deploy.yml](.github/workflows/deploy.yml)). The workflow runs on every push to `main` and can also be started by hand from the Actions tab.

Steps:

1. `npm ci` installs the exact versions from `package-lock.json`
2. `npm run lint` runs oxlint
3. `npm run build` type checks with `tsc` and builds the site with Vite
4. the `dist` folder gets uploaded and deployed to GitHub Pages

If linting or the build fails, nothing is deployed, so the live site always stays on the last working version.

The actions are pinned to commit hashes instead of tags like `@v4`, so the pipeline only changes when I update it myself. Because the site lives under `/portfolio/` and not at the root, `base` is set to `/portfolio/` in `vite.config.ts`, otherwise the CSS, JS and images wouldn't load.

## Credits

- Started from the official [Vite](https://vite.dev/) `react-ts` template (React + TypeScript).
- Structure and ideas inspired by [Salim Saay's portfolio](https://github.com/saaysalim/Salim-Saay).
- The workflow is based on the GitHub Pages example from the [Vite docs](https://vite.dev/guide/static-deploy#github-pages).
