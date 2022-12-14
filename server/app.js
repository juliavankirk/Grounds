var express = require('express');
var app = express();
var mongoose = require('mongoose');
const dotenv = require('dotenv');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');

// Routes
const authRoute = require('./controllers/auth');
const userRoute = require('./controllers/userController');
const productRoute = require('./controllers/productController');
const orderRoute = require('./controllers/orderController');
const cartRoute = require('./controllers/cartController');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/groundsDb'; //changed from localhost to connect better to db (nodejs v17.x req)
var port = process.env.PORT || 3000;

dotenv.config();

// Connect to MongoDB
mongoose.connect(mongoURI, 
    { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
// To pass any json file
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
//registering cors
app.use(cors());

// Import routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);
app.use('/api/income', orderRoute);

app.get("/api", function (req, res) {
    res.json({
      message:
        "This route is used for newman-wait that runs with the npm test command.",
    });
  });

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
