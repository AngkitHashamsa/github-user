// STEP 1 - Include Dependencies
// Include react
import React from 'react'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

const Column3D = ({ chartData }) => {
  const chartConfigs = {
    type: 'column3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Most popular ',
        //Set the chart subcaption
        xAxisName: 'Repos',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        yAxisName: 'stars',
        decimals: 0,
        //Set the theme for your chart

        theme: 'fusion',
        pieRadius: '50%',
      },
      // Chart Data
      data: chartData,
    },
  }
  return <ReactFC {...chartConfigs} />
}
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default Column3D
