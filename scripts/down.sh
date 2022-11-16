containers="$(docker ps -qaf name=tripsit)"

echo "Removing containers"
if [[ ! -z "${containers}" ]]; then
	running_containers="$(docker ps -qf name=tripsit)"
	echo "Containers are running: ${running_containers}"
	if [[ ! -z "${running_containers}" ]]; then
		echo "Stopping containers"
		docker stop "${running_containers}"
	fi
	echo "Removing container"
	docker rm "${containers}"
	echo "Unseting container"
	unset running_containers
fi

echo "Removing volumes"
container_volumes="$(docker volume ls -qf name=tripsit)"
if [[ ! -z "${container_volumes}" ]]; then
	docker volume rm "${container_volumes}"
fi

unset containers
unset container_volumes

echo "Done removing everything!"
