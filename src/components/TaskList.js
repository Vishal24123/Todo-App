import React, { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleTaskCompletion, deleteTask, getTaskDescription }) {
  const [loadingDescription, setLoadingDescription] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");

  // Fetch description when user clicks on "Get Description"
  async function fetchDescription(taskText) {
    try {
      setLoadingDescription(true);
      const description = await getTaskDescription(taskText);
      setTaskDescription(description);
      setLoadingDescription(false);
    } catch (error) {
      setLoadingDescription(false);
      console.error("Error fetching task description:", error);
    }
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          fetchDescription={fetchDescription}
          taskDescription={taskDescription}
          loadingDescription={loadingDescription}
        />
      ))}
    </div>
  );
}

export default TaskList;
