# workout watcher Full stack web app

This site is fully deployed.

The backend CRUD API (Flask+PostgreSQL) is hosted on Heroku: https://workout-watcher.herokuapp.com
Note: There's no home page for backend so to access JSON data: https://workout-watcher.herokuapp.com/workout

The frontend (React) is deployed on Netlify: https://workout-watcher.me/ , https://workout-watcher.netlify.app/ ; It makes request calls to the backend on Heroku

TO RUN LOCALLY:

  There's little need to run the backend but to do so, 
  
      cd backend
      
      pip3 install -r requirements.txt
      
  If you want to run your own local database instead of the deployed Postgres on Heroku,
  change DATABASE_URL to your database credentials.
  
 Afterwards
 
      python3 app.py
      
 If you have your own local database also run:
 
 
    python3 dbcreate.py
    
 .
 
 HOW TO RUN FRONTEND
 
 HOW WEBSITE WORKS
  
  
