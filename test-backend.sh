#!/bin/bash

echo "🧪 Test du Backend IATEK - Formulaire de Contact"
echo "=================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Vérifier que le serveur est accessible
echo "📡 Test 1: Vérification du serveur..."
if curl -s http://localhost:5003/dept/departements > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Serveur accessible sur http://localhost:5003${NC}"
else
    echo -e "${RED}❌ Serveur non accessible. Assurez-vous que le backend est démarré:${NC}"
    echo -e "${YELLOW}   cd service_message && npm start${NC}"
    exit 1
fi

echo ""

# Test 2: Envoyer un message de test
echo "📤 Test 2: Envoi d'un message de test..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5003/dept \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "Utilisateur",
    "email": "test@iatek.com",
    "phone": "+221 77 123 45 67",
    "service": "site-web",
    "message": "Ceci est un message de test automatique"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "201" ]; then
    echo -e "${GREEN}✅ Message envoyé avec succès (Code: $HTTP_CODE)${NC}"
    echo "Réponse: $BODY"
else
    echo -e "${RED}❌ Échec de l'envoi (Code: $HTTP_CODE)${NC}"
    echo "Réponse: $BODY"
fi

echo ""

# Test 3: Récupérer tous les messages
echo "📥 Test 3: Récupération de tous les messages..."
MESSAGES=$(curl -s http://localhost:5003/dept/departements)
COUNT=$(echo "$MESSAGES" | grep -o '"_id"' | wc -l)

echo -e "${GREEN}✅ $COUNT message(s) trouvé(s) dans la base de données${NC}"

echo ""
echo "=================================================="
echo -e "${GREEN}🎉 Tests terminés !${NC}"
echo ""
echo "Pour voir tous les messages:"
echo "  curl http://localhost:5003/dept/departements | json_pp"
