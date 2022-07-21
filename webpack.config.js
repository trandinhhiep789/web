const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const plugins = [
  new HtmlWebpackPlugin({
    template: "./index.html"
  }),
  new MiniCssExtractPlugin()
];

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[contenthash].js", // setup caching cho web chạy nhanh hơn 
    clean: true, // xét true để mỗi lần `npm run build` thì nó sẽ lấy file bản mới thay cho bản cũ, mặc định là nó không thay thế vì chỗ này đã setup caching cho web chạy nhanh hơn  
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    host: "dev.tms.tterpbeta.vn",
    port: 8089,
    hot: true,
    compress: true, 
    https: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]                       
      }, 
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
        // according to the docs, sass-loader should be at the bottom, which
        // loads it first to avoid prefixes in your sourcemaps and other issues.
      }
    ]
  },
 
  plugins: plugins
};
