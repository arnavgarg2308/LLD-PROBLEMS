const submissionModel = require("../models/submissionModel");
const attemptModel = require("../models/attemptModel");

const createSubmission = (data) => {
    const {
        attemptId,
        classes,
        interfaces,
        relationships,
        designExplanation
    } = data;

    const attempt = attemptModel.getAttemptById(attemptId);

    if (!attempt) {
        throw new Error("Attempt not found");
    }

    const submission = {
        id: submissionModel.getSubmissions().length + 1,
        attemptId: Number(attemptId),
        classes: classes || [],
        interfaces: interfaces || [],
        relationships: relationships || [],
        designExplanation: designExplanation || "",
        submittedAt: new Date().toISOString()
    };

    attemptModel.updateAttemptStatus(
        attemptId,
        "SUBMITTED"
    );

    return submissionModel.createSubmission(submission);
};

const getSubmissionById = (id) => {
    return submissionModel.getSubmissionById(id);
};

const getSubmissionByAttemptId = (attemptId) => {
    return submissionModel.getSubmissionByAttemptId(attemptId);
};

module.exports = {
    createSubmission,
    getSubmissionById,
    getSubmissionByAttemptId
};