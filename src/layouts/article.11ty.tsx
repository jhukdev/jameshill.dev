import { h } from 'preact';
import { render } from 'preact-render-to-string';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IData {
  title: string;
  content: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '../components/shared';

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

export class Page {
  render({ title, content }: IData) {
    return render(
      <Html title={title}>
        <article dangerouslySetInnerHTML={{ __html: content }} />
      </Html>
    );
  }
}
