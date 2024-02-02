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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);



var cartItem = JSON.parse(sessionStorage.getItem('currentOrder')) || [];
let total = 0;

// Function to clear cart and total from sessionStorage by setting them to blank

function displayOrderedItemsAndTotal() {
    const orderListContainer = document.getElementById('orderListContainer');
    orderListContainer.innerHTML = ""; // Clear the container before re-rendering

    cartItem.forEach((item, index) => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'order-item d-flex align-items-center justify-content-between p-2';
        const imageElement = item.imageURL ? `<img src="${item.imageURL}" alt="${item.food_name}" class="order-image mr-2" style="width:50px; height:50px; object-fit: cover;">` : '';
        itemContainer.innerHTML = `
        <div class="food-name-container">
            <span class="food-name">${imageElement} ${item.food_name}</span>
        </div>
        <div class="price">
            $${(item.price * item.quantity).toFixed(2)}
        </div>
    `;
        orderListContainer.appendChild(itemContainer);
    });

    // If there are no items, you might want to hide the totals or display a message
    if (cartItem.length === 0) {
        document.getElementById('totals-container').style.display = 'none';
        // Optionally, display a message that the order list is empty
        orderListContainer.innerHTML = '<p>Your order list is empty.</p>';
    } else {
        document.getElementById('totals-container').style.display = 'block';
    }
}
function getCategoryByName(itemName) {
    // Define mappings of item names to categories
    const categoryMappings = {
        // Example mappings, extend this based on your actual items
        'Canapes': 'appetisers',
        'Bruschetta':'appetisers',
        'Cheddar & Bacon':'appetisers',
        'Clam Dip':'appetisers',
        'Buratta Salad':'appetisers',
        'Spicy Tuna Tartare':'appetisers',
        'Caesar Salad':'appetisers',
        'Seabass Carparccio':'appetisers',

        'Oreo Pudding':'desserts',
        'Berry Cheesecake':'desserts',
        'Red Velvet':'desserts',
        'Tiramisu':'desserts',
        'Crème Brûlée':'desserts',
        'PannaCotta':'desserts',
        'Mochi':'desserts',
        'Apple Pie':'desserts',

        'Sprite':'drinks',
        'Coke':'drinks',
        'Sparkling Water':'drinks',
        'Iced Lemon Tea':'drinks',

        'Cauliflower Steak':'mains',
        'Fish & Chips':'mains',
        'Aristocrat Burger':'mains',
        'Iberico Pork Chop':'mains',
        'Tonkotsu Ramen':'mains',
        'Beef Bolognese ':'mains',
        'Lobster Tagliatelelle':'mains',
        'Classic King Crab':'mains',

        'Valentine Beef':'seasonals',
        'Neapolitan Pizza':'seasonals',
        'Grilled Lamb':'seasonals',
        'Bacon Wrapped':'seasonals',
        'Lobster Bisque':'seasonals',
        'Olive Tapenade':'seasonals',
        'Paella':'seasonals',
        'Spinach Pie':'seasonals',

        'Koffman\'s Fries':'sides',
        'Macaroni & Cheese':'sides',
        'Brie Mashed Potato':'sides',
        'Glazed Meatballs':'sides',
        'Chicken Gyoza':'sides',
        'Crusted Calamari':'sides',
        'Green Beans':'sides',
        'Nachos':'sides',

        // Add more mappings as necessary
    };

    // Default category if the item's name does not match any mapping
    const defaultCategory = 'others';

    // Determine the category based on the item's name, or use the default
    return categoryMappings[itemName] || defaultCategory;
}


async function uploadOrderHistorySequentially() {
    const userUID = sessionStorage.getItem('userUID');
    if (!userUID) {
        console.error("UserUID is not available in session storage.");
        alert("Error: User not identified.");
        return;
    }

    if (cartItem.length === 0) {
        console.error("Cart is empty.");
        alert("Error: No items in the cart to upload.");
        return;
    }

    const historyRef = db.collection('User').doc(userUID).collection('History');

    for (const item of cartItem) {
        try {
            const category = getCategoryByName(item.food_name);
            const categoryRef = historyRef.doc(category).collection(category);

            // Fetch the current items to determine the next index
            const snapshot = await categoryRef.get();
            const itemCount = snapshot.docs.length;
            const nextIndex = itemCount + 1;
            const itemNameFormatted = `${category}_${nextIndex}`;

            const itemRef = categoryRef.doc(itemNameFormatted);

            await itemRef.set({
                food_name: item.food_name,
                imageURL: item.imageURL,
                price: item.price,
                count: item.quantity || 1
            });

            console.log(`Successfully added/updated ${itemNameFormatted} in history.`);
        } catch (error) {
            console.error(`Error adding/updating item in history: ${item.food_name}`, error);
        }
    }
}





