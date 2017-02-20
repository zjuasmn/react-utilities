module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: [['es2015', {modules: false}],'react','stage-0'],
        plugins: ['syntax-dynamic-import']
      }
    }]
  },
  externals:{
    'react':'React',
    'react-dom':'ReactDOM',
    // 'moment':'moment',
  }
};
