import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { GeoData } from "../../state/GeoData";
import { ResponsiveChoropleth } from "@nivo/geo";

const Geography = () => {
  const [formattedLocation,setformattedLocation] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const getGeoGraphy = async () => {
      try {
        const response = await axios.get("http://localhost:5001/geography");
        setformattedLocation(response.data.formattedLocation);
      } catch (err) {
        console.log(err);
      }
    };

    getGeoGraphy();
  }, [formattedLocation]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find you clients locations" />
      <Box
        mt="40"
        height="75vh"
        border={`1 px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
       
        { formattedLocation ?     
        
       (<ResponsiveChoropleth
        data={formattedLocation}

        features={GeoData.features}

        theme={{
            axis:{
                domains:{
                    lines:{
                        stroke:theme.palette.secondary[200]
                    }
                },
                legend:{
                    text:{
                        fille:theme.palette.secondary[200]
                    }
                },
                ticks:{
                    line:{
                        stroke:theme.palette.secondary[200]
                    }
                },
                text:{
                    fill:theme.palette.secondary[200]
                }
            },
            legends:{
                text:{
                    fill:theme.palette.secondary[200]
                }
            },
            tooltip:{
                container:{
                    color:theme.palette.primary.main
                }
            }
        }}
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}

        domain={[ 0,40 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={1.5}
        borderColor="#fff"
      
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.background.alt,
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        />): <>Loading...</>}
      </Box>
    </Box>
  );
};

export default Geography;
