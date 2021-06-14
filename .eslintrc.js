/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    ignorePatterns: ['**/prisma/client', '**/src/generated'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/indent': ['warn', 4, { SwitchCase: 1 }],
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unsafe-assignment': 0, // not performant
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/promise-function-async': 'warn',
        'arrow-body-style': 0,
        'class-methods-use-this': 0,
        'consistent-return': 0,
        'import/no-cycle': 0, // not performant
        'import/prefer-default-export': 0,
        'linebreak-style': ['warn', 'windows'],
        'max-classes-per-file': 0,
        'max-len': ['error', 100, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'no-console': 0,
        'no-multiple-empty-lines': ['warn', { max: 3, maxBOF: 0, maxEOF: 1 }],
        'no-param-reassign': ['warn', { props: false }],
        'no-tabs': 0,
        'no-void': ['error', { allowAsStatement: true }],
        'object-curly-newline': ['warn', { consistent: true }],
    },
    overrides: [
        {
            files: ['**/*.js'],
            rules: {
                'import/no-extraneous-dependencies': 0,
                '@typescript-eslint/ban-ts-comment': 0,
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                '@typescript-eslint/no-var-requires': 0,
            },
        },
        {
            files: ['**/*.test.ts', '**/*.spec.ts', 'src/tests/**/*.ts', 'src/tests/*.js'],
            env: {
                jest: true,
            },
            plugins: ['jest'],
            rules: {
                'import/no-extraneous-dependencies': 0,
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error',
            },
        },
    ],
};
