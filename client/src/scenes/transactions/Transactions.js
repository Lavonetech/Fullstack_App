import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5001/transaction");
        setTransactions(response.data.transaction);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);

  const handleSearch = () => {
    const search = transactions.filter((transaction) => {
      const cost= transaction.cost.toLowerCase();
      return cost.includes(searchQuery.toLowerCase());
    });
    setTransactions(search);
  };

const columns=[
  
    {field: '_id', headerName: 'ID', flex: 1 },
   { field: 'userref', headerName: 'USER_REF', flex: 1 },
    {field: 'cost', headerName: 'COST', flex: 1 }
 
]

  return (
    <div>
      <TextField
        label="Search by user ID"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button  variant="contained"
        onClick={handleSearch}
        sx={{ ml: 2, mb: 2,position:'relative',top:'.5rem'}}>
        Search
      </Button>
      
     <DataGrid rows={transactions.map(transac=>({id:transac._id, userref:transac.userId, cost:transac.cost}))} columns={columns}/>
            
    </div>
  );
}

export default Transactions;
