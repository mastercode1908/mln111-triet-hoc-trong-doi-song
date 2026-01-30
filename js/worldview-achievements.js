// Worldview Game - Achievement System
// Track progress and unlock badges

class WorldviewAchievements {
  constructor() {
    this.achievements = this.initializeAchievements();
    this.unlockedAchievements = this.loadUnlockedAchievements();
    this.setupUI();
  }

  initializeAchievements() {
    return [
      {
        id: "first-worldview",
        title: "Triết gia mới",
        description: "Tạo thế giới quan đầu tiên",
        icon: "🎓",
        points: 50,
        condition: (stats) => stats.totalWorldviews >= 1,
      },
      {
        id: "architect",
        title: "Kiến trúc sư tư tưởng",
        description: "Sử dụng đủ 8 mảnh ghép",
        icon: "🎨",
        points: 100,
        condition: (stats) => stats.maxPieces >= 8,
      },
      {
        id: "connector",
        title: "Kết nối sư",
        description: "Tạo 10+ kết nối",
        icon: "🔗",
        points: 100,
        condition: (stats) => stats.maxConnections >= 10,
      },
      {
        id: "stress-master",
        title: "Bậc thầy quản lý stress",
        description: "Hoàn thành thử thách Sinh viên",
        icon: "🧘",
        points: 100,
        condition: (stats) =>
          stats.completedChallenges.includes("student-stress"),
      },
      {
        id: "phoenix",
        title: "Phượng hoàng tái sinh",
        description: "Hoàn thành thử thách Khởi nghiệp",
        icon: "🔥",
        points: 150,
        condition: (stats) =>
          stats.completedChallenges.includes("startup-failure"),
      },
      {
        id: "harmony-seeker",
        title: "Người tìm kiếm hòa hợp",
        description: "Hoàn thành thử thách Gia đình",
        icon: "☯️",
        points: 150,
        condition: (stats) =>
          stats.completedChallenges.includes("family-conflict"),
      },
      {
        id: "earth-guardian",
        title: "Người bảo vệ Trái đất",
        description: "Hoàn thành thử thách Khí hậu",
        icon: "🌍",
        points: 200,
        condition: (stats) =>
          stats.completedChallenges.includes("climate-change"),
      },
      {
        id: "meaning-seeker",
        title: "Người tìm ý nghĩa",
        description: "Hoàn thành thử thách Hiện sinh",
        icon: "✨",
        points: 250,
        condition: (stats) =>
          stats.completedChallenges.includes("existential-crisis"),
      },
      {
        id: "dialectician",
        title: "Biện chứng gia",
        description: "Hoàn thành 3 challenges với tư duy biện chứng",
        icon: "⚖️",
        points: 200,
        condition: (stats) => stats.completedChallenges.length >= 3,
      },
      {
        id: "master",
        title: "Bậc thầy triết học",
        description: "Hoàn thành tất cả thử thách",
        icon: "👑",
        points: 500,
        condition: (stats) => stats.completedChallenges.length >= 5,
      },
      {
        id: "explorer",
        title: "Nhà thám hiểm",
        description: "Tạo 5 thế giới quan khác nhau",
        icon: "🗺️",
        points: 150,
        condition: (stats) => stats.totalWorldviews >= 5,
      },
      {
        id: "perfectionist",
        title: "Người cầu toàn",
        description: "Đạt điểm AI >= 90",
        icon: "💯",
        points: 200,
        condition: (stats) => stats.maxAIScore >= 90,
      },
    ];
  }

  setupUI() {
    // Add achievements button to sidebar
    const sidebar = document.querySelector("aside");
    if (!sidebar) return;

    const achievementsBtn = document.createElement("button");
    achievementsBtn.id = "btn-achievements";
    achievementsBtn.className =
      "w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-2";
    achievementsBtn.innerHTML = `
            <span class="material-symbols-outlined">military_tech</span>
            <span>Thành tích</span>
            <span id="achievement-count" class="bg-white/20 px-2 py-0.5 rounded-full text-xs">${this.unlockedAchievements.length}/${this.achievements.length}</span>
        `;
    achievementsBtn.addEventListener("click", () =>
      this.showAchievementsModal(),
    );

    // Insert after challenges button
    const challengesBtn = document.getElementById("btn-challenges");
    if (challengesBtn && challengesBtn.parentElement) {
      challengesBtn.parentElement.insertBefore(
        achievementsBtn,
        challengesBtn.nextSibling,
      );
    }

    // Create achievements modal
    this.createAchievementsModal();
  }

