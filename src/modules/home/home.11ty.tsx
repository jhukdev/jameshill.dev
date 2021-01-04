import { h } from 'preact';
import { IPage } from '@/modules/shared/model/page.model';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/modules/shared/components';
import { Header } from '@/modules/shared/components/header';
import { MainIntro } from '@/modules/home/components/mainIntro';
import { Footer } from '@/modules/shared/components/footer';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page(this: IPage) {
  return (
    <Html
      title="Home - JH"
      cssFile={this.styles('home/home.11ty.css')}
      jsPath="home/home.entry.js"
    >
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

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'index.html',
  }),
};
