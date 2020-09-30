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
  articles: any[];
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
      articles: [
        { id: 1, title: 'Lorem ipsum dolor' },
        { id: 2, title: 'Sit amet amour' },
      ],
    };
  }

  render({ title, cssPath, jsPath, articles }: IData) {
    return (
      <Html title={title} cssPath={cssPath} jsPath={jsPath}>
        <div class={style.wrapper}>
          <Header />
          <main class={style.content}>
            <Banner>
              <h1>Articles</h1>
            </Banner>
            <div class={style.container}>
              <ArticleList articles={articles} />
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
