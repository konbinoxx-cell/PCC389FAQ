const API_URL = "https://libretranslate.de/translate";
const cache = new Map();

export async function translateText(text, targetLang = "en") {
    if (!text.trim()) return text;

    const key = `${text}::${targetLang}`;
    if (cache.has(key)) return cache.get(key);

    const body = {
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    cache.set(key, data.translatedText);
    return data.translatedText;
}
