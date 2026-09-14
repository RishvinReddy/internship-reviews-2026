document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const btnNotes = document.getElementById('btn-notes');

    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter'); // "01 / 01" text container
    const navDotsContainer = document.getElementById('nav-dots');

    const notesPanel = document.getElementById('notes-panel');
    const notesContent = document.getElementById('notes-content'); // <p> inside notes panel

    // Create navigation dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        navDotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    function updateUI() {
        // Show only active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        // Update nav dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update slide counter text
        const padded = String(currentSlide + 1).padStart(2, '0');
        const paddedTotal = String(totalSlides).padStart(2, '0');
        slideCounter.textContent = `${padded} / ${paddedTotal}`;

        // Update progress bar
        progressBar.style.width = ((currentSlide + 1) / totalSlides * 100) + '%';

        // Update presenter notes
        const notesEl = slides[currentSlide].querySelector('.notes');
        notesContent.textContent = notesEl ? notesEl.textContent.trim() : 'No notes for this slide.';

        // Button state
        btnPrev.disabled = currentSlide === 0;
        btnNext.disabled = currentSlide === totalSlides - 1;
        btnPrev.style.opacity = currentSlide === 0 ? '0.4' : '1';
        btnNext.style.opacity = currentSlide === totalSlides - 1 ? '0.4' : '1';
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateUI();
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateUI();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateUI();
        }
    }

    // Button listeners
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    // Notes toggle
    btnNotes.addEventListener('click', () => {
        notesPanel.classList.toggle('visible');
    });

    // Fullscreen toggle
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Fullscreen error:', err.message);
            });
        } else {
            document.exitFullscreen && document.exitFullscreen();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
        }
    });

    // Init
    updateUI();
});
