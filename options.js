// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//Internationalize the messages
function constructMessage(){
  document.getElementById('messageH2').innerHTML = chrome.i18n.getMessage('msg_message_header');
  document.getElementById('prefixText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_prefix_text')+"</p>";
  document.getElementById('optionsH2').innerHTML = chrome.i18n.getMessage('msg_options_header');
  document.getElementById('optionsText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_options_text')+"</p>";
  document.getElementById('formatH2').innerHTML = chrome.i18n.getMessage('msg_format_header');
  document.getElementById('formatText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_format_text')+"</p>";
  document.getElementById('sampleOutputH2').innerHTML = chrome.i18n.getMessage('msg_sampleoutput_header');
  document.getElementById('clipboardH2').innerHTML = chrome.i18n.getMessage('msg_clipboard_header');
  document.getElementById('clipboardText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_clipboard_text')+"</p>";
  document.getElementById('sessionName').value = chrome.i18n.getMessage('msg_prefix_sessionname');
  document.getElementById('scrambleType1').value = chrome.i18n.getMessage('msg_prefix_scramble1');
  document.getElementById('scrambleType2').value = chrome.i18n.getMessage('msg_prefix_scramble2');
}

//Draw prefix message
function constructPrefix(){
  let page = document.getElementById('prefixDiv');
  let div = document.createElement('div');
  div.setAttribute("class","form-group");
  page.appendChild(div);

  let label = document.createElement('label');
  label.setAttribute("for", "prefix_textbox");
  label.innerHTML = chrome.i18n.getMessage('msg_prefix_label');
  div.appendChild(label);

  let prefixText = document.createElement('input');
  prefixText.setAttribute("id", "prefix_textbox");
  prefixText.setAttribute("class", "form-control");
  prefixText.setAttribute("type", "text");
  prefixText.setAttribute("name", "prefix_option");
  prefixText.setAttribute("value", "");
  div.appendChild(prefixText);

  console.log("prefix box is generated.");
}

