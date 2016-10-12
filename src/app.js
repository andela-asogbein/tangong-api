import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import category from './routes/category.route';
import user from './routes/user.route';
import gig from './routes/gig.route';
import payment from './routes/payment.route';
import connection from './routes/connection.route';

let app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tango_db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
});

category(app);
user(app);
gig(app);
payment(app);
connection(app)

export default app;
