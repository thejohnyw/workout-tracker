import './App.css';
import Mainpage from './components/mainpage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from "react-router-dom";


const App = () =>  {

  return (
      <Router>
        
        <Routes>
            <Route path='/' element={<Mainpage />} />
        </Routes>

      </Router>
  );

}

export default App;
