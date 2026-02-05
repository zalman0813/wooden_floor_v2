// Main JavaScript - Shared functionality

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initNavigation();
    initMobileMenu();
    initSearch();
});

// Dark Mode Toggle
function initDarkMode() {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    // Manual toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });
    }

    // Load saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
    } else if (savedDarkMode === 'false') {
        document.documentElement.classList.remove('dark');
    }
}

// Navigation scroll effect
function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on click outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// Search Panel functionality
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchPanel = document.getElementById('searchPanel');
    const searchPanelClose = document.getElementById('searchPanelClose');
    const searchPanelBackdrop = searchPanel?.querySelector('.search-panel-backdrop');
    const searchPanelSubmit = document.getElementById('searchPanelSubmit');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const searchKeyword = document.getElementById('searchKeyword');

    if (!searchBtn || !searchPanel) return;

    // Track selected filters
    const selectedFilters = {
        category: 'all',
        space: 'all',
        texture: 'all'
    };

    // Open panel
    searchBtn.addEventListener('click', () => {
        searchPanel.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (searchKeyword) searchKeyword.focus();
    });

    // Close panel
    const closePanel = () => {
        searchPanel.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (searchPanelClose) {
        searchPanelClose.addEventListener('click', closePanel);
    }
    if (searchPanelBackdrop) {
        searchPanelBackdrop.addEventListener('click', closePanel);
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchPanel.classList.contains('open')) {
            closePanel();
        }
    });

    // Filter button clicks
    searchPanel.querySelectorAll('.filter-options button').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            const filterValue = btn.dataset.value;

            // Update active state
            btn.closest('.filter-options').querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Store selection
            selectedFilters[filterType] = filterValue;
        });
    });

    // Submit search
    const doSearch = () => {
        const keyword = searchKeyword?.value.trim() || '';
        const params = new URLSearchParams();

        if (keyword) params.set('q', keyword);
        if (selectedFilters.category !== 'all') params.set('category', selectedFilters.category);
        if (selectedFilters.space !== 'all') params.set('space', selectedFilters.space);
        if (selectedFilters.texture !== 'all') params.set('texture', selectedFilters.texture);

        const queryString = params.toString();
        window.location.href = 'products.html' + (queryString ? '?' + queryString : '');
    };

    if (searchPanelSubmit) {
        searchPanelSubmit.addEventListener('click', doSearch);
    }
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', doSearch);
    }

    // Enter key in search input
    if (searchKeyword) {
        searchKeyword.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doSearch();
        });
    }
}

// Utility: Format price
function formatPrice(price) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
    }).format(price);
}

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: Smooth scroll to element
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
