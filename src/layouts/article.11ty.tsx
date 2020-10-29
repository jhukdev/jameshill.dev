/* eslint-disable react/no-danger */
import { h } from 'preact';
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
}: IData) {
  return (
    <Html title={title} cssPath={cssPath} jsPath={jsPath}>
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
                <h3 class={style.heading}>Categories</h3>
                <nav class={style.tags}>
                  {tags.map((tag) => (
                    <a href={`/articles/${tag}`}>{tag}</a>
                  ))}
                </nav>
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
