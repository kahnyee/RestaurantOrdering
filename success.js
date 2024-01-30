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

function updateTotals() {
    let subtotal = cartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0; // Default discount value
    let gst = (subtotal - discount) * 0.09; // GST at 9%
    let service = (subtotal - discount) * 0.10; // Service charge at 10%
    total = subtotal - discount + gst + service;

    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `Discount: - $${discount.toFixed(2)}`;
    document.getElementById('gst').textContent = `GST Inclusive: $${gst.toFixed(2)}`;
    document.getElementById('service').textContent = `Service (10%): $${service.toFixed(2)}`;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize display and totals on page load
displayOrderedItemsAndTotal();
updateTotals();

// Save cartItem back to sessionStorage if needed
window.onbeforeunload = function() {
    sessionStorage.setItem('currentOrder', '');
    sessionStorage.setItem('total', '');
};
