// DOM elements
const loggedInElements = document.querySelectorAll('.logged-in');
const loggedOutElements = document.querySelectorAll('.logged-out');

// setup nav ui
const setupUI = (user) => {
    // toggle user UI elements
    if (user) {
        loggedInElements.forEach(e => e.style.display="block");
        loggedOutElements.forEach(e => e.style.display="none");
    } else {
        loggedInElements.forEach(e => e.style.display="none");
        loggedOutElements.forEach(e => e.style.display="block");
    }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});