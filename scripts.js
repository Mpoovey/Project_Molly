document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const imagesContainer = carousel.querySelector('.carousel-images');
        const images = imagesContainer.querySelectorAll('.carousel-image');
        const totalImages = images.length;
        let currentIndex = 0;

        // Set the width of the images container based on the number of images
        imagesContainer.style.width = `${totalImages * 100}%`;

        // Function to update the carousel position
        function updateCarousel() {
            imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Event listeners for navigation buttons
        const prevButton = carousel.querySelector('.carousel-btn.prev');
        const nextButton = carousel.querySelector('.carousel-btn.next');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
                updateCarousel();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }

        // Initial update to set the correct position
        updateCarousel();
    });

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Animate reviews when they scroll into view
    const reviews = document.querySelectorAll('.column');
    function animateReviews() {
        reviews.forEach(review => {
            if (isInViewport(review)) {
                review.classList.add('animate');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', animateReviews);
    window.addEventListener('resize', animateReviews); // Ensure animation on resize

    // Initial check in case reviews are already in view
    animateReviews();
});