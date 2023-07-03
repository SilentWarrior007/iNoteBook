import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import {Routes, Route} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
    <NoteState>
    <Navbar/>
    <div className="my-1">
    <Alert alert = {alert}/>
    </div>
    <div className="container my-5">
      <Routes>
        <Route exact path="/" element={<Home showAlert = {showAlert}/>}/>
        <Route exact path="/About" element={<About/>}/>
        <Route exact path="/Login" element={<Login showAlert = {showAlert}/>}/>
        <Route exact path="/Signup" element={<Signup showAlert = {showAlert}/>}/>
      </Routes>
    </div>
    </NoteState>
    </>
  );
}

export default App;
