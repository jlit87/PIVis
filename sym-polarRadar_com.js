
/**
# ***********************************************************************
# * DISCLAIMER:
# *
# * All sample code is provided by OSIsoft for illustrative purposes only.
# * These examples have not been thoroughly tested under all conditions.
# * OSIsoft provides no guarantee nor implies any reliability,
# * serviceability, or function of these programs.
# * ALL PROGRAMS CONTAINED HEREIN ARE PROVIDED TO YOU "AS IS"
# * WITHOUT ANY WARRANTIES OF ANY KIND. ALL WARRANTIES INCLUDING
# * THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY
# * AND FITNESS FOR A PARTICULAR PURPOSE ARE EXPRESSLY DISCLAIMED.
# ************************************************************************
#
# Updated by dlopez@osisoft.com
# Visualizations provided by amCharts: https://www.amcharts.com/
#
**/

//************************************
// Begin defining a new symbol
//************************************
(function (PV) {
	//'use strict';
	
	var myCustomSymbolDefinition = {

		typeName: 'polarRadar',
		displayName: 'Polar Radar Chart',
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/polRad.png',
		visObjectType: symbolVis,
		getDefaultConfig: function () {
			return {
				//
				DataShape: 'Table',
				Height: 300,
				Width: 600,
/*                 textColor: "white",
                backgroundColor: "rgb(46,46,46)",
                gridColor: "darkgray",
                plotAreaFillColor: "rgb(46,46,46)",
                useBarsInsteadOfColumns: false,
                seriesColor: "red",
                useUniqueDataItemColors: true,
                showLabels: false,
                columnWidth: 0.5,
                columnOpacity: 1,
                graphType: "column",
				includeElementName: true,
				axisPosition: "left",
				axesColor: "white",
				showCategoryAxisLabels: true */
                
            };
		},
        configOptions: function () {
            return [{
				title: 'Format Symbol',
                mode: 'format'
            }];
        }
	};
	
	function symbolVis() { }
    PV.deriveVisualizationFromBase(symbolVis);
	
	symbolVis.prototype.init = function(scope, elem) {
/*         this.onDataUpdate = myCustomDataUpdateFunction;
		this.onConfigChange = myCustomConfigurationChangeFunction;
		var labels = getLabels(scope.symbol.DataSources); */
		var chart = initChart();

        //************************************
		// Create the new chart!
		//************************************
		function initChart() {
            // Locate the symbol element
			var symbolContainerDiv = elem.find('#container')[0];
			// Assign a unique ID to the element
            symbolContainerDiv.id = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
			// Get the chart default configuration
            var chartconfig = getChartConfig();
            // Create the chart object!
			var customVisualizationObject = AmCharts.makeChart(symbolContainerDiv.id, chartconfig);
			return customVisualizationObject;
		}
        
        //************************************
		// Extract the data item labels from a new update
		//************************************
        function getLabels(datasources) {
			return datasources.map(function(item){
                var isAttribute = /af:/.test(item);
                var label = isAttribute ? item.match(/\w*\|.*$/)[0] : item.match(/\w+$/)[0];
                if (!scope.config.includeElementName && (label.indexOf("|") !== -1)) {
					label = label.split("|")[label.split("|").length - 1];
				}
				return {
					Label: label
				};
			});	
		} 
		
		//************************************
		// Define what happens ever time a new data update occurs
		//************************************
		function myCustomDataUpdateFunction(newdata) {
            if (!newdata || !chart) return;
            // Get the data item labels
			if (!labels) {
                labels = getLabels(scope.symbol.DataSources);
            }
			// If Rows have Label => either configuration is updated 
			if (newdata.Rows[0].Label) {
                labels = newdata.Rows.map(
                    function(item) {
                        var label = item.Label;
						if (!scope.config.includeElementName && (label.indexOf("|") !== -1)) {
							label = label.split("|")[label.split("|").length - 1];
						}
						return {
                            Label: label
                        };
                    }
                );
            }
            // Convert the new data into the amCharts format, and feed it to the graph
			var dataprovider = convertToChartDataFormat(newdata, labels);
			//chart.dataProvider = dataprovider;
			chart.validateData();
        }
        
        //************************************
		// Specify a default color pallette
		//************************************
        var chartColors = ["rgb(62, 152, 211)", "rgb(224, 138, 0)", "rgb(178, 107, 255)", "rgb(47, 188, 184)", "rgb(219, 70, 70)", "rgb(156, 128, 110)", "rgb(60, 191, 60)", "rgb(197, 86, 13)","rgb(46, 32, 238)","rgb(165, 32, 86)" ];
        
        //************************************
		// Convert the data update from PI Vision into a format that amCharts accepts
		//************************************
		function convertToChartDataFormat(newdata, labels) {
			return newdata.Rows.map(
                function(item, index) {
                    return {
                        Value: parseFloat(item.Value),
                        Time: item.Time,
                        StreamName: labels[index].Label,
                        uniqueColor: chartColors[index],
                        commonColor: scope.config.seriesColor
                    }
                }
            );
		 }

        //************************************
		// Define the initial chart formatting
		//************************************
		function getChartConfig() {
            return {
				"type": "radar",
				"theme": "light",
/*				"backgroundAlpha": 1,
				"backgroundColor": scope.config.backgroundColor,
				"color": scope.config.textColor,
				"plotAreaFillAlphas": 1,
				"plotAreaFillColors": scope.config.plotAreaFillColor,
				"fontFamily": "arial",
				"creditsPosition": "top-right",
				"rotate": scope.config.useBarsInsteadOfColumns, */
				"valueAxes": [{
/*					"inside": false,
					"axisAlpha": 1,
					"axisColor": scope.config.axesColor,
					"gridAlpha": 1,
					"gridColor": scope.config.gridColor, */
					"position": scope.config.axisPosition,
					"fillAlpha": 0.05,
					"gridType": "circles",
					"minimum": 0,
					"autoGridCount": false,
					"axisAlpha": 0.2,
					"fillColor": "#FFFFFF",
					"gridAlpha": 0.08,
					"guides": [ {
						"angle": 225,
						"fillAlpha": 0.3,
						"fillColor": "#0066CC",
						"tickLength": 0,
						"toAngle": 315,
						"toValue": 14,
						"value": 0,
						"lineAlpha": 0
					}, {
						"angle": 45,
						"fillAlpha": 0.3,
						"fillColor": "#CC3333",
						"tickLength": 0,
						"toAngle": 135,
						"toValue": 14,
						"value": 0,
						"lineAlpha": 0
					} ],
				}],
/*				"categoryAxis": {
					"axisAlpha": 1,
					"axisColor": scope.config.axesColor,
					"gridAlpha": 1,
					"gridColor": scope.config.gridColor,
					"autoWrap": true,
					labelsEnabled: scope.config.showCategoryAxisLabels
				}, */
				"graphs": [{
/*					"type": scope.config.graphType, */
					"fillAlphas": scope.config.columnOpacity,
/*					"lineAlpha": 1,
					"lineColorField": "uniqueColor", */
					"balloonText": "[[category]]: [[value]] m/s",
/*					"balloonText": "<b> [[category]] </b><br/>Value: [[Value]]<br/>Time: [[Time]]", */
					"valueField": "Value",
					"bullet": "round"
/*					"fillColorsField": "uniqueColor",
					showAllValueLabels: true,
					labelPosition: "top",
					labelText: "[[Value]]",
					labelColorField: "uniqueColor",
					columnWidth: scope.config.columnWidth */
				}],
				"dataProvider": [ {
					"direction": "N",
					"value": 8
				}, {
					"direction": "NE",
					"value": 9
				}, {
					"direction": "E",
					"value": 4.5
				}, {
					"direction": "SE",
					"value": 3.5
				}, {
					"direction": "S",
					"value": 9.2
				}, {
					"direction": "SW",
					"value": 8.4
				}, {
					"direction": "W",
					"value": 11.1
				}, {
					"direction": "NW",
					"value": 10
				} ],//"",
				"categoryField": "direction",
/*				"chartCursor": { 
					"cursorColor": "gray",
					"valueLineBalloonEnabled": true,
					"valueLineEnabled": true,
					"valueZoomable": true
				},
				"zoomOutButtonImage": "", */
				"startDuration": 1,
				"export": {
					"enabled": true
				}
			}
        }
        
        //************************************
		// Function that is called when custom configuration changes are made
		//************************************
		var oldLabelSettings;
		function myCustomConfigurationChangeFunction(data) {
			if (oldLabelSettings != scope.config.includeElementName) {
				oldLabelSettings == scope.config.includeElementName;
				labels = getLabels(scope.symbol.DataSources);
			}
			
            if (chart) {
                // Apply new settings
                //chart.sortColumns = scope.config.sortItemsByValue;
                chart.color = scope.config.textColor;
                chart.backgroundColor = scope.config.backgroundColor;
                chart.plotAreaFillColors = scope.config.plotAreaFillColor;
                chart.rotate = scope.config.useBarsInsteadOfColumns;
                chart.categoryAxis.gridColor = scope.config.gridColor;
				chart.categoryAxis.axisColor = scope.config.axesColor;
				chart.categoryAxis.labelsEnabled = scope.config.showCategoryAxisLabels;
                chart.valueAxes[0].gridColor = scope.config.gridColor;
				chart.valueAxes[0].position = scope.config.axisPosition;
				chart.valueAxes[0].axisColor = scope.config.axesColor;
                chart.graphs[0].columnWidth = scope.config.columnWidth;
                chart.graphs[0].fillAlphas = scope.config.columnOpacity;
                chart.graphs[0].type = scope.config.graphType;
                if (scope.config.showLabels) {
                    chart.graphs[0].labelText = "[[Value]]";
                } else {
                    chart.graphs[0].labelText = null;
                }
                if (scope.config.useUniqueDataItemColors) {
                    chart.graphs[0].fillColorsField = "uniqueColor";
                    chart.graphs[0].lineColorField  = "uniqueColor";
                    chart.graphs[0].labelColorField = "uniqueColor";
                } else {
                    chart.graphs[0].fillColorsField = "commonColor";
                    chart.graphs[0].lineColorField  = "commonColor";
                    chart.graphs[0].labelColorField = "commonColor";
                }
                // Draw the chart again
                chart.validateNow();
            }
		}

	}
	PV.symbolCatalog.register(myCustomSymbolDefinition);
	
})(window.PIVisualization);