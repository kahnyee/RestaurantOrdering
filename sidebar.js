function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
    let mobileBg = document.getElementById("mobileBg");
    mobileBg.classList.toggle("show");
}

document.addEventListener('click', function(event) {
    let sidebar = document.getElementById("sidebar");
    let clickInsideSidebar = sidebar.contains(event.target);
    let clickOnToggleButton = event.target.matches('.btn.btn-primary') || event.target.matches('.btn.btn-primary i');
    if (!clickInsideSidebar && !clickOnToggleButton && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        let mobileBg = document.getElementById("mobileBg");
        mobileBg.classList.remove("show");
        let mainContent = document.querySelector(".scrollable-section");
        let navBar = document.querySelector(".sidebar");
        mainContent.classList.remove("shift-down");
        navBar.classList.remove("shift-down");
    }
});

let sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        let sidebar = document.getElementById("sidebar");
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            let mobileBg = document.getElementById("mobileBg");
            mobileBg.classList.remove("show");
            let mainContent = document.querySelector(".scrollable-section");
            let navBar = document.querySelector(".sidebar");
            mainContent.classList.remove("shift-down");
            navBar.classList.remove("shift-down");
        }
    });
});