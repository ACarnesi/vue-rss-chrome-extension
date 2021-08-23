var path = require('path');
const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin"); 
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

//Need to figure out how to better automatically build changes to background.js and manfiest.js
//Good resource is: https://github.com/streaver/vue-web-extension-example/blob/master/webpack.config.js

//I think I need to make separate modules for popup and background?
const config = {
  mode: process.env.NODE_ENV,
  entry: {
    popup: './src/popup.js',
    background: './src/background/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    minimize: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: ['/popup.html'],
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,

        loader: "file-loader",
        options: {
          name: "[path][name].[ext]?emitFile=false"
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ]
  },
  plugins: [
    new VueLoaderPlugin(), 
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyPlugin({
      patterns: [
        // { from: "icons", to: "icons", ignore: ["icon.xcf"] },
        {
          from: "./public/popup.html",
          to: "popup.html",
          transform: transformHtml
        },
        {
          from: "./public/manifest.json",
          to: "manifest.json",
          transform: content => {
            const jsonContent = JSON.parse(content);
            if (config.mode === "development") {
              jsonContent["content_security_policy"] =
                "script-src 'self' 'unsafe-eval'; object-src 'self'";
            }

            return JSON.stringify(jsonContent, null, 2);
          }
        }
      ]
    })
  ]
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}

if (process.env.HMR === 'true') {
  // config.plugins = (config.plugins || []).concat([
  //   new ChromeExtensionReloader(),
  // ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;