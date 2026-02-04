// Philosophy Quiz System
// Manages quiz triggers, display, and scoring

class QuizSystem {
    constructor(game) {
        this.game = game;
        this.questions = window.QUIZ_QUESTIONS || [];
        this.usedQuestions = new Set();
        this.stats = {
            totalQuizzes: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalBonus: 0
        };
        this.currentQuestion = null;
        this.isQuizActive = false;

        this.initializeUI();
    }

    initializeUI() {
        // Create quiz modal HTML
        const modalHTML = `
            <div id="quiz-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm">
                <div class="quiz-card bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl border-2 border-primary">
                    <!-- Header -->
                    <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <span class="material-symbols-outlined text-primary text-3xl">quiz</span>
                        <div class="flex-1">
                            <h2 class="text-xl font-bold text-slate-900 dark:text-white">📚 Câu hỏi Triết học</h2>
                            <p class="text-xs text-slate-600 dark:text-gray-400">Trả lời đúng nhận thưởng!</p>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-semibold text-primary" id="quiz-stats"></div>
                        </div>
                    </div>

                    <!-- Question -->
                    <div class="mb-6">
                        <div class="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                            <span class="text-xs font-semibold text-blue-600 dark:text-blue-400" id="quiz-category"></span>
                        </div>
                        <p class="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed" id="quiz-question"></p>
                    </div>

                    <!-- Options -->
                    <div class="space-y-3 mb-6" id="quiz-options">
                        <!-- Options will be inserted here -->
                    </div>

                    <!-- Explanation (hidden initially) -->
                    <div id="quiz-explanation" class="hidden">
                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border-l-4 border-blue-500">
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-blue-500 mt-0.5">lightbulb</span>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-sm text-slate-900 dark:text-white mb-1">Giải thích</h4>
                                    <p class="text-sm text-slate-700 dark:text-gray-300" id="quiz-explanation-text"></p>
                                </div>
                            </div>
                        </div>
                        <button id="quiz-continue-btn" class="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                            Tiếp tục chơi →
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Bind continue button
        document.getElementById('quiz-continue-btn').addEventListener('click', () => {
            this.closeQuiz();
        });
    }

    shouldTriggerQuiz(actionCount) {
        // Trigger every 3 actions (increased from 5)
        return actionCount % 3 === 0 && actionCount > 0;
    }

    getRandomQuestion() {
        // Get unused questions
        const availableQuestions = this.questions.filter(q => !this.usedQuestions.has(q.id));

        // If all used, reset
        if (availableQuestions.length === 0) {
            this.usedQuestions.clear();
            return this.questions[Math.floor(Math.random() * this.questions.length)];
        }

        // Random selection
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];
        this.usedQuestions.add(question.id);
        return question;
    }

    showQuiz() {
        if (this.isQuizActive) return;

        this.currentQuestion = this.getRandomQuestion();
        if (!this.currentQuestion) return;

        this.isQuizActive = true;

        // Shuffle answer options to prevent predictable correct answer position
        const correctAnswer = this.currentQuestion.options[this.currentQuestion.correct];
        const shuffledOptions = [...this.currentQuestion.options];

        // Fisher-Yates shuffle algorithm
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        // Find new index of correct answer after shuffle
        this.shuffledCorrectIndex = shuffledOptions.indexOf(correctAnswer);

        // Show modal
        const modal = document.getElementById('quiz-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Populate question info
        const categoryLabels = {
            'luong-chat': 'Lượng - Chất',
            'mau-thuan': 'Mâu thuẫn',
            'phu-dinh': 'Phủ định của Phủ định',
            'ung-dung': 'Ứng dụng thực tế'
        };

        document.getElementById('quiz-category').textContent = categoryLabels[this.currentQuestion.category] || this.currentQuestion.category;
        document.getElementById('quiz-question').textContent = this.currentQuestion.question;
        document.getElementById('quiz-stats').textContent = `${this.stats.correctAnswers}/${this.stats.totalQuizzes} đúng`;

        // Populate options with shuffled answers
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        shuffledOptions.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'quiz-option w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-start gap-3';
            optionButton.innerHTML = `
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    ${String.fromCharCode(65 + index)}
                </span>
                <span class="flex-1 text-sm text-slate-900 dark:text-white leading-relaxed">${option}</span>
            `;
            optionButton.onclick = () => this.selectAnswer(index, optionButton);
            optionsContainer.appendChild(optionButton);
        });

        // Clear result area
        document.getElementById('quiz-explanation').classList.add('hidden');
    }

    selectAnswer(selectedIndex, selectedButton) {
        // Disable all options
        const allOptions = document.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => opt.disabled = true);

        // Check against shuffled correct index
        const isCorrect = selectedIndex === this.shuffledCorrectIndex;

        // Update stats
        this.stats.totalQuizzes++;
        if (isCorrect) {
            this.stats.correctAnswers++;
        } else {
            this.stats.wrongAnswers++;
        }

        // Visual feedback - highlight correct answer
        allOptions.forEach((opt, idx) => {
            if (idx === this.shuffledCorrectIndex) {
                opt.classList.add('border-green-500', 'bg-green-50', 'dark:bg-green-900/20');
                opt.classList.remove('border-gray-200', 'dark:border-gray-700');
            } else if (idx === selectedIndex && !isCorrect) {
                opt.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-900/20');
                opt.classList.remove('border-gray-200', 'dark:border-gray-700');
            }
        });

        // Apply bonus/penalty
        if (isCorrect) {
            Object.entries(this.currentQuestion.bonus).forEach(([stat, value]) => {
                if (stat === 'quantity') {
                    this.game.character.quantityLevel += value;
                } else {
                    this.game.character.skills[stat] = Math.min(100, this.game.character.skills[stat] + value);
                }
            });
            this.stats.totalBonus += Object.values(this.currentQuestion.bonus).reduce((a, b) => a + b, 0);
        } else {
            Object.entries(this.currentQuestion.penalty).forEach(([stat, value]) => {
                if (stat === 'quantity') {
                    this.game.character.quantityLevel = Math.max(0, this.game.character.quantityLevel + value);
                } else {
                    this.game.character.skills[stat] = Math.max(0, this.game.character.skills[stat] + value);
                }
            });
        }

        // Update UI feedback
        this.game.updateUI();

        // Show explanation with bonus/penalty
        const explanationDiv = document.getElementById('quiz-explanation');
        const explanationText = document.getElementById('quiz-explanation-text');

        // Build effects display
        let effectsHTML = '';
        if (isCorrect) {
            const bonusEffects = Object.entries(this.currentQuestion.bonus)
                .map(([stat, value]) => `<span class="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-semibold mr-2 mb-1">+${value} ${this.game.getEffectLabel(stat)}</span>`)
                .join('');
            effectsHTML = `
                <div class="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                        <span class="font-bold text-green-700 dark:text-green-300">Chính xác! 🎉</span>
                    </div>
                    <div class="font-semibold text-sm text-slate-700 dark:text-gray-300 mb-2">Phần thưởng:</div>
                    <div>${bonusEffects}</div>
                </div>
            `;
        } else {
            const penaltyEffects = Object.entries(this.currentQuestion.penalty)
                .map(([stat, value]) => `<span class="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-xs font-semibold mr-2 mb-1">${value} ${this.game.getEffectLabel(stat)}</span>`)
                .join('');
            effectsHTML = `
                <div class="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="material-symbols-outlined text-red-600 dark:text-red-400">cancel</span>
                        <span class="font-bold text-red-700 dark:text-red-300">Chưa đúng 😔</span>
                    </div>
                    <div class="font-semibold text-sm text-slate-700 dark:text-gray-300 mb-2">Trừ điểm:</div>
                    <div>${penaltyEffects}</div>
                </div>
            `;
        }

        explanationText.innerHTML = effectsHTML + `<p class="text-sm text-slate-700 dark:text-gray-300">${this.currentQuestion.explanation}</p>`;
        explanationDiv.classList.remove('hidden');

        // Show feedback notification
        const feedbackContainer = document.getElementById('action-feedback');
        const feedback = document.createElement('div');
        feedback.className = 'action-feedback animate-slide-in';

        if (isCorrect) {
            feedback.innerHTML = `
                <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-3 shadow-lg mb-2">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined">check_circle</span>
                        <span class="font-semibold text-sm">Chính xác! ✅</span>
                    </div>
                    <div class="text-xs">
                        Bonus: ${Object.entries(this.currentQuestion.bonus).map(([k, v]) => `+${v} ${this.game.getEffectLabel(k)}`).join(', ')}
                    </div>
                </div>
            `;
        } else {
            feedback.innerHTML = `
                <div class="bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl p-3 shadow-lg mb-2">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined">cancel</span>
                        <span class="font-semibold text-sm">Chưa đúng ❌</span>
                    </div>
                    <div class="text-xs">
                        ${Object.entries(this.currentQuestion.penalty).map(([k, v]) => `${v} ${this.game.getEffectLabel(k)}`).join(', ')}
                    </div>
                </div>
            `;
        }
        feedbackContainer.insertBefore(feedback, feedbackContainer.firstChild);
    }

    closeQuiz() {
        // Add to activity log before closing
        if (this.currentQuestion) {
            const wasCorrect = this.stats.correctAnswers > (this.lastLoggedCorrect || 0);
            this.lastLoggedCorrect = this.stats.correctAnswers;

            const logHTML = `
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 shadow-md border-l-4 border-blue-500 dark:border-blue-400 mb-2">
                    <div class="flex items-start gap-3">
                        <span class="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400">quiz</span>
                        <div class="flex-1">
                            <div class="text-sm font-semibold text-slate-900 dark:text-white">
                                📚 Câu hỏi Triết học: ${wasCorrect ? '✅ Đúng' : '❌ Sai'}
                            </div>
                            <div class="text-xs text-slate-600 dark:text-gray-400 mt-1">
                                ${wasCorrect
                    ? Object.entries(this.currentQuestion.bonus).map(([k, v]) => `+${v} ${this.game.getEffectLabel(k)}`).join(', ')
                    : Object.entries(this.currentQuestion.penalty).map(([k, v]) => `${v} ${this.game.getEffectLabel(k)}`).join(', ')
                }
                            </div>
                        </div>
                        <div class="text-xs text-slate-500 dark:text-gray-500">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                </div>
            `;

            const activityLog = document.getElementById('action-log');
            if (activityLog) {
                activityLog.insertAdjacentHTML('afterbegin', logHTML);
            }
        }

        document.getElementById('quiz-modal').classList.add('hidden');
        document.getElementById('quiz-modal').classList.remove('flex');
        this.isQuizActive = false;
        this.currentQuestion = null;
    }

    getStats() {
        return {
            ...this.stats,
            accuracy: this.stats.totalQuizzes > 0
                ? Math.round((this.stats.correctAnswers / this.stats.totalQuizzes) * 100)
                : 0
        };
    }

    import(data) {
        if (data) {
            this.stats = data.stats || this.stats;
            this.usedQuestions = new Set(data.usedQuestions || []);
        }
    }

    export() {
        return {
            stats: this.stats,
            usedQuestions: Array.from(this.usedQuestions)
        };
    }
}

// Export for use in game
if (typeof window !== 'undefined') {
    window.QuizSystem = QuizSystem;
}
