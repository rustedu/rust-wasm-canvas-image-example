const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const dist = path.resolve(__dirname, "dist");
module.exports = {
  mode: 'production',
  entry: {
    index: "./src/index.js"
  },
  devtool: 'source-map',
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
  output: {
    path: dist,
    filename: "[name].js",
  },
  devServer: {
    static: dist,
  },
  plugins: [
    new CopyPlugin({
      patterns: [path.resolve(__dirname, "static")]
    }),
  ],
}