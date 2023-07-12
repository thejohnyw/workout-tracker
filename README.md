# Workout Watcher Full Stack Web App!

This site is fully deployed. Since Heroku removed hosting, the site's backend will no longer take API requests.

The backend CRUD API (Flask+PostgreSQL) is hosted on Heroku: https://workout-watcher.herokuapp.com
Note: There's no home page for backend so to access JSON data, go here: https://workout-watcher.herokuapp.com/workout

The frontend (React) is deployed on Netlify: https://workout-watcher.me/ , https://workout-watcher.netlify.app/ ; It makes requests to the backend on Heroku.

**The main backend code is in app.py**

**The main frontend code is in src/components: mainpage.js and graph.js**
## TO RUN LOCALLY:

Firstly, change directory to where you want to download
   
    cd downloads
  
Clone the repo

    git clone https://github.com/thejohnyw/workout-watcher.me.git

CD to repo

    cd workout-watcher.me
### TO RUN BACKEND:

  There's little need to run the backend but to do so, 
  
    cd backend
      
 Install dependencies
      
    pip3 install -r requirements.txt
      
  If you want to run your own local database instead of the deployed Postgres on Heroku,
  change DATABASE_URL to your database credentials. **You need my .env file with my database credentials if you want this backend to work with my Heroku Postgres Database.**
  
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
      
 
 ## HOW WEBSITE WORKS Video Demo
  

https://user-images.githubusercontent.com/114613919/197926407-de5f2399-5cdf-4308-a63d-55dc06945895.mov

SCREENSHOT OF SAMPLE DATA FROM BACKEND

<img width="1512" alt="Screenshot 2022-10-25 at 11 14 43 PM" src="https://user-images.githubusercontent.com/114613919/197926467-ea798288-6490-4a7f-b3e7-aa2c3c442ef1.png">



