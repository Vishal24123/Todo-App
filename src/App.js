import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import RootLayout from "./layouts/RootLayout";
import Error from "./layouts/Error";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails"



function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'pending'

  // Fetch tasks from the backend
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  // Add a new task
  async function addTask(taskText) {
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        text: taskText,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // Toggle task completion
  async function toggleTaskCompletion(id) {
    try {
      // Make the PATCH request without storing the response
      await axios.patch(`http://localhost:5000/tasks/${id}`);
  
      // Update the tasks state optimistically (without using the response)
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  }

  // Delete a task
  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Fetch description for a task using OpenAI's API
  async function getTaskDescription(taskText) {
    try {
      const response = await axios({
        method: "post",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for security
        },
        data: {
          model: "gpt-4", // Use a valid model name
          messages: [
            { role: "user", content: taskText }
          ],
          temperature: 1,
          top_p: 1,
          max_tokens: 2048,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all' or if no filter is set
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home
          tasks={filteredTasks} 
          addTask={addTask}
          setFilter={setFilter}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          getTaskDescription={getTaskDescription}
          /> }, 
        { path: "/about", element: <About/> },
        { path: "/tasks/:id", element :<TaskDetails tasks={tasks}/>},
      ],
    },
  ]);
  
    return <RouterProvider router={router} />;
  
}

export default App;
