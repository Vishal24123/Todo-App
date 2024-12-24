import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import styles from "../styles/TaskItem.module.css"; // Correct path based on your project structure

function TaskItem({
  task,
  toggleTaskCompletion,
  deleteTask,
  getTaskDescription,  // Receive the function as prop
}) {
  const [taskDescription, setTaskDescription] = useState("");
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); // State to toggle description visibility

  // Function to handle "How to Perform This Task" button click
  const handleFetchDescription = async () => {
    setLoadingDescription(true);
    const description = await getTaskDescription(task.text);  // Call the passed function
    setTaskDescription(`This task can be performed by:\n${description}`);
    setLoadingDescription(false);
    setIsDescriptionVisible(true); // Show the description once fetched
  };

  // Function to handle "Hide Description" button click
  const handleHideDescription = () => {
    setIsDescriptionVisible(false); // Hide the description
    setTaskDescription(""); // Clear the description text
  };

  return (
    <div className={styles.taskItemContainer}>
      {/* Task text wrapped with a Link for navigation */}
      <Link to={`/tasks/${task.id}`} className={styles.taskText}>
        {task.text}
      </Link>

      <div className={styles.buttonContainer}>
        {/* Toggle Button for task completion */}
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          className={styles.complete}
        >
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>

        {/* Button to fetch task description */}
        <button
          onClick={handleFetchDescription}
          className={styles.button}
        >
          How to Perform This Task
        </button>

        {/* Delete button */}
        <button
          onClick={() => deleteTask(task.id)}
          className={`${styles.button} ${styles.deleteButton}`}
        >
          Delete
        </button>
      </div>

      {/* Display task description */}
      {loadingDescription && <span>Loading...</span>}
      {isDescriptionVisible && !loadingDescription && (
        <div className={styles.taskDescription}>
          {/* Add a <br /> or force a new line after "This task can be performed by:" */}
          <p>
            <strong>This task can be performed by:</strong>
            <br />
            {taskDescription}
          </p>

          {/* Button to hide the description */}
          <button 
            onClick={handleHideDescription} 
            className={styles.hideButton}
          >
            Hide Description
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
