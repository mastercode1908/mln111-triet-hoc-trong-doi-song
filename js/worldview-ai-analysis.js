// Worldview Game - AI Analysis & Feedback
// Provides intelligent analysis and personalized feedback

class WorldviewAIAnalysis {
    constructor() {
        this.philosopherProfiles = this.initializePhilosophers();
        this.setupUI();
    }

    initializePhilosophers() {
        return {
            marx: {
                name: 'Karl Marx',
                traits: ['materialism', 'dialectical', 'collectivism', 'evolution'],
                description: 'Chủ nghĩa duy vật biện chứng, tập thể chủ nghĩa'
            },
            kant: {
                name: 'Immanuel Kant',
                traits: ['idealism', 'metaphysical', 'individualism'],
                description: 'Duy tâm siêu nghiệm, lý tính thuần túy'
            },
            buddha: {
                name: 'Đức Phật',
                traits: ['idealism', 'dialectical', 'evolution'],
                description: 'Duy tâm, vô thường, trung đạo'
            },
            stoic: {
                name: 'Khắc kỷ (Stoicism)',
                traits: ['materialism', 'static', 'individualism'],
                description: 'Chấp nhận số phận, tự chủ cá nhân'
            },
            existentialist: {
                name: 'Hiện sinh luận',
                traits: ['idealism', 'individualism', 'evolution'],
                description: 'Tự do cá nhân, tự tạo ý nghĩa'
            },
            confucius: {
                name: 'Khổng Tử',
                traits: ['idealism', 'collectivism', 'static'],
                description: 'Đạo đức, trật tự xã hội, truyền thống'
            }
        };
    }

    setupUI() {
        // AI Analysis will be triggered from visualization or challenge completion
    }

    analyzeWorldview(pieces, connections) {
        const analysis = {
            coherence: this.calculateCoherence(pieces, connections),
            contradictions: this.findContradictions(pieces),
            strengths: this.identifyStrengths(pieces, connections),
            suggestions: this.generateSuggestions(pieces, connections),
            philosopherMatch: this.matchPhilosopher(pieces),
            personality: this.generatePersonalityInsights(pieces),
            score: 0
        };

        // Calculate overall score
        analysis.score = this.calculateScore(analysis);

        return analysis;
    }

    calculateCoherence(pieces, connections) {
        if (pieces.length === 0) return 0;

        // More connections = more coherent
        const connectionRatio = connections.length / Math.max(1, pieces.length - 1);
        
        // Diversity bonus (using different categories)
        const categories = new Set(pieces.map(p => p.category));
        const diversityBonus = categories.size / 4; // 4 total categories

        const coherence = Math.min(100, (connectionRatio * 50 + diversityBonus * 50));
        
        return Math.round(coherence);
    }

    findContradictions(pieces) {
        const contradictions = [];
        const conceptIds = pieces.map(p => p.conceptId);

        // Check for logical contradictions
        if (conceptIds.includes('materialism') && conceptIds.includes('idealism')) {
            contradictions.push({
                type: 'logical',
                severity: 'high',
                message: 'Duy vật và Duy tâm là hai quan điểm đối lập về nguồn gốc của thế giới',
                suggestion: 'Hãy chọn một quan điểm chủ đạo, hoặc tìm cách hòa giải (như Biện chứng)'
            });
        }

        if (conceptIds.includes('evolution') && conceptIds.includes('static')) {
            contradictions.push({
                type: 'logical',
                severity: 'medium',
                message: 'Tiến hóa và Tĩnh tại mâu thuẫn về bản chất của sự phát triển',
                suggestion: 'Xem xét: Có thứ gì thực sự bất biến không?'
            });
        }

        if (conceptIds.includes('individualism') && conceptIds.includes('collectivism')) {
            contradictions.push({
                type: 'tension',
                severity: 'low',
                message: 'Cá nhân và Tập thể có thể tạo ra căng thẳng, nhưng cũng có thể cân bằng',
                suggestion: 'Đây có thể là mâu thuẫn sáng tạo - hãy khám phá sự cân bằng'
            });
        }

        return contradictions;
    }

