// Backend API endpoint (change this if deploying to production)
const API_ENDPOINT =
  window.location.port && window.location.port !== "3000"
    ? `http://${window.location.hostname}:3000/api/ask-gemini`
    : window.location.origin + "/api/ask-gemini";

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const stopBtn = document.getElementById("stop-btn");
const pdfStatus = document.getElementById("pdf-status");
const suggestionButtons = document.querySelectorAll(".suggestion-btn");
const historyList = document.getElementById("history-list");
const historyEmpty = document.getElementById("history-empty");
const clearHistoryBtn = document.getElementById("clear-history-btn");

const HISTORY_KEY = "philoMapAiHistory";

let isBusy = false;
let activeRequestId = 0;
let currentLoadingBubble = null;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch (error) {
    console.warn("Không thể đọc lịch sử:", error);
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 30)));
}

function formatTime(value) {
  const date = new Date(value);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
}

function renderHistory() {
  if (!historyList || !historyEmpty) return;
  const items = loadHistory();
  historyList.innerHTML = "";

  if (!items.length) {
    historyEmpty.classList.remove("hidden");
    return;
  }

  historyEmpty.classList.add("hidden");
  items.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-blue-50 transition-colors";
    button.innerHTML = `
      <div class="text-xs text-slate-400 mb-1">${formatTime(
        item.createdAt,
      )}</div>
      <div class="text-sm text-slate-700 font-semibold line-clamp-2">${escapeHtml(
        item.question,
      )}</div>
    `;
    button.addEventListener("click", () => {
      chatInput.value = item.question;
      chatInput.focus();
    });
    historyList.appendChild(button);
  });
}

function setStatus(text) {
  if (pdfStatus) {
    pdfStatus.textContent = text;
  }
}

function appendMessage(content, type = "ai", isHtml = false) {
  const wrapper = document.createElement("div");
  wrapper.className =
    type === "user"
      ? "flex justify-end"
      : "flex justify-start";

  const bubble = document.createElement("div");
  bubble.className =
    type === "user"
      ? "bg-primary text-white px-4 py-3 rounded-2xl rounded-br-md max-w-[85%] text-sm leading-relaxed shadow-sm"
      : "bg-slate-100 text-slate-700 px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm leading-relaxed";

  if (isHtml) {
    bubble.innerHTML = content;
  } else {
    bubble.textContent = content;
  }

  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
  return bubble;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAnswer(text) {
  const safe = escapeHtml(text);
  return safe
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

async function askPhilosophyGemini(userQuestion) {
  if (location.protocol === "file:") {
    throw new Error(
      "Trang đang mở bằng file://. Hãy chạy bằng Live Server hoặc một web server.",
    );
  }

  setStatus("Đang gửi câu hỏi...");

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: userQuestion,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 429) {
      const retryAfter = errorData.retryAfter;
      const waitText = retryAfter
        ? ` Vui lòng thử lại sau ${retryAfter}s.`
        : " Vui lòng thử lại sau ít phút.";
      throw new Error(
        `Bạn đã vượt giới hạn miễn phí.${waitText} Nếu cần, hãy nâng quota hoặc đợi sang ngày mới.`,
      );
    }
    throw new Error(errorData.error || "Không thể kết nối với server");
  }

  const data = await response.json();
  return data.answer;
}

async function handleSend() {
  const question = chatInput.value.trim();
  if (!question || isBusy) {
    return;
  }

  isBusy = true;
  activeRequestId += 1;
  const requestId = activeRequestId;

  sendBtn.disabled = true;
  sendBtn.classList.add("opacity-60", "cursor-not-allowed");
  if (stopBtn) {
    stopBtn.disabled = false;
    stopBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }

  appendMessage(question, "user");
  chatInput.value = "";

  const loadingBubble = appendMessage(
    "Đang tra cứu giáo trình, vui lòng đợi...",
    "ai",
  );
  currentLoadingBubble = loadingBubble;

  try {
    const answer = await askPhilosophyGemini(question);
    if (requestId !== activeRequestId) {
      return;
    }
    loadingBubble.innerHTML = formatAnswer(answer);

    const historyItems = loadHistory();
    historyItems.unshift({
      question,
      answer,
      createdAt: Date.now(),
    });
    saveHistory(historyItems);
    renderHistory();
  } catch (error) {
    if (requestId !== activeRequestId) {
      return;
    }
    console.error("Lỗi gọi Gemini:", error);
    const fallbackMessage =
      "Xin lỗi, hệ thống đang quá tải hoặc không đọc được tài liệu. Vui lòng thử lại sau.";
    const errorMessage =
      error && error.message ? `Lỗi: ${error.message}` : fallbackMessage;
    const networkHint =
      error &&
      error.message &&
      error.message.toLowerCase().includes("failed to fetch")
        ? " (Kiểm tra backend đang chạy ở http://localhost:3000)"
        : "";
    loadingBubble.textContent = errorMessage + networkHint;
  } finally {
    if (requestId !== activeRequestId) {
      return;
    }
    setStatus("Sẵn sàng");
    isBusy = false;
    currentLoadingBubble = null;
    sendBtn.disabled = false;
    sendBtn.classList.remove("opacity-60", "cursor-not-allowed");
    if (stopBtn) {
      stopBtn.disabled = true;
      stopBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  }
}

sendBtn.addEventListener("click", handleSend);
if (stopBtn) {
  stopBtn.addEventListener("click", () => {
    if (!isBusy) return;
    isBusy = false;
    activeRequestId += 1;
    if (currentLoadingBubble) {
      currentLoadingBubble.textContent =
        "Đã dừng phản hồi. Bạn có thể chỉnh lại câu hỏi và gửi lại.";
      currentLoadingBubble = null;
    }
    setStatus("Đã dừng");
    sendBtn.disabled = false;
    sendBtn.classList.remove("opacity-60", "cursor-not-allowed");
    stopBtn.disabled = true;
    stopBtn.classList.add("opacity-50", "cursor-not-allowed");
  });
}
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
});

suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chatInput.value = button.dataset.question || "";
    chatInput.focus();
  });
});

appendMessage(
  "Xin chào! Hãy đặt câu hỏi về Triết học Mác - Lênin. Tôi sẽ trả lời dựa trên giáo trình đã cung cấp.",
  "ai",
);

renderHistory();
if (stopBtn) {
  stopBtn.disabled = true;
  stopBtn.classList.add("opacity-50", "cursor-not-allowed");
}
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  });
}
