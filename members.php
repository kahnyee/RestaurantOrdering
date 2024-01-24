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
                <div style="margin-bottom: 2000px"></div>
            </div>
        </nav>

        <main class="col-12 col-md-9 col-lg-10 px-md-4 scrollable-section shift-down">
            <div class="d-flex align-items-center justify-content-center" style="min-height: 90vh;">
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="signup-form">
                                <h1 class="text-center" style="margin-bottom: 10px;">User Login</h1>
                                <p class="text-center">Welcome back!</p>
                                <form id="loginForm" onsubmit="event.preventDefault(); validateLogin();">
                                    <div class="form-group" style="margin-bottom: 10px">
                                        <label for="email">Email Address</label>
                                        <input type="email" class="form-control" id="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" id="password" required>
                                    </div>
                                    <button type="submit" class="btn-primary btn-block mt-4" style="background-color: #303030; color: #B0B0B0; height: 35px; width: 70px">Login</button>
                                </form>
                                <div class="text-center mt-3">
                                    Haven't created an account? <a href="membersSignUp.php">Sign up here</a>
                                </div>
                            </div>
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
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

    const firebaseConfig = {
        apiKey: "AIzaSyCGlbYNPvPFE7ByacA1SdeA2mUHqbE_vxg",
        authDomain: "deliciousfood-c9efa.firebaseapp.com",
        projectId: "deliciousfood-c9efa",
        storageBucket: "deliciousfood-c9efa.appspot.com",
        messagingSenderId: "682668950894",
        appId: "1:682668950894:web:e1d6e07ade038a3ab32d7f",
        measurementId: "G-ZG7EGGBSS4"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);

    async function validateLogin() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            window.location.href = 'personalised.php';
        } catch (error) {
            alert("Invalid email or password.");
        }
    }

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        validateLogin();
    });
</script>

<script src="sidebar.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>