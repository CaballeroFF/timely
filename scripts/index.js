// DOM elements
const loggedInElements = document.querySelectorAll('.logged-in');
const loggedOutElements = document.querySelectorAll('.logged-out');
const collectionControl = document.querySelector('#collection-control');
const collectionContent = document.querySelector('#collection-content');

//  control collection
collectionControl.addEventListener('click', (e) => {
    
    if (collectionContent.style.display == 'none') {
        collectionContent.style.display="block";
    } else {
        collectionContent.style.display="none";
    }
});

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

// setup records
const setupRecords = (data) => {
    let html = '';
    data.forEach(doc => {
        const li = `
        <li class="collection-item">${doc.data().datetime.toDate()}</li>
        `;
        html += li;
    });
    collectionContent.innerHTML = html;
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var tooltip = document.querySelector('.tooltipped');
    M.Tooltip.init(tooltip);

    var datePicker = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePicker, {
        container: "body",
        format: "mm/dd/yyyy"
    });

    var timePicker = document.querySelectorAll('.timepicker');
    M.Timepicker.init(timePicker,{
        container: "body",
        twelveHour: false
    });
});