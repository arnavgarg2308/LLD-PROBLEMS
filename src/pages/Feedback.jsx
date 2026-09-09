import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb,
  RotateCcw, Trophy, ShieldCheck, Network, Sparkles, Code2,
  Puzzle, Activity, GitBranch, TrendingUp, XCircle, AlertCircle,
} from "lucide-react";

function Feedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { attemptId } = useParams();

  let aiFeedback = location.state?.feedback;
  let problem = location.state?.problem;

  if (!aiFeedback && attemptId) {
    const stored = JSON.parse(sessionStorage.getItem("lld-attempts") || "[]");
    const match = stored.find((a) => a.id === attemptId);
    if (match) {
      aiFeedback = match.feedback;
      problem = match.problemData;
    }
  }

  if (!aiFeedback) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32">
          <h1 className="text-2xl font-bold text-slate-900">No Feedback Available</h1>
          <p className="mt-3 text-slate-500">Please submit a design first to get AI feedback.</p>
          <Link to="/" className="mt-6 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
            Go to Dashboard
          </Link>
        </main>
      </div>
    );
  }

  const categoryScores = aiFeedback.categoryScores || {};
  const score = aiFeedback.overallScore || 0;
  const problemName = problem?.title || "LLD Design";

  const getScoreStyle = (s) => {
    if (s >= 90) return "text-emerald-500";
    if (s >= 75) return "text-indigo-500";
    if (s >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getBarColor = (s) => {
    if (s >= 80) return "bg-emerald-500";
    if (s >= 60) return "bg-indigo-500";
    if (s >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getSolidStatusStyle = (status) => {
    if (status === "good") return { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" };
    if (status === "warning") return { badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" };
    return { badge: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" };
  };

  const getSolidStatusIcon = (status) => {
    if (status === "good") return <CheckCircle2 size={16} className="text-emerald-500" />;
    if (status === "warning") return <AlertCircle size={16} className="text-amber-500" />;
    return <XCircle size={16} className="text-rose-500" />;
  };

  const categories = [
    { name: "Responsibilities", score: categoryScores.responsibilities || 0, icon: ShieldCheck, color: "indigo" },
    { name: "Relationships", score: categoryScores.relationships || 0, icon: Network, color: "purple" },
    { name: "Extensibility", score: categoryScores.extensibility || 0, icon: Sparkles, color: "emerald" },
    { name: "SOLID Principles", score: categoryScores.solid || 0, icon: Code2, color: "amber" },
  ];

  const categoryColors = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  const dp = aiFeedback.designPatterns || { detected: [], recommended: [] };
  const sa = aiFeedback.solidAnalysis || { principles: [] };
  const ah = aiFeedback.architectureHealth || {};
  const de = aiFeedback.designEvolution || {};

  const healthMetrics = [
    { label: "Coupling", value: ah.coupling ?? 0, hint: "Lower coupling = better" },
    { label: "Cohesion", value: ah.cohesion ?? 0, hint: "Higher cohesion = better" },
    { label: "Maintainability", value: ah.maintainability ?? 0, hint: "" },
    { label: "Extensibility", value: ah.extensibility ?? 0, hint: "" },
    { label: "Responsibility Distribution", value: ah.responsibilityDistribution ?? 0, hint: "" },
  ];


  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} /> Back to Workspace
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">AI Design Evaluation</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Your Feedback Report</h1>
          <p className="mt-3 text-slate-500">
            AI evaluation for <span className="font-semibold text-slate-700">{problemName}</span>
          </p>
        </div>

        {/* SECTION 1 — Score Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white md:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-full border-8 border-indigo-400/30 bg-white/5">
              <span className={`text-5xl font-bold ${getScoreStyle(score)}`}>{score}</span>
              <span className="mt-1 text-sm text-slate-400">out of 100</span>
            </div>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
                <Trophy size={16} /> AI Evaluated
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">
                {score >= 75 ? "Nice work! Keep improving." : "Keep practicing your design skills."}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">{aiFeedback.summary}</p>
            </div>
          </div>
        </section>

        {/* Category Scores */}
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Performance Breakdown</p>
          <h2 className="mt-2 mb-6 text-2xl font-bold text-slate-900">Category Scores</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${categoryColors[cat.color]}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{cat.score}/10</span>
                  </div>
                  <p className="font-semibold text-slate-800">{cat.name}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: `${cat.score * 10}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Strengths / Improvements / Suggestions */}
        <section className="mb-8 grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={21} /></div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">What You Did Well</p>
                <h3 className="font-bold text-slate-900">Strengths</h3>
              </div>
            </div>
            <div className="space-y-4">
              {(aiFeedback.strengths || []).map((item, i) => (
                <div key={i} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-500" />{item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><AlertTriangle size={21} /></div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">Areas to Improve</p>
                <h3 className="font-bold text-slate-900">Improvements</h3>
              </div>
            </div>
            <div className="space-y-4">
              {(aiFeedback.improvements || []).map((item, i) => (
                <div key={i} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <AlertTriangle size={17} className="mt-1 shrink-0 text-rose-500" />{item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Lightbulb size={21} /></div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Next Steps</p>
                <h3 className="font-bold text-slate-900">Suggestions</h3>
              </div>
            </div>
            <div className="space-y-4">
              {(aiFeedback.suggestions || []).map((item, i) => (
                <div key={i} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <Lightbulb size={17} className="mt-1 shrink-0 text-indigo-500" />
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 2 — Design Patterns */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Puzzle size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Pattern Analysis</p>
              <h2 className="text-xl font-bold text-slate-900">Design Patterns</h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Detected */}
            <div>
              <p className="mb-4 text-sm font-semibold text-slate-700">
                Detected in Your Design
                <span className="ml-2 rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet-600">
                  {dp.detected.length} found
                </span>
              </p>
              {dp.detected.length === 0 ? (
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-500">
                  No design patterns detected in the current design.
                </div>
              ) : (
                <div className="space-y-4">
                  {dp.detected.map((p, i) => (
                    <div key={i} className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{p.name}</span>
                        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                          {p.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-500 mb-1">Where: <span className="text-slate-700">{p.where}</span></p>
                      <p className="text-sm text-slate-600">{p.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended */}
            <div>
              <p className="mb-4 text-sm font-semibold text-slate-700">
                Recommended Patterns
                <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">
                  {dp.recommended.length} suggestions
                </span>
              </p>
              {dp.recommended.length === 0 ? (
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-500">
                  No additional patterns recommended.
                </div>
              ) : (
                <div className="space-y-4">
                  {dp.recommended.map((p, i) => (
                    <div key={i} className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
                      <p className="mb-2 font-semibold text-slate-900">{p.name}</p>
                      <p className="mb-2 text-sm text-slate-600">{p.reason}</p>
                      <div className="rounded-lg bg-white/80 p-3 text-xs text-slate-600 border border-indigo-100">
                        <span className="font-semibold text-indigo-600">How to apply: </span>{p.howToApply}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>


        {/* SECTION 3 — SOLID Analysis */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Principle Evaluation</p>
              <h2 className="text-xl font-bold text-slate-900">SOLID Analysis</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sa.principles.map((p, i) => {
              const styles = getSolidStatusStyle(p.status);
              return (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
                      <span className="font-bold text-slate-900">{p.principle}</span>
                    </div>
                    {getSolidStatusIcon(p.status)}
                  </div>

                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                      <span>Score</span>
                      <span className="font-semibold text-slate-700">{p.score}/100</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${getBarColor(p.score)}`}
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                  </div>

                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${styles.badge}`}>
                    {p.status}
                  </span>

                  {p.affectedClasses.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.affectedClasses.map((cls, j) => (
                        <span key={j} className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-600 border border-slate-200">
                          {cls}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-xs leading-5 text-slate-600">{p.problem}</p>

                  {p.status !== "good" && (
                    <div className="mt-3 rounded-lg bg-white p-2 text-xs text-indigo-700 border border-indigo-100">
                      💡 {p.suggestion}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 4 — Architecture Health */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Architecture Analysis</p>
              <h2 className="text-xl font-bold text-slate-900">Architecture Health</h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Metrics */}
            <div className="lg:col-span-2 space-y-4">
              {healthMetrics.map((m, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {m.label}
                      {m.hint && <span className="ml-2 text-xs text-slate-400">({m.hint})</span>}
                    </span>
                    <span className={`font-bold ${getScoreStyle(m.value)}`}>{m.value}/100</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${getBarColor(m.value)}`}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Risk + Recommendation */}
            <div className="space-y-4">
              {ah.biggestRisk && (
                <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-rose-500" />
                    <p className="text-sm font-semibold text-rose-700">Biggest Risk</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{ah.biggestRisk.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{ah.biggestRisk.description}</p>
                </div>
              )}
              {ah.recommendation && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Lightbulb size={16} className="text-emerald-600" />
                    <p className="text-sm font-semibold text-emerald-700">Recommendation</p>
                  </div>
                  <p className="text-sm text-slate-700">{ah.recommendation}</p>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* SECTION 5 — Design Evolution */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <GitBranch size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">AI Design Mentor</p>
              <h2 className="text-xl font-bold text-slate-900">Design Evolution</h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left — Problems + Changes */}
            <div className="space-y-6">
              {/* Current Problems */}
              {(de.currentProblems || []).length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-semibold text-rose-600 uppercase tracking-wider">Current Problems</p>
                  <div className="space-y-3">
                    {de.currentProblems.map((prob, i) => (
                      <div key={i} className="rounded-xl border border-rose-100 bg-rose-50/50 p-4">
                        <p className="font-semibold text-slate-900">{prob.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{prob.description}</p>
                        {prob.affectedClasses.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {prob.affectedClasses.map((cls, j) => (
                              <span key={j} className="rounded bg-rose-100 px-2 py-0.5 text-xs text-rose-700">{cls}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Changes */}
              {(de.suggestedChanges || []).length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-semibold text-indigo-600 uppercase tracking-wider">Suggested Changes</p>
                  <div className="space-y-3">
                    {de.suggestedChanges.map((change, i) => (
                      <div key={i} className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                        <p className="font-semibold text-slate-900">{change.action}</p>
                        <p className="mt-1 text-sm text-slate-600">{change.description}</p>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
                          <TrendingUp size={13} />
                          <span>{change.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Suggested Architecture + Score */}
            <div className="space-y-6">
              {de.suggestedArchitecture && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-700 uppercase tracking-wider">AI Suggested Architecture</p>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-600 border border-amber-200">Suggestion only</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-3 text-xs font-semibold text-slate-500 uppercase">Classes</p>
                    <div className="space-y-2 mb-4">
                      {(de.suggestedArchitecture.classes || []).map((cls, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                          <span>
                            <span className="font-semibold text-slate-800">{cls.name}</span>
                            <span className="text-slate-500"> — {cls.responsibility}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                    {(de.suggestedArchitecture.relationships || []).length > 0 && (
                      <>
                        <p className="mb-2 text-xs font-semibold text-slate-500 uppercase">Relationships</p>
                        <div className="space-y-1">
                          {de.suggestedArchitecture.relationships.map((rel, i) => (
                            <p key={i} className="font-mono text-xs text-slate-600">{rel}</p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Score Improvement */}
              {de.estimatedImprovement && (
                <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-indigo-50 p-5">
                  <p className="mb-4 text-sm font-semibold text-slate-700">Estimated Score Improvement</p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className={`text-4xl font-bold ${getScoreStyle(de.estimatedImprovement.currentScore)}`}>
                        {de.estimatedImprovement.currentScore}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Current</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ArrowRight size={22} className="text-slate-400" />
                      <TrendingUp size={14} className="text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <p className={`text-4xl font-bold ${getScoreStyle(de.estimatedImprovement.potentialScore)}`}>
                        {de.estimatedImprovement.potentialScore}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Potential</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{de.estimatedImprovement.reason}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">KEEP IMPROVING</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Ready to make your design better?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Use the AI feedback to improve your design and submit another attempt.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                <RotateCcw size={18} /> Improve Design
              </button>
              <Link
                to="/history"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View History <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Feedback;
