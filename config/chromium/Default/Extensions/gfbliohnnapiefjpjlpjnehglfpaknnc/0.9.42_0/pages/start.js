"use strict";runtime.command({action:"getTopSites"},function(e){var n=e.urls.map(function(e){return'<li><a href="'+e.url+'"><i style="background:url(\'chrome://favicon/'+e.url+"') no-repeat\"></i>"+e.title+"</a></li>"});setInnerHTML(document.querySelector("#topSites>ul"),n.join("\n"));var t=document.getElementById("quickIntroSource").innerText;setInnerHTML(document.querySelector("#quickIntro"),marked(t));var r=document.querySelector("#screen1");r.show(),r.classList.add("fadeIn");var a=document.querySelector("#screen2");document.getElementById("back").onclick=function(){var e=a.classList;e.remove("fadeOut"),e.remove("fadeIn"),e.add("fadeOut"),a.one("animationend",function(){a.hide(),r.show(),r.classList.add("fadeIn")})},document.querySelector("#-show-full-list-of-surfingkeys->a").onclick=function(){var e=r.classList;e.remove("fadeOut"),e.remove("fadeIn"),e.add("fadeOut"),r.one("animationend",function(){r.hide(),a.show(),a.classList.add("fadeIn")})}}),document.addEventListener("surfingkeys:userSettingsLoaded",function(e){Front.getUsage(function(e){var n=document.getElementById("sk_usage");setInnerHTML(n,e);var t=Array.from(n.querySelectorAll("div")).filter(function(e){return e.firstElementChild.matches(".kbd-span")}),r=document.getElementById("randomTip");setInterval(function(){var e=Math.floor(1e5*Math.random()%t.length),n=r.classList;n.remove("fadeOut"),n.remove("fadeIn"),n.add("fadeOut"),r.one("animationend",function(){setInnerHTML(this,t[e].innerHTML),this.classList.add("fadeIn")})},5e3)})});