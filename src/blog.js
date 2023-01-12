var menu = document.querySelector(".menu-bar");
menu.onclick = function(){
  var navbar=document.querySelector(".container");
  navbar.classList.toggle("active");
}
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

Snap();
function Snap(){
blogF.on("value", function(snapshot){
  let blogs=snapshot.val();
document.querySelector("#blogList").innerHTML = " ";
  for(var data in blogs){
    var blog=blogs[data];
      document.querySelector("#blogList").innerHTML +=
      `<div class="list">
      <div class="blog-box">
        <div class="">
          <img src="images/photos/${blog.photo}" alt="">
        </div>
        <div class="dive">
          <p><strong><font color="#2B7A0B">${blog.article};</font></strong> ${blog.description.substring(0,100)+'...'}</p>
        </div>

      </div>
      <div class="btns">
        <button class="update" type="button" name="button" onclick="Update('${data}')" >Update</button>
        <button class="update" type="button" name="button" onclick="Delete('${data}')">Delete</button>
      </div>
      </div>
      <hr>`;


  }

});
};

function Delete(key){
    var result = confirm("Are you sure you want to remove this blog");
    if(result==true){
      firebase.database().ref("blogs/"+key).remove()
      Snap();
    }
};
function Update(key){
  document.querySelector("#blogList").innerHTML = " ";
  var bloog=firebase.database().ref("blogs/"+key);
  var myFile;
  bloog.on("value", function(snapshot){
    let blogs=snapshot.val();
    document.querySelector("#blogList").innerHTML =
    `<form id="blogfo" action="">
     <h3>Article</h3>
    <input type="text" id="article" value="${blogs.article}">
    <h3>Photo</h3>
    <input class="photo" type="file" id="photo" accept="image/*" value="c:\\fakepaath\\${blogs.photo}"> <br> <br>
    <div class="picked">
      <img src="images/photos/${blogs.photo}" alt="" class="pic1">
    </div>
    <h3>Descrition</h3>
    <textarea name="name"  id="desc" rows="8" cols="80"></textarea>
    <button class="post" type="button" name="button">Update</button>
    <button class="post2" type="button" onclick="Snap()">Cancel</button>
  </form>`;

  CKEDITOR.replace( 'name' );
  CKEDITOR.instances.desc.setData(blogs.description);
  myFile = new File(['hello'], blogs.photo,{
    type: 'image',
    lastModified: new Date(),
  });
});
var fileinput=document.querySelector("#photo");
var datatransfer= new DataTransfer();
datatransfer.items.add(myFile);
fileinput.files= datatransfer.files;

const inputf = document.getElementById("photo");
const prev = document.querySelector(".picked");
const image= prev.querySelector(".pic1");
if(inputf.value.length>0){
  prev.style.display="block";
}


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
document.querySelector(".post").addEventListener("click", function(){
  up(key);
});
};

function up(key){
  var article = getElementVal("article");
  var photo = getElementVal("photo").slice(12);
  var desc = CKEDITOR.instances.desc.getData();
  firebase.database().ref("blogs/"+key).update(
    {
      article: article,
      photo: photo,
      description: desc,
    },
    (error) =>{
      if(error){
        alert("record was not updated, there was some problem");
      }else{
        document.querySelector(".alert1").style.display= "block";
        setTimeout(()=>{
          document.querySelector(".alert1").style.display= "none";
        },3000);
        Snap();
      }
    }
  )
}
const getElementVal = (id) =>{
  return document.getElementById(id).value;
};
