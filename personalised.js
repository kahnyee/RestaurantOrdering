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
const userId = sessionStorage.getItem("userUID");

function getMenuItems(menuType) {
    const container = document.getElementById("personalMenu");
    const gridContainer = container.querySelector('.main-grid');

    const collections = {
        "appetisers": "appetisers",
        "mains": "mains",
        "sides": "sides",
        "desserts": "desserts",
        "drinks": "drinks",
        "seasonals": "seasonal"
    };

    const itemsRef = db.collection("User").doc(userId).collection("History").doc(menuType).collection(collections[menuType]);

    itemsRef.orderBy("count", "desc").limit(1).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const itemData = doc.data();

            // Check if the item is already in the order and set its quantity
            let orderItem = currentOrder.find(order => order.food_name === itemData.food_name);
            itemData.quantity = orderItem ? orderItem.quantity : 0;

            const itemDiv = document.createElement("div");
            itemDiv.className = `${menuType}-item`;
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
                itemData.quantity++; // Increase by 1
                itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                addToOrder(itemData);
            });

// Minus icon click event
            itemDiv.querySelector('.minus').addEventListener('click', function() {
                if (itemData.quantity > 0) {
                    itemData.quantity--; // Decrease by 1
                    itemDiv.querySelector('.quantity').textContent = itemData.quantity;
                    removeFromOrder(itemData);
                }
            });

            gridContainer.appendChild(itemDiv);
        });
    }).catch((error) => {
        console.error(`Error getting items from ${collectionName}:`, error);
    });
}

function getLatestOrder() {
    const userRef = db.collection('User').doc(userId);
    const previousOrdersRef = userRef.collection('PreviousOrders').doc('PreviousOrders');

    previousOrdersRef.get().then(doc => {
        if (doc.exists && doc.data().lastOrderNumber) {
            const lastOrderNumber = doc.data().lastOrderNumber;
            const latestOrderRef = previousOrdersRef.collection(String(lastOrderNumber));
            fetchOrderItems(latestOrderRef);
        } else {
            console.log("No previous orders found.");
        }
    }).catch(error => {
        console.error("Error fetching latest order: ", error);
    });
}

function fetchOrderItems(orderRef) {
    const latestOrderContainer = document.getElementById('latest-order');
    latestOrderContainer.innerHTML = ''; // Clear previous content

    orderRef.get().then(snapshot => {
        if (!snapshot.empty) {
            latestOrderContainer.innerHTML = '<h2 style="padding-top: 30px;">Latest Order</h2>';
            const gridContainer = document.createElement('div');
            gridContainer.className = 'past-grid';
            gridContainer.style = 'margin-bottom: -15px;'; // Add margin to the bottom of grid container

            snapshot.forEach(doc => {
                const itemData = doc.data();
                const itemDiv = document.createElement("div");
                itemDiv.className = "past-item";
                itemDiv.innerHTML = `
                    <img src="${itemData.imageURL}" style="width:100%">
                    <div class="text">${itemData.food_name} <br>$${itemData.price}</br></div>
                `;
                gridContainer.appendChild(itemDiv);
            });

            latestOrderContainer.appendChild(gridContainer);

            // Add 'Add to Cart' button
            const addButton = document.createElement('input');
            addButton.type = 'button';
            addButton.value = 'Add order to cart';
            addButton.className = 'btn-primary btn-block mt-4';
            addButton.style = 'background-color: #303030; color: #B0B0B0; height: 40px;';
            addButton.onclick = () => addOrderToCart(snapshot.docs.map(doc => doc.data()));
            latestOrderContainer.appendChild(addButton);
        } else {
            latestOrderContainer.innerHTML = '<p>No items in the latest order.</p>';
        }
    }).catch(error => {
        console.error("Error fetching items from the order: ", error);
    });
}


function addOrderToCart(orderItems) {
    orderItems.forEach(item => addToOrder(item));
    updateCartTotal();
    saveOrderToSession();
    window.location.href = 'orders.html';
}



// Functions to manage the order
function addToOrder(item) {
    console.log("Before addToOrder:", currentOrder);

    let orderItem = currentOrder.find(order => order.food_name === item.food_name);
    if (orderItem) {
        orderItem.quantity += 1; // Increase only by 1, regardless of item.quantity
    } else {
        currentOrder.push({
            ...item,
            quantity: 1 // Start with 1, not item.quantity
        });
    }

    console.log("After addToOrder:", currentOrder);

    updateCartTotal();
    saveOrderToSession();
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
function updateCartTotal() {
    let totalAmount = currentOrder.reduce((total, item) => total + (item.quantity * item.price), 0);
    document.getElementById('cart-total-amount').textContent = `$${totalAmount.toFixed(2)}`;
}
function saveOrderToSession() {
    sessionStorage.setItem('currentOrder', JSON.stringify(currentOrder));
}

function loadOrderFromSession() {
    const savedOrder = sessionStorage.getItem('currentOrder');
    if (savedOrder) {
        try {
            currentOrder = JSON.parse(savedOrder);
        } catch (error) {
            console.error("Error parsing order from session storage:", error);
            currentOrder = [];
        }
    } else {
        currentOrder = [];
    }
}


// Initialize
function initialize() {
    getMenuItems("appetisers");
    getMenuItems("mains");
    getMenuItems("sides");
    getMenuItems("desserts");
    getMenuItems("drinks");
    // getMenuItems("seasonals"); // Uncomment if needed
    loadOrderFromSession();
    updateCartTotal();
    getLatestOrder();
}
function displayItem(itemData) {
    const container = document.getElementById('orderListContainer'); // Make sure this is the correct ID
    const itemDiv = document.createElement("div");
    itemDiv.className = 'order-item';
    itemDiv.innerHTML = `
        <img src="${itemData.imageURL}" alt="${itemData.food_name}" style="width:50px; height:50px;">
        <div>${itemData.food_name}</div>
        <div>Quantity: ${itemData.quantity}</div>
        <div>Price: $${itemData.price.toFixed(2)}</div>
    `;
    container.appendChild(itemDiv);
}

initialize();
