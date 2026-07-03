import { ChangeEvent } from "react";

interface CodeEditorPanelProps {
  selectedLanguage: string;
  code: string;
  isRunning: boolean;
  onLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onCodeChange: (code: string) => void;
  onRunCode: () => void;
}

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}: CodeEditorPanelProps) {
  return (
    <div className="h-full flex flex-col bg-base-100 p-4">
      <div className="flex gap-3 mb-4">
        <select
          value={selectedLanguage}
          onChange={onLanguageChange}
          className="select select-bordered select-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className="btn btn-primary btn-sm"
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        className="textarea textarea-bordered flex-1 font-mono text-sm"
        placeholder="Write your code here..."
      />
    </div>
  );
}

export default CodeEditorPanel;
