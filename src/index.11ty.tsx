import { h } from 'preact';
import { IPage } from '@/model/page.model';
import style from './index.module.scss';

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

function Page(this: IPage) {
  return (
    <Html title="Home - JH" cssFile={this.styles('index.11ty.css')} jsPath="index.entry.js">
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
