var menu = document.querySelector(".menu-bar");
menu.onclick = function(){
  var navbar=document.querySelector(".container");
  navbar.classList.toggle("active");
};

const firebaseConfig ={
  apiKey: "AIzaSyCyAJ4MggAVXLTmFiT97E4zZs2STtiKuRc",
  authDomain: "capstone-ffd2e.firebaseapp.com",
  databaseURL: "https://capstone-ffd2e-default-rtdb.firebaseio.com",
  projectId: "capstone-ffd2e",
  storageBucket: "capstone-ffd2e.appspot.com",
  messagingSenderId: "1037105321596",
  appId: "1:1037105321596:web:a80fa919b576017e905bf9"
};

firebase.initializeApp(firebaseConfig);

var blogF = firebase.database().ref("messages");

document.getElementById("contactForm").addEventListener("submit", (e) =>{
  e.preventDefault();
  var fname = getElementVal("fname");
  var lname = getElementVal("lname");
  var email = getElementVal("email");
  var desc = getElementVal("desc");
  var name=fname.concat(" ",lname);
  console.log(name,email,desc);
  saveData(name ,email,desc);
  alert("Thank you for contacting us,soon we shall check in on you!!");
  document.getElementById("contactForm").reset();
});

const saveData = (name, email, desc)=>{
  var newBlog = blogF.push();
  newBlog.set({
    name: name,
    email: email,
    description: desc,
  });
};
const getElementVal = (id) =>{
  return document.getElementById(id).value;
};
