const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");


// Create Express app
const app = express();
const port = 5000; // Choose a port for the backend

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",  // Your MySQL server address
  user: "root",       // Your MySQL username
  password: "Vishal24",       // Your MySQL password
  database: "tododb", // The database we created earlier
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

// Routes

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Task text is required" });
  }
  db.query(
    "INSERT INTO tasks (text, completed) VALUES (?, ?)",
    [text, false],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.status(201).json({ id: results.insertId, text, completed: false });
    }
  );
});

// Toggle task completion status
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE tasks SET completed = NOT completed WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json({ id, completed: !results.completed });
    }
  );
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.status(204).end(); // No content
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
