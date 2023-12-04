import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme, Box } from "@mui/material";
import {ResponsivePie} from '@nivo/pie';

const BreakDown = () => {
  const [statData, setStatData] = useState([]);
  const theme = useTheme();
  const colors=[
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500]

  ]
  useEffect(() => {
    const getCatogeries = async () => {
      try {
        const response = await axios.get("http://localhost:5001/sales");
        setStatData(response.data.statData);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    getCatogeries();
  }, []);

  const formattedData = () => {
    const data = [];
  
    statData.forEach((item) => {
      Object.entries(item.salesByCatogery).forEach(([category, sales]) => {
        data.push({
            id: category,
            label: category,
         value: sales,
        });
      });
    });
  

return data;
  };
  

  return (

  <Box height="75vh">
  <ResponsivePie
    data={formattedData()}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={theme.palette.secondary[300]}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    
          
    legends={[
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]}
/>
</Box>
  )
};

export default BreakDown;
