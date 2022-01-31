import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import * as webpack from "webpack";
import entries from "./webpack/entries";
import globule from "globule";
import HtmlWebpackPlugin from "html-webpack-plugin";

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

// let rules: webpack.
const config: webpack.Configuration = {
  mode: NODE_ENV,
  entry: entries,
  module: {
    rules: rules,
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "js/[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
    },
    roots: [path.resolve(__dirname, "src")],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
  ],
};

const htmlFiles = globule.find("src/html/**/*.html");
htmlFiles.forEach((src) => {
  const htmlname = src.replace(/src\/html\//g, "");
  const filename = htmlname.substring(0, htmlname.lastIndexOf("."));
  config.plugins?.push(
    new HtmlWebpackPlugin({
      filename: `${path.resolve(__dirname, "dist")}/${htmlname}`,
      inject: "body",
      template: src,
      minify: false,
      chunks: [filename, `${filename}.css`],
    })
  );
});

export default config;
