const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });


const app = express();
const port = 3000;

// ROUTES
const todosRoutes = require("./routes/todos.routes");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes"); 

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept","Authorization", "X-Admin-Token"],
}));
app.use(express.json());

// API ENDPOINTS
app.use("/todos", todosRoutes);
app.use("/admin", adminRoutes); 
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello TODO API!");
});

app.listen(port, () => {
  console.log(`TODO API listening on port ${port}`);
});

