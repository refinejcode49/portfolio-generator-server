const { response } = require("../app");
const PortfolioModel = require("../models/Portfolio.model");
const slugify = require("slugify");

const router = require("express").Router();

// to create a portfolio
router.post("/create", async (req, res) => {
  try {
    // generate a slug from name and jobTitle
    const baseSlug = slugify(
      `${req.body.firstName} ${req.body.lastName} ${req.body.jobTitle}`,
      {
        lower: true, //lowercase
        strict: true, //remove special characters
      },
    );

    // Check if the slug already exists and make it unique
    let slug = baseSlug;
    let counter = 1;
    while (await PortfolioModel.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    // Add the generated slug to the request body
    req.body.slug = slug;

    //create the portfolio
    const responseFromDB = await PortfolioModel.create(req.body);
    console.log("portfolio created", responseFromDB);
    res.status(201).json(responseFromDB);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "trouble creating a portfolio" });
  }
});

// to get all portfolio created
router.get("/all", async (req, res) => {
  try {
    const responseFromDB = await PortfolioModel.find();
    console.log("here all the portfolio created !", responseFromDB);
    res.status(200).json(responseFromDB);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errorMessage: "trouble finding all the portfolio created" });
  }
});

// to update a portolio
router.patch("/update/:portfolioId", async (req, res) => {
  try {
    const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
      req.params.portfolioId,
      req.body,
      { new: true },
    );
    console.log("pizza updated !", updatedPortfolio);
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "trouble updating the portfolio !" });
  }
});

// to delete a portolio
router.delete("/delete/:portfolioId", async (req, res) => {
  try {
    const deletedPortfolio = await PortfolioModel.findByIdAndDelete(
      req.params.portfolioId,
    );
    console.log("portfolio deleted !", deletedPortfolio);
    res.status(200).json({ message: "portfolio deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "trouble deleting the portfolio !" });
  }
});

module.exports = router;