  createAchievementsModal() {
    const modal = document.createElement("div");
    modal.id = "achievements-modal";
    modal.className =
      "hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4";
    modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">🏆 Thành Tích</h2>
                        <p class="text-sm text-slate-600 dark:text-gray-400">Theo dõi tiến độ và unlock badges</p>
                    </div>
                    <button id="btn-close-achievements-modal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <span class="material-symbols-outlined text-slate-600 dark:text-gray-400">close</span>
                    </button>
                </div>
                <div id="achievements-content" class="flex-grow overflow-y-auto p-6">
                    <!-- Achievements will be inserted here -->
                </div>
            </div>
        `;
    document.body.appendChild(modal);

    // Close button
    modal
      .querySelector("#btn-close-achievements-modal")
      .addEventListener("click", () => {
        modal.classList.add("hidden");
      });

    // Click outside to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  showAchievementsModal() {
    const modal = document.getElementById("achievements-modal");
    const content = document.getElementById("achievements-content");

    const totalPoints = this.achievements
      .filter((a) => this.unlockedAchievements.includes(a.id))
      .reduce((sum, a) => sum + a.points, 0);

    let html = `
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 mb-6 border-2 border-amber-200 dark:border-amber-700">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-3xl font-bold text-amber-600 dark:text-amber-400">${this.unlockedAchievements.length}/${this.achievements.length}</div>
                        <div class="text-sm text-slate-600 dark:text-gray-400">Thành tích đã mở khóa</div>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">${totalPoints}</div>
                        <div class="text-sm text-slate-600 dark:text-gray-400">Tổng điểm</div>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="flex items-center gap-2">
                        <div class="flex-grow bg-amber-200 dark:bg-amber-800 rounded-full h-3">
                            <div class="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500" style="width: ${(this.unlockedAchievements.length / this.achievements.length) * 100}%"></div>
                        </div>
                        <span class="text-sm font-semibold text-amber-600 dark:text-amber-400">${Math.round((this.unlockedAchievements.length / this.achievements.length) * 100)}%</span>
                    </div>
                </div>
            </div>
        `;

    html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';

    this.achievements.forEach((achievement) => {
      const isUnlocked = this.unlockedAchievements.includes(achievement.id);

      html += `
                <div class="achievement-card ${isUnlocked ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-400 dark:border-amber-600" : "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"} rounded-2xl p-6 border-2 transition-all duration-300">
                    <div class="flex items-start gap-4">
                        <div class="text-4xl ${isUnlocked ? "" : "grayscale opacity-50"}">${achievement.icon}</div>
                        <div class="flex-1">
                            <h3 class="font-bold text-lg ${isUnlocked ? "text-slate-900 dark:text-white" : "text-gray-500 dark:text-gray-600"} mb-1">${achievement.title}</h3>
                            <p class="text-sm ${isUnlocked ? "text-slate-600 dark:text-gray-400" : "text-gray-500 dark:text-gray-600"} mb-3">${achievement.description}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xs px-3 py-1 rounded-full ${isUnlocked ? "bg-amber-200 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-500"} font-medium">${achievement.points} điểm</span>
                                ${isUnlocked ? '<span class="text-xl">✅</span>' : '<span class="text-xl">🔒</span>'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    html += "</div>";
    content.innerHTML = html;

    modal.classList.remove("hidden");
  }

  checkAchievements() {
    const stats = this.gatherStats();
    const newlyUnlocked = [];

    this.achievements.forEach((achievement) => {
      if (
        !this.unlockedAchievements.includes(achievement.id) &&
        achievement.condition(stats)
      ) {
        this.unlockedAchievements.push(achievement.id);
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveUnlockedAchievements();
      this.updateAchievementButton();

      // Show notifications
      newlyUnlocked.forEach((achievement, index) => {
        setTimeout(() => {
          this.showUnlockNotification(achievement);
        }, index * 1000);
      });
    }
  }

  gatherStats() {
    const completedChallenges = JSON.parse(
      localStorage.getItem("worldview-challenges-progress") || "[]",
    );

    return {
      totalWorldviews: parseInt(
        localStorage.getItem("worldview-total-created") || "0",
      ),
      maxPieces: parseInt(localStorage.getItem("worldview-max-pieces") || "0"),
      maxConnections: parseInt(
        localStorage.getItem("worldview-max-connections") || "0",
      ),
      completedChallenges: completedChallenges,
      maxAIScore: parseInt(
        localStorage.getItem("worldview-max-ai-score") || "0",
      ),
    };
  }

  updateStats(stats) {
    // Update localStorage
    if (stats.totalWorldviews) {
      localStorage.setItem(
        "worldview-total-created",
        stats.totalWorldviews.toString(),
      );
    }
    if (stats.maxPieces) {
      localStorage.setItem("worldview-max-pieces", stats.maxPieces.toString());
    }
    if (stats.maxConnections) {
      localStorage.setItem(
        "worldview-max-connections",
        stats.maxConnections.toString(),
      );
    }
    if (stats.maxAIScore) {
      const currentMax = parseInt(
        localStorage.getItem("worldview-max-ai-score") || "0",
      );
      if (stats.maxAIScore > currentMax) {
        localStorage.setItem(
          "worldview-max-ai-score",
          stats.maxAIScore.toString(),
        );
      }
    }

    // Check for new achievements
    this.checkAchievements();
  }

  showUnlockNotification(achievement) {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed top-20 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-2xl p-6 z-50 animate-slide-in-right max-w-sm";
    toast.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="text-5xl">${achievement.icon}</div>
                <div class="flex-1">
                    <div class="font-bold text-lg mb-1">🎉 Thành tích mới!</div>
                    <div class="font-semibold mb-1">${achievement.title}</div>
                    <div class="text-sm opacity-90 mb-2">${achievement.description}</div>
                    <div class="text-xs bg-white/20 inline-block px-3 py-1 rounded-full">+${achievement.points} điểm</div>
                </div>
            </div>
        `;

    document.body.appendChild(toast);

    // Confetti effect
    if (window.animationEffects) {
      window.animationEffects.confetti();
    }

    // Remove after 5 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  updateAchievementButton() {
    const countSpan = document.getElementById("achievement-count");
    if (countSpan) {
      countSpan.textContent = `${this.unlockedAchievements.length}/${this.achievements.length}`;
    }
  }

  loadUnlockedAchievements() {
    const saved = localStorage.getItem("worldview-achievements");
    return saved ? JSON.parse(saved) : [];
  }

  saveUnlockedAchievements() {
    localStorage.setItem(
      "worldview-achievements",
      JSON.stringify(this.unlockedAchievements),
    );
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.achievementSystem = new WorldviewAchievements();
});
