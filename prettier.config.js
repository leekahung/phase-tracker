/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  trailingComma: 'es5',
  semi: true,
  jsxSingleQuote: false,
  singleQuote: true,
  useTabs: false,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
