var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");
var slideInterval;

function currentSlide(n) {
    clearInterval(slideInterval); // Clear the current interval
    slideIndex = n - 1; // Adjust for array index
    showSlides(); // Show the selected slide
    slideInterval = setInterval(showSlides, 15000); // Restart the auto-slide interval
}

function showSlides() {
    var i;

    // Set all slides to not display
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    // If we've gone past the last slide, reset to the first slide
    if (slideIndex > slides.length) {slideIndex = 1}

    // Remove 'active' class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and set its corresponding dot as active
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Initialize the first slide and start the slideshow
showSlides();
slideInterval = setInterval(showSlides, 15000); // Change image every 15 seconds

function addToOrder(itemId) {
    var formData = new FormData();
    formData.append('item_id', itemId);

    fetch('/add_order.php', {  // Updated URL
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
}

