require("dotenv").config();
const express = require("express");
const cors = require("cors");
// // const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
  
}

app.get("/", (req, res) => {
  res.send("Welcome to Mequon Theaters website.");
});


// // const PORT = process.env.PORT || 4242;
// // app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
// // create an express app
// const express = require("express")
// const app = express()

// // use the express-static middleware
// app.use(express.static("public"))

// // define the first route
// app.get("/", function (req, res) {
//   res.send("<h1>Hello World!</h1>")
// })

// start the server listening for requests
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));