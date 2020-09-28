import { MainIntro as Component } from './mainIntro.component';
import { applyHydration } from '@/utility/hydrate.utility';

/* -----------------------------------
 *
 * Intro
 *
 * -------------------------------- */

const MainIntro = applyHydration('MainIntro', Component);

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */
export { MainIntro };
