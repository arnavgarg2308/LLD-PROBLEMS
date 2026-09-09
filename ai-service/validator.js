import { z } from "zod";

export const evaluationRequestSchema = z.object({
  problem: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    requirements: z.array(z.string()).min(1),
    description: z.string().optional(),
  }),

  design: z.object({
    classes: z
      .array(
        z.object({
          name: z.string().min(1),
          responsibility: z.string().min(1),
        })
      )
      .min(1),

    relationships: z.string().optional(),
    interfaces: z.string().optional(),
    designDecisions: z.string().optional(),
  }),
});


const scoreMax10 = z.number().min(0).max(10);
const scoreMax100 = z.number().min(0).max(100);


export const evaluationResponseSchema = z.object({

  overallScore: scoreMax100,

  summary: z.string(),

  categoryScores: z.object({
    requirementCoverage: scoreMax10,
    classDesign: scoreMax10,
    responsibilities: scoreMax10,
    relationships: scoreMax10,
    solid: scoreMax10,
    extensibility: scoreMax10,
  }),

  requirementCoverage: z.array(
    z.object({
      requirement: z.string(),
      status: z.enum(["covered", "partial", "missing"]),
      reason: z.string(),
    })
  ),

  strengths: z.array(z.string()).min(1),

  improvements: z.array(z.string()).min(1),

  suggestions: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),

  // FEATURE 1 — Design Pattern Detector
  designPatterns: z.object({
    detected: z.array(
      z.object({
        name: z.string(),
        confidence: scoreMax100,
        where: z.string(),
        reason: z.string(),
      })
    ),
    recommended: z.array(
      z.object({
        name: z.string(),
        reason: z.string(),
        howToApply: z.string(),
      })
    ),
  }),

  // FEATURE 2 — SOLID Violation Detector
  solidAnalysis: z.object({
    principles: z.array(
      z.object({
        principle: z.enum(["SRP", "OCP", "LSP", "ISP", "DIP"]),
        score: scoreMax100,
        status: z.enum(["good", "warning", "violation"]),
        affectedClasses: z.array(z.string()),
        problem: z.string(),
        suggestion: z.string(),
      })
    ),
  }),

  // FEATURE 3 — Architecture Health Score
  architectureHealth: z.object({
    coupling: scoreMax100,
    cohesion: scoreMax100,
    maintainability: scoreMax100,
    extensibility: scoreMax100,
    responsibilityDistribution: scoreMax100,
    biggestRisk: z.object({
      title: z.string(),
      description: z.string(),
    }),
    recommendation: z.string(),
  }),

  // FEATURE 4 — Design Evolution
  designEvolution: z.object({
    currentProblems: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        affectedClasses: z.array(z.string()),
      })
    ),
    suggestedChanges: z.array(
      z.object({
        action: z.string(),
        description: z.string(),
        benefit: z.string(),
      })
    ),
    suggestedArchitecture: z.object({
      classes: z.array(
        z.object({
          name: z.string(),
          responsibility: z.string(),
        })
      ),
      relationships: z.array(z.string()),
    }),
    estimatedImprovement: z.object({
      currentScore: scoreMax100,
      potentialScore: scoreMax100,
      reason: z.string(),
    }),
  }),
});
