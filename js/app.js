
var ClientNotified = false;

var channel = "tchinontwitch";
var title_data = "Tchïn is live !";
var channel_light = "Tchïnontwitch";
var client_id = "iq5k30sqbxrlzuwpmcptekrsw1l2cc";

$('#twitch').click(function() {
  chrome.tabs.create({url: 'https://www.twitch.tv/tchinontwitch'});
});

$('#scheduler').click(function() {
  chrome.tabs.create({url: 'http://tchinontwitch.herokuapp.com'});
});

function callback() {
  var xhr_object = new XMLHttpRequest();
  xhr_object.onreadystatechange = function(){
    if (xhr_object.readyState==4 && xhr_object.status==200){
      var data = JSON.parse(xhr_object.responseText);
      if(data.stream != null ){
        if (ClientNotified == false) {
          notify(data.stream.channel.status);
          toogleStream(true);
        }
      }else if (ClientNotified){
        toogleStream(false);
      }
    }
  }

  var url = "https://api.twitch.tv/kraken/streams/" + channel + "?client_id=" + client_id;
  xhr_object.open("GET", url, true);
  xhr_object.send();
}

function notify(streamTitle) {
  var notification = new Notification('Tchïn is LIVE!', {
    icon: 'img/icon_72.png',
    body: streamTitle
  });
}

function toogleStream(value) {
  ClientNotified = value;
  if (value == true) {
    chrome.browserAction.setTitle({title : channel_light + " est en live !"});
    chrome.browserAction.setIcon({path:"img/icon_72.png"});
  }else{
    chrome.browserAction.setTitle({title : channel_light + " est hors ligne"});
    chrome.browserAction.setIcon({path:"img/icon.png"});
  }
}

chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({ url:"https://www.twitch.tv/" + channel});
});

setInterval(callback, 1000);
toogleStream(false);
callback();
