const copydir = require('copy-dir');
const chokidar = require('chokidar');

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const WATCH = process.argv.includes('--watch');

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const articlePath = './src/articles';

/* -----------------------------------
 *
 * 11ty
 *
 * -------------------------------- */

module.exports = function (config) {
  config.addPassthroughCopy('./src/_js/assets');

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  });

  config.setUseGitIgnore(false);

  copydir.sync(articlePath, './src/_js/articles');

  if (WATCH) {
    chokidar.watch(`${articlePath}/**/*.md`).on('all', () => {
      copydir.sync(articlePath, './src/_js/articles');
    });
  }

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src/_js',
      output: 'dist',
      layouts: 'layouts',
      includes: '_includes',
    },
  };
};
