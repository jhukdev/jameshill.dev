/* eslint-disable react/no-danger */
import { h } from 'preact';
import { ICollections } from '@/model/collections.model';
import style from './article.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IData {
  title: string;
  content: string;
  cssPath: string;
  jsPath: string;
  tags: string[];
  collections?: ICollections;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '../components/shared';
import { Header } from '@/components/header';
import { Banner } from '@/components/banner';
import { ProfileImage } from '@/components/profileImage';
import { RecentArticles } from '@/components/recentArticles';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

function Page({
  title,
  content,
  cssPath = 'layouts/article.11ty.css',
  jsPath = 'article.entry.js',
  tags,
  collections: { articles },
}: IData) {
  return (
    <Html title={title} cssFile={this.stylesheet(cssPath)} jsPath={jsPath}>
      <div class={style.wrapper}>
        <Header />
        <main class={style.content}>
          <Banner>
            <h3>Articles</h3>
          </Banner>
          <div class={style.container}>
            <div class={style.layout}>
              <article>
                <h1 class={style.title}>{title}</h1>
                <div
                  class={style.article}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </article>
              <aside>
                <ProfileImage className={style.profile} />
                <h3 class={style.heading}>Recent Articles</h3>
                <RecentArticles className={style.recent} articles={articles} />
                {/* <h3 class={style.heading}>Tags</h3>
                <nav class={style.tags}>
                  {tags.map((tag) => (
                    <span href={`/articles/${tag}`}>{tag}</span>
                  ))}
                </nav> */}
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
