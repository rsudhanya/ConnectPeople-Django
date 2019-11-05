friendlist = document.getElementById("friendlist");
searchFriends = document.getElementById("searchFriends");
mainAppWindow = document.getElementById("mainAppWindow");
searchFriends = document.getElementById("searchFriends");

var mcounter = 0

var textarea1;
var msgsend;
var msgwindow;

const beep = () =>  {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

const formatDate = date =>  {
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
            friendlist.innerHTML += `<li id=${element['fields']['username']} onClick="mload(this.id)"><a class="collection-item black-text avatar"><img src="https://connect-people-static-image.s3.ap-south-1.amazonaws.com/user_logo.jpg" alt="" class="circle">${element['fields']['first_name'] + ' ' + element['fields']['last_name']}<div id=${element['fields']['username'] + "active"} class="secondary-content"></div></a></li>`
        });
        if(mrc != '')
        {
            mainAppWindow.innerHTML = `<ul class="collection with-header"><li class="collection-item avatar"><a style="float: right;" href="/"><i class="material-icons prefix medium">clear</i></a><a href="/user_profile/${mrc}"><img src="https://www.gstatic.com/webp/gallery/1.png" alt="" class="circle"><h5 id="frndname" class="blue-text text-darken-4"></h5></a></li></ul><div id="msgwindow" class="card-panel" style="height: 370px; margin-bottom: 0; overflow: auto;"></div><div class=""><div class="row"><div class="input-field col s10" style="color: #0d47a1;"><textarea id="textarea1" class="materialize-textarea" name="message"></textarea><label style="color: #0d47a1" for="textarea1">Type a message</label></div><div class="col s1"><button  data-target="modal1" class="modal-trigger" style="background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;" ><i class="medium material-icons blue-text">child_care</i></button></div><div class="col s1"><button style="background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;" ><i id="msgsend" class="medium material-icons blue-text col s1">send</i></button></div></div></div>`
            msglist.forEach(element => {
                if(element['fields']['msender'] == uid)
                    document.getElementById("msgwindow").innerHTML += `<div id=${mcounter.toString()} class='card-panel blue lighten-2'><span class='white-text' style='float: right; font-size: 1.3rem'>${element['fields']['mbody']}</span><br><br><span style='float: right; font-size: .7rem;' class='blue-text text-lighten-2;'>${formatDate(new Date(element['fields']['mdate']))}</span></div>`;
                else
                    document.getElementById("msgwindow").innerHTML += `<div id=${mcounter.toString()} class="card-panel"><span style=" float: left; font-size: 1.3rem">${element['fields']['mbody']}</span><br /><br /><span style="float: left; font-size: .7rem;" class="blue-text text-lighten-2">${formatDate(new Date(element['fields']['mdate']))}</span></div>`;
                mcounter ++;
            });
            if(mcounter != 0)
                document.getElementById((mcounter - 1).toString()).scrollIntoView();
            document.getElementById("frndname").innerHTML = mrc_fname + ' ' + mrc_lname + '';

            textarea1 = document.getElementById("textarea1");
            msgsend = document.getElementById("msgsend");
            msgwindow = document.getElementById("msgwindow");
        }

    } catch (error) {
        console.log(error)
    }
}

const mload = (e) =>{
    if(window.location.pathname !== '/' + e + '/')
    {
        window.location.pathname = '/' + e + '/';
    }
}

searchFriends.addEventListener ('keyup', e => {
    var txt = e.target.value.toLowerCase().trim();
    var items = friendlist.children;
    Array.from(items).forEach(element => {
        if(element.textContent.toLowerCase().indexOf(txt) != -1)
        {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});

var protocol = '';
if (window.location.protocol === 'https:') {
    protocol = 'wss:';
} else {
    protocol = 'ws:';
}

var chatSocket = new WebSocket(
    protocol + '//' + window.location.host +
    '/ws/chat/' + roomName + '/');
    
chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    switch(data['ctype'])
    {
        case 'mtext':
        var message = data['message'];
        var s = data['msender'];
        var r = data['mrc'];
        var tz = data['tz'];
        if(r === user)
        {beep();}
        if(r === user && s == mrc){
            msgwindow.innerHTML += `<div id=${mcounter.toString()} class="card-panel"><span style=" float: left; font-size: 1.3rem">${message}</span><br /><br /><span style="float: left; font-size: .7rem;" class="blue-text text-lighten-2">${formatDate(new Date(tz))}</span></div>`;  
            mcounter ++;
            document.getElementById((mcounter - 1).toString()).scrollIntoView();
        }
        break;

        case 'Ncon':
        document.getElementById(data['Ncon'] + "active").innerHTML = `<i class="material-icons blue-text text-darken-4">grade</i>`;
        break;

        case 'Dcon':
        document.getElementById(data['Dcon'] + "active").innerHTML = `<i class="blue-text text-datken-4">${formatDate(new Date(data['last_seen']))}</i>`;
        break;
    }
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

document.addEventListener('click', e => {
    if(e.srcElement.id == 'msgsend') {
          if (textarea1.value !== "") {
            var message = textarea1.value.trim();
            textarea1.innerHTML = "";
            msgwindow.scrollTo(msgwindow.offsetHeight, msgwindow.offsetHeight);
            chatSocket.send(JSON.stringify({
              'message': message,
              'msender': user,
              'mrc': mrc,
              'ctype': 'mtext'
            }));
            msgwindow.innerHTML += `<div id=${mcounter.toString()} class='card-panel blue lighten-2'><span class='white-text' style='float: right; font-size: 1.3rem'>${message}</span><br><br><span style='float: right; font-size: .7rem;' class='blue-text text-lighten-2;'>${formatDate(new Date())}</span></div>`;
            mcounter ++;
            document.getElementById((mcounter - 1).toString()).scrollIntoView();
        }
     } else {
         if(e.srcElement.id.charAt(0) == 'e' && e.srcElement.id.charAt(1) == 'm' && e.srcElement.id.charAt(2) == 'o') {
        var tchar = '';
        for(i = 3; i < e.srcElement.id.length; tchar += e.srcElement.id.charAt(i ++));
        textarea1.innerHTML += '&#' + tchar + ';';
        textarea1.click();
        }
    }
 });
