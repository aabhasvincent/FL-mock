const path = require('path');
const nodeExternals = require('webpack-node-externals');
const  webpack = require('webpack');
const {writeFile} = require('fs/promises');
const ReactLoadablePlugin = require('@react-loadable/revised/webpack').ReactLoadablePlugin;

const clientConfig = {
  entry: './src/index.js', //entry point is where we hydrate the AppPage to the DOM
  output: {
    filename: 'bundle.js', //bundle.js is a compiled file from ./src/index.js contains all the React related functionalities
    path: path.resolve(__dirname, 'build'), //bundle.js gets created in build folder
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new ReactLoadablePlugin({
      async callback(manifest) {
        // save the manifest somewhere to be read by the server
        await writeFile(
          path.join(__dirname, 'build/react-loadable.json'),
          JSON.stringify(manifest, null, 2)
        )
      },
      absPath: true,
    }),
  ]
}

const serverConfig= {
  entry: './server/index.js',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
};

module.exports = [clientConfig, serverConfig]