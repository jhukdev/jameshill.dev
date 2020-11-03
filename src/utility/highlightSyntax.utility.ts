/* -----------------------------------
 *
 * Languages
 *
 * -------------------------------- */

const languages = {
  typescript: () =>
    import(/* webpackChunkName: "syntax" */ 'prismjs/components/prism-typescript'),
  javascript: () => import('prismjs/components/prism-javascript'),
  bash: () => import('prismjs/components/prism-bash'),
  scss: () => import(/* webpackChunkName: "syntax" */ 'prismjs/components/prism-scss'),
  json: () => import('prismjs/components/prism-json'),
  tsx: () => [
    import(/* webpackChunkName: "syntax" */ 'prismjs/components/prism-typescript'),
    import(/* webpackChunkName: "syntax" */ 'prismjs/components/prism-jsx'),
    import(/* webpackChunkName: "syntax"*/ 'prismjs/components/prism-tsx'),
  ],
};

/* -----------------------------------
 *
 * Highlight
 *
 * -------------------------------- */

async function applySyntaxHighlight() {
  const codeBlocks: Element[] = [].slice.call(document.querySelectorAll('pre code'));
  const loadList = {};

  if (!codeBlocks.length) {
    return;
  }

  const [{ highlightAll }] = await Promise.all([
    import('prismjs'),
    import('@/styles/monokai.css'),
  ]);

  for (const block of codeBlocks) {
    const key = getLanguageFromClass(block.className);

    if (languages[key]) {
      loadList[key] = languages[key];

      continue;
    }
  }

  const syntax = Object.keys(loadList).map((key) => loadList[key]());

  const plugins = [import('prismjs/plugins/highlight-keywords/prism-highlight-keywords')];

  await Promise.all([...plugins].concat(...syntax));

  highlightAll();
}

/* -----------------------------------
 *
 * getLanguage
 *
 * -------------------------------- */

function getLanguageFromClass(className: string) {
  const [languageClass] = className
    .split(' ')
    .filter((value) => value.indexOf('language-') > -1);

  return languageClass.replace('language-', '');
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { applySyntaxHighlight };
