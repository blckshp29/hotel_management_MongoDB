const express = require('git commit -m "Add Express app with MongoDB connection and hotel management routes"');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // For compatibility with user's original steps
const connectDB = require('./config/db');

// Route files
const roomRoutes = require('./routes/room.js');
const guestRoutes = require('./routes/guest.js');
const bookingRoutes = require('./routes/booking.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('<h1>🏨 Hotel Management API is running!</h1><p>Access endpoints at /api/rooms, /api/guests, and /api/bookings</p>');
});

// Mount routers
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/bookings', bookingRoutes);

// Start server after DB connects and handle connection errors
const startServer = async () => {
    try {
        await connectDB(); // uses [`connectDB`](config/db.js)
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Failed to connect to database, exiting:', err.message || err);
        process.exit(1); // exit to avoid running without DB
    }
};

startServer();

const PORT = process.env.PORT || 3000;
