menu = document.querySelector(".menu-bar");
menu.onclick = function () {
    navbar = document.querySelector(".nav-bar");
    navbar.classList.toggle("active");
}
document.querySelector(".like1").onclick = function () {
    document.querySelector(".likes").classList.toggle("hide");
}

Snap();

function Snap() {
    if(localStorage.getItem("userToken")){
            document.getElementById("formComment").style.display="block";
            document.getElementById("notLoged").style.display="none";
    }
    const blogId = localStorage.getItem("blogId");
    fetch('https://real-pear-squid-shoe.cyclic.app/blogs')
        .then((res) => res.json())
        .then((data) => {
            let b = -4;
            data.slice(b).forEach(function (blog) {
                if (blog._id === blogId) {
                    //return;
                    b--;
                }

                document.querySelector("#blogsList").innerHTML +=
                    `<div class="blog-box" onclick="blog('${blog._id}')">
     <div class="">
       <img src="${blog.image}" alt="">
     </div>
     <div class="">
        <h3><strong><font color="#2B7A0B">${blog.article.substring(0,30)+''}</font></strong></h3>
       <p>${blog.content.substring(0,60)+' ...'}</p>
     </div>
   </div>

   <hr>`;
            });
            b++;
        });



    fetch('https://real-pear-squid-shoe.cyclic.app/blogs/' + blogId)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.querySelector("#singleBlog").innerHTML +=
                `<img src="${data.image}" class="card-img-top" alt="">
     <div class="bg card-body">
        <h1 class="card-title"><strong><font color="#2B7A0B">${data.article}</font></strong></h1>
       <h2 class="card-text"><font color="#0A2647">${data.category}</font></strong></h2>
       <p class="card-text">${data.content}</p>
     </div>
     `;
            document.querySelector(".comments").style.display = "block";
            let nbr=data.comments.length;
            document.getElementById("commentnbr").innerHTML=nbr
            data.comments.forEach(function (comment) {
                document.querySelector("#commentUl").innerHTML +=
                    `<li>
                <div class="commentSection">
                <img src="./images/account.png" class="imgComment" alt="">
                <div class="textComment">
                <div>
                <h4><font color="#0A2647">${comment.user}</font></h4>
                    <p>${comment.comment}</p>
                </div>
                <div>
                <p>${comment.date}</p>
                </div> 
                </div>
                </div>
            </li>`;

            });

        });
}
document.getElementById("formComment").addEventListener("submit", (e) => {
    e.preventDefault();
    const queryString=window.location.search;
    const urlParams= new URLSearchParams(queryString);
    const blogId = urlParams.get("id");
    //const blogId = localStorage.getItem("blogId");
    const userToken = localStorage.getItem("userToken");
    const commt = getElementVal("realComment");
    
    fetch(`https://real-pear-squid-shoe.cyclic.app/comments/${blogId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "comment": commt,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.comment) {
                fetch('https://real-pear-squid-shoe.cyclic.app/blogs/' + blogId)
                    .then((res) => res.json())
                    .then((data) => {

                        document.querySelector(".comments").style.display = "block";
                        document.querySelector("#commentUl").innerHTML ="";
                        data.comments.forEach(function (comnt) {
                            document.querySelector("#commentUl").innerHTML +=
                                `<li>
                          <div class="commentSection">
                          <img src="./images/account.png" class="imgComment" alt="">
                          <div>
                              <h4>${comnt.user}</h4>
                              <p>${comnt.comment}</p>
                              <p>${comnt.date}</p>
                          </div>
                          </div>
                      </li>`;
                        })
                    });
            }
        });

});
const copyButton = document.querySelector('#shareblog');
const queryString=window.location.href;

  copyButton.addEventListener('click', function() {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = queryString;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("URL copied to clipboard!");
  });
function blog(key) {
    localStorage.setItem("blogId", key);
    location.href = "blogcontent.html";
};
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
