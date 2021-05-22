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
collectionControl.addEventListener('click', (e) => {
    e.preventDefault();
    if (collectionContent.style.display == 'none') {
        collectionContent.style.display="block";
    } else {
        collectionContent.style.display="none";
    }
});

document.addEventListener('click', (e) => {
    //console.log(e.target.classList.contains('delete-item'));
    if(e.target && e.target.id== 'collection-show-more'){
        e.preventDefault();
        toggleShowMore();
    }

    if(e.target && e.target.classList.contains('delete-item')){
        let docId = e.target.parentNode.parentNode.getAttribute('data-itemid');
        console.log(docId);
        deleteDoc(docId);
    }

    if(e.target && e.target.classList.contains('edit-item')){
        console.log('edit');
    }
 });

//  collectionContent.addEventListener('mouseover', (e) => {
//     if (e.target && e.target.id=="1") {
//         console.log(e.target);
//     }
//  });

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
    updateChart(data);
}

// fill collection with firebase data
const fillCollection = (data) => {
    let html = '';
    for (let i = 0; i < itemsShown; i++) {
        if (i >= data.length) break;
        let doc = data[i];
        let dt = doc.data().datetime.toDate();
        let date = dt.toDateString();
        let time = dt.getHours().pad(2) + ':' + dt.getMinutes().pad(2);

        const li = `
        <li class="collection-item">
            <div id="${i}" data-itemid="${data[i].id}">
                <a href="#!" class="secondary-content" 
                    style="padding-top:10px;margin-left:10px;">
                <i class="material-icons delete-item">delete</i>
                </a>
                <a href="#!" class="secondary-content" 
                    style="padding-top:10px;">
                <i class="material-icons edit-item">edit</i>
                </a>
                <span>Date: ${date} <br> Time: ${time}</span>
            </div>
        </li>
        `;
        html += li;
    }

    const msg = itemsShown < data.length ? 'show more' : 'show less';

    if (html.length && data.length > initItems) {
        html += `<li class="collection-item center-align">
                    <a id="collection-show-more" href="#">${msg}</a>
                </li>`;
    }
    collectionContent.innerHTML = html;
};

// toggle show more collection 
const toggleShowMore = function() {
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