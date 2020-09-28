import { h } from 'preact';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Header } from '@/components/header';
import { MainIntro } from '@/components/mainIntro';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Home
 *
 * -------------------------------- */

function Home() {
  return (
    <div class={style.wrapper}>
      <Header />
      <main class={style.content}>
        <MainIntro />
      </main>
      <Footer />
    </div>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Home };
