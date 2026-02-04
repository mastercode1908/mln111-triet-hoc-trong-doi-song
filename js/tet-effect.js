/**
 * Tet Effect - 2026 Year of the Horse
 * Uses fireworks-js library for fireworks
 * Full image display, no auto-close
 */

(function () {
    console.log('✓ Tet Effect script loaded');

    // ========== Overlay ==========
    const overlay = document.createElement('div');
    overlay.id = 'tet-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        background-color: #fdeae4;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;

    // Background image container - CONTAIN to show full image
    const bgContainer = document.createElement('div');
    bgContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('assets/images/tet-2026.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #fdeae4;
    `;
    overlay.appendChild(bgContainer);

    // Fireworks container
    const fireworksContainer = document.createElement('div');
    fireworksContainer.id = 'fireworks-container';
    fireworksContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10002;
    `;
    overlay.appendChild(fireworksContainer);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        color: #e8846e;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        z-index: 10003;
    `;
    closeBtn.onmouseover = () => {
        closeBtn.style.background = '#e8846e';
        closeBtn.style.color = 'white';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'rgba(255,255,255,0.9)';
        closeBtn.style.color = '#e8846e';
    };
    overlay.appendChild(closeBtn);

    // Greeting text at bottom
    const greeting = document.createElement('div');
    greeting.innerHTML = `
        <h1 style="font-size: 3rem; color: #e8846e; margin-bottom: 0.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); font-family: 'Playfair Display', serif;">Chúc Mừng Năm Mới</h1>
        <p style="font-size: 1.3rem; color: #c26e5a;">An Khang Thịnh Vượng • Vạn Sự Như Ý</p>
    `;
    greeting.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-family: 'Lexend', sans-serif;
        opacity: 0;
        transition: opacity 1s ease 0.5s;
        z-index: 10001;
    `;
    overlay.appendChild(greeting);

    // ========== Audio Elements ==========
    // YouTube Music Player (hidden iframe for Ngày Tết Quê Em instrumental)
    const musicContainer = document.createElement('div');
    musicContainer.id = 'tet-music-container';
    musicContainer.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        overflow: hidden;
        pointer-events: none;
    `;
    overlay.appendChild(musicContainer);

    // Firework sound effect - "Chạy đi các cháu ơi"
    const fireworkSound = document.createElement('audio');
    fireworkSound.id = 'firework-sound';
    fireworkSound.volume = 0.6;
    fireworkSound.src = 'https://www.myinstants.com/media/sounds/chay-di-cac-chau-oi.mp3';
    overlay.appendChild(fireworkSound);

    document.body.appendChild(overlay);

    // ========== Fireworks instance ==========
    let fireworksInstance = null;
    let FireworksClass = null;
    let fireworksTimeout = null;
    let youtubePlayer = null;

    // Load fireworks-js from CDN
    function loadFireworksLibrary() {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.Fireworks && window.Fireworks.Fireworks) {
                FireworksClass = window.Fireworks.Fireworks;
                resolve();
                return;
            }
            if (window.Fireworks && typeof window.Fireworks === 'function') {
                FireworksClass = window.Fireworks;
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/fireworks-js@2.x/dist/index.umd.js';
            script.onload = () => {
                console.log('✓ Fireworks-js library loaded', window.Fireworks);
                if (window.Fireworks && window.Fireworks.Fireworks) {
                    FireworksClass = window.Fireworks.Fireworks;
                } else if (window.Fireworks && typeof window.Fireworks === 'function') {
                    FireworksClass = window.Fireworks;
                } else if (window.Fireworks && window.Fireworks.default) {
                    FireworksClass = window.Fireworks.default;
                }
                console.log('✓ FireworksClass:', FireworksClass);
                resolve();
            };
            script.onerror = () => {
                console.error('✗ Failed to load fireworks-js');
                reject();
            };
            document.head.appendChild(script);
        });
    }

    // Load library immediately
    loadFireworksLibrary();

    // ========== Show/Hide Functions ==========
    function startFireworks() {
        if (!FireworksClass) {
            console.warn('Fireworks class not available');
            return;
        }

        // Clean up previous instance completely
        if (fireworksInstance) {
            try {
                fireworksInstance.stop();
                fireworksInstance.clear();
            } catch (e) {
                console.log('Cleanup error (ignored):', e);
            }
            fireworksInstance = null;
        }

        // Clear the container
        fireworksContainer.innerHTML = '';

        try {
            fireworksInstance = new FireworksClass(fireworksContainer, {
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 80,
                traceLength: 3,
                traceSpeed: 10,
                explosion: 6,
                intensity: 40,
                flickering: 50,
                lineStyle: 'round',
                hue: {
                    min: 0,
                    max: 360
                },
                delay: {
                    min: 15,
                    max: 30
                },
                rocketsPoint: {
                    min: 30,
                    max: 70
                },
                lineWidth: {
                    explosion: {
                        min: 1,
                        max: 4
                    },
                    trace: {
                        min: 1,
                        max: 2
                    }
                },
                brightness: {
                    min: 50,
                    max: 80
                },
                decay: {
                    min: 0.015,
                    max: 0.03
                },
                mouse: {
                    click: false,
                    move: false,
                    max: 1
                }
            });

            fireworksInstance.start();
            console.log('✓ Fireworks started');

            // Clear any previous timeout
            if (fireworksTimeout) {
                clearTimeout(fireworksTimeout);
            }

            // Stop fireworks after 10 seconds
            fireworksTimeout = setTimeout(() => {
                if (fireworksInstance) {
                    fireworksInstance.stop();
                    setTimeout(() => {
                        if (fireworksInstance) {
                            fireworksInstance.clear();
                        }
                    }, 1000);
                    console.log('✓ Fireworks stopped');
                }
            }, 10000);
        } catch (e) {
            console.error('Error starting fireworks:', e);
        }
    }

    function showOverlay() {
        console.log('✓ showTetOverlay called');

        overlay.style.display = 'flex';
        void overlay.offsetWidth;
        overlay.style.opacity = '1';
        greeting.style.opacity = '1';

        // Start background music (YouTube embed)
        musicContainer.innerHTML = `
            <iframe 
                id="tet-youtube-player"
                width="1" 
                height="1" 
                src="https://www.youtube.com/embed/-NoDAWr6g9g?autoplay=1&loop=1&playlist=-NoDAWr6g9g" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
        `;

        // Play "Chạy đi các cháu ơi" sound
        fireworkSound.currentTime = 0;
        fireworkSound.play().catch(e => console.log('Audio autoplay blocked:', e));

        // Start fireworks
        if (FireworksClass) {
            startFireworks();
        } else {
            loadFireworksLibrary().then(() => {
                startFireworks();
            }).catch(() => {
                console.error('Could not load fireworks library');
            });
        }
    }

    function hideOverlay() {
        overlay.style.opacity = '0';
        greeting.style.opacity = '0';

        // Stop music
        musicContainer.innerHTML = '';

        // Stop firework sound
        fireworkSound.pause();
        fireworkSound.currentTime = 0;

        // Clear timeout
        if (fireworksTimeout) {
            clearTimeout(fireworksTimeout);
            fireworksTimeout = null;
        }

        // Stop fireworks
        if (fireworksInstance) {
            try {
                fireworksInstance.stop();
                fireworksInstance.clear();
            } catch (e) {
                console.log('Cleanup error (ignored):', e);
            }
            fireworksInstance = null;
        }

        setTimeout(() => {
            overlay.style.display = 'none';
            // Clear container for next time
            fireworksContainer.innerHTML = '';
        }, 500);
    }

    // ========== Export to global scope for header button ==========
    window.showTetOverlay = showOverlay;
    window.hideTetOverlay = hideOverlay;
    console.log('✓ showTetOverlay function exported to window');

    // ========== Event Listeners ==========
    closeBtn.addEventListener('click', hideOverlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            hideOverlay();
        }
    });

})();
