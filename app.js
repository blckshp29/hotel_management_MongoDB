const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
const connectDB = require('./config/db');

// Route files
const roomRoutes = require('./routes/room.js');
const guestRoutes = require('./routes/guest.js');
const bookingRoutes = require('./routes/booking.js');

// Load environment variables
dotenv.config();

// Connect to Database (moved to startServer for cleaner flow)
// connectDB(); // No need to call here, it's inside startServer()

const app = express();

// --- 🔒 CORS Configuration ---
const allowedOrigins = [
    'http://localhost:5173',          // For local development (e.g., React Dev Server)
    'https://hotel-management-mongo-db.vercel.app/' // my actual frontend URL!**
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true,                        // Allows cookies and Authorization headers
    optionsSuccessStatus: 204
};

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// 💡 INSERT CORS HERE
app.use(cors(corsOptions)); 

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