 


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  

const Employees = () => {
  const [employees, setEmployees] = useState([]); 
  const [form, setForm] = useState({ emp_name: '', location: '', mobile_number: '', comments: '' });  
  const [showForm, setShowForm] = useState(false);  

  const API_URL = 'https://table-assignment-xdnr.onrender.com';  

   
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_URL}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/employees`, form);
      setForm({ emp_name: '', location: '', mobile_number: '', comments: '' });  
      setShowForm(false); 
       
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container">
      <h1>Employee Management</h1>

      {showForm ? (
        <div className="form-container">
          <h2>Add Employee</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Name:
              <input
                type="text"
                name="emp_name"
                value={form.emp_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Mobile Number:
              <input
                type="text"
                name="mobile_number"
                value={form.mobile_number}
                onChange={handleChange}
              />
            </label>
            <label>
              Comments:
              <textarea
                name="comments"
                value={form.comments}
                onChange={handleChange}
              ></textarea>
            </label>
            <div className="button-group">
              <button type="submit" className="btn submit-btn">Submit</button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowForm(true)}
            className="btn add-btn"
          >
            Add Employee
          </button>
          <h2>Employee List</h2>
          <div className="table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Emp No</th>
                  <th>Emp Name</th>
                  <th>Location</th>
                  <th>Number of Jobs Done</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.emp_no}>
                    <td>{emp.emp_no}</td>
                    <td>{emp.emp_name}</td>
                    <td>{emp.location}</td>
                    <td>{emp.number_of_jobs_done}</td>
                    <td>{emp.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Employees;

