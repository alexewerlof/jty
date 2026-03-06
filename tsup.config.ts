import { defineConfig, type Options } from 'tsup'

const baseConfig: Omit<Options, 'entry' | 'minify'> = {
    format: ['esm', 'iife', 'cjs'],
    bundle: true,
    outDir: 'lib',
    dts: true,
    sourcemap: true,
}

export default defineConfig([
    {
        entry: { index: 'src/index.ts' },
        minify: false,
        ...baseConfig,
    },
    {
        entry: { 'index.min': 'src/index.ts' },
        minify: true,
        ...baseConfig,
    },
])
