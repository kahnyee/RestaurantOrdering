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

initializeSessionAfterLogin();

document.getElementById('point-amount').innerHTML = sessionStorage.getItem('points');

function redeemOffer(discount, point) {
    let userPoints = parseInt(sessionStorage.getItem('points'), 10);
    let total = parseInt(sessionStorage.getItem('total'), 10);
    if (discount <= total) {
        if (userPoints >= point) {
            let text = "This will deduct your points. Are you?";
            if (confirm(text) == true) {
                let newPoints = userPoints - point;
                sessionStorage.setItem('points', newPoints);
                let discounts = parseInt(sessionStorage.getItem('discounts')) + discount;
                sessionStorage.setItem('discounts', discounts);
                console.log(discounts);
                updatePointsDisplay(newPoints);
                updateFirestorePoints(newPoints); // Update points in Firestore
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
function updateFirestorePoints(newPoints) {
    const userUID = sessionStorage.getItem('userUID');
    if (userUID) {
        db.collection('User').doc(userUID).update({ points: newPoints })
            .then(() => console.log("Firestore points updated successfully"))
            .catch(error => console.error("Error updating points in Firestore:", error));
    }
}

function updatePointsDisplay(points) {
    const pointsDisplay = document.getElementById('point-amount');
    if (pointsDisplay) {
        pointsDisplay.textContent = points ?? '0'; // Display '0' if points are null or undefined
    }
}
function initializeSessionAfterLogin() {
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
}