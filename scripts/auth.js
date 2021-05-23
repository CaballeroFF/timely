
// listen for auth status change
auth.onAuthStateChanged(user => {
    toggleSignedInStatus(user);
    if (user) {
        db.collection('users').doc(user.uid).collection('record').orderBy("datetime", "desc").onSnapshot(snapshot => {
            setupRecords(snapshot.docs);
        }, err => console.error(err));
    } else {
        setupRecords([]);
    }
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // ger user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // create user on firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        closeAndResetModal(document.querySelector('#modal-signup'), signupForm);
    });
    
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        closeAndResetModal(document.querySelector('#modal-login'), loginForm);
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// insert
const insertForm = document.querySelector('#insert-form');
insertForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let mode = insertForm['insert-modal-button'].firstChild.nodeValue;

    const datestr = insertForm['insert-date'].value;
    const timestr = insertForm['insert-time'].value;
    let user = auth.currentUser;
    let datetime = new Date(datestr + ' ' + timestr);

    if (!user) {
        M.toast({ html: 'Must be logged in'})
        closeAndResetModal(document.querySelector('#modal-insert'), insertForm);
        return;
    }

    if (mode == 'Add') {
        addDoc(user, datetime, document.querySelector('#modal-insert'), insertForm);
    } 
    else if (mode == 'Update') {
        updateDoc(user, datetime, document.querySelector('#modal-insert'), insertForm)
    } else {
        console.log(mode, 'is not a valid mode');
    }
});

// close modal and reset form fields
const closeAndResetModal = (modal, form) => {
    if (modal) {
        M.Modal.getInstance(modal).close();
    }
    if (form) {
        form.reset();
    }
};

// add doc to firestore
const addDoc = (user, data, modal, form) => {
    db.collection('users').doc(user.uid).collection('record').add({
        datetime: data
    }).then(() => {
        closeAndResetModal(modal, form);
    }).catch(err => {
        console.error(err);
    });
} 

// update doc from firestore
const updateDoc = (user, data, modal, form) => {
    db.collection('users').doc(user.uid).collection('record').doc(form.getAttribute('data-itemid')).set({
        datetime: data
    }).then(() => {
        closeAndResetModal(modal, form);
        if (form) {
        form.setAttribute('data-itemid', '');
        }
    }).catch(err => {
        console.error(err);
    });
} 

// delete doc from firestore
const deleteDoc = (docId) => {
    let user = auth.currentUser;

    db.collection('users').doc(user.uid).collection('record').doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
};