import { h } from 'preact';
import style from './socialMenu.module.scss';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  className?: string;
}

/* -----------------------------------
 *
 * Images
 *
 * -------------------------------- */

import twitterIcon from '@/styles/images/twitter-icon.svg';
import githubIcon from '@/styles/images/github-icon.svg';
import linkedinIcon from '@/styles/images/linkedin-icon.svg';

/* -----------------------------------
 *
 * Social
 *
 * -------------------------------- */

function SocialMenu({ className = '' }: IProps) {
  return (
    <nav class={`${style.social} ${className}`}>
      <a
        href="https://twitter.com/jhukdev"
        target="_blank"
        rel="noreferrer"
        class={style.link}
      >
        <img src={twitterIcon} class={style.icon} alt="Twitter" />
      </a>
      <a
        href="https://github.com/jhukdev"
        target="_blank"
        rel="noreferrer"
        class={style.link}
      >
        <img src={githubIcon} class={style.icon} alt="Twitter" />
      </a>
      <a
        href="https://www.linkedin.com/in/jameshill-dev"
        target="_blank"
        rel="noreferrer"
        class={style.link}
      >
        <img src={linkedinIcon} class={style.icon} alt="Twitter" />
      </a>
    </nav>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { SocialMenu };
