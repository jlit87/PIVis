
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
	
	function symbolVis() { }
    PV.deriveVisualizationFromBase(symbolVis);
	
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
				Width: 600
            };
		},
        configOptions: function () {
            return [{
				title: 'Format Symbol',
                mode: 'format'
            }];
        }
	};
	
	symbolVis.prototype.init = function(scope, elem) {
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
		// Define the initial chart formatting
		//************************************
		function getChartConfig() {
            return {
				"type": "radar",
				"theme": "light",
				"valueAxes": [{
					"gridType": "circles",
					"minimum": 0,
					"autoGridCount": false,
					"axisAlpha": 0.2,
					"fillAlpha": 0.05,
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
					"position": "left"//scope.config.axisPosition
				}],
				"startDuration": 1,
				"graphs": [{
					"balloonText": "[[category]]: [[value]] m/s",
					"bullet": "round",
					"fillAlphas": 0.3,//scope.config.columnOpacity,
					"valueField": "value"
				}],
				"categoryField": "direction",
				"export": {
					"enabled": true
				},
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
				} ]
			}
        }
	};
	
	PV.symbolCatalog.register(myCustomSymbolDefinition);
	
})(window.PIVisualization);