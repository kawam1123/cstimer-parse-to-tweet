// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//internationalize
function constructMessage(){
  document.getElementById('messageH2').innerHTML = chrome.i18n.getMessage('msg_message_header');
  document.getElementById('prefixText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_prefix_text')+"</p>";
  document.getElementById('optionsH2').innerHTML = chrome.i18n.getMessage('msg_options_header');
  document.getElementById('optionsText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_options_text')+"</p>";
  document.getElementById('formatH2').innerHTML = chrome.i18n.getMessage('msg_format_header');
  document.getElementById('formatText').innerHTML = "<p>"+chrome.i18n.getMessage('msg_format_text')+"</p>";
  document.getElementById('sampleOutputH2').innerHTML = chrome.i18n.getMessage('msg_sampleoutput_header');
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
    "single": "1", "mo3": "3", "ao5": "5", "ao12": "12", "ao25": "25", "ao50": "50", "ao100": "100", "ao1000": "1000"
  },
  "option2": {
    "display": "single/ao5/ao12/ao50/100",
    "name": "formatOption2_button",
    "single": "single", "mo3": "3", "ao5": "ao5", "ao12": "ao12", "ao25": "ao25", "ao50": "ao50", "ao100": "ao100", "ao1000": "ao1000"
  },
  "option3": {
    "display": "ao1/5/12/50/100",
    "name": "formatOption3_button",
    "single": "ao1", "mo3": "3", "ao5": "5", "ao12": "12", "ao25": "25", "ao50": "50", "ao100": "100", "ao1000": "1000"
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

//construct options input field
constructMessage();
constructPrefix();
constructOptions(kOptions);
constructFormat();

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

  chrome.storage.sync.set({
    'formatOption' : formatOptionValue
  },function(){
    console.log("formatOption saved:", formatOptionValue);
  });

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
    'formatOption': "option1"
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
        formatSelected[4].checked = true;
      break;
    }
    console.log("format option restored:", items.formatOption);
  });
}

function checkCustomFormatInput(disp) {
  document.getElementById('customTextOptions').style.display = "block";
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
//document.getElementById('formatCustom_button').addEventListener('click', checkCustomFormatInput);