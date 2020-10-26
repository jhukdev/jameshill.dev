import { h } from 'preact';
import style from './index.module.scss';

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  title: string;
  cssPath: string;
  jsPath: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from './components/shared';
import { Header } from '@/components/header';
import { MainIntro } from '@/components/mainIntro';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page() {
  return (
    <Html title="Home - JH" cssPath="index.11ty.css" jsPath="index.entry.js">
      <div class={style.wrapper}>
        <Header />
        <main class={style.content}>
          <MainIntro />
        </main>
        <Footer />
      </div>
    </Html>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = Page;
