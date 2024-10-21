const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Middleware to parse JSON for non-webhook routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors());

// import routes
const PrescriptionRoute = require('./Routes/PrescriptionRoute');
const PatientRoute = require('./Routes/PatientRoute');
const MedicineRoute = require('./Routes/MedicineRoute');

const userRoute = require('./Routes/UserRoute');


app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// use routes
app.use('/user', userRoute);
app.use('/prescription', PrescriptionRoute);
app.use('/patient', PatientRoute);
app.use('/medicine', MedicineRoute);





// Load environment variables from .env file
require("dotenv").config();
const port = process.env.PORT;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// connect to the database
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
