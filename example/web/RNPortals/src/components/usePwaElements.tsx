import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { printWebLogOnMetro } from '../helpers';

/**
 * @async function called to set up ionic PWA Elements on the global window object
 * https://capacitorjs.com/docs/v5/web/pwa-elements
 * Originally included for for capacitor camera.
 * Include this hook before the render method of any feature which requires it
 * @affects Global window (dom) object
 */
export function usePWAElements() {
  (async () => {
        printWebLogOnMetro('before defineCustomElements');
        await defineCustomElements(window);
        printWebLogOnMetro('after defineCustomElements');
  })();
}
