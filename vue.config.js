// const vuxLoader = require("vux-loader");
const path = require("path");
function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    // 给文件夹取别名
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("views", resolve("src/views"))
            .set("js", resolve("src/js"))
            .set("components", resolve("src/components"))
            .set("css", resolve("src/assets/css"))
            .set("util", resolve("src/util"));
    },
    //使用vux
    // configureWebpack: config => {
    //     vuxLoader.merge(config, {
    //         options: {},
    //         plugins: ["vux-ui"]
    //     });
    // },
    // 基本路径
    publicPath: "./",
    // 输出文件目录
    // outputDir: process.env.NODE_ENV === "development" ? "devdist" : "dist", // 不同的环境打不同包名
    outputDir: "dist",
    assetsDir: "static", //静态资源目录名称
    // webpack-dev-server 相关配置
    devServer: {
        host: "localhost",
        port: 3000
    },
    // 反代理设置
    devServer: {
        // 设置代理
        proxy: {
            "/api": {
                target: "http://121.40.243.200:80", // 域名
                // ws: true, // 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    }
};
