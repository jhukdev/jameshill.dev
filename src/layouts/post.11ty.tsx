/* eslint-disable react/no-danger */
import { h } from 'preact';
import style from './post.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IData {
  title: string;
  content: string;
  cssPath: string;
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '../components/shared';
import { Header } from '@/components/header';
import { Banner } from '@/components/banner';
import { Footer } from '@/components/footer';

/* -----------------------------------
 *
 * Article
 *
 * -------------------------------- */

class Page {
  render({ title, content, cssPath }: IData) {
    return (
      <Html title={title} cssPath={cssPath}>
        <div class={style.wrapper}>
          <Header />
          <main class={style.content}>
            <Banner>
              <h3>Articles</h3>
            </Banner>
            <div class={style.container}>
              <h1 class={style.title}>{title}</h1>
              <div class={style.layout}>
                <article
                  class={style.article}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <aside>SIDEBAR</aside>
              </div>
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
