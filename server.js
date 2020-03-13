const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = env.proces.PORT || 80;
const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_bwgh8gn7:6snp47evj49fuonpn1ufd8mklg@ds031968.mlab.com:31968/heroku_bwgh8gn7", {
  useNewUrlParser: true,
  useFindAndModify: false
});
db.Workout.create({name: "Bench Press"})
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({message}) => {
    console.log(message);
  })

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});