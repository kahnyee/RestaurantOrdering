

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGlbYNPvPFE7ByacA1SdeA2mUHqbE_vxg",
    authDomain: "deliciousfood-c9efa.firebaseapp.com",
    projectId: "deliciousfood-c9efa",
    storageBucket: "deliciousfood-c9efa.appspot.com",
    messagingSenderId: "682668950894",
    appId: "1:682668950894:web:e1d6e07ade038a3ab32d7f",
    measurementId: "G-ZG7EGGBSS4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const currentOrder = [];

function getMenuItems() {
    const seasonalsContainer = document.getElementById("seasonals");
    seasonalsContainer.innerHTML = '<h2 style="padding-top: 30px;">Seasonals</h2><div class="slideshow-container"></div>';
    const slideshowContainer = seasonalsContainer.querySelector('.slideshow-container');

    // Define the collections to query
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
            <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
        `;
                slideDiv.addEventListener('click', function() {
                    console.log("Slide clicked:", itemData);
                    addToOrder(itemData);
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
    appetisersContainer.innerHTML = '<h2 style="padding-top: 30px;">Appetisers</h2><div class="appetisers-grid"></div>';
    const gridContainer = appetisersContainer.querySelector('.appetisers-grid');

    // Define your appetiser collections here
    const appetiserCollections = ["appetisers_1", "appetisers_2", "appetisers_3", "appetisers_4"]; // Add more as needed

    appetiserCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("appetisers").collection(collectionName);

        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                itemData.quantity = 0; // Initialize the quantity of the item
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

// Call the function to get appetiser items
getAppetisers();

// Call the function to get menu items
getMenuItems();


function addToOrder(item) {
    // Find the item in the currentOrder
    let orderItem = currentOrder.find(order => order.food_name === item.food_name);
    if (orderItem) {
        orderItem.quantity += 1;
    } else {
        // Add new item to currentOrder
        currentOrder.push({
            ...item,
            quantity: 1
        });
    }
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
    console.log("Current Order:", currentOrder);
}



