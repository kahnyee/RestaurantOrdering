<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Us</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="common.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <link href="contactus.css" rel="stylesheet">
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
                    <li class="nav-item"><a href="aboutus.php" class="nav-link">About Us</a></li>
                    <li class="nav-item" style="padding-bottom: 20px"><a href="contactus.php" class="nav-link">Contact Us</a></li>
                </ul>
            </div>
        </nav>

        <!-- Main Content Area -->
        <main class="col-12 col-md-9 col-lg-10 px-md-4 scrollable-section shift-down">
            <section id="contact" class="pt-5">
                <div class="container">
                    <div class="text-center mb-5">
                        <h2>Contact Us</h2>
                        <p>Get in touch with us for any queries or reservations.</p>
                        <img src="assets/logo.png" alt="Delicious Food Logo" class="logo mb-3">
                        <h3>Delicious Food</h3>
                        <p>Alessandro Bianchi<br>CEO</p>
                        <p>+65 6246 8078</p>
                        <p><a href="mailto:deliciousfood@contactus.org">DeliciousFood@contactus.org</a></p>
                        <div class="social-icons">
                            <a href="https://www.facebook.com" class="mr-2">
                                <img src="assets/facebook.png" alt="Facebook" class="social-icon-image" style="margin-right: 10px;">
                            </a>
                            <a href="https://www.instagram.com" class="mr-2">
                                <img src="assets/instagram.png" alt="Instagram" class="social-icon-image" style="margin-right: 10px;">
                            </a>
                            <a href="https://www.twitter.com">
                                <img src="assets/twitter.png" alt="Twitter" class="social-icon-image">
                            </a>
                        </div>


                    </div>
                    <h2 class="text-center mb-4 locations-header">Locations</h2>
                    <div class="row justify-content-center">
                        <div class="col-md-6 mb-4">
                            <div class="contact-detail text-center">
                                <img src="assets/restaurant1.webp" alt="Restaurant 1" class="img-fluid mb-2">
                                <p>BenDover Road 7, 177269<br>+65 9027 7661</p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="contact-detail text-center">
                                <img src="assets/restaurant2.jpg" alt="Restaurant 2" class="img-fluid mb-2">
                                <p>MBS, 182991<br>+65 8773 4691</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</div>
<script src="sidebar.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>