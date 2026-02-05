// Product detail page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadProductFromUrl();
    initGallery();
    initLightbox();
});

// Load product from URL params
function loadProductFromUrl() {
    if (typeof PRODUCTS_DATA === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const seriesId = params.get('series');
    const colorCode = params.get('color');

    if (!seriesId || !colorCode) return;

    const series = PRODUCTS_DATA.series.find(s => s.id === seriesId);
    if (!series) return;

    const color = series.colors.find(c => c.code === colorCode);
    if (!color) return;

    // Build paths
    const basePath = PRODUCTS_DATA.basePath;
    const seriesPath = basePath + series.folderName + '/';
    const subPath = series.subFolder ? series.subFolder + '/' : '';
    const colorFolder = color.code + color.name;
    const folderPath = seriesPath + subPath + colorFolder + '/';

    // Update page title
    document.title = `${color.name} - ${series.name} | 原緒地板 YUAN XU`;

    // Update product name
    const productName = document.querySelector('h1');
    if (productName) {
        productName.innerHTML = color.name;
    }

    const productNameEn = document.querySelector('h1 + p');
    if (productNameEn) {
        productNameEn.textContent = color.nameEn;
    }

    // Update breadcrumb
    updateBreadcrumb(series, color);

    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        // Check if color has custom image path
        if (color.image) {
            mainImage.src = seriesPath + color.image;
        } else {
            mainImage.src = folderPath + color.code + '-' + color.name + '-01.png';
        }
        mainImage.alt = color.name + ' - 裝潢實景';
        mainImage.onerror = function() {
            this.src = folderPath + color.code + color.name + '.png';
            this.onerror = function() {
                this.src = folderPath + color.code + color.name + '.jpg';
            };
        };
    }

    // Update specs table
    updateSpecsTable(series.specs);

    // Update color variants
    updateColorVariants(series, color, basePath);

    // Load gallery images for this color
    loadGalleryImages(folderPath, color);
}

// Update breadcrumb navigation
function updateBreadcrumb(series, color) {
    const breadcrumb = document.querySelector('nav.flex.items-center.text-sm');
    if (!breadcrumb) return;

    breadcrumb.innerHTML = `
        <span class="material-icons-outlined text-base mr-1">home</span>
        <a href="index.html" class="hover:text-primary transition-colors">首頁</a>
        <span class="mx-2">/</span>
        <a href="products.html" class="hover:text-primary transition-colors">產品總覽</a>
        <span class="mx-2">/</span>
        <a href="products.html?series=${series.id}" class="hover:text-primary transition-colors">${series.name}</a>
        <span class="mx-2">/</span>
        <span class="text-primary font-medium">${color.name}</span>
    `;
}

// Update specifications table
function updateSpecsTable(specs) {
    const table = document.querySelector('.spec-table-champion tbody');
    if (!table || !specs) return;

    table.innerHTML = `
        <tr><td>尺寸規格</td><td class="text-gray-900 font-medium">${specs.size}</td></tr>
        <tr><td>厚度</td><td class="text-gray-900 font-medium">${specs.thickness}</td></tr>
        <tr><td>耐磨等級</td><td class="text-gray-900 font-medium">${specs.wearClass}</td></tr>
        <tr><td>防水保固</td><td class="text-gray-900 font-medium">AQUA PROTECT 防水技術 / ${specs.waterproofWarranty}</td></tr>
        <tr><td>住家保固</td><td class="text-gray-900 font-medium">${specs.residentialWarranty}</td></tr>
        <tr><td>包裝規格 PCS / CTN</td><td class="text-gray-900 font-medium">${specs.pcsPerBox}</td></tr>
        <tr><td>施工用量 坪 / CTN</td><td class="text-gray-900 font-medium">${specs.sqmPerBox}</td></tr>
        <tr><td>安裝方式</td><td class="text-gray-900 font-medium">${specs.installation}</td></tr>
        <tr><td>原產地</td><td class="text-gray-900 font-medium">${specs.origin}</td></tr>
    `;
}

// Update color variants section
function updateColorVariants(series, currentColor, basePath) {
    const variantsContainer = document.querySelector('.mt-16 .flex.flex-wrap.gap-8');
    if (!variantsContainer) return;

    const variantTitle = variantsContainer.previousElementSibling;
    if (variantTitle) {
        variantTitle.textContent = `所有產品型號 (${series.colors.length})`;
    }

    const seriesPath = basePath + series.folderName + '/';
    const subPath = series.subFolder ? series.subFolder + '/' : '';

    let html = '';
    series.colors.forEach(color => {
        const isActive = color.code === currentColor.code;
        const colorFolder = color.code + color.name;
        const swatchPath = color.swatch
            ? seriesPath + color.swatch
            : seriesPath + subPath + colorFolder + '/' + color.code + color.name + '.png';

        html += `
            <a href="product.html?series=${series.id}&color=${color.code}"
               class="variant-swatch ${isActive ? 'active' : ''}"
               data-variant="${color.code}">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 ${isActive ? 'border-primary' : 'border-gray-200'}">
                    <img src="${swatchPath}" alt="${color.name}" class="w-full h-full object-cover"
                         onerror="this.src='${seriesPath + subPath + colorFolder + '/' + color.code + '-' + color.name + '.jpg'}'">
                </div>
                <div class="text-center">
                    <p class="text-sm font-medium text-gray-900">${color.code}</p>
                    <p class="text-xs text-gray-500">${color.name}</p>
                </div>
            </a>
        `;
    });

    variantsContainer.innerHTML = html;
}

// Load gallery images dynamically
function loadGalleryImages(folderPath, color) {
    // Try to find gallery images with common naming patterns
    const patterns = [
        `${color.code}-${color.name}-01.png`,
        `${color.code}-${color.name}-02.png`,
        `${color.code}-${color.name}-03.png`,
        `${color.code}${color.name}-01.png`,
        `${color.code}${color.name}.png`,
        `${color.code}${color.name}.jpg`,
        `${color.code}-${color.name}.jpg`
    ];

    // Update texture variations section
    const textureGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-3.gap-4');
    if (textureGrid) {
        let html = '';
        for (let i = 0; i < 6; i++) {
            const imgSrc = folderPath + (patterns[i] || patterns[0]);
            html += `
                <div class="aspect-[16/10] bg-gray-100 rounded overflow-hidden">
                    <img src="${imgSrc}" alt="紋理變化 ${i + 1}" class="w-full h-full object-cover"
                         onerror="this.parentElement.style.display='none'">
                </div>
            `;
        }
        textureGrid.innerHTML = html;
    }
}

// Gallery thumbnail navigation
function initGallery() {
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.getElementById('mainImage');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.dataset.image;
            mainImage.src = newSrc;

            thumbnails.forEach(t => {
                t.classList.remove('border-primary', 'opacity-100');
                t.classList.add('border-gray-300');
            });
            thumb.classList.add('border-primary', 'opacity-100');
            thumb.classList.remove('border-gray-300');
        });
    });

    mainImage.addEventListener('click', () => {
        openLightbox(mainImage.src);
    });

    mainImage.style.cursor = 'zoom-in';
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox) return;

    let currentIndex = 0;
    let images = [];

    const thumbnails = document.querySelectorAll('.gallery-thumb');
    thumbnails.forEach(thumb => {
        images.push(thumb.dataset.image);
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex];
    });

    lightboxNext?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex];
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImage.src = images[currentIndex];
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImage.src = images[currentIndex];
        }
    });

    window.openLightbox = function(src) {
        currentIndex = images.indexOf(src);
        if (currentIndex === -1) currentIndex = 0;
        lightboxImage.src = src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
    }
}
