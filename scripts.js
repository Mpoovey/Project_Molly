document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality (this part is correct as is)
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

    // Intersection Observer for reviews animation
    const reviews = document.querySelectorAll('.column');
    
    // Set up the Intersection Observer to trigger animation when reviews come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add class to trigger the animation
                observer.unobserve(entry.target); // Unobserve the element after it's been animated
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Observe each review column
    reviews.forEach(review => observer.observe(review));
});
