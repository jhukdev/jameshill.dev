import { h } from 'preact';
import { render } from 'preact-render-to-string';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
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
 * Layout
 *
 * -------------------------------- */

module.exports = ({ title, content }: IProps) =>
  render(
    <Html title={title}>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </Html>
  );
