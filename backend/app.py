'''
Author: John Wang
file: app.py
Oct, 2022
Purpose: backend of full-stack web app
'''
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS


#link to access backend: https://workout-watcher.herokuapp.com/workout

app = Flask(__name__) # Configuring web app and templates with Flask
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kaswwsnrhvmuky:6bdc9cf2e1258c986450177327d385210fc5045c14d7dd1d7e059037ff8f38fc@ec2-35-170-146-54.compute-1.amazonaws.com:5432/d75bbdnufgb4ru' #Configuring PostgreSQL database with web app
db = SQLAlchemy(app) #initalizing database
cors = CORS(app, origins=["http://localhost:3000", "https://workout-watcher.me", "https://workout-watcher.netlify.app", "https://635350320ae32027157667e9--workout-watcher.netlify.app"]) #allows react (localhost:3000/deployed sites) to access flask app

class Action(db.Model): #setup of database
    __tablename__ = "Workouts and Reps"
    id = db.Column(db.Integer, primary_key=True)
    workouts = db.Column(db.String(50), nullable=False)
    reps = db.Column(db.String(50), nullable=False)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __init__(self, workouts, reps):
        self.workouts = workouts
        self.reps = reps




def format_to_json(action):
    return {
        "id": action.id,
        "description": action.workouts,
        "reps": action.reps,
        "create_time": action.create_time
    }


#adding new workout
@app.route("/workout", methods=["POST"])
def add_workout():
    workout = request.json["description"]
    reps = request.json["reps"] 
    action = Action(workout, reps)
    db.session.add(action)
    db.session.commit()
    return format_to_json(action)


#get all workouts
@app.route("/workout", methods=["GET"])
def get_workouts():
    workouts = Action.query.order_by(Action.id.asc()).all()
    workout_list = []
    for workout in workouts:
        workout_list.append(format_to_json(workout))
    return {'events': workout_list}



#selecting, deleting, and editing workout
@app.route("/workout/<id>", methods=["GET", "PUT", "DELETE"])
def single(id):
    workout = Action.query.filter_by(id=id).one()
    if request.method == "GET":
        return format_to_json(workout)
    elif request.method == "DELETE":
        db.session.delete(workout)
        db.session.commit()
        return "Workout Deleted"
    elif request.method == "PUT":
        workout = Action.query.filter_by(id=id)
        replace, rep_replace = request.json['description'], request.json['reps']
        workout.update(dict(workouts=replace, reps=rep_replace))
        db.session.commit()
        return format_to_json(workout.one())




if __name__ == '__main__':
    app.run(debug=True)