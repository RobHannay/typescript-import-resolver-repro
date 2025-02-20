import babelParser from '@babel/eslint-parser';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import workspaces from 'eslint-plugin-workspaces';
import globals from 'globals';
import tseslint from 'typescript-eslint';


// import webpackConfig from './webpack.config.js';

// Manually sort aliases as internal packages
// const aliases = Object.keys(webpackConfig.resolve.alias);
// const aliasesRegex = `^(${aliases.join('|')})($|/)`;
export default tseslint.config(
    {
        ignores: ['*/node_modules/*'],
    },

    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'valid-jsdoc': 'off',
            '@typescript-eslint/consistent-type-assertions': ['error', {assertionStyle: 'never'}],
            '@typescript-eslint/prefer-optional-chain': 'error',

            // The base rule can report incorrect errors
            'no-invalid-this': 'off',
            '@typescript-eslint/no-invalid-this': 'error',
        },
    },
    importPlugin.flatConfigs.recommended,
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            parser: babelParser,
        },
    },
    // Workspaces doesn't have a flat config yet
    {
        plugins: {
            workspaces,
        },
        rules: {
            'workspaces/no-cross-imports': [
                'error',
                {
                    allow: '@blink/core',
                },
            ],
        },
    },
    // JSX A11y
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    // Jest
    {
        files: ['**/*.js', '**/*.mjs'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
                '@babel/eslint-parser': ['.js', '.mjs'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
            // Gives false positives because RRD has two versions in our dependency tree.
            'import/ignore': ['react-router-dom'],
            react: {
                version: 'detect',
            },
            // 'import/internal-regex': aliasesRegex,
        },
        rules: {
            'require-jsdoc': 0,

            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: ['type', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],

                    alphabetize: {
                        order: 'asc',
                    },
                },
            ],

            'import/no-cycle': 'error',

            'import/no-unresolved': [
                'error',
                {
                    caseSensitiveStrict: true,
                },
            ],

            curly: ['error', 'all'],
            'no-nested-ternary': 'error',
            'object-shorthand': 'error',

            'spaced-comment': [
                'error',
                'always',
                {
                    markers: ['/'],
                },
            ],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/no-explicit-any': ['error'],

            '@typescript-eslint/array-type': [
                'error',
                {
                    default: 'generic',
                },
            ],

            '@typescript-eslint/no-restricted-imports': [
                'error',
                {
                    name: 'react-redux',
                    importNames: ['useSelector', 'useDispatch'],
                    message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
                },
            ],

            'workspaces/no-cross-imports': [
                'error',
                {
                    allow: '@blink/core',
                },
            ],


            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['*.css', '!*.module.css'],
                            importNames: ['default'],
                            message: 'For CSS modules, use the `.module.css` extension.',
                        },
                    ],
                },
            ],

        },
    },
    {
        files: [`!blink/i18n/**/*`], // Restrict the direct use of `useTranslation`
        rules: {
            '@typescript-eslint/no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['react-i18next'],
                            importNames: ['useTranslation'],
                            message: 'Use project-specific hook imports.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: [`!blink/**/*`], // Except the `i18n` dirs/hooks
        rules: {
            '@typescript-eslint/no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/blink/internal/**/*'],
                            message:
                                '`blink` package internal files; not intended to be used by other packages. ' +
                                'If you need it, firstly why? If you definitely need it, promote it out of the internal file.',
                        },
                    ],
                },
            ],
        },
    },
);
