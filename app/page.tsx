"use client";

import { useState } from "react";

const locations = [
  {
    id: 1,
    name: "La Cittadella",
    top: "35%",
    left: "18%",
    description: "Chi sono io",
    icon: <span className="text-4xl" style={{ filter: "grayscale(1) brightness(2)" }}>🏰</span>,
  },
  {
    id: 2,
    name: "Il Campo di Battaglia",
    top: "72%",
    left: "62%",
    description: "I miei progetti",
    icon: (
      <img
        src="/sword-svgrepo-com.svg"
        alt="spada"
        className="w-10 h-10"
        style={{
          filter: "brightness(0) saturate(100%) invert(72%) sepia(40%) saturate(400%) hue-rotate(5deg)",
        }}
      />
    ),
  },
  {
    id: 3,
    name: "La Torre dell'Arcano",
    top: "20%",
    left: "72%",
    description: "Le mie skill",
    icon: <span className="text-4xl">♜</span>,
  },
  {
    id: 4,
    name: "La Taverna",
    top: "68%",
    left: "28%",
    description: "Contatti",
    icon: <span className="text-4xl" style={{ filter: "grayscale(1) brightness(2)" }}>🍺</span>,
  },
];

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = locations.find((l) => l.id === selected);

  return (
    <main className="relative w-full h-screen overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/map.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-5xl font-bold text-[#c8a96e] drop-shadow-lg">
          Il Mondo di Karl
        </h1>
        <p className="text-[#a07850] mt-2 text-sm tracking-widest uppercase">
          Esplora il regno
        </p>
      </div>

      <div className="absolute inset-0 z-10">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id === selected ? null : loc.id)}
            className="absolute flex flex-col items-center gap-1 group -translate-x-1/2 -translate-y-1/2"
            style={{ top: loc.top, left: loc.left }}
          >
            <div className={`p-2 rounded-full border-2 transition-all duration-300 group-hover:scale-125 group-hover:border-[#c8a96e] group-hover:bg-black/60 group-hover:drop-shadow-[0_0_12px_rgba(255,200,80,0.8)] ${
              selected === loc.id
                ? "border-white bg-black/50 scale-125 drop-shadow-[0_0_16px_rgba(255,200,80,1)]"
                : "border-[#7a5c2e] bg-black/30"
            }`}>
              {loc.icon}
            </div>
            <span className="text-[#c8a96e] text-xs tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap drop-shadow-lg bg-black/60 px-2 py-0.5 rounded">
              {loc.name}
            </span>
          </button>
        ))}
      </div>

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