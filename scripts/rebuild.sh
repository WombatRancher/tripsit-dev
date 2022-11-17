
echo "Rebuilding containers"
for project_id in "${DOCKER_COMPOSE_PROJECT_IDS[@]}"; do
	docker compose \
		-f "${REPOS_PATH}/${project_id}/docker-compose.yml" \
		build
done

echo "Updating containers"
for project_id in "${DOCKER_COMPOSE_PROJECT_IDS[@]}"; do
	docker compose \
		-f "${REPOS_PATH}/${project_id}/docker-compose.yml" \
		up -d
done

echo "Done starting containers"