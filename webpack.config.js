var webpack = require('webpack');
var path = require('path');
var envFile = require("node-env-file");

process.env.NODE_ENV = process.env.NODE_ENV || "development";


try{
  envFile(path.join(__dirname,"config/" + process.env.NODE_ENV + ".env"));
}catch(e){

}
console.log(process.env.NODE_ENV);
console.log(process.env.API_KEY);


module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    "script!bootstrap/dist/js/bootstrap.min.js",
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor:{
        warnings:false
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories:[
      'node_modules',
      './app/components',
      './app/api'
    ],
    alias: {
      app:'app',
      applicationStyles: 'app/styles/app.css',
      courseStyle: 'app/styles/components/course.css',
      actions: 'app/actions/actions.jsx',
      reducers:  'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[{
      loader:'babel-loader',
      query:{
        presets:['react','es2015','stage-0']
      },
      test:/\.jsx?$/,
      exclude:/(node_modules|bower_components)/
    },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
    {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader!'
        }]
  },

  devtool: process.env.NODE_ENV==="production"? undefined:'cheap-module-eval-source-map'
};
