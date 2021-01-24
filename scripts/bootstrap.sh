
for project_id in "${ALL_PROJECTS[@]}"; do
	project_path="${REPOS_PATH}/${project_id}"
	# Clone git repositories that don't exist
	if [[ ! -d "${project_path}" ]]; then
		git clone "git@github.com:TripSit/${project_id}.git" "${project_path}"
		# If npm package npm install
		if [[ -f "${project_path}/package.json" ]]; then
			npm --prefix "${project_path}" install
		fi
	fi
done
