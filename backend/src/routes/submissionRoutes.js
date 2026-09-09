const express = require("express");
const submissionController = require("../controllers/submissionController");

const router = express.Router();

router.post("/", submissionController.createSubmission);

router.get(
    "/attempt/:attemptId",
    submissionController.getSubmissionByAttemptId
);

router.get(
    "/:id",
    submissionController.getSubmissionById
);

module.exports = router;