// Products page functionality

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const seriesId = params.get('series');

    if (seriesId) {
        // Show colors within a specific series
        loadSeriesColors(seriesId);
    } else {
        // Show all series cards
        loadSeriesCards();
    }

    initFilterTags();
    initViewToggle();
    initSeriesSelect();
    initSearch();
    applyUrlFilters();
});

// Load series cards (main products page)
function loadSeriesCards() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

    const basePath = PRODUCTS_DATA.basePath;
    let html = '';

    PRODUCTS_DATA.series.forEach(series => {
        const seriesPath = basePath + series.folderName + '/';
        const subPath = series.subFolder ? series.subFolder + '/' : '';

        // Use first color as thumbnail
        const firstColor = series.colors[0];
        let thumbImage;

        // Check if color has custom image path
        if (firstColor.image) {
            thumbImage = seriesPath + firstColor.image;
        } else {
            const colorFolder = firstColor.code + firstColor.name;
            const folderPath = seriesPath + subPath + colorFolder + '/';
            thumbImage = folderPath + firstColor.code + '-' + firstColor.name + '-01.png';
        }

        const colorFolder = firstColor.code + firstColor.name;
        const folderPath = seriesPath + subPath + colorFolder + '/';

        html += `
            <a href="products.html?series=${series.id}"
               class="product-card group"
               data-series="${series.id}"
               data-series-name="${series.name}">
                <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-sm mb-4">
                    <img alt="${series.name}"
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                         src="${thumbImage}"
                         onerror="this.src='${folderPath}${firstColor.code}${firstColor.name}.png'; this.onerror=function(){this.src='${folderPath}${firstColor.code}${firstColor.name}.jpg';}">
                    <div class="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                        ${series.colors.length} 色
                    </div>
                </div>
                <h3 class="text-lg text-gray-900">
                    <span class="font-medium">${series.name}</span>
                </h3>
                <p class="text-sm text-gray-400 mt-1">${series.code}</p>
            </a>
        `;
    });

    grid.innerHTML = html;
    updateProductCount(PRODUCTS_DATA.series.length);
}

// Load colors within a specific series
function loadSeriesColors(seriesId) {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

    const series = PRODUCTS_DATA.series.find(s => s.id === seriesId);
    if (!series) {
        // Series not found, show all series
        loadSeriesCards();
        return;
    }

    // Update page title and breadcrumb
    document.title = `${series.name} | 原緒地板 YUAN XU`;
    updateBreadcrumbForSeries(series);

    const basePath = PRODUCTS_DATA.basePath;
    const seriesPath = basePath + series.folderName + '/';
    const subPath = series.subFolder ? series.subFolder + '/' : '';
    let html = '';

    series.colors.forEach(color => {
        const colorFolder = color.code + color.name;
        const folderPath = seriesPath + subPath + colorFolder + '/';
        let thumbImage;

        // Check if color has custom image path
        if (color.image) {
            thumbImage = seriesPath + color.image;
        } else {
            thumbImage = folderPath + color.code + '-' + color.name + '-01.png';
        }

        html += `
            <a href="product.html?series=${series.id}&color=${color.code}"
               class="product-card group"
               data-series="${series.id}"
               data-series-name="${series.name}"
               data-color="${color.code}">
                <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-sm mb-4">
                    <img alt="${color.name}"
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                         src="${thumbImage}"
                         onerror="this.src='${folderPath}${color.code}${color.name}.png'; this.onerror=function(){this.src='${folderPath}${color.code}${color.name}.jpg';}">
                    <div class="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                        ${series.name}
                    </div>
                </div>
                <h3 class="text-lg text-gray-900">
                    <span class="font-medium">${color.name}</span>
                    <span class="text-gray-400 mx-2">|</span>
                    <span class="text-gray-500">${color.nameEn}</span>
                </h3>
                <p class="text-sm text-gray-400 mt-1">${color.code}</p>
            </a>
        `;
    });

    grid.innerHTML = html;
    updateProductCount(series.colors.length);
}

