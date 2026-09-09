const express = require("express");
const problemController = require("../controllers/problemController");

const router = express.Router();

router.get("/", problemController.getAllProblems);
router.get("/:id", problemController.getProblemById);
module.exports = router;