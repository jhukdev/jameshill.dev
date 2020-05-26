import React from 'react';
import { Link } from 'gatsby';
import style from './splash.module.scss';

/* -----------------------------------
 *
 * Assets
 *
 * -------------------------------- */

import ideaIcon from '../images/idea-icon.svg';
import blogIcon from '../images/blog-icon.svg';

/* -----------------------------------
 *
 * Splash
 *
 * -------------------------------- */

function Splash() {
  return (
    <section className={style.splash}>
      <div className={style.inner}>
        <h1 className={`${style.column} ${style.title}`}>
          Trying to build a better UI
        </h1>
        <div className={style.column}>
          <Link to="/projects" className={style.action}>
            <img className={style.icon} alt="Recent Projects" src={ideaIcon} />
            <h2 className={style.heading}>Projects</h2>
          </Link>
        </div>
        <div className={style.column}>
          <a href="#" className={style.action}>
            <img className={style.icon} alt="Recent Projects" src={blogIcon} />
            <h2 className={style.heading}>Articles</h2>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Splash;
