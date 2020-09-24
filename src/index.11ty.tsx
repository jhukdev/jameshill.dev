import { h } from 'preact';

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
import { Home } from './components/home';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

class Page {
  data(): IData {
    return {
      title: 'Home - JH',
    };
  }

  render({ title }: IData) {
    return (
      <Html title={title}>
        <Home />
      </Html>
    );
  }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Page };
