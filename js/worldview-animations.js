// Worldview Game - Animation Effects
// Provides visual effects and smooth animations

class WorldviewAnimations {
    constructor() {
        this.setupStyles();
        this.init();
    }

    setupStyles() {
        // Add custom animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-in {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes pulse-glow {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(48, 140, 232, 0.4);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(48, 140, 232, 0);
                }
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }

            @keyframes sparkle {
                0%, 100% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
            }

            @keyframes draw-line {
                from {
                    stroke-dashoffset: 1000;
                }
                to {
                    stroke-dashoffset: 0;
                }
            }

            .float-in {
                animation: float-in 0.5s ease-out forwards;
            }

            .pulse-glow {
                animation: pulse-glow 2s infinite;
            }

            .shake {
                animation: shake 0.5s;
            }

            .confetti-particle {
                position: fixed;
                width: 10px;
                height: 10px;
                pointer-events: none;
                z-index: 9999;
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        // Hook into game events
        this.setupGameHooks();
    }

    setupGameHooks() {
        // Wait for game to be initialized
        const checkGame = setInterval(() => {
            if (window.game) {
                clearInterval(checkGame);
                this.enhanceGameWithAnimations();
            }
        }, 100);
    }

    enhanceGameWithAnimations() {
        const game = window.game;

        // Override createPlacedPiece to add animation
        const originalCreatePlacedPiece = game.createPlacedPiece.bind(game);
        game.createPlacedPiece = (html, category, id, classList, x, y) => {
            originalCreatePlacedPiece(html, category, id, classList, x, y);
            
            // Get the newly created piece
            const pieces = game.placedPieces;
            if (pieces.length > 0) {
                const newPiece = pieces[pieces.length - 1].element;
                
                // Add float-in animation
                newPiece.classList.add('float-in');
                
                // Add sparkle effect
                this.sparkle(newPiece);
                
                // Play sound (if enabled)
                this.playSound('place');
            }
        };

        // Override createConnection to add animation
        const originalDrawConnection = game.drawConnection.bind(game);
        game.drawConnection = (connection) => {
            originalDrawConnection(connection);
            
            // Animate the line
            const lines = game.connectionsSvg.querySelectorAll('line');
            if (lines.length > 0) {
                const newLine = lines[lines.length - 1];
                
                // Calculate line length for animation
                const x1 = parseFloat(newLine.getAttribute('x1'));
                const y1 = parseFloat(newLine.getAttribute('y1'));
                const x2 = parseFloat(newLine.getAttribute('x2'));
                const y2 = parseFloat(newLine.getAttribute('y2'));
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                // Animate stroke
                newLine.style.strokeDasharray = length;
                newLine.style.strokeDashoffset = length;
                newLine.style.animation = 'draw-line 0.5s ease-out forwards';
                
                // Play sound
                this.playSound('connect');
            }
        };

        // Add glow effect to selected pieces
        const originalHandlePieceClick = game.handlePieceClick.bind(game);
        game.handlePieceClick = (piece) => {
            // Remove glow from all pieces
            document.querySelectorAll('.placed-piece').forEach(p => {
                p.classList.remove('pulse-glow');
            });
            
            originalHandlePieceClick(piece);
            
            // Add glow to selected piece
            if (game.selectedPiece) {
                game.selectedPiece.classList.add('pulse-glow');
            }
        };
    }

    sparkle(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create multiple sparkle particles
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'confetti-particle';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.background = this.getRandomColor();
            sparkle.style.animation = `sparkle 0.6s ease-out ${i * 0.05}s`;
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            document.body.appendChild(sparkle);
            
            // Animate position
            setTimeout(() => {
                sparkle.style.left = endX + 'px';
                sparkle.style.top = endY + 'px';
                sparkle.style.transition = 'all 0.6s ease-out';
            }, 10);
            
            // Remove after animation
            setTimeout(() => sparkle.remove(), 700);
        }
    }

    confetti() {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            particle.style.left = '50%';
            particle.style.top = '20%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 200 + Math.random() * 200;
            const endX = window.innerWidth / 2 + Math.cos(angle) * velocity;
            const endY = window.innerHeight / 2 + Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            // Animate
            setTimeout(() => {
                particle.style.left = endX + 'px';
                particle.style.top = endY + 'px';
                particle.style.opacity = '0';
                particle.style.transform = `rotate(${Math.random() * 720}deg)`;
                particle.style.transition = `all ${1 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            }, 10);
            
            // Remove
            setTimeout(() => particle.remove(), 2000);
        }
    }

    shake(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    }

    getRandomColor() {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#f43f5e'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    playSound(type) {
        // Simple beep sounds using Web Audio API
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                return; // Audio not supported
            }
        }

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Different sounds for different actions
        switch (type) {
            case 'place':
                oscillator.frequency.value = 523.25; // C5
                gainNode.gain.value = 0.1;
                oscillator.type = 'sine';
                break;
            case 'connect':
                oscillator.frequency.value = 659.25; // E5
                gainNode.gain.value = 0.1;
                oscillator.type = 'sine';
                break;
            case 'success':
                oscillator.frequency.value = 783.99; // G5
                gainNode.gain.value = 0.15;
                oscillator.type = 'triangle';
                break;
            case 'error':
                oscillator.frequency.value = 220; // A3
                gainNode.gain.value = 0.15;
                oscillator.type = 'sawtooth';
                break;
        }

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }

    // Smooth scroll to element
    smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Highlight element temporarily
    highlight(element, duration = 2000) {
        const originalBorder = element.style.border;
        const originalBoxShadow = element.style.boxShadow;
        
        element.style.border = '3px solid #3b82f6';
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            element.style.border = originalBorder;
            element.style.boxShadow = originalBoxShadow;
        }, duration);
    }

    // Ripple effect
    ripple(element, x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(59, 130, 246, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Animate
        setTimeout(() => {
            ripple.style.width = '200px';
            ripple.style.height = '200px';
            ripple.style.opacity = '0';
            ripple.style.transition = 'all 0.6s ease-out';
        }, 10);
        
        setTimeout(() => ripple.remove(), 700);
    }

    // Particle burst
    particleBurst(x, y, color = '#3b82f6', count = 12) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            
            const angle = (i / count) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.style.left = endX + 'px';
                particle.style.top = endY + 'px';
                particle.style.opacity = '0';
                particle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 10);
            
            setTimeout(() => particle.remove(), 900);
        }
    }

    // Success animation
    showSuccess(message = '🎉 Tuyệt vời!') {
        this.confetti();
        this.playSound('success');
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-2xl p-8 text-center text-2xl font-bold';
        toast.textContent = message;
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
        toast.style.transition = 'all 0.3s ease-out';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Error animation
    showError(message = '❌ Có lỗi xảy ra') {
        this.playSound('error');
        
        const toast = document.createElement('div');
        toast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl shadow-2xl p-8 text-center text-xl font-bold shake';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationEffects = new WorldviewAnimations();
});
