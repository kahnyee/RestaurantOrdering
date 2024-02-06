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

const firebaseConfig = {
    apiKey: "AIzaSyCGlbYNPvPFE7ByacA1SdeA2mUHqbE_vxg",
    authDomain: "deliciousfood-c9efa.firebaseapp.com",
    projectId: "deliciousfood-c9efa",
    storageBucket: "deliciousfood-c9efa.appspot.com",
    messagingSenderId: "682668950894",
    appId: "1:682668950894:web:e1d6e07ade038a3ab32d7f",
    measurementId: "G-ZG7EGGBSS4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let currentOrder = [];

function getMenuItems() {
    const seasonalsContainer = document.getElementById("seasonal");
    seasonalsContainer.innerHTML = '<p style="height: 20px"></p><div class="slideshow-container"></div>';
    const slideshowContainer = seasonalsContainer.querySelector('.slideshow-container');

    const collections = ["seasonal_1", "seasonal_2", "seasonal_3","seasonal_4","seasonal_5","seasonal_6","seasonal_7","seasonal_8"];
    let totalItems = 0;

    collections.forEach(collection => {
        const itemsRef = db.collection("Menu").doc("seasonals").collection(collection);
        itemsRef.get().then((itemSnapshot) => {
            totalItems += itemSnapshot.size;
            itemSnapshot.forEach((itemDoc) => {
                const itemData = itemDoc.data();
                const slideDiv = document.createElement("div");
                slideDiv.className = "mySlides fade";
                slideDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">
                        ${itemData.food_name} <br>
                        <span style="text-decoration: line-through;font-style: italic; color: #808080">$${itemData.price}<br></span>
                        <span>$${itemData.discounted_price}</span>
                    </div>
                `;
                slideDiv.addEventListener('click', function() {
                    document.location = "#seasonals";
                });
                slideshowContainer.appendChild(slideDiv);
            });

            if (totalItems === collections.length) {
                addDotsAndInitialize(slideshowContainer, totalItems);
            }
        }).catch((error) => {
            console.error("Error getting items from", collection, ":", error);
        });
    });
}

function addDotsAndInitialize(slideshowContainer, totalItems) {
    // Dynamically generate and append dots for each slide
    const dotContainer = document.createElement('div');
    dotContainer.className = 'dot-container';
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function() { currentSlide(i + 1); };
        dotContainer.appendChild(dot);
    }
    slideshowContainer.appendChild(dotContainer);

    // Reinitialize the slideshow logic since new slides and dots are added
    setupSlideshow();
}

function getAppetisers() {
    const appetisersContainer = document.getElementById("appetisers");
    const gridContainer = appetisersContainer.querySelector('.appetisers-grid');

    const appetiserCollections = ["appetisers_1", "appetisers_2", "appetisers_3", "appetisers_4", "appetisers_5", "appetisers_6", "appetisers_7", "appetisers_8"];

    appetiserCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("appetisers").collection(collectionName);
        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();

                // Check if the item is already in the order and set its quantity
                let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
                itemData.quantity = orderItem ? orderItem.quantity : 0;

                const itemDiv = document.createElement("div");
                itemDiv.className = "appetiser-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                // Plus icon click event
                itemDiv.querySelector('.plus').addEventListener('click', function() {
                    itemData.quantity++;
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    addToOrder(itemData);
                });
                // Minus icon click event
                itemDiv.querySelector('.minus').addEventListener('click', function() {
                    if (itemData.quantity > 0) {
                        itemData.quantity--;
                        itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                        removeFromOrder(itemData);
                    }
                });

                gridContainer.appendChild(itemDiv);
            });
        }).catch((error) => {
            console.error(`Error getting items from ${collectionName}:`, error);
        });
    });
}

function getMains() {
    const mainsContainer = document.getElementById("mains");
    const gridContainer = mainsContainer.querySelector('.mains-grid');

    const mainsCollections = ["mains_1", "mains_2", "mains_3", "mains_4", "mains_5", "mains_6", "mains_7", "mains_8"];

    mainsCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("mains").collection(collectionName);
        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
                itemData.quantity = orderItem ? orderItem.quantity : 0;

                const itemDiv = document.createElement("div");
                itemDiv.className = "main-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                // Plus icon click event
                itemDiv.querySelector('.plus').addEventListener('click', function() {
                    itemData.quantity++;
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    addToOrder(itemData);
                });
                // Minus icon click event
                itemDiv.querySelector('.minus').addEventListener('click', function() {
                    if (itemData.quantity > 0) {
                        itemData.quantity--;
                        itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                        removeFromOrder(itemData);
                    }
                });

                gridContainer.appendChild(itemDiv);
            });
        }).catch((error) => {
            console.error(`Error getting items from ${collectionName}:`, error);
        });
    });
}

function getSides() {
    const sidesContainer = document.getElementById("sides");
    const gridContainer = sidesContainer.querySelector('.sides-grid');

    const sidesCollections = ["sides_1", "sides_2", "sides_3", "sides_4", "sides_5", "sides_6", "sides_7", "sides_8"];

    sidesCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("sides").collection(collectionName);
        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
                itemData.quantity = orderItem ? orderItem.quantity : 0;

                const itemDiv = document.createElement("div");
                itemDiv.className = "side-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                itemDiv.querySelector('.plus').addEventListener('click', function() {
                    itemData.quantity++;
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    addToOrder(itemData);
                });
                // Minus icon click event
                itemDiv.querySelector('.minus').addEventListener('click', function() {
                    if (itemData.quantity > 0) {
                        itemData.quantity--;
                        itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                        removeFromOrder(itemData);
                    }
                });

                gridContainer.appendChild(itemDiv);
            });
        }).catch((error) => {
            console.error(`Error getting items from ${collectionName}:`, error);
        });
    });
}

function getDesserts() {
    const dessertsContainer = document.getElementById("desserts");
    const gridContainer = dessertsContainer.querySelector('.desserts-grid');

    const dessertsCollections = ["desserts_1", "desserts_2", "desserts_3", "desserts_4", "desserts_5", "desserts_6", "desserts_7", "desserts_8"];

    dessertsCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("desserts").collection(collectionName);
        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
                itemData.quantity = orderItem ? orderItem.quantity : 0;

                const itemDiv = document.createElement("div");
                itemDiv.className = "dessert-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                itemDiv.querySelector('.plus').addEventListener('click', function() {
                    itemData.quantity++;
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    addToOrder(itemData);
                });
                // Minus icon click event
                itemDiv.querySelector('.minus').addEventListener('click', function() {
                    if (itemData.quantity > 0) {
                        itemData.quantity--;
                        itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                        removeFromOrder(itemData);
                    }
                });

                gridContainer.appendChild(itemDiv);
            });
        }).catch((error) => {
            console.error(`Error getting items from ${collectionName}:`, error);
        });
    });
}

function getDrinks() {
    const drinksContainer = document.getElementById("drinks");
    const gridContainer = drinksContainer.querySelector('.drinks-grid');

    const drinksCollections = ["drinks_1", "drinks_2", "drinks_3", "drinks_4"];

    drinksCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("drinks").collection(collectionName);
        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
                itemData.quantity = orderItem ? orderItem.quantity : 0;

                const itemDiv = document.createElement("div");
                itemDiv.className = "drink-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                itemDiv.querySelector('.plus').addEventListener('click', function() {
                    itemData.quantity++;
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    addToOrder(itemData);
                });
                // Minus icon click event
                itemDiv.querySelector('.minus').addEventListener('click', function() {
                    if (itemData.quantity > 0) {
                        itemData.quantity--;
                        itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                        removeFromOrder(itemData);
                    }
                });

                gridContainer.appendChild(itemDiv);
            });
        }).catch((error) => {
            console.error(`Error getting items from ${collectionName}:`, error);
        });
    });
}

function getSeasonalsMain() {
    const seasonalsMainContainer = document.getElementById("seasonals");
    const gridContainer = seasonalsMainContainer.querySelector('.seasonals-main-grid');

    const seasonalsMainCollections = ["seasonal_1", "seasonal_2", "seasonal_3", "seasonal_4", "seasonal_5", "seasonal_6", "seasonal_7", "seasonal_8"];

    seasonalsMainCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("seasonals").collection(collectionName);
        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
                itemData.quantity = orderItem ? orderItem.quantity : 0;

                const itemDiv = document.createElement("div");
                itemDiv.className = "seasonals-main-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">
                        ${itemData.food_name} <br>
                        <span style="text-decoration: line-through;font-style: italic; color: #808080">$${itemData.price}<br></span>
                        <span>$${itemData.discounted_price}</span>
                    </div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">${itemData.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;

                // Plus icon click event
                itemDiv.querySelector('.plus').addEventListener('click', function() {
                    itemData.quantity++;
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    addToOrder(itemData);
                });

                // Minus icon click event
                itemDiv.querySelector('.minus').addEventListener('click', function() {
                    if (itemData.quantity > 0) {
                        itemData.quantity--;
                        itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                        removeFromOrder(itemData);
                    }
                });

                gridContainer.appendChild(itemDiv);
            });
        }).catch((error) => {
            console.error(`Error getting items from ${collectionName}:`, error);
        });
    });
}

// Call the function to get seasonals_main items
getSeasonalsMain();
// Call the function to get drinks items
getDrinks();
// Call the function to get desserts items
getDesserts();
// Call the function to get sides items
getSides();
// Call the function to get mains items
getMains();
// Call the function to get appetiser items
getAppetisers();
// Call the function to get menu items
getMenuItems();

function saveOrderToSession() {
    sessionStorage.setItem('currentOrder', JSON.stringify(currentOrder));
}

function loadOrderFromSession() {
    const savedOrder = sessionStorage.getItem('currentOrder');
    if (savedOrder) {
        currentOrder = JSON.parse(savedOrder);
    } else {
        currentOrder = [];
    }
}

function addToOrder(item) {
    // Find the item in the currentOrder
    let orderItem = currentOrder.find(order => order.food_name === item.food_name);

    if (orderItem) {
        // If quantity is not a number, initialize to 0
        if (isNaN(orderItem.quantity)) {
            orderItem.quantity = 0;
        }
        // Check if the item is seasonal, and if so, use the discounted price
        if (item.hasOwnProperty('discounted_price')) {
            orderItem.quantity += 1;
            orderItem.price = item.discounted_price; // Use discounted price
        } else {
            orderItem.quantity += 1;
        }
    } else {
        // Add new item to currentOrder with quantity initialized to 1
        currentOrder.push({
            ...item,
            quantity: 1,
            // Check if the item is seasonal, and if so, use the discounted price
            price: item.hasOwnProperty('discounted_price') ? item.discounted_price : item.price
        });
    }
    updateCartTotal();
    saveOrderToSession(); // Save to session after adding item

    console.log("Current Order:", currentOrder);
}

function removeFromOrder(item) {
    const orderItem = currentOrder.find(order => order.food_name === item.food_name);
    if (orderItem && orderItem.quantity > 1) {
        // Decrease the quantity
        orderItem.quantity -= 1;
    } else {
        // Find the index of the item in the current order
        const index = currentOrder.findIndex(order => order.food_name === item.food_name);
        if (index !== -1) {
            // Remove the item from the current order
            currentOrder.splice(index, 1);
        }
    }
    updateCartTotal();
    saveOrderToSession(); // Save to session after adding item

    console.log("Current Order:", currentOrder);
}
loadOrderFromSession();

function updateCartTotal() {
    let totalAmount = currentOrder.reduce((total, item) => total + (item.quantity * item.price), 0);
    document.getElementById('cart-total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    sessionStorage.setItem('total', totalAmount);
}

updateCartTotal();