import React from 'react';
import style from './splash.module.scss';

/* -----------------------------------
 *
 * Splash
 *
 * -------------------------------- */

function Splash() {
  return (
    <section className={style.splash}>
      <div className={style.content}>
        <h1 className={style.title}>Trying to build a better UI...</h1>
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
