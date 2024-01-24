<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Members Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="common.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
</head>
<body>
<button class="btn btn-primary d-md-none" type="button" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>
<div class="mobile-bg" id="mobileBg"></div>
<div class="container-fluid">
    <div class="row">
        <nav class="col-md-3 col-lg-2 d-md-block sidebar scrollable-section shift-down" id="sidebar">
            <div class="sidebar-sticky">
                <h2 style="padding-top: 13px">Table No:</h2>
                <h1>01</h1>
                <div class="sidebar-divider"></div>
                <div class="nav-title">Menu</div>
                <ul class="nav flex-column">
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#seasonals" class="nav-link">
                            <i class="fas fa-leaf mr-2"></i> &nbsp;&nbsp;&nbsp;Seasonals
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#appetisers" class="nav-link">
                            <i class="fas fa-utensils mr-2"></i> &nbsp;&nbsp;&nbsp;Appetisers
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#mains" class="nav-link">
                            <i class="fas fa-hamburger mr-2"></i> &nbsp;&nbsp;&nbsp;Mains
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#sides" class="nav-link">
                            <i class="fas fa-utensil-spoon mr-2"></i> &nbsp;&nbsp;&nbsp;Sides
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#desserts" class="nav-link">
                            <i class="fas fa-cookie mr-2"></i> &nbsp;&nbsp;&nbsp;Desserts
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#drinks" class="nav-link">
                            <i class="fas fa-coffee mr-2"></i> &nbsp;&nbsp;&nbsp;Drinks
                        </a>
                    </li>
                </ul>
                <div class="sidebar-divider"></div>
                <div class="nav-title">Members</div>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="members.php" class="nav-link">Personals</a></li>
                    <li class="nav-item"><a href="members.php" class="nav-link">Redeem</a></li>
                </ul>
                <div class="sidebar-divider"></div>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="aboutus.html" class="nav-link">About Us</a></li>
                    <li class="nav-item" style="padding-bottom: 20px"><a href="contactus.html" class="nav-link">Contact Us</a></li>
                </ul>
            </div>
        </nav>
        <main class="col-12 col-md-9 col-lg-10 px-md-4 scrollable-section shift-down">
            <div class="container mt-5">
                <!-- Tabs for Sign In and Sign Up -->
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" href="#signin">Sign In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#signup">Sign Up</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <!-- Sign In Tab -->
                    <div class="tab-pane active" id="signin">
                        <div class="container mt-3">
                            <form id="login-form">
                                <div class="mb-3">
                                    <label for="user-email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="user-email" placeholder="Enter email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="user-password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="user-password" placeholder="Password" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>

                    <!-- Sign Up Tab -->
                    <div class="tab-pane fade" id="signup">
                        <div class="container mt-3">
                            <form id="signup-form">
                                <div class="mb-3">
                                    <label for="new-user-email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="new-user-email" placeholder="Enter email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="new-user-password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="new-user-password" placeholder="Password" required>
                                </div>
                                <button type="submit" class="btn btn-success">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<!-- Firebase Authentication -->

<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Sign Up Event
    document.getElementById('signup-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('new-user-email').value;
        const password = document.getElementById('new-user-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = 'redeem.php'; // Redirect to redeem.php
            })
            .catch((error) => {
                // Handle Errors
                console.error('Error:', error.message);
            });
    });

    // Sign In Event
    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                window.location.href = 'redeem.php'; // Redirect to redeem.php
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    });
</script>

<script src="sidebar.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>