(this["webpackJsonpextrude-client"]=this["webpackJsonpextrude-client"]||[]).push([[0],{138:function(e,t,a){e.exports=a(212)},142:function(e,t,a){},172:function(e,t){},176:function(e,t,a){},182:function(e,t,a){},209:function(e,t,a){},210:function(e,t,a){},211:function(e,t,a){},212:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(9),r=a.n(o),i=(a(142),a(3)),c=a(1),l=a(74),u=a(44),p=a(13),d=a(2),m=a(16),h=a(11),y=a(15),v=a(75),g=a.n(v),f=a(12),k=function(){function e(){Object(h.a)(this,e)}return Object(y.a)(e,null,[{key:"randString",value:function(e){for(var t="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=a.length,s=0;s<e;s++)t+=a.charAt(Math.floor(Math.random()*n));return t}},{key:"computeCompositeBoundingBox",value:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];e.walkNodes(t,(function(e){e.geometry&&((!a.excludedTypes||!a.excludedTypes.includes(e.userData.objectType))&&n.push(e))}));var s=new c.Box3;return n.forEach((function(e){e.updateMatrixWorld();var t=e.geometry.clone();t.applyMatrix(e.matrixWorld),t.computeBoundingBox(),s=s.union(t.boundingBox)})),s}},{key:"walkNodes",value:function(t,a){a(t);for(var n=0;n<t.children.length;n+=1)e.walkNodes(t.children[n],a)}},{key:"rand",value:function(e,t){return Math.random()*(t-e)+e}},{key:"vec3ToScreenPoint",value:function(e,t,a,n){var s=e.clone(),o=.5*a,r=.5*n;return s.project(t),s.x=s.x*o+o,s.y=-s.y*r+r,{x:s.x,y:s.y}}},{key:"exponentialEaseOut",value:function(e){return 1===e?1:1-Math.pow(2,-10*e)}}]),e}(),b=function(){function e(){Object(h.a)(this,e)}return Object(y.a)(e,null,[{key:"create",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k.randString(5);return{name:e,id:""+Math.round(1e4*Math.random()),position:new c.Vector3(k.rand(-250,250),0,k.rand(-250,250)),visibleMessages:[],keyStates:{}}}},{key:"addMessage",value:function(e,t){return Object(m.a)({},e,{visibleMessages:[].concat(Object(f.a)(e.visibleMessages),[t])})}},{key:"removeOldestMessage",value:function(e){var t=e.visibleMessages.slice();return t.shift(),Object(m.a)({},e,{visibleMessages:t})}}]),e}(),w=function(){function e(t,a,n){Object(h.a)(this,e),this.socket=null,this.state={players:{}},this.messages=[],this.localPlayerId=t.id,this.updatePlayers=a,this.updateMessagesFunc=n,this.connectToServer(t)}return Object(y.a)(e,[{key:"connectToServer",value:function(e){var t=this;this.socket=g()("https://nameless-depths-23573.herokuapp.com"),this.socket.emit("event",{type:"player_enter_request",player:e}),this.socket.on("event",(function(e){console.log("server event: ",e),t.handleServerEvent(e)})),this.socket.on("disconnect",(function(a){t.handleServerEvent({type:"player_exit",player:e})})),this.socket.on("reconnect",(function(a){t.socket.emit("event",{type:"player_enter_request",player:e})}))}},{key:"handleServerEvent",value:function(e){var t=this;switch(e.type){case"player_enter":console.log("player_enter: ",e.player),this.state.players[e.player.id]=e.player,this.updatePlayers(this.getPlayersArray());break;case"player_exit":this.state.players[e.player.id]&&(delete this.state.players[e.player.id],this.updatePlayers(this.getPlayersArray()));break;case"full_state_request":this.socket.emit("event",{type:"full_state_response",state:this.state});break;case"full_state_update":this.state=e.state,this.updatePlayers(this.getPlayersArray());break;case"input_key_down":console.log("GOT SERVER KEY DOWN",e,"(playerId)",this.localPlayerId),this.serverKeyDown(e);break;case"input_key_up":this.serverKeyUp(e);break;case"input_mouse_move":case"input_click":break;case"chat_message":if(!this.state.players[e.playerId])break;var a=this.state.players[e.playerId],n=Object(m.a)({},e,{player:a}),s=5e3+1e3*Math.floor(n.message.length/100);this.state.players=Object(m.a)({},this.state.players,Object(d.a)({},e.playerId,b.addMessage(a,n))),setTimeout((function(){t.state.players=Object(m.a)({},t.state.players,Object(d.a)({},e.playerId,b.removeOldestMessage(t.state.players[e.playerId]))),t.updatePlayers(Object.values(t.state.players))}),s),this.messages=this.messages.concat(n),this.updateMessagesFunc(this.messages),this.updatePlayers(Object.values(this.state.players));break;default:console.log("unrecognized server event: ",e)}}},{key:"getPlayersArray",value:function(){var e=this;return Object.keys(this.state.players).map((function(t){return e.state.players[t]}))}},{key:"serverKeyDown",value:function(e){if(e.playerId!==this.localPlayerId){var t=e.key;this.state.players[e.playerId].keyStates[t]=!0,console.log("just set that keystate down for: ",t)}}},{key:"serverKeyUp",value:function(e){if(e.playerId!==this.localPlayerId){var t=e.key;this.state.players[e.playerId].keyStates[t]=!1}}},{key:"localKeyDown",value:function(t){var a=t.key;e.RECOGNIZED_KEYS.includes(a)&&(this.state.players[this.localPlayerId].keyStates[a]=!0,this.socket.emit("event",{type:"input_key_down",playerId:this.localPlayerId,key:a}))}},{key:"localKeyUp",value:function(t){var a=t.key;e.RECOGNIZED_KEYS.includes(a)&&(this.state.players[this.localPlayerId].keyStates[a]=!1,this.socket.emit("event",{type:"input_key_up",playerId:this.localPlayerId,key:a}))}},{key:"localMouseMove",value:function(e){}},{key:"localClick",value:function(e){this.socket.emit("event",{type:"input_click",playerId:this.localPlayerId})}},{key:"sendChatMessage",value:function(e){this.socket.emit("event",{type:"chat_message",message:e,playerId:this.localPlayerId,time:new Date})}}]),e}();w.RECOGNIZED_KEYS=["a","w","s","d","f","e","q"],w.KEY_TO_DIRECTION={a:"left",w:"up",s:"down",d:"right"};var E=w,O=a(45),S=a.n(O),j=a(76),x=a(49),M={moveForward:!1,moveBackward:!1,moveLeft:!1,moveRight:!1,crouch:!1,jump:!1,attack:!1},I=function(){function e(){Object(h.a)(this,e)}return Object(y.a)(e,null,[{key:"init",value:function(){var e=this,t={baseUrl:"models/ogro/",body:"ogro.md2",skins:["grok.jpg","ogrobase.png","arboshak.png","ctf_r.png","ctf_b.png","darkam.png","freedom.png","gib.png","gordogh.png","igdosh.png","khorne.png","nabogro.png","sharokh.png"],weapons:[["weapon.md2","weapon.jpg"]],animations:{move:"run",idle:"stand",jump:"jump",attack:"attack",crouchMove:"cwalk",crouchIdle:"cstand",crouchAttach:"crattack"},walkSpeed:500,crouchSpeed:175};this.skinCount=t.skins.length,this.base=new x.a,this.base.scale=4,this.basePromise=new Promise((function(t,a){e.base.onLoadComplete=function(){e.base.enableShadows(!0),e.base.setSkin(2),t(e.base)}})),this.base.loadParts(t)}},{key:"customizeMovement",value:function(e){var t;e.updateMovementModel=(t=e,function(e){t.angularSpeed=4;var a=t.controls;if(a.crouch?t.maxSpeed=t.crouchSpeed:t.maxSpeed=t.walkSpeed,t.maxReverseSpeed=-t.maxSpeed,a.moveForward&&(t.speed=t.maxSpeed),a.moveBackward&&(t.speed=t.maxReverseSpeed),a.moveLeft&&(t.bodyOrientation+=e*t.angularSpeed,t.speed=c.MathUtils.clamp(t.speed+1*e*t.frontAcceleration,t.maxReverseSpeed,t.maxSpeed)),a.moveRight&&(t.bodyOrientation-=e*t.angularSpeed,t.speed=c.MathUtils.clamp(t.speed+1*e*t.frontAcceleration,t.maxReverseSpeed,t.maxSpeed)),!a.moveForward&&!a.moveBackward)if(t.speed>0){var n=k.exponentialEaseOut(t.speed/t.maxSpeed);t.speed=c.MathUtils.clamp(t.speed-n*e*t.frontDecceleration,0,t.maxSpeed)}else{var s=k.exponentialEaseOut(t.speed/t.maxReverseSpeed);t.speed=c.MathUtils.clamp(t.speed+s*e*t.backAcceleration,t.maxReverseSpeed,0)}var o=t.speed*e;t.root.position.x+=Math.sin(t.bodyOrientation)*o,t.root.position.z+=Math.cos(t.bodyOrientation)*o,t.root.rotation.y=t.bodyOrientation})}},{key:"getModelInstance",value:function(){var e=Object(j.a)(S.a.mark((function e(){var t,a,n=arguments;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:this.instanceIndex,this.instanceIndex=(this.instanceIndex+1)%this.skinCount,(a=new x.a).scale=4,a.controls=this.getControlsCopy(),a.id=Math.random(),this.customizeMovement(a),e.next=9,this.basePromise.then((function(e){return a.shareParts(e),a.enableShadows(!0),a.setSkin(t),a.setWeapon(0),a}));case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getControlsCopy",value:function(){var e={};return Object.keys(M).forEach((function(t){return e[t]=M[t]})),e}}]),e}();I.instanceIndex=2,I.init();var _=I;a(176);var C=function(e){var t=e.player,a=e.messages,o=Object(n.useState)(null),r=Object(i.a)(o,2),c=r[0],l=r[1],u=Object(n.useState)(0),d=Object(i.a)(u,2),m=d[0],h=d[1];return Object(n.useEffect)((function(){_.getModelInstance().then((function(e){var a=k.computeCompositeBoundingBox(e.root);h(a.getSize().y),l(e),e.root.position.set(t.position.x,e.root.position.y,t.position.z)}))}),[]),Object(p.d)((function(e){c&&(c.controls.moveForward=t.keyStates.w,c.controls.moveBackward=t.keyStates.s,c.controls.moveLeft=t.keyStates.a,c.controls.moveRight=t.keyStates.d,c.controls.jump=t.keyStates.q,c.controls.attack=t.keyStates.f,c.update(.016),t.position.x=c.root.position.x,t.position.z=c.root.position.z)})),s.a.createElement("mesh",null,c&&s.a.createElement(s.a.Fragment,null,s.a.createElement("primitive",{object:c.root}),s.a.createElement(p.b,{center:!0,position:[t.position.x,t.position.y,t.position.z]},s.a.createElement("div",{className:"scene-label"},t.name)),a.map((function(e,a){return s.a.createElement(p.b,{key:e.time,center:!0,position:[t.position.x,t.position.y+1.25*m,t.position.z]},s.a.createElement("div",{style:{transform:"translateY(".concat(2.1*-a,"rem)")},className:"speech-bubble"},e.message))}))))},P=(a(182),a(215));var R=function(e){var t=e.sendChatMessage,a=e.messages,o=Object(n.useState)(""),r=Object(i.a)(o,2),c=r[0],l=r[1];return s.a.createElement("div",{className:"ChatWindow"},s.a.createElement("div",{className:"all-messages"},a.map((function(e){return s.a.createElement("div",{className:"chat-message",key:e.time},s.a.createElement("div",{className:"chat-message-name"},e.player.name,":"),s.a.createElement("div",{className:"chat-message-content"},e.message))}))),s.a.createElement(P.c,{className:"your-message",placeholder:"your message...",large:!0,onKeyDown:function(e){13===e.which&&(t(c),l(""))},value:c,onChange:function(e){return l(e.target.value)}}))};a(209);Object(p.c)({OrbitControls:u.a});var N=new l.a,B=function(e){var t=e.playground,a=Object(p.e)(),s=a.camera,o=a.gl;return Object(p.d)((function(){return N.update()})),Object(n.useEffect)((function(){o.domElement.appendChild(N.dom);var e=new u.a(s,o.domElement);return e.target.set(0,50,0),function(){e.dispose()}}),[s,o]),Object(n.useEffect)((function(){o.domElement.onclick=function(e){t&&t.localClick(e)},o.domElement.onkeydown=function(e){t&&t.localKeyDown(e)},o.domElement.onkeyup=function(e){t&&t.localKeyUp(e)},o.domElement.onmousemove=function(e){t&&t.localMouseMove(e)}}),[o,t]),null};var K=function(e){var t=e.player,a=Object(n.useState)([]),o=Object(i.a)(a,2),r=o[0],l=o[1],u=Object(n.useState)([]),d=Object(i.a)(u,2),m=d[0],h=d[1],y=Object(n.useState)(null),v=Object(i.a)(y,2),g=v[0],f=v[1],k=Object(n.useMemo)((function(){return(new c.TextureLoader).load("grasslight-big.jpg")}),[]);return Object(n.useEffect)((function(){f(new E(t,(function(e){return l(e)}),(function(e){return h(e)})))}),[t]),s.a.createElement("div",{className:"main-canvas-container"},s.a.createElement(p.a,{style:{backgroundColor:"#789"},gl:{antialias:!1,alpha:!0},pixelRatio:window.devicePixelRatio,camera:{position:[0,150,1300],near:1,far:4e3},shadowMap:!0,onCreated:function(e){var t=e.gl;t.toneMapping=c.ReinhardToneMapping,t.outputEncoding=c.sRGBEncoding,t.shadowMap.type=c.PCFSoftShadowMap}},s.a.createElement(B,{playground:g}),s.a.createElement("fog",{attach:"fog",args:[7833753,1e3,4e3]}),s.a.createElement("ambientLight",{args:[8947848]}),s.a.createElement("directionalLight",{args:[16777215,8],position:[250,4500,500],"shadow-camera-left":-1e3,"shadow-camera-bottom":-1e3,"shadow-camera-right":1e3,"shadow-camera-top":1e3,"shadow-camera-near":1,"shadow-camera-far":12e3,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,castShadow:!0}),r.map((function(e){return s.a.createElement(C,{key:e.id,player:e,messages:e.visibleMessages})})),s.a.createElement("mesh",{receiveShadow:!0,"rotation-x":-Math.PI/2},s.a.createElement("planeBufferGeometry",{attach:"geometry",args:[16e3,16e3]}),s.a.createElement("meshLambertMaterial",{attach:"material",color:4478310},s.a.createElement("primitive",{attach:"map",object:k,repeat:[64,64],wrapS:c.RepeatWrapping,wrapT:c.RepeatWrapping,encoding:c.sRGBEncoding})))),g&&s.a.createElement(R,{sendChatMessage:g.sendChatMessage.bind(g),messages:m}))};a(210);var D=function(e){var t=e.logIn,a=Object(n.useState)(""),o=Object(i.a)(a,2),r=o[0],c=o[1];return s.a.createElement("div",{className:"login-container bp3-light"},s.a.createElement(P.b,{label:"Choose a name to use:"},s.a.createElement(P.c,{autoFocus:!0,placeholder:"name...",large:!0,onChange:function(e){var t=e.target.value||"";c(t)},onKeyDown:function(e){return 13===e.which?t(b.create(r)):""}})),s.a.createElement(P.a,{onClick:function(){t(b.create(r))}},"Join"))};a(211);var T=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)(null),c=Object(i.a)(r,2),l=c[0],u=c[1],p=function(e){u(e),o(!0)};return Object(n.useEffect)((function(){0}),[]),s.a.createElement("div",{className:"App bp3-dark"},l&&s.a.createElement(K,{player:l}),s.a.createElement("div",{className:"screen-container"},!a&&s.a.createElement(D,{logIn:p})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[138,1,2]]]);
//# sourceMappingURL=main.27d4aac9.chunk.js.map