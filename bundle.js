(()=>{"use strict";window.GameConstants={Fireball:{size:fireballSize||24,speed:getFireballSpeed||function(e){return e?2:5}},Wizard:{speed:wizardSpeed||2,width:wizardWidth||61,getHeight:getWizardHeight||function(e){return 1.377*e},getX:getWizardX||function(e){return e/3},getY:getWizardY||function(e){return e-100}}},window.Game=function(){var e=300,t=700,i=["Кекс","Катя","Игорь"],s={},n="-reversed";s[0]={width:61,height:84,url:"img/wizard.gif"},s[0+n]={width:61,height:84,url:"img/wizard-reversed.gif"},s[1]={width:24,height:24,url:"img/fireball.gif"};var r={0:function(i,s,n){s.keysPressed.UP&&i.y>0&&(i.direction=-9&i.direction,i.direction=4|i.direction,i.y-=i.speed*n*2),s.keysPressed.UP||i.y<e-i.height&&(i.direction=-5&i.direction,i.direction=8|i.direction,i.y+=i.speed*n/3),s.keysPressed.LEFT&&(i.direction=-3&i.direction,i.direction=1|i.direction,i.x-=i.speed*n),s.keysPressed.RIGHT&&(i.direction=-2&i.direction,i.direction=2|i.direction,i.x+=i.speed*n),i.y<0&&(i.y=0),i.y>e-i.height&&(i.y=e-i.height),i.x<0&&(i.x=0),i.x>t-i.width&&(i.x=t-i.width)},1:function(e,i,s){1&e.direction&&(e.x-=e.speed*s),2&e.direction&&(e.x+=e.speed*s),(e.x<0||e.x>t)&&(e.state=1)}},a={CONTINUE:0,WIN:1,FAIL:2,PAUSE:3,INTRO:4},o={0:function(e){return e.garbage.filter((function(e){return 1===e.type})).filter((function(e){return e.x<10&&e.y>240}))[0]?a.WIN:a.CONTINUE}},d={0:function(i){return i.objects.push({direction:2,height:window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),speed:window.GameConstants.Wizard.speed,sprite:s[0],state:0,type:0,width:window.GameConstants.Wizard.width,x:window.GameConstants.Wizard.getX(t),y:window.GameConstants.Wizard.getY(e)}),i}},l=function(e){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._pauseListener=this._pauseListener.bind(this),this.setDeactivated(!1)};l.prototype={level:0,setDeactivated:function(e){this._deactivated!==e&&(this._deactivated=e,e?this._removeGameListeners():this._initializeGameListeners())},getInitialState:function(){return{currentStatus:a.CONTINUE,garbage:[],lastUpdated:null,keysPressed:{ESC:!1,LEFT:!1,RIGHT:!1,SPACE:!1,UP:!1},levelStartTime:null,objects:[],startTime:null}},initializeLevelAndStart:function(e){(e=void 0===e||e)||!this.state?(this._imagesArePreloaded=void 0,this.state=this.getInitialState(),this.state=d[this.level](this.state)):this.state.currentStatus=a.CONTINUE,this.state.levelStartTime=Date.now(),this.state.startTime||(this.state.startTime=this.state.levelStartTime),this._preloadImagesForLevel(function(){this.render(),this._initializeGameListeners(),this.update()}.bind(this))},pauseLevel:function(e){e&&(this.state.currentStatus=e),this.state.keysPressed.ESC=!1,this.state.lastUpdated=null,this._removeGameListeners(),window.addEventListener("keydown",this._pauseListener),this._drawPauseScreen()},_pauseListener:function(e){if(32===e.keyCode&&!this._deactivated){e.preventDefault();var t=this.state.currentStatus===a.WIN||this.state.currentStatus===a.FAIL;this.initializeLevelAndStart(t),window.removeEventListener("keydown",this._pauseListener)}},_drawPauseScreen:function(){var e;switch(this.state.currentStatus){case a.WIN:if(window.renderStatistics){var t=this._generateStatistics(new Date-this.state.startTime),i=this._shuffleArray(Object.keys(t));return void window.renderStatistics(this.ctx,i,i.map((function(e){return t[e]})))}e="Вы победили Газебо!\nУра!";break;case a.FAIL:e="Вы проиграли!";break;case a.PAUSE:e="Игра на паузе!\nНажмите Пробел, чтобы продолжить";break;case a.INTRO:e="Добро пожаловать!\nНажмите Пробел для начала игры"}this._drawMessage(e)},_generateStatistics:function(e){for(var t={Вы:e},s=0;s<i.length;s++){var n=e+(3e3*Math.random()-1500);n<1e3&&(n=1e3),t[i[s]]=n}return t},_shuffleArray:function(e){for(var t=e.length-1;t>0;t--){var i=Math.floor(Math.random()*(t+1)),s=e[t];e[t]=e[i],e[i]=s}return e},_drawMessage:function(e){var t=this.ctx,i=function(e,i,s,n){t.beginPath(),t.moveTo(e,i),t.lineTo(e+10,i+n/2),t.lineTo(e,i+n),t.lineTo(e+s/2,i+n-10),t.lineTo(e+s,i+n),t.lineTo(e+s-10,i+n/2),t.lineTo(e+s,i),t.lineTo(e+s/2,i+10),t.lineTo(e,i),t.stroke(),t.closePath(),t.fill()};t.fillStyle="rgba(0, 0, 0, 0.7)",i(190,40,320,100),t.fillStyle="rgba(256, 256, 256, 1.0)",i(180,30,320,100),t.fillStyle="#000",t.font="16px PT Mono",e.split("\n").forEach((function(e,i){t.fillText(e,200,80+20*i)}))},_preloadImagesForLevel:function(e){if(void 0===this._imagesArePreloaded&&(this._imagesArePreloaded=[]),this._imagesArePreloaded[this.level])e();else for(var t=Object.keys(s),i=t.length,n=this,r=function(t){var s=new Image(t.width,t.height);s.onload=function(){t.image=s,0==--i&&(n._imagesArePreloaded[n.level]=!0,e())},s.src=t.url},a=0;a<t.length;a++)r(s[t[a]])},updateObjects:function(e){var t=this.state.objects.filter((function(e){return 0===e.type}))[0];this.state.keysPressed.SHIFT&&(this.state.objects.push({direction:t.direction,height:window.GameConstants.Fireball.size,speed:window.GameConstants.Fireball.speed(!!(1&t.direction)),sprite:s[1],type:1,width:window.GameConstants.Fireball.size,x:2&t.direction?t.x+t.width:t.x-window.GameConstants.Fireball.size,y:t.y+t.height/2}),this.state.keysPressed.SHIFT=!1),this.state.garbage=[];var i=this.state.objects.filter((function(t){return r[t.type](t,this.state,e),1!==t.state||(this.state.garbage.push(t),!1)}),this);this.state.objects=i},checkStatus:function(){if(this.state.currentStatus===a.CONTINUE){this.commonRules||(this.commonRules=[function(e){return 1===e.objects.filter((function(e){return 0===e.type}))[0].state?a.FAIL:a.CONTINUE},function(e){return e.keysPressed.ESC?a.PAUSE:a.CONTINUE},function(e){return Date.now()-e.startTime>18e4?a.FAIL:a.CONTINUE}]);for(var e=this.commonRules.concat(o[this.level]),t=a.CONTINUE;t===a.CONTINUE&&e.length;)t=e.shift()(this.state);this.state.currentStatus=t}},setGameStatus:function(e){this.state.currentStatus!==e&&(this.state.currentStatus=e)},render:function(){this.ctx.clearRect(0,0,t,e),this.state.objects.forEach((function(e){if(e.sprite){var t=1&e.direction,i=s[e.type+(t?n:"")]||s[e.type];this.ctx.drawImage(i.image,e.x,e.y,e.width,e.height)}}),this)},update:function(){this.state.lastUpdated||(this.state.lastUpdated=Date.now());var e=(Date.now()-this.state.lastUpdated)/10;switch(this.updateObjects(e),this.checkStatus(),this.state.currentStatus){case a.CONTINUE:this.state.lastUpdated=Date.now(),this.render(),requestAnimationFrame(function(){this.update()}.bind(this));break;case a.WIN:case a.FAIL:case a.PAUSE:case a.INTRO:this.pauseLevel()}},_onKeyDown:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!0;break;case 39:this.state.keysPressed.RIGHT=!0;break;case 38:this.state.keysPressed.UP=!0;break;case 27:this.state.keysPressed.ESC=!0}e.shiftKey&&(this.state.keysPressed.SHIFT=!0)},_onKeyUp:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!1;break;case 39:this.state.keysPressed.RIGHT=!1;break;case 38:this.state.keysPressed.UP=!1;break;case 27:this.state.keysPressed.ESC=!1}e.shiftKey&&(this.state.keysPressed.SHIFT=!1)},_initializeGameListeners:function(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp)},_removeGameListeners:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)}},l.Verdict=a;var c=new l(document.querySelector(".demo"));return window.restartGame=function(e,t){s[0].url=e,s[0+n].url=t,c.initializeLevelAndStart(),c.setGameStatus(a.INTRO)},window.restartGame("img/wizard.gif","img/wizard-reversed.gif"),c}(),window.util={getRandomArrayIndex:e=>e[Math.floor(Math.random()*e.length)],getPartOfArray:(e,t)=>(e=>{const t=e.slice();for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1)),s=t[e];t[e]=t[i],t[i]=s}return t})(e).slice(0,t),getMaxElement:function(e){let t=e[0];for(let i=1;i<e.length;i++)e[i]>t&&(t=e[i]);return t},showErrorMessage:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},throttle:function(e,t=1500){let i=null;return function(...s){null===i&&(i=window.setTimeout((function(){e(...s),i=null}),t))}}},(()=>{const e="https://javascript.pages.academy/code-and-magick",t=(e,t,i)=>{e.addEventListener("load",(()=>{200===e.status?t(e.response):i(`Статус ответа: ${e.status} - ${e.statusText}`)})),e.addEventListener("error",(function(){i("Произошла ошибка соединения")})),e.addEventListener("timeout",(function(){i(`Запрос не успел выполниться за ${e.timeout} мс`)})),e.timeout=1e4};window.backend={download:(i,s)=>{const n=new XMLHttpRequest;n.responseType="json",t(n,i,s),n.open("GET",e+"/data"),n.send()},upload:(i,s,n)=>{const r=new XMLHttpRequest;r.responseType="json",t(r,s,n),r.open("POST",e),r.send(i)}}})(),(()=>{const e=document.querySelector(".setup"),t=e.querySelector(".setup-wizard-form"),i=e.querySelector(".upload"),s=e.querySelector(".setup-player"),n=e.querySelector(".setup-user-name"),r=document.querySelector(".setup-open"),a=r.querySelector(".setup-open-icon"),o=e.querySelector(".setup-close"),d=()=>{e.classList.remove("hidden"),window.backend.download(window.similar.onSuccessLoadData,window.similar.onFailedRequest),document.addEventListener("keydown",c),o.addEventListener("keydown",u),s.addEventListener("click",window.customize.onWizzardSetSettings)},l=()=>{e.classList.add("hidden"),document.removeEventListener("keydown",c),o.removeEventListener("keydown",u),s.removeEventListener("click",window.customize.onWizzardSetSettings)},c=e=>{"Escape"===e.key&&document.activeElement!==n&&(e.preventDefault(),l())},u=e=>{"Enter"===e.key&&l()},h=()=>{e.classList.add("hidden")};r.addEventListener("click",(()=>{d()})),a.addEventListener("keydown",(e=>{"Enter"===e.key&&d()})),o.addEventListener("click",(()=>{l()})),i.addEventListener("mousedown",(function(t){t.preventDefault();let s={x:t.clientX,y:t.clientY},n=!1;const r=t=>{t.preventDefault(),n=!0;let i=s.x-t.clientX,r=s.y-t.clientY;s={x:t.clientX,y:t.clientY},e.style.top=e.offsetTop-r+"px",e.style.left=e.offsetLeft-i+"px"},a=function(e){if(e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a),n){const e=t=>{t.preventDefault(),i.removeEventListener("click",e)};i.addEventListener("click",e)}};document.addEventListener("mousemove",r),document.addEventListener("mouseup",a)})),t.addEventListener("submit",(e=>{window.backend.upload(new FormData(t),h,window.similar.onFailedRequest),e.preventDefault()}))})(),(()=>{const e="#000000",t=function(e,t,i,s){e.fillStyle=s,e.fillRect(t,i,420,270)};window.renderStatistics=function(i,s,n){t(i,110,20,"rgba(0, 0, 0, 0.7)"),t(i,100,10,"#ffffff"),i.font="16px PT Mono",i.fillStyle=e,i.textBaseline="hanging",i.fillText("Ура вы победили!",120,30),i.fillText("Список результатов:",120,50);const r=function(e){let t=e[0];for(let i=1;i<e.length;i++)e[i]>t&&(t=e[i]);return t}(n);for(let t=0;t<s.length;t++){const a=140+90*t,o=150*n[t]/r;i.fillStyle=e,i.fillText(s[t],a,250),i.fillText(Math.round(n[t]),a,250-o-30),i.fillStyle="Вы"===s[t]?"rgba(255, 0, 0, 1)":`hsl(240, ${Math.round(100*Math.random())}%, 50%)`,i.fillRect(a,240,40,-o)}}})(),window.similar={onFailedRequest:e=>{window.util.showErrorMessage(e)},onSuccessLoadData:e=>{window.sourceData=e,window.customize.sortWizardsData(window.sourceData)}},(()=>{const e=["rgb(101, 137, 164)","rgb(241, 43, 107)","rgb(146, 100, 161)","rgb(56, 159, 117)","rgb(215, 210, 55)","rgb(0, 0, 0)"],t=["black","red","blue","yellow","green"],i=["#ee4830","#30a8ee","#5ce6c0","#e848d5","#e6e848"];let s="rgb(101, 137, 164)",n="black";const r=document.querySelector(".setup"),a=r.querySelector(".setup-player"),o=r.querySelector(".setup-user-name"),d=a.querySelector('[name="coat-color"]'),l=a.querySelector('[name="eyes-color"]'),c=a.querySelector('[name="fireball-color"]'),u=a.querySelector(".setup-wizard .wizard-coat"),h=a.querySelector(".setup-wizard .wizard-eyes"),w=a.querySelector(".setup-fireball"),m=e=>{let t=0;return e.colorCoat===s&&(t+=2),e.colorEyes===n&&(t+=1),t},f=e=>{window.render.renderWizards(e.sort((function(e,t){let i=m(t)-m(e);return 0===i&&(i=function(e,t){return e>t?1:e<t?-1:0}(e.name,t.name)),i})))},y=(e,t)=>{const i=e.value;let s=window.util.getRandomArrayIndex(t);for(;s===i;)s=window.util.getRandomArrayIndex(t);return s};o.addEventListener("change",(e=>{const t=e.target.value.length;t<2?o.setCustomValidity(`Ещё ${2-t} симв.`):t>25?o.setCustomValidity(`Удалите лишние ${t-25} симв.`):o.setCustomValidity(""),o.reportValidity()})),window.customize={onWizzardSetSettings:r=>{switch(r.target){case u:const a=y(d,e);d.value=a,r.target.style.fill=a,s=a,window.util.throttle((()=>{f(window.sourceData)}))();break;case h:const o=y(l,t);l.value=o,r.target.style.fill=o,n=o,window.util.throttle((()=>{f(window.sourceData)}))();break;case w:const m=y(c,i);c.value=m,r.target.style.backgroundColor=m}},sortWizardsData:f}})(),(()=>{const e=document.querySelector(".setup"),t=e.querySelector(".setup-similar-list"),i=e.querySelector(".setup-similar"),s=document.getElementById("similar-wizard-template").content.querySelector(".setup-similar-item"),n=e=>{const t=s.cloneNode(!0);return t.querySelector(".setup-similar-label").textContent=e.name,t.querySelector(".wizard-coat").style.fill=e.colorCoat,t.querySelector(".wizard-eyes").style.fill=e.colorEyes,t};window.render={renderWizards:e=>{const s=document.createDocumentFragment(),r=e.length>4?4:e.length;t.innerHTML="";for(let t=0;t<r;t++){const i=n(e[t]);s.appendChild(i)}t.appendChild(s),i.classList.remove("hidden")}}})()})();