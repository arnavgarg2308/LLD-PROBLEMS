import "dotenv/config";

import express from "express";
import cors from "cors";

import { evaluateDesign } from "./evaluator.js";
import { evaluationRequestSchema } from "./validator.js";


const app = express();

app.use(cors());

app.use(express.json({
  limit: "1mb",
}));


/*
================================
HEALTH CHECK
================================
*/

app.get("/health", (req, res) => {
  console.log("❤️ Health check received");

  res.status(200).json({
    status: "healthy",
    service: "LLD Coach AI Evaluation Service",
  });
});


/*
================================
EVALUATE LLD DESIGN
================================
*/

app.post("/api/evaluate", async (req, res) => {

  try {

    const validationResult =
      evaluationRequestSchema.safeParse(req.body);

    if (!validationResult.success) {

      return res.status(400).json({
        success: false,
        message: "Invalid evaluation request",
        errors: validationResult.error.issues,
      });

    }


    const validData = validationResult.data;

    console.log(
      "🤖 Evaluating:",
      validData.problem.title
    );


    const feedback =
      await evaluateDesign(validData);


    console.log("✅ Evaluation completed");


    return res.status(200).json({
      success: true,
      feedback,
    });

  } catch (error) {

    console.error(
      "❌ Evaluation API Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to evaluate design",
    });

  }

});


/*
================================
404 HANDLER
================================
*/

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {

  console.log(
    `🚀 AI Service running at http://localhost:${PORT}`
  );

});


server.on("error", (error) => {
  console.error("❌ Server Error:", error);
});