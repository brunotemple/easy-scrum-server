module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier/@typescript-eslint"
    ],
    plugins: ["@typescript-eslint", "react-hooks"],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "react/prop-types": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "warn",
        "@typescript-eslint/no-namespace": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                args: "none",
                ignoreRestSiblings: true
            }
        ]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
