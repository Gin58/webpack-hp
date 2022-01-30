import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import * as webpack from "webpack";
import entries from "./webpack/entries";

const NODE_ENV = "development";
// const NODE_ENV = "production";

let rules: webpack.RuleSetRule[] = [
  {
    test: /\.(ts|js)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
      },
    ],
  },
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: { url: true },
      },
      "sass-loader",
    ],
  },
  {
    test: /\.(jpe?g|gif|png)$/i,
    generator: {
      filename: "images/[name][ext][query]",
    },
    type: "asset/resource",
  },
  {
    test: /\.(html)$/,
    use: {
      loader: "html-loader",
    },
  },
];

// es5がtrueならばバベルを適用
if (process.env.es5) {
  rules.push({
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  });
}

// const htmlFiles = globule.find("src/html/**/*.html");

// let rules: webpack.
module.exports = {
  mode: NODE_ENV,
  entry: entries,
  module: {
    rules: rules,
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
