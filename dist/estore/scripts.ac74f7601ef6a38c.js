(function(){var h,b,f,v,m,d=function(o,t){return function(){return o.apply(t,arguments)}},S=[].indexOf||function(o){for(var t=0,e=this.length;e>t;t++)if(t in this&&this[t]===o)return t;return-1};b=function(){function o(){}return o.prototype.extend=function(t,e){var n;for(n in e)null==t[n]&&(t[n]=e[n]);return t},o.prototype.isMobile=function(t){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)},o.prototype.createEvent=function(t,e,n,r){var i;return null==e&&(e=!1),null==n&&(n=!1),null==r&&(r=null),null!=document.createEvent?(i=document.createEvent("CustomEvent")).initCustomEvent(t,e,n,r):null!=document.createEventObject?(i=document.createEventObject()).eventType=t:i.eventName=t,i},o.prototype.emitEvent=function(t,e){return null!=t.dispatchEvent?t.dispatchEvent(e):e in(null!=t)?t[e]():"on"+e in(null!=t)?t["on"+e]():void 0},o.prototype.addEvent=function(t,e,n){return null!=t.addEventListener?t.addEventListener(e,n,!1):null!=t.attachEvent?t.attachEvent("on"+e,n):t[e]=n},o.prototype.removeEvent=function(t,e,n){return null!=t.removeEventListener?t.removeEventListener(e,n,!1):null!=t.detachEvent?t.detachEvent("on"+e,n):delete t[e]},o.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},o}(),f=this.WeakMap||this.MozWeakMap||(f=function(){function o(){this.keys=[],this.values=[]}return o.prototype.get=function(t){var e,r,i,s;for(e=r=0,i=(s=this.keys).length;i>r;e=++r)if(s[e]===t)return this.values[e]},o.prototype.set=function(t,e){var n,i,s,l;for(n=i=0,s=(l=this.keys).length;s>i;n=++i)if(l[n]===t)return void(this.values[n]=e);return this.keys.push(t),this.values.push(e)},o}()),h=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(h=function(){function o(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return o.notSupported=!0,o.prototype.observe=function(){},o}()),v=this.getComputedStyle||function(o,t){return this.getPropertyValue=function(e){var n;return"float"===e&&(e="styleFloat"),m.test(e)&&e.replace(m,function(r,i){return i.toUpperCase()}),(null!=(n=o.currentStyle)?n[e]:void 0)||null},this},m=/(\-([a-z]){1})/g,this.WOW=function(){function o(t){null==t&&(t={}),this.scrollCallback=d(this.scrollCallback,this),this.scrollHandler=d(this.scrollHandler,this),this.resetAnimation=d(this.resetAnimation,this),this.start=d(this.start,this),this.scrolled=!0,this.config=this.util().extend(t,this.defaults),null!=t.scrollContainer&&(this.config.scrollContainer=document.querySelector(t.scrollContainer)),this.animationNameCache=new f,this.wowEvent=this.util().createEvent(this.config.boxClass)}return o.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},o.prototype.init=function(){var t;return this.element=window.document.documentElement,"interactive"===(t=document.readyState)||"complete"===t?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},o.prototype.start=function(){var e,n,r,i;if(this.stopped=!1,this.boxes=function(){var i,s,l,u;for(u=[],i=0,s=(l=this.element.querySelectorAll("."+this.config.boxClass)).length;s>i;i++)u.push(l[i]);return u}.call(this),this.all=function(){var i,s,l,u;for(u=[],i=0,s=(l=this.boxes).length;s>i;i++)u.push(l[i]);return u}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=0,n=(r=this.boxes).length;n>e;e++)this.applyStyle(r[e],!0);return this.disabled()||(this.util().addEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new h((i=this,function(s){var l,u,c,y;for(y=[],l=0,u=s.length;u>l;l++)c=s[l],y.push(function(){var p,E,g,w;for(w=[],p=0,E=(g=c.addedNodes||[]).length;E>p;p++)w.push(this.doSync(g[p]));return w}.call(i));return y})).observe(document.body,{childList:!0,subtree:!0}):void 0},o.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},o.prototype.sync=function(t){return h.notSupported?this.doSync(this.element):void 0},o.prototype.doSync=function(t){var e,n,r,i,s;if(null==t&&(t=this.element),1===t.nodeType){for(s=[],n=0,r=(i=(t=t.parentNode||t).querySelectorAll("."+this.config.boxClass)).length;r>n;n++)S.call(this.all,e=i[n])<0?(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),s.push(this.scrolled=!0)):s.push(void 0);return s}},o.prototype.show=function(t){return this.applyStyle(t),t.className=t.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(t),this.util().emitEvent(t,this.wowEvent),this.util().addEvent(t,"animationend",this.resetAnimation),this.util().addEvent(t,"oanimationend",this.resetAnimation),this.util().addEvent(t,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(t,"MSAnimationEnd",this.resetAnimation),t},o.prototype.applyStyle=function(t,e){var n,r,i,s;return r=t.getAttribute("data-wow-duration"),n=t.getAttribute("data-wow-delay"),i=t.getAttribute("data-wow-iteration"),this.animate((s=this,function(){return s.customStyle(t,e,r,n,i)}))},o.prototype.animate="requestAnimationFrame"in window?function(t){return window.requestAnimationFrame(t)}:function(t){return t()},o.prototype.resetStyle=function(){var e,n,r,i;for(i=[],e=0,n=(r=this.boxes).length;n>e;e++)i.push(r[e].style.visibility="visible");return i},o.prototype.resetAnimation=function(t){var e;return t.type.toLowerCase().indexOf("animationend")>=0?(e=t.target||t.srcElement).className=e.className.replace(this.config.animateClass,"").trim():void 0},o.prototype.customStyle=function(t,e,n,r,i){return e&&this.cacheAnimationName(t),t.style.visibility=e?"hidden":"visible",n&&this.vendorSet(t.style,{animationDuration:n}),r&&this.vendorSet(t.style,{animationDelay:r}),i&&this.vendorSet(t.style,{animationIterationCount:i}),this.vendorSet(t.style,{animationName:e?"none":this.cachedAnimationName(t)}),t},o.prototype.vendors=["moz","webkit"],o.prototype.vendorSet=function(t,e){var n,r,i;for(n in r=[],e)t[""+n]=i=e[n],r.push(function(){var l,u,a,c;for(c=[],l=0,u=(a=this.vendors).length;u>l;l++)c.push(t[""+a[l]+n.charAt(0).toUpperCase()+n.substr(1)]=i);return c}.call(this));return r},o.prototype.vendorCSS=function(t,e){var n,r,i,s,l;for(s=(l=v(t)).getPropertyCSSValue(e),n=0,r=(i=this.vendors).length;r>n;n++)s=s||l.getPropertyCSSValue("-"+i[n]+"-"+e);return s},o.prototype.animationName=function(t){var e;try{e=this.vendorCSS(t,"animation-name").cssText}catch(n){e=v(t).getPropertyValue("animation-name")}return"none"===e?"":e},o.prototype.cacheAnimationName=function(t){return this.animationNameCache.set(t,this.animationName(t))},o.prototype.cachedAnimationName=function(t){return this.animationNameCache.get(t)},o.prototype.scrollHandler=function(){return this.scrolled=!0},o.prototype.scrollCallback=function(){var t;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var e,n,r,i;for(i=[],e=0,n=(r=this.boxes).length;n>e;e++)(t=r[e])&&(this.isVisible(t)?this.show(t):i.push(t));return i}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},o.prototype.offsetTop=function(t){for(var e;void 0===t.offsetTop;)t=t.parentNode;for(e=t.offsetTop;t=t.offsetParent;)e+=t.offsetTop;return e},o.prototype.isVisible=function(t){var n,r,s;return n=t.getAttribute("data-wow-offset")||this.config.offset,(s=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset)+Math.min(this.element.clientHeight,this.util().innerHeight())-n>=(r=this.offsetTop(t))&&r+t.clientHeight>=s},o.prototype.util=function(){return null!=this._util?this._util:this._util=new b},o.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},o}()}).call(this);