// Development Map Game - Main Controller
// Manages the complete game loop, drag-drop, and UI updates

class DevelopmentMapGame {
    constructor() {
        this.character = new CharacterState();
        this.eventSystem = new EventSystem(this.character);
        this.achievementSystem = new AchievementSystem(this.character);
        this.quizSystem = new QuizSystem(this);
        this.dilemmaSystem = new DilemmaSystem(this);

        this.stats = {
            totalActions: 0,
            transformations: 0,
            eventsTriggered: 0,
            elementUsage: {
                study: 0,
                time: 0,
                perseverance: 0,
                pressure: 0,
                social: 0,
                rest: 0,
                parttime: 0,
                entertainment: 0,
                socialmedia: 0,
                selfstudy: 0,
                sports: 0,
                club: 0,
                familyvisit: 0,
                volunteering: 0,
                community: 0,
                cooking: 0
            }
        };

        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupEventListeners();
        this.updateUI();
        this.showWelcomeMessage();
    }

    setupDragAndDrop() {
        // Get all draggable elements
        const elements = document.querySelectorAll('.draggable-element');

        elements.forEach(element => {
            element.addEventListener('dragstart', (e) => {
                const elementType = element.dataset.element;
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('element', elementType);
                element.classList.add('dragging');
            });

            element.addEventListener('dragend', (e) => {
                element.classList.remove('dragging');
            });
        });

        // Setup drop zone (character area)
        const dropZone = document.getElementById('character-drop-zone');

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', (e) => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');

