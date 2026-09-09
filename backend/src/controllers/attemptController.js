const attemptService = require("../services/attemptService");

const createAttempt = (req, res) => {
    const { userId, problemId } = req.body;

    if (!userId || !problemId) {
        return res.status(400).json({
            success: false,
            message: "userId and problemId are required"
        });
    }

    const attempt = attemptService.createAttempt(
        userId,
        problemId
    );

    res.status(201).json({
        success: true,
        message: "Attempt created successfully",
        attempt: attempt
    });
};

const getAttemptById = (req, res) => {
    const attempt = attemptService.getAttemptById(req.params.id);

    if (!attempt) {
        return res.status(404).json({
            success: false,
            message: "Attempt not found"
        });
    }

    res.status(200).json({
        success: true,
        attempt: attempt
    });
};

const getAttemptsByUserId = (req, res) => {
    const attempts = attemptService.getAttemptsByUserId(
        req.params.userId
    );

    res.status(200).json({
        success: true,
        count: attempts.length,
        attempts: attempts
    });
};

module.exports = {
    createAttempt,
    getAttemptById,
    getAttemptsByUserId
};