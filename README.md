# BitFinex Real-Time Crypto App

I didn't include `.env` file with variables in `.gitignore`, so you wouldn't need to include it yourself!!!

### About BitFinex API

The Bitfinex API is designed to allow access to all the features of the Bitfinex platform on the condition that it is used in compliance with our API Terms of Service. Users can use the API to create highly customised and advanced trading strategies on our platform. The API also allows users to create their own trading platform on top of our existing infrastructure. In the API documentation, you will find ways to retrieve or stream market data, retrieve or stream data particular to your account (such as your balances, order history, ...), as well as ways to place trading or funding orders. The intended scope of our API is such that it should be possible to rebuild almost the entire Bitfinex platform on top of it according to custom specifications.

## Install

Install with npm:

```bash
npm i
```

## Usage

Run server:

```bash
npm run dev
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
