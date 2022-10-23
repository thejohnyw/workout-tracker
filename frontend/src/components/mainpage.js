// Mainpage
import axios from 'axios';
import {useState, useEffect} from 'react';
import Graphs from './graphs';

const Mainpage = () => {
    const baseURL = 'https://workout-watcher.herokuapp.com' //flask backend baseURL
    const [description, setDescription] = useState(""); // state of description of workout
    const [editDes, setEditDes] = useState(""); // state of description when editing
    const [reps, setReps] = useState(""); // state of reps of workout
    const [editReps, setEditReps] = useState(""); // reps state when editing
    const [editID, setEditID] = useState(null); // state of id of event user wants to edit
    const [eventslist, setEventslist] = useState([]); // state of workouts+reps
    const [graph, setGraph] = useState([{x:0, y:0}]);
    const [x_val, setX_val] = useState(1);
    const [y_val, setY_val] = useState(1);

    const fetchEvents = async () => {
        const data = await axios.get(`${baseURL}/workout`)
        const { events } = data.data
        setEventslist(events);
        setGraph([...graph, {x: x_val, y: y_val}])
        //console.log("Data: ", data)
          // console.log(description)/* maybe use looping to get desired workouts from all workouts list */
      }
      useEffect(() => {
        fetchEvents();
      }) //fetches events and updates graph every render
      
    
      // handling text change for workout input
      const handleChange = (e, edit) => {
        if (edit) { // if editing is true
          setEditDes(e.target.value);
        }
        else {
          setDescription(e.target.value);
        }
      }
    // handling text change for reps input
      const handleRepschange = (e, edit) => {
        if (edit) {
          setEditReps(e.target.value);
        }
        else {
          setReps(e.target.value);
        }
      }
      // handling submitting and editing
      const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
          'description': description,
          'reps': reps
        }
        const editBody = {
          'description': editDes,
          'reps': editReps
        }
        try {

          if (editDes) { // if editing then use put method, and set state of events to updated edits 
            const data = await axios({ //editing backend database
              method: 'put',
              url: `${baseURL}/workout/${editID}`,
              data: editBody
          })
            const updatedEvent = data.data
            const updatedList = eventslist.map(event => {
              if (event.id == editID) { // editing specified event
                event = updatedEvent
              }
              return event
            })
            setEventslist(updatedList)
    
          } else { // if not editing (submitting new workout)
            
              if (description) { // only allows new workout if user enters a workout description
                // posting to backend
                const data = await axios({
                  method: 'post',
                  url: `${baseURL}/workout`,
                  data: body
                })
                setEventslist([...eventslist, data.data])
                setX_val((x_val) => x_val+1)
                setY_val((y_val) => y_val+1)
              }
        } 
        // setting everything back to empty
          setDescription('')
          setReps('')
          setEditDes('')
          setEditReps('')
          setEditID(null)
    
        } catch (err) {
          console.error(err.message)
        }
      }
      // deleting specified event
      const handleDelete = async (id) => {
        try {
          await axios.delete(`${baseURL}/workout/${id}`)
          const newList = eventslist.filter(event => event.id !== id)
          setEventslist(newList)
          setY_val((y_val) => y_val-1)
        } catch (err) {
          console.log(err.message)
        }
    
      }
      // toggling edit mode
      const handleEdit = (e) => {
        setEditID(e.id);
        setEditDes(e.description);
        setEditReps(e.reps);
      }
    
    
    
      return (
        <div className='App'>
          <body>
            <section className='enterwrkouts'>
              <form onSubmit={handleSubmit}>
                <label htmlFor='workouts'>Workout</label>
                <input
                  onChange={(e) => handleChange(e, false)}
                  id='workouts'
                  placeholder='Workout name'
                  value={description}
                />
                <input
                  onChange={(e) => handleRepschange(e, false)}
                  id='reps'
                  placeholder='How many reps?'
                  value={reps}
                />
                <button className="button" type='submit'>Submit</button>
              </form>
            </section>
            <section className='notes' >
    
              <ul>
                {eventslist.map(event => {
                  if (editID == event.id) {
                    return (
                      <li>
                        <form onSubmit={handleSubmit} key={event.id}>
                        <input
                          onChange={(e) => handleChange(e, true)}
                          id='editworkouts'
                          value={editDes}
                        />
                        <input
                          onChange={(e) => handleRepschange(e, true)}
                          id='editreps'
                          value={editReps}
                        />
                        <button type='submit'>submit</button>
                        </form>
                      </li>
                    )
                  }
                  else {
                    return (
                      <li style={{display: "flex"}} key={event.id} className="wrappers">
                        {event.description},
                        {event.reps}
                        <button onClick={() => handleEdit(event)} className="button">Edit</button>
                        <button onClick={() => handleDelete(event.id)} className="button">X</button>
                      </li>
    
                    )
                  }
                })}
              </ul>
            </section>
    
          </body>

         <Graphs chartData={graph} />
          
        </div>
      );
}

export default Mainpage;