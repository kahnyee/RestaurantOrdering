try {
    var cartItem = JSON.parse(sessionStorage.getItem('currentOrder')) || [];
} catch (error) {
    // Handle the error here, e.g., set cartItem to an empty array
    console.error('Error parsing JSON:', error);
    cartItem = [];
}

let total = 0;

function updateTotals() {
    let subtotal = cartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Retrieve discount from sessionStorage, use 0 if not available
    let discountValue = sessionStorage.getItem('discounts');
    let discount = discountValue ? parseInt(discountValue) : 0;

    let gst = (subtotal) * 0.09; // GST at 9%
    let service = (subtotal) * 0.10; // Service charge at 10%
    total = subtotal - discount + gst + service;

    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `GST (9%): $${gst.toFixed(2)}`;
    document.getElementById('service').textContent = `Service (10%): $${service.toFixed(2)}`;
    document.getElementById('discount').textContent = `Discount: -$${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}


function changeQuantity(index, isAdding) {
    let itemPrice = cartItem[index].price; // Get the price of the item
    let discounted = parseInt(sessionStorage.getItem('total'));
    let counted = total - itemPrice;

    if (isAdding) {
        cartItem[index].quantity++;
    } else {
        if (counted >= 0) {
            if (cartItem[index].quantity > 1) {
                cartItem[index].quantity--;
            } else {
                // Remove the item from the cart if quantity is 1 and we're decreasing it
                cartItem.splice(index, 1);
            }
        } else {
            alert("Total cannot be less than $0!")
        }
    }
    displayOrderedItemsAndTotal();
    updateTotals();
    // Save to sessionStorage immediately after the change
    sessionStorage.setItem('currentOrder', JSON.stringify(cartItem));
    sessionStorage.setItem('total', String(counted));
}


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
        <div class="quantity-control d-flex align-items-center">
            <button class="quantity-btn decrease" onclick="changeQuantity(${index}, false)">-</button>
            <span class="quantity-display mx-2">${item.quantity}</span>
            <button class="quantity-btn increase" onclick="changeQuantity(${index}, true)">+</button>
        </div>
        <div class="price">
            $${(item.price * item.quantity).toFixed(2)}
        </div>
    `;
        orderListContainer.appendChild(itemContainer);
    });

    if (cartItem.length === 0) {
        document.getElementById('totals-container').style.display = 'none';
        // Optionally, display a message that the order list is empty
        orderListContainer.innerHTML = '<p>Your order list is empty.</p>';
    } else {
        document.getElementById('totals-container').style.display = 'block';
    }

}
function redirectToPaymentPage() {
    sessionStorage.setItem('total', total);
    window.location.href = 'payment.html';
}

// Initialize display and totals on page load
displayOrderedItemsAndTotal();
updateTotals();
sessionStorage.setItem('total', total);


// Save cartItem back to sessionStorage if needed
window.onbeforeunload = function() {
    sessionStorage.setItem('currentOrder', JSON.stringify(cartItem));
};
