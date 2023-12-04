import React, { useMemo, useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ResponsiveLine } from "@nivo/line";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [statData, setStatData] = useState([]);
  const [startDate, setStartDate] = useState(new Date(2022, 3, 22)); // April 22, 2023
  const [endDate, setEndDate] = useState(new Date(2024, 3, 22)); // April 22, 2024

  const theme = useTheme();

  useEffect(() => {
    const getDailyData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/sales");
        setStatData(response.data.statData);
       
      } catch (err) {
        console.log(err);
      }
    };
    getDailyData();
  }, []);

  const formattedData = useMemo(() => {
    const filteredData = statData.reduce((acc, cur) => {
      const dailyData = cur.dailyData.filter(({ date }) => {
        const dateFormatted = new Date(date);
        return dateFormatted >= startDate && dateFormatted <= endDate;
      });

      return [...acc, ...dailyData];
    }, []);

    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: filteredData.map(({ date, totalSales }) => ({
        x: date,
        y: totalSales,
      })),
    };

    const totalUnitLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: filteredData.map(({ date, totalUnits }) => ({
        x: date,
        y: totalUnits,
      })),
    };

    return [totalSalesLine, totalUnitLine];
  }, [
    statData,
    startDate,
    endDate,
    theme.palette.secondary.main,
    theme.palette.secondary[600],
  ]);

  if (!statData || statData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Daily Overview"
        subtitle="Overview of daily TotalSales & TotalUnits"
      />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>

          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

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
};

export default Daily;
