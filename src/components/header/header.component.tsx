import { h } from 'preact';
import style from './header.module.scss';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

function Header() {
  return (
    <header class={style.header}>
      <a href="/" class={style.logo}>
        James.
      </a>
      <nav class={style.menu}>
        <a href="/articles">Projects</a>
        <a href="/articles">Articles</a>
      </nav>
    </header>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Header };
