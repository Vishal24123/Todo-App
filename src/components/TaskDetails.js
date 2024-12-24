import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // To get the task ID from the URL
import styles from "../styles/TaskDetails.module.css"; // Import the module.css file

function TaskDetails({ tasks }) {
  const { id } = useParams(); // Get the task ID from the URL
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    const task = tasks.find((task) => task.id === parseInt(id)); // Find the task based on the ID
    setTaskDetails(task); // Set the task details in state
  }, [id, tasks]);

  if (!taskDetails) {
    return <p className={styles.taskNotFound}>Task not found</p>; // Handle if task not found
  }

  return (
    <div className={styles.taskDetailsContainer}>
      <h2>Task Details</h2>
      <p><strong>Id:</strong> {taskDetails.id}</p>
      <p><strong>Task: </strong>{taskDetails.text}</p>
      <p><strong>Status: </strong>
        <span className={taskDetails.completed ? styles.completed : styles.pending}>
          {taskDetails.completed ? "Completed" : "Pending"}
        </span>
      </p>
      {/* Display any other task-related details here */}
      <Link to="/" className={styles.backLink}>Back</Link>
    </div>
  );
}

export default TaskDetails;
