const glob = require('glob');
const path = require('path');
const fs = require('fs');

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

module.exports = {
  mode: 'development',
  entry: glob.sync(__dirname + '/src/**/*.11ty.ts*').reduce(getEntryFile, {}),
  context: path.join(__dirname, '/src/'),
  cache: true,
  target: 'node',
  externals: fs.readdirSync('node_modules'),
  output: {
    path: path.join(__dirname, '/src/_js'),
    filename: '[name].js',
    library: 'Page',
    libraryExport: 'Page',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, `./src/`),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};

/* -----------------------------------
 *
 * Entry
 *
 * -------------------------------- */

function getEntryFile(result, file) {
  const [name] = file.split('src').slice(-1);

  result[name.replace('.tsx', '')] = file;

  return result;
}
