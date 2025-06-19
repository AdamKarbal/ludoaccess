#!/bin/bash

set -e

echo "Nettoyage des éventuels conteneurs en cours..."
docker compose -f docker-compose.yml down --remove-orphans

echo "Lancement de la stack applicative..."
docker compose -f docker-compose.yml up --build
