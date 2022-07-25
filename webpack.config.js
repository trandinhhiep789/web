const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let mode = "development";

const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./index.html"
  })
];
if (process.env.NODE_ENV === "production") {
  mode = "production"
}
if(process.env.WEBPACK_SERVE){
  // We only want React Hot Reloading in serve mode
  console.log("process.env.WEBPACK_SERVE", process.env.WEBPACK_SERVE)
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  entry: "./src/index.js",
  mode: mode,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js", // setup caching cho web chạy nhanh hơn 
    clean: true, // xét true để mỗi lần `npm run build` thì nó sẽ lấy file bản mới thay cho bản cũ, mặc định là nó không thay thế vì chỗ này đã setup caching cho web chạy nhanh hơn  
    assetModuleFilename: "images/[hash][ext][query]",
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
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url() in background-image
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: "asset",

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      }
    ]
  },
 
  plugins: plugins
};
