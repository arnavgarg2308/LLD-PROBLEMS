let submissions = [];

const createSubmission = (submission) => {
    submissions.push(submission);
    return submission;
};

const getSubmissions = () => {
    return submissions;
};

const getSubmissionById = (id) => {
    return submissions.find(
        (submission) => submission.id === Number(id)
    );
};

const getSubmissionByAttemptId = (attemptId) => {
    return submissions.find(
        (submission) =>
            submission.attemptId === Number(attemptId)
    );
};

module.exports = {
    createSubmission,
    getSubmissions,
    getSubmissionById,
    getSubmissionByAttemptId
};