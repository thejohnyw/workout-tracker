
from flask import Flask, json, request, session, redirect, render_template, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__) # Configuring web app and templates with Flask
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/workoutrepsdatabase' #Configuring PostgreSQL database with web app
db = SQLAlchemy(app) #initalizing database
cors = CORS(app) #allows react (localhost:3000) to access flask app (localhost:5000)
app.config['CORS_HEADERS'] = 'Content-Type'

class Action(db.Model):
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

@app.route('/')
def tru():
    return "hello"


@app.route('/test/')
def first():
    return {
        'name': 'book',
        'occupation': 'NBA'
    }

@app.route("/workout", methods=["POST"])
@cross_origin()
def add():
    workout = request.json["description"]
    reps = request.json["reps"] 
    action = Action(workout, reps)
    db.session.add(action)
    db.session.commit()
    return format_to_json(action)

#all workouts
@app.route("/workout", methods=["GET"])
def get_workouts():
    workouts = Action.query.order_by(Action.id.asc()).all()
    workout_list = []
    for workout in workouts:
        workout_list.append(format_to_json(workout))
    return {'events': workout_list}



#single workout: selecting, deleting, and editing workout
@app.route("/workout/<id>", methods=["GET", "PUT", "DELETE"])
def single(id):
    workout = Action.query.filter_by(id=id).one()
    json_format = format_to_json(workout)
    if request.method == "GET":
        return {'Workout': json_format}
    elif request.method == "DELETE":
        db.session.delete(workout)
        db.session.commit()
        return "Workout Deleted"
    elif request.method == "PUT":
        workout = Action.query.filter_by(id=id)
        replace, rep_replace = request.json['description'], request.json['reps']
        workout.update(dict(workouts=replace, reps=rep_replace, create_time=datetime.utcnow))
        db.session.commit()
        return {'Edited Workout': format_to_json(workout.one())}




if __name__ == '__main__':
    app.run(debug=True)