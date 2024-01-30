<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Delicious Food Menu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="common.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <link href="menu.css" rel="stylesheet">
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
                        <a href="#appetisers" class="nav-link">
                            <i class="fas fa-utensils mr-2"></i> &nbsp;&nbsp;&nbsp;Appetisers
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="#mains" class="nav-link">
                            <i class="fas fa-hamburger mr-2"></i> &nbsp;&nbsp;&nbsp;Mains
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="#sides" class="nav-link">
                            <i class="fas fa-utensil-spoon mr-2"></i> &nbsp;&nbsp;&nbsp;Sides
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="#desserts" class="nav-link">
                            <i class="fas fa-cookie mr-2"></i> &nbsp;&nbsp;&nbsp;Desserts
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="#drinks" class="nav-link">
                            <i class="fas fa-coffee mr-2"></i> &nbsp;&nbsp;&nbsp;Drinks
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="#seasonals" class="nav-link">
                            <i class="fas fa-leaf mr-2"></i> &nbsp;&nbsp;&nbsp;Seasonals
                        </a>
                    </li>
                </ul>
                <div class="sidebar-divider"></div>
                <div class="nav-title">Members</div>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="auto_validation_personals.html" class="nav-link">Personals</a></li>
                    <li class="nav-item"><a href="auto_validation_redeem.html" class="nav-link">Redeem</a></li>
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
            <div class="shopping-cart-container">
                <a href="orders.php" class="shopping-cart-link" id="shopping-cart-link">
                    <i class="fas fa-shopping-cart"></i>
                    <span id="cart-total-amount">$0</span>
                </a>
                <script>
                    document.getElementById('shopping-cart-link').onclick=function (){
                        sessionStorage.setItem('TheArray', JSON.stringify(currentOrder));
                        window.location.href='orders.php';
                    }
                </script>
            </div>
            <section id="seasonal">
                <div class="slideshow-container">
                    <div class="dot-container">
                        <span class="dot" onclick="currentSlide(1)"></span> <!-- for the first slide -->
                        <span class="dot" onclick="currentSlide(2)"></span>
                    </div>
                </div>
            </section>

            <section id="appetisers">
            </section>
            <section id="mains">
            </section>
            <section id="sides">
            </section>
            <section id="desserts">
            </section>
            <section id="drinks">
            </section>
            <section id="seasonals">
            </section>
        </main>
    </div>
</div>
<!-- Firebase App (the core Firebase SDK) -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<!-- Add Firebase products that you want to use -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<!-- Then load your custom script -->
<script src="menu.js"></script>
<script src="sidebar.js"></script>
<script src="menu_functions.js"></script>
<script src="orders.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>