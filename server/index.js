const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const serviceRoutes = require('./routes/service.routes');
const serviceFormRoutes = require('./routes/serviceForm.routes');
const userInfoRoutes = require('./routes/userInfo.routes');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173','https://connectly-application.netlify.app/'],
    credentials:true,
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-forms', serviceFormRoutes);
app.use('/api/user-info', userInfoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
