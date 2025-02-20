import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['*/node_modules/*'],
    },

    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
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
