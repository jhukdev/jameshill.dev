const copydir = require('copy-dir');
const chokidar = require('chokidar');

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
  config.addPassthroughCopy({ public: './' });

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  });

  config.setUseGitIgnore(false);

  copydir.sync(articlePath, './src/_js/articles');

  chokidar.watch(`${articlePath}/**/*.md`).on('all', () => {
    copydir.sync(articlePath, './src/_js/articles');
  });

  return {
    dir: {
      input: 'src/_js',
      output: 'dist',
      layouts: 'layouts',
    },
  };
};
