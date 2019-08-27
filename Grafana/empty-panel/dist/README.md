# Empty Test Panel for Grafana
基于Angular+Echarts的panel开发


### 重命名panel

- README.md `Empty Panel for Grafana` 
- pankage.json `name:empty-panel`,`"description": "empty panel for grafana"`
- package-lock.json `"name": "empty-panel"`
- bower.json `"name": "empty-panel"`,`"description": "Empty Panel for Grafana"`
- src/plugin.json `"name": "Empty Panel"`,`"id": "empty-panel"`,`"description": "empty panel for grafana"`
- src/module.js `loadPluginCss({})`
- src/controller.js `onInitEditMode() {this.addEditorTab('Option', 'public/plugins/empty-panel/partials/options.html', 2);}`

> 控制代码修改于src/controller.js
> package.json `"main": "src/module.js"`->module.js `import {Controller} from './controller';`
> 页面样式修改于src/partials/options.html
> controller.js `onInitEditMode() {this.addEditorTab('Option', 'public/plugins/empty-panel/partials/options.html', 2);}`->options.html


### controller.js代码运行机制

1. constructor()
2. this.event.on()分别监听不同事件
3. angular的ng-model,ng-change绑定数据源以及修改事件
4. onDataReceived()以及render()都可对数据进行处理


### 新增修改panelDefaults数据
- panelDefaults数据中`IS_UCD: false``url: ''`,`method: 'POST'`,`upInterval: 60000`不推荐修改
- 其余数据都可修改
- 不推荐另增数据至this，第二个`_.defaults()`结果易导致数据无法显示。


### Eacharts
- echarts.js主要对于options数据进行处理`myChart.setOption(option)`
- 因此在此之前整理好options数据即可