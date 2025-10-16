const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // For compatibility with user's original steps
const connectDB = require('./config/db');

// Route files
// FIX: Using the correct file names (room.js, guest.js, booking.js) and adding the .js extension.
const roomRoutes = require('./routes/room.js');
const guestRoutes = require('./routes/guest.js');
const bookingRoutes = require('./routes/booking.js');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
// The body-parser middleware is used to parse incoming request bodies
app.use(express.json()); // Allows the app to handle JSON data
app.use(bodyParser.json()); // Included for redundancy/compatibility

// Root route
app.get('/', (req, res) => {
    res.send('<h1>🏨 Hotel Management API is running!</h1><p>Access endpoints at /api/rooms, /api/guests, and /api/bookings</p>');
});

// Mount routers
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/bookings', bookingRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running in mode on http://localhost:${PORT}`));
  