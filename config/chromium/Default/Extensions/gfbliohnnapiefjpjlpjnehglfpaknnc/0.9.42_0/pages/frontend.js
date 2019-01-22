"use strict";function command(e,n,t){var o={code:t},i=_parseAnnotation({annotation:n,feature_group:14});o.feature_group=i.feature_group,o.annotation=i.annotation,Commands.items[e]=o}Normal.enter(),command("setProxy","setProxy <proxy_host>:<proxy_port> [proxy_type|PROXY]",function(e){var n=(e.length>1?e[1]:"PROXY")+" "+e[0];return RUNTIME("updateProxy",{proxy:n}),!0}),command("setProxyMode","setProxyMode <always|direct|byhost|system|clear>",function(e){return runtime.command({action:"updateProxy",mode:e[0]},function(e){["byhost","always"].indexOf(e.proxyMode)!==-1?Front.showBanner("{0}: {1}".format(e.proxyMode,e.proxy),3e3):Front.showBanner(e.proxyMode,3e3)}),!0}),command("listVoices","list tts voices",function(){runtime.command({action:"getVoices"},function(e){var n=e.voices.map(function(e){return"<tr><td>"+e.voiceName+"</td><td>"+e.lang+"</td><td>"+e.gender+"</td><td>"+e.remote+"</td></tr>"});n.unshift("<tr style='font-weight: bold;'><td>voiceName</td><td>lang</td><td>gender</td><td>remote</td></tr>"),Front.showPopup("<table style='width:100%'>{0}</table>".format(n.join("")))})}),command("testVoices","testVoices <locale> <text>",function(e){runtime.command({action:"getVoices"},function(n){var t=n.voices,o=0;e.length>0&&(t=t.filter(function(n){return n.lang.indexOf(e[0])!==-1}));var i="This is to test voice with SurfingKeys";e.length>1&&(i=e[1]);var a;for(o=0;o<t.length-1;o++)a=i+", "+t[o].voiceName+" / "+t[o].lang+".",readText(a,{enqueue:!0,verbose:!0,voiceName:t[o].voiceName});a=i+", "+t[o].voiceName+" / "+t[o].lang+".",readText(a,{enqueue:!0,verbose:!0,voiceName:t[o].voiceName,onEnd:function(){Front.showPopup("All voices test done.")}})})}),command("stopReading","#13Stop reading.",function(e){RUNTIME("stopReading")}),command("feedkeys","feed mapkeys",function(e){Normal.feedkeys(e[0])}),command("quit","#5quit chrome",function(){RUNTIME("quit")}),command("clearHistory","clearHistory <find|cmd|...>",function(e){runtime.updateHistory(e[0],[])}),command("listSession","list session",function(){"none"===Front.omnibar.style.display&&Front.openOmnibar({type:"Commands"}),runtime.command({action:"getSettings",key:"sessions"},function(e){Omnibar.listResults(Object.keys(e.settings.sessions),function(e){return createElement("<li>"+e+"</li>")})})}),command("createSession","createSession [name]",function(e){RUNTIME("createSession",{name:e[0]})}),command("deleteSession","deleteSession [name]",function(e){return RUNTIME("deleteSession",{name:e[0]}),!0}),command("openSession","openSession [name]",function(e){RUNTIME("openSession",{name:e[0]})}),command("listQueueURLs","list URLs in queue waiting for open",function(e){runtime.command({action:"getQueueURLs"},function(e){Omnibar.listResults(e.queueURLs,function(e){return createElement("<li>"+e+"</li>")})})}),command("timeStamp","print time stamp in human readable format",function(e){var n=new Date(parseInt(e[0]));Omnibar.listWords([n.toString()])}),command("userAgent","set user agent",function(e){runtime.command({action:"setUserAgent",userAgent:e.join(" ")})});