const express = require("express");
const koalaRouter = express.Router();
const pg = require("pg");
const pool = new pg.Pool({
  // name of the database to connect to
  database: "KoallaHolla",
  // where is the database?
  host: "localhost",
  // by default, postgres listens on port 5432
  port: 5432,
});

koalaRouter.get("/", (request, respnse) => {
  let queryText = `SELECT * FROM "Koalla_Residents" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      respnse.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET /books", error);
      res.sendStatus(500);
    });
});

// POST
koalaRouter.post("/", (request, response) => {
  console.log(request.body);
  let queryText = `   INSERT INTO "Koalla_Residents" ("ResidentName", "FavoriteColor", "Age", "Ready_transfer","Notes") 
  VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [
      request.body.ResidentName,
      request.body.FavoriteColor,
      request.body.Age,
      request.body.Ready_transfer,
      request.body.Notes,
    ])
    .then(() => {
      response.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in POST /Koalla_Residents", error);
      response.sendStatus(500);
    });
});

// PUT

// DELETE

koalaRouter.put("/:id", (request, response) => {
  console.log(request.params);
  let queryText = `UPDATE "Koalla_Residents"
                   SET "ResidentName" = $1, "FavoriteColor" = $2,
                       "Age" = $3, "Ready_transfer" = $4, "Notes" = $5
                   WHERE "id" = $6;`;
  pool
    .query(queryText, [
      request.body.residentName,
      request.body.favoriteColor,
      request.body.age,
      request.body.ready_transfer,
      request.body.notes,
      request.params.id,
    ])
    .then(() => {
      response.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in PUT /Koalla Resident Data/:id", error);
      response.sendStatus(500);
    });
});

// Delete section
koalaRouter.delete("/delete/:id", (request, respnse) => {
  // NOTE: This route is incomplete.
  console.log("req.params", request.params);
  let queryText = `DELETE FROM "Koalla_Residents" WHERE "id" = $1;`;
  pool
    .query(queryText, [request.params.id])
    .then(() => {
      respnse.send(request.params);
    })
    .catch((error) => {
      console.log("Error in DELETE /delete/:id", error);
      respnse.sendStatus(500);
    });
});

koalaRouter.put("/transfer/:id", (request, response) => {
  console.log(request.params);
  let queryText = `UPDATE "Koalla_Residents"
                   SET "Ready_transfer" = NOT "Ready_transfer" 
                   WHERE "id" = $1;`;
  pool
    .query(queryText, [request.params.id])
    .then(() => {
      response.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in PUT /Koalla Resident Data/:id", error);
      response.sendStatus(500);
    });
});
module.exports = koalaRouter;
