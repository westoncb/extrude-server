(this["webpackJsonpextrude-client"]=this["webpackJsonpextrude-client"]||[]).push([[0],{134:function(e,t,a){e.exports=a(205)},138:function(e,t,a){},168:function(e,t){},171:function(e,t,a){},177:function(e,t,a){},204:function(e,t,a){},205:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),c=a.n(o),i=(a(138),a(4)),l=a(1),s=a(71),u=a(43),p=a(21),h=a(11),m=a(31),d=a(72),y=a.n(d),v=function(){function e(){Object(h.a)(this,e),this.root=new l.Object3D}return Object(m.a)(e,[{key:"startPlayerMovement",value:function(e,t){}},{key:"stopPlayerMovement",value:function(e,t){}}]),e}(),g=function(){function e(t){Object(h.a)(this,e),this.player=null,this.socket=null,this.renderer=new v,this.allPlayers=[],this.player={id:1,name:"weston"},this.setPlayers=t,console.log("CONSTRUCT!!!"),this.connectToServer(this.player)}return Object(m.a)(e,[{key:"connectToServer",value:function(e){var t=this;this.socket=y()("https://nameless-depths-23573.herokuapp.com"),this.socket.emit("event",{type:"player_enter_request",player:e}),this.socket.on("event",(function(e){console.log("server event: ",e),t.handleServerEvent(e)}))}},{key:"handleServerEvent",value:function(e){switch(e.type){case"player_enter":console.log("player_enter: ",e.player),this.allPlayers=this.allPlayers.concat(e.player),console.log("test",this.setPlayers,this.allPlayers),this.setPlayers&&this.setPlayers(this.allPlayers);break;case"player_exit":break;case"input_key_down":this.serverKeyDown(e);break;case"input_key_up":this.serverKeyUp(e);break;case"input_mouse_move":case"input_click":break;default:console.log("unrecognized server event: ",e)}}},{key:"serverKeyDown",value:function(t){this.renderer.startPlayerMovement(t.playerId,e.KEY_TO_DIRECTION[t.key])}},{key:"serverKeyUp",value:function(t){this.renderer.stopPlayerMovement(t.playerId,e.KEY_TO_DIRECTION[t.key])}},{key:"localKeyDown",value:function(t){var a=t.key;e.RECOGNIZED_KEYS.includes(a)&&this.socket.emit("event",{type:"input_key_down",playerId:this.player.id,key:a})}},{key:"localKeyUp",value:function(t){var a=t.key;e.RECOGNIZED_KEYS.includes(a)&&this.socket.emit("event",{type:"input_key_up",playerId:this.player.id,key:a})}},{key:"localMouseMove",value:function(e){this.socket.emit("event",{type:"input_mouse_move",playerId:this.player.id})}},{key:"localClick",value:function(e){this.socket.emit("event",{type:"input_click",playerId:this.player.id})}}]),e}();g.RECOGNIZED_KEYS=["a","w","s","d"],g.KEY_TO_DIRECTION={a:"left",w:"up",s:"down",d:"right"};var f=g,k=a(80);var b=function(e){e.id,e.name;var t=Object(n.useMemo)((function(){var e=new k.a;return e.scale=3,e.loadParts({baseUrl:"models/ogro/",body:"ogro.md2",skins:["grok.jpg","ogrobase.png","arboshak.png","ctf_r.png","ctf_b.png","darkam.png","freedom.png","gib.png","gordogh.png","igdosh.png","khorne.png","nabogro.png","sharokh.png"],weapons:[["weapon.md2","weapon.jpg"]],animations:{move:"run",idle:"stand",jump:"jump",attack:"attack",crouchMove:"cwalk",crouchIdle:"cstand",crouchAttach:"crattack"},walkSpeed:350,crouchSpeed:175}),e.root.position.set(100*Math.random(),0,100*Math.random()),e.root}),[]);return r.a.createElement("mesh",null,r.a.createElement("primitive",{object:t,position:[0,0,0]}))};a(171);Object(p.b)({OrbitControls:u.a});var w=window.innerWidth,E=window.innerHeight,O=new s.a,j=function(){var e=Object(p.c)(),t=e.camera,a=e.gl;return Object(p.d)((function(){return O.update()})),Object(n.useEffect)((function(){a.domElement.appendChild(O.dom);var e=new u.a(t,a.domElement);return e.target.set(0,50,0),function(){e.dispose()}}),[t,a]),null};var _=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],o=t[1],c=Object(n.useMemo)((function(){return(new l.TextureLoader).load("grasslight-big.jpg")}),[]),s=Object(n.useMemo)((function(){return new f((function(e){return o(e)}))}),[]);return r.a.createElement(p.a,{style:{backgroundColor:"#123"},gl:{antialias:!1,alpha:!0},pixelRatio:window.devicePixelRatio,camera:{position:[0,150,1300],near:1,far:4e3},size:[w,E]},r.a.createElement(j,null),r.a.createElement("fog",{attach:"fog",args:[1122867,1e3,4e3]}),r.a.createElement("ambientLight",{args:[2236962]}),r.a.createElement("directionalLight",{args:[16777215,2.25],position:l.Vector3(200,450,500),"shadow-camera-left":-1e3,"shadow-camera-bottom":-350,"shadow-camera-right":1e3,"shadow-camera-top":350,"shadow-camera-near":100,"shadow-camera-far":1200,"shadow-mapSize-width":1024,"shadow-mapSize-height":512,castShadow:!0}),s&&a.map((function(e){return r.a.createElement(b,{key:e.id,id:e.id,name:e.name})})),r.a.createElement("mesh",{receiveShadow:!0,"rotation-x":-Math.PI/2},r.a.createElement("planeBufferGeometry",{attach:"geometry",args:[16e3,16e3]}),r.a.createElement("meshLambertMaterial",{attach:"material",color:4478310},r.a.createElement("primitive",{attach:"map",object:c,repeat:[64,64],wrapS:l.RepeatWrapping,wrapT:l.RepeatWrapping,encoding:l.sRGBEncoding}))))},S=(a(177),a(209));var I=function(e){var t=e.logIn,a=Object(n.useState)(""),o=Object(i.a)(a,2),c=(o[0],o[1]);return r.a.createElement("div",{className:"login-container bp3-light"},r.a.createElement(S.b,{label:"Choose a name to use:"},r.a.createElement(S.c,{placeholder:"name...",large:!0,onChange:function(e){var t=e.target.value||"";c(t)}})),r.a.createElement(S.a,{onClick:function(){t()}},"Join"))};a(204);var P=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(null),l=Object(i.a)(c,2),s=(l[0],l[1]),u=Object(n.useState)(null),p=Object(i.a)(u,2),h=p[0],m=(p[1],function(e){s(e),o(!0)});return Object(n.useEffect)((function(){0}),[]),r.a.createElement("div",{className:"App bp3-dark"},r.a.createElement(_,{playground:h}),r.a.createElement("div",{className:"overlay"},!a&&r.a.createElement(I,{logIn:m})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[134,1,2]]]);
//# sourceMappingURL=main.cacc5517.chunk.js.map