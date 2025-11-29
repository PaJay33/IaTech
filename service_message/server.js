const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// --- Connexion MongoDB ---
const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB : ${con.connection.host}`);
    } catch (error) {
        console.log(`MongoDB error : ${error}`);
    }
};

connectDb();

// --- Routes API ---
const DeptRoutes = require('./routes/dept');
app.use('/dept', DeptRoutes);

// --- Chemin frontend ---
const frontendPath = path.join(__dirname, '../frontend');

// Vérifier que le dossier frontend existe
if (!fs.existsSync(frontendPath)) {
    console.warn('⚠️ Dossier frontend introuvable. Vérifie le chemin ou copie le dossier dans Render.');
} else {
    // Servir les fichiers statiques
    app.use(express.static(frontendPath));

    // Catch-all pour index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

// --- Lancer serveur ---
app.listen(port, () => {
    console.log(`Departement running on port ${port}`);
});
