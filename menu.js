let slideIndex = 0;
let slides, dots, slideInterval;

function setupSlideshow() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");

    slideIndex = 0;

    showSlides();

    clearInterval(slideInterval);
    slideInterval = setInterval(showSlides, 5000);
}

function currentSlide(n) {
    clearInterval(slideInterval);
    slideIndex = n - 1;
    showSlides();
    slideInterval = setInterval(showSlides, 5000);
}

function showSlides() {
    let i;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}

    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (dots.length > 0 && slideIndex - 1 < dots.length) {
        dots[slideIndex - 1].className += " active";
    }
}