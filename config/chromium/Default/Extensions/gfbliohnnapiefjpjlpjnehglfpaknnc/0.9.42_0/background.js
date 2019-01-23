"use strict";function loadRawSettings(t,e,n){var o=n||{};chrome.storage.local.get(null,function(n){var r=n.savedAt||0;chrome.storage.sync.get(null,function(i){var a=i.savedAt||0;r>a?(extendObject(o,n),_save(chrome.storage.sync,n,function(){var n=getSubSettings(o,t);chrome.runtime.lastError&&(n.error="Settings sync may not work thoroughly because of: "+chrome.runtime.lastError.message),e(n)})):r<a?(extendObject(o,i),e(getSubSettings(o,t)),_save(chrome.storage.local,i)):(extendObject(o,n),e(getSubSettings(o,t)))})})}function _applyProxySettings(t){if(t.proxyMode&&"clear"!==t.proxyMode){var e=t.autoproxy_hosts.map(function(t){return t.filter(function(t){return t.indexOf("*")!==-1}).join("|")}),n=t.autoproxy_hosts.map(function(t){return dictFromArray(t.filter(function(t){return t.indexOf("*")===-1}),1)}),o={mode:["always","byhost","bypass"].indexOf(t.proxyMode)!==-1?"pac_script":t.proxyMode,pacScript:{data:"var pacGlobal = {\n                        hosts: "+JSON.stringify(n)+",\n                        autoproxy_pattern: "+JSON.stringify(e)+",\n                        proxyMode: '"+t.proxyMode+"',\n                        proxy: "+JSON.stringify(t.proxy)+'\n                    };\n                    function FindProxyForURL(url, host) {\n                        var lastPos;\n                        if (pacGlobal.proxyMode === "always") {\n                            return pacGlobal.proxy[0];\n                        } else if (pacGlobal.proxyMode === "bypass") {\n                            var pp = new RegExp(pacGlobal.autoproxy_pattern[0]);\n                            do {\n                                if (pacGlobal.hosts[0].hasOwnProperty(host)\n                                    || (pacGlobal.autoproxy_pattern[0].length && pp.test(host))) {\n                                    return "DIRECT";\n                                }\n                                lastPos = host.indexOf(\'.\') + 1;\n                                host = host.slice(lastPos);\n                            } while (lastPos >= 1);\n                            return pacGlobal.proxy[0];\n                        } else {\n                            for (var i = 0; i < pacGlobal.proxy.length; i++) {\n                                var pp = new RegExp(pacGlobal.autoproxy_pattern[i]);\n                                var ahost = host;\n                                do {\n                                    if (pacGlobal.hosts[i].hasOwnProperty(ahost)\n                                        || (pacGlobal.autoproxy_pattern[i].length && pp.test(ahost))) {\n                                        return pacGlobal.proxy[i];\n                                    }\n                                    lastPos = ahost.indexOf(\'.\') + 1;\n                                    ahost = ahost.slice(lastPos);\n                                } while (lastPos >= 1);\n                            }\n                            return "DIRECT";\n                        }\n                    }'}};chrome.proxy.settings.set({value:o,scope:"regular"},function(){})}else chrome.proxy.settings.clear({scope:"regular"})}function request(t,e,n,o,r){return n=n||{},new Promise(function(e,r){var i=new XMLHttpRequest,a=void 0!==o?"POST":"GET";i.open(a,t);for(var s in n)i.setRequestHeader(s,n[s]);i.onload=function(){e(i.responseText)},i.onerror=r.bind(null,i),i.send(o)}).then(e)["catch"](function(t){r&&r(t)})}function dictFromArray(t,e){var n={};return t.forEach(function(t){n[t]=e}),n}function extendObject(t,e){for(var n in e)t[n]=e[n]}function getSubSettings(t,e){var n;return e?(e instanceof Array||(e=[e]),n={},e.forEach(function(e){n[e]=t[e]})):n=t,n}function _save(t,e,n){e.localPath&&delete e.snippets,t.set(e,n)}var Gist=function(){function t(t,e,n){request("https://api.github.com/gists",function(o){var r=JSON.parse(o),i="";r.forEach(function(t){t.hasOwnProperty("description")&&t.description===e&&t.files.hasOwnProperty(e)&&(i=t.id)}),""===i?request("https://api.github.com/gists",function(t){var e=JSON.parse(t);n(e.id)},{Authorization:"token "+t},'{ "description": "'+e+'", "public": false, "files": { "'+e+'": { "content": "'+e+'" } } }'):n(i)},{Authorization:"token "+t})}function e(t,e){request("https://api.github.com/gists/"+s+"/comments",function(t){e&&e(t)},{Authorization:"token "+i},'{"body": "'+encodeURIComponent(t)+'"}')}function n(t,e){request("https://api.github.com/gists/"+s+"/comments/"+t,function(t){var n=JSON.parse(t);e({status:0,content:decodeURIComponent(n.body)})},{Authorization:"token "+i})}function o(t){request("https://api.github.com/gists/"+s+"/comments",function(e){c=JSON.parse(e).map(function(t){return t.id}),t(c)},{Authorization:"token "+i})}function r(t,e,n){request("https://api.github.com/gists/"+s+"/comments/"+t,function(t){n&&n(t)},{Authorization:"token "+i},'{"body": "'+encodeURIComponent(e)+'"}')}var i,a={},s="",c=[];return a.initGist=function(e,n){i===e&&""!==s?n&&n(s):(i=e,t(i,"cloudboard",function(t){s=t,n&&n(s)}))},a.readComment=function(t,e){""===s?e({status:1,content:"Please call initGist first!"}):t>=c.length?o(function(o){t<o.length?n(o[t],e):e({status:1,content:"Register not exists!"})}):n(c[t],e)},a.editComment=function(t,n,i){""===s?i({status:1,content:"Please call initGist first!"}):t>=c.length?o(function(o){if(t<o.length)r(o[t],n,i);else{var a=function c(){s--,s>0?e(".",c):0===s&&e(n,i)},s=t-o.length+1;a()}}):r(c[t],n,i)},a}(),ChromeService=function(){function t(e,n){var o=n;if(""===e.title||e.hasOwnProperty("url")&&void 0!==e.url||(o+="/"+e.title,F.push({id:e.id,title:o+"/"})),e.hasOwnProperty("children"))for(var r=0;r<e.children.length;++r)t(e.children[r],o)}function e(t,n){t.path.length?chrome.bookmarks.create({parentId:t.folder,title:t.path.shift()},function(o){t.folder=o.id,e(t,n)}):chrome.bookmarks.create({parentId:t.folder,title:t.title,url:t.url},function(t){n(t)})}function n(t,e,n,o){if(t&&"content_runtime"!==t.target)if(O.hasOwnProperty(t.action)){t.repeats>G.repeatThreshold&&(t.repeats=G.repeatThreshold);try{O[t.action](t,e,n)}catch(r){console.log(t.action+": "+r)}}else{var i=o?"[unexpected port message] ":"[unexpected runtime message] ";console.log(i+JSON.stringify(t))}}function o(t,e){var n={blacklist:{},marks:{},findHistory:[],cmdHistory:[],sessions:{},proxyMode:"clear",autoproxy_hosts:[],proxy:[]};loadRawSettings(t,function(t){"string"==typeof t.proxy&&(t.proxy=[t.proxy],t.autoproxy_hosts=[t.autoproxy_hosts]),t.localPath?request(t.localPath,function(n){t.snippets=n,e(t)},void 0,void 0,function(n){t.error="Failed to read snippets from "+t.localPath,e(t)}):e(t)},n)}function r(t){delete E[t],delete _[t],delete A[t],delete M[t],delete U[t],S=S.filter(function(e){return e!==t}),H.length&&chrome.tabs.create({active:!1,url:H.shift()}),u()}function i(t){if(_.hasOwnProperty(t)){var e=_[t];chrome.tabs.executeScript(t,{code:"_setScrollPos("+e.scrollLeft+", "+e.scrollTop+")"}),delete _[t]}}function a(t,e,n){n.action=t.action,n.id=t.id,e(n)}function s(t,e){t.savedAt=(new Date).getTime(),_save(chrome.storage.local,t,function(){e&&e()}),_save(chrome.storage.sync,t,function(){if(chrome.runtime.lastError){chrome.runtime.lastError.message}})}function c(t,e){I.forEach(function(e){e.postMessage({action:"settingsUpdated",settings:t})}),s(t,e)}function u(){G.showTabIndices&&chrome.tabs.query({currentWindow:!0},function(t){t.forEach(function(t){chrome.tabs.sendMessage(t.id,{subject:"tabIndexChange",target:"content_runtime",index:t.index+1})})})}function d(t,e,n){if(t.blacklist[".*"])return!0;if(e){if(t.blacklist[e.origin])return!0;if(n)return n=new RegExp(n.source,n.flags),n.test(e.href)}return!1}function l(t,e){request(t,function(n){c({localPath:t,snippets:n}),e({status:"Succeeded",snippets:n})},void 0,void 0,function(t){e({status:"Failed"})})}function f(t,e){return e&&e.length&&(t=t.filter(function(t){return t.title.indexOf(e)!==-1||t.url&&t.url.indexOf(e)!==-1})),t}function h(t,e){chrome.history.search({startTime:0,maxResults:2147483647,text:""},function(n){e&&(n=n.sort(function(t,e){return e.visitCount-t.visitCount})),t(n)})}function p(t,e){return t<0?t=0:t>=e&&(t=e),t}function m(t,e,n){return e>n-t&&(t-=e-(n-t)),t}function b(t,e){chrome.tabs.query({windowId:t.windowId},function(n){0==t.index&&e==-1?e=n.length-1:t.index==n.length-1&&1==e&&(e=1-n.length);var o=p(t.index+e,n.length-1);chrome.tabs.update(n[o].id,{active:!0})})}function g(t,e,n){chrome.tabs.query({windowId:t.windowId},function(o){var r=o.map(function(t){return t.id});e=p(e,o.length);var i=m(t.index,e,o.length);n(r.slice(i,i+e))})}function y(t,e){chrome.tabs.query({currentWindow:!0},function(n){n=n.map(function(t){return t.id}),chrome.tabs.remove(n.slice(t.tab.index+(e<0?e:1),t.tab.index+(e<0?0:1+e)))})}function v(t){return!/^view-source:|^javascript:/.test(t)&&/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im.test(t)&&(t=/^[\w-]+?:/i.test(t)?t:"http://"+t),t}function w(){chrome.windows.getAll({populate:!1},function(t){t.forEach(function(t){chrome.windows.remove(t.id)})})}function x(t,e){o(["proxyMode","proxy","autoproxy_hosts"],function(n){if("deleteProxyPair"===t.operation)n.proxy.splice(t.number,1),n.autoproxy_hosts.splice(t.number,1);else if("set"===t.operation)n.proxyMode=t.mode,n.proxy=t.proxy,n.autoproxy_hosts=t.host;else if(t.mode&&(n.proxyMode=t.mode),t.number||(t.number=0),t.proxy&&(n.proxy[t.number]=t.proxy,n.autoproxy_hosts.length<=t.number&&(n.autoproxy_hosts[t.number]=[])),t.host){var o=dictFromArray(n.autoproxy_hosts[t.number],1),r=t.host.split(/\s*[ ,\n]\s*/);"toggle"===t.operation?r.forEach(function(t){o.hasOwnProperty(t)?delete o[t]:o[t]=1}):"add"===t.operation?r.forEach(function(t){o[t]=1}):r.forEach(function(t){delete o[t]}),n.autoproxy_hosts[t.number]=Object.keys(o)}var i={autoproxy_hosts:n.autoproxy_hosts,proxyMode:n.proxyMode,proxy:n.proxy};c(i),_applyProxySettings(n),e&&e(i)})}function k(t,e){var n=t[0],t=t.substr(1);"B"===n?chrome.bookmarks.remove(t,e):"H"===n?chrome.history.deleteUrl({url:t},e):"T"===n?(t=t.split(":").map(function(t){return parseInt(t)}),chrome.windows.update(t[0],{focused:!0},function(){chrome.tabs.remove(t[1],e)})):"M"===n&&o("marks",function(n){delete n.marks[t],c({marks:n.marks},e)})}function T(t,e){chrome.bookmarks.search({url:t},function(t){t.forEach(function(t){chrome.bookmarks.remove(t.id)}),e&&e()})}function q(t){for(var e=0;e<t.requestHeaders.length;++e)if("User-Agent"===t.requestHeaders[e].name){t.requestHeaders[e].value=D;break}return{requestHeaders:t.requestHeaders}}var O={},I=[],S=[],P=0,R=0,L=!1,E={},_={},U={},A={},M={},C="chrome://newtab/",G={focusAfterClosed:"right",repeatThreshold:99,tabsMRUOrder:!0,newTabPosition:"default",showTabIndices:!1,interceptedErrors:[]},F=[];o(null,_applyProxySettings),chrome.webRequest.onErrorOccurred.addListener(function(t){var e=t.tabId;e===-1||G.interceptedErrors.indexOf("*")===-1&&G.interceptedErrors.indexOf(t.error)===-1||(M.hasOwnProperty(e)||(M[e]=[]),"main_frame"===t.type&&(M[e]=[],"net::ERR_ABORTED"!==t.error&&chrome.tabs.update(e,{url:chrome.extension.getURL("pages/error.html")})),M[e].push(t))},{urls:["<all_urls>"]}),chrome.runtime.onConnect.addListener(function(t){t.sender;I.push(t),t.onMessage.addListener(function(t,e){return n(t,e.sender,function(n){try{e.isDisconnected||e.postMessage(n)}catch(o){console.log(t.action+": "+o),console.log(e)}},e)}),t.onDisconnect.addListener(function(){t.isDisconnected=!0;for(var e=0;e<I.length;e++)if(I[e]===t){I.splice(e,1);break}})}),chrome.tabs.onRemoved.addListener(r),chrome.tabs.onUpdated.addListener(function(t,e,n){"loading"===e.status&&delete U[t],i(t)}),chrome.tabs.onCreated.addListener(function(t){i(t.id),u()}),chrome.tabs.onMoved.addListener(function(){u()}),chrome.tabs.onActivated.addListener(function(t){A.hasOwnProperty(t.tabId)&&!L&&t.tabId!=S[S.length-1]&&(S.length>10&&S.shift(),P!=S.length-1&&S.splice(P+1,S.length-1),S.push(t.tabId),P=S.length-1),E[t.tabId]=(new Date).getTime(),L=!1,R=0,u()}),chrome.tabs.onDetached.addListener(function(){u()}),chrome.tabs.onAttached.addListener(function(){u()}),chrome.commands.onCommand.addListener(function(t){switch(t){case"restartext":chrome.runtime.reload();break;case"previousTab":case"nextTab":chrome.tabs.query({active:!0,currentWindow:!0},function(e){var n=e[0],o="previousTab"===t?n.index-1:n.index+1;chrome.tabs.query({windowId:n.windowId},function(t){o=(o%t.length+t.length)%t.length,chrome.tabs.update(t[o].id,{active:!0})})});break;case"closeTab":chrome.tabs.query({active:!0,currentWindow:!0},function(t){chrome.tabs.remove(t[0].id)});break;case"proxyThis":chrome.tabs.query({currentWindow:!0,active:!0},function(t){var e=new URL(t[0].url).host;x({host:e,operation:"toggle"},function(){chrome.tabs.reload(t[0].id,{bypassCache:!0})})})}}),chrome.runtime.onMessage.addListener(n),O.getTabErrors=function(t,e,n){a(t,n,{tabError:M[e.tab.id]})},O.clearTabErrors=function(t,e,n){M[e.tab.id]=[]},O.isTabActive=function(t,e,n){chrome.tabs.query({active:!0},function(o){var r=o.map(function(t){return t.id});a(t,n,{active:r.indexOf(e.tab.id)!==-1})})},O.toggleBlacklist=function(t,e,n){o("blacklist",function(o){var r=".*";e.tab&&0!==e.tab.url.indexOf(chrome.extension.getURL(""))&&(r=new URL(e.tab.url).origin),o.blacklist.hasOwnProperty(r)?delete o.blacklist[r]:o.blacklist[r]=1,c({blacklist:o.blacklist},function(){a(t,n,{disabled:d(o,e.tab?new URL(e.tab.url):null,t.blacklistPattern),blacklist:o.blacklist,url:r})})})},O.getDisabled=function(t,e,n){o("blacklist",function(o){e.tab&&a(t,n,{disabled:d(o,new URL(e.tab.url),t.blacklistPattern)})})},O.addVIMark=function(t,e,n){o("marks",function(e){extendObject(e.marks,t.mark),c({marks:e.marks})})},O.resetSettings=function(t,e,n){chrome.storage.local.clear(),chrome.storage.sync.clear(),o(null,function(e){_applyProxySettings(e),a(t,n,{settings:e}),I.forEach(function(t){t.postMessage({action:"settingsUpdated",settings:e})})})},O.loadSettingsFromUrl=function(t,e,n){l(t.url,function(e){a(t,n,e)})},O.getRecentlyClosed=function(t,e,n){chrome.sessions.getRecentlyClosed({},function(e){for(var o=[],r=0;r<e.length;r++){var i=e[r];i.hasOwnProperty("window")?o=o.concat(i.window.tabs):i.hasOwnProperty("tab")&&o.push(i.tab)}o=f(o,t.query),a(t,n,{urls:o})})},O.getTopSites=function(t,e,n){chrome.topSites.get(function(e){e=f(e,t.query),a(t,n,{urls:e})})},O.getAllURLs=function(t,e,n){chrome.bookmarks.getRecent(2147483647,function(e){var o=e;h(function(e){o=o.concat(e),a(t,n,{urls:o})},!0)})},O.getTabs=function(t,e,n){var o=e.tab,r=t.queryInfo||{};chrome.tabs.query(r,function(e){e=f(e,t.query),t.query&&t.query.length&&(e=e.filter(function(e){return e.title.indexOf(t.query)!==-1||e.url&&e.url.indexOf(t.query)!==-1})),e=e.filter(function(t){return t.id!==o.id}),G.tabsMRUOrder&&e.sort(function(t,e){var n=E[t.id],o=E[e.id];return isFinite(n)||isFinite(o)?isFinite(n)?isFinite(o)?o-n:-1:1:0}),a(t,n,{tabs:e})})},O.togglePinTab=function(t,e,n){chrome.tabs.query({currentWindow:!0,active:!0},function(t){var e=t[0];return chrome.tabs.update(e.id,{pinned:!e.pinned})})},O.focusTab=function(t,e,n){void 0!==t.window_id&&e.tab.windowId!==t.window_id?chrome.windows.update(t.window_id,{focused:!0},function(){chrome.tabs.update(t.tab_id,{active:!0})}):chrome.tabs.update(t.tab_id,{active:!0})},O.focusTabByIndex=function(t,e,n){var o=t.queryInfo||{};chrome.tabs.query(o,function(e){t.repeats>0&&t.repeats<=e.length&&chrome.tabs.update(e[t.repeats-1].id,{active:!0})})},O.goToLastTab=function(t,e,n){if(S.length>1){var o=S[S.length-2];chrome.tabs.update(o,{active:!0})}},O.historyTab=function(t,e,n){if(S.length>0){L=!0,t.hasOwnProperty("index")?P=(parseInt(t.index)+S.length)%S.length:(P+=t.backward?-1:1,P<0?P=0:P>=S.length&&(P=S.length-1));var o=S[P];chrome.tabs.update(o,{active:!0})}},O.nextTab=function(t,e,n){b(e.tab,t.repeats)},O.previousTab=function(t,e,n){b(e.tab,-t.repeats)},O.reloadTab=function(t,e,n){g(e.tab,t.repeats,function(e){e.forEach(function(e){chrome.tabs.reload(e,{bypassCache:t.nocache})})})},O.closeTab=function(t,e,n){g(e.tab,t.repeats,function(t){chrome.tabs.remove(t,function(){"left"===G.focusAfterClosed&&b(e.tab,-1)})})},O.closeTabLeft=function(t,e,n){y(e,-t.repeats)},O.closeTabRight=function(t,e,n){y(e,t.repeats)},O.closeTabsToLeft=function(t,e,n){y(e,-e.tab.index)},O.closeTabsToRight=function(t,e,n){chrome.tabs.query({currentWindow:!0},function(t){y(e,t.length-e.tab.index)})},O.tabOnly=function(t,e,n){chrome.tabs.query({currentWindow:!0},function(t){t=t.map(function(t){return t.id}).filter(function(t){return t!=e.tab.id}),chrome.tabs.remove(t)})},O.muteTab=function(t,e,n){var o=e.tab;chrome.tabs.update(o.id,{muted:!o.mutedInfo.muted})},O.openLast=function(t,e,n){chrome.sessions.restore()},O.duplicateTab=function(t,e,n){chrome.tabs.duplicate(e.tab.id)},O.newWindow=function(t,e,n){chrome.tabs.query({},function(t){var n={};if(t.forEach(function(t){n[t.windowId]=n[t.windowId]||[],n[t.windowId].push(t.id)}),n[e.tab.windowId]&&1===n[e.tab.windowId].length){var o,r=0;for(var i in n)n[i].length>r&&(r=n[i].length,o=i);chrome.tabs.move(e.tab.id,{windowId:parseInt(o),index:-1})}else chrome.windows.create({tabId:e.tab.id})})},O.getBookmarkFolders=function(e,n,o){chrome.bookmarks.getTree(function(n){F=[],t(n[0],""),a(e,o,{folders:F})})},O.createBookmark=function(t,n,o){T(t.page.url,function(){e(t.page,function(e){a(t,o,{bookmark:e})})})},O.getBookmarks=function(t,e,n){t.parentId?chrome.bookmarks.getSubTree(t.parentId,function(e){var o=e[0].children;t.query&&t.query.length&&(o=o.filter(function(e){return e.title.indexOf(t.query)!==-1||e.url&&e.url.indexOf(t.query)!==-1})),a(t,n,{bookmarks:o})}):t.query&&t.query.length?chrome.bookmarks.search(t.query,function(e){a(t,n,{bookmarks:e})}):chrome.bookmarks.getTree(function(e){a(t,n,{bookmarks:e[0].children})})},O.getHistory=function(t,e,n){h(function(e){a(t,n,{history:e})},t.sortByMostUsed)},O.openLink=function(t,e,n){var o=v(t.url);if(t.tab.tabbed){var r;if(e.tab)switch(G.newTabPosition){case"left":r=e.tab.index;break;case"right":r=e.tab.index+1;break;case"first":r=0;break;case"last":break;default:r=e.tab.index+1+R,R++}chrome.tabs.create({url:o,active:t.tab.active,index:r,pinned:t.tab.pinned,openerTabId:e.tab.id},function(e){(t.scrollLeft||t.scrollTop)&&(_[e.id]={scrollLeft:t.scrollLeft,scrollTop:t.scrollTop})})}else chrome.tabs.update({url:o,pinned:t.tab.pinned||e.tab.pinned},function(e){(t.scrollLeft||t.scrollTop)&&(_[e.id]={scrollLeft:t.scrollLeft,scrollTop:t.scrollTop})})},O.viewSource=function(t,e,n){t.url="view-source:"+e.tab.url,O.openLink(t,e,n)},O.getSettings=function(t,e,n){var r=o;"RAW"===t.key&&(r=loadRawSettings,t.key=""),r(t.key,function(e){a(t,n,{settings:e})})},O.updateSettings=function(t,e,n){if("snippets"===t.scope)for(var o in t.settings)G.hasOwnProperty(o)&&(G[o]=t.settings[o]);else c(t.settings)},O.setSurfingkeysIcon=function(t,e,n){chrome.browserAction.setIcon({path:t.status?"icons/48-x.png":"icons/48.png",tabId:e.tab?e.tab.id:void 0})},O.request=function(t,e,n){request(t.url,function(e){a(t,n,{text:e})},t.headers,t.data)},O.nextFrame=function(t,e,n){var o=e.tab.id;chrome.tabs.executeScript(o,{allFrames:!0,code:"Front && Front.getFrameId && Front.getFrameId()"},function(t){t=t.filter(function(t){return t}),t.length>1&&(U.hasOwnProperty(o)||(U[o]=0),U[o]++,U[o]=U[o]%t.length,chrome.tabs.sendMessage(o,{subject:"focusFrame",target:"content_runtime",frameId:t[U[o]]}))})},O.moveTab=function(t,e,n){chrome.tabs.query({windowId:e.tab.windowId},function(n){var o=p(e.tab.index+t.step*t.repeats,n.length);chrome.tabs.move(e.tab.id,{index:o})})},O.quit=function(t,e,n){w()},O.createSession=function(t,e,n){o("sessions",function(e){chrome.tabs.query({},function(n){var o={};n.forEach(function(t){t&&void 0!==t.index&&(o.hasOwnProperty(t.windowId)||(o[t.windowId]=[]),t.url!==C&&o[t.windowId].push(t.url))});var r=[];for(var i in o)o[i].length&&r.push(o[i]);e.sessions[t.name]={},e.sessions[t.name].tabs=r,c({sessions:e.sessions},t.quitAfterSaved?w:void 0)})})},O.openSession=function(t,e,n){o("sessions",function(e){if(e.sessions.hasOwnProperty(t.name)){var n=e.sessions[t.name].tabs;n[0].forEach(function(t){chrome.tabs.create({url:t,active:!1,pinned:!1})});for(var o=1;o<n.length;o++){var r=n[o];chrome.windows.create({},function(t){r.forEach(function(e){chrome.tabs.create({windowId:t.id,url:e,active:!1,pinned:!1})})})}chrome.tabs.query({url:C},function(t){chrome.tabs.remove(t.map(function(t){return t.id}))})}})},O.deleteSession=function(t,e,n){o("sessions",function(e){delete e.sessions[t.name],c({sessions:e.sessions})})},O.closeDownloadsShelf=function(t,e,n){t.clearHistory?chrome.downloads.erase({urlRegex:".*"}):(chrome.downloads.setShelfEnabled(!1),chrome.downloads.setShelfEnabled(!0))},O.getDownloads=function(t,e,n){chrome.downloads.search(t.query,function(e){a(t,n,{downloads:e})})},O.executeScript=function(t,e,n){chrome.tabs.executeScript(e.tab.id,{frameId:e.frameId,code:t.code,matchAboutBlank:!0,file:t.file},function(e){a(t,n,{response:e})})},O.tabURLAccessed=function(t,e,n){if(e.tab){var o=e.tab.id;A.hasOwnProperty(o)||(A[o]={}),A[o][t.url]=t.title,a(t,n,{index:G.showTabIndices?e.tab.index+1:0})}},O.getTabURLs=function(t,e,n){var o=A[e.tab.id]||{};o=Object.keys(o).map(function(t){return{url:t,title:o[t]}}),a(t,n,{urls:o})},O.getTopURL=function(t,e,n){a(t,n,{url:e.tab?e.tab.url:""})},O.updateProxy=function(t,e,n){x(t,function(e){a(t,n,e)})},O.setZoom=function(t,e,n){var o=e.tab.id,r=t.zoomFactor*t.repeats;0==r?chrome.tabs.setZoom(o,1):chrome.tabs.getZoom(o,function(t){chrome.tabs.setZoom(o,t+r)})},O.removeURL=function(t,e,n){function o(){r++,r===i&&a(t,n,{response:"Done"})}var r=0,i=t.uid.length,s=t.uid;"string"==typeof t.uid&&(i=1,s=[t.uid]),s.forEach(function(t){k(t,o)})},O.localData=function(t,e,n){t.data.constructor===Object?(chrome.storage.local.set(t.data,function(){}),I.forEach(function(e){e.postMessage({action:"settingsUpdated",settings:t.data})})):chrome.storage.local.get(t.data,function(e){a(t,n,{data:e})})},O.captureVisibleTab=function(t,e,n){chrome.tabs.captureVisibleTab(null,{format:"png"},function(e){a(t,n,{dataUrl:e})})},O.getCaptureSize=function(t,e,n){var o=document.createElement("img");o.onload=function(){a(t,n,{width:o.width,height:o.height})},chrome.tabs.captureVisibleTab(null,{format:"png"},function(t){o.src=t})},O.deleteHistoryOlderThan=function(t,e,n){var o=t.days||0,r=t.hours||0;chrome.history.deleteRange({startTime:0,endTime:(new Date).getTime()-1e3*(86400*o+3600*r)},function(){})},O.removeBookmark=function(t,e,n){T(e.tab.url)},O.getBookmark=function(t,e,n){chrome.bookmarks.search({url:e.tab.url},function(e){a(t,n,{bookmarks:e})})},O.initGist=function(t,e,n){Gist.initGist(t.token,function(e){a(t,n,{gist:e})})},O.readComment=function(t,e,n){Gist.readComment(t.index,function(e){a(t,n,e)})},O.editComment=function(t,e,n){Gist.editComment(t.index,t.content,function(e){a(t,n,{gistResp:e})})};var H=[];O.queueURLs=function(t,e,n){H=H.concat(t.urls)},O.getQueueURLs=function(t,e,n){a(t,n,{queueURLs:H})},O.getVoices=function(t,e,n){chrome.tts.getVoices(function(e){a(t,n,{voices:e})})},O.read=function(t,e,n){var o=t.options||{};o.onEvent=function(e){a(t,n,{ttsEvent:e})},chrome.tts.speak(t.content,o)},O.stopReading=function(t,e,n){chrome.tts.stop()},O.openIncognito=function(t,e,n){chrome.windows.create({url:t.url,incognito:!0})};var D;return O.setUserAgent=function(t,e,n){t.userAgent?(D=t.userAgent,chrome.webRequest.onBeforeSendHeaders.addListener(q,{urls:["<all_urls>"]},["blocking","requestHeaders"])):chrome.webRequest.onBeforeSendHeaders.removeListener(q),chrome.tabs.reload(e.tab.id)},chrome.runtime.setUninstallURL("http://brookhong.github.io/2018/01/30/why-did-you-uninstall-surfingkeys.html"),O}();