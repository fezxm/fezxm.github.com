Object.extend=function(t,e){for(var i in e){t[i]=e[i]}return t};window.lib=window.lib||{};if(!lib.SITE_DOMAIN){var getDomain=function(){var t=2;var e=window.location.hostname.split(".");e=e.slice(e.length-t);return e.join(".")};lib.SITE_DOMAIN=getDomain()}lib.PROJECT_VERSION="20150721161658";lib.developer="dangyu";lib.action=lib.action||{};lib.action.Qa=function(){this.init=function(t){var e=this;var i=lib.SITE_DOMAIN.match(/pps/);try{var r;var o=navigator.userAgent.toLowerCase();this.par={};this.pars=[];this.custom={};this.filter=[];this.time=0;this.w=window;this.l=window.location;this.d=window.document;this.urlMap={rdm:"rdm",qtcurl:"qtcurl",rfr:"rfr",lrfr:"lrfr",jsuid:"jsuid",qtsid:"qtsid",ppuid:"ppuid",platform:"platform",weid:"weid",pru:"pru",flshuid:"flshuid",fcode:"fcode",ffcode:"ffcode",coop:"coop",odfrm:"odfrm"};this.cookieMap={flshuid:"QC005",jsuid:"QC006",pru:"P00PRU",lrfr:"QC007",qtsid:"QC008",QY_FC:"QC009",QY_FFC:"QC014",gaflag:"QC011",odfrm:"QC132"};t=t||{};this.times=t.times||5;this.timeouts=t.timeouts||1e3;this.url=t.url||window.location.protocol+"//msg.71.am/jspb.gif";if(this.url.indexOf("?")==-1){this.url+="?"}else if(this.url.slice(-1)!="&"){this.url+="&"}this.flag=t.flag||"QC010";this.callback=t.callback||function(){};if(typeof t.urlMap=="object"){Object.extend(this.urlMap,t.urlMap)}if(typeof t.cookieMap=="object"){Object.extend(this.cookieMap,t.cookieMap)}if(typeof t.custom=="object"){Object.extend(this.custom,t.custom)}if(t.filter instanceof Array){this.filter=t.filter}var n=this.urlMap;this.par[n.rdm]=this.rand();this.par[n.qtcurl]=this.u(this.l.href);this.par[n.rfr]=this.u(this.d.referrer);this.par[n.lrfr]=this.getLrfr();this.par[n.jsuid]=this.getJsuid();this.par[n.qtsid]=this.getQtsid();this.par[n.ppuid]=this.getUserInfoUid();this.par[n.platform]=/ipad/i.test(o)?"21":/iphone os/i.test(o)?"31":"11";if(i){this.par[n.platform]="20"+this.par[n.platform]}this.par[n.fcode]=this.getFc();this.par[n.ffcode]=this.getFfc();this.par[n.coop]=this.getCoop();this.par[n.weid]=this.getWeid();this.par[n.pru]=this.getPRU();Object.extend(this.par,this.custom);r=setTimeout(function(){var t=navigator.userAgent.toLowerCase();var i=/ipad/i.test(t)||/iphone os/i.test(t)||/lepad_hls/i.test(t);var o;if(lib.qa_postServerUID||e.time>=e.times||i){e.par[n.flshuid]=e.setFlashId(lib.qa_postServerUID||"");e.post();o=true}else{e.time+=1;o=false}if(o===false){r=setTimeout(arguments.callee,e.timeouts);return}},0);var s=this.queryToJson(this.l.href);var a=this.cookieMap[this.urlMap.odfrm];var c=s[this.urlMap.odfrm]||this.cookieGet(a)||"";if(c){c=c;this.par[n.odfrm]=c;this.cookieSet(a,c,0,"/",lib.SITE_DOMAIN);var f=this.d.getElementsByTagName("body")[0];var u=this.queryToJson(f.getAttribute("data-pb")||"")||{};u[n.odfrm]=c;var h=this.jsonToQuery(u);f.setAttribute("data-pb",h)}var l=document.getElementById("block-B");if(l&&l.getAttribute("data-pb")){var d=l.getAttribute("data-pb");var p=d.match(/(^|&)?tmplt=([^&]+)/i);if(p&&p[2]){e.par["tmplt"]=p[2]}}}catch(m){}};this.getUserInfoUid=function(){try{var userInfo=this.cookieGet("P00002");if(userInfo){userInfo=userInfo==window.JSON?window.JSON.parse(userInfo):eval("("+userInfo+")")}if(userInfo&&userInfo.uid){return userInfo.uid}else{return""}}catch(e){return""}};this.u=function(t){try{var e=encodeURIComponent;return e instanceof Function?e(t):escape(t)}catch(i){return""}};this.hash=function(t){try{var e=1,i=0;if(t){e=0;for(var r=t.length-1;r>=0;r--){i=t.charCodeAt(r);e=(e<<6&268435455)+i+(i<<14);i=e&266338304;e=i!==0?e^i>>21:e}}return e}catch(o){return""}};this.rand=function(t){try{var e=[];if(!isNaN(t)){for(var i=0;i<t;i++){e.push(Math.round(Math.random()*2147483647).toString(36))}}else{e.push(Math.round(Math.random()*2147483647))}return e.join("")}catch(r){return""}};this.cookieGet=function(t){var e=function(t){if(new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(t)){var e=new RegExp("(^| )"+t+"=([^;]*)(;|$)"),i=e.exec(document.cookie);if(i){return i[2]||""}}return""};try{t=e(t);if("string"==typeof t){if(t.length>1&&t=="deleted"){return""}else{return decodeURIComponent(t)||""}}else{return""}}catch(i){return""}};this.cookieSet=function(t,e,i,r,o,n){try{var s=[];s.push(t+"="+encodeURIComponent(e));if(i){var a=new Date;var c=a.getTime()+i*36e5;a.setTime(c);s.push("expires="+a.toGMTString())}if(r){s.push("path="+r)}if(o){s.push("domain="+o)}if(n){s.push(n)}document.cookie=s.join(";")}catch(f){return""}};this.getJsuid=function(){try{var t;var e=this.cookieMap.jsuid;t=this.cookieGet(e);if(!t||!isNaN(t)){t=this.rand(4)}this.cookieSet(e,t,365*24,"/",lib.SITE_DOMAIN);return t}catch(i){return""}};this.getQtsid=function(){try{var t,e=/^\d{10}\.\d{10}\.\d{10}\.\d+$/;var i=this.cookieMap.qtsid;var r=function(){return parseInt(new Date/1e3,10).toString()};t=this.cookieGet(i);if(this.cookieGet(this.flag)){return t}if(!e.test(t)){var o=r();t=[o,o,o,"1"]}else{t=t.split(".");t[1]=t[2];t[2]=r();t[3]=parseInt(t[3],10)+1}this.cookieSet(i,t.join("."),365*24,"/",lib.SITE_DOMAIN);return t}catch(n){return""}};this.getLrfr=function(){try{var t,e=this;var i=this.cookieMap.lrfr;var r=this.d.referrer.match(/http[s]?:\/\/([^\/]*)/);r=r?r[1]:"";t=this.cookieGet(i);t=t=="undefined"?"":t;var o=this.l.hostname;var n=r&&r.match(/i?qiyi\.com|pps\.tv/);var s=t;if(!t){if(!this.d.referrer||n){s="DIRECT"}else{s=this.u(this.d.referrer)}}else if(!this.d.referrer){s="DIRECT"}else if(r!==o&&r.indexOf(lib.SITE_DOMAIN)===-1){if(!n){s=this.u(this.d.referrer)}}this.cookieSet(i,s,0,"/",lib.SITE_DOMAIN);if(t!=s){this.syncCookie(o,i,s)}return s}catch(a){return""}};this.setFlashId=function(t){var e=this.cookieMap.flshuid;var i=this.cookieGet(e);if(t&&t!=i){this.cookieSet(e,t,365*24,"/",lib.SITE_DOMAIN)}return t};this.getFc=function(){try{var t=this.l.search.match(/[\?&]fc=([^&]*)(&|$)/i);var e=this.cookieMap.QY_FC;var i=this.cookieGet(e);if(i=="b22dab601821a896"){return i}if(t){t=t[1];this.cookieSet(e,t,0,"/",lib.SITE_DOMAIN)}else{t=this.cookieGet(e);if(!t||t=="undefined"){t=""}}return t}catch(r){return""}};this.getFfc=function(){try{var t=this.l.search.match(/[\?&]ffc=([^&]*)(&|$)/i);var e=this.cookieMap.QY_FFC;if(t){t=t[1];this.cookieSet(e,t,0,"/",lib.SITE_DOMAIN)}else{t=this.cookieGet(e);if(!t||t=="undefined"){t=""}}return t}catch(i){return""}};this.getCoop=function(){var t="";var e;if(this.l.host.split(".")[0]=="mini"){e=lib.$url(this.l.href,"app");e=e&&e["app"]||"";if(e){t="coop_"+e.replace("bdbrowser","bdexplorer")}}else{if(this.w.INFO&&this.w.INFO.flashVars&&this.w.INFO.flashVars.coop){t=this.w.INFO.flashVars.coop}}return t};this.getWeid=function(){return window.webEventID||""};this.getPRU=function(){return this.cookieGet("P00PRU")||""};this.post=function(){var t=this;try{t.pars=[];var e,i=t.filter.length,r;if(i===0){for(e in t.par){t.pars.push([e,t.par[e]].join("="))}}else{for(e=0;e<i;e++){r=t.filter[e];t.pars.push([r,t.par[r]].join("="))}}t.pars=t.pars.join("&");window.jsQa=new Image(1,1);window.jsQa.src=t.url+t.pars;t.cookieSet(t.flag,t.hash(t.pars),0,"/",lib.SITE_DOMAIN);t.callback()}catch(o){return""}};this.iframeRequest=function(t){var e=document.createElement("iframe");e.scrolling="no";e.style.display="none";e.frameborder=0;e.src=t;document.body.appendChild(e)};this.syncCookie=function(t,e,i){var r=this;var o;if(t.indexOf("iqiyi.com")!==-1){o="http://passport.pps.tv/pages/user/proxy.action"}else if(t.indexOf("pps.tv")!==-1){o="http://passport.iqiyi.com/pages/user/proxy.action"}if(o){setTimeout(function(){var t=o+"#"+e+"="+i;try{window.JSHandler.logToConsole("xxx")}catch(n){r.iframeRequest(t)}},0)}};this.queryToJson=function(t){var e=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"};t=t||this.l.href;var i=t.substr(t.lastIndexOf("?")+1),r=i.split("&"),o=r.length,n={},s=0,a,c,f,u;for(;s<o;s++){if(!r[s]){continue}u=r[s].split("=");a=u.shift();c=u.join("=");f=n[a];if("undefined"==typeof f){n[a]=c}else if(e(f)){f.push(c)}else{n[a]=[f,c]}}return n};this.jsonToQuery=function(t,e){var i=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"};var r=function(t,e){var i,r,o;if("function"==typeof e){for(r in t){if(t.hasOwnProperty(r)){o=t[r];i=e.call(t,o,r);if(i===false){break}}}}return t};var o=function(t){return String(t).replace(/[#%&+=\/\\\ \u3000\f\r\n\t]/g,function(t){return"%"+(256+t.charCodeAt()).toString(16).substring(1).toUpperCase()})};var n=[],s,a=e||function(t){return o(t)};r(t,function(t,e){if(i(t)){s=t.length;while(s--){n.push(e+"="+a(t[s],e))}}else{n.push(e+"="+a(t,e))}});return n.join("&")}};(function(){var t=new lib.action.Qa;try{t.init({url:window.location.protocol+"//msg.71.am/jpb.gif"})}catch(e){}})();(function(){var t=new lib.action.Qa;var e=t.cookieGet("QC001")=="1";var i=t.cookieGet("QC005");var r;if(e||!i||window.location.protocol=="https:"||lib.SITE_DOMAIN.match(/pps/)){return}t.cookieSet("QC001","1",24,"/",lib.SITE_DOMAIN);var o="324";var n={qiyi_cookie:i};var s={sid:i,p:"iqiyi"};var a="http://nsclick.baidu.com/v.gif",c=[],f="BD_QIYI_LOG_"+(new Date).getTime(),u=window[f]=new Image;c.push("pid="+o);for(r in n){c.push(r+"="+encodeURIComponent(n[r]))}u.src=a+"?"+c.join("&")+"&t="+(new Date).getTime();var h="http://cpro.baidu.com/cpro/ui/html/sync.htm",l=[],d="BD_QIYI_LOG_"+(new Date).getTime(),p=window[d]=new Image;for(r in s){l.push(r+"="+encodeURIComponent(s[r]))}p.src=h+"?"+l.join("&")+"&t="+(new Date).getTime();if(!parseInt(Math.random()*10,10)){var m="http://m.wrating.com/m.gif?a=&c=860010-2370010124&mcookie="+i,v="WRATING_LOG_"+(new Date).getTime(),g=window[v]=new Image;g.src=m+"&t="+(new Date).getTime()}if(!parseInt(Math.random()*5,10)){var w="http://irs09.com/t.htm?t=10762,12380,0,2,1&q="+i,b="IRS_LOG_"+(new Date).getTime(),y=window[b]=new Image;y.src=w+"&r="+(new Date).getTime()}})();(function(){var t=function(){var t=2;var e=window.location.hostname.split(".");e=e.slice(e.length-t);return e.join(".")}();var e=t.match(/pps/);var i="http://msg.71.am/b?t=20&p=10&p1=101"+("&pf="+(e?"20":"")+"1");var r=function(t,e){t=t||{};if(e.indexOf("?")==-1){e+="?"}else{e+="&"}var i=+new Date;t._=i;for(var r in t){if(t.hasOwnProperty(r)){e+=encodeURIComponent(r)+"="+encodeURIComponent(t[r])+"&"}}if(e[e.length-1]==="&"){e=e.slice(0,-1)}var o=new Image;o.src=e};function o(){var t=[];var e="block-";var i,r,o,n;var a="A".charCodeAt();var s=function(t){return document.getElementById(t)};var c=String.fromCharCode;var f;for(f=0;f<26;f++){i=c(a+f);o=e+i;n=s(o);if(n){n["__bid__"]=i;t.push(n)}}for(f=0;f<26;f++){r=c(a+f);var u=false;for(var h=0;h<26;h++){i=c(a+h);o=e+r+i;n=s(o);if(n){u=true;n["__bid__"]=r+i;t.push(n)}}if(!u){break}}return t}function n(){var t=[];var e="block-";var i=document.getElementsByTagName("qchunk"),r,o;for(var n=0,a=i.length;n<a;n++){r=i[n];o=r.id||"";if(o.substr(0,e.length).toLowerCase()==e){r["__bid__"]=o.substr(e.length);t.push(r)}}return t}function a(t,e,i){if(t._clickMapPBSent){return false}t._clickMapPBSent=true;if(e===i){e._c=1;return true}if(e._c>=1){e._c++;return false}else{if(typeof e._c!=="number"){e._c=1}else{e._c++}if(!e._adjustClickMap){var r=function(){this._c=0};e._adjustClickMap=r.bind(e);try{if(e.addEventListener){e.addEventListener("mousedown",e._adjustClickMap,false)}else{e.attachEvent("onmousedown",e._adjustClickMap)}}catch(o){}}}return true}var s=function(t){t=t||window.event;var e=t.target||t.srcElement;var o=t.currentTarget||this;if(!a(t,e,o)){return}var n=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop;var s=document.documentElement&&document.documentElement.scrollLeft||document.body.scrollLeft;var c=document.documentElement&&document.documentElement.scrollWidth||document.body.scrollWidth;var f=document.documentElement&&document.documentElement.scrollHeight||document.body.scrollHeight;var u=document.documentElement&&document.documentElement.clientHeight||document.body.clientHeight;var h=document.documentElement&&document.documentElement.clientWidth||document.body.clientWidth;var l=Math.max(f,u);var d=Math.max(c,h);var p=this["__bid__"]||"";var m=v(document.getElementsByTagName("body")[0].getAttribute("data-pb"),"&");var w=v(this.getAttribute("data-pb"),"&");var b,y,_;do{b=e;y=b.getAttribute("rseat");_=b.tagName.toUpperCase();e=e.parentNode;if(b==this){break}}while(!y&&_!=="A"&&_!=="IMG");var I=v(b.getAttribute("data-pb"),"&");var k,C,M;if(y){I.rseat=y}if(_==="A"){k=b.title||"";C="a";M=b.getAttribute("href")||""}else if(_==="IMG"){k=b.alt||"";C="i";M=""}else{k=b.title||"";C="e";M=""}var j,O,S,A;A=v(document.cookie,";");j=A["P00003"]||"";O=A["QC005"]||"";S=A["QC006"]||"";var E={block:p,rt:C,r:k,rlink:M,pu:decodeURIComponent(j),u:decodeURIComponent(O),jsuid:decodeURIComponent(S),ce:window.webEventID||"",re:d+"*"+l,clkx:t.clientX+s,clky:t.clientY+n,tm:window.__qlt&&window.__qlt.statisticsStart?new Date-window.__qlt.statisticsStart:""};r(g(E,m,w,I),i)};var c=o();var f=n();var u,h;for(var l=0,d=c.length;l<d;l++){if(f.indexOf(c[l])==-1){f.push(c[l])}}var p=document.getElementsByTagName("body")[0];p.__bid__="body";f.push(p);var m=function(t){var e=f||[];if(t&&t.data){e=t.data.down("[data-block-name]")||[];if(e.length===0){return}var i="block-";e.forEach(function(t){t["__bid__"]=t.id.substr(i.length)})}for(var r=0,o=e.length;r<o;r++){var n=e[r];var a=Q(n);if(a.attr("data-asyn-pb")){continue}var c=s.bind(n);if(n.addEventListener){n.addEventListener("mousedown",c,false)}else{n.attachEvent("onmousedown",c)}a.attr("data-asyn-pb","true")}};Q.$(window).on("scroll",m);Q.$(window).on("resize",m);Q.event.customEvent.on("bindingPingback",m);m();function v(t,e){var i={};e=e||"&";if(t){var r=t.split(e),o;for(var n=0,a=r.length;n<a;n++){o=r[n];if(o){o=o.split(/\s*=\s*/g);if(o[0]){i[o[0].replace(/^\s*|\s*$/g,"")]=o[1]||""}}}}return i}function g(t,e){var i=t||{};var r;for(var o=1,n=arguments.length;o<n;o++){r=arguments[o];if(r){for(var a in r){if(r.hasOwnProperty(a)){i[a]=r[a]}}}}return i}})();