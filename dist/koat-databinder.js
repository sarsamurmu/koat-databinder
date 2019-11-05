/*!
 * Koat DataBinder v1.0.0
 * Copyright (c) 2019 Sarsa Murmu
 * https://github.com/sarsamurmu/koat-databinder
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("DataBinder",[],t):"object"==typeof exports?exports.DataBinder=t():e.DataBinder=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const{dt:r,getType:i,types:a}=n(1),o=n(2).default;e.exports=class{constructor(e,t){Reflect.defineProperty(this,r,{value:{},writable:!0,enumerable:!1,configurable:!1}),this[r].element=e,this[r].binderData={},this[r].baseHTML=e.outerHTML.repeat(1).trim().replace(/&gt;/g,">").replace(/\{:(.*?):\}=[\"\']{2}/g,"{:$1:}"),this[r].connected=!1,this[r].proxyHandler={get:(e,t)=>Reflect.get(e,t),set:(e,t,n)=>(Reflect.set(e,t,this[r].getProxiefied(n)),this[r].connected&&this.update(),!0)},this[r].proxiefy=(e,t)=>{Object.keys(e).forEach(t=>{let n=i(e[t]);if(n===a.Object&&(this[r].proxiefy(e[t]),e[t]=new Proxy(e[t],this[r].proxyHandler)),n===a.Array){for(var o=0;o<e[t].length;o++){let n=i(e[t][o]);n!==a.Object&&n!==a.Array||(this[r].proxiefy(e[t][o]),e[t][o]=new Proxy(e[t][o],this[r].proxyHandler))}e[t]=new Proxy(e[t],this[r].proxyHandler)}})},this[r].getProxiefied=e=>{let t=i(e);return t===a.Object||t===a.Array?(this[r].proxiefy(e),new Proxy(e,this[r].proxyHandler)):e},this[r].setupWatcher=(e,t,n)=>{void 0!==e&&Object.keys(e).forEach(t=>{this[t]=this[r].binderData[t]=this[r].getProxiefied(e[t]),Reflect.defineProperty(this,t,{enumerable:!0,configurable:!0,get:()=>this[r].binderData[t],set:e=>(this[r].binderData[t]=this[r].getProxiefied(e),this[r].connected&&this.update(),!0)})})},this[r].setupWatcher(t),this[r].JSONreplacer=(e,t)=>"function"==typeof t?t.bind(this)():t,this[r].updateLetString=()=>{this[r].letString="",Object.keys(this).forEach(e=>{this[r].binderData[e]=this[e];var t=JSON.stringify(this[r].binderData[e],this[r].JSONreplacer);this[r].letString+=`let ${e} = ${t};`})},this[r].getNewHTML=()=>this[r].baseHTML.replace(/a\{:(.*?):\}/g,(e,t,n)=>{var i=t.trim();return new Function(`\n          ${this[r].letString}\n          let __scrtVal__ = '${i}';\n          try {\n            __scrtVal__ += '="'+${i}+'"'\n          } catch (e) {\n            console.warn(e.toString());\n            __scrtVal__ = ''\n          }\n          return __scrtVal__\n          `)()}).replace(/\{:((\s|.)*?):\}/gm,(e,t,n)=>{var i=t.trim();return new Function(`\n          ${this[r].letString}\n          let __scrtVal__ = '';\n          try {\n            __scrtVal__ = ${i}\n          } catch (e) {\n            console.warn(e.toString());\n            __scrtVal__ = ''\n          }\n          return __scrtVal__\n          `)()})}update(){this[r].updateLetString(),o(this[r].element,this[r].getNewHTML(),{onBeforeElUpdated:function(e,t){return!e.isEqualNode(t)}})}set(e,t){this[r].binderData[e]=this[r].getProxiefied(t),Reflect.defineProperty(this,e,{enumerable:!0,configurable:!0,get:()=>this[r].binderData[e],set:t=>(this[r].binderData[e]=this[r].getProxiefied(t),this[r].connected&&this.update(),!0)})}connect(){this[r].connected=!0,this.update()}disconnect(){this[r].connected=!1}}},function(e,t){e.exports={dt:"_#koatBinder#_",getType:e=>Object.prototype.toString.call(e),types:{Array:"[object Array]",Object:"[object Object]"}}},function(e,t,n){"use strict";n.r(t);var r,i=11;var a="http://www.w3.org/1999/xhtml",o="undefined"==typeof document?void 0:document,d=!!o&&"content"in o.createElement("template"),l=!!o&&o.createRange&&"createContextualFragment"in o.createRange();function c(e){return e=e.trim(),d?function(e){var t=o.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(e):l?function(e){return r||(r=o.createRange()).selectNode(o.body),r.createContextualFragment(e).childNodes[0]}(e):function(e){var t=o.createElement("body");return t.innerHTML=e,t.childNodes[0]}(e)}function u(e,t){var n=e.nodeName,r=t.nodeName;return n===r||!!(t.actualize&&n.charCodeAt(0)<91&&r.charCodeAt(0)>90)&&n===r.toUpperCase()}function s(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var f={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();"OPTGROUP"===r&&(r=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==r||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}s(e,t,"selected")},INPUT:function(e,t){s(e,t,"checked"),s(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var i=r.nodeValue;if(i==n||!n&&i==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,r,i=-1,a=0,o=e.firstChild;o;)if("OPTGROUP"===(r=o.nodeName&&o.nodeName.toUpperCase()))o=(n=o).firstChild;else{if("OPTION"===r){if(o.hasAttribute("selected")){i=a;break}a++}!(o=o.nextSibling)&&n&&(o=n.nextSibling,n=null)}e.selectedIndex=i}}},p=1,h=11,b=3,v=8;function m(){}function y(e){return e.id}var g=function(e){return function(t,n,r){if(r||(r={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var i=n;(n=o.createElement("html")).innerHTML=i}else n=c(n);var d=r.getNodeKey||y,l=r.onBeforeNodeAdded||m,s=r.onNodeAdded||m,g=r.onBeforeElUpdated||m,x=r.onElUpdated||m,N=r.onBeforeNodeDiscarded||m,_=r.onNodeDiscarded||m,S=r.onBeforeElChildrenUpdated||m,T=!0===r.childrenOnly,A=Object.create(null),O=[];function C(e){O.push(e)}function P(e,t,n){!1!==N(e)&&(t&&t.removeChild(e),_(e),function e(t,n){if(t.nodeType===p)for(var r=t.firstChild;r;){var i=void 0;n&&(i=d(r))?C(i):(_(r),r.firstChild&&e(r,n)),r=r.nextSibling}}(e,n))}function E(e){s(e);for(var t=e.firstChild;t;){var n=t.nextSibling,r=d(t);if(r){var i=A[r];i&&u(t,i)&&(t.parentNode.replaceChild(i,t),j(i,t))}E(t),t=n}}function j(t,n,r){var i=d(n);if(i&&delete A[i],!r){if(!1===g(t,n))return;if(e(t,n),x(t),!1===S(t,n))return}"TEXTAREA"!==t.nodeName?function(e,t){var n,r,i,a,c,s=t.firstChild,h=e.firstChild;e:for(;s;){for(a=s.nextSibling,n=d(s);h;){if(i=h.nextSibling,s.isSameNode&&s.isSameNode(h)){s=a,h=i;continue e}r=d(h);var m=h.nodeType,y=void 0;if(m===s.nodeType&&(m===p?(n?n!==r&&((c=A[n])?i===c?y=!1:(e.insertBefore(c,h),r?C(r):P(h,e,!0),h=c):y=!1):r&&(y=!1),(y=!1!==y&&u(h,s))&&j(h,s)):m!==b&&m!=v||(y=!0,h.nodeValue!==s.nodeValue&&(h.nodeValue=s.nodeValue))),y){s=a,h=i;continue e}r?C(r):P(h,e,!0),h=i}if(n&&(c=A[n])&&u(c,s))e.appendChild(c),j(c,s);else{var g=l(s);!1!==g&&(g&&(s=g),s.actualize&&(s=s.actualize(e.ownerDocument||o)),e.appendChild(s),E(s))}s=a,h=i}!function(e,t,n){for(;t;){var r=t.nextSibling;(n=d(t))?C(n):P(t,e,!0),t=r}}(e,h,r);var x=f[e.nodeName];x&&x(e,t)}(t,n):f.TEXTAREA(t,n)}!function e(t){if(t.nodeType===p||t.nodeType===h)for(var n=t.firstChild;n;){var r=d(n);r&&(A[r]=n),e(n),n=n.nextSibling}}(t);var w,V,D=t,R=D.nodeType,H=n.nodeType;if(!T)if(R===p)H===p?u(t,n)||(_(t),D=function(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}(t,(w=n.nodeName,(V=n.namespaceURI)&&V!==a?o.createElementNS(V,w):o.createElement(w)))):D=n;else if(R===b||R===v){if(H===R)return D.nodeValue!==n.nodeValue&&(D.nodeValue=n.nodeValue),D;D=n}if(D===n)_(t);else{if(n.isSameNode&&n.isSameNode(D))return;if(j(D,n,T),O)for(var U=0,L=O.length;U<L;U++){var M=A[O[U]];M&&P(M,M.parentNode,!1)}}return!T&&D!==t&&t.parentNode&&(D.actualize&&(D=D.actualize(t.ownerDocument||o)),t.parentNode.replaceChild(D,t)),D}}((function(e,t){var n,r,a,o,d=t.attributes;if(t.nodeType!==i&&e.nodeType!==i){for(var l=0;l<d.length;l++)r=(n=d[l]).name,a=n.namespaceURI,o=n.value,a?(r=n.localName||r,e.getAttributeNS(a,r)!==o&&("xmlns"===n.prefix&&(r=n.name),e.setAttributeNS(a,r,o))):e.getAttribute(r)!==o&&e.setAttribute(r,o);for(var c=e.attributes,u=0;u<c.length;u++)r=(n=c[u]).name,(a=n.namespaceURI)?(r=n.localName||r,t.hasAttributeNS(a,r)||e.removeAttributeNS(a,r)):t.hasAttribute(r)||e.removeAttribute(r)}}));t.default=g}])}));