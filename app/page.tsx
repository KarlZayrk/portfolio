"use client";

import { useState } from "react";

const locations = [
  { id: 1, name: "La Cittadella", top: "30%", left: "25%", description: "Chi sono io" },
  { id: 2, name: "Il Campo di Battaglia", top: "50%", left: "58%", description: "I miei progetti" },
  { id: 3, name: "La Torre dell'Arcano", top: "22%", left: "63%", description: "Le mie skill" },
  { id: 4, name: "La Taverna", top: "62%", left: "35%", description: "Contatti" },
];

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = locations.find((l) => l.id === selected);

  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* Mappa */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/map.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Titolo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-5xl font-bold text-[#c8a96e] drop-shadow-lg">
          Il Mondo di Karl
        </h1>
        <p className="text-[#a07850] mt-2 text-sm tracking-widest uppercase">
          Esplora il regno
        </p>
      </div>

      {/* Markers */}
      <div className="absolute inset-0 z-10">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id === selected ? null : loc.id)}
            className="absolute flex flex-col items-center gap-1 group -translate-x-1/2 -translate-y-1/2"
            style={{ top: loc.top, left: loc.left }}
          >
            <div className={`w-4 h-4 rounded-full border-2 border-[#7a5c2e] shadow-lg group-hover:scale-150 transition-transform duration-200 ${selected === loc.id ? "bg-white scale-150" : "bg-[#c8a96e]"}`} />
            <span className="text-[#c8a96e] text-xs tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap drop-shadow-lg bg-black/40 px-2 py-0.5 rounded">
              {loc.name}
            </span>
          </button>
        ))}
      </div>

      {/* Pannello laterale */}
      {active && (
        <div className="absolute right-0 top-0 h-full w-96 bg-[#1a1008]/90 border-l border-[#7a5c2e] z-20 p-8 flex flex-col">
          <button
            onClick={() => setSelected(null)}
            className="text-[#a07850] text-sm self-end hover:text-[#c8a96e] mb-6"
          >
            ✕ Chiudi
          </button>
          <h2 className="text-3xl font-bold text-[#c8a96e] mb-4">{active.name}</h2>
          <p className="text-[#a07850]">{active.description}</p>
        </div>
      )}

    </main>
  );
}