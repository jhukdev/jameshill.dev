import { h } from 'preact';
import { render } from 'preact-render-to-string';

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  title: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from './components/shared';

/* -----------------------------------
 *
 * View
 *
 * -------------------------------- */

function Home() {
  return <p>Oh right!!!!</p>;
}

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

module.exports = class Page {
  data(): IData {
    return {
      title: 'Home - JH',
    };
  }

  render({ title }: IData) {
    return render(
      <Html title={title}>
        <Home />
      </Html>
    );
  }
};
