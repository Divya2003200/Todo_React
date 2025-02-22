import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InputForm from "./InputForm";
import './App.css'

function App() {
 

  return (
    <>
      <Router>
          <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/input/:param" element={<InputForm />} />
          <Route path='/input' element={<InputForm/>}></Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
