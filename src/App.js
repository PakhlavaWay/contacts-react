import './App.css';
import Header from './components/Header';
import Users from './pages/Users';
import User from './pages/User';
import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Favorites from './pages/Favorites';


function App() {
  const { id } = useParams();

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path='/' element={<h1 style={{ textAlign: 'center', marginTop: '100px' }}>Welcome to Contacts App!</h1>} /> */}
        <Route path='/' element={<Users />} />
        <Route path='/:id' element={<User detailsOpen={true} />} />
        <Route path='/favorites' element={<Favorites />}/>
      </Routes>
    </div>
  );
}

export default App;
