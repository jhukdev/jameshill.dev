import React from 'react';
import style from './projects.module.scss';

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
      <section className={style.wrapper}>PROJECTS</section>
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Projects;
