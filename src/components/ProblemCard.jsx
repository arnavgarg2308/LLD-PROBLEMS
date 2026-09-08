import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Clock,
  Layers3,
  CircleDot,
} from "lucide-react";

function ProblemCard({ problem }) {
  const difficultyStyles = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    Hard: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Top */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
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

      {/* Content */}
      <h3 className="mb-3 text-xl font-bold text-slate-900">
        {problem.title}
      </h3>

      <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-500">
        {problem.description}
      </p>

      {/* Stats */}
      <div className="mb-6 flex items-center gap-4 border-y border-slate-100 py-4 text-sm text-slate-500">
        
        <div className="flex items-center gap-2">
          <Layers3 size={16} />
          {problem.requirements.length} Requirements
        </div>

        <div className="flex items-center gap-2">
          <CircleDot size={16} />
          LLD
        </div>

      </div>

      {/* Button */}
      <Link
        to={`/problem/${problem.id}`}
        className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Start Practice

        <ArrowUpRight
          size={18}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </Link>

    </div>
  );
}

export default ProblemCard;