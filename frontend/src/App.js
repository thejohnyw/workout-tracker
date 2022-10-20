import logo from './logo.svg';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { format } from 'date-fns';
import './App.css';



const baseURL = 'http://127.0.0.1:5000'

function App() {
  const [description, setDescription] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post(`${baseURL}/workout`, {description})
      axios.post(`${baseURL}/workout`, {description}).then((res) => {
        console.log(res)
      })
      setEventslist([...eventslist, data.data])
      setDescription('')

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
            <label htmlFor='workout'>Workout</label>
            <input
              onChange={handleChange}
              type="type"
              name='workout'
              id='workout'
              value={description}
            />
            <button className="button" type='submit'>Submit</button>
          </form>
        </section>
        <section className='notes' >

          <ul>
            {eventslist.map(event => {
              return (
                <li style={{display: "flex"}} key={event.id} className="wrappers">
                  {event.description}
                  <button onClick={() => handleDelete(event.id)} className="button">Del</button>
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

