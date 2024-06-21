import React, { useState, useEffect } from "react";
import axios from "axios";

function Tasklist() {
  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:5000/api/tasks/${editingId}`, {
          Name: taskname,
          Description: description,
        });
        setSuccessMessage(response.data.message);
        setEditingId(null); 
      } else {
        const response = await axios.post("http://localhost:5000/api/tasks", {
          Name: taskname,
          Description: description,
        });
        setSuccessMessage(response.data.message);
      }
      setTaskName("");
      setDescription("");
      setErrorMessage("");
      fetchTasks(); 
    } catch (error) {
      console.error("Error adding/updating task: ", error);
      setErrorMessage("Failed to add/update task. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleEdit = (task) => {
    setTaskName(task.Name);
    setDescription(task.Description);
    setEditingId(task.id); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setSuccessMessage(response.data.message);
      fetchTasks(); 
    } catch (error) {
      console.error("Error deleting task: ", error);
      setErrorMessage("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Task List</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Task Name:</label>
              <input
                type="text"
                className="form-control"
                value={taskname}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: "10px" }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
              {editingId ? "Update Task" : "Add Task"} 
            </button>
          </form>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Tasks:</h3>
          <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={task.id} className="list-group-item">
              <div style={{ marginBottom: "10px" }}> 
                <strong>{index + 1}. {task.Name}</strong>: {task.Description}
              </div>
              <div>
                <button className="btn btn-info btn-sm" onClick={() => handleEdit(task)}>Edit</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tasklist;
