# 🚀 Guide d'utilisation - Formulaire de Contact IATEK

## ✅ Ce qui a été fait

### 1. **Formulaire HTML adapté** ([Frontend/index.html](Frontend/index.html#L791-L829))
- ✅ Champ **Nom** (required) - ID: `nom`
- ✅ Champ **Prénom** (optionnel) - ID: `prenom`
- ✅ Champ **Email** (required) - ID: `email`
- ✅ Champ **Téléphone** (optionnel) - ID: `phone`
- ✅ Champ **Service souhaité** (required) - ID: `service`
- ✅ Champ **Message** (required) - ID: `message`

### 2. **Backend API** ([service_message/](service_message/))
- ✅ Serveur Express sur port **5003**
- ✅ Connexion MongoDB
- ✅ Endpoint POST `/dept` pour créer un message
- ✅ Validation des champs obligatoires
- ✅ CORS activé pour le frontend

### 3. **JavaScript Frontend** ([Frontend/script.js](Frontend/script.js#L112-L220))
- ✅ Connexion à l'API: `http://localhost:5003/dept`
- ✅ Validation des champs
- ✅ Loader pendant l'envoi
- ✅ Notifications toast élégantes
- ✅ Gestion des erreurs

### 4. **Styles des notifications** ([Frontend/styles.css](Frontend/styles.css#L1962-L2040))
- ✅ Design premium avec bordures colorées
- ✅ Animation slide-in depuis la droite
- ✅ Auto-fermeture après 5 secondes

---

## 📋 Étapes pour démarrer

### **Étape 1 : Configuration MongoDB**

**Option A - MongoDB local:**
```bash
# Démarrer MongoDB
mongod
```

**Option B - MongoDB Atlas (Cloud):**
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Récupérez votre URL de connexion

### **Étape 2 : Configuration du Backend**

```bash
# Naviguer dans le dossier service_message
cd service_message

# Créer le dossier config
mkdir -p config

# Créer le fichier .env
cat > config/.env << EOF
PORT=5003
MONGODB_URI=mongodb://localhost:27017/iatek_messages
# OU pour MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/iatek_messages
EOF

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

Vous devriez voir :
```
Departement running on port 5003
Connected to MongoDB : localhost
```

### **Étape 3 : Ouvrir le Frontend**

```bash
# Depuis le dossier IaTech
cd Frontend

# Ouvrir le fichier index.html dans votre navigateur
# Option 1: Double-cliquer sur index.html
# Option 2: Utiliser un serveur local
npx http-server -p 8000
# Puis ouvrir http://localhost:8000
```

---

## 🧪 Tester le formulaire

1. **Ouvrir le site** dans votre navigateur
2. **Scroller** jusqu'à la section "Contact"
3. **Remplir le formulaire** :
   - Nom: `Diop`
   - Prénom: `Mamadou`
   - Email: `mamadou.diop@example.com`
   - Téléphone: `+221 77 123 45 67`
   - Service: `Création de site web`
   - Message: `Bonjour, je souhaite créer un site web pour mon entreprise`

4. **Cliquer** sur "Envoyer le message"

5. **Observer** :
   - ⏳ Le bouton affiche "Envoi en cours..."
   - ✅ Une notification verte apparaît : "Message envoyé avec succès!"
   - 🔄 Le formulaire se réinitialise

---

## 🔍 Vérifier les données dans MongoDB

### Via MongoDB Compass (Interface graphique)
1. Télécharger [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Se connecter à `mongodb://localhost:27017`
3. Ouvrir la base `iatek_messages`
4. Voir la collection `departements`

### Via Terminal
```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base de données
use iatek_messages

# Voir tous les messages
db.departements.find().pretty()

# Compter les messages
db.departements.countDocuments()
```

---

## 🎯 Correspondance des champs

| Frontend (HTML) | JavaScript | Backend (MongoDB) |
|----------------|------------|-------------------|
| `id="nom"` | `formData.nom` | `nom` (required) |
| `id="prenom"` | `formData.prenom` | `prenom` (optional) |
| `id="email"` | `formData.email` | `email` (required) |
| `id="phone"` | `formData.phone` | `phone` (optional) |
| `id="service"` | `formData.service` | `service` (required) |
| `id="message"` | `formData.message` | `message` (required) |

---

## 🐛 Dépannage

### ❌ Erreur: "Impossible de se connecter au serveur"
**Solution:**
- Vérifiez que le backend est démarré (`npm start` dans service_message/)
- Vérifiez l'URL dans script.js ligne 112: `http://localhost:5003/dept`

### ❌ Erreur: "MongoDB error"
**Solution:**
- Vérifiez que MongoDB est démarré
- Vérifiez l'URI dans `config/.env`
- Pour MongoDB local: `mongodb://localhost:27017/iatek_messages`

### ❌ Erreur CORS
**Solution:**
- Le CORS est déjà activé dans server.js
- Si problème persiste, vérifiez que `app.use(cors())` est présent

### ❌ Le formulaire ne se soumet pas
**Solution:**
1. Ouvrir la console du navigateur (F12)
2. Vérifier les erreurs JavaScript
3. Vérifier que script.js est bien chargé

---

## 📊 Endpoints API disponibles

### POST `/dept`
Créer un nouveau message
```bash
curl -X POST http://localhost:5003/dept \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Diop",
    "prenom": "Mamadou",
    "email": "mamadou@example.com",
    "phone": "+221 77 123 45 67",
    "service": "site-web",
    "message": "Test message"
  }'
```

### GET `/dept/departements`
Récupérer tous les messages
```bash
curl http://localhost:5003/dept/departements
```

### PUT `/dept/:id`
Mettre à jour un message
```bash
curl -X PUT http://localhost:5003/dept/VOTRE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Diop Modifié"
  }'
```

### DELETE `/dept/:id`
Supprimer un message
```bash
curl -X DELETE http://localhost:5003/dept/VOTRE_ID
```

---

## 🎨 Personnalisation

### Changer le port du backend
Modifier `config/.env`:
```env
PORT=3000
```

Et dans `Frontend/script.js` ligne 112:
```javascript
const API_URL = 'http://localhost:3000/dept';
```

### Ajouter plus de services
Modifier `Frontend/index.html` ligne 808-816:
```html
<option value="nouveau-service">Nouveau Service</option>
```

### Modifier les couleurs des notifications
Modifier `Frontend/styles.css` ligne 1983-1997

---

## ✅ Checklist finale

- [ ] MongoDB est installé et démarré
- [ ] Le fichier `config/.env` est créé avec les bonnes variables
- [ ] Les dépendances sont installées (`npm install`)
- [ ] Le serveur backend est démarré (`npm start`)
- [ ] Le frontend est ouvert dans le navigateur
- [ ] Le formulaire s'affiche correctement
- [ ] Un test d'envoi de message fonctionne
- [ ] Les données apparaissent dans MongoDB

---

## 🎉 C'est prêt !

Votre formulaire de contact est maintenant **100% fonctionnel** et relié à votre backend MongoDB !

Les messages sont stockés dans la base de données et vous pouvez :
- Les consulter via MongoDB Compass
- Les gérer via l'API REST
- Les afficher dans un dashboard admin (à développer)
