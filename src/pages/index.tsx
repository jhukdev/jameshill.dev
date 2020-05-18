import React from 'react';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Document from '@/components/document.component';
import Social from '@/components/social.component';

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function IndexPage() {
  return (
    <Layout>
      <Document title="Home" />
      <Social />
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default IndexPage;
