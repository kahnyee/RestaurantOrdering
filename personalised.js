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
const currentOrder = [];
const userId = "o8TcUPBpIGNpHjP054wKyxrsxQV2";//sessionStorage.getItem("uid");//firebase.auth().currentUser.uid;
/*
function getMenuItems() {
    const seasonalsContainer = document.getElementById("seasonal");
    seasonalsContainer.innerHTML = '<p style="height: 20px"></p><div class="slideshow-container"></div>';
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
                // Navigate to the seasonals_main anchor when a slide is clicked
                slideDiv.addEventListener('click', function() {
                    document.location = "#seasonals"; // Scrolls to the "seasonals_main" section
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
}*/
function getAppetisers() {
    const appetisersContainer = document.getElementById("appetisers");
    appetisersContainer.innerHTML = '<h2 style="padding-top: 30px;">Appetisers</h2><div class="appetisers-grid"></div>';
    const gridContainer = appetisersContainer.querySelector('.appetisers-grid');

    // Define your appetiser collections here
    const appetiserCollections = ["appetisers_1"];//, "appetisers_2", "appetisers_3", "appetisers_4", "appetisers_5", "appetisers_6", "appetisers_7", "appetisers_8"]; // Add more as needed

    appetiserCollections.forEach((collectionName) => {
        const itemsRef = db.collection("User").doc(userId).collection("History");

        itemsRef.orderBy("count", "desc").get().then((snapshot) => {
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
function getMains() {
    const mainsContainer = document.getElementById("mains");
    mainsContainer.innerHTML = '<h2 style="padding-top: 30px;">Mains</h2><div class="mains-grid"></div>';
    const gridContainer = mainsContainer.querySelector('.mains-grid');

    // Define your mains collections here
    const mainsCollections = ["mains_1"];//, "mains_2", "mains_3", "mains_4", "mains_5", "mains_6", "mains_7", "mains_8"]; // Add more as needed

    mainsCollections.forEach((collectionName) => {
        const itemsRef = db.collection("User").doc(userId).collection("History").doc("mains").collection("mains");

        itemsRef.orderBy("count", "desc").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                // In both getAppetisers and getMains functions, inside the snapshot.forEach loop:
                const itemData = doc.data();
                itemData.quantity = 0; // Ensure quantity is initialized as a number

                const itemDiv = document.createElement("div");
                itemDiv.className = "main-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">0</span>
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
    sidesContainer.innerHTML = '<h2 style="padding-top: 30px;">Sides</h2><div class="sides-grid"></div>';
    const gridContainer = sidesContainer.querySelector('.sides-grid');

    // Define your sides collections here
    const sidesCollections = ["sides_1"];//, "sides_2", "sides_3", "sides_4", "sides_5", "sides_6", "sides_7", "sides_8"]; // Add more as needed

    sidesCollections.forEach((collectionName) => {
        const itemsRef = db.collection("User").doc(userId).collection("History").doc("sides").collection("sides");

        itemsRef.orderBy("count", "desc").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                itemData.quantity = 0; // Ensure quantity is initialized as a number
                const itemDiv = document.createElement("div");
                itemDiv.className = "side-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">0</span>
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
    dessertsContainer.innerHTML = '<h2 style="padding-top: 30px;">Desserts</h2><div class="desserts-grid"></div>';
    const gridContainer = dessertsContainer.querySelector('.desserts-grid');

    // Define your desserts collections here
    const dessertsCollections = ["desserts_1"];//, "desserts_2", "desserts_3", "desserts_4", "desserts_5", "desserts_6", "desserts_7", "desserts_8"]; // Add more as needed

    dessertsCollections.forEach((collectionName) => {
        const itemsRef = db.collection("User").doc(userId).collection("History").doc("desserts").collection("desserts");

        itemsRef.orderBy("count", "desc").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                itemData.quantity = 0; // Ensure quantity is initialized as a number
                const itemDiv = document.createElement("div");
                itemDiv.className = "dessert-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">0</span>
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
    drinksContainer.innerHTML = '<h2 style="padding-top: 30px;">Drinks</h2><div class="drinks-grid"></div>';
    const gridContainer = drinksContainer.querySelector('.drinks-grid');

    // Define your drinks collections here
    const drinksCollections = ["drinks_1"];//, "drinks_2", "drinks_3","drinks_4"]; // Add more as needed

    drinksCollections.forEach((collectionName) => {
        const itemsRef = db.collection("User").doc(userId).collection("History").doc("drinks").collection("drinks");

        itemsRef.orderBy("count", "desc").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                itemData.quantity = 0; // Ensure quantity is initialized as a number
                const itemDiv = document.createElement("div");
                itemDiv.className = "drink-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                    <div class="quantity-controls">
                        <span class="minus">-</span>
                        <span class="quantity">0</span>
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
    seasonalsMainContainer.innerHTML = '<h2 style="padding-top: 30px;">Seasonals</h2><div class="seasonals-main-grid"></div>';
    const gridContainer = seasonalsMainContainer.querySelector('.seasonals-main-grid');

    const seasonalsMainCollections = ["seasonal_1", "seasonal_2", "seasonal_3", "seasonal_4", "seasonal_5", "seasonal_6", "seasonal_7", "seasonal_8"]; // Add more as needed

    seasonalsMainCollections.forEach((collectionName) => {
        const itemsRef = db.collection("Menu").doc("seasonals").collection(collectionName);

        itemsRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const itemData = doc.data();
                itemData.quantity = 0; // Initialize the quantity of the item
                const itemDiv = document.createElement("div");
                itemDiv.className = "seasonals-main-item";
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
//getMenuItems();


function addToOrder(item) {
    // Find the item in the currentOrder
    let orderItem = currentOrder.find(order => order.food_name === item.food_name);

    if (orderItem) {
        // If quantity is not a number, initialize to 0
        if (isNaN(orderItem.quantity)) {
            orderItem.quantity = 0;
        }
        orderItem.quantity += 1;
    } else {
        // Add new item to currentOrder with quantity initialized to 1
        currentOrder.push({
            ...item,
            quantity: 1
        });
    }
    updateCartTotal();

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

    console.log("Current Order:", currentOrder);
}
function updateCartTotal() {
    let totalAmount = currentOrder.reduce((total, item) => total + (item.quantity * item.price), 0);
    document.getElementById('cart-total-amount').textContent = `$${totalAmount.toFixed(2)}`;
}