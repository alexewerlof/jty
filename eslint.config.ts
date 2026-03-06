import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    ...tseslint.configs.recommended,
    {
        ignores: ['doc/**', 'lib/**'],
    },
    {
        files: ['**/*.test.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
])
