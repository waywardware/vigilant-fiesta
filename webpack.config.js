const path = require('path');

console.log(__dirname);
let common_config = {
  node: {
    __dirname: true
  },
  mode: process.env.ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
           path.resolve(__dirname, "src/ui")
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
};

module.exports = [
  Object.assign({}, common_config, {
    target: 'electron-main',
    entry: {
      Main: './src/main/Main.ts',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'compiled/src')
    },
  }),
  Object.assign({}, common_config, {
    target: 'electron-renderer',
    entry: {
      Renderer: './src/renderer/Renderer.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'compiled/src')
    },
  })
]