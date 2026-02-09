import { GoogleGenAI } from "@google/genai";
import { Movie } from "./types";

export const getMovieRecommendation = async (userInput: string, movieCatalog: Movie[], language: string) => {
  try {
    // Busca a chave das variáveis de ambiente injetadas pelo Vite/Netlify
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.warn("API_KEY não encontrada no ambiente.");
      return language === 'pt' 
        ? "Oi! Aqui é o Alex. Notei que a sua API_KEY ainda não foi configurada no painel do Netlify. Vá em Site Settings > Environment Variables e adicione a chave 'API_KEY' para eu poder te dar dicas de filmes!"
        : "Hi! This is Alex. Your API_KEY is missing in Netlify settings. Please add it to enable my cinema recommendations!";
    }

    const ai = new GoogleGenAI({ apiKey });
    const catalogTitles = movieCatalog.map(m => `- ${m.title} (${m.category})`).join("\n");
    
    const prompt = `
      Usuário: "${userInput}"
      Catálogo Atual (Tudo Grátis):
      ${catalogTitles}
      
      Você é o Alex, o Curador de Cinema da MONTFLIX.
      1. Sua missão é ajudar o usuário a escolher um filme do nosso catálogo acima.
      2. Seja empolgado, use gírias de cinema e deixe claro que tudo é grátis.
      3. Se o filme não estiver na lista, sugira o mais parecido que temos.
      4. Responda em ${language === 'pt' ? 'Português' : 'Inglês'}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "Você é o Alex, curador virtual da MONTFLIX. Seu tom é amigável, técnico e apaixonado por cinema.",
        temperature: 0.8,
      }
    });

    return response.text || "Estou processando sua dica cinematográfica...";
  } catch (error) {
    console.error("Erro no Alex:", error);
    return language === 'pt'
      ? "Tive um pequeno problema técnico aqui na central. Pode perguntar de novo?"
      : "I had a minor technical glitch. Could you ask again?";
  }
};