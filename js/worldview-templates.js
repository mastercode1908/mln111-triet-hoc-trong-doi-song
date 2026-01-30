// Worldview Game - Templates & Examples
// Pre-built worldview templates for learning

class WorldviewTemplates {
    constructor() {
        this.templates = this.initializeTemplates();
        this.setupUI();
    }

    initializeTemplates() {
        return [
            {
                id: 'marx',
                name: 'Chủ nghĩa Mác',
                description: 'Duy vật biện chứng, chủ nghĩa tập thể',
                icon: '⚒️',
                difficulty: 'medium',
                pieces: [
                    { conceptId: 'materialism', category: 'matter_consciousness', x: 200, y: 100 },
                    { conceptId: 'dialectical', category: 'contradiction', x: 400, y: 100 },
                    { conceptId: 'evolution', category: 'development', x: 600, y: 100 },
                    { conceptId: 'collectivism', category: 'individual_society', x: 400, y: 250 }
                ],
                connections: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 0, to: 3 }
                ],
                explanation: `Chủ nghĩa Mác-Lênin dựa trên 4 trụ cột:
                
1. **Duy vật**: Vật chất quyết định ý thức
2. **Biện chứng**: Mâu thuẫn là động lực phát triển
3. **Tiến hóa**: Xã hội phát triển qua các giai đoạn
4. **Tập thể**: Lợi ích chung quan trọng hơn cá nhân`
            },
            {
                id: 'stoic',
                name: 'Khắc kỷ (Stoicism)',
                description: 'Chấp nhận số phận, tự chủ cá nhân',
                icon: '🏛️',
                difficulty: 'easy',
                pieces: [
                    { conceptId: 'materialism', category: 'matter_consciousness', x: 300, y: 150 },
                    { conceptId: 'static', category: 'development', x: 500, y: 150 },
                    { conceptId: 'individualism', category: 'individual_society', x: 400, y: 280 }
                ],
                connections: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 }
                ],
                explanation: `Triết học Khắc kỷ nhấn mạnh:
                
1. **Duy vật**: Chấp nhận thực tại khách quan
2. **Tĩnh tại**: Có những điều không thể thay đổi
3. **Cá nhân**: Tập trung vào điều mình kiểm soát được`
            },
            {
                id: 'buddha',
                name: 'Phật giáo',
                description: 'Duy tâm, vô thường, trung đạo',
                icon: '☸️',
                difficulty: 'medium',
                pieces: [
                    { conceptId: 'idealism', category: 'matter_consciousness', x: 250, y: 120 },
                    { conceptId: 'dialectical', category: 'contradiction', x: 450, y: 120 },
                    { conceptId: 'evolution', category: 'development', x: 350, y: 250 }
                ],
                connections: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 0, to: 2 }
                ],
                explanation: `Triết học Phật giáo dựa trên:
                
1. **Duy tâm**: Tâm tạo ra thực tại
2. **Biện chứng**: Trung đạo, cân bằng
3. **Vô thường**: Mọi thứ đều thay đổi`
            },
            {
                id: 'existentialist',
                name: 'Hiện sinh luận',
                description: 'Tự do cá nhân, tự tạo ý nghĩa',
                icon: '🎭',
                difficulty: 'hard',
                pieces: [
                    { conceptId: 'idealism', category: 'matter_consciousness', x: 200, y: 100 },
                    { conceptId: 'individualism', category: 'individual_society', x: 400, y: 100 },
                    { conceptId: 'evolution', category: 'development', x: 600, y: 100 },
                    { conceptId: 'dialectical', category: 'contradiction', x: 400, y: 250 }
                ],
                connections: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 3, to: 0 }
                ],
                explanation: `Hiện sinh luận nhấn mạnh:
                
1. **Duy tâm**: Ý thức tạo ra bản chất
2. **Cá nhân**: Tự do và trách nhiệm cá nhân
3. **Tiến hóa**: Tự tạo ra chính mình
4. **Biện chứng**: Sống trong mâu thuẫn`
            },
            {
                id: 'confucius',
                name: 'Nho giáo',
                description: 'Đạo đức, trật tự xã hội, truyền thống',
                icon: '📜',
                difficulty: 'easy',
                pieces: [
                    { conceptId: 'idealism', category: 'matter_consciousness', x: 300, y: 120 },
                    { conceptId: 'collectivism', category: 'individual_society', x: 500, y: 120 },
                    { conceptId: 'static', category: 'development', x: 400, y: 250 }
                ],
                connections: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 0, to: 2 }
                ],
                explanation: `Nho giáo dựa trên:
                
1. **Duy tâm**: Đạo đức và lễ nghĩa
2. **Tập thể**: Trật tự xã hội, gia đình
3. **Tĩnh tại**: Tôn trọng truyền thống`
            }
        ];
    }

    setupUI() {
        // Add templates button to sidebar
        const sidebar = document.querySelector('aside');
        if (!sidebar) return;

        const templatesBtn = document.createElement('button');
        templatesBtn.id = 'btn-templates';
        templatesBtn.className = 'w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-2';
        templatesBtn.innerHTML = `
            <span class="material-symbols-outlined">library_books</span>
            Mẫu Triết Học
        `;
        templatesBtn.addEventListener('click', () => this.showTemplatesModal());

        // Insert after achievements button
        const achievementsBtn = document.getElementById('btn-achievements');
        if (achievementsBtn && achievementsBtn.parentElement) {
            achievementsBtn.parentElement.insertBefore(templatesBtn, achievementsBtn.nextSibling);
        }

        // Create templates modal
        this.createTemplatesModal();
    }

    createTemplatesModal() {
        const modal = document.createElement('div');
        modal.id = 'templates-modal';
        modal.className = 'hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">📚 Mẫu Triết Học</h2>
                        <p class="text-sm text-slate-600 dark:text-gray-400">Học hỏi từ các trường phái nổi tiếng</p>
                    </div>
                    <button id="btn-close-templates-modal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <span class="material-symbols-outlined text-slate-600 dark:text-gray-400">close</span>
                    </button>
                </div>
                <div id="templates-content" class="flex-grow overflow-y-auto p-6">
                    <!-- Templates will be inserted here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close button
        modal.querySelector('#btn-close-templates-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    showTemplatesModal() {
        const modal = document.getElementById('templates-modal');
        const content = document.getElementById('templates-content');

        let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';

        this.templates.forEach(template => {
            const difficultyColors = {
                easy: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
                medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
                hard: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            };

            html += `
                <div class="template-card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer group" data-template-id="${template.id}">
                    <div class="flex items-start gap-4 mb-4">
                        <div class="text-4xl group-hover:scale-110 transition-transform">${template.icon}</div>
                        <div class="flex-1">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">${template.name}</h3>
                            <span class="text-xs px-2 py-1 rounded-full ${difficultyColors[template.difficulty]} font-medium">${template.difficulty === 'easy' ? 'Dễ' : template.difficulty === 'medium' ? 'Trung bình' : 'Khó'}</span>
                        </div>
                    </div>
                    <p class="text-sm text-slate-600 dark:text-gray-400 mb-4">${template.description}</p>
                    <div class="flex items-center justify-between text-xs text-slate-500 dark:text-gray-500">
                        <span>${template.pieces.length} mảnh ghép</span>
                        <span>${template.connections.length} kết nối</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        content.innerHTML = html;

        // Add click handlers
        content.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.dataset.templateId;
                const template = this.templates.find(t => t.id === templateId);
                this.showTemplateDetail(template);
            });
        });

        modal.classList.remove('hidden');
    }

    showTemplateDetail(template) {
        const content = document.getElementById('templates-content');

        content.innerHTML = `
            <div class="max-w-3xl mx-auto">
                <button id="btn-back-to-templates" class="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 text-sm font-medium">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                    Quay lại danh sách
                </button>

                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 mb-6 border-2 border-blue-200 dark:border-blue-700">
                    <div class="flex items-start gap-4 mb-4">
                        <div class="text-6xl">${template.icon}</div>
                        <div class="flex-1">
                            <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">${template.name}</h3>
                            <p class="text-slate-600 dark:text-gray-400 mb-4">${template.description}</p>
                            <div class="flex gap-2">
                                <span class="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium">${template.pieces.length} mảnh ghép</span>
                                <span class="text-xs px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 font-medium">${template.connections.length} kết nối</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 class="font-semibold text-slate-900 dark:text-white mb-2">📖 Giải thích:</h4>
                        <p class="text-sm text-slate-700 dark:text-gray-300 whitespace-pre-line">${template.explanation}</p>
                    </div>
                </div>

                <div class="flex gap-3">
                    <button id="btn-load-template" class="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                        <span class="material-symbols-outlined">download</span>
                        Tải mẫu này
                    </button>
                    <button id="btn-remix-template" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined">auto_fix_high</span>
                        Remix
                    </button>
                </div>
            </div>
        `;

        // Event listeners
        content.querySelector('#btn-back-to-templates').addEventListener('click', () => {
            this.showTemplatesModal();
        });

        content.querySelector('#btn-load-template').addEventListener('click', () => {
            this.loadTemplate(template);
        });

        content.querySelector('#btn-remix-template').addEventListener('click', () => {
            this.loadTemplate(template, true);
        });
    }

    loadTemplate(template, remix = false) {
        if (!window.game) return;

        // Clear canvas if needed
        if (window.game.placedPieces.length > 0) {
            if (!confirm(remix ? 'Remix sẽ xóa thế giới quan hiện tại. Tiếp tục?' : 'Tải mẫu sẽ xóa thế giới quan hiện tại. Tiếp tục?')) {
                return;
            }
            window.game.reset();
        }

        // Close modal
        document.getElementById('templates-modal').classList.add('hidden');

        // Load pieces
        template.pieces.forEach((pieceData, index) => {
            // Find the piece in sidebar
            const sidebarPiece = document.querySelector(`[data-concept-id="${pieceData.conceptId}"]`);
            if (!sidebarPiece) return;

            const html = sidebarPiece.innerHTML;
            const category = pieceData.category;
            const id = pieceData.conceptId;
            const classList = sidebarPiece.className;

            // Add some randomness if remixing
            let x = pieceData.x;
            let y = pieceData.y;
            if (remix) {
                x += (Math.random() - 0.5) * 100;
                y += (Math.random() - 0.5) * 100;
            }

            setTimeout(() => {
                window.game.createPlacedPiece(html, category, id, classList, x, y);

                // Create connections after all pieces are placed
                if (index === template.pieces.length - 1) {
                    setTimeout(() => {
                        template.connections.forEach(conn => {
                            const piece1Id = window.game.placedPieces[conn.from].id;
                            const piece2Id = window.game.placedPieces[conn.to].id;
                            window.game.createConnection(piece1Id, piece2Id);
                        });
                    }, 500);
                }
            }, index * 200); // Stagger the placement
        });

        // Show success message
        if (window.animationEffects) {
            setTimeout(() => {
                window.animationEffects.showSuccess(remix ? '🎨 Remix thành công!' : '📚 Đã tải mẫu!');
            }, template.pieces.length * 200 + 1000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.templateSystem = new WorldviewTemplates();
});
