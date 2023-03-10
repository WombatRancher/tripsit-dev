# Tripsit Development Environment

This will set up a development environment for Tripsit.me. 

It will install all the dependencies and set up a local database, the same as the production environment.
It will give you a local copy of the Tripsit Discord Bot.

This is a work in progress. It's not perfect, and it's not complete. It's a work in progress.
If you have any questions, please ask in the #dev-general channel on the Tripsit Discord server.

# Discord bot setup
**Create a bot application** \
https://discordjs.guide/preparations/setting-up-a-bot-application.html \
Also bookmark this link because this site is super helpful! \
Remember your bot token and client ID, you will need it later!

**Join, and have your bot join, the TripSit Dev server** \
The dev server is a rough copy of the main server, but gives you admin permissions to test things \
https://discord.gg/wkjFUDZXxU \
Ping moonbear and they will set you up with permissions

**Join, and have your bot join, the TripSit Emoji servers** \
The emoji servers are used to store the custom emojis used by the bot \
The bot will not work without these servers \
https://discord.gg/Y5ErzrbPTj \
https://discord.gg/bxbYqH5xFe

# Windows Setup
**Install Windows Subsystem for Linux (WSL) and Ubuntu 20.14.04 LTS** \
WSL allows you to run Linux on Windows \
Open a command prompt as admin
> `wsl --install`

**Install Chocolatey**
Note: This is optional, but it's a nice tool to have \
https://chocolatey.org/install or
> `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))` \

**Install Docker Desktop for Windows** \
Note: Docker needs to be installed on the Host (windows) machine, and also the WSL (Ubuntu) machine \
https://www.docker.com/products/docker-desktop/ or
> choco install docker-desktop

**Install Visual Studio Code** \
Note: Other IDE's are possible but not supported. If you want help, use VSCode. \
https://code.visualstudio.com/download or
> choco install vscode 

**Install PGAdmin4** \
Note: This is optional, but it's a nice tool to have \
https://www.pgadmin.org/download/
> choco install pgadmin4

**Install the following VSCode extensions on your local machine**\
* Required:
  * DotENV - Support for dotenv file syntax
    * https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv
  * WSL - Open any folder in the Windows Subsystem for Linux (WSL) and take advantage of Visual Studio Code's full feature set.
    * https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl

**Enter WSL (Ubuntu) machine**
Open VSCode \
Click the green icon in the bottom left corner \
Click "Connect to WSL" \
Continue to follow the instructions, including the **Linux instructions** below

**Install the following VSCode extensions on the WSL (Ubuntu) machine**
* Recommended:
  * ESLint Integrates ESLint JavaScript into VS Code.
    * https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  * GitHub Copilot - Your AI pair programmer
    * https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
  * Docker - Makes it easy to create, manage, and debug containerized applications.
    * https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker -->
  * PostgreSQL - PostgreSQL Management Tool
    * https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres -->
  Optional:
  * Code Spell Checker - Spelling checker for source code
    * https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
  * DeepScan - Detect bugs and quality issues in JavaScript, TypeScript, React and Vue.js more precisely
    * https://marketplace.visualstudio.com/items?itemName=DeepScan.vscode-deepscan
  * SonarLint - SonarLint is an IDE extension that helps you detect and fix quality issues as you write code in C, C++, Java, JavaScript, PHP, Python, HTML and TypeScript.
    * https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode

# Linux Setup
**Install docker** \
Follow instructions here: https://docs.docker.com/engine/install/ubuntu/ \
Or copy and run the following scary looking code, which is just the above instructions in one line:
> sudo apt-get update && \ \
> sudo apt-get install ca-certificates curl gnupg lsb-release && \ \
> sudo mkdir -m 0755 -p /etc/apt/keyrings && \ \
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.> gpg && \ \
> echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.> docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/> null && \ \
> sudo chmod a+r /etc/apt/keyrings/docker.gpg && \ \
> sudo apt-get update && \ \
> sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \ \
> sudo groupadd docker && \ \
> sudo service docker start && \ \
> sudo docker run hello-world

**Install Node Version Manager** \
NVM lets you easily change the node version you're using. **We want to use 16.17.1** \
Follow instructions here: https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/ or \
> sudo apt install curl && \ \
> curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash && \ \
> nvm install 16.17.1 && \ \
> nvm use 16.17.1

**Download the repo**
> git clone https://github.com/tripsit/tripsit-dev

**Open the code in your IDE** \
> cd tripsit-dev && \ \
> code .

**Open workspace** \
Click "Open workspace" \
If you don't see, this, make sure to File > Open workspace from file > Select tripsit-dev.code-workspace


**Build the environment**
Open a new terminal in VSCode using the @tripsit workspace
> ./tsctl chkenv

This makes sure your environment has all the required software installed. This may ask you to restart WSL, you can do that via:
> wsl --shutdown
> wsl

When that's done, run the boostrap command
> ./tsctl bootstrap

This downloads the repos from GitHub and installs their dependencies

**Setup the .env file** \
Open the .env.example file in the @tripsit-discord-bot workspace \
Modify the file to include the required information \
> DISCORD_CLIENT_ID = (In your Discord Developer Portal) \
> DISCORD_GUILD_ID = (Taken from the discord guild your bot will use as home) \
> DISCORD_CLIENT_TOKEN = (In your Discord Developer Portal) 

Copy this file to .env in the same @tripsit-discord-bot workspace \
Copy this file to .env in the @tripsit workspace, so that it's not erased if you Clean the project \
I would love to somehow make a single .env file in the root of the project, but I don't know how to do that

Start the containers, including postgres and tripbot
> ./tsctl up

# Extra tasks
**Confirm the environment is up** \
To see running containers, use the docker desktop app or run:
> docker container ps

**Watch tripbot logs** \
Use the docker desktop app or run:
> npm run tripbotLogs

**Connect PGAdmin4 to the database** \
PostGresAdmin4 is a GUI for managing PostGres databases, it is not required but it's nice to have. I'm not even that great at using it, so instructions are limited
1. Open PGAdmin4
2. Right click on the Servers node and select Register > Server
2. Enter a name for the server (TripSit Dev)
2. In the Connection tab enter:
    * Host name/address: localhost
    * Port: 5432
    * Username: tripsit_api
    * Password: P@ssw0rd
2. Click Save
2. Right click on the server you just created and select Connect
2. Right click on the Databases node and select Refresh

You should see a database called tripsit

**Manually modify the database** \
If you need to manually modify the database, you can use PGAdmin4 or any other PostGres client. \
In PGAdmin4 you can follow the menus down through Servers > TripSit Dev > Databases > tripsit > Schemas > public > Tables \
In the table view you can right click on a table and select "view first 100 rows" \
When viewing, you can modify the data. Then you can save the results to the database. 
Go crazy in your local DB, you can't hurt production. 

**Redo just the database** \
If you want to start over with a clean database, you can run:
> npm run refreshDb

The refreshDb command will drop the database and recreate it from scratch, this does not include any production data. This is useful if you want to start over with a clean database, to test what happens when someone first joins the server

**Copy production Database** \
If you need to copy the database, you'll need to get the production URL from moonbear and add it to your .env file
> npm run update-db

**Modify .env** \
If you modify the .env file, you will need to to rebuild the container
> ./tsctl up

**Redo everything** \
If you want to start over from scratch, run the clean command to remove and redownload everything, and then run the up command.
> ./tsctl clean && \
> ./tsctl up