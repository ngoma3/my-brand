var menu = document.querySelector(".menu-bar");
menu.onclick = function(){
  var navbar=document.querySelector(".container");
  navbar.classList.toggle("active");
};

document.getElementById("contactForm").addEventListener("submit", (e) =>{
  e.preventDefault();
  var fname = getElementVal("fname");
  var lname = getElementVal("lname");
  var email = getElementVal("email");
  var desc = getElementVal("desc");
  var name=fname.concat(" ",lname);
  if(localStorage.getItem("userToken")){
  const userToken = localStorage.getItem("userToken");
  fetch(`https://real-pear-squid-shoe.cyclic.app/messages`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
          "name": name,
          "email": email,
          "content": desc,
      })
    })
    .then(res => res.json());
    
    document.getElementById("fname").value="";
    document.getElementById("lname").value="";
    document.getElementById("email").value="";
    document.getElementById("desc").value="";
    alert("Thanks your message is sent!");
  }else{
    alert("Sorry you have to be logged in first!!");
  }
});
const getElementVal = (id) =>{
  return document.getElementById(id).value;
};
