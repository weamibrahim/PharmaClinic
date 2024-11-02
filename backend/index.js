const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require('http');
const socketIo = require('socket.io');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true
  }
});


global.io = io;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);


  socket.on('joinRoom', (userId) => {
    if(userId){
    socket.join(userId);
    } // Join room specific to userId
    console.log(`User with ID: ${userId} joined their room`);
  });



  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Import routes
const MessageRoute = require('./Routes/MessageRoute');
const PrescriptionRoute = require('./Routes/PrescriptionRoute');
const PatientRoute = require('./Routes/PatientRoute');
const MedicineRoute = require('./Routes/MedicineRoute');
const userRoute = require('./Routes/UserRoute');
const NotificationRoute = require('./Routes/NotificationRoute');

app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Use routes
app.use('/message', MessageRoute);
app.use('/user', userRoute);
app.use('/prescription', PrescriptionRoute);
app.use('/patient', PatientRoute);
app.use('/medicine', MedicineRoute);
app.use('/notification', NotificationRoute);

// Load environment variables from .env file
require("dotenv").config();
const port = process.env.PORT;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Connect to the database
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
