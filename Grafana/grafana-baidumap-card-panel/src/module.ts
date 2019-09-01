/* eslint import/no-extraneous-dependencies: 0 */
import { loadPluginCss } from "grafana/app/plugins/sdk";
import BaiduMapCtrl from "./controller";

loadPluginCss({
  dark: "plugins/grafana-baidumap-card-panel/css/worldmap.dark.css",
  light: "plugins/grafana-baidumap-card  -panel/css/worldmap.light.css"
});

export { BaiduMapCtrl as PanelCtrl };
