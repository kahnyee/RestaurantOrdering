/*const firebaseConfig = {
    apiKey: "AIzaSyCGlbYNPvPFE7ByacA1SdeA2mUHqbE_vxg",
    authDomain: "deliciousfood-c9efa.firebaseapp.com",
    projectId: "deliciousfood-c9efa",
    storageBucket: "deliciousfood-c9efa.appspot.com",
    messagingSenderId: "682668950894",
    appId: "1:682668950894:web:e1d6e07ade038a3ab32d7f",
    measurementId: "G-ZG7EGGBSS4"
};
firebase.initializeApp(firebaseConfig); */
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