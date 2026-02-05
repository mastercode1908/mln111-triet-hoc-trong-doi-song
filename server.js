const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(".")); // Serve static files

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PDF_FILE_PATH = path.join(
  __dirname,
  "assets",
  "docs",
  "1. Giao trinh Triet hoc Mac - Lenin 2021.doc.pdf",
);
let cachedPdfData = null;

async function loadPdfData() {
  if (cachedPdfData) {
    return cachedPdfData;
  }

  if (process.env.PDF_URL) {
    const response = await fetch(process.env.PDF_URL);
    if (!response.ok) {
      throw new Error("Không thể tải PDF từ PDF_URL.");
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    cachedPdfData = buffer.toString("base64");
    return cachedPdfData;
  }

  const fileBuffer = await fs.readFile(PDF_FILE_PATH);
  cachedPdfData = fileBuffer.toString("base64");
  return cachedPdfData;
}

// API endpoint to handle Gemini requests
app.post("/api/ask-gemini", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Vai trò: Bạn là một giảng viên Triết học Mác - Lênin nhiệt tình.
Nhiệm vụ: Trả lời câu hỏi của sinh viên dựa trên giáo trình được cung cấp.
Yêu cầu:
- Chỉ trả lời dựa trên nội dung file PDF đính kèm.
- Trích dẫn rõ ý đó nằm ở phần nào nếu có thể.
- Giọng văn: Học thuật nhưng dễ hiểu, khuyến khích tư duy.

Câu hỏi của sinh viên: "${question}"
`;

    const pdfData = await loadPdfData();
    const parts = [
      prompt,
      {
        inlineData: {
          data: pdfData,
          mimeType: "application/pdf",
        },
      },
    ];

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error("Error calling Gemini:", error);
    const message = error?.message || "Unknown error";
    const retryMatch = message.match(/retry in ([0-9.]+)s/i);
    const retryAfter = retryMatch ? Math.ceil(Number(retryMatch[1])) : null;
    const isQuota =
      message.includes("429") ||
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("too many requests");

    res.status(isQuota ? 429 : 500).json({
      error: isQuota
        ? "Quota exceeded. Please wait and retry."
        : "Failed to get response from AI",
      retryAfter,
      details: message,
    });
  }
});

app.get("/api/clear-pdf-cache", (req, res) => {
  cachedPdfData = null;
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/home.html`);
  console.log(`API endpoint: http://localhost:${PORT}/api/ask-gemini`);
});
