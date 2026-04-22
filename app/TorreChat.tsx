"use client";

import { useState } from "react";

const SYSTEM_PROMPT = `Sei un antico oracolo fantasy che conosce tutto su Karl, uno sviluppatore software. 
Rispondi SEMPRE in italiano, in modo misterioso e poetico come un saggio fantasy, ma con informazioni reali su Karl.

Ecco le informazioni su Karl:
- È uno sviluppatore con esperienza in Java per il backend
- Ha esperienza anche nel frontend
- Sta imparando Next.js e TypeScript
- È un nerd appassionato di Magic: The Gathering
- Sta cercando lavoro come sviluppatore
- Ha creato questo portfolio fantasy

Quando ti fanno domande su di lui, rispondi in carattere da oracolo fantasy ma con informazioni vere.
Esempio: invece di "Karl sa usare Java" dì "Il nostro eroe padroneggia le arti arcane di Java..."
Mantieni le risposte brevi, massimo 3-4 frasi.`;

export default function TorreChat() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Benvenuto, viaggiatore... Sono l'Oracolo della Torre dell'Arcano. Cosa desideri sapere sul nostro eroe?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const history = messages
        .filter((_, i) => i > 0)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch (e) {
      console.log(e);
      setMessages((prev) => [...prev, { role: "ai", text: "Le visioni si sono oscurate... Riprova tra poco." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold text-[#c8a96e] mb-2">La Torre dell&apos;Arcano</h2>
      <p className="text-[#a07850] text-xs tracking-widest uppercase mb-6">Parla con l&apos;Oracolo</p>

      {/* Messaggi */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-[#7a5c2e]/50 text-[#c8a96e]"
                : "bg-[#0d0804]/60 text-[#a07850] border border-[#7a5c2e]/30"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#0d0804]/60 border border-[#7a5c2e]/30 px-3 py-2 rounded text-[#a07850] text-sm">
              L&apos;oracolo medita...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Poni la tua domanda..."
          className="flex-1 bg-[#0d0804]/60 border border-[#7a5c2e]/50 text-[#c8a96e] placeholder-[#7a5c2e] px-3 py-2 rounded text-sm focus:outline-none focus:border-[#c8a96e]"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-[#7a5c2e] hover:bg-[#c8a96e] text-black px-4 py-2 rounded text-sm font-bold transition-colors duration-200 disabled:opacity-50"
        >
          ➤
        </button>
      </div>
    </div>
  );
}