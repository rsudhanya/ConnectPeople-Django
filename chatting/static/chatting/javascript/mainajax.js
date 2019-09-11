textarea1 = document.getElementById("textarea1");
msgsend = document.getElementById("msgsend");
msgwindow = document.getElementById("msgwindow");
msgform = document.getElementById("msgform");

document.onload = msgwindow.scrollTo(msgwindow.offsetHeight, msgwindow.offsetHeight);

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

$("#msgform").submit(function(e) {
  e.preventDefault();
  if (textarea1.value !== "") {
    msgwindow.innerHTML += `<div class='card-panel blue lighten-2'><span class='white-text' style='float: right; font-size: 1.3rem'>${textarea1.value.trim()}</span><br><br><span style='float: right; font-size: .7rem;' class='blue-text text-lighten-2;'>${formatDate(
      new Date()
    )}</span></div>`;
    msgwindow.scrollTo(msgwindow.offsetHeight, msgwindow.offsetHeight);
    textarea1.value = textarea1.value.trim();
    var serializedData = $(this).serialize();
    $.ajax({
      type: "POST",
      url: this.action,
      data: serializedData,
      success: function(response) {
        console.log(response);
        msgform.reset();
      },
      error: function(response) {
        console.log(response);
      }
    });
    textarea1.value = "";
  }
});
