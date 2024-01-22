const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const helemet=require('helmet');
const morgan=require('morgan');
const path=require('path');

const userRoutes=require('./routes/user.js')
const productRoutes =require ('./routes/getProducts.js')
const generalRoutes=require('./routes/general.js')
const salesRoutes=require('./routes/sales.js')
const transactionRoutes=require('./routes/transaction.js')
const managementRoutes=require('./routes/management.js')
const ClientRoutes=require('./routes/client.js')



//configuration
dotenv.config();
const app=express();


app.use(express.json());
app.use(helemet());
app.use(helemet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

/*Routes*/

app.use('/product',productRoutes);

app.use('/geography',ClientRoutes);
app.use('/user',userRoutes);
app.use('/general',generalRoutes)
app.use('/management',managementRoutes);
app.use('/sales',salesRoutes);
app.use('/transaction',transactionRoutes);



  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );

//mongoose setup

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Starting from server port: ${PORT}`));


}).catch((error) => console.log(`${error} did not connected`))
