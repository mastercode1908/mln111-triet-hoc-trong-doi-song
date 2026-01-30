// Worldview Game - Challenge System
// Provides scenario-based challenges for engaging gameplay

class WorldviewChallenges {
    constructor() {
        this.challenges = this.initializeChallenges();
        this.currentChallenge = null;
        this.completedChallenges = this.loadProgress();
        this.setupUI();
    }

    initializeChallenges() {
        return [
            {
                id: 'challenge-1',
                title: 'Sinh viên áp lực thi cử',
                icon: 'school',
                difficulty: 'easy',
                scenario: `Bạn là sinh viên năm cuối, sắp thi tốt nghiệp. Áp lực từ gia đình, kỳ vọng của bản thân, và sự cạnh tranh với bạn bè khiến bạn căng thẳng mỗi ngày.
                
Làm sao để vượt qua giai đoạn này mà không mất đi chính mình?`,
                objectives: [
                    'Xây dựng thế giới quan giúp quản lý stress',
                    'Sử dụng ít nhất 4 mảnh ghép',
                    'Tạo ít nhất 3 kết nối'
                ],
                hints: [
                    'Hãy suy nghĩ về mối quan hệ giữa cá nhân và xã hội',
                    'Áp lực có phải là mâu thuẫn cần giải quyết?',
                    'Thành công có nghĩa là gì với bạn?'
                ],
                recommendedPieces: ['dialectical', 'evolution', 'individualism'],
                reward: {
                    achievement: 'stress-master',
                    points: 100
                }
            },
            {
                id: 'challenge-2',
                title: 'Khởi nghiệp thất bại',
                icon: 'trending_down',
                difficulty: 'medium',
                scenario: `Sau 2 năm khởi nghiệp, startup của bạn phải đóng cửa. Tiền bạc mất đi, đội ngũ tan rã, và bạn cảm thấy như một kẻ thất bại.
                
Làm thế nào để đứng dậy và tiếp tục?`,
                objectives: [
                    'Tạo thế giới quan về thất bại và phát triển',
                    'Sử dụng ít nhất 5 mảnh ghép',
                    'Tạo ít nhất 4 kết nối'
                ],
                hints: [
                    'Thất bại có phải là kết thúc?',
                    'Mọi thứ có thay đổi không?',
                    'Cá nhân hay hoàn cảnh quyết định thành công?'
                ],
                recommendedPieces: ['dialectical', 'evolution', 'materialism'],
                reward: {
                    achievement: 'phoenix-rising',
                    points: 150
                }
            },
            {
                id: 'challenge-3',
                title: 'Mâu thuẫn gia đình',
                icon: 'family_restroom',
                difficulty: 'medium',
                scenario: `Cha mẹ bạn muốn bạn theo nghề y, nhưng bạn đam mê nghệ thuật. Mỗi bữa cơm đều trở thành cuộc tranh luận căng thẳng.
                
Làm sao để hòa giải giữa kỳ vọng gia đình và ước mơ cá nhân?`,
                objectives: [
                    'Xây dựng quan điểm về mâu thuẫn cá nhân-xã hội',
                    'Sử dụng ít nhất 4 mảnh ghép',
                    'Tạo ít nhất 3 kết nối có ý nghĩa'
                ],
                hints: [
                    'Mâu thuẫn có thể là động lực?',
                    'Cá nhân và tập thể có thể cân bằng?',
                    'Ý thức hay vật chất quan trọng hơn?'
                ],
                recommendedPieces: ['dialectical', 'individualism', 'collectivism'],
                reward: {
                    achievement: 'harmony-seeker',
                    points: 150
                }
            },
            {
                id: 'challenge-4',
                title: 'Thay đổi khí hậu',
                icon: 'eco',
                difficulty: 'hard',
                scenario: `Trái đất đang nóng lên, thiên tai ngày càng nhiều. Bạn thấy xung đột giữa phát triển kinh tế và bảo vệ môi trường.
                
Làm thế nào để tư duy về vấn đề này?`,
                objectives: [
                    'Tạo thế giới quan về phát triển bền vững',
                    'Sử dụng ít nhất 6 mảnh ghép',
                    'Tạo ít nhất 5 kết nối',
                    'Thể hiện sự cân bằng giữa các quan điểm'
                ],
                hints: [
                    'Phát triển có nghĩa là gì?',
                    'Vật chất và ý thức liên quan thế nào?',
                    'Cá nhân có trách nhiệm gì với tập thể?'
                ],
                recommendedPieces: ['materialism', 'dialectical', 'evolution', 'collectivism'],
                reward: {
                    achievement: 'earth-guardian',
                    points: 200
                }
            },
            {
                id: 'challenge-5',
                title: 'Mất phương hướng cuộc đời',
                icon: 'explore_off',
                difficulty: 'hard',
                scenario: `Bạn 25 tuổi, có công việc ổn định nhưng cảm thấy trống rỗng. Mỗi ngày như nhau, bạn tự hỏi: "Mình đang sống cuộc đời của ai?"
                
Làm sao để tìm lại ý nghĩa?`,
                objectives: [
                    'Xây dựng thế giới quan về ý nghĩa sống',
                    'Sử dụng tất cả 8 mảnh ghép',
                    'Tạo ít nhất 6 kết nối',
                    'Thể hiện hệ tư duy toàn diện'
                ],
                hints: [
                    'Ý nghĩa đến từ đâu?',
                    'Bạn tự tạo ý nghĩa hay tìm thấy nó?',
                    'Cá nhân và xã hội định nghĩa bạn thế nào?'
                ],
                recommendedPieces: ['idealism', 'dialectical', 'evolution', 'individualism'],
                reward: {
                    achievement: 'meaning-finder',
                    points: 250
                }
            }
        ];
    }

