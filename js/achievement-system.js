// Achievement System
// Tracks and rewards player milestones

class AchievementSystem {
    constructor(characterState) {
        this.character = characterState;
        this.unlockedAchievements = [];

        this.achievements = {
            first_drop: {
                id: 'first_drop',
                name: 'Bước đầu tiên',
                description: 'Kéo thành công yếu tố đầu tiên',
                icon: 'flag',
                color: '#3b82f6',
                requirement: (stats) => stats.totalActions >= 1
            },

            quantity_25: {
                id: 'quantity_25',
                name: 'Khởi đầu tốt',
                description: 'Đạt 25% lượng tích lũy',
                icon: 'trending_up',
                color: '#10b981',
                requirement: (stats) => stats.quantity >= 25
            },

            quantity_50: {
                id: 'quantity_50',
                name: 'Giữa chặng đường',
                description: 'Đạt 50% lượng tích lũy',
                icon: 'bolt',
                color: '#f59e0b',
                requirement: (stats) => stats.quantity >= 50
            },

            quantity_75: {
                id: 'quantity_75',
                name: 'Sắp đến đích',
                description: 'Đạt 75% lượng tích lũy',
                icon: 'rocket_launch',
                color: '#ec4899',
                requirement: (stats) => stats.quantity >= 75
            },

            first_transformation: {
                id: 'first_transformation',
                name: 'Bước nhảy lượng - chất',
                description: 'Trải nghiệm biến đổi chất đầu tiên',
                icon: 'auto_awesome',
                color: '#8b5cf6',
                requirement: (stats) => stats.transformations >= 1
            },

            all_transformations: {
                id: 'all_transformations',
                name: 'Hành trình hoàn chỉnh',
                description: 'Trải qua tất cả các giai đoạn phát triển',
                icon: 'workspace_premium',
                color: '#eab308',
                requirement: (stats) => stats.transformations >= 3
            },

            balance_master: {
                id: 'balance_master',
                name: 'Cân bằng hoàn hảo',
                description: '4 chỉ số đều trên 60%',
                icon: 'balance',
                color: '#06b6d4',
                requirement: (stats) => {
                    const skills = stats.skills;
                    return Object.values(skills).every(v => v >= 60);
                }
            },

            knowledge_expert: {
                id: 'knowledge_expert',
                name: 'Tri thức uyên bác',
                description: 'Tri thức đạt 80+',
                icon: 'psychology',
                color: '#3b82f6',
                requirement: (stats) => stats.skills.knowledge >= 80
            },

            social_butterfly: {
                id: 'social_butterfly',
                name: 'Bậc thầy giao tiếp',
                description: 'Kỹ năng mềm đạt 80+',
                icon: 'emoji_people',
                color: '#ec4899',
                requirement: (stats) => stats.skills.softSkills >= 80
            },

            creative_genius: {
                id: 'creative_genius',
                name: 'Thiên tài sáng tạo',
                description: 'Sáng tạo đạt 80+',
                icon: 'palette',
                color: '#f59e0b',
                requirement: (stats) => stats.skills.creativity >= 80
            },

            mental_champion: {
                id: 'mental_champion',
                name: 'Tinh thần vững vàng',
                description: 'Giữ tinh thần trên 90%',
                icon: 'favorite',
                color: '#10b981',
                requirement: (stats) => stats.skills.mentalHealth >= 90
            },

            perseverance_king: {
                id: 'perseverance_king',
                name: 'Người kiên trì',
                description: 'Sử dụng "Kiên trì" 10 lần',
                icon: 'fitness_center',
                color: '#10b981',
                requirement: (stats) => stats.elementUsage.perseverance >= 10
            },

            work_life_balance: {
                id: 'work_life_balance',
                name: 'Cân bằng cuộc sống',
                description: 'Nghỉ ngơi ít nhất 5 lần',
                icon: 'spa',
                color: '#8b5cf6',
                requirement: (stats) => stats.elementUsage.rest >= 5
            },

            event_survivor: {
                id: 'event_survivor',
                name: 'Vượt qua thử thách',
                description: 'Trải qua 5 sự kiện ngẫu nhiên',
                icon: 'verified',
                color: '#059669',
                requirement: (stats) => stats.eventsTriggered >= 5
            },

            ultimate_achievement: {
                id: 'ultimate_achievement',
                name: '🏆 Hoàn thành xuất sắc',
                description: 'Đạt 100% lượng với cân bằng hoàn hảo',
                icon: 'emoji_events',
                color: '#eab308',
                requirement: (stats) => {
                    return stats.quantity >= 100 &&
                        Object.values(stats.skills).every(v => v >= 60);
                }
            }
        };
    }

    // Check and unlock achievements based on current stats
    checkAchievements(stats) {
        const newlyUnlocked = [];

        Object.values(this.achievements).forEach(achievement => {
            // Skip if already unlocked
            if (this.isUnlocked(achievement.id)) return;

            // Check requirement
            if (achievement.requirement(stats)) {
                this.unlock(achievement);
                newlyUnlocked.push(achievement);
            }
        });

        return newlyUnlocked;
    }

    // Unlock an achievement
    unlock(achievement) {
        if (this.isUnlocked(achievement.id)) return false;

        this.unlockedAchievements.push({
            ...achievement,
            unlockedAt: Date.now()
        });

        // Dispatch event
        const event = new CustomEvent('achievementUnlocked', {
            detail: { achievement }
        });
        document.dispatchEvent(event);

        console.log(`🏆 Achievement unlocked: ${achievement.name}`);
        return true;
    }

    // Check if achievement is unlocked
    isUnlocked(achievementId) {
        return this.unlockedAchievements.some(a => a.id === achievementId);
    }

    // Get all unlocked achievements
    getUnlocked() {
        return this.unlockedAchievements;
    }

    // Get completion percentage
    getCompletionPercentage() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.unlockedAchievements.length;
        return Math.round((unlocked / total) * 100);
    }

    // Get achievement by ID
    getAchievement(id) {
        return this.achievements[id];
    }

    // Get all achievements
    getAllAchievements() {
        return Object.values(this.achievements);
    }

    // Reset achievements
    reset() {
        this.unlockedAchievements = [];
    }

    // Export state
    export() {
        return {
            unlockedAchievements: this.unlockedAchievements.map(a => ({
                id: a.id,
                unlockedAt: a.unlockedAt
            }))
        };
    }

    // Import state
    import(data) {
        if (!data.unlockedAchievements) return;

        this.unlockedAchievements = data.unlockedAchievements.map(saved => ({
            ...this.achievements[saved.id],
            unlockedAt: saved.unlockedAt
        })).filter(a => a.id); // Filter out invalid achievements
    }
}

// Export for use in main game
if (typeof window !== 'undefined') {
    window.AchievementSystem = AchievementSystem;
}
