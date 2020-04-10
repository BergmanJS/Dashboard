import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const TrainingChart = ({ chartWorkoutData }) => {
   //WIP
      
   
  const test = () => {
    const array = Object.values(chartWorkoutData);
    const testArray = [13, 14, 15, 16, 16, 16];
    var nameArray = array.map((el) => { 
      
      return el.week; });
    console.log('namearray', nameArray);
    /* for (let i = 0; i < array.length; i++) {
  
      const arrayObjectToArray = Object.values(array[i])
      console.log('objekti arrayksi', arrayObjectToArray);


      
    } */

  }

  useEffect(() => {
    test();
   /*  setTrainingData(currentWorkoutData); */
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
    
    for (let i = 0; i < 20; i++) {
      
      data.push({ 
        weekAndYear: new Date(2018, 3, i), 
        name: "name" + i, 
        value: i
      });   
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "weekAndYear";
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