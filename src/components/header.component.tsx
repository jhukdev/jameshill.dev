import React from 'react';
import { Link } from 'gatsby';
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
      <Link className={style.logo} title={siteTitle} to="/">
        james.
      </Link>
    </header>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Header;
