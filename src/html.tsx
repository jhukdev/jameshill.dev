import React from 'react';

/* -----------------------------------
 *
 * HTML
 *
 * -------------------------------- */

function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link
          rel="preconnect"
          href="//fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="//www.google-analytics.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {getGoogleAnalytics()}
        {getFontLoader()}
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

/* -----------------------------------
 *
 * getGoogleAnalytics
 *
 * -------------------------------- */

function getGoogleAnalytics() {
  const initScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-167321875-1');
  `;

  return (
    <>
      <script
        src="https://www.googletagmanager.com/gtag/js?id=UA-167321875-1"
        async={true}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: initScript,
        }}
      />
    </>
  );
}

/* -----------------------------------
 *
 * getFontLoader
 *
 * -------------------------------- */

function getFontLoader() {
  const queryParams = [
    'family=Jost:wght@200;300;400',
    'family=Montserrat:wght@200;300;400',
    'display=swap',
  ].join('&');

  const hrefValue = `https://fonts.googleapis.com/css2?${queryParams}`;

  return (
    <>
      <link rel="stylesheet" id="fonts" href={hrefValue} media="none" />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('fonts').onload = function() {
            this.media = 'all'; 
          };`,
        }}
      />
    </>
  );
}

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

export default HTML;
