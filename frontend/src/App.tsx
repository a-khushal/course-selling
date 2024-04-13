import './App.css'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Courses } from './pages/Courses';


function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/courses' element={<Courses/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
