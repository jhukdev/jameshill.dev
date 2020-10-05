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

class Page {
  data(): IData {
    return {
      title: 'Articles - 11ty',
      cssPath: 'articles/index.11ty.css',
      jsPath: 'articles.entry.js',
    };
  }

  render({ title, cssPath, jsPath, collections }: IData) {
    return (
      <Html title={title} cssPath={cssPath} jsPath={jsPath}>
        <div class={style.wrapper}>
          <Header />
          <main class={style.content}>
            <Banner>
              <h1>Articles</h1>
            </Banner>
            <div class={style.container}>
              <ArticleList articles={collections.post} />
              <aside>SIDEBAR</aside>
            </div>
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

export { Page };
