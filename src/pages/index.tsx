import React from 'react';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Document from '@/components/document.component';
import Splash from '@/components/splash.component';
// import Social from '@/components/social.component';

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
      {/* <Social /> */}
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default IndexPage;
