const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules=true']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader?name=/[name].[ext]',
          options: {
            publicPath: '/',
            outputPath: '',
            name: '[name].[ext]'
          }
        },
      },
      {
        test: /\.(frag|vert|glsl)$/,
        use: 'raw-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
  mode: 'development'
}