    identifyStrengths(pieces, connections) {
        const strengths = [];
        const conceptIds = pieces.map(p => p.conceptId);

        // Dialectical thinking
        if (conceptIds.includes('dialectical')) {
            strengths.push({
                title: 'Tư duy biện chứng',
                description: 'Bạn nhìn nhận mâu thuẫn như động lực phát triển',
                icon: 'sync'
            });
        }

        // Evolutionary mindset
        if (conceptIds.includes('evolution')) {
            strengths.push({
                title: 'Tư duy phát triển',
                description: 'Bạn tin vào sự thay đổi và tiến bộ',
                icon: 'trending_up'
            });
        }

        // Balanced view
        if (conceptIds.includes('individualism') && conceptIds.includes('collectivism')) {
            strengths.push({
                title: 'Cân bằng cá nhân-xã hội',
                description: 'Bạn tìm kiếm sự hài hòa giữa tự do cá nhân và trách nhiệm xã hội',
                icon: 'balance'
            });
        }

        // Comprehensive worldview
        if (pieces.length >= 6) {
            strengths.push({
                title: 'Thế giới quan toàn diện',
                description: 'Bạn xem xét nhiều khía cạnh của thực tại',
                icon: 'psychology'
            });
        }

        // Well-connected
        if (connections.length >= pieces.length) {
            strengths.push({
                title: 'Tư duy hệ thống',
                description: 'Bạn nhìn thấy mối liên hệ giữa các khái niệm',
                icon: 'hub'
            });
        }

        return strengths;
    }

    generateSuggestions(pieces, connections) {
        const suggestions = [];
        const conceptIds = pieces.map(p => p.conceptId);
        const categories = new Set(pieces.map(p => p.category));

        // Suggest missing categories
        if (!categories.has('matter_consciousness')) {
            suggestions.push({
                type: 'add',
                message: 'Thêm quan điểm về Vật chất - Ý thức để làm rõ nền tảng thế giới quan',
                pieces: ['materialism', 'idealism']
            });
        }

        if (!categories.has('contradiction')) {
            suggestions.push({
                type: 'add',
                message: 'Thêm quan điểm về Mâu thuẫn để hiểu cách giải quyết xung đột',
                pieces: ['dialectical', 'metaphysical']
            });
        }

        // Suggest more connections
        if (connections.length < pieces.length / 2) {
            suggestions.push({
                type: 'connect',
                message: 'Tạo thêm kết nối giữa các khái niệm để thế giới quan mạch lạc hơn'
            });
        }

        // Suggest resolving contradictions
        const contradictions = this.findContradictions(pieces);
        if (contradictions.length > 0 && contradictions[0].severity === 'high') {
            suggestions.push({
                type: 'resolve',
                message: contradictions[0].suggestion
            });
        }

        return suggestions;
    }

    matchPhilosopher(pieces) {
        const conceptIds = pieces.map(p => p.conceptId);
        let bestMatch = null;
        let bestScore = 0;

        Object.entries(this.philosopherProfiles).forEach(([key, philosopher]) => {
            const matchCount = philosopher.traits.filter(trait => conceptIds.includes(trait)).length;
            const score = matchCount / philosopher.traits.length * 100;

            if (score > bestScore) {
                bestScore = score;
                bestMatch = {
                    ...philosopher,
                    matchScore: Math.round(score)
                };
            }
        });

        return bestMatch;
    }

