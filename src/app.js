const express = require('express');
const cors = require('cors');

const errorHandler = require('./middlewares/error');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
 res.send('API is running...');
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
