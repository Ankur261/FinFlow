import { useState } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
 
  return (
     <div className="App">
      <Routes>
      <Route path="/*" element={<AppRouter />} />
    </Routes>
      
    </div>
  )
}

export default App
