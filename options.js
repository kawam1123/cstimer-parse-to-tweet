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
}

//Draw prefix message
function constructPrefix(){
  let page = document.getElementById('prefixDiv');
  let prefix = document.createElement('input');
  prefix.setAttribute("id", "prefix_textbox");
  prefix.setAttribute("type", "text");
  prefix.setAttribute("name", "prefix_option");
  prefix.setAttribute("value", "");
  page.appendChild(prefix);
  console.log("prefix box is generated.");
}

//Draw options
let page = document.getElementById('optionsDiv');
const kOptions = ['single', 'mo3', 'ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'ao200', 'ao1000'];
function constructOptions(kOptions) {
  for (let item of kOptions) {
    var checkbox_name = item + "_check";
    let label = document.createElement('label');
    
    label.setAttribute("for", checkbox_name);
    label.setAttribute("style", "display:block;");
    page.appendChild(label);
    let checkbox = document.createElement('input');
    checkbox.setAttribute("id", checkbox_name);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "display_option");
    checkbox.setAttribute("value", item);

    label.appendChild(checkbox);
    label.insertAdjacentHTML('beforeend',item);
  }
  console.log("options box is generated.");
}

//construct options input field
constructMessage();
constructOptions(kOptions);
constructPrefix();

// Saves options to chrome.storage
function save_options() {
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
  chrome.storage.sync.set({
    'prefix': document.getElementById("prefix_textbox").value
  }, function(){
    var status = document.getElementById('prefix_status');
    status.textContent = chrome.i18n.getMessage('msg_prefix_saved');
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
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);