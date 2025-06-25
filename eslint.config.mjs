import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const config = [
    {
        ignores: ["./src/components/ui/**/*"],
    },
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "standard",
        "plugin:tailwindcss/recommended",
        "prettier"
    ),
    {
        rules: {
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "index",
                        "object",
                    ],

                    "newlines-between": "always",

                    pathGroups: [
                        {
                            pattern: "@app/**",
                            group: "external",
                            position: "after",
                        },
                    ],

                    pathGroupsExcludedImportTypes: ["builtin"],

                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            "comma-dangle": "off",
            // Add max-lines rule
            "max-lines": [
                "error",
                {
                    max: 250,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],

            // "@typescript-eslint/naming-convention": [
            //     "error",
            //     // Variables, functions, and properties should be camelCase
            //     {
            //         "selector": ["variable", "function", "property"],
            //         "format": ["camelCase", "PascalCase"],
            //         "filter": {
            //             "regex": "^(__dirname|__filename)$",
            //             "match": false
            //         }
            //     },
            //     // Type names should be PascalCase
            //     {
            //         "selector": "typeLike",
            //         "format": ["PascalCase"]
            //     },
            //     // Enum members should be PascalCase
            //     {
            //         "selector": "enumMember",
            //         "format": ["PascalCase", "UPPER_CASE"]
            //     }
            // ]
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],

        rules: {
            "no-undef": "off",
        },
    },
    // Optional: Override max-lines for specific file patterns
    {
        files: [
            "**/*.config.js",
            "**/*.config.ts",
            "**/*.config.mjs",
            "**/tailwind.config.js",
            "**/next.config.js",
            // Add other patterns you want to exclude
            "./src/components/ui/**/*",
            "**/scripts/**",
            "**/tests/**",
        ],
        rules: {
            "max-lines": "off", // Disable for config files
        },
    },
];

export default config;