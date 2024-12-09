import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Employees from './Employees';
import JobOrder from './JobOrder';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/joborder" element={<JobOrder />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
