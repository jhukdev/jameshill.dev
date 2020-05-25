import React from 'react';
import style from './404.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Document from '@/components/document.component';

/* -----------------------------------
 *
 * 404
 *
 * -------------------------------- */

function Error404() {
  return (
    <Layout>
      <Document title="404: Not found" />
      <section className={style.wrapper}>
        <h1 className={style.title}>
          <em className={style.code}>404</em> Oops, wrong turn..
        </h1>
      </section>
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Error404;
