/* -----------------------------------
 *
 * Languages
 *
 * -------------------------------- */

const languages = {
  typescript: () => import('prismjs/components/prism-typescript'),
  javascript: () => import('prismjs/components/prism-javascript'),
  bash: () => import('prismjs/components/prism-bash'),
  scss: () => import('prismjs/components/prism-scss'),
  json: () => import('prismjs/components/prism-json'),
  tsx: () => [
    import('prismjs/components/prism-typescript'),
    import('prismjs/components/prism-jsx'),
    import('prismjs/components/prism-tsx'),
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
    import('@/styles/monokai.css'),
  ]);

  for (const block of codeBlocks) {
    const key = getLanguageFromClass(block.className);

    if (languages[key]) {
      loadList[key] = languages[key];

      continue;
    }
  }

  const syntax = Object.keys(loadList)
    .map((key) => loadList[key]())
    .map(async (item) => {
      if (Array.isArray(item)) {
        for (let file of item) {
          await file;
        }

        return;
      }

      return item;
    });

  await Promise.all(syntax);

  await highlightAll();
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
