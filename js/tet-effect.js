/**
 * Tet Effect - Falling Blossoms and Greeting
 * Runs on every page load.
 */

(function () {
    // Effect runs on every session/reload


    // Create Overlay
    const overlay = document.createElement('div');
    overlay.id = 'tet-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.9)'; // Red background common for Tet
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.transition = 'opacity 1s ease-out';
    overlay.style.pointerEvents = 'none'; // Allow clicks to pass through as it fades
    overlay.style.overflow = 'hidden';

    // Create content container
    const content = document.createElement('div');
    content.style.textAlign = 'center';
    content.style.zIndex = '10000';
    content.style.color = '#FFD700'; // Gold color
    content.style.fontFamily = "'Cormorant Garamond', 'Playfair Display', serif"; // Elegant font

    // Greeting Text
    const h1 = document.createElement('h1');
    h1.innerText = 'Chúc Mừng Năm Mới';
    h1.style.fontSize = '4rem';
    h1.style.fontWeight = 'bold';
    h1.style.marginBottom = '1rem';
    h1.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    h1.style.opacity = '0';
    h1.style.transform = 'translateY(20px)';
    h1.style.transition = 'all 1s ease-out 0.5s';

    const p = document.createElement('p');
    p.innerText = 'An Khang Thịnh Vượng - Vạn Sự Như Ý';
    p.style.fontSize = '1.5rem';
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    p.style.transition = 'all 1s ease-out 1s';

    content.appendChild(h1);
    content.appendChild(p);
    overlay.appendChild(content);

    // Canvas for falling petals
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    overlay.appendChild(canvas);

    document.body.appendChild(overlay);

    // Trigger text animation
    setTimeout(() => {
        h1.style.opacity = '1';
        h1.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
    }, 100);


    // Petal Animation Logic
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const petals = [];
    const petalColors = ['#FFD700', '#FFA500', '#FFC0CB', '#FF69B4']; // Gold, Orange, Pink, HotPink

    class Petal {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.size = Math.random() * 15 + 10;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.beginPath();
            // Draw a simple petal shape (ellipse-ish)
            ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 50; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // Fade out and remove
    const DURATION = 5000; // Show for 5 seconds
    const FADE_TIME = 1000;

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, FADE_TIME);
    }, DURATION);

})();
