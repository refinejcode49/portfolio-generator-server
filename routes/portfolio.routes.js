const { response } = require("../app");
const PortfolioModel = require("../models/Portfolio.model");

const router = require("express").Router();

// to create a portfolio
router.post("/create", async (req, res) => {
  PortfolioModel.create(req.body)
    .then((responseFromDB) => {
      console.log("portfolio created", responseFromDB);
      res.status(201).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "trouble creating a portfolio" });
    });
});
module.exports = router;
