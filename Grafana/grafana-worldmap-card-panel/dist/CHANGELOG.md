# Changelog
Processing URL of dashboard in SRP
## [1.0.26] - Aug 22, 2019
### Modified
* 将card的宽度和其中的间距由vw调整为px

## [1.0.25] - Aug 16, 2019
### Modified
* Requirement #14753  Worldmap Card Panel 当card上的字太多的时候，自动换行不太清楚

## [1.0.24] - Aug 16, 2019
### Modified
* #15239

## [1.0.23] - Aug 1, 2019
### Modified
* #15127

All notable changes to this project will be documented in this file.
## [1.0.22] - June 25, 2019
### Modified
* #14890

## [1.0.21] - May 20, 2019
### Modified
* #14618 

## [1.0.20] - Nov 30, 2018
### Modified
* #12701 (repeat location bug) abolished

## [1.0.19] - Nov 30, 2018
### New Feature
* add cards scroll

## [1.0.18] - Oct 31, 2018
### Fixes
* fixed #12701 (repeat location)

## [1.0.17] - Sep 30, 2018
### New Feature
* add iswisepaas

## [1.0.16] - Aug 21, 2018
### New Feature
* Light Theme

## [1.0.15] - Aug 15, 2018
### Fix Bugs
* fix 12153

## [1.0.14] - Aug 13, 2018
### Fix Bugs
* fix 12141

## [1.0.13] - Aug 10, 2018
### New Feature
* code obfuscation and compress

## [1.0.12] - Aug 6, 2018
### New Feature
* merge rmm request

## [1.0.11] - Aug 6, 2018
### Fix Bugs
* fix 12032 12031 11971 11970

## [1.0.10] - Aug 1, 2018
### Fix Bugs
* fix 12048, already compare this with worldmap(0.1.2) on github.

## [1.0.9] - July 26, 2018
### Fix Bugs
* fix 11960 11966 11954 11968 11962

## [1.0.9] - July 26, 2018
### Fix Bugs
* fix 11969

## [1.0.8] - July 25, 2018
### Fix Bugs
* Modify fonts to display different problems on different systems

## [1.0.7] - July 24, 2018
### Fix Bugs
* fix 11967, 11945, 11973, 11960

## [1.0.6] - July 17, 2018
### Fix Bugs
* fix 11944
* fix 11946

## [1.0.5] - July 11, 2018
### Fix Bugs
* fix upgrade error - undefined value

## [1.0.4] - July 10, 2018
### New Feature
* Adjustable font size

## [1.0.3] - July 4, 2018
### Fix Bugs
* Fix boundary color bug

## [1.0.3] - June 29, 2018
### New Features
* **更新leaflet.js套件**: 更新為1.3.1版本
* **Zoom 級距**: 1->0.25
* **Circle size**: 連點4次zoom+則circle size+1，4次zoom-則circle size-1

### Fix Bugs
* 修正data後card內資料變成null的問題
* 修正調整circle size後點消失的問題

## [1.0.2] - May 17, 2018
### Release Update
* Draw circle when data received
* add link for card item

## [1.0.1] - May 4, 2018
### Release Update
# what's New
* User can determine Ocean color and boundary color.
* Each spot will be added through 'Add Card' button in WISE-PaaS tag instead of Metrics tag.
* Each Card should have a unique title.
* Each Card should have a valid latitude and longitude.
* When click on the spot, the dashboard will link to the url in the Addlink text box.
* The Circle Color define the spot color
* Side Display check box define the side card should be display or not.
* Thresholds check box define the color and rule for spot and side display.
* For each card, the user can define the data which will be use as threshold value.
* User can define the content show in each card or spot.
* The content in the card can be divided into three catelog: Caption, data and information.
	Caption: The title for each sub category.
	data: Bind the data in the metrics tag, the key for identify which data should be bind to the card is through the location text box. Location for each data should be unique.
	Information: Provide a option to input plain text.

## [1.0.0] - Jan 12, 2018
### New Features
* **AddLink**: WorldMap添加add link的功能，可以为某个位置添加跳转链接
* **Scada**: 支持scada数据的配置显示
* **Influxdb**:数据源采用influxdb，并且在提供经纬度时实现worldmap的显示
* **圆圈闪烁**：定义Worldmap上的圆点成闪烁状态，并定义其闪烁间隔

## [0.0.21]
 - Support for new data source integration, the Dynamic JSON endpoint [#103](https://github.com/grafana/worldmap-panel/issues/103), thanks [@LostInBrittany](https://github.com/LostInBrittany)
 - Fix for using floats in thresholds [#79](https://github.com/grafana/worldmap-panel/issues/79), thanks [@fabienpomerol](https://github.com/fabienpomerol)
 - Fix for newly created Worldmap panels overflowing their boundaries.
 - Fix for legend css
