// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Employees from './Employees';
// import JobOrder from './JobOrder';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Employees />} />
//         <Route path="/joborder" element={<JobOrder />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Employees from './Employees';
import JobOrder from './JobOrder';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="navbar">
        <Link to="/" className="nav-link">Employees</Link>
        <Link to="/joborder" className="nav-link">Job Order Summary</Link>
      </div>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/joborder" element={<JobOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
