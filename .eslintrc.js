// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parserOptions: {
        "ecmaVersion": 7,
        "sourceType": "module"
    },
    plugins: [],
    extends: ['eslint:recommended',],
    rules: {
        'semi': [2, "always"],
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
    }
};