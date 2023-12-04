import React, { useMemo, useState,useEffect } from "react";
import { useTheme} from "@mui/material";
import axios from 'axios'
import {ResponsiveLine} from '@nivo/line'

const OverviewChart = ({ isDashboard = false, view }) => {
  const [statData, setStatData] = useState([]);
  const theme = useTheme();

  
  
  
  useEffect(() => {
    const getStateData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/sales")
        setStatData(response.data.statData); 
        console.log(response.data)
      } catch (err) {
        console.log(err);
       
      }
    };

    getStateData();
  },[]);

 
  const [totalSalesLine, totalUnitLine] = useMemo(() => {
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };
   
    /*create new MontlyData Array*/

    const { monthlyData = [] } = statData.reduce(
      (acc, cur) => ({
        ...acc,
        monthlyData: [
          ...acc.monthlyData,
          ...cur.monthlyData.map(({ month, totalSales, totalUnits }) => ({
            month,
            totalSales,
            totalUnits
          }))
        ]
      }),
      { monthlyData: [] }
    );
  // console.log(monthlyData)

  /* Reduce with new monthlyDataArray*/
  
    monthlyData.reduce(
      (acc,{month,totalSales,totalUnits}) => {

        const curSales =acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;


        totalSalesLine.data.push({ x: month, y: curSales });
        totalUnitLine.data.push({ x: month, y: curUnits });

      return {sales: curSales, units:curUnits}
      },
      { sales: 0, units: 0 }
    );

    return [totalSalesLine, totalUnitLine];
  }, [statData, theme.palette.secondary.main, theme.palette.secondary[600]]);


    if (!statData || statData.length === 0) {
      return <div>Loading data...</div>;
    }
  
  
  return (

   
<ResponsiveLine
      data={[view === "sales" ? totalSalesLine : totalUnitLine]}
     
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        
        orient: "bottom",
        tickSize: 5,
       
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
