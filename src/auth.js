checkauth();
function checkauth(){
    if(localStorage.getItem("userToken")){
        document.querySelector(".logg .login").innerHTML= "Logout";
}
}
document.querySelector(".logg .login").addEventListener("click", function(event) {
    // event.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("token");
    document.querySelector(".logg .login").innerHTML= "Login";
});