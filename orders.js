
function calculateTotalPrice(cartItem){
    let totalPrice = 0;
    cartItem.forEach(item =>{
        totalPrice += item.price * item.quantity;

    });
    console.log(totalPrice);
    return  totalPrice;
}
//Function
function displayOrderedItemsAndTotal(cartItem, totalPrice){
    const orderListContainer = document.getElementById('orderListContainer');

    orderListContainer.innerHTML="";

    const orderList = document.createElement('ul');

    cartItem.forEach(item => {
        const listItem = document.createElement('li');

        listItem.innerHTML= `<img src="${item.imageURL}" alt="${item.food_name}" style="width:10%; height:10%; margin: 0.25rem;"/> ${item.food_name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;


        //listItem.textContent = '${item.food_name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}'

        orderList.appendChild(listItem);
    });

    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    orderListContainer.appendChild(orderList);
    orderListContainer.appendChild(totalElement);


}
const totalPrice = calculateTotalPrice(cartItem);
displayOrderedItemsAndTotal(cartItem, totalPrice);