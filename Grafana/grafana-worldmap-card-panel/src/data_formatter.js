import _ from 'lodash';
import decodeGeoHash from './geohash';

export default class DataFormatter {
  constructor (ctrl, kbn) {
    this.ctrl = ctrl;
    this.kbn = kbn;
  }

  setValues (data) {
    if (this.ctrl.series && this.ctrl.series.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      this.ctrl.series.forEach((serie) => {
        const lastPoint = _.last(serie.datapoints);
        const lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;
        const location = _.find(this.ctrl.locations, (loc) => { return loc.key.toUpperCase() === serie.alias.toUpperCase(); });

        if (!location) return;

        if (_.isString(lastValue)) {
          data.push({key: serie.alias, value: 0, valueFormatted: lastValue, valueRounded: 0});
        } else {
          const dataValue = {
            key: serie.alias,
            locationName: location.name,
            locationLatitude: location.latitude,
            locationLongitude: location.longitude,
            value: serie.stats[this.ctrl.panel.valueName],
            valueFormatted: lastValue,
            valueRounded: 0
          };

          if (dataValue.value > highestValue) highestValue = dataValue.value;
          if (dataValue.value < lowestValue) lowestValue = dataValue.value;

          dataValue.valueRounded = this.kbn.roundValue(dataValue.value, parseInt(this.ctrl.panel.decimals, 10) || 0);
          data.push(dataValue);
        }
      });

      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }

  createDataValue (encodedGeohash, decodedGeohash, locationName, value) {
    const dataValue = {
      key: encodedGeohash,
      locationName: locationName,
      locationLatitude: decodedGeohash.latitude,
      locationLongitude: decodedGeohash.longitude,
      value: value,
      valueFormatted: value,
      valueRounded: 0
    };

    dataValue.valueRounded = this.kbn.roundValue(dataValue.value, this.ctrl.panel.decimals || 0);
    return dataValue;
  }

  setGeohashValues (dataList, data) {
    if (!this.ctrl.panel.esGeoPoint || !this.ctrl.panel.esMetric) return;

    if (dataList && dataList.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      dataList.forEach((result) => {
        if (result.type === 'table') {
          const columnNames = {};

          result.columns.forEach((column, columnIndex) => {
            columnNames[column.text] = columnIndex;
          });

          result.rows.forEach((row) => {
            const encodedGeohash = row[columnNames[this.ctrl.panel.esGeoPoint]];
            const decodedGeohash = decodeGeoHash(encodedGeohash);
            const locationName = this.ctrl.panel.esLocationName ? row[columnNames[this.ctrl.panel.esLocationName]] : encodedGeohash;
            const value = row[columnNames[this.ctrl.panel.esMetric]];
            const linkData = this.ctrl.panel.linkData;

            const dataValue = this.createDataValue(encodedGeohash, decodedGeohash, locationName, value, linkData, highestValue, lowestValue);
            if (dataValue.value > highestValue) highestValue = dataValue.value;
            if (dataValue.value < lowestValue) lowestValue = dataValue.value;
            data.push(dataValue);
          });

          data.highestValue = highestValue;
          data.lowestValue = lowestValue;
          data.valueRange = highestValue - lowestValue;
        } else {
          result.datapoints.forEach((datapoint) => {
            const encodedGeohash = datapoint[this.ctrl.panel.esGeoPoint];
            const decodedGeohash = decodeGeoHash(encodedGeohash);
            const locationName = this.ctrl.panel.esLocationName ? datapoint[this.ctrl.panel.esLocationName] : encodedGeohash;
            const value = datapoint[this.ctrl.panel.esMetric];
            const linkData = this.ctrl.panel.linkData;
            const dataValue = this.createDataValue(encodedGeohash, decodedGeohash, locationName, value, linkData, highestValue, lowestValue);
            if (dataValue.value > highestValue) highestValue = dataValue.value;
            if (dataValue.value < lowestValue) lowestValue = dataValue.value;
            data.push(dataValue);
          });

          data.highestValue = highestValue;
          data.lowestValue = lowestValue;
          data.valueRange = highestValue - lowestValue;
        }
      });
    }
  }

  static tableHandler (tableData) {
    const datapoints = [];

    if (tableData.type === 'table') {
      const columnNames = {};

      tableData.columns.forEach((column, columnIndex) => {
        columnNames[columnIndex] = column.text;
      });

      tableData.rows.forEach((row) => {
        const datapoint = {};

        row.forEach((value, columnIndex) => {
          const key = columnNames[columnIndex];
          datapoint[key] = value;
        });

        datapoints.push(datapoint);
      });
    }

    return datapoints;
  }

  setTableValues (tableData, data) {
    if (tableData && tableData.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      tableData[0].forEach((datapoint) => {
		let dataValue = {};
        if (datapoint.geohash) {
		   const encodedGeohash = datapoint.geohash;
		   const decodedGeohash = decodeGeoHash(encodedGeohash);
		   dataValue = {
			  key: encodedGeohash,
			  locationName: datapoint[this.ctrl.panel.tableLabel] || 'n/a',
			  locationLatitude: decodedGeohash.latitude,
			  locationLongitude: decodedGeohash.longitude,
			  value: datapoint.metric,
			  valueFormatted: datapoint.metric,
			  valueRounded: 0
		   };
		}else if(datapoint.latitude && datapoint.longitude){
		   dataValue = {
			  key:datapoint.hostname,
			  locationName: datapoint[this.ctrl.panel.tableLabel] || 'n/a',
			  locationLatitude: datapoint.latitude,
			  locationLongitude: datapoint.longitude,
			  value: datapoint.metric,
			  valueFormatted: datapoint.metric,
			  valueRounded: 0
		   };
		}else{
			return;
		}

        if (dataValue.value > highestValue) highestValue = dataValue.value;
        if (dataValue.value < lowestValue) lowestValue = dataValue.value;

        dataValue.valueRounded = this.kbn.roundValue(dataValue.value, this.ctrl.panel.decimals || 0);
        data.push(dataValue);
      });

      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }

  setJsonValues (data) {
    if (this.ctrl.series && this.ctrl.series.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      this.ctrl.series.forEach((point) => {
        const dataValue = {
          key: point.key,
          locationName: point.name,
          locationLatitude: point.latitude,
          locationLongitude: point.longitude,
          value: (point.value !== undefined) ? point.value : 1,
          valueRounded: 0
        };
        if (dataValue.value > highestValue) highestValue = dataValue.value;
        if (dataValue.value < lowestValue) lowestValue = dataValue.value;
        dataValue.valueRounded = Math.round(dataValue.value);
        data.push(dataValue);
      });
      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }

  setJsonScada (data) {
    if (this.ctrl.series && this.ctrl.series.length > 0) {
      var highestValue = 0;
      var lowestValue = Number.MAX_VALUE;
      for (let i = 0; i < this.ctrl.series.length; i++) {
        let inLocationName = this.ctrl.panel.targets[i].hostname;
        let inLatitude = this.ctrl.panel.targets[i].latitude;
        let inLongitude = this.ctrl.panel.targets[i].longitude;
        //let inRefId = this.ctrl.panel.targets[i].refId;
        var inKey = this.ctrl.panel.targets[i].hostname;
        inKey += '_';
        inKey += inLatitude;
        inKey += '_';
        inKey += inLongitude;
        inKey += '_' + this.ctrl.series[i].target;
        //inKey += '_Metrics_';
        //inKey += inRefId;
        let dataPoints = this.ctrl.series[i].datapoints;
        if (dataPoints && dataPoints.length > 0) {
          //      for (let j = 0; j < dataPoints.length; j++) {
          //        let dataPoint = dataPoints[j];
          let dataPoint = dataPoints[dataPoints.length - 1];
          if (dataPoint && dataPoint.length > 0) {
            var dataValue = {
              key: inKey,
              locationName: inLocationName,
              locationLatitude: inLatitude,
              locationLongitude: inLongitude,
              value: dataPoint[0],
              valueRounded: 0
            };
            if (dataValue.value > highestValue) highestValue = dataValue.value;
            if (dataValue.value < lowestValue) lowestValue = dataValue.value;
            dataValue.valueRounded = Math.round(dataValue.value);
            data.push(dataValue);
          }
          //      }
        }
      }
      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }

  setJsonRMM(data) {
    if (this.ctrl.series && this.ctrl.series.length > 0) {
        var highestValue = 0;
        var lowestValue = Number.MAX_VALUE;
        for (let i = 0; i < this.ctrl.series.length; i++) {
            let inAgentId = this.ctrl.series[i].target.split("|")[0];
            let inLatitude = this.ctrl.series[i].latitude;
            let inLongitude = this.ctrl.series[i].longitude;
            // console.log('inLatitude = ', inLatitude);
            // console.log('inLongitude = ', inLongitude);
            // console.log('inAgentId = ', inAgentId);
            // console.log('ctrl target = ', this.ctrl.series[i].target);
            // var inKey = "TAIWAN";
            // inKey += '_';
            // inKey += inLatitude;
            // inKey += '_';
            // inKey += inLongitude;
            // inKey += '_' + this.ctrl.series[i].target;
            var inKey = this.ctrl.series[i].target;
            let dataPoints = this.ctrl.series[i].datapoints;
            if (dataPoints && dataPoints.length > 0) {
                let dataPoint = dataPoints[dataPoints.length - 1];
                if (dataPoint && dataPoint.length > 0) {
                    var dataValue = {
                        key: inKey,
                        locationName: inAgentId,
                        locationLatitude: inLatitude,
                        locationLongitude: inLongitude,
                        value: dataPoint[0],
                        valueRounded: 0
                    };
                    if (dataValue.value > highestValue) highestValue = dataValue.value;
                    if (dataValue.value < lowestValue) lowestValue = dataValue.value;
                    dataValue.valueRounded = Math.round(dataValue.value);
                    data.push(dataValue);
                }
            }
        }
        data.highestValue = highestValue;
        data.lowestValue = lowestValue;
        data.valueRange = highestValue - lowestValue;
    }
  }
}
