/* eslint-disable react/no-danger */
import { h, Fragment } from 'preact';
import style from './html.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  title?: string;
  summary?: string;
  image?: string;
  inlineCss?: string;
  jsPath?: string;
  children: any;
}

/* -----------------------------------
 *
 * Images
 *
 * -------------------------------- */

import favicon from '@/styles/images/favicon.png';

/* -----------------------------------
 *
 * Html
 *
 * -------------------------------- */

function Html({ title = 'James', summary, image, inlineCss, jsPath, children }: IProps) {
  const scripts = ['vendor.js', jsPath];

  return (
    <html lang="en" class={style.html}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={summary} />
        <link rel="icon" type="image/png" href={favicon} />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <meta
          name="google-site-verification"
          content="mHNYu_uJnuUYYZmD8zONumXaKqZX4-TNzTs-60O6oEY"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@jhukdev" />
        <meta name="twitter:title" content={title} />
        {summary && <meta name="twitter:description" content={summary} />}
        {image && <meta name="twitter:image:src" content={image} />}
        {getFontPreload()}
        {jsPath && (
          <Fragment>
            {scripts.map((script) => (
              <link rel="preload" as="script" href={`/assets/${script}`} />
            ))}
          </Fragment>
        )}
        {getAnalytics()}
        {inlineCss && <style dangerouslySetInnerHTML={{ __html: inlineCss }} />}
      </head>
      <body class={style.body}>
        {children}
        {jsPath && (
          <Fragment>
            {scripts.map((script) => (
              <script src={`/assets/${script}`} defer={true} />
            ))}
          </Fragment>
        )}
      </body>
    </html>
  );
}

/* -----------------------------------
 *
 * Fonts
 *
 * -------------------------------- */

function getFontPreload() {
  const preloadFonts = ['poppins-100', 'poppins-300', 'roboto-300', 'roboto-400'];

  return (
    <Fragment>
      {preloadFonts.map((font) => (
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          href={`/assets/${font}.woff`}
        />
      ))}
    </Fragment>
  );
}

/* -----------------------------------
 *
 * Analytics
 *
 * -------------------------------- */

function getAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  return (
    <Fragment>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-167321875-1" />
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-167321875-1');
      `}
      </script>
    </Fragment>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Html };
