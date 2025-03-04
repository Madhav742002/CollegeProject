let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let app= express();
app.use(express.json());
app.use(cors())
//Routes
app.use('/api/web/enquiry', enquiryRouter);

//http://localhost:8020/api/web/enquiry/insert



//connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000,()=>{  //http://localhost:8020
        console.log('Server is running');
    });
}).catch((err) => {console.log(err)})



