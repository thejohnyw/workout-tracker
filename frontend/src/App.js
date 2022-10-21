import axios from 'axios';
import {useState, useEffect} from 'react';
import './App.css';



const baseURL = 'http://127.0.0.1:5000'

function App() {
  const [description, setDescription] = useState("");
  const [editDes, setEditDes] = useState("");
  const [reps, setReps] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editID, setEditID] = useState(null);
  const [eventslist, setEventslist] = useState([]);

  const fetchEvents = async () => {
    const data = await axios.get(`${baseURL}/workout`)
    const { events } = data.data
    setEventslist(events);
    //console.log("Data: ", data)
      // console.log(description)/* maybe use looping to get desired workouts from all workouts list */
  }
  useEffect(() => {
    fetchEvents();
  }, [])
  


  const handleChange = (e, edit) => {
    if (edit) {
      setEditDes(e.target.value);
    }
    else {
      setDescription(e.target.value);
    }
  }

  const handleRepschange = (e, edit) => {
    if (edit) {
      setEditReps(e.target.value);
    }
    else {
      setReps(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    var body = {
      'description': description,
      'reps': reps
    }
    var editBody = {
      'description': editDes,
      'reps': editReps
    }
    try {
      if (editDes) {
        const data = await axios({
          method: 'put',
          url: `${baseURL}/workout/${editID}`,
          data: editBody
      }
      )
        const updatedEvent = data.data
        console.log('update', updatedEvent)
        const updatedList = eventslist.map(event => {
          if (event.id == editID) {
            event = updatedEvent
          }
          return event
        })
        console.log('setting', updatedList)
        setEventslist(updatedList)

      }
      else {
        const data = await axios({
          method: 'post',
          url: `${baseURL}/workout`,
          data: body
      })
        setEventslist([...eventslist, data.data])
    }
      setDescription('')
      setReps('')
      setEditDes('')
      setEditReps('')
      setEditID(null)

    } catch (err) {
      console.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/workout/${id}`)
      const newList = eventslist.filter(event => event.id !== id)
      setEventslist(newList)
    } catch (err) {
      console.log(err.message)
    }

  }
  const handleEdit = (e) => {
    setEditID(e.id);
    setEditDes(e.description);
    setEditReps(e.reps);
  }




  //   try {

  //   }

  // }


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
    </div>
  );

        }
export default App;

