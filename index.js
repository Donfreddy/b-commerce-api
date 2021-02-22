// Importing modules
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const createError = require("http-errors");

// Importing routes
const blogRoute = require("./Routes/BlogRoute");
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const categoryRoute = require("./Routes/categoryRoute");

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect(
    "mongodb://localhost/b_commercedb", { useUnifiedTopology: true, useNewUrlParser: true, usecreateIndexes: true },
    () => {
        console.log("Connexion a la base de donnee effectue");
        app.listen(3000, () => {
            console.log("Express ecoute sur le port 3000");
        });
    }
);

// Using express to parse json data
app.use(express.json());
app.use(logger("dev"));

// simple route
app.get("/", (req, res) => {
    res.send("Welcome to b_commerce api server");
});

// Configure Routes
app.use("/api/blog", blogRoute);
app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", categoryRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message });
});

// Starting the server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Votre Serveur fonctionne sur http://localhost:${port}`);
});