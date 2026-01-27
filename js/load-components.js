/**
 * Loads the header and footer components into the page.
 * Assumes 'header.html' and 'footer.html' are in the same directory as the page or root.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Determine path prefix (handle subdirectories if needed, though structure seems flat for now)
    const storedPathDiff = window.location.pathname.split('/').length - 2; // Rough estimate if needed, but assuming flat
    const prefix = ""; // Assuming all HTML files are in root

    // Load Header
    const timestamp = new Date().getTime();
    fetch(prefix + 'header.html?v=' + timestamp)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveNavLink();

            // Initialize search AFTER header is loaded
            if (typeof initializeSearch === 'function') {
                initializeSearch();
            }

            // Add scroll-based navigation highlighting for home.html
            setupScrollBasedNavigation();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch(prefix + 'footer.html?v=' + timestamp)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
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
            (linkHref === 'practice.html' && currentPath.includes('quiz')); // Quiz pages highlight Practice


        if (isMatch) {
            link.className = "nav-link px-3 py-2 rounded-lg hover:bg-primary/10 hover:-translate-y-px transition-all duration-300 text-primary text-sm font-bold hover:text-primary relative pb-1 border-b-2 border-primary";
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
