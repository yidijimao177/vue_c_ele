
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://c.iwanmen.com/element/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  },
  css: {
    // modules:false,
    // extract:true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }
}
/*
这段配置就算是css的预加载配置，rootValue  75.0的值其实就是代表ui设计稿的750px的像素，引用的时候css直接写宽750px就相当于100％，它会自动根据屏幕进行计算成rem，无需对原测量值进行REM的换算（这里推荐37.5，结合2x的设计图开发，因为vant的组件你会发现37.5更为适合）。

只配置这一个还不够，只做到这一步是没法自适应的，因为它本身没有对html的font-size进行计算，基本不会变化，我们找到入口文件main.js，引入以下代码即可：
import 'amfe-flexible';
*/