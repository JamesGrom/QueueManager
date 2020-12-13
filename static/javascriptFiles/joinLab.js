// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDF6S2YMMsFZvLa4IGSdEGC8n3tU1Np2Os",
    authDomain: "queuemanager-396ae.firebaseapp.com",
    projectId: "queuemanager-396ae",
    storageBucket: "queuemanager-396ae.appspot.com",
    messagingSenderId: "130022807431",
    appId: "1:130022807431:web:d2ada94e9227dea6826522"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//bring user back to login page once they sign out
auth.onAuthStateChanged( user => {
    if (! user ){
        //user is signed out!!
        location.href = 'http://localhost:3000/';
    }
})

//get document references
const labNameField = document.getElementById('labNameField');

const passwordField = document.getElementById('passwordField');

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click',handleSubmitButtonClicked);


//implement SubmitButtonClicked
function handleSubmitButtonClicked(event) {
    if(!labNameField){
        alert('your Lab must have a name');
        return;
    }

    let labObject = {
        labName: labNameField.value ,
        password: passwordField.value,
        userEmail: auth.currentUser.email
    }

    fetch("/join", {
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(labObject)
    }).then(response => {
        if (response.ok){
            alert('success!!');
            location.href = 'http://localhost:3000/home';
        }else{
            alert('error joining the given lab, try another name/password combo');
        }
    })



}


