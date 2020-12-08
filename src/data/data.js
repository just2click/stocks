import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from 'axios';
import App from "../App";
import { convertToUTC } from '../utils'

const baseURL = "https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False";
const timeAndCharts = "&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume"

export function Data(props) {
  let [processedData, setProcessedData] = useState([]);
  let [startDate, setStartDate] = useState(convertToUTC(new Date()));

  useEffect(async () => {
    let mounted = true;
    const periodAndPrecision = `period=${props.period}&Precision=${props.precision}`
    const results = await axios(`${baseURL}&${periodAndPrecision}&${timeAndCharts}`);
    setProcessedData(processedData = results.data.map(stock => {
      const value = stock.Close;
      return [(convertToUTC(stock.Date)), value];
    }))
    setStartDate(startDate = convertToUTC(results.data[0].Date));

    return () => mounted = false;
  }, [props.period])
  // const xAxis = value.series.map(ser => ser.x);
  // const yAxis = value.series.map(ser => ser.y);
  const data = {
    xAxis: {
      ordinal: false
    },
    series:[{
      data: processedData,
      pointStart: startDate,
      pointInterval: 60 * 1000
    }]
  }

  return <App data={data} />;
}

export default Data;
