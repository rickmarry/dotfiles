(function(){var n=this;var r=n._;var e=Array.prototype,a=Object.prototype,t=Okta.WindowUtil.Function.prototype;var i=e.push,f=e.slice,s=a.toString,u=a.hasOwnProperty;var o=Array.isArray,c=Object.keys,l=t.bind,v=Object.create;var p=function(){};var h=function(n){if(n instanceof h)return n;if(!(this instanceof h))return new h(n);this._wrapped=n};n._okta=h;h.VERSION="1.8.3";var y=function(i,u,n){if(u===void 0)return i;switch(n==null?3:n){case 1:return function(n){return i.call(u,n)};case 2:return function(n,r){return i.call(u,n,r)};case 3:return function(n,r,t){return i.call(u,n,r,t)};case 4:return function(n,r,t,e){return i.call(u,n,r,t,e)}}return function(){return i.apply(u,arguments)}};var d=function(n,r,t){if(n==null)return h.identity;if(h.isFunction(n))return y(n,r,t);if(h.isObject(n))return h.matcher(n);return h.property(n)};h.iteratee=function(n,r){return d(n,r,Infinity)};var g=function(f,c){return function(n){var r=arguments.length;if(r<2||n==null)return n;for(var t=1;t<r;t++){var e=arguments[t],i=f(e),u=i.length;for(var a=0;a<u;a++){var o=i[a];if(!c||n[o]===void 0)n[o]=e[o]}}return n}};var m=function(n){if(!h.isObject(n))return{};if(v)return v(n);p.prototype=n;var r=new p;p.prototype=null;return r};var b=function(r){return function(n){return n==null?void 0:n[r]}};var w=Math.pow(2,53)-1;var _=b("length");var j=function(n){var r=_(n);return typeof r=="number"&&r>=0&&r<=w};h.each=h.forEach=function(n,r,t){r=y(r,t);var e,i;if(j(n)){for(e=0,i=n.length;e<i;e++){r(n[e],e,n)}}else{var u=h.keys(n);for(e=0,i=u.length;e<i;e++){r(n[u[e]],u[e],n)}}return n};h.map=h.collect=function(n,r,t){r=d(r,t);var e=!j(n)&&h.keys(n),i=(e||n).length,u=Array(i);for(var a=0;a<i;a++){var o=e?e[a]:a;u[a]=r(n[o],o,n)}return u};function x(o){function f(n,r,t,e,i,u){for(;i>=0&&i<u;i+=o){var a=e?e[i]:i;t=r(t,n[a],a,n)}return t}return function(n,r,t,e){r=y(r,e,4);var i=!j(n)&&h.keys(n),u=(i||n).length,a=o>0?0:u-1;if(arguments.length<3){t=n[i?i[a]:a];a+=o}return f(n,r,t,i,a,u)}}h.reduce=h.foldl=h.inject=x(1);h.reduceRight=h.foldr=x(-1);h.find=h.detect=function(n,r,t){var e;if(j(n)){e=h.findIndex(n,r,t)}else{e=h.findKey(n,r,t)}if(e!==void 0&&e!==-1)return n[e]};h.filter=h.select=function(n,e,r){var i=[];e=d(e,r);h.each(n,function(n,r,t){if(e(n,r,t))i.push(n)});return i};h.reject=function(n,r,t){return h.filter(n,h.negate(d(r)),t)};h.every=h.all=function(n,r,t){r=d(r,t);var e=!j(n)&&h.keys(n),i=(e||n).length;for(var u=0;u<i;u++){var a=e?e[u]:u;if(!r(n[a],a,n))return false}return true};h.some=h.any=function(n,r,t){r=d(r,t);var e=!j(n)&&h.keys(n),i=(e||n).length;for(var u=0;u<i;u++){var a=e?e[u]:u;if(r(n[a],a,n))return true}return false};h.contains=h.includes=h.include=function(n,r,t,e){if(!j(n))n=h.values(n);if(typeof t!="number"||e)t=0;return h.indexOf(n,r,t)>=0};h.invoke=function(n,t){var e=f.call(arguments,2);var i=h.isFunction(t);return h.map(n,function(n){var r=i?t:n[t];return r==null?r:r.apply(n,e)})};h.pluck=function(n,r){return h.map(n,h.property(r))};h.where=function(n,r){return h.filter(n,h.matcher(r))};h.findWhere=function(n,r){return h.find(n,h.matcher(r))};h.max=function(n,e,r){var i=-Infinity,u=-Infinity,t,a;if(e==null&&n!=null){n=j(n)?n:h.values(n);for(var o=0,f=n.length;o<f;o++){t=n[o];if(t>i){i=t}}}else{e=d(e,r);h.each(n,function(n,r,t){a=e(n,r,t);if(a>u||a===-Infinity&&i===-Infinity){i=n;u=a}})}return i};h.min=function(n,e,r){var i=Infinity,u=Infinity,t,a;if(e==null&&n!=null){n=j(n)?n:h.values(n);for(var o=0,f=n.length;o<f;o++){t=n[o];if(t<i){i=t}}}else{e=d(e,r);h.each(n,function(n,r,t){a=e(n,r,t);if(a<u||a===Infinity&&i===Infinity){i=n;u=a}})}return i};h.shuffle=function(n){var r=j(n)?n:h.values(n);var t=r.length;var e=Array(t);for(var i=0,u;i<t;i++){u=h.random(0,i);if(u!==i)e[i]=e[u];e[u]=r[i]}return e};h.sample=function(n,r,t){if(r==null||t){if(!j(n))n=h.values(n);return n[h.random(n.length-1)]}return h.shuffle(n).slice(0,Math.max(0,r))};h.sortBy=function(n,e,r){e=d(e,r);return h.pluck(h.map(n,function(n,r,t){return{value:n,index:r,criteria:e(n,r,t)}}).sort(function(n,r){var t=n.criteria;var e=r.criteria;if(t!==e){if(t>e||t===void 0)return 1;if(t<e||e===void 0)return-1}return n.index-r.index}),"value")};var k=function(a){return function(e,i,n){var u={};i=d(i,n);h.each(e,function(n,r){var t=i(n,r,e);a(u,n,t)});return u}};h.groupBy=k(function(n,r,t){if(h.has(n,t))n[t].push(r);else n[t]=[r]});h.indexBy=k(function(n,r,t){n[t]=r});h.countBy=k(function(n,r,t){if(h.has(n,t))n[t]++;else n[t]=1});h.toArray=function(n){if(!n)return[];if(h.isArray(n))return f.call(n);if(j(n))return h.map(n,h.identity);return h.values(n)};h.size=function(n){if(n==null)return 0;return j(n)?n.length:h.keys(n).length};h.partition=function(n,e,r){e=d(e,r);var i=[],u=[];h.each(n,function(n,r,t){(e(n,r,t)?i:u).push(n)});return[i,u]};h.first=h.head=h.take=function(n,r,t){if(n==null)return void 0;if(r==null||t)return n[0];return h.initial(n,n.length-r)};h.initial=function(n,r,t){return f.call(n,0,Math.max(0,n.length-(r==null||t?1:r)))};h.last=function(n,r,t){if(n==null)return void 0;if(r==null||t)return n[n.length-1];return h.rest(n,Math.max(0,n.length-r))};h.rest=h.tail=h.drop=function(n,r,t){return f.call(n,r==null||t?1:r)};h.compact=function(n){return h.filter(n,h.identity)};var O=function(n,r,t,e){var i=[],u=0;for(var a=e||0,o=_(n);a<o;a++){var f=n[a];if(j(f)&&(h.isArray(f)||h.isArguments(f))){if(!r)f=O(f,r,t);var c=0,l=f.length;i.length+=l;while(c<l){i[u++]=f[c++]}}else if(!t){i[u++]=f}}return i};h.flatten=function(n,r){return O(n,r,false)};h.without=function(n){return h.difference(n,f.call(arguments,1))};h.uniq=h.unique=function(n,r,t,e){if(!h.isBoolean(r)){e=t;t=r;r=false}if(t!=null)t=d(t,e);var i=[];var u=[];for(var a=0,o=_(n);a<o;a++){var f=n[a],c=t?t(f,a,n):f;if(r){if(!a||u!==c)i.push(f);u=c}else if(t){if(!h.contains(u,c)){u.push(c);i.push(f)}}else if(!h.contains(i,f)){i.push(f)}}return i};h.union=function(){return h.uniq(O(arguments,true,true))};h.intersection=function(n){var r=[];var t=arguments.length;for(var e=0,i=_(n);e<i;e++){var u=n[e];if(h.contains(r,u))continue;for(var a=1;a<t;a++){if(!h.contains(arguments[a],u))break}if(a===t)r.push(u)}return r};h.difference=function(n){var r=O(arguments,true,true,1);return h.filter(n,function(n){return!h.contains(r,n)})};h.zip=function(){return h.unzip(arguments)};h.unzip=function(n){var r=n&&h.max(n,_).length||0;var t=Array(r);for(var e=0;e<r;e++){t[e]=h.pluck(n,e)}return t};h.object=function(n,r){var t={};for(var e=0,i=_(n);e<i;e++){if(r){t[n[e]]=r[e]}else{t[n[e][0]]=n[e][1]}}return t};function A(u){return function(n,r,t){r=d(r,t);var e=_(n);var i=u>0?0:e-1;for(;i>=0&&i<e;i+=u){if(r(n[i],i,n))return i}return-1}}h.findIndex=A(1);h.findLastIndex=A(-1);h.sortedIndex=function(n,r,t,e){t=d(t,e,1);var i=t(r);var u=0,a=_(n);while(u<a){var o=Math.floor((u+a)/2);if(t(n[o])<i)u=o+1;else a=o}return u};function I(u,a,o){return function(n,r,t){var e=0,i=_(n);if(typeof t=="number"){if(u>0){e=t>=0?t:Math.max(t+i,e)}else{i=t>=0?Math.min(t+1,i):t+i+1}}else if(o&&t&&i){t=o(n,r);return n[t]===r?t:-1}if(r!==r){t=a(f.call(n,e,i),h.isNaN);return t>=0?t+e:-1}for(t=u>0?e:i-1;t>=0&&t<i;t+=u){if(n[t]===r)return t}return-1}}h.indexOf=I(1,h.findIndex,h.sortedIndex);h.lastIndexOf=I(-1,h.findLastIndex);h.range=function(n,r,t){if(r==null){r=n||0;n=0}t=t||1;var e=Math.max(Math.ceil((r-n)/t),0);var i=Array(e);for(var u=0;u<e;u++,n+=t){i[u]=n}return i};var F=function(n,r,t,e,i){if(!(e instanceof r))return n.apply(t,i);var u=m(n.prototype);var a=n.apply(u,i);if(h.isObject(a))return a;return u};h.bind=function(n,r){if(l&&n.bind===l)return l.apply(n,f.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");var t=f.call(arguments,2);var e=function(){return F(n,e,r,this,t.concat(f.call(arguments)))};return e};h.partial=function(i){var u=f.call(arguments,1);var a=function(){var n=0,r=u.length;var t=Array(r);for(var e=0;e<r;e++){t[e]=u[e]===h?arguments[n++]:u[e]}while(n<arguments.length)t.push(arguments[n++]);return F(i,a,this,this,t)};return a};h.bindAll=function(n){var r,t=arguments.length,e;if(t<=1)throw new Error("bindAll must be passed function names");for(r=1;r<t;r++){e=arguments[r];n[e]=h.bind(n[e],n)}return n};h.memoize=function(e,i){var u=function(n){var r=u.cache;var t=""+(i?i.apply(this,arguments):n);if(!h.has(r,t))r[t]=e.apply(this,arguments);return r[t]};u.cache={};return u};h.delay=function(n,r){var t=f.call(arguments,2);return setTimeout(function(){return n.apply(null,t)},r)};h.defer=h.partial(h.delay,h,1);h.throttle=function(t,e,i){var u,a,o;var f=null;var c=0;if(!i)i={};var l=function(){c=i.leading===false?0:h.now();f=null;o=t.apply(u,a);if(!f)u=a=null};return function(){var n=h.now();if(!c&&i.leading===false)c=n;var r=e-(n-c);u=this;a=arguments;if(r<=0||r>e){if(f){clearTimeout(f);f=null}c=n;o=t.apply(u,a);if(!f)u=a=null}else if(!f&&i.trailing!==false){f=Okta.WindowUtil.setTimeout(l,r)}return o}};h.debounce=function(r,t,e){var i,u,a,o,f;var c=function(){var n=h.now()-o;if(n<t&&n>=0){i=Okta.WindowUtil.setTimeout(c,t-n)}else{i=null;if(!e){f=r.apply(a,u);if(!i)a=u=null}}};return function(){a=this;u=arguments;o=h.now();var n=e&&!i;if(!i)i=Okta.WindowUtil.setTimeout(c,t);if(n){f=r.apply(a,u);a=u=null}return f}};h.wrap=function(n,r){return h.partial(r,n)};h.negate=function(n){return function(){return!n.apply(this,arguments)}};h.compose=function(){var t=arguments;var e=t.length-1;return function(){var n=e;var r=t[e].apply(this,arguments);while(n--)r=t[n].call(this,r);return r}};h.after=function(n,r){return function(){if(--n<1){return r.apply(this,arguments)}}};h.before=function(n,r){var t;return function(){if(--n>0){t=r.apply(this,arguments)}if(n<=1)r=null;return t}};h.once=h.partial(h.before,2);var S=!{toString:null}.propertyIsEnumerable("toString");var E=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];function M(n,r){var t=E.length;var e=n.constructor;var i=h.isFunction(e)&&e.prototype||a;var u="constructor";if(h.has(n,u)&&!h.contains(r,u))r.push(u);while(t--){u=E[t];if(u in n&&n[u]!==i[u]&&!h.contains(r,u)){r.push(u)}}}h.keys=function(n){if(!h.isObject(n))return[];if(c)return c(n);var r=[];for(var t in n)if(h.has(n,t))r.push(t);if(S)M(n,r);return r};h.allKeys=function(n){if(!h.isObject(n))return[];var r=[];for(var t in n)r.push(t);if(S)M(n,r);return r};h.values=function(n){var r=h.keys(n);var t=r.length;var e=Array(t);for(var i=0;i<t;i++){e[i]=n[r[i]]}return e};h.mapObject=function(n,r,t){r=d(r,t);var e=h.keys(n),i=e.length,u={},a;for(var o=0;o<i;o++){a=e[o];u[a]=r(n[a],a,n)}return u};h.pairs=function(n){var r=h.keys(n);var t=r.length;var e=Array(t);for(var i=0;i<t;i++){e[i]=[r[i],n[r[i]]]}return e};h.invert=function(n){var r={};var t=h.keys(n);for(var e=0,i=t.length;e<i;e++){r[n[t[e]]]=t[e]}return r};h.functions=h.methods=function(n){var r=[];for(var t in n){if(h.isFunction(n[t]))r.push(t)}return r.sort()};h.extend=g(h.allKeys);h.extendOwn=h.assign=g(h.keys);h.findKey=function(n,r,t){r=d(r,t);var e=h.keys(n),i;for(var u=0,a=e.length;u<a;u++){i=e[u];if(r(n[i],i,n))return i}};h.pick=function(n,r,t){var e={},i=n,u,a;if(i==null)return e;if(h.isFunction(r)){a=h.allKeys(i);u=y(r,t)}else{a=O(arguments,false,false,1);u=function(n,r,t){return r in t};i=Object(i)}for(var o=0,f=a.length;o<f;o++){var c=a[o];var l=i[c];if(u(l,c,i))e[c]=l}return e};h.omit=function(n,r,t){if(h.isFunction(r)){r=h.negate(r)}else{var e=h.map(O(arguments,false,false,1),String);r=function(n,r){return!h.contains(e,r)}}return h.pick(n,r,t)};h.defaults=g(h.allKeys,true);h.create=function(n,r){var t=m(n);if(r)h.extendOwn(t,r);return t};h.clone=function(n){if(!h.isObject(n))return n;return h.isArray(n)?n.slice():h.extend({},n)};h.tap=function(n,r){r(n);return n};h.isMatch=function(n,r){var t=h.keys(r),e=t.length;if(n==null)return!e;var i=Object(n);for(var u=0;u<e;u++){var a=t[u];if(r[a]!==i[a]||!(a in i))return false}return true};var N=function(n,r,t,e){if(n===r)return n!==0||1/n===1/r;if(n==null||r==null)return n===r;if(n instanceof h)n=n._wrapped;if(r instanceof h)r=r._wrapped;var i=s.call(n);if(i!==s.call(r))return false;switch(i){case"[object RegExp]":case"[object String]":return""+n===""+r;case"[object Number]":if(+n!==+n)return+r!==+r;return+n===0?1/+n===1/r:+n===+r;case"[object Date]":case"[object Boolean]":return+n===+r}var u=i==="[object Array]";if(!u){if(typeof n!="object"||typeof r!="object")return false;var a=n.constructor,o=r.constructor;if(a!==o&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o)&&("constructor"in n&&"constructor"in r)){return false}}t=t||[];e=e||[];var f=t.length;while(f--){if(t[f]===n)return e[f]===r}t.push(n);e.push(r);if(u){f=n.length;if(f!==r.length)return false;while(f--){if(!N(n[f],r[f],t,e))return false}}else{var c=h.keys(n),l;f=c.length;if(h.keys(r).length!==f)return false;while(f--){l=c[f];if(!(h.has(r,l)&&N(n[l],r[l],t,e)))return false}}t.pop();e.pop();return true};h.isEqual=function(n,r){return N(n,r)};h.isEmpty=function(n){if(n==null)return true;if(j(n)&&(h.isArray(n)||h.isString(n)||h.isArguments(n)))return n.length===0;return h.keys(n).length===0};h.isElement=function(n){return!!(n&&n.nodeType===1)};h.isArray=o||function(n){return s.call(n)==="[object Array]"};h.isObject=function(n){var r=typeof n;return r==="function"||r==="object"&&!!n};h.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(r){h["is"+r]=function(n){return s.call(n)==="[object "+r+"]"}});if(!h.isArguments(arguments)){h.isArguments=function(n){return h.has(n,"callee")}}if(typeof/./!="function"&&typeof Int8Array!="object"){h.isFunction=function(n){return typeof n=="function"||false}}h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))};h.isNaN=function(n){return h.isNumber(n)&&n!==+n};h.isBoolean=function(n){return n===true||n===false||s.call(n)==="[object Boolean]"};h.isNull=function(n){return n===null};h.isUndefined=function(n){return n===void 0};h.has=function(n,r){return n!=null&&u.call(n,r)};h.noConflict=function(){n._=r;return this};h.identity=function(n){return n};h.constant=function(n){return function(){return n}};h.noop=function(){};h.property=b;h.propertyOf=function(r){return r==null?function(){}:function(n){return r[n]}};h.matcher=h.matches=function(r){r=h.extendOwn({},r);return function(n){return h.isMatch(n,r)}};h.times=function(n,r,t){var e=Array(Math.max(0,n));r=y(r,t,1);for(var i=0;i<n;i++)e[i]=r(i);return e};h.random=function(n,r){if(r==null){r=n;n=0}return n+Math.floor(Math.random()*(r-n+1))};h.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};var T=h.invert(B);var R=function(r){var t=function(n){return r[n]};var n="(?:"+h.keys(r).join("|")+")";var e=RegExp(n);var i=RegExp(n,"g");return function(n){n=n==null?"":""+n;return e.test(n)?n.replace(i,t):n}};h.escape=R(B);h.unescape=R(T);h.result=function(n,r,t){var e=n==null?void 0:n[r];if(e===void 0){e=t}return h.isFunction(e)?e.call(n):e};var q=0;h.uniqueId=function(n){var r=++q+"";return n?n+r:r};h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/;var U={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"};var W=/\\|'|\r|\n|\u2028|\u2029/g;var z=function(n){return"\\"+U[n]};h.template=function(u,n,r){if(!n&&r)n=r;n=h.defaults({},n,h.templateSettings);var t=RegExp([(n.escape||K).source,(n.interpolate||K).source,(n.evaluate||K).source].join("|")+"|$","g");var a=0;var o="__p+='";u.replace(t,function(n,r,t,e,i){o+=u.slice(a,i).replace(W,z);a=i+n.length;if(r){o+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"}else if(t){o+="'+\n((__t=("+t+"))==null?'':__t)+\n'"}else if(e){o+="';\n"+e+"\n__p+='"}return n});o+="';\n";if(!n.variable)o="with(obj||{}){\n"+o+"}\n";o="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{render=new Okta.WindowUtil.Function(n.variable||"obj","_",o)}catch(n){n.source=o;throw n}var e=function(n){return render.call(this,n,h)};var i=n.variable||"obj";e.source="function("+i+"){\n"+o+"}";return e};h.chain=function(n){var r=h(n);r._chain=true;return r};var D=function(n,r){return n._chain?h(r).chain():r};h.mixin=function(t){h.each(h.functions(t),function(n){var r=h[n]=t[n];h.prototype[n]=function(){var n=[this._wrapped];i.apply(n,arguments);return D(this,r.apply(h,n))}})};h.mixin(h);h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(r){var t=e[r];h.prototype[r]=function(){var n=this._wrapped;t.apply(n,arguments);if((r==="shift"||r==="splice")&&n.length===0)delete n[0];return D(this,n)}});h.each(["concat","join","slice"],function(n){var r=e[n];h.prototype[n]=function(){return D(this,r.apply(this._wrapped,arguments))}});h.prototype.value=function(){return this._wrapped};h.prototype.valueOf=h.prototype.toJSON=h.prototype.value;h.prototype.toString=function(){return""+this._wrapped}}).call(Okta.window);