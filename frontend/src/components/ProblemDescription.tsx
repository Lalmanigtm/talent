// import React from "react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  return <div className="h-full overflow-y-auto bg-base-200">
    {/* Header section */}
    <div className="p-6 bg-base-100 border-b border-base-300">
      <div className="flex items-start justify-between mb-3">
        <h1 className="text-3xl font-bold text-base-content">{problem.title}</h1>
        <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
      </div>
      <p className="text-base-content/60">{problem.category}</p>
      {/* problem selector */}
      <div className="mt-4">
        <select value={currentProblemId} onChange={(e) => onProblemChange(e.target.value)} className="select select-sm w-full">

          {allProblems.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} - {p.difficulty}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="p-6 space-y-6">
      {/* problem desc */}
      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
        <h2 className="text-xl font-bold text-base-content">Description</h2>

        <div className="space-y-3 text-base leading-releaxed">
          <p className="text-base-content/60">{problem.description.text}</p>
        </div>

      </div>
    </div>
  </div>;
}

export default ProblemDescription;
