// Random Events System
// Simulates life events that affect character development

class EventSystem {
    constructor(characterState) {
        this.character = characterState;
        this.activeEvents = [];
        this.eventHistory = [];
        this.triggerChance = 0.15; // 15% chance per action

        this.events = {
            covid: {
                id: 'covid',
                name: 'Dịch COVID-19',
                icon: 'coronavirus',
                description: 'Học online, áp lực tăng cao',
                color: '#ef4444',
                effects: {
                    quantity: -5,
                    knowledge: -3,
                    softSkills: -5,
                    mentalHealth: -10
                },
                message: '🦠 Dịch COVID ảnh hưởng đến học tập!'
            },

            scholarship: {
                id: 'scholarship',
                name: 'Nhận học bổng',
                icon: 'emoji_events',
                description: 'Động lực tăng mạnh!',
                color: '#10b981',
                effects: {
                    quantity: 15,
                    knowledge: 10,
                    mentalHealth: 10
                },
                message: '🏆 Chúc mừng! Bạn nhận được học bổng!'
            },

            conflict: {
                id: 'conflict',
                name: 'Mâu thuẫn với bạn',
                icon: 'people',
                description: 'Cần giải quyết vấn đề quan hệ',
                color: '#f59e0b',
                effects: {
                    quantity: 2,
                    softSkills: 5,
                    mentalHealth: -8
                },
                message: '😔 Xung đột với bạn, nhưng bạn học được cách giải quyết'
            },

            opportunity: {
                id: 'opportunity',
                name: 'Cơ hội thực tập',
                icon: 'work_outline',
                description: 'Được mời thực tập tại công ty',
                color: '#3b82f6',
                effects: {
                    quantity: 12,
                    knowledge: 8,
                    softSkills: 10,
                    creativity: 5
                },
                message: '💼 Tuyệt vời! Bạn có cơ hội thực tập!'
            },

            competition: {
                id: 'competition',
                name: 'Tham gia cuộc thi',
                icon: 'military_tech',
                description: 'Thử thách bản thân qua cuộc thi',
                color: '#8b5cf6',
                effects: {
                    quantity: 8,
                    creativity: 12,
                    mentalHealth: -5
                },
                message: '🎯 Tham gia cuộc thi - áp lực nhưng rất bổ ích!'
            },

            burnout: {
                id: 'burnout',
                name: 'Kiệt sức',
                icon: 'sentiment_very_dissatisfied',
                description: 'Học quá nhiều không nghỉ ngơi',
                color: '#dc2626',
                effects: {
                    quantity: -8,
                    knowledge: -5,
                    mentalHealth: -15
                },
                message: '😰 Bạn kiệt sức! Cần nghỉ ngơi!',
                condition: (char) => char.skills.mentalHealth < 40
            },

            mentor: {
                id: 'mentor',
                name: 'Gặp người thầy',
                icon: 'school',
                description: 'Được người có kinh nghiệm chỉ dạy',
                color: '#059669',
                effects: {
                    quantity: 10,
                    knowledge: 15,
                    creativity: 8,
                    mentalHealth: 5
                },
                message: '👨‍🏫 Bạn gặp được người thầy tốt!'
            },

            parttime: {
                id: 'parttime',
                name: 'Làm thêm',
                icon: 'attach_money',
                description: 'Kiếm tiền nhưng ảnh hưởng học tập',
                color: '#ca8a04',
                effects: {
                    quantity: 3,
                    knowledge: -5,
                    softSkills: 8,
                    mentalHealth: -5
                },
                message: '💰 Làm thêm giúp bạn trưởng thành, nhưng mất thời gian học'
            },

            failed_exam: {
                id: 'failed_exam',
                name: 'Thi trượt môn',
                icon: 'cancel',
                description: 'Không đạt yêu cầu kỳ thi',
                color: '#dc2626',
                effects: {
                    quantity: -10,
                    knowledge: -8,
                    creativity: -3,
                    mentalHealth: -12
                },
                message: '📉 Thi trượt môn! Cần nỗ lực hơn!'
            },

            breakup: {
                id: 'breakup',
                name: 'Chia tay',
                icon: 'heart_broken',
                description: 'Kết thúc mối quan hệ',
                color: '#be123c',
                effects: {
                    quantity: -5,
                    knowledge: -2,
                    creativity: -5,
                    softSkills: 3,
                    mentalHealth: -20
                },
                message: '💔 Chia tay... Thời gian sẽ chữa lành!'
            },

            illness: {
                id: 'illness',
                name: 'Ốm đau',
                icon: 'sick',
                description: 'Sức khỏe giảm sút',
                color: '#9333ea',
                effects: {
                    quantity: -8,
                    knowledge: -4,
                    creativity: -3,
                    softSkills: -2,
                    mentalHealth: -10
                },
                message: '🤒 Ốm rồi! Cần nghỉ ngơi phục hồi!'
            },

            game_addiction: {
                id: 'game_addiction',
                name: 'Nghiện game',
                icon: 'gamepad',
                description: 'Chơi game quá nhiều, bỏ bê học tập',
                color: '#7c3aed',
                effects: {
                    quantity: -12,
                    knowledge: -10,
                    creativity: 2,
                    softSkills: -5,
                    mentalHealth: -8
                },
                message: '🎮 Nghiện game! Cần tự chủ hơn!',
                condition: (char) => char.skills.mentalHealth < 50
            }
        };
    }

