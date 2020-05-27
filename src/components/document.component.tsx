import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  title: string;
  description?: string;
  lang?: string;
  meta?: any[];
}

/* -----------------------------------
 *
 * Document
 *
 * -------------------------------- */

function DocumentMeta({ title, description, lang = 'en', meta = [] }: IProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={getLinkElements()}
      meta={meta}
    >
      <html lang={lang} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={site.siteMetadata.author} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={metaDescription} />
    </Helmet>
  );
}

/* -----------------------------------
 *
 * getLinkElements
 *
 * -------------------------------- */

function getLinkElements() {
  return [
    {
      href:
        'https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400&family=Montserrat:wght@200;300;400&display=swap',
      rel: 'stylesheet',
      media: 'none',
      onload: 'media="all"',
    },
  ];
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default DocumentMeta;