            const elementType = e.dataTransfer.getData('element');
            if (elementType) {
                this.handleElementDrop(elementType);
            }
        });
    }

    handleElementDrop(elementType) {
        const elementData = window.ELEMENT_EFFECTS[elementType];
        if (!elementData) return;

        // Update stats
        this.stats.totalActions++;
        this.stats.elementUsage[elementType]++;

        // Apply effects to character
        const result = this.character.updateSkills(elementData.effects);

        // Show feedback
        this.showElementFeedback(elementData, result);

        // Priority system: Quiz > Dilemma > Event (only one triggers per action)
        let triggered = false;

        // Check for quiz trigger FIRST (every 3 actions, increased from 5)
        if (this.quizSystem.shouldTriggerQuiz(this.stats.totalActions)) {
            setTimeout(() => this.quizSystem.showQuiz(), 1000);
            triggered = true;
        }
        // Check for dilemma trigger SECOND (30% random, increased from 20%)
        else if (!this.quizSystem.isQuizActive &&
            (this.dilemmaSystem.shouldTriggerDilemma() || this.dilemmaSystem.shouldTriggerConditional())) {
            setTimeout(() => this.dilemmaSystem.showDilemma(), 1200);
            triggered = true;
        }
        // Try to trigger random event LAST PRIORITY (only if no quiz/dilemma)
        else {
            const eventResult = this.eventSystem.tryTrigger();
            if (eventResult) {
                this.stats.eventsTriggered++;
                this.showEventNotification(eventResult.event);
                triggered = true;
            }
        }

        // Check for achievements
        this.checkAchievements();

        // Update UI
        this.updateUI();

        // Check for state transformation
        if (result.transformed) {
            this.stats.transformations++;
            this.showTransformationAnimation(result.previousState, result.newState);

            // Add transformation to activity log
            const activityLog = document.getElementById('action-log');
            if (activityLog) {
                const logEntry = document.createElement('div');
                logEntry.className = 'action-feedback animate-slide-in';

                logEntry.innerHTML = `
                    <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 shadow-md border-l-4 border-green-500 dark:border-green-400 mb-2">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="material-symbols-outlined text-sm text-green-600 dark:text-green-400">${result.newState.icon}</span>
                            <span class="font-semibold text-sm text-slate-900 dark:text-white">🎉 Biến đổi: ${result.newState.name}</span>
                        </div>
                        <div class="text-xs text-slate-600 dark:text-gray-400">
                            ${result.newState.description}
                        </div>
                    </div>
                `;

                activityLog.insertBefore(logEntry, activityLog.firstChild);
            }
        }

        // Check for completion
        if (this.character.quantityLevel >= 100) {
            setTimeout(() => this.showCompletionModal(), 1000);
        }
    }

    handleStateTransformation(oldState, newState) {
        // Show transformation animation and message
        this.showTransformationModal(oldState, newState);

        // Play animation
        this.playTransformationAnimation();
    }

    showElementFeedback(elementData, result) {
        const feedbackContainer = document.getElementById('action-log');
        const feedback = document.createElement('div');
        feedback.className = 'action-feedback animate-slide-in';

        // Define which effects to show for each element (matching card display)
        const displayPriority = {
            study: ['quantity', 'knowledge'],
            time: ['quantity'],
            perseverance: ['quantity', 'mentalHealth'],
            pressure: ['quantity', 'mentalHealth'],
            social: ['softSkills', 'mentalHealth'],
            rest: ['mentalHealth'],
            parttime: ['softSkills', 'knowledge'],
            entertainment: ['mentalHealth'],
            socialmedia: ['softSkills', 'creativity'],
            selfstudy: ['quantity', 'creativity'],
            sports: ['mentalHealth', 'softSkills'],
            club: ['quantity', 'softSkills'],
            familyvisit: ['mentalHealth', 'softSkills'],
            volunteering: ['softSkills', 'mentalHealth'],
            community: ['softSkills', 'creativity'],
            cooking: ['creativity', 'mentalHealth']
        };

        const effects = [];

        // Show ALL non-zero effects (not just priority stats)
        Object.keys(elementData.effects).forEach(key => {
            const value = elementData.effects[key];
            if (value !== 0) {
                const sign = value > 0 ? '+' : '';
                const label = this.getEffectLabel(key);
                const color = value > 0 ? 'text-green-600' : 'text-red-600';
                effects.push(`<span class="${color}">${sign}${value} ${label}</span>`);
            }
        });

        feedback.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md border border-gray-200 dark:border-gray-700 mb-2">
        <div class="flex items-center gap-2 mb-1">
          <span class="material-symbols-outlined text-sm" style="color: ${elementData.color}">${elementData.icon}</span>
          <span class="font-semibold text-sm text-slate-900 dark:text-white">${elementData.name}</span>
        </div>
        <div class="text-xs text-slate-600 dark:text-gray-400">
          ${effects.join(', ')}
        </div>
      </div>
    `;

        feedbackContainer.insertBefore(feedback, feedbackContainer.firstChild);

        // Keep all feedbacks (no limit)

        // Show tip
        this.showTip(elementData.tip);
    }

    getEffectLabel(key) {
        const labels = {
            quantity: 'Lượng',
            knowledge: 'Tri thức',
            softSkills: 'Kỹ năng mềm',
            creativity: 'Sáng tạo',
            mentalHealth: 'Tinh thần'
        };
        return labels[key] || key;
    }

    showEventNotification(event) {
        const container = document.getElementById('event-notifications');
        const notification = document.createElement('div');
        notification.className = 'event-notification animate-bounce-in';

        notification.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg mb-3 min-w-[360px] border-0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-orange-500 text-2xl flex-shrink-0">${event.icon}</span>
          <div class="flex-1">
            <div class="font-semibold text-base text-slate-900 dark:text-white mb-0.5">${event.name}</div>
            <div class="text-sm text-slate-600 dark:text-gray-400">${event.message}</div>
          </div>
        </div>
      </div>
    `;

        container.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showTip(tip) {
        const tipElement = document.getElementById('current-tip');
        tipElement.textContent = tip;
        tipElement.classList.add('animate-pulse');
        setTimeout(() => tipElement.classList.remove('animate-pulse'), 2000);
    }

    checkAchievements() {
        const currentStats = {
            totalActions: this.stats.totalActions,
            quantity: this.character.quantityLevel,
            transformations: this.stats.transformations,
            eventsTriggered: this.stats.eventsTriggered,
            elementUsage: this.stats.elementUsage,
            skills: this.character.skills
        };

        const newAchievements = this.achievementSystem.checkAchievements(currentStats);

        newAchievements.forEach(achievement => {
            this.showAchievementNotification(achievement);
        });
    }

    showAchievementNotification(achievement) {
        const container = document.getElementById('achievement-container');
        const notification = document.createElement('div');
        notification.className = 'achievement-unlock-badge';

        notification.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-xl border-2 border-primary flex items-center gap-2 max-w-xs">
        <span class="material-symbols-outlined text-xl flex-shrink-0 text-primary">${achievement.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-xs truncate text-slate-900 dark:text-white">🏆 ${achievement.name}</div>
        </div>
      </div>
    `;

        container.appendChild(notification);

        // Play sound or animation
        this.playAchievementAnimation(notification);

        // Update achievements display
        this.updateAchievementsDisplay();
    }

    playAchievementAnimation(element) {
        element.style.animation = 'bounce-in 0.6s ease-out';
        setTimeout(() => {
            element.style.animation = 'fade-out 0.5s ease-in';
            setTimeout(() => element.remove(), 500);
        }, 5000);
    }

    updateUI() {
        this.updateCharacterDisplay();
        this.updateQuantityBar();
        this.updateSkillBars();
        this.updateStatsDisplay();
    }

    updateCharacterDisplay() {
        const state = this.character.currentState;

        document.getElementById('character-state-name').textContent = state.name;
        document.getElementById('character-state-description').textContent = state.description;
        document.getElementById('character-state-icon').textContent = state.icon;
        document.getElementById('character-state-icon').style.color = state.color;

        // Update semester
        const semester = this.character.getCurrentSemester();
        document.getElementById('current-semester').textContent = `Kỳ ${semester}`;
    }

    updateQuantityBar() {
        const quantity = this.character.quantityLevel;
        const bar = document.getElementById('quantity-bar-fill');
        const percentage = document.getElementById('quantity-percentage');

        bar.style.width = `${quantity}%`;
        percentage.textContent = `${Math.round(quantity)}%`;

        // Update color based on level
        if (quantity >= 80) {
            bar.className = 'h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500';
        } else if (quantity >= 60) {
            bar.className = 'h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500';
        } else if (quantity >= 30) {
            bar.className = 'h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500';
        } else {
            bar.className = 'h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500';
        }
    }

    updateSkillBars() {
        Object.entries(this.character.skills).forEach(([skill, value]) => {
            const bar = document.getElementById(`skill-${skill}-fill`);
            const text = document.getElementById(`skill-${skill}-value`);

            if (bar && text) {
                bar.style.width = `${value}%`;
                text.textContent = Math.round(value);

                // Update color
                if (value >= 80) bar.style.backgroundColor = '#10b981';
                else if (value >= 60) bar.style.backgroundColor = '#3b82f6';
                else if (value >= 40) bar.style.backgroundColor = '#f59e0b';
                else bar.style.backgroundColor = '#ef4444';
            }
        });
    }

    updateStatsDisplay() {
        // Update stats counters
        document.getElementById('stat-actions').textContent = this.stats.totalActions;
        document.getElementById('stat-transformations').textContent = this.stats.transformations;
        document.getElementById('stat-events').textContent = this.stats.eventsTriggered;

        // Update quiz and dilemma counters
        const quizStats = this.quizSystem?.stats || { totalQuizzes: 0 };
        const dilemmaStats = this.dilemmaSystem?.stats || { totalDilemmas: 0 };

        document.getElementById('stat-quizzes').textContent = quizStats.totalQuizzes || 0;
        document.getElementById('stat-dilemmas').textContent = dilemmaStats.totalDilemmas || 0;
    }

    updateAchievementsDisplay() {
        const container = document.getElementById('achievements-list');
        const unlocked = this.achievementSystem.getUnlocked();

        container.innerHTML = unlocked.map(achievement => `
      <div class="achievement-badge bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined" style="color: ${achievement.color}">${achievement.icon}</span>
          <div class="flex-1">
            <div class="font-semibold text-xs text-slate-900 dark:text-white">${achievement.name}</div>
          </div>
        </div>
      </div>
    `).join('');

        // Update completion percentage
        const percentage = this.achievementSystem.getCompletionPercentage();
        document.getElementById('achievement-percentage').textContent = `${percentage}%`;
    }

    showWelcomeMessage() {
        const modal = document.getElementById('welcome-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    showTransformationModal(oldState, newState) {
        const modal = document.getElementById('transformation-modal');
        document.getElementById('old-state-name').textContent = oldState.name;
        document.getElementById('new-state-name').textContent = newState.name;
        document.getElementById('transformation-message').textContent =
            window.PHILOSOPHY_CONTENT.thresholds[newState.minQuantity]?.philosophy || '';

        modal.classList.remove('hidden');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 2000); // Reduced from 4000ms to 2000ms
    }

    showCompletionModal() {
        const modal = document.getElementById('completion-modal');

        // Fill in completion stats
        document.getElementById('final-quantity').textContent = `${Math.round(this.character.quantityLevel)}%`;
        document.getElementById('final-transformations').textContent = this.stats.transformations;
        document.getElementById('final-achievements').textContent =
            `${this.achievementSystem.getUnlocked().length}/${this.achievementSystem.getAllAchievements().length}`;

        modal.classList.remove('hidden');
    }

    playTransformationAnimation() {
        const characterArea = document.getElementById('character-display');
        characterArea.classList.add('transform-animation');
        setTimeout(() => {
            characterArea.classList.remove('transform-animation');
        }, 1000);
    }

    setupEventListeners() {
        // Close welcome modal
        document.getElementById('btn-start-game')?.addEventListener('click', () => {
            document.getElementById('welcome-modal').classList.add('hidden');
        });

        // Reset button  
        document.getElementById('btn-reset')?.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn bắt đầu lại từ đầu?')) {
                this.reset();
            }
        });

        // Save button
        document.getElementById('btn-save')?.addEventListener('click', () => {
            this.save();
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Find the closest modal (either by class or ID containing 'modal')
                const modal = e.target.closest('[id$="-modal"]') || e.target.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    reset() {
        this.character = new CharacterState();
        this.eventSystem = new EventSystem(this.character);
        this.achievementSystem = new AchievementSystem(this.character);

        this.stats = {
            totalActions: 0,
            transformations: 0,
            eventsTriggered: 0,
            elementUsage: {
                study: 0,
                time: 0,
                perseverance: 0,
                pressure: 0,
                social: 0,
                rest: 0
            }
        };

        document.getElementById('action-log').innerHTML = '';
        document.getElementById('achievements-list').innerHTML = '';
        document.getElementById('achievement-percentage').textContent = '0%'; // Reset percentage display

        this.updateUI();
    }

    save() {
        const saveData = {
            character: this.character.export(),
            stats: this.stats,
            events: this.eventSystem.export(),
            achievements: this.achievementSystem.export(),
            quiz: this.quizSystem.export(),
            dilemma: this.dilemmaSystem.export(),
            timestamp: Date.now()
        };

        const json = JSON.stringify(saveData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `development-map-${Date.now()}.json`;
        a.click();

        URL.revokeObjectURL(url);

        alert('✅ Đã lưu tiến trình!');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new DevelopmentMapGame();
});
