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
    <div class={style.wrapper}>
      <Header />
      <main class={style.content}>YOLO</main>
    </div>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Home };
