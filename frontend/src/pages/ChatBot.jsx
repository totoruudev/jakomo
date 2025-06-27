//src/pages/Chat.jsx
import React, { useState } from "react";
import { sendMessage } from "../api/chatApi";

function Chat() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // 하이퍼파라미터 상태값
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [presencePenalty, setPresencePenalty] = useState(0.6);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0);

  const handleSend = async () => {
    const userMsg = { role: "user", content: message };
    setChatLog([...chatLog, userMsg]);

    const payload = {
      message,
      temperature,
      topP,
      maxTokens,
      presencePenalty,
      frequencyPenalty,
    };

    const response = await sendMessage(payload);
    const botMsg = { role: "bot", content: response.data.reply };
    setChatLog([...chatLog, userMsg, botMsg]);
    setMessage("");
  };

  return (
    <div>
      <h4>하이퍼파라미터 설정</h4>
      <div className="row mb-3">
        <div className="col">
          <label>Temperature</label>
          <input type="number" className="form-control" value={temperature} step="0.1" min="0" max="2" onChange={(e) => setTemperature(parseFloat(e.target.value))} />
        </div>
        <div className="col">
          <label>Top P</label>
          <input type="number" className="form-control" value={topP} step="0.1" min="0" max="1" onChange={(e) => setTopP(parseFloat(e.target.value))} />
        </div>
        <div className="col">
          <label>Max Tokens</label>
          <input type="number" className="form-control" value={maxTokens} min="1" onChange={(e) => setMaxTokens(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label>Presence Penalty</label>
          <input type="number" className="form-control" value={presencePenalty} step="0.1" min="-2" max="2" onChange={(e) => setPresencePenalty(parseFloat(e.target.value))} />
        </div>
        <div className="col">
          <label>Frequency Penalty</label>
          <input type="number" className="form-control" value={frequencyPenalty} step="0.1" min="-2" max="2" onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))} />
        </div>
      </div>

      <h4>챗봇 대화</h4>
      <div className="chat-log mb-3">
        {chatLog.map((msg, i) => (
          <div key={i} className={`alert ${msg.role === "user" ? 'alert-primary' : 'alert-secondary'}`}>
            <strong>{msg.role === "user" ? "You:" : "Bot:"}</strong> {msg.content}
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} className="form-control mb-2" />
      <button onClick={handleSend} className="btn btn-primary">Send</button>
    </div>
  );
}

export default Chat;