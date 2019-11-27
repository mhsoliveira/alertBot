import express from 'express';
import cors from 'cors';
import v1Routes from './routes';
const bodyParser = require('body-parser');

const app = express();

const { PORT = 3000 } = process.env;
const product = require('./routes/product.route'); // Imports routes for the products

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', product);

app.use(express.json());
app.use(v1Routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));

export default app;
