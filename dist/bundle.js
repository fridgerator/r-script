!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("R",[],n):"object"==typeof exports?exports.R=n():t.R=n()}(global,function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(1),o=function(){function t(t,n){var e=n||{},r=e.env||process.env;this.rData={},this.path=t,this.options=Object.assign({},{env:Object.assign({},{DIRNAME:__dirname},r),encoding:"utf8"},e),this.idCounter=0,this.args=["--vanilla",this.options.env.DIRNAME+"/R/launch.R"]}return t.prototype.setInputEnv=function(t){this.options.env.input=JSON.stringify([this.rData,this.path,t])},t.prototype.data=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];for(var e=0;e<t.length;e++)this.rData[++this.idCounter]=t[e];return this},t.prototype.call=function(t){var n=this;return new Promise(function(e,o){var i=t||{};n.setInputEnv(i);var s=r.spawn("Rscript",n.args,n.options),u="";s.stderr.on("data",function(t){var n=t.toString();n.includes("Warning message")?console.warn(n):o(n)}),s.stdout.on("data",function(t){return u+=t}),s.on("close",function(){try{var t=JSON.parse(u);e(t)}catch(t){o(u)}})})},t.prototype.callSync=function(t){var n=t||{};this.setInputEnv(n);var e=r.spawnSync("Rscript",this.args,this.options);if(e.stderr){if(!(o=e.stderr.toString()).includes("Warning message"))throw o;console.warn(o)}if(e.stdout){var o=e.stdout.toString(),i=void 0;try{i=JSON.parse(o)}catch(t){throw o}return i}},t}();n.R=o},function(t,n){t.exports=require("child_process")}])});