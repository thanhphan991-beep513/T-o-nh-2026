const MODEL = 'gemini-2.5-flash-image-preview';

function getRequestBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: 'Chưa cấu hình GEMINI_API_KEY trên Vercel. Hãy thêm biến môi trường rồi triển khai lại.',
    });
    return;
  }

  const { prompt, uploadedImage } = getRequestBody(req);
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Prompt không được để trống.' });
    return;
  }

  const parts = [{ text: prompt }];
  if (uploadedImage) {
    const match = uploadedImage.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      res.status(400).json({ error: 'Ảnh tham chiếu không hợp lệ.' });
      return;
    }
    parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseModalities: ['IMAGE'] },
        }),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      const message = result?.error?.message || 'Gemini không thể tạo ảnh.';
      res.status(response.status).json({ error: message });
      return;
    }

    const imagePart = result?.candidates?.[0]?.content?.parts?.find((part) => part.inlineData);
    const imageData = imagePart?.inlineData?.data;
    const mimeType = imagePart?.inlineData?.mimeType || 'image/png';
    if (!imageData) {
      res.status(502).json({ error: 'Gemini không trả về dữ liệu ảnh.' });
      return;
    }

    res.status(200).json({ image: `data:${mimeType};base64,${imageData}` });
  } catch (error) {
    console.error('Image generation failed:', error);
    res.status(500).json({ error: 'Không thể kết nối dịch vụ tạo ảnh. Vui lòng thử lại.' });
  }
}
