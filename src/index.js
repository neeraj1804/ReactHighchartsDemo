//let sum = require('./sum');

/*import sum from './sum';
import './image_viewer';

let total = sum(2, 3);
console.log(total);*/

/*const button = document.createElement("button");
button.innerText = "Click me";
button.onclick = () => {
    System.import("./image_viewer").then(module => {
        console.log(module);
        module.default();
    });
};

document.body.appendChild(button);*/

import "../styles/index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';
import AddWordcloud from 'highcharts/modules/wordcloud';
import AddHeatmap from 'highcharts/modules/heatmap';
import AddTreemap from 'highcharts/modules/treemap';
import AddSankey from 'highcharts/modules/sankey';
import AddExporting from 'highcharts/modules/exporting';
import AddMore from 'highcharts-more';

var elem = document.createElement("div");
elem.id = "root";
document.body.appendChild(elem);

var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
var lines = text.split(/[,\. ]+/g),
    data = Highcharts.reduce(lines, function (arr, word) {
        var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
        });
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            modules: [AddWordcloud, AddExporting, AddMore, AddHeatmap, AddTreemap, AddSankey],
            charts: [{
                container: "chart1",
                options: {
                    series: [{
                        type: 'wordcloud',
                        data: data,
                        name: 'Occurrences'
                    }],
                    title: {
                        text: 'Wordcloud of Sentiment Analysis'
                    },
                    exporting: {
                        chartOptions: { // specific options for the exported image
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            }
                        },
                        fallbackToExportServer: false
                    }
                }
            }, {
                container: "chart2",
                options: {
                    chart: {
                        type: 'columnrange',
                        inverted: false
                    },
                
                    title: {
                        text: 'Topic Positive/Negative Reviews'
                    },
                
                    subtitle: {
                        text: 'Observed in Topic Modaling'
                    },
                
                    xAxis: {
                        categories: ['Topic1', 'Topic2', 'Topic3', 'Topic4', 'Topic5', 'Topic6',
                                     'Topic7', 'Topic8', 'Topic9', 'Topic10'],
                        title: {
                            text: 'Topics'
                        }
                    },
                
                    yAxis: {
                        title: {
                            text: 'Review Count ( Positive/Negative )'
                        }
                    },
                
                    tooltip: {
                        shared: false,
                        formatter: function(){
                            return null;
                        },
                        enabled: false
                    },
                
                    plotOptions: {
                        columnrange: {
                            negativeColor: 'red',
                            threshold: 0,
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    if(this.y != 0) {
                                        return '<div style="text-align:center;">' + this.y +'</div>';
                                    }
                                    else
                                        return null;
                                }
                            }
                        }
                    },
                
                    legend: {
                        enabled: false
                    },
                
                    series: [{
                        name: 'Reviews',
                        data: [
                            [0, -9, 0], [0, 0, 9],
                            [1, -8, 0], [1, 0, 6],
                            [2, -3, 0], [2, 0, 9],
                            [3, -1, 0], [3, 0, 19],
                            [4, 0, 22],
                            [5, 0, 29],
                            [6, 0, 30],
                            [7, 0, 26],
                            [8, 0, 18],
                            [9, -3, 0], [9, 0, 11]
                        ]
                    }]
                }
            }, {
                container: "chart3",
                options: {
                    colorAxis: {
                        minColor: '#FFFFFF',
                        maxColor: Highcharts.getOptions().colors[0]
                    },
                    series: [{
                        type: 'treemap',
                        layoutAlgorithm: 'squarified',
                        data: [{
                            name: 'Topic 1',
                            value: 5.5,
                            colorValue: 5.5
                        }, {
                            name: 'Topic 2',
                            value: 7.2,
                            colorValue: 7.2
                        }, {
                            name: 'Topic 3',
                            value: 2.1,
                            colorValue: 2.1
                        }, {
                            name: 'Topic 4',
                            value: 3.2,
                            colorValue: 3.2
                        }, {
                            name: 'Topic 5',
                            value: 2.1,
                            colorValue: 2.1
                        }, {
                            name: 'Topic 6',
                            value: 2.2,
                            colorValue: 2.2
                        }, {
                            name: 'Topic 7',
                            value: 1.4,
                            colorValue: 1.4
                        }]
                    }],
                    title: {
                        text: 'Sentiment Analysis Topic Treemap'
                    }
                }
            }, {
                container: "chart4",
                options: {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Sentiment Topic Analysis'
                    },
                    subtitle: {
                        text: 'Source: WalmartDSF.com'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Topic Rating'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: 'Topic 1',
                        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }, {
                        name: 'Topic 2',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 13.2]
                    }]
                }
            }, {
                container: "chart5",
                options: {
                    chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 1
                    },
                
                
                    title: {
                        text: 'Rating per topic per weekday'
                    },
                
                    xAxis: {
                        categories: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6', 'Topic 7', 'Topic 8']
                    },
                
                    yAxis: {
                        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        title: null
                    },
                
                    colorAxis: {
                        min: 0,
                        minColor: '#FFFFFF',
                        maxColor: Highcharts.getOptions().colors[0]
                    },
                
                    legend: {
                        align: 'right',
                        layout: 'vertical',
                        margin: 0,
                        verticalAlign: 'top',
                        y: 25,
                        symbolHeight: 280
                    },
                
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> got <br><b>' +
                                this.point.value + '</b> rating on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                        }
                    },
                
                    series: [{
                        name: 'Rating per topic',
                        borderWidth: 1,
                        data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30]],
                        dataLabels: {
                            enabled: true,
                            color: '#000000'
                        }
                    }]
                }
            }, {
                container: "chart6",
                options: {
                    title: {
                        text: 'Highcharts Sankey Diagram'
                    },
                
                    series: [{
                        keys: ['from', 'to', 'weight'],
                        data: [
                            ['Brazil', 'Portugal', 5 ],
                            ['Brazil', 'France', 1 ],
                            ['Brazil', 'Spain', 1 ],
                            ['Brazil', 'England', 1 ],
                            ['Canada', 'Portugal', 1 ],
                            ['Canada', 'France', 5 ],
                            ['Canada', 'England', 1 ],
                            ['Mexico', 'Portugal', 1 ],
                            ['Mexico', 'France', 1 ],
                            ['Mexico', 'Spain', 5 ],
                            ['Mexico', 'England', 1 ],
                            ['USA', 'Portugal', 1 ],
                            ['USA', 'France', 1 ],
                            ['USA', 'Spain', 1 ],
                            ['USA', 'England', 5 ],
                            ['Portugal', 'Angola', 2 ],
                            ['Portugal', 'Senegal', 1 ],
                            ['Portugal', 'Morocco', 1 ],
                            ['Portugal', 'South Africa', 3 ],
                            ['France', 'Angola', 1 ],
                            ['France', 'Senegal', 3 ],
                            ['France', 'Mali', 3 ],
                            ['France', 'Morocco', 3 ],
                            ['France', 'South Africa', 1 ],
                            ['Spain', 'Senegal', 1 ],
                            ['Spain', 'Morocco', 3 ],
                            ['Spain', 'South Africa', 1 ],
                            ['England', 'Angola', 1 ],
                            ['England', 'Senegal', 1 ],
                            ['England', 'Morocco', 2 ],
                            ['England', 'South Africa', 7 ],
                            ['South Africa', 'China', 5 ],
                            ['South Africa', 'India', 1 ],
                            ['South Africa', 'Japan', 3 ],
                            ['Angola', 'China', 5 ],
                            ['Angola', 'India', 1 ],
                            ['Angola', 'Japan', 3 ],
                            ['Senegal', 'China', 5 ],
                            ['Senegal', 'India', 1 ],
                            ['Senegal', 'Japan', 3 ],
                            ['Mali', 'China', 5 ],
                            ['Mali', 'India', 1 ],
                            ['Mali', 'Japan', 3 ],
                            ['Morocco', 'China', 5 ],
                            ['Morocco', 'India', 1 ],
                            ['Morocco', 'Japan', 3 ]
                        ],
                        type: 'sankey',
                        name: 'Sankey demo series'
                    }]
                }
            }]
        };
    }

    // When the DOM is ready, create the chart.
    componentDidMount() {
        // Extend Highcharts with modules
        if (this.state.modules) {
            this.state.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        // Set container which the chart should render to.
        this.state.charts.forEach(function (chart, index) {
            chart.ref = new Highcharts.chart(
                chart.container, 
                chart.options
            );
        });
    }
    //Destroy chart before unmount.
    componentWillUnmount() {
        this.state.charts.forEach( function (chart) {
            chart.ref.destroy();
        });
    }
    
    render() {
        var chartHTML = [];
        this.state.charts.forEach( function (chart, index) {
            chartHTML.push(<div className="app" id={chart.container} key={index}></div>);
        });
        return (
            <div>
                {chartHTML}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

