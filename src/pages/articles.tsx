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
      <Document title="404: Not found" />
      <section className={style.wrapper}>
        <h1 className={style.title}>Coming soon..</h1>
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
