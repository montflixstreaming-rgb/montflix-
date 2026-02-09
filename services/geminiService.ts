import { GoogleGenAI } from "@google/genai";
import { Movie } from "./types";

export const getMovieRecommendation = async (userInput: string, movieCatalog: Movie[], language: string) => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      return language === 'pt' 
        ? "Oi! Aqui é o Alex. Notei que a chave da IA não foi configurada no Netlify. Sem ela, não consigo dar dicas de filmes agora."
        : "Hi! This is Alex. The API key isn't configured in Netlify yet.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const catalogTitles = movieCatalog.map(m => `- ${m.title}`).join("\n");
    
    const prompt = `
      Usuário: "${userInput}"
      Catálogo MONTFLIX (Tudo Grátis):
      ${catalogTitles}
      
      Instruções para o Alex:
      1. Você é o Alex, curador master da MONTFLIX.
      2. Seja empolgado e use termos de cinema.
      3. Recomende filmes que ESTÃO no catálogo acima.
      4. Deixe claro que tudo na plataforma é gratuito após o cadastro.
      5. Responda em ${language === 'pt' ? 'Português' : 'Inglês'}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "Você é o Alex, o curador virtual da MONTFLIX. Seu tom é moderno, prestativo e cinéfilo.",
        temperature: 0.7,
      }
    });

    return response.text || "Estou aqui para ajudar!";
  } catch (error) {
    console.error("Erro Alex:", error);
    return language === 'pt'
      ? "Oi! Tivemos uma pequena falha de sinal no Alex. Pode perguntar de novo?"
      : "Hi! Alex had a minor signal glitch. Could you ask again?";
  }
};