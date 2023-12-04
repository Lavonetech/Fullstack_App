
import React, { useMemo, useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
const Monthly = () => {

    const [statData ,setStatData]=useState([]);
    const theme=useTheme();
    useEffect(()=>{

        const getMonthlyData = async ()=>{

            try{
            const response =await axios.get("http://localhost:5001/sales")
            setStatData(response.data.statData);

            }catch(err){

                console.log(err)
            }
        }
        getMonthlyData();
    },[])

    const formattedData = useMemo(()=>{

        const filteredData = statData.reduce((acc,cur)=>{

            const monthlyData=cur.monthlyData;
            return [...acc,...monthlyData]
        },[])

        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: filteredData.map(({ month, totalSales }) => ({
              x: month,
              y: totalSales,
            })),
          };
      
          const totalUnitLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: filteredData.map(({ month, totalUnits }) => ({
              x: month,
              y: totalUnits,
            })),
          };
      
          return [totalSalesLine, totalUnitLine];
    },[
        statData,
    theme.palette.secondary.main,
    theme.palette.secondary[600],
    ])
    if(!statData || statData.length===0){
        return(
            <div>Loading...</div>
        )
    }
    return (
        <Box m="1.5rem 2.5rem">
        <Header
          title="Monthly Overview"
          subtitle="Overview of monthly TotalSales & TotalUnits"
        />
        <Box height="75vh">
          
  
          <ResponsiveLine
            data={formattedData}
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
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
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
            ]}
          />
        </Box>
      </Box>
    );
}

export default Monthly;
