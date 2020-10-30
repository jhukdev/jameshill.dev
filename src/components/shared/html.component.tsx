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
  cssFile?: string;
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

function Html({ title = '11ty', cssFile, jsPath, children }: IProps) {
  const scripts = ['vendor.js', jsPath];

  return (
    <html lang="en" class={style.html}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" type="image/png" href={favicon} />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-167321875-1" />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-167321875-1');
          `}
        </script>
        {getFontLink()}
        <style dangerouslySetInnerHTML={{ __html: cssFile }} />
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

function getFontLink() {
  const fonts = ['Poppins:wght@100;300;400;500;600', 'Roboto:wght@300;400;500'];
  const result = fonts.map((font) => `family=${font}`).join('&');

  return h('link', {
    href: `https://fonts.googleapis.com/css2?${result}&display=swap`,
    rel: 'stylesheet',
    media: 'none',
    onload: "if(media!='all')media='all'",
  });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Html };
