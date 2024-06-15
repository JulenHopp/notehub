import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActiveNotes from './pages/activeNotes/ActiveNotes';
import ArchivedNotes from './pages/archivedNotes/ArchivedNotes';
import Header from './components/header/Header';
import './App.css'

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" exact element={<ActiveNotes />} />
          <Route path="/archived" element={<ArchivedNotes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
