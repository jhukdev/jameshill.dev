import { h } from 'preact';
import { ICollections } from '@/modules/shared/model/collections.model';
import { IPage } from '@/modules/shared/model/page.model';
import style from './list.module.scss';

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

import { Html } from '@/modules/shared/components';
import { Header } from '@/modules/shared/components/header';
import { Banner } from '@/modules/shared/components/banner';
import { ArticleList } from '@/modules/articles/components/articleList';
import { ProfileImage } from '@/modules/shared/components/profileImage';
import { RecentArticles } from '@/modules/articles/components/recentArticles';
import { Footer } from '@/modules/shared/components/footer';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page(this: IPage, { collections: { articles } }: IData) {
  const inlineCss = this.getFileContents('articles/list.11ty.css');

  return (
    <Html title="Articles - 11ty" inlineCss={inlineCss} jsPath="articles/list.entry.js">
      <div class={style.wrapper}>
        <Header />
        <main class={style.content}>
          <Banner>
            <h1>Articles</h1>
          </Banner>
          <div class={style.container}>
            <div class={style.layout}>
              <ArticleList className={style.articles} articles={articles} />
              <aside>
                <ProfileImage className={style.profile} />
                <div class={style.recent}>
                  <h3 class={style.heading}>Recent Articles</h3>
                  <RecentArticles articles={articles} />
                </div>
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

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'articles/index.html',
  }),
};
