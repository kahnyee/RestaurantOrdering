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

// Function to retrieve points
async function getPoints() {
    try {
        const userUID = sessionStorage.getItem('userUID'); // Retrieve user UID from sessionStorage
        if (!userUID) throw new Error('No user UID found in sessionStorage.');

        const userDoc = await db.collection('User').doc(userUID).get();
        if (!userDoc.exists) throw new Error('User document does not exist.');

        const userData = userDoc.data();
        return userData.points;
    } catch (error) {
        console.error('Error getting points:', error);
        return null;
    }
}

// Example usage
if (!sessionStorage.getItem('sessionInitialized')) {
    getPoints().then(points => {
        console.log(points);
        sessionStorage.setItem('points', points);
        sessionStorage.setItem('discounts', '0');

        if (points !== null && document.getElementById('point-amount')) {
            document.getElementById('point-amount').innerHTML = points;
        }

        // Set a flag to indicate the session has been initialized
        sessionStorage.setItem('sessionInitialized', 'true');
    });
}

document.getElementById('point-amount').innerHTML = sessionStorage.getItem('points');

function redeemOffer(discount, point) {
    let userPoints = sessionStorage.getItem('points');
    let total = sessionStorage.getItem('total');
    if (discount <= total) {
        if (userPoints >= point) {
            let text = "This will deduct your points. Are you?";
            if (confirm(text) == true) {
                let points = userPoints - point;
                points = String(points);
                sessionStorage.setItem('points', points);
                let discounts = parseInt(sessionStorage.getItem('discounts')) + discount;
                sessionStorage.setItem('discounts', discounts);
                console.log(discounts);
                updatePointsDisplay(points);
                window.location.href = "orders.html";
            } else {
                alert("Redemption canceled!");
            }
        } else {
            alert("Not enough points!")
        }
    } else {
        alert("Total is less than discount!")
    }
}

function updatePointsDisplay(points) {
    const pointsElement = document.getElementById('point-amount');
    if (pointsElement) {
        pointsElement.innerHTML = points;
    }
}