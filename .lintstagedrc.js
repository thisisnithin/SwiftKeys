const path = require('path')
const { ESLint } = require('eslint')

const buildEslintCommand = async filenames => {
  try {
    const eslint = new ESLint()
    const isIgnored = await Promise.all(
      filenames.map(file => {
        return eslint.isPathIgnored(file)
      })
    )
    return `next lint --fix --file ${filenames
      .filter((_, i) => !isIgnored[i])
      .map(f => path.relative(process.cwd(), f))
      .join(' --file ')}`
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    async files => {
      return await buildEslintCommand(files)
    },
    'prettier --write',
  ],
}
