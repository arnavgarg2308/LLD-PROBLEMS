const BACKEND_URL = "/api";
const AI_URL = "/api/evaluate";

export async function getProblems() {
  const response = await fetch(`${BACKEND_URL}/problems`);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to fetch problems");
  return result.problems;
}

export async function getProblem(id) {
  const response = await fetch(`${BACKEND_URL}/problems/${id}`);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Problem not found");
  return result.problem;
}

export async function evaluateDesign(data) {
  const response = await fetch(AI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to evaluate design");
  return result.feedback;
}
