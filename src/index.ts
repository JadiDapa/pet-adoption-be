import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Route Imports
import GuestRouter from './routes/route.guest';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Base Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api', GuestRouter);

// App Port Listener
app.listen(port, () => {
  console.log('Server Activated');
  console.log(`http://localhost:${port}`);
});
