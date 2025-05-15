const express = require("express");
const mongoose = require("mongoose");

const homeRoute = require("./routes/homeRoutes")
const userRoute = require("./routes/userRoutes");
const manufacturerRoute = require("./routes/manufacturerRoutes");
const equipmentRoute = require("./routes/equipmentRoutes");
const transferRoute = require("./routes/transferRoutes");

const app = express();
app.use(express.json());

// routes
app.use("/api/v0/home", homeRoute);
app.use("/api/v0/manufacturers", manufacturerRoute);
app.use("/api/v0/users", userRoute);
app.use("/api/v0/equipments", equipmentRoute);
app.use("/api/v0/transfers", transferRoute);

async function start_server() {
  try {
    // connecting server to mongodb database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected: ${conn.connection.host}`);

    // starting server at port 5000
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start_server();
