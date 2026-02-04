// Decision Dilemma System
// Manages life choice scenarios with philosophical implications

class DilemmaSystem {
    constructor(game) {
        this.game = game;
        this.scenarios = window.DILEMMA_SCENARIOS || [];
        this.usedScenarios = new Set();
        this.stats = {
            totalDilemmas: 0,
            choicesMade: {
                A: 0,
                B: 0,
                C: 0
            }
        };
        this.currentDilemma = null;
        this.isDilemmaActive = false;

        this.initializeUI();
    }

    initializeUI() {
        // Create dilemma modal HTML
        const modalHTML = `
            <div id="dilemma-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 backdrop-blur-md">
                <div class="dilemma-card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-2xl border-2 border-purple-300 dark:border-purple-700">
                    <!-- Header -->
                    <div class="flex items-start gap-3 mb-5 pb-4 border-b border-purple-200 dark:border-purple-800">
                        <div class="bg-purple-500 rounded-full p-2">
                            <span class="material-symbols-outlined text-white text-2xl">psychology</span>
                        </div>
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400" id="dilemma-title"></h2>
                            <p class="text-xs text-purple-600 dark:text-purple-400 mt-1" id="dilemma-philosophy"></p>
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                            <span class="material-symbols-outlined text-purple-500">balance</span>
                            <span class="font-semibold text-purple-700 dark:text-purple-300" id="dilemma-count"></span>
                        </div>
                    </div>

                    <!-- Scenario -->
                    <div class="mb-6">
                        <div class="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5 shadow-inner border border-purple-100 dark:border-purple-900">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-purple-500 text-xl mt-1">description</span>
                                <p class="text-base text-slate-800 dark:text-gray-200 leading-relaxed" id="dilemma-scenario"></p>
                            </div>
                        </div>
                    </div>

                    <!-- Choices -->
                    <div class="space-y-3 mb-5" id="dilemma-choices">
                        <!-- Choice buttons will be inserted here -->
                    </div>

                    <!-- Consequence (hidden initially) -->
                    <div id="dilemma-consequence" class="hidden">
                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-5 border-l-4 border-indigo-500 mb-4">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-indigo-500 text-xl">info</span>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-sm text-slate-900 dark:text-white mb-2">Hệ quả</h4>
                                    <p class="text-sm text-slate-700 dark:text-gray-300 leading-relaxed" id="dilemma-consequence-text"></p>
                                </div>
                            </div>
                        </div>
                        <button id="dilemma-continue-btn" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                            Tiếp tục hành trình →
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Bind continue button
        document.getElementById('dilemma-continue-btn').addEventListener('click', () => {
            this.closeDilemma();
        });
    }

    shouldTriggerDilemma() {
        // 30% random chance per action (increased from 20%)
        return Math.random() < 0.30;
    }

    shouldTriggerConditional() {
        // Conditional triggers based on stats
        const character = this.game.character;

        // Low mental health
        if (character.skills.mentalHealth < 30) return true;

        // Low physical health  
        if (character.skills.physicalHealth < 30) return true;

        // Imbalanced stats (one very high, others low)
        const skills = character.skills;
        const values = Object.values(skills);
        const max = Math.max(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        if (max > 80 && avg < 40) return true;

        return false;
    }

    getRandomScenario() {
        // Get unused scenarios
        const availableScenarios = this.scenarios.filter(s => !this.usedScenarios.has(s.id));

        // If all used, reset
        if (availableScenarios.length === 0) {
            this.usedScenarios.clear();
            return this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
        }

        // Random selection
        const randomIndex = Math.floor(Math.random() * availableScenarios.length);
        const scenario = availableScenarios[randomIndex];
        this.usedScenarios.add(scenario.id);
        return scenario;
    }

    showDilemma() {
        if (this.isDilemmaActive) return;

        this.currentDilemma = this.getRandomScenario();
        this.isDilemmaActive = true;
        this.stats.totalDilemmas++;

        // Update count
        document.getElementById('dilemma-count').textContent = `Quyết định ${this.stats.totalDilemmas}`;

        // Update title and philosophy
        document.getElementById('dilemma-title').textContent = this.currentDilemma.title;
        document.getElementById('dilemma-philosophy').textContent = this.currentDilemma.philosophy;

        // Update scenario
        document.getElementById('dilemma-scenario').textContent = this.currentDilemma.scenario;

        // Create choice buttons
        const choicesContainer = document.getElementById('dilemma-choices');
        choicesContainer.innerHTML = '';

        this.currentDilemma.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'dilemma-choice w-full text-left p-4 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 group';

            // Preview effects
            const effectsPreview = Object.entries(choice.effects)
                .map(([stat, value]) => {
                    const label = this.game.getEffectLabel(stat);
                    const sign = value > 0 ? '+' : '';
                    const color = value > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                    return `<span class="${color}">${sign}${value} ${label}</span>`;
                })
                .join(', ');

            choiceBtn.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                        ${String.fromCharCode(65 + index)}
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-slate-900 dark:text-white mb-1">${choice.label}</div>
                        <div class="text-xs text-slate-600 dark:text-gray-400">${effectsPreview}</div>
                    </div>
                </div>
            `;

            choiceBtn.addEventListener('click', () => this.selectChoice(index, choice, choiceBtn));
            choicesContainer.appendChild(choiceBtn);
        });

        // Hide consequence
        document.getElementById('dilemma-consequence').classList.add('hidden');

        // Show modal
        document.getElementById('dilemma-modal').classList.remove('hidden');
        document.getElementById('dilemma-modal').classList.add('flex');
    }

    selectChoice(choiceIndex, choice, selectedButton) {
        // Disable all choices
        const allChoices = document.querySelectorAll('.dilemma-choice');
        allChoices.forEach(c => c.disabled = true);

        // Track choice
        const choiceLetter = String.fromCharCode(65 + choiceIndex);
        this.stats.choicesMade[choiceLetter]++;

        // Visual feedback - highlight selected
        selectedButton.classList.add('border-purple-600', 'bg-purple-100', 'dark:bg-purple-900/50');

        // Store for logging
        this.lastChoice = {
            letter: choiceLetter,
            effects: choice.effects
        };

        // Apply effects
        Object.entries(choice.effects).forEach(([stat, value]) => {
            if (stat === 'quantity') {
                this.game.character.quantityLevel = Math.max(0, this.game.character.quantityLevel + value);
            } else {
                const currentValue = this.game.character.skills[stat] || 0;
                this.game.character.skills[stat] = Math.max(0, Math.min(100, currentValue + value));
            }
        });

        // Update game UI
        this.game.updateUI();

        // Show consequence with effects display
        const consequenceDiv = document.getElementById('dilemma-consequence');
        const consequenceText = document.getElementById('dilemma-consequence-text');

        // Build effects display
        const effectsBadges = Object.entries(choice.effects)
            .map(([stat, value]) => {
                const label = this.game.getEffectLabel(stat);
                const sign = value > 0 ? '+' : '';
                const bgClass = value > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
                return `<span class="inline-block px-2 py-1 ${bgClass} rounded-md text-xs font-semibold mr-2 mb-1">${sign}${value} ${label}</span>`;
            })
            .join('');

        const effectsHTML = `
            <div class="mb-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <div class="font-semibold text-sm text-slate-700 dark:text-gray-300 mb-2">Ảnh hưởng:</div>
                <div>${effectsBadges}</div>
            </div>
        `;

        consequenceText.innerHTML = effectsHTML + `<p class="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">${choice.consequence}</p>`;
        consequenceDiv.classList.remove('hidden');

        // Add to activity log
        const feedbackContainer = document.getElementById('action-feedback');
        const feedback = document.createElement('div');
        feedback.className = 'action-feedback animate-slide-in';

        const effectsDisplay = Object.entries(choice.effects)
            .map(([stat, value]) => {
                const label = this.game.getEffectLabel(stat);
                const sign = value > 0 ? '+' : '';
                const color = value > 0 ? 'text-green-600' : 'text-red-600';
                return `<span class="${color}">${sign}${value} ${label}</span>`;
            })
            .join(', ');

        feedback.innerHTML = `
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 shadow-lg mb-2">
                <div class="flex items-center gap-2 mb-1">
                    <span class="material-symbols-outlined text-sm">psychology</span>
                    <span class="font-semibold text-sm">Quyết định: ${this.currentDilemma.title}</span>
                </div>
                <div class="text-xs mb-1">
                    Lựa chọn ${choiceLetter}: ${choice.label}
                </div>
                <div class="text-xs">
                    ${effectsDisplay}
                </div>
            </div>
        `;
        feedbackContainer.insertBefore(feedback, feedbackContainer.firstChild);
    }

    closeDilemma() {
        // Add to activity log before closing
        if (this.currentDilemma && this.lastChoice) {
            const logHTML = `
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 shadow-md border-l-4 border-purple-500 dark:border-purple-400 mb-2">
                    <div class="flex items-start gap-3">
                        <span class="material-symbols-outlined text-sm text-purple-600 dark:text-purple-400">psychology</span>
                        <div class="flex-1">
                            <div class="text-sm font-semibold text-slate-900 dark:text-white">
                                🤔 ${this.currentDilemma.title} - Lựa chọn ${this.lastChoice.letter}
                            </div>
                            <div class="text-xs text-slate-600 dark:text-gray-400 mt-1">
                                ${Object.entries(this.lastChoice.effects)
                    .map(([k, v]) => {
                        const sign = v > 0 ? '+' : '';
                        return `${sign}${v} ${this.game.getEffectLabel(k)}`;
                    })
                    .join(', ')
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

            this.lastChoice = null;
        }

        document.getElementById('dilemma-modal').classList.add('hidden');
        document.getElementById('dilemma-modal').classList.remove('flex');
        this.isDilemmaActive = false;
        this.currentDilemma = null;
    }

    getStats() {
        return {
            ...this.stats,
            distribution: `A:${this.stats.choicesMade.A} B:${this.stats.choicesMade.B} C:${this.stats.choicesMade.C}`
        };
    }

    import(data) {
        if (data) {
            this.stats = data.stats || this.stats;
            this.usedScenarios = new Set(data.usedScenarios || []);
        }
    }

    export() {
        return {
            stats: this.stats,
            usedScenarios: Array.from(this.usedScenarios)
        };
    }
}

// Export for use in game
if (typeof window !== 'undefined') {
    window.DilemmaSystem = DilemmaSystem;
}
