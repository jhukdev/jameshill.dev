import React from 'react';
import { Link } from 'gatsby';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  siteTitle: string;
}

/* -----------------------------------
 *
 * Header
 *
 * -------------------------------- */

function Header({ siteTitle }: IProps) {
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Header;
