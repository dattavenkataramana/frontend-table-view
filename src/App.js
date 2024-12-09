import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employees from './Employees';
import JobOrder from './JobOrder';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/joborder" element={<JobOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
