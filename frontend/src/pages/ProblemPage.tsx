import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript,
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const currentProblem = PROBLEMS[currentProblemId];

  // UPDATE prolem when Url param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      (setCurrentProblemId(id),
        setCode(PROBLEMS[id].starterCode[selectedLanguage]),
        setOutput(null));
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {};
  const handleProblemChange = () => {};
  const triggerConfetti = () => {};
  const checkIfTestsPassed = () => {};
  const handleRunCode = () => {};

  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Group orientation="horizontal">
          <Panel defaultSize={40} minSize={20}>
            {/* left pannel - problem description */}
            <ProblemDescription />
          </Panel>

          <Separator className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-cols-resize" />
          {/* Left pannel - code editor */}
          <Panel defaultSize={60} minSize={30}>
            <Group orientation="vertical">
              {/* top pannel - code editor */}

              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel />
              </Panel>

              <Separator className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={70} minSize={30}>
                <OutputPanel />
              </Panel>
            </Group>
            {/* left pannel - problem description */}
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default ProblemPage;
