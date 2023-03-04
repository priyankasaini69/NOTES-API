const express = require('express');
const app = express();
const noteRouter = require('./routes/noteRoute');
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/notes', noteRouter);
z
app.get('/', (req, res) =>{
    res.send("Note API from PRIYANKA");
})

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Connected to ${PORT}`);
    });
})
.catch((error) =>{
    console.log(error);
})

