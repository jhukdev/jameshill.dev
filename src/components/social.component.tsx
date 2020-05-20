import React from 'react';
import style from './social.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  className: string;
}

/* -----------------------------------
 *
 * Assets
 *
 * -------------------------------- */

import twitterIcon from '../images/twitter-icon.svg';
import linkedinIcon from '../images/linkedin-icon.svg';
import githubIcon from '../images/github-icon.svg';

/* -----------------------------------
 *
 * Constants
 *
 * -------------------------------- */

const socialIcons = [
  {
    title: 'Twitter',
    src: twitterIcon,
    url: 'https://twitter.com/jhukdev',
  },
  {
    title: 'LinkedIn',
    src: linkedinIcon,
    url: 'https://www.linkedin.com/in/james-hill-6bb080112',
  },
  {
    title: 'Github',
    src: githubIcon,
    url: 'https://github.com/jhukdev',
  },
];

/* -----------------------------------
 *
 * Social
 *
 * -------------------------------- */

function Social({ className = '' }: IProps) {
  return (
    <menu className={`${className} ${style.social}`}>
      <h3 className={style.title}>Follow Me</h3>
      <ul className={style.list}>
        {socialIcons.map(({ title, src, url }) => (
          <li key={url} className={style.item}>
            <a
              href={url}
              className={style.link}
              title={title}
              target="_blank"
              rel="noopener"
            >
              <img className={style.icon} alt={title} src={src} />
            </a>
          </li>
        ))}
      </ul>
    </menu>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Social;
