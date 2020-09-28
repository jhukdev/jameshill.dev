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
        <div class={style.wrapper}>
          <Header />
          <main class={style.content}>
            <div class={style.container}>
              <h1 class={style.title}>
                Not <em>quite</em> ready..
              </h1>
            </div>
          </main>
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
