import React,{useEffect,useState} from 'react';
import Header from '../../components/Header';
import axios from 'axios'
import { 
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Rating,
    useTheme,
    useMediaQuery,
    Typography

} from '@mui/material';

const  Product = () => {
const [products, setProducts] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/product');
      setProducts(response.data.products);
  
    } catch (err) {
      console.error(err);
    }
  };

  fetchProducts();
}, []);

return (
    <Box sx={{   py: 4 }}>
        <Header title="PRODUCTS" subtitle="Here your listings products"/>
      <Box sx={{ maxWidth: isSmallScreen ? '100%' : '90%', margin: '0 auto' }}>
        
        <Box sx={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {products.map((product) => (
            <Card key={product._id} sx={{ bgcolor: 'primary.dark', color: 'white' }}>
              <CardContent>
              <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {product.category}
        </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  {product.name}
                </Typography >
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                  {product.price}
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  {product.description}
                </Typography>
                <Rating value={product.rating} readOnly sx={{ mb: 1 }} />
              </CardContent>
              <CardActions >
                <Button sx={{color: 'white'}}variant="outlined">See More</Button>
              </CardActions>
              <Collapse>
                <Typography variant="h6" gutterBottom>
                  Price: ${product.price}
                </Typography>
              </Collapse>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
  
}

export default Product;