    loadProgress() {
        const saved = localStorage.getItem('worldview-challenges-progress');
        return saved ? JSON.parse(saved) : [];
    }

    saveProgress() {
        localStorage.setItem('worldview-challenges-progress', JSON.stringify(this.completedChallenges));
    }

    setupUI() {
        // Add challenge button to sidebar
        const sidebar = document.querySelector('aside');
        if (!sidebar) return;

        const challengeBtn = document.createElement('button');
        challengeBtn.id = 'btn-challenges';
        challengeBtn.className = 'w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-2';
        challengeBtn.innerHTML = `
            <span class="material-symbols-outlined">emoji_events</span>
            Thử Thách
        `;
        challengeBtn.addEventListener('click', () => this.showChallengeModal());

        // Insert before visualize button
        const visualizeBtn = document.getElementById('btn-visualize');
        if (visualizeBtn && visualizeBtn.parentElement) {
            visualizeBtn.parentElement.insertBefore(challengeBtn, visualizeBtn);
        }

        // Create challenge modal
        this.createChallengeModal();
    }

    createChallengeModal() {
        const modal = document.createElement('div');
        modal.id = 'challenge-modal';
        modal.className = 'hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">🎯 Thử Thách Triết Học</h2>
                        <p class="text-sm text-slate-600 dark:text-gray-400">Giải quyết các tình huống thực tế</p>
                    </div>
                    <button id="btn-close-challenge-modal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <span class="material-symbols-outlined text-slate-600 dark:text-gray-400">close</span>
                    </button>
                </div>
                <div id="challenge-content" class="flex-grow overflow-y-auto p-6">
                    <!-- Challenge list or detail will be inserted here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close button
        modal.querySelector('#btn-close-challenge-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    showChallengeModal() {
        const modal = document.getElementById('challenge-modal');
        const content = document.getElementById('challenge-content');
        
        if (this.currentChallenge) {
            this.showChallengeDetail(this.currentChallenge);
        } else {
            this.showChallengeList();
        }
        
        modal.classList.remove('hidden');
    }

    showChallengeList() {
        const content = document.getElementById('challenge-content');
        
        let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        
        this.challenges.forEach(challenge => {
            const isCompleted = this.completedChallenges.includes(challenge.id);
            const difficultyColors = {
                easy: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
                medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
                hard: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            };
            
            html += `
                <div class="challenge-card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border-2 ${isCompleted ? 'border-green-400' : 'border-gray-200 dark:border-gray-700'} hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer group" data-challenge-id="${challenge.id}">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                <span class="material-symbols-outlined text-2xl">${challenge.icon}</span>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">${challenge.title}</h3>
                                <span class="text-xs px-2 py-1 rounded-full ${difficultyColors[challenge.difficulty]} font-medium">${challenge.difficulty === 'easy' ? 'Dễ' : challenge.difficulty === 'medium' ? 'Trung bình' : 'Khó'}</span>
                            </div>
                        </div>
                        ${isCompleted ? '<span class="text-2xl">✅</span>' : ''}
                    </div>
                    <p class="text-sm text-slate-600 dark:text-gray-400 line-clamp-2">${challenge.scenario.split('\n')[0]}</p>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="text-xs text-purple-600 dark:text-purple-400 font-semibold">+${challenge.reward.points} điểm</span>
                        <span class="text-xs text-slate-500 dark:text-gray-500">${challenge.objectives.length} mục tiêu</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        content.innerHTML = html;
        
        // Add click handlers
        content.querySelectorAll('.challenge-card').forEach(card => {
            card.addEventListener('click', () => {
                const challengeId = card.dataset.challengeId;
                const challenge = this.challenges.find(c => c.id === challengeId);
                this.startChallenge(challenge);
            });
        });
    }

    startChallenge(challenge) {
        this.currentChallenge = challenge;
        this.showChallengeDetail(challenge);
        
        // Update UI to show active challenge
        this.updateChallengeIndicator();
    }

    showChallengeDetail(challenge) {
        const content = document.getElementById('challenge-content');
        const isCompleted = this.completedChallenges.includes(challenge.id);
        
        content.innerHTML = `
            <div class="max-w-3xl mx-auto">
                <button id="btn-back-to-list" class="mb-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 text-sm font-medium">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                    Quay lại danh sách
                </button>
                
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 mb-6 border-2 border-purple-200 dark:border-purple-700">
                    <div class="flex items-start gap-4 mb-4">
                        <div class="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white">
                            <span class="material-symbols-outlined text-3xl">${challenge.icon}</span>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">${challenge.title}</h3>
                            <span class="text-xs px-3 py-1 rounded-full ${challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' : challenge.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'} font-medium">${challenge.difficulty === 'easy' ? 'Dễ' : challenge.difficulty === 'medium' ? 'Trung bình' : 'Khó'}</span>
                        </div>
                        ${isCompleted ? '<span class="text-4xl">✅</span>' : ''}
                    </div>
                    
                    <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
                        <h4 class="font-semibold text-slate-900 dark:text-white mb-2">📖 Tình huống:</h4>
                        <p class="text-slate-700 dark:text-gray-300 whitespace-pre-line">${challenge.scenario}</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <h4 class="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined text-purple-600">task_alt</span>
                                Mục tiêu:
                            </h4>
                            <ul class="space-y-1">
                                ${challenge.objectives.map(obj => `<li class="text-sm text-slate-700 dark:text-gray-300">• ${obj}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                            <h4 class="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined text-amber-600">lightbulb</span>
                                Gợi ý:
                            </h4>
                            <ul class="space-y-1">
                                ${challenge.hints.map(hint => `<li class="text-sm text-slate-700 dark:text-gray-300">💡 ${hint}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="flex gap-3">
                    ${!isCompleted ? `
                        <button id="btn-start-challenge" class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                            <span class="material-symbols-outlined">play_arrow</span>
                            Bắt đầu thử thách
                        </button>
                    ` : `
                        <button id="btn-retry-challenge" class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined">refresh</span>
                            Thử lại
                        </button>
                    `}
                    <button id="btn-cancel-challenge" class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl transition-all duration-300">
                        Hủy
                    </button>
                </div>
            </div>
        `;
        
        // Event listeners
        content.querySelector('#btn-back-to-list').addEventListener('click', () => {
            this.showChallengeList();
        });
        
        const startBtn = content.querySelector('#btn-start-challenge') || content.querySelector('#btn-retry-challenge');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.activateChallenge(challenge);
            });
        }
        
        content.querySelector('#btn-cancel-challenge').addEventListener('click', () => {
            document.getElementById('challenge-modal').classList.add('hidden');
        });
    }

    activateChallenge(challenge) {
        // Close modal
        document.getElementById('challenge-modal').classList.add('hidden');
        
        // Clear canvas if needed
        if (window.game && window.game.placedPieces.length > 0) {
            if (!confirm('Bắt đầu thử thách sẽ xóa thế giới quan hiện tại. Tiếp tục?')) {
                return;
            }
            window.game.reset();
        }
        
        // Set current challenge
        this.currentChallenge = challenge;
        
        // Update UI
        this.updateChallengeIndicator();
        
        // Show challenge panel
        this.showChallengePanel();
    }

    updateChallengeIndicator() {
        // Remove existing indicator
        const existing = document.getElementById('challenge-indicator');
        if (existing) existing.remove();
        
        if (!this.currentChallenge) return;
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.id = 'challenge-indicator';
        indicator.className = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold';
        indicator.innerHTML = `
            <span class="material-symbols-outlined text-lg">${this.currentChallenge.icon}</span>
            <span>${this.currentChallenge.title}</span>
            <button id="btn-end-challenge" class="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        `;
        
        // Add to canvas header
        const canvasHeader = document.querySelector('.flex-grow .bg-white');
        if (canvasHeader) {
            const container = canvasHeader.querySelector('.flex');
            if (container) {
                container.appendChild(indicator);
            }
        }
        
        // End challenge button
        indicator.querySelector('#btn-end-challenge').addEventListener('click', () => {
            if (confirm('Kết thúc thử thách?')) {
                this.endChallenge();
            }
        });
    }

    showChallengePanel() {
        // Create floating panel with objectives
        const existing = document.getElementById('challenge-panel');
        if (existing) existing.remove();
        
        const panel = document.createElement('div');
        panel.id = 'challenge-panel';
        panel.className = 'fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-w-sm border-2 border-purple-400 dark:border-purple-600 z-30';
        panel.innerHTML = `
            <h4 class="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-purple-600">task_alt</span>
                Mục tiêu
            </h4>
            <ul class="space-y-2">
                ${this.currentChallenge.objectives.map((obj, i) => `
                    <li class="flex items-start gap-2 text-sm">
                        <input type="checkbox" id="obj-${i}" class="mt-1 rounded" disabled>
                        <label for="obj-${i}" class="text-slate-700 dark:text-gray-300">${obj}</label>
                    </li>
                `).join('')}
            </ul>
            <button id="btn-submit-challenge" class="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">check_circle</span>
                Hoàn thành
            </button>
        `;
        
        document.body.appendChild(panel);
        
        // Submit button
        panel.querySelector('#btn-submit-challenge').addEventListener('click', () => {
            this.submitChallenge();
        });
        
        // Update objectives as user builds
        this.updateObjectives();
    }

    updateObjectives() {
        if (!this.currentChallenge || !window.game) return;
        
        const panel = document.getElementById('challenge-panel');
        if (!panel) return;
        
        const pieces = window.game.placedPieces.length;
        const connections = window.game.connections.length;
        
        // Check each objective
        this.currentChallenge.objectives.forEach((obj, i) => {
            const checkbox = panel.querySelector(`#obj-${i}`);
            if (!checkbox) return;
            
            let completed = false;
            
            // Simple objective checking
            if (obj.includes('4 mảnh ghép') && pieces >= 4) completed = true;
            if (obj.includes('5 mảnh ghép') && pieces >= 5) completed = true;
            if (obj.includes('6 mảnh ghép') && pieces >= 6) completed = true;
            if (obj.includes('8 mảnh ghép') && pieces >= 8) completed = true;
            if (obj.includes('3 kết nối') && connections >= 3) completed = true;
            if (obj.includes('4 kết nối') && connections >= 4) completed = true;
            if (obj.includes('5 kết nối') && connections >= 5) completed = true;
            if (obj.includes('6 kết nối') && connections >= 6) completed = true;
            
            checkbox.checked = completed;
        });
    }

    submitChallenge() {
        if (!this.currentChallenge || !window.game) return;
        
        // Check if objectives are met
        const pieces = window.game.placedPieces.length;
        const connections = window.game.connections.length;
        
        let allCompleted = true;
        this.currentChallenge.objectives.forEach(obj => {
            if (obj.includes('4 mảnh ghép') && pieces < 4) allCompleted = false;
            if (obj.includes('5 mảnh ghép') && pieces < 5) allCompleted = false;
            if (obj.includes('6 mảnh ghép') && pieces < 6) allCompleted = false;
            if (obj.includes('8 mảnh ghép') && pieces < 8) allCompleted = false;
            if (obj.includes('3 kết nối') && connections < 3) allCompleted = false;
            if (obj.includes('4 kết nối') && connections < 4) allCompleted = false;
            if (obj.includes('5 kết nối') && connections < 5) allCompleted = false;
            if (obj.includes('6 kết nối') && connections < 6) allCompleted = false;
        });
        
        if (!allCompleted) {
            alert('Chưa hoàn thành tất cả mục tiêu!');
            return;
        }
        
        // Mark as completed
        if (!this.completedChallenges.includes(this.currentChallenge.id)) {
            this.completedChallenges.push(this.currentChallenge.id);
            this.saveProgress();
            
            // Trigger achievement
            if (window.achievementSystem) {
                window.achievementSystem.unlock(this.currentChallenge.reward.achievement);
            }
            
            // Show success with AI analysis
            if (window.aiAnalysis) {
                window.aiAnalysis.analyzeChallengeCompletion(this.currentChallenge, window.game.getGameState());
            }
        }
        
        this.endChallenge();
        alert(`🎉 Hoàn thành thử thách "${this.currentChallenge.title}"!\n+${this.currentChallenge.reward.points} điểm`);
    }

    endChallenge() {
        this.currentChallenge = null;
        
        // Remove UI elements
        const indicator = document.getElementById('challenge-indicator');
        const panel = document.getElementById('challenge-panel');
        if (indicator) indicator.remove();
        if (panel) panel.remove();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.challengeSystem = new WorldviewChallenges();
    
    // Hook into game to update objectives
    if (window.game) {
        const originalUpdateStats = window.game.updateStats.bind(window.game);
        window.game.updateStats = function() {
            originalUpdateStats();
            if (window.challengeSystem) {
                window.challengeSystem.updateObjectives();
            }
        };
    }
});
