import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  Trophy,
  ShieldCheck,
  Network,
  Sparkles,
  Code2,
} from "lucide-react";

function Feedback() {
  const navigate = useNavigate();

  // Temporary mock feedback
  // Later this will come from Person 1's backend
  const feedback = {
    score: 78,
    problemName: "Parking Lot System",

    strengths: [
      "Clear separation between Vehicle and ParkingSpot responsibilities.",
      "Good use of abstraction for different vehicle types.",
      "Relationships between core classes are easy to understand.",
    ],

    improvements: [
      "ParkingLot appears to have too many responsibilities.",
      "Payment handling is tightly coupled with the core parking logic.",
      "Spot allocation should be separated into an independent strategy.",
    ],

    suggestions: [
      "Introduce a SpotAllocationStrategy interface.",
      "Consider separating payment processing into a dedicated service.",
      "Use composition where possible to improve extensibility.",
    ],

    categories: [
      {
        name: "Responsibilities",
        score: 8,
        icon: ShieldCheck,
        color: "indigo",
      },
      {
        name: "Relationships",
        score: 9,
        icon: Network,
        color: "purple",
      },
      {
        name: "Extensibility",
        score: 7,
        icon: Sparkles,
        color: "emerald",
      },
      {
        name: "SOLID Principles",
        score: 7,
        icon: Code2,
        color: "amber",
      },
    ],
  };

  const getScoreMessage = () => {
    if (feedback.score >= 90) {
      return "Excellent design! Your solution demonstrates strong LLD understanding.";
    }

    if (feedback.score >= 75) {
      return "Good work! Your design has a solid foundation with room for improvement.";
    }

    if (feedback.score >= 60) {
      return "Good start! Review the suggestions and improve your design.";
    }

    return "Keep practicing! Focus on responsibilities and relationships.";
  };

  const getScoreStyle = () => {
    if (feedback.score >= 90) return "text-emerald-500";
    if (feedback.score >= 75) return "text-indigo-500";
    if (feedback.score >= 60) return "text-amber-500";

    return "text-rose-500";
  };

  const categoryColors = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Workspace
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Design Evaluation
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Your Feedback Report
          </h1>

          <p className="mt-3 text-slate-500">
            Here is a detailed evaluation of your design for{" "}
            <span className="font-semibold text-slate-700">
              {feedback.problemName}
            </span>
          </p>
        </div>

        {/* Score Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white md:p-10">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center">

            {/* Score Circle */}
            <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-full border-8 border-indigo-400/30 bg-white/5">

              <span className={`text-5xl font-bold ${getScoreStyle()}`}>
                {feedback.score}
              </span>

              <span className="mt-1 text-sm text-slate-400">
                out of 100
              </span>

            </div>

            {/* Score Info */}
            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
                <Trophy size={16} />
                Design Score
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                Nice work! Keep improving.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                {getScoreMessage()}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm text-slate-300">
                  LLD Practice
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm text-slate-300">
                  AI Evaluated
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm text-slate-300">
                  Attempt #1
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* Category Scores */}
        <section className="mb-8">

          <div className="mb-6">

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Performance Breakdown
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Category Scores
            </h2>

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {feedback.categories.map((category) => {

              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                  <div className="mb-5 flex items-center justify-between">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        categoryColors[category.color]
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="text-2xl font-bold text-slate-900">
                      {category.score}/10
                    </span>

                  </div>

                  <p className="font-semibold text-slate-800">
                    {category.name}
                  </p>


                  {/* Progress Bar */}

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{
                        width: `${category.score * 10}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* Feedback Grid */}
        <section className="grid gap-8 lg:grid-cols-3">


          {/* Strengths */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  What You Did Well
                </p>

                <h3 className="font-bold text-slate-900">
                  Strengths
                </h3>
              </div>

            </div>


            <div className="space-y-4">

              {feedback.strengths.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >

                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0 text-emerald-500"
                  />

                  {item}

                </div>

              ))}

            </div>

          </div>


          {/* Improvements */}
          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
                  Areas to Improve
                </p>

                <h3 className="font-bold text-slate-900">
                  Improvements
                </h3>
              </div>

            </div>


            <div className="space-y-4">

              {feedback.improvements.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >

                  <AlertTriangle
                    size={17}
                    className="mt-1 shrink-0 text-rose-500"
                  />

                  {item}

                </div>

              ))}

            </div>

          </div>


          {/* Suggestions */}
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Lightbulb size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Next Steps
                </p>

                <h3 className="font-bold text-slate-900">
                  Suggestions
                </h3>
              </div>

            </div>


            <div className="space-y-4">

              {feedback.suggestions.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >

                  <Lightbulb
                    size={17}
                    className="mt-1 shrink-0 text-indigo-500"
                  />

                  {item}

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="mt-10 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold text-indigo-600">
                KEEP IMPROVING
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Ready to make your design better?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Use the feedback to improve your design and submit another
                attempt. Track your progress as your LLD skills improve.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <Link
                to="/workspace/parking-lot"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                <RotateCcw size={18} />
                Improve Design
              </Link>

              <Link
                to="/history"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View History
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Feedback;