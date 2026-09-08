import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ArrowRight,
  Calendar,
  Clock,
  TrendingUp,
  Trophy,
  RotateCcw,
  Target,
  CheckCircle2,
} from "lucide-react";

function History() {
  // Temporary mock data
  // Later Person 1 ke backend se aayega
  const attempts = [
    {
      id: "attempt-1",
      problem: "Parking Lot System",
      icon: "🅿️",
      difficulty: "Medium",
      score: 62,
      date: "Sep 5, 2026",
      time: "25 min",
      status: "Completed",
    },
    {
      id: "attempt-2",
      problem: "Parking Lot System",
      icon: "🅿️",
      difficulty: "Medium",
      score: 78,
      date: "Sep 8, 2026",
      time: "32 min",
      status: "Completed",
    },
    {
      id: "attempt-3",
      problem: "Vending Machine",
      icon: "🥤",
      difficulty: "Medium",
      score: 84,
      date: "Sep 7, 2026",
      time: "28 min",
      status: "Completed",
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) {
      return "text-emerald-600 bg-emerald-50 border-emerald-100";
    }

    if (score >= 60) {
      return "text-indigo-600 bg-indigo-50 border-indigo-100";
    }

    return "text-rose-600 bg-rose-50 border-rose-100";
  };

  const getDifficultyColor = (difficulty) => {
    const styles = {
      Easy: "bg-emerald-50 text-emerald-700",
      Medium: "bg-amber-50 text-amber-700",
      Hard: "bg-rose-50 text-rose-700",
    };

    return styles[difficulty];
  };

  const averageScore = Math.round(
    attempts.reduce((total, attempt) => total + attempt.score, 0) /
      attempts.length
  );

  const bestScore = Math.max(
    ...attempts.map((attempt) => attempt.score)
  );

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* HEADER */}

        <section className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            YOUR JOURNEY
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Practice History
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Track your Low Level Design practice attempts, review feedback,
            and see how your design skills are improving over time.
          </p>

        </section>


        {/* STATS */}

        <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Attempts */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Target size={21} />
              </div>

            </div>

            <p className="text-3xl font-bold text-slate-900">
              {attempts.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Attempts
            </p>

          </div>


          {/* Average Score */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <TrendingUp size={21} />
              </div>

            </div>

            <p className="text-3xl font-bold text-slate-900">
              {averageScore}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Average Score
            </p>

          </div>


          {/* Best Score */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Trophy size={21} />
              </div>

            </div>

            <p className="text-3xl font-bold text-slate-900">
              {bestScore}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Best Score
            </p>

          </div>


          {/* Improvement */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={21} />
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Growing
              </span>

            </div>

            <p className="text-3xl font-bold text-slate-900">
              +16
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Score Improvement
            </p>

          </div>

        </section>


        {/* PERFORMANCE INSIGHT */}

        <section className="mb-10 rounded-3xl bg-slate-950 p-8 text-white">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-indigo-200">

                <TrendingUp size={16} />

                PERFORMANCE INSIGHT

              </div>

              <h2 className="text-2xl font-bold">
                You are improving consistently 🚀
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Your latest designs show better separation of responsibilities
                and stronger use of abstractions compared to your earlier
                attempts. Keep practicing different LLD problems.
              </p>

            </div>


            <div className="flex items-center gap-5">

              <div className="text-center">

                <p className="text-3xl font-bold text-indigo-300">
                  {attempts[0].score}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  First Score
                </p>

              </div>

              <ArrowRight className="text-slate-500" />

              <div className="text-center">

                <p className="text-3xl font-bold text-emerald-400">
                  {attempts[1].score}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Latest Score
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ATTEMPTS */}

        <section>

          <div className="mb-6">

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              PREVIOUS WORK
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Your Attempts
            </h2>

          </div>


          <div className="space-y-5">

            {attempts.map((attempt, index) => (

              <div
                key={attempt.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


                  {/* LEFT */}

                  <div className="flex items-start gap-5">

                    {/* Attempt Number */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-600">

                      #{index + 1}

                    </div>


                    {/* Icon */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">

                      {attempt.icon}

                    </div>


                    {/* Info */}

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-bold text-slate-900">
                          {attempt.problem}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyColor(
                            attempt.difficulty
                          )}`}
                        >
                          {attempt.difficulty}
                        </span>

                      </div>


                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                        <span className="flex items-center gap-2">

                          <Calendar size={15} />

                          {attempt.date}

                        </span>


                        <span className="flex items-center gap-2">

                          <Clock size={15} />

                          {attempt.time}

                        </span>


                        <span className="flex items-center gap-2 text-emerald-600">

                          <CheckCircle2 size={15} />

                          {attempt.status}

                        </span>

                      </div>

                    </div>

                  </div>


                  {/* RIGHT */}

                  <div className="flex items-center gap-5">


                    {/* Score */}

                    <div
                      className={`rounded-2xl border px-5 py-3 text-center ${getScoreColor(
                        attempt.score
                      )}`}
                    >

                      <p className="text-2xl font-bold">
                        {attempt.score}
                      </p>

                      <p className="text-xs font-medium">
                        SCORE
                      </p>

                    </div>


                    {/* Button */}

                    <Link
                      to={`/feedback/${attempt.id}`}
                      className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >

                      View Feedback

                      <ArrowRight size={17} />

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* CTA */}

        <section className="mt-12 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold text-indigo-600">
                CONTINUE PRACTICING
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Ready for your next challenge?
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try another real-world system design problem and improve your skills.
              </p>

            </div>


            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >

              <RotateCcw size={18} />

              Practice Again

            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default History;