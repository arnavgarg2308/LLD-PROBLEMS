import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProblemCard from "../components/ProblemCard";
import ProgressCard from "../components/ProgressCard";
import { getProblems } from "../services/api";
import { ArrowRight, Sparkles, Target } from "lucide-react";

function Dashboard() {
  const [problems, setProblems] = useState([]);

  const attempts = JSON.parse(sessionStorage.getItem("lld-attempts") || "[]");
  const uniqueProblems = new Set(attempts.map((a) => a.problemId)).size;
  const latestScore = attempts.length > 0 ? attempts[0].score : 0;
  const firstScore = attempts.length > 0 ? attempts[attempts.length - 1].score : 0;
  const improvement = latestScore - firstScore;

  const progress = {
    problemsPracticed: uniqueProblems,
    latestScore,
    improvement,
  };

  useEffect(() => {
    getProblems()
      .then(setProblems)
      .catch(() => import("../data/mockData").then((m) => setProblems(m.problems)));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero Section */}
        <section className="relative mb-12 overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 text-white md:px-12">
          
          {/* Background effects */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative max-w-2xl">
            
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-indigo-200">
              <Sparkles size={16} />
              AI-Powered Design Practice
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
              Build Better
              <span className="block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                System Designs.
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Practice real-world Low Level Design problems, structure your
              solution, and receive intelligent feedback to continuously
              improve your engineering skills.
            </p>

            <a
              href="#problems"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
            >
              Start Practicing
              <ArrowRight size={18} />
            </a>

          </div>

        </section>


        {/* Progress Section */}
        <section className="mb-12">

          <div className="mb-6 flex items-end justify-between">
            
            <div>
              <p className="mb-2 text-sm font-semibold text-indigo-600">
                YOUR LEARNING JOURNEY
              </p>

              <h2 className="text-2xl font-bold text-slate-900">
                Your Progress
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Track your growth and improve with every attempt.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
              <Target size={17} />
              Keep practicing consistently
            </div>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <ProgressCard
              type="problems"
              value={progress.problemsPracticed}
              label="Problems Practiced"
            />

            <ProgressCard
              type="score"
              value={attempts.length > 0 ? `${progress.latestScore}/100` : "—"}
              label="Latest Design Score"
            />

            <ProgressCard
              type="improvement"
              value={attempts.length >= 2 ? `${improvement >= 0 ? "+" : ""}${improvement}` : "—"}
              label="Score Improvement"
            />

          </div>

        </section>


        {/* Problems */}
        <section id="problems">

          <div className="mb-7">

            <p className="mb-2 text-sm font-semibold text-indigo-600">
              PRACTICE LIBRARY
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Choose a Challenge
            </h2>

            <p className="mt-2 text-slate-500">
              Practice common system design problems and sharpen your Low Level Design skills.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {problems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
              />
            ))}

          </div>

        </section>


        {/* Bottom CTA */}
        <section className="mt-16 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-10 text-center">

          <h2 className="text-2xl font-bold text-slate-900">
            Ready to become better at LLD?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Start with a real-world problem, think through your design,
            and let AI help you identify areas to improve.
          </p>

          <a
            href="#problems"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Explore Problems
            <ArrowRight size={18} />
          </a>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;