interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

interface OutputPanelProps {
  output: ExecutionResult | null;
}

function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col bg-base-100 p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-3">Output</h2>
      <div className="flex-1 bg-base-300 rounded p-3 font-mono text-sm overflow-auto">
        {output === null ? (
          <p className="text-base-content/50">Run code to see output...</p>
        ) : output.success ? (
          <pre className="whitespace-pre-wrap break-normal text-success">
            {output.output}
          </pre>
        ) : (
          <pre className="whitespace-pre-wrap break-normal text-error">
            {output.error}
          </pre>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