    // Try to trigger a random event
    tryTrigger() {
        if (Math.random() > this.triggerChance) {
            return null;
        }

        // Filter events based on conditions
        const availableEvents = Object.values(this.events).filter(event => {
            // Check if event was recently triggered (cooldown)
            const recent = this.eventHistory.slice(-3).find(e => e.id === event.id);
            if (recent) return false;

            // Check condition if exists
            if (event.condition && !event.condition(this.character)) {
                return false;
            }

            return true;
        });

        if (availableEvents.length === 0) return null;

        // Pick random event
        const event = availableEvents[Math.floor(Math.random() * availableEvents.length)];
        return this.triggerEvent(event);
    }

    // Trigger specific event
    triggerEvent(event) {
        // DISABLED: Events now only show notifications, don't apply effects
        // const result = this.character.updateSkills(event.effects);

        // Mock result for notification display
        const result = {
            transformed: false,
            effects: event.effects
        };

        // Record in history
        this.eventHistory.push({
            ...event,
            timestamp: Date.now(),
            result
        });

        // Dispatch event
        const customEvent = new CustomEvent('randomEventTriggered', {
            detail: { event, result }
        });
        document.dispatchEvent(customEvent);

        // Add to activity log (matching element card format)
        const feedbackContainer = document.getElementById('action-log'); // Fixed: was 'action-feedback'
        if (feedbackContainer) {
            const feedback = document.createElement('div');
            feedback.className = 'action-feedback animate-slide-in';

            // Format effects like element cards
            const effectLabels = {
                quantity: 'Lượng',
                knowledge: 'Tri thức',
                softSkills: 'Kỹ năng mềm',
                creativity: 'Sáng tạo',
                mentalHealth: 'Tinh thần'
            };

            const effectsList = [];
            Object.keys(event.effects).forEach(key => {
                const value = event.effects[key];
                if (value !== 0) {
                    const sign = value > 0 ? '+' : '';
                    const label = effectLabels[key] || key;
                    const color = value > 0 ? 'text-green-600' : 'text-red-600';
                    effectsList.push(`<span class="${color}">${sign}${value} ${label}</span>`);
                }
            });

            feedback.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md border border-gray-200 dark:border-gray-700 mb-2">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-sm text-orange-500">${event.icon}</span>
                        <span class="font-semibold text-sm text-slate-900 dark:text-white">⚠️ ${event.name}</span>
                    </div>
                    <div class="text-xs text-slate-600 dark:text-gray-400">
                        ${event.message}
                    </div>
                    ${effectsList.length > 0 ? `<div class="text-xs mt-1">${effectsList.join(', ')}</div>` : ''}
                </div>
            `;

            feedbackContainer.insertBefore(feedback, feedbackContainer.firstChild);
        }

        return { event, result };
    }

    // Get event by ID
    getEvent(id) {
        return this.events[id];
    }

    // Get event history
    getHistory() {
        return this.eventHistory;
    }

    // Clear history
    clearHistory() {
        this.eventHistory = [];
    }

    // Export state
    export() {
        return {
            eventHistory: this.eventHistory.map(e => ({
                id: e.id,
                timestamp: e.timestamp
            }))
        };
    }

    // Import state
    import(data) {
        this.eventHistory = data.eventHistory || [];
    }
}

// Export for use in main game
if (typeof window !== 'undefined') {
    window.EventSystem = EventSystem;
}
