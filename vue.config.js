module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'api': '@/api',
        'components': '@/components',
        'views': '@/views'
      }
    }
  }
}