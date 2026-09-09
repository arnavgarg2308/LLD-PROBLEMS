const express = require("express");
const cors = require("cors");
const attemptRoutes = require("./routes/attemptRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/submissions", submissionRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "LLD Coach Backend is running!"
    });
});

app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);

module.exports = app;