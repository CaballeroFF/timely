// listen for auth status change
auth.onAuthStateChanged(user => {
    setupUI(user);
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

// close modal and reset form fields
const closeAndResetModal = (modal, form) => {
    M.Modal.getInstance(modal).close();
    form.reset();
};