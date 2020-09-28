import { MainIntro as Component } from './mainIntro.component';
import { applyHydration } from '@/utility/hydrate.utility';

/* -----------------------------------
 *
 * Intro
 *
 * -------------------------------- */

const MainIntro = applyHydration(Component);

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */
export { MainIntro };
