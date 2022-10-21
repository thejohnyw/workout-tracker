import axios from 'axios';
import {useState, useEffect} from 'react';
import './App.css';



const baseURL = 'http://127.0.0.1:5000'

function App() {
  const [description, setDescription] = useState("");
  const [reps, setReps] = useState("");
  const [eventslist, setEventslist] = useState([]);

  const fetchEvents = async () => {
    const data = await axios.get(`${baseURL}/workout`)
    const { events } = data.data
    setEventslist(events);
    //console.log("Data: ", data)
      // console.log(description)/* maybe use looping to get desired workouts from all workouts list */
  }
  


  const handleChange = e => {
    setDescription(e.target.value);
  }

  const handleRepschange = e => {
    setReps(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    var body = {
      'description': description,
      'reps': reps
    }
    try {
      const data = await axios({
        method: 'post',
        url: `${baseURL}/workout`,
        data: body
    })
  //   await axios({
  //     method: 'post',
  //     url: `${baseURL}/workout`,
  //     data: body
  // }).then(res => {
  //   console.log(res)
  // })

      setEventslist([...eventslist, data.data])
      setDescription('')
      setReps('')

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


  useEffect(() => {
    fetchEvents();
  }, [])
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
              onChange={handleChange}
              type="type"
              name='workouts'
              id='workouts'
              value={description}
            />
            <input
              onChange={handleRepschange}
              type="type"
              name='reps'
              id='reps'
              value={reps}
            />
            <button className="button" type='submit'>Submit</button>
          </form>
        </section>
        <section className='notes' >

          <ul>
            {eventslist.map(event => {
              return (
                <li style={{display: "flex"}} key={event.id} className="wrappers">
                  {event.description},
                  {event.reps}
                  <button onClick={() => handleDelete(event.id)} className="button">X</button>
                </li>

              )
            })}
          </ul>
        </section>

        
      </body>
    </div>
  );

        }
export default App;

