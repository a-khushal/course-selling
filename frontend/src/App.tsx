import './App.css'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Loader from './components/Loader';
const Courses = React.lazy(() => import("./pages/Courses"))
const Signup = React.lazy(() => import("./pages/Signup"))
const Signin = React.lazy(() => import("./pages/Signin"))


function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Suspense fallback={<Loader/>}><Signup/></Suspense>}/>
          <Route path='/signin' element={<Suspense fallback={<Loader/>}><Signin/></Suspense>}/>
          <Route path='/courses' element={<Suspense fallback={<Loader/>}><Courses/></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
