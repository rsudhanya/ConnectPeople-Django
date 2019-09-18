textarea1 = document.getElementById("textarea1");
msgsend = document.getElementById("msgsend");
msgwindow = document.getElementById("msgwindow");
friendlist = document.getElementById("friendlist");
searchFriends = document.getElementById("searchFriends");
frndname = document.getElementById("frndname");
mainAppWindow = document.getElementById("mainAppWindow")

var mcounter = 0

function formatDate(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "p.m." : "a.m.";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return monthNames[monthIndex] + ". " + day + ", " + year + ", " + strTime;
}

window.onload = () =>
{
    try {
     
        friends.forEach(element => {
            friendlist.innerHTML += `<li id=${element['fields']['username']} onClick="mload(this.id)"><a class="collection-item black-text avatar"><img src="https://www.gstatic.com/webp/gallery/1.png" alt="" class="circle">${element['fields']['first_name'] + ' ' + element['fields']['last_name']}</a></li>`
        });
        if(mrc != '')
        {
            
            msglist.forEach(element => {
                if(element['fields']['msender'] == uid)
                    msgwindow.innerHTML += `<div id=${mcounter.toString()} class='card-panel blue lighten-2'><span class='white-text' style='float: right; font-size: 1.3rem'>${element['fields']['mbody']}</span><br><br><span style='float: right; font-size: .7rem;' class='blue-text text-lighten-2;'>${formatDate(new Date(element['fields']['mdate']))}</span></div>`;
                else
                    msgwindow.innerHTML += `<div id=${mcounter.toString()} class="card-panel"><span style=" float: left; font-size: 1.3rem">${element['fields']['mbody']}</span><br /><br /><span style="float: left; font-size: .7rem;" class="blue-text text-lighten-2">${formatDate(new Date(element['fields']['mdate']))}</span></div>`;
                mcounter ++;
            });
            document.getElementById((mcounter - 1).toString()).scrollIntoView();
            frndname.innerHTML = mrc_fname + ' ' + mrc_lname;
        }

    } catch (error) {
        console.log(error)
    }
}

const mload = (e) =>{
    window.location.pathname ='/' + e + '/';
}


var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/chat/' + roomName + '/');

chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var s = data['msender'];
    var r = data['mrc'];
    var tz = data['tz'];
    if(r === user){
        msgwindow.innerHTML += `<div id=${mcounter.toString()} class="card-panel"><span style=" float: left; font-size: 1.3rem">${message}</span><br /><br /><span style="float: left; font-size: .7rem;" class="blue-text text-lighten-2">${formatDate(new Date(tz))}</span></div>`;  
        mcounter ++;
        document.getElementById((mcounter - 1).toString()).scrollIntoView();
    }
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

msgsend.addEventListener('click', () => {
    if (textarea1.value !== "") {
      var message = textarea1.value.trim();
      textarea1.value = "";
      msgwindow.scrollTo(msgwindow.offsetHeight, msgwindow.offsetHeight);
      chatSocket.send(JSON.stringify({
        'message': message,
        'msender': user,
        'mrc': mrc
      }));
      msgwindow.innerHTML += `<div id=${mcounter.toString()} class='card-panel blue lighten-2'><span class='white-text' style='float: right; font-size: 1.3rem'>${message}</span><br><br><span style='float: right; font-size: .7rem;' class='blue-text text-lighten-2;'>${formatDate(new Date())}</span></div>`;
      mcounter ++;
      document.getElementById((mcounter - 1).toString()).scrollIntoView();
  }
});