import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Group, Panel, Separator } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [codeOverride, setCodeOverride] = useState<string | null>(null);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblemId = id || "two-sum";
  const currentProblem =
    PROBLEMS[currentProblemId as keyof typeof PROBLEMS];

  // Derive code from problem and language, or use override if user has edited
  const code =
    codeOverride ||
    currentProblem.starterCode[
      selectedLanguage as keyof typeof currentProblem.starterCode
    ];

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCodeOverride(null); // Reset to starter code when language changes
    setOutput(null);
  };

  const handleProblemChange = (newProblemId: string) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output: string) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line: string) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line: string) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (
    actualOutput: string,
    expectedOutput: string
  ) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result as ExecutionResult);
    setIsRunning(false);

    // check if code executed successfully and matches expected output

    if (result.success) {
      const expectedOutput =
        currentProblem.expectedOutput[
          selectedLanguage as keyof typeof currentProblem.expectedOutput
        ];
      const testsPassed = checkIfTestsPassed(
        result.output || "",
        expectedOutput
      );

      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Group orientation="horizontal">
          {/* left panel- problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <Separator className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right panel- code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <Group orientation="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCodeOverride}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <Separator className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* Bottom panel - Output Panel*/}

              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default ProblemPage;
