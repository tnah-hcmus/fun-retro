(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"37Ea":function(n,t,e){var r=e("LboF"),a=e("nEs9");"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[n.i,a,""]]);var i={insert:"head",singleton:!1};r(a,i);n.exports=a.locals||{}},ERIh:function(n,t,e){"use strict";e.r(t);function a(n){var t=n.winning&&n.winning.line.includes(n.id)?"square square-winning":"square";return s.a.createElement("button",{className:t,onClick:n.onClick},n.value)}function r(r){return s.a.createElement("div",null,N()(r.squares,3).map(function(n,e){return s.a.createElement("div",{key:e,className:"board-row"},n.map(function(n,t){return s.a.createElement(a,{key:t+3*e,value:n,id:t+3*e,winning:r.winning,onClick:function(){return r.handleClick(e,t)}})}))}))}var i=e("q1tI"),s=e.n(i),o=e("i8i4"),l=e.n(o),u=e("lwsE"),c=e.n(u),f=e("W8MJ"),h=e.n(f),g=e("PJYZ"),p=e.n(g),d=e("7W2i"),m=e.n(d),y=e("a1gu"),v=e.n(y),w=e("Nsbk"),k=e.n(w),E=e("lSNA"),b=e.n(E),x=e("J4zp"),q=e.n(x),C=function(n){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],e=0;e<t.length;e++){var r=q()(t[e],3),a=r[0],i=r[1],s=r[2];if(n[a]&&n[a]===n[i]&&n[a]===n[s])return{line:t[e].slice(),winner:n[a]}}return null},T=e("kcif"),N=e.n(T);function S(r){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var n,t,e=k()(r);return t=a?(n=k()(this).constructor,Reflect.construct(e,arguments,n)):e.apply(this,arguments),v()(this,t)}}var P=function(n){m()(i,n);var a=S(i);function i(){var n;c()(this,i);for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return n=a.call.apply(a,[this].concat(e)),b()(p()(n),"players",["X","O"]),b()(p()(n),"state",{history:[{squares:Array(9).fill(null),status:""}],nowPlaying:n.players[0],nowTicking:"",winning:null,step:0,sort:!1}),n}return h()(i,[{key:"handleClick",value:function(n,t){var e,r=3*n+t,a="{".concat(n,";").concat(t,"}"),i=this.state.history.slice(0,this.state.step+1),s=i.length,o=i[s-1].squares.slice();C(o)||o[r]||(o[r]=this.state.nowPlaying,e=C(o),this.setState({history:i.concat({squares:o,status:a}),nowPlaying:this.players[s%2],nowTicking:a,winning:e||null,step:s}))}},{key:"getGameStatus",value:function(){var n=this.state.winning;return n?"Winner: "+n.winner:9<=this.state.step?"Two player draw!":"Next player: "+this.state.nowPlaying}},{key:"allMoveButton",value:function(){var r=this,n=this.state.history.map(function(n,t){var e=t?"Go to move #".concat(t,"; Tick at ").concat(n.status):"Go to game start";return t===r.state.step&&(e=s.a.createElement("b",null,e)),s.a.createElement("li",{key:t},s.a.createElement("button",{onClick:function(){return r.jumpTo(t)}},e))});return this.state.sort?n.reverse():n}},{key:"getTurnStatus",value:function(){return""!==this.state.nowTicking?"".concat(this.players[(this.state.step-1)%2]," tick at ").concat(this.state.nowTicking," in his turn"):"The game isn't start yet"}},{key:"jumpTo",value:function(n){var t=this.state.history[n].squares.slice(),e=C(t);this.setState({squares:t,nowPlaying:this.players[n%2],winning:e||null,step:n})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"game"},s.a.createElement("div",{className:"game-board"},s.a.createElement("div",{className:"status"},this.getGameStatus()),s.a.createElement("div",{className:"status"},this.getTurnStatus()),s.a.createElement(r,{squares:this.state.history[this.state.step].squares,handleClick:function(n,t){return e.handleClick(n,t)},winning:this.state.winning})),s.a.createElement("div",{className:"game-info"},s.a.createElement("div",null,status),s.a.createElement("ol",null,s.a.createElement("button",{onClick:function(){return e.setState({sort:!e.state.sort})}},this.state.sort?"Descending order":"Ascending order"),this.allMoveButton())))}}]),i}(s.a.Component);e("37Ea");l.a.render(s.a.createElement(P,null),document.getElementById("root"))},nEs9:function(n,t,e){(t=e("JPst")(!1)).push([n.i,'body {\r\n    font: 14px "Century Gothic", Futura, sans-serif;\r\n    margin: 20px;\r\n  }\r\n  \r\n  ol, ul {\r\n    padding-left: 30px;\r\n  }\r\n  \r\n  .board-row:after {\r\n    clear: both;\r\n    content: "";\r\n    display: table;\r\n  }\r\n  \r\n  .status {\r\n    margin-bottom: 10px;\r\n  }\r\n  \r\n  .square {\r\n    background: #fff;\r\n    border: 1px solid #999;\r\n    float: left;\r\n    font-size: 24px;\r\n    font-weight: bold;\r\n    line-height: 34px;\r\n    height: 34px;\r\n    margin-right: -1px;\r\n    margin-top: -1px;\r\n    padding: 0;\r\n    text-align: center;\r\n    width: 34px;\r\n  }\r\n  .square-winning {\r\n    border: 3px solid red;\r\n  }\r\n  \r\n  .square:focus {\r\n    outline: none;\r\n  }\r\n  \r\n  .kbd-navigation .square:focus {\r\n    background: #ddd;\r\n  }\r\n  \r\n  .game {\r\n    display: flex;\r\n    flex-direction: row;\r\n  }\r\n  \r\n  .game-info {\r\n    margin-left: 20px;\r\n  }\r\n  ',""]),n.exports=t}},[["ERIh",2,1,3]]]);