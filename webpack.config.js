const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const sass = require("sass")
const path = require('path')
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: {
    bundle: [
      `${__dirname}/views/pages/forms/main.js`,
      `${__dirname}/views/javascript/forms/forms.js`,
      `${__dirname}/views/stylesheets/app.scss`
    ],
    companies: [
      `${__dirname}/views/pages/companies/main.js`
    ]
  },
  
  output: {
    filename: "[name].js",
    path: `${__dirname}/public/build`
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        use: 'svelte-loader'
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: sass,
              sassOptions: {
                includePaths: [`${__dirname}/node_modules`]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: [".mjs", ".js", ".ts", ".css", ".scss", ".sass", ".svelte"],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin
    ]
  },
  // Configuración que define lo que imprime en pantalla Webpack
  stats: {
    colors: true,
    modules: false,
    entrypoints: false,
    hash: false,
    version: false,
    builtAt: false
  }
}