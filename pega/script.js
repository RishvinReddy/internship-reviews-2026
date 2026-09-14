document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const btnNotes = document.getElementById('btn-notes');
    
    const progressBar = document.getElementById('progress-bar');
    const currentSlideNum = document.getElementById('current-slide-num');
    const totalSlideNum = document.getElementById('total-slide-num');
    const navDotsContainer = document.getElementById('nav-dots');
    
    const notesPanel = document.getElementById('notes-panel');
    const currentNotesDisplay = document.getElementById('current-notes-display');

    // Initialize UI
    totalSlideNum.textContent = totalSlides;

    // Create Navigation Dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        navDotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    function updateUI() {
        // Update slides visibility
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update counter
        currentSlideNum.textContent = (currentSlide + 1).toString().padStart(2, '0');

        // Update progress bar
        const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = progressPercent + '%';

        // Update notes
        const activeSlide = slides[currentSlide];
        const notesElement = activeSlide.querySelector('.notes');
        if (notesElement) {
            currentNotesDisplay.textContent = notesElement.textContent;
        } else {
            currentNotesDisplay.textContent = "No notes.";
        }
        
        // Update button states
        btnPrev.disabled = currentSlide === 0;
        btnNext.disabled = currentSlide === totalSlides - 1;
        
        btnPrev.style.opacity = currentSlide === 0 ? '0.5' : '1';
        btnNext.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
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

    // Event Listeners - Buttons
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    // Toggle Notes
    btnNotes.addEventListener('click', () => {
        notesPanel.classList.toggle('visible');
    });

    // Fullscreen Toggle
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'Space':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
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
            case 'Escape':
                // Handled natively by browser for exiting fullscreen, but included here for clarity
                break;
        }
    });

    // Initialize first slide state
    updateUI();
});
