import React from 'react';
import { Link } from 'gatsby';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Layout from '@/components/layout.component';
import Image from '@/components/image.component';
import SEO from '@/components/seo.component';

/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
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
