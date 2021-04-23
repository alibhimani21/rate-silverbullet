# RateSilverBullet
Technical test for SilverBullet

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

Using Homebrew install `pipenv` and `postgresql`

* ```brew install pipenv``` 
* ```brew install postgresql```

Next create a database called `rate_silver_bullet_db` in postgresql

* ```createdb rate_silver_bullet_db```

Now install the python and node packages

* ```pipenv install```
* ```npm install```

At this point you will need to add two files to the root of the project

1. 	`.env`
2. `.babelrc`

For the `.env` copy and paste the three lines of code below:

```
FLASK_APP=server/app.py
FLASK_ENV=development
FLASK_SKIP_DOTENV=1
```


For the `.babelrc` copy and paste the following:

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

Start server

* ```npm run server```

Launch frontend (webpack dev server)

* ```npm run client```

Seed data is available

* ```npm run seed```
 



