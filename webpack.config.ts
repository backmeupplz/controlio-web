var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');

export var commonPlugins = [
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src'),
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),

  // Loader options
  new webpack.LoaderOptionsPlugin({

  }),

];
export var commonConfig = {
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  resolve: {
    modules: [root('node_modules') ],
    alias: {
      app: path.resolve(__dirname, 'src/+app/'),
      npm: '/',
      template: path.resolve(__dirname, 'src/template/'),
      rxjs_lib: 'rxjs',
      img: path.resolve(__dirname, 'src/assets/'),
      css: path.resolve(__dirname, 'src/css'),
      fonts_path: path.resolve(__dirname, 'src/fonts/'),
    },
    extensions: ['.js','.jsx', '.ts', '.json', '.css', '.scss', '.sass', '.pug']
  },
  context: __dirname,
  output: {
    publicPath: '',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // TypeScript
      { test: /\.ts$/,   use: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(pug|jade)$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.less$/,
        //'csslint-loader'
        loaders: ['style-loader','css-loader','less-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      },
      // Apply loader
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // Use commonPlugins.
  ],
};

// Client.
export var clientPlugins = [

];
export var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


// Server.
export var serverPlugins = [

];
export var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    filename: 'index.js',
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { test: /@angular(\\|\/)material/, use: "imports-loader?window=>global" }
    ],
  },
  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
  ),
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];




// Helpers
export function includeClientPackages(packages, localModule?: string[]) {
  return function(context, request, cb) {
    if (localModule instanceof RegExp && localModule.test(request)) {
      return cb();
    }
    if (packages instanceof RegExp && packages.test(request)) {
      return cb();
    }
    if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
      return cb();
    }
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      return cb(null, 'commonjs ' + request);
    }
    return cb();
  };
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
