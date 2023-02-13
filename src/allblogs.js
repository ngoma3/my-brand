


//   document.querySelector("#blogsList").innerHTML = " ";
  fetch('https://real-pear-squid-shoe.cyclic.app/blogs')
  .then((res)=> res.json())
  .then((data) => {
    data.forEach(function(blog){
      document.querySelector("#blogsList").innerHTML +=
     `<div class="card" style="width: 18rem;">
     <img src="${blog.image}" class="card-img-top" alt="...">
   
     <div class="card-body">
       <h5 class="card-title"><strong><font color="#2B7A0B">${blog.article.substring(0,30)+''}</font></strong></h5>
       <p class="card-text">${blog.content.substring(0,60)+' ...'}</p>
       <a href="#" class="btn btn-primary" onclick="blog('${blog._id}')">Read more</a>
     </div>
   </div>`;
      
    })
  });

  function blog(key){
    localStorage.setItem("blogId",key);
    location.href=`blogcontent.html?id=${key}`;
  };
  menu = document.querySelector(".menu-bar");
  menu.onclick = function(){
    navbar=document.querySelector(".nav-bar");
    navbar.classList.toggle("active");
  }