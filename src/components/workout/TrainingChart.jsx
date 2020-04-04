import React, { useState, useEffect } from 'react';

const TrainingChart = ({ trainingData }) => {
   //WIP
  useEffect(() => {
    setTrainingData(trainingData);
    const am4themes_myTheme = (target) => {
        if (target instanceof am4charts.LineSeries) {
        target.fill = am4core.color("#252745");
        target.strokeWidth = 1;
        }
    }
    
    am4core.useTheme(am4themes_myTheme);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let data = [];

    chart.paddingRight = 20;
    
    for (let i = 0; i < filtteredCommonStockDays.length; i++) {
      
      data.push({ 
        date: new Date(filtteredCommonStockDays[i]), 
        name: "name" + i, 
        value: allStocksPrice(currentDayCloseValueTesla, currentDayCloseValueDisney, currentDayCloseValueZalando)
      });   
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    chart = chart;
  }, []);
 
    return (
        <div id="chartdiv" style={{ width: "100%", height: "22rem" }}></div>
    );
}

export default TrainingChart;