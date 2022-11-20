tripsit_network="$(docker network ls -qf name=tripsit)"
# If the tripsit_network does NOT exist, create it
if [[ -z "${tripsit_network}" ]]; then
	echo "Creating network"
	docker network create tripsit
fi

echo "Starting containers"
for project_id in "${DOCKER_COMPOSE_PROJECT_IDS[@]}"; do
	docker compose \
		-f "${REPOS_PATH}/${project_id}/docker-compose.yml" \
		--env-file ./.env up -d --build
done

echo "Done starting containers"