module.exports = {
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/indent': ['warn', 4, { SwitchCase: 1 }],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
        'arrow-body-style': 0,
        'consistent-return': 0,
        'import/no-cycle': ['warn', { maxDepth: 1 }],
        'import/prefer-default-export': 0,
        'no-alert': 0,
        'no-console': 0,
        'no-param-reassign': ['warn', { 'props': false }],
        'no-tabs': 0,
        'no-multiple-empty-lines': ['warn', { max: 3, maxEOF: 1, maxBOF: 0 }],
        'linebreak-style': ['warn', 'windows'],
        'object-curly-newline': ['warn', { 'consistent': true }]
    },
    overrides: [
        {
            files: ['**/*.test.ts', '**/*.spec.ts', 'src/tests/**/*.ts', 'src/tests/*.js'],
            env: {
                jest: true
            },
            plugins: ['jest'],
            rules: {
                'import/no-extraneous-dependencies': 0,
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error'
            }
        }
    ],
};