    generatePersonalityInsights(pieces) {
        const insights = [];
        const conceptIds = pieces.map(p => p.conceptId);

        // Optimism vs Realism
        if (conceptIds.includes('evolution') && conceptIds.includes('dialectical')) {
            insights.push({
                trait: 'Lạc quan tiến bộ',
                description: 'Bạn tin vào khả năng phát triển và vượt qua khó khăn'
            });
        } else if (conceptIds.includes('static')) {
            insights.push({
                trait: 'Thực tế ổn định',
                description: 'Bạn trân trọng sự ổn định và bản chất bất biến'
            });
        }

        // Independence vs Community
        if (conceptIds.includes('individualism')) {
            insights.push({
                trait: 'Độc lập tự chủ',
                description: 'Bạn coi trọng tự do và quyền tự quyết của cá nhân'
            });
        }
        if (conceptIds.includes('collectivism')) {
            insights.push({
                trait: 'Tinh thần cộng đồng',
                description: 'Bạn nhận thức vai trò của xã hội trong cuộc sống'
            });
        }

        // Idealist vs Pragmatist
        if (conceptIds.includes('idealism')) {
            insights.push({
                trait: 'Lý tưởng chủ nghĩa',
                description: 'Bạn tin vào sức mạnh của ý thức và ý chí'
            });
        } else if (conceptIds.includes('materialism')) {
            insights.push({
                trait: 'Thực dụng',
                description: 'Bạn chú trọng điều kiện vật chất và thực tế khách quan'
            });
        }

        return insights;
    }

    calculateScore(analysis) {
        let score = 0;

        // Coherence contributes most
        score += analysis.coherence * 0.4;

        // Strengths add points
        score += analysis.strengths.length * 10;

        // Contradictions reduce score
        const highSeverity = analysis.contradictions.filter(c => c.severity === 'high').length;
        score -= highSeverity * 15;

        // Philosopher match bonus
        if (analysis.philosopherMatch) {
            score += analysis.philosopherMatch.matchScore * 0.2;
        }

        return Math.max(0, Math.min(100, Math.round(score)));
    }

