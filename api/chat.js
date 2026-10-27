module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.e8e782a42f1c4158bcb031c7277cf39d;
  if (!apikey) {
    return res.status(500).json({ error: 'The Gemini API key is not configured on the server.' });
  }

  const { message } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A non-empty message is required.' });
  }

  try {
    const url = new URL('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message.trim() }] }]
      })
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API request failed:', response.status, data);
      return res.status(502).json({ error: 'The AI service could not complete the request.' });
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!reply) {
      return res.status(502).json({ error: 'The AI service returned an empty reply.' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat function failed:', error);
    return res.status(500).json({ error: 'The chat service encountered an error.' });
  }
}
