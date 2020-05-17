import React from 'react';
import { Link } from 'gatsby';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Image from '@/components/image.component';
import Document from '@/components/document.component';

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function IndexPage() {
  return (
    <Layout>
      <Document title="Home" />
      <p>HOME</p>
    </Layout>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default IndexPage;
