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
      <div class={style.container}>INTRO!</div>
    </section>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { MainIntro };
