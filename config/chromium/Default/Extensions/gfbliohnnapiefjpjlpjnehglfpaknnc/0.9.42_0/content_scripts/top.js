"use strict";if(window===top){var _setScrollPos=function(t,e){document.addEventListener("DOMContentLoaded",function(n){document.scrollingElement.scrollLeft=t,document.scrollingElement.scrollTop=e})},uiHost=document.createElement("div");uiHost.style.display="block",uiHost.style.opacity=1;var frontEndURL=chrome.runtime.getURL("pages/frontend.html"),ifr=createElement('<iframe allowtransparency="true" frameborder="0" scrolling="no" class="sk_ui" src="'+frontEndURL+'" />');uiHost.attachShadow({mode:"open"});var sk_style=document.createElement("style");setInnerHTML(sk_style,'@import url("'+chrome.runtime.getURL("pages/shadow.css")+'");'),uiHost.shadowRoot.appendChild(sk_style),uiHost.shadowRoot.appendChild(ifr),ifr.addEventListener("load",function(){this.contentWindow.postMessage({action:"initFrontend",ack:!0,origin:getDocumentOrigin()},frontEndURL),window.addEventListener("message",function(t){var e=t.data;e.commandToFrontend||e.responseToFrontend?(ifr.contentWindow.postMessage(e,frontEndURL),e.commandToFrontend&&t.source&&"showStatus"===e.action&&(activeContent&&activeContent.window===t.source||(activeContent&&activeContent.window.postMessage({action:"deactivated",direct:!0,reason:e.action+"@"+t.timeStamp,commandToContent:!0},activeContent.origin),activeContent={window:t.source,origin:e.origin},activeContent.window.postMessage({action:"activated",direct:!0,reason:e.action+"@"+t.timeStamp,commandToContent:!0},activeContent.origin))),"visualUpdatedForFirefox"===e.action&&document.activeElement.blur()):e.action&&_actions.hasOwnProperty(e.action)?_actions[e.action](e):(e.commandToContent||e.responseToContent)&&activeContent&&!e.direct&&activeContent.window!==top&&activeContent.window.postMessage(e,activeContent.origin)},!0)},!1);var lastStateOfPointerEvents="none",_origOverflowY,_actions={},activeContent=null,_initialized=!1;_actions.initFrontendAck=function(t){_initialized||(_initialized=!0,Front.resolve(window.location.href),Front.resolve=null)},_actions.setFrontFrame=function(t){ifr.style.height=t.frameHeight,t.pointerEvents&&(ifr.style.pointerEvents=t.pointerEvents),"none"===t.pointerEvents?(uiHost.blur(),ifr.blur(),lastStateOfPointerEvents!==t.pointerEvents&&activeContent.window.postMessage({action:"getBackFocus",commandToContent:!0},activeContent.origin),document.body&&(document.body.style.animationFillMode="",document.body.style.overflowY=_origOverflowY)):document.body&&(document.body.style.animationFillMode="none",void 0===_origOverflowY&&(_origOverflowY=document.body.style.overflowY),document.body.style.overflowY="visible"),lastStateOfPointerEvents=t.pointerEvents},document.addEventListener("DOMContentLoaded",function(t){document.documentElement.appendChild(uiHost),runtime.command({action:"tabURLAccessed",title:document.title,url:window.location.href},function(t){if(t.index>0){var e=function(){o=!0,document.title=n+" "+i},n=t.index,o=!1,i=document.title;new MutationObserver(function(t){o?o=!1:(i=document.title,e())}).observe(document.querySelector("title"),{childList:!0}),e(),runtime.runtime_handlers.tabIndexChange=function(t,o,i){t.index!==n&&(n=t.index,e())}}}),setTimeout(function(){for(var t in AutoCommands){var e=AutoCommands[t];e.regex.test(window.location.href)&&e.code()}},0)},{once:!0})}