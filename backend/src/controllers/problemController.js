const problemService = require("../services/problemService");

const getAllProblems = (req, res) => {
    const problems = problemService.getAllProblems();

    res.status(200).json({
        success: true,
        count: problems.length,
        problems: problems
    });
};


const getProblemById = (req, res) => {
    const problem = problemService.getProblemById(req.params.id);

    if (!problem) {
        return res.status(404).json({
            success: false,
            message: "Problem not found"
        });
    }

    res.status(200).json({
        success: true,
        problem: problem
    });
};
module.exports = {
    getAllProblems,
    getProblemById
};