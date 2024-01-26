// Define variables for slides, dots, and the interval
var slideIndex = 0;
var slides, dots, slideInterval;

function setupSlideshow() {
    // Get the slides and dots elements
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");

    // Reset slideIndex to 0 to start from the first slide, especially after dynamic addition
    slideIndex = 0;

    // Initialize the slideshow
    showSlides();

    // Clear existing interval and set a new one
    clearInterval(slideInterval);
    slideInterval = setInterval(showSlides, 15000); // Change image every 15 seconds
}

function currentSlide(n) {
    // Adjust slideshow for specific slide
    clearInterval(slideInterval); // Clear the current interval
    slideIndex = n - 1; // Adjust for array index
    showSlides(); // Show the selected slide
    slideInterval = setInterval(showSlides, 15000); // Restart the auto-slide interval
}

function showSlides() {
    var i;

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increment slideIndex
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} // Loop back to first slide

    // Display the current slide
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }

    // Update dots to reflect the current slide
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (dots.length > 0 && slideIndex - 1 < dots.length) {
        dots[slideIndex - 1].className += " active";
    }
}

// Ensure this function is called after dynamically adding slides in your menu_functions.js
// setupSlideshow();
