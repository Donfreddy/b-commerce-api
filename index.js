// Importing modules
const express = require("express");
const mongoose = require("mongoose");

// Importing routes
const blogRoute = require("./Routes/BlogRoute");
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const categoryRoute = require("./Routes/categoryRoute");

// Initialize express app
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost/b_commercedb",
  { useUnifiedTopology: true, useNewUrlParser: true, usecreateIndexes: true },
  () => {
    console.log("Connexion a la base de donnee effectue");
    app.listen(3000, () => {
      console.log("Express ecoute sur le port 3000");
    });
  }
);

// Using express to parse json data
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.send("Welcome to b_commerce api server");
});

// Configure Routes
app.use("/api/blog", blogRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", userRoute);
app.use("/api", productRoute);
app.use("/api", categoryRoute);

// Starting the server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Votre Serveur fonctionne sur http://localhost:${port}`);
});
