import { BookOpen, TrendingUp, Trophy } from "lucide-react";

function ProgressCard({ type, value, label }) {
  const icons = {
    problems: BookOpen,
    score: Trophy,
    improvement: TrendingUp,
  };

  const Icon = icons[type];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={20} />
        </div>

        {type === "improvement" && (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
            Growing
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {label}
      </p>

    </div>
  );
}

export default ProgressCard;