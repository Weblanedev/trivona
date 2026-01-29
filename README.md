# Trivona – E-commerce App

React + TypeScript + Vite e-commerce frontend with API-driven products (DummyJSON), cart, checkout, and order flow.

## Setup

```bash
npm install   # or: yarn
npm run dev   # dev server
npm run build # production build
```

**Note:** Install dependencies (`npm install` or `yarn`) before building. The app uses [Zustand](https://github.com/pmndrs/zustand) for global state.

## Features

- **Products:** Fetched from [DummyJSON](https://dummyjson.com/products); stored in global state (Zustand).
- **Product listing:** Responsive grid; each card shows image, title, price, “Add to Cart”; click opens product detail.
- **Cart:** Add/remove items, change quantity; navbar cart icon with item count; cart page with subtotal/total.
- **Checkout:** Delivery form (name, address, phone/email) and payment form (UI only, validated). “Place Order” disabled until all fields valid.
- **Order flow:** 5-second processing modal with countdown; then cart cleared, redirect to home, success toast.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
