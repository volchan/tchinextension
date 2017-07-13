$('#twitch').click(function() {
  chrome.tabs.create({url: 'https://www.twitch.tv/tchinontwitch'});
});

$('#scheduler').click(function() {
  chrome.tabs.create({url: 'http://tchinontwitch.herokuapp.com'});
});
