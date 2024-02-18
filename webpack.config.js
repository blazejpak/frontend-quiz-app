const path = require("path");
const HtmlWebpackplugin = require("html-webpack-plugin");
const { title } = require("process");

module.exports = {
  mode: "development",
  entry: { bundle: path.resolve(__dirname, "./src/script.ts") },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            preset: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackplugin({
      title: "Frontend Quiz App",
      filename: "index.html",
      template: "./src/template.html",
    }),
  ],
};
