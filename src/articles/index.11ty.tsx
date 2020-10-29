import { h } from 'preact';
import { ICollections } from '@/model/collections.model';
import style from './index.module.scss';

/* -----------------------------------
 *
 * IData
 *
 * -------------------------------- */

interface IData {
  collections?: ICollections;
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
import { ProfileImage } from '@/components/profileImage';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page({ collections: { articles } }: IData) {
  return (
    <Html
      title="Articles - 11ty"
      cssFile={this.stylesheet('articles/index.11ty.css')}
      jsPath="articleList.entry.js"
    >
      <div class={style.wrapper}>
        <Header />
        <main class={style.content}>
          <Banner>
            <h1>Articles</h1>
          </Banner>
          <div class={style.container}>
            <div class={style.layout}>
              <ArticleList articles={articles} />
              <aside>
                <ProfileImage />
              </aside>
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
