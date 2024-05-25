const path = require('path');

module.exports = {
  module: {
    rules: [

      {
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Output file name and extension
              outputPath: 'images/', // Output path for the images
            },
          },
        ],
      },
    ],
  },
};