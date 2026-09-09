const submissionService = require("../services/submissionService");

const createSubmission = (req, res) => {
    try {
        const submission = submissionService.createSubmission(
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Submission created successfully",
            submission: submission
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getSubmissionById = (req, res) => {
    const submission = submissionService.getSubmissionById(
        req.params.id
    );

    if (!submission) {
        return res.status(404).json({
            success: false,
            message: "Submission not found"
        });
    }

    res.status(200).json({
        success: true,
        submission: submission
    });
};

const getSubmissionByAttemptId = (req, res) => {
    const submission =
        submissionService.getSubmissionByAttemptId(
            req.params.attemptId
        );

    if (!submission) {
        return res.status(404).json({
            success: false,
            message: "Submission not found"
        });
    }

    res.status(200).json({
        success: true,
        submission: submission
    });
};

module.exports = {
    createSubmission,
    getSubmissionById,
    getSubmissionByAttemptId
};