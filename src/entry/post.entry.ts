import highlight from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/monokai-sublime.css';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import '@/components/header';

/* -----------------------------------
 *
 * Highlight
 *
 * -------------------------------- */

highlight.registerLanguage('javascript', javascript);
highlight.registerLanguage('json', json);

document.querySelectorAll('pre code').forEach((block) => {
  highlight.highlightBlock(block as HTMLElement);
});
