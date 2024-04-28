const express = require("express");
const routes = require("express").Router();
const task = require("./src/tasks/controller");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

routes.use("/tasks", task);
app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
