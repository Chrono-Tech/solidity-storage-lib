module.exports = {
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "env": {
        "es6": true,
        "node": true,
        "mocha": true,
    },
    "globals": {
        "web3": false,
        "artifacts": false,
        "assert": false,
        "contract": false,
    },
    "rules": {
        "indent": ["error", "tab"],

        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],
        "no-await-in-loop": "off",
        "block-scoped-var": "error",
        "curly": "error",
        "eqeqeq": ["error", "always"],
        "no-alert": "error",
        "no-else-return": ["error", { "allowElseIf": true }],
        "no-magic-numbers": ["warn", { "ignoreArrayIndexes": true }],
        "no-multi-spaces": ["error", { "exceptions": { "Property": true }}],
        "no-restricted-syntax": ["error", "SequenceExpression"],
        "no-useless-return": "warn",
        "require-await": "warn",
        "vars-on-top": "off",
        "no-unused-vars": "warn",
        "yoda": "error",

        "global-require": "error",
        "array-bracket-spacing": ["error", "always", { "singleValue": false, "objectsInArrays": false }],
        "block-spacing": ["error", "always"],
        "brace-style": ["error", "stroustrup", { "allowSingleLine": false }],
        "camelcase": ["error", { "properties": "never" }],
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "no-lonely-if": "error",
        "no-negated-condition": "error",
        "no-trailing-spaces": "error",
        "no-whitespace-before-property": "error",
        "object-curly-newline": ["error", { "multiline": true, "minProperties": 4 }],
        "object-curly-spacing": ["error", "always"],
        "object-property-newline": ["warn", { "allowAllPropertiesOnSameLine": true }],
        "quote-props": ["warn", "as-needed", { "keywords": true, "numbers": true }],

        "semi": ["error", "never"],

        "arrow-parens": ["error", "as-needed"],
        "arrow-spacing": "error",

        "no-duplicate-imports": "error",
        "prefer-const": "error",

        "no-undef": "warn",
        "no-empty": "warn",

        "no-console": "off"
    }
}
