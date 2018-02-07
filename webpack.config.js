var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/components/ui-toolkit',
      './app/data',
      'libraries'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        loader: 'style!css',
        test: /\.css$/
      },
      {
        loader: 'url',
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/
      },
      {
        loader: 'file',
        test: /\.png$/
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets')
    ]
  },
  devtool: (process.env.NODE_ENV === "production") ? "cheap-module-source-map" : "eval-source-map"
};
