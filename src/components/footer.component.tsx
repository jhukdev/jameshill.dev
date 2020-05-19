import React from 'react';
import style from './footer.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Social from './social.component';

/* -----------------------------------
 *
 * Footer
 *
 * -------------------------------- */

function Footer() {
  return (
    <footer className={style.footer}>
      <Social className={style.social} />
    </footer>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Footer;
