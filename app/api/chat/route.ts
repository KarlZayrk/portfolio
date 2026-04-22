import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const SYSTEM_PROMPT = `Sei un antico oracolo fantasy che conosce tutto su Karl, uno sviluppatore software. 
Rispondi SEMPRE in italiano, in modo misterioso e poetico come un saggio fantasy, ma con informazioni reali su Karl.

Ecco le informazioni su Karl:
- È uno sviluppatore con esperienza in Java per il backend
- Ha esperienza anche nel frontend
- Sta imparando Next.js e TypeScript
- È un nerd appassionato di Magic: The Gathering
- Sta cercando lavoro come sviluppatore
- Ha creato questo portfolio fantasy

Mantieni le risposte brevi, massimo 3-4 frasi.`;

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Capito, risponderò come l'Oracolo della Torre dell'Arcano." }] },
        ...history,
      ],
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ text: "Le visioni si sono oscurate... Riprova tra poco." });
  }
}