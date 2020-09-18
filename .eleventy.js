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

  return {
    dir: {
      input: 'src/.js',
      output: 'dist',
      layouts: 'layouts',
    },
  };
};
