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

class Page {
  data(): IData {
    return {
      title: 'Home - JH',
      cssPath: 'index.11ty.css',
      jsPath: 'index.entry.js',
    };
  }

  render({ title, cssPath, jsPath }: IData) {
    return (
      <Html title={title} cssPath={cssPath} jsPath={jsPath}>
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
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = Page;
