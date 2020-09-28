import { h } from 'preact';
import style from './footer.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { SocialMenu } from '@/components/socialMenu';

/* -----------------------------------
 *
 * Footer
 *
 * -------------------------------- */

function Footer() {
  return (
    <footer class={style.footer}>
      <SocialMenu className={style.social} />
    </footer>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Footer };
