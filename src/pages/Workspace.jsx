import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { problems as mockProblems } from "../data/mockData";
import { getProblem, evaluateDesign } from "../services/api";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Lightbulb,
  Send,
  Box,
  Network,
  Code2,
  FileText,
  CheckCircle2,
} from "lucide-react";

function Workspace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [classes, setClasses] = useState([{ name: "", responsibility: "" }]);
  const [interfaces, setInterfaces] = useState("");
  const [relationships, setRelationships] = useState("");
  const [designDecisions, setDesignDecisions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProblem(id)
      .then(setProblem)
      .catch(() => setProblem(mockProblems.find((p) => p.id === id) || null));
  }, [id]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
        </div>
      </div>
    );
  }

  const addClass = () => {
    setClasses([...classes, { name: "", responsibility: "" }]);
  };

  const removeClass = (index) => {
    if (classes.length === 1) return;
    setClasses(classes.filter((_, i) => i !== index));
  };

  const updateClass = (index, field, value) => {
    const updatedClasses = [...classes];
    updatedClasses[index][field] = value;
    setClasses(updatedClasses);
  };

  const handleSubmit = async () => {
    try {
      setError("");

      const validClasses = classes.filter(
        (item) => item.name.trim() && item.responsibility.trim()
      );

      if (validClasses.length === 0) {
        setError("Please add at least one class with a responsibility.");
        return;
      }

      setIsLoading(true);

      const requestData = {
        problem: {
          id: problem.id,
          title: problem.title,
          description: problem.description || "",
          requirements: problem.requirements,
        },
        design: {
          classes: validClasses,
          relationships,
          interfaces,
          designDecisions,
        },
      };

      const feedback = await evaluateDesign(requestData);

      // Save attempt to sessionStorage for History page
      const attempt = {
        id: `attempt-${Date.now()}`,
        problemId: problem.id,
        problem: problem.title,
        icon: problem.icon,
        difficulty: problem.difficulty,
        score: feedback.overallScore,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        feedback,
        problemData: problem,
      };
      const existing = JSON.parse(sessionStorage.getItem("lld-attempts") || "[]");
      sessionStorage.setItem("lld-attempts", JSON.stringify([attempt, ...existing]));

      navigate(`/feedback/${problem.id}`, {
        state: { feedback, problem, design: requestData.design },
      });
    } catch (err) {
      setError(err.message || "Something went wrong while evaluating your design.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Top Header */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <Link
              to={`/problem/${problem.id}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft size={19} />
            </Link>

            <div>

              <div className="flex items-center gap-2">

                <span className="text-2xl">{problem.icon}</span>

                <h1 className="text-lg font-bold text-slate-900">
                  {problem.title}
                </h1>

              </div>

              <p className="mt-1 text-sm text-slate-500">LLD Design Workspace</p>

            </div>

          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Evaluating with AI...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Design
              </>
            )}
          </button>

        </div>

      </div>


      {/* Main Workspace */}

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-12">


        {/* LEFT SIDE - Problem */}

        <aside className="space-y-6 lg:col-span-4">


          {/* Problem Summary */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Problem
                </p>
                <h2 className="font-bold text-slate-900">Requirements</h2>
              </div>

            </div>

            <div className="space-y-3">
              {problem.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-500" />
                  {requirement}
                </div>
              ))}
            </div>

          </section>


          {/* Design Tips */}

          <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <Lightbulb size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Think Carefully
                </p>
                <h2 className="font-bold text-slate-900">Design Tips</h2>
              </div>

            </div>

            <div className="space-y-3">
              {problem.hints.map((hint, index) => (
                <div key={index} className="rounded-xl bg-white/70 p-3 text-sm leading-6 text-slate-600">
                  💡 {hint}
                </div>
              ))}
            </div>

          </section>


          {/* Progress */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6">

            <p className="text-sm font-semibold text-slate-900">Design Checklist</p>

            <div className="mt-4 space-y-3 text-sm">

              <div className="flex items-center gap-3 text-slate-600">
                <div className={`h-2.5 w-2.5 rounded-full ${classes.some((item) => item.name) ? "bg-emerald-500" : "bg-slate-300"}`} />
                Define your classes
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className={`h-2.5 w-2.5 rounded-full ${relationships ? "bg-emerald-500" : "bg-slate-300"}`} />
                Define relationships
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className={`h-2.5 w-2.5 rounded-full ${designDecisions ? "bg-emerald-500" : "bg-slate-300"}`} />
                Explain decisions
              </div>

            </div>

          </section>

        </aside>


        {/* RIGHT SIDE - Design */}

        <section className="space-y-7 lg:col-span-8">

          <div>
            <p className="text-sm font-semibold text-indigo-600">YOUR SOLUTION</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Build your Low Level Design</h2>
            <p className="mt-2 text-sm text-slate-500">
              Define your core classes, abstractions, relationships, and explain the decisions behind your design.
            </p>
          </div>


          {/* CLASSES */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Box size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Step 1</p>
                  <h3 className="font-bold text-slate-900">Core Classes</h3>
                </div>
              </div>

              <button
                onClick={addClass}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={17} />
                Add Class
              </button>

            </div>

            <div className="space-y-5">
              {classes.map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700">Class {index + 1}</p>
                    {classes.length > 1 && (
                      <button
                        onClick={() => removeClass(index)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Class Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateClass(index, "name", e.target.value)}
                        placeholder="Example: ParkingLot"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Responsibility</label>
                      <input
                        type="text"
                        value={item.responsibility}
                        onChange={(e) => updateClass(index, "responsibility", e.target.value)}
                        placeholder="What does this class do?"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </section>


          {/* RELATIONSHIPS */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Network size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">Step 2</p>
                <h3 className="font-bold text-slate-900">Relationships</h3>
              </div>
            </div>

            <textarea
              value={relationships}
              onChange={(e) => setRelationships(e.target.value)}
              placeholder={`Example:\n\nParkingLot HAS-A ParkingFloor\n\nParkingFloor HAS-A ParkingSpot\n\nCar IS-A Vehicle`}
              rows="7"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm leading-6 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

          </section>


          {/* INTERFACES */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Code2 size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Step 3</p>
                <h3 className="font-bold text-slate-900">Interfaces & Abstractions</h3>
              </div>
            </div>

            <textarea
              value={interfaces}
              onChange={(e) => setInterfaces(e.target.value)}
              placeholder={`Example:\n\nVehicle\n\nSpotAllocationStrategy\n\nPaymentStrategy`}
              rows="6"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm leading-6 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </section>


          {/* DESIGN DECISIONS */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Step 4</p>
                <h3 className="font-bold text-slate-900">Design Decisions</h3>
              </div>
            </div>

            <textarea
              value={designDecisions}
              onChange={(e) => setDesignDecisions(e.target.value)}
              placeholder="Explain why you made these design choices. Mention important trade-offs, SOLID principles, or design patterns you considered..."
              rows="8"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
            />

          </section>


          {/* SUBMIT */}

          <section className="rounded-2xl bg-slate-950 p-7 text-white">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-sm text-slate-400">Ready for evaluation?</p>
                <h3 className="mt-2 text-xl font-bold">Submit your design for feedback.</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Your design will be evaluated based on structure, responsibilities, relationships, and extensibility.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-slate-900" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Design
                  </>
                )}
              </button>

            </div>

          </section>

        </section>

      </main>

    </div>
  );
}

export default Workspace;
