import React, { useState } from "react";
import styles from "../styles/AddTask.module.css";

function AddTask({ addTask }) {
  const [taskText, setTaskText] = useState("");

  function handleAddTask() {
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
      window.location.reload();
    }
  }

  return (
    <div className={styles.addTaskContainer}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter new task"
        className={styles.inputField}
      />
      <button onClick={handleAddTask} className={styles.addButton}>
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
