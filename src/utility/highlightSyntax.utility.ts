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
  const codeBlocks = [].slice.call(document.querySelectorAll('pre code'));
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

    console.warn(`Prism: language missing: ${key}`);
  }

  const syntax: any = Object.keys(loadList).map((key) => loadList[key]());

  await Promise.all([].concat(...syntax));

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
