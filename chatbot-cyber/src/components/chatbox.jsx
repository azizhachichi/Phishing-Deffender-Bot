import React, { useState } from "react";

const ChatBox = () => {
  // États pour les messages et la question
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (!question.trim()) return;

    // Ajouter le message utilisateur
    const newMessages = [...messages, { type: "user", text: question }];
    setMessages(newMessages);

    try {
      // Appel à l'API
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      // Ajouter la réponse du bot
      setMessages([...newMessages, { type: "bot", text: data.response }]);
    } catch (err) {
      setMessages([...newMessages, { type: "bot", text: "❌ Erreur côté serveur" }]);
    }

    // Réinitialiser l'input après l'envoi
    setQuestion("");
  };

  // Gérer l'envoi avec la touche "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 space-y-4">
      
      {/* Zone d'affichage des messages */}
      <div className="h-96 overflow-y-auto space-y-3 border border-gray-200 p-3 rounded-lg bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-xs ${
              msg.type === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Champ de saisie et bouton d'envoi */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none"
          placeholder="Pose ta question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
