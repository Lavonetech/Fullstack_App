
import {CssBaseline,ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {themeSettings} from './theme'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Dashboard from './scenes/dashboard/Dashboard';
import Layout from "./scenes/layout/Layout";
import Products from "./scenes/products/product.js";
import Users from "./scenes/users/users";
import Transactions from "./scenes/transactions/Transactions";
import Geography from "./scenes/geography/Geography";
import Overview from "./scenes/overview/Overview";
import Daily from "./scenes/daily/Daily";
import Monthly from "./scenes/monthly/monthly";
import BreakDown from "./scenes/breakdown/BreakDown";



function App() {

  const mode = useSelector((state)=>state.global.mode);
  const theme =useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="app">
      <BrowserRouter>
     <ThemeProvider theme={theme}>
       <CssBaseline/>
       <Routes>
<Route element={<Layout/>}>
  <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/products" element={<Products/>}/>
  <Route path="/customers" element={<Users/>}/>
  <Route path="/transactions" element={<Transactions/>}/>
  <Route path="/geography" element={<Geography/>}/>
  <Route path="/overview" element={<Overview/>}/>
  <Route path="/daily" element={<Daily/>}/>
  <Route path="/monthly" element={<Monthly/>}/>
  <Route path="/breakdown" element={<BreakDown/>}/>
  <Route path="/dashbord" element={<Dashboard/>}/>
 
</Route>
       </Routes>
     </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
