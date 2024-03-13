const express = require("express");
const koalaRouter = express.Router();
let koalaHolla = [
  {
    id: 1,
    name: "Scotty",
    favorite_color: " Red ",
    age: 4,
    ready_to_transer: "Y",
    notes: "Born in Guatemala ",
  },
  {
    id: 2,
    name: "Jean ",
    favorite_color: " Green  ",
    age: 5,
    ready_to_transer: "Y",
    notes: "Allergic to lots of lava",
  },
  {
    id: 3,
    name: "Ororo  ",
    favorite_color: "Yellow",
    age: 7,
    ready_to_transer: "N",
    notes: " Loves listening to Paula (Abdul)",
  },
  {
    id: 4,
    name: " K'Leaf",
    favorite_color: " Purple  ",
    age: 15,
    ready_to_transer: " N",
    notes: " Never refuses a treat",
  },
  {
    id: 5,
    name: "Charlie",
    favorite_color: "Orange",
    age: 9,
    ready_to_transer: "Y",
    notes: "Favorite band is Nirvana ",
  },
  {
    id: 6,
    name: "Betsy ",
    favorite_color: " Blue ",
    age: 4,
    ready_to_transer: "Y",
    notes: " Has a pet iguana",
  },
];
// DB CONNECTION

// GET
koalaRouter.get("/", (request, response) => {
  response.json(koalaHolla);
  console.log(request.query);
});

// POST

// PUT

// DELETE

module.exports = koalaRouter;