    showAnalysisModal(analysis) {
        // Create or get modal
        let modal = document.getElementById('ai-analysis-modal');
        if (!modal) {
            modal = this.createAnalysisModal();
        }

        const content = modal.querySelector('#ai-analysis-content');
        
        content.innerHTML = `
            <div class="space-y-6">
                <!-- Score Card -->
                <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 text-center border-2 border-purple-200 dark:border-purple-700">
                    <div class="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-2">${analysis.score}</div>
                    <div class="text-sm text-slate-600 dark:text-gray-400">Điểm thế giới quan</div>
                    <div class="mt-4 flex items-center justify-center gap-2">
                        <div class="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-xs">
                            <div class="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000" style="width: ${analysis.score}%"></div>
                        </div>
                        <span class="text-xs text-slate-600 dark:text-gray-400">${analysis.coherence}% mạch lạc</span>
                    </div>
                </div>

                <!-- Philosopher Match -->
                ${analysis.philosopherMatch ? `
                    <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-700">
                        <div class="flex items-start gap-4">
                            <div class="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center text-white text-2xl">
                                🧙‍♂️
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Triết gia tương đồng</h3>
                                <p class="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">${analysis.philosopherMatch.name}</p>
                                <p class="text-sm text-slate-600 dark:text-gray-400 mb-2">${analysis.philosopherMatch.description}</p>
                                <div class="flex items-center gap-2">
                                    <div class="flex-grow bg-amber-200 dark:bg-amber-800 rounded-full h-2">
                                        <div class="bg-amber-600 dark:bg-amber-400 h-2 rounded-full" style="width: ${analysis.philosopherMatch.matchScore}%"></div>
                                    </div>
                                    <span class="text-sm font-semibold text-amber-600 dark:text-amber-400">${analysis.philosopherMatch.matchScore}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Strengths -->
                ${analysis.strengths.length > 0 ? `
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-green-600">thumb_up</span>
                            Điểm mạnh
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${analysis.strengths.map(strength => `
                                <div class="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <span class="material-symbols-outlined text-green-600 dark:text-green-400">${strength.icon}</span>
                                    <div>
                                        <div class="font-semibold text-sm text-slate-900 dark:text-white">${strength.title}</div>
                                        <div class="text-xs text-slate-600 dark:text-gray-400">${strength.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Contradictions -->
                ${analysis.contradictions.length > 0 ? `
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-amber-600">warning</span>
                            Mâu thuẫn cần xem xét
                        </h3>
                        <div class="space-y-3">
                            ${analysis.contradictions.map(contradiction => {
                                const severityColors = {
                                    high: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
                                    medium: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700',
                                    low: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                                };
                                return `
                                    <div class="p-4 rounded-xl border-2 ${severityColors[contradiction.severity]}">
                                        <div class="font-semibold text-sm text-slate-900 dark:text-white mb-1">${contradiction.message}</div>
                                        <div class="text-xs text-slate-600 dark:text-gray-400 italic">💡 ${contradiction.suggestion}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Suggestions -->
                ${analysis.suggestions.length > 0 ? `
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-blue-600">lightbulb</span>
                            Gợi ý cải thiện
                        </h3>
                        <ul class="space-y-2">
                            ${analysis.suggestions.map(suggestion => `
                                <li class="flex items-start gap-2 text-sm text-slate-700 dark:text-gray-300">
                                    <span class="text-blue-600 dark:text-blue-400">•</span>
                                    <span>${suggestion.message}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Personality Insights -->
                ${analysis.personality.length > 0 ? `
                    <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-pink-200 dark:border-pink-700">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-pink-600">psychology</span>
                            Nhân cách triết học
                        </h3>
                        <div class="space-y-3">
                            ${analysis.personality.map(insight => `
                                <div class="flex items-start gap-3">
                                    <div class="w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-400 mt-2"></div>
                                    <div>
                                        <div class="font-semibold text-sm text-slate-900 dark:text-white">${insight.trait}</div>
                                        <div class="text-xs text-slate-600 dark:text-gray-400">${insight.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        modal.classList.remove('hidden');
    }

    createAnalysisModal() {
        const modal = document.createElement('div');
        modal.id = 'ai-analysis-modal';
        modal.className = 'hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">🤖 Phân Tích AI</h2>
                        <p class="text-sm text-slate-600 dark:text-gray-400">Đánh giá thế giới quan của bạn</p>
                    </div>
                    <button id="btn-close-ai-modal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <span class="material-symbols-outlined text-slate-600 dark:text-gray-400">close</span>
                    </button>
                </div>
                <div id="ai-analysis-content" class="flex-grow overflow-y-auto p-6">
                    <!-- Analysis will be inserted here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close button
        modal.querySelector('#btn-close-ai-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });

        return modal;
    }

    analyzeChallengeCompletion(challenge, gameState) {
        const analysis = this.analyzeWorldview(gameState.pieces, gameState.connections);
        
        // Add challenge-specific feedback
        analysis.challengeFeedback = this.generateChallengeFeedback(challenge, gameState);
        
        this.showAnalysisModal(analysis);
    }

    generateChallengeFeedback(challenge, gameState) {
        const conceptIds = gameState.pieces.map(p => p.conceptId);
        const feedback = [];

        // Check if recommended pieces were used
        const usedRecommended = challenge.recommendedPieces.filter(id => conceptIds.includes(id));
        if (usedRecommended.length > 0) {
            feedback.push(`Tốt! Bạn đã sử dụng ${usedRecommended.length}/${challenge.recommendedPieces.length} mảnh ghép được gợi ý.`);
        }

        // Challenge-specific insights
        if (challenge.id === 'challenge-1' && conceptIds.includes('dialectical')) {
            feedback.push('Tuyệt vời! Tư duy biện chứng giúp bạn nhìn nhận áp lực như động lực phát triển.');
        }

        if (challenge.id === 'challenge-2' && conceptIds.includes('evolution')) {
            feedback.push('Đúng hướng! Quan điểm tiến hóa giúp bạn thấy thất bại là bước đệm cho thành công.');
        }

        return feedback;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiAnalysis = new WorldviewAIAnalysis();
});
