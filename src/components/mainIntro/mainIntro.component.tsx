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
          I'm tech lead for all things front-end @ <i class={style.company} /> coupons
        </p>
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
