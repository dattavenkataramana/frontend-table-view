import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobOrder.css';

const JobOrder = () => {
  const [jobSummary, setJobSummary] = useState([]);  
  const [form, setForm] = useState({ name: '', work_hours_present: '', available: 'Yes' });  
  const [workHoursRequired, setWorkHoursRequired] = useState('');  

  const API_URL = 'https://table-assignment-xdnr.onrender.com';




  useEffect(() => {
    const fetchJobSummary = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-summary`);
        setJobSummary(response.data);
      } catch (error) {
        console.error('Error fetching job summary:', error);
      }
    };



    fetchJobSummary();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

  };
 


const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/add-job-summary`, form);
      setForm({ name: '', work_hours_present: '', available: 'Yes' });
      const response = await axios.get(`${API_URL}/job-summary`);
      setJobSummary(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleAssignJob = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/assign-job`, { work_hours_required: workHoursRequired });
      setWorkHoursRequired('');
      const response = await axios.get(`${API_URL}/job-summary`);
      setJobSummary(response.data);
    } catch (error) {
      console.error('Error assigning job:', error);
    }
  };



  return (
    <div className="container">
      <h1>Job Order Summary</h1>

      <div className="form-container">
        <h2>Add Employee</h2>
        <form onSubmit={handleAddEmployee} className="form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Work Hours Present:
            <input
              type="number"
              name="work_hours_present"
              value={form.work_hours_present}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Available:
            <select name="available" value={form.available} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <button type="submit" className="btn">Add Employee</button>
        </form>
      </div>

      <div className="form-container">
        <h2>Assign Job</h2>
        <form onSubmit={handleAssignJob} className="form">
          <label>
            Work Hours Required:
            <input
              type="number"
              value={workHoursRequired}
              onChange={(e) => setWorkHoursRequired(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn">Assign Job</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Job Summary</h2>
        <table className="job-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Work Hours Present</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {jobSummary.map((emp) => (
              <tr key={emp.emp_id}>
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.work_hours_present}</td>
                <td>{emp.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobOrder;
