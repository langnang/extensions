# Echarts Scatter Panel for Grafana
自定義Echarts控件

## 設計理念
提供全面的echart控件設定


## 設計思路
- Option:多樣的圖表樣式選擇，判斷關聯是否需要多種樣式組合；基於樣式選擇提供符合的設定
- Advanced:提供用戶可自定義的設置

## 實現思路
- Option:非series設置
  - default(一些基本的全局設置):color、backgroundColor、animation、animationThreshold
  - title(標題):show\text\link\target\textStyle
  - legend(圖例):

- Advanced:series設置
  -
  -
  -

- Echarts
  - Scatter散點圖：
    1.一條sql對應一個series:
    2.一條sql對應一個panel

## 開發工作
1. panel準備
  - 新增echarts_option.js文件，存儲默認的一些圖標樣式;
  - panel中添加subTabKey字段,默認為default;
  - panel中添加dataTabIndex字段，默認為0;
  - panelDefault中添加echarts字段,存儲相應echart數據;
  - echarts中添加type字段,基於本次開發散點圖Sactter，因此默認設置為Scatter;
  - echarts中添加typeList字段,echarts_option文件中所有圖表樣式;
  - echarts中添加chart字段,即在圖形樣式下所提供的某些樣式;
  - echarts中添加chartList字段,echarts_option文件中所有對應樣式;
  - echarts中添加optionType字段;
  - echarts中添加chartListList字段;

2. onDataReceived()數據處理
  - 提取echarts_option文件中樣式類型，并賦值到相應的list字段;
  - 判斷選擇對應的圖表樣式類型,default or custom;
  - 若圖表類型為default:提取echarts_option中具體樣式内容;切換樣式后如何更新?
  - 若圖表類型為custom:...;
  - 處理圖表數據









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