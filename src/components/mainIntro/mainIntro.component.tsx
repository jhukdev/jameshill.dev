import { h } from 'preact';
import style from './mainIntro.module.scss';

/* -----------------------------------
 *
 * Intro
 *
 * -------------------------------- */

function MainIntro() {
  console.log('MainIntro');

  return (
    <section class={style.wrapper}>
      <div class={style.container}>
        <em class={style.callout}>Hello</em>
        <em class={style.callout}>There</em>
        <p class={style.text}>
          I'm Tech Lead for all things front-end at <i class={style.company} /> coupons
        </p>
        <a
          href="https://www.linkedin.com/in/james-hill-6bb080112"
          target="_blank"
          rel="noreferrer"
          class={style.profile}
        >
          Find out more
        </a>
      </div>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { MainIntro };
