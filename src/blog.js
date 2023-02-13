var menu = document.querySelector(".menu-bar");

menu.onclick = function(){
  var navbar=document.querySelector(".container");
  navbar.classList.toggle("active");
}

Snap();
function Snap(){
  document.querySelector("#blogList").innerHTML = " ";
  fetch('https://real-pear-squid-shoe.cyclic.app/blogs')
  .then((res)=> res.json())
  .then((data) => {
    data.forEach(function(blog){
      document.querySelector("#blogList").innerHTML +=
      `<div class="list">
      <div class="blog-box">
        <div class="">
          <img src="${blog.image}" alt="">
        </div>
        <div class="dive">
          <p><strong><font color="#2B7A0B">${blog.article}</font></strong> ${blog.content.substring(0,100)+'...'}</p>
        </div>
      </div>
      <div class="btns">
        <button class="update" type="button" name="button" onclick="Update('${blog._id}')" >Update</button>
        <button class="update" type="button" name="button" onclick="Delete('${blog._id}')">Delete</button>
      </div>
      </div>
      <hr>`;
    })
  })
}

function Delete(key){
    var result = confirm("Are you sure you want to remove this blog");
    if(result==true){
      const token = localStorage.getItem("token");
      fetch(`https://real-pear-squid-shoe.cyclic.app/blogs/${key}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.message){
          Snap();
        }
      });
    }
};
function Update(key){
  //let blog;
  fetch(`https://real-pear-squid-shoe.cyclic.app/blogs/${key}`,{
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
  document.querySelector("#blogList").innerHTML = " ";
  document.querySelector("#blogList").innerHTML =
    `<form id="blogfo">
     <h3>Article</h3>
    <input type="text" id="article" value="${data.article}">
    <h3>Category</h3>
    <input type="text" id="category" value="${data.category}">
    <h3>Photo</h3>
    <input class="photo" type="file" id="photo" accept="image/*" value=""> <br> <br>
    <div class="picked" style="display: block">
      <img src="${data.image}" alt="" class="pic1">
    </div>
    <h3>Descrition</h3>
    <textarea name="name"  id="desc" rows="8" cols="80"></textarea>
    <button class="post" type="submit" name="button">Update</button>
    <button class="post2" type="button" onclick="Snap()">Cancel</button>
  </form>`;
      
    
  CKEDITOR.replace( 'name' );
  CKEDITOR.instances.desc.setData(data.content);
  myFile = new File(['hello'], data.image,{
    type: 'image',
    lastModified: new Date(),
  });


  const inputf = document.getElementById("photo");
  const prev = document.querySelector(".picked");
  const image = prev.querySelector(".pic1");
  
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
      
document.getElementById("blogfo").addEventListener("submit", (e) =>{
  e.preventDefault();
  var photo = document.getElementById("photo");
  let file= photo.files[0];
  var article= getElementVal("article");
  var category= getElementVal("category");
  var content= CKEDITOR.instances.desc.getData();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  if(file){
    formData.append('image', photo.files[0]);
  }
  formData.append('article',article);
  formData.append('category', category);
  formData.append('content', content);
  fetch(`https://real-pear-squid-shoe.cyclic.app/blogs/blog/${key}`,{
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      .then(res => {
        res.json();
        document.querySelector(".alert1").style.display= "block";
        setTimeout(()=>{
        document.querySelector(".alert1").style.display= "none";
        },3000);
          
         Snap();
      });
});

      });
const getElementVal = (id) =>{
  return document.getElementById(id).value;
}; 
}
document.getElementById("logout").addEventListener("click", function(event) {
  // event.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("userToken");
});
