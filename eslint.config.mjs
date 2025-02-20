import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
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
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.js', '**/*.mjs'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            'import/no-unresolved': [
                'error',
                {
                    caseSensitiveStrict: true,
                },
            ],
        },
    },
);
