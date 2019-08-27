export default function echartsOption(ehcartsType, chartType, dataList) {
    const echartsOption = {
        Line: {
            BasicLineChart: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            }
        },
        Bar: {},
        Pie: {},
        Scatter: {
            BasicScatterChart: {
                xAxis: {
                    show: true,
                    name: "",
                    nameLocation: "middle",
                    nameGap: 25,
                    splitLine: {
                        lineStyle: {
                            type: 'solid',
                            opacity: '0.3'
                        }
                    }
                },
                yAxis: {
                    show: true,
                    name: "",
                    nameLocation: "middle",
                    nameGap: 25,
                    splitLine: {
                        lineStyle: {
                            type: 'solid',
                            opacity: '0.3'
                        }
                    }
                },
                grid: {
                    show: false,
                    containLabel: true,
                    left: 0,
                    top: 10,
                    right: 20,
                    bottom: 30
                },
                series: [{
                    symbolSize: 10,
                    data: [
                        [10.0, 8.04],
                        [8.0, 6.95],
                        [13.0, 7.58],
                        [9.0, 8.81],
                        [11.0, 8.33],
                        [14.0, 9.96],
                        [6.0, 7.24],
                        [4.0, 4.26],
                        [12.0, 10.84],
                        [7.0, 4.82],
                        [5.0, 5.68]
                    ],
                    type: 'scatter',
                    markLine: {
                        animation: false,
                        type: "Axis",
                        typeList: ["Axis", null],
                        lineStyle: {
                            normal: {
                                type: 'solid'
                            }
                        },
                        symbol: "circle",
                        symbolSize: 10,
                        itemStyle: {
                            borderType: 'solid'
                        },
                        data: [
                            [{
                                coord: [0, 0.5],
                                symbol: 'none'
                            }, {
                                coord: [3000, 0.5],
                                symbol: 'none'
                            }],
                            [{
                                coord: [1000, 0],
                                symbol: 'none'
                            }, {
                                coord: [1000, 0.8],
                                symbol: 'none'
                            }]
                        ]
                    }
                }]
            }
        },
        Graph: {}
    };
    if (ehcartsType !== undefined && chartType !== undefined && echartsOption[ehcartsType][chartType] !== undefined) {
        return echartsOption[ehcartsType][chartType];
    }
    if (ehcartsType !== undefined && echartsOption[ehcartsType] !== undefined) {
        return echartsOption[ehcartsType];
    }
    return echartsOption;

}