// DOM elements
const loggedInElements = document.querySelectorAll('.logged-in');
const loggedOutElements = document.querySelectorAll('.logged-out');
const collectionControl = document.querySelector('#collection-control');
const collectionContent = document.querySelector('#collection-content');

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

//  control collection
collectionControl.addEventListener('click', toggleCollection);
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'collection-show-more'){
          toggleShowMore();
     }
 });

// toggle collection
function toggleCollection() {
    if (collectionContent.style.display == 'none') {
        collectionContent.style.display="block";
    } else {
        collectionContent.style.display="none";
    }
};

// setup nav ui
const toggleSignedInStatus = (user) => {
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
const initItems = 5;
let itemsShown = 5;
let userData = null;
const setupRecords = (data) => {
    userData = data;
    fillCollection(data);
}

// fill collection with firebase data
const fillCollection = (data) => {
    let html = '';
    for (let i = 0; i < itemsShown; i++) {
        if (i >= data.length) break;
        let doc = data[i];
        let dt = doc.data().datetime.toDate();

        const li = `
        <li class="collection-item">${dt}</li>
        `;
        html += li;
    }

    const msg = itemsShown < data.length ? 'show more' : 'show less';

    if (html.length && initItems != data.length) {
        html += `<li class="collection-item center-align">
                    <a id="collection-show-more" href="#">${msg}</a>
                </li>`;
    }
    collectionContent.innerHTML = html;
};

// toggle show more collection 
const toggleShowMore = function() {
    console.log(itemsShown);
    if (itemsShown >= userData.length) {
        itemsShown = initItems;
    } else {
        itemsShown *= 2;
    }
    fillCollection(userData);
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