var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
    mode: "development",
    entry: {
        index: `${SRC_DIR}/index.jsx`,
    },
    output: {
      path: DIST_DIR,
      filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    "targets": "defaults" 
                  }],
                  '@babel/preset-react'
                ]
              }
            }]
          }
        ]
      },
  }