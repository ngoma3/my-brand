const getElementVal = (id) =>{
    return document.getElementById(id).value;
  };
  document.getElementById("formLogin").addEventListener("submit", (e) =>{
    e.preventDefault();
    document.getElementById("spinn").style.display="block";
    const username= getElementVal("username");
    const password= getElementVal("password");
    fetch(`https://real-pear-squid-shoe.cyclic.app/auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "username": username,
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
            document.getElementById("denied").innerHTML= data.message;
      }
  });
  
  });