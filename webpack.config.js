const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'R',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  node: {
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'R', to: 'R'}
    ])
  ]
}
