
(()=>{"use strict";var e,t,r,n,a,o,c={138:(e,t,r)=>{r.a(e,(async(e,t)=>{try{var n=r(0),a=e([n]);(0,(n=(a.then?(await a)():a)[0]).Q)(),window.onload=()=>{let e=document.getElementById("bg_canvas"),t=document.getElementById("text_canvas"),r=e.getContext("2d"),n=t.getContext("2d");document.getElementById("fileUpload").onchange=e=>{let t=e.target.files[0],n=new FileReader,a=new Image;n.readAsDataURL(t),n.onload=function(e){let t=e.target.result;a.src=t,a.onload=function(){r.drawImage(a,0,0,500,500)}}},document.getElementById("inputText").oninput=e=>{let r=e.target.value;n.clearRect(0,0,t.clientWidth,t.clientHeight),n.font="20px 微软雅黑";let a=5*r.length;n.fillText(r,t.clientWidth/2-a,250)}},t()}catch(e){t(e)}}))},0:(e,t,r)=>{r.a(e,(async(n,a)=>{try{r.d(t,{J:()=>u,Q:()=>s});var o=r(82);e=r.hmd(e);var c=n([o]);o=(c.then?(await c)():c)[0];let i=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});i.decode();let l=null;function s(){o.greet()}function u(e,t){var r,n;alert((r=e,n=t,i.decode((null!==l&&l.buffer===o.memory.buffer||(l=new Uint8Array(o.memory.buffer)),l).subarray(r,r+n))))}a()}catch(d){a(d)}}))},82:(e,t,r)=>{r.a(e,(async(n,a)=>{try{var o,c=n([o=r(0)]),[o]=c.then?(await c)():c;await r.v(t,e.id,"ac24ed7052458908ede5",{"./canvas_rs_bg.js":{__wbg_alert_ef81b59062930f07:o.J}}),a()}catch(e){a(e)}}),1)}},i={};function l(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={id:e,loaded:!1,exports:{}};return c[e](r,r.exports,l),r.loaded=!0,r.exports}e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},a=e=>!--e.r&&e(),o=(e,t)=>e?e.push(t):a(t),l.a=(c,i,l)=>{var s,u,d,p=l&&[],f=c.exports,h=!0,m=!1,b=(t,r,n)=>{m||(m=!0,r.r+=t.length,t.map(((t,a)=>t[e](r,n))),m=!1)},y=new Promise(((e,t)=>{d=t,u=()=>(e(f),n(p),p=0)}));y[t]=f,y[e]=(e,t)=>{if(h)return a(e);s&&b(s,e,t),o(p,e),y.catch(t)},c.exports=y,i((c=>{var i;s=(c=>c.map((c=>{if(null!==c&&"object"==typeof c){if(c[e])return c;if(c.then){var i=[];c.then((e=>{l[t]=e,n(i),i=0}),(e=>{l[r]=e,n(i),i=0}));var l={};return l[e]=(e,t)=>(o(i,e),c.catch(t)),l}}var s={};return s[e]=e=>a(e),s[t]=c,s})))(c);var l=()=>s.map((e=>{if(e[r])throw e[r];return e[t]})),u=new Promise(((e,t)=>{(i=()=>e(l)).r=0,b(s,i,t)}));return i.r?u:l()}),(e=>(e&&d(y[r]=e),u()))),h=!1},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.v=(e,t,r,n)=>{var a=fetch(l.p+""+r+".module.wasm");return"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(a,n).then((t=>Object.assign(e,t.instance.exports))):a.then((e=>e.arrayBuffer())).then((e=>WebAssembly.instantiate(e,n))).then((t=>Object.assign(e,t.instance.exports)))},(()=>{var e;l.g.importScripts&&(e=l.g.location+"");var t=l.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=e})(),l(138)})();
//# sourceMappingURL=index.js.map

