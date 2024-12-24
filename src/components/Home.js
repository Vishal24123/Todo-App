import React from "react";
import TaskItem from "./TaskItem"; // Import TaskItem component
import styles from "../styles/Home.module.css"; // Make sure to update the path
import Filter from "./Filter";

function Home({
  tasks,
  toggleTaskCompletion,
  deleteTask,
  getTaskDescription,
  setFilter,
}) {
  return (
    <div className={styles.appContainer}>
      <h1>To-Do List</h1>
      <Filter setFilter={setFilter}/>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          getTaskDescription={getTaskDescription}
        />
      ))}
    </div>
  );
}

export default Home;
