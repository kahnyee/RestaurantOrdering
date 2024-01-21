<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Delicious Food Menu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="common.css" rel="stylesheet" type="text/css">
    <style>
        /* Custom CSS for the sidebar to match the uploaded image */
        .sidebar {
            background-color: #303030; /* Dark background for sidebar */
            color: white; /* White text color */
            min-height: 100vh; /* Full height */
        }
        .sidebar-sticky {
            position: sticky;
            top: 0; /* Stick to the top of the viewport */
            padding-top: 20px;
        }
        .sidebar h2, .sidebar h1 {
            text-align: center;
        }
        .sidebar h2 {
            font-size: 1.5rem; /* Adjust size as needed */
            margin-bottom: 0;
        }
        .sidebar h1 {
            font-size: 3rem; /* Adjust size as needed */
            margin-top: 0;
        }
        .nav-link {
            color: white; /* White text for links */
            padding: 10px 15px; /* Spacing for links */
        }
        .nav-link:hover, .nav-link:focus {
            color: #f8f9fa; /* Lighter text on hover */
            text-decoration: none;
            background-color: #495057; /* Dark background for active state */
        }
        .nav-item {
            margin-bottom: 1rem;
        }
        .nav-item:last-child {
            margin-bottom: 0;
        }
        .nav-item .nav-link.active {
            background-color: #495057; /* Dark background for active state */
            border-radius: 0.25rem;
        }
        /* Additional custom styles */
        /* ... */
    </style>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
            <div class="sidebar-sticky">
                <h2>Table No:</h2>
                <h1>69</h1>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="#menu" class="nav-link active">Menu</a></li>
                    <li class="nav-item"><a href="#seasonals" class="nav-link">Seasonals</a></li>
                    <li class="nav-item"><a href="#appetisers" class="nav-link">Appetisers</a></li>
                    <li class="nav-item"><a href="#mains" class="nav-link">Mains</a></li>
                    <li class="nav-item"><a href="#sides" class="nav-link">Sides</a></li>
                    <li class="nav-item"><a href="#desserts" class="nav-link">Desserts</a></li>
                    <li class="nav-item"><a href="#drinks" class="nav-link">Drinks</a></li>
                    <li class="nav-item"><a href="members.php" class="nav-link">Members</a></li>
                    <li class="nav-item"><a href="aboutus.php" class="nav-link">About Us</a></li>
                    <li class="nav-item"><a href="contactus.php" class="nav-link">Contact Us</a></li>
                </ul>
            </div>
        </nav>

        <!-- Main Content Area -->
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <section id="menu">
                <h2>Menu</h2>
                <p>Details about the menu items...</p>
            </section>
            <!-- Repeat for other sections -->
        </main>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMneT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>