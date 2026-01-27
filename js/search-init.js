// Search functionality for PhiloMap
// This file contains all search logic and must be loaded AFTER header.html is injected

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');
    let selectedIndex = -1;

    if (!searchInput || !searchResults) {
        return;
    }

    if (typeof searchData === 'undefined') {
        return;
    }

    // Helper to remove Vietnamese tones
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // \u0300, \u0301, \u0303, \u0309, \u0323
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Or \u0088
        // Remove extra spaces
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        return str;
    }

    // Search function
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        const rawQuery = query.toLowerCase().trim();
        const normalizedQuery = removeVietnameseTones(rawQuery);

        console.log('Searching for:', rawQuery, 'Normalized:', normalizedQuery);

        // Filter search data
        const results = searchData.filter(item => {
            const normalizedTitle = removeVietnameseTones(item.title.toLowerCase());
            const normalizedSubtitle = removeVietnameseTones(item.subtitle.toLowerCase());

            // Check matches in title or subtitle
            const titleMatch = item.title.toLowerCase().includes(rawQuery) || normalizedTitle.includes(normalizedQuery);
            const subtitleMatch = item.subtitle.toLowerCase().includes(rawQuery) || normalizedSubtitle.includes(normalizedQuery);

            // Check matches in keywords
            const keywordMatch = item.keywords.some(keyword => {
                const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
                return keyword.toLowerCase().includes(rawQuery) || normalizedKeyword.includes(normalizedQuery);
            });

            return titleMatch || subtitleMatch || keywordMatch;
        }).slice(0, 8);

        console.log('Search results:', results.length);
        displayResults(results, query);
    }

    // Display results
    function displayResults(results, query) {
        console.log('displayResults called with', results.length, 'results');

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="p-4 text-center text-gray-500">
                    <span class="material-symbols-outlined text-3xl mb-2 opacity-50">search_off</span>
                    <p class="text-sm">Không tìm thấy kết quả cho "${query}"</p>
                </div>
            `;
            searchResults.classList.remove('hidden');
            return;
        }

        const html = results.map((item, index) => `
            <a href="${item.url}" 
               class="search-result-item flex items-start gap-3 p-3 hover:bg-blue-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
               data-index="${index}">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-medium text-sm text-gray-900 truncate">${highlightText(item.title, query)}</div>
                    <div class="text-xs text-gray-500 truncate">${item.subtitle}</div>
                    <div class="text-xs text-primary mt-0.5 capitalize">${getTypeLabel(item.type)}</div>
                </div>
            </a>
        `).join('');

        searchResults.innerHTML = html;
        searchResults.classList.remove('hidden');
        selectedIndex = -1;
    }

    // Highlight matching text
    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200 text-gray-900">$1</mark>');
    }

    // Escape special regex characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Get type label in Vietnamese
    function getTypeLabel(type) {
        const labels = {
            'module': 'Module',
            'concept': 'Khái niệm',
            'practice': 'Thực hành',
            'page': 'Trang'
        };
        return labels[type] || type;
    }

    // Event listeners
    searchInput.addEventListener('input', function (e) {
        console.log('Input event:', e.target.value);
        performSearch(e.target.value);
    });

    searchInput.addEventListener('focus', function (e) {
        if (e.target.value.trim().length >= 2) {
            performSearch(e.target.value);
        }
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', function (e) {
        const items = searchResults.querySelectorAll('.search-result-item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        } else if (e.key === 'Escape') {
            searchResults.classList.add('hidden');
            searchInput.blur();
        }
    });

    // Update selection highlight
    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('bg-blue-50');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('bg-blue-50');
            }
        });
    }

    // Click outside to close
    document.addEventListener('click', function (e) {
        if (searchContainer && !searchContainer.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Prevent dropdown from closing when clicking inside
    searchResults.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    console.log('✓ Search event listeners attached');
}

// Export for manual initialization
// Will be called by load-components.js after header is loaded

