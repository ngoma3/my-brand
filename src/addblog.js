

var menu = document.querySelector(".menu-bar");
menu.onclick = function(){
  var navbar=document.querySelector(".container");
  navbar.classList.toggle("active");
}
CKEDITOR.replace( 'name' );

const inputf = document.getElementById("photo");
const prev = document.querySelector(".picked");
const image= prev.querySelector(".pic1");

inputf.addEventListener("change", function(){
  const file= this.files[0];
   if(file){
     const reader = new FileReader();
     prev.style.display = "block";
     reader.addEventListener("load", function(){
       image.setAttribute("src", this.result);
     })
     reader.readAsDataURL(file);
   }else{
     prev.style.display = "none";
   }
});

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

var blogF = firebase.database().ref("blogs");

document.getElementById("blogform").addEventListener("submit", (e) =>{
  e.preventDefault();
  var article = getElementVal("article");
  var photo = getElementVal("photo").slice(12);
  var desc = CKEDITOR.instances.desc.getData();
  saveData(article,photo,desc);
  document.querySelector(".alert1").style.display= "block";
  setTimeout(()=>{
    document.querySelector(".alert1").style.display= "none";
  },3000);
  document.getElementById("blogform").reset();
  document.querySelector(".picked").style.display= "none";
  CKEDITOR.instances.desc.setData();
});

const saveData = (article, photo, desc)=>{
  var newBlog = blogF.push();
  newBlog.set({
    article: article,
    photo: photo,
    description: desc,
  });
};
const getElementVal = (id) =>{
  return document.getElementById(id).value;
};
