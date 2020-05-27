import React from 'react';
import style from './articles.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Document from '@/components/document.component';

/* -----------------------------------
 *
 * Projects
 *
 * -------------------------------- */

function Projects() {
  return (
    <Layout>
      <Document title="Articles" />
      <section className={style.wrapper}>
        <div className={style.container}>
          <h1 className={style.title}>Coming soon..</h1>
        </div>
      </section>
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Projects;
