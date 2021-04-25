# RateSilverbullet
Technical test for Silverbullet

## Brief

- Create a basic web application "RateSilverBullet" in django (or comparable python framework)
- Allow unauthenticated users to give wearesilverbullet.com a review and a score between 1 to 5
- Allow unauthenticated users to sort the reviews by score
- Show an average overall score on screen across all user submissions
- Make it pretty

## Technology and Features

- Flask PostgresQL backend
- React frontend
- Sass styling
- Material-UI for star ratings

## Instructions to run application locally

### Basic requirements
Install Python3 and NodeJS
```brew install python3```
```brew install node```

Using Homebrew install `pipenv` and `postgresql`

* ```brew install pipenv``` 
* ```brew install postgresql```

Next create a database called `rate_silver_bullet_db` in postgresql

* ```createdb rate_silver_bullet_db```

Now install the python and node packages

* ```pipenv install```
* ```npm install```

At this point you will need to add a `.env` file to the root of the project

* For the `.env` copy and paste the three lines of code below:

```
FLASK_APP=server/app.py
FLASK_ENV=development
FLASK_SKIP_DOTENV=1
```

Start server

* ```npm run server```

Launch frontend (webpack dev server)

* ```npm run client```

Seed data is available

* ```npm run seed```
 



