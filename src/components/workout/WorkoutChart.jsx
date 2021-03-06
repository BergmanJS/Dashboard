import React, { useState, useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const WorkoutChart = ({ chartWorkoutData }) => {
    const getChartData = () => {
        const array = Object.values(chartWorkoutData);
        const weeksArray = [];
        array.forEach((e) => {
            weeksArray.push(e.week);
        });

        const workoutChartDataObject = {};
        weeksArray.forEach(function (i) {
            workoutChartDataObject[i] = (workoutChartDataObject[i] || 0) + 1;
        });

        const workoutChartData = [];
        Object.keys(workoutChartDataObject).forEach((key) => {
            const workoutsPerWeek = {
                week: key + ' wk',
                workouts: workoutChartDataObject[key],
            };
            workoutChartData.push(workoutsPerWeek);
        });
        return workoutChartData;
    };

    const createChart = () => {
        am4core.useTheme(am4themes_animated);

        const chart = am4core.create('chartdiv', am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = getChartData();

        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = 'week';
        categoryAxis.renderer.minGridDistance = 40;
        categoryAxis.fontSize = 16;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        valueAxis.renderer.minGridDistance = 30;

        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = 'week';
        series.dataFields.valueY = 'workouts';
        series.columns.template.tooltipText = '[bold]{valueY.value} workouts';
        series.columns.template.fontSize = 8;
        series.columns.template.tooltipY = 0;
        series.columns.template.strokeOpacity = 4;
        series.columns.template.fill = am4core.color('#252745');
        series.columns.template.stroke = am4core.color('#252745');
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = '#ffb129';
        series.tooltip.label.fill = '#252745';
        series.tooltip.background.strokeWidth = 0;
        series.tooltip.fontSize = 14;

        return series;
    };

    useEffect(() => {
        createChart();
    }, [chartWorkoutData]);

    return <div id="chartdiv" style={{ width: '100%', height: '21rem' }}></div>;
};

export default WorkoutChart;
