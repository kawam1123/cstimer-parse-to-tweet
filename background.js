'use strict';

chrome.runtime.onInstalled.addListener(function() {
  //set default parsing options. This default is just based on my preference.
  chrome.storage.sync.set(
      {
        'prefix': chrome.i18n.getMessage('default_prefix'),
        'single': true,
        'mo3'   : false, 
        'ao5'   : true, 
        'ao12'  : true, 
        'ao25'  : false,
        'ao50'  : true,
        'ao100' : true,
        'ao200' : false,
        'ao1000': false,
        'formatOption': "option1",
        'formatCustomOption' : {
          '1':     "1",
          '3':     "3",
          '5':     "5",
          '12':    "12",
          '25':    "12",
          '50':    "50",
          '100':   "100",
          '200':   "200",
          '1000':  "1000"
        },
        'clipboardOption' : "Twitter + Clipboard"
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
  console.log("pageAction is clicked!");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      command : "getStats"
    },
    function(msg){
      if(!msg){
        console.log("msg is empty!");
        return;
      }
      console.log("response message:", msg);
      
      //var clipboardOption = "";
      chrome.storage.sync.get({"clipboardOption": "Twitter + Clipboard"},function(item){
        switch(item.clipboardOption){
          case "Clipboard Only":
            saveToClipboard(msg);
            alert(chrome.i18n.getMessage('msg_clipboard_copied')+'\n\n'+msg);
            console.log("output: clipboard");
            break;
          case "Twitter Only":
            openTwitter(msg);
            console.log("output: twitter");
            break;
          case "Twitter + Clipboard":
            openTwitter(msg);
            saveToClipboard(msg);
            console.log("output: twitter and clipboard");
            break;
          default:
            console.log("Exceeption: no clipboard option");
        }
      });
    });
  });
});

function openTwitter(msg){
  var openURL = buildTweetURL(msg);    
  console.log("openURL:", openURL);

  if (openURL !== undefined){
    chrome.tabs.create({ "url": openURL});
  }
}

function buildTweetURL(statsText){
  if (statsText !== undefined && statsText !== null) {
    var baseUrl = "http://twitter.com/intent/tweet";
    return baseUrl + "?text=" + encodeURIComponent(statsText);
  }
  return undefined;
}

function saveToClipboard(str) {
  var textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}