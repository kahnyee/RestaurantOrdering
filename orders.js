function displayOrderList() {
    // Send an AJAX request to fetch the order list from your PHP script
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_orders.php", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var orderList = JSON.parse(xhr.responseText);
            var orderListContainer = document.getElementById("orderListContainer");

            // Check if there are any order items
            if (orderList.length > 0) {
                var orderListHTML = "<ul>";
                for (var i = 0; i < orderList.length; i++) {
                    orderListHTML += "<li>" + orderList[i].food_name + " - " + orderList[i].price + "</li>";
                }
                orderListHTML += "</ul>";
                orderListContainer.innerHTML = orderListHTML;
            } else {
                orderListContainer.innerHTML = "No items in the order list.";
            }
        }
    };

    xhr.send();
}

// Call the displayOrderList function when the page loads
window.onload = function() {
    displayOrderList();
}
