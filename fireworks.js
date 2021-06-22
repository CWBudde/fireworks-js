/*!
 * fireworks-js 1.1.3 by Vitalij Ryndin (https://crashmax.ru)
 * https://crashmax-dev.github.io/fireworks-js/
 * License GPL-3
 */
!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i();else if("function"==typeof define&&define.amd)define([],i);else{var e=i();for(var s in e)("object"==typeof exports?exports:t)[s]=e[s]}}(this,(function(){return function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)e.d(s,n,function(i){return t[i]}.bind(null,n));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=1)}([function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.randomInteger=i.randomFloat=void 0;var s=e(3);Object.defineProperty(i,"randomFloat",{enumerable:!0,get:function(){return s.randomFloat}});var n=e(4);Object.defineProperty(i,"randomInteger",{enumerable:!0,get:function(){return n.randomInteger}})},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.Fireworks=void 0;var s=e(2),n=e(5),o=e(6),h=e(0);i.Fireworks=class{constructor(t,i){var e;this._tick=0,this._version="1.1.3",this._running=!1,this._m=!1,this._container=t,this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d"),this._container.appendChild(this._canvas),this._sound=new n.Sound(null==i?void 0:i.sound),this.updateSize(),this.updateBoundaries(Object.assign({top:50,bottom:0,left:50,right:0},null==i?void 0:i.boundaries)),this._speed=(null==i?void 0:i.speed)||2,this._acceleration=(null==i?void 0:i.acceleration)||1.05,this._friction=(null==i?void 0:i.friction)||.95,this._gravity=(null==i?void 0:i.gravity)||1.5,this._particleCount=(null==i?void 0:i.particles)||50,this._traceLength=(null==i?void 0:i.trace)||3,this._explosionLength=(null==i?void 0:i.explosion)||5,this._autoresize=null===(e=null==i?void 0:i.autoresize)||void 0===e||e,this._hue=Object.assign({min:0,max:360},null==i?void 0:i.hue),this._mouse=Object.assign({click:!1,move:!1,max:5},null==i?void 0:i.mouse),this._delay=Object.assign({min:15,max:30},null==i?void 0:i.delay),this._brightness=Object.assign({min:50,max:80,decay:{min:.015,max:.03}},null==i?void 0:i.brightness),this._autoresize&&window.addEventListener("resize",()=>this.updateSize()),this._canvas.addEventListener("mousedown",t=>this.useMouse(t,this._mouse.click)),this._canvas.addEventListener("mouseup",t=>this.useMouse(t,!1)),this._canvas.addEventListener("mousemove",t=>this.useMouse(t,this._m))}get isRunning(){return this._running}get version(){return this._version}start(){this._running||(this._running=!0,this.clear(),this.render())}stop(){this._running=!1,this.clear()}pause(){this._running=!this._running,this._running&&this.render()}clear(){this._ctx&&(this._traces=[],this._explosions=[],this._ctx.clearRect(0,0,this._width,this._height))}updateSize(){var{width:t=this._container.clientWidth,height:i=this._container.clientHeight}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._width=t,this._height=i,this._canvas.width=t,this._canvas.height=i,this.updateBoundaries({right:t,bottom:i})}updateBoundaries(t){this._boundaries=Object.assign(Object.assign({},this._boundaries),t)}useMouse(t,i){(this._mouse.click||this._mouse.move)&&(this._mx=t.pageX-this._canvas.offsetLeft,this._my=t.pageY-this._canvas.offsetTop,this._m=i)}render(){this._ctx&&this._running&&(requestAnimationFrame(()=>this.render()),this._ctx.globalCompositeOperation="destination-out",this._ctx.fillStyle="rgba(0, 0, 0, 0.5)",this._ctx.fillRect(0,0,this._width,this._height),this._ctx.globalCompositeOperation="lighter",this.initTrace(),this.drawTrace(),this.drawExplosion(),this._tick++)}initTrace(){this._ds=h.randomInteger(this._delay.min,this._delay.max),(2*this._ds<this._tick||this._m&&this._mouse.max>this._traces.length)&&(this._traces.push(new s.Trace(.5*this._width,this._height,this._m||this._mouse.move?this._mx:h.randomInteger(this._boundaries.left,this._boundaries.right-50),this._m||this._mouse.move?this._my:h.randomInteger(this._boundaries.top,.5*this._boundaries.bottom),this._ctx,h.randomInteger(this._hue.min,this._hue.max),this._speed,this._acceleration,this._traceLength)),this._tick=0)}drawTrace(){for(var t=this._traces.length;t--;)this._traces[t].draw(),this._traces[t].update((i,e,s)=>{this.initExplosion(i,e,s),this._sound.play(),this._traces.splice(t,1)})}initExplosion(t,i,e){for(var s=this._particleCount;s--;)this._explosions.push(new o.Explosion(t,i,this._ctx,e,this._friction,this._gravity,this._explosionLength,this._brightness))}drawExplosion(){for(var t=this._explosions.length;t--;)this._explosions[t].draw(),this._explosions[t].update(()=>{this._explosions.splice(t,1)})}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.Trace=void 0;var s=e(0);i.Trace=class{constructor(t,i,e,n,o,h,r,a,_){for(this._currentDistance=0,this._coordinates=[],this._x=t,this._y=i,this._sx=t,this._sy=i,this._dx=e,this._dy=n,this._ctx=o,this._hue=h,this._speed=r,this._acceleration=a,this._traceLength=_,this._totalDistance=this.getDistance(this._sx,this._sy,this._dx,this._dy);this._traceLength--;)this._coordinates.push([t,i]);this._angle=Math.atan2(this._dy-this._sy,this._dx-this._sx),this._brightness=s.randomInteger(50,70)}update(t){this._coordinates.pop(),this._coordinates.unshift([this._x,this._y]),this._speed*=this._acceleration;var i=Math.cos(this._angle)*this._speed,e=Math.sin(this._angle)*this._speed;this._currentDistance=this.getDistance(this._sx,this._sy,this._x+i,this._y+e),this._currentDistance>=this._totalDistance?t(this._dx,this._dy,this._hue):(this._x+=i,this._y+=e)}draw(){var t=this._coordinates.length-1;this._ctx.beginPath(),this._ctx.moveTo(this._coordinates[t][0],this._coordinates[t][1]),this._ctx.lineTo(this._x,this._y),this._ctx.strokeStyle="hsl(".concat(this._hue,", 100%, ").concat(this._brightness,"%)"),this._ctx.stroke()}getDistance(t,i,e,s){var n=Math.pow;return Math.sqrt(n(t-e,2)+n(i-s,2))}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.randomFloat=void 0,i.randomFloat=function(t,i){return Math.random()*(i-t)+t}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.randomInteger=void 0,i.randomInteger=function(t,i){return Math.floor(t+Math.random()*(i+1-t))}},function(t,i,e){"use strict";var s=this&&this.__awaiter||function(t,i,e,s){return new(e||(e=Promise))((function(n,o){function h(t){try{a(s.next(t))}catch(t){o(t)}}function r(t){try{a(s.throw(t))}catch(t){o(t)}}function a(t){var i;t.done?n(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(h,r)}a((s=s.apply(t,i||[])).next())}))};Object.defineProperty(i,"__esModule",{value:!0}),i.Sound=void 0;var n=e(0);i.Sound=class{constructor(t){this._buffer=[],this._audioContext=new AudioContext,this.options=Object.assign({enable:!1,files:["explosion0.mp3","explosion1.mp3","explosion2.mp3"],volume:{min:4,max:8}},t),this.options.enable&&this.load()}load(){return s(this,void 0,void 0,(function*(){for(var t of this.options.files){var i=yield(yield fetch(t)).arrayBuffer();this._audioContext.decodeAudioData(i,t=>{this._buffer.push(t)})}}))}play(){return s(this,void 0,void 0,(function*(){if(this.options.enable)if(this._buffer.length){var t=this._audioContext.createBufferSource(),i=this._buffer[n.randomInteger(0,this._buffer.length-1)],e=this._audioContext.createGain();t.buffer=i,e.gain.value=n.randomFloat(this.options.volume.min/100,this.options.volume.max/100),e.connect(this._audioContext.destination),t.connect(e),t.start(0)}else yield this.load()}))}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.Explosion=void 0;var s=e(0);i.Explosion=class{constructor(t,i,e,n,o,h,r,a){for(this._coordinates=[],this._alpha=1,this._x=t,this._y=i,this._ctx=e,this._hue=n,this._friction=o,this._gravity=h,this._explosionLength=r;this._explosionLength--;)this._coordinates.push([t,i]);this._angle=s.randomFloat(0,2*Math.PI),this._speed=s.randomInteger(1,10),this._hue=s.randomInteger(this._hue-20,this._hue+20),this._brightness=s.randomInteger(a.min,a.max),this._decay=s.randomFloat(a.decay.min,a.decay.max)}update(t){this._coordinates.pop(),this._coordinates.unshift([this._x,this._y]),this._speed*=this._friction,this._x+=Math.cos(this._angle)*this._speed,this._y+=Math.sin(this._angle)*this._speed+this._gravity,this._alpha-=this._decay,this._alpha<=this._decay&&t()}draw(){var t=this._coordinates.length-1;this._ctx.beginPath(),this._ctx.moveTo(this._coordinates[t][0],this._coordinates[t][1]),this._ctx.lineTo(this._x,this._y),this._ctx.strokeStyle="hsla(".concat(this._hue,", 100%, ").concat(this._brightness,"%, ").concat(this._alpha,")"),this._ctx.stroke()}}}])}));