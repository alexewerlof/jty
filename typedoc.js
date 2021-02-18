// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('./package.json')

module.exports = {
  hideGenerator: true,
  tsconfig: './tsconfig.json',
  excludePrivate: true,
  includeVersion: true,
  out: 'docs',
  theme: 'minimal',
}
