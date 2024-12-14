const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product.routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require('cors');


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using https
}));


// Routes
app.get("/", (req, res) => {
  res.send("Server is Running Correctly!");
});

app.use("/products", productRoutes);


app.get("/set-cookies", (req, res) => {
  res.cookie("username", "Tony");
  res.cookie("isAuthenticated", true, { maxAge: 900000, httpOnly: true });
  res.send("Cookies are set!");
});


// create a session to count the number of times a user has visited the website
app.get("/count", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Number of visits: ${req.session.views}`);
});



mongoose
  .connect("mongodb://localhost:27017/Employees")
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}`);
      });
  })
  .catch((error) => {
    console.log(`Connection Failed due to this error: ${error}`);
  });