//Draw options
const kOptions = ['single', 'mo3', 'ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'ao200', 'ao1000'];
function constructOptions(kOptions) {
  let page = document.getElementById('optionsDiv');


  for (let item of kOptions) {
    let div = document.createElement('div');
    div.setAttribute("class","form-check");
    page.appendChild(div);
    var checkbox_name = item + "_check";

    let checkbox = document.createElement('input');
    checkbox.setAttribute("id", checkbox_name);
    checkbox.setAttribute("class", "form-check-input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "display_option");
    checkbox.setAttribute("value", item);
    div.appendChild(checkbox);

    let label = document.createElement('label');
    label.setAttribute("for", checkbox_name);
    //label.setAttribute("style", "display:block;");
    label.setAttribute("class", "form-check-label");
    label.innerHTML = item;
    div.appendChild(label);

  }
  console.log("options box is generated.");
}

//Draw Format
let formatOptionsPredefined = {
  "option1": {
    "display": "1/5/12/50/100",
    "name": "formatOption1_button",
    "single": "1", "mo3": "3", "ao5": "5", "ao12": "12", "ao25": "25", "ao50": "50", "ao100": "100", "ao200": "200", "ao1000": "1000"
  },
  "option2": {
    "display": "single/ao5/ao12/ao50/ao100",
    "name": "formatOption2_button",
    "single": "single", "mo3": "3", "ao5": "ao5", "ao12": "ao12", "ao25": "ao25", "ao50": "ao50", "ao100": "ao100", "ao200": "ao200", "ao1000": "ao1000"
  },
  "option3": {
    "display": "ao1/5/12/50/100",
    "name": "formatOption3_button",
    "single": "ao1", "mo3": "3", "ao5": "5", "ao12": "12", "ao25": "25", "ao50": "50", "ao100": "100", "ao200": "200", "ao1000": "1000"
  },
  "custom" : {
    "display": "custom",
    "name": "formatCustom_button"
  }
};

function constructFormat(){
  let formatTextOptions = document.getElementById('formatTextOptions');

  //generate a list of radio buttons
  for (let item in formatOptionsPredefined) {
    let div = document.createElement('div');
    div.setAttribute("class","form-check");
    formatTextOptions.appendChild(div);

    let radiobutton_name = formatOptionsPredefined[item]["name"];
    
    let format = document.createElement('input');
    format.setAttribute("id", radiobutton_name);
    format.setAttribute("type", "radio");
    format.setAttribute("name", "format_option");
    format.setAttribute("value", item);
    
    div.appendChild(format);

    let label = document.createElement('label');
    label.setAttribute("for", radiobutton_name);
    label.innerHTML = formatOptionsPredefined[item]["display"];
    div.appendChild(label);

    //label.insertAdjacentHTML('beforeend',formatOptionsPredefined[item]["display"]);
  }

  let customTextOptions = document.getElementById('customTextOptions');

  //input fields for custom format
  for (let item of kOptions) {
    let div = document.createElement('div');
    div.setAttribute("id","customFormatInput");
    div.setAttribute("class","form-group");
    //div.setAttribute("style","display:none;");
    customTextOptions.appendChild(div);

    let customFormat = item + "_customFromat";

    let label = document.createElement('label');
    label.setAttribute("for", customFormat);
    label.innerHTML = item ;
    div.appendChild(label);

    
    let format = document.createElement('input');
    format.setAttribute("id", customFormat);
    format.setAttribute("class", "form-control");
    format.setAttribute("type", "text");
    format.setAttribute("name", customFormat + "_textBox");
    format.setAttribute("value", "");
    div.appendChild(format);

  }
  console.log("format options are generated.");
}


//Draw Clipboard option
function constructClipboard(){
  let page = document.getElementById('clipboardDiv');
  let div = document.createElement('div');
  let clipboardOptions ={
    "Twitter + Clipboard": {
      "name": "twitter_clipboard_check",
      "display": chrome.i18n.getMessage('clipboard_twitter_clipboard')
    },
    "Twitter Only" : {
      "name": "twitter_only_check",
      "display": chrome.i18n.getMessage('clipboard_twitter_only')
    },
    "Clipboard Only": {
      "name": "clipboard_only_check",
      "display": chrome.i18n.getMessage('clipboard_clipboard_only')
    }
  }

  for (let item in clipboardOptions) {
    let div = document.createElement('div');
    div.setAttribute("class","form-check");
    page.appendChild(div);

    let radiobutton_name = clipboardOptions[item]["name"];
    
    let format = document.createElement('input');
    format.setAttribute("id", radiobutton_name);
    format.setAttribute("type", "radio");
    format.setAttribute("name", "clipboard_option");
    format.setAttribute("value", item);
    
    div.appendChild(format);

    let label = document.createElement('label');
    label.setAttribute("for", radiobutton_name);
    label.innerHTML = clipboardOptions[item]["display"];
    div.appendChild(label);

    //label.insertAdjacentHTML('beforeend',formatOptionsPredefined[item]["display"]);
  }
}

//construct options input field
constructMessage();
constructPrefix();
constructOptions(kOptions);
constructFormat();
constructClipboard();

// Saves options to chrome.storage
function save_options() {
  //set indicator options
  chrome.storage.sync.set({
    'single': document.getElementById("single_check").checked,
    'mo3'   : document.getElementById("mo3_check").checked,
    'ao5'   : document.getElementById("ao5_check").checked,
    'ao12'  : document.getElementById("ao12_check").checked,
    'ao25'  : document.getElementById("ao25_check").checked,
    'ao50'  : document.getElementById("ao50_check").checked,
    'ao100' : document.getElementById("ao100_check").checked,
    'ao200' : document.getElementById("ao200_check").checked,
    'ao1000': document.getElementById("ao1000_check").checked
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('indicator_status');
    status.textContent = chrome.i18n.getMessage('msg_options_saved');
  });
  
  //set prefix option
  chrome.storage.sync.set({
    'prefix': document.getElementById("prefix_textbox").value
  }, function(){
    var status = document.getElementById('prefix_status');
    status.textContent = chrome.i18n.getMessage('msg_prefix_saved');
  });

  //set format option
  let formatOptionValue = "";
  const formatSelected = document.getElementsByName("format_option");
  for(let i = 0; i< formatSelected.length; i++){
    console.log("check formatSelected[i].checked :",i,formatSelected[i].checked);
    if(formatSelected[i].checked){
      formatOptionValue = formatSelected[i].value; //option1, option2, option3, custom
      break;
    }
  }

  if(formatOptionValue=="custom"){
    chrome.storage.sync.set({
      'formatOption' : formatOptionValue,
      'formatCustomOption' : {
        '1':     document.getElementById("single_customFromat").value,
        '3':     document.getElementById("mo3_customFromat").value,
        '5':     document.getElementById("ao5_customFromat").value,
        '12':    document.getElementById("ao12_customFromat").value,
        '25':    document.getElementById("ao25_customFromat").value,
        '50':    document.getElementById("ao50_customFromat").value,
        '100':   document.getElementById("ao100_customFromat").value,
        '200':   document.getElementById("ao200_customFromat").value,
        '1000':  document.getElementById("ao1000_customFromat").value
      }
    },function(){
      console.log("formatOption saved:", formatOptionValue);
    });
  }else{
    chrome.storage.sync.set({
      'formatOption' : formatOptionValue,
      'formatCustomOption' : {
        '1':     document.getElementById("single_customFromat").value = formatOptionsPredefined[formatOptionValue]["single"],
        '3':     document.getElementById("mo3_customFromat").value = formatOptionsPredefined[formatOptionValue]["mo3"],
        '5':     document.getElementById("ao5_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao5"],
        '12':    document.getElementById("ao12_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao12"],
        '25':    document.getElementById("ao25_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao25"],
        '50':    document.getElementById("ao50_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao50"],
        '100':   document.getElementById("ao100_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao100"],
        '200':   document.getElementById("ao200_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao200"],
        '1000':  document.getElementById("ao1000_customFromat").value = formatOptionsPredefined[formatOptionValue]["ao1000"]
      }
    },function(){
      console.log("formatOption saved:", formatOptionValue);
    });
  }

    //get clipboard option
    let clipboardOptionValue = "";
    const clipboardSelected = document.getElementsByName("clipboard_option");
    for(let i = 0; i< clipboardSelected.length; i++){
      console.log("check clipboardSelected[i].checked :",i,clipboardSelected[i].checked);
      if(clipboardSelected[i].checked){
        clipboardOptionValue = clipboardSelected[i].value;
        break;
      }
    }
    //save clipboard option
    chrome.storage.sync.set({
      'clipboardOption' : clipboardOptionValue
    },function(){
      console.log("clipboardOption saved:", clipboardOptionValue);
    });

  showExample();

 }

function restore_options(){
  chrome.storage.sync.get({
    'single': true,
    'mo3'   : false, 
    'ao5'   : true, 
    'ao12'  : true, 
    'ao25'  : false,
    'ao50'  : true,
    'ao100' : true,
    'ao200' : false,
    'ao1000': false
  }, function(items){
    for (let item of kOptions) {
      document.getElementById(item + "_check").checked = items[item];
    };
    console.log("option restored:", items);
  });
  chrome.storage.sync.get({
    'prefix': chrome.i18n.getMessage('default_prefix')
  }, function(items){
    document.getElementById("prefix_textbox").value = items.prefix;
    console.log("prefix restored:", items.prefix);
  });

  chrome.storage.sync.get({
    'formatOption': "option1",
    'formatCustomOption' : {
      '1':     "1",
      '3':     "3",
      '5':     "5",
      '12':    "12",
      '25':    "25",
      '50':    "50",
      '100':   "100",
      '200':   "200",
      '1000':  "1000"
    },
    'clipboardOption' : "Twitter + Clipboard"
  }, function(items){
    const formatSelected = document.getElementsByName("format_option");
    formatSelected[0].checked = false;
    formatSelected[1].checked = false;
    formatSelected[2].checked = false;
    formatSelected[3].checked = false;
    switch(items.formatOption){
      case "option1":
        formatSelected[0].checked = true;
        break;
      case "option2":
        formatSelected[1].checked = true;
        break;
      case "option3":
        formatSelected[2].checked = true;
        break;
      case "custom":
        formatSelected[3].checked = true;
      break;
      default:
        console.log("Exceeption: no format option");
    }
    document.getElementById("single_customFromat").value  = items.formatCustomOption['1'];
    document.getElementById("mo3_customFromat").value     = items.formatCustomOption['3'];
    document.getElementById("ao5_customFromat").value     = items.formatCustomOption['5'];
    document.getElementById("ao12_customFromat").value    = items.formatCustomOption['12'];
    document.getElementById("ao25_customFromat").value    = items.formatCustomOption['25'];
    document.getElementById("ao50_customFromat").value    = items.formatCustomOption['50'];
    document.getElementById("ao100_customFromat").value   = items.formatCustomOption['100'];
    document.getElementById("ao200_customFromat").value   = items.formatCustomOption['200'];
    document.getElementById("ao1000_customFromat").value  = items.formatCustomOption['1000'];

    const clipboardSelected = document.getElementsByName("clipboard_option");
    switch(items.clipboardOption){
      case "Twitter + Clipboard":
        clipboardSelected[0].checked = true;
        break;
        case "Twitter Only":
        clipboardSelected[1].checked = true;
        break;
      case "Clipboard Only":
        clipboardSelected[2].checked = true;
        break;
      default:
        console.log("Exceeption: no clipboard option");
    }

    showExample();

    console.log("format option restored:", items.formatOption);
    console.log("clipboard option restored:", items.clipboardOption);
  });
}

function showExample(){
  let examplePrefix = document.getElementById("prefix_textbox").value;
  let exampleFormat = [];
  let exampleOutputTime = [];
  const sampleTime = {
    "single":"12.99",
    "mo3": "14.52",
    "ao5":"14.55", 
    "ao12": "15.38",
    "ao25": "16.20",
    "ao50": "16.32",
    "ao100":"16.63",
    "ao200":"17.63",
    "ao1000":"17.98",
  };

  for (let item of kOptions) {
    if(document.getElementById(item + "_check").checked){
      exampleFormat.push(document.getElementById(item+"_customFromat").value);
      exampleOutputTime.push(sampleTime[item]);
      //console.log("sampling ... :",document.getElementById(item+"_customFromat").value, sampleTime[item]);
    }
  };

  let exampleBox = document.getElementById("sampleOutputBody");
  exampleBox.innerHTML ="";
  
  console.log("examplePrefix:",examplePrefix);
  console.log("exampleFormat:",exampleFormat.join("/"));
  console.log("exampleOutputTime:",exampleOutputTime.join("/"));
  let text = document.createElement('p')
  text.innerHTML=examplePrefix;
  let time = document.createElement('p')
  time.innerHTML=exampleFormat.join('/') + " = " + exampleOutputTime.join('/');
  exampleBox.appendChild(text);
  exampleBox.appendChild(time);
  //exampleBox.innerHTML =　"<p>" + examplePrefix + exampleFormat.join('/') + " = " + exampleOutputTime.join('/') + "</p>";
}

function checkCustomFormatInput(disp) {
  document.getElementById('customTextOptions').style.display = "block";
}

function addPrefixVar(e){
  console.log("add prefix var:",this.name);
  var textarea = document.getElementById('prefix_textbox');

  var sentence = textarea.value;
  var len      = sentence.length;
  var pos      = textarea.selectionStart;

  var before   = sentence.substr(0, pos);
  var word     = this.name;
  var after    = sentence.substr(pos, len);

  sentence = before + word + after;

  textarea.value = sentence;

  //e.currentTarget.removeEventListener('click',this);

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('sessionName').addEventListener('click', {handleEvent: addPrefixVar, name: "%sessionName%"});
document.getElementById('scrambleType1').addEventListener('click', {handleEvent: addPrefixVar, name: "%scrambleType1%"});
document.getElementById('scrambleType2').addEventListener('click', {handleEvent: addPrefixVar, name: "%scrambleType2%"});
//document.getElementById('formatCustom_button').addEventListener('click', checkCustomFormatInput);