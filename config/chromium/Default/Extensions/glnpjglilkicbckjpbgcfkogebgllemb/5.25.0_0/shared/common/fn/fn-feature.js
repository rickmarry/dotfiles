(function n(){var t=Okta.fn.feature={},e=_okta.find,i=_okta.findKey,o=_okta.memoize,r=_okta.partial,u={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"};t.getTransitionCss=o(function(){return i(u,r(d,document.createElement("div")))});t.getTransitionEndEventType=o(function(){return e(u,r(d,document.createElement("div")))});function d(n,t,e){return typeof n.style[e]!=="undefined"}t.onInputSupported=o(function(){var n=document.createElement("div");if("oninput"in n){return true}n.setAttribute("oninput","return;");return typeof n["oninput"]=="function"});t.ie5DocumentMode=o(function(){return document.documentMode===5});t.ie7DocumentMode=o(function(){return document.documentMode===7})})();