/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
*	interval: 50,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 100,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @return    The object (aka "this") that called hoverIntent, and the event object
* @author    Brian Cherne <brian@cherne.net>
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
})(jQuery);






/*
 * jquery.tools 1.1.2 - The missing UI library for the Web
 * 
 * [tools.tabs-1.0.4, tools.tabs.slideshow-1.0.2, tools.tabs.history-1.0.2, tools.tooltip-1.1.2, tools.tooltip.slide-1.0.0, tools.tooltip.dynamic-1.0.1, tools.scrollable-1.1.2, tools.scrollable.circular-0.5.1, tools.scrollable.autoscroll-1.0.1, tools.scrollable.navigator-1.0.2, tools.scrollable.mousewheel-1.0.1, tools.overlay-1.1.2, tools.overlay.gallery-1.0.0, tools.overlay.apple-1.0.1, tools.expose-1.0.5]
 * 
 * Copyright (c) 2009 Tero Piirainen
 * http://flowplayer.org/tools/
 *
 * Dual licensed under MIT and GPL 2+ licenses
 * http://www.opensource.org/licenses
 * 
 * -----
 * 
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Sizzle CSS Selector Engine - v0.9.3
 * Copyright 2009, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 * More information: http://sizzlejs.com/
 * 
 * -----
 * 
 * jquery.event.wheel.js - rev 1 
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 * 
 * -----
 * 
 * File generated: Wed Oct 07 09:46:53 GMT 2009
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
(function(d){d.tools=d.tools||{};d.tools.tabs={version:"1.0.4",conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",api:false,rotate:false},addEffect:function(e,f){c[e]=f}};var c={"default":function(f,e){this.getPanes().hide().eq(f).show();e.call()},fade:function(g,e){var f=this.getConf(),j=f.fadeOutSpeed,h=this.getPanes();if(j){h.fadeOut(j)}else{h.hide()}h.eq(g).fadeIn(f.fadeInSpeed,e)},slide:function(f,e){this.getPanes().slideUp(200);this.getPanes().eq(f).slideDown(400,e)},ajax:function(f,e){this.getPanes().eq(0).load(this.getTabs().eq(f).attr("href"),e)}};var b;d.tools.tabs.addEffect("horizontal",function(f,e){if(!b){b=this.getPanes().eq(0).width()}this.getCurrentPane().animate({width:0},function(){d(this).hide()});this.getPanes().eq(f).animate({width:b},function(){d(this).show();e.call()})});function a(g,h,f){var e=this,j=d(this),i;d.each(f,function(k,l){if(d.isFunction(l)){j.bind(k,l)}});d.extend(this,{click:function(k,n){var o=e.getCurrentPane();var l=g.eq(k);if(typeof k=="string"&&k.replace("#","")){l=g.filter("[href*="+k.replace("#","")+"]");k=Math.max(g.index(l),0)}if(f.rotate){var m=g.length-1;if(k<0){return e.click(m,n)}if(k>m){return e.click(0,n)}}if(!l.length){if(i>=0){return e}k=f.initialIndex;l=g.eq(k)}if(k===i){return e}n=n||d.Event();n.type="onBeforeClick";j.trigger(n,[k]);if(n.isDefaultPrevented()){return}c[f.effect].call(e,k,function(){n.type="onClick";j.trigger(n,[k])});n.type="onStart";j.trigger(n,[k]);if(n.isDefaultPrevented()){return}i=k;g.removeClass(f.current);l.addClass(f.current);return e},getConf:function(){return f},getTabs:function(){return g},getPanes:function(){return h},getCurrentPane:function(){return h.eq(i)},getCurrentTab:function(){return g.eq(i)},getIndex:function(){return i},next:function(){return e.click(i+1)},prev:function(){return e.click(i-1)},bind:function(k,l){j.bind(k,l);return e},onBeforeClick:function(k){return this.bind("onBeforeClick",k)},onClick:function(k){return this.bind("onClick",k)},unbind:function(k){j.unbind(k);return e}});g.each(function(k){d(this).bind(f.event,function(l){e.click(k,l);return false})});if(location.hash){e.click(location.hash)}else{if(f.initialIndex===0||f.initialIndex>0){e.click(f.initialIndex)}}h.find("a[href^=#]").click(function(k){e.click(d(this).attr("href"),k)})}d.fn.tabs=function(i,f){var g=this.eq(typeof f=="number"?f:0).data("tabs");if(g){return g}if(d.isFunction(f)){f={onBeforeClick:f}}var h=d.extend({},d.tools.tabs.conf),e=this.length;f=d.extend(h,f);this.each(function(l){var j=d(this);var k=j.find(f.tabs);if(!k.length){k=j.children()}var m=i.jquery?i:j.children(i);if(!m.length){m=e==1?d(i):j.parent().find(i)}g=new a(k,m,f);j.data("tabs",g)});return f.api?g:this}})(jQuery);
(function(b){var a=b.tools.tabs;a.plugins=a.plugins||{};a.plugins.slideshow={version:"1.0.2",conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:false,autopause:true,interval:3000,clickable:true,api:false}};b.prototype.slideshow=function(e){var f=b.extend({},a.plugins.slideshow.conf),c=this.length,d;e=b.extend(f,e);this.each(function(){var p=b(this),m=p.tabs(),i=b(m),o=m;b.each(e,function(t,u){if(b.isFunction(u)){m.bind(t,u)}});function n(t){return c==1?b(t):p.parent().find(t)}var s=n(e.next).click(function(){m.next()});var q=n(e.prev).click(function(){m.prev()});var h,j,l,g=false;b.extend(m,{play:function(){if(h){return}var t=b.Event("onBeforePlay");i.trigger(t);if(t.isDefaultPrevented()){return m}g=false;h=setInterval(m.next,e.interval);i.trigger("onPlay");m.next()},pause:function(){if(!h){return m}var t=b.Event("onBeforePause");i.trigger(t);if(t.isDefaultPrevented()){return m}h=clearInterval(h);l=clearInterval(l);i.trigger("onPause")},stop:function(){m.pause();g=true},onBeforePlay:function(t){return m.bind("onBeforePlay",t)},onPlay:function(t){return m.bind("onPlay",t)},onBeforePause:function(t){return m.bind("onBeforePause",t)},onPause:function(t){return m.bind("onPause",t)}});if(e.autopause){var k=m.getTabs().add(s).add(q).add(m.getPanes());k.hover(function(){m.pause();j=clearInterval(j)},function(){if(!g){j=setTimeout(m.play,e.interval)}})}if(e.autoplay){l=setTimeout(m.play,e.interval)}else{m.stop()}if(e.clickable){m.getPanes().click(function(){m.next()})}if(!m.getConf().rotate){var r=e.disabledClass;if(!m.getIndex()){q.addClass(r)}m.onBeforeClick(function(u,t){if(!t){q.addClass(r)}else{q.removeClass(r);if(t==m.getTabs().length-1){s.addClass(r)}else{s.removeClass(r)}}})}});return e.api?d:this}})(jQuery);
(function(d){var a=d.tools.tabs;a.plugins=a.plugins||{};a.plugins.history={version:"1.0.2",conf:{api:false}};var e,b;function c(f){if(f){var g=b.contentWindow.document;g.open().close();g.location.hash=f}}d.fn.onHash=function(g){var f=this;if(d.browser.msie&&d.browser.version<"8"){if(!b){b=d("<iframe/>").attr("src","javascript:false;").hide().get(0);d("body").append(b);setInterval(function(){var i=b.contentWindow.document,j=i.location.hash;if(e!==j){d.event.trigger("hash",j);e=j}},100);c(location.hash||"#")}f.bind("click.hash",function(h){c(d(this).attr("href"))})}else{setInterval(function(){var j=location.hash;var i=f.filter("[href$="+j+"]");if(!i.length){j=j.replace("#","");i=f.filter("[href$="+j+"]")}if(i.length&&j!==e){e=j;d.event.trigger("hash",j)}},100)}d(window).bind("hash",g);return this};d.fn.history=function(g){var h=d.extend({},a.plugins.history.conf),f;g=d.extend(h,g);this.each(function(){var j=d(this).tabs(),i=j.getTabs();if(j){f=j}i.onHash(function(k,l){if(!l||l=="#"){l=j.getConf().initialIndex}j.click(l)});i.click(function(k){location.hash=d(this).attr("href").replace("#","")})});return g.api?f:this}})(jQuery);
(function(c){var d=[];c.tools=c.tools||{};c.tools.tooltip={version:"1.1.2",conf:{effect:"toggle",fadeOutSpeed:"fast",tip:null,predelay:0,delay:30,opacity:1,lazy:undefined,position:["top","center"],offset:[0,0],cancelDefault:true,relative:false,oneInstance:true,events:{def:"mouseover,mouseout",input:"focus,blur",widget:"focus mouseover,blur mouseout",tooltip:"mouseover,mouseout"},api:false},addEffect:function(e,g,f){b[e]=[g,f]}};var b={toggle:[function(e){var f=this.getConf(),g=this.getTip(),h=f.opacity;if(h<1){g.css({opacity:h})}g.show();e.call()},function(e){this.getTip().hide();e.call()}],fade:[function(e){this.getTip().fadeIn(this.getConf().fadeInSpeed,e)},function(e){this.getTip().fadeOut(this.getConf().fadeOutSpeed,e)}]};function a(f,g){var p=this,k=c(this);f.data("tooltip",p);var l=f.next();if(g.tip){l=c(g.tip);if(l.length>1){l=f.nextAll(g.tip).eq(0);if(!l.length){l=f.parent().nextAll(g.tip).eq(0)}}}function o(u){var t=g.relative?f.position().top:f.offset().top,s=g.relative?f.position().left:f.offset().left,v=g.position[0];t-=l.outerHeight()-g.offset[0];s+=f.outerWidth()+g.offset[1];var q=l.outerHeight()+f.outerHeight();if(v=="center"){t+=q/2}if(v=="bottom"){t+=q}v=g.position[1];var r=l.outerWidth()+f.outerWidth();if(v=="center"){s-=r/2}if(v=="left"){s-=r}return{top:t,left:s}}var i=f.is(":input"),e=i&&f.is(":checkbox, :radio, select, :button"),h=f.attr("type"),n=g.events[h]||g.events[i?(e?"widget":"input"):"def"];n=n.split(/,\s*/);if(n.length!=2){throw"Tooltip: bad events configuration for "+h}f.bind(n[0],function(r){if(g.oneInstance){c.each(d,function(){this.hide()})}var q=l.data("trigger");if(q&&q[0]!=this){l.hide().stop(true,true)}r.target=this;p.show(r);n=g.events.tooltip.split(/,\s*/);l.bind(n[0],function(){p.show(r)});if(n[1]){l.bind(n[1],function(){p.hide(r)})}});f.bind(n[1],function(q){p.hide(q)});if(!c.browser.msie&&!i&&!g.predelay){f.mousemove(function(){if(!p.isShown()){f.triggerHandler("mouseover")}})}if(g.opacity<1){l.css("opacity",g.opacity)}var m=0,j=f.attr("title");if(j&&g.cancelDefault){f.removeAttr("title");f.data("title",j)}c.extend(p,{show:function(r){if(r){f=c(r.target)}clearTimeout(l.data("timer"));if(l.is(":animated")||l.is(":visible")){return p}function q(){l.data("trigger",f);var t=o(r);if(g.tip&&j){l.html(f.data("title"))}r=r||c.Event();r.type="onBeforeShow";k.trigger(r,[t]);if(r.isDefaultPrevented()){return p}t=o(r);l.css({position:"absolute",top:t.top,left:t.left});var s=b[g.effect];if(!s){throw'Nonexistent effect "'+g.effect+'"'}s[0].call(p,function(){r.type="onShow";k.trigger(r)})}if(g.predelay){clearTimeout(m);m=setTimeout(q,g.predelay)}else{q()}return p},hide:function(r){clearTimeout(l.data("timer"));clearTimeout(m);if(!l.is(":visible")){return}function q(){r=r||c.Event();r.type="onBeforeHide";k.trigger(r);if(r.isDefaultPrevented()){return}b[g.effect][1].call(p,function(){r.type="onHide";k.trigger(r)})}if(g.delay&&r){l.data("timer",setTimeout(q,g.delay))}else{q()}return p},isShown:function(){return l.is(":visible, :animated")},getConf:function(){return g},getTip:function(){return l},getTrigger:function(){return f},bind:function(q,r){k.bind(q,r);return p},onHide:function(q){return this.bind("onHide",q)},onBeforeShow:function(q){return this.bind("onBeforeShow",q)},onShow:function(q){return this.bind("onShow",q)},onBeforeHide:function(q){return this.bind("onBeforeHide",q)},unbind:function(q){k.unbind(q);return p}});c.each(g,function(q,r){if(c.isFunction(r)){p.bind(q,r)}})}c.prototype.tooltip=function(e){var f=this.eq(typeof e=="number"?e:0).data("tooltip");if(f){return f}var g=c.extend(true,{},c.tools.tooltip.conf);if(c.isFunction(e)){e={onBeforeShow:e}}else{if(typeof e=="string"){e={tip:e}}}e=c.extend(true,g,e);if(typeof e.position=="string"){e.position=e.position.split(/,?\s/)}if(e.lazy!==false&&(e.lazy===true||this.length>20)){this.one("mouseover",function(h){f=new a(c(this),e);f.show(h);d.push(f)})}else{this.each(function(){f=new a(c(this),e);d.push(f)})}return e.api?f:this}})(jQuery);
(function(b){var a=b.tools.tooltip;a.effects=a.effects||{};a.effects.slide={version:"1.0.0"};b.extend(a.conf,{direction:"up",bounce:false,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!b.browser.msie});var c={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};b.tools.tooltip.addEffect("slide",function(d){var f=this.getConf(),g=this.getTip(),h=f.slideFade?{opacity:f.opacity}:{},e=c[f.direction]||c.up;h[e[1]]=e[0]+"="+f.slideOffset;if(f.slideFade){g.css({opacity:0})}g.show().animate(h,f.slideInSpeed,d)},function(e){var g=this.getConf(),i=g.slideOffset,h=g.slideFade?{opacity:0}:{},f=c[g.direction]||c.up;var d=""+f[0];if(g.bounce){d=d=="+"?"-":"+"}h[f[1]]=d+"="+i;this.getTip().animate(h,g.slideOutSpeed,function(){b(this).hide();e.call()})})})(jQuery);
(function(d){var c=d.tools.tooltip;c.plugins=c.plugins||{};c.plugins.dynamic={version:"1.0.1",conf:{api:false,classNames:"top right bottom left"}};function b(h){var e=d(window);var g=e.width()+e.scrollLeft();var f=e.height()+e.scrollTop();return[h.offset().top<=e.scrollTop(),g<=h.offset().left+h.width(),f<=h.offset().top+h.height(),e.scrollLeft()>=h.offset().left]}function a(f){var e=f.length;while(e--){if(f[e]){return false}}return true}d.fn.dynamic=function(g){var h=d.extend({},c.plugins.dynamic.conf),f;if(typeof g=="number"){g={speed:g}}g=d.extend(h,g);var e=g.classNames.split(/\s/),i;this.each(function(){if(d(this).tooltip().jquery){throw"Lazy feature not supported by dynamic plugin. set lazy: false for tooltip"}var j=d(this).tooltip().onBeforeShow(function(n,o){var m=this.getTip(),l=this.getConf();if(!i){i=[l.position[0],l.position[1],l.offset[0],l.offset[1],d.extend({},l)]}d.extend(l,i[4]);l.position=[i[0],i[1]];l.offset=[i[2],i[3]];m.css({visibility:"hidden",position:"absolute",top:o.top,left:o.left}).show();var k=b(m);if(!a(k)){if(k[2]){d.extend(l,g.top);l.position[0]="top";m.addClass(e[0])}if(k[3]){d.extend(l,g.right);l.position[1]="right";m.addClass(e[1])}if(k[0]){d.extend(l,g.bottom);l.position[0]="bottom";m.addClass(e[2])}if(k[1]){d.extend(l,g.left);l.position[1]="left";m.addClass(e[3])}if(k[0]||k[2]){l.offset[0]*=-1}if(k[1]||k[3]){l.offset[1]*=-1}}m.css({visibility:"visible"}).hide()});j.onShow(function(){var l=this.getConf(),k=this.getTip();l.position=[i[0],i[1]];l.offset=[i[2],i[3]]});j.onHide(function(){var k=this.getTip();k.removeClass(g.classNames)});f=j});return g.api?f:this}})(jQuery);
(function(b){b.tools=b.tools||{};b.tools.scrollable={version:"1.1.2",conf:{size:4,vertical:false,speed:400,keyboard:true,keyboardSteps:null,disabledClass:"disabled",hoverClass:null,clickable:true,activeClass:"active",easing:"swing",loop:false,items:".items",item:null,prev:".prev",next:".next",prevPage:".prevPage",nextPage:".nextPage",api:false}};var c;function a(o,m){var r=this,p=b(this),d=!m.vertical,e=o.children(),k=0,i;if(!c){c=r}b.each(m,function(s,t){if(b.isFunction(t)){p.bind(s,t)}});if(e.length>1){e=b(m.items,o)}function l(t){var s=b(t);return m.globalNav?s:o.parent().find(t)}o.data("finder",l);var f=l(m.prev),h=l(m.next),g=l(m.prevPage),n=l(m.nextPage);b.extend(r,{getIndex:function(){return k},getClickIndex:function(){var s=r.getItems();return s.index(s.filter("."+m.activeClass))},getConf:function(){return m},getSize:function(){return r.getItems().size()},getPageAmount:function(){return Math.ceil(this.getSize()/m.size)},getPageIndex:function(){return Math.ceil(k/m.size)},getNaviButtons:function(){return f.add(h).add(g).add(n)},getRoot:function(){return o},getItemWrap:function(){return e},getItems:function(){return e.children(m.item)},getVisibleItems:function(){return r.getItems().slice(k,k+m.size)},seekTo:function(s,w,t){if(s<0){s=0}if(k===s){return r}if(b.isFunction(w)){t=w}if(s>r.getSize()-m.size){return m.loop?r.begin():this.end()}var u=r.getItems().eq(s);if(!u.length){return r}var v=b.Event("onBeforeSeek");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}if(w===undefined||b.isFunction(w)){w=m.speed}function x(){if(t){t.call(r,s)}p.trigger("onSeek",[s])}if(d){e.animate({left:-u.position().left},w,m.easing,x)}else{e.animate({top:-u.position().top},w,m.easing,x)}c=r;k=s;v=b.Event("onStart");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}f.add(g).toggleClass(m.disabledClass,s===0);h.add(n).toggleClass(m.disabledClass,s>=r.getSize()-m.size);return r},move:function(u,t,s){i=u>0;return this.seekTo(k+u,t,s)},next:function(t,s){return this.move(1,t,s)},prev:function(t,s){return this.move(-1,t,s)},movePage:function(w,v,u){i=w>0;var s=m.size*w;var t=k%m.size;if(t>0){s+=(w>0?-t:m.size-t)}return this.move(s,v,u)},prevPage:function(t,s){return this.movePage(-1,t,s)},nextPage:function(t,s){return this.movePage(1,t,s)},setPage:function(t,u,s){return this.seekTo(t*m.size,u,s)},begin:function(t,s){i=false;return this.seekTo(0,t,s)},end:function(t,s){i=true;var u=this.getSize()-m.size;return u>0?this.seekTo(u,t,s):r},reload:function(){p.trigger("onReload");return r},focus:function(){c=r;return r},click:function(u){var v=r.getItems().eq(u),s=m.activeClass,t=m.size;if(u<0||u>=r.getSize()){return r}if(t==1){if(m.loop){return r.next()}if(u===0||u==r.getSize()-1){i=(i===undefined)?true:!i}return i===false?r.prev():r.next()}if(t==2){if(u==k){u--}r.getItems().removeClass(s);v.addClass(s);return r.seekTo(u,time,fn)}if(!v.hasClass(s)){r.getItems().removeClass(s);v.addClass(s);var x=Math.floor(t/2);var w=u-x;if(w>r.getSize()-t){w=r.getSize()-t}if(w!==u){return r.seekTo(w)}}return r},bind:function(s,t){p.bind(s,t);return r},unbind:function(s){p.unbind(s);return r}});b.each("onBeforeSeek,onStart,onSeek,onReload".split(","),function(s,t){r[t]=function(u){return r.bind(t,u)}});f.addClass(m.disabledClass).click(function(){r.prev()});h.click(function(){r.next()});n.click(function(){r.nextPage()});if(r.getSize()<m.size){h.add(n).addClass(m.disabledClass)}g.addClass(m.disabledClass).click(function(){r.prevPage()});var j=m.hoverClass,q="keydown."+Math.random().toString().substring(10);r.onReload(function(){if(j){r.getItems().hover(function(){b(this).addClass(j)},function(){b(this).removeClass(j)})}if(m.clickable){r.getItems().each(function(s){b(this).unbind("click.scrollable").bind("click.scrollable",function(t){if(b(t.target).is("a")){return}return r.click(s)})})}if(m.keyboard){b(document).unbind(q).bind(q,function(t){if(t.altKey||t.ctrlKey){return}if(m.keyboard!="static"&&c!=r){return}var u=m.keyboardSteps;if(d&&(t.keyCode==37||t.keyCode==39)){r.move(t.keyCode==37?-u:u);return t.preventDefault()}if(!d&&(t.keyCode==38||t.keyCode==40)){r.move(t.keyCode==38?-u:u);return t.preventDefault()}return true})}else{b(document).unbind(q)}});r.reload()}b.fn.scrollable=function(d){var e=this.eq(typeof d=="number"?d:0).data("scrollable");if(e){return e}var f=b.extend({},b.tools.scrollable.conf);d=b.extend(f,d);d.keyboardSteps=d.keyboardSteps||d.size;this.each(function(){e=new a(b(this),d);b(this).data("scrollable",e)});return d.api?e:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.circular={version:"0.5.1",conf:{api:false,clonedClass:"cloned"}};b.fn.circular=function(e){var d=b.extend({},a.plugins.circular.conf),c;b.extend(d,e);this.each(function(){var i=b(this).scrollable(),n=i.getItems(),k=i.getConf(),f=i.getItemWrap(),j=0;if(i){c=i}if(n.length<k.size){return false}n.slice(0,k.size).each(function(o){b(this).clone().appendTo(f).click(function(){i.click(n.length+o)}).addClass(d.clonedClass)});var l=b.makeArray(n.slice(-k.size)).reverse();b(l).each(function(o){b(this).clone().prependTo(f).click(function(){i.click(-o-1)}).addClass(d.clonedClass)});var m=f.children(k.item);var h=k.hoverClass;if(h){m.hover(function(){b(this).addClass(h)},function(){b(this).removeClass(h)})}function g(o){var p=m.eq(o);if(k.vertical){f.css({top:-p.position().top})}else{f.css({left:-p.position().left})}}g(k.size);b.extend(i,{move:function(s,r,p,q){var u=j+s+k.size;var t=u>i.getSize()-k.size;if(u<=0||t){var o=j+k.size+(t?-n.length:n.length);g(o);u=o+s}if(q){m.removeClass(k.activeClass).eq(u+Math.floor(k.size/2)).addClass(k.activeClass)}if(u===j+k.size){return self}return i.seekTo(u,r,p)},begin:function(p,o){return this.seekTo(k.size,p,o)},end:function(p,o){return this.seekTo(n.length,p,o)},click:function(p,r,q){if(!k.clickable){return self}if(k.size==1){return this.next()}var s=p-j,o=k.activeClass;s-=Math.floor(k.size/2);return this.move(s,r,q,true)},getIndex:function(){return j},setPage:function(p,q,o){return this.seekTo(p*k.size+k.size,q,o)},getPageAmount:function(){return Math.ceil(n.length/k.size)},getPageIndex:function(){if(j<0){return this.getPageAmount()-1}if(j>=n.length){return 0}var o=(j+k.size)/k.size-1;return o},getVisibleItems:function(){var o=j+k.size;return m.slice(o,o+k.size)}});i.onStart(function(p,o){j=o-k.size;return false});i.getNaviButtons().removeClass(k.disabledClass)});return d.api?c:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.autoscroll={version:"1.0.1",conf:{autoplay:true,interval:3000,autopause:true,steps:1,api:false}};b.fn.autoscroll=function(d){if(typeof d=="number"){d={interval:d}}var e=b.extend({},a.plugins.autoscroll.conf),c;b.extend(e,d);this.each(function(){var g=b(this).scrollable();if(g){c=g}var i,f,h=true;g.play=function(){if(i){return}h=false;i=setInterval(function(){g.move(e.steps)},e.interval);g.move(e.steps)};g.pause=function(){i=clearInterval(i)};g.stop=function(){g.pause();h=true};if(e.autopause){g.getRoot().add(g.getNaviButtons()).hover(function(){g.pause();clearInterval(f)},function(){if(!h){f=setTimeout(g.play,e.interval)}})}if(e.autoplay){setTimeout(g.play,e.interval)}});return e.api?c:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.navigator={version:"1.0.2",conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:false,api:false,idPrefix:null}};b.fn.navigator=function(d){var e=b.extend({},a.plugins.navigator.conf),c;if(typeof d=="string"){d={navi:d}}d=b.extend(e,d);this.each(function(){var i=b(this).scrollable(),f=i.getRoot(),l=f.data("finder").call(null,d.navi),g=null,k=i.getNaviButtons();if(i){c=i}i.getNaviButtons=function(){return k.add(l)};function j(){if(!l.children().length||l.data("navi")==i){l.empty();l.data("navi",i);for(var m=0;m<i.getPageAmount();m++){l.append(b("<"+(d.naviItem||"a")+"/>"))}g=l.children().each(function(n){var o=b(this);o.click(function(p){i.setPage(n);return p.preventDefault()});if(d.indexed){o.text(n)}if(d.idPrefix){o.attr("id",d.idPrefix+n)}})}else{g=d.naviItem?l.find(d.naviItem):l.children();g.each(function(n){var o=b(this);o.click(function(p){i.setPage(n);return p.preventDefault()})})}g.eq(0).addClass(d.activeClass)}i.onStart(function(o,n){var m=d.activeClass;g.removeClass(m).eq(i.getPageIndex()).addClass(m)});i.onReload(function(){j()});j();var h=g.filter("[href="+location.hash+"]");if(h.length){i.move(g.index(h))}});return d.api?c:this}})(jQuery);
(function(b){b.fn.wheel=function(e){return this[e?"bind":"trigger"]("wheel",e)};b.event.special.wheel={setup:function(){b.event.add(this,d,c,{})},teardown:function(){b.event.remove(this,d,c)}};var d=!b.browser.mozilla?"mousewheel":"DOMMouseScroll"+(b.browser.version<"1.9"?" mousemove":"");function c(e){switch(e.type){case"mousemove":return b.extend(e.data,{clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY});case"DOMMouseScroll":b.extend(e,e.data);e.delta=-e.detail/3;break;case"mousewheel":e.delta=e.wheelDelta/120;break}e.type="wheel";return b.event.handle.call(this,e,e.delta)}var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.mousewheel={version:"1.0.1",conf:{api:false,speed:50}};b.fn.mousewheel=function(f){var g=b.extend({},a.plugins.mousewheel.conf),e;if(typeof f=="number"){f={speed:f}}f=b.extend(g,f);this.each(function(){var h=b(this).scrollable();if(h){e=h}h.getRoot().wheel(function(i,j){h.move(j<0?1:-1,f.speed||50);return false})});return f.api?e:this}})(jQuery);
(function(c){c.tools=c.tools||{};c.tools.overlay={version:"1.1.2",addEffect:function(e,f,g){b[e]=[f,g]},conf:{top:"10%",left:"center",absolute:false,speed:"normal",closeSpeed:"fast",effect:"default",close:null,oneInstance:true,closeOnClick:true,closeOnEsc:true,api:false,expose:null,target:null}};var b={};c.tools.overlay.addEffect("default",function(e){this.getOverlay().fadeIn(this.getConf().speed,e)},function(e){this.getOverlay().fadeOut(this.getConf().closeSpeed,e)});var d=[];function a(g,k){var o=this,m=c(this),n=c(window),j,i,h,e=k.expose&&c.tools.expose.version;var f=k.target||g.attr("rel");i=f?c(f):null||g;if(!i.length){throw"Could not find Overlay: "+f}if(g&&g.index(i)==-1){g.click(function(p){o.load(p);return p.preventDefault()})}c.each(k,function(p,q){if(c.isFunction(q)){m.bind(p,q)}});c.extend(o,{load:function(u){if(o.isOpened()){return o}var r=b[k.effect];if(!r){throw'Overlay: cannot find effect : "'+k.effect+'"'}if(k.oneInstance){c.each(d,function(){this.close(u)})}u=u||c.Event();u.type="onBeforeLoad";m.trigger(u);if(u.isDefaultPrevented()){return o}h=true;if(e){i.expose().load(u)}var t=k.top;var s=k.left;var p=i.outerWidth({margin:true});var q=i.outerHeight({margin:true});if(typeof t=="string"){t=t=="center"?Math.max((n.height()-q)/2,0):parseInt(t,10)/100*n.height()}if(s=="center"){s=Math.max((n.width()-p)/2,0)}if(!k.absolute){t+=n.scrollTop();s+=n.scrollLeft()}i.css({top:t,left:s,position:"absolute"});u.type="onStart";m.trigger(u);r[0].call(o,function(){if(h){u.type="onLoad";m.trigger(u)}});if(k.closeOnClick){c(document).bind("click.overlay",function(w){if(!o.isOpened()){return}var v=c(w.target);if(v.parents(i).length>1){return}c.each(d,function(){this.close(w)})})}if(k.closeOnEsc){c(document).unbind("keydown.overlay").bind("keydown.overlay",function(v){if(v.keyCode==27){c.each(d,function(){this.close(v)})}})}return o},close:function(q){if(!o.isOpened()){return o}q=q||c.Event();q.type="onBeforeClose";m.trigger(q);if(q.isDefaultPrevented()){return}h=false;b[k.effect][1].call(o,function(){q.type="onClose";m.trigger(q)});var p=true;c.each(d,function(){if(this.isOpened()){p=false}});if(p){c(document).unbind("click.overlay").unbind("keydown.overlay")}return o},getContent:function(){return i},getOverlay:function(){return i},getTrigger:function(){return g},getClosers:function(){return j},isOpened:function(){return h},getConf:function(){return k},bind:function(p,q){m.bind(p,q);return o},unbind:function(p){m.unbind(p);return o}});c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(p,q){o[q]=function(r){return o.bind(q,r)}});if(e){if(typeof k.expose=="string"){k.expose={color:k.expose}}c.extend(k.expose,{api:true,closeOnClick:k.closeOnClick,closeOnEsc:false});var l=i.expose(k.expose);l.onBeforeClose(function(p){o.close(p)});o.onClose(function(p){l.close(p)})}j=i.find(k.close||".close");if(!j.length&&!k.close){j=c('<div class="close"></div>');i.prepend(j)}j.click(function(p){o.close(p)})}c.fn.overlay=function(e){var f=this.eq(typeof e=="number"?e:0).data("overlay");if(f){return f}if(c.isFunction(e)){e={onBeforeLoad:e}}var g=c.extend({},c.tools.overlay.conf);e=c.extend(true,g,e);this.each(function(){f=new a(c(this),e);d.push(f);c(this).data("overlay",f)});return e.api?f:this}})(jQuery);
(function(b){var a=b.tools.overlay;a.plugins=a.plugins||{};a.plugins.gallery={version:"1.0.0",conf:{imgId:"img",next:".next",prev:".prev",info:".info",progress:".progress",disabledClass:"disabled",activeClass:"active",opacity:0.8,speed:"slow",template:"<strong>${title}</strong> <span>Image ${index} of ${total}</span>",autohide:true,preload:true,api:false}};b.fn.gallery=function(d){var o=b.extend({},a.plugins.gallery.conf),m;b.extend(o,d);m=this.overlay();var r=this,j=m.getOverlay(),k=j.find(o.next),g=j.find(o.prev),e=j.find(o.info),c=j.find(o.progress),h=g.add(k).add(e).css({opacity:o.opacity}),s=m.getClosers(),l;function p(u){c.fadeIn();h.hide();s.hide();var t=u.attr("href");var v=new Image();v.onload=function(){c.fadeOut();var y=b("#"+o.imgId,j);if(!y.length){y=b("<img/>").attr("id",o.imgId).css("visibility","hidden");j.prepend(y)}y.attr("src",t).css("visibility","hidden");var z=v.width;var A=(b(window).width()-z)/2;l=r.index(r.filter("[href="+t+"]"));r.removeClass(o.activeClass).eq(l).addClass(o.activeClass);var w=o.disabledClass;h.removeClass(w);if(l===0){g.addClass(w)}if(l==r.length-1){k.addClass(w)}var B=o.template.replace("${title}",u.attr("title")||u.data("title")).replace("${index}",l+1).replace("${total}",r.length);var x=parseInt(e.css("paddingLeft"),10)+parseInt(e.css("paddingRight"),10);e.html(B).css({width:z-x});j.animate({width:z,height:v.height,left:A},o.speed,function(){y.hide().css("visibility","visible").fadeIn(function(){if(!o.autohide){h.fadeIn();s.show()}})})};v.onerror=function(){j.fadeIn().html("Cannot find image "+t)};v.src=t;if(o.preload){r.filter(":eq("+(l-1)+"), :eq("+(l+1)+")").each(function(){var w=new Image();w.src=b(this).attr("href")})}}function f(t,u){t.click(function(){if(t.hasClass(o.disabledClass)){return}var v=r.eq(i=l+(u?1:-1));if(v.length){p(v)}})}f(k,true);f(g);b(document).keydown(function(t){if(!j.is(":visible")||t.altKey||t.ctrlKey){return}if(t.keyCode==37||t.keyCode==39){var u=t.keyCode==37?g:k;u.click();return t.preventDefault()}return true});function q(){if(!j.is(":animated")){h.show();s.show()}}if(o.autohide){j.hover(q,function(){h.fadeOut();s.hide()}).mousemove(q)}var n;this.each(function(){var v=b(this),u=b(this).overlay(),t=u;u.onBeforeLoad(function(){p(v)});u.onClose(function(){r.removeClass(o.activeClass)})});return o.api?n:this}})(jQuery);
(function(d){var b=d.tools.overlay;b.effects=b.effects||{};b.effects.apple={version:"1.0.1"};d.extend(b.conf,{start:{absolute:true,top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function c(f){var g=f.offset();return[g.top+f.height()/2,g.left+f.width()/2]}var e=function(n){var k=this.getOverlay(),f=this.getConf(),i=this.getTrigger(),q=this,r=k.outerWidth({margin:true}),m=k.data("img");if(!m){var l=k.css("backgroundImage");if(!l){throw"background-image CSS property not set for overlay"}l=l.substring(l.indexOf("(")+1,l.indexOf(")")).replace(/\"/g,"");k.css("backgroundImage","none");m=d('<img src="'+l+'"/>');m.css({border:0,position:"absolute",display:"none"}).width(r);d("body").append(m);k.data("img",m)}var o=d(window),j=f.start.top||Math.round(o.height()/2),h=f.start.left||Math.round(o.width()/2);if(i){var g=c(i);j=g[0];h=g[1]}if(!f.start.absolute){j+=o.scrollTop();h+=o.scrollLeft()}m.css({top:j,left:h,width:0,zIndex:f.zIndex}).show();m.animate({top:k.css("top"),left:k.css("left"),width:r},f.speed,function(){k.css("zIndex",f.zIndex+1).fadeIn(f.fadeInSpeed,function(){if(q.isOpened()&&!d(this).index(k)){n.call()}else{k.hide()}})})};var a=function(f){var h=this.getOverlay(),i=this.getConf(),g=this.getTrigger(),l=i.start.top,k=i.start.left;h.hide();if(g){var j=c(g);l=j[0];k=j[1]}h.data("img").animate({top:l,left:k,width:0},i.closeSpeed,f)};b.addEffect("apple",e,a)})(jQuery);
(function(b){b.tools=b.tools||{};b.tools.expose={version:"1.0.5",conf:{maskId:null,loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,color:"#456",api:false}};function a(){if(b.browser.msie){var f=b(document).height(),e=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,f-e<20?e:f]}return[b(window).width(),b(document).height()]}function c(h,g){var e=this,j=b(this),d=null,f=false,i=0;b.each(g,function(k,l){if(b.isFunction(l)){j.bind(k,l)}});b(window).resize(function(){e.fit()});b.extend(this,{getMask:function(){return d},getExposed:function(){return h},getConf:function(){return g},isLoaded:function(){return f},load:function(n){if(f){return e}i=h.eq(0).css("zIndex");if(g.maskId){d=b("#"+g.maskId)}if(!d||!d.length){var l=a();d=b("<div/>").css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:0,zIndex:g.zIndex});if(g.maskId){d.attr("id",g.maskId)}b("body").append(d);var k=d.css("backgroundColor");if(!k||k=="transparent"||k=="rgba(0, 0, 0, 0)"){d.css("backgroundColor",g.color)}if(g.closeOnEsc){b(document).bind("keydown.unexpose",function(o){if(o.keyCode==27){e.close()}})}if(g.closeOnClick){d.bind("click.unexpose",function(o){e.close(o)})}}n=n||b.Event();n.type="onBeforeLoad";j.trigger(n);if(n.isDefaultPrevented()){return e}b.each(h,function(){var o=b(this);if(!/relative|absolute|fixed/i.test(o.css("position"))){o.css("position","relative")}});h.css({zIndex:Math.max(g.zIndex+1,i=="auto"?0:i)});var m=d.height();if(!this.isLoaded()){d.css({opacity:0,display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){if(d.height()!=m){d.css("height",m)}n.type="onLoad";j.trigger(n)})}f=true;return e},close:function(k){if(!f){return e}k=k||b.Event();k.type="onBeforeClose";j.trigger(k);if(k.isDefaultPrevented()){return e}d.fadeOut(g.closeSpeed,function(){k.type="onClose";j.trigger(k);h.css({zIndex:b.browser.msie?i:null})});f=false;return e},fit:function(){if(d){var k=a();d.css({width:k[0],height:k[1]})}},bind:function(k,l){j.bind(k,l);return e},unbind:function(k){j.unbind(k);return e}});b.each("onBeforeLoad,onLoad,onBeforeClose,onClose".split(","),function(k,l){e[l]=function(m){return e.bind(l,m)}})}b.fn.expose=function(d){var e=this.eq(typeof d=="number"?d:0).data("expose");if(e){return e}if(typeof d=="string"){d={color:d}}var f=b.extend({},b.tools.expose.conf);d=b.extend(f,d);this.each(function(){e=new c(b(this),d);b(this).data("expose",e)});return d.api?e:this}})(jQuery);
// JavaScript Document

/**
 * Copyright (c) 2009 Anders Ekdahl (http://coffeescripter.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.2.2
 *
 * Demo and documentation: http://coffeescripter.com/code/ad-gallery/
 */
(function($) {
  $.fn.adGallery = function(options) {
    var defaults = { loader_image: 'loader.gif',
                     start_at_index: 0,
                     thumb_opacity: 0.7,
                     animate_first_image: false,
                     animation_speed: 400,
                     width: false,
                     height: false,
                     display_next_and_prev: true,
                     display_back_and_forward: true,
                     scroll_jump: 0, // If 0, it jumps the width of the container
                     slideshow: {
                       enable: true,
                       autostart: false,
                       speed: 5000,
                       start_label: 'Start',
                       stop_label: 'Stop',
                       stop_on_scroll: true,
                       countdown_prefix: '(',
                       countdown_sufix: ')',
                       onStart: false,
                       onStop: false
                     },
                     effect: 'slide-hori', // or 'slide-vert', 'fade', or 'resize', 'none'
                     enable_keyboard_move: true,
                     cycle: true,
                     callbacks: {
                       init: false,
                       afterImageVisible: false,
                       beforeImageVisible: false
                     }
    };
    var settings = $.extend(false, defaults, options);
    if(options && options.slideshow) {
      settings.slideshow = $.extend(false, defaults.slideshow, options.slideshow);
    };
    if(!settings.slideshow.enable) {
      settings.slideshow.autostart = false;
    };
    var galleries = [];
    $(this).each(function() {
      var gallery = new AdGallery(this, settings);
      galleries[galleries.length] = gallery;
    });
    // Sorry, breaking the jQuery chain because the gallery instances
    // are returned so you can fiddle with them
    return galleries;
  };

  function VerticalSlideAnimation(img_container, direction, desc) {
    var current_top = parseInt(img_container.css('top'), 10);
    if(direction == 'left') {
      var old_image_top = '-'+ this.image_wrapper_height +'px';
      img_container.css('top', this.image_wrapper_height +'px');
    } else {
      var old_image_top = this.image_wrapper_height +'px';
      img_container.css('top', '-'+ this.image_wrapper_height +'px');
    };
    if(desc) {
      desc.css('bottom', '-'+ desc[0].offsetHeight +'px');
      desc.animate({bottom: 0}, this.settings.animation_speed * 2);
    };
    return {old_image: {top: old_image_top},
            new_image: {top: current_top}};
  };

  function HorizontalSlideAnimation(img_container, direction, desc) {
    var current_left = parseInt(img_container.css('left'), 10);
    if(direction == 'left') {
      var old_image_left = '-'+ this.image_wrapper_width +'px';
      img_container.css('left',this.image_wrapper_width +'px');
    } else {
      var old_image_left = this.image_wrapper_width +'px';
      img_container.css('left','-'+ this.image_wrapper_width +'px');
    };
    if(desc) {
      desc.css('bottom', '-'+ desc[0].offsetHeight +'px');
      desc.animate({bottom: 0}, this.settings.animation_speed * 2);
    };
    return {old_image: {left: old_image_left},
            new_image: {left: current_left}};
  };

  function ResizeAnimation(img_container, direction, desc) {
    var image_width = img_container.width();
    var image_height = img_container.height();
    var current_left = parseInt(img_container.css('left'), 10);
    var current_top = parseInt(img_container.css('top'), 10);
    img_container.css({width: 0, height: 0, top: this.image_wrapper_height / 2, left: this.image_wrapper_width / 2});
    return {old_image: {width: 0,
                        height: 0,
                        top: this.image_wrapper_height / 2,
                        left: this.image_wrapper_width / 2},
            new_image: {width: image_width,
                        height: image_height,
                        top: current_top,
                        left: current_left}};
  };

  function FadeAnimation(img_container, direction, desc) {
    img_container.css('opacity', 0);
    return {old_image: {opacity: 0},
            new_image: {opacity: 1}};
  };

  // Sort of a hack, will clean this up... eventually
  function NoneAnimation(img_container, direction, desc) {
    img_container.css('opacity', 0);
    return {old_image: {opacity: 0},
            new_image: {opacity: 1},
            speed: 0};
  };

  function AdGallery(wrapper, settings) {
    this.init(wrapper, settings);
  };
  AdGallery.prototype = {
    // Elements
    wrapper: false,
    image_wrapper: false,
    gallery_info: false,
    nav: false,
    loader: false,
    preloads: false,
    thumbs_wrapper: false,
    scroll_back: false,
    scroll_forward: false,
    next_link: false,
    prev_link: false,

    slideshow: false,
    image_wrapper_width: 0,
    image_wrapper_height: 0,
    current_index: 0,
    current_image: false,
    nav_display_width: 0,
    settings: false,
    images: false,
    in_transition: false,
    animations: false,
    init: function(wrapper, settings) {
      var context = this;
      this.wrapper = $(wrapper);
      this.settings = settings;
      this.setupElements();
      this.setupAnimations();
      if(this.settings.width) {
        this.image_wrapper_width = this.settings.width;
        this.image_wrapper.width(this.settings.width);
        this.wrapper.width(this.settings.width);
      } else {
        this.image_wrapper_width = this.image_wrapper.width();
      };
      if(this.settings.height) {
        this.image_wrapper_height = this.settings.height;
        this.image_wrapper.height(this.settings.height);
      } else {
        this.image_wrapper_height = this.image_wrapper.height();
      };
      this.nav_display_width = this.nav.width();
      this.current_index = 0;
      this.current_image = false;
      this.in_transition = false;
      this.findImages();
      if(this.settings.display_next_and_prev) {
        this.initNextAndPrev();
      };
      // The slideshow needs a callback to trigger the next image to be shown
      // but we don't want to give it access to the whole gallery instance
      var nextimage_callback = function(callback) {
        return context.nextImage(callback);
      };
      this.slideshow = new AdGallerySlideshow(nextimage_callback, this.settings.slideshow);
      this.controls.append(this.slideshow.create());
      if(this.settings.slideshow.enable) {
        this.slideshow.enable();
      } else {
        this.slideshow.disable();
      };
      if(this.settings.display_back_and_forward) {
        this.initBackAndForward();
      };
      if(this.settings.enable_keyboard_move) {
        this.initKeyEvents();
      };
      var start_at = this.settings.start_at_index;
      if(window.location.hash && window.location.hash.indexOf('#ad-image') === 0) {
        start_at = window.location.hash.replace(/[^0-9]+/g, '');
        // Check if it's a number
        if((start_at * 1) != start_at) {
          start_at = this.settings.start_at_index;
        };
      };

      this.loading(true);
      this.showImage(start_at,
        function() {
          // We don't want to start the slideshow before the image has been
          // displayed
          if(context.settings.slideshow.autostart) {
            context.preloadImage(start_at + 1);
            context.slideshow.start();
          };
        }
      );
      this.fireCallback(this.settings.callbacks.init);
    },
    setupAnimations: function() {
      this.animations = {
        'slide-vert': VerticalSlideAnimation,
        'slide-hori': HorizontalSlideAnimation,
        'resize': ResizeAnimation,
        'fade': FadeAnimation,
        'none': NoneAnimation
      };
    },
    setupElements: function() {
      this.controls = this.wrapper.find('.ad-controls');
      this.gallery_info = $('<p class="ad-info"></p>');
      this.controls.append(this.gallery_info);
      this.image_wrapper = this.wrapper.find('.ad-image-wrapper');
      this.image_wrapper.empty();
      this.nav = this.wrapper.find('.ad-nav');
      this.thumbs_wrapper = this.nav.find('.ad-thumbs');
      this.preloads = $('<div class="ad-preloads"></div>');
      this.loader = $('<img class="ad-loader" src="'+ this.settings.loader_image +'">');
      this.image_wrapper.append(this.loader);
      this.loader.hide();
      $(document.body).append(this.preloads);
    },
    loading: function(bool) {
      if(bool) {
        this.loader.show();
      } else {
        this.loader.hide();
      };
    },
    addAnimation: function(name, fn) {
      if($.isFunction(fn)) {
        this.animations[name] = fn;
      };
    },
    findImages: function() {
      var context = this;
      this.images = [];
      var thumb_wrapper_width = 0;
      var thumbs_loaded = 0;
      var thumbs = this.thumbs_wrapper.find('a');
      var thumb_count = thumbs.length;
      if(this.settings.thumb_opacity < 1) {
        thumbs.find('img').css('opacity', this.settings.thumb_opacity);
      };
      thumbs.each(
        function(i) {
          var link = $(this);
          var image_src = link.attr('href');
          var thumb = link.find('img');
          // Check if the thumb has already loaded
          if(!context.isImageLoaded(thumb[0])) {
            thumb.load(
              function() {
                thumb_wrapper_width += this.parentNode.parentNode.offsetWidth;
                thumbs_loaded++;
              }
            );
          } else{
            thumb_wrapper_width += thumb[0].parentNode.parentNode.offsetWidth;
            thumbs_loaded++;
          };
          link.addClass('ad-thumb'+ i);
          link.click(
            function() {
              context.showImage(i);
              context.slideshow.stop();
              return false;
            }
          ).hover(
            function() {
              if(!$(this).is('.ad-active') && context.settings.thumb_opacity < 1) {
                $(this).find('img').fadeTo(300, 1);
              };
              context.preloadImage(i);
            },
            function() {
              if(!$(this).is('.ad-active') && context.settings.thumb_opacity < 1) {
                $(this).find('img').fadeTo(300, context.settings.thumb_opacity);
              };
            }
          );
          var desc = false;
          if(thumb.data('ad-desc')) {
            desc = thumb.data('ad-desc');
          } else if(thumb.attr('longdesc') && thumb.attr('longdesc').length) {
            desc = thumb.attr('longdesc');
          };
          var title = false;
          if(thumb.data('ad-title')) {
            title = thumb.data('ad-title');
          } else if(thumb.attr('title') && thumb.attr('title').length) {
            title = thumb.attr('title');
          };
          context.images[i] = { thumb: thumb.attr('src'), image: image_src, error: false,
                                preloaded: false, desc: desc, title: title, size: false };
        }
      );
      // Wait until all thumbs are loaded, and then set the width of the ul
      var inter = setInterval(
        function() {
          if(thumb_count == thumbs_loaded) {
            context.nav.find('.ad-thumb-list').css('width', thumb_wrapper_width +'px');
            clearInterval(inter);
          };
        },
        100
      );
    },
    initKeyEvents: function() {
      var context = this;
      $(document).keydown(
        function(e) {
          if(e.keyCode == 39) {
            // right arrow
            context.nextImage();
            context.slideshow.stop();
          } else if(e.keyCode == 37) {
            // left arrow
            context.prevImage();
            context.slideshow.stop();
          };
        }
      );
    },
    initNextAndPrev: function() {
      this.next_link = $('<div class="ad-next"><div class="ad-next-image"></div></div>');
      this.prev_link = $('<div class="ad-prev"><div class="ad-prev-image"></div></div>');
      this.image_wrapper.append(this.next_link);
      this.image_wrapper.append(this.prev_link);
      var context = this;
      this.prev_link.add(this.next_link).mouseover(
        function(e) {
          // IE 6 hides the wrapper div, so we have to set it's width
          $(this).css('height', context.image_wrapper_height);
          $(this).find('div').show();
        }
      ).mouseout(
        function(e) {
          $(this).find('div').hide();
        }
      ).click(
        function() {
          if($(this).is('.ad-next')) {
            context.nextImage();
            context.slideshow.stop();
          } else {
            context.prevImage();
            context.slideshow.stop();
          };
        }
      ).find('div').css('opacity', 0.7);
    },
    initBackAndForward: function() {
      var context = this;
      this.scroll_forward = $('<div class="ad-forward"></div>');
      this.scroll_back = $('<div class="ad-back"></div>');
      this.nav.append(this.scroll_forward);
      this.nav.prepend(this.scroll_back);
      var has_scrolled = 0;
      var thumbs_scroll_interval = false;
      $(this.scroll_back).add(this.scroll_forward).click(
        function() {
          // We don't want to jump the whole width, since an image
          // might be cut at the edge
          var width = context.nav_display_width - 50;
          if(context.settings.scroll_jump > 0) {
            var width = context.settings.scroll_jump;
          };
          if($(this).is('.ad-forward')) {
            var left = context.thumbs_wrapper.scrollLeft() + width;
          } else {
            var left = context.thumbs_wrapper.scrollLeft() - width;
          };
          if(context.settings.slideshow.stop_on_scroll) {
            context.slideshow.stop();
          };
          context.thumbs_wrapper.animate({scrollLeft: left +'px'});
          return false;
        }
      ).css('opacity', 0.6).hover(
        function() {
          var direction = 'left';
          if($(this).is('.ad-forward')) {
            direction = 'right';
          };
          thumbs_scroll_interval = setInterval(
            function() {
              has_scrolled++;
              // Don't want to stop the slideshow just because we scrolled a pixel or two
              if(has_scrolled > 30 && context.settings.slideshow.stop_on_scroll) {
                context.slideshow.stop();
              };
              var left = context.thumbs_wrapper.scrollLeft() + 1;
              if(direction == 'left') {
                left = context.thumbs_wrapper.scrollLeft() - 1;
              };
              context.thumbs_wrapper.scrollLeft(left);
            },
            10
          );
          $(this).css('opacity', 1);
        },
        function() {
          has_scrolled = 0;
          clearInterval(thumbs_scroll_interval);
          $(this).css('opacity', 0.6);
        }
      );
    },
    _afterShow: function() {
      this.gallery_info.html((this.current_index + 1) +' / '+ this.images.length);
      if(!this.settings.cycle) {
        // Needed for IE
        this.prev_link.show().css('height', this.image_wrapper_height);
        this.next_link.show().css('height', this.image_wrapper_height);
        if(this.current_index == (this.images.length - 1)) {
          this.next_link.hide();
        };
        if(this.current_index == 0) {
          this.prev_link.hide();
        };
      };
      this.fireCallback(this.settings.callbacks.afterImageVisible);
    },
    /**
     * Checks if the image is small enough to fit inside the container
     * If it's not, shrink it proportionally
     */
    _getContainedImageSize: function(image_width, image_height) {
      if(image_height > this.image_wrapper_height) {
        var ratio = image_width / image_height;
        image_height = this.image_wrapper_height;
        image_width = this.image_wrapper_height * ratio;
      };
      if(image_width > this.image_wrapper_width) {
  	    var ratio = image_height / image_width;
  	    image_width = this.image_wrapper_width;
  	    image_height = this.image_wrapper_width * ratio;
  	  };
      return {width: image_width, height: image_height};
    },
    /**
     * If the image dimensions are smaller than the wrapper, we position
     * it in the middle anyway
     */
    _centerImage: function(img_container, image_width, image_height) {
      img_container.css('top', '0px');
      if(image_height < this.image_wrapper_height) {
        var dif = this.image_wrapper_height - image_height;
        img_container.css('top', (dif / 2) +'px');
      };
      img_container.css('left', '0px');
      if(image_width < this.image_wrapper_width) {
        var dif = this.image_wrapper_width - image_width;
        img_container.css('left', (dif / 2) +'px');
      };
    },
    _getDescription: function(image) {
      var desc = false;
      if(image.desc.length || image.title.length) {
        var title = '';
        if(image.title.length) {
          title = '<strong class="ad-description-title">'+ image.title +'</strong>';
        };
        var desc = '';
        if(image.desc.length) {
          desc = '<span>'+ image.desc +'</span>';
        };
        desc = $('<p class="ad-image-description">'+ title + desc +'</p>');
      };
      return desc;
    },
    /**
     * @param function callback Gets fired when the image has loaded, is displaying
     *                          and it's animation has finished
     */
    showImage: function(index, callback) {
      if(this.images[index] && !this.in_transition) {
        var context = this;
        var image = this.images[index];
        this.in_transition = true;
        if(!image.preloaded) {
          this.loading(true);
          this.preloadImage(index, function() {
            context.loading(false);
            context._showWhenLoaded(index, callback);
          });
        } else {
          this._showWhenLoaded(index, callback);
        };
      };
    },
    /**
     * @param function callback Gets fired when the image has loaded, is displaying
     *                          and it's animation has finished
     */
    _showWhenLoaded: function(index, callback) {
      if(this.images[index]) {
        var context = this;
        var image = this.images[index];
        var img_container = $(document.createElement('div')).addClass('ad-image');
        var img = $(new Image()).attr('src', image.image);
        img_container.append(img);
        this.image_wrapper.prepend(img_container);
        var size = this._getContainedImageSize(image.size.width, image.size.height);
        img.attr('width', size.width);
        img.attr('height', size.height);
        img_container.css({width: size.width +'px', height: size.height +'px'});
        this._centerImage(img_container, size.width, size.height);
        var desc = this._getDescription(image, img_container);
        if(desc) {
          img_container.append(desc);
          var width = size.width - parseInt(desc.css('padding-left'), 10) - parseInt(desc.css('padding-right'), 10);
          desc.css('width', width +'px');
        };
        this.highLightThumb(this.nav.find('.ad-thumb'+ index));

        var direction = 'right';
        if(this.current_index < index) {
          direction = 'left';
        };
        this.fireCallback(this.settings.callbacks.beforeImageVisible);
        if(this.current_image || this.settings.animate_first_image) {
          var animation_speed = this.settings.animation_speed;
          var easing = 'swing';
          var animation = this.animations[this.settings.effect].call(this, img_container, direction, desc);
          if(typeof animation.speed != 'undefined') {
            animation_speed = animation.speed;
          };
          if(typeof animation.easing != 'undefined') {
            easing = animation.easing;
          };
          if(this.current_image) {
            var old_image = this.current_image;
            old_image.animate(animation.old_image, animation_speed, easing,
              function() {
                old_image.remove();
              }
            );
          };
          img_container.animate(animation.new_image, animation_speed, easing,
            function() {
              context.current_index = index;
              context.current_image = img_container;
              context.in_transition = false;
              context._afterShow();
              context.fireCallback(callback);
            }
          );
        } else {
          this.current_index = index;
          this.current_image = img_container;
          this.in_transition = false;
          context._afterShow();
          this.fireCallback(callback);
        };
      };
    },
    nextIndex: function() {
      if(this.current_index == (this.images.length - 1)) {
        if(!this.settings.cycle) {
          return false;
        };
        var next = 0;
      } else {
        var next = this.current_index + 1;
      };
      return next;
    },
    nextImage: function(callback) {
      var next = this.nextIndex();
      if(next === false) return false;
      this.preloadImage(next + 1);
      this.showImage(next, callback);
      return true;
    },
    prevIndex: function() {
      if(this.current_index == 0) {
        if(!this.settings.cycle) {
          return false;
        };
        var prev = this.images.length - 1;
      } else {
        var prev = this.current_index - 1;
      };
      return prev;
    },
    prevImage: function(callback) {
      var prev = this.prevIndex();
      if(prev === false) return false;
      this.preloadImage(prev - 1);
      this.showImage(prev, callback);
      return true;
    },
    preloadAll: function() {
      var context = this;
      var i = 0;
      function preloadNext() {
        if(i < context.images.length) {
          i++;
          context.preloadImage(i, preloadNext);
        };
      };
      context.preloadImage(i, preloadNext);
    },
    preloadImage: function(index, callback) {
      if(this.images[index]) {
        var image = this.images[index];
        if(!this.images[index].preloaded) {
          var img = $(new Image());
          img.attr('src', image.image);
          if(!this.isImageLoaded(img[0])) {
            this.preloads.append(img);
            var context = this;
            img.load(
              function() {
                image.preloaded = true;
                image.size = { width: this.width, height: this.height };
                context.fireCallback(callback);
              }
            ).error(
              function() {
                image.error = true;
                image.preloaded = false;
                image.size = false;
              }
            );
          } else {
            image.preloaded = true;
            image.size = { width: img[0].width, height: img[0].height };
            this.fireCallback(callback);
          };
        } else {
          this.fireCallback(callback);
        };
      };
    },
    isImageLoaded: function(img) {
      if(typeof img.complete != 'undefined' && !img.complete) {
        return false;
      };
      if(typeof img.naturalWidth != 'undefined' && img.naturalWidth == 0) {
        return false;
      };
      return true;
    },
    highLightThumb: function(thumb) {
      this.thumbs_wrapper.find('.ad-active').removeClass('ad-active');
      thumb.addClass('ad-active');
      if(this.settings.thumb_opacity < 1) {
        this.thumbs_wrapper.find('a:not(.ad-active) img').fadeTo(300, this.settings.thumb_opacity);
        thumb.find('img').fadeTo(300, 1);
      };
      var left = thumb[0].parentNode.offsetLeft;
      left -= (this.nav_display_width / 2) - (thumb[0].offsetWidth / 2);
      this.thumbs_wrapper.animate({scrollLeft: left +'px'});
    },
    fireCallback: function(fn) {
      if($.isFunction(fn)) {
        fn.call(this);
      };
    }
  };

  function AdGallerySlideshow(nextimage_callback, settings) {
    this.init(nextimage_callback, settings);
  };
  AdGallerySlideshow.prototype = {
    start_link: false,
    stop_link: false,
    countdown: false,
    controls: false,

    settings: false,
    nextimage_callback: false,
    enabled: false,
    running: false,
    countdown_interval: false,
    init: function(nextimage_callback, settings) {
      var context = this;
      this.nextimage_callback = nextimage_callback;
      this.settings = settings;
    },
    create: function() {
      this.start_link = $('<span class="ad-slideshow-start">'+ this.settings.start_label +'</span>');
      this.stop_link = $('<span class="ad-slideshow-stop">'+ this.settings.stop_label +'</span>');
      this.countdown = $('<span class="ad-slideshow-countdown"></span>');
      this.controls = $('<div class="ad-slideshow-controls"></div>');
      this.controls.append(this.start_link).append(this.stop_link).append(this.countdown);
      this.countdown.hide();

      var context = this;
      this.start_link.click(
        function() {
          context.start();
        }
      );
      this.stop_link.click(
        function() {
          context.stop();
        }
      );
      $(document).keydown(
        function(e) {
          if(e.keyCode == 83) {
            // 's'
            if(context.running) {
              context.stop();
            } else {
              context.start();
            };
          };
        }
      );
      return this.controls;
    },
    disable: function() {
      this.enabled = false;
      this.stop();
      this.controls.hide();
    },
    enable: function() {
      this.enabled = true;
      this.controls.show();
    },
    toggle: function() {
      if(this.enabled) {
        this.disable();
      } else {
        this.enable();
      };
    },
    start: function() {
      if(this.running || !this.enabled) return false;
      var context = this;
      this.running = true;
      this.controls.addClass('ad-slideshow-running');
      this._next();
      this.fireCallback(this.settings.onStart);
      return true;
    },
    stop: function() {
      if(!this.running) return false;
      this.running = false;
      this.countdown.hide();
      this.controls.removeClass('ad-slideshow-running');
      clearInterval(this.countdown_interval);
      this.fireCallback(this.settings.onStop);
      return true;
    },
    _next: function() {
      var context = this;
      var pre = this.settings.countdown_prefix;
      var su = this.settings.countdown_sufix;
      clearInterval(context.countdown_interval);
      this.countdown.show().html(pre + (this.settings.speed / 1000) + su);
      var slide_timer = 0;
      this.countdown_interval = setInterval(
        function() {
          slide_timer += 1000;
          if(slide_timer >= context.settings.speed) {
            var whenNextIsShown = function() {
              // A check so the user hasn't stoped the slideshow during the
              // animation
              if(context.running) {
                context._next();
              };
              slide_timer = 0;
            };
            if(!context.nextimage_callback(whenNextIsShown)) {
              context.stop();
            };
            slide_timer = 0;
          };
          var sec = parseInt(context.countdown.text().replace(/[^0-9]/g, ''), 10);
          sec--;
          if(sec > 0) {
            context.countdown.html(pre + sec + su);
          };
        },
        1000
      );
    },
    fireCallback: function(fn) {
      if($.isFunction(fn)) {
        fn.call(this);
      };
    }
  };
})(jQuery);


/*
 * 	loopedSlider 0.5.4 - jQuery plugin
 *	written by Nathan Searles	
 *	http://nathansearles.com/loopedslider/
 *
 *	Copyright (c) 2009 Nathan Searles (http://nathansearles.com/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

/*
 *	markup example for $("#loopedSlider").loopedSlider();
 *
 *	<div id="loopedSlider">	
 *		<div class="container">
 *			<div class="slides">
 *				<div><img src="01.jpg" alt="" /></div>
 *				<div><img src="02.jpg" alt="" /></div>
 *				<div><img src="03.jpg" alt="" /></div>
 *				<div><img src="04.jpg" alt="" /></div>
 *			</div>
 *		</div>
 *		<a href="#" class="previous">previous</a>
 *		<a href="#" class="next">next</a>
 *		<ul class="pagination">
 *			<li><a href="#">1</a></li>
 *			<li><a href="#">2</a></li>
 *			<li><a href="#">3</a></li>
 *			<li><a href="#">4</a></li>
 *		</ul>	
 *	</div>
 *
*/

(function($) {
	$.fn.loopedSlider = function(options) {
		
	var defaults = {			
		container: '.container',
		slides: '.slides',
		pagination: '.pagination',
		containerClick: false, // Click container for next slide
		autoStart: 9000, // Set to positive number for auto start and interval time
		restart: 4000, // Set to positive number for restart and restart time
		slidespeed: 1000, // Speed of slide animation
		fadespeed: 300, // Speed of fade animation
		autoHeight: false // Set to positive number for auto height and animation speed
	};
		
	this.each(function() {
		
		var obj = $(this);
		var o = $.extend(defaults, options);
		var pagination = $(o.pagination+' li a',obj);
		var m = 0;
		var t = 1;
		var s = $(o.slides,obj).children().size();
		var w = $(o.slides,obj).children().outerWidth();
		var p = 0;
		var u = false;
		var n = 0;
		var interval=0;
		var restart=0;
		
		$(o.slides,obj).css({width:(s*w)});
		
		$(o.slides,obj).children().each(function(){
			$(this).css({position:'absolute',left:p,display:'block'});
			p=p+w;
		});
		
		$(pagination,obj).each(function(){
			n=n+1;
			$(this).attr('rel',n);
			$(pagination.eq(0),obj).parent().addClass('active');
		});
		
		$(o.slides,obj).children(':eq('+(s-1)+')').css({position:'absolute',left:-w});
		
		if (s>3) {
			$(o.slides,obj).children(':eq('+(s-1)+')').css({position:'absolute',left:-w});
		}
		
		if(o.autoHeight){autoHeight(t);}
		
		$('.next',obj).click(function(){
			if(u===false) {
				animate('next',true);
				if(o.autoStart){
					if (o.restart) {autoStart();}
					else {clearInterval(sliderIntervalID);}
				}
			} return false;
		});
		
		$('.previous',obj).click(function(){
			if(u===false) {	
				animate('prev',true);
				if(o.autoStart){
					if (o.restart) {autoStart();}
					else {clearInterval(sliderIntervalID);}
				}
			} return false;
		});
		
		if (o.containerClick) {
			$(o.container ,obj).click(function(){
				if(u===false) {
					animate('next',true);
					if(o.autoStart){
						if (o.restart) {autoStart();}
						else {clearInterval(sliderIntervalID);}
					}
				} return false;
			});
		}
		
		$(pagination,obj).click(function(){
			if ($(this).parent().hasClass('active')) {return false;}
			else {
				t = $(this).attr('rel');
				$(pagination,obj).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
				animate('fade',t);
				if(o.autoStart){
					if (o.restart) {autoStart();}
					else {clearInterval(sliderIntervalID);}
				}
			} return false;
		});
	
		if (o.autoStart) {
			sliderIntervalID = setInterval(function(){
				if(u===false) {animate('next',true);}
			}, o.autoStart);
			function autoStart() {
				if (o.restart) {
				clearInterval(sliderIntervalID);
				clearInterval(interval);
				clearTimeout(restart);
					restart = setTimeout(function() {
						interval = setInterval(	function(){
							animate('next',true);
						},o.autoStart);
					},o.restart);
				} else {
					sliderIntervalID = setInterval(function(){
						if(u===false) {animate('next',true);}
					},o.autoStart);
				}
			};
		}
		
		function current(t) {
			if(t===s+1){t=1;}
			if(t===0){t=s;}
			$(pagination,obj).parent().siblings().removeClass('active');
			$(pagination+'[rel="' + (t) + '"]',obj).parent().addClass('active');
		};
		
		function autoHeight(t) {
			if(t===s+1){t=1;}
			if(t===0){t=s;}	
			var getHeight = $(o.slides,obj).children(':eq('+(t-1)+')',obj).outerHeight();
			$(o.container,obj).animate({height: getHeight},o.autoHeight);					
		};		
		
		function animate(dir,clicked){	
			u = true;	
			switch(dir){
				case 'next':
					t = t+1;
					m = (-(t*w-w));
					current(t);
					if(o.autoHeight){autoHeight(t);}
					if(s<3){
						if (t===3){$(o.slides,obj).children(':eq(0)').css({left:(s*w)});}
						if (t===2){$(o.slides,obj).children(':eq('+(s-1)+')').css({position:'absolute',left:(w)});}
					}
					$(o.slides,obj).animate({left: m}, o.slidespeed,function(){
						if (t===s+1) {
							t = 1;
							$(o.slides,obj).css({left:0},function(){$(o.slides,obj).animate({left:m})});							
							$(o.slides,obj).children(':eq(0)').css({left: 0});
							$(o.slides,obj).children(':eq('+(s-1)+')').css({ position:'absolute',left:-w});				
						}
						if (t===s) $(o.slides,obj).children(':eq(0)').css({left:(s*w)});
						if (t===s-1) $(o.slides,obj).children(':eq('+(s-1)+')').css({left:s*w-w});
						u = false;
					});					
					break; 
				case 'prev':
					t = t-1;
					m = (-(t*w-w));
					current(t);
					if(o.autoHeight){autoHeight(t);}
					if (s<3){
						if(t===0){$(o.slides,obj).children(':eq('+(s-1)+')').css({position:'absolute',left:(-w)});}
						if(t===1){$(o.slides,obj).children(':eq(0)').css({position:'absolute',left:0});}
					}
					$(o.slides,obj).animate({left: m}, o.slidespeed,function(){
						if (t===0) {
							t = s;
							$(o.slides,obj).children(':eq('+(s-1)+')').css({position:'absolute',left:(s*w-w)});
							$(o.slides,obj).css({left: -(s*w-w)});
							$(o.slides,obj).children(':eq(0)').css({left:(s*w)});
						}
						if (t===2 ) $(o.slides,obj).children(':eq(0)').css({position:'absolute',left:0});
						if (t===1) $(o.slides,obj).children(':eq('+ (s-1) +')').css({position:'absolute',left:-w});
						u = false;
					});
					break;
				case 'fade':
					t = [t]*1;
					m = (-(t*w-w));
					current(t);
					if(o.autoHeight){autoHeight(t);}
					$(o.slides,obj).children().fadeOut(o.fadespeed, function(){
						$(o.slides,obj).css({left: m});
						$(o.slides,obj).children(':eq('+(s-1)+')').css({left:s*w-w});
						$(o.slides,obj).children(':eq(0)').css({left:0});
						if(t===s){$(o.slides,obj).children(':eq(0)').css({left:(s*w)});}
						if(t===1){$(o.slides,obj).children(':eq('+(s-1)+')').css({ position:'absolute',left:-w});}
						$(o.slides,obj).children().fadeIn(o.fadespeed);
						u = false;
					});
					break; 
				default:
					break;
				}					
			};
		});
	};
})(jQuery);

// jQuery Right-Click Plugin
//
// Version 1.01
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 20 December 2008
//
// Visit http://abeautifulsite.net/notebook/68 for more information
//
// Usage:
//
//		// Capture right click
//		$("#selector").rightClick( function(e) {
//			// Do something
//		});
//		
//		// Capture right mouse down
//		$("#selector").rightMouseDown( function(e) {
//			// Do something
//		});
//		
//		// Capture right mouseup
//		$("#selector").rightMouseUp( function(e) {
//			// Do something
//		});
//		
//		// Disable context menu on an element
//		$("#selector").noContext();
// 
// History:
//
//		1.01 - Updated (20 December 2008)
//		     - References to 'this' now work the same way as other jQuery plugins, thus
//		       the el parameter has been deprecated.  Use this or $(this) instead
//		     - The mouse event is now passed to the callback function
//		     - Changed license to GNU GPL
//
//		1.00 - Released (13 May 2008)
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License
// and is copyright 2008 A Beautiful Site, LLC. 
//
if(jQuery) (function(){
	
	$.extend($.fn, {
		
		rightClick: function(handler) {
			$(this).each( function() {
				$(this).mousedown( function(e) {
					var evt = e;
					$(this).mouseup( function() {
						$(this).unbind('mouseup');
						if( evt.button == 2 ) {
							handler.call( $(this), evt );
							return false;
						} else {
							return true;
						}
					});
				});
				$(this)[0].oncontextmenu = function() {
					return false;
				}
			});
			return $(this);
		},		
		
		rightMouseDown: function(handler) {
			$(this).each( function() {
				$(this).mousedown( function(e) {
					if( e.button == 2 ) {
						handler.call( $(this), e );
						return false;
					} else {
						return true;
					}
				});
				$(this)[0].oncontextmenu = function() {
					return false;
				}
			});
			return $(this);
		},
		
		rightMouseUp: function(handler) {
			$(this).each( function() {
				$(this).mouseup( function(e) {
					if( e.button == 2 ) {
						handler.call( $(this), e );
						return false;
					} else {
						return true;
					}
				});
				$(this)[0].oncontextmenu = function() {
					return false;
				}
			});
			return $(this);
		},
		
		noContext: function() {
			$(this).each( function() {
				$(this)[0].oncontextmenu = function() {
					return false;
				}
			});
			return $(this);
		}
		
	});
	
})(jQuery);	

/*
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2009 M. Alsup
 * Version: 2.73 (04-NOV-2009)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.2.6 or later
 *
 * Originally based on the work of:
 *	1) Matt Oakes
 *	2) Torsten Baldes (http://medienfreunde.com/lab/innerfade/)
 *	3) Benjamin Sterling (http://www.benjaminsterling.com/experiments/jqShuffle/)
 */
(function(i){var l="2.73";if(i.support==undefined){i.support={opacity:!(i.browser.msie)}}function a(q){if(i.fn.cycle.debug){f(q)}}function f(){if(window.console&&window.console.log){window.console.log("[cycle] "+Array.prototype.join.call(arguments," "))}}i.fn.cycle=function(r,q){var s={s:this.selector,c:this.context};if(this.length===0&&r!="stop"){if(!i.isReady&&s.s){f("DOM not ready, queuing slideshow");i(function(){i(s.s,s.c).cycle(r,q)});return this}f("terminating; zero elements found by selector"+(i.isReady?"":" (DOM not ready)"));return this}return this.each(function(){var w=m(this,r,q);if(w===false){return}if(this.cycleTimeout){clearTimeout(this.cycleTimeout)}this.cycleTimeout=this.cyclePause=0;var x=i(this);var y=w.slideExpr?i(w.slideExpr,this):x.children();var u=y.get();if(u.length<2){f("terminating; too few slides: "+u.length);return}var t=k(x,y,u,w,s);if(t===false){return}var v=t.continuous?10:h(t.currSlide,t.nextSlide,t,!t.rev);if(v){v+=(t.delay||0);if(v<10){v=10}a("first timeout: "+v);this.cycleTimeout=setTimeout(function(){e(u,t,0,!t.rev)},v)}})};function m(q,t,r){if(q.cycleStop==undefined){q.cycleStop=0}if(t===undefined||t===null){t={}}if(t.constructor==String){switch(t){case"stop":q.cycleStop++;if(q.cycleTimeout){clearTimeout(q.cycleTimeout)}q.cycleTimeout=0;i(q).removeData("cycle.opts");return false;case"pause":q.cyclePause=1;return false;case"resume":q.cyclePause=0;if(r===true){t=i(q).data("cycle.opts");if(!t){f("options not found, can not resume");return false}if(q.cycleTimeout){clearTimeout(q.cycleTimeout);q.cycleTimeout=0}e(t.elements,t,1,1)}return false;case"prev":case"next":var u=i(q).data("cycle.opts");if(!u){f('options not found, "prev/next" ignored');return false}i.fn.cycle[t](u);return false;default:t={fx:t}}return t}else{if(t.constructor==Number){var s=t;t=i(q).data("cycle.opts");if(!t){f("options not found, can not advance slide");return false}if(s<0||s>=t.elements.length){f("invalid slide index: "+s);return false}t.nextSlide=s;if(q.cycleTimeout){clearTimeout(q.cycleTimeout);q.cycleTimeout=0}if(typeof r=="string"){t.oneTimeFx=r}e(t.elements,t,1,s>=t.currSlide);return false}}return t}function b(q,r){if(!i.support.opacity&&r.cleartype&&q.style.filter){try{q.style.removeAttribute("filter")}catch(s){}}}function k(y,J,u,t,E){var C=i.extend({},i.fn.cycle.defaults,t||{},i.metadata?y.metadata():i.meta?y.data():{});if(C.autostop){C.countdown=C.autostopCount||u.length}var r=y[0];y.data("cycle.opts",C);C.$cont=y;C.stopCount=r.cycleStop;C.elements=u;C.before=C.before?[C.before]:[];C.after=C.after?[C.after]:[];C.after.unshift(function(){C.busy=0});if(!i.support.opacity&&C.cleartype){C.after.push(function(){b(this,C)})}if(C.continuous){C.after.push(function(){e(u,C,0,!C.rev)})}n(C);if(!i.support.opacity&&C.cleartype&&!C.cleartypeNoBg){g(J)}if(y.css("position")=="static"){y.css("position","relative")}if(C.width){y.width(C.width)}if(C.height&&C.height!="auto"){y.height(C.height)}if(C.startingSlide){C.startingSlide=parseInt(C.startingSlide)}if(C.random){C.randomMap=[];for(var H=0;H<u.length;H++){C.randomMap.push(H)}C.randomMap.sort(function(L,w){return Math.random()-0.5});C.randomIndex=0;C.startingSlide=C.randomMap[0]}else{if(C.startingSlide>=u.length){C.startingSlide=0}}C.currSlide=C.startingSlide=C.startingSlide||0;var x=C.startingSlide;J.css({position:"absolute",top:0,left:0}).hide().each(function(w){var L=x?w>=x?u.length-(w-x):x-w:u.length-w;i(this).css("z-index",L)});i(u[x]).css("opacity",1).show();b(u[x],C);if(C.fit&&C.width){J.width(C.width)}if(C.fit&&C.height&&C.height!="auto"){J.height(C.height)}var D=C.containerResize&&!y.innerHeight();if(D){var v=0,B=0;for(var F=0;F<u.length;F++){var q=i(u[F]),K=q[0],A=q.outerWidth(),I=q.outerHeight();if(!A){A=K.offsetWidth}if(!I){I=K.offsetHeight}v=A>v?A:v;B=I>B?I:B}if(v>0&&B>0){y.css({width:v+"px",height:B+"px"})}}if(C.pause){y.hover(function(){this.cyclePause++},function(){this.cyclePause--})}if(c(C)===false){return false}var s=false;t.requeueAttempts=t.requeueAttempts||0;J.each(function(){var N=i(this);this.cycleH=(C.fit&&C.height)?C.height:N.height();this.cycleW=(C.fit&&C.width)?C.width:N.width();if(N.is("img")){var L=(i.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);var O=(i.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);var M=(i.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);var w=(this.cycleH==0&&this.cycleW==0&&!this.complete);if(L||O||M||w){if(E.s&&C.requeueOnImageNotLoaded&&++t.requeueAttempts<100){f(t.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){i(E.s,E.c).cycle(t)},C.requeueTimeout);s=true;return false}else{f("could not determine size of image: "+this.src,this.cycleW,this.cycleH)}}}return true});if(s){return false}C.cssBefore=C.cssBefore||{};C.animIn=C.animIn||{};C.animOut=C.animOut||{};J.not(":eq("+x+")").css(C.cssBefore);if(C.cssFirst){i(J[x]).css(C.cssFirst)}if(C.timeout){C.timeout=parseInt(C.timeout);if(C.speed.constructor==String){C.speed=i.fx.speeds[C.speed]||parseInt(C.speed)}if(!C.sync){C.speed=C.speed/2}while((C.timeout-C.speed)<250){C.timeout+=C.speed}}if(C.easing){C.easeIn=C.easeOut=C.easing}if(!C.speedIn){C.speedIn=C.speed}if(!C.speedOut){C.speedOut=C.speed}C.slideCount=u.length;C.currSlide=C.lastSlide=x;if(C.random){C.nextSlide=C.currSlide;if(++C.randomIndex==u.length){C.randomIndex=0}C.nextSlide=C.randomMap[C.randomIndex]}else{C.nextSlide=C.startingSlide>=(u.length-1)?0:C.startingSlide+1}if(!C.multiFx){var G=i.fn.cycle.transitions[C.fx];if(i.isFunction(G)){G(y,J,C)}else{if(C.fx!="custom"&&!C.multiFx){f("unknown transition: "+C.fx,"; slideshow terminating");return false}}}var z=J[x];if(C.before.length){C.before[0].apply(z,[z,z,C,true])}if(C.after.length>1){C.after[1].apply(z,[z,z,C,true])}if(C.next){i(C.next).bind(C.prevNextEvent,function(){return o(C,C.rev?-1:1)})}if(C.prev){i(C.prev).bind(C.prevNextEvent,function(){return o(C,C.rev?1:-1)})}if(C.pager){d(u,C)}j(C,u);return C}function n(q){q.original={before:[],after:[]};q.original.cssBefore=i.extend({},q.cssBefore);q.original.cssAfter=i.extend({},q.cssAfter);q.original.animIn=i.extend({},q.animIn);q.original.animOut=i.extend({},q.animOut);i.each(q.before,function(){q.original.before.push(this)});i.each(q.after,function(){q.original.after.push(this)})}function c(w){var u,s,r=i.fn.cycle.transitions;if(w.fx.indexOf(",")>0){w.multiFx=true;w.fxs=w.fx.replace(/\s*/g,"").split(",");for(u=0;u<w.fxs.length;u++){var v=w.fxs[u];s=r[v];if(!s||!r.hasOwnProperty(v)||!i.isFunction(s)){f("discarding unknown transition: ",v);w.fxs.splice(u,1);u--}}if(!w.fxs.length){f("No valid transitions named; slideshow terminating.");return false}}else{if(w.fx=="all"){w.multiFx=true;w.fxs=[];for(p in r){s=r[p];if(r.hasOwnProperty(p)&&i.isFunction(s)){w.fxs.push(p)}}}}if(w.multiFx&&w.randomizeEffects){var t=Math.floor(Math.random()*20)+30;for(u=0;u<t;u++){var q=Math.floor(Math.random()*w.fxs.length);w.fxs.push(w.fxs.splice(q,1)[0])}a("randomized fx sequence: ",w.fxs)}return true}function j(r,q){r.addSlide=function(u,v){var t=i(u),w=t[0];if(!r.autostopCount){r.countdown++}q[v?"unshift":"push"](w);if(r.els){r.els[v?"unshift":"push"](w)}r.slideCount=q.length;t.css("position","absolute");t[v?"prependTo":"appendTo"](r.$cont);if(v){r.currSlide++;r.nextSlide++}if(!i.support.opacity&&r.cleartype&&!r.cleartypeNoBg){g(t)}if(r.fit&&r.width){t.width(r.width)}if(r.fit&&r.height&&r.height!="auto"){$slides.height(r.height)}w.cycleH=(r.fit&&r.height)?r.height:t.height();w.cycleW=(r.fit&&r.width)?r.width:t.width();t.css(r.cssBefore);if(r.pager){i.fn.cycle.createPagerAnchor(q.length-1,w,i(r.pager),q,r)}if(i.isFunction(r.onAddSlide)){r.onAddSlide(t)}else{t.hide()}}}i.fn.cycle.resetState=function(r,q){q=q||r.fx;r.before=[];r.after=[];r.cssBefore=i.extend({},r.original.cssBefore);r.cssAfter=i.extend({},r.original.cssAfter);r.animIn=i.extend({},r.original.animIn);r.animOut=i.extend({},r.original.animOut);r.fxFn=null;i.each(r.original.before,function(){r.before.push(this)});i.each(r.original.after,function(){r.after.push(this)});var s=i.fn.cycle.transitions[q];if(i.isFunction(s)){s(r.$cont,i(r.elements),r)}};function e(x,q,w,y){if(w&&q.busy&&q.manualTrump){i(x).stop(true,true);q.busy=false}if(q.busy){return}var u=q.$cont[0],A=x[q.currSlide],z=x[q.nextSlide];if(u.cycleStop!=q.stopCount||u.cycleTimeout===0&&!w){return}if(!w&&!u.cyclePause&&((q.autostop&&(--q.countdown<=0))||(q.nowrap&&!q.random&&q.nextSlide<q.currSlide))){if(q.end){q.end(q)}return}if(w||!u.cyclePause){var v=q.fx;A.cycleH=A.cycleH||i(A).height();A.cycleW=A.cycleW||i(A).width();z.cycleH=z.cycleH||i(z).height();z.cycleW=z.cycleW||i(z).width();if(q.multiFx){if(q.lastFx==undefined||++q.lastFx>=q.fxs.length){q.lastFx=0}v=q.fxs[q.lastFx];q.currFx=v}if(q.oneTimeFx){v=q.oneTimeFx;q.oneTimeFx=null}i.fn.cycle.resetState(q,v);if(q.before.length){i.each(q.before,function(B,C){if(u.cycleStop!=q.stopCount){return}C.apply(z,[A,z,q,y])})}var s=function(){i.each(q.after,function(B,C){if(u.cycleStop!=q.stopCount){return}C.apply(z,[A,z,q,y])})};if(q.nextSlide!=q.currSlide){q.busy=1;if(q.fxFn){q.fxFn(A,z,q,s,y)}else{if(i.isFunction(i.fn.cycle[q.fx])){i.fn.cycle[q.fx](A,z,q,s)}else{i.fn.cycle.custom(A,z,q,s,w&&q.fastOnEvent)}}}q.lastSlide=q.currSlide;if(q.random){q.currSlide=q.nextSlide;if(++q.randomIndex==x.length){q.randomIndex=0}q.nextSlide=q.randomMap[q.randomIndex]}else{var t=(q.nextSlide+1)==x.length;q.nextSlide=t?0:q.nextSlide+1;q.currSlide=t?x.length-1:q.nextSlide-1}if(q.pager){i.fn.cycle.updateActivePagerLink(q.pager,q.currSlide)}}var r=0;if(q.timeout&&!q.continuous){r=h(A,z,q,y)}else{if(q.continuous&&u.cyclePause){r=10}}if(r>0){u.cycleTimeout=setTimeout(function(){e(x,q,0,!q.rev)},r)}}i.fn.cycle.updateActivePagerLink=function(q,r){i(q).each(function(){i(this).find("a").removeClass("activeSlide").filter("a:eq("+r+")").addClass("activeSlide")})};function h(v,s,u,r){if(u.timeoutFn){var q=u.timeoutFn(v,s,u,r);while((q-u.speed)<250){q+=u.speed}a("calculated timeout: "+q+"; speed: "+u.speed);if(q!==false){return q}}return u.timeout}i.fn.cycle.next=function(q){o(q,q.rev?-1:1)};i.fn.cycle.prev=function(q){o(q,q.rev?1:-1)};function o(r,u){var q=r.elements;var t=r.$cont[0],s=t.cycleTimeout;if(s){clearTimeout(s);t.cycleTimeout=0}if(r.random&&u<0){r.randomIndex--;if(--r.randomIndex==-2){r.randomIndex=q.length-2}else{if(r.randomIndex==-1){r.randomIndex=q.length-1}}r.nextSlide=r.randomMap[r.randomIndex]}else{if(r.random){if(++r.randomIndex==q.length){r.randomIndex=0}r.nextSlide=r.randomMap[r.randomIndex]}else{r.nextSlide=r.currSlide+u;if(r.nextSlide<0){if(r.nowrap){return false}r.nextSlide=q.length-1}else{if(r.nextSlide>=q.length){if(r.nowrap){return false}r.nextSlide=0}}}}if(i.isFunction(r.prevNextClick)){r.prevNextClick(u>0,r.nextSlide,q[r.nextSlide])}e(q,r,1,u>=0);return false}function d(r,s){var q=i(s.pager);i.each(r,function(t,u){i.fn.cycle.createPagerAnchor(t,u,q,r,s)});i.fn.cycle.updateActivePagerLink(s.pager,s.startingSlide)}i.fn.cycle.createPagerAnchor=function(u,v,s,t,w){var r;if(i.isFunction(w.pagerAnchorBuilder)){r=w.pagerAnchorBuilder(u,v)}else{r='<a href="#">'+(u+1)+"</a>"}if(!r){return}var x=i(r);if(x.parents("body").length===0){var q=[];if(s.length>1){s.each(function(){var y=x.clone(true);i(this).append(y);q.push(y[0])});x=i(q)}else{x.appendTo(s)}}x.bind(w.pagerEvent,function(A){A.preventDefault();w.nextSlide=u;var z=w.$cont[0],y=z.cycleTimeout;if(y){clearTimeout(y);z.cycleTimeout=0}if(i.isFunction(w.pagerClick)){w.pagerClick(w.nextSlide,t[w.nextSlide])}e(t,w,1,w.currSlide<u);return false});if(w.pagerEvent!="click"){x.click(function(){return false})}if(w.pauseOnPagerHover){x.hover(function(){w.$cont[0].cyclePause++},function(){w.$cont[0].cyclePause--})}};i.fn.cycle.hopsFromLast=function(t,s){var r,q=t.lastSlide,u=t.currSlide;if(s){r=u>q?u-q:t.slideCount-q}else{r=u<q?q-u:q+t.slideCount-u}return r};function g(s){function r(t){t=parseInt(t).toString(16);return t.length<2?"0"+t:t}function q(w){for(;w&&w.nodeName.toLowerCase()!="html";w=w.parentNode){var t=i.css(w,"background-color");if(t.indexOf("rgb")>=0){var u=t.match(/\d+/g);return"#"+r(u[0])+r(u[1])+r(u[2])}if(t&&t!="transparent"){return t}}return"#ffffff"}s.each(function(){i(this).css("background-color",q(this))})}i.fn.cycle.commonReset=function(v,t,u,r,s,q){i(u.elements).not(v).hide();u.cssBefore.opacity=1;u.cssBefore.display="block";if(r!==false&&t.cycleW>0){u.cssBefore.width=t.cycleW}if(s!==false&&t.cycleH>0){u.cssBefore.height=t.cycleH}u.cssAfter=u.cssAfter||{};u.cssAfter.display="none";i(v).css("zIndex",u.slideCount+(q===true?1:0));i(t).css("zIndex",u.slideCount+(q===true?0:1))};i.fn.cycle.custom=function(B,v,q,s,r){var A=i(B),w=i(v);var t=q.speedIn,z=q.speedOut,u=q.easeIn,y=q.easeOut;w.css(q.cssBefore);if(r){if(typeof r=="number"){t=z=r}else{t=z=1}u=y=null}var x=function(){w.animate(q.animIn,t,u,s)};A.animate(q.animOut,z,y,function(){if(q.cssAfter){A.css(q.cssAfter)}if(!q.sync){x()}});if(q.sync){x()}};i.fn.cycle.transitions={fade:function(r,s,q){s.not(":eq("+q.currSlide+")").css("opacity",0);q.before.push(function(v,t,u){i.fn.cycle.commonReset(v,t,u);u.cssBefore.opacity=0});q.animIn={opacity:1};q.animOut={opacity:0};q.cssBefore={top:0,left:0}}};i.fn.cycle.ver=function(){return l};i.fn.cycle.defaults={fx:"fade",timeout:12000,timeoutFn:null,continuous:0,speed:1000,speedIn:null,speedOut:null,next:null,prev:null,prevNextClick:null,prevNextEvent:"click",pager:null,pagerClick:null,pagerEvent:"click",pagerAnchorBuilder:null,before:null,after:null,end:null,easing:null,easeIn:null,easeOut:null,shuffle:null,animIn:null,animOut:null,cssBefore:null,cssAfter:null,fxFn:null,height:"auto",startingSlide:0,sync:1,random:0,fit:0,containerResize:1,pause:0,pauseOnPagerHover:0,autostop:0,autostopCount:0,delay:0,slideExpr:null,cleartype:!i.support.opacity,cleartypeNoBg:true,nowrap:0,fastOnEvent:0,randomizeEffects:1,rev:0,manualTrump:true,requeueOnImageNotLoaded:true,requeueTimeout:250}})(jQuery); 

/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
*		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return $.browser.safari || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
			
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );

/**
 * jQuery.LocalScroll
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 *
 * @projectDescription Animated scrolling navigation, using anchors.
 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
 * @author Ariel Flesler
 * @version 1.2.7
 *
 * @id jQuery.fn.localScroll
 * @param {Object} settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @example $('ul.links').localScroll();
 *
 * @example $('ul.links').localScroll({ filter:'.animated', duration:400, axis:'x' });
 *
 * @example $.localScroll({ target:'#pane', axis:'xy', queue:true, event:'mouseover' });
 *
 * Notes:
 *	- The plugin requires jQuery.ScrollTo.
 *	- The hash of settings, is passed to jQuery.ScrollTo, so the settings are valid for that plugin as well.
 *	- jQuery.localScroll can be used if the desired links, are all over the document, it accepts the same settings.
 *  - If the setting 'lazy' is set to true, then the binding will still work for later added anchors.
  *	- If onBefore returns false, the event is ignored.
 **/
;(function( $ ){
	var URI = location.href.replace(/#.*/,''); // local url without hash

	var $localScroll = $.localScroll = function( settings ){
		$('body').localScroll( settings );
	};

	// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	// @see http://flesler.demos.com/jquery/scrollTo/
	// The defaults are public and can be overriden.
	$localScroll.defaults = {
		duration:1000, // How long to animate.
		axis:'y', // Which of top and left should be modified.
		event:'click', // On which event to react.
		stop:true, // Avoid queuing animations 
		target: window, // What to scroll (selector or element). The whole window by default.
		reset: true // Used by $.localScroll.hash. If true, elements' scroll is resetted before actual scrolling
		/*
		lock:false, // ignore events if already animating
		lazy:false, // if true, links can be added later, and will still work.
		filter:null, // filter some anchors out of the matched elements.
		hash: false // if true, the hash of the selected link, will appear on the address bar.
		*/
	};

	// If the URL contains a hash, it will scroll to the pointed element
	$localScroll.hash = function( settings ){
		if( location.hash ){
			settings = $.extend( {}, $localScroll.defaults, settings );
			settings.hash = false; // can't be true
			
			if( settings.reset ){
				var d = settings.duration;
				delete settings.duration;
				$(settings.target).scrollTo( 0, settings );
				settings.duration = d;
			}
			scroll( 0, location, settings );
		}
	};

	$.fn.localScroll = function( settings ){
		settings = $.extend( {}, $localScroll.defaults, settings );

		return settings.lazy ?
			// use event delegation, more links can be added later.		
			this.bind( settings.event, function( e ){
				// Could use closest(), but that would leave out jQuery -1.3.x
				var a = $([e.target, e.target.parentNode]).filter(filter)[0];
				// if a valid link was clicked
				if( a )
					scroll( e, a, settings ); // do scroll.
			}) :
			// bind concretely, to each matching link
			this.find('a,area')
				.filter( filter ).bind( settings.event, function(e){
					scroll( e, this, settings );
				}).end()
			.end();

		function filter(){// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
			return !!this.href && !!this.hash && this.href.replace(this.hash,'') == URI && (!settings.filter || $(this).is( settings.filter ));
		};
	};

	function scroll( e, link, settings ){
		var id = link.hash.slice(1),
			elem = document.getElementById(id) || document.getElementsByName(id)[0];

		if ( !elem )
			return;

		if( e )
			e.preventDefault();

		var $target = $( settings.target );

		if( settings.lock && $target.is(':animated') ||
			settings.onBefore && settings.onBefore.call(settings, e, elem, $target) === false ) 
			return;

		if( settings.stop )
			$target.stop(true); // remove all its animations

		if( settings.hash ){
			var attr = elem.id == id ? 'id' : 'name',
				$a = $('<a> </a>').attr(attr, id).css({
					position:'absolute',
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				});

			elem[attr] = '';
			$('body').prepend($a);
			location = link.hash;
			$a.remove();
			elem[attr] = id;
		}
			
		$target
			.scrollTo( elem, settings ) // do scroll
			.trigger('notify.serialScroll',[elem]); // notify serialScroll about this change
	};

})( jQuery );

//QUICK SAND
/*
 * 
 * 
 * 
 */
(function(a){a.fn.quicksand=function(y,r,t){var b={duration:750,easing:"swing",attribute:"data-id",adjustHeight:"auto",useScaling:true,enhancement:function(){},selector:"> *"};a.extend(b,r);if(a.browser.msie||typeof a.fn.scale=="undefined")b.useScaling=false;var o;if(typeof r=="function")o=r;else if(typeof(t=="function"))o=t;return this.each(function(k){var m,i=[],l=a(y).clone(),g=a(this);k=a(this).css("height");var p,u=false,v=a(g).offset(),s=[],n=a(this).find(b.selector);if(a.browser.msie&&a.browser.version.substr(0,
1)<7)g.html("").append(l);else{var w=0,z=function(){if(!w){g.html(j.html());typeof o=="function"&&o.call(this);u&&g.css("height",p);b.enhancement(g);w=1}},c=g.offsetParent(),e=c.offset();if(c.css("position")=="relative"){if(c.get(0).nodeName.toLowerCase()!="body"){e.top+=parseFloat(c.css("border-top-width"));e.left+=parseFloat(c.css("border-left-width"))}}else{e.top-=parseFloat(c.css("border-top-width"));e.left-=parseFloat(c.css("border-left-width"));e.top-=parseFloat(c.css("margin-top"));e.left-=
parseFloat(c.css("margin-left"))}g.css("height",a(this).height());n.each(function(f){s[f]=a(this).offset()});a(this).stop();n.each(function(f){a(this).stop();var h=a(this).get(0);h.style.position="absolute";h.style.margin="0";h.style.top=s[f].top-parseFloat(h.style.marginTop)-e.top+"px";h.style.left=s[f].left-parseFloat(h.style.marginLeft)-e.left+"px"});var j=a(g).clone();c=j.get(0);c.innerHTML="";c.setAttribute("id","");c.style.height="auto";c.style.width=g.width()+"px";j.append(l);j.insertBefore(g);
j.css("opacity",0);c.style.zIndex=-1;c.style.margin="0";c.style.position="absolute";c.style.top=v.top-e.top+"px";c.style.left=v.left-e.left+"px";if(b.adjustHeight==="dynamic")g.animate({height:j.height()},b.duration,b.easing);else if(b.adjustHeight==="auto"){p=j.height();if(parseFloat(k)<parseFloat(p))g.css("height",p);else u=true}n.each(function(){var f=[];if(typeof b.attribute=="function"){m=b.attribute(a(this));l.each(function(){if(b.attribute(this)==m){f=a(this);return false}})}else f=l.filter("["+
b.attribute+"="+a(this).attr(b.attribute)+"]");if(f.length)b.useScaling?i.push({element:a(this),animation:{top:f.offset().top-e.top,left:f.offset().left-e.left,opacity:1,scale:"1.0"}}):i.push({element:a(this),animation:{top:f.offset().top-e.top,left:f.offset().left-e.left,opacity:1}});else b.useScaling?i.push({element:a(this),animation:{opacity:"0.0",scale:"0.0"}}):i.push({element:a(this),animation:{opacity:"0.0"}})});l.each(function(){var f=[],h=[];if(typeof b.attribute=="function"){m=b.attribute(a(this));
n.each(function(){if(b.attribute(this)==m){f=a(this);return false}});l.each(function(){if(b.attribute(this)==m){h=a(this);return false}})}else{f=n.filter("["+b.attribute+"="+a(this).attr(b.attribute)+"]");h=l.filter("["+b.attribute+"="+a(this).attr(b.attribute)+"]")}var x;if(f.length===0){x=b.useScaling?{opacity:"1.0",scale:"1.0"}:{opacity:"1.0"};d=h.clone();var q=d.get(0);q.style.position="absolute";q.style.margin="0";q.style.top=h.offset().top-e.top+"px";q.style.left=h.offset().left-e.left+"px";
d.css("opacity",0);b.useScaling&&d.css("transform","scale(0.0)");d.appendTo(g);i.push({element:a(d),animation:x})}});j.remove();b.enhancement(g);for(k=0;k<i.length;k++)i[k].element.animate(i[k].animation,b.duration,b.easing,z)}})}})(jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/**
 * jQuery Validation Plugin 1.8.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/ 
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&this.find("input, button").filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator");e="on"+e.type.replace(/^validate/,
"");f.settings[e]&&f.settings[e].call(f,this[0])}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=this.settings.rules;
c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",a).validateDelegate(":radio, :checkbox, select, option","click",a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",
[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=a=this.clean(a);this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,
a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},
objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==
a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,
this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.clean(a);if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=
c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=
this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+
a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];
this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);
this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass().addClass(this.settings.errorClass);d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||
"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},
idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},
depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<
0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},
email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b=
{};a=c(a);for(var d in c.validator.methods){var e=a.attr(d);if(e)b[d]=e}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===
false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&
a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},
methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=
e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=
e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||
a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9-]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);



