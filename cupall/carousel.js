let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-image");

function showSlides() {
    slides.forEach((slide, i) => {
        slide.style.display = i === slideIndex ? "block" : "none";
    });
}

function moveSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlides();
}

// Auto-play slideshow every 3 seconds
setInterval(() => moveSlide(1), 3000);

showSlides();
