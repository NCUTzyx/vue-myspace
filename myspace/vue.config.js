module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: `https://app165.acapp.acwing.com.cn/api`,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  },
    publicPath: '/static'
};


