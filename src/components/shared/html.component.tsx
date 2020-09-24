import { h } from 'preact';
import style from './html.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  title?: string;
  cssPath?: string;
  children: any;
}

/* -----------------------------------
 *
 * Html
 *
 * -------------------------------- */

function Html({ title = 'JH', cssPath, children }: IProps) {
  return (
    <html lang="en" class={style.html}>
      <head>
        <title>{title}</title>
        {cssPath && <link rel="stylesheet" href={`/assets/${cssPath}`} />}
      </head>
      <body class={style.body}>{children}</body>
    </html>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Html };
