require('dotenv').config();
const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const errorHandler = require('./middlewares/errorHandler');
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);
// Global Error Handler (must be last)
app.use(errorHandler);


// Test DB Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully!');
        connection.release();
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
