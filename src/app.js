const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { geocode } = require("../utils/geocode");
const forecast = require("../utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// console.log(publicDirectoryPath);

const app = express();

// setup handlebars  and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath)); // order matters

app.get("/help", (req, res) => {
  res.send("Hello express!");
}); //all three does not require
// app.get("/about", (req, res) => {
//     res.send("about Page");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Page",
    name: "Andrew Tate",
  });
});

app.get("/help", (req, res) => {
  res.send("hi");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
  });
});

app.get("/contactUs", (req, res) => {
  res.render("contactUs", {
    // render funtion for hbs file
    title: "Contact Us",
    name: "Andrew Tate",
  });
});
app.get("/contactUs/*", (req, res) => {
  res.send("article not found");
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    // to access query string from url (key, value) pair use req.query
    return res.send({
      // return static json
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, weatherData) => {
      if (error) return res.send({ error });

      return res.send({ forecast: weatherData, address: req.query.address });
    });
  });
});

app.get("*", (req, res) => {
  res.send("My 404 pages");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
