const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

//handle login button pressed
function handleLoginButtonPressed(event){
    console.log("handleLoginButtonPressedCalled");
    location.href = 'http://localhost:3000/login';
    // fetch('http://localhost:3000/login');
}
//handle register button pressed
function handleRegisterButtonPressed(event){
    console.log("handleRegisterButtonPressedCalled");
    location.href = 'http://localhost:3000/register';
}




//add event listeners for both buttons
loginButton.addEventListener('click',function(){
    console.log("login button pressed");
    handleLoginButtonPressed();
});

registerButton.addEventListener('click',function(){
    console.log('register button pressed');
    handleRegisterButtonPressed();
})