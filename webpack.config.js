const path = require('path');


module.exports = {
  entry: [
    path.resolve(__dirname, 'demo/index.js'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   loaders: [
      //     'file?hash=sha512&digest=hex&name=i/[hash].[ext]',
      //     'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=true'
      //   ]
      // },
    ]
  },
  output: {filename: 'index.bundle.js', path: path.resolve(__dirname, 'public')},
  plugins: [
    
  ]
};
