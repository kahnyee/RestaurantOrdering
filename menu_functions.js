

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

// Call the function to get menu items
getMenuItems();


function addToOrder(item) {
    currentOrder.push({
        food_name: item.food_name,
        price: item.price,
        imageUrl: item.imageURL
    });
    console.log("Current Order:", currentOrder); // For debugging
    // Here, you can also update the UI to reflect the current order
}

// Call the function to get menu items
getMenuItems();
