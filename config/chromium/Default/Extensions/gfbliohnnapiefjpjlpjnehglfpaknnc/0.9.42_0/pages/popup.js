"use strict";function updateStatus(e){var t=e.hasOwnProperty(".*");disableAll.textContent=(t?"Enable ":"Disable ")+version,runtime.command({action:"setSurfingkeysIcon",status:t})}var disableAll=document.getElementById("disableAll"),version="Surfingkeys "+chrome.runtime.getManifest().version;runtime.command({action:"getSettings",key:"blacklist"},function(e){updateStatus(e.settings.blacklist)}),disableAll.addEventListener("click",function(){runtime.command({action:"toggleBlacklist",domain:".*"},function(e){updateStatus(e.blacklist)})}),document.getElementById("reportIssue").addEventListener("click",function(){window.close();var e="%23%23+Error+details%0A%0A{0}%0A%0ASurfingKeys%3A+{1}%0A%0ABrowser%3A+{2}%0A%0AURL%3A+{3}%0A%0A%23%23+Context%0A%0A%2A%2APlease+replace+this+with+a+description+of+how+you+were+using+SurfingKeys.%2A%2A".format(encodeURIComponent(""),chrome.runtime.getManifest().version,encodeURIComponent(navigator.userAgent),encodeURIComponent("<The_URL_Where_You_Find_The_Issue>"));window.open("https://github.com/brookhong/Surfingkeys/issues/new?title={0}&body={1}".format(encodeURIComponent(""),e))});