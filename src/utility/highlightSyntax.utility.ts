const highlight = () => import('highlight.js/lib/core');

/* -----------------------------------
 *
 * Languages
 *
 * -------------------------------- */

const languages = {
  javascript: () => import('highlight.js/lib/languages/javascript'),
  typescript: () => import('highlight.js/lib/languages/typescript'),
  json: () => import('highlight.js/lib/languages/json'),
  bash: () => import('highlight.js/lib/languages/bash'),
};

/* -----------------------------------
 *
 * Highlight
 *
 * -------------------------------- */

async function applySyntaxHighlight() {
  const codeBlocks = [].slice.call(document.querySelectorAll('pre code'));
  const languageList = {};

  if (!codeBlocks.length) {
    return;
  }

  const library = await highlight();

  await import('highlight.js/styles/monokai-sublime.css');

  for (const block of codeBlocks) {
    const language = getLanguageFromClass(block.className);

    languageList[language] = languages[language];
  }

  const languageKeys = Object.keys(languageList);
  const languageFiles = await Promise.all(languageKeys.map((key) => languageList[key]()));

  languageFiles.forEach((language, index) =>
    library.registerLanguage(languageKeys[index], language.default)
  );

  for (const block of codeBlocks) {
    library.highlightBlock(block as HTMLElement);
  }
}

/* -----------------------------------
 *
 * getLanguage
 *
 * -------------------------------- */

function getLanguageFromClass(className: string) {
  const [languageClass] = className
    .split(' ')
    .filter((value) => value.indexOf('language') > -1);

  return languageClass.replace('language-', '');
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { applySyntaxHighlight };
