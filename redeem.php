<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Redeem</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="common.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <style>
        .scrollable-section::-webkit-scrollbar {
            display: none;
        }
        .scrollable-section {
            -ms-overflow-style: none;
            scrollbar-width: none;
            max-height: 100vh;
            overflow-y: auto;
        }
        .sidebar {
            background-color: #303030;
            color: white;
            font-family: 'Roboto', sans-serif;
        }
        .sidebar-sticky {
            position: sticky;
            top: 0;
            padding-top: 20px;
        }
        .sidebar h2, .sidebar h1 {
            text-align: center;
        }
        .sidebar h2 {
            font-size: xx-large;
            margin-bottom: 0;
        }
        .sidebar h1 {
            font-size: 4rem;
            margin-top: 0;
            margin-bottom: 20px;
        }
        .nav-link {
            color: white;
            padding: 10px 15px;
        }
        .nav-link:hover, .nav-link:focus {
            color: #f8f9fa;
            text-decoration: none;
            background-color: #495057;
        }
        .nav-item {
            margin-bottom: 1rem;
        }
        .nav-item:last-child {
            margin-bottom: 0;
        }
        .nav-item .nav-link.active {
            background-color: #494949;
            border-radius: 0.25rem;
        }
        .sidebar-divider {
            border-bottom: 1px solid #484848;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .nav-title {
            font-size: larger;
            font-weight: bold;
            padding-left: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .nav-subitem .nav-link {
            padding-left: 30px;
        }
        section h2 {
            font-size: 2.5rem;
        }
        @media (max-width: 767px) {
            .sidebar {
                position: fixed;
                top: 0;
                left: -250px;
                bottom: 0;
                z-index: 1000;
                width: 250px;
                transition: left 0.3s;
            }
            .sidebar.show {
                left: 0;
            }
            .btn.btn-primary.d-md-none {
                position: fixed;
                left: 8px;
                top: 8px;
                z-index: 1050;
                background-color: transparent;
                color: #B0B0B0;
                text-align: left;
                border: none;
                padding-top: 5px;
                padding-left: 15px;
                padding-right: 15px;
            }
            .mobile-bg {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 50px;
                background-color: #303030;
                z-index: 1049;
                opacity: 1;
            }
        }
        @media (max-width: 767px) {
            .sidebar {
                position: fixed;
                top: 25px; /* Shift sidebar down by 35px */
                left: -250px;
                bottom: 0;
                z-index: 1000;
                width: 250px;
                transition: left 0.3s;
            }
            .scrollable-section {
                -ms-overflow-style: none;
                scrollbar-width: none;
                max-height: calc(100vh - 35px);
                overflow-y: auto;
                margin-top: 25px;
            }
        }
    </style>
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
                    <li class="nav-item"><a href="personalised.php" class="nav-link">Personals</a></li>
                    <li class="nav-item"><a href="redeem.php" class="nav-link">Redeem</a></li>
                </ul>
                <div class="sidebar-divider"></div>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="aboutus.php" class="nav-link">About Us</a></li>
                    <li class="nav-item" style="padding-bottom: 20px"><a href="contactus.php" class="nav-link">Contact Us</a></li>
                </ul>
            </div>
        </nav>
        <main class="col-12 col-md-9 col-lg-10 px-md-4 scrollable-section shift-down">
            <section id="redeem">
                <h2 style="padding-top: 30px;">Redeem</h2>
                <p>Details about redeeming discounts</p>
                <p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p>
            </section>
        </main>
    </div>
</div>
<script src="sidebar.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>