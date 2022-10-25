# Workout Watcher Full Stack Web App!

This site is fully deployed.

The backend CRUD API (Flask+PostgreSQL) is hosted on Heroku: https://workout-watcher.herokuapp.com
Note: There's no home page for backend so to access JSON data, go here: https://workout-watcher.herokuapp.com/workout

The frontend (React) is deployed on Netlify: https://workout-watcher.me/ , https://workout-watcher.netlify.app/ ; It makes requests to the backend on Heroku.

## TO RUN LOCALLY:

Firstly, change directory to where you want to download
   
    cd downloads
  
Clone the repo

    git clone https://github.com/thejohnyw/workout-watcher.me.git


### TO RUN BACKEND:

  There's little need to run the backend but to do so, 
  
    cd backend
      
 Install dependencies
      
    pip3 install -r requirements.txt
      
  If you want to run your own local database instead of the deployed Postgres on Heroku,
  change DATABASE_URL to your database credentials. **You need my .env file if you want to run the backend to connect with my Heroku Postgres Database.**
  
 Afterwards
 
    python3 app.py
      
 If you have your own local database also run:
 
    python3 dbcreate.py
    
 
 ### HOW TO RUN FRONTEND:
 
 First make sure the baseURL in frontend/src/components/mainpage.js is the backend link you want incase you want to run the localhost backend; it is defaulted to deployed one on Heroku
 
    cd frontend
      
Install Dependencies

    yarn install
      
Start the site!

    yarn start
      
 
 HOW WEBSITE WORKS
  
  
