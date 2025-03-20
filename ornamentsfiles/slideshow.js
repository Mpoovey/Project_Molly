document.addEventListener("DOMContentLoaded", function () {
    console.log("Slideshow script loaded");

    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function (n) {
        console.log("plusSlides called with n =", n);
        showSlides(slideIndex += n);
    };

    window.currentSlide = function (n) {
        console.log("currentSlide called with n =", n);
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        if (slides.length === 0) {
            console.log("No slides found");
            return;
        }

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        console.log("Showing slide:", slideIndex);

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
    }


});
