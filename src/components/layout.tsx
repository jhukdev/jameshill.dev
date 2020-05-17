/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import style from './layout.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import Header from './header.component';

/* -----------------------------------
 *
 * Layout
 *
 * -------------------------------- */

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={style.wrapper}>
      <Header siteTitle={data.site.siteMetadata.title} />
    </div>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Layout;
