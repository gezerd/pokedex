module.exports = {
  entry: './src/pokedex.js',
  output: {
    path: __dirname + '/src/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: [ 
          {
            loader: 'babel-loader',
            options: {
              presets: ['react']
            }
          }
        ]
      }
    ]
  },
  target: 'web',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  }
};