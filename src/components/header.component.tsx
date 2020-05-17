import React from 'react';
import style from './header.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  siteTitle: string;
}

/* -----------------------------------
 *
 * Header
 *
 * -------------------------------- */

function Header({ siteTitle }: IProps) {
  return (
    <header className={style.header}>
      <a href="/" className={style.logo}>
        jhdev
      </a>
    </header>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Header;
