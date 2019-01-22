var SpinnerFactory=function(n){"use strict";var r=["webkit","Moz","ms","O"],f={},h;function y(t,e){var i=n.createElement(t||"div"),o;for(o in e)i[o]=e[o];return i}function d(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var p=function(){var t="okta_spinner_styles";var e=n.getElementById(t);if(!e)e=y("style",{type:"text/css",id:t});d(n.getElementsByTagName("head")[0],e);return e.sheet||e.styleSheet}();function s(t,e,i,o){var n=["opacity",e,~~(t*100),i,o].join("-"),r=.01+i/o*100,s=Math.max(1-(1-t)/e*(100-r),t),a=h.substring(0,h.indexOf("Animation")).toLowerCase(),l=a&&"-"+a+"-"||"";if(!f[n]){p.insertRule("@"+l+"keyframes "+n+"{"+"0%{opacity:"+s+"}"+r+"%{opacity:"+t+"}"+(r+.01)+"%{opacity:1}"+(r+e)%100+"%{opacity:"+t+"}"+"100%{opacity:"+s+"}"+"}",p.cssRules.length);f[n]=1}return n}function o(t,e){var i=t.style,o,n;if(i[e]!==undefined)return e;e=e.charAt(0).toUpperCase()+e.slice(1);for(n=0;n<r.length;n++){o=r[n]+e;if(i[o]!==undefined)return o}}function m(t,e){for(var i in e)t.style[o(t,i)||i]=e[i];return t}function e(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)if(t[o]===undefined)t[o]=i[o]}return t}function v(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var i={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function a(t){if(typeof this=="undefined")return new a(t);this.opts=e(t||{},a.defaults,i)}a.defaults={};e(a.prototype,{spin:function(t){this.stop();var i=this,o=i.opts,n=i.el=m(y(0,{className:o.className}),{position:o.position,width:0,zIndex:o.zIndex}),e=o.radius+o.length+o.width,r,s;if(t){t.insertBefore(n,t.firstChild||null);s=v(t);r=v(n);m(n,{left:(o.left=="auto"?s.x-r.x+(t.offsetWidth>>1):parseInt(o.left,10)+e)+"px",top:(o.top=="auto"?s.y-r.y+(t.offsetHeight>>1):parseInt(o.top,10)+e)+"px"})}n.setAttribute("role","progressbar");i.lines(n,i.opts);if(!h){var a=0,l=(o.lines-1)*(1-o.direction)/2,f,d=o.fps,p=d/o.speed,c=(1-o.opacity)/(p*o.trail/100),u=p/o.lines;(function t(){a++;for(var e=0;e<o.lines;e++){f=Math.max(1-(a+(o.lines-e)*u)%p*c,o.opacity);i.opacity(n,e*o.direction+l,f,o)}i.timeout=i.el&&Okta.WindowUtil.setTimeout(t,~~(1e3/d))})()}return i},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=undefined}return this},lines:function(t,i){var o=0,e=(i.lines-1)*(1-i.direction)/2,n;function r(t,e){return m(y(),{position:"absolute",width:i.length+i.width+"px",height:i.width+"px",background:t,boxShadow:e,transformOrigin:"left",transform:"rotate("+~~(360/i.lines*o+i.rotate)+"deg) translate("+i.radius+"px"+",0)",borderRadius:(i.corners*i.width>>1)+"px"})}for(;o<i.lines;o++){n=m(y(),{position:"absolute",top:1+~(i.width/2)+"px",transform:i.hwaccel?"translate3d(0,0,0)":"",opacity:i.opacity,animation:h&&s(i.opacity,i.trail,e+o*i.direction,i.lines)+" "+1/i.speed+"s linear infinite"});if(i.shadow)d(n,m(r("#000","0 0 4px "+"#000"),{top:2+"px"}));d(t,d(n,r(i.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});function t(){function f(t,e){return y("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}p.addRule(".spin-vml","behavior:url(#default#VML)");a.prototype.lines=function(t,o){var n=o.length+o.width,e=2*n;function r(){return m(f("group",{coordsize:e+" "+e,coordorigin:-n+" "+-n}),{width:e,height:e})}var i=-(o.width+o.length)*2+"px",s=m(r(),{position:"absolute",top:i,left:i}),a;function l(t,e,i){d(s,d(m(r(),{rotation:360/o.lines*t+"deg",left:~~e}),d(m(f("roundrect",{arcsize:o.corners}),{width:n,height:o.width,left:o.radius,top:-o.width>>1,filter:i}),f("fill",{color:o.color,opacity:o.opacity}),f("stroke",{opacity:0}))))}if(o.shadow)for(a=1;a<=o.lines;a++)l(a,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(a=1;a<=o.lines;a++)l(a);return d(t,s)};a.prototype.opacity=function(t,e,i,o){var n=t.firstChild;o=o.shadow&&o.lines||0;if(n&&e+o<n.childNodes.length){n=n.childNodes[e+o];n=n&&n.firstChild;n=n&&n.firstChild;if(n)n.opacity=i}}}var l=m(y("group"),{behavior:"url(#default#VML)"});if(!o(l,"transform")&&l.adj)t();else h=o(l,"animation");return a};