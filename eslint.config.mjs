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

const MAX_FILE_LINES = 350;

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
                    max: MAX_FILE_LINES,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],

        rules: {
            "no-undef": "off",
        },
    },

    {
        files: [
            "**/*.config.js",
            "**/*.config.ts",
            "**/*.config.mjs",
            "**/tailwind.config.js",
            "**/next.config.js",

            "./src/components/ui/**/*",
            "**/scripts/**",
            "**/tests/**",
        ],
        rules: {
            "max-lines": "off",
        },
    },
];

export default config;