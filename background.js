'use strict';

chrome.runtime.onInstalled.addListener(function() {
  //set default parsing options. This default is just based on my preference.
  chrome.storage.sync.set(
      {
        'single': true,
        'mo3'   : false, 
        'ao5'   : true, 
        'ao12'  : true, 
        'ao25'  : false,
        'ao50'  : true,
        'ao100' : true,
        'ao200' : false,
        'ao1000': false
      }, function() {
    console.log('Parsing options are set.');
  });

  //restrict on cstimer.net
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'cstimer.net'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab){
  console.log("hellow background.js. pageAction is clicked!");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("tab id = ", tabs[0].id);
    console.log("tab title = ", tabs[0].title);
    chrome.tabs.sendMessage(tabs[0].id, {
      command : "getStats"
    },
    function(msg){
      if(!msg){
        console.log("msg is empty!");
        return;
      }
      console.log("response message:", msg);
      
      var openURL = buildTweetURL(msg);    
      console.log("openURL:", openURL);

      if (openURL !== undefined){
        chrome.tabs.create({ "url": openURL});
      }
    });
  });
});


function buildTweetURL(statsText){
  if (statsText !== undefined && statsText !== null) {
    var baseUrl = "http://twitter.com/intent/tweet";
    var prefix = "";
    var output = prefix + statsText; 
    return baseUrl + "?text=" + encodeURIComponent(output);
  }
  return undefined;
}