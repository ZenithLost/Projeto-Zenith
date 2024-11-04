module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential", // Regras essenciais do Vue 3
    "eslint:recommended", // Regras recomendadas pelo ESLint
    "@vue/typescript/recommended", // Regras recomendadas para Vue + TypeScript
    "plugin:prettier/recommended", // Integração com Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020, // Para suporte às versões modernas do ECMAScript
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/component-name-in-template-casing": ["error", "kebab-case"], // Permite kebab-case
    // Outras regras de linting podem ser adicionadas aqui
    "vue/multi-word-component-names": "off", // Permite nomes de componentes com uma palavra
  },
};
