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
      <h1 className={style.title}>Trying to build a better UI</h1>
      {/* <div className={style.content}>
        <div className={style.column}>
          <h2 className={style.heading}>Recent Projects</h2>
        </div>
        <div className={style.column}>
          <h2 className={style.heading}>Experiments</h2>
        </div>
        <div className={style.column}>
          <h2 className={style.heading}>Blog</h2>
        </div>
      </div> */}
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default Splash;
