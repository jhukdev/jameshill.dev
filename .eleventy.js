const { isValidElement } = require('preact');
const fs = require('fs');
const { render } = require('preact-render-to-string');

/* -----------------------------------
 *
 * 11ty
 *
 * -------------------------------- */

module.exports = function (config) {
  config.addPassthroughCopy('./src/_js/assets');
  config.addPassthroughCopy('./src/_js/articles/_images');

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  });

  config.setUseGitIgnore(false);

  config.addTransform('jsx', (content) => {
    if (isValidElement(content)) {
      return `<!doctype html>${render(content)}`;
    }

    return content;
  });

  config.addTransform('hash', (content, path) => {
    if (path.endsWith('.html')) {
      return transformFileHash(content);
    }

    return content;
  });

  config.addJavaScriptFunction('stylesheet', inlineStylesheet);

  config.addCollection('articles', (collection) =>
    collection
      .getAllSorted()
      .filter(({ data: { article = false, publish = false } }) => article && publish)
      .reverse()
  );

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

/* -----------------------------------
 *
 * Stylesheet
 *
 * -------------------------------- */

function inlineStylesheet(path) {
  const assets = require('./src/_js/assets.json');

  if (!assets[path]) {
    return;
  }

  const filePath = `./src/_js/assets/${assets[path]}`;

  return fs.readFileSync(filePath).toString();
}

/* -----------------------------------
 *
 * Hashes
 *
 * -------------------------------- */

function transformFileHash(content) {
  const assets = require('./src/_js/assets.json');
  const keys = Object.keys(assets);
  const regex = (key) => new RegExp(`(src|href)="(.*)${key}"`);

  return keys.reduce(
    (result, key) => result.replace(regex(key), `$1=$2${assets[key]}"`),
    content
  );
}
