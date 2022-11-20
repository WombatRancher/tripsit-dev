# Tripsit Development Environment

This will set up a development environment for Tripsit.me. It will install all the dependencies and set up a local database. It will give the option to set up services.

1. Ensure your environment has all required software to run this by running `./tsctl chkenv`
2. Run `./tsctl bootstrap`
3. (Discord bot specific) Copy .env.example to .env and fill in the details
4. Run `./tsctl up`

While developing you can use ./tsctl up to restart/rebuild. 

bootstrap	Clones all git repos down and installs their dependencies
up			Starts all docker containers
test		Runs automated tests for repositories
clean		Removes and reinstalls all artifacts
chkenv		Ensures local environment has dependencies installed
