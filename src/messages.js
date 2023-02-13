
var menu = document.querySelector(".menu-bar");
menu.onclick = function(){
  var navbar=document.querySelector(".container");
  navbar.classList.toggle("active");
};




Snap();
function Snap(){
  const token = localStorage.getItem("token");
  fetch('https://real-pear-squid-shoe.cyclic.app/messages',{
    method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
  })
  .then((res)=> res.json())
  .then((data) => {
    document.querySelector("#messageList").innerHTML = " ";
    data.forEach(function(msg){
      document.querySelector("#messageList").innerHTML +=
      `<tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.content}</td>
        <td>.</td>
        <td><button class="update" type="button" name="button">Reply</button></td>
      </tr>`;
    })
  });

};
