friendlist = document.getElementById("friendlist");
searchFriends = document.getElementById("searchFriends");
mainAppWindow = document.getElementById("mainAppWindow")

var mcounter = 0

var textarea1;
var msgsend;
var msgwindow;

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
            mainAppWindow.innerHTML = `<ul class="collection with-header"><li class="collection-item avatar"><img src="https://www.gstatic.com/webp/gallery/1.png" alt="" class="circle"><h5 id="frndname" class="blue-text text-darken-4"></h5></li></ul><div id="msgwindow" class="card-panel" style="height: 370px; margin-bottom: 0; overflow: auto;"></div><div class=""><div class="row"><div class="input-field col s11" style="color: #0d47a1;"><textarea id="textarea1" class="materialize-textarea" name="message"></textarea><label style="color: #0d47a1" for="textarea1">Type a message</label></div><div class="col s1"><button style="background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;" ><i id="msgsend" class="medium material-icons blue-text">send</i></button></div></div></div>`
            msglist.forEach(element => {
                if(element['fields']['msender'] == uid)
                    document.getElementById("msgwindow").innerHTML += `<div id=${mcounter.toString()} class='card-panel blue lighten-2'><span class='white-text' style='float: right; font-size: 1.3rem'>${element['fields']['mbody']}</span><br><br><span style='float: right; font-size: .7rem;' class='blue-text text-lighten-2;'>${formatDate(new Date(element['fields']['mdate']))}</span></div>`;
                else
                    document.getElementById("msgwindow").innerHTML += `<div id=${mcounter.toString()} class="card-panel"><span style=" float: left; font-size: 1.3rem">${element['fields']['mbody']}</span><br /><br /><span style="float: left; font-size: .7rem;" class="blue-text text-lighten-2">${formatDate(new Date(element['fields']['mdate']))}</span></div>`;
                mcounter ++;
            });
            if(mcounter != 0)
                document.getElementById((mcounter - 1).toString()).scrollIntoView();
            document.getElementById("frndname").innerHTML = mrc_fname + ' ' + mrc_lname;

            textarea1 = document.getElementById("textarea1");
            msgsend = document.getElementById("msgsend");
            msgwindow = document.getElementById("msgwindow");
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

document.addEventListener('click', e => {
    if(e.srcElement.id == 'msgsend') {
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
     }
 });
// msgsend.addEventListener('click', () => {
    
// });