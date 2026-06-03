import { useState, useRef, useEffect } from "react";

const STATUS_COLORS = {
  Assigned: { bg: "#1e40af", text: "#93c5fd", dot: "#3b82f6" },
  "In Progress": { bg: "#854d0e", text: "#fde68a", dot: "#f59e0b" },
  Completed: { bg: "#14532d", text: "#86efac", dot: "#22c55e" },
};

const AGENT_ICONS = {
  Request: "👤",
  Summarized: "🤖",
  Prompting: "⚙️",
  Listener: "📡",
  Log: "📋",
};

const AGENT_COLORS = {
  Request: "#60a5fa",
  Summarized: "#a78bfa",
  Prompting: "#f9a8d4",
  Listener: "#6ee7b7",
  Log: "#94a3b8",
};

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center", marginLeft: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#6ee7b7",
            display: "inline-block",
            animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function MessageBubble({ msg, isNew }) {
  const color = AGENT_COLORS[msg.agent] || "#94a3b8";
  const icon = AGENT_ICONS[msg.agent] || "•";
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "10px 0",
        animation: isNew ? "slideIn 0.3s ease-out" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `${color}22`,
          border: `1px solid ${color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {msg.agent}
          </span>
          <span style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono', monospace" }}>
            {msg.time}
          </span>
          {msg.loading && <TypingDots />}
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: msg.agent === "Log" ? "#64748b" : "#e2e8f0",
            lineHeight: 1.6,
            fontFamily: msg.agent === "Log" ? "'DM Mono', monospace" : "'Plus Jakarta Sans', sans-serif",
            fontStyle: msg.agent === "Log" ? "italic" : "normal",
          }}
        >
          {msg.text}
        </div>
      </div>
    </div>
  );
}

function LogEntry({ entry }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "4px 0",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        borderBottom: "1px solid rgba(255,255,255,0.03)",
      }}
    >
      <span style={{ color: "#475569", flexShrink: 0 }}>{entry.time}</span>
      <span
        style={{
          color: AGENT_COLORS[entry.agent] || "#64748b",
          flexShrink: 0,
          minWidth: 70,
        }}
      >
        [{entry.agent}]
      </span>
      <span style={{ color: "#94a3b8" }}>{entry.text}</span>
    </div>
  );
}

export default function PureAgentChatBox() {
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("Assigned");
  const [isProcessing, setIsProcessing] = useState(false);
  const [newMsgIndex, setNewMsgIndex] = useState(-1);
  const [projectId] = useState("Feature Request #" + Math.floor(Math.random() * 900 + 100));
  const chatEndRef = useRef(null);
  const logEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const now = () =>
    new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const addLog = (agent, text) => {
    setLogs((prev) => [...prev, { time: now(), agent, text }]);
  };

  const addMessage = (agent, text, loading = false) => {
    const msg = { id: Date.now() + Math.random(), agent, text, time: now(), loading };
    setMessages((prev) => {
      setNewMsgIndex(prev.length);
      return [...prev, msg];
    });
    return msg.id;
  };

  const updateMessage = (id, text) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text, loading: false } : m))
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userText = input.trim();
    setInput("");
    setIsProcessing(true);
    setStatus("In Progress");

    // 1. Request
    addMessage("Request", userText);
    addLog("Request", `Contributor sent: "${userText.slice(0, 50)}${userText.length > 50 ? "…" : ""}"`);

    // 2. Summarize
    const sumId = addMessage("Summarized", "", true);
    addLog("Summarized", "Summarizing request...");
    await delay(600);

    let summary = "";
    try {
      const sumResp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are a concise summarizer. Summarize the user's request in 1 short English sentence (max 20 words). Output only the summary, no preamble.",
          messages: [{ role: "user", content: userText }],
        }),
      });
      const sumData = await sumResp.json();
      summary = sumData.content?.[0]?.text?.trim() || userText;
    } catch {
      summary = userText;
    }
    updateMessage(sumId, summary);
    addLog("Summarized", `→ "${summary}"`);

    // 3. Prompting
    const promptId = addMessage("Prompting", "", true);
    addLog("Prompting", "PromptEngine processing via AI model...");
    await delay(400);
    updateMessage(promptId, "AI model processing summarized request → validating & routing...");
    addLog("Prompting", "Request validated and routed to Listener");

    // 4. Listener — actual AI response
    const listenId = addMessage("Listener", "", true);
    addLog("Listener", "Generating response...");

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are PureAgent Listener — an intelligent assistant inside a feature chat system. Respond helpfully and concisely to the user's request. Keep responses focused and actionable. No markdown headers, just clean prose or short bullet points.",
          messages: [{ role: "user", content: userText }],
        }),
      });
      const data = await resp.json();
      const answer = data.content?.[0]?.text?.trim() || "Unable to process request.";
      updateMessage(listenId, answer);
      addLog("Listener", "Response returned to UI");
    } catch (err) {
      updateMessage(listenId, "⚠️ Connection error. Please check API configuration.");
      addLog("Listener", "Error: " + err.message);
    }

    setStatus("Completed");
    addLog("Log", `Status updated → Completed`);
    setIsProcessing(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const statusStyle = STATUS_COLORS[status];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #060b14; }

        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }

        textarea:focus { outline: none; }
      `}</style>

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#060b14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 720,
            background: "#0d1425",
            border: "1px solid #1e293b",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(96,165,250,0.06), 0 25px 50px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          {/* Scan line effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, transparent, rgba(96,165,250,0.02), transparent)",
              animation: "scanline 4s linear infinite",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #1e293b",
              background: "linear-gradient(135deg, #0f172a 0%, #0d1425 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#f1f5f9",
                  letterSpacing: "0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "#3b82f6" }}>⬡</span>
                PureAgent Chat Box
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#475569",
                  fontFamily: "'DM Mono', monospace",
                  marginTop: 2,
                }}
              >
                {projectId}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 20,
                background: `${statusStyle.bg}33`,
                border: `1px solid ${statusStyle.dot}44`,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: statusStyle.dot,
                  display: "inline-block",
                  animation: status === "In Progress" ? "pulse 1s ease-in-out infinite" : "none",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: statusStyle.text,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                }}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Chat Panel */}
          <div
            style={{
              height: 320,
              overflowY: "auto",
              padding: "12px 20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2d3f5a",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 28 }}>⬡</div>
                <div>Awaiting first message...</div>
              </div>
            )}
            {messages.map((msg, i) => (
              <MessageBubble key={msg.id} msg={msg} isNew={i === newMsgIndex} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Divider */}
          <div
            style={{
              padding: "8px 20px 4px",
              borderTop: "1px solid #1e293b",
              background: "#0a1120",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#334155",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>📋</span> Log Panel
            </div>
          </div>

          {/* Log Panel */}
          <div
            style={{
              height: 120,
              overflowY: "auto",
              padding: "0 20px 10px",
              background: "#0a1120",
            }}
          >
            {logs.length === 0 && (
              <div
                style={{
                  color: "#1e293b",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  padding: "8px 0",
                }}
              >
                No activity logged yet.
              </div>
            )}
            {logs.map((entry, i) => (
              <LogEntry key={i} entry={entry} />
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Input Box */}
          <div
            style={{
              borderTop: "1px solid #1e293b",
              padding: "14px 16px",
              background: "#0d1425",
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type message here... (Enter to send)"
              disabled={isProcessing}
              rows={1}
              style={{
                flex: 1,
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#e2e8f0",
                fontSize: 13.5,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                resize: "none",
                lineHeight: 1.5,
                opacity: isProcessing ? 0.5 : 1,
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#1e293b";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              onClick={handleSend}
              disabled={isProcessing || !input.trim()}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "none",
                background: isProcessing || !input.trim()
                  ? "#1e293b"
                  : "linear-gradient(135deg, #2563eb, #3b82f6)",
                color: isProcessing || !input.trim() ? "#334155" : "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: isProcessing || !input.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                flexShrink: 0,
                letterSpacing: "0.02em",
              }}
            >
              {isProcessing ? "..." : "Send →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
