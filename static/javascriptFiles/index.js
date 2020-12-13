
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDF6S2YMMsFZvLa4IGSdEGC8n3tU1Np2Os",
    authDomain: "queuemanager-396ae.firebaseapp.com",
    projectId: "queuemanager-396ae",
    storageBucket: "queuemanager-396ae.appspot.com",
    messagingSenderId: "130022807431",
    appId: "1:130022807431:web:d2ada94e9227dea6826522"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const emailField = document.getElementById('emailField');
const passwordField = document.getElementById('passwordField');


//handle login button pressed
function handleLoginButtonPressed(event){
    console.log("handleLoginButtonPressedCalled");
    const promise = auth.signInWithEmailAndPassword(emailField.value , passwordField.value);
    promise.catch(err => {
        alert(err.message);
    })
    
    //location.href = 'http://localhost:3000/login';
    // fetch('http://localhost:3000/login');
}
//handle register button pressed
function handleRegisterButtonPressed(event){
    console.log("handleRegisterButtonPressedCalled");
    const promise = auth.createUserWithEmailAndPassword(emailField.value , passwordField.value);
    promise.catch(err => {
        alert(err.message);
    })
    alert('signed up!!')
    //location.href = 'http://localhost:3000/register';
}

//add event listeners for both buttons
loginButton.addEventListener('click',function(){
    console.log("login button pressed");
    handleLoginButtonPressed();
});

registerButton.addEventListener('click',function(){
    console.log('register button pressed');
    handleRegisterButtonPressed();
});

//send user to the next page as needed 
auth.onAuthStateChanged(user => {
    if (user){
        //user is signed in
        //initialize the user storage as needed
        localStorage.setItem('uid',user.uid);
        localStorage.setItem('email',user.email);
        //route the user to their home page
        location.href = 'http://localhost:3000/home';

    }else{
        //no user signed in
    }
})
