!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=window.regeneratorRuntime},function(e,t){function r(e,t,r,n,o,a,c){try{var i=e[a](c),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,o)}e.exports=function(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var c=e.apply(t,n);function i(e){r(c,o,a,i,u,"next",e)}function u(e){r(c,o,a,i,u,"throw",e)}i(void 0)}))}},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r.n(n),a=r(0),c=r.n(a),i=function(e){var t=document.createElement("p");return t.insertAdjacentHTML("beforeend",e),t},u=function(){var e=o()(c.a.mark((function e(t,r){var n,o,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/ajax-api/domain-request/"+t+"/");case 2:return n=e.sent,e.next=5,n.json();case 5:o=e.sent,a=r.querySelector("a"),void 0!==o.data.validated[0].errors.errors.blogname?(a.innerHTML="💩. Neuer Versuch!",o.data.validated[0].errors.errors.blogname.forEach((function(e,t){r.parentNode.insertBefore(i(e),r.nextSibling)}))):(a.innerHTML="🎉 ✨ 🎊 🌟 💖 💫",o.data.validated.forEach((function(e){var t=e.domain,n="<strong>".concat(t,"</strong>"),o='<a href="mailto:info@figuren.theater?subject=Ich%20will%20'.concat(t,'" title="">schnapp sie Dir</a>'),a="Yeah! ".concat(n," ist frei, ").concat(o,"!");r.parentNode.insertBefore(i(a),r.nextSibling)})));case 8:case"end":return e.stop()}}),e)})));return function(_x,t){return e.apply(this,arguments)}}();window.onload=function(){var e=document.querySelectorAll(".domain_request"),t=document.querySelectorAll(".get_domain_request > a");e.forEach((function(e){e.addEventListener("keydown",(function(e){if(13==(e.keyCode||e.which)){var t=e.target.closest(".wp-block-figurentheater-ft-core-block-domaincheck"),r=t.querySelector(".wp-block-group:not(.wp-block-post-comments)"),n=t.querySelector(".get_domain_request > a"),o=e.target.value;n.innerHTML="...",u(o,r)}}))})),t.forEach((function(e){e.addEventListener("click",(function(e){if(e.target.matches(".get_domain_request > a")){e.preventDefault(),e.target.innerHTML="...";var t=e.target.closest(".wp-block-figurentheater-ft-core-block-domaincheck"),r=t.querySelector(".wp-block-group:not(.wp-block-post-comments)"),n=t.querySelector(".domain_request").value;u(n,r)}}))}))}}]);