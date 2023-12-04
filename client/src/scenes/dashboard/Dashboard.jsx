
import React,{useEffect,useState} from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";

import axios from 'axios';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import StatBox from "../../components/StatBox";
import OverviewChart from "../../components/OverviewChart";
import Users from "../users/users";


const Dashboard = () => {
 const [statData,setStatData]=useState([]);
    const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  
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

  const formattData = () => {
    const sums = [];
    statData.forEach((itemData) => {
      const data = itemData.dailyData.reduce((acc, cur) => {
        return acc + cur.totalSales;
      }, 0);
      sums.push(data);
    });
    return sums;
  };
  
  const formattedSums = formattData();

  
  const formattCus = () => {
    const customers=[];
    statData.forEach((itemData) => {
      const data = itemData.totalCustomers;
      customers.push(data);
    });
   return customers;
  };
  const formaCus=formattCus();
  
  const monthlySales=()=>{
    const totalSale=[]
     statData.forEach((itemData)=>{
      const data=itemData.monthlyData.reduce((acc,cur)=>{
         return acc + cur.totalSales;
      },0)
      totalSale.push(data);
     })
     return totalSale;
  }

  const monthSale=monthlySales();

  const yearlySales=()=>{
    const totalSale=[]
     statData.forEach((itemData)=>{
      const data=itemData.yearlySalesTotal;
      totalSale.push(data);
     })
     return totalSale;
  }

  const yearlySale=yearlySales();
    return (
        <Box m="1.5rem 2.5rem">
        <FlexBetween>
            <Header title="DASHBORD" subtitle="Welcome to your dashbord"/>

            <Box>
            <Button 
              sx={{
                backgroundColor:"#f44336",
                color:theme.palette.secondary[100],
                fontSize:"14px",
                fontWeight:"bold",
                padding:"10px 20px",
              }}
            >
       <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
            </Button>
        </Box>
        </FlexBetween>
        <Box 
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },}}
        >
        <StatBox 
         title="Total Customers"
       value={formaCus}
         increase="+21%"
         description="Since last month"
         icon={
           <PersonAdd
             sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}

             />
          }
        />

<StatBox
          title="Sales Today"
          value={formattedSums}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
         <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
     
          borderRadius="0.55rem"
        >
        <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sale"
         value={monthSale}
          increase="+5%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
         value={yearlySale}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
    {/* Row 2 */}
       
        </Box>

        <Box
         gridAutoColumns="span 8"
         gridRow="span 2"
         backgroundColor={theme.palette.background.alt}
         
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
          
        >
          <Box><Users isDashbord={true}/></Box>
          <Box 
         gridColumn="span 8"
         gridRow="span 2"
         backgroundColor={theme.palette.background.alt}
        >

     
        </Box>
        </Box>
        </Box>
   
        
    );
}

export default Dashboard;
