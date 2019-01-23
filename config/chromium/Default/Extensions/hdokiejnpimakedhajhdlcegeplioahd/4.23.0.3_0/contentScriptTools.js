LPContentScriptTools=function(){var t,e,n,r=function(t,e){var n=document.createElement("img");n.src=t,n.addEventListener("load",function(){var t=function(t){var e="";try{var n=document.createElement("canvas");n.height=t.clientHeight,n.width=t.clientWidth,n.getContext("2d").drawImage(t,0,0),e=n.toDataURL()}catch(t){}return e}(n);document.body.removeChild(n),e(t)}),n.addEventListener("error",function(){e(""),document.body.removeChild(n)}),document.body.appendChild(n)},i=function(t,e){for(var n=t.nodeValue.trim(),r=null,i=0;i<e.searches.length;++i){var o=e.searches[i];if(e.exactMatch){if(n===o)return o;if(e.allowEmails){var l=n.split("@");if(2===l.length&&l[0]===o)return o}}else if(e.wordMatch){for(var u=n.split(/\s/),a=0;a<u.length;++a)if(u[a]===o)return o}else n.indexOf(o)>-1&&(null===r||o.length>r.length)&&(r=o)}return r},o=(t=function(t){if(t.parentElement)switch(t.parentElement.nodeName){case"SCRIPT":return!1}return!0},function(e){var n=[];if(e.searches){e.searches=[].concat(e.searches);for(var r=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);r.nextNode();)if(t(r.currentNode)){var o=i(r.currentNode,e);if(o&&(n.push({parent:r.currentNode.parentElement,match:o,matchingText:r.currentNode.nodeValue.trim()}),!e.searchAll))break}}return e.searchAll?n:n[0]}),l=(e=!1,window.addEventListener("beforeunload",function(t){!1!==t.isTrusted&&(e=!0)}),function(){return e}),u=function(t,e){return window.getComputedStyle(t).getPropertyValue(e)},a=function(t){return"FORM"===t.nodeName},c=function(t){if(t.scrollWidth>t.clientWidth){var e=u(t,"overflow-x");return"auto"===e||"scroll"===e}},f=function(t){if(t.scrollHeight>t.clientHeight)switch(u(t,"overflow-y")){case"auto":case"scroll":return!0;case"visible":return t===document.body||!t.parentElement}return!1},d=(n=[function(t){if(t.getAttribute("id")){var e=document.querySelector('label[for="'+t.getAttribute("id")+'"]');if(e)return e.textContent}return null},function(t){for(var e=t;e;){if("LABEL"===e.tagName.toUpperCase())return e.textContent;e=e.parentElement}return null},function(t){return t.getAttribute("placeholder")},function(t){for(var e=t;e;){var n=e.textContent;if(n){var r=n.split("\n").map(function(t){return t.trim()}).filter(function(t){return t.length>0});if(1===r.length)return r[0];break}e=e.previousSibling||e.parentElement}}],function(t){for(var e=0;e<n.length;++e){var r=n[e](t);if(r)return r.trim()}return""});return{getFavicon:function(t){for(var e=[],n=document.getElementsByTagName("link"),i=0,o=n.length;i<o;++i){var l=n[i],u=l.getAttribute("rel");if(u&&u.indexOf("icon")>-1){var a=l.getAttribute("href");"svg"!==a.substring(a.length-3)&&e.push(a)}}e.push(document.location.origin+"/favicon.ico");var c=0,f=function(n){n?t(n):c>e.length-1?bg.LPPlatform.getFavicon({url:document.location.href,callback:t}):r(e[c++],f)};f()},findText:function(t){var e=o(t),n=e?e.match:null;return t.callback&&t.callback(n),n},isUnloading:l,findTextNodes:o,isForm:a,getForm:function(t){for(;t;){if(a(t))return t;t=t.parentElement}return null},isClickable:function(t){if("function"==typeof document.elementFromPoint){var e=t.getBoundingClientRect();return document.elementFromPoint(e.left+parseInt(e.width/2),e.top+parseInt(e.height/2))===t}return!0},isVisible:function(t){if(!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))return!1;var e=t.getBoundingClientRect(),n=function(t){for(var e={top:0,left:0,width:window.innerWidth,height:window.innerHeight},n=t.parentElement;n;)n.scrollLeft>0&&(e.left-=n.scrollLeft),n.scrollTop>0&&(e.top-=n.scrollTop),c(n)&&(e.width+=n.scrollWidth-n.clientWidth),f(n)&&(e.height+=n.scrollHeight-n.clientHeight),n=n.parentElement;return e.right=e.left+e.width,e.bottom=e.top+e.height,e}(t);return!(e.right<n.left||e.bottom<n.top||e.left>n.right||e.top>n.bottom)},getLabel:d,getAttributes:function(t,e){for(var n={},r=0;r<e.length;++r){var i=t.getAttribute(e[r]);i&&(n[e[r]]=i)}return n},debounce:function(t,e,n){var r;return function(){var i=this,o=arguments,l=n&&!r;clearTimeout(r),r=setTimeout(function(){r=null,n||t.apply(i,o)},e),l&&t.apply(i,o)}},getCSS:u,setCSS:function(t,e){for(var n in e)t.style.setProperty(n,"string"==typeof(r=e[n])?r:"number"==typeof r?r+"px":"","important");var r;return t}}}();
//# sourceMappingURL=sourcemaps/contentScriptTools.js.map