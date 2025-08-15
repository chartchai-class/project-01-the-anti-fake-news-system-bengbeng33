# project-01-the-anti-fake-news-system

This template should help get you started developing with Vue 3 in Vite.

## Features

### News Management
- Browse all news articles
- Filter news by status (Fact, Fake, All)
- View detailed news information
- Pagination support

### Voting System
- Vote on news articles as "Fact" or "Fake"
- Real-time vote counting
- One vote per user per article (session-based)
- Visual feedback for voting status

### Comments System
- Add comments to news articles
- Support for optional images in comments
- Username customization
- Real-time comment display

## Routes

- `/` - Home page with all news
- `/fact` - Filtered view of fact-checked news
- `/fake` - Filtered view of fake news
- `/news/:id` - News detail page
- `/news/:id/vote` - Voting page for specific news
- `/news/:id/comments` - Comments page for specific news

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
