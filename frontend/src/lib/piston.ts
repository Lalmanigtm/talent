
// Piston API is a service for code execution

const PISTON_API = "https://emkc.org/api/v2/piston";

interface LanguageConfig {
  language: string;
  version: string;
}

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

const LANGUAGE_VERSIONS: Record<string, LanguageConfig> = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param language - programming language
 * @param code - source code to executed
 * @returns Promise with execution result
 */
export async function executeCode(language: string, code: string): Promise<ExecutionResult> {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}