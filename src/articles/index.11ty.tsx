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

import { Html } from '@/components/shared';
import { Header } from '@/components/header';

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

  render({ title, cssPath, jsPath }: IData) {
    return (
      <Html title={title} cssPath={cssPath} jsPath={jsPath}>
        <Header />
        <div class={style.wrapper}>
          <div class={style.container}>ARTICLES</div>
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
