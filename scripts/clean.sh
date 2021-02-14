# Remove project repo directories
echo "Removing repositories..."
for project_id in ${ALL_PROJECTS[@]}; do
	rm -rf "${REPOS_PATH}/${project_id}"
done

# Remove Docker containers and volumes
source "${SCRIPTS_PATH}/down.sh"
