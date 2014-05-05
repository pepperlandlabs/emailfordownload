# Email For Download

## Setup Your Dev Environment

(OSX only directions from your favorite terminal app)

1. Install Homebrew.

		ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
		
2. Update Homebrew.
		
		brew update		
		
3. Install MySQL.
	
		brew install mysql
		
	If already installed, run:
		
		brew upgrade mysql

4. Follow Homebrew's directions to auto start MySQL if you wish. This may vary based on your machine, the code below is just an example of the output on my machine.

	To have launchd start mysql at login:
	
    	ln -sfv /usr/local/opt/mysql/*.plist ~/Library/		LaunchAgents
    	
	Then to load mysql now:
	
    	launchctl load ~/Library/LaunchAgents/			homebrew.mxcl.mysql.plist
    	
	Or, if you don't want/need to auto start, you can just run:
    	
    	mysql.server start
		
5. Install or upgrade Node.js.
	
		brew install nodejs
		
		brew upgrade nodejs

6. Clone this project and change into its directory.

		git clone git@github.com:pepperlandlabs/emailfordownload.git
		
		cd emailfordownload
		
7. Install Node.js Packages.

		npm install
		
8. Create the database.

		npm run createDb
		
9. Setup the database structure.

		npm run dbFixtures
		
10. Download your favorite MySQL client and connect to localhost. I prefer SequelPro.

		Host: 127.0.0.1
		User: root
		Password: (empty unless you set one up)
		
	You should now see a DB called widgets_core with a users and	migrations table. If you have trouble connecting make sure MySQL 	is running.
	
11. Set your Node.js environment.

		export NODE_ENV=development
	
12. Start the Node.js Hapi server. 
	
		node index

	I use nodemon to watch for server changes and restart 	automatically. 
	
	***You will still need a manual restart for template changes.***
		
		npm install nodemon -g
		nodemon index
		
13. If your server starts properly navigate to http://localhost:4200/ in your browser of choice.

14. Create a user by clicking the sign up link in the top right.

15. Check your MySQL editor to see if your user was created successfully. (TODO: Upgrade password security to add salt.)

## Developing for E4M

### Templating

All templates are written in Handlebars. If you wish to reuse a template anywhere, you will need to put in in the partials directory. 

Modifying a template will require you restart your server to see the changes. (I'm looking into a fix for this for local dev. Some weird caching issue.)

If you're using nodemon you can just do:

		rs
		
while the server is running.

### Styling

All styles are written in SCSS. 

To compile the stylesheets open the emailfordownload directory in a separate terminal and run:

		grunt
		
This will automatically watch for changes to your SCSS files included in the main.scss file. You should never have to restart to see these changes.

No decision has been made on a grid framework but will likely be the base layers of Zurb's Foundation.

### Routing

Routes are setup using the Hapi structure and are included in the routes directory. It should be fairly straight forward how you can setup a new if you desire (Cmd+c, Cmd+v, change some names ;)

Currently availabe routes:

		/
		/log-in
		/sign-up
		/dashboard

### Database

Sequelize, the Node.js ORM for MySQL is used for all model interactions. Db-migrate is used to create fixtures and initial tables. (TODO: Move migrations to sequelize)




		

	
	





		
		
		
