const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv');
const cors=require('cors');
const path = require('path');

dotenv.config();
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and sessions (if applicable)
  };
app.use(cors(corsOptions));
app.use(express.json());
const authRouter=require('./routes/authRoutes')
const productRouter=require('./routes/productRoutes')
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT=process.env.PORT;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Starting from server port: ${PORT}`));
}).catch(err=> console.log(`${err} did not connected`));


app.use(cookieParser())

app.use(express.static(path.join(__dirname,'public')))

app.use(productRouter);
app.use(authRouter);