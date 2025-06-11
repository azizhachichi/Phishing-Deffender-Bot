import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendQuestion = async () => {
    if (!question.trim()) return;

    const newMessages = [...messages, { from: "user", text: question }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        question,
      });
      const botReply = response.data.response;

      setMessages([...newMessages, { from: "bot", text: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { from: "bot", text: "❌ Erreur lors de la requête à l'API." },
      ]);
    }

    setQuestion("");
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F9FAFB", // fond clair
        color: "#111827", // texte principal
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1E3A8A" }}>
        🛡️ Phishing Defender Bot
      </h1>
      <p style={{ textAlign: "center", color: "#3B82F6" }}>
        Pose tes questions sur les attaques de phishing. Je suis un expert en cybersécurité.
      </p>

      <div
        style={{
          margin: "2rem 0",
          maxHeight: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, idx) => {
          let bgColor = msg.from === "user" ? "#E0E7FF" : "#D1FAE5"; // message user: bleu clair, bot: vert doux
          let textColor = "#111827";

          // Mise en évidence pour les alertes
          if (msg.from === "bot" && msg.text.toLowerCase().includes("phishing")) {
            bgColor = "#FEE2E2"; // rouge clair
            textColor = "#B91C1C";
          }

          return (
            <div
              key={idx}
              style={{
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                backgroundColor: bgColor,
                color: textColor,
                padding: "1rem",
                borderRadius: "1rem",
                maxWidth: "80%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <strong>{msg.from === "user" ? "👤 Toi" : "🤖 Bot"}:</strong>
              <br />
              {msg.text}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", marginTop: "1rem" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex : Comment repérer un lien de phishing ?"
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "1rem",
            border: "1px solid #CBD5E1",
            fontSize: "1rem",
            outlineColor: "#3B82F6",
          }}
        />
        <button
          onClick={sendQuestion}
          style={{
            marginLeft: "1rem",
            padding: "0.8rem 1.2rem",
            borderRadius: "1rem",
            backgroundColor: "#3B82F6", // bouton bleu clair
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3B82F6")}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Chat;