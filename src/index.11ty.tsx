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
import { Home } from './components/home';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

export class Page {
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
}
