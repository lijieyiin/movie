const webpack = require('webpack');
const path = require('path');

module.exports = {
  devServer: {
    host: "0.0.0.0",  //ip
    port: 8080,             //端口
    // proxy:{//代理方式
    //   "/api":{
    //       target:'http://192.168.31.20:3000/',
    //       changeOrigin:true,
    //       wx:true,
    //       pathRewrite:{
    //         "^/api":''
    //       }
    //   }
    // }
  },
  outputdir: '../nodeServer/dist', //构建输出目录 -- 使得打包后自动将dist文件夹复制到 nodeServer
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('mui', path.resolve(__dirname, './src/assets/mui/js/mui.js'))
  },
  // 配置mui插件
  chainWebpack: config => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "./src"))
      .set("mui", path.resolve(__dirname, "./src/assets/mui/js/mui.js"));
  },
  configureWebpack: {
    // 增加一个plugins  
    plugins: [
      new webpack.ProvidePlugin({
        mui: "mui",
        "window.mui": "mui"
      })
    ]
  },
  lintOnSave: false  //取消 eslint 验证
}