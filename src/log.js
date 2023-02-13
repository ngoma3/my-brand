const getElementVal = (id) =>{
    return document.getElementById(id).value;
  };
document.getElementById("formSignup").addEventListener("submit", (e) =>{
    e.preventDefault();
    const username= getElementVal("username");
    const email= getElementVal("email");
    const password= getElementVal("password");
    const confpassword= getElementVal("confpassword");
    
    if(password===confpassword){
      document.getElementById("denied").style.display="none";
      document.getElementById("spinn").style.display="block";
      document.getElementById("username").setAttribute("disabled","true");
    document.getElementById("email").setAttribute("disabled","true");
    document.getElementById("password").setAttribute("disabled","true");
    document.getElementById("confpassword").setAttribute("disabled","true");
    fetch(`https://real-pear-squid-shoe.cyclic.app/auth/signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.token){
            localStorage.setItem("userToken", data.token);
            location.href="index.html";
        }else{
            document.getElementById("spinn").style.display="none";
            document.getElementById("denied").style.display="block";
            document.getElementById("denied").innerHTML= data.message;
            document.getElementById("username").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("confpassword").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");
      }
  });
}else{
  document.getElementById("denied").style.display="block";
    document.getElementById("denied").innerHTML= "passwords does not match";
}
  
  });


  
 