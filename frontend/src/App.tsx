import './App.css'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Loader from './components/Loader';
const Signup = React.lazy(() => import("./pages/Signup"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Home = React.lazy(() => import("./pages/Home"));
import Courses from './pages/Courses';
import { Purchases } from './pages/Purchases';
import { Particular } from './pages/Particular';

function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/home' element={
            <Suspense fallback={<Loader/>}>
              <Home/>
            </Suspense>}
          />
          <Route path='/signup' element={
            <Suspense fallback={<Loader/>}>
              <Signup/>
            </Suspense>}
          />
          <Route path='/signin' element={
            <Suspense fallback={<Loader/>}>
              <Signin/>
            </Suspense>}
          />
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
          <Route path='/courses/:id' element={<Particular/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
