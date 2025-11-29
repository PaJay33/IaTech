const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// --- Connexion MongoDB ---
const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB : ${con.connection.host}`);
    } catch (error) {
        console.log(`MongoDB error : ${error}`);
    }
};

connectDb();

// --- Routes API ---
const DeptRoutes = require('./routes/dept');
app.use('/dept', DeptRoutes);

// --- Servir frontend statique ---
app.use(express.static(path.join(__dirname, '../frontend')));

// Catch-all route pour index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// --- Lancer le serveur ---
app.listen(port, () => {
    console.log(`Departement running on port ${port}`);
});
