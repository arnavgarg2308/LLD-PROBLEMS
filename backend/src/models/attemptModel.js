let attempts = [];

const createAttempt = (attempt) => {
    attempts.push(attempt);
    return attempt;
};

const getAttempts = () => {
    return attempts;
};

const getAttemptById = (id) => {
    return attempts.find(
        (attempt) => attempt.id === Number(id)
    );
};

const updateAttemptStatus = (id, status) => {
    const attempt = attempts.find(
        (attempt) => attempt.id === Number(id)
    );

    if (!attempt) {
        return null;
    }

    attempt.status = status;
    return attempt;
};

module.exports = {
    createAttempt,
    getAttempts,
    getAttemptById,
    updateAttemptStatus
};