#production run

1. docker-compose -f docker-compose.production.yml up

#development run

1. docker compose -f docker-compose-database.yml up
2. npm run backend
3. npm run frontend
