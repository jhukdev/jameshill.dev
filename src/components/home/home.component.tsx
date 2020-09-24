import { h } from 'preact';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

function Home() {
  console.log('Style:', style);

  return <p class={style.text}>Oh right</p>;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Home };
