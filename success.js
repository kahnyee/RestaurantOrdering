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

function uploadOrderToFirestore() {
    const userUID = sessionStorage.getItem('UserUID');
    if (!userUID) {
        console.error("UserUID is not available in session storage.");
        return;
    }

    const userRef = db.collection('User').doc(userUID);
    const previousOrdersRef = userRef.collection('PreviousOrders').doc('PreviousOrders');

    // Run a transaction to retrieve and increment the nextOrderNumber
    return db.runTransaction(transaction => {
        return transaction.get(previousOrdersRef).then(doc => {
            if (!doc.exists) {
                throw "Document does not exist!";
            }

            let nextOrderNumber = doc.data().nextOrderNumber || 1;

            // Upload each item in the currentOrder
            currentOrder.forEach(item => {
                const orderItemRef = previousOrdersRef.collection(nextOrderNumber.toString()).doc(item.food_name);
                transaction.set(orderItemRef, item);
            });

            // Update the nextOrderNumber for the next transaction
            transaction.update(previousOrdersRef, { nextOrderNumber: nextOrderNumber + 1 });

            return nextOrderNumber; // This value can be used after the transaction completes
        });
    }).then(nextOrderNumber => {
        console.log("Order uploaded successfully with order number:", nextOrderNumber);
    }).catch(error => {
        console.error("Transaction failed: ", error);
    });
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
        .then(() => console.log("Points updated successfully"))
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

// Initialize display and totals on page load
displayOrderedItemsAndTotal();
updateTotals();
savePoints();
uploadOrderToFirestore();

// Save cartItem back to sessionStorage if needed
window.onbeforeunload = function() {
    sessionStorage.setItem('currentOrder', '');
    sessionStorage.setItem('total', '');
    sessionStorage.setItem('sessionInitialized', 'false');
};
