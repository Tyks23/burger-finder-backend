const { Router } = require("express");

const burgerController = require("../controllers/burger");

module.exports = Router()
  .get("/", burgerController.testBurger)
  .get("/getvenues", burgerController.getVenues)
  .post("/getvenueimages", burgerController.getVenueImages)


