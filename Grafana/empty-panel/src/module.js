import {Controller} from './controller';
import { loadPluginCss } from 'app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/empty-panel/css/grouped.dark.css',
  light: 'plugins/empty-panel/css/grouped.light.css',
});

export {
  Controller as PanelCtrl
};
