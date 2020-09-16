/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  title: string;
  content: string;
}

/* -----------------------------------
 *
 * Layout
 *
 * -------------------------------- */

module.exports = ({ title, content }: IProps) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title || 'Hello world'}</title>
      <link rel="stylesheet" href="/main.bundle.css" />
    </head>
    <body>
      <header>
        OH HAI
      </header>
      <main>
        ${content}
      </main>
    </body>
  </html>
`;
