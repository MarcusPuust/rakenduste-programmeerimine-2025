const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// ROUTES
const todosRoutes = require("./routes/todos.routes");
const adminRoutes = require("./routes/admin.routes"); 

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept", "X-Admin-Token"],
}));
app.use(express.json());

// API ENDPOINTS
app.use("/todos", todosRoutes);
app.use("/admin", adminRoutes); 

app.get("/", (req, res) => {
  res.send("Hello TODO API!");
});

app.listen(port, () => {
  console.log(`TODO API listening on port ${port}`);
});

