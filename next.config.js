module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })

    return config
  },

  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  eslint: {
    dirs: ['src'],
  },
}
