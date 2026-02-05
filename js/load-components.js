/**
 * Loads the header and footer components into the page.
 * Assumes 'header.html' and 'footer.html' are in the same directory as the page or root.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Determine path prefix (handle subdirectories if needed, though structure seems flat for now)
    // Determine path prefix
    const prefix = window.componentPrefix || "";

    // Load Header
    const timestamp = new Date().getTime();
    fetch(prefix + 'header.html?v=' + timestamp)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Fix relative links in header
            if (prefix) {
                const headerLinks = document.querySelectorAll('#header-placeholder a');
                headerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                        link.setAttribute('href', prefix + href);
                    }
                });
                const headerImages = document.querySelectorAll('#header-placeholder img');
                headerImages.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                        img.setAttribute('src', prefix + src);
                    }
                });
            }

            setActiveNavLink();

            // Initialize search AFTER header is loaded
            // Initialize search AFTER header is loaded
            // Dynamically load search scripts if they are not already present
            const scriptPrefix = prefix || '';
            const loadScript = (src) => {
                return new Promise((resolve, reject) => {
                    if (document.querySelector(`script[src="${src}"]`)) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = src;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            };


            // Load search data first, then search init script
            const timestamp = new Date().getTime();
            loadScript(scriptPrefix + 'js/search-data-global.js?v=' + timestamp)
                .then(() => loadScript(scriptPrefix + 'js/search-init.js?v=' + timestamp))
                .then(() => {
                    if (typeof initializeSearch === 'function') {
                        initializeSearch();
                    }
                })
                .catch(err => console.error('Error loading search scripts:', err));

            // Add scroll-based navigation highlighting for home.html
            setupScrollBasedNavigation();

            // Check if we are on a game page and hide floating buttons
            checkAndHideFloatingButtons();
        })
        .catch(error => console.error('Error loading header:', error));

    function checkAndHideFloatingButtons() {
        const currentPath = window.location.pathname;
        const gamePages = ['worldview-game.html', 'philosopher-match-game.html', 'philosophy-game-enhanced.html'];

        const isGamePage = gamePages.some(page => currentPath.includes(page));

        if (isGamePage) {
            const tetBtn = document.getElementById('tet-toggle-btn-header');
            const aiBtn = document.getElementById('ai-chat-btn');

            if (tetBtn) tetBtn.style.display = 'none';
            if (aiBtn) aiBtn.style.display = 'none';
        }
    }


    // Load Footer
    fetch(prefix + 'footer.html?v=' + timestamp)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;

            // Fix relative links in footer
            if (prefix) {
                const footerLinks = document.querySelectorAll('#footer-placeholder a');
                footerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                        link.setAttribute('href', prefix + href);
                    }
                });
                const footerImages = document.querySelectorAll('#footer-placeholder img');
                footerImages.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                        img.setAttribute('src', prefix + src);
                    }
                });
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});

/**
 * Sets the active navigation link based on the current URL.
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'home.html';
    const currentHash = window.location.hash;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Reset to inactive state defaults
        link.className = "nav-link px-3 py-2 rounded-lg hover:bg-primary/10 hover:-translate-y-px transition-all duration-300 text-slate-600 text-sm font-medium hover:text-primary relative pb-1 border-b-2 border-transparent";

        // Check for match
        // 1. Exact match (e.g. currentPath is practice.html, link is practice.html)
        // 2. Home page special case (empty path or index.html -> home.html)
        // 3. Hash match if present
        // 4. Module pages -> highlight "Modules" link (home.html#overview)

        const isMatch = (linkHref === currentPath) ||
            (currentPath === 'home.html' && linkHref === 'home.html' && !currentHash) ||
            (currentPath === 'home.html' && linkHref === '#overview' && currentHash === '#overview') ||
            (linkHref === 'home.html#overview' && currentPath.includes('module')) ||
            (linkHref === 'practice.html' && currentPath.includes('quiz')) ||
            (linkHref === 'games.html' && (currentPath.includes('worldview-game') || currentPath.includes('philosophy-game') || currentPath.includes('philosopher-match-game') || currentPath.includes('games'))) ||
            (linkHref.includes('articles.html') && (window.location.pathname.includes('/articles/') || currentPath.includes('articles'))); // Highlight Articles for sub-pages


        if (isMatch) {
            // Special handling for Game link to include flex items-center gap-1
            if (linkHref === 'games.html') {
                link.className = "nav-link px-3 py-2 rounded-lg hover:bg-primary/10 hover:-translate-y-px transition-all duration-300 text-primary text-sm font-bold hover:text-primary relative pb-1 border-b-2 border-primary flex items-center gap-1";
            } else {
                link.className = "nav-link px-3 py-2 rounded-lg hover:bg-primary/10 hover:-translate-y-px transition-all duration-300 text-primary text-sm font-bold hover:text-primary relative pb-1 border-b-2 border-primary";
            }
        }
    });
}

/**
 * Setup scroll-based navigation highlighting for home.html
 */
function setupScrollBasedNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'home.html';

    // Only apply on home.html
    if (currentPath !== 'home.html') {
        return;
    }

    const overviewSection = document.getElementById('overview');
    if (!overviewSection) {
        return;
    }

    const homeLink = document.getElementById('home-link');
    const modulesLink = document.getElementById('modules-link');

    if (!homeLink || !modulesLink) {
        return;
    }

    const activeClass = "nav-link px-3 py-2 rounded-lg hover:bg-primary/10 hover:-translate-y-px transition-all duration-300 text-primary text-sm font-bold hover:text-primary relative pb-1 border-b-2 border-primary";
    const inactiveClass = "nav-link px-3 py-2 rounded-lg hover:bg-primary/10 hover:-translate-y-px transition-all duration-300 text-slate-600 text-sm font-medium hover:text-primary relative pb-1 border-b-2 border-transparent";

    function updateActiveLink() {
        // If we are on home.html with #overview hash initially, we might want to respect that
        // But scroll position is the ultimate truth for visual highlighting

        const scrollPosition = window.scrollY;
        const overviewTop = overviewSection.offsetTop - 150; // Offset for header height + buffer

        if (scrollPosition >= overviewTop) {
            // Scrolled to overview section - highlight Modules, dim Home
            homeLink.className = inactiveClass;
            modulesLink.className = activeClass;
        } else {
            // Above overview section - highlight Home, dim Modules
            homeLink.className = activeClass;
            modulesLink.className = inactiveClass;
        }
    }

    // Add scroll listener
    window.addEventListener('scroll', updateActiveLink);

    // Initial check on page load with delay to ensure layout is stable
    setTimeout(() => {
        updateActiveLink();
    }, 100);
}
