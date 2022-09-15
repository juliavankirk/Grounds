var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');

//Routes
const userRoute = require("./controllers/userController");
const productRoute = require('product', productSchema);
const orderRoute = require('order', orderSchema);

var app = express();

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/groundsDB';
var port = process.env.PORT || 3001;

app.use(bodyParser.json());

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

/**
 * var userSchema = new Schema({
    forename: { type: String },
    surename: { type: String },
    id: { type: Number },
    role: { type: String },
    email: { type: String },
    password: { type: String }
});

var productSchema = new Schema({
    product_id: { type: Number },
    name: { type: String },
    quantity: { type: Number },
    description: { type: String }
});

var cartSchema = new Schema({
    cart_id: { type: Number },
    total: { type: Number },
    quantity: { type: Number }
});

var orderSchema = new Schema({
    order_id: { type: Number },
    country: { type: String },
    city: { type: String },
    street: { type: String },
    postcode: { type: Number },
    contact: { type: String }
});

 * 
 */

// Mongoose schema

//Mongoose model


// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
//registering cors
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message:
        "Howdy MEVN dev!"
    })
})

// Import routes
app.use("api/user", userRoute);
app.use("api/product", productRoute);
app.use("api/order", orderRoute);


// POST - Create a new user
app.post('/api/user', function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

// DELETE - Delete the user by given id
app.delete('/api/user/:id', function (req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({ _id: id }, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                { "message": "User not found" });
        }
        res.json(user);
    });
});
// Custom Error Handler Middleware
app.use(notFound, errorHandler)

//POST - Create a new product
app.post('/api/product', function (req, res, next) {
    var product = new Product(req.body);
    product.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(product);
    });
});


// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
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
