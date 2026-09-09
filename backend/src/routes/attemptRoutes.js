const express = require("express");
const attemptController = require("../controllers/attemptController");

const router = express.Router();

router.post("/", attemptController.createAttempt);

router.get(
    "/user/:userId",
    attemptController.getAttemptsByUserId
);

router.get("/:id", attemptController.getAttemptById);

module.exports = router;