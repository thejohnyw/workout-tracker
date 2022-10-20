
from flask import Flask, json, request, session, redirect, render_template, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__) # Configuring web app and templates with Flask
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/workouts' #Configuring PostgreSQL database with web app
db = SQLAlchemy(app) #initalizing database
cors = CORS(app) #allows react (localhost:3000) to access flask app (localhost:5000)


class Action(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workouts = db.Column(db.String(50), nullable=False)
    #reps = db.Column(db.String(50), nullable=False)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Action: {self.workouts}"
    
    def __init__(self, workouts):
        self.workouts = workouts
        #self.reps = reps
def format_to_json(action):
    return {
        "id": action.id,
        "description": action.workouts,
        #"reps": action.reps,
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
def add():
    workout = request.json['description']
    action = Action(workout)
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
        replace = request.json['workouts']
        workout.update(dict(workouts=replace, create_time=datetime.utcnow))
        db.session.commit()
        return {'Edited Workout': format_to_json(workout.one())}




if __name__ == '__main__':
    app.run()