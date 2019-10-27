const path = require("path");
const express = require("express");
const hbs = require("hbs");
const gecode = require("./utils/geocode");
const forcast = require("./utils/forcast");

log = console.log;

const app = express();

const port = process.env.PORT || 3000;

// app.com
//app.com/help
//app.com/about

//Define paths for express config
const publicFolderPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup static directory to serve
app.use(express.static(publicFolderPath));

// Here we are using hbs where we are using view engines to access dynamic pages

//Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Utsab"
  });
});

app.get("", (req, res) => {
  res.send("Hello Express");
});

app.get("/help", (req, res) => {
  /*
  res.send([
    {
      name: "Utsab",
      age: 26
    },
    {
      name: "Kittu",
      age: 26
    }
  ]);
  */
  res.render("help", {
    helpText: "These are some help details",
    name: "Utsab",
    title: "Help"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Utsab"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kindly provide a address to search"
    });
  }

  gecode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forcast: forcastData,
        location,
        address: req.query.address
      });
    });
  });

  /*
  console.log(req.query.address);
  res.send({
    address: req.query.address
  }); */
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMsg: "help article not found",
    name: "Utsab"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMsg: "Page Not found!",
    name: "Utsab"
  });
});

app.listen(port, () => {
  log(port + " port is running");
});
