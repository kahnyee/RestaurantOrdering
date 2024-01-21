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
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <section id="seasonals">
                <h2 style="margin-top: 27px;">Contact Us</h2>

                <table style="margin-left: auto; margin-right:auto">
                    <tr>
                        <td><img src="assets/logo.png" alt="Delicious Food Logo" style="padding-right: 50px; scale: 80%"></td>
                        <td style="font-size: x-large">
                            <a href="mailto:deliciousfood@contactus.org" style="color: #B0B0B0">DeliciousFood@contactus.org</a>
                            <br><br>
                            Dr Ong Shern Wen Benjamin <br>
                            CEO
                            <br><br>
                            +65 8246 8078 <br> <br>
                            <a href="https://www.facebook.com"><img src="assets/facebook.png" alt="Facebook" style="height: 29px; scale: 1.1"></a>
                            <a href="https://www.instagram.com"><img src="assets/instagram.webp" alt="Instagram" style="height: 30px"></a>
                            <a href="https://www.twitter.com"><img src="assets/X_logo.png" alt="X" style="height: 29px"></a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="assets/restaurant.png" alt="Restaurant 1">
                            <br><br>
                            BenDover Road 7 <br>
                            177269 <br><br>
                            +65 9027 7661
                        </td>
                        <td>
                            <img src="assets/restaurant2.png" alt="Restaurant 2">
                            <br><br>
                            MBS <br>
                            182991 <br><br>
                            +65 8773 4691
                        </td>
                    </tr>
                </table>
            </section>
        </main>
    </div>
</div>
<script src="sidebar.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>