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
    const notIsIgnored = filenames.filter((_, i) => !isIgnored[i])
    if (notIsIgnored.length === 0) {
      return 'next lint --fix'
    } else {
      return `next lint --fix --file ${notIsIgnored
        .map(f => path.relative(process.cwd(), f))
        .join(' --file ')}`
    }
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
