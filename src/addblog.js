

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

document.getElementById("blogform").addEventListener("submit", (e) =>{
  e.preventDefault();
  var photo = document.getElementById("photo");
  let file= photo.files[0];
  var article=getElementVal("article");
  var category=getElementVal("category");
  var content=CKEDITOR.instances.desc.getData();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  if(file){
    formData.append('image', photo.files[0]);
  }
  formData.append('article',article);
  formData.append('category', category);
  formData.append('content', content);
  fetch(`https://real-pear-squid-shoe.cyclic.app/blogs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data){
        document.querySelector(".alert1").style.display= "block";
    setTimeout(()=>{
    document.querySelector(".alert1").style.display= "none";
    },3000);
  document.getElementById("blogform").reset();
  document.querySelector(".picked").style.display= "none";
  CKEDITOR.instances.desc.setData();
      }
    })
    
  
});
const getElementVal = (id) =>{
  return document.getElementById(id).value;
};
