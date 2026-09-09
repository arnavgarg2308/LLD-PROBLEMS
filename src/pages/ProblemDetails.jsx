import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProblem } from "../services/api";
import { problems as mockProblems } from "../data/mockData";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  Layers3,
  Target,
} from "lucide-react";

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProblem(id)
      .then(setProblem)
      .catch(() => setProblem(mockProblems.find((p) => p.id === id) || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
        </div>
      </>
    );
  }

  if (!problem) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[80vh] flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Problem not found
          </h1>

          <Link
            to="/"
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-white"
          >
            Back to Problems
          </Link>
        </div>
      </>
    );
  }

  const difficultyStyles = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Hard: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Back Button */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Problems
        </Link>


        {/* Hero */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">

          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-8 py-10 text-white md:px-10">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">

              <div className="max-w-2xl">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                    {problem.icon}
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      difficultyStyles[problem.difficulty]
                    }`}
                  >
                    {problem.difficulty}
                  </span>

                </div>

                <h1 className="text-3xl font-bold md:text-4xl">
                  {problem.title}
                </h1>

                <p className="mt-4 max-w-xl leading-7 text-slate-300">
                  {problem.description}
                </p>

              </div>


              {/* Challenge Info */}
              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">

                  <Layers3
                    size={20}
                    className="mb-3 text-indigo-300"
                  />

                  <p className="text-lg font-bold">
                    {problem.requirements.length}
                  </p>

                  <p className="text-xs text-slate-400">
                    Requirements
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">

                  <Target
                    size={20}
                    className="mb-3 text-purple-300"
                  />

                  <p className="text-lg font-bold">
                    LLD
                  </p>

                  <p className="text-xs text-slate-400">
                    Practice Type
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* Content Grid */}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Content */}

          <div className="space-y-8 lg:col-span-2">


            {/* Requirements */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Core Requirements
                  </p>

                  <h2 className="text-xl font-bold text-slate-900">
                    What should your system support?
                  </h2>

                </div>

              </div>


              <div className="space-y-3">

                {problem.requirements.map((requirement, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                  >

                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-500"
                    />

                    <p className="text-sm text-slate-700">
                      {requirement}
                    </p>

                  </div>

                ))}

              </div>

            </section>


            {/* Constraints */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <AlertCircle size={20} />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    Design Constraints
                  </p>

                  <h2 className="text-xl font-bold text-slate-900">
                    Things to keep in mind
                  </h2>

                </div>

              </div>


              <div className="space-y-3">

                {problem.constraints.map((constraint, index) => (

                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-slate-100 p-4"
                  >

                    <span className="font-bold text-amber-500">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-slate-600">
                      {constraint}
                    </p>

                  </div>

                ))}

              </div>

            </section>

          </div>


          {/* Sidebar */}

          <aside className="space-y-6">


            {/* Hints */}

            <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  <Lightbulb size={20} />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Optional Help
                  </p>

                  <h2 className="font-bold text-slate-900">
                    Design Hints
                  </h2>

                </div>

              </div>


              <div className="space-y-3">

                {problem.hints.map((hint, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-white bg-white/70 p-4 text-sm leading-6 text-slate-600"
                  >
                    💡 {hint}
                  </div>

                ))}

              </div>

            </section>


            {/* CTA */}

            <section className="sticky top-24 rounded-2xl bg-slate-950 p-6 text-white">

              <p className="text-sm text-slate-400">
                Ready to start?
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Build your design from scratch.
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Define classes, relationships, interfaces and explain
                your design decisions.
              </p>

              <Link
                to={`/workspace/${problem.id}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-indigo-50"
              >
                Start Designing
                <ArrowRight size={18} />
              </Link>

            </section>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default ProblemDetails;