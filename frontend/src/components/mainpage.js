// Mainpage component (functional component)
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
    const [graph, setGraph] = useState([{x:0, y:0}]); // graph data to be inputted as prop to Graph component
    const [x_val, setX_val] = useState(1); // x values of graph coordinates
    const [y_val, setY_val] = useState(1); // y value of coordinates
    const [showgraph, setShowgraph] = useState(false) //boolean on whether to display graph or not (based on click)

    const fetchEvents = async () => {
        const data = await axios.get(`${baseURL}/workout`)
        const { events } = data.data
        setEventslist(events); // setting events to data from backend
        setGraph([...graph, {x: x_val, y: y_val}]) // appending new coordinates (x,y) to graph data list
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
            const updatedList = eventslist.map(event => {// editing specified event
              if (event.id === editID) { 
                event = updatedEvent // changing old event to updated event
              }
              return event
            })
            setEventslist(updatedList) // setting edited/updated event
    
          } else { // if not editing (submitting new workout)
            
              if (description) { // only allows new workout if user enters something for workout description
                
                const data = await axios({ // posting data to backend
                  method: 'post',
                  url: `${baseURL}/workout`,
                  data: body
                })
                setEventslist([...eventslist, data.data]) // adding new data to eventslist
                setX_val((x_val) => x_val+1) // increasing slope of graph when adding a new workout
                setY_val((y_val) => y_val+1)
              }
        } 
        // setting everything back to default
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
          const newList = eventslist.filter(event => event.id !== id) // filtering out deleted event
          setEventslist(newList)
          setY_val((y_val) => y_val-1) // decreases slope of graph when deleting workout
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
      
      // toggling showing of graph
      const handleShowgraph = () => {
        setShowgraph(curr => !curr);
      }

    
    
      return (
        <div className='App'>
            <section className='enterwrkouts'>
              <form onSubmit={handleSubmit}>
                <p className='prettytext'>Enter Workouts You Intend to Do! Hit Done when you completed them!</p>
                <label htmlFor='workouts' >Workout <br /> </label>
                <input
                  onChange={(e) => handleChange(e, false)}
                  id='workouts'
                  placeholder='Workout name'
                  value={description}
                  className='inputs'
                />
                <input
                  onChange={(e) => handleRepschange(e, false)}
                  id='reps'
                  placeholder='How many reps?'
                  value={reps}
                  className='inputs'
                />
                <button className="button" type='submit'>Submit</button>
              </form>
            </section>
            <section className='editing' >
              <ul>
                {eventslist.map(event => {
                  if (editID === event.id) {
                    return (
                      <li>
                        <form onSubmit={handleSubmit} key={event.id}>
                        <input
                          onChange={(e) => handleChange(e, true)}
                          id='editworkouts'
                          value={editDes}
                          className='inputs'
                        />
                        <input
                          onChange={(e) => handleRepschange(e, true)}
                          id='editreps'
                          value={editReps}
                          className='inputs'
                        />
                        <button className='button' type='submit'>submit</button>
                        </form>
                      </li>
                    )
                  }
                  else {
                    return (
                      <li key={event.uniqueid} className="eventbubbles">
                        {event.description},
                        {event.reps}
                        <button onClick={() => handleEdit(event)} className="button">Edit</button>
                        <button onClick={() => handleDelete(event.id)} className="button">Done</button>
                      </li>
    
                    )
                  }
                })}
              </ul>
            </section>
            <p className='prettytext'>Graph visualizes the workouts you create and complete! Try to make it go up then straight down!</p>
            <button onClick={handleShowgraph} className='button'>Show Graph</button>
            {showgraph && <Graphs chartData={graph} />}
            
        </div>
      );
}

export default Mainpage;
