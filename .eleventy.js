const { render } = require('preact-render-to-string');

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

  config.addTransform('transform-jsx', function (content, outputPath) {
    if (outputPath.endsWith('.html') && typeof content === 'object') {
      return render(content);
    }

    return content;
  });

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
