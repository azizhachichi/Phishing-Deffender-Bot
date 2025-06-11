import { useState } from "react";
import "./App.css";

function App() {
  // États pour gérer l'entrée utilisateur et l'historique des messages
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // Fonction pour envoyer un message à l'API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Ajouter le message utilisateur à l'historique
    setHistory((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botReply = data.response;

      // Ajouter la réponse du bot à l'historique
      setHistory((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        { role: "bot", content: "❌ Erreur lors de la requête à l'IA." },
      ]);
    }

    // Réinitialiser l'input après l'envoi
    setInput("");
  };

  return (
    <div className="chat-container">
      <h1>🛡️</h1>

      {/* Zone d'affichage des messages */}
      <div className="chat-box">
        {history.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Formulaire d'envoi du message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose ta question ici..."
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;