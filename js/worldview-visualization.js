// Worldview Visualization Engine
// Analyzes and visualizes the worldview created by the user

class WorldviewVisualization {
  constructor() {
    this.canvas = document.getElementById("visualization-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.analysisSection = document.getElementById("analysis-section");

    this.setupModalControls();
  }

  setupModalControls() {
    // Close modal
    const closeBtn = document.getElementById("btn-close-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeModal();
      });
    }

    // Export image
    const exportBtn = document.getElementById("btn-export-image");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        this.exportImage();
      });
    }

    // Share
    const shareBtn = document.getElementById("btn-share");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        this.share();
      });
    }

    // Click outside to close
    const modal = document.getElementById("visualization-modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  generate(pieces, connections) {
    if (!this.ctx) return;

    // Analyze the worldview
    const analysis = this.analyzeWorldview(pieces, connections);

    // Display analysis
    this.displayAnalysis(analysis);

    // Draw visualization
    this.drawVisualization(pieces, connections, analysis);
  }

  analyzeWorldview(pieces, connections) {
    const analysis = {
      categories: {
        matter_consciousness: { count: 0, concepts: [] },
        contradiction: { count: 0, concepts: [] },
        development: { count: 0, concepts: [] },
        individual_society: { count: 0, concepts: [] },
      },
      totalPieces: pieces.length,
      totalConnections: connections.length,
      density: 0,
      tendencies: {},
    };

    // Count pieces by category
    pieces.forEach((piece) => {
      if (analysis.categories[piece.category]) {
        analysis.categories[piece.category].count++;
        analysis.categories[piece.category].concepts.push(piece.conceptId);
      }
    });

    // Calculate connection density
    const maxConnections = (pieces.length * (pieces.length - 1)) / 2;
    analysis.density =
      maxConnections > 0
        ? ((connections.length / maxConnections) * 100).toFixed(1)
        : 0;

    // Determine tendencies
    analysis.tendencies = this.determineTendencies(analysis.categories);

    return analysis;
  }

  determineTendencies(categories) {
    const tendencies = {};

    // Matter vs Consciousness
    const matterCons = categories.matter_consciousness.concepts;
    if (
      matterCons.includes("materialism") &&
      !matterCons.includes("idealism")
    ) {
      tendencies.matter_consciousness = { type: "Duy vật", strength: "strong" };
    } else if (
      matterCons.includes("idealism") &&
      !matterCons.includes("materialism")
    ) {
      tendencies.matter_consciousness = { type: "Duy tâm", strength: "strong" };
    } else if (matterCons.length > 0) {
      tendencies.matter_consciousness = {
        type: "Cân bằng",
        strength: "balanced",
      };
    }

    // Dialectical vs Metaphysical
    const contradiction = categories.contradiction.concepts;
    if (
      contradiction.includes("dialectical") &&
      !contradiction.includes("metaphysical")
    ) {
      tendencies.contradiction = { type: "Biện chứng", strength: "strong" };
    } else if (
      contradiction.includes("metaphysical") &&
      !contradiction.includes("dialectical")
    ) {
      tendencies.contradiction = { type: "Siêu hình", strength: "strong" };
    } else if (contradiction.length > 0) {
      tendencies.contradiction = { type: "Cân bằng", strength: "balanced" };
    }

    // Evolution vs Static
    const development = categories.development.concepts;
    if (development.includes("evolution") && !development.includes("static")) {
      tendencies.development = { type: "Tiến hóa", strength: "strong" };
    } else if (
      development.includes("static") &&
      !development.includes("evolution")
    ) {
      tendencies.development = { type: "Tĩnh tại", strength: "strong" };
    } else if (development.length > 0) {
      tendencies.development = { type: "Cân bằng", strength: "balanced" };
    }

    // Individual vs Collective
    const indSoc = categories.individual_society.concepts;
    if (indSoc.includes("individualism") && !indSoc.includes("collectivism")) {
      tendencies.individual_society = { type: "Cá nhân", strength: "strong" };
    } else if (
      indSoc.includes("collectivism") &&
      !indSoc.includes("individualism")
    ) {
      tendencies.individual_society = { type: "Tập thể", strength: "strong" };
    } else if (indSoc.length > 0) {
      tendencies.individual_society = {
        type: "Cân bằng",
        strength: "balanced",
      };
    }

    return tendencies;
  }

  displayAnalysis(analysis) {
    const categoryNames = {
      matter_consciousness: "Vật chất – Ý thức",
      contradiction: "Mâu thuẫn",
      development: "Phát triển",
      individual_society: "Cá nhân – Xã hội",
    };

    const categoryColors = {
      matter_consciousness: "blue",
      contradiction: "green",
      development: "amber",
      individual_society: "pink",
    };

    let html = "";

    // Overall stats
    html += `
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
                <div class="flex items-center gap-3 mb-3">
                    <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">analytics</span>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">Tổng quan</h3>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">${analysis.totalPieces}</div>
                        <div class="text-sm text-slate-600 dark:text-gray-400">Mảnh ghép</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">${analysis.totalConnections}</div>
                        <div class="text-sm text-slate-600 dark:text-gray-400">Kết nối</div>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                    <div class="text-sm text-slate-600 dark:text-gray-400 mb-1">Mật độ kết nối</div>
                    <div class="flex items-center gap-2">
                        <div class="flex-grow bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                            <div class="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500" style="width: ${analysis.density}%"></div>
                        </div>
                        <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">${analysis.density}%</span>
                    </div>
                </div>
            </div>
        `;

    // Tendencies
    html += `
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
                <div class="flex items-center gap-3 mb-4">
                    <span class="material-symbols-outlined text-purple-600 dark:text-purple-400 text-3xl">psychology</span>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">Xu hướng tư duy</h3>
                </div>
                <div class="space-y-3">
        `;

    Object.entries(analysis.tendencies).forEach(([key, tendency]) => {
      const strengthBadge =
        tendency.strength === "strong"
          ? '<span class="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">Mạnh</span>'
          : '<span class="text-xs bg-purple-300 text-purple-900 px-2 py-0.5 rounded-full">Cân bằng</span>';

      html += `
                <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-700 dark:text-gray-300">${categoryNames[key]}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">${tendency.type}</span>
                        ${strengthBadge}
                    </div>
                </div>
            `;
    });

    html += `
                </div>
            </div>
        `;

    this.analysisSection.innerHTML = html;
  }

  drawVisualization(pieces, connections, analysis) {
    // Set canvas size
    this.canvas.width = 800;
    this.canvas.height = 600;

    const ctx = this.ctx;
    const isDark = document.documentElement.classList.contains("dark");

    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    ctx.fillStyle = isDark ? "#1f2937" : "#f9fafb";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate node positions (circular layout)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 80;

    const nodePositions = pieces.map((piece, index) => {
      const angle = (index / pieces.length) * 2 * Math.PI - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        piece: piece,
      };
    });

    // Draw connections first (behind nodes)
    ctx.strokeStyle = isDark
      ? "rgba(48, 140, 232, 0.4)"
      : "rgba(48, 140, 232, 0.6)";
    ctx.lineWidth = 2;

    connections.forEach((conn) => {
      const fromIndex = pieces.findIndex((p) => p.id === conn.from);
      const toIndex = pieces.findIndex((p) => p.id === conn.to);

      if (fromIndex >= 0 && toIndex >= 0) {
        const from = nodePositions[fromIndex];
        const to = nodePositions[toIndex];

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    const categoryColors = {
      matter_consciousness: { light: "#3b82f6", dark: "#60a5fa" },
      contradiction: { light: "#10b981", dark: "#34d399" },
      development: { light: "#f59e0b", dark: "#fbbf24" },
      individual_society: { light: "#ec4899", dark: "#f472b6" },
    };

    nodePositions.forEach((node) => {
      const color = categoryColors[node.piece.category];
      const nodeColor = isDark ? color.dark : color.light;

      // Draw circle
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = isDark ? "#374151" : "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw concept ID text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px Lexend, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const conceptLabel = this.getConceptLabel(node.piece.conceptId);
      ctx.fillText(conceptLabel, node.x, node.y);
    });

    // Draw center title
    ctx.fillStyle = isDark ? "#e5e7eb" : "#1f2937";
    ctx.font = "bold 20px Lora, serif";
    ctx.textAlign = "center";
    ctx.fillText("Thế Giới Quan", centerX, centerY);

    ctx.font = "14px Lexend, sans-serif";
    ctx.fillStyle = isDark ? "#9ca3af" : "#6b7280";
    ctx.fillText(
      `${pieces.length} khái niệm • ${connections.length} kết nối`,
      centerX,
      centerY + 25,
    );
  }

  getConceptLabel(conceptId) {
    const labels = {
      materialism: "Duy vật",
      idealism: "Duy tâm",
      dialectical: "Biện chứng",
      metaphysical: "Siêu hình",
      evolution: "Tiến hóa",
      static: "Tĩnh tại",
      individualism: "Cá nhân",
      collectivism: "Tập thể",
    };
    return labels[conceptId] || conceptId;
  }

  closeModal() {
    const modal = document.getElementById("visualization-modal");
    modal.classList.add("hidden");
  }

  exportImage() {
    if (!this.canvas) return;

    const link = document.createElement("a");
    link.download = `the-gioi-quan-${Date.now()}.png`;
    link.href = this.canvas.toDataURL("image/png");
    link.click();
  }

  share() {
    const gameState = window.game ? window.game.getGameState() : null;
    if (!gameState) return;

    const shareCode = btoa(
      JSON.stringify({
        pieces: gameState.pieces.map((p) => ({
          category: p.category,
          conceptId: p.conceptId,
        })),
        connections: gameState.connections.map((c) => ({
          from: gameState.pieces.findIndex((p) => p.id === c.from),
          to: gameState.pieces.findIndex((p) => p.id === c.to),
        })),
      }),
    );

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareCode)
      .then(() => {
        alert(
          "Đã sao chép mã chia sẻ vào clipboard!\n\nBạn có thể gửi mã này cho bạn bè để họ xem thế giới quan của bạn.",
        );
      })
      .catch(() => {
        // Fallback
        prompt("Sao chép mã này để chia sẻ:", shareCode);
      });
  }
}

// Initialize visualization when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.WorldviewVisualization = new WorldviewVisualization();

  // Share button
  document.getElementById('btn-share').addEventListener('click', () => {
      const gameState = window.game.getGameState();
      const shareCode = btoa(JSON.stringify({
          pieces: gameState.pieces.map((p) => ({
              category: p.category,
              conceptId: p.conceptId,
          })),
          connections: gameState.connections.map((c) => ({
              from: gameState.pieces.findIndex((p) => p.id === c.from),
              to: gameState.pieces.findIndex((p) => p.id === c.to),
          })),
      }));
      
      navigator.clipboard.writeText(shareCode).then(() => {
          alert('Đã copy mã chia sẻ vào clipboard!');
      }).catch(() => {
          prompt("Sao chép mã này để chia sẻ:", shareCode);
      });
  });

  // AI Analysis button
  document.getElementById('btn-ai-analysis').addEventListener('click', () => {
      if (window.aiAnalysis && window.game) {
          const gameState = window.game.getGameState();
          const analysis = window.aiAnalysis.analyzeWorldview(gameState.pieces, gameState.connections);
          window.aiAnalysis.showAnalysisModal(analysis);
      }
  });
});
