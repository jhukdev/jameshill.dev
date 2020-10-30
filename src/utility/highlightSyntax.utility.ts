/* -----------------------------------
 *
 * Languages
 *
 * -------------------------------- */

const languages = {
  typescript: () => import(/* webpackChunkName: "prism" */ 'prismjs/components/prism-typescript'),
  javascript: () => import('prismjs/components/prism-javascript'),
  bash: () => import('prismjs/components/prism-bash'),
  scss: () => import(/* webpackChunkName: "prism" */ 'prismjs/components/prism-scss'),
  json: () => import('prismjs/components/prism-json'),
  tsx: () => [
    import(/* webpackChunkName: "prism" */ 'prismjs/components/prism-typescript'),
    import(/* webpackChunkName: "prism" */ 'prismjs/components/prism-jsx'),
    import(/* webpackChunkName: "prism"*/ 'prismjs/components/prism-tsx'),
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
    import(/* webpackChunkName: "prism" */ 'prismjs'),
    import(/* webpackChunkName: "prism" */ '@/styles/monokai.css'),
  ]);

  for (const block of codeBlocks) {
    const key = getLanguageFromClass(block.className);

    if (languages[key]) {
      loadList[key] = languages[key];

      continue;
    }
  }

  const syntax = Object.keys(loadList).map((key) => loadList[key]());

  await Promise.all([].concat(...syntax));

  highlightAll();
}

/* -----------------------------------
 *
 * getLanguage
 *
 * -------------------------------- */

function getLanguageFromClass(className: string) {
  const [languageClass] = className.split(' ').filter((value) => value.indexOf('language-') > -1);

  return languageClass.replace('language-', '');
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { applySyntaxHighlight };
