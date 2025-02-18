import React, { useEffect, useRef, useState } from "react";

const TerminalSim: React.FC<{
  onFileGenerated: (langCode: string) => void;
}> = ({ onFileGenerated }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [cols, setCols] = useState(80); // Default columns

  // Function to calculate terminal width dynamically
  const calculateCols = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) return 10; // Small screens
    if (screenWidth < 768) return 50; // Tablets
    return 80; // Desktops
  };

  useEffect(() => {
    if (!terminalRef.current) return;

    import("xterm").then(({ Terminal }) => {
      import("xterm/css/xterm.css");

      const terminal = new Terminal({
        cursorBlink: true,
        rows: 10,
        cols: calculateCols(),
        lineHeight: 1.2,
        theme: {
          background: "#272822", // Monokai dark background
          foreground: "#F8F8F2", // Default text color
          cursor: "#F8F8F0", // Cursor color
          selectionBackground: "#49483E", // Selection color
          black: "#272822",
          red: "#F92672", // Errors / Warnings
          green: "#A6E22E", // Success
          yellow: "#E6DB74", // Output text
          blue: "#dbf4ff", // Commands
          magenta: "#AE81FF",
          cyan: "#A1EFE4",
          white: "#F8F8F2",
          brightBlack: "#75715E",
          brightRed: "#F92672",
          brightGreen: "#A6E22E",
          brightYellow: "#E6DB74",
          brightBlue: "##dbf4ff",
          brightMagenta: "#AE81FF",
          brightCyan: "#dbf4ff",
          brightWhite: "#F8F8F2",
        },
      });

      terminal.open(terminalRef.current!);
      terminalInstance.current = terminal;

      simulateTerminal(terminal);

      setLoaded(true);

      return () => {
        terminal.dispose();
      };
    });

    const handleResize = () => {
      const newCols = calculateCols();
      setCols(newCols);
      if (terminalInstance.current) {
        terminalInstance.current.resize(newCols, 10);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const simulateTerminal = (terminal: any) => {
    const command = "\x1b[34m$ bun translate-sheet generate\x1b[0m"; // Blue text for command
    const output = [
      { text: `\x1b[33m⏳  Generating translation keys...\x1b[0m`, lang: null },
      { text: "\x1b[34m🌎  Created english file: en.ts\x1b[0m", lang: "en" },
      { text: "\x1b[34m🌎  Created spanish file: es.ts\x1b[0m", lang: "es" },
      { text: "\x1b[34m🌎  Created japanese file: ja.ts\x1b[0m", lang: "ja" },
      { text: "\x1b[34m🌎  Created arabic file: ar.ts\x1b[0m", lang: "ar" },
      { text: "\x1b[34m🌎  Created russian file: ru.ts\x1b[0m", lang: "ru" },
      { text: "\x1b[34m🌎  Created mandarin file: zh.ts\x1b[0m", lang: "zh" },
      {
        text: "\x1b[32m✅  Success! (6) Translations generated successfully!\x1b[0m",
        lang: null,
      },
    ];

    let commandIndex = 0;

    const typeCommand = setInterval(() => {
      if (commandIndex < command.length) {
        terminal.write(command[commandIndex]);
        commandIndex++;
      } else {
        clearInterval(typeCommand);
        terminal.write("\r\n");
        simulateOutput(terminal, output);
      }
    }, 50);
  };

  const simulateOutput = (
    terminal: any,
    output: { text: string; lang: string | null }[]
  ) => {
    let outputIndex = 0;

    const outputInterval = setInterval(() => {
      if (outputIndex < output.length) {
        const { text, lang } = output[outputIndex];
        terminal.writeln(text);

        // Notify parent component when a language file is created
        if (lang) onFileGenerated(lang);

        outputIndex++;
      } else {
        clearInterval(outputInterval);
      }
    }, 300);
  };

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        maxWidth: 500,
        height: "300px",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#272822", // Monokai background
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        padding: 16,
      }}
    >
      {!loaded && <p style={{ color: "#F8F8F2" }}>Loading terminal...</p>}
    </div>
  );
};

export default TerminalSim;