// Update breadcrumb when viewing a series
function updateBreadcrumbForSeries(series) {
    const breadcrumb = document.querySelector('nav.flex.items-center.text-sm');
    if (!breadcrumb) return;

    breadcrumb.innerHTML = `
        <span class="material-icons-outlined text-base mr-1">home</span>
        <a href="index.html" class="hover:text-primary transition-colors">首頁</a>
        <span class="mx-2">/</span>
        <a href="products.html" class="hover:text-primary transition-colors">產品總覽</a>
        <span class="mx-2">/</span>
        <span class="text-primary font-medium">${series.name}</span>
    `;
}

// Filter tag functionality
function initFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const filterType = tag.dataset.filter;
            const value = tag.dataset.value;

            // Update active state within same filter group
            document.querySelectorAll(`.filter-tag[data-filter="${filterType}"]`).forEach(t => {
                t.classList.remove('active');
            });
            tag.classList.add('active');

            applyFilters();
        });
    });
}

// Apply all active filters
function applyFilters() {
    const searchTerm = document.getElementById('filterSearch')?.value.toLowerCase() || '';

    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    productCards.forEach(card => {
        const seriesName = card.dataset.seriesName || '';
        const colorCode = card.dataset.color || '';
        const name = card.querySelector('h3 .font-medium')?.textContent.toLowerCase() || '';
        const nameEn = card.querySelector('h3 .text-gray-500')?.textContent.toLowerCase() || '';

        // Search filter
        const matchesSearch = !searchTerm ||
            name.includes(searchTerm) ||
            nameEn.includes(searchTerm) ||
            colorCode.includes(searchTerm) ||
            seriesName.toLowerCase().includes(searchTerm);

        card.style.display = matchesSearch ? '' : 'none';
        if (matchesSearch) visibleCount++;
    });

    updateProductCount(visibleCount);
}

// Update product count display
function updateProductCount(count) {
    if (count === undefined) {
        count = document.querySelectorAll('.product-card').length;
    }

    // Update count display in header if exists
    const countDisplay = document.getElementById('productCount');
    if (countDisplay) {
        countDisplay.textContent = count;
    }
}

// Series dropdown - redirect to series page
function initSeriesSelect() {
    const select = document.getElementById('seriesSelect');
    if (!select || typeof PRODUCTS_DATA === 'undefined') return;

    // Get current series from URL
    const params = new URLSearchParams(window.location.search);
    const currentSeries = params.get('series') || '';

    // Clear and rebuild options
    select.innerHTML = '<option value="">所有系列</option>';

    PRODUCTS_DATA.series.forEach(series => {
        const option = document.createElement('option');
        option.value = series.id;
        option.textContent = `${series.name} (${series.code}) - ${series.colors.length}色`;
        if (series.id === currentSeries) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.addEventListener('change', function() {
        const selectedValue = this.value;
        if (selectedValue) {
            window.location.href = `products.html?series=${selectedValue}`;
        } else {
            window.location.href = 'products.html';
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('filterSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

// View toggle (product/variant mode)
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-mode-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;
            // Future: implement different view modes
        });
    });
}

// Debounce utility
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

// Apply filters from URL parameters (from search panel)
function applyUrlFilters() {
    const params = new URLSearchParams(window.location.search);

    // Apply keyword search
    const keyword = params.get('q');
    if (keyword) {
        const filterSearch = document.getElementById('filterSearch');
        if (filterSearch) {
            filterSearch.value = keyword;
        }
    }

    // Apply category, space, texture filters from URL
    ['category', 'space', 'texture'].forEach(filterType => {
        const value = params.get(filterType);
        if (value) {
            // Find and activate the filter button
            const btn = document.querySelector(`.filter-tag[data-filter="${filterType}"][data-value="${value}"]`);
            if (btn) {
                // Deactivate other buttons in the same filter group
                document.querySelectorAll(`.filter-tag[data-filter="${filterType}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            }
        }
    });

    // Trigger filter after setting values
    if (keyword || params.get('category') || params.get('space') || params.get('texture')) {
        applyFilters();
    }
}
