#!/bin/bash
docker compose -f docker-compose-e2e.yml down
docker compose -f docker-compose-e2e.yml up --build --abort-on-container-exit
docker compose -f docker-compose-e2e.yml down
