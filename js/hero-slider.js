// Hero Slider functionality

class HeroSlider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.hero-slide');
        this.thumbnails = container.querySelectorAll('.hero-thumb');
        this.dots = container.querySelectorAll('.slide-dot');
        this.prevBtn = container.querySelector('.hero-prev');
        this.nextBtn = container.querySelector('.hero-next');

        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        if (this.slideCount <= 1) return;

        this.bindEvents();
        this.startAutoPlay();
        this.showSlide(0);
    }

    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prev();
                this.resetAutoPlay();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.next();
                this.resetAutoPlay();
            });
        }

        // Thumbnails
        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.goTo(index);
                this.resetAutoPlay();
            });
        });

        // Dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goTo(index);
                this.resetAutoPlay();
            });
        });

        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
            this.resetAutoPlay();
        }
    }

    showSlide(index) {
        // Update slides
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update thumbnails
        this.thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
            if (i === index) {
                thumb.classList.add('border-2', 'border-white');
                thumb.classList.remove('border', 'border-white/50', 'opacity-70');
            } else {
                thumb.classList.remove('border-2', 'border-white');
                thumb.classList.add('border', 'border-white/50', 'opacity-70');
            }
        });

        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slideCount;
        this.showSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.showSlide(prevIndex);
    }

    goTo(index) {
        if (index >= 0 && index < this.slideCount) {
            this.showSlide(index);
        }
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;

        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const heroContainer = document.getElementById('heroSlider');
    if (heroContainer) {
        new HeroSlider(heroContainer);
    }
});
