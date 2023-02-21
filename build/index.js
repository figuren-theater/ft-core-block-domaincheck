!function(){"use strict";var e,t={273:function(){var e=window.wp.blocks,t=window.wp.i18n,r=window.wp.blockEditor,n=window.wp.element;(0,e.registerBlockType)("figurentheater/ft-core-block-domaincheck",{apiVersion:2,title:(0,t.__)("Domaincheck","ft-core-block-domaincheck"),description:(0,t.__)("Formular zur Abfrage der Verfügbarkeit einer bestimmten Subdomain unterhalb von figuren.theater und puppen.theater","ft-core-block-domaincheck"),category:"widgets",icon:"rest-api",supports:{html:!1},edit:function(){const e=[["core/group",{style:{border:{radius:"10px"},spacing:{blockGap:"100px"}},backgroundColor:"white",className:"wp-block-post-comments",layout:{type:"flex",orientation:"vertical",justifyContent:"center"}},[["core/heading",{content:"Ist Deine Domain noch frei?",textAlign:"center",level:3}],["core/group",{templateLock:"all",layout:{type:"flex",flexWrap:"wrap"}},[["core/paragraph",{content:[(0,n.createElement)("input",{class:"domain_request",type:"text",placeholder:"xyz.figuren.theater"})]}],["core/buttons",{},[["core/button",{className:"get_domain_request",text:"Jetzt Verfügbarkeit prüfen!",title:"Checke Deinen gewünschten Domainnamen auf Verfügbarkeit.",url:"#"}]]]]]]]];return(0,n.createElement)("div",(0,r.useBlockProps)(),(0,n.createElement)(r.InnerBlocks,{allowedBlocks:["core/group","core/paragraph","core/heading","core/buttons","core/button"],template:e}))},save:function(){return(0,n.createElement)("div",r.useBlockProps.save(),(0,n.createElement)(r.InnerBlocks.Content,null))}})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var c=r[e]={exports:{}};return t[e](c,c.exports,n),c.exports}n.m=t,e=[],n.O=function(t,r,o,c){if(!r){var i=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],c=e[s][2];for(var a=!0,l=0;l<r.length;l++)(!1&c||i>=c)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(a=!1,c<i&&(i=c));if(a){e.splice(s--,1);var u=o();void 0!==u&&(t=u)}}return t}c=c||0;for(var s=e.length;s>0&&e[s-1][2]>c;s--)e[s]=e[s-1];e[s]=[r,o,c]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,c,i=r[0],a=r[1],l=r[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(l)var s=l(n)}for(t&&t(r);u<i.length;u++)c=i[u],n.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return n.O(s)},r=self.webpackChunkft_core_block_domaincheck=self.webpackChunkft_core_block_domaincheck||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[431],(function(){return n(273)}));o=n.O(o)}();