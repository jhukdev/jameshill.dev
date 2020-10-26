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
  collections?: any;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/components/shared';
import { Header } from '@/components/header';
import { Banner } from '@/components/banner';
import { ArticleList } from '@/components/articleList';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page({ collections }: IData) {
  return (
    <Html
      title="Articles - 11ty"
      cssPath="articles/index.11ty.css"
      jsPath="articles.entry.js"
    >
      <div class={style.wrapper}>
        <Header />
        <main class={style.content}>
          <Banner>
            <h1>Articles</h1>
          </Banner>
          <div class={style.container}>
            <div class={style.layout}>
              <ArticleList articles={collections.post} />
              <aside>SIDEBAR</aside>
            </div>
          </div>
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
