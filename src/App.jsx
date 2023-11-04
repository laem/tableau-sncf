import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import City from './pages/City'
import TrainStation from './components/TrainStation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":city" element={<City />}>
        <Route path=":codeStation" element={<TrainStation />} />
      </Route>
      <Route path="/station/:codeStation" element={<TrainStation />} />
    </Routes>
  )
}

export default App
