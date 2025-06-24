import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;