function updateTotals() {
    let subtotal = cartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = parseInt(sessionStorage.getItem('discounts')); // Default discount value
    let gst = (subtotal) * 0.09; // GST at 9%
    let service = (subtotal) * 0.10; // Service charge at 10%
    total = subtotal - discount + gst + service;

    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `GST (9%): $${gst.toFixed(2)}`;
    document.getElementById('service').textContent = `Service (10%): $${service.toFixed(2)}`;
    document.getElementById('discount').textContent = `Discount: -$${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function savePoints() {
    let userPoints = parseInt(sessionStorage.getItem('points'), 10); // Convert to a number
    let total = parseInt(sessionStorage.getItem('total'), 10);
    userPoints += calculatePointsBasedOnTotal(total);

    // Update points in Firestore
    const userUID = sessionStorage.getItem('userUID');
    db.collection('User').doc(userUID).update({ points: userPoints })
        .then(() => {
            console.log("Points updated successfully");
            return db.collection('User').doc(userUID).get(); // Fetch the updated points
        })
        .then(doc => {
            if (doc.exists) {
                const updatedPoints = doc.data().points;
                sessionStorage.setItem('points', updatedPoints); // Update sessionStorage
                updatePointsDisplay(updatedPoints); // Update points display on the web page
            }
        })
        .catch(error => console.error("Error updating points:", error));
}


function calculatePointsBasedOnTotal(total) {
    let points = 0;

    if (total > 500) {
        points = Math.floor(total) * 2; // 2x points for totals more than $500
    } else if (total > 200) {
        points = Math.floor(total) * 1.5; // 1.5x points for totals more than $200
    } else {
        points = Math.floor(total); // 1 point for every dollar for totals up to $200
    }

    return Math.floor(points); // Truncate the points to a whole number
}
function updatePointsDisplay(points) {
    // Assuming you have an element with id 'points-display' to show the points
    const pointsDisplay = document.getElementById('points-display');
    if (pointsDisplay) {
        pointsDisplay.textContent = `Your Points: ${points}`;
    }
}

function uploadOrderToFirestore() {
    const userUID = sessionStorage.getItem('userUID');
    if (!userUID) {
        console.error("UserUID is not available in session storage.");
        alert("Error: User not identified.");
        return;
    }

    if (cartItem.length === 0) {
        console.error("Cart is empty.");
        alert("Error: No items in the cart to upload.");
        return;
    }

    const userRef = db.collection('User').doc(userUID);
    const previousOrdersRef = userRef.collection('PreviousOrders').doc('PreviousOrders');

    return db.runTransaction(async transaction => {
        const doc = await transaction.get(previousOrdersRef);
        let newOrderNumber = 1;

        if (doc.exists) {
            newOrderNumber = doc.data().lastOrderNumber ? doc.data().lastOrderNumber + 1 : 1;
        }

        const newOrderRef = previousOrdersRef.collection(String(newOrderNumber)); // Use just the number as the collection name
        cartItem.forEach(item => {
            const newItemRef = newOrderRef.doc();
            transaction.set(newItemRef, item);
        });

        // Update the lastOrderNumber in the PreviousOrders document
        transaction.set(previousOrdersRef, { lastOrderNumber: newOrderNumber }, { merge: true });

        return newOrderNumber;
    }).then(orderNumber => {
        console.log("Order uploaded successfully. Order Number:", orderNumber);
    }).catch(error => {
        console.error("Transaction failed: ", error);
        alert("Error uploading order: " + error.message);
    });
}



// Initialize display and totals on page load
displayOrderedItemsAndTotal();
updateTotals();
savePoints();
uploadOrderToFirestore();
uploadOrderHistorySequentially();

// Save cartItem back to sessionStorage if needed
window.onbeforeunload = function() {
    sessionStorage.setItem('currentOrder', '');
    sessionStorage.setItem('total', '');
    sessionStorage.setItem('sessionInitialized', 'false');
    sessionStorage.setItem('discounts', '0');
};
