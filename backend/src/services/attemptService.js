const attemptModel = require("../models/attemptModel");

const createAttempt = (userId, problemId) => {
    const existingAttempts = attemptModel
        .getAttempts()
        .filter(
            (attempt) =>
                attempt.userId === Number(userId) &&
                attempt.problemId === Number(problemId)
        );

    const attemptNumber = existingAttempts.length + 1;

    const attempt = {
        id: attemptModel.getAttempts().length + 1,
        userId: Number(userId),
        problemId: Number(problemId),
        attemptNumber: attemptNumber,
        status: "IN_PROGRESS",
        createdAt: new Date().toISOString()
    };

    return attemptModel.createAttempt(attempt);
};

const getAttemptById = (id) => {
    return attemptModel.getAttemptById(id);
};

const updateAttemptStatus = (id, status) => {
    return attemptModel.updateAttemptStatus(id, status);
};

const getAttemptsByUserId = (userId) => {
    return attemptModel
        .getAttempts()
        .filter(
            (attempt) => attempt.userId === Number(userId)
        );
};

module.exports = {
    createAttempt,
    getAttemptById,
    updateAttemptStatus,
    getAttemptsByUserId
};