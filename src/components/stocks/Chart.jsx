import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SummaryHeader from './SummaryHeader';
import StockValueContainer from './StockValueContainer';
import StockValue from './StockValue';
import StockValueLabel from './StockValueLabel';
import Unit from './Unit';

am4core.useTheme(am4themes_animated);

const SummedStockPrice = (data) => {
  const priceArray = [];

  data.data.forEach(e => {
      const price = Number(e.price);
      priceArray.push(price)
  });

  const getSum = (total, num) => {
      return total + num;
  }

  const summedStockPrice = priceArray.reduce(getSum, 0);

  return summedStockPrice;
}

const allStocksPrice = (currentDayCloseValueTesla, currentDayCloseValueDisney, currentDayCloseValueZalando) => {
  const priceOfStocks = Number(currentDayCloseValueTesla) + Number(currentDayCloseValueDisney) + Number(currentDayCloseValueZalando)
  return priceOfStocks
}

const getYearsProgressValue = (summaryStockData, filtteredCommonStockDays) => {
  console.log('summary stock data', summaryStockData);
  console.log('filtteredCommonStockDays', filtteredCommonStockDays);
  const yearsFirstCloseValueDisney = summaryStockData[0][filtteredCommonStockDays[0]].close;
  const yearsFirstCloseValueTesla = summaryStockData[1][filtteredCommonStockDays[0]].close;
  const yearsFirstCloseValueZalando = summaryStockData[2][filtteredCommonStockDays[0]].close;

  const filtteredCommonStockDaysArrayLength = filtteredCommonStockDays.length - 1;
  const currentDayCloseValueDisney = summaryStockData[0][filtteredCommonStockDays[filtteredCommonStockDaysArrayLength]].close;
  const currentDayCloseValueTesla = summaryStockData[1][filtteredCommonStockDays[filtteredCommonStockDaysArrayLength]].close;
  const currentDayCloseValueZalando = summaryStockData[2][filtteredCommonStockDays[filtteredCommonStockDaysArrayLength]].close;

  const daysChangePercentageDisney = (currentDayCloseValueDisney - yearsFirstCloseValueDisney)  * 100 / yearsFirstCloseValueDisney;
  const daysChangePercentageTesla = (currentDayCloseValueTesla - yearsFirstCloseValueTesla)  * 100 / yearsFirstCloseValueTesla;
  const daysChangePercentageZalando = (currentDayCloseValueZalando - yearsFirstCloseValueZalando)  * 100 / yearsFirstCloseValueZalando;
  const progressValue = (daysChangePercentageDisney + daysChangePercentageTesla + daysChangePercentageZalando).toFixed(2);

  return progressValue;
}

const Chart = ({ summaryStockData, currentDayData }) =>  {
  
  const [yearsProgressValue, setYearsProgressValue] = useState(null);
  const [summedStockPrices, setSummedStockPrice] = useState(null);

  useEffect(() => {
        setSummedStockPrice(SummedStockPrice(currentDayData));
        const am4themes_myTheme = (target) => {
            if (target instanceof am4charts.LineSeries) {
            target.fill = am4core.color("#252745");
            target.strokeWidth = 1;
            }
        }
        
        am4core.useTheme(am4themes_myTheme);

        let chart = am4core.create("chartdiv", am4charts.XYChart);
  
        chart.paddingRight = 20;
        
        let data = [];
        const dataKeysArray = Object.keys(summaryStockData[0]).reverse();
        const euStockDays = Object.keys(summaryStockData[2]).reverse();
        const commonStockDays = [];

        for (let i = 0; i < dataKeysArray.length; i++) {
          commonStockDays.push(euStockDays.find(element => element === dataKeysArray[i]))
        }

        const filtteredCommonStockDays = commonStockDays.filter((e) => {
          return e != null;
        })

        setYearsProgressValue(getYearsProgressValue(summaryStockData, filtteredCommonStockDays));

        for (let i = 0; i < filtteredCommonStockDays.length; i++) {
          const currentDayCloseValueDisney = summaryStockData[0][filtteredCommonStockDays[i]].close;
          const currentDayCloseValueTesla = summaryStockData[1][filtteredCommonStockDays[i]].close;
          const currentDayCloseValueZalando = summaryStockData[2][filtteredCommonStockDays[i]].close;
          
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
      const positiveYearsProgressValue = yearsProgressValue > 0;
      const positiveSummedStockPrices = summedStockPrices > 0;
        return (
            <div>
              <SummaryHeader>
                <StockValueContainer>
                  <StockValueLabel>Year</StockValueLabel>
                  <StockValue positive={positiveYearsProgressValue}>{yearsProgressValue}%</StockValue>
                </StockValueContainer>
                <StockValueContainer>
                  <StockValueLabel>Today's price</StockValueLabel>
                  <StockValue positive={positiveSummedStockPrices}>{summedStockPrices}</StockValue>
                </StockValueContainer>
              </SummaryHeader>
              <div id="chartdiv" style={{ width: "100%", height: "22rem" }}></div>
            </div>
            
        );
    }
    
    export default Chart;
    