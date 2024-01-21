<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order List</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="common.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"> <!-- Font Awesome for icons -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet"> <!-- Google Fonts for custom font -->
    <style>
        .sidebar {
            background-color: #303030; /* Dark background color */
            color: white;
            min-height: 100vh;
            font-family: 'Roboto', sans-serif; /* Custom font */
        }
        .sidebar-sticky {
            position: sticky;
            top: 10px;
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
    </style>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-3 col-lg-2 d-md-block sidebar"> <!-- Remove bg-gradient to keep the dark color theme -->
            <div class="sidebar-sticky">
                <h2>Table No:</h2>
                <h1>69</h1>
                <div class="sidebar-divider"></div>

                <div class="nav-title">Menu</div>
                <ul class="nav flex-column">
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#seasonals" class="nav-link">
                            <i class="fas fa-leaf mr-2"></i> &nbsp;&nbsp;&nbsp;Seasonals <!-- Add icons -->
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#appetisers" class="nav-link">
                            <i class="fas fa-utensils mr-2"></i> &nbsp;&nbsp;&nbsp;Appetisers <!-- Add icons -->
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#mains" class="nav-link">
                            <i class="fas fa-hamburger mr-2"></i> &nbsp;&nbsp;&nbsp;Mains <!-- Add icons -->
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#sides" class="nav-link">
                            <i class="fas fa-utensil-spoon mr-2"></i> &nbsp;&nbsp;&nbsp;Sides <!-- Add icons -->
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#desserts" class="nav-link">
                            <i class="fas fa-cookie mr-2"></i> &nbsp;&nbsp;&nbsp;Desserts <!-- Add icons -->
                        </a>
                    </li>
                    <li class="nav-item nav-subitem">
                        <a href="menu.php#drinks" class="nav-link">
                            <i class="fas fa-coffee mr-2"></i> &nbsp;&nbsp;&nbsp;Drinks <!-- Add icons -->
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
                    <li class="nav-item"><a href="contactus.php" class="nav-link">Contact Us</a></li>
                </ul>
            </div>
        </nav>

        <!-- Main Content Area -->
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <section id="seasonals">
                <h2 style="margin-top: 27px;">Order List</h2>
                <p>Details about the menu items...</p>
                <p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p>
            </section>
        </main>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>