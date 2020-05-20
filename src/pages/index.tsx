import React from 'react';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Document from '@/components/document.component';
import Splash from '@/components/splash.component';

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function IndexPage() {
  return (
    <Layout>
      <Document title="Home" />
      <Splash />
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default IndexPage;
