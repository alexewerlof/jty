// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('./package.json')

module.exports = {
  hideGenerator: true,
  tsconfig: './tsconfig.json',
  module: 'commonjs',
  excludeNotExported: true,
  excludePrivate: true,
  includeVersion: true,
  stripInternal: true,
  excludeExternals: true,
  mode: 'file',
  out: 'docs',
  theme: 'minimal',
}
