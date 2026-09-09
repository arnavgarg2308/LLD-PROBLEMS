export function buildEvaluationPrompt(data) {
  const { problem, design } = data;

  const formattedClasses = design.classes
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}\n   Responsibility: ${item.responsibility}`
    )
    .join("\n\n");

  const requirements = problem.requirements
    .map((req, index) => `${index + 1}. ${req}`)
    .join("\n");

  return `You are a senior software architect and expert Low Level Design interviewer with deep knowledge of Object-Oriented Design, SOLID principles, Design Patterns, and software architecture.

Your job is to perform a comprehensive, professional evaluation of the candidate's LLD design.

═══════════════════════════════════════
EVALUATION RULES
═══════════════════════════════════════

1. Evaluate ONLY what the user actually provided. Do NOT invent classes or relationships.
2. Be strict but constructive. Do not give 90+ scores for incomplete designs.
3. Clearly distinguish current design problems from suggested improvements.
4. Detect design patterns ONLY if genuinely supported by the user's design.
5. If no pattern is detected, return an empty detected array.
6. SOLID analysis must be based on the actual classes and responsibilities provided.
7. Architecture health scores must reflect the real quality of the submitted design.
8. Design evolution suggestions must be clearly labeled as AI suggestions, not facts.
9. Give realistic scores. A design with 3 classes and no relationships should score 30-45.
10. Evaluate like a real senior engineer in a technical interview.

═══════════════════════════════════════
SCORING GUIDELINES
═══════════════════════════════════════

overallScore: 0–100
  0–30   = Very weak, missing most requirements and structure
  31–50  = Basic attempt, major gaps in design
  51–70  = Decent foundation, several improvements needed
  71–85  = Good design, minor issues
  86–100 = Excellent, production-quality design

categoryScores: each 0–10
  requirementCoverage: How many requirements are addressed
  classDesign: Quality and appropriateness of class identification
  responsibilities: SRP adherence per class
  relationships: Quality of HAS-A, IS-A, dependency relationships
  solid: Overall SOLID principle adherence
  extensibility: How easily the design supports future changes

architectureHealth scores: each 0–100
  coupling: Lower coupling = higher score
  cohesion: Higher cohesion = higher score
  maintainability: How easy to maintain and modify
  extensibility: How easy to extend without breaking
  responsibilityDistribution: How evenly responsibilities are spread

SOLID principle scores: each 0–100
  100 = Fully adheres
  70–99 = Minor issues
  40–69 = Warning, notable violations
  0–39 = Clear violation

═══════════════════════════════════════
PROBLEM
═══════════════════════════════════════

Title: ${problem.title}

Description: ${problem.description || "Not provided"}

Requirements:
${requirements}

═══════════════════════════════════════
USER DESIGN
═══════════════════════════════════════

CLASSES:
${formattedClasses}

RELATIONSHIPS:
${design.relationships || "Not provided"}

INTERFACES / ABSTRACTIONS:
${design.interfaces || "Not provided"}

DESIGN DECISIONS:
${design.designDecisions || "Not provided"}

═══════════════════════════════════════
REQUIRED OUTPUT FORMAT
═══════════════════════════════════════

Return a single valid JSON object with ALL of the following fields.

{
  "overallScore": <number 0-100>,

  "summary": "<2-3 sentence professional summary of the design quality>",

  "categoryScores": {
    "requirementCoverage": <0-10>,
    "classDesign": <0-10>,
    "responsibilities": <0-10>,
    "relationships": <0-10>,
    "solid": <0-10>,
    "extensibility": <0-10>
  },

  "requirementCoverage": [
    {
      "requirement": "<exact requirement text>",
      "status": "covered" | "partial" | "missing",
      "reason": "<specific reason based on the user's actual design>"
    }
  ],

  "strengths": ["<specific strength based on actual design>"],

  "improvements": ["<specific improvement needed>"],

  "suggestions": [
    {
      "title": "<suggestion title>",
      "description": "<actionable suggestion>"
    }
  ],

  "designPatterns": {
    "detected": [
      {
        "name": "<pattern name>",
        "confidence": <0-100>,
        "where": "<which classes/interfaces show this pattern>",
        "reason": "<why this pattern is detected>"
      }
    ],
    "recommended": [
      {
        "name": "<pattern name>",
        "reason": "<why this pattern would help>",
        "howToApply": "<concrete steps to apply it>"
      }
    ]
  },

  "solidAnalysis": {
    "principles": [
      {
        "principle": "SRP" | "OCP" | "LSP" | "ISP" | "DIP",
        "score": <0-100>,
        "status": "good" | "warning" | "violation",
        "affectedClasses": ["<class names>"],
        "problem": "<what is wrong or what is good>",
        "suggestion": "<how to fix or maintain>"
      }
    ]
  },

  "architectureHealth": {
    "coupling": <0-100>,
    "cohesion": <0-100>,
    "maintainability": <0-100>,
    "extensibility": <0-100>,
    "responsibilityDistribution": <0-100>,
    "biggestRisk": {
      "title": "<risk title>",
      "description": "<what the risk is and which classes are affected>"
    },
    "recommendation": "<one clear actionable recommendation>"
  },

  "designEvolution": {
    "currentProblems": [
      {
        "title": "<problem title>",
        "description": "<what is wrong in the current design>",
        "affectedClasses": ["<class names>"]
      }
    ],
    "suggestedChanges": [
      {
        "action": "<what to do>",
        "description": "<how to do it>",
        "benefit": "<why this improves the design>"
      }
    ],
    "suggestedArchitecture": {
      "classes": [
        {
          "name": "<class name>",
          "responsibility": "<single clear responsibility>"
        }
      ],
      "relationships": ["<e.g. ParkingLot HAS-A ParkingFloor>"]
    },
    "estimatedImprovement": {
      "currentScore": <same as overallScore>,
      "potentialScore": <realistic improved score 0-100>,
      "reason": "<why the suggested architecture would score higher>"
    }
  }
}

IMPORTANT:
- Return ONLY the JSON object. No markdown, no explanation outside the JSON.
- All scores must be numbers, not strings.
- solidAnalysis.principles must include all 5 principles: SRP, OCP, LSP, ISP, DIP.
- designPatterns.detected must be empty array [] if no patterns are genuinely present.
- Be honest. A weak design should get a low score.
`;
}
