module.exports = {
    baseUrl: '/',
    devServer: {                                    // webpack-dev-server 相关配置
        open: true,                                 //配置自动启动浏览器
        host: '127.0.0.1',
        port: 8080,                                 // 端口号
        https: false,
        hotOnly: false,                             // https:{type:Boolean}
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/'
                }
            }
        }
    },
    // 配置 全局scss文件
    css: {
        loaderOptions: {
          // pass options to sass-loader
          sass: {
            // @/ is an alias to src/
            // so this assumes you have a file named `src/variables.scss`
            data: `@import "src/styles/common.scss";`
          }
        }
    }
}