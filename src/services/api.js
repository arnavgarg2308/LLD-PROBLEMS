const BACKEND_URL = "https://lld-coach-backend.onrender.com";
const AI_URL = "https://lld-coach-ai-service1.onrender.com";

export async function getProblems() {
  const response = await fetch(`${BACKEND_URL}/api/problems`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch problems");
  }

  return result.problems;
}

export async function getProblem(id) {
  const response = await fetch(
    `${BACKEND_URL}/api/problems/${id}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Problem not found");
  }

  return result.problem;
}

export async function evaluateDesign(data) {
  const response = await fetch(
    `${AI_URL}/api/evaluate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to evaluate design"
    );
  }

  return result.feedback;
}