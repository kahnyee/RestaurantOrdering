let slideIndex = 0;
let slides, dots, slideInterval;
let touchStartX = 0;
let touchEndX = 0;


function setupSlideshow() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    const slideshowContainer = document.querySelector(".slideshow-container");
    setupDots(); // Initialize dot event listeners


    // Touch events for mobile devices
    slideshowContainer.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    slideshowContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].clientX;
        handleGesture();
    });

    // Mouse events for desktop
    slideshowContainer.addEventListener('mousedown', e => {
        touchStartX = e.clientX;
        document.onmouseup = endMouseSlide;
        document.onmousemove = mouseMoveSlide;
    });

    slideIndex = 0;
    showSlides();
    clearInterval(slideInterval);
    slideInterval = setInterval(showSlides, 5000);
}

function endMouseSlide(e) {
    touchEndX = e.clientX;
    document.onmouseup = null;
    document.onmousemove = null;
    handleGesture();
}

function mouseMoveSlide(e) {
    touchEndX = e.clientX;
}
function handleGesture() {
    if (touchEndX < touchStartX) {
        moveSlide(1); // Swiped left, move to next slide
    } else if (touchEndX > touchStartX) {
        moveSlide(-1); // Swiped right, move to previous slide
    }
}

let manualChange = false; // Flag to indicate manual slide change

function moveSlide(direction) {
    clearInterval(slideInterval);
    slideIndex += direction;
    manualChange = true; // Set flag to true


    // Wrap around the slides
    if (slideIndex < 1) {
        slideIndex = slides.length;
    } else if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    showSlides();
    slideInterval = setInterval(showSlides, 5000);
}




function showSlides() {
    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (!manualChange) {
        slideIndex++;
    }
    manualChange = false; // Reset the flag

    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }
    updateDots(); // Update the dots each time the slide changes
}

function setupDots() {
    for (let i = 0; i < dots.length; i++) {
        // Existing click event listener
        dots[i].addEventListener('click', function() {
            currentSlide(i + 1);
        });

        // Add a touchend event listener
        dots[i].addEventListener('touchend', function() {
            currentSlide(i + 1);
        });
    }
}

function currentSlide(n) {
    clearInterval(slideInterval);
    slideIndex = n; // Directly set slideIndex to n, not n - 1
    manualChange = true;
    showSlides();
    slideInterval = setInterval(showSlides, 5000);
}


function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (dots.length > 0 && slideIndex <= dots.length) {
        dots[slideIndex - 1].className += " active";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#appetisers') {
        var appSection = document.getElementById('appetisers');
        if (appSection) {
            setTimeout(function() {
                appSection.scrollIntoView();
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    } else if (window.location.hash === '#mains') {
        var mainSection = document.getElementById('mains');
        if (mainSection) {
            setTimeout(function() {
                mainSection.scrollIntoView();
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    } else if (window.location.hash === '#sides') {
        var sideSection = document.getElementById('sides');
        if (sideSection) {
            setTimeout(function() {
                sideSection.scrollIntoView();
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    } else if (window.location.hash === '#desserts') {
        var dessertSection = document.getElementById('desserts');
        if (dessertSection) {
            setTimeout(function() {
                dessertSection.scrollIntoView();
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    } else if (window.location.hash === '#drinks') {
        var drinkSection = document.getElementById('drinks');
        if (drinkSection) {
            setTimeout(function() {
                drinkSection.scrollIntoView();
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    } else if (window.location.hash === '#seasonals') {
        var seasonalSection = document.getElementById('seasonals');
        if (seasonalSection) {
            setTimeout(function() {
                seasonalSection.scrollIntoView();
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const scrollToSection = params.get('scrollToSection');

    if (scrollToSection) {
        const sectionElement = document.getElementById(scrollToSection);
        if (sectionElement) {
            setTimeout(function() {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }, 1000); // Delay for 1000 milliseconds (1 second)
        }
    }
});