#!/bin/bash
set -e

echo "Nettoyage des anciens résultats..."
rm -rf ./e2e-results
mkdir -p ./e2e-results/playwright-report
mkdir -p ./e2e-results/tests-results

echo "Shutdown des anciens conteneurs..."
docker compose -f docker-compose-e2e.yml down --remove-orphans

echo "🚀 Lancement des tests end-to-end..."
docker compose -f docker-compose-e2e.yml up --build --abort-on-container-exit

echo "Extraction des rapports du conteneur..."

CONTAINER_ID=$(docker ps -a -q -f "name=e2e-tests")
if [ -z "$CONTAINER_ID" ]; then
  echo "❌ Aucun conteneur e2e-tests trouvé."
  exit 1
fi
docker cp "$CONTAINER_ID:/app/playwright-report" ./e2e-results/
docker cp "$CONTAINER_ID:/app/test-results" ./e2e-results/tests-results

echo "Nettoyage final..."
docker compose -f docker-compose-e2e.yml down

echo "✅ Terminé ! Rapport disponible ici :"
echo "→ ./e2e-results/playwright-report/index.html"

