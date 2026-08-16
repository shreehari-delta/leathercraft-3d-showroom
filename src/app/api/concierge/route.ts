import { NextResponse } from "next/server";

const ATELIER_CATALOG = `
Atelier Collection:
- "The Milano Cap-Toe Oxford" ($890): Full-grain Tuscan calfskin, Goodyear welted, midnight black & museum brown. Suitable for weddings, formal black-tie, and business.
- "The Venezia Double Monk" ($920): Hand-burnished mahogany patina, dual brass buckles, chiselled toe last.
- "The Firenze Wholecut" ($980): Single seamless cut of French box calf, mirror-glazed finish. Ultra-formal signature piece.
- "The Roma Penny Loafer" ($780): Unlined glove leather, flexible Blake-rapid stitch, saddle brown & deep navy.
- Purchasing & Ordering: All models can be selected directly in the Showroom section above or acquired by clicking "Acquire Bespoke Pair".
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { reply: "Please provide a valid question." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey || apiKey.includes("your_actual_api_key_here")) {
      return NextResponse.json({
        reply: "Atelier AI is in offline mode. Please add your valid GEMINI_API_KEY to .env.local and restart your server."
      });
    }

    const systemInstruction = `You are the Master Sartorial Concierge for "LeatherCraft Atelier", an ultra-luxury Italian bespoke footwear house based in Florence.
- Tone: Sophisticated, articulate, discreet, authoritative, and helpful.
- Reference our catalog and ordering details:
${ATELIER_CATALOG}
- Answer concisely in 2 to 3 polished sentences based on the client's conversation context.`;

    // Build chat contents from history if available
    const contents: any[] = [];
    
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-6).forEach((h: any) => {
        contents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: `${systemInstruction}\n\nClient inquiry: ${message}` }]
    });

    const candidateModels = [
      { ver: "v1beta", name: "gemini-2.5-flash" },
      { ver: "v1beta", name: "gemini-2.0-flash" },
      { ver: "v1beta", name: "gemini-1.5-flash" },
      { ver: "v1", name: "gemini-1.5-flash" }
    ];

    let lastErrorMsg = "";

    for (const { ver, name } of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/${ver}/models/${name}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents })
          }
        );

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return NextResponse.json({
            reply: data.candidates[0].content.parts[0].text.trim()
          });
        }

        if (data.error) {
          lastErrorMsg = `${data.error.code ? `[${data.error.code}] ` : ""}${data.error.message}`;
        }
      } catch (err: any) {
        lastErrorMsg = err.message || "Network request failed";
      }
    }

    return NextResponse.json({
      reply: `Concierge notice: Unable to contact Gemini API (${lastErrorMsg}). Check that your API key in .env.local is valid and active in Google AI Studio.`
    });
  } catch (error: any) {
    return NextResponse.json(
      { reply: `Server error: ${error.message || "Failed to process inquiry."}` },
      { status: 500 }
    );
  }
}