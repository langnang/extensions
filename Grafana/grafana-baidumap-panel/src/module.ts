/* eslint import/no-extraneous-dependencies: 0 */
import { loadPluginCss } from "grafana/app/plugins/sdk";
import BaiduMapCtrl from "./controller";

loadPluginCss({
  dark: "plugins/grafana-worldmap-panel/css/worldmap.dark.css",
  light: "plugins/grafana-worldmap-panel/css/worldmap.light.css"
});

export { BaiduMapCtrl as PanelCtrl };
