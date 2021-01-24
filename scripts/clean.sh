#!/var/usr/bin bash
set -e

# Remove project repo directories
echo "Removing repositories..."
for project_id in ${ALL_PROJECTS[@]}; do
	rm -rf "${REPOS_PATH}/${project_id}"
done

# Remove Docker containers and volumes
containers="$(docker ps -qaf name=tripsit)"
if [[ ! -z "${containers}" ]]; then
	running_containers="$(docker ps -qf name=tripsit)"
	if [[ ! -z "${running_containers}" ]]; then
		docker stop "${running_containers}"
	fi
	docker rm "${containers}"
fi

container_volumes="$(docker volume ls -qf name=tripsit)"
if [[ ! -z "${container_volumes}" ]]; then
	docker volume rm "${container_volumes}"
fi
