import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import * as webpack from "webpack";

const NODE_ENV = "development";

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
      process.env.NODE_ENV !== "production"
        ? "style-loader"
        : MiniCssExtractPlugin.loader,
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

// let rules: webpack.
module.exports = {
  mode: NODE_ENV,
  entry: {
    main: "./src/js/main.ts",
    about: ["./src/js/about.js", "./src/styles/about.scss"],
  },
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
