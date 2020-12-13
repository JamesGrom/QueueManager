// const { response } = require("express");
// const { database } = require("firebase-admin");

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
    }else{
        alert('you are Currently Signed In');
         //pull the lab section names that the user is associated with 
        fetch(`http://localhost:3000/enrolledLabs/${auth.currentUser.email}`).then(response => {
              return response.ok ? response.json() : Promise.reject();
         }).then(data => {
             console.log(data , 'above is the data');
             for(let i = 0 ; data[i];i++){
                 console.log("in forLoop:")
                //add each lab into the home page list
                let newLi = document.createElement('li');
                let newAnchor = document.createElement('button');
                //console.log(data[i]);
                // newAnchor.setAttribute('href',`http://localhost:3000/lab/${data[i]}`);
                newAnchor.innerHTML = data[i];
                newAnchor.addEventListener('click',handleSelectLabButtonPressed);
                newLi.appendChild(newAnchor);
                visibleList.insertBefore(newLi,visibleList.firstChild);
             }
        })
    }
})

//define document references
const signoutButton = document.getElementById('signoutButton');
signoutButton.addEventListener('click', handleSignoutButtonPressed);

const createLabButton = document.getElementById('createLabButton');
createLabButton.addEventListener('click',handleCreateLabButtonPressed);

const searchLabButton = document.getElementById('searchLabButton');
searchLabButton.addEventListener('click',handleSearchLabButtonPressed);

const visibleList = document.getElementById("visibleList");

//event handlers
function handleSignoutButtonPressed(event){
    console.log('signoutButton pressed');
    auth.signOut();
} 
//event handlers
function handleSelectLabButtonPressed(event){
    console.log('lab button pressed');
    console.log(event.target.innerHTML);
    localStorage.setItem(activeLabName,event.target.innerHTML);
    location.href = 'http://localhost:3000/lab';
}

function handleCreateLabButtonPressed(event){
    console.log('createLabButtonPressed');

    //serve the createLab Page
    location.href = 'http://localhost:3000/create';

}

function handleSearchLabButtonPressed(event){
    console.log('searchLabButtonPressed');
    location.href = 'http://localhost:3000/join';
}

//include the given Lab Sections when the home page loads
window.onload = () => {
   
}