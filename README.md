# Tripsit Development Environment

This will set up a development environment for Tripsit.me. It will install all the dependencies and set up a local database. It will give the option to set up services.

0. Enable the VS code workspace, this makes things easier and more organized
1. Ensure your environment has all required software to run this by running `./tsctl chkenv`
2. Run `./tsctl bootstrap` - This installs everything and sets up the database
3. (Discord bot specific) Modify @tripsit/tripsit-discord-bot/.env with the required info
-  You may want to copy this file to @tripsit/.env so that it's not erased if you Clean the project
-  If you modify the .env file, you will need to run the Up command again to rebuild the container
-  I would love to somehow make a single .env file in the root of the project, but I don't know how to do that
4. Run `./tsctl up`

While developing you can use ./tsctl up to restart/rebuild. 

bootstrap	Clones all git repos down and installs their dependencies
up			Starts all docker containers
test		Runs automated tests for repositories
clean		Removes and reinstalls all artifacts
chkenv		Ensures local environment has dependencies installed
