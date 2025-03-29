import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Ten Thousand Hours</h1>
          <nav>
            <Link
              to="/"
              className="text-white text-lg hover:underline transition duration-300"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 flex-grow py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pomodoro/:taskId" element={<Pomodoro />} />
        </Routes>
      </main>
      <footer className="bg-white py-4 shadow-md mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Ten Thousand Hours
        </div>
      </footer>
    </div>
  );
}

export default App;
