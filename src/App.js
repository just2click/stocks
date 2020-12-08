import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Tabs, Tab, InnerTab, Content } from "./components/Tab/tab";
import Data from "./data/data.js";
import { convertToUTC } from './utils'
import "./index.css";

// Load Highcharts modules
require("highcharts/modules/pattern-fill")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

let graphData = [];

const precisionWords = ['Minutes', 'Hours']
let period = null;
let precision = precisionWords[0];

const App = props => {
  const { data } = props;

  const [active, setActive] = useState(0);
  const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
    switch (index) {
      case 0:
        period = 1;
        precision = precisionWords[0];
        break;
      case 1:
        period = 5;
        precision = precisionWords[0];
        break;
      case 2:
        period = 1;
        precision = precisionWords[1];
        break;
      case 3:
        period = 168;
        precision = precisionWords[1];
        break;
    }
  };

  graphData = data && data.series && data.series.length > 0 ? data.series[0].data : graphData;
  const pointStart = data && data.pointStart ? data.pointStart : convertToUTC(new Date());
  const pointInterval = 60 * 1000;

  const [highchartsOptions, setHighchartsOptions] = useState({
    chart: {
      type: "area"
    },
    xAxis: {
      type: "datetime",
      minRange: 1,
      crosshair: true,
      tickInterval: 12
    },
    yAxis: {
      opposite: true,
      lineColor: "#CDCDD3",
      lineWidth: 1,
      tickInterval: 15,
      tickAmount: 10,
      max: 150,
      index: 0
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#ffffff",
        lineWidth: 2
      },
      series: {
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      data: graphData,
      pointStart,
      pointInterval
    }]
  });

  return (
    <div className="App">
      <div className="generic-container generic-margin-bottom">
        <div className="graph-container generic-margin-bottom">
          <div className="borders">
            <div className="tabs-container">
              <Tabs>
                <Tab onClick={handleClick} active={active === 0} id={0}>
                  1 Minute
                </Tab>

                <Tab onClick={handleClick} active={active === 1} id={1}>
                  5 Minutes
                </Tab>

                <Tab onClick={handleClick} active={active === 2} id={2}>
                  1 Hour
                </Tab>

                <Tab onClick={handleClick} active={active === 3} id={3}>
                  1 Week
                </Tab>
              </Tabs>
              <>
                <Content active={active === 0}>
                  <h1>One Minute</h1>
                </Content>
                <Content active={active === 1}>
                  <h1>Five Minutes</h1>
                </Content>
                <Content active={active === 2}>
                  <h1>One Hour</h1>
                </Content>
                <Content active={active === 3}>
                  <h1>One Week</h1>
                </Content>
              </>
              {/* <Tabs>
                <TabList>
                  <Tab>Title 1</Tab>
                  <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                  <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Any content 2</h2>
                </TabPanel>
              </Tabs> */}
            </div>
          </div>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<Data period={period} precision={precision} />, rootElement);