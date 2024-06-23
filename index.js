import express from 'express';
import { connect } from 'mongoose';
import  connectDB  from './db.js';
import { configDotenv } from 'dotenv';
import  BookRouter  from './routes/BookRoute.js ';
import  ComputerRouter  from './routes/ComputerRoute.js ';
import  CubicleRouter  from './routes/CubicleRoute.js ';
import BorrowBookRouter  from './routes/BorrowBookRoute.js';
import BorrowComputerRouter  from './routes/BorrowComputerRoute.js';
import BorrowCubicleRouter  from './routes/BorrowCubicleRoute.js';

const app = express();

app.use(express.json());

configDotenv();

const PORT = process.env.PORT || 5000;
app.use("/api", BookRouter, ComputerRouter, CubicleRouter, BorrowBookRouter, BorrowComputerRouter, BorrowCubicleRouter);
connectDB();


app.get('/', (req, res) => {
    res.send({'Hello World': 'Welcome to the Node.js World!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});