import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import {
  Box,
  Button,
  TextField,
useTheme,
} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid'

const Users = ({isDashbord=false}) => {
  const [user, setUser] =useState([]);
  const [searchQuery,setSearchResult] =useState("");
  const [totalPage,setTotalPage] =useState(1)
  const theme=useTheme();
 const userPerPage=5

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/user`);
        setUser(response.data.user);
        console.log(response.data);
        setTotalPage(Math.ceil(response.data.user.length/userPerPage))
        console.log(totalPage)
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const searchUsers = () => {
    const filteredUsers = user.filter((user) => {
      const name = user.name.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
    setUser(filteredUsers);
  };
  const columns = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
    
  ];
  
  
  
  return (
    <Box m="1.2rem 2.2rem"
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
     
      <Box>
        {
          !isDashbord ? <Box>
<Header title="CUSTOMERS" subtitle="Your customer list" />
      <TextField
        label="Search by user name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchResult(e.target.value)}
      />
      <Button  variant="contained"
        onClick={searchUsers}
        sx={{ ml: 2, mb: 2,position:'relative',top:".5rem"}}>
        Search
      </Button>
          </Box>:undefined
        }
      
      
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={user.map(user => ({ id: user. _id, name: user.name, email: user.email,city:user.city, state:user.state, country:user.country,phoneNumber:user.phoneNumber }))} columns={columns} />
        </div>
      </Box>
    </Box>
  );
};

export default Users;

