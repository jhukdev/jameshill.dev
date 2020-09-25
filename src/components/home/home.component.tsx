import { h } from 'preact';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Header } from '@/components/header';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

function Home() {
  return (
    <main class={style.content}>
      <Header />
    </main>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Home };
