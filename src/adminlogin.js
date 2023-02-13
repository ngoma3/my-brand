document.getElementById("logForm").addEventListener("submit", (e) =>{
    e.preventDefault();
    document.getElementById("spinn").style.display="block";
    // document.getElementById("mod1").click();
    document.getElementById("denied").style.display="none";
    document.getElementById("username").setAttribute("disabled","true");
    document.getElementById("password").setAttribute("disabled","true");
    const username= getElementVal("username");
    const password= getElementVal("password");
    fetch(`https://real-pear-squid-shoe.cyclic.app/auth/admin/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.token){
            localStorage.setItem("token", data.token);
            location.href="dashboard.html";
        }else{
          document.getElementById("spinn").style.display="none";
          document.getElementById("denied").style.display="block";
            document.getElementById("denied").innerHTML= data.message;
            document.getElementById("username").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");
      }
  });
  
  });

  const getElementVal = (id) =>{
    return document.getElementById(id).value;
  };
  