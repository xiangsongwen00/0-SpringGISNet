(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ec(i){const e=Object.create(null);for(const t of i.split(","))e[t]=1;return t=>t in e}const dt={},$n=[],zi=()=>{},Hh=()=>!1,Pa=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Da=i=>i.startsWith("onUpdate:"),Ft=Object.assign,tc=(i,e)=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)},Qf=Object.prototype.hasOwnProperty,rt=(i,e)=>Qf.call(i,e),Ve=Array.isArray,Cn=i=>xs(i)==="[object Map]",cn=i=>xs(i)==="[object Set]",Hc=i=>xs(i)==="[object Date]",Xe=i=>typeof i=="function",St=i=>typeof i=="string",ki=i=>typeof i=="symbol",ct=i=>i!==null&&typeof i=="object",Gh=i=>(ct(i)||Xe(i))&&Xe(i.then)&&Xe(i.catch),kh=Object.prototype.toString,xs=i=>kh.call(i),ep=i=>xs(i).slice(8,-1),Wh=i=>xs(i)==="[object Object]",ic=i=>St(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,Zr=ec(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ia=i=>{const e=Object.create(null);return t=>e[t]||(e[t]=i(t))},tp=/-\w/g,Ai=Ia(i=>i.replace(tp,e=>e.slice(1).toUpperCase())),ip=/\B([A-Z])/g,Qn=Ia(i=>i.replace(ip,"-$1").toLowerCase()),Xh=Ia(i=>i.charAt(0).toUpperCase()+i.slice(1)),Ja=Ia(i=>i?`on${Xh(i)}`:""),Oi=(i,e)=>!Object.is(i,e),na=(i,...e)=>{for(let t=0;t<i.length;t++)i[t](...e)},qh=(i,e,t,n=!1)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,writable:n,value:t})},$h=i=>{const e=parseFloat(i);return isNaN(e)?i:e};let Gc;const Ua=()=>Gc||(Gc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Na(i){if(Ve(i)){const e={};for(let t=0;t<i.length;t++){const n=i[t],r=St(n)?ap(n):Na(n);if(r)for(const s in r)e[s]=r[s]}return e}else if(St(i)||ct(i))return i}const np=/;(?![^(]*\))/g,rp=/:([^]+)/,sp=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function ap(i){const e={};return i.replace(sp,t=>t.startsWith("/*")?"":t).split(np).forEach(t=>{if(t){const n=t.split(rp);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}function Fa(i){let e="";if(St(i))e=i;else if(Ve(i))for(let t=0;t<i.length;t++){const n=Fa(i[t]);n&&(e+=n+" ")}else if(ct(i))for(const t in i)i[t]&&(e+=t+" ");return e.trim()}const op="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",lp=ec(op);function Yh(i){return!!i||i===""}function cp(i,e,t){if(i.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<i.length;r++)n=un(i[r],e[r],t);return n}function kc(i,e,t){if(i.size!==e.size)return!1;const n=Array.from(e),r=new Uint8Array(n.length);for(const s of i){let a=-1;for(let o=0;o<n.length;o++)if(!r[o]&&un(s,n[o],t)){a=o;break}if(a<0)return!1;r[a]=1}return!0}function up(i,e,t){let n=Cn(i),r=Cn(e);if(n||r||(n=cn(i),r=cn(e),n||r))return n&&r?kc(i,e,t):!1;const s=Object.keys(i).length,a=Object.keys(e).length;if(s!==a)return!1;for(const o in i){const l=i.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!un(i[o],e[o],t))return!1}return String(i)===String(e)}function Wc(i,e,t,n){t||(t=[new Map,new Map]);const[r,s]=t;if(r.has(i)||s.has(e))return r.get(i)===e&&s.get(e)===i;r.set(i,e),s.set(e,i);const a=n(i,e,t);return r.delete(i),s.delete(e),a}function un(i,e,t){if(i===e)return!0;let n=Hc(i),r=Hc(e);return n||r?n&&r?i.getTime()===e.getTime():!1:(n=ki(i),r=ki(e),n||r?i===e:(n=Ve(i),r=Ve(e),n||r?n&&r?Wc(i,e,t,cp):!1:(n=ct(i),r=ct(e),n||r?!n||!r?!1:Wc(i,e,t,up):String(i)===String(e))))}function nc(i,e){return i.findIndex(t=>un(t,e))}const jh=i=>!!(i&&i.__v_isRef===!0),zt=i=>St(i)?i:i==null?"":Ve(i)||ct(i)&&(i.toString===kh||!Xe(i.toString))?jh(i)?zt(i.value):JSON.stringify(i,Kh,2):String(i),Kh=(i,e)=>jh(e)?Kh(i,e.value):Cn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[n,r],s)=>(t[Qa(n,s)+" =>"]=r,t),{})}:cn(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Qa(t))}:ki(e)?Qa(e):ct(e)&&!Ve(e)&&!Wh(e)?String(e):e,Qa=(i,e="")=>{var t;return ki(i)?`Symbol(${(t=i.description)!=null?t:e})`:i};/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let It;class hp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&It&&(It.active?(this.parent=It,this.index=(It.scopes||(It.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const r=this.scopes.slice();for(e=0,t=r.length;e<t;e++)r[e].resume()}const n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){const t=It;try{return It=this,e()}finally{It=t}}}on(){++this._on===1&&(this.prevScope=It,It=this)}off(){if(this._on>0&&--this._on===0){if(It===this)It=this.prevScope;else{let e=It;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const r=this.scopes.slice();for(t=0,n=r.length;t<n;t++)r[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function dp(){return It}let mt;const eo=new WeakSet;class Zh{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,It&&(It.active?It.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,eo.has(this)&&(eo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Qh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Xc(this),ed(this);const e=mt,t=Ri;mt=this,Ri=!0;try{return this.fn()}finally{td(this),mt=e,Ri=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)ac(e);this.deps=this.depsTail=void 0,Xc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?eo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Yo(this)&&this.run()}get dirty(){return Yo(this)}}let Jh=0,Jr,Qr;function Qh(i,e=!1){if(i.flags|=8,e){i.next=Qr,Qr=i;return}i.next=Jr,Jr=i}function rc(){Jh++}function sc(){if(--Jh>0)return;if(Qr){let e=Qr;for(Qr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let i;for(;Jr;){let e=Jr;for(Jr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(n){i||(i=n)}e=t}}if(i)throw i}function ed(i){for(let e=i.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function td(i){let e,t=i.depsTail,n=t;for(;n;){const r=n.prevDep;n.version===-1?(n===t&&(t=r),ac(n),fp(n)):e=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=r}i.deps=e,i.depsTail=t}function Yo(i){for(let e=i.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(id(e.dep.computed)||e.dep.version!==e.version))return!0;return!!i._dirty}function id(i){if(i.flags&4&&!(i.flags&16)||(i.flags&=-17,i.globalVersion===ss)||(i.globalVersion=ss,!i.isSSR&&i.flags&128&&(!i.deps&&!i._dirty||!Yo(i))))return;i.flags|=2;const e=i.dep,t=mt,n=Ri;mt=i,Ri=!0;try{ed(i);const r=i.fn(i._value);(e.version===0||Oi(r,i._value))&&(i.flags|=128,i._value=r,e.version++)}catch(r){throw e.version++,r}finally{mt=t,Ri=n,td(i),i.flags&=-3}}function ac(i,e=!1){const{dep:t,prevSub:n,nextSub:r}=i;if(n&&(n.nextSub=r,i.prevSub=void 0),r&&(r.prevSub=n,i.nextSub=void 0),t.subs===i&&(t.subs=n,!n&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)ac(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function fp(i){const{prevDep:e,nextDep:t}=i;e&&(e.nextDep=t,i.prevDep=void 0),t&&(t.prevDep=e,i.nextDep=void 0)}let Ri=!0;const nd=[];function hn(){nd.push(Ri),Ri=!1}function dn(){const i=nd.pop();Ri=i===void 0?!0:i}function Xc(i){const{cleanup:e}=i;if(i.cleanup=void 0,e){const t=mt;mt=void 0;try{e()}finally{mt=t}}}let ss=0;class pp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class oc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!mt||!Ri||mt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==mt)t=this.activeLink=new pp(mt,this),mt.deps?(t.prevDep=mt.depsTail,mt.depsTail.nextDep=t,mt.depsTail=t):mt.deps=mt.depsTail=t,rd(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const n=t.nextDep;n.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=n),t.prevDep=mt.depsTail,t.nextDep=void 0,mt.depsTail.nextDep=t,mt.depsTail=t,mt.deps===t&&(mt.deps=n)}return t}trigger(e){this.version++,ss++,this.notify(e)}notify(e){rc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{sc()}}}function rd(i){if(i.dep.sc++,i.sub.flags&4){const e=i.dep.computed;if(e&&!i.dep.subs){e.flags|=20;for(let n=e.deps;n;n=n.nextDep)rd(n)}const t=i.dep.subs;t!==i&&(i.prevSub=t,t&&(t.nextSub=i)),i.dep.subs=i}}const jo=new WeakMap,Kn=Symbol(""),Ko=Symbol(""),as=Symbol("");function Vt(i,e,t){if(Ri&&mt){let n=jo.get(i);n||jo.set(i,n=new Map);let r=n.get(t);r||(n.set(t,r=new oc),r.map=n,r.key=t),r.track()}}function tn(i,e,t,n,r,s){const a=jo.get(i);if(!a){ss++;return}const o=l=>{l&&l.trigger()};if(rc(),e==="clear")a.forEach(o);else{const l=Ve(i),c=l&&ic(t);if(l&&t==="length"){const u=Number(n);a.forEach((h,d)=>{(d==="length"||d===as||!ki(d)&&d>=u)&&o(h)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(as)),e){case"add":l?c&&o(a.get("length")):(o(a.get(Kn)),Cn(i)&&o(a.get(Ko)));break;case"delete":l||(o(a.get(Kn)),Cn(i)&&o(a.get(Ko)));break;case"set":Cn(i)&&o(a.get(Kn));break}}sc()}function tr(i){const e=nt(i);return e===i||(Vt(e,"iterate",as),vi(i))?e:Wi(i)?Ln(i)?e.map(t=>Pn(xi(t))):e.map(Pn):e.map(xi)}function Oa(i){return Vt(i=nt(i),"iterate",as),i}function Ui(i,e){return Wi(i)?Pn(Ln(i)?xi(e):e):xi(e)}const mp={__proto__:null,[Symbol.iterator](){return to(this,Symbol.iterator,i=>Ui(this,i))},concat(...i){return tr(this).concat(...i.map(e=>Ve(e)?tr(e):e))},entries(){return to(this,"entries",i=>(i[1]=Ui(this,i[1]),i))},every(i,e){return $i(this,"every",i,e,void 0,arguments)},filter(i,e){return $i(this,"filter",i,e,t=>t.map(n=>Ui(this,n)),arguments)},find(i,e){return $i(this,"find",i,e,t=>Ui(this,t),arguments)},findIndex(i,e){return $i(this,"findIndex",i,e,void 0,arguments)},findLast(i,e){return $i(this,"findLast",i,e,t=>Ui(this,t),arguments)},findLastIndex(i,e){return $i(this,"findLastIndex",i,e,void 0,arguments)},forEach(i,e){return $i(this,"forEach",i,e,void 0,arguments)},includes(...i){return io(this,"includes",i)},indexOf(...i){return io(this,"indexOf",i)},join(i){return tr(this).join(i)},lastIndexOf(...i){return io(this,"lastIndexOf",i)},map(i,e){return $i(this,"map",i,e,void 0,arguments)},pop(){return Or(this,"pop")},push(...i){return Or(this,"push",i)},reduce(i,...e){return qc(this,"reduce",i,e)},reduceRight(i,...e){return qc(this,"reduceRight",i,e)},shift(){return Or(this,"shift")},some(i,e){return $i(this,"some",i,e,void 0,arguments)},splice(...i){return Or(this,"splice",i)},toReversed(){return tr(this).toReversed()},toSorted(i){return tr(this).toSorted(i)},toSpliced(...i){return tr(this).toSpliced(...i)},unshift(...i){return Or(this,"unshift",i)},values(){return to(this,"values",i=>Ui(this,i))}};function to(i,e,t){const n=Oa(i),r=n[e]();return n!==i&&!vi(i)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const gp=Array.prototype;function $i(i,e,t,n,r,s){const a=Oa(i),o=a!==i&&!vi(i),l=a[e];if(l!==gp[e]){const h=l.apply(i,s);return o?xi(h):h}let c=t;a!==i&&(o?c=function(h,d){return t.call(this,Ui(i,h),d,i)}:t.length>2&&(c=function(h,d){return t.call(this,h,d,i)}));const u=l.call(a,c,n);return o&&r?r(u):u}function qc(i,e,t,n){const r=Oa(i),s=r!==i&&!vi(i);let a=t,o=!1;r!==i&&(s?(o=n.length===0,a=function(c,u,h){return o&&(o=!1,c=Ui(i,c)),t.call(this,c,Ui(i,u),h,i)}):t.length>3&&(a=function(c,u,h){return t.call(this,c,u,h,i)}));const l=r[e](a,...n);return o?Ui(i,l):l}function io(i,e,t){const n=nt(i);Vt(n,"iterate",as);const r=n[e](...t);return(r===-1||r===!1)&&hc(t[0])?(t[0]=nt(t[0]),n[e](...t)):r}function Or(i,e,t=[]){hn(),rc();const n=nt(i)[e].apply(i,t);return sc(),dn(),n}const _p=ec("__proto__,__v_isRef,__isVue"),sd=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(ki));function vp(i){ki(i)||(i=String(i));const e=nt(this);return Vt(e,"has",i),e.hasOwnProperty(i)}class ad{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return n===(r?s?Rp:ud:s?cd:ld).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const a=Ve(e);if(!r){let l;if(a&&(l=mp[t]))return l;if(t==="hasOwnProperty")return vp}const o=Reflect.get(e,t,Ht(e)?e:n);if((ki(t)?sd.has(t):_p(t))||(r||Vt(e,"get",t),s))return o;if(Ht(o)){const l=a&&ic(t)?o:o.value;return r&&ct(l)?Jo(l):l}return ct(o)?r?Jo(o):cc(o):o}}class od extends ad{constructor(e=!1){super(!1,e)}set(e,t,n,r){let s=e[t];const a=Ve(e)&&ic(t);if(!this._isShallow){const c=Wi(s);if(!vi(n)&&!Wi(n)&&(s=nt(s),n=nt(n)),!a&&Ht(s)&&!Ht(n))return c||(s.value=n),!0}const o=a?Number(t)<e.length:rt(e,t),l=Reflect.set(e,t,n,Ht(e)?e:r);return e===nt(r)&&l&&(o?Oi(n,s)&&tn(e,"set",t,n):tn(e,"add",t,n)),l}deleteProperty(e,t){const n=rt(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&tn(e,"delete",t,void 0),r}has(e,t){const n=Reflect.has(e,t);return(!ki(t)||!sd.has(t))&&Vt(e,"has",t),n}ownKeys(e){return Vt(e,"iterate",Ve(e)?"length":Kn),Reflect.ownKeys(e)}}class xp extends ad{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Mp=new od,Sp=new xp,yp=new od(!0);const Zo=i=>i,Rs=i=>Reflect.getPrototypeOf(i);function bp(i,e,t){return function(...n){const r=this.__v_raw,s=nt(r),a=Cn(s),o=i==="entries"||i===Symbol.iterator&&a,l=i==="keys"&&a,c=r[i](...n),u=t?Zo:e?Pn:xi;return!e&&Vt(s,"iterate",l?Ko:Kn),Ft(Object.create(c),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:o?[u(h[0]),u(h[1])]:u(h),done:d}}})}}function Cs(i){return function(...e){return i==="delete"?!1:i==="clear"?void 0:this}}function Tp(i,e){const t={get(r){const s=this.__v_raw,a=nt(s),o=nt(r);i||(Oi(r,o)&&Vt(a,"get",r),Vt(a,"get",o));const{has:l}=Rs(a),c=e?Zo:i?Pn:xi;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!i&&Vt(nt(r),"iterate",Kn),r.size},has(r){const s=this.__v_raw,a=nt(s),o=nt(r);return i||(Oi(r,o)&&Vt(a,"has",r),Vt(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=nt(o),c=e?Zo:i?Pn:xi;return!i&&Vt(l,"iterate",Kn),o.forEach((u,h)=>r.call(s,c(u),c(h),a))}};return Ft(t,i?{add:Cs("add"),set:Cs("set"),delete:Cs("delete"),clear:Cs("clear")}:{add(r){const s=nt(this),a=Rs(s),o=nt(r),l=!e&&!vi(r)&&!Wi(r)?o:r;return a.has.call(s,l)||Oi(r,l)&&a.has.call(s,r)||Oi(o,l)&&a.has.call(s,o)||(s.add(l),tn(s,"add",l,l)),this},set(r,s){!e&&!vi(s)&&!Wi(s)&&(s=nt(s));const a=nt(this),{has:o,get:l}=Rs(a);let c=o.call(a,r);c||(r=nt(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?Oi(s,u)&&tn(a,"set",r,s):tn(a,"add",r,s),this},delete(r){const s=nt(this),{has:a,get:o}=Rs(s);let l=a.call(s,r);l||(r=nt(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&tn(s,"delete",r,void 0),c},clear(){const r=nt(this),s=r.size!==0,a=r.clear();return s&&tn(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=bp(r,i,e)}),t}function lc(i,e){const t=Tp(i,e);return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(rt(t,r)&&r in n?t:n,r,s)}const Ep={get:lc(!1,!1)},wp={get:lc(!1,!0)},Ap={get:lc(!0,!1)};const ld=new WeakMap,cd=new WeakMap,ud=new WeakMap,Rp=new WeakMap;function Cp(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function cc(i){return Wi(i)?i:uc(i,!1,Mp,Ep,ld)}function Lp(i){return uc(i,!1,yp,wp,cd)}function Jo(i){return uc(i,!0,Sp,Ap,ud)}function uc(i,e,t,n,r){if(!ct(i)||i.__v_raw&&!(e&&i.__v_isReactive)||i.__v_skip||!Object.isExtensible(i))return i;const s=r.get(i);if(s)return s;const a=Cp(ep(i));if(a===0)return i;const o=new Proxy(i,a===2?n:t);return r.set(i,o),o}function Ln(i){return Wi(i)?Ln(i.__v_raw):!!(i&&i.__v_isReactive)}function Wi(i){return!!(i&&i.__v_isReadonly)}function vi(i){return!!(i&&i.__v_isShallow)}function hc(i){return i?!!i.__v_raw:!1}function nt(i){const e=i&&i.__v_raw;return e?nt(e):i}function Pp(i){return!rt(i,"__v_skip")&&Object.isExtensible(i)&&qh(i,"__v_skip",!0),i}const xi=i=>ct(i)?cc(i):i,Pn=i=>ct(i)?Jo(i):i;function Ht(i){return i?i.__v_isRef===!0:!1}function ir(i){return Dp(i,!1)}function Dp(i,e){return Ht(i)?i:new Ip(i,e)}class Ip{constructor(e,t){this.dep=new oc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:nt(e),this._value=t?e:xi(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,n=this.__v_isShallow||vi(e)||Wi(e);e=n?e:nt(e),Oi(e,t)&&(this._rawValue=e,this._value=n?e:xi(e),this.dep.trigger())}}function yt(i){return Ht(i)?i.value:i}const Up={get:(i,e,t)=>e==="__v_raw"?i:yt(Reflect.get(i,e,t)),set:(i,e,t,n)=>{const r=i[e];return Ht(r)&&!Ht(t)?(r.value=t,!0):Reflect.set(i,e,t,n)}};function hd(i){return Ln(i)?i:new Proxy(i,Up)}class Np{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new oc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ss-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&mt!==this)return Qh(this,!0),!0}get value(){const e=this.dep.track();return id(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Fp(i,e,t=!1){let n,r;return Xe(i)?n=i:(n=i.get,r=i.set),new Np(n,r,t)}const Ls={},ma=new WeakMap;let kn;function Op(i,e=!1,t=kn){if(t){let n=ma.get(t);n||ma.set(t,n=[]),n.push(i)}}function Bp(i,e,t=dt){const{immediate:n,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=t,c=M=>r?M:vi(M)||r===!1||r===0?nn(M,1):nn(M);let u,h,d,f,_=!1,v=!1;if(Ht(i)?(h=()=>i.value,_=vi(i)):Ln(i)?(h=()=>c(i),_=!0):Ve(i)?(v=!0,_=i.some(M=>Ln(M)||vi(M)),h=()=>i.map(M=>{if(Ht(M))return M.value;if(Ln(M))return c(M);if(Xe(M))return l?l(M,2):M()})):Xe(i)?e?h=l?()=>l(i,2):i:h=()=>{if(d){hn();try{d()}finally{dn()}}const M=kn;kn=u;try{return l?l(i,3,[f]):i(f)}finally{kn=M}}:h=zi,e&&r){const M=h,A=r===!0?1/0:r;h=()=>nn(M(),A)}const m=dp(),p=()=>{u.stop(),m&&m.active&&tc(m.effects,u)};if(s&&e){const M=e;e=(...A)=>{const C=M(...A);return p(),C}}let b=v?new Array(i.length).fill(Ls):Ls;const T=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const A=u.run();if(M||r||_||(v?A.some((C,D)=>Oi(C,b[D])):Oi(A,b))){d&&d();const C=kn;kn=u;try{const D=[A,b===Ls?void 0:v&&b[0]===Ls?[]:b,f];b=A,l?l(e,3,D):e(...D)}finally{kn=C}}}else u.run()};return o&&o(T),u=new Zh(h),u.scheduler=a?()=>a(T,!1):T,f=M=>Op(M,!1,u),d=u.onStop=()=>{const M=ma.get(u);if(M){if(l)l(M,4);else for(const A of M)A();ma.delete(u)}},e?n?T(!0):b=u.run():a?a(T.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function nn(i,e=1/0,t){if(e<=0||!ct(i)||i.__v_skip||(t=t||new Map,(t.get(i)||0)>=e))return i;if(t.set(i,e),e--,Ht(i))nn(i.value,e,t);else if(Ve(i))for(let n=0;n<i.length;n++)nn(i[n],e,t);else if(cn(i)||Cn(i))i.forEach(n=>{nn(n,e,t)});else if(Wh(i)){for(const n in i)nn(i[n],e,t);for(const n of Object.getOwnPropertySymbols(i))Object.prototype.propertyIsEnumerable.call(i,n)&&nn(i[n],e,t)}return i}/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ms(i,e,t,n){try{return n?i(...n):i()}catch(r){Ba(r,e,t)}}function Ci(i,e,t,n){if(Xe(i)){const r=Ms(i,e,t,n);return r&&Gh(r)&&r.catch(s=>{Ba(s,e,t)}),r}if(Ve(i)){const r=[];for(let s=0;s<i.length;s++)r.push(Ci(i[s],e,t,n));return r}}function Ba(i,e,t,n=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||dt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](i,l,c)===!1)return}o=o.parent}if(s){hn(),Ms(s,null,10,[i,l,c]),dn();return}}zp(i,t,r,n,a)}function zp(i,e,t,n=!0,r=!1){if(r)throw i;console.error(i)}const $t=[];let Ii=-1;const Sr=[];let En=null,vr=0;const dd=Promise.resolve();let ga=null;function fd(i){const e=ga||dd;return i?e.then(this?i.bind(this):i):e}function Vp(i){let e=Ii+1,t=$t.length;for(;e<t;){const n=e+t>>>1,r=$t[n],s=os(r);s<i||s===i&&r.flags&2?e=n+1:t=n}return e}function dc(i){if(!(i.flags&1)){const e=os(i),t=$t[$t.length-1];!t||!(i.flags&2)&&e>=os(t)?$t.push(i):$t.splice(Vp(e),0,i),i.flags|=1,pd()}}function pd(){ga||(ga=dd.then(gd))}function Hp(i){if(!Ve(i))En&&i.id===-1?En.splice(vr+1,0,i):i.flags&1||(Sr.push(i),i.flags|=1);else for(let e=0;e<i.length;e++)Sr.push(i[e]);pd()}function $c(i,e,t=Ii+1){for(;t<$t.length;t++){const n=$t[t];if(n&&n.flags&2){if(i&&n.id!==i.uid)continue;$t.splice(t,1),t--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function md(i){if(Sr.length){const e=[...new Set(Sr)].sort((t,n)=>os(t)-os(n));if(Sr.length=0,En){for(let t=0;t<e.length;t++)En.push(e[t]);return}for(En=e,vr=0;vr<En.length;vr++){const t=En[vr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}En=null,vr=0}}const os=i=>i.id==null?i.flags&2?-1:1/0:i.id;function gd(i){try{for(Ii=0;Ii<$t.length;Ii++){const e=$t[Ii];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ms(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ii<$t.length;Ii++){const e=$t[Ii];e&&(e.flags&=-2)}Ii=-1,$t.length=0,md(),ga=null,($t.length||Sr.length)&&gd()}}let _i=null,_d=null;function _a(i){const e=_i;return _i=i,_d=i&&i.type.__scopeId||null,e}function Gp(i,e=_i,t){if(!e||i._n)return i;const n=(...r)=>{n._d&&su(-1);const s=_a(e),a=Zn.length;let o;try{o=i(...r)}finally{for(let l=Zn.length;l>a;l--)Wd();_a(s),n._d&&su(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function Yc(i,e){if(_i===null)return i;const t=ka(_i),n=i.dirs||(i.dirs=[]);for(let r=0;r<e.length;r++){let[s,a,o,l=dt]=e[r];s&&(Xe(s)&&(s={mounted:s,updated:s}),s.deep&&nn(a),n.push({dir:s,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return i}function Nn(i,e,t,n){const r=i.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[n];l&&(hn(),Ci(l,t,8,[i.el,o,i,e]),dn())}}function kp(i,e){if(Yt){let t=Yt.provides;const n=Yt.parent&&Yt.parent.provides;n===t&&(t=Yt.provides=Object.create(n)),t[i]=e}}function ra(i,e,t=!1){const n=Bm();if(n||yr){let r=yr?yr._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(r&&i in r)return r[i];if(arguments.length>1)return t&&Xe(e)?e.call(n&&n.proxy):e}}const Wp=Symbol.for("v-scx"),Xp=()=>ra(Wp);function no(i,e,t){return vd(i,e,t)}function vd(i,e,t=dt){const{immediate:n,deep:r,flush:s,once:a}=t,o=Ft({},t),l=e&&n||!e&&s!=="post";let c;if(us){if(s==="sync"){const f=Xp();c=f.__watcherHandles||(f.__watcherHandles=[])}else if(!l){const f=()=>{};return f.stop=zi,f.resume=zi,f.pause=zi,f}}const u=Yt;o.call=(f,_,v)=>Ci(f,u,_,v);let h=!1;s==="post"?o.scheduler=f=>{Qt(f,u&&u.suspense)}:s!=="sync"&&(h=!0,o.scheduler=(f,_)=>{_?f():dc(f)}),o.augmentJob=f=>{e&&(f.flags|=4),h&&(f.flags|=2,u&&(f.id=u.uid,f.i=u))};const d=Bp(i,e,o);return us&&(c?c.push(d):l&&d()),d}function qp(i,e,t){const n=this.proxy,r=St(i)?i.includes(".")?xd(n,i):()=>n[i]:i.bind(n,n);let s;Xe(e)?s=e:(s=e.handler,t=e);const a=Ss(this),o=vd(r,s.bind(n),t);return a(),o}function xd(i,e){const t=e.split(".");return()=>{let n=i;for(let r=0;r<t.length&&n;r++)n=n[t[r]];return n}}const $p=Symbol("_vte"),za=i=>i.__isTeleport,ro=Symbol("_leaveCb");function Yp(i){let e=i[0];if(i.length>1){for(const t of i)if(t.type!==fn){e=t;break}}return e}function Md(i){if(!pc(i))return za(i.type)&&i.children?Yp(i.children):i;if(i.component)return i.component.subTree;const{shapeFlag:e,children:t}=i;if(t){if(e&16)return t[0];if(e&32&&Xe(t.default))return t.default()}}function fc(i,e){if(i.shapeFlag&6&&i.component){i.transition=e;const t=i.component.subTree;fc(za(t.type)&&Md(t)||t,e)}else i.shapeFlag&128?(i.ssContent.transition=e.clone(i.ssContent),i.ssFallback.transition=e.clone(i.ssFallback)):i.transition=e}function Sd(i,e){return Xe(i)?Ft({name:i.name},e,{setup:i}):i}function yd(i){i.ids=[i.ids[0]+i.ids[2]+++"-",0,0]}function jc(i,e){let t;return!!((t=Object.getOwnPropertyDescriptor(i,e))&&!t.configurable)}const va=new WeakMap;function es(i,e,t,n,r=!1){if(Ve(i)){i.forEach((v,m)=>es(v,e&&(Ve(e)?e[m]:e),t,n,r));return}if(ts(n)&&!r){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&es(i,e,t,n.component.subTree);return}const s=n.shapeFlag&4?ka(n.component):n.el,a=r?null:s,{i:o,r:l}=i,c=e&&e.r,u=o.refs===dt?o.refs={}:o.refs,h=o.setupState,d=nt(h),f=h===dt?Hh:v=>jc(u,v)?!1:rt(d,v),_=(v,m)=>!(m&&jc(u,m));if(c!=null&&c!==l){if(Kc(e),St(c))u[c]=null,f(c)&&(h[c]=null);else if(Ht(c)){const v=e;_(c,v.k)&&(c.value=null),v.k&&(u[v.k]=null)}}if(Xe(l))Ms(l,o,12,[a,u]);else{const v=St(l),m=Ht(l);if(v||m){const p=()=>{if(i.f){const b=v?f(l)?h[l]:u[l]:_()||!i.k?l.value:u[i.k];if(r)Ve(b)&&tc(b,s);else if(Ve(b))b.includes(s)||b.push(s);else if(v)u[l]=[s],f(l)&&(h[l]=u[l]);else{const T=[s];_(l,i.k)&&(l.value=T),i.k&&(u[i.k]=T)}}else v?(u[l]=a,f(l)&&(h[l]=a)):m&&(_(l,i.k)&&(l.value=a),i.k&&(u[i.k]=a))};if(a){const b=()=>{p(),va.delete(i)};b.id=-1,va.set(i,b),Qt(b,t)}else Kc(i),p()}}}function Kc(i){const e=va.get(i);e&&(e.flags|=8,va.delete(i))}Ua().requestIdleCallback;Ua().cancelIdleCallback;const ts=i=>!!i.type.__asyncLoader,pc=i=>i.type.__isKeepAlive;function jp(i,e){bd(i,"a",e)}function Kp(i,e){bd(i,"da",e)}function bd(i,e,t=Yt){const n=i.__wdc||(i.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Va(e,n,t),t){let r=t.parent;for(;r&&r.parent;)pc(r.parent.vnode)&&Zp(n,e,t,r),r=r.parent}}function Zp(i,e,t,n){const r=Va(e,i,n,!0);wd(()=>{tc(n[e],r)},t)}function Va(i,e,t=Yt,n=!1){if(t){const r=t[i]||(t[i]=[]),s=e.__weh||(e.__weh=(...a)=>{hn();const o=Ss(t),l=Ci(e,t,i,a);return o(),dn(),l});return n?r.unshift(s):r.push(s),s}}const vn=i=>(e,t=Yt)=>{(!us||i==="sp")&&Va(i,(...n)=>e(...n),t)},Jp=vn("bm"),Td=vn("m"),Qp=vn("bu"),em=vn("u"),Ed=vn("bum"),wd=vn("um"),tm=vn("sp"),im=vn("rtg"),nm=vn("rtc");function rm(i,e=Yt){Va("ec",i,e)}const sm=Symbol.for("v-ndc");function so(i,e,t,n){let r;const s=t,a=Ve(i);if(a||St(i)){const o=a&&Ln(i);let l=!1,c=!1;o&&(l=!vi(i),c=Wi(i),i=Oa(i)),r=new Array(i.length);for(let u=0,h=i.length;u<h;u++)r[u]=e(l?c?Pn(xi(i[u])):xi(i[u]):i[u],u,void 0,s)}else if(typeof i=="number"){r=new Array(i);for(let o=0;o<i;o++)r[o]=e(o+1,o,void 0,s)}else if(ct(i))if(i[Symbol.iterator])r=Array.from(i,(o,l)=>e(o,l,void 0,s));else{const o=Object.keys(i);r=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];r[l]=e(i[u],u,l,s)}}else r=[];return r}const Qo=i=>i?Kd(i)?ka(i):Qo(i.parent):null,is=Ft(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>Qo(i.parent),$root:i=>Qo(i.root),$host:i=>i.ce,$emit:i=>i.emit,$options:i=>Rd(i),$forceUpdate:i=>i.f||(i.f=()=>{dc(i.update)}),$nextTick:i=>i.n||(i.n=fd.bind(i.proxy)),$watch:i=>qp.bind(i)}),ao=(i,e)=>i!==dt&&!i.__isScriptSetup&&rt(i,e),am={get({_:i},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:n,data:r,props:s,accessCache:a,type:o,appContext:l}=i;if(e[0]!=="$"){const d=a[e];if(d!==void 0)switch(d){case 1:return n[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(ao(n,e))return a[e]=1,n[e];if(r!==dt&&rt(r,e))return a[e]=2,r[e];if(rt(s,e))return a[e]=3,s[e];if(t!==dt&&rt(t,e))return a[e]=4,t[e];el&&(a[e]=0)}}const c=is[e];let u,h;if(c)return e==="$attrs"&&Vt(i.attrs,"get",""),c(i);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==dt&&rt(t,e))return a[e]=4,t[e];if(h=l.config.globalProperties,rt(h,e))return h[e]},set({_:i},e,t){const{data:n,setupState:r,ctx:s}=i;return ao(r,e)?(r[e]=t,!0):n!==dt&&rt(n,e)?(n[e]=t,!0):rt(i.props,e)||e[0]==="$"&&e.slice(1)in i?!1:(s[e]=t,!0)},has({_:{data:i,setupState:e,accessCache:t,ctx:n,appContext:r,props:s,type:a}},o){let l;return!!(t[o]||i!==dt&&o[0]!=="$"&&rt(i,o)||ao(e,o)||rt(s,o)||rt(n,o)||rt(is,o)||rt(r.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(i,e,t){return t.get!=null?i._.accessCache[e]=0:rt(t,"value")&&this.set(i,e,t.value,null),Reflect.defineProperty(i,e,t)}};function Zc(i){return Ve(i)?i.reduce((e,t)=>(e[t]=null,e),{}):i}let el=!0;function om(i){const e=Rd(i),t=i.proxy,n=i.ctx;el=!1,e.beforeCreate&&Jc(e.beforeCreate,i,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:_,activated:v,deactivated:m,beforeDestroy:p,beforeUnmount:b,destroyed:T,unmounted:M,render:A,renderTracked:C,renderTriggered:D,errorCaptured:B,serverPrefetch:x,expose:E,inheritAttrs:N,components:j,directives:q,filters:ne}=e;if(c&&lm(c,n,null),a)for(const z in a){const J=a[z];Xe(J)&&(n[z]=J.bind(t))}if(r){const z=r.call(t,t);ct(z)&&(i.data=cc(z))}if(el=!0,s)for(const z in s){const J=s[z],Me=Xe(J)?J.bind(t,t):Xe(J.get)?J.get.bind(t,t):zi,ge=!Xe(J)&&Xe(J.set)?J.set.bind(t):zi,Se=Wm({get:Me,set:ge});Object.defineProperty(n,z,{enumerable:!0,configurable:!0,get:()=>Se.value,set:ze=>Se.value=ze})}if(o)for(const z in o)Ad(o[z],n,t,z);if(l){const z=Xe(l)?l.call(t):l;Reflect.ownKeys(z).forEach(J=>{kp(J,z[J])})}u&&Jc(u,i,"c");function Y(z,J){Ve(J)?J.forEach(Me=>z(Me.bind(t))):J&&z(J.bind(t))}if(Y(Jp,h),Y(Td,d),Y(Qp,f),Y(em,_),Y(jp,v),Y(Kp,m),Y(rm,B),Y(nm,C),Y(im,D),Y(Ed,b),Y(wd,M),Y(tm,x),Ve(E))if(E.length){const z=i.exposed||(i.exposed={});E.forEach(J=>{Object.defineProperty(z,J,{get:()=>t[J],set:Me=>t[J]=Me,enumerable:!0})})}else i.exposed||(i.exposed={});A&&i.render===zi&&(i.render=A),N!=null&&(i.inheritAttrs=N),j&&(i.components=j),q&&(i.directives=q),x&&yd(i)}function lm(i,e,t=zi){Ve(i)&&(i=tl(i));for(const n in i){const r=i[n];let s;ct(r)?"default"in r?s=ra(r.from||n,r.default,!0):s=ra(r.from||n):s=ra(r),Ht(s)?Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[n]=s}}function Jc(i,e,t){Ci(Ve(i)?i.map(n=>n.bind(e.proxy)):i.bind(e.proxy),e,t)}function Ad(i,e,t,n){let r=n.includes(".")?xd(t,n):()=>t[n];if(St(i)){const s=e[i];Xe(s)&&no(r,s)}else if(Xe(i))no(r,i.bind(t));else if(ct(i))if(Ve(i))i.forEach(s=>Ad(s,e,t,n));else{const s=Xe(i.handler)?i.handler.bind(t):e[i.handler];Xe(s)&&no(r,s,i)}}function Rd(i){const e=i.type,{mixins:t,extends:n}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=i.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!t&&!n?l=e:(l={},r.length&&r.forEach(c=>xa(l,c,a,!0)),xa(l,e,a)),ct(e)&&s.set(e,l),l}function xa(i,e,t,n=!1){const{mixins:r,extends:s}=e;s&&xa(i,s,t,!0),r&&r.forEach(a=>xa(i,a,t,!0));for(const a in e)if(!(n&&a==="expose")){const o=cm[a]||t&&t[a];i[a]=o?o(i[a],e[a]):e[a]}return i}const cm={data:Qc,props:eu,emits:eu,methods:qr,computed:qr,beforeCreate:kt,created:kt,beforeMount:kt,mounted:kt,beforeUpdate:kt,updated:kt,beforeDestroy:kt,beforeUnmount:kt,destroyed:kt,unmounted:kt,activated:kt,deactivated:kt,errorCaptured:kt,serverPrefetch:kt,components:qr,directives:qr,watch:hm,provide:Qc,inject:um};function Qc(i,e){return e?i?function(){return Ft(Xe(i)?i.call(this,this):i,Xe(e)?e.call(this,this):e)}:e:i}function um(i,e){return qr(tl(i),tl(e))}function tl(i){if(Ve(i)){const e={};for(let t=0;t<i.length;t++)e[i[t]]=i[t];return e}return i}function kt(i,e){return i?[...new Set([].concat(i,e))]:e}function qr(i,e){return i?Ft(Object.create(null),i,e):e}function eu(i,e){return i?Ve(i)&&Ve(e)?[...new Set([...i,...e])]:Ft(Object.create(null),Zc(i),Zc(e??{})):e}function hm(i,e){if(!i)return e;if(!e)return i;const t=Ft(Object.create(null),i);for(const n in e)t[n]=kt(i[n],e[n]);return t}function Cd(){return{app:null,config:{isNativeTag:Hh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let dm=0;function fm(i,e){return function(n,r=null){Xe(n)||(n=Ft({},n)),r!=null&&!ct(r)&&(r=null);const s=Cd(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:dm++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:Xm,get config(){return s.config},set config(u){},use(u,...h){return a.has(u)||(u&&Xe(u.install)?(a.add(u),u.install(c,...h)):Xe(u)&&(a.add(u),u(c,...h))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,h){return h?(s.components[u]=h,c):s.components[u]},directive(u,h){return h?(s.directives[u]=h,c):s.directives[u]},mount(u,h,d){if(!l){const f=c._ceVNode||Vi(n,r);return f.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),i(f,u,d),l=!0,c._container=u,u.__vue_app__=c,ka(f.component)}},onUnmount(u){o.push(u)},unmount(){l&&(Ci(o,c._instance,16),i(null,c._container),delete c._container.__vue_app__)},provide(u,h){return s.provides[u]=h,c},runWithContext(u){const h=yr;yr=c;try{return u()}finally{yr=h}}};return c}}let yr=null;const pm=(i,e)=>e==="modelValue"||e==="model-value"?i.modelModifiers:i[`${e}Modifiers`]||i[`${Ai(e)}Modifiers`]||i[`${Qn(e)}Modifiers`];function mm(i,e,...t){if(i.isUnmounted)return;const n=i.vnode.props||dt;let r=t;const s=e.startsWith("update:"),a=s&&pm(n,e.slice(7));a&&(a.trim&&(r=t.map(u=>St(u)?u.trim():u)),a.number&&(r=r.map($h)));let o,l=n[o=Ja(e)]||n[o=Ja(Ai(e))];!l&&s&&(l=n[o=Ja(Qn(e))]),l&&Ci(l,i,6,r);const c=n[o+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[o])return;i.emitted[o]=!0,Ci(c,i,6,r)}}const gm=new WeakMap;function Ld(i,e,t=!1){const n=t?gm:e.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let a={},o=!1;if(!Xe(i)){const l=c=>{const u=Ld(c,e,!0);u&&(o=!0,Ft(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!o?(ct(i)&&n.set(i,null),null):(Ve(s)?s.forEach(l=>a[l]=null):Ft(a,s),ct(i)&&n.set(i,a),a)}function Ha(i,e){return!i||!Pa(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),rt(i,e[0].toLowerCase()+e.slice(1))||rt(i,Qn(e))||rt(i,e))}function tu(i){const{type:e,vnode:t,proxy:n,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:h,data:d,setupState:f,ctx:_,inheritAttrs:v}=i,m=_a(i);let p,b;try{if(t.shapeFlag&4){const M=r||n,A=M;p=Ni(c.call(A,M,u,h,f,d,_)),b=o}else{const M=e;p=Ni(M.length>1?M(h,{attrs:o,slots:a,emit:l}):M(h,null)),b=e.props?o:_m(o)}}catch(M){Zn.length=0,Ba(M,i,1),p=Vi(fn)}let T=p;if(b&&v!==!1){const M=Object.keys(b),{shapeFlag:A}=T;M.length&&A&7&&(s&&M.some(Da)&&(b=vm(b,s)),T=wr(T,b,!1,!0))}if(t.dirs&&(T=wr(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(t.dirs):t.dirs),t.transition){const M=za(T.type)&&Md(T)||T;fc(M,t.transition)}return p=T,_a(m),p}const _m=i=>{let e;for(const t in i)(t==="class"||t==="style"||Pa(t))&&((e||(e={}))[t]=i[t]);return e},vm=(i,e)=>{const t={};for(const n in i)(!Da(n)||!(n.slice(9)in e))&&(t[n]=i[n]);return t};function xm(i,e,t){const{props:n,children:r,component:s}=i,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return n?iu(n,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(Pd(a,n,d)&&!Ha(c,d))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:n===a?!1:n?a?iu(n,a,c):!0:!!a;return!1}function iu(i,e,t){const n=Object.keys(e);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(Pd(e,i,s)&&!Ha(t,s))return!0}return!1}function Pd(i,e,t){const n=i[t],r=e[t];return t==="style"&&ct(n)&&ct(r)?!un(n,r):n!==r}function Mm({vnode:i,parent:e,suspense:t},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===i&&(r.suspense.vnode.el=r.el=n,i=r),r===i)(i=e.vnode).el=n,e=e.parent;else break}t&&t.activeBranch===i&&(t.vnode.el=n)}const Dd={},Id=()=>Object.create(Dd),Ud=i=>Object.getPrototypeOf(i)===Dd;function Sm(i,e,t,n=!1){const r={},s=Id();i.propsDefaults=Object.create(null),Nd(i,e,r,s);for(const a in i.propsOptions[0])a in r||(r[a]=void 0);t?i.props=n?r:Lp(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function ym(i,e,t,n){const{props:r,attrs:s,vnode:{patchFlag:a}}=i,o=nt(r),[l]=i.propsOptions;let c=!1;if((n||a>0)&&!(a&16)){if(a&8){const u=i.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(Ha(i.emitsOptions,d))continue;const f=e[d];if(l)if(rt(s,d))f!==s[d]&&(s[d]=f,c=!0);else{const _=Ai(d);r[_]=il(l,o,_,f,i,!1)}else f!==s[d]&&(s[d]=f,c=!0)}}}else{Nd(i,e,r,s)&&(c=!0);let u;for(const h in o)(!e||!rt(e,h)&&((u=Qn(h))===h||!rt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(r[h]=il(l,o,h,void 0,i,!0)):delete r[h]);if(s!==o)for(const h in s)(!e||!rt(e,h))&&(delete s[h],c=!0)}c&&tn(i.attrs,"set","")}function Nd(i,e,t,n){const[r,s]=i.propsOptions;let a=!1,o;if(e)for(let l in e){if(Zr(l))continue;const c=e[l];let u;r&&rt(r,u=Ai(l))?!s||!s.includes(u)?t[u]=c:(o||(o={}))[u]=c:Ha(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,a=!0)}if(s){const l=nt(t),c=o||dt;for(let u=0;u<s.length;u++){const h=s[u];t[h]=il(r,l,h,c[h],i,!rt(c,h))}}return a}function il(i,e,t,n,r,s){const a=i[t];if(a!=null){const o=rt(a,"default");if(o&&n===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Xe(l)){const{propsDefaults:c}=r;if(t in c)n=c[t];else{const u=Ss(r);n=c[t]=l.call(null,e),u()}}else n=l;r.ce&&r.ce._setProp(t,n)}a[0]&&(s&&!o?n=!1:a[1]&&(n===""||n===Qn(t))&&(n=!0))}return n}const bm=new WeakMap;function Fd(i,e,t=!1){const n=t?bm:e.propsCache,r=n.get(i);if(r)return r;const s=i.props,a={},o=[];let l=!1;if(!Xe(i)){const u=h=>{l=!0;const[d,f]=Fd(h,e,!0);Ft(a,d),f&&o.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return ct(i)&&n.set(i,$n),$n;if(Ve(s))for(let u=0;u<s.length;u++){const h=Ai(s[u]);nu(h)&&(a[h]=dt)}else if(s)for(const u in s){const h=Ai(u);if(nu(h)){const d=s[u],f=a[h]=Ve(d)||Xe(d)?{type:d}:Ft({},d),_=f.type;let v=!1,m=!0;if(Ve(_))for(let p=0;p<_.length;++p){const b=_[p],T=Xe(b)&&b.name;if(T==="Boolean"){v=!0;break}else T==="String"&&(m=!1)}else v=Xe(_)&&_.name==="Boolean";f[0]=v,f[1]=m,(v||rt(f,"default"))&&o.push(h)}}const c=[a,o];return ct(i)&&n.set(i,c),c}function nu(i){return i[0]!=="$"&&!Zr(i)}const mc=i=>i==="_"||i==="_ctx"||i==="$stable",gc=i=>Ve(i)?i.map(Ni):[Ni(i)],Tm=(i,e,t)=>{if(e._n)return e;const n=Gp((...r)=>gc(e(...r)),t);return n._c=!1,n},Od=(i,e,t)=>{const n=i._ctx;for(const r in i){if(mc(r))continue;const s=i[r];if(Xe(s))e[r]=Tm(r,s,n);else if(s!=null){const a=gc(s);e[r]=()=>a}}},Bd=(i,e)=>{const t=gc(e);i.slots.default=()=>t},zd=(i,e,t)=>{for(const n in e)(t||!mc(n))&&(i[n]=e[n])},Em=(i,e,t)=>{const n=i.slots=Id();if(i.vnode.shapeFlag&32){const r=e._;r?(zd(n,e,t),t&&qh(n,"_",r,!0)):Od(e,n)}else e&&Bd(i,e)},wm=(i,e,t)=>{const{vnode:n,slots:r}=i;let s=!0,a=dt;if(n.shapeFlag&32){const o=e._;o?t&&o===1?s=!1:zd(r,e,t):(s=!e.$stable,Od(e,r)),a=e}else e&&(Bd(i,e),a={default:1});if(s)for(const o in r)!mc(o)&&a[o]==null&&delete r[o]},Qt=Pm;function Am(i){return Rm(i)}function Rm(i,e){const t=Ua();t.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=zi,insertStaticContent:_}=i,v=(R,I,H,Q=null,W=null,ee=null,w=void 0,le=null,re=!!I.dynamicChildren)=>{if(R===I)return;R&&!Br(R,I)&&(Q=oe(R),ze(R,W,ee,!0),R=null),I.patchFlag===-2&&(re=!1,I.dynamicChildren=null),I.dynamicChildren&&R&&R.dynamicChildren&&R.dynamicChildren.hasOnce&&(I.dynamicChildren===$n&&(I.dynamicChildren=[]),I.dynamicChildren.hasOnce=!0);const{type:Z,ref:se,shapeFlag:S}=I;switch(Z){case Ga:m(R,I,H,Q);break;case fn:p(R,I,H,Q);break;case sa:R==null&&b(I,H,Q,w);break;case fi:j(R,I,H,Q,W,ee,w,le,re);break;default:S&1?A(R,I,H,Q,W,ee,w,le,re):S&6?q(R,I,H,Q,W,ee,w,le,re):(S&64||S&128)&&Z.process(R,I,H,Q,W,ee,w,le,re,Pe)}se!=null&&W?es(se,R&&R.ref,ee,I||R,!I):se==null&&R&&R.ref!=null&&es(R.ref,null,ee,R,!0)},m=(R,I,H,Q)=>{if(R==null)n(I.el=o(I.children),H,Q);else{const W=I.el=R.el;I.children!==R.children&&c(W,I.children)}},p=(R,I,H,Q)=>{R==null?n(I.el=l(I.children||""),H,Q):I.el=R.el},b=(R,I,H,Q)=>{[R.el,R.anchor]=_(R.children,I,H,Q,R.el,R.anchor)},T=({el:R,anchor:I},H,Q)=>{let W;for(;R&&R!==I;)W=d(R),n(R,H,Q),R=W;n(I,H,Q)},M=({el:R,anchor:I})=>{let H;for(;R&&R!==I;)H=d(R),r(R),R=H;r(I)},A=(R,I,H,Q,W,ee,w,le,re)=>{if(I.type==="svg"?w="svg":I.type==="math"&&(w="mathml"),R==null)C(I,H,Q,W,ee,w,le,re);else{const Z=R.el&&R.el._isVueCE?R.el:null;try{Z&&Z._beginPatch(),x(R,I,W,ee,w,le,re)}finally{Z&&Z._endPatch()}}},C=(R,I,H,Q,W,ee,w,le)=>{let re,Z;const{props:se,shapeFlag:S,transition:g,dirs:P}=R;if(re=R.el=a(R.type,ee,se&&se.is,se),S&8?u(re,R.children):S&16&&B(R.children,re,null,Q,W,oo(R,ee),w,le),P&&Nn(R,null,Q,"created"),D(re,R,R.scopeId,w,Q),se){for(const K in se)K!=="value"&&!Zr(K)&&s(re,K,null,se[K],ee,Q);"value"in se&&s(re,"value",null,se.value,ee),(Z=se.onVnodeBeforeMount)&&Pi(Z,Q,R)}P&&Nn(R,null,Q,"beforeMount");const k=Cm(W,g);k&&g.beforeEnter(re),n(re,I,H),((Z=se&&se.onVnodeMounted)||k||P)&&Qt(()=>{try{Z&&Pi(Z,Q,R),k&&g.enter(re),P&&Nn(R,null,Q,"mounted")}finally{}},W)},D=(R,I,H,Q,W)=>{if(H&&f(R,H),Q)for(let ee=0;ee<Q.length;ee++)f(R,Q[ee]);if(W){let ee=W.subTree;if(I===ee||kd(ee.type)&&(ee.ssContent===I||ee.ssFallback===I)){const w=W.vnode;D(R,w,w.scopeId,w.slotScopeIds,W.parent)}}},B=(R,I,H,Q,W,ee,w,le,re=0)=>{for(let Z=re;Z<R.length;Z++){const se=R[Z]=le?en(R[Z]):Ni(R[Z]);v(null,se,I,H,Q,W,ee,w,le)}},x=(R,I,H,Q,W,ee,w)=>{const le=I.el=R.el;let{patchFlag:re,dynamicChildren:Z,dirs:se}=I;re|=R.patchFlag&16;const S=R.props||dt,g=I.props||dt;let P;if(H&&Fn(H,!1),(P=g.onVnodeBeforeUpdate)&&Pi(P,H,I,R),se&&Nn(I,R,H,"beforeUpdate"),H&&Fn(H,!0),Z&&(!R.dynamicChildren||R.dynamicChildren.length!==Z.length)&&(re=0,w=!1,Z=null),(S.innerHTML&&g.innerHTML==null||S.textContent&&g.textContent==null)&&u(le,""),Z?E(R.dynamicChildren,Z,le,H,Q,oo(I,W),ee):w||J(R,I,le,null,H,Q,oo(I,W),ee,!1),re>0){if(re&16)N(le,S,g,H,W);else if(re&2&&S.class!==g.class&&s(le,"class",null,g.class,W),re&4&&s(le,"style",S.style,g.style,W),re&8){const k=I.dynamicProps;for(let K=0;K<k.length;K++){const G=k[K],ve=S[G],he=g[G];(he!==ve||G==="value")&&s(le,G,ve,he,W,H)}}re&1&&R.children!==I.children&&u(le,I.children)}else!w&&Z==null&&N(le,S,g,H,W);((P=g.onVnodeUpdated)||se)&&Qt(()=>{P&&Pi(P,H,I,R),se&&Nn(I,R,H,"updated")},Q)},E=(R,I,H,Q,W,ee,w)=>{for(let le=0;le<I.length;le++){const re=R[le],Z=I[le],se=re.el&&(re.type===fi||!Br(re,Z)||re.shapeFlag&198)?h(re.el):H;v(re,Z,se,null,Q,W,ee,w,!0)}},N=(R,I,H,Q,W)=>{if(I!==H){if(I!==dt)for(const ee in I)!Zr(ee)&&!(ee in H)&&s(R,ee,I[ee],null,W,Q);for(const ee in H){if(Zr(ee))continue;const w=H[ee],le=I[ee];w!==le&&ee!=="value"&&s(R,ee,le,w,W,Q)}"value"in H&&s(R,"value",I.value,H.value,W)}},j=(R,I,H,Q,W,ee,w,le,re)=>{const Z=I.el=R?R.el:o(""),se=I.anchor=R?R.anchor:o("");let{patchFlag:S,dynamicChildren:g,slotScopeIds:P}=I;P&&(le=le?le.concat(P):P),R==null?(n(Z,H,Q),n(se,H,Q),B(I.children||[],H,se,W,ee,w,le,re)):S>0&&S&64&&g&&R.dynamicChildren&&R.dynamicChildren.length===g.length?(E(R.dynamicChildren,g,H,W,ee,w,le),(I.key!=null||W&&I===W.subTree)&&Vd(R,I,!0)):J(R,I,H,se,W,ee,w,le,re)},q=(R,I,H,Q,W,ee,w,le,re)=>{I.slotScopeIds=le,R==null?I.shapeFlag&512?W.ctx.activate(I,H,Q,w,re):ne(I,H,Q,W,ee,w,re):te(R,I,re)},ne=(R,I,H,Q,W,ee,w)=>{const le=R.component=Om(R,Q,W);if(pc(R)&&(le.ctx.renderer=Pe),zm(le,!1,w),le.asyncDep){if(W&&W.registerDep(le,Y,w),!R.el){const re=le.subTree=Vi(fn);p(null,re,I,H),R.placeholder=re.el}}else Y(le,R,I,H,W,ee,w)},te=(R,I,H)=>{const Q=I.component=R.component;if(xm(R,I,H))if(Q.asyncDep&&!Q.asyncResolved){I.el=R.el,z(Q,I,H);return}else Q.next=I,Q.update();else I.el=R.el,Q.vnode=I},Y=(R,I,H,Q,W,ee,w)=>{const le=()=>{if(R.isMounted){let{next:S,bu:g,u:P,parent:k,vnode:K}=R;{const Ue=Hd(R);if(Ue){S&&(S.el=K.el,z(R,S,w)),Ue.asyncDep.then(()=>{Qt(()=>{R.isUnmounted||Z()},W)});return}}let G=S,ve;Fn(R,!1),S?(S.el=K.el,z(R,S,w)):S=K,g&&na(g),(ve=S.props&&S.props.onVnodeBeforeUpdate)&&Pi(ve,k,S,K),Fn(R,!0);const he=tu(R),Ae=R.subTree;R.subTree=he,v(Ae,he,h(Ae.el),oe(Ae),R,W,ee),S.el=he.el,G===null&&Mm(R,he.el),P&&Qt(P,W),(ve=S.props&&S.props.onVnodeUpdated)&&Qt(()=>Pi(ve,k,S,K),W)}else{let S;const{el:g,props:P}=I,{bm:k,m:K,parent:G,root:ve,type:he}=R,Ae=ts(I);Fn(R,!1),k&&na(k),!Ae&&(S=P&&P.onVnodeBeforeMount)&&Pi(S,G,I),Fn(R,!0);{ve.ce&&ve.ce._hasShadowRoot()&&ve.ce._injectChildStyle(he,R.parent?R.parent.type:void 0);const Ue=R.subTree=tu(R);v(null,Ue,H,Q,R,W,ee),I.el=Ue.el}if(K&&Qt(K,W),!Ae&&(S=P&&P.onVnodeMounted)){const Ue=I;Qt(()=>Pi(S,G,Ue),W)}(I.shapeFlag&256||G&&ts(G.vnode)&&G.vnode.shapeFlag&256)&&R.a&&Qt(R.a,W),R.isMounted=!0,I=H=Q=null}};R.scope.on();const re=R.effect=new Zh(le);R.scope.off();const Z=R.update=re.run.bind(re),se=R.job=re.runIfDirty.bind(re);se.i=R,se.id=R.uid,re.scheduler=()=>dc(se),Fn(R,!0),Z()},z=(R,I,H)=>{I.component=R;const Q=R.vnode.props;R.vnode=I,R.next=null,ym(R,I.props,Q,H),wm(R,I.children,H),hn(),$c(R),dn()},J=(R,I,H,Q,W,ee,w,le,re=!1)=>{const Z=R&&R.children,se=R?R.shapeFlag:0,S=I.children,{patchFlag:g,shapeFlag:P}=I;if(g>0){if(g&128){ge(Z,S,H,Q,W,ee,w,le,re);return}else if(g&256){Me(Z,S,H,Q,W,ee,w,le,re);return}}P&8?(se&16&&ie(Z,W,ee),S!==Z&&u(H,S)):se&16?P&16?ge(Z,S,H,Q,W,ee,w,le,re):ie(Z,W,ee,!0):(se&8&&u(H,""),P&16&&B(S,H,Q,W,ee,w,le,re))},Me=(R,I,H,Q,W,ee,w,le,re)=>{R=R||$n,I=I||$n;const Z=R.length,se=I.length,S=Math.min(Z,se);let g;for(g=0;g<S;g++){const P=I[g]=re?en(I[g]):Ni(I[g]);v(R[g],P,H,null,W,ee,w,le,re)}Z>se?ie(R,W,ee,!0,!1,S):B(I,H,Q,W,ee,w,le,re,S)},ge=(R,I,H,Q,W,ee,w,le,re)=>{let Z=0;const se=I.length;let S=R.length-1,g=se-1;for(;Z<=S&&Z<=g;){const P=R[Z],k=I[Z]=re?en(I[Z]):Ni(I[Z]);if(Br(P,k))v(P,k,H,null,W,ee,w,le,re);else break;Z++}for(;Z<=S&&Z<=g;){const P=R[S],k=I[g]=re?en(I[g]):Ni(I[g]);if(Br(P,k))v(P,k,H,null,W,ee,w,le,re);else break;S--,g--}if(Z>S){if(Z<=g){const P=g+1,k=P<se?I[P].el:Q;for(;Z<=g;)v(null,I[Z]=re?en(I[Z]):Ni(I[Z]),H,k,W,ee,w,le,re),Z++}}else if(Z>g)for(;Z<=S;)ze(R[Z],W,ee,!0),Z++;else{const P=Z,k=Z,K=new Map;for(Z=k;Z<=g;Z++){const ye=I[Z]=re?en(I[Z]):Ni(I[Z]);ye.key!=null&&K.set(ye.key,Z)}let G,ve=0;const he=g-k+1;let Ae=!1,Ue=0;const ce=new Array(he);for(Z=0;Z<he;Z++)ce[Z]=0;for(Z=P;Z<=S;Z++){const ye=R[Z];if(ve>=he){ze(ye,W,ee,!0);continue}let Re;if(ye.key!=null)Re=K.get(ye.key);else for(G=k;G<=g;G++)if(ce[G-k]===0&&Br(ye,I[G])){Re=G;break}Re===void 0?ze(ye,W,ee,!0):(ce[Re-k]=Z+1,Re>=Ue?Ue=Re:Ae=!0,v(ye,I[Re],H,null,W,ee,w,le,re),ve++)}const _e=Ae?Lm(ce):$n;for(G=_e.length-1,Z=he-1;Z>=0;Z--){const ye=k+Z,Re=I[ye],me=I[ye+1],$e=ye+1<se?me.el||Gd(me):Q;ce[Z]===0?v(null,Re,H,$e,W,ee,w,le,re):Ae&&(G<0||Z!==_e[G]?Se(Re,H,$e,2):G--)}}},Se=(R,I,H,Q,W=null)=>{const{el:ee,type:w,transition:le,children:re,shapeFlag:Z}=R;if(Z&6){Se(R.component.subTree,I,H,Q);return}if(Z&128){R.suspense.move(I,H,Q);return}if(Z&64){w.move(R,I,H,Pe);return}if(w===fi){n(ee,I,H);for(let S=0;S<re.length;S++)Se(re[S],I,H,Q);n(R.anchor,I,H);return}if(w===sa){T(R,I,H);return}if(Q!==2&&Z&1&&le)if(Q===0)le.persisted&&!ee[ro]?n(ee,I,H):(le.beforeEnter(ee),n(ee,I,H),Qt(()=>le.enter(ee),W));else{const{leave:S,delayLeave:g,afterLeave:P}=le,k=()=>{R.ctx.isUnmounted?r(ee):n(ee,I,H)},K=()=>{const G=ee._isLeaving||!!ee[ro];ee._isLeaving&&ee[ro](!0),le.persisted&&!G?k():S(ee,()=>{k(),P&&P()})};g?g(ee,k,K):K()}else n(ee,I,H)},ze=(R,I,H,Q=!1,W=!1)=>{const{type:ee,props:w,ref:le,children:re,dynamicChildren:Z,shapeFlag:se,patchFlag:S,dirs:g,cacheIndex:P,memo:k}=R;if((S===-2||Z&&Z.hasOnce)&&(W=!1),le!=null&&(hn(),es(le,null,H,R,!0),dn()),P!=null&&(!R.ctx||R.ctx===I)&&(I.renderCache[P]=void 0),se&256){I.ctx.deactivate(R);return}const K=se&1&&g,G=!ts(R);let ve;if(G&&(ve=w&&w.onVnodeBeforeUnmount)&&Pi(ve,I,R),se&6)ut(R.component,H,Q);else{if(se&128){R.suspense.unmount(H,Q);return}K&&Nn(R,null,I,"beforeUnmount"),se&64?R.type.remove(R,I,H,Pe,Q):Z&&!Z.hasOnce&&(ee!==fi||S>0&&S&64)?ie(Z,I,H,!1,!0):(ee===fi&&S&384||!W&&se&16)&&ie(re,I,H),Q&&qe(R)}const he=k!=null&&P==null;(G&&(ve=w&&w.onVnodeUnmounted)||K||he)&&Qt(()=>{ve&&Pi(ve,I,R),K&&Nn(R,null,I,"unmounted"),he&&(R.el=null)},H)},qe=R=>{const{type:I,el:H,anchor:Q,transition:W}=R;if(I===fi){gt(H,Q);return}if(I===sa){M(R),W&&!W.persisted&&W.afterLeave&&W.afterLeave();return}const ee=()=>{r(H),W&&!W.persisted&&W.afterLeave&&W.afterLeave()};if(R.shapeFlag&1&&W&&!W.persisted){const{leave:w,delayLeave:le}=W,re=()=>w(H,ee);le?le(R.el,ee,re):re()}else ee()},gt=(R,I)=>{let H;for(;R!==I;)H=d(R),r(R),R=H;r(I)},ut=(R,I,H)=>{const{bum:Q,scope:W,job:ee,subTree:w,um:le,m:re,a:Z}=R;ru(re),ru(Z),Q&&na(Q),W.stop(),ee?(ee.flags|=8,ze(w,R,I,H)):R.vnode.el&&w&&(w.transition=R.vnode.transition,ze(w,R,I,H)),le&&Qt(le,I),Qt(()=>{R.isUnmounted=!0},I)},ie=(R,I,H,Q=!1,W=!1,ee=0)=>{for(let w=ee;w<R.length;w++)ze(R[w],I,H,Q,W)},oe=R=>{if(R.shapeFlag&6)return oe(R.component.subTree);if(R.shapeFlag&128)return R.suspense.next();const I=d(R.anchor||R.el),H=I&&I[$p];return H?d(H):I};let Le=!1;const ke=(R,I,H)=>{let Q;R==null?I._vnode&&(ze(I._vnode,null,null,!0),Q=I._vnode.component):v(I._vnode||null,R,I,null,null,null,H),I._vnode=R,Le||(Le=!0,$c(Q),md(),Le=!1)},Pe={p:v,um:ze,m:Se,r:qe,mt:ne,mc:B,pc:J,pbc:E,n:oe,o:i};return{render:ke,hydrate:void 0,createApp:fm(ke)}}function oo({type:i,props:e},t){return t==="svg"&&i==="foreignObject"||t==="mathml"&&i==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Fn({effect:i,job:e},t){t?(i.flags|=32,e.flags|=4):(i.flags&=-33,e.flags&=-5)}function Cm(i,e){return(!i||i&&!i.pendingBranch)&&e&&!e.persisted}function Vd(i,e,t=!1){const n=i.children,r=e.children;if(Ve(n)&&Ve(r))for(let s=0;s<n.length;s++){const a=n[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=en(r[s]),o.el=a.el),!t&&o.patchFlag!==-2&&Vd(a,o)),o.type===Ga&&(o.patchFlag===-1&&(o=r[s]=en(o)),o.el=a.el),o.type===fn&&!o.el&&(o.el=a.el)}}function Lm(i){const e=i.slice(),t=[0];let n,r,s,a,o;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=t[t.length-1],i[r]<c){e[n]=r,t.push(n);continue}for(s=0,a=t.length-1;s<a;)o=s+a>>1,i[t[o]]<c?s=o+1:a=o;c<i[t[s]]&&(s>0&&(e[n]=t[s-1]),t[s]=n)}}for(s=t.length,a=t[s-1];s-- >0;)t[s]=a,a=e[a];return t}function Hd(i){const e=i.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Hd(e)}function ru(i){if(i)for(let e=0;e<i.length;e++)i[e].flags|=8}function Gd(i){if(i.placeholder)return i.placeholder;const e=i.component;return e?Gd(e.subTree):null}const kd=i=>i.__isSuspense;function Pm(i,e){e&&e.pendingBranch?Ve(i)?e.effects.push(...i):e.effects.push(i):Hp(i)}const fi=Symbol.for("v-fgt"),Ga=Symbol.for("v-txt"),fn=Symbol.for("v-cmt"),sa=Symbol.for("v-stc"),Zn=[];let li=null;function Mt(i=!1){Zn.push(li=i?null:[])}function Wd(){Zn.pop(),li=Zn[Zn.length-1]||null}let ls=1;function su(i,e=!1){ls+=i,i<0&&li&&e&&(li.hasOnce=!0)}function Xd(i){return i.dynamicChildren=ls>0?li||$n:null,Wd(),ls>0&&li&&li.push(i),i}function Et(i,e,t,n,r,s){return Xd(de(i,e,t,n,r,s,!0))}function qd(i,e,t,n,r){return Xd(Vi(i,e,t,n,r,!0))}function $d(i){return i?i.__v_isVNode===!0:!1}function Br(i,e){return i.type===e.type&&i.key===e.key}const Yd=({key:i})=>i??null,aa=({ref:i,ref_key:e,ref_for:t})=>(typeof i=="number"&&(i=""+i),i!=null?St(i)||Ht(i)||Xe(i)?{i:_i,r:i,k:e,f:!!t}:i:null);function de(i,e=null,t=null,n=0,r=null,s=i===fi?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:e,key:e&&Yd(e),ref:e&&aa(e),scopeId:_d,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:_i};return o?(Ma(l,t),s&128&&i.normalize(l)):t&&(l.shapeFlag|=St(t)?8:16),ls>0&&!a&&li&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&li.push(l),l}const Vi=Dm;function Dm(i,e=null,t=null,n=0,r=null,s=!1){if((!i||i===sm)&&(i=fn),$d(i)){const o=wr(i,e,!0);return t&&Ma(o,t),ls>0&&!s&&li&&(o.shapeFlag&6?li[li.indexOf(i)]=o:li.push(o)),o.patchFlag=-2,o}if(km(i)&&(i=i.__vccOpts),e){e=Im(e);let{class:o,style:l}=e;o&&!St(o)&&(e.class=Fa(o)),ct(l)&&(hc(l)&&!Ve(l)&&(l=Ft({},l)),e.style=Na(l))}const a=St(i)?1:kd(i)?128:za(i)?64:ct(i)?4:Xe(i)?2:0;return de(i,e,t,n,r,a,s,!0)}function Im(i){return i?hc(i)||Ud(i)?Ft({},i):i:null}function wr(i,e,t=!1,n=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=i,c=e?Um(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&Yd(c),ref:e&&e.ref?t&&s?Ve(s)?s.concat(aa(e)):[s,aa(e)]:aa(e):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:o,target:i.target,targetStart:i.targetStart,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:e&&i.type!==fi?a===-1?16:a|16:a,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:l,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&wr(i.ssContent),ssFallback:i.ssFallback&&wr(i.ssFallback),placeholder:i.placeholder,el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce,cacheIndex:i.cacheIndex};return l&&n&&fc(u,l.clone(u)),u}function jd(i=" ",e=0){return Vi(Ga,null,i,e)}function lo(i,e){const t=Vi(sa,null,i);return t.staticCount=e,t}function ei(i="",e=!1){return e?(Mt(),qd(fn,null,i)):Vi(fn,null,i)}function Ni(i){return i==null||typeof i=="boolean"?Vi(fn):Ve(i)?Vi(fi,null,i.slice()):$d(i)?en(i):Vi(Ga,null,String(i))}function en(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:wr(i)}function Ma(i,e){let t=0;const{shapeFlag:n}=i;if(e==null)e=null;else if(Ve(e))t=16;else if(typeof e=="object")if(n&65){const r=e.default;r&&(r._c&&(r._d=!1),Ma(i,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Ud(e)?e._ctx=_i:r===3&&_i&&(_i.slots._===1?e._=1:(e._=2,i.patchFlag|=1024))}else if(Xe(e)){if(n&65){Ma(i,{default:e});return}e={default:e,_ctx:_i},t=32}else e=String(e),n&64?(t=16,e=[jd(e)]):t=8;i.children=e,i.shapeFlag|=t}function Um(...i){const e={};for(let t=0;t<i.length;t++){const n=i[t];for(const r in n)if(r==="class")e.class!==n.class&&(e.class=Fa([e.class,n.class]));else if(r==="style")e.style=Na([e.style,n.style]);else if(Pa(r)){const s=e[r],a=n[r];a&&s!==a&&!(Ve(s)&&s.includes(a))?e[r]=s?[].concat(s,a):a:a==null&&s==null&&!Da(r)&&(e[r]=a)}else r!==""&&(e[r]=n[r])}return e}function Pi(i,e,t,n=null){Ci(i,e,7,[t,n])}const Nm=Cd();let Fm=0;function Om(i,e,t){const n=i.type,r=(e?e.appContext:i.appContext)||Nm,s={uid:Fm++,vnode:i,type:n,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new hp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Fd(n,r),emitsOptions:Ld(n,r),emit:null,emitted:null,propsDefaults:dt,inheritAttrs:n.inheritAttrs,ctx:dt,data:dt,props:dt,attrs:dt,slots:dt,refs:dt,setupState:dt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=mm.bind(null,s),i.ce&&i.ce(s),s}let Yt=null;const Bm=()=>Yt||_i;let Sa,cs;{const i=Ua(),e=(t,n)=>{let r;return(r=i[t])||(r=i[t]=[]),r.push(n),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};Sa=e("__VUE_INSTANCE_SETTERS__",t=>Yt=t),cs=e("__VUE_SSR_SETTERS__",t=>us=t)}const Ss=i=>{const e=Yt;return Sa(i),i.scope.on(),()=>{i.scope.off(),Sa(e)}},au=()=>{Yt&&Yt.scope.off(),Sa(null)};function Kd(i){return i.vnode.shapeFlag&4}let us=!1;function zm(i,e=!1,t=!1){e&&cs(e);const{props:n,children:r}=i.vnode,s=Kd(i);Sm(i,n,s,e),Em(i,r,t||e);const a=s?Vm(i,e):void 0;return e&&cs(!1),a}function Vm(i,e){const t=i.type;i.accessCache=Object.create(null),i.proxy=new Proxy(i.ctx,am);const{setup:n}=t;if(n){hn();const r=i.setupContext=n.length>1?Gm(i):null,s=Ss(i),a=Ms(n,i,0,[i.props,r]),o=Gh(a);if(dn(),s(),(o||i.sp)&&!ts(i)&&yd(i),o){if(a.then(au,au),e)return a.then(l=>{cs(!0);try{ou(i,l,e)}finally{cs(!1)}}).catch(l=>{Ba(l,i,0)});i.asyncDep=a}else ou(i,a)}else Zd(i)}function ou(i,e,t){Xe(e)?i.type.__ssrInlineRender?i.ssrRender=e:i.render=e:ct(e)&&(i.setupState=hd(e)),Zd(i)}function Zd(i,e,t){const n=i.type;i.render||(i.render=n.render||zi);{const r=Ss(i);hn();try{om(i)}finally{dn(),r()}}}const Hm={get(i,e){return Vt(i,"get",""),i[e]}};function Gm(i){const e=t=>{i.exposed=t||{}};return{attrs:new Proxy(i.attrs,Hm),slots:i.slots,emit:i.emit,expose:e}}function ka(i){return i.exposed?i.exposeProxy||(i.exposeProxy=new Proxy(hd(Pp(i.exposed)),{get(e,t){if(t in e)return e[t];if(t in is)return is[t](i)},has(e,t){return t in e||t in is}})):i.proxy}function km(i){return Xe(i)&&"__vccOpts"in i}const Wm=(i,e)=>Fp(i,e,us),Xm="3.5.43";/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let nl;const lu=typeof window<"u"&&window.trustedTypes;if(lu)try{nl=lu.createPolicy("vue",{createHTML:i=>i})}catch{}const Jd=nl?i=>nl.createHTML(i):i=>i,qm="http://www.w3.org/2000/svg",$m="http://www.w3.org/1998/Math/MathML",Qi=typeof document<"u"?document:null,cu=Qi&&Qi.createElement("template"),Ym={insert:(i,e,t)=>{e.insertBefore(i,t||null)},remove:i=>{const e=i.parentNode;e&&e.removeChild(i)},createElement:(i,e,t,n)=>{const r=e==="svg"?Qi.createElementNS(qm,i):e==="mathml"?Qi.createElementNS($m,i):t?Qi.createElement(i,{is:t}):Qi.createElement(i);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>Qi.createTextNode(i),createComment:i=>Qi.createComment(i),setText:(i,e)=>{i.nodeValue=e},setElementText:(i,e)=>{i.textContent=e},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>Qi.querySelector(i),setScopeId(i,e){i.setAttribute(e,"")},insertStaticContent(i,e,t,n,r,s){const a=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{cu.innerHTML=Jd(n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i);const o=cu.content;if(n==="svg"||n==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},jm=Symbol("_vtc");function Km(i,e,t){const n=i[jm];n&&(e=(e?[e,...n]:[...n]).join(" ")),e==null?i.removeAttribute("class"):t?i.setAttribute("class",e):i.className=e}const uu=Symbol("_vod"),Zm=Symbol("_vsh"),Jm=Symbol(""),Qm=/(?:^|;)\s*display\s*:/;function eg(i,e,t){const n=i.style,r=St(t);let s=!1;if(t&&!r){if(e)if(St(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&$r(n,o,"")}else for(const a in e)t[a]==null&&$r(n,a,"");for(const a in t){a==="display"&&(s=!0);const o=t[a];o!=null?ig(i,a,!St(e)&&e?e[a]:void 0,o)||$r(n,a,o):$r(n,a,"")}}else if(r){if(e!==t){const a=n[Jm];a&&(t+=";"+a),n.cssText=t,s=Qm.test(t)}}else e&&i.removeAttribute("style");uu in i&&(i[uu]=s?n.display:"",i[Zm]&&(n.display="none"))}const Ps=/\s*!important$/;function $r(i,e,t){if(Ve(t))t.forEach(n=>$r(i,e,n));else if(t==null&&(t=""),e.startsWith("--"))Ps.test(t)?i.setProperty(e,t.replace(Ps,""),"important"):i.setProperty(e,t);else{const n=tg(i,e);Ps.test(t)?i.setProperty(Qn(n),t.replace(Ps,""),"important"):i[n]=t}}const hu=["Webkit","Moz","ms"],co={};function tg(i,e){const t=co[e];if(t)return t;let n=Ai(e);if(n!=="filter"&&n in i)return co[e]=n;n=Xh(n);for(let r=0;r<hu.length;r++){const s=hu[r]+n;if(s in i)return co[e]=s}return e}function ig(i,e,t,n){return i.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&St(n)&&t===n}const du="http://www.w3.org/1999/xlink";function fu(i,e,t,n,r,s=lp(e)){n&&e.startsWith("xlink:")?t==null?i.removeAttributeNS(du,e.slice(6,e.length)):i.setAttributeNS(du,e,t):t==null||s&&!Yh(t)?i.removeAttribute(e):i.setAttribute(e,s?"":ki(t)?String(t):t)}function pu(i,e,t,n,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(i[e]=e==="innerHTML"?Jd(t):t);return}const s=i.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?i.getAttribute("value")||"":i.value,l=t==null?i.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in i))&&(i.value=l),t==null&&i.removeAttribute(e),i._value=t;return}let a=!1;if(t===""||t==null){const o=typeof i[e];o==="boolean"?t=Yh(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{i[e]=t}catch{}a&&i.removeAttribute(r||e)}function _c(i,e,t,n){i.addEventListener(e,t,n)}function ng(i,e,t,n){i.removeEventListener(e,t,n)}const mu=Symbol("_vei");function rg(i,e,t,n,r=null){const s=i[mu]||(i[mu]={}),a=s[e];if(n&&a)a.value=n;else{const[o,l]=og(e);if(n){const c=s[e]=ug(n,r);_c(i,o,c,l)}else a&&(ng(i,o,a,l),s[e]=void 0)}}const sg=/(Once|Passive|Capture)$/,ag=/^on:?(?:Once|Passive|Capture)$/;function og(i){let e,t;for(;(t=i.match(sg))&&!ag.test(i);)e||(e={}),i=i.slice(0,i.length-t[1].length),e[t[1].toLowerCase()]=!0;return[i[2]===":"?i.slice(3):Qn(i.slice(2)),e]}let uo=0;const lg=Promise.resolve(),cg=()=>uo||(lg.then(()=>uo=0),uo=Date.now());function ug(i,e){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;const r=t.value;if(Ve(r)){const s=n.stopImmediatePropagation;n.stopImmediatePropagation=()=>{s.call(n),n._stopped=!0};const a=r.slice(),o=[n];for(let l=0;l<a.length&&!n._stopped;l++){const c=a[l];c&&Ci(c,e,5,o)}}else Ci(r,e,5,[n])};return t.value=i,t.attached=cg(),t}const gu=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,hg=(i,e,t,n,r,s)=>{const a=r==="svg";e==="class"?Km(i,n,a):e==="style"?eg(i,t,n):Pa(e)?Da(e)||rg(i,e,t,n,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):dg(i,e,n,a))?(pu(i,e,n),!i.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&fu(i,e,n,a,s,e!=="value")):i._isVueCE&&(fg(i,e)||i._def.__asyncLoader&&(/[A-Z]/.test(e)||!St(n)))?pu(i,Ai(e),n,s,e):(e==="true-value"?i._trueValue=n:e==="false-value"&&(i._falseValue=n),fu(i,e,n,a))};function dg(i,e,t,n){if(n)return!!(e==="innerHTML"||e==="textContent"||e in i&&gu(e)&&Xe(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&i.tagName==="IFRAME"||e==="form"||e==="list"&&i.tagName==="INPUT"||e==="type"&&i.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return gu(e)&&St(t)?!1:e in i}function fg(i,e){const t=i._def.props;if(!t)return!1;const n=Ai(e);return Array.isArray(t)?t.some(r=>Ai(r)===n):Object.keys(t).some(r=>Ai(r)===n)}const ya=i=>{const e=i.props["onUpdate:modelValue"]||!1;return Ve(e)?t=>na(e,t):e},br=Symbol("_assign"),pg={deep:!0,created(i,e,t){i[br]=ya(t),_c(i,"change",()=>{const n=i._modelValue,r=hs(i),s=i.checked,a=i[br];if(Ve(n)){const o=nc(n,r),l=o!==-1;if(s&&!l)a(n.concat(r));else if(!s&&l){const c=[...n];c.splice(o,1),a(c)}}else if(cn(n)){const o=new Set(n);s?o.add(r):o.delete(r),a(o)}else a(Qd(i,s))})},mounted:_u,beforeUpdate(i,e,t){i[br]=ya(t),_u(i,e,t)}};function _u(i,{value:e,oldValue:t},n){i._modelValue=e;let r;if(Ve(e))r=nc(e,n.props.value)>-1;else if(cn(e))r=e.has(n.props.value);else{if(e===t)return;r=un(e,Qd(i,!0))}i.checked!==r&&(i.checked=r)}const mg={deep:!0,created(i,{value:e,modifiers:{number:t}},n){i._modelValue=e,_c(i,"change",()=>{const r=Array.prototype.filter.call(i.options,l=>l.selected).map(l=>t?$h(hs(l)):hs(l)),s=i.multiple,a=s?cn(i._modelValue)?new Set(r):r:r[0],o=i._pendingValue=[s,s?Ve(a)?r.slice():r:a];try{i[br](a)}finally{fd(()=>{i._pendingValue===o&&(i._pendingValue=void 0)})}}),i[br]=ya(n)},mounted(i,{value:e}){vu(i,e)},beforeUpdate(i,{value:e},t){i._modelValue=e,i[br]=ya(t)},updated(i,{value:e}){const t=i._pendingValue;i._pendingValue=void 0,(!t||t[0]!==i.multiple||!gg(e,t[1],t[0]))&&vu(i,e)}};function gg(i,e,t){if(!t||Ve(i))return un(i,e);if(cn(i)){if(i.size!==e.length)return!1;for(const n of e)if(!i.has(n))return!1;return!0}return!1}function vu(i,e){const t=i.multiple,n=Ve(e);if(!(t&&!n&&!cn(e))){for(let r=0,s=i.options.length;r<s;r++){const a=i.options[r],o=hs(a);if(t)if(n){const l=typeof o;l==="string"||l==="number"?a.selected=e.some(c=>String(c)===String(o)):a.selected=nc(e,o)>-1}else a.selected=e.has(o);else if(un(hs(a),e)){i.selectedIndex!==r&&(i.selectedIndex=r);return}}!t&&i.selectedIndex!==-1&&(i.selectedIndex=-1)}}function hs(i){return"_value"in i?i._value:i.value}function Qd(i,e){const t=e?"_trueValue":"_falseValue";return t in i?i[t]:e}const _g=Ft({patchProp:hg},Ym);let xu;function vg(){return xu||(xu=Am(_g))}const xg=(...i)=>{const e=vg().createApp(...i),{mount:t}=e;return e.mount=n=>{const r=Sg(n);if(!r)return;const s=e._component;!Xe(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=t(r,!1,Mg(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function Mg(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function Sg(i){return St(i)?document.querySelector(i):i}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vc="182",yg=0,Mu=1,bg=2,oa=1,Tg=2,Yr=3,Dn=0,Kt=1,rn=2,on=0,Tr=1,Su=2,yu=3,bu=4,Eg=5,Xn=100,wg=101,Ag=102,Rg=103,Cg=104,Lg=200,Pg=201,Dg=202,Ig=203,rl=204,sl=205,Ug=206,Ng=207,Fg=208,Og=209,Bg=210,zg=211,Vg=212,Hg=213,Gg=214,al=0,ol=1,ll=2,Ar=3,cl=4,ul=5,hl=6,dl=7,ef=0,kg=1,Wg=2,Hi=0,tf=1,nf=2,rf=3,sf=4,af=5,of=6,lf=7,cf=300,Jn=301,Rr=302,fl=303,pl=304,Wa=306,ml=1e3,ci=1001,gl=1002,Ut=1003,Xg=1004,Ds=1005,wt=1006,ho=1007,wn=1008,gi=1009,uf=1010,hf=1011,ds=1012,xc=1013,Xi=1014,Ei=1015,pn=1016,Mc=1017,Sc=1018,fs=1020,df=35902,ff=35899,pf=1021,mf=1022,wi=1023,mn=1026,Yn=1027,yc=1028,bc=1029,Cr=1030,Tc=1031,Ec=1033,la=33776,ca=33777,ua=33778,ha=33779,_l=35840,vl=35841,xl=35842,Ml=35843,Sl=36196,yl=37492,bl=37496,Tl=37488,El=37489,wl=37490,Al=37491,Rl=37808,Cl=37809,Ll=37810,Pl=37811,Dl=37812,Il=37813,Ul=37814,Nl=37815,Fl=37816,Ol=37817,Bl=37818,zl=37819,Vl=37820,Hl=37821,Gl=36492,kl=36494,Wl=36495,Xl=36283,ql=36284,$l=36285,Yl=36286,qg=3200,$g=0,Yg=1,sn="",qt="srgb",Lr="srgb-linear",ba="linear",ot="srgb",nr=7680,Tu=519,jg=512,Kg=513,Zg=514,wc=515,Jg=516,Qg=517,Ac=518,e_=519,Eu=35044,wu="300 es",Bi=2e3,Ta=2001;function gf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function t_(){const i=ps("canvas");return i.style.display="block",i}const Au={};function Ru(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ge(...i){const e="THREE."+i.shift();console.warn(e,...i)}function it(...i){const e="THREE."+i.shift();console.error(e,...i)}function ms(...i){const e=i.join(" ");e in Au||(Au[e]=!0,Ge(...i))}function i_(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class Ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cu=1234567;const ns=Math.PI/180,gs=180/Math.PI;function Ur(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Rc(i,e){return(i%e+e)%e}function n_(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function r_(i,e,t){return i!==e?(t-i)/(e-i):0}function rs(i,e,t){return(1-t)*i+t*e}function s_(i,e,t,n){return rs(i,e,1-Math.exp(-t*n))}function a_(i,e=1){return e-Math.abs(Rc(i,e*2)-e)}function o_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function l_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function c_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function u_(i,e){return i+Math.random()*(e-i)}function h_(i){return i*(.5-Math.random())}function d_(i){i!==void 0&&(Cu=i);let e=Cu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function f_(i){return i*ns}function p_(i){return i*gs}function m_(i){return(i&i-1)===0&&i!==0}function g_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function __(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function v_(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),_=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*_,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*_,o*c);break;case"ZYZ":i.set(l*_,l*f,o*u,o*c);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function xr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ue={DEG2RAD:ns,RAD2DEG:gs,generateUUID:Ur,clamp:Ze,euclideanModulo:Rc,mapLinear:n_,inverseLerp:r_,lerp:rs,damp:s_,pingpong:a_,smoothstep:o_,smootherstep:l_,randInt:c_,randFloat:u_,randFloatSpread:h_,seededRandom:d_,degToRad:f_,radToDeg:p_,isPowerOfTwo:m_,ceilPowerOfTwo:g_,floorPowerOfTwo:__,setQuaternionFromProperEuler:v_,normalize:Wt,denormalize:xr};class Fe{constructor(e=0,t=0){Fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class bi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[a+0],f=s[a+1],_=s[a+2],v=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o>=1){e[t+0]=d,e[t+1]=f,e[t+2]=_,e[t+3]=v;return}if(h!==v||l!==d||c!==f||u!==_){let m=l*d+c*f+u*_+h*v;m<0&&(d=-d,f=-f,_=-_,v=-v,m=-m);let p=1-o;if(m<.9995){const b=Math.acos(m),T=Math.sin(b);p=Math.sin(p*b)/T,o=Math.sin(o*b)/T,l=l*p+d*o,c=c*p+f*o,u=u*p+_*o,h=h*p+v*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+_*o,h=h*p+v*o;const b=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=b,c*=b,u*=b,h*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],f=s[a+2],_=s[a+3];return e[t]=o*_+u*h+l*f-c*d,e[t+1]=l*_+u*d+c*h-o*f,e[t+2]=c*_+u*f+o*d-l*h,e[t+3]=u*_-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),f=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*_,this._y=c*f*h-d*u*_,this._z=c*u*_+d*f*h,this._w=c*u*h-d*f*_;break;case"YXZ":this._x=d*u*h+c*f*_,this._y=c*f*h-d*u*_,this._z=c*u*_-d*f*h,this._w=c*u*h+d*f*_;break;case"ZXY":this._x=d*u*h-c*f*_,this._y=c*f*h+d*u*_,this._z=c*u*_+d*f*h,this._w=c*u*h-d*f*_;break;case"ZYX":this._x=d*u*h-c*f*_,this._y=c*f*h+d*u*_,this._z=c*u*_-d*f*h,this._w=c*u*h+d*f*_;break;case"YZX":this._x=d*u*h+c*f*_,this._y=c*f*h+d*u*_,this._z=c*u*_-d*f*h,this._w=c*u*h-d*f*_;break;case"XZY":this._x=d*u*h-c*f*_,this._y=c*f*h-d*u*_,this._z=c*u*_+d*f*h,this._w=c*u*h+d*f*_;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fo.copy(this).projectOnVector(e),this.sub(fo)}reflect(e){return this.sub(fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fo=new U,Lu=new bi;class Ye{constructor(e,t,n,r,s,a,o,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],_=n[8],v=r[0],m=r[3],p=r[6],b=r[1],T=r[4],M=r[7],A=r[2],C=r[5],D=r[8];return s[0]=a*v+o*b+l*A,s[3]=a*m+o*T+l*C,s[6]=a*p+o*M+l*D,s[1]=c*v+u*b+h*A,s[4]=c*m+u*T+h*C,s[7]=c*p+u*M+h*D,s[2]=d*v+f*b+_*A,s[5]=d*m+f*T+_*C,s[8]=d*p+f*M+_*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,_=t*h+n*d+r*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(r*c-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=d*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(po.makeScale(e,t)),this}rotate(e){return this.premultiply(po.makeRotation(-e)),this}translate(e,t){return this.premultiply(po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const po=new Ye,Pu=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Du=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function x_(){const i={enabled:!0,workingColorSpace:Lr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=ln(r.r),r.g=ln(r.g),r.b=ln(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=Er(r.r),r.g=Er(r.g),r.b=Er(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===sn?ba:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ms("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ms("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Lr]:{primaries:e,whitePoint:n,transfer:ba,toXYZ:Pu,fromXYZ:Du,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:Pu,fromXYZ:Du,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),i}const Qe=x_();function ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Er(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let rr;class M_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rr===void 0&&(rr=ps("canvas")),rr.width=e.width,rr.height=e.height;const r=rr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=rr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ps("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ln(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ln(t[n]/255)*255):t[n]=ln(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let S_=0;class Cc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:S_++}),this.uuid=Ur(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(mo(r[a].image)):s.push(mo(r[a]))}else s=mo(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function mo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?M_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let y_=0;const go=new U;class Nt extends Ir{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=ci,r=ci,s=wt,a=wn,o=wi,l=gi,c=Nt.DEFAULT_ANISOTROPY,u=sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=Ur(),this.name="",this.source=new Cc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(go).x}get height(){return this.source.getSize(go).y}get depth(){return this.source.getSize(go).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ml:e.x=e.x-Math.floor(e.x);break;case ci:e.x=e.x<0?0:1;break;case gl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ml:e.y=e.y-Math.floor(e.y);break;case ci:e.y=e.y<0?0:1;break;case gl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=cf;Nt.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,n=0,r=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],_=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,M=(f+1)/2,A=(p+1)/2,C=(u+d)/4,D=(h+v)/4,B=(_+m)/4;return T>M&&T>A?T<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(T),r=C/n,s=D/n):M>A?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=C/r,s=B/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=D/s,r=B/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-_)*(m-_)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(h-v)/b,this.z=(d-u)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class b_ extends Ir{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Nt(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Cc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends b_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class _f extends Nt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class T_ extends Nt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ys{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mi):Mi.fromBufferAttribute(s,a),Mi.applyMatrix4(e.matrixWorld),this.expandByPoint(Mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Is.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(e.matrixWorld),this.union(Is)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mi),Mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),Us.subVectors(this.max,zr),sr.subVectors(e.a,zr),ar.subVectors(e.b,zr),or.subVectors(e.c,zr),xn.subVectors(ar,sr),Mn.subVectors(or,ar),On.subVectors(sr,or);let t=[0,-xn.z,xn.y,0,-Mn.z,Mn.y,0,-On.z,On.y,xn.z,0,-xn.x,Mn.z,0,-Mn.x,On.z,0,-On.x,-xn.y,xn.x,0,-Mn.y,Mn.x,0,-On.y,On.x,0];return!_o(t,sr,ar,or,Us)||(t=[1,0,0,0,1,0,0,0,1],!_o(t,sr,ar,or,Us))?!1:(Ns.crossVectors(xn,Mn),t=[Ns.x,Ns.y,Ns.z],_o(t,sr,ar,or,Us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yi=[new U,new U,new U,new U,new U,new U,new U,new U],Mi=new U,Is=new ys,sr=new U,ar=new U,or=new U,xn=new U,Mn=new U,On=new U,zr=new U,Us=new U,Ns=new U,Bn=new U;function _o(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Bn.fromArray(i,s);const o=r.x*Math.abs(Bn.x)+r.y*Math.abs(Bn.y)+r.z*Math.abs(Bn.z),l=e.dot(Bn),c=t.dot(Bn),u=n.dot(Bn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const E_=new ys,Vr=new U,vo=new U;class bs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):E_.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vr.subVectors(e,this.center);const t=Vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Vr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vr.copy(e.center).add(vo)),this.expandByPoint(Vr.copy(e.center).sub(vo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ji=new U,xo=new U,Fs=new U,Sn=new U,Mo=new U,Os=new U,So=new U;class vf{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ji.copy(this.origin).addScaledVector(this.direction,t),ji.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){xo.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),Sn.copy(this.origin).sub(xo);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Fs),o=Sn.dot(this.direction),l=-Sn.dot(Fs),c=Sn.lengthSq(),u=Math.abs(1-a*a);let h,d,f,_;if(u>0)if(h=a*l-o,d=a*o-l,_=s*u,h>=0)if(d>=-_)if(d<=_){const v=1/u;h*=v,d*=v,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-_?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=_?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(xo).addScaledVector(Fs,d),f}intersectSphere(e,t){ji.subVectors(e.center,this.origin);const n=ji.dot(this.direction),r=ji.dot(ji)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ji)!==null}intersectTriangle(e,t,n,r,s){Mo.subVectors(t,e),Os.subVectors(n,e),So.crossVectors(Mo,Os);let a=this.direction.dot(So),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Sn.subVectors(this.origin,e);const l=o*this.direction.dot(Os.crossVectors(Sn,Os));if(l<0)return null;const c=o*this.direction.dot(Mo.cross(Sn));if(c<0||l+c>a)return null;const u=-o*Sn.dot(So);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,n,r,s,a,o,l,c,u,h,d,f,_,v,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,h,d,f,_,v,m)}set(e,t,n,r,s,a,o,l,c,u,h,d,f,_,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/lr.setFromMatrixColumn(e,0).length(),s=1/lr.setFromMatrixColumn(e,1).length(),a=1/lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,_=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+_*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,_=c*u,v=c*h;t[0]=d+v*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-_,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,_=c*u,v=c*h;t[0]=d-v*o,t[4]=-a*h,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,_=o*u,v=o*h;t[0]=l*u,t[4]=_*c-f,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=v-d*h,t[8]=_*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+_,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=a*u,t[9]=f*h-_,t[2]=_*h-f,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(w_,e,A_)}lookAt(e,t,n){const r=this.elements;return ai.subVectors(e,t),ai.lengthSq()===0&&(ai.z=1),ai.normalize(),yn.crossVectors(n,ai),yn.lengthSq()===0&&(Math.abs(n.z)===1?ai.x+=1e-4:ai.z+=1e-4,ai.normalize(),yn.crossVectors(n,ai)),yn.normalize(),Bs.crossVectors(ai,yn),r[0]=yn.x,r[4]=Bs.x,r[8]=ai.x,r[1]=yn.y,r[5]=Bs.y,r[9]=ai.y,r[2]=yn.z,r[6]=Bs.z,r[10]=ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],_=n[2],v=n[6],m=n[10],p=n[14],b=n[3],T=n[7],M=n[11],A=n[15],C=r[0],D=r[4],B=r[8],x=r[12],E=r[1],N=r[5],j=r[9],q=r[13],ne=r[2],te=r[6],Y=r[10],z=r[14],J=r[3],Me=r[7],ge=r[11],Se=r[15];return s[0]=a*C+o*E+l*ne+c*J,s[4]=a*D+o*N+l*te+c*Me,s[8]=a*B+o*j+l*Y+c*ge,s[12]=a*x+o*q+l*z+c*Se,s[1]=u*C+h*E+d*ne+f*J,s[5]=u*D+h*N+d*te+f*Me,s[9]=u*B+h*j+d*Y+f*ge,s[13]=u*x+h*q+d*z+f*Se,s[2]=_*C+v*E+m*ne+p*J,s[6]=_*D+v*N+m*te+p*Me,s[10]=_*B+v*j+m*Y+p*ge,s[14]=_*x+v*q+m*z+p*Se,s[3]=b*C+T*E+M*ne+A*J,s[7]=b*D+T*N+M*te+A*Me,s[11]=b*B+T*j+M*Y+A*ge,s[15]=b*x+T*q+M*z+A*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],_=e[3],v=e[7],m=e[11],p=e[15],b=l*f-c*d,T=o*f-c*h,M=o*d-l*h,A=a*f-c*u,C=a*d-l*u,D=a*h-o*u;return t*(v*b-m*T+p*M)-n*(_*b-m*A+p*C)+r*(_*T-v*A+p*D)-s*(_*M-v*C+m*D)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],_=e[12],v=e[13],m=e[14],p=e[15],b=h*m*c-v*d*c+v*l*f-o*m*f-h*l*p+o*d*p,T=_*d*c-u*m*c-_*l*f+a*m*f+u*l*p-a*d*p,M=u*v*c-_*h*c+_*o*f-a*v*f-u*o*p+a*h*p,A=_*h*l-u*v*l-_*o*d+a*v*d+u*o*m-a*h*m,C=t*b+n*T+r*M+s*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/C;return e[0]=b*D,e[1]=(v*d*s-h*m*s-v*r*f+n*m*f+h*r*p-n*d*p)*D,e[2]=(o*m*s-v*l*s+v*r*c-n*m*c-o*r*p+n*l*p)*D,e[3]=(h*l*s-o*d*s-h*r*c+n*d*c+o*r*f-n*l*f)*D,e[4]=T*D,e[5]=(u*m*s-_*d*s+_*r*f-t*m*f-u*r*p+t*d*p)*D,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*p-t*l*p)*D,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*f+t*l*f)*D,e[8]=M*D,e[9]=(_*h*s-u*v*s-_*n*f+t*v*f+u*n*p-t*h*p)*D,e[10]=(a*v*s-_*o*s+_*n*c-t*v*c-a*n*p+t*o*p)*D,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*f-t*o*f)*D,e[12]=A*D,e[13]=(u*v*r-_*h*r+_*n*d-t*v*d-u*n*m+t*h*m)*D,e[14]=(_*o*r-a*v*r-_*n*l+t*v*l+a*n*m-t*o*m)*D,e[15]=(a*h*r-u*o*r+u*n*l-t*h*l-a*n*d+t*o*d)*D,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,_=s*h,v=a*u,m=a*h,p=o*h,b=l*c,T=l*u,M=l*h,A=n.x,C=n.y,D=n.z;return r[0]=(1-(v+p))*A,r[1]=(f+M)*A,r[2]=(_-T)*A,r[3]=0,r[4]=(f-M)*C,r[5]=(1-(d+p))*C,r[6]=(m+b)*C,r[7]=0,r[8]=(_+T)*D,r[9]=(m-b)*D,r[10]=(1-(d+v))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;if(e.x=r[12],e.y=r[13],e.z=r[14],this.determinant()===0)return n.set(1,1,1),t.identity(),this;let s=lr.set(r[0],r[1],r[2]).length();const a=lr.set(r[4],r[5],r[6]).length(),o=lr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),Si.copy(this);const c=1/s,u=1/a,h=1/o;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=u,Si.elements[5]*=u,Si.elements[6]*=u,Si.elements[8]*=h,Si.elements[9]*=h,Si.elements[10]*=h,t.setFromRotationMatrix(Si),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Bi,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let _,v;if(l)_=s/(a-s),v=a*s/(a-s);else if(o===Bi)_=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Ta)_=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Bi,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r);let _,v;if(l)_=1/(a-s),v=a/(a-s);else if(o===Bi)_=-2/(a-s),v=-(a+s)/(a-s);else if(o===Ta)_=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const lr=new U,Si=new _t,w_=new U(0,0,0),A_=new U(1,1,1),yn=new U,Bs=new U,ai=new U,Iu=new _t,Uu=new bi;class gn{constructor(e=0,t=0,n=0,r=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Iu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Iu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uu.setFromEuler(this),this.setFromQuaternion(Uu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class xf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let R_=0;const Nu=new U,cr=new bi,Ki=new _t,zs=new U,Hr=new U,C_=new U,L_=new bi,Fu=new U(1,0,0),Ou=new U(0,1,0),Bu=new U(0,0,1),zu={type:"added"},P_={type:"removed"},ur={type:"childadded",child:null},yo={type:"childremoved",child:null};class ti extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:R_++}),this.uuid=Ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ti.DEFAULT_UP.clone();const e=new U,t=new gn,n=new bi,r=new U(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ye}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=ti.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Fu,e)}rotateY(e){return this.rotateOnAxis(Ou,e)}rotateZ(e){return this.rotateOnAxis(Bu,e)}translateOnAxis(e,t){return Nu.copy(e).applyQuaternion(this.quaternion),this.position.add(Nu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fu,e)}translateY(e){return this.translateOnAxis(Ou,e)}translateZ(e){return this.translateOnAxis(Bu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ki.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zs.copy(e):zs.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ki.lookAt(Hr,zs,this.up):Ki.lookAt(zs,Hr,this.up),this.quaternion.setFromRotationMatrix(Ki),r&&(Ki.extractRotation(r.matrixWorld),cr.setFromRotationMatrix(Ki),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zu),ur.child=e,this.dispatchEvent(ur),ur.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(P_),yo.child=e,this.dispatchEvent(yo),yo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ki),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zu),ur.child=e,this.dispatchEvent(ur),ur.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hr,e,C_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hr,L_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}ti.DEFAULT_UP=new U(0,1,0);ti.DEFAULT_MATRIX_AUTO_UPDATE=!0;ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yi=new U,Zi=new U,bo=new U,Ji=new U,hr=new U,dr=new U,Vu=new U,To=new U,Eo=new U,wo=new U,Ao=new bt,Ro=new bt,Co=new bt;class Ti{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),yi.subVectors(e,t),r.cross(yi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){yi.subVectors(r,t),Zi.subVectors(n,t),bo.subVectors(e,t);const a=yi.dot(yi),o=yi.dot(Zi),l=yi.dot(bo),c=Zi.dot(Zi),u=Zi.dot(bo),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,_=(a*u-o*l)*d;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ji)===null?!1:Ji.x>=0&&Ji.y>=0&&Ji.x+Ji.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Ji)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ji.x),l.addScaledVector(a,Ji.y),l.addScaledVector(o,Ji.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ao.setScalar(0),Ro.setScalar(0),Co.setScalar(0),Ao.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,n),Co.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ao,s.x),a.addScaledVector(Ro,s.y),a.addScaledVector(Co,s.z),a}static isFrontFacing(e,t,n,r){return yi.subVectors(n,t),Zi.subVectors(e,t),yi.cross(Zi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yi.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),yi.cross(Zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ti.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Ti.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;hr.subVectors(r,n),dr.subVectors(s,n),To.subVectors(e,n);const l=hr.dot(To),c=dr.dot(To);if(l<=0&&c<=0)return t.copy(n);Eo.subVectors(e,r);const u=hr.dot(Eo),h=dr.dot(Eo);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(hr,a);wo.subVectors(e,s);const f=hr.dot(wo),_=dr.dot(wo);if(_>=0&&f<=_)return t.copy(s);const v=f*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(dr,o);const m=u*_-f*h;if(m<=0&&h-u>=0&&f-_>=0)return Vu.subVectors(s,r),o=(h-u)/(h-u+(f-_)),t.copy(r).addScaledVector(Vu,o);const p=1/(m+v+d);return a=v*p,o=d*p,t.copy(n).addScaledVector(hr,a).addScaledVector(dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function Lo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Qe.workingColorSpace){if(e=Rc(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Lo(a,s,e+1/3),this.g=Lo(a,s,e),this.b=Lo(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=qt){function n(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const n=Mf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ln(e.r),this.g=ln(e.g),this.b=ln(e.b),this}copyLinearToSRGB(e){return this.r=Er(e.r),this.g=Er(e.g),this.b=Er(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Qe.workingToColorSpace(Bt.copy(this),e),Math.round(Ze(Bt.r*255,0,255))*65536+Math.round(Ze(Bt.g*255,0,255))*256+Math.round(Ze(Bt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Bt.copy(this),t);const n=Bt.r,r=Bt.g,s=Bt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=qt){Qe.workingToColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,r=Bt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(bn),this.setHSL(bn.h+e,bn.s+t,bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bn),e.getHSL(Vs);const n=rs(bn.h,Vs.h,t),r=rs(bn.s,Vs.s,t),s=rs(bn.l,Vs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new et;et.NAMES=Mf;let D_=0;class Ts extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=Ur(),this.name="",this.type="Material",this.blending=Tr,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rl,this.blendDst=sl,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nr,this.stencilZFail=nr,this.stencilZPass=nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Tr&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==rl&&(n.blendSrc=this.blendSrc),this.blendDst!==sl&&(n.blendDst=this.blendDst),this.blendEquation!==Xn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ar&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==nr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==nr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==nr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ea extends Ts{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=ef,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new U,Hs=new Fe;let I_=0;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:I_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Eu,this.updateRanges=[],this.gpuType=Ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),r=Wt(r,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eu&&(e.usage=this.usage),e}}class Sf extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class yf extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let U_=0;const di=new _t,Po=new ti,fr=new U,oi=new ys,Gr=new ys,Lt=new U;class ni extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:U_++}),this.uuid=Ur(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gf(e)?yf:Sf)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ye().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return di.makeRotationFromQuaternion(e),this.applyMatrix4(di),this}rotateX(e){return di.makeRotationX(e),this.applyMatrix4(di),this}rotateY(e){return di.makeRotationY(e),this.applyMatrix4(di),this}rotateZ(e){return di.makeRotationZ(e),this.applyMatrix4(di),this}translate(e,t,n){return di.makeTranslation(e,t,n),this.applyMatrix4(di),this}scale(e,t,n){return di.makeScale(e,t,n),this.applyMatrix4(di),this}lookAt(e){return Po.lookAt(e),Po.updateMatrix(),this.applyMatrix4(Po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ys);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];oi.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(oi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Gr.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(oi.min,Gr.min),oi.expandByPoint(Lt),Lt.addVectors(oi.max,Gr.max),oi.expandByPoint(Lt)):(oi.expandByPoint(Gr.min),oi.expandByPoint(Gr.max))}oi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Lt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Lt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Lt.fromBufferAttribute(o,c),l&&(fr.fromBufferAttribute(e,c),Lt.add(fr)),r=Math.max(r,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let B=0;B<n.count;B++)o[B]=new U,l[B]=new U;const c=new U,u=new U,h=new U,d=new Fe,f=new Fe,_=new Fe,v=new U,m=new U;function p(B,x,E){c.fromBufferAttribute(n,B),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,E),d.fromBufferAttribute(s,B),f.fromBufferAttribute(s,x),_.fromBufferAttribute(s,E),u.sub(c),h.sub(c),f.sub(d),_.sub(d);const N=1/(f.x*_.y-_.x*f.y);isFinite(N)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(h,-f.y).multiplyScalar(N),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(N),o[B].add(v),o[x].add(v),o[E].add(v),l[B].add(m),l[x].add(m),l[E].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let B=0,x=b.length;B<x;++B){const E=b[B],N=E.start,j=E.count;for(let q=N,ne=N+j;q<ne;q+=3)p(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const T=new U,M=new U,A=new U,C=new U;function D(B){A.fromBufferAttribute(r,B),C.copy(A);const x=o[B];T.copy(x),T.sub(A.multiplyScalar(A.dot(x))).normalize(),M.crossVectors(C,x);const N=M.dot(l[B])<0?-1:1;a.setXYZW(B,T.x,T.y,T.z,N)}for(let B=0,x=b.length;B<x;++B){const E=b[B],N=E.start,j=E.count;for(let q=N,ne=N+j;q<ne;q+=3)D(e.getX(q+0)),D(e.getX(q+1)),D(e.getX(q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,l=new U,c=new U,u=new U,h=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){const _=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let p=0;p<u;p++)d[_++]=c[f++]}return new jt(d,u,h)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ni,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hu=new _t,zn=new vf,Gs=new bs,Gu=new U,ks=new U,Ws=new U,Xs=new U,Do=new U,qs=new U,ku=new U,$s=new U;class ii extends ti{constructor(e=new ni,t=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){qs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Do.fromBufferAttribute(h,e),a?qs.addScaledVector(Do,u):qs.addScaledVector(Do.sub(t),u))}t.add(qs)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(s),zn.copy(e.ray).recast(e.near),!(Gs.containsPoint(zn.origin)===!1&&(zn.intersectSphere(Gs,Gu)===null||zn.origin.distanceToSquared(Gu)>(e.far-e.near)**2))&&(Hu.copy(s).invert(),zn.copy(e.ray).applyMatrix4(Hu),!(n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],p=a[m.materialIndex],b=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,A=T;M<A;M+=3){const C=o.getX(M),D=o.getX(M+1),B=o.getX(M+2);r=Ys(this,p,e,n,c,u,h,C,D,B),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=_,p=v;m<p;m+=3){const b=o.getX(m),T=o.getX(m+1),M=o.getX(m+2);r=Ys(this,a,e,n,c,u,h,b,T,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],p=a[m.materialIndex],b=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,A=T;M<A;M+=3){const C=M,D=M+1,B=M+2;r=Ys(this,p,e,n,c,u,h,C,D,B),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=_,p=v;m<p;m+=3){const b=m,T=m+1,M=m+2;r=Ys(this,a,e,n,c,u,h,b,T,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function N_(i,e,t,n,r,s,a,o){let l;if(e.side===Kt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Dn,o),l===null)return null;$s.copy(o),$s.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo($s);return c<t.near||c>t.far?null:{distance:c,point:$s.clone(),object:i}}function Ys(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,ks),i.getVertexPosition(l,Ws),i.getVertexPosition(c,Xs);const u=N_(i,e,t,n,ks,Ws,Xs,ku);if(u){const h=new U;Ti.getBarycoord(ku,ks,Ws,Xs,h),r&&(u.uv=Ti.getInterpolatedAttribute(r,o,l,c,h,new Fe)),s&&(u.uv1=Ti.getInterpolatedAttribute(s,o,l,c,h,new Fe)),a&&(u.normal=Ti.getInterpolatedAttribute(a,o,l,c,h,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new U,materialIndex:0};Ti.getNormal(ks,Ws,Xs,d.normal),u.face=d,u.barycoord=h}return u}class Es extends ni{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(h,2));function _(v,m,p,b,T,M,A,C,D,B,x){const E=M/D,N=A/B,j=M/2,q=A/2,ne=C/2,te=D+1,Y=B+1;let z=0,J=0;const Me=new U;for(let ge=0;ge<Y;ge++){const Se=ge*N-q;for(let ze=0;ze<te;ze++){const qe=ze*E-j;Me[v]=qe*b,Me[m]=Se*T,Me[p]=ne,c.push(Me.x,Me.y,Me.z),Me[v]=0,Me[m]=0,Me[p]=C>0?1:-1,u.push(Me.x,Me.y,Me.z),h.push(ze/D),h.push(1-ge/B),z+=1}}for(let ge=0;ge<B;ge++)for(let Se=0;Se<D;Se++){const ze=d+Se+te*ge,qe=d+Se+te*(ge+1),gt=d+(Se+1)+te*(ge+1),ut=d+(Se+1)+te*ge;l.push(ze,qe,ut),l.push(qe,gt,ut),J+=6}o.addGroup(f,J,x),f+=J,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Xt(i){const e={};for(let t=0;t<i.length;t++){const n=Pr(i[t]);for(const r in n)e[r]=n[r]}return e}function F_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function bf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const O_={clone:Pr,merge:Xt};var B_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,z_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends Ts{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=B_,this.fragmentShader=z_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pr(e.uniforms),this.uniformsGroups=F_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Tf extends ti{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Bi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new U,Wu=new Fe,Xu=new Fe;class pi extends Tf{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gs*2*Math.atan(Math.tan(ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Tn.x,Tn.y).multiplyScalar(-e/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-e/Tn.z)}getViewSize(e,t){return this.getViewBounds(e,Wu,Xu),t.subVectors(Xu,Wu)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ns*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pr=-90,mr=1;class V_ extends ti{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new pi(pr,mr,e,t);r.layers=this.layers,this.add(r);const s=new pi(pr,mr,e,t);s.layers=this.layers,this.add(s);const a=new pi(pr,mr,e,t);a.layers=this.layers,this.add(a);const o=new pi(pr,mr,e,t);o.layers=this.layers,this.add(o);const l=new pi(pr,mr,e,t);l.layers=this.layers,this.add(l);const c=new pi(pr,mr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ta)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ef extends Nt{constructor(e=[],t=Jn,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wf extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ef(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Es(5,5,5),s=new ui({name:"CubemapFromEquirect",uniforms:Pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:on});s.uniforms.tEquirect.value=t;const a=new ii(r,s),o=t.minFilter;return t.minFilter===wn&&(t.minFilter=wt),new V_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class Mr extends ti{constructor(){super(),this.isGroup=!0,this.type="Group"}}const H_={type:"move"};class Io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(H_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Mr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class G_ extends ti{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Af extends Nt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ut,u=Ut,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Uo=new U,k_=new U,W_=new Ye;class Wn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Uo.subVectors(n,t).cross(k_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Uo),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||W_.getNormalMatrix(e),r=this.coplanarPoint(Uo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new bs,X_=new Fe(.5,.5),js=new U;class Lc{constructor(e=new Wn,t=new Wn,n=new Wn,r=new Wn,s=new Wn,a=new Wn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bi,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],_=s[8],v=s[9],m=s[10],p=s[11],b=s[12],T=s[13],M=s[14],A=s[15];if(r[0].setComponents(c-a,f-u,p-_,A-b).normalize(),r[1].setComponents(c+a,f+u,p+_,A+b).normalize(),r[2].setComponents(c+o,f+h,p+v,A+T).normalize(),r[3].setComponents(c-o,f-h,p-v,A-T).normalize(),n)r[4].setComponents(l,d,m,M).normalize(),r[5].setComponents(c-l,f-d,p-m,A-M).normalize();else if(r[4].setComponents(c-l,f-d,p-m,A-M).normalize(),t===Bi)r[5].setComponents(c+l,f+d,p+m,A+M).normalize();else if(t===Ta)r[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){Vn.center.set(0,0,0);const t=X_.distanceTo(e.center);return Vn.radius=.7071067811865476+t,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(js.x=r.normal.x>0?e.max.x:e.min.x,js.y=r.normal.y>0?e.max.y:e.min.y,js.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(js)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class q_ extends Ts{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const wa=new U,Aa=new U,qu=new _t,kr=new vf,Ks=new bs,No=new U,$u=new U;class $_ extends ti{constructor(e=new ni,t=new q_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)wa.fromBufferAttribute(t,r-1),Aa.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=wa.distanceTo(Aa);e.setAttribute("lineDistance",new At(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(r),Ks.radius+=s,e.ray.intersectsSphere(Ks)===!1)return;qu.copy(r).invert(),kr.copy(e.ray).applyMatrix4(qu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let v=f,m=_-1;v<m;v+=c){const p=u.getX(v),b=u.getX(v+1),T=Zs(this,e,kr,l,p,b,v);T&&t.push(T)}if(this.isLineLoop){const v=u.getX(_-1),m=u.getX(f),p=Zs(this,e,kr,l,v,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let v=f,m=_-1;v<m;v+=c){const p=Zs(this,e,kr,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=Zs(this,e,kr,l,_-1,f,_-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Zs(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(wa.fromBufferAttribute(o,r),Aa.fromBufferAttribute(o,s),t.distanceSqToSegment(wa,Aa,No,$u)>n)return;No.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(No);if(!(c<e.near||c>e.far))return{distance:c,point:$u.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Yu=new U,ju=new U;class Y_ extends $_{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Yu.fromBufferAttribute(t,r),ju.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Yu.distanceTo(ju);e.setAttribute("lineDistance",new At(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class j_ extends Nt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _s extends Nt{constructor(e,t,n=Xi,r,s,a,o=Ut,l=Ut,c,u=mn,h=1){if(u!==mn&&u!==Yn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class K_ extends _s{constructor(e,t=Xi,n=Jn,r,s,a=Ut,o=Ut,l,c=mn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Rf extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Xa extends ni{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,f=[],_=[],v=[],m=[];for(let p=0;p<u;p++){const b=p*d-a;for(let T=0;T<c;T++){const M=T*h-s;_.push(M,-b,0),v.push(0,0,1),m.push(T/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const T=b+c*p,M=b+c*(p+1),A=b+1+c*(p+1),C=b+1+c*p;f.push(T,M,C),f.push(M,A,C)}this.setIndex(f),this.setAttribute("position",new At(_,3)),this.setAttribute("normal",new At(v,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xa(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ra extends ni{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new U,d=new U,f=[],_=[],v=[],m=[];for(let p=0;p<=n;p++){const b=[],T=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const C=A/t;h.x=-e*Math.cos(r+C*s)*Math.sin(a+T*o),h.y=e*Math.cos(a+T*o),h.z=e*Math.sin(r+C*s)*Math.sin(a+T*o),_.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),m.push(C+M,1-T),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const T=u[p][b+1],M=u[p][b],A=u[p+1][b],C=u[p+1][b+1];(p!==0||a>0)&&f.push(T,M,C),(p!==n-1||l<Math.PI)&&f.push(M,A,C)}this.setIndex(f),this.setAttribute("position",new At(_,3)),this.setAttribute("normal",new At(v,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Z_ extends ui{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class J_ extends Ts{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Q_ extends Ts{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class ev{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],_=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const tv=new ev;class Pc{constructor(e){this.manager=e!==void 0?e:tv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Pc.DEFAULT_MATERIAL_NAME="__DEFAULT";const gr=new WeakMap;class iv extends Pc{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Fo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=gr.get(a);h===void 0&&(h=[],gr.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=ps("img");function l(){u(),t&&t(this);const h=gr.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}gr.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),Fo.remove(`image:${e}`);const d=gr.get(this)||[];for(let f=0;f<d.length;f++){const _=d[f];_.onError&&_.onError(h)}gr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fo.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class nv extends Pc{constructor(e){super(e)}load(e,t,n,r){const s=new Nt,a=new iv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Cf extends Tf{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class rv extends pi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Ku(i,e,t,n){const r=sv(n);switch(t){case pf:return i*e;case yc:return i*e/r.components*r.byteLength;case bc:return i*e/r.components*r.byteLength;case Cr:return i*e*2/r.components*r.byteLength;case Tc:return i*e*2/r.components*r.byteLength;case mf:return i*e*3/r.components*r.byteLength;case wi:return i*e*4/r.components*r.byteLength;case Ec:return i*e*4/r.components*r.byteLength;case la:case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ua:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vl:case Ml:return Math.max(i,16)*Math.max(e,8)/4;case _l:case xl:return Math.max(i,8)*Math.max(e,8)/2;case Sl:case yl:case Tl:case El:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case bl:case wl:case Al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Cl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case zl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Hl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Gl:case kl:case Wl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Xl:case ql:return Math.ceil(i/4)*Math.ceil(e/4)*8;case $l:case Yl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sv(i){switch(i){case gi:case uf:return{byteLength:1,components:1};case ds:case hf:case pn:return{byteLength:2,components:1};case Mc:case Sc:return{byteLength:2,components:4};case Xi:case xc:case Ei:return{byteLength:4,components:1};case df:case ff:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vc}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Lf(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function av(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,_)=>f.start-_.start);let d=0;for(let f=1;f<h.length;f++){const _=h[d],v=h[f];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,h[d]=v)}h.length=d+1;for(let f=0,_=h.length;f<_;f++){const v=h[f];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var ov=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_v=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Mv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ev=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Av=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Lv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Dv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Iv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ov="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$v=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,e0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,t0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,n0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,s0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,a0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,o0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,l0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,c0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,f0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,p0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,m0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,g0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,v0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,x0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,M0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,b0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,E0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,C0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,L0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,P0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,F0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,B0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,W0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,X0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,j0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,K0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Q0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ex=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ax=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,px=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_x=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ex=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ax=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Px=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ix=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ux=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ox=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:ov,alphahash_pars_fragment:lv,alphamap_fragment:cv,alphamap_pars_fragment:uv,alphatest_fragment:hv,alphatest_pars_fragment:dv,aomap_fragment:fv,aomap_pars_fragment:pv,batching_pars_vertex:mv,batching_vertex:gv,begin_vertex:_v,beginnormal_vertex:vv,bsdfs:xv,iridescence_fragment:Mv,bumpmap_pars_fragment:Sv,clipping_planes_fragment:yv,clipping_planes_pars_fragment:bv,clipping_planes_pars_vertex:Tv,clipping_planes_vertex:Ev,color_fragment:wv,color_pars_fragment:Av,color_pars_vertex:Rv,color_vertex:Cv,common:Lv,cube_uv_reflection_fragment:Pv,defaultnormal_vertex:Dv,displacementmap_pars_vertex:Iv,displacementmap_vertex:Uv,emissivemap_fragment:Nv,emissivemap_pars_fragment:Fv,colorspace_fragment:Ov,colorspace_pars_fragment:Bv,envmap_fragment:zv,envmap_common_pars_fragment:Vv,envmap_pars_fragment:Hv,envmap_pars_vertex:Gv,envmap_physical_pars_fragment:Qv,envmap_vertex:kv,fog_vertex:Wv,fog_pars_vertex:Xv,fog_fragment:qv,fog_pars_fragment:$v,gradientmap_pars_fragment:Yv,lightmap_pars_fragment:jv,lights_lambert_fragment:Kv,lights_lambert_pars_fragment:Zv,lights_pars_begin:Jv,lights_toon_fragment:e0,lights_toon_pars_fragment:t0,lights_phong_fragment:i0,lights_phong_pars_fragment:n0,lights_physical_fragment:r0,lights_physical_pars_fragment:s0,lights_fragment_begin:a0,lights_fragment_maps:o0,lights_fragment_end:l0,logdepthbuf_fragment:c0,logdepthbuf_pars_fragment:u0,logdepthbuf_pars_vertex:h0,logdepthbuf_vertex:d0,map_fragment:f0,map_pars_fragment:p0,map_particle_fragment:m0,map_particle_pars_fragment:g0,metalnessmap_fragment:_0,metalnessmap_pars_fragment:v0,morphinstance_vertex:x0,morphcolor_vertex:M0,morphnormal_vertex:S0,morphtarget_pars_vertex:y0,morphtarget_vertex:b0,normal_fragment_begin:T0,normal_fragment_maps:E0,normal_pars_fragment:w0,normal_pars_vertex:A0,normal_vertex:R0,normalmap_pars_fragment:C0,clearcoat_normal_fragment_begin:L0,clearcoat_normal_fragment_maps:P0,clearcoat_pars_fragment:D0,iridescence_pars_fragment:I0,opaque_fragment:U0,packing:N0,premultiplied_alpha_fragment:F0,project_vertex:O0,dithering_fragment:B0,dithering_pars_fragment:z0,roughnessmap_fragment:V0,roughnessmap_pars_fragment:H0,shadowmap_pars_fragment:G0,shadowmap_pars_vertex:k0,shadowmap_vertex:W0,shadowmask_pars_fragment:X0,skinbase_vertex:q0,skinning_pars_vertex:$0,skinning_vertex:Y0,skinnormal_vertex:j0,specularmap_fragment:K0,specularmap_pars_fragment:Z0,tonemapping_fragment:J0,tonemapping_pars_fragment:Q0,transmission_fragment:ex,transmission_pars_fragment:tx,uv_pars_fragment:ix,uv_pars_vertex:nx,uv_vertex:rx,worldpos_vertex:sx,background_vert:ax,background_frag:ox,backgroundCube_vert:lx,backgroundCube_frag:cx,cube_vert:ux,cube_frag:hx,depth_vert:dx,depth_frag:fx,distance_vert:px,distance_frag:mx,equirect_vert:gx,equirect_frag:_x,linedashed_vert:vx,linedashed_frag:xx,meshbasic_vert:Mx,meshbasic_frag:Sx,meshlambert_vert:yx,meshlambert_frag:bx,meshmatcap_vert:Tx,meshmatcap_frag:Ex,meshnormal_vert:wx,meshnormal_frag:Ax,meshphong_vert:Rx,meshphong_frag:Cx,meshphysical_vert:Lx,meshphysical_frag:Px,meshtoon_vert:Dx,meshtoon_frag:Ix,points_vert:Ux,points_frag:Nx,shadow_vert:Fx,shadow_frag:Ox,sprite_vert:Bx,sprite_frag:zx},Te={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Fi={basic:{uniforms:Xt([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Xt([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new et(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Xt([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Xt([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Xt([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new et(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Xt([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Xt([Te.points,Te.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Xt([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Xt([Te.common,Te.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Xt([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Xt([Te.sprite,Te.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Xt([Te.common,Te.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Xt([Te.lights,Te.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Fi.physical={uniforms:Xt([Fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Js={r:0,b:0,g:0},Hn=new gn,Vx=new _t;function Hx(i,e,t,n,r,s,a){const o=new et(0);let l=s===!0?0:1,c,u,h=null,d=0,f=null;function _(T){let M=T.isScene===!0?T.background:null;return M&&M.isTexture&&(M=(T.backgroundBlurriness>0?t:e).get(M)),M}function v(T){let M=!1;const A=_(T);A===null?p(o,l):A&&A.isColor&&(p(A,1),M=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,M){const A=_(M);A&&(A.isCubeTexture||A.mapping===Wa)?(u===void 0&&(u=new ii(new Es(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:Pr(Fi.backgroundCube.uniforms),vertexShader:Fi.backgroundCube.vertexShader,fragmentShader:Fi.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,D,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Hn.copy(M.backgroundRotation),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Vx.makeRotationFromEuler(Hn)),u.material.toneMapped=Qe.getTransfer(A.colorSpace)!==ot,(h!==A||d!==A.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=A,d=A.version,f=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new ii(new Xa(2,2),new ui({name:"BackgroundMaterial",uniforms:Pr(Fi.background.uniforms),vertexShader:Fi.background.vertexShader,fragmentShader:Fi.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(A.colorSpace)!==ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||d!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=A,d=A.version,f=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,M){T.getRGB(Js,bf(i)),n.buffers.color.setClear(Js.r,Js.g,Js.b,M,a)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,M=1){o.set(T),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:v,addToRenderList:m,dispose:b}}function Gx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(E,N,j,q,ne){let te=!1;const Y=h(q,j,N);s!==Y&&(s=Y,c(s.object)),te=f(E,q,j,ne),te&&_(E,q,j,ne),ne!==null&&e.update(ne,i.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,M(E,N,j,q),ne!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(ne).buffer))}function l(){return i.createVertexArray()}function c(E){return i.bindVertexArray(E)}function u(E){return i.deleteVertexArray(E)}function h(E,N,j){const q=j.wireframe===!0;let ne=n[E.id];ne===void 0&&(ne={},n[E.id]=ne);let te=ne[N.id];te===void 0&&(te={},ne[N.id]=te);let Y=te[q];return Y===void 0&&(Y=d(l()),te[q]=Y),Y}function d(E){const N=[],j=[],q=[];for(let ne=0;ne<t;ne++)N[ne]=0,j[ne]=0,q[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:j,attributeDivisors:q,object:E,attributes:{},index:null}}function f(E,N,j,q){const ne=s.attributes,te=N.attributes;let Y=0;const z=j.getAttributes();for(const J in z)if(z[J].location>=0){const ge=ne[J];let Se=te[J];if(Se===void 0&&(J==="instanceMatrix"&&E.instanceMatrix&&(Se=E.instanceMatrix),J==="instanceColor"&&E.instanceColor&&(Se=E.instanceColor)),ge===void 0||ge.attribute!==Se||Se&&ge.data!==Se.data)return!0;Y++}return s.attributesNum!==Y||s.index!==q}function _(E,N,j,q){const ne={},te=N.attributes;let Y=0;const z=j.getAttributes();for(const J in z)if(z[J].location>=0){let ge=te[J];ge===void 0&&(J==="instanceMatrix"&&E.instanceMatrix&&(ge=E.instanceMatrix),J==="instanceColor"&&E.instanceColor&&(ge=E.instanceColor));const Se={};Se.attribute=ge,ge&&ge.data&&(Se.data=ge.data),ne[J]=Se,Y++}s.attributes=ne,s.attributesNum=Y,s.index=q}function v(){const E=s.newAttributes;for(let N=0,j=E.length;N<j;N++)E[N]=0}function m(E){p(E,0)}function p(E,N){const j=s.newAttributes,q=s.enabledAttributes,ne=s.attributeDivisors;j[E]=1,q[E]===0&&(i.enableVertexAttribArray(E),q[E]=1),ne[E]!==N&&(i.vertexAttribDivisor(E,N),ne[E]=N)}function b(){const E=s.newAttributes,N=s.enabledAttributes;for(let j=0,q=N.length;j<q;j++)N[j]!==E[j]&&(i.disableVertexAttribArray(j),N[j]=0)}function T(E,N,j,q,ne,te,Y){Y===!0?i.vertexAttribIPointer(E,N,j,ne,te):i.vertexAttribPointer(E,N,j,q,ne,te)}function M(E,N,j,q){v();const ne=q.attributes,te=j.getAttributes(),Y=N.defaultAttributeValues;for(const z in te){const J=te[z];if(J.location>=0){let Me=ne[z];if(Me===void 0&&(z==="instanceMatrix"&&E.instanceMatrix&&(Me=E.instanceMatrix),z==="instanceColor"&&E.instanceColor&&(Me=E.instanceColor)),Me!==void 0){const ge=Me.normalized,Se=Me.itemSize,ze=e.get(Me);if(ze===void 0)continue;const qe=ze.buffer,gt=ze.type,ut=ze.bytesPerElement,ie=gt===i.INT||gt===i.UNSIGNED_INT||Me.gpuType===xc;if(Me.isInterleavedBufferAttribute){const oe=Me.data,Le=oe.stride,ke=Me.offset;if(oe.isInstancedInterleavedBuffer){for(let Pe=0;Pe<J.locationSize;Pe++)p(J.location+Pe,oe.meshPerAttribute);E.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Pe=0;Pe<J.locationSize;Pe++)m(J.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let Pe=0;Pe<J.locationSize;Pe++)T(J.location+Pe,Se/J.locationSize,gt,ge,Le*ut,(ke+Se/J.locationSize*Pe)*ut,ie)}else{if(Me.isInstancedBufferAttribute){for(let oe=0;oe<J.locationSize;oe++)p(J.location+oe,Me.meshPerAttribute);E.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let oe=0;oe<J.locationSize;oe++)m(J.location+oe);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let oe=0;oe<J.locationSize;oe++)T(J.location+oe,Se/J.locationSize,gt,ge,Se*ut,Se/J.locationSize*oe*ut,ie)}}else if(Y!==void 0){const ge=Y[z];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(J.location,ge);break;case 3:i.vertexAttrib3fv(J.location,ge);break;case 4:i.vertexAttrib4fv(J.location,ge);break;default:i.vertexAttrib1fv(J.location,ge)}}}}b()}function A(){B();for(const E in n){const N=n[E];for(const j in N){const q=N[j];for(const ne in q)u(q[ne].object),delete q[ne];delete N[j]}delete n[E]}}function C(E){if(n[E.id]===void 0)return;const N=n[E.id];for(const j in N){const q=N[j];for(const ne in q)u(q[ne].object),delete q[ne];delete N[j]}delete n[E.id]}function D(E){for(const N in n){const j=n[N];if(j[E.id]===void 0)continue;const q=j[E.id];for(const ne in q)u(q[ne].object),delete q[ne];delete j[E.id]}}function B(){x(),a=!0,s!==r&&(s=r,c(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:B,resetDefaultState:x,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function kx(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let _=0;_<h;_++)f+=u[_];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)a(c[_],u[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let _=0;for(let v=0;v<h;v++)_+=u[v]*d[v];t.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Wx(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(D){return!(D!==wi&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const B=D===pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==gi&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Ei&&!B)}function l(D){if(D==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ge("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),C=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:M,maxSamples:A,samples:C}}function Xx(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Wn,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const _=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,T=b*4;let M=p.clippingState||null;l.value=M,M=u(_,d,T,f);for(let A=0;A!==T;++A)M[A]=t[A];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,_){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const p=f+v*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,M=f;T!==v;++T,M+=4)a.copy(h[T]).applyMatrix4(b,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function qx(i){let e=new WeakMap;function t(a,o){return o===fl?a.mapping=Jn:o===pl&&(a.mapping=Rr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===fl||o===pl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new wf(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const An=4,Zu=[.125,.215,.35,.446,.526,.582],qn=20,$x=256,Wr=new Cf,Ju=new et;let Oo=null,Bo=0,zo=0,Vo=!1;const Yx=new U;class Qu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Yx}=s;Oo=this._renderer.getRenderTarget(),Bo=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Oo,Bo,zo),this._renderer.xr.enabled=Vo,e.scissorTest=!1,_r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jn||e.mapping===Rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oo=this._renderer.getRenderTarget(),Bo=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:pn,format:wi,colorSpace:Lr,depthBuffer:!1},r=eh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=jx(s)),this._blurMaterial=Zx(s,e,t),this._ggxMaterial=Kx(s,e,t)}return r}_compileMaterial(e){const t=new ii(new ni,e);this._renderer.compile(t,Wr)}_sceneToCubeUV(e,t,n,r,s){const l=new pi(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Ju),h.toneMapping=Hi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ii(new Es,new Ea({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(Ju),p=!0);for(let T=0;T<6;T++){const M=T%3;M===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[T],s.y,s.z)):M===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[T]));const A=this._cubeSize;_r(r,M*A,T>2?A:0,A,A),h.setRenderTarget(r),p&&h.render(v,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Jn||e.mapping===Rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;_r(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Wr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:_}=this,v=this._sizeLods[n],m=3*v*(n>_-An?n-_+An:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=_-t,_r(s,m,p,3*v,2*v),r.setRenderTarget(s),r.render(o,Wr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-n,_r(e,m,p,3*v,2*v),r.setRenderTarget(e),r.render(o,Wr)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[r];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*qn-1),v=s/_,m=isFinite(s)?1+Math.floor(u*v):qn;m>qn&&Ge(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qn}`);const p=[];let b=0;for(let D=0;D<qn;++D){const B=D/v,x=Math.exp(-B*B/2);p.push(x),D===0?b+=x:D<m&&(b+=2*x)}for(let D=0;D<p.length;D++)p[D]=p[D]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:T}=this;d.dTheta.value=_,d.mipInt.value=T-n;const M=this._sizeLods[r],A=3*M*(r>T-An?r-T+An:0),C=4*(this._cubeSize-M);_r(t,A,C,3*M,2*M),l.setRenderTarget(t),l.render(h,Wr)}}function jx(i){const e=[],t=[],n=[];let r=i;const s=i-An+1+Zu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-An?l=Zu[a-i+An-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,_=6,v=3,m=2,p=1,b=new Float32Array(v*_*f),T=new Float32Array(m*_*f),M=new Float32Array(p*_*f);for(let C=0;C<f;C++){const D=C%3*2/3-1,B=C>2?0:-1,x=[D,B,0,D+2/3,B,0,D+2/3,B+1,0,D,B,0,D+2/3,B+1,0,D,B+1,0];b.set(x,v*_*C),T.set(d,m*_*C);const E=[C,C,C,C,C,C];M.set(E,p*_*C)}const A=new ni;A.setAttribute("position",new jt(b,v)),A.setAttribute("uv",new jt(T,m)),A.setAttribute("faceIndex",new jt(M,p)),n.push(new ii(A,null)),r>An&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function eh(i,e,t){const n=new Gi(i,e,t);return n.texture.mapping=Wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _r(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Kx(i,e,t){return new ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$x,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function Zx(i,e,t){const n=new Float32Array(qn),r=new U(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function th(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function ih(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function qa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jx(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===fl||l===pl,u=l===Jn||l===Rr;if(c||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Qu(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Qu(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Qx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ms("WebGLRenderer: "+n+" extension not supported."),r}}}function eM(i,e,t,n){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,_=h.attributes.position;let v=0;if(f!==null){const b=f.array;v=f.version;for(let T=0,M=b.length;T<M;T+=3){const A=b[T+0],C=b[T+1],D=b[T+2];d.push(A,C,C,D,D,A)}}else if(_!==void 0){const b=_.array;v=_.version;for(let T=0,M=b.length/3-1;T<M;T+=3){const A=T+0,C=T+1,D=T+2;d.push(A,C,C,D,D,A)}}else return;const m=new(gf(d)?yf:Sf)(d,1);m.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function tM(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,_){_!==0&&(i.drawElementsInstanced(n,f,s,d*a,_),t.update(f,n,_))}function u(d,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,n,1)}function h(d,f,_,v){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,_);let p=0;for(let b=0;b<_;b++)p+=f[b]*v[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function iM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function nM(i,e,t){const n=new WeakMap,r=new bt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let E=function(){B.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var f=E;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let M=0;_===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let A=o.attributes.position.count*M,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const D=new Float32Array(A*C*4*h),B=new _f(D,A,C,h);B.type=Ei,B.needsUpdate=!0;const x=M*4;for(let N=0;N<h;N++){const j=p[N],q=b[N],ne=T[N],te=A*C*4*N;for(let Y=0;Y<j.count;Y++){const z=Y*x;_===!0&&(r.fromBufferAttribute(j,Y),D[te+z+0]=r.x,D[te+z+1]=r.y,D[te+z+2]=r.z,D[te+z+3]=0),v===!0&&(r.fromBufferAttribute(q,Y),D[te+z+4]=r.x,D[te+z+5]=r.y,D[te+z+6]=r.z,D[te+z+7]=0),m===!0&&(r.fromBufferAttribute(ne,Y),D[te+z+8]=r.x,D[te+z+9]=r.y,D[te+z+10]=r.z,D[te+z+11]=ne.itemSize===4?r.w:1)}}d={count:h,texture:B,size:new Fe(A,C)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const v=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function rM(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const sM={[tf]:"LINEAR_TONE_MAPPING",[nf]:"REINHARD_TONE_MAPPING",[rf]:"CINEON_TONE_MAPPING",[sf]:"ACES_FILMIC_TONE_MAPPING",[of]:"AGX_TONE_MAPPING",[lf]:"NEUTRAL_TONE_MAPPING",[af]:"CUSTOM_TONE_MAPPING"};function aM(i,e,t,n,r){const s=new Gi(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new Gi(e,t,{type:pn,depthBuffer:!1,stencilBuffer:!1}),o=new ni;o.setAttribute("position",new At([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new At([0,2,0,0,2,0],2));const l=new Z_({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new ii(o,l),u=new Cf(-1,1,1,-1,0,1);let h=null,d=null,f=!1,_,v=null,m=[],p=!1;this.setSize=function(b,T){s.setSize(b,T),a.setSize(b,T);for(let M=0;M<m.length;M++){const A=m[M];A.setSize&&A.setSize(b,T)}},this.setEffects=function(b){m=b,p=m.length>0&&m[0].isRenderPass===!0;const T=s.width,M=s.height;for(let A=0;A<m.length;A++){const C=m[A];C.setSize&&C.setSize(T,M)}},this.begin=function(b,T){if(f||b.toneMapping===Hi&&m.length===0)return!1;if(v=T,T!==null){const M=T.width,A=T.height;(s.width!==M||s.height!==A)&&this.setSize(M,A)}return p===!1&&b.setRenderTarget(s),_=b.toneMapping,b.toneMapping=Hi,!0},this.hasRenderPass=function(){return p},this.end=function(b,T){b.toneMapping=_,f=!0;let M=s,A=a;for(let C=0;C<m.length;C++){const D=m[C];if(D.enabled!==!1&&(D.render(b,A,M,T),D.needsSwap!==!1)){const B=M;M=A,A=B}}if(h!==b.outputColorSpace||d!==b.toneMapping){h=b.outputColorSpace,d=b.toneMapping,l.defines={},Qe.getTransfer(h)===ot&&(l.defines.SRGB_TRANSFER="");const C=sM[d];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,b.setRenderTarget(v),b.render(c,u),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Pf=new Nt,jl=new _s(1,1),Df=new _f,If=new T_,Uf=new Ef,nh=[],rh=[],sh=new Float32Array(16),ah=new Float32Array(9),oh=new Float32Array(4);function Nr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=nh[r];if(s===void 0&&(s=new Float32Array(r),nh[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $a(i,e){let t=rh[e];t===void 0&&(t=new Int32Array(e),rh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function oM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function lM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Ct(t,e)}}function cM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Ct(t,e)}}function uM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Ct(t,e)}}function hM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;oh.set(n),i.uniformMatrix2fv(this.addr,!1,oh),Ct(t,n)}}function dM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;ah.set(n),i.uniformMatrix3fv(this.addr,!1,ah),Ct(t,n)}}function fM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;sh.set(n),i.uniformMatrix4fv(this.addr,!1,sh),Ct(t,n)}}function pM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Ct(t,e)}}function gM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Ct(t,e)}}function _M(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Ct(t,e)}}function vM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Ct(t,e)}}function MM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Ct(t,e)}}function SM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Ct(t,e)}}function yM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(jl.compareFunction=t.isReversedDepthBuffer()?Ac:wc,s=jl):s=Pf,t.setTexture2D(e||s,r)}function bM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||If,r)}function TM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Uf,r)}function EM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Df,r)}function wM(i){switch(i){case 5126:return oM;case 35664:return lM;case 35665:return cM;case 35666:return uM;case 35674:return hM;case 35675:return dM;case 35676:return fM;case 5124:case 35670:return pM;case 35667:case 35671:return mM;case 35668:case 35672:return gM;case 35669:case 35673:return _M;case 5125:return vM;case 36294:return xM;case 36295:return MM;case 36296:return SM;case 35678:case 36198:case 36298:case 36306:case 35682:return yM;case 35679:case 36299:case 36307:return bM;case 35680:case 36300:case 36308:case 36293:return TM;case 36289:case 36303:case 36311:case 36292:return EM}}function AM(i,e){i.uniform1fv(this.addr,e)}function RM(i,e){const t=Nr(e,this.size,2);i.uniform2fv(this.addr,t)}function CM(i,e){const t=Nr(e,this.size,3);i.uniform3fv(this.addr,t)}function LM(i,e){const t=Nr(e,this.size,4);i.uniform4fv(this.addr,t)}function PM(i,e){const t=Nr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function DM(i,e){const t=Nr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function IM(i,e){const t=Nr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function UM(i,e){i.uniform1iv(this.addr,e)}function NM(i,e){i.uniform2iv(this.addr,e)}function FM(i,e){i.uniform3iv(this.addr,e)}function OM(i,e){i.uniform4iv(this.addr,e)}function BM(i,e){i.uniform1uiv(this.addr,e)}function zM(i,e){i.uniform2uiv(this.addr,e)}function VM(i,e){i.uniform3uiv(this.addr,e)}function HM(i,e){i.uniform4uiv(this.addr,e)}function GM(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=jl:a=Pf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function kM(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||If,s[a])}function WM(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Uf,s[a])}function XM(i,e,t){const n=this.cache,r=e.length,s=$a(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Df,s[a])}function qM(i){switch(i){case 5126:return AM;case 35664:return RM;case 35665:return CM;case 35666:return LM;case 35674:return PM;case 35675:return DM;case 35676:return IM;case 5124:case 35670:return UM;case 35667:case 35671:return NM;case 35668:case 35672:return FM;case 35669:case 35673:return OM;case 5125:return BM;case 36294:return zM;case 36295:return VM;case 36296:return HM;case 35678:case 36198:case 36298:case 36306:case 35682:return GM;case 35679:case 36299:case 36307:return kM;case 35680:case 36300:case 36308:case 36293:return WM;case 36289:case 36303:case 36311:case 36292:return XM}}class $M{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wM(t.type)}}class YM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qM(t.type)}}class jM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ho=/(\w+)(\])?(\[|\.)?/g;function lh(i,e){i.seq.push(e),i.map[e.id]=e}function KM(i,e,t){const n=i.name,r=n.length;for(Ho.lastIndex=0;;){const s=Ho.exec(n),a=Ho.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){lh(t,c===void 0?new $M(o,i,e):new YM(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new jM(o),lh(t,h)),t=h}}}class da{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);KM(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function ch(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ZM=37297;let JM=0;function QM(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const uh=new Ye;function eS(i){Qe._getMatrix(uh,Qe.workingColorSpace,i);const e=`mat3( ${uh.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case ba:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+QM(i.getShaderSource(e),o)}else return s}function tS(i,e){const t=eS(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const iS={[tf]:"Linear",[nf]:"Reinhard",[rf]:"Cineon",[sf]:"ACESFilmic",[of]:"AgX",[lf]:"Neutral",[af]:"Custom"};function nS(i,e){const t=iS[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qs=new U;function rS(){Qe.getLuminanceCoefficients(Qs);const i=Qs.x.toFixed(4),e=Qs.y.toFixed(4),t=Qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jr).join(`
`)}function aS(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function oS(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function jr(i){return i!==""}function dh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kl(i){return i.replace(lS,uS)}const cS=new Map;function uS(i,e){let t=je[e];if(t===void 0){const n=cS.get(e);if(n!==void 0)t=je[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Kl(t)}const hS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ph(i){return i.replace(hS,dS)}function dS(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function mh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const fS={[oa]:"SHADOWMAP_TYPE_PCF",[Yr]:"SHADOWMAP_TYPE_VSM"};function pS(i){return fS[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const mS={[Jn]:"ENVMAP_TYPE_CUBE",[Rr]:"ENVMAP_TYPE_CUBE",[Wa]:"ENVMAP_TYPE_CUBE_UV"};function gS(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":mS[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const _S={[Rr]:"ENVMAP_MODE_REFRACTION"};function vS(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":_S[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const xS={[ef]:"ENVMAP_BLENDING_MULTIPLY",[kg]:"ENVMAP_BLENDING_MIX",[Wg]:"ENVMAP_BLENDING_ADD"};function MS(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":xS[i.combine]||"ENVMAP_BLENDING_NONE"}function SS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function yS(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=pS(t),c=gS(t),u=vS(t),h=MS(t),d=SS(t),f=sS(t),_=aS(s),v=r.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(jr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(jr).join(`
`),p.length>0&&(p+=`
`)):(m=[mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jr).join(`
`),p=[mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?je.tonemapping_pars_fragment:"",t.toneMapping!==Hi?nS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,tS("linearToOutputTexel",t.outputColorSpace),rS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(jr).join(`
`)),a=Kl(a),a=dh(a,t),a=fh(a,t),o=Kl(o),o=dh(o,t),o=fh(o,t),a=ph(a),o=ph(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=b+m+a,M=b+p+o,A=ch(r,r.VERTEX_SHADER,T),C=ch(r,r.FRAGMENT_SHADER,M);r.attachShader(v,A),r.attachShader(v,C),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function D(N){if(i.debug.checkShaderErrors){const j=r.getProgramInfoLog(v)||"",q=r.getShaderInfoLog(A)||"",ne=r.getShaderInfoLog(C)||"",te=j.trim(),Y=q.trim(),z=ne.trim();let J=!0,Me=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,A,C);else{const ge=hh(r,A,"vertex"),Se=hh(r,C,"fragment");it("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+te+`
`+ge+`
`+Se)}else te!==""?Ge("WebGLProgram: Program Info Log:",te):(Y===""||z==="")&&(Me=!1);Me&&(N.diagnostics={runnable:J,programLog:te,vertexShader:{log:Y,prefix:m},fragmentShader:{log:z,prefix:p}})}r.deleteShader(A),r.deleteShader(C),B=new da(r,v),x=oS(r,v)}let B;this.getUniforms=function(){return B===void 0&&D(this),B};let x;this.getAttributes=function(){return x===void 0&&D(this),x};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(v,ZM)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=JM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let bS=0;class TS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ES(e),t.set(e,n)),n}}class ES{constructor(e){this.id=bS++,this.code=e,this.usedTimes=0}}function wS(i,e,t,n,r,s,a){const o=new xf,l=new TS,c=new Set,u=[],h=new Map,d=r.logarithmicDepthBuffer;let f=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,E,N,j,q){const ne=j.fog,te=q.geometry,Y=x.isMeshStandardMaterial?j.environment:null,z=(x.isMeshStandardMaterial?t:e).get(x.envMap||Y),J=z&&z.mapping===Wa?z.image.height:null,Me=_[x.type];x.precision!==null&&(f=r.getMaxPrecision(x.precision),f!==x.precision&&Ge("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const ge=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Se=ge!==void 0?ge.length:0;let ze=0;te.morphAttributes.position!==void 0&&(ze=1),te.morphAttributes.normal!==void 0&&(ze=2),te.morphAttributes.color!==void 0&&(ze=3);let qe,gt,ut,ie;if(Me){const st=Fi[Me];qe=st.vertexShader,gt=st.fragmentShader}else qe=x.vertexShader,gt=x.fragmentShader,l.update(x),ut=l.getVertexShaderID(x),ie=l.getFragmentShaderID(x);const oe=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),ke=q.isInstancedMesh===!0,Pe=q.isBatchedMesh===!0,Je=!!x.map,R=!!x.matcap,I=!!z,H=!!x.aoMap,Q=!!x.lightMap,W=!!x.bumpMap,ee=!!x.normalMap,w=!!x.displacementMap,le=!!x.emissiveMap,re=!!x.metalnessMap,Z=!!x.roughnessMap,se=x.anisotropy>0,S=x.clearcoat>0,g=x.dispersion>0,P=x.iridescence>0,k=x.sheen>0,K=x.transmission>0,G=se&&!!x.anisotropyMap,ve=S&&!!x.clearcoatMap,he=S&&!!x.clearcoatNormalMap,Ae=S&&!!x.clearcoatRoughnessMap,Ue=P&&!!x.iridescenceMap,ce=P&&!!x.iridescenceThicknessMap,_e=k&&!!x.sheenColorMap,ye=k&&!!x.sheenRoughnessMap,Re=!!x.specularMap,me=!!x.specularColorMap,$e=!!x.specularIntensityMap,F=K&&!!x.transmissionMap,we=K&&!!x.thicknessMap,pe=!!x.gradientMap,Ce=!!x.alphaMap,fe=x.alphaTest>0,ae=!!x.alphaHash,xe=!!x.extensions;let We=Hi;x.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(We=i.toneMapping);const ft={shaderID:Me,shaderType:x.type,shaderName:x.name,vertexShader:qe,fragmentShader:gt,defines:x.defines,customVertexShaderID:ut,customFragmentShaderID:ie,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Pe,batchingColor:Pe&&q._colorsTexture!==null,instancing:ke,instancingColor:ke&&q.instanceColor!==null,instancingMorph:ke&&q.morphTexture!==null,outputColorSpace:oe===null?i.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Lr,alphaToCoverage:!!x.alphaToCoverage,map:Je,matcap:R,envMap:I,envMapMode:I&&z.mapping,envMapCubeUVHeight:J,aoMap:H,lightMap:Q,bumpMap:W,normalMap:ee,displacementMap:w,emissiveMap:le,normalMapObjectSpace:ee&&x.normalMapType===Yg,normalMapTangentSpace:ee&&x.normalMapType===$g,metalnessMap:re,roughnessMap:Z,anisotropy:se,anisotropyMap:G,clearcoat:S,clearcoatMap:ve,clearcoatNormalMap:he,clearcoatRoughnessMap:Ae,dispersion:g,iridescence:P,iridescenceMap:Ue,iridescenceThicknessMap:ce,sheen:k,sheenColorMap:_e,sheenRoughnessMap:ye,specularMap:Re,specularColorMap:me,specularIntensityMap:$e,transmission:K,transmissionMap:F,thicknessMap:we,gradientMap:pe,opaque:x.transparent===!1&&x.blending===Tr&&x.alphaToCoverage===!1,alphaMap:Ce,alphaTest:fe,alphaHash:ae,combine:x.combine,mapUv:Je&&v(x.map.channel),aoMapUv:H&&v(x.aoMap.channel),lightMapUv:Q&&v(x.lightMap.channel),bumpMapUv:W&&v(x.bumpMap.channel),normalMapUv:ee&&v(x.normalMap.channel),displacementMapUv:w&&v(x.displacementMap.channel),emissiveMapUv:le&&v(x.emissiveMap.channel),metalnessMapUv:re&&v(x.metalnessMap.channel),roughnessMapUv:Z&&v(x.roughnessMap.channel),anisotropyMapUv:G&&v(x.anisotropyMap.channel),clearcoatMapUv:ve&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:he&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&v(x.sheenRoughnessMap.channel),specularMapUv:Re&&v(x.specularMap.channel),specularColorMapUv:me&&v(x.specularColorMap.channel),specularIntensityMapUv:$e&&v(x.specularIntensityMap.channel),transmissionMapUv:F&&v(x.transmissionMap.channel),thicknessMapUv:we&&v(x.thicknessMap.channel),alphaMapUv:Ce&&v(x.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(ee||se),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!te.attributes.uv&&(Je||Ce),fog:!!ne,useFog:x.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Le,skinning:q.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:ze,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:Je&&x.map.isVideoTexture===!0&&Qe.getTransfer(x.map.colorSpace)===ot,decodeVideoTextureEmissive:le&&x.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(x.emissiveMap.colorSpace)===ot,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===rn,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xe&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&x.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const N in x.defines)E.push(N),E.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(b(E,x),T(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function b(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function T(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),x.push(o.mask)}function M(x){const E=_[x.type];let N;if(E){const j=Fi[E];N=O_.clone(j.uniforms)}else N=x.uniforms;return N}function A(x,E){let N=h.get(E);return N!==void 0?++N.usedTimes:(N=new yS(i,E,x,s),u.push(N),h.set(E,N)),N}function C(x){if(--x.usedTimes===0){const E=u.indexOf(x);u[E]=u[u.length-1],u.pop(),h.delete(x.cacheKey),x.destroy()}}function D(x){l.remove(x)}function B(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:A,releaseProgram:C,releaseShaderCache:D,programs:u,dispose:B}}function AS(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function RS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function gh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function _h(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,d,f,_,v,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:_,renderOrder:h.renderOrder,z:v,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function o(h,d,f,_,v,m){const p=a(h,d,f,_,v,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(h,d,f,_,v,m){const p=a(h,d,f,_,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||RS),n.length>1&&n.sort(d||gh),r.length>1&&r.sort(d||gh)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function CS(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new _h,i.set(n,[a])):r>=s.length?(a=new _h,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function LS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new et};break;case"SpotLight":t={position:new U,direction:new U,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function PS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let DS=0;function IS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function US(i){const e=new LS,t=PS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const r=new U,s=new _t,a=new _t;function o(c){let u=0,h=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let f=0,_=0,v=0,m=0,p=0,b=0,T=0,M=0,A=0,C=0,D=0;c.sort(IS);for(let x=0,E=c.length;x<E;x++){const N=c[x],j=N.color,q=N.intensity,ne=N.distance;let te=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Cr?te=N.shadow.map.texture:te=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=j.r*q,h+=j.g*q,d+=j.b*q;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],q);D++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const z=N.shadow,J=t.get(N);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=te,n.directionalShadowMatrix[f]=N.shadow.matrix,b++}n.directional[f]=Y,f++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(j).multiplyScalar(q),Y.distance=ne,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[v]=Y;const z=N.shadow;if(N.map&&(n.spotLightMap[A]=N.map,A++,z.updateMatrices(N),N.castShadow&&C++),n.spotLightMatrix[v]=z.matrix,N.castShadow){const J=t.get(N);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.spotShadow[v]=J,n.spotShadowMap[v]=te,M++}v++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(j).multiplyScalar(q),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=Y,m++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const z=N.shadow,J=t.get(N);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,J.shadowCameraNear=z.camera.near,J.shadowCameraFar=z.camera.far,n.pointShadow[_]=J,n.pointShadowMap[_]=te,n.pointShadowMatrix[_]=N.shadow.matrix,T++}n.point[_]=Y,_++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(q),Y.groundColor.copy(N.groundColor).multiplyScalar(q),n.hemi[p]=Y,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const B=n.hash;(B.directionalLength!==f||B.pointLength!==_||B.spotLength!==v||B.rectAreaLength!==m||B.hemiLength!==p||B.numDirectionalShadows!==b||B.numPointShadows!==T||B.numSpotShadows!==M||B.numSpotMaps!==A||B.numLightProbes!==D)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=M+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=D,B.directionalLength=f,B.pointLength=_,B.spotLength=v,B.rectAreaLength=m,B.hemiLength=p,B.numDirectionalShadows=b,B.numPointShadows=T,B.numSpotShadows=M,B.numSpotMaps=A,B.numLightProbes=D,n.version=DS++)}function l(c,u){let h=0,d=0,f=0,_=0,v=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const T=c[p];if(T.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),h++}else if(T.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const M=n.rectArea[_];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(T.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(T.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function vh(i){const e=new US(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function NS(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new vh(i),e.set(r,[o])):s>=a.length?(o=new vh(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const FS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,OS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,BS=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],zS=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],xh=new _t,Xr=new U,Go=new U;function VS(i,e,t){let n=new Lc;const r=new Fe,s=new Fe,a=new bt,o=new J_,l=new Q_,c={},u=t.maxTextureSize,h={[Dn]:Kt,[Kt]:Dn,[rn]:rn},d=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:FS,fragmentShader:OS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new ni;_.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ii(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa;let p=this.type;this.render=function(C,D,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;C.type===Tg&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),C.type=oa);const x=i.getRenderTarget(),E=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),j=i.state;j.setBlending(on),j.buffers.depth.getReversed()===!0?j.buffers.color.setClear(0,0,0,0):j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const q=p!==this.type;q&&D.traverse(function(ne){ne.material&&(Array.isArray(ne.material)?ne.material.forEach(te=>te.needsUpdate=!0):ne.material.needsUpdate=!0)});for(let ne=0,te=C.length;ne<te;ne++){const Y=C[ne],z=Y.shadow;if(z===void 0){Ge("WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const J=z.getFrameExtents();if(r.multiply(J),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/J.x),r.x=s.x*J.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/J.y),r.y=s.y*J.y,z.mapSize.y=s.y)),z.map===null||q===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Yr){if(Y.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Gi(r.x,r.y,{format:Cr,type:pn,minFilter:wt,magFilter:wt,generateMipmaps:!1}),z.map.texture.name=Y.name+".shadowMap",z.map.depthTexture=new _s(r.x,r.y,Ei),z.map.depthTexture.name=Y.name+".shadowMapDepth",z.map.depthTexture.format=mn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ut,z.map.depthTexture.magFilter=Ut}else{Y.isPointLight?(z.map=new wf(r.x),z.map.depthTexture=new K_(r.x,Xi)):(z.map=new Gi(r.x,r.y),z.map.depthTexture=new _s(r.x,r.y,Xi)),z.map.depthTexture.name=Y.name+".shadowMap",z.map.depthTexture.format=mn;const ge=i.state.buffers.depth.getReversed();this.type===oa?(z.map.depthTexture.compareFunction=ge?Ac:wc,z.map.depthTexture.minFilter=wt,z.map.depthTexture.magFilter=wt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ut,z.map.depthTexture.magFilter=Ut)}z.camera.updateProjectionMatrix()}const Me=z.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<Me;ge++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,ge),i.clear();else{ge===0&&(i.setRenderTarget(z.map),i.clear());const Se=z.getViewport(ge);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),j.viewport(a)}if(Y.isPointLight){const Se=z.camera,ze=z.matrix,qe=Y.distance||Se.far;qe!==Se.far&&(Se.far=qe,Se.updateProjectionMatrix()),Xr.setFromMatrixPosition(Y.matrixWorld),Se.position.copy(Xr),Go.copy(Se.position),Go.add(BS[ge]),Se.up.copy(zS[ge]),Se.lookAt(Go),Se.updateMatrixWorld(),ze.makeTranslation(-Xr.x,-Xr.y,-Xr.z),xh.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),z._frustum.setFromProjectionMatrix(xh,Se.coordinateSystem,Se.reversedDepth)}else z.updateMatrices(Y);n=z.getFrustum(),M(D,B,z.camera,Y,this.type)}z.isPointLightShadow!==!0&&this.type===Yr&&b(z,B),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(x,E,N)};function b(C,D){const B=e.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Gi(r.x,r.y,{format:Cr,type:pn})),d.uniforms.shadow_pass.value=C.map.depthTexture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(D,null,B,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(D,null,B,f,v,null)}function T(C,D,B,x){let E=null;const N=B.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)E=N;else if(E=B.isPointLight===!0?l:o,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const j=E.uuid,q=D.uuid;let ne=c[j];ne===void 0&&(ne={},c[j]=ne);let te=ne[q];te===void 0&&(te=E.clone(),ne[q]=te,D.addEventListener("dispose",A)),E=te}if(E.visible=D.visible,E.wireframe=D.wireframe,x===Yr?E.side=D.shadowSide!==null?D.shadowSide:D.side:E.side=D.shadowSide!==null?D.shadowSide:h[D.side],E.alphaMap=D.alphaMap,E.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,E.map=D.map,E.clipShadows=D.clipShadows,E.clippingPlanes=D.clippingPlanes,E.clipIntersection=D.clipIntersection,E.displacementMap=D.displacementMap,E.displacementScale=D.displacementScale,E.displacementBias=D.displacementBias,E.wireframeLinewidth=D.wireframeLinewidth,E.linewidth=D.linewidth,B.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const j=i.properties.get(E);j.light=B}return E}function M(C,D,B,x,E){if(C.visible===!1)return;if(C.layers.test(D.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===Yr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,C.matrixWorld);const q=e.update(C),ne=C.material;if(Array.isArray(ne)){const te=q.groups;for(let Y=0,z=te.length;Y<z;Y++){const J=te[Y],Me=ne[J.materialIndex];if(Me&&Me.visible){const ge=T(C,Me,x,E);C.onBeforeShadow(i,C,D,B,q,ge,J),i.renderBufferDirect(B,null,q,ge,C,J),C.onAfterShadow(i,C,D,B,q,ge,J)}}}else if(ne.visible){const te=T(C,ne,x,E);C.onBeforeShadow(i,C,D,B,q,te,null),i.renderBufferDirect(B,null,q,te,C,null),C.onAfterShadow(i,C,D,B,q,te,null)}}const j=C.children;for(let q=0,ne=j.length;q<ne;q++)M(j[q],D,B,x,E)}function A(C){C.target.removeEventListener("dispose",A);for(const B in c){const x=c[B],E=C.target.uuid;E in x&&(x[E].dispose(),delete x[E])}}}const HS={[al]:ol,[ll]:hl,[cl]:dl,[Ar]:ul,[ol]:al,[hl]:ll,[dl]:cl,[ul]:Ar};function GS(i,e){function t(){let F=!1;const we=new bt;let pe=null;const Ce=new bt(0,0,0,0);return{setMask:function(fe){pe!==fe&&!F&&(i.colorMask(fe,fe,fe,fe),pe=fe)},setLocked:function(fe){F=fe},setClear:function(fe,ae,xe,We,ft){ft===!0&&(fe*=We,ae*=We,xe*=We),we.set(fe,ae,xe,We),Ce.equals(we)===!1&&(i.clearColor(fe,ae,xe,We),Ce.copy(we))},reset:function(){F=!1,pe=null,Ce.set(-1,0,0,0)}}}function n(){let F=!1,we=!1,pe=null,Ce=null,fe=null;return{setReversed:function(ae){if(we!==ae){const xe=e.get("EXT_clip_control");ae?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),we=ae;const We=fe;fe=null,this.setClear(We)}},getReversed:function(){return we},setTest:function(ae){ae?oe(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(ae){pe!==ae&&!F&&(i.depthMask(ae),pe=ae)},setFunc:function(ae){if(we&&(ae=HS[ae]),Ce!==ae){switch(ae){case al:i.depthFunc(i.NEVER);break;case ol:i.depthFunc(i.ALWAYS);break;case ll:i.depthFunc(i.LESS);break;case Ar:i.depthFunc(i.LEQUAL);break;case cl:i.depthFunc(i.EQUAL);break;case ul:i.depthFunc(i.GEQUAL);break;case hl:i.depthFunc(i.GREATER);break;case dl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ce=ae}},setLocked:function(ae){F=ae},setClear:function(ae){fe!==ae&&(we&&(ae=1-ae),i.clearDepth(ae),fe=ae)},reset:function(){F=!1,pe=null,Ce=null,fe=null,we=!1}}}function r(){let F=!1,we=null,pe=null,Ce=null,fe=null,ae=null,xe=null,We=null,ft=null;return{setTest:function(st){F||(st?oe(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(st){we!==st&&!F&&(i.stencilMask(st),we=st)},setFunc:function(st,Li,qi){(pe!==st||Ce!==Li||fe!==qi)&&(i.stencilFunc(st,Li,qi),pe=st,Ce=Li,fe=qi)},setOp:function(st,Li,qi){(ae!==st||xe!==Li||We!==qi)&&(i.stencilOp(st,Li,qi),ae=st,xe=Li,We=qi)},setLocked:function(st){F=st},setClear:function(st){ft!==st&&(i.clearStencil(st),ft=st)},reset:function(){F=!1,we=null,pe=null,Ce=null,fe=null,ae=null,xe=null,We=null,ft=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],_=null,v=!1,m=null,p=null,b=null,T=null,M=null,A=null,C=null,D=new et(0,0,0),B=0,x=!1,E=null,N=null,j=null,q=null,ne=null;const te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,z=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(J)[1]),Y=z>=1):J.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),Y=z>=2);let Me=null,ge={};const Se=i.getParameter(i.SCISSOR_BOX),ze=i.getParameter(i.VIEWPORT),qe=new bt().fromArray(Se),gt=new bt().fromArray(ze);function ut(F,we,pe,Ce){const fe=new Uint8Array(4),ae=i.createTexture();i.bindTexture(F,ae),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xe=0;xe<pe;xe++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(we,0,i.RGBA,1,1,Ce,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(we+xe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return ae}const ie={};ie[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(i.DEPTH_TEST),a.setFunc(Ar),W(!1),ee(Mu),oe(i.CULL_FACE),H(on);function oe(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function Le(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function ke(F,we){return h[F]!==we?(i.bindFramebuffer(F,we),h[F]=we,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=we),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=we),!0):!1}function Pe(F,we){let pe=f,Ce=!1;if(F){pe=d.get(we),pe===void 0&&(pe=[],d.set(we,pe));const fe=F.textures;if(pe.length!==fe.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,xe=fe.length;ae<xe;ae++)pe[ae]=i.COLOR_ATTACHMENT0+ae;pe.length=fe.length,Ce=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,Ce=!0);Ce&&i.drawBuffers(pe)}function Je(F){return _!==F?(i.useProgram(F),_=F,!0):!1}const R={[Xn]:i.FUNC_ADD,[wg]:i.FUNC_SUBTRACT,[Ag]:i.FUNC_REVERSE_SUBTRACT};R[Rg]=i.MIN,R[Cg]=i.MAX;const I={[Lg]:i.ZERO,[Pg]:i.ONE,[Dg]:i.SRC_COLOR,[rl]:i.SRC_ALPHA,[Bg]:i.SRC_ALPHA_SATURATE,[Fg]:i.DST_COLOR,[Ug]:i.DST_ALPHA,[Ig]:i.ONE_MINUS_SRC_COLOR,[sl]:i.ONE_MINUS_SRC_ALPHA,[Og]:i.ONE_MINUS_DST_COLOR,[Ng]:i.ONE_MINUS_DST_ALPHA,[zg]:i.CONSTANT_COLOR,[Vg]:i.ONE_MINUS_CONSTANT_COLOR,[Hg]:i.CONSTANT_ALPHA,[Gg]:i.ONE_MINUS_CONSTANT_ALPHA};function H(F,we,pe,Ce,fe,ae,xe,We,ft,st){if(F===on){v===!0&&(Le(i.BLEND),v=!1);return}if(v===!1&&(oe(i.BLEND),v=!0),F!==Eg){if(F!==m||st!==x){if((p!==Xn||M!==Xn)&&(i.blendEquation(i.FUNC_ADD),p=Xn,M=Xn),st)switch(F){case Tr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Su:i.blendFunc(i.ONE,i.ONE);break;case yu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",F);break}else switch(F){case Tr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Su:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case yu:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bu:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",F);break}b=null,T=null,A=null,C=null,D.set(0,0,0),B=0,m=F,x=st}return}fe=fe||we,ae=ae||pe,xe=xe||Ce,(we!==p||fe!==M)&&(i.blendEquationSeparate(R[we],R[fe]),p=we,M=fe),(pe!==b||Ce!==T||ae!==A||xe!==C)&&(i.blendFuncSeparate(I[pe],I[Ce],I[ae],I[xe]),b=pe,T=Ce,A=ae,C=xe),(We.equals(D)===!1||ft!==B)&&(i.blendColor(We.r,We.g,We.b,ft),D.copy(We),B=ft),m=F,x=!1}function Q(F,we){F.side===rn?Le(i.CULL_FACE):oe(i.CULL_FACE);let pe=F.side===Kt;we&&(pe=!pe),W(pe),F.blending===Tr&&F.transparent===!1?H(on):H(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const Ce=F.stencilWrite;o.setTest(Ce),Ce&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),le(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?oe(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function W(F){E!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),E=F)}function ee(F){F!==yg?(oe(i.CULL_FACE),F!==N&&(F===Mu?i.cullFace(i.BACK):F===bg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),N=F}function w(F){F!==j&&(Y&&i.lineWidth(F),j=F)}function le(F,we,pe){F?(oe(i.POLYGON_OFFSET_FILL),(q!==we||ne!==pe)&&(i.polygonOffset(we,pe),q=we,ne=pe)):Le(i.POLYGON_OFFSET_FILL)}function re(F){F?oe(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function Z(F){F===void 0&&(F=i.TEXTURE0+te-1),Me!==F&&(i.activeTexture(F),Me=F)}function se(F,we,pe){pe===void 0&&(Me===null?pe=i.TEXTURE0+te-1:pe=Me);let Ce=ge[pe];Ce===void 0&&(Ce={type:void 0,texture:void 0},ge[pe]=Ce),(Ce.type!==F||Ce.texture!==we)&&(Me!==pe&&(i.activeTexture(pe),Me=pe),i.bindTexture(F,we||ie[F]),Ce.type=F,Ce.texture=we)}function S(){const F=ge[Me];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function g(){try{i.compressedTexImage2D(...arguments)}catch(F){it("WebGLState:",F)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(F){it("WebGLState:",F)}}function k(){try{i.texSubImage2D(...arguments)}catch(F){it("WebGLState:",F)}}function K(){try{i.texSubImage3D(...arguments)}catch(F){it("WebGLState:",F)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(F){it("WebGLState:",F)}}function ve(){try{i.compressedTexSubImage3D(...arguments)}catch(F){it("WebGLState:",F)}}function he(){try{i.texStorage2D(...arguments)}catch(F){it("WebGLState:",F)}}function Ae(){try{i.texStorage3D(...arguments)}catch(F){it("WebGLState:",F)}}function Ue(){try{i.texImage2D(...arguments)}catch(F){it("WebGLState:",F)}}function ce(){try{i.texImage3D(...arguments)}catch(F){it("WebGLState:",F)}}function _e(F){qe.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),qe.copy(F))}function ye(F){gt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),gt.copy(F))}function Re(F,we){let pe=c.get(we);pe===void 0&&(pe=new WeakMap,c.set(we,pe));let Ce=pe.get(F);Ce===void 0&&(Ce=i.getUniformBlockIndex(we,F.name),pe.set(F,Ce))}function me(F,we){const Ce=c.get(we).get(F);l.get(we)!==Ce&&(i.uniformBlockBinding(we,Ce,F.__bindingPointIndex),l.set(we,Ce))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Me=null,ge={},h={},d=new WeakMap,f=[],_=null,v=!1,m=null,p=null,b=null,T=null,M=null,A=null,C=null,D=new et(0,0,0),B=0,x=!1,E=null,N=null,j=null,q=null,ne=null,qe.set(0,0,i.canvas.width,i.canvas.height),gt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:oe,disable:Le,bindFramebuffer:ke,drawBuffers:Pe,useProgram:Je,setBlending:H,setMaterial:Q,setFlipSided:W,setCullFace:ee,setLineWidth:w,setPolygonOffset:le,setScissorTest:re,activeTexture:Z,bindTexture:se,unbindTexture:S,compressedTexImage2D:g,compressedTexImage3D:P,texImage2D:Ue,texImage3D:ce,updateUBOMapping:Re,uniformBlockBinding:me,texStorage2D:he,texStorage3D:Ae,texSubImage2D:k,texSubImage3D:K,compressedTexSubImage2D:G,compressedTexSubImage3D:ve,scissor:_e,viewport:ye,reset:$e}}function kS(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Fe,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(S,g){return f?new OffscreenCanvas(S,g):ps("canvas")}function v(S,g,P){let k=1;const K=se(S);if((K.width>P||K.height>P)&&(k=P/Math.max(K.width,K.height)),k<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const G=Math.floor(k*K.width),ve=Math.floor(k*K.height);h===void 0&&(h=_(G,ve));const he=g?_(G,ve):h;return he.width=G,he.height=ve,he.getContext("2d").drawImage(S,0,0,G,ve),Ge("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+ve+")."),he}else return"data"in S&&Ge("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),S;return S}function m(S){return S.generateMipmaps}function p(S){i.generateMipmap(S)}function b(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(S,g,P,k,K=!1){if(S!==null){if(i[S]!==void 0)return i[S];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let G=g;if(g===i.RED&&(P===i.FLOAT&&(G=i.R32F),P===i.HALF_FLOAT&&(G=i.R16F),P===i.UNSIGNED_BYTE&&(G=i.R8)),g===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(G=i.R8UI),P===i.UNSIGNED_SHORT&&(G=i.R16UI),P===i.UNSIGNED_INT&&(G=i.R32UI),P===i.BYTE&&(G=i.R8I),P===i.SHORT&&(G=i.R16I),P===i.INT&&(G=i.R32I)),g===i.RG&&(P===i.FLOAT&&(G=i.RG32F),P===i.HALF_FLOAT&&(G=i.RG16F),P===i.UNSIGNED_BYTE&&(G=i.RG8)),g===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(G=i.RG8UI),P===i.UNSIGNED_SHORT&&(G=i.RG16UI),P===i.UNSIGNED_INT&&(G=i.RG32UI),P===i.BYTE&&(G=i.RG8I),P===i.SHORT&&(G=i.RG16I),P===i.INT&&(G=i.RG32I)),g===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(G=i.RGB8UI),P===i.UNSIGNED_SHORT&&(G=i.RGB16UI),P===i.UNSIGNED_INT&&(G=i.RGB32UI),P===i.BYTE&&(G=i.RGB8I),P===i.SHORT&&(G=i.RGB16I),P===i.INT&&(G=i.RGB32I)),g===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),P===i.UNSIGNED_INT&&(G=i.RGBA32UI),P===i.BYTE&&(G=i.RGBA8I),P===i.SHORT&&(G=i.RGBA16I),P===i.INT&&(G=i.RGBA32I)),g===i.RGB&&(P===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),g===i.RGBA){const ve=K?ba:Qe.getTransfer(k);P===i.FLOAT&&(G=i.RGBA32F),P===i.HALF_FLOAT&&(G=i.RGBA16F),P===i.UNSIGNED_BYTE&&(G=ve===ot?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function M(S,g){let P;return S?g===null||g===Xi||g===fs?P=i.DEPTH24_STENCIL8:g===Ei?P=i.DEPTH32F_STENCIL8:g===ds&&(P=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Xi||g===fs?P=i.DEPTH_COMPONENT24:g===Ei?P=i.DEPTH_COMPONENT32F:g===ds&&(P=i.DEPTH_COMPONENT16),P}function A(S,g){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==Ut&&S.minFilter!==wt?Math.log2(Math.max(g.width,g.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?g.mipmaps.length:1}function C(S){const g=S.target;g.removeEventListener("dispose",C),B(g),g.isVideoTexture&&u.delete(g)}function D(S){const g=S.target;g.removeEventListener("dispose",D),E(g)}function B(S){const g=n.get(S);if(g.__webglInit===void 0)return;const P=S.source,k=d.get(P);if(k){const K=k[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&x(S),Object.keys(k).length===0&&d.delete(P)}n.remove(S)}function x(S){const g=n.get(S);i.deleteTexture(g.__webglTexture);const P=S.source,k=d.get(P);delete k[g.__cacheKey],a.memory.textures--}function E(S){const g=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let K=0;K<g.__webglFramebuffer[k].length;K++)i.deleteFramebuffer(g.__webglFramebuffer[k][K]);else i.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)i.deleteFramebuffer(g.__webglFramebuffer[k]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const P=S.textures;for(let k=0,K=P.length;k<K;k++){const G=n.get(P[k]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),a.memory.textures--),n.remove(P[k])}n.remove(S)}let N=0;function j(){N=0}function q(){const S=N;return S>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),N+=1,S}function ne(S){const g=[];return g.push(S.wrapS),g.push(S.wrapT),g.push(S.wrapR||0),g.push(S.magFilter),g.push(S.minFilter),g.push(S.anisotropy),g.push(S.internalFormat),g.push(S.format),g.push(S.type),g.push(S.generateMipmaps),g.push(S.premultiplyAlpha),g.push(S.flipY),g.push(S.unpackAlignment),g.push(S.colorSpace),g.join()}function te(S,g){const P=n.get(S);if(S.isVideoTexture&&re(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&P.__version!==S.version){const k=S.image;if(k===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{ie(P,S,g);return}}else S.isExternalTexture&&(P.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+g)}function Y(S,g){const P=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&P.__version!==S.version){ie(P,S,g);return}else S.isExternalTexture&&(P.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+g)}function z(S,g){const P=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&P.__version!==S.version){ie(P,S,g);return}t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+g)}function J(S,g){const P=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&P.__version!==S.version){oe(P,S,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+g)}const Me={[ml]:i.REPEAT,[ci]:i.CLAMP_TO_EDGE,[gl]:i.MIRRORED_REPEAT},ge={[Ut]:i.NEAREST,[Xg]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[wt]:i.LINEAR,[ho]:i.LINEAR_MIPMAP_NEAREST,[wn]:i.LINEAR_MIPMAP_LINEAR},Se={[jg]:i.NEVER,[e_]:i.ALWAYS,[Kg]:i.LESS,[wc]:i.LEQUAL,[Zg]:i.EQUAL,[Ac]:i.GEQUAL,[Jg]:i.GREATER,[Qg]:i.NOTEQUAL};function ze(S,g){if(g.type===Ei&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===wt||g.magFilter===ho||g.magFilter===Ds||g.magFilter===wn||g.minFilter===wt||g.minFilter===ho||g.minFilter===Ds||g.minFilter===wn)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,Me[g.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Me[g.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Me[g.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,ge[g.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,ge[g.minFilter]),g.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,Se[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ut||g.minFilter!==Ds&&g.minFilter!==wn||g.type===Ei&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(S,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function qe(S,g){let P=!1;S.__webglInit===void 0&&(S.__webglInit=!0,g.addEventListener("dispose",C));const k=g.source;let K=d.get(k);K===void 0&&(K={},d.set(k,K));const G=ne(g);if(G!==S.__cacheKey){K[G]===void 0&&(K[G]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),K[G].usedTimes++;const ve=K[S.__cacheKey];ve!==void 0&&(K[S.__cacheKey].usedTimes--,ve.usedTimes===0&&x(g)),S.__cacheKey=G,S.__webglTexture=K[G].texture}return P}function gt(S,g,P){return Math.floor(Math.floor(S/P)/g)}function ut(S,g,P,k){const G=S.updateRanges;if(G.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,P,k,g.data);else{G.sort((ce,_e)=>ce.start-_e.start);let ve=0;for(let ce=1;ce<G.length;ce++){const _e=G[ve],ye=G[ce],Re=_e.start+_e.count,me=gt(ye.start,g.width,4),$e=gt(_e.start,g.width,4);ye.start<=Re+1&&me===$e&&gt(ye.start+ye.count-1,g.width,4)===me?_e.count=Math.max(_e.count,ye.start+ye.count-_e.start):(++ve,G[ve]=ye)}G.length=ve+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),Ae=i.getParameter(i.UNPACK_SKIP_PIXELS),Ue=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let ce=0,_e=G.length;ce<_e;ce++){const ye=G[ce],Re=Math.floor(ye.start/4),me=Math.ceil(ye.count/4),$e=Re%g.width,F=Math.floor(Re/g.width),we=me,pe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,$e,F,we,pe,P,k,g.data)}S.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ue)}}function ie(S,g,P){let k=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=i.TEXTURE_3D);const K=qe(S,g),G=g.source;t.bindTexture(k,S.__webglTexture,i.TEXTURE0+P);const ve=n.get(G);if(G.version!==ve.__version||K===!0){t.activeTexture(i.TEXTURE0+P);const he=Qe.getPrimaries(Qe.workingColorSpace),Ae=g.colorSpace===sn?null:Qe.getPrimaries(g.colorSpace),Ue=g.colorSpace===sn||he===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ce=v(g.image,!1,r.maxTextureSize);ce=Z(g,ce);const _e=s.convert(g.format,g.colorSpace),ye=s.convert(g.type);let Re=T(g.internalFormat,_e,ye,g.colorSpace,g.isVideoTexture);ze(k,g);let me;const $e=g.mipmaps,F=g.isVideoTexture!==!0,we=ve.__version===void 0||K===!0,pe=G.dataReady,Ce=A(g,ce);if(g.isDepthTexture)Re=M(g.format===Yn,g.type),we&&(F?t.texStorage2D(i.TEXTURE_2D,1,Re,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,Re,ce.width,ce.height,0,_e,ye,null));else if(g.isDataTexture)if($e.length>0){F&&we&&t.texStorage2D(i.TEXTURE_2D,Ce,Re,$e[0].width,$e[0].height);for(let fe=0,ae=$e.length;fe<ae;fe++)me=$e[fe],F?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,me.width,me.height,_e,ye,me.data):t.texImage2D(i.TEXTURE_2D,fe,Re,me.width,me.height,0,_e,ye,me.data);g.generateMipmaps=!1}else F?(we&&t.texStorage2D(i.TEXTURE_2D,Ce,Re,ce.width,ce.height),pe&&ut(g,ce,_e,ye)):t.texImage2D(i.TEXTURE_2D,0,Re,ce.width,ce.height,0,_e,ye,ce.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){F&&we&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Re,$e[0].width,$e[0].height,ce.depth);for(let fe=0,ae=$e.length;fe<ae;fe++)if(me=$e[fe],g.format!==wi)if(_e!==null)if(F){if(pe)if(g.layerUpdates.size>0){const xe=Ku(me.width,me.height,g.format,g.type);for(const We of g.layerUpdates){const ft=me.data.subarray(We*xe/me.data.BYTES_PER_ELEMENT,(We+1)*xe/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,We,me.width,me.height,1,_e,ft)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,me.width,me.height,ce.depth,_e,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,Re,me.width,me.height,ce.depth,0,me.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?pe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,me.width,me.height,ce.depth,_e,ye,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,Re,me.width,me.height,ce.depth,0,_e,ye,me.data)}else{F&&we&&t.texStorage2D(i.TEXTURE_2D,Ce,Re,$e[0].width,$e[0].height);for(let fe=0,ae=$e.length;fe<ae;fe++)me=$e[fe],g.format!==wi?_e!==null?F?pe&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,me.width,me.height,_e,me.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,Re,me.width,me.height,0,me.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,me.width,me.height,_e,ye,me.data):t.texImage2D(i.TEXTURE_2D,fe,Re,me.width,me.height,0,_e,ye,me.data)}else if(g.isDataArrayTexture)if(F){if(we&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Re,ce.width,ce.height,ce.depth),pe)if(g.layerUpdates.size>0){const fe=Ku(ce.width,ce.height,g.format,g.type);for(const ae of g.layerUpdates){const xe=ce.data.subarray(ae*fe/ce.data.BYTES_PER_ELEMENT,(ae+1)*fe/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ae,ce.width,ce.height,1,_e,ye,xe)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,_e,ye,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ce.width,ce.height,ce.depth,0,_e,ye,ce.data);else if(g.isData3DTexture)F?(we&&t.texStorage3D(i.TEXTURE_3D,Ce,Re,ce.width,ce.height,ce.depth),pe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,_e,ye,ce.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ce.width,ce.height,ce.depth,0,_e,ye,ce.data);else if(g.isFramebufferTexture){if(we)if(F)t.texStorage2D(i.TEXTURE_2D,Ce,Re,ce.width,ce.height);else{let fe=ce.width,ae=ce.height;for(let xe=0;xe<Ce;xe++)t.texImage2D(i.TEXTURE_2D,xe,Re,fe,ae,0,_e,ye,null),fe>>=1,ae>>=1}}else if($e.length>0){if(F&&we){const fe=se($e[0]);t.texStorage2D(i.TEXTURE_2D,Ce,Re,fe.width,fe.height)}for(let fe=0,ae=$e.length;fe<ae;fe++)me=$e[fe],F?pe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,_e,ye,me):t.texImage2D(i.TEXTURE_2D,fe,Re,_e,ye,me);g.generateMipmaps=!1}else if(F){if(we){const fe=se(ce);t.texStorage2D(i.TEXTURE_2D,Ce,Re,fe.width,fe.height)}pe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,ye,ce)}else t.texImage2D(i.TEXTURE_2D,0,Re,_e,ye,ce);m(g)&&p(k),ve.__version=G.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function oe(S,g,P){if(g.image.length!==6)return;const k=qe(S,g),K=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+P);const G=n.get(K);if(K.version!==G.__version||k===!0){t.activeTexture(i.TEXTURE0+P);const ve=Qe.getPrimaries(Qe.workingColorSpace),he=g.colorSpace===sn?null:Qe.getPrimaries(g.colorSpace),Ae=g.colorSpace===sn||ve===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Ue=g.isCompressedTexture||g.image[0].isCompressedTexture,ce=g.image[0]&&g.image[0].isDataTexture,_e=[];for(let ae=0;ae<6;ae++)!Ue&&!ce?_e[ae]=v(g.image[ae],!0,r.maxCubemapSize):_e[ae]=ce?g.image[ae].image:g.image[ae],_e[ae]=Z(g,_e[ae]);const ye=_e[0],Re=s.convert(g.format,g.colorSpace),me=s.convert(g.type),$e=T(g.internalFormat,Re,me,g.colorSpace),F=g.isVideoTexture!==!0,we=G.__version===void 0||k===!0,pe=K.dataReady;let Ce=A(g,ye);ze(i.TEXTURE_CUBE_MAP,g);let fe;if(Ue){F&&we&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,$e,ye.width,ye.height);for(let ae=0;ae<6;ae++){fe=_e[ae].mipmaps;for(let xe=0;xe<fe.length;xe++){const We=fe[xe];g.format!==wi?Re!==null?F?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe,0,0,We.width,We.height,Re,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe,$e,We.width,We.height,0,We.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe,0,0,We.width,We.height,Re,me,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe,$e,We.width,We.height,0,Re,me,We.data)}}}else{if(fe=g.mipmaps,F&&we){fe.length>0&&Ce++;const ae=se(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,$e,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(ce){F?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,_e[ae].width,_e[ae].height,Re,me,_e[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,$e,_e[ae].width,_e[ae].height,0,Re,me,_e[ae].data);for(let xe=0;xe<fe.length;xe++){const ft=fe[xe].image[ae].image;F?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe+1,0,0,ft.width,ft.height,Re,me,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe+1,$e,ft.width,ft.height,0,Re,me,ft.data)}}else{F?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Re,me,_e[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,$e,Re,me,_e[ae]);for(let xe=0;xe<fe.length;xe++){const We=fe[xe];F?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe+1,0,0,Re,me,We.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe+1,$e,Re,me,We.image[ae])}}}m(g)&&p(i.TEXTURE_CUBE_MAP),G.__version=K.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function Le(S,g,P,k,K,G){const ve=s.convert(P.format,P.colorSpace),he=s.convert(P.type),Ae=T(P.internalFormat,ve,he,P.colorSpace),Ue=n.get(g),ce=n.get(P);if(ce.__renderTarget=g,!Ue.__hasExternalTextures){const _e=Math.max(1,g.width>>G),ye=Math.max(1,g.height>>G);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,G,Ae,_e,ye,g.depth,0,ve,he,null):t.texImage2D(K,G,Ae,_e,ye,0,ve,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),le(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,K,ce.__webglTexture,0,w(g)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,K,ce.__webglTexture,G),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(S,g,P){if(i.bindRenderbuffer(i.RENDERBUFFER,S),g.depthBuffer){const k=g.depthTexture,K=k&&k.isDepthTexture?k.type:null,G=M(g.stencilBuffer,K),ve=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;le(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,w(g),G,g.width,g.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,w(g),G,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,G,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,S)}else{const k=g.textures;for(let K=0;K<k.length;K++){const G=k[K],ve=s.convert(G.format,G.colorSpace),he=s.convert(G.type),Ae=T(G.internalFormat,ve,he,G.colorSpace);le(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,w(g),Ae,g.width,g.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,w(g),Ae,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(S,g,P){const k=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(g.depthTexture);if(K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),k){if(K.__webglInit===void 0&&(K.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ze(i.TEXTURE_CUBE_MAP,g.depthTexture);const Ue=s.convert(g.depthTexture.format),ce=s.convert(g.depthTexture.type);let _e;g.depthTexture.format===mn?_e=i.DEPTH_COMPONENT24:g.depthTexture.format===Yn&&(_e=i.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,_e,g.width,g.height,0,Ue,ce,null)}}else te(g.depthTexture,0);const G=K.__webglTexture,ve=w(g),he=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,Ae=g.depthTexture.format===Yn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===mn)le(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ae,he,G,0,ve):i.framebufferTexture2D(i.FRAMEBUFFER,Ae,he,G,0);else if(g.depthTexture.format===Yn)le(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ae,he,G,0,ve):i.framebufferTexture2D(i.FRAMEBUFFER,Ae,he,G,0);else throw new Error("Unknown depthTexture format")}function Je(S){const g=n.get(S),P=S.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==S.depthTexture){const k=S.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){const K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",K)};k.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=k}if(S.depthTexture&&!g.__autoAllocateDepthBuffer)if(P)for(let k=0;k<6;k++)Pe(g.__webglFramebuffer[k],S,k);else{const k=S.texture.mipmaps;k&&k.length>0?Pe(g.__webglFramebuffer[0],S,0):Pe(g.__webglFramebuffer,S,0)}else if(P){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=i.createRenderbuffer(),ke(g.__webglDepthbuffer[k],S,!1);else{const K=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=g.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,G)}}else{const k=S.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),ke(g.__webglDepthbuffer,S,!1);else{const K=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,G)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function R(S,g,P){const k=n.get(S);g!==void 0&&Le(k.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&Je(S)}function I(S){const g=S.texture,P=n.get(S),k=n.get(g);S.addEventListener("dispose",D);const K=S.textures,G=S.isWebGLCubeRenderTarget===!0,ve=K.length>1;if(ve||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=g.version,a.memory.textures++),G){P.__webglFramebuffer=[];for(let he=0;he<6;he++)if(g.mipmaps&&g.mipmaps.length>0){P.__webglFramebuffer[he]=[];for(let Ae=0;Ae<g.mipmaps.length;Ae++)P.__webglFramebuffer[he][Ae]=i.createFramebuffer()}else P.__webglFramebuffer[he]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){P.__webglFramebuffer=[];for(let he=0;he<g.mipmaps.length;he++)P.__webglFramebuffer[he]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(ve)for(let he=0,Ae=K.length;he<Ae;he++){const Ue=n.get(K[he]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&le(S)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let he=0;he<K.length;he++){const Ae=K[he];P.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[he]);const Ue=s.convert(Ae.format,Ae.colorSpace),ce=s.convert(Ae.type),_e=T(Ae.internalFormat,Ue,ce,Ae.colorSpace,S.isXRRenderTarget===!0),ye=w(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,_e,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,P.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),ke(P.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),ze(i.TEXTURE_CUBE_MAP,g);for(let he=0;he<6;he++)if(g.mipmaps&&g.mipmaps.length>0)for(let Ae=0;Ae<g.mipmaps.length;Ae++)Le(P.__webglFramebuffer[he][Ae],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ae);else Le(P.__webglFramebuffer[he],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(g)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let he=0,Ae=K.length;he<Ae;he++){const Ue=K[he],ce=n.get(Ue);let _e=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(_e=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,ce.__webglTexture),ze(_e,Ue),Le(P.__webglFramebuffer,S,Ue,i.COLOR_ATTACHMENT0+he,_e,0),m(Ue)&&p(_e)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(he=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,k.__webglTexture),ze(he,g),g.mipmaps&&g.mipmaps.length>0)for(let Ae=0;Ae<g.mipmaps.length;Ae++)Le(P.__webglFramebuffer[Ae],S,g,i.COLOR_ATTACHMENT0,he,Ae);else Le(P.__webglFramebuffer,S,g,i.COLOR_ATTACHMENT0,he,0);m(g)&&p(he),t.unbindTexture()}S.depthBuffer&&Je(S)}function H(S){const g=S.textures;for(let P=0,k=g.length;P<k;P++){const K=g[P];if(m(K)){const G=b(S),ve=n.get(K).__webglTexture;t.bindTexture(G,ve),p(G),t.unbindTexture()}}}const Q=[],W=[];function ee(S){if(S.samples>0){if(le(S)===!1){const g=S.textures,P=S.width,k=S.height;let K=i.COLOR_BUFFER_BIT;const G=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(S),he=g.length>1;if(he)for(let Ue=0;Ue<g.length;Ue++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const Ae=S.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Ue=0;Ue<g.length;Ue++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[Ue]);const ce=n.get(g[Ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ce,0)}i.blitFramebuffer(0,0,P,k,0,0,P,k,K,i.NEAREST),l===!0&&(Q.length=0,W.length=0,Q.push(i.COLOR_ATTACHMENT0+Ue),S.depthBuffer&&S.resolveDepthBuffer===!1&&(Q.push(G),W.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,W)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Ue=0;Ue<g.length;Ue++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,ve.__webglColorRenderbuffer[Ue]);const ce=n.get(g[Ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,ce,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const g=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function w(S){return Math.min(r.maxSamples,S.samples)}function le(S){const g=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function re(S){const g=a.render.frame;u.get(S)!==g&&(u.set(S,g),S.update())}function Z(S,g){const P=S.colorSpace,k=S.format,K=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||P!==Lr&&P!==sn&&(Qe.getTransfer(P)===ot?(k!==wi||K!==gi)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",P)),g}function se(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=j,this.setTexture2D=te,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=J,this.rebindTextures=R,this.setupRenderTarget=I,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=le,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function WS(i,e){function t(n,r=sn){let s;const a=Qe.getTransfer(r);if(n===gi)return i.UNSIGNED_BYTE;if(n===Mc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Sc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===df)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ff)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===uf)return i.BYTE;if(n===hf)return i.SHORT;if(n===ds)return i.UNSIGNED_SHORT;if(n===xc)return i.INT;if(n===Xi)return i.UNSIGNED_INT;if(n===Ei)return i.FLOAT;if(n===pn)return i.HALF_FLOAT;if(n===pf)return i.ALPHA;if(n===mf)return i.RGB;if(n===wi)return i.RGBA;if(n===mn)return i.DEPTH_COMPONENT;if(n===Yn)return i.DEPTH_STENCIL;if(n===yc)return i.RED;if(n===bc)return i.RED_INTEGER;if(n===Cr)return i.RG;if(n===Tc)return i.RG_INTEGER;if(n===Ec)return i.RGBA_INTEGER;if(n===la||n===ca||n===ua||n===ha)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===la)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===la)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ha)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_l||n===vl||n===xl||n===Ml)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===_l)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ml)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sl||n===yl||n===bl||n===Tl||n===El||n===wl||n===Al)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Sl||n===yl)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===bl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Tl)return s.COMPRESSED_R11_EAC;if(n===El)return s.COMPRESSED_SIGNED_R11_EAC;if(n===wl)return s.COMPRESSED_RG11_EAC;if(n===Al)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Rl||n===Cl||n===Ll||n===Pl||n===Dl||n===Il||n===Ul||n===Nl||n===Fl||n===Ol||n===Bl||n===zl||n===Vl||n===Hl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Rl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ll)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Dl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Il)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ul)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Nl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ol)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Hl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gl||n===kl||n===Wl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Gl)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xl||n===ql||n===$l||n===Yl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Xl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ql)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$l)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const XS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $S{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Rf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ui({vertexShader:XS,fragmentShader:qS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ii(new Xa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class YS extends Ir{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,_=null;const v=typeof XRWebGLBinding<"u",m=new $S,p={},b=t.getContextAttributes();let T=null,M=null;const A=[],C=[],D=new Fe;let B=null;const x=new pi;x.viewport=new bt;const E=new pi;E.viewport=new bt;const N=[x,E],j=new rv;let q=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let oe=A[ie];return oe===void 0&&(oe=new Io,A[ie]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(ie){let oe=A[ie];return oe===void 0&&(oe=new Io,A[ie]=oe),oe.getGripSpace()},this.getHand=function(ie){let oe=A[ie];return oe===void 0&&(oe=new Io,A[ie]=oe),oe.getHandSpace()};function te(ie){const oe=C.indexOf(ie.inputSource);if(oe===-1)return;const Le=A[oe];Le!==void 0&&(Le.update(ie.inputSource,ie.frame,c||a),Le.dispatchEvent({type:ie.type,data:ie.inputSource}))}function Y(){r.removeEventListener("select",te),r.removeEventListener("selectstart",te),r.removeEventListener("selectend",te),r.removeEventListener("squeeze",te),r.removeEventListener("squeezestart",te),r.removeEventListener("squeezeend",te),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",z);for(let ie=0;ie<A.length;ie++){const oe=C[ie];oe!==null&&(C[ie]=null,A[ie].disconnect(oe))}q=null,ne=null,m.reset();for(const ie in p)delete p[ie];e.setRenderTarget(T),f=null,d=null,h=null,r=null,M=null,ut.stop(),n.isPresenting=!1,e.setPixelRatio(B),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){s=ie,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",te),r.addEventListener("selectstart",te),r.addEventListener("selectend",te),r.addEventListener("squeeze",te),r.addEventListener("squeezestart",te),r.addEventListener("squeezeend",te),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",z),b.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(D),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Le=null,ke=null,Pe=null;b.depth&&(Pe=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Le=b.stencil?Yn:mn,ke=b.stencil?fs:Xi);const Je={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Je),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Gi(d.textureWidth,d.textureHeight,{format:wi,type:gi,depthTexture:new _s(d.textureWidth,d.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,Le),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Le={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,Le),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Gi(f.framebufferWidth,f.framebufferHeight,{format:wi,type:gi,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ut.setContext(r),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(ie){for(let oe=0;oe<ie.removed.length;oe++){const Le=ie.removed[oe],ke=C.indexOf(Le);ke>=0&&(C[ke]=null,A[ke].disconnect(Le))}for(let oe=0;oe<ie.added.length;oe++){const Le=ie.added[oe];let ke=C.indexOf(Le);if(ke===-1){for(let Je=0;Je<A.length;Je++)if(Je>=C.length){C.push(Le),ke=Je;break}else if(C[Je]===null){C[Je]=Le,ke=Je;break}if(ke===-1)break}const Pe=A[ke];Pe&&Pe.connect(Le)}}const J=new U,Me=new U;function ge(ie,oe,Le){J.setFromMatrixPosition(oe.matrixWorld),Me.setFromMatrixPosition(Le.matrixWorld);const ke=J.distanceTo(Me),Pe=oe.projectionMatrix.elements,Je=Le.projectionMatrix.elements,R=Pe[14]/(Pe[10]-1),I=Pe[14]/(Pe[10]+1),H=(Pe[9]+1)/Pe[5],Q=(Pe[9]-1)/Pe[5],W=(Pe[8]-1)/Pe[0],ee=(Je[8]+1)/Je[0],w=R*W,le=R*ee,re=ke/(-W+ee),Z=re*-W;if(oe.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Z),ie.translateZ(re),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Pe[10]===-1)ie.projectionMatrix.copy(oe.projectionMatrix),ie.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const se=R+re,S=I+re,g=w-Z,P=le+(ke-Z),k=H*I/S*se,K=Q*I/S*se;ie.projectionMatrix.makePerspective(g,P,k,K,se,S),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function Se(ie,oe){oe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(oe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;let oe=ie.near,Le=ie.far;m.texture!==null&&(m.depthNear>0&&(oe=m.depthNear),m.depthFar>0&&(Le=m.depthFar)),j.near=E.near=x.near=oe,j.far=E.far=x.far=Le,(q!==j.near||ne!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),q=j.near,ne=j.far),j.layers.mask=ie.layers.mask|6,x.layers.mask=j.layers.mask&3,E.layers.mask=j.layers.mask&5;const ke=ie.parent,Pe=j.cameras;Se(j,ke);for(let Je=0;Je<Pe.length;Je++)Se(Pe[Je],ke);Pe.length===2?ge(j,x,E):j.projectionMatrix.copy(x.projectionMatrix),ze(ie,j,ke)};function ze(ie,oe,Le){Le===null?ie.matrix.copy(oe.matrixWorld):(ie.matrix.copy(Le.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(oe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(oe.projectionMatrix),ie.projectionMatrixInverse.copy(oe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=gs*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ie)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(j)},this.getCameraTexture=function(ie){return p[ie]};let qe=null;function gt(ie,oe){if(u=oe.getViewerPose(c||a),_=oe,u!==null){const Le=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ke=!1;Le.length!==j.cameras.length&&(j.cameras.length=0,ke=!0);for(let I=0;I<Le.length;I++){const H=Le[I];let Q=null;if(f!==null)Q=f.getViewport(H);else{const ee=h.getViewSubImage(d,H);Q=ee.viewport,I===0&&(e.setRenderTargetTextures(M,ee.colorTexture,ee.depthStencilTexture),e.setRenderTarget(M))}let W=N[I];W===void 0&&(W=new pi,W.layers.enable(I),W.viewport=new bt,N[I]=W),W.matrix.fromArray(H.transform.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale),W.projectionMatrix.fromArray(H.projectionMatrix),W.projectionMatrixInverse.copy(W.projectionMatrix).invert(),W.viewport.set(Q.x,Q.y,Q.width,Q.height),I===0&&(j.matrix.copy(W.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),ke===!0&&j.cameras.push(W)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const I=h.getDepthInformation(Le[0]);I&&I.isValid&&I.texture&&m.init(I,r.renderState)}if(Pe&&Pe.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let I=0;I<Le.length;I++){const H=Le[I].camera;if(H){let Q=p[H];Q||(Q=new Rf,p[H]=Q);const W=h.getCameraImage(H);Q.sourceTexture=W}}}}for(let Le=0;Le<A.length;Le++){const ke=C[Le],Pe=A[Le];ke!==null&&Pe!==void 0&&Pe.update(ke,oe,c||a)}qe&&qe(ie,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),_=null}const ut=new Lf;ut.setAnimationLoop(gt),this.setAnimationLoop=function(ie){qe=ie},this.dispose=function(){}}}const Gn=new gn,jS=new _t;function KS(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,bf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,T,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Kt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Kt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),T=b.envMap,M=b.envMapRotation;T&&(m.envMap.value=T,Gn.copy(M),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),m.envMapRotation.value.setFromMatrix4(jS.makeRotationFromEuler(Gn)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=T*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function ZS(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,T){const M=T.program;n.uniformBlockBinding(b,M)}function c(b,T){let M=r[b.id];M===void 0&&(_(b),M=u(b),r[b.id]=M,b.addEventListener("dispose",m));const A=T.program;n.updateUBOMapping(b,A);const C=e.render.frame;s[b.id]!==C&&(d(b),s[b.id]=C)}function u(b){const T=h();b.__bindingPointIndex=T;const M=i.createBuffer(),A=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,M),M}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const T=r[b.id],M=b.uniforms,A=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let C=0,D=M.length;C<D;C++){const B=Array.isArray(M[C])?M[C]:[M[C]];for(let x=0,E=B.length;x<E;x++){const N=B[x];if(f(N,C,x,A)===!0){const j=N.__offset,q=Array.isArray(N.value)?N.value:[N.value];let ne=0;for(let te=0;te<q.length;te++){const Y=q[te],z=v(Y);typeof Y=="number"||typeof Y=="boolean"?(N.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,j+ne,N.__data)):Y.isMatrix3?(N.__data[0]=Y.elements[0],N.__data[1]=Y.elements[1],N.__data[2]=Y.elements[2],N.__data[3]=0,N.__data[4]=Y.elements[3],N.__data[5]=Y.elements[4],N.__data[6]=Y.elements[5],N.__data[7]=0,N.__data[8]=Y.elements[6],N.__data[9]=Y.elements[7],N.__data[10]=Y.elements[8],N.__data[11]=0):(Y.toArray(N.__data,ne),ne+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,j,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,T,M,A){const C=b.value,D=T+"_"+M;if(A[D]===void 0)return typeof C=="number"||typeof C=="boolean"?A[D]=C:A[D]=C.clone(),!0;{const B=A[D];if(typeof C=="number"||typeof C=="boolean"){if(B!==C)return A[D]=C,!0}else if(B.equals(C)===!1)return B.copy(C),!0}return!1}function _(b){const T=b.uniforms;let M=0;const A=16;for(let D=0,B=T.length;D<B;D++){const x=Array.isArray(T[D])?T[D]:[T[D]];for(let E=0,N=x.length;E<N;E++){const j=x[E],q=Array.isArray(j.value)?j.value:[j.value];for(let ne=0,te=q.length;ne<te;ne++){const Y=q[ne],z=v(Y),J=M%A,Me=J%z.boundary,ge=J+Me;M+=Me,ge!==0&&A-ge<z.storage&&(M+=A-ge),j.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=M,M+=z.storage}}}const C=M%A;return C>0&&(M+=A-C),b.__size=M,b.__cache={},this}function v(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ge("WebGLRenderer: Unsupported uniform value type.",b),T}function m(b){const T=b.target;T.removeEventListener("dispose",m);const M=a.indexOf(T.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}const JS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Di=null;function QS(){return Di===null&&(Di=new Af(JS,16,16,Cr,pn),Di.name="DFG_LUT",Di.minFilter=wt,Di.magFilter=wt,Di.wrapS=ci,Di.wrapT=ci,Di.generateMipmaps=!1,Di.needsUpdate=!0),Di}class ey{constructor(e={}){const{canvas:t=t_(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=gi}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const v=f,m=new Set([Ec,Tc,bc]),p=new Set([gi,Xi,ds,fs,Mc,Sc]),b=new Uint32Array(4),T=new Int32Array(4);let M=null,A=null;const C=[],D=[];let B=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let E=!1;this._outputColorSpace=qt;let N=0,j=0,q=null,ne=-1,te=null;const Y=new bt,z=new bt;let J=null;const Me=new et(0);let ge=0,Se=t.width,ze=t.height,qe=1,gt=null,ut=null;const ie=new bt(0,0,Se,ze),oe=new bt(0,0,Se,ze);let Le=!1;const ke=new Lc;let Pe=!1,Je=!1;const R=new _t,I=new U,H=new bt,Q={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let W=!1;function ee(){return q===null?qe:1}let w=n;function le(y,O){return t.getContext(y,O)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vc}`),t.addEventListener("webglcontextlost",We,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",st,!1),w===null){const O="webgl2";if(w=le(O,y),w===null)throw le(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw it("WebGLRenderer: "+y.message),y}let re,Z,se,S,g,P,k,K,G,ve,he,Ae,Ue,ce,_e,ye,Re,me,$e,F,we,pe,Ce,fe;function ae(){re=new Qx(w),re.init(),pe=new WS(w,re),Z=new Wx(w,re,e,pe),se=new GS(w,re),Z.reversedDepthBuffer&&d&&se.buffers.depth.setReversed(!0),S=new iM(w),g=new AS,P=new kS(w,re,se,g,Z,pe,S),k=new qx(x),K=new Jx(x),G=new av(w),Ce=new Gx(w,G),ve=new eM(w,G,S,Ce),he=new rM(w,ve,G,S),$e=new nM(w,Z,P),ye=new Xx(g),Ae=new wS(x,k,K,re,Z,Ce,ye),Ue=new KS(x,g),ce=new CS,_e=new NS(re),me=new Hx(x,k,K,se,he,_,l),Re=new VS(x,he,Z),fe=new ZS(w,S,Z,se),F=new kx(w,re,S),we=new tM(w,re,S),S.programs=Ae.programs,x.capabilities=Z,x.extensions=re,x.properties=g,x.renderLists=ce,x.shadowMap=Re,x.state=se,x.info=S}ae(),v!==gi&&(B=new aM(v,t.width,t.height,r,s));const xe=new YS(x,w);this.xr=xe,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const y=re.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=re.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return qe},this.setPixelRatio=function(y){y!==void 0&&(qe=y,this.setSize(Se,ze,!1))},this.getSize=function(y){return y.set(Se,ze)},this.setSize=function(y,O,$=!0){if(xe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=y,ze=O,t.width=Math.floor(y*qe),t.height=Math.floor(O*qe),$===!0&&(t.style.width=y+"px",t.style.height=O+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(Se*qe,ze*qe).floor()},this.setDrawingBufferSize=function(y,O,$){Se=y,ze=O,qe=$,t.width=Math.floor(y*$),t.height=Math.floor(O*$),this.setViewport(0,0,y,O)},this.setEffects=function(y){if(v===gi){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let O=0;O<y.length;O++)if(y[O].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(Y)},this.getViewport=function(y){return y.copy(ie)},this.setViewport=function(y,O,$,X){y.isVector4?ie.set(y.x,y.y,y.z,y.w):ie.set(y,O,$,X),se.viewport(Y.copy(ie).multiplyScalar(qe).round())},this.getScissor=function(y){return y.copy(oe)},this.setScissor=function(y,O,$,X){y.isVector4?oe.set(y.x,y.y,y.z,y.w):oe.set(y,O,$,X),se.scissor(z.copy(oe).multiplyScalar(qe).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(y){se.setScissorTest(Le=y)},this.setOpaqueSort=function(y){gt=y},this.setTransparentSort=function(y){ut=y},this.getClearColor=function(y){return y.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(y=!0,O=!0,$=!0){let X=0;if(y){let V=!1;if(q!==null){const be=q.texture.format;V=m.has(be)}if(V){const be=q.texture.type,De=p.has(be),Ee=me.getClearColor(),Ie=me.getClearAlpha(),Ne=Ee.r,He=Ee.g,Oe=Ee.b;De?(b[0]=Ne,b[1]=He,b[2]=Oe,b[3]=Ie,w.clearBufferuiv(w.COLOR,0,b)):(T[0]=Ne,T[1]=He,T[2]=Oe,T[3]=Ie,w.clearBufferiv(w.COLOR,0,T))}else X|=w.COLOR_BUFFER_BIT}O&&(X|=w.DEPTH_BUFFER_BIT),$&&(X|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",We,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",st,!1),me.dispose(),ce.dispose(),_e.dispose(),g.dispose(),k.dispose(),K.dispose(),he.dispose(),Ce.dispose(),fe.dispose(),Ae.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Uc),xe.removeEventListener("sessionend",Nc),In.stop()};function We(y){y.preventDefault(),Ru("WebGLRenderer: Context Lost."),E=!0}function ft(){Ru("WebGLRenderer: Context Restored."),E=!1;const y=S.autoReset,O=Re.enabled,$=Re.autoUpdate,X=Re.needsUpdate,V=Re.type;ae(),S.autoReset=y,Re.enabled=O,Re.autoUpdate=$,Re.needsUpdate=X,Re.type=V}function st(y){it("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Li(y){const O=y.target;O.removeEventListener("dispose",Li),qi(O)}function qi(y){Xf(y),g.remove(y)}function Xf(y){const O=g.get(y).programs;O!==void 0&&(O.forEach(function($){Ae.releaseProgram($)}),y.isShaderMaterial&&Ae.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,$,X,V,be){O===null&&(O=Q);const De=V.isMesh&&V.matrixWorld.determinant()<0,Ee=$f(y,O,$,X,V);se.setMaterial(X,De);let Ie=$.index,Ne=1;if(X.wireframe===!0){if(Ie=ve.getWireframeAttribute($),Ie===void 0)return;Ne=2}const He=$.drawRange,Oe=$.attributes.position;let Ke=He.start*Ne,lt=(He.start+He.count)*Ne;be!==null&&(Ke=Math.max(Ke,be.start*Ne),lt=Math.min(lt,(be.start+be.count)*Ne)),Ie!==null?(Ke=Math.max(Ke,0),lt=Math.min(lt,Ie.count)):Oe!=null&&(Ke=Math.max(Ke,0),lt=Math.min(lt,Oe.count));const vt=lt-Ke;if(vt<0||vt===1/0)return;Ce.setup(V,X,Ee,$,Ie);let xt,ht=F;if(Ie!==null&&(xt=G.get(Ie),ht=we,ht.setIndex(xt)),V.isMesh)X.wireframe===!0?(se.setLineWidth(X.wireframeLinewidth*ee()),ht.setMode(w.LINES)):ht.setMode(w.TRIANGLES);else if(V.isLine){let Be=X.linewidth;Be===void 0&&(Be=1),se.setLineWidth(Be*ee()),V.isLineSegments?ht.setMode(w.LINES):V.isLineLoop?ht.setMode(w.LINE_LOOP):ht.setMode(w.LINE_STRIP)}else V.isPoints?ht.setMode(w.POINTS):V.isSprite&&ht.setMode(w.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)ms("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))ht.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Be=V._multiDrawStarts,at=V._multiDrawCounts,tt=V._multiDrawCount,ri=Ie?G.get(Ie).bytesPerElement:1,er=g.get(X).currentProgram.getUniforms();for(let si=0;si<tt;si++)er.setValue(w,"_gl_DrawID",si),ht.render(Be[si]/ri,at[si])}else if(V.isInstancedMesh)ht.renderInstances(Ke,vt,V.count);else if($.isInstancedBufferGeometry){const Be=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,at=Math.min($.instanceCount,Be);ht.renderInstances(Ke,vt,at)}else ht.render(Ke,vt)};function Ic(y,O,$){y.transparent===!0&&y.side===rn&&y.forceSinglePass===!1?(y.side=Kt,y.needsUpdate=!0,As(y,O,$),y.side=Dn,y.needsUpdate=!0,As(y,O,$),y.side=rn):As(y,O,$)}this.compile=function(y,O,$=null){$===null&&($=y),A=_e.get($),A.init(O),D.push(A),$.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),y!==$&&y.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),A.setupLights();const X=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const be=V.material;if(be)if(Array.isArray(be))for(let De=0;De<be.length;De++){const Ee=be[De];Ic(Ee,$,V),X.add(Ee)}else Ic(be,$,V),X.add(be)}),A=D.pop(),X},this.compileAsync=function(y,O,$=null){const X=this.compile(y,O,$);return new Promise(V=>{function be(){if(X.forEach(function(De){g.get(De).currentProgram.isReady()&&X.delete(De)}),X.size===0){V(y);return}setTimeout(be,10)}re.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let ja=null;function qf(y){ja&&ja(y)}function Uc(){In.stop()}function Nc(){In.start()}const In=new Lf;In.setAnimationLoop(qf),typeof self<"u"&&In.setContext(self),this.setAnimationLoop=function(y){ja=y,xe.setAnimationLoop(y),y===null?In.stop():In.start()},xe.addEventListener("sessionstart",Uc),xe.addEventListener("sessionend",Nc),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;const $=xe.enabled===!0&&xe.isPresenting===!0,X=B!==null&&(q===null||$)&&B.begin(x,q);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(O),O=xe.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,O,q),A=_e.get(y,D.length),A.init(O),D.push(A),R.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ke.setFromProjectionMatrix(R,Bi,O.reversedDepth),Je=this.localClippingEnabled,Pe=ye.init(this.clippingPlanes,Je),M=ce.get(y,C.length),M.init(),C.push(M),xe.enabled===!0&&xe.isPresenting===!0){const De=x.xr.getDepthSensingMesh();De!==null&&Ka(De,O,-1/0,x.sortObjects)}Ka(y,O,0,x.sortObjects),M.finish(),x.sortObjects===!0&&M.sort(gt,ut),W=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,W&&me.addToRenderList(M,y),this.info.render.frame++,Pe===!0&&ye.beginShadows();const V=A.state.shadowsArray;if(Re.render(V,y,O),Pe===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(X&&B.hasRenderPass())===!1){const De=M.opaque,Ee=M.transmissive;if(A.setupLights(),O.isArrayCamera){const Ie=O.cameras;if(Ee.length>0)for(let Ne=0,He=Ie.length;Ne<He;Ne++){const Oe=Ie[Ne];Oc(De,Ee,y,Oe)}W&&me.render(y);for(let Ne=0,He=Ie.length;Ne<He;Ne++){const Oe=Ie[Ne];Fc(M,y,Oe,Oe.viewport)}}else Ee.length>0&&Oc(De,Ee,y,O),W&&me.render(y),Fc(M,y,O)}q!==null&&j===0&&(P.updateMultisampleRenderTarget(q),P.updateRenderTargetMipmap(q)),X&&B.end(x),y.isScene===!0&&y.onAfterRender(x,y,O),Ce.resetDefaultState(),ne=-1,te=null,D.pop(),D.length>0?(A=D[D.length-1],Pe===!0&&ye.setGlobalState(x.clippingPlanes,A.state.camera)):A=null,C.pop(),C.length>0?M=C[C.length-1]:M=null};function Ka(y,O,$,X){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)$=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLight)A.pushLight(y),y.castShadow&&A.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ke.intersectsSprite(y)){X&&H.setFromMatrixPosition(y.matrixWorld).applyMatrix4(R);const De=he.update(y),Ee=y.material;Ee.visible&&M.push(y,De,Ee,$,H.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ke.intersectsObject(y))){const De=he.update(y),Ee=y.material;if(X&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),H.copy(y.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),H.copy(De.boundingSphere.center)),H.applyMatrix4(y.matrixWorld).applyMatrix4(R)),Array.isArray(Ee)){const Ie=De.groups;for(let Ne=0,He=Ie.length;Ne<He;Ne++){const Oe=Ie[Ne],Ke=Ee[Oe.materialIndex];Ke&&Ke.visible&&M.push(y,De,Ke,$,H.z,Oe)}}else Ee.visible&&M.push(y,De,Ee,$,H.z,null)}}const be=y.children;for(let De=0,Ee=be.length;De<Ee;De++)Ka(be[De],O,$,X)}function Fc(y,O,$,X){const{opaque:V,transmissive:be,transparent:De}=y;A.setupLightsView($),Pe===!0&&ye.setGlobalState(x.clippingPlanes,$),X&&se.viewport(Y.copy(X)),V.length>0&&ws(V,O,$),be.length>0&&ws(be,O,$),De.length>0&&ws(De,O,$),se.buffers.depth.setTest(!0),se.buffers.depth.setMask(!0),se.buffers.color.setMask(!0),se.setPolygonOffset(!1)}function Oc(y,O,$,X){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){const Ke=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new Gi(1,1,{generateMipmaps:!0,type:Ke?pn:gi,minFilter:wn,samples:Z.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const be=A.state.transmissionRenderTarget[X.id],De=X.viewport||Y;be.setSize(De.z*x.transmissionResolutionScale,De.w*x.transmissionResolutionScale);const Ee=x.getRenderTarget(),Ie=x.getActiveCubeFace(),Ne=x.getActiveMipmapLevel();x.setRenderTarget(be),x.getClearColor(Me),ge=x.getClearAlpha(),ge<1&&x.setClearColor(16777215,.5),x.clear(),W&&me.render($);const He=x.toneMapping;x.toneMapping=Hi;const Oe=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),Pe===!0&&ye.setGlobalState(x.clippingPlanes,X),ws(y,$,X),P.updateMultisampleRenderTarget(be),P.updateRenderTargetMipmap(be),re.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let lt=0,vt=O.length;lt<vt;lt++){const xt=O[lt],{object:ht,geometry:Be,material:at,group:tt}=xt;if(at.side===rn&&ht.layers.test(X.layers)){const ri=at.side;at.side=Kt,at.needsUpdate=!0,Bc(ht,$,X,Be,at,tt),at.side=ri,at.needsUpdate=!0,Ke=!0}}Ke===!0&&(P.updateMultisampleRenderTarget(be),P.updateRenderTargetMipmap(be))}x.setRenderTarget(Ee,Ie,Ne),x.setClearColor(Me,ge),Oe!==void 0&&(X.viewport=Oe),x.toneMapping=He}function ws(y,O,$){const X=O.isScene===!0?O.overrideMaterial:null;for(let V=0,be=y.length;V<be;V++){const De=y[V],{object:Ee,geometry:Ie,group:Ne}=De;let He=De.material;He.allowOverride===!0&&X!==null&&(He=X),Ee.layers.test($.layers)&&Bc(Ee,O,$,Ie,He,Ne)}}function Bc(y,O,$,X,V,be){y.onBeforeRender(x,O,$,X,V,be),y.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(x,O,$,X,y,be),V.transparent===!0&&V.side===rn&&V.forceSinglePass===!1?(V.side=Kt,V.needsUpdate=!0,x.renderBufferDirect($,O,X,V,y,be),V.side=Dn,V.needsUpdate=!0,x.renderBufferDirect($,O,X,V,y,be),V.side=rn):x.renderBufferDirect($,O,X,V,y,be),y.onAfterRender(x,O,$,X,V,be)}function As(y,O,$){O.isScene!==!0&&(O=Q);const X=g.get(y),V=A.state.lights,be=A.state.shadowsArray,De=V.state.version,Ee=Ae.getParameters(y,V.state,be,O,$),Ie=Ae.getProgramCacheKey(Ee);let Ne=X.programs;X.environment=y.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(y.isMeshStandardMaterial?K:k).get(y.envMap||X.environment),X.envMapRotation=X.environment!==null&&y.envMap===null?O.environmentRotation:y.envMapRotation,Ne===void 0&&(y.addEventListener("dispose",Li),Ne=new Map,X.programs=Ne);let He=Ne.get(Ie);if(He!==void 0){if(X.currentProgram===He&&X.lightsStateVersion===De)return Vc(y,Ee),He}else Ee.uniforms=Ae.getUniforms(y),y.onBeforeCompile(Ee,x),He=Ae.acquireProgram(Ee,Ie),Ne.set(Ie,He),X.uniforms=Ee.uniforms;const Oe=X.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Oe.clippingPlanes=ye.uniform),Vc(y,Ee),X.needsLights=jf(y),X.lightsStateVersion=De,X.needsLights&&(Oe.ambientLightColor.value=V.state.ambient,Oe.lightProbe.value=V.state.probe,Oe.directionalLights.value=V.state.directional,Oe.directionalLightShadows.value=V.state.directionalShadow,Oe.spotLights.value=V.state.spot,Oe.spotLightShadows.value=V.state.spotShadow,Oe.rectAreaLights.value=V.state.rectArea,Oe.ltc_1.value=V.state.rectAreaLTC1,Oe.ltc_2.value=V.state.rectAreaLTC2,Oe.pointLights.value=V.state.point,Oe.pointLightShadows.value=V.state.pointShadow,Oe.hemisphereLights.value=V.state.hemi,Oe.directionalShadowMap.value=V.state.directionalShadowMap,Oe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Oe.spotShadowMap.value=V.state.spotShadowMap,Oe.spotLightMatrix.value=V.state.spotLightMatrix,Oe.spotLightMap.value=V.state.spotLightMap,Oe.pointShadowMap.value=V.state.pointShadowMap,Oe.pointShadowMatrix.value=V.state.pointShadowMatrix),X.currentProgram=He,X.uniformsList=null,He}function zc(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=da.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function Vc(y,O){const $=g.get(y);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function $f(y,O,$,X,V){O.isScene!==!0&&(O=Q),P.resetTextureUnits();const be=O.fog,De=X.isMeshStandardMaterial?O.environment:null,Ee=q===null?x.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Lr,Ie=(X.isMeshStandardMaterial?K:k).get(X.envMap||De),Ne=X.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,He=!!$.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Oe=!!$.morphAttributes.position,Ke=!!$.morphAttributes.normal,lt=!!$.morphAttributes.color;let vt=Hi;X.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(vt=x.toneMapping);const xt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ht=xt!==void 0?xt.length:0,Be=g.get(X),at=A.state.lights;if(Pe===!0&&(Je===!0||y!==te)){const Gt=y===te&&X.id===ne;ye.setState(X,y,Gt)}let tt=!1;X.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==at.state.version||Be.outputColorSpace!==Ee||V.isBatchedMesh&&Be.batching===!1||!V.isBatchedMesh&&Be.batching===!0||V.isBatchedMesh&&Be.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Be.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Be.instancing===!1||!V.isInstancedMesh&&Be.instancing===!0||V.isSkinnedMesh&&Be.skinning===!1||!V.isSkinnedMesh&&Be.skinning===!0||V.isInstancedMesh&&Be.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Be.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Be.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Be.instancingMorph===!1&&V.morphTexture!==null||Be.envMap!==Ie||X.fog===!0&&Be.fog!==be||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==ye.numPlanes||Be.numIntersection!==ye.numIntersection)||Be.vertexAlphas!==Ne||Be.vertexTangents!==He||Be.morphTargets!==Oe||Be.morphNormals!==Ke||Be.morphColors!==lt||Be.toneMapping!==vt||Be.morphTargetsCount!==ht)&&(tt=!0):(tt=!0,Be.__version=X.version);let ri=Be.currentProgram;tt===!0&&(ri=As(X,O,V));let er=!1,si=!1,Fr=!1;const pt=ri.getUniforms(),Zt=Be.uniforms;if(se.useProgram(ri.program)&&(er=!0,si=!0,Fr=!0),X.id!==ne&&(ne=X.id,si=!0),er||te!==y){se.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),pt.setValue(w,"projectionMatrix",y.projectionMatrix),pt.setValue(w,"viewMatrix",y.matrixWorldInverse);const Jt=pt.map.cameraPosition;Jt!==void 0&&Jt.setValue(w,I.setFromMatrixPosition(y.matrixWorld)),Z.logarithmicDepthBuffer&&pt.setValue(w,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&pt.setValue(w,"isOrthographic",y.isOrthographicCamera===!0),te!==y&&(te=y,si=!0,Fr=!0)}if(Be.needsLights&&(at.state.directionalShadowMap.length>0&&pt.setValue(w,"directionalShadowMap",at.state.directionalShadowMap,P),at.state.spotShadowMap.length>0&&pt.setValue(w,"spotShadowMap",at.state.spotShadowMap,P),at.state.pointShadowMap.length>0&&pt.setValue(w,"pointShadowMap",at.state.pointShadowMap,P)),V.isSkinnedMesh){pt.setOptional(w,V,"bindMatrix"),pt.setOptional(w,V,"bindMatrixInverse");const Gt=V.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),pt.setValue(w,"boneTexture",Gt.boneTexture,P))}V.isBatchedMesh&&(pt.setOptional(w,V,"batchingTexture"),pt.setValue(w,"batchingTexture",V._matricesTexture,P),pt.setOptional(w,V,"batchingIdTexture"),pt.setValue(w,"batchingIdTexture",V._indirectTexture,P),pt.setOptional(w,V,"batchingColorTexture"),V._colorsTexture!==null&&pt.setValue(w,"batchingColorTexture",V._colorsTexture,P));const hi=$.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&$e.update(V,$,ri),(si||Be.receiveShadow!==V.receiveShadow)&&(Be.receiveShadow=V.receiveShadow,pt.setValue(w,"receiveShadow",V.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Zt.envMap.value=Ie,Zt.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(Zt.envMapIntensity.value=O.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=QS()),si&&(pt.setValue(w,"toneMappingExposure",x.toneMappingExposure),Be.needsLights&&Yf(Zt,Fr),be&&X.fog===!0&&Ue.refreshFogUniforms(Zt,be),Ue.refreshMaterialUniforms(Zt,X,qe,ze,A.state.transmissionRenderTarget[y.id]),da.upload(w,zc(Be),Zt,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(da.upload(w,zc(Be),Zt,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&pt.setValue(w,"center",V.center),pt.setValue(w,"modelViewMatrix",V.modelViewMatrix),pt.setValue(w,"normalMatrix",V.normalMatrix),pt.setValue(w,"modelMatrix",V.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Gt=X.uniformsGroups;for(let Jt=0,Za=Gt.length;Jt<Za;Jt++){const Un=Gt[Jt];fe.update(Un,ri),fe.bind(Un,ri)}}return ri}function Yf(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function jf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(y,O,$){const X=g.get(y);X.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),g.get(y.texture).__webglTexture=O,g.get(y.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:$,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,O){const $=g.get(y);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0};const Kf=w.createFramebuffer();this.setRenderTarget=function(y,O=0,$=0){q=y,N=O,j=$;let X=null,V=!1,be=!1;if(y){const Ee=g.get(y);if(Ee.__useDefaultFramebuffer!==void 0){se.bindFramebuffer(w.FRAMEBUFFER,Ee.__webglFramebuffer),Y.copy(y.viewport),z.copy(y.scissor),J=y.scissorTest,se.viewport(Y),se.scissor(z),se.setScissorTest(J),ne=-1;return}else if(Ee.__webglFramebuffer===void 0)P.setupRenderTarget(y);else if(Ee.__hasExternalTextures)P.rebindTextures(y,g.get(y.texture).__webglTexture,g.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const He=y.depthTexture;if(Ee.__boundDepthTexture!==He){if(He!==null&&g.has(He)&&(y.width!==He.image.width||y.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(y)}}const Ie=y.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(be=!0);const Ne=g.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ne[O])?X=Ne[O][$]:X=Ne[O],V=!0):y.samples>0&&P.useMultisampledRTT(y)===!1?X=g.get(y).__webglMultisampledFramebuffer:Array.isArray(Ne)?X=Ne[$]:X=Ne,Y.copy(y.viewport),z.copy(y.scissor),J=y.scissorTest}else Y.copy(ie).multiplyScalar(qe).floor(),z.copy(oe).multiplyScalar(qe).floor(),J=Le;if($!==0&&(X=Kf),se.bindFramebuffer(w.FRAMEBUFFER,X)&&se.drawBuffers(y,X),se.viewport(Y),se.scissor(z),se.setScissorTest(J),V){const Ee=g.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ee.__webglTexture,$)}else if(be){const Ee=O;for(let Ie=0;Ie<y.textures.length;Ie++){const Ne=g.get(y.textures[Ie]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Ie,Ne.__webglTexture,$,Ee)}}else if(y!==null&&$!==0){const Ee=g.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ee.__webglTexture,$)}ne=-1},this.readRenderTargetPixels=function(y,O,$,X,V,be,De,Ee=0){if(!(y&&y.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=g.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&De!==void 0&&(Ie=Ie[De]),Ie){se.bindFramebuffer(w.FRAMEBUFFER,Ie);try{const Ne=y.textures[Ee],He=Ne.format,Oe=Ne.type;if(!Z.textureFormatReadable(He)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Z.textureTypeReadable(Oe)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-X&&$>=0&&$<=y.height-V&&(y.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ee),w.readPixels(O,$,X,V,pe.convert(He),pe.convert(Oe),be))}finally{const Ne=q!==null?g.get(q).__webglFramebuffer:null;se.bindFramebuffer(w.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(y,O,$,X,V,be,De,Ee=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=g.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&De!==void 0&&(Ie=Ie[De]),Ie)if(O>=0&&O<=y.width-X&&$>=0&&$<=y.height-V){se.bindFramebuffer(w.FRAMEBUFFER,Ie);const Ne=y.textures[Ee],He=Ne.format,Oe=Ne.type;if(!Z.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Z.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Ke),w.bufferData(w.PIXEL_PACK_BUFFER,be.byteLength,w.STREAM_READ),y.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ee),w.readPixels(O,$,X,V,pe.convert(He),pe.convert(Oe),0);const lt=q!==null?g.get(q).__webglFramebuffer:null;se.bindFramebuffer(w.FRAMEBUFFER,lt);const vt=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await i_(w,vt,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Ke),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,be),w.deleteBuffer(Ke),w.deleteSync(vt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,O=null,$=0){const X=Math.pow(2,-$),V=Math.floor(y.image.width*X),be=Math.floor(y.image.height*X),De=O!==null?O.x:0,Ee=O!==null?O.y:0;P.setTexture2D(y,0),w.copyTexSubImage2D(w.TEXTURE_2D,$,0,0,De,Ee,V,be),se.unbindTexture()};const Zf=w.createFramebuffer(),Jf=w.createFramebuffer();this.copyTextureToTexture=function(y,O,$=null,X=null,V=0,be=null){be===null&&(V!==0?(ms("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),be=V,V=0):be=0);let De,Ee,Ie,Ne,He,Oe,Ke,lt,vt;const xt=y.isCompressedTexture?y.mipmaps[be]:y.image;if($!==null)De=$.max.x-$.min.x,Ee=$.max.y-$.min.y,Ie=$.isBox3?$.max.z-$.min.z:1,Ne=$.min.x,He=$.min.y,Oe=$.isBox3?$.min.z:0;else{const hi=Math.pow(2,-V);De=Math.floor(xt.width*hi),Ee=Math.floor(xt.height*hi),y.isDataArrayTexture?Ie=xt.depth:y.isData3DTexture?Ie=Math.floor(xt.depth*hi):Ie=1,Ne=0,He=0,Oe=0}X!==null?(Ke=X.x,lt=X.y,vt=X.z):(Ke=0,lt=0,vt=0);const ht=pe.convert(O.format),Be=pe.convert(O.type);let at;O.isData3DTexture?(P.setTexture3D(O,0),at=w.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(P.setTexture2DArray(O,0),at=w.TEXTURE_2D_ARRAY):(P.setTexture2D(O,0),at=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,O.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,O.unpackAlignment);const tt=w.getParameter(w.UNPACK_ROW_LENGTH),ri=w.getParameter(w.UNPACK_IMAGE_HEIGHT),er=w.getParameter(w.UNPACK_SKIP_PIXELS),si=w.getParameter(w.UNPACK_SKIP_ROWS),Fr=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,xt.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,xt.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ne),w.pixelStorei(w.UNPACK_SKIP_ROWS,He),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Oe);const pt=y.isDataArrayTexture||y.isData3DTexture,Zt=O.isDataArrayTexture||O.isData3DTexture;if(y.isDepthTexture){const hi=g.get(y),Gt=g.get(O),Jt=g.get(hi.__renderTarget),Za=g.get(Gt.__renderTarget);se.bindFramebuffer(w.READ_FRAMEBUFFER,Jt.__webglFramebuffer),se.bindFramebuffer(w.DRAW_FRAMEBUFFER,Za.__webglFramebuffer);for(let Un=0;Un<Ie;Un++)pt&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,g.get(y).__webglTexture,V,Oe+Un),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,g.get(O).__webglTexture,be,vt+Un)),w.blitFramebuffer(Ne,He,De,Ee,Ke,lt,De,Ee,w.DEPTH_BUFFER_BIT,w.NEAREST);se.bindFramebuffer(w.READ_FRAMEBUFFER,null),se.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||g.has(y)){const hi=g.get(y),Gt=g.get(O);se.bindFramebuffer(w.READ_FRAMEBUFFER,Zf),se.bindFramebuffer(w.DRAW_FRAMEBUFFER,Jf);for(let Jt=0;Jt<Ie;Jt++)pt?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,hi.__webglTexture,V,Oe+Jt):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,hi.__webglTexture,V),Zt?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Gt.__webglTexture,be,vt+Jt):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Gt.__webglTexture,be),V!==0?w.blitFramebuffer(Ne,He,De,Ee,Ke,lt,De,Ee,w.COLOR_BUFFER_BIT,w.NEAREST):Zt?w.copyTexSubImage3D(at,be,Ke,lt,vt+Jt,Ne,He,De,Ee):w.copyTexSubImage2D(at,be,Ke,lt,Ne,He,De,Ee);se.bindFramebuffer(w.READ_FRAMEBUFFER,null),se.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Zt?y.isDataTexture||y.isData3DTexture?w.texSubImage3D(at,be,Ke,lt,vt,De,Ee,Ie,ht,Be,xt.data):O.isCompressedArrayTexture?w.compressedTexSubImage3D(at,be,Ke,lt,vt,De,Ee,Ie,ht,xt.data):w.texSubImage3D(at,be,Ke,lt,vt,De,Ee,Ie,ht,Be,xt):y.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,be,Ke,lt,De,Ee,ht,Be,xt.data):y.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,be,Ke,lt,xt.width,xt.height,ht,xt.data):w.texSubImage2D(w.TEXTURE_2D,be,Ke,lt,De,Ee,ht,Be,xt);w.pixelStorei(w.UNPACK_ROW_LENGTH,tt),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ri),w.pixelStorei(w.UNPACK_SKIP_PIXELS,er),w.pixelStorei(w.UNPACK_SKIP_ROWS,si),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Fr),be===0&&O.generateMipmaps&&w.generateMipmap(at),se.unbindTexture()},this.initRenderTarget=function(y){g.get(y).__webglFramebuffer===void 0&&P.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?P.setTextureCube(y,0):y.isData3DTexture?P.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?P.setTexture2DArray(y,0):P.setTexture2D(y,0),se.unbindTexture()},this.resetState=function(){N=0,j=0,q=null,se.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}var ty=Object.defineProperty,iy=(i,e,t)=>e in i?ty(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,L=(i,e,t)=>iy(i,typeof e!="symbol"?e+"":e,t);const Zl=class{constructor(e,t){if(L(this,"equatorialRadius"),L(this,"polarRadius"),L(this,"eccentricitySquared"),e<=0||t<=0)throw new Error("Ellipsoid radii must be positive.");this.equatorialRadius=e,this.polarRadius=t,this.eccentricitySquared=1-t*t/(e*e)}cartographicToCartesian(e,t=new U){const n=ue.degToRad(e.longitude),r=ue.degToRad(e.latitude),s=e.height??0,a=Math.sin(r),o=Math.cos(r),l=this.equatorialRadius/Math.sqrt(1-this.eccentricitySquared*a*a);return t.set((l+s)*o*Math.sin(n),(l*(1-this.eccentricitySquared)+s)*a,(l+s)*o*Math.cos(n))}};L(Zl,"WGS84",new Zl(6378137,6356752314245179e-9));let Ya=Zl;const Rn=85.0511287798066;class Nf{constructor(e=Ya.WGS84){L(this,"ellipsoid"),this.ellipsoid=e}geodeticToWorld(e,t=new U){return this.ellipsoid.cartographicToCartesian(e,t)}worldToGeodetic(e){const t=e.z,n=e.x,r=e.y,s=this.ellipsoid.equatorialRadius,a=this.ellipsoid.polarRadius,o=this.ellipsoid.eccentricitySquared,l=(s*s-a*a)/(a*a),c=Math.hypot(t,n);if(c<1e-9)return{longitude:0,latitude:r>=0?90:-90,height:Math.abs(r)-a};const u=Math.atan2(r*s,c*a),h=Math.sin(u),d=Math.cos(u),f=Math.atan2(r+l*a*h**3,c-o*s*d**3),_=Math.atan2(n,t),v=Math.sin(f),m=s/Math.sqrt(1-o*v*v),p=c/Math.cos(f)-m;return{longitude:ue.radToDeg(_),latitude:ue.radToDeg(f),height:p}}geodeticToWebMercator(e,t){const n=ue.clamp(t,-Rn,Rn);return{x:this.ellipsoid.equatorialRadius*ue.degToRad(e),y:this.ellipsoid.equatorialRadius*Math.asinh(Math.tan(ue.degToRad(n)))}}webMercatorToGeodetic(e,t){const n=this.ellipsoid.equatorialRadius;return{longitude:ue.radToDeg(e/n),latitude:ue.radToDeg(Math.atan(Math.sinh(t/n)))}}geodeticToTile(e,t,n){const r=2**Math.max(0,Math.round(n)),s=ue.clamp(t,-Rn,Rn);return{x:(e+180)/360*r,y:(1-Math.asinh(Math.tan(ue.degToRad(s)))/Math.PI)*.5*r,level:Math.max(0,Math.round(n))}}eastNorthUpFrame(e,t=new _t){const n=ue.degToRad(e.longitude),r=ue.degToRad(e.latitude),s=Math.sin(n),a=Math.cos(n),o=Math.sin(r),l=Math.cos(r),c=new U(a,0,-s),u=new U(-o*s,l,-o*a),h=new U(l*s,o,l*a);return t.makeBasis(c,u,h),t.setPosition(this.geodeticToWorld(e)),t}}class ny{constructor(){L(this,"id","geographic"),L(this,"levelZeroTilesX",2),L(this,"levelZeroTilesY",1)}rootTiles(){return[{level:0,x:0,y:0},{level:0,x:1,y:0}]}children(e){return Ff(e)}rectangle(e){const t=this.levelZeroTilesX*2**e.level,n=this.levelZeroTilesY*2**e.level,r=360/t,s=180/n;return{west:-180+e.x*r,east:-180+(e.x+1)*r,north:90-e.y*s,south:90-(e.y+1)*s}}}function Ff(i){const e=i.level+1,t=i.x*2,n=i.y*2;return[{level:e,x:t,y:n},{level:e,x:t+1,y:n},{level:e,x:t,y:n+1},{level:e,x:t+1,y:n+1}]}function Pt(i){return`${i.level}/${i.x}/${i.y}`}class ry{constructor(){L(this,"id","web-mercator"),L(this,"levelZeroTilesX",1),L(this,"levelZeroTilesY",1)}rootTiles(){return[{level:0,x:0,y:0}]}children(e){return Ff(e)}rectangle(e){const t=2**e.level;return{west:e.x/t*360-180,east:(e.x+1)/t*360-180,north:Mh(e.y,t),south:Mh(e.y+1,t)}}}function Mh(i,e){const t=Math.PI*(1-2*i/e),n=Math.atan(Math.sinh(t))*180/Math.PI;return Math.max(-Rn,Math.min(Rn,n))}const _n=-1.7;class sy{constructor(e){if(L(this,"id"),L(this,"minLevel"),L(this,"maxLevel"),L(this,"levelOffset"),L(this,"estimatedTextureBytes"),L(this,"attribution"),L(this,"urlTemplate"),L(this,"subdomains"),L(this,"_viewLevelOffset"),L(this,"viewSourceLevel"),L(this,"_revision",0),!e.urlTemplate.includes("{z}")||!e.urlTemplate.includes("{x}")||!e.urlTemplate.includes("{y}"))throw new Error("Raster tile URL must include {z}, {x}, and {y}.");this.id=e.id??"raster",this.minLevel=Math.max(0,Math.round(e.minLevel??0)),this.maxLevel=Math.max(this.minLevel,Math.round(e.maxLevel??19)),this.levelOffset=Math.min(0,Math.round(e.levelOffset??0));const t=Math.max(1,Math.round(e.tileSize??256));this.estimatedTextureBytes=Math.ceil(t*t*4*4/3),this.attribution=e.attribution,this.urlTemplate=e.urlTemplate,this.subdomains=e.subdomains??[],this._viewLevelOffset=Sh(e.viewLevelOffset===void 0?_n:e.viewLevelOffset),this.viewSourceLevel=this.maxLevel}get revision(){return this._revision}get currentSourceLevel(){return this.viewSourceLevel}get viewLevelOffset(){return this._viewLevelOffset}setViewLevel(e){const t=this._viewLevelOffset===null?this.maxLevel:ay(oy(e+this._viewLevelOffset),this.minLevel,this.maxLevel);t!==this.viewSourceLevel&&(this.viewSourceLevel=t,this._revision+=1)}setViewLevelOffset(e){const t=Sh(e);t!==this._viewLevelOffset&&(this._viewLevelOffset=t,this.viewSourceLevel=Number.NaN)}maximumSourceLevel(e){return Math.min(e,this.viewSourceLevel,this.maxLevel)}url(e){const t=this.subdomains.length>0?this.subdomains[(e.x+e.y)%this.subdomains.length]??"":"";return this.urlTemplate.split("{z}").join(String(e.level)).split("{x}").join(String(e.x)).split("{y}").join(String(e.y)).split("{s}").join(t)}}function Sh(i){return i==null||!Number.isFinite(i)?null:Math.max(-8,Math.min(2,i))}function ay(i,e,t){return Math.max(e,Math.min(t,i))}function oy(i){return Math.floor(i+1e-9)}class ly{constructor(e=[]){L(this,"layers",[]),L(this,"listeners",new Set),L(this,"_revision",0);for(const t of e)this.add(t,!1);this.normalizeOrder()}get revision(){return this._revision}get length(){return this.layers.length}[Symbol.iterator](){return this.values()[Symbol.iterator]()}values(){return[...this.layers]}get(e){return this.layers.find(t=>t.id===e)}add(e,t=!0){if(this.get(e.id))throw new Error(`Layer already exists: ${e.id}`);const n=yh(e,this.layers.length);return n.visible&&this.hideExclusivePeers(n),this.layers.push(n),this.sortLayers(),t&&this.emit("add",n.id),n}remove(e){const t=this.layers.findIndex(n=>n.id===e);return t<0?!1:(this.layers.splice(t,1),this.normalizeOrder(),this.emit("remove",e),!0)}update(e,t){const n=this.layers.findIndex(a=>a.id===e),r=this.layers[n];if(!r||n<0)throw new Error(`Unknown layer: ${e}`);const s=yh({...r,...t},r.order);return s.visible&&this.hideExclusivePeers(s),this.layers[n]=s,this.sortLayers(),this.emit(t.order===void 0?"update":"reorder",e),s}setVisible(e,t){return this.update(e,{visible:t})}setOpacity(e,t){return this.update(e,{opacity:t})}setLevelOffset(e,t){return this.update(e,{levelOffset:t})}move(e,t){return this.update(e,{order:t})}replace(e){this.layers=[];for(const t of e)this.add(t,!1);this.normalizeOrder(),this.emit("reset")}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}toJSON(){return this.values()}hideExclusivePeers(e){e.exclusiveGroup&&(this.layers=this.layers.map(t=>t.id!==e.id&&t.exclusiveGroup===e.exclusiveGroup&&t.visible?{...t,visible:!1}:t))}sortLayers(){this.layers.sort((e,t)=>e.order-t.order||e.id.localeCompare(t.id))}normalizeOrder(){this.sortLayers(),this.layers=this.layers.map((e,t)=>({...e,order:t}))}emit(e,t){this._revision+=1;const n={type:e,layerId:t,revision:this._revision};for(const r of this.listeners)r(n)}}function yh(i,e){if(!i.id.trim())throw new Error("Layer id is required.");if(!i.sourceId.trim())throw new Error(`Layer sourceId is required: ${i.id}`);return{...i,visible:i.visible??!1,opacity:Of(i.opacity??1,0,1),order:Math.max(0,Math.round(i.order??e)),levelOffset:cy(i.levelOffset??_n),annotationLayerIds:i.annotationLayerIds?[...i.annotationLayerIds]:void 0}}function cy(i){return Number.isFinite(i)?Of(i,-8,2):_n}function Of(i,e,t){return Math.max(e,Math.min(t,i))}function an(i,e){this.x=i,this.y=e}an.prototype={clone(){return new an(this.x,this.y)},add(i){return this.clone()._add(i)},sub(i){return this.clone()._sub(i)},multByPoint(i){return this.clone()._multByPoint(i)},divByPoint(i){return this.clone()._divByPoint(i)},mult(i){return this.clone()._mult(i)},div(i){return this.clone()._div(i)},rotate(i){return this.clone()._rotate(i)},rotateAround(i,e){return this.clone()._rotateAround(i,e)},matMult(i){return this.clone()._matMult(i)},unit(){return this.clone()._unit()},perp(){return this.clone()._perp()},round(){return this.clone()._round()},mag(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals(i){return this.x===i.x&&this.y===i.y},dist(i){return Math.sqrt(this.distSqr(i))},distSqr(i){const e=i.x-this.x,t=i.y-this.y;return e*e+t*t},angle(){return Math.atan2(this.y,this.x)},angleTo(i){return Math.atan2(this.y-i.y,this.x-i.x)},angleWith(i){return this.angleWithSep(i.x,i.y)},angleWithSep(i,e){return Math.atan2(this.x*e-this.y*i,this.x*i+this.y*e)},_matMult(i){const e=i[0]*this.x+i[1]*this.y,t=i[2]*this.x+i[3]*this.y;return this.x=e,this.y=t,this},_add(i){return this.x+=i.x,this.y+=i.y,this},_sub(i){return this.x-=i.x,this.y-=i.y,this},_mult(i){return this.x*=i,this.y*=i,this},_div(i){return this.x/=i,this.y/=i,this},_multByPoint(i){return this.x*=i.x,this.y*=i.y,this},_divByPoint(i){return this.x/=i.x,this.y/=i.y,this},_unit(){return this._div(this.mag()),this},_perp(){const i=this.y;return this.y=this.x,this.x=-i,this},_rotate(i){const e=Math.cos(i),t=Math.sin(i),n=e*this.x-t*this.y,r=t*this.x+e*this.y;return this.x=n,this.y=r,this},_rotateAround(i,e){const t=Math.cos(i),n=Math.sin(i),r=e.x+t*(this.x-e.x)-n*(this.y-e.y),s=e.y+n*(this.x-e.x)+t*(this.y-e.y);return this.x=r,this.y=s,this},_round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},constructor:an};an.convert=function(i){if(i instanceof an)return i;if(Array.isArray(i))return new an(+i[0],+i[1]);if(i.x!==void 0&&i.y!==void 0)return new an(+i.x,+i.y);throw new Error("Expected [x, y] or {x, y} point format")};class Bf{constructor(e,t,n,r,s){for(this.properties=Object.create(null),this.extent=n,this.type=0,this.id=void 0,this._pbf=e,this._geometry=-1,this._keys=r,this._values=s;e.pos<t;){const a=e.readVarint();if(a===8)this.id=e.readVarint();else if(a===18){const o=e.readVarint()+e.pos;for(;e.pos<o;){const l=r[e.readVarint()],c=s[e.readVarint()];this.properties[l]=c}}else a===24?this.type=e.readVarint():(a===34&&(this._geometry=e.pos),e.skip(a))}}loadGeometry(){if(this._geometry<0)throw new Error("feature has no geometry");const e=this._pbf;e.pos=this._geometry;const t=e.readVarint()+e.pos,n=[];let r,s=1,a=0,o=0,l=0;for(;e.pos<t;){if(a<=0){const c=e.readVarint();if(s=c&7,a=c>>3,a===0)continue}if(a--,s===1)o+=e.readSVarint(),l+=e.readSVarint(),r&&n.push(r),r=[new an(o,l)];else if(s===2)o+=e.readSVarint(),l+=e.readSVarint(),r&&r.push(new an(o,l));else if(s===7)r&&r.push(r[0].clone());else throw new Error(`unknown command ${s}`)}return r&&n.push(r),n}bbox(){if(this._geometry<0)throw new Error("feature has no geometry");const e=this._pbf;e.pos=this._geometry;const t=e.readVarint()+e.pos;let n=1,r=0,s=0,a=0,o=1/0,l=-1/0,c=1/0,u=-1/0;for(;e.pos<t;){if(r<=0){const h=e.readVarint();if(n=h&7,r=h>>3,r===0)continue}if(r--,n===1||n===2)s+=e.readSVarint(),a+=e.readSVarint(),s<o&&(o=s),s>l&&(l=s),a<c&&(c=a),a>u&&(u=a);else if(n!==7)throw new Error(`unknown command ${n}`)}return[o,c,l,u]}toGeoJSON(e,t,n){const r=this.extent*Math.pow(2,n),s=this.extent*e,a=this.extent*t,o=this.loadGeometry();function l(d){return[(d.x+s)*360/r-180,360/Math.PI*Math.atan(Math.exp((1-(d.y+a)*2/r)*Math.PI))-90]}function c(d){return d.map(l)}let u;if(this.type===1){const d=[];for(const _ of o)d.push(_[0]);const f=c(d);u=d.length===1?{type:"Point",coordinates:f[0]}:{type:"MultiPoint",coordinates:f}}else if(this.type===2){const d=o.map(c);u=d.length===1?{type:"LineString",coordinates:d[0]}:{type:"MultiLineString",coordinates:d}}else if(this.type===3){const d=uy(o),f=[];for(const _ of d)f.push(_.map(c));u=f.length===1?{type:"Polygon",coordinates:f[0]}:{type:"MultiPolygon",coordinates:f}}else throw new Error("unknown feature type");const h={type:"Feature",geometry:u,properties:this.properties};return this.id!=null&&(h.id=this.id),h}}Bf.types=["Unknown","Point","LineString","Polygon"];function uy(i){const e=i.length;if(e<=1)return[i];const t=[];let n,r;for(let s=0;s<e;s++){const a=hy(i[s]);a!==0&&(r===void 0&&(r=a<0),r===a<0?(n&&t.push(n),n=[i[s]]):n&&n.push(i[s]))}return n&&t.push(n),t}function hy(i){let e=0;for(let t=0,n=i.length,r=n-1,s,a;t<n;r=t++)s=i[t],a=i[r],e+=(a.x-s.x)*(s.y+a.y);return e}class dy{constructor(e,t){for(this.version=1,this.name="",this.extent=4096,this.length=0,this._pbf=e,this._keys=[],this._values=[],this._features=[],t===void 0&&(t=e.length);e.pos<t;){const n=e.readVarint();n===10?this.name=e.readString():n===18?(this._features.push(e.pos),e.skip(n)):n===26?this._keys.push(e.readString()):n===34?this._values.push(fy(e)):n===40?this.extent=e.readVarint():n===120?this.version=e.readVarint():e.skip(n)}this.length=this._features.length}feature(e){if(e<0||e>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[e];const t=this._pbf.readVarint()+this._pbf.pos;return new Bf(this._pbf,t,this.extent,this._keys,this._values)}}function fy(i){let e=null;const t=i.readVarint()+i.pos;for(;i.pos<t;){const n=i.readVarint();e=n===10?i.readString():n===21?i.readFloat():n===25?i.readDouble():n===32?i.readVarint(!0):n===40?i.readVarint():n===48?i.readSVarint():n===56?i.readBoolean():(i.skip(n),null)}if(e==null)throw new Error("unknown feature value");return e}class py{constructor(e,t=e.length){const n=Object.create(null);for(;e.pos<t;){const r=e.readVarint();if(r===26){const s=new dy(e,e.readVarint()+e.pos);s.length&&(n[s.name]=s)}else e.skip(r)}this.layers=n}}const bh=65536*65536,my=12,Th=typeof TextDecoder>"u"?null:new TextDecoder("utf-8"),gy=0,_y=1,Eh=2,vy=5;class xy{constructor(e){this.buf=ArrayBuffer.isView(e)?e:new Uint8Array(e),this.dataView=new DataView(this.buf.buffer,this.buf.byteOffset,this.buf.byteLength),this.pos=0,this.type=0,this._valueStart=-1,this.length=this.buf.length}readFields(e,t,n=this.length){let r;for(;r=this.nextField(n);)e(r,t,this);return t}readMessage(e,t){return this.readFields(e,t,this.readVarint()+this.pos)}readFixed32(){const e=this.dataView.getUint32(this.pos,!0);return this.pos+=4,e}readSFixed32(){const e=this.dataView.getInt32(this.pos,!0);return this.pos+=4,e}readFixed64(){const e=this.dataView.getUint32(this.pos,!0)+this.dataView.getUint32(this.pos+4,!0)*bh;return this.pos+=8,e}readSFixed64(){const e=this.dataView.getUint32(this.pos,!0)+this.dataView.getInt32(this.pos+4,!0)*bh;return this.pos+=8,e}readFloat(){const e=this.dataView.getFloat32(this.pos,!0);return this.pos+=4,e}readDouble(){const e=this.dataView.getFloat64(this.pos,!0);return this.pos+=8,e}readVarint(e){const t=this.buf,n=t[this.pos++];if(n<128)return n;let r=n&127,s;return s=t[this.pos++],r|=(s&127)<<7,s<128||(s=t[this.pos++],r|=(s&127)<<14,s<128)||(s=t[this.pos++],r|=(s&127)<<21,s<128)?r:(s=t[this.pos],r|=(s&15)<<28,My(r,e,this))}readSVarint(){const e=this.readVarint();return e%2===1?(e+1)/-2:e/2}readBoolean(){return!!this.readVarint()}readString(){const e=this.readVarint()+this.pos,t=this.pos;return this.pos=e,e-t>=my&&Th?Th.decode(this.buf.subarray(t,e)):yy(this.buf,t,e)}readBytes(){const e=this.readVarint()+this.pos,t=this.buf.subarray(this.pos,e);return this.pos=e,t}readPackedVarint(e=[],t){const n=this.readPackedEnd();for(;this.pos<n;)e.push(this.readVarint(t));return e}readPackedSVarint(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readSVarint());return e}readPackedBoolean(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readBoolean());return e}readPackedFloat(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readFloat());return e}readPackedDouble(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readDouble());return e}readPackedFixed32(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readFixed32());return e}readPackedSFixed32(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readSFixed32());return e}readPackedFixed64(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readFixed64());return e}readPackedSFixed64(e=[]){const t=this.readPackedEnd();for(;this.pos<t;)e.push(this.readSFixed64());return e}readPackedEnd(){return this.type===Eh?this.readVarint()+this.pos:this.pos+1}nextField(e=this.length){if(this.pos===this._valueStart&&this.skip(this.type),this.pos>=e)return 0;const t=this.readVarint();return this.type=t&7,this._valueStart=this.pos,t>>>3}skip(e){const t=e&7;if(t===gy)for(;this.buf[this.pos++]>127;);else if(t===Eh)this.pos=this.readVarint()+this.pos;else if(t===vy)this.pos+=4;else if(t===_y)this.pos+=8;else throw new Error(`Unimplemented type: ${t}`)}}function My(i,e,t){const n=t.buf;let r,s;if(s=n[t.pos++],r=(s&112)>>4,s<128||(s=n[t.pos++],r|=(s&127)<<3,s<128)||(s=n[t.pos++],r|=(s&127)<<10,s<128)||(s=n[t.pos++],r|=(s&127)<<17,s<128)||(s=n[t.pos++],r|=(s&127)<<24,s<128)||(s=n[t.pos++],r|=(s&1)<<31,s<128))return Sy(i,r,e);throw new Error("Expected varint not more than 10 bytes")}function Sy(i,e,t){return t?e*4294967296+(i>>>0):(e>>>0)*4294967296+(i>>>0)}function yy(i,e,t){let n="",r=e;for(;r<t;){const s=i[r];let a=null,o=s>239?4:s>223?3:s>191?2:1;if(r+o>t)break;let l,c,u;o===1?s<128&&(a=s):o===2?(l=i[r+1],(l&192)===128&&(a=(s&31)<<6|l&63,a<=127&&(a=null))):o===3?(l=i[r+1],c=i[r+2],(l&192)===128&&(c&192)===128&&(a=(s&15)<<12|(l&63)<<6|c&63,(a<=2047||a>=55296&&a<=57343)&&(a=null))):o===4&&(l=i[r+1],c=i[r+2],u=i[r+3],(l&192)===128&&(c&192)===128&&(u&192)===128&&(a=(s&15)<<18|(l&63)<<12|(c&63)<<6|u&63,(a<=65535||a>=1114112)&&(a=null))),a===null?(a=65533,o=1):a>65535&&(a-=65536,n+=String.fromCharCode(a>>>10&1023|55296),a=56320|a&1023),n+=String.fromCharCode(a),r+=o}return n}class by{decode(e,t){const n=new py(new xy(e)),r=new Map;for(const[s,a]of Object.entries(n.layers)){if(t&&!t.has(s))continue;const o=[];for(let l=0;l<a.length;l+=1){const c=a.feature(l);o.push({type:c.type,properties:c.properties,geometry:c.loadGeometry(),extent:c.extent})}r.set(s,o)}return r}}class Ty{constructor(e={}){L(this,"tileSize"),L(this,"showCountryLabels"),this.tileSize=Math.max(256,Math.round(e.tileSize??512)),this.showCountryLabels=e.showCountryLabels??!1}rasterize(e,t,n,r){const s=document.createElement("canvas");s.width=this.tileSize,s.height=this.tileSize;const a=s.getContext("2d");if(!a)throw new Error("当前浏览器不支持 Canvas 2D。");return this.renderStyle(a,e,t,n,r),s}renderStyle(e,t,n,r,s){var a,o;const l=[],c=[],u=this.tileSize/256;e.clearRect(0,0,this.tileSize,this.tileSize),e.lineJoin="round",e.lineCap="round";for(const h of t.layers){if(!Cy(h,s,this.showCountryLabels))continue;if(h.type==="background"){e.globalAlpha=mi(Dt((a=h.paint)==null?void 0:a["background-opacity"],s),1),e.fillStyle=Dr(Dt((o=h.paint)==null?void 0:o["background-color"],s),"#dcebf3"),e.fillRect(0,0,this.tileSize,this.tileSize);continue}if(h.source&&h.source!==n)continue;const d=h["source-layer"];if(!d)continue;const f=r.get(d);if(f)for(const _ of f)fa(h.filter,_.properties)&&(h.type==="fill"?Ey(e,_,h,s,this.tileSize):h.type==="line"?wy(e,_,h,s,this.tileSize,u):h.type==="symbol"&&c.push({feature:_,layer:h,order:c.length}))}c.sort((h,d)=>wh(d.layer,d.feature,s)-wh(h.layer,h.feature,s)||d.order-h.order);for(const h of c)Ay(e,h.feature,h.layer,s,this.tileSize,u,l);e.globalAlpha=1,e.setLineDash([])}}function wh(i,e,t){var n;const r=i["source-layer"]??"";let s=0;r==="Admin0 point"?s=1e4:r==="Disputed label point"?s=9e3:r.startsWith("Admin1")?s=8e3:r==="City small scale"?s=7e3:r.includes("Ocean")?s=6e3:r.includes("Water")&&(s=5e3);const a=mi(Dt((n=i.layout)==null?void 0:n["text-size"],t,e.properties),10);return s+a*10}function Ey(i,e,t,n,r){var s,a,o;if(e.type!==3)return;const l=Dt((s=t.paint)==null?void 0:s["fill-color"],n,e.properties),c=Dt((a=t.paint)==null?void 0:a["fill-outline-color"],n,e.properties),u=mi(Dt((o=t.paint)==null?void 0:o["fill-opacity"],n,e.properties),1);i.beginPath(),zf(i,e,r,!0),i.globalAlpha=u,i.fillStyle=Dr(l,"#d8e2d0"),i.fill("evenodd"),c!==void 0&&(i.strokeStyle=Dr(c,i.fillStyle),i.lineWidth=1,i.stroke())}function wy(i,e,t,n,r,s){var a,o,l,c,u,h;if(e.type!==2&&e.type!==3)return;i.beginPath(),zf(i,e,r,!1),i.globalAlpha=mi(Dt((a=t.paint)==null?void 0:a["line-opacity"],n,e.properties),1),i.strokeStyle=Dr(Dt((o=t.paint)==null?void 0:o["line-color"],n,e.properties),"#82939b"),i.lineWidth=Math.max(.35,mi(Dt((l=t.paint)==null?void 0:l["line-width"],n,e.properties),1)*s),i.lineJoin=Ah((c=t.layout)==null?void 0:c["line-join"],"round"),i.lineCap=Ah((u=t.layout)==null?void 0:u["line-cap"],"round");const d=Dt((h=t.paint)==null?void 0:h["line-dasharray"],n,e.properties);i.setLineDash(Array.isArray(d)?d.map(f=>mi(f,0)*i.lineWidth):[]),i.stroke(),i.setLineDash([])}function Ay(i,e,t,n,r,s,a){var o,l,c,u,h,d,f,_;const v=Ly((o=t.layout)==null?void 0:o["text-field"],n,e.properties);if(!v)return;const m=Ry(e,r);if(!m)return;const p=Math.max(8,mi(Dt((l=t.layout)==null?void 0:l["text-size"],n,e.properties),10)*s),b=Dt((c=t.layout)==null?void 0:c["text-offset"],n,e.properties);Array.isArray(b)&&(m.x+=mi(b[0],0)*p,m.y+=mi(b[1],0)*p),i.font=`${p}px "Microsoft YaHei", "Noto Sans CJK SC", sans-serif`,i.textAlign="center",i.textBaseline="middle";const T=Math.max(2*s,mi(Dt((u=t.layout)==null?void 0:u["text-padding"],n,e.properties),2)*s),M=i.measureText(v).width+T*2,A=p*1.25+T*2,C=[m.x-M*.5,m.y-A*.5,m.x+M*.5,m.y+A*.5],D=4*s;if(C[0]<D||C[1]<D||C[2]>r-D||C[3]>r-D||a.some(x=>Dy(C,x)))return;a.push(C),i.globalAlpha=mi(Dt((h=t.paint)==null?void 0:h["text-opacity"],n,e.properties),1);const B=mi(Dt((d=t.paint)==null?void 0:d["text-halo-width"],n,e.properties),0)*s;B>0&&(i.strokeStyle=Dr(Dt((f=t.paint)==null?void 0:f["text-halo-color"],n,e.properties),"#ffffff"),i.lineWidth=B*2,i.strokeText(v,m.x,m.y)),i.fillStyle=Dr(Dt((_=t.paint)==null?void 0:_["text-color"],n,e.properties),"#34495a"),i.fillText(v,m.x,m.y)}function zf(i,e,t,n){const r=t/e.extent;for(const s of e.geometry){const a=s[0];if(a){i.moveTo(a.x*r,a.y*r);for(let o=1;o<s.length;o+=1){const l=s[o];l&&i.lineTo(l.x*r,l.y*r)}n&&i.closePath()}}}function Ry(i,e){const t=i.geometry[0];if(!t||t.length===0)return null;const n=t[Math.floor(t.length*.5)];if(!n)return null;const r=e/i.extent;return{x:n.x*r,y:n.y*r}}function Cy(i,e,t){var n;const r=t&&i.type==="symbol"&&i["source-layer"]==="Admin0 point";return(((n=i.layout)==null?void 0:n.visibility)!=="none"||r)&&(i.minzoom===void 0||e>=i.minzoom)&&(i.maxzoom===void 0||e<i.maxzoom)}function fa(i,e){if(!i||i.length===0)return!0;const[t,...n]=i;if(t==="all")return n.every(a=>Array.isArray(a)&&fa(a,e));if(t==="any")return n.some(a=>Array.isArray(a)&&fa(a,e));if(t==="none")return!n.some(a=>Array.isArray(a)&&fa(a,e));const r=String(n[0]??""),s=e[r];return t==="has"?r in e:t==="!has"?!(r in e):t==="=="?s===n[1]:t==="!="?s!==n[1]:t==="in"?n.slice(1).includes(s):t==="!in"?!n.slice(1).includes(s):t===">"?Number(s)>Number(n[1]):t===">="?Number(s)>=Number(n[1]):t==="<"?Number(s)<Number(n[1]):t==="<="?Number(s)<=Number(n[1]):!0}function Dt(i,e,t={}){var n;if(Array.isArray(i))return pa(i,e,t);if(!i||typeof i!="object")return i;const r=i;if(!r.stops||r.stops.length===0)return r.default;const s=r.property?t[r.property]:e;if(typeof s!="number")return((n=r.stops.find(([o])=>o===s))==null?void 0:n[1])??r.default;const a=r.stops.filter(o=>typeof o[0]=="number");if(a.length===0)return r.default;if(s<=a[0][0])return a[0][1];for(let o=1;o<a.length;o+=1){const l=a[o-1],c=a[o];if(s<=c[0]){const u=(s-l[0])/Math.max(1e-9,c[0]-l[0]);return Py(l[1],c[1],u)}}return a[a.length-1][1]}function pa(i,e,t){const[n,...r]=i;if(n==="get")return t[String(r[0]??"")];if(n==="zoom")return e;if(n==="literal")return r[0];if(n==="coalesce"){for(const s of r){const a=Array.isArray(s)?pa(s,e,t):s;if(a!=null&&a!=="")return a}return}if(n==="concat")return r.map(s=>String(Array.isArray(s)?pa(s,e,t)??"":s??"")).join("");if(n==="to-string"){const s=Array.isArray(r[0])?pa(r[0],e,t):r[0];return s==null?"":String(s)}return i}function Ly(i,e,t){const n=Dt(i,e,t);return typeof n=="string"?n.replace(/\{([^}]+)\}/g,(r,s)=>String(t[s]??"")):n==null?"":String(n)}function Py(i,e,t){return typeof i=="number"&&typeof e=="number"?ue.lerp(i,e,t):typeof i=="string"&&typeof e=="string"&&Jl(i)&&Jl(e)?`#${new et(i).lerp(new et(e),t).getHexString()}`:t<.5?i:e}function Dr(i,e){return typeof i=="string"&&Jl(i)?i:e}function Jl(i){return i.startsWith("#")||i.startsWith("rgb")||/^[a-z]+$/i.test(i)}function mi(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}function Ah(i,e){return typeof i=="string"?i:e}function Dy(i,e){return i[0]<e[2]&&i[2]>e[0]&&i[1]<e[3]&&i[3]>e[1]}class Iy{constructor(e){L(this,"id"),L(this,"minLevel"),L(this,"maxLevel"),L(this,"templates"),L(this,"tileJsonUrl"),L(this,"metadataPromise",null);const t=e.source.tiles??[];if(t.length===0&&!e.source.url)throw new Error(`矢量数据源 ${e.id} 没有 tiles 模板或 TileJSON URL。`);this.id=e.id,this.templates=t,this.tileJsonUrl=e.source.url,this.minLevel=Math.max(0,Math.round(e.source.minzoom??0)),this.maxLevel=Math.max(this.minLevel,Math.round(e.source.maxzoom??30))}url(e){const t=this.templates[0];if(!t)throw new Error(`矢量数据源 ${this.id} 的 TileJSON 尚未解析，请通过 load() 请求瓦片。`);return t.split("{z}").join(String(e.level)).split("{x}").join(String(e.x)).split("{y}").join(String(e.y))}async load(e,t){const n=await this.resolveTemplates(t),r=n[(e.x+e.y)%n.length];if(!r)throw new Error(`矢量数据源 ${this.id} 没有可用 tiles 模板。`);const s=Uy(r,e),a=await fetch(s,{signal:t});if(!a.ok)throw new Error(`MVT 请求失败：${a.status} ${s}`);return a.arrayBuffer()}resolveTemplates(e){return this.templates.length>0?Promise.resolve(this.templates):this.metadataPromise??(this.metadataPromise=this.loadTileJson(e))}async loadTileJson(e){if(!this.tileJsonUrl)throw new Error(`矢量数据源 ${this.id} 没有 TileJSON URL。`);const t=await fetch(this.tileJsonUrl,{signal:e});if(!t.ok)throw new Error(`矢量 TileJSON 加载失败：${t.status} ${Ny(this.tileJsonUrl)}`);const n=(await t.json()).tiles??[];if(n.length===0)throw new Error(`矢量 TileJSON ${this.id} 没有 tiles 模板。`);return this.templates=n,n}}function Uy(i,e){return i.split("{z}").join(String(e.level)).split("{x}").join(String(e.x)).split("{y}").join(String(e.y))}function Ny(i){return i.replace(/([?&](?:key|token|access_token)=)[^&]+/gi,"$1***")}class Fy{constructor(e){L(this,"styleUrl"),L(this,"sourceId"),L(this,"stylePromise",null),this.styleUrl=e.styleUrl,this.sourceId=e.sourceId}load(){return this.stylePromise??(this.stylePromise=this.fetchStyle())}selectVectorSource(e){const t=Object.entries(e.sources),n=this.sourceId?t.find(([r])=>r===this.sourceId):t.find(([,r])=>r.type==="vector");if(!n||n[1].type!=="vector")throw new Error(`样式中找不到矢量数据源${this.sourceId?` ${this.sourceId}`:""}。`);return{id:n[0],source:n[1]}}sourceLayerNames(e,t){const n=new Set;for(const r of e.layers)r.source&&r.source!==t||r["source-layer"]&&n.add(r["source-layer"]);return n}async fetchStyle(){const e=await fetch(this.styleUrl);if(!e.ok)throw new Error(`矢量样式加载失败：${e.status} ${this.styleUrl}`);const t=await e.json();if(t.version!==8||!t.sources||!Array.isArray(t.layers))throw new Error("矢量样式不是有效的 Mapbox Style v8。");return t}}class Oy{constructor(e){L(this,"id"),L(this,"minLevel"),L(this,"maxLevel"),L(this,"levelOffset"),L(this,"minimumLodLevelOffset"),L(this,"estimatedTextureBytes"),L(this,"attribution"),L(this,"styleAdapter"),L(this,"decoder",new by),L(this,"rasterizer"),L(this,"source",null),L(this,"viewSourceLevel"),L(this,"_viewLevelOffset"),L(this,"_revision",0),this.id=e.id??"arcgis-vector-raster",this.minLevel=Math.max(0,Math.round(e.minLevel??0)),this.maxLevel=Math.max(this.minLevel,Math.round(e.maxLevel??20)),this._viewLevelOffset=Rh(e.viewLevelOffset??e.levelOffset??_n),this.levelOffset=Math.min(0,Math.round(this._viewLevelOffset??0)),this.minimumLodLevelOffset=Math.min(0,Math.round(e.minimumLodLevelOffset??-1)),this.attribution=e.attribution??"Esri";const t=Math.max(256,Math.round(e.tileSize??512));this.estimatedTextureBytes=Math.ceil(t*t*4*4/3),this.styleAdapter=new Fy({styleUrl:e.styleUrl,sourceId:e.sourceId}),this.rasterizer=new Ty({tileSize:t,showCountryLabels:e.showCountryLabels}),this.viewSourceLevel=this.minLevel}get revision(){return this._revision}get currentSourceLevel(){return this.viewSourceLevel}get viewLevelOffset(){return this._viewLevelOffset}setViewLevel(e){const t=this._viewLevelOffset===null?this.maxLevel:ue.clamp(Math.floor(e+this._viewLevelOffset+1e-9),this.minLevel,this.maxLevel);t!==this.viewSourceLevel&&(this.viewSourceLevel=t,this._revision+=1)}setViewLevelOffset(e){const t=Rh(e);t!==this._viewLevelOffset&&(this._viewLevelOffset=t,this.viewSourceLevel=Number.NaN)}maximumSourceLevel(e){return Math.min(e,this.viewSourceLevel,this.maxLevel)}url(e){return`${this.styleAdapter.styleUrl}#${e.level}/${e.x}/${e.y}`}async loadTexture(e){const t=await this.styleAdapter.load(),n=this.styleAdapter.selectVectorSource(t),r=await(this.source??(this.source=new Iy(n))).load(e),s=this.decoder.decode(r,this.styleAdapter.sourceLayerNames(t,n.id)),a=this.rasterizer.rasterize(t,n.id,s,e.level),o=new j_(a);return o.colorSpace=qt,o.needsUpdate=!0,o}}function Rh(i){return i===null?null:i===void 0||!Number.isFinite(i)?_n:Math.max(-8,Math.min(2,i))}class By{constructor(e=[],t={}){L(this,"sources",new Map),L(this,"variables"),L(this,"defaultLevelOffset"),this.variables=t.variables??{},this.defaultLevelOffset=Dh(t.defaultLevelOffset??_n);for(const n of e)this.register(n)}register(e){if(Ch(e),this.sources.has(e.id))throw new Error(`Data source already exists: ${e.id}`);this.sources.set(e.id,Lh(e))}replace(e){Ch(e),this.sources.set(e.id,Lh(e))}remove(e){return this.sources.delete(e)}get(e){return this.sources.get(e)}values(){return[...this.sources.values()]}availability(e){const t=this.require(e),n=(t.requires??[]).filter(r=>{var s;return!((s=this.variables[r])!=null&&s.trim())});return{available:n.length===0&&t.kind!=="mvt",missingVariables:n,supported:t.kind!=="mvt"}}createRasterProvider(e,t={}){const n=this.require(e),r=this.availability(e);if(!r.supported)throw new Error(`Data source ${e} requires the planned native MVT renderer.`);if(!r.available)throw new Error(`Data source ${e} is missing variables: ${r.missingVariables.join(", ")}`);const s=Dh(t.levelOffset??n.levelOffset??this.defaultLevelOffset);if(n.kind==="rasterized-vector-style"){if(!n.styleUrl)throw new Error(`styleUrl is required: ${e}`);return new Oy({id:n.id,styleUrl:Ph(n.styleUrl,this.variables),sourceId:n.sourceId,minLevel:n.minLevel,maxLevel:n.maxLevel,viewLevelOffset:s,minimumLodLevelOffset:n.minimumLodLevelOffset,showCountryLabels:n.showCountryLabels,tileSize:n.tileSize,attribution:n.attribution})}if(!n.urlTemplate)throw new Error(`urlTemplate is required: ${e}`);return new sy({id:n.id,urlTemplate:Ph(n.urlTemplate,this.variables),subdomains:n.subdomains,minLevel:n.minLevel,maxLevel:n.maxLevel,tileSize:n.tileSize,viewLevelOffset:s,attribution:n.attribution})}require(e){const t=this.sources.get(e);if(!t)throw new Error(`Unknown data source: ${e}`);return t}}function Ch(i){if(!i.id.trim())throw new Error("Data source id is required.");if(!i.name.trim())throw new Error(`Data source name is required: ${i.id}`);if(i.kind==="rasterized-vector-style"&&!i.styleUrl)throw new Error(`styleUrl is required: ${i.id}`);if((i.kind==="xyz-raster"||i.kind==="wmts-raster"||i.kind==="mvt")&&!i.urlTemplate)throw new Error(`urlTemplate is required: ${i.id}`)}function Lh(i){return Object.freeze({...i,subdomains:i.subdomains?Object.freeze([...i.subdomains]):void 0,requires:i.requires?Object.freeze([...i.requires]):void 0})}function Ph(i,e){return i.replace(/\$\{([A-Z0-9_]+)\}/g,(t,n)=>e[n]??"")}function Dh(i){return Number.isFinite(i)?Math.max(-8,Math.min(2,i)):_n}class zy{constructor(e){if(L(this,"id"),L(this,"minLevel"),L(this,"attribution"),L(this,"configuredTemplates"),L(this,"tileJsonUrl"),L(this,"configuredScheme"),L(this,"encoding"),L(this,"configuredMaxLevel"),L(this,"noDataHeight"),L(this,"metadataPromise",null),L(this,"resolvedMaxLevel"),L(this,"disabledTemplates",new Set),L(this,"warnedTemplates",new Set),(!e.urlTemplates||e.urlTemplates.length===0)&&!e.tileJsonUrl)throw new Error("TerrainRgbProvider 至少需要一个 URL 模板或 TileJSON 地址。");this.id=e.id??"terrain-rgb",this.minLevel=Math.max(0,Math.round(e.minLevel??0)),this.configuredMaxLevel=Math.max(this.minLevel,Math.round(e.maxLevel??14)),this.resolvedMaxLevel=this.configuredMaxLevel,this.attribution=e.attribution,this.configuredTemplates=e.urlTemplates??[],this.tileJsonUrl=e.tileJsonUrl,this.configuredScheme=e.scheme,this.encoding=e.encoding??"mapbox",this.noDataHeight=e.noDataHeight??0}get maxLevel(){return this.resolvedMaxLevel}async loadTile(e){const t=await this.metadata(),n=Math.min(e.level,this.maxLevel),r=n===e.level?e:{level:n,x:Math.floor(e.x/2**(e.level-n)),y:Math.floor(e.y/2**(e.level-n))};let s=!1,a=!1,o;for(const l of t.tiles){if(this.disabledTemplates.has(l)){a=!0;continue}const c=Hy(l,r,t.scheme);try{const u=await fetch(c);if(u.status===404||u.status===204){s=!0;continue}if(u.status===401||u.status===403){a=!0,this.disabledTemplates.add(l),this.warnedTemplates.has(l)||(this.warnedTemplates.add(l),console.warn(`[地形数据源 ${this.id}] 服务返回 ${u.status}，本次会话已停用该地址并尝试后备源。`));continue}if(!u.ok)throw new Error(`地形请求失败：${u.status} ${c}`);return await Gy(r,await u.blob(),this.encoding)}catch(u){o=u}}if(s&&!o)return Ih(r,this.noDataHeight);if(a&&!o)return Ih(r,this.noDataHeight);throw o??new Error(`地形瓦片 ${r.level}/${r.x}/${r.y} 没有可用数据。`)}async metadata(){return this.metadataPromise??(this.metadataPromise=this.loadMetadata())}async loadMetadata(){let e={};if(this.tileJsonUrl)try{const r=await fetch(this.tileJsonUrl);if(!r.ok)throw new Error(`地形 TileJSON 加载失败：${r.status}`);e=await r.json()}catch(r){if(this.configuredTemplates.length===0)throw r}const t=[...new Set([...this.configuredTemplates,...e.tiles??[]])];if(t.length===0)throw new Error("地形 TileJSON 没有 tiles 模板。");const n=Number.isFinite(e.maxzoom)?Math.round(e.maxzoom):this.configuredMaxLevel;return this.resolvedMaxLevel=Math.max(this.minLevel,Math.min(this.configuredMaxLevel,n)),{...e,tiles:t,scheme:this.configuredScheme??e.scheme??"xyz"}}}function Vf(i,e,t){const n=ue.clamp(e,0,1)*(i.width-1),r=ue.clamp(t,0,1)*(i.height-1),s=Math.floor(n),a=Math.floor(r),o=Math.min(i.width-1,s+1),l=Math.min(i.height-1,a+1),c=n-s,u=r-a,h=i.heights[a*i.width+s]??0,d=i.heights[a*i.width+o]??h,f=i.heights[l*i.width+s]??h,_=i.heights[l*i.width+o]??f;return ue.lerp(ue.lerp(h,d,c),ue.lerp(f,_,c),u)}function Vy(i,e,t,n="mapbox"){return n==="terrarium"?i*256+e+t/256-32768:-1e4+(i*256*256+e*256+t)*.1}function Hy(i,e,t){const n=t==="tms"?2**e.level-1-e.y:e.y;return i.split("{z}").join(String(e.level)).split("{x}").join(String(e.x)).split("{y}").join(String(n))}async function Gy(i,e,t){const n=await createImageBitmap(e),r=document.createElement("canvas");r.width=n.width,r.height=n.height;const s=r.getContext("2d",{willReadFrequently:!0});if(!s)throw n.close(),new Error("当前浏览器无法读取 Terrain-RGB 像素。");s.drawImage(n,0,0),n.close();const a=s.getImageData(0,0,r.width,r.height).data,o=new Float32Array(r.width*r.height);let l=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY;for(let h=0,d=0;h<a.length;h+=4,d+=1){const f=a[h]??0,_=a[h+1]??0,v=a[h+2]??0,m=Vy(f,_,v,t);o[d]=m,l=Math.min(l,m),c=Math.max(c,m)}const u=ky(o,r.width,r.height);return Hf(i,u.width,u.height,u.heights,l,c)}function Ih(i,e){return Hf(i,1,1,new Float32Array([e]),e,e)}function Hf(i,e,t,n,r,s){const a=new Af(n,e,t,yc,Ei);return a.colorSpace=sn,a.wrapS=ci,a.wrapT=ci,a.minFilter=wt,a.magFilter=wt,a.generateMipmaps=!1,a.needsUpdate=!0,{id:i,width:e,height:t,heights:n,minimumHeight:r,maximumHeight:s,texture:a}}function ky(i,e,t){const n=e>1?257:1,r=t>1?257:1;if(n===e&&r===t)return{width:n,height:r,heights:i};const s=new Float32Array(n*r);for(let a=0;a<r;a+=1){const o=r<=1?0:a/(r-1)*(t-1),l=Math.floor(o),c=Math.min(t-1,l+1),u=o-l;for(let h=0;h<n;h+=1){const d=n<=1?0:h/(n-1)*(e-1),f=Math.floor(d),_=Math.min(e-1,f+1),v=d-f,m=i[l*e+f]??0,p=i[l*e+_]??m,b=i[c*e+f]??m,T=i[c*e+_]??b;s[a*n+h]=ue.lerp(ue.lerp(m,p,v),ue.lerp(b,T,v),u)}}return{width:n,height:r,heights:s}}function Wy(i,e,t={}){const n=jy(t),r=new Set,s=new Map,a=new Set([i]);for(const c of e)c!==i&&kf(i.id,c.id)&&a.add(c);let o=0;for(const c of a){const u=Xy(c,e);if(u)for(const h of["west","east","north","south"])qy(c,u,h,n),ko(c,r),o+=1}const l=new Set;for(const c of a)for(const u of e){if(c===u)continue;const h=Ky(c.id,u.id);if(!h)continue;const d=Zy(c,u,h);l.has(d)||(l.add(d),$y(c,u,h,n),ko(c,r),ko(u,r),o+=1)}for(const c of r)c.data.texture.needsUpdate=!0,s.set(c,Jy(c.data.heights));return{modified:r,bounds:s,stitchedEdges:o}}function Xy(i,e){let t;for(const n of e)n===i||!kf(n.id,i.id)||(!t||n.id.level>t.id.level)&&(t=n);return t}function qy(i,e,t,n){const r=i.id.level-e.id.level,s=1/2**r,a=(i.id.x-e.id.x*2**r)*s,o=(i.id.y-e.id.y*2**r)*s,l=vs(i.data,t),c=new Float32Array(l);for(let u=0;u<l;u+=1){const h=l<=1?0:u/(l-1),d=a+(t==="west"?0:t==="east"?s:h*s),f=o+(t==="north"?0:t==="south"?s:h*s);c[u]=Vf(e.data,d,f)}La(i,t,c,n)}function $y(i,e,t,n){if(i.id.level!==e.id.level){i.id.level<e.id.level?Uh(i,e,t.firstEdge,t.secondEdge,t.firstStart,t.firstEnd,t.secondStart,t.secondEnd,t.overlapStart,t.overlapEnd,n):Uh(e,i,t.secondEdge,t.firstEdge,t.secondStart,t.secondEnd,t.firstStart,t.firstEnd,t.overlapStart,t.overlapEnd,n);return}const r=Ca(i.data,t.firstEdge),s=Ca(e.data,t.secondEdge),a=r.slice(),o=s.slice();Nh(r,s,a,t.firstStart,t.firstEnd,t.secondStart,t.secondEnd,t.overlapStart,t.overlapEnd),Nh(s,r,o,t.secondStart,t.secondEnd,t.firstStart,t.firstEnd,t.overlapStart,t.overlapEnd);const l=Yy(i,e,t.firstEdge,t.secondEdge,t.firstStart,t.firstEnd,t.secondStart,t.secondEnd);La(i,t.firstEdge,a,n,l.first),La(e,t.secondEdge,o,n,l.second)}function Uh(i,e,t,n,r,s,a,o,l,c,u){const h=Ca(i.data,t),d=Ca(e.data,n),f=h,_=d.slice(),v=new Float32Array(d.length),m=Ql(i,t),p=Ql(e,n);for(let b=0;b<_.length;b+=1){const T=_.length<=1?0:b/(_.length-1),M=ue.lerp(a,o,T);if(M<l-1e-9||M>c+1e-9)continue;const A=(M-r)/(s-r);_[b]=Gf(f,A),v[b]=-Kr(i,t,A)*p/Math.max(.001,m)}La(e,n,_,u,v)}function Yy(i,e,t,n,r,s,a,o){const l=vs(i.data,t),c=vs(e.data,n),u=new Float32Array(l),h=new Float32Array(c);for(let d=0;d<l;d+=1){const f=l<=1?0:d/(l-1),_=(ue.lerp(r,s,f)-a)/(o-a),v=Kr(i,t,f),m=Kr(e,n,_);u[d]=.5*(v-m)}for(let d=0;d<c;d+=1){const f=c<=1?0:d/(c-1),_=(ue.lerp(a,o,f)-r)/(s-r),v=Kr(e,n,f),m=Kr(i,t,_);h[d]=.5*(v-m)}return{first:u,second:h}}function Kr(i,e,t){const n=vs(i.data,e);if(n<=1)return 0;const r=ue.clamp(t,0,1)*(n-1),s=Math.floor(r),a=Math.min(n-1,s+1),o=l=>{const c=i.data.heights[jn(i.data,e,l,0)]??0;return(i.data.heights[jn(i.data,e,l,1)]??c)-c};return ue.lerp(o(s),o(a),r-s)}function Nh(i,e,t,n,r,s,a,o,l){for(let c=0;c<i.length;c+=1){const u=i.length<=1?0:c/(i.length-1),h=ue.lerp(n,r,u);if(h<o-1e-9||h>l+1e-9)continue;const d=(h-s)/(a-s);t[c]=.5*((i[c]??0)+Gf(e,d))}}function Ca(i,e){const t=vs(i,e),n=new Float32Array(t);for(let r=0;r<t;r+=1)n[r]=i.heights[jn(i,e,r,0)]??0;return n}function La(i,e,t,n,r){const s=i.data,a=e==="west"||e==="east"?s.width:s.height,o=Ql(i,e);for(let l=0;l<t.length;l+=1){const c=t[l]??0,u=jn(s,e,l,0),h=s.heights[u]??c,d=Math.abs(c-h),f=Math.ceil(1.5*d/Math.max(.001,o*n.maximumAddedSlope))+1,_=Math.min(a,n.maximumBlendTexels,Math.max(n.minimumBlendTexels,f));let v=Math.min(c,c+((r==null?void 0:r[l])??0)),m=Math.max(c,c+((r==null?void 0:r[l])??0));for(let M=0;M<_;M+=1){const A=s.heights[jn(s,e,l,M)]??c;v=Math.min(v,A),m=Math.max(m,A)}const p=_>1?(s.heights[jn(s,e,l,1)]??h)-h:0,b=(r==null?void 0:r[l])??0,T=(b-p)*Math.max(1,_-1);for(let M=0;M<_;M+=1){const A=_<=1?0:M/(_-1),C=A*A,D=C*A,B=2*D-3*C+1,x=D-2*C+A,E=jn(s,e,l,M),N=(s.heights[E]??c)+(c-h)*B+T*x;s.heights[E]=M===0?c:M===1?c+b:ue.clamp(N,v,m)}}}function Ql(i,e){const t=2**i.id.level,n=Math.PI-(i.id.y+.5)/t*Math.PI*2,r=1/Math.cosh(n),s=e==="west"||e==="east"?Math.max(1,i.data.width-1):Math.max(1,i.data.height-1);return 2*Math.PI*6378137*r/(t*s)}function jy(i){const e=typeof i=="number"?i:i.minimumBlendTexels,t=Math.max(2,Math.round(e??6)),n=Math.max(t,Math.round(typeof i=="number"?128:i.maximumBlendTexels??128));return{minimumBlendTexels:t,maximumBlendTexels:n,maximumAddedSlope:Math.max(.05,typeof i=="number"?.45:i.maximumAddedSlope??.45)}}function vs(i,e){return e==="west"||e==="east"?i.height:i.width}function jn(i,e,t,n){return e==="west"?t*i.width+n:e==="east"?t*i.width+(i.width-1-n):e==="north"?n*i.width+t:(i.height-1-n)*i.width+t}function Gf(i,e){if(i.length<=1)return i[0]??0;const t=ue.clamp(e,0,1)*(i.length-1),n=Math.floor(t),r=Math.min(i.length-1,n+1);return ue.lerp(i[n]??0,i[r]??i[n]??0,t-n)}function Ky(i,e){const t=Math.max(i.level,e.level),n=2**t,r=Fh(i,t),s=Fh(e,t),a=Math.max(r.north,s.north),o=Math.min(r.south,s.south);if(o>a){if(ta(r.east,n)===ta(s.west,n))return ea("east","west",a,o,r.north,r.south,s.north,s.south);if(ta(r.west,n)===ta(s.east,n))return ea("west","east",a,o,r.north,r.south,s.north,s.south)}const l=Math.max(r.west,s.west),c=Math.min(r.east,s.east);if(c>l){if(r.south===s.north)return ea("south","north",l,c,r.west,r.east,s.west,s.east);if(r.north===s.south)return ea("north","south",l,c,r.west,r.east,s.west,s.east)}return null}function ea(i,e,t,n,r,s,a,o){return{firstEdge:i,secondEdge:e,overlapStart:t,overlapEnd:n,firstStart:r,firstEnd:s,secondStart:a,secondEnd:o}}function Fh(i,e){const t=2**(e-i.level);return{west:i.x*t,east:(i.x+1)*t,north:i.y*t,south:(i.y+1)*t}}function kf(i,e){if(i.level>=e.level)return!1;const t=2**(e.level-i.level);return Math.floor(e.x/t)===i.x&&Math.floor(e.y/t)===i.y}function ta(i,e){return(i%e+e)%e}function Zy(i,e,t){const n=`${i.id.level}/${i.id.x}/${i.id.y}/${t.firstEdge}`,r=`${e.id.level}/${e.id.x}/${e.id.y}/${t.secondEdge}`;return n<r?`${n}|${r}`:`${r}|${n}`}function ko(i,e){e.add(i)}function Jy(i){let e=Number.POSITIVE_INFINITY,t=Number.NEGATIVE_INFINITY;for(const n of i)Number.isFinite(n)&&(e=Math.min(e,n),t=Math.max(t,n));return!Number.isFinite(e)||!Number.isFinite(t)?{minimumHeight:0,maximumHeight:0}:{minimumHeight:e,maximumHeight:t}}class Qy{constructor(e={}){L(this,"tilingScheme"),L(this,"ellipsoid"),L(this,"minLevel"),L(this,"maxLevel"),L(this,"targetPixels"),L(this,"collapseFactor"),L(this,"maxTiles"),L(this,"maximumSurfaceDisplacement"),L(this,"horizonPaddingRadians"),L(this,"minimumHorizonDetailFactor"),L(this,"horizonDetailExponent"),L(this,"previousSplits",new Set),L(this,"boundsCache",new Map),L(this,"cameraDirection",new U),L(this,"cameraPosition",new U),L(this,"tileDirection",new U),L(this,"sampleDirection",new U),L(this,"displacedSample",new U),L(this,"boundsNormal",new U),L(this,"surfacePoint",new U),L(this,"surfaceToCamera",new U),L(this,"projectionView",new _t),L(this,"frustum",new Lc),L(this,"tileBounds",new bs),L(this,"viewSurfaceSamples",[]),L(this,"surfaceDisplacementSource"),L(this,"surfaceDisplacementRevision",-1),L(this,"cameraDistance",0),L(this,"cameraLongitude",0),L(this,"cameraLatitude",0),L(this,"focalPixels",1),L(this,"visited",0),L(this,"horizonCulled",0),L(this,"frustumCulled",0),this.ellipsoid=Ya.WGS84,this.tilingScheme=e.tilingScheme??new ny,this.minLevel=Wo(e.minLevel??2,0,27),this.maxLevel=Wo(e.maxLevel??27,this.minLevel,30),this.targetPixels=Math.max(24,e.targetPixels??150),this.collapseFactor=ue.clamp(e.collapseFactor??.72,.1,.99),this.maxTiles=Math.max(8,Math.round(e.maxTiles??384)),this.maximumSurfaceDisplacement=Math.max(0,e.maximumSurfaceDisplacement??0),this.horizonPaddingRadians=ue.degToRad(e.horizonPaddingDegrees??.75),this.minimumHorizonDetailFactor=ue.clamp(e.minimumHorizonDetailFactor??.08,.01,1),this.horizonDetailExponent=ue.clamp(e.horizonDetailExponent??.5,.1,4)}setMaximumSurfaceDisplacement(e){const t=Math.max(0,e);t!==this.maximumSurfaceDisplacement&&(this.maximumSurfaceDisplacement=t,this.boundsCache.clear(),this.previousSplits.clear())}setSurfaceDisplacementSource(e){e!==this.surfaceDisplacementSource&&(this.surfaceDisplacementSource=e,this.surfaceDisplacementRevision=(e==null?void 0:e.revision)??-1,this.boundsCache.clear(),this.previousSplits.clear())}select(e,t,n){var r;const s=((r=this.surfaceDisplacementSource)==null?void 0:r.revision)??-1;s!==this.surfaceDisplacementRevision&&(this.surfaceDisplacementRevision=s,this.boundsCache.clear()),e.updateMatrixWorld(),e.getWorldPosition(this.cameraPosition),this.cameraDistance=this.cameraPosition.length(),this.cameraDirection.copy(this.cameraPosition).normalize(),this.cameraLongitude=ue.radToDeg(Math.atan2(this.cameraDirection.x,this.cameraDirection.z)),this.cameraLatitude=ue.radToDeg(Math.asin(ue.clamp(this.cameraDirection.y,-1,1))),this.focalPixels=Math.max(1,t)/(2*Math.tan(ue.degToRad(e.fov)*.5)),this.visited=0,this.horizonCulled=0,this.frustumCulled=0;const a=n===void 0?this.minLevel:Wo(n,this.minLevel,this.maxLevel);this.projectionView.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projectionView),this.updateViewSurfaceSamples(e);const o=this.tilingScheme.rootTiles().map(u=>this.evaluate(u)).filter(u=>u!==null),l=new Set;for(;o.length<this.maxTiles;){let u=-1,h=1;for(let _=0;_<o.length;_+=1){const v=o[_];if(!v||!v.canSplit||v.id.level>=this.maxLevel)continue;const m=this.previousSplits.has(Pt(v.id))?this.targetPixels*this.collapseFactor:this.targetPixels,p=v.id.level<a?Number.POSITIVE_INFINITY:v.screenPixels/m;p>h&&(h=p,u=_)}if(u<0)break;const d=o[u];if(!d)break;const f=this.tilingScheme.children(d.id).map(_=>this.evaluate(_)).filter(_=>_!==null);if(f.length===0){o.splice(u,1);continue}if(o.length-1+f.length>this.maxTiles){d.canSplit=!1;continue}o.splice(u,1,...f),l.add(Pt(d.id))}this.previousSplits.clear();for(const u of l)this.previousSplits.add(u);o.sort((u,h)=>u.id.level-h.id.level||u.id.y-h.id.y||u.id.x-h.id.x);const c=new Map;for(const u of o)c.set(u.id.level,(c.get(u.id.level)??0)+1);return{tiles:o,stats:{selected:o.length,visited:this.visited,horizonCulled:this.horizonCulled,frustumCulled:this.frustumCulled,levels:c}}}evaluate(e){this.visited+=1;const t=this.tilingScheme.rectangle(e),n=(t.west+t.east)*.5,r=(t.south+t.north)*.5;this.tileDirection.copy(this.ellipsoid.cartographicToCartesian({longitude:n,latitude:r},this.tileDirection)).normalize(),this.ellipsoid.cartographicToCartesian({longitude:n,latitude:r},this.surfacePoint);const s=this.surfaceDisplacementForTile(e);if(e.level>0&&!this.isAboveHorizon(t,s.maximumHeight))return this.horizonCulled+=1,null;if(e.level>0&&!this.isInsideFrustum(e,t,s))return this.frustumCulled+=1,null;const a=Math.max(ue.degToRad(t.north-t.south),ue.degToRad(t.east-t.west)*Math.max(.15,Math.cos(ue.degToRad(r)))),o=this.ellipsoid.equatorialRadius*a;let l=this.projectedDetailPixels(this.surfacePoint,this.tileDirection,o);for(const c of this.viewSurfaceSamples)tb(t,c.longitude,c.latitude)&&(l=Math.max(l,this.projectedDetailPixels(c.point,c.normal,o)));return{id:e,rectangle:t,screenPixels:l,canSplit:!0}}projectedDetailPixels(e,t,n){this.surfaceToCamera.copy(this.cameraPosition).sub(e);const r=Math.max(1,this.surfaceToCamera.length()),s=n*this.focalPixels/r,a=ue.clamp(this.surfaceToCamera.dot(t)/r,0,1),o=ue.lerp(this.minimumHorizonDetailFactor,1,a**this.horizonDetailExponent);return s*o}updateViewSurfaceSamples(e){this.viewSurfaceSamples.length=0;const t=[[0,0],[0,-.82],[-.82,-.82],[.82,-.82],[-.82,0],[.82,0]];for(const[n,r]of t){const s=new U(n,r,.5).unproject(e).sub(this.cameraPosition).normalize(),a=nb(this.cameraPosition,s,this.ellipsoid);if(!a)continue;const o=Math.hypot(a.x,a.z),l=ue.radToDeg(Math.atan2(a.x,a.z)),c=ue.radToDeg(Math.atan2(a.y*this.ellipsoid.equatorialRadius**2,o*this.ellipsoid.polarRadius**2));this.viewSurfaceSamples.push({longitude:l,latitude:c,point:a,normal:ib(a,this.ellipsoid)})}}surfaceDisplacementForTile(e){var t,n,r;const s=(n=(t=this.surfaceDisplacementSource)==null?void 0:t.heightRange)==null?void 0:n.call(t,e);if(s){const o=ue.clamp(s.minimumHeight,-this.maximumSurfaceDisplacement,this.maximumSurfaceDisplacement),l=ue.clamp(s.maximumHeight,o,this.maximumSurfaceDisplacement);return{minimumHeight:o,maximumHeight:l}}const a=(r=this.surfaceDisplacementSource)==null?void 0:r.maximumHeight(e);return a==null?{minimumHeight:0,maximumHeight:this.maximumSurfaceDisplacement}:{minimumHeight:0,maximumHeight:ue.clamp(a,0,this.maximumSurfaceDisplacement)}}isAboveHorizon(e,t){const n=this.surfaceRadiusInDirection(this.cameraDirection);if(this.cameraDistance<=n)return!0;const r=Math.acos(ue.clamp(n/this.cameraDistance,-1,1)),s=n+t,a=t>0?Math.acos(ue.clamp(n/s,-1,1)):0,o=Math.cos(Math.min(Math.PI,r+a+this.horizonPaddingRadians));return this.maximumFacingInRectangle(e)>=o}surfaceRadiusInDirection(e){const t=this.ellipsoid.equatorialRadius,n=this.ellipsoid.polarRadius;return 1/Math.sqrt((e.x*e.x+e.z*e.z)/(t*t)+e.y*e.y/(n*n))}maximumFacingInRectangle(e){const t=eb(this.cameraLongitude,e.west,e.east),n=ue.degToRad(t-this.cameraLongitude),r=ue.degToRad(this.cameraLatitude),s=Math.sin(r),a=Math.cos(r)*Math.cos(n),o=Math.atan2(s,a),l=ue.degToRad(e.south),c=ue.degToRad(e.north),u=[l,c,ue.clamp(o,l,c)];let h=-1;for(const d of u)h=Math.max(h,s*Math.sin(d)+a*Math.cos(d));return h}isInsideFrustum(e,t,n){const r=Pt(e),s=this.boundsCache.get(r);if(s)return this.frustum.intersectsSphere(s);const a=(t.west+t.east)*.5,o=(t.south+t.north)*.5;this.ellipsoid.cartographicToCartesian({longitude:a,latitude:o},this.tileBounds.center);const l=(n.minimumHeight+n.maximumHeight)*.5;if(l!==0){const h=this.ellipsoid.equatorialRadius**2,d=this.ellipsoid.polarRadius**2;this.boundsNormal.set(this.tileBounds.center.x/h,this.tileBounds.center.y/d,this.tileBounds.center.z/h).normalize(),this.tileBounds.center.addScaledVector(this.boundsNormal,l)}let c=0;const u=4;for(let h=0;h<=u;h+=1){const d=ue.lerp(t.south,t.north,h/u);for(let f=0;f<=u;f+=1){const _=ue.lerp(t.west,t.east,f/u);this.ellipsoid.cartographicToCartesian({longitude:_,latitude:d},this.sampleDirection),c=Math.max(c,this.tileBounds.center.distanceTo(this.sampleDirection)),n.minimumHeight!==0&&(this.ellipsoid.cartographicToCartesian({longitude:_,latitude:d,height:n.minimumHeight},this.displacedSample),c=Math.max(c,this.tileBounds.center.distanceTo(this.displacedSample))),n.maximumHeight!==n.minimumHeight&&(this.ellipsoid.cartographicToCartesian({longitude:_,latitude:d,height:n.maximumHeight},this.displacedSample),c=Math.max(c,this.tileBounds.center.distanceTo(this.displacedSample)))}}return this.tileBounds.radius=c*1.01+1,this.boundsCache.size>=this.maxTiles*64&&this.boundsCache.clear(),this.boundsCache.set(r,this.tileBounds.clone()),this.frustum.intersectsSphere(this.tileBounds)}}function Wo(i,e,t){return Math.max(e,Math.min(t,Math.round(i)))}function eb(i,e,t){if(t-e>=360)return i;const n=[i-360,i,i+360];let r=e,s=Number.POSITIVE_INFINITY;for(const a of n){const o=ue.clamp(a,e,t),l=Math.abs(a-o);l<s&&(s=l,r=o)}return r}function tb(i,e,t){return e>=i.west-1e-9&&e<=i.east+1e-9&&t>=i.south-1e-9&&t<=i.north+1e-9}function ib(i,e){const t=e.equatorialRadius**2,n=e.polarRadius**2;return new U(i.x/t,i.y/n,i.z/t).normalize()}function nb(i,e,t){const n=t.equatorialRadius**2,r=t.polarRadius**2,s=(e.x*e.x+e.z*e.z)/n+e.y*e.y/r,a=2*((i.x*e.x+i.z*e.z)/n+i.y*e.y/r),o=(i.x*i.x+i.z*i.z)/n+i.y*i.y/r-1,l=a*a-4*s*o;if(l<0||s<=0)return null;const c=Math.sqrt(l),u=(-a-c)/(2*s),h=(-a+c)/(2*s),d=u>=0?u:h>=0?h:-1;return d>=0?i.clone().addScaledVector(e,d):null}const Dc=`
uniform vec2 sag_ellipsoidRadii;
uniform float sag_heightOffset;
uniform vec3 sag_cameraHigh;
uniform vec3 sag_cameraLow;

vec4 sag_projectLocalToEye(
  vec3 localWorldMeters,
  vec3 originHigh,
  vec3 originLow
) {
  vec3 relativeToEye =
    (originHigh - sag_cameraHigh) +
    (originLow - sag_cameraLow) +
    localWorldMeters;
  return projectionMatrix * vec4(mat3(viewMatrix) * relativeToEye, 1.0);
}

vec3 sag_geodeticTrigRelativeToEye(
  vec2 longitudeSinCos,
  vec2 latitudeSinCos,
  float heightMeters
) {
  float a = sag_ellipsoidRadii.x;
  float b = sag_ellipsoidRadii.y;
  float eccentricitySquared = 1.0 - (b * b) / (a * a);
  float sinLatitude = latitudeSinCos.x;
  float cosLatitude = latitudeSinCos.y;
  float n = 1.0 / sqrt(1.0 - eccentricitySquared * sinLatitude * sinLatitude);
  float normalizedHeight = (heightMeters + sag_heightOffset) / a;
  vec3 worldNormalized = vec3(
    (n + normalizedHeight) * cosLatitude * longitudeSinCos.x,
    (n * (1.0 - eccentricitySquared) + normalizedHeight) * sinLatitude,
    (n + normalizedHeight) * cosLatitude * longitudeSinCos.y
  );
  return (worldNormalized - cameraPosition / a) * a;
}

vec3 sag_geodeticRelativeToEye(vec2 lonLatRadians, float heightMeters) {
  return sag_geodeticTrigRelativeToEye(
    vec2(sin(lonLatRadians.x), cos(lonLatRadians.x)),
    vec2(sin(lonLatRadians.y), cos(lonLatRadians.y)),
    heightMeters
  );
}

vec4 sag_projectGeodeticTrig(
  vec2 longitudeSinCos,
  vec2 latitudeSinCos,
  float heightMeters
) {
  vec3 relativeToEye = sag_geodeticTrigRelativeToEye(
    longitudeSinCos,
    latitudeSinCos,
    heightMeters
  );
  return projectionMatrix * vec4(mat3(viewMatrix) * relativeToEye, 1.0);
}

vec4 sag_projectGeodetic(vec2 lonLatRadians, float heightMeters) {
  vec3 relativeToEye = sag_geodeticRelativeToEye(lonLatRadians, heightMeters);
  return projectionMatrix * vec4(mat3(viewMatrix) * relativeToEye, 1.0);
}
`;class rb{constructor(e,t={}){L(this,"object3d"),L(this,"ellipsoid"),L(this,"subdivisions"),L(this,"heightOffset"),L(this,"terrain"),L(this,"geometry"),L(this,"material"),L(this,"cameraHigh",new U),L(this,"cameraLow",new U),L(this,"tileOrigin",new U),L(this,"vertexWorld",new U),L(this,"signature",""),L(this,"tileSignature",""),L(this,"observedTerrainRevision",-1),L(this,"renderedTerrainRevision",-1),L(this,"terrainRefreshAt",0),L(this,"vertexCapacity",0),L(this,"tilesReference",null),this.ellipsoid=e,this.subdivisions=Math.max(1,Math.round(t.subdivisions??8)),this.heightOffset=Math.max(0,t.heightOffset??.3),this.terrain=t.terrain,this.geometry=new ni,this.material=new ui({uniforms:{sag_ellipsoidRadii:{value:new Fe(e.equatorialRadius,e.polarRadius)},sag_heightOffset:{value:this.heightOffset},sag_cameraHigh:{value:this.cameraHigh},sag_cameraLow:{value:this.cameraLow},opacity:{value:.66}},vertexShader:`
        attribute vec3 sag_originHigh;
        attribute vec3 sag_originLow;
        varying vec3 v_color;
        #include <common>
        #include <logdepthbuf_pars_vertex>
        ${Dc}
        void main() {
          v_color = color;
          gl_Position = sag_projectLocalToEye(position, sag_originHigh, sag_originLow);
          #include <logdepthbuf_vertex>
        }
      `,fragmentShader:`
        varying vec3 v_color;
        uniform float opacity;
        #include <logdepthbuf_pars_fragment>
        void main() {
          gl_FragColor = vec4(v_color, opacity);
          #include <logdepthbuf_fragment>
          #include <colorspace_fragment>
        }
      `,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),this.object3d=new Y_(this.geometry,this.material),this.object3d.frustumCulled=!1,this.object3d.renderOrder=2,this.object3d.onBeforeRender=(n,r,s)=>{Xo(s.position,this.cameraHigh,this.cameraLow)}}update(e,t){var n;t&&Xo(t,this.cameraHigh,this.cameraLow);const r=((n=this.terrain)==null?void 0:n.revision)??0;if(e===this.tilesReference&&r===this.renderedTerrainRevision)return!1;const s=performance.now();r!==this.observedTerrainRevision&&(this.observedTerrainRevision=r,this.terrainRefreshAt=s+100);const a=e!==this.tilesReference?e.map(d=>Pt(d.id)).join("|"):this.tileSignature;if(a===this.tileSignature&&r!==this.renderedTerrainRevision&&s<this.terrainRefreshAt)return!1;const o=`${r}|${a}`;if(o===this.signature)return!1;this.signature=o,this.tilesReference=e,this.tileSignature=a,this.renderedTerrainRevision=r;const l=[],c=[],u=[],h=[];for(const d of e)this.appendTile(d,l,c,u,h);return this.updateAttributes(l,c,u,h),!0}handleContextRestored(){for(const e of Object.values(this.geometry.attributes))e.needsUpdate=!0;this.material.needsUpdate=!0,this.signature=""}dispose(){this.geometry.dispose();const e=this.object3d.material;if(Array.isArray(e))for(const t of e)t.dispose();else e.dispose()}updateAttributes(e,t,n,r){const s=Math.floor(e.length/3);s>this.vertexCapacity&&(this.vertexCapacity=sb(Math.max(1,s)),this.geometry.dispose(),this.geometry.setAttribute("position",new jt(new Float32Array(this.vertexCapacity*3),3)),this.geometry.setAttribute("color",new jt(new Float32Array(this.vertexCapacity*3),3)),this.geometry.setAttribute("sag_originHigh",new jt(new Float32Array(this.vertexCapacity*3),3)),this.geometry.setAttribute("sag_originLow",new jt(new Float32Array(this.vertexCapacity*3),3))),ia(this.geometry.getAttribute("position"),e),ia(this.geometry.getAttribute("color"),t),ia(this.geometry.getAttribute("sag_originHigh"),n),ia(this.geometry.getAttribute("sag_originLow"),r),this.geometry.setDrawRange(0,s)}appendTile(e,t,n,r,s){const{west:a,east:o,south:l,north:c}=e.rectangle,u=ab(e.id.level);this.ellipsoid.cartographicToCartesian({longitude:(a+o)*.5,latitude:(l+c)*.5,height:this.heightOffset},this.tileOrigin);const h=new U,d=new U;Xo(this.tileOrigin,h,d);const f=Math.max(this.subdivisions,Math.round(512/2**e.id.level));this.appendEdge(a,c,o,c,f,u,h,d,t,n,r,s),this.appendEdge(o,c,o,l,f,u,h,d,t,n,r,s),this.appendEdge(o,l,a,l,f,u,h,d,t,n,r,s),this.appendEdge(a,l,a,c,f,u,h,d,t,n,r,s)}appendEdge(e,t,n,r,s,a,o,l,c,u,h,d){for(let f=0;f<s;f+=1)this.appendVertex(ue.lerp(e,n,f/s),ue.lerp(t,r,f/s),a,o,l,c,u,h,d),this.appendVertex(ue.lerp(e,n,(f+1)/s),ue.lerp(t,r,(f+1)/s),a,o,l,c,u,h,d)}appendVertex(e,t,n,r,s,a,o,l,c){var u;const h=((u=this.terrain)==null?void 0:u.sampleHeight(e,t))??0;this.ellipsoid.cartographicToCartesian({longitude:e,latitude:t,height:h+this.heightOffset},this.vertexWorld),a.push(this.vertexWorld.x-this.tileOrigin.x,this.vertexWorld.y-this.tileOrigin.y,this.vertexWorld.z-this.tileOrigin.z),o.push(n.r,n.g,n.b),l.push(r.x,r.y,r.z),c.push(s.x,s.y,s.z)}}function sb(i){return 2**Math.ceil(Math.log2(i))}function ia(i,e){if(!(i instanceof jt))throw new Error("经纬网只支持非交错 BufferAttribute。");i.array.set(e),i.clearUpdateRanges(),i.addUpdateRange(0,e.length),i.needsUpdate=!0}function Xo(i,e,t){e.set(Math.fround(i.x),Math.fround(i.y),Math.fround(i.z)),t.set(i.x-e.x,i.y-e.y,i.z-e.z)}function ab(i){const e=(.52+i*.055)%1;return new et().setHSL(e,.94,Math.min(.86,.66+i*.025))}class Oh{constructor(e,t,n={}){L(this,"object3d",new Mr),L(this,"provider"),L(this,"ellipsoid"),L(this,"geometries",new Map),L(this,"baseSegments"),L(this,"loader",new nv),L(this,"renderTiles",new Map),L(this,"textures",new Map),L(this,"visibleTextureKeys",new Set),L(this,"maxConcurrentRequests"),L(this,"maxCachedTiles"),L(this,"maxTextureBytes"),L(this,"surfaceOffset"),L(this,"maxAnisotropy"),L(this,"terrain"),L(this,"overlay"),L(this,"layerOpacity"),L(this,"cameraHigh",new U),L(this,"cameraLow",new U),L(this,"tileOrigin",new U),L(this,"frame",0),L(this,"activeRequests",0),L(this,"disposed",!1),L(this,"fallbackCount",0),L(this,"suspended",!1),L(this,"lastSelection",null),L(this,"materialsDirty",!0),L(this,"observedTerrainRevision",-1),L(this,"observedProviderRevision",-1),L(this,"desiredMinimumLevel",null),L(this,"desiredMaximumLevel",null),L(this,"displayedMinimumLevel",null),L(this,"displayedMaximumLevel",null),L(this,"lastError",null),L(this,"warnedProviderId",null),this.ellipsoid=e,this.provider=t,this.baseSegments=Math.max(2,Math.round(n.segments??16)),this.maxConcurrentRequests=Math.max(1,Math.round(n.maxConcurrentRequests??8)),this.maxCachedTiles=Math.max(16,Math.round(n.maxCachedTiles??512)),this.maxTextureBytes=Math.max(16*1024*1024,Math.round(n.maxTextureBytes??192*1024*1024)),this.surfaceOffset=Math.max(0,n.surfaceOffset??.1),this.maxAnisotropy=Math.max(1,n.maxAnisotropy??1),this.terrain=n.terrain,this.overlay=n.overlay??!1,this.layerOpacity=ue.clamp(n.opacity??1,0,1),this.loader.setCrossOrigin("anonymous"),this.object3d.visible=n.visible??!0,this.object3d.renderOrder=n.order??1}get visible(){return this.object3d.visible}get opacity(){return this.layerOpacity}setVisible(e){this.object3d.visible=e}setOpacity(e){const t=ue.clamp(e,0,1);if(t!==this.layerOpacity){this.layerOpacity=t;for(const n of this.renderTiles.values())n.mesh.material.uniforms.layerOpacity.value=t,n.mesh.material.transparent=this.overlay||t<1,n.mesh.material.needsUpdate=!0}}setOrder(e){this.object3d.renderOrder=e;for(const t of this.renderTiles.values())t.mesh.renderOrder=e}update(e,t){var n;if(this.disposed)return this.stats;t&&qo(t,this.cameraHigh,this.cameraLow);const r=e!==this.lastSelection,s=((n=this.terrain)==null?void 0:n.revision)??-1,a=s!==this.observedTerrainRevision,o=this.provider.revision??0,l=o!==this.observedProviderRevision;return(r||l)&&(this.frame+=1,this.lastSelection=e,this.observedProviderRevision=o,r&&this.syncRenderTiles(e),this.queueVisibleTextures(e)),(r||l||a||this.materialsDirty)&&(this.observedTerrainRevision=s,this.syncMaterials(e),this.evictTextures(),this.materialsDirty=!1),this.pumpQueue(),this.stats}get stats(){const e={ready:0,loading:0,queued:0,errors:0};for(const t of this.textures.values())t.state==="error"?e.errors+=1:e[t.state]+=1;return{...e,fallbacks:this.fallbackCount,textureBytes:this.residentTextureBytes(),desiredMinimumLevel:this.desiredMinimumLevel,desiredMaximumLevel:this.desiredMaximumLevel,displayedMinimumLevel:this.displayedMinimumLevel,displayedMaximumLevel:this.displayedMaximumLevel,lastError:this.lastError}}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.renderTiles.values())e.mesh.material.dispose();for(const e of this.textures.values())this.releaseTexture(e.texture);this.renderTiles.clear(),this.textures.clear();for(const e of this.geometries.values())e.dispose();this.geometries.clear(),this.object3d.clear()}}setProvider(e){if(e.id!==this.provider.id){this.provider=e;for(const t of this.textures.values())this.releaseTexture(t.texture);this.textures.clear(),this.visibleTextureKeys.clear(),this.fallbackCount=0,this.lastError=null,this.warnedProviderId=null,this.lastSelection=null,this.observedProviderRevision=-1,this.materialsDirty=!0;for(const t of this.renderTiles.values()){t.textureKey="";const n=t.mesh.material.uniforms;n&&(n.tileTexture.value=null,n.hasTexture.value=!1)}}}handleContextLost(){this.suspended=!0}handleContextRestored(){this.suspended=!1;for(const e of this.textures.values())e.texture&&(e.texture.needsUpdate=!0);for(const e of this.renderTiles.values())e.mesh.material.needsUpdate=!0;this.materialsDirty=!0,this.pumpQueue()}syncRenderTiles(e){const t=new Set(e.map(n=>Pt(n.id)));for(const[n,r]of this.renderTiles)t.has(n)||(this.object3d.remove(r.mesh),r.mesh.material.dispose(),this.renderTiles.delete(n));for(const n of e){const r=Pt(n.id);if(this.renderTiles.has(r))continue;const s=this.createMaterial(n.id),a=new ii(this.geometryForLevel(n.id.level),s);a.frustumCulled=!1,a.renderOrder=this.object3d.renderOrder,a.onBeforeRender=(o,l,c)=>{qo(c.position,this.cameraHigh,this.cameraLow)},this.renderTiles.set(r,{id:n.id,mesh:a,textureKey:"",terrainKey:""}),this.object3d.add(a)}}geometryForLevel(e){const t=Math.max(this.baseSegments,Math.round(1024/2**e));let n=this.geometries.get(t);return n||(n=lb(t),this.geometries.set(t,n)),n}createMaterial(e){var t;const n=2**e.level,r=-Math.PI+e.x/n*Math.PI*2,s=-Math.PI+(e.x+1)/n*Math.PI*2,a=Math.PI-e.y/n*Math.PI*2,o=Math.PI-(e.y+1)/n*Math.PI*2,l=(r+s)*.5,c=s-r,u=(a+o)*.5,h=o-a,d=Math.atan(Math.sinh(u)),f=Math.sin(l),_=Math.cos(l),v=Math.sin(d),m=Math.cos(d);this.ellipsoid.cartographicToCartesian({longitude:ue.radToDeg(l),latitude:ue.radToDeg(d),height:this.surfaceOffset},this.tileOrigin);const p=new U,b=new U;qo(this.tileOrigin,p,b);const T=this.ellipsoid.equatorialRadius,M=this.ellipsoid.polarRadius,A=1-M*M/(T*T),C=1-A*v*v,D=T/Math.sqrt(C)+this.surfaceOffset,B=T*(1-A)/C**1.5+this.surfaceOffset,x=0;return new ui({uniforms:{sag_ellipsoidRadii:{value:new Fe(this.ellipsoid.equatorialRadius,this.ellipsoid.polarRadius)},sag_heightOffset:{value:this.surfaceOffset},sag_cameraHigh:{value:this.cameraHigh},sag_cameraLow:{value:this.cameraLow},sag_originHigh:{value:p},sag_originLow:{value:b},sag_east:{value:new U(_,0,-f)},sag_north:{value:new U(-v*f,m,-v*_)},sag_up:{value:new U(m*f,v,m*_)},sag_curvatureRadii:{value:new Fe(D,B)},sag_useLocalCoordinates:{value:e.level>=18},tileLongitudeSinCos:{value:new Fe(f,_)},tileLongitudeSpan:{value:c},tileLatitudeSinCos:{value:new Fe(v,m)},tileMercatorSinhCosh:{value:new Fe(Math.sinh(u),Math.cosh(u))},tileMercatorSpan:{value:h},tileTexture:{value:null},uvScale:{value:new Fe(1,1)},uvOffset:{value:new Fe(0,0)},hasTexture:{value:!1},layerOpacity:{value:this.layerOpacity},isOverlay:{value:this.overlay},terrainTexture:{value:null},terrainParentTexture:{value:null},terrainUvScale:{value:new Fe(1,1)},terrainUvOffset:{value:new Fe(0,0)},terrainParentUvScale:{value:new Fe(1,1)},terrainParentUvOffset:{value:new Fe(0,0)},terrainTexelSize:{value:new Fe(1,1)},terrainMetersPerTexel:{value:new Fe(1,1)},hasTerrain:{value:!1},hasTerrainParent:{value:!1},terrainExaggeration:{value:((t=this.terrain)==null?void 0:t.exaggeration)??1},terrainSkirtDepth:{value:x},placeholder:{value:cb(e.level)}},vertexShader:`
        varying vec2 v_uv;
        varying vec3 v_globeNormal;
        varying vec2 v_terrainUv;
        attribute float skirt;
        uniform vec3 sag_originHigh;
        uniform vec3 sag_originLow;
        uniform vec3 sag_east;
        uniform vec3 sag_north;
        uniform vec3 sag_up;
        uniform vec2 sag_curvatureRadii;
        uniform bool sag_useLocalCoordinates;
        uniform vec2 tileLongitudeSinCos;
        uniform float tileLongitudeSpan;
        uniform vec2 tileLatitudeSinCos;
        uniform vec2 tileMercatorSinhCosh;
        uniform float tileMercatorSpan;
        uniform vec2 uvScale;
        uniform vec2 uvOffset;
        uniform sampler2D terrainTexture;
        uniform sampler2D terrainParentTexture;
        uniform vec2 terrainUvScale;
        uniform vec2 terrainUvOffset;
        uniform vec2 terrainParentUvScale;
        uniform vec2 terrainParentUvOffset;
        uniform vec2 terrainTexelSize;
        uniform bool hasTerrain;
        uniform bool hasTerrainParent;
        uniform float terrainExaggeration;
        uniform float terrainSkirtDepth;
        #include <common>
        #include <logdepthbuf_pars_vertex>
        ${Dc}
        void main() {
          float deltaLongitude = (position.x - 0.5) * tileLongitudeSpan;
          float sinDeltaLongitude = sin(deltaLongitude);
          float cosDeltaLongitude = cos(deltaLongitude);
          vec2 longitudeSinCos = vec2(
            tileLongitudeSinCos.x * cosDeltaLongitude +
              tileLongitudeSinCos.y * sinDeltaLongitude,
            tileLongitudeSinCos.y * cosDeltaLongitude -
              tileLongitudeSinCos.x * sinDeltaLongitude
          );
          float deltaMercator = (position.y - 0.5) * tileMercatorSpan;
          float sinhDeltaMercator = 0.5 * (exp(deltaMercator) - exp(-deltaMercator));
          float coshDeltaMercator = 0.5 * (exp(deltaMercator) + exp(-deltaMercator));
          float sinhMercator =
            tileMercatorSinhCosh.x * coshDeltaMercator +
            tileMercatorSinhCosh.y * sinhDeltaMercator;
          float cosLatitude = inversesqrt(1.0 + sinhMercator * sinhMercator);
          float sinLatitude = sinhMercator * cosLatitude;
          vec2 latitudeSinCos = vec2(sinLatitude, cosLatitude);
          // XYZ rows grow from north to south, while Three.js image textures
          // use v=1 at the visual top. Flip only V after applying the ancestor
          // sub-rectangle so exact tiles and fallback tiles share one convention.
          vec2 xyzUv = uvOffset + uv * uvScale;
          v_uv = vec2(xyzUv.x, 1.0 - xyzUv.y);
          vec2 terrainUv = terrainUvOffset + uv * terrainUvScale;
          // Height arrays contain endpoint samples (257 samples / 256 cells).
          // Convert logical [0,1] coordinates to texel centres before linear
          // filtering; raw normalized UVs introduce a sub-texel parent/child
          // offset and can reopen a geometrically stitched edge.
          vec2 terrainSampleUv = 0.5 * terrainTexelSize +
            terrainUv * (vec2(1.0) - terrainTexelSize);
          v_terrainUv = terrainSampleUv;
          float fineHeight = hasTerrain
            ? texture2D(terrainTexture, terrainSampleUv).r * terrainExaggeration
            : 0.0;
          // CPU terrain stitching gives adjacent tiles one shared geographic
          // edge. Do not replace that edge with this tile's unrelated parent.
          float heightMeters = fineHeight;
          if (hasTerrain) heightMeters -= skirt * terrainSkirtDepth;
          v_globeNormal = normalize(vec3(
            cosLatitude * longitudeSinCos.x,
            sinLatitude,
            cosLatitude * longitudeSinCos.y
          ));
          if (sag_useLocalCoordinates) {
            float deltaLatitude =
              tileLatitudeSinCos.y * deltaMercator -
              0.5 * tileLatitudeSinCos.x * tileLatitudeSinCos.y *
                deltaMercator * deltaMercator;
            float latitudeMidpoint = 0.5 * deltaLatitude;
            float midpointCosLatitude =
              tileLatitudeSinCos.y * cos(latitudeMidpoint) -
              tileLatitudeSinCos.x * sin(latitudeMidpoint);
            float eastMeters =
              sag_curvatureRadii.x * midpointCosLatitude * deltaLongitude;
            float northMeters = sag_curvatureRadii.y * deltaLatitude;
            float upMeters = -0.5 * (
              eastMeters * eastMeters / sag_curvatureRadii.x +
              northMeters * northMeters / sag_curvatureRadii.y
            );
            vec3 localWorld =
              sag_east * eastMeters +
              sag_north * northMeters +
              sag_up * (upMeters + heightMeters);
            gl_Position = sag_projectLocalToEye(
              localWorld,
              sag_originHigh,
              sag_originLow
            );
          } else {
            gl_Position = sag_projectGeodeticTrig(
              longitudeSinCos,
              latitudeSinCos,
              heightMeters
            );
          }
          #include <logdepthbuf_vertex>
        }
      `,fragmentShader:`
        varying vec2 v_uv;
        varying vec3 v_globeNormal;
        varying vec2 v_terrainUv;
        uniform sampler2D tileTexture;
        uniform sampler2D terrainTexture;
        uniform bool hasTexture;
        uniform float layerOpacity;
        uniform bool isOverlay;
        uniform bool hasTerrain;
        uniform float terrainExaggeration;
        uniform vec2 terrainTexelSize;
        uniform vec2 terrainMetersPerTexel;
        uniform vec3 placeholder;
        #include <logdepthbuf_pars_fragment>
        void main() {
          vec4 texel = hasTexture
            ? texture2D(tileTexture, v_uv)
            : vec4(placeholder, isOverlay ? 0.0 : 1.0);
          if (texel.a * layerOpacity < 0.002) discard;
          vec3 color = texel.rgb;
          float daylight = 0.86 + 0.14 * max(
            dot(normalize(v_globeNormal), normalize(vec3(-0.35, 0.55, 1.0))),
            0.0
          );
          if (hasTerrain && !isOverlay) {
            float westHeight = texture2D(terrainTexture, v_terrainUv - vec2(terrainTexelSize.x, 0.0)).r;
            float eastHeight = texture2D(terrainTexture, v_terrainUv + vec2(terrainTexelSize.x, 0.0)).r;
            float northHeight = texture2D(terrainTexture, v_terrainUv - vec2(0.0, terrainTexelSize.y)).r;
            float southHeight = texture2D(terrainTexture, v_terrainUv + vec2(0.0, terrainTexelSize.y)).r;
            float slopeEast = (eastHeight - westHeight) * terrainExaggeration /
              max(1.0, 2.0 * terrainMetersPerTexel.x);
            float slopeNorth = (northHeight - southHeight) * terrainExaggeration /
              max(1.0, 2.0 * terrainMetersPerTexel.y);
            vec3 terrainNormal = normalize(vec3(-slopeEast, -slopeNorth, 1.0));
            float relief = 0.78 + 0.30 * max(
              dot(terrainNormal, normalize(vec3(-0.45, 0.55, 0.78))),
              0.0
            );
            daylight *= relief;
          }
          if (!isOverlay) {
            color = min(color * 1.24 * daylight + vec3(0.025, 0.04, 0.055), vec3(1.0));
          }
          gl_FragColor = vec4(color, texel.a * layerOpacity);
          #include <logdepthbuf_fragment>
          #include <colorspace_fragment>
        }
      `,transparent:this.overlay||this.layerOpacity<1,depthWrite:!this.overlay,depthTest:!0,toneMapped:!1})}queueVisibleTextures(e){var t,n;this.visibleTextureKeys.clear(),this.desiredMinimumLevel=null,this.desiredMaximumLevel=null;for(const s of this.textures.values())s.state==="queued"&&(s.priority=Number.POSITIVE_INFINITY);const r=[...e].sort((s,a)=>a.id.level-s.id.level||a.screenPixels-s.screenPixels);for(let s=0;s<r.length;s+=1){const a=r[s];if(!a)continue;const o=Math.min(0,Math.round(this.provider.levelOffset??0)),l=Math.min(((n=(t=this.provider).maximumSourceLevel)==null?void 0:n.call(t,a.id.level))??a.id.level+o,this.provider.maxLevel,a.id.level);if(l<this.provider.minLevel)continue;this.desiredMinimumLevel=this.desiredMinimumLevel===null?l:Math.min(this.desiredMinimumLevel,l),this.desiredMaximumLevel=this.desiredMaximumLevel===null?l:Math.max(this.desiredMaximumLevel,l);const c=Bh(a.id,l);this.visibleTextureKeys.add(Pt(c)),this.queueTexture(c,s);const u=this.findReadyAncestor(a.id);if(u)this.visibleTextureKeys.add(u.key);else{const h=Math.max(this.provider.minLevel,l-3),d=Bh(a.id,h);this.visibleTextureKeys.add(Pt(d)),this.queueTexture(d,s-r.length*2)}}for(const[s,a]of this.textures)this.visibleTextureKeys.has(s)||a.state==="loading"||a.state==="ready"||this.textures.delete(s)}queueTexture(e,t){const n=Pt(e),r=this.textures.get(n);if(r){r.lastUsedFrame=this.frame,r.state==="queued"&&(r.priority=Math.min(r.priority,t));return}this.textures.set(n,{id:e,key:n,state:"queued",priority:t,lastUsedFrame:this.frame,texture:null,byteSize:0,attempts:0,retryAt:0})}pumpQueue(){if(this.suspended||this.disposed)return;const e=this.provider.estimatedTextureBytes??Wf(256),t=this.maxConcurrentRequests*e;for(;this.activeRequests<this.maxConcurrentRequests;){if(this.residentTextureBytes()+(this.activeRequests+1)*e>this.maxTextureBytes+t)return;let n;const r=performance.now();for(const s of this.textures.values())s.state==="error"&&this.visibleTextureKeys.has(s.key)&&s.retryAt<=r&&(s.state="queued"),!(s.state!=="queued"||s.retryAt>r)&&(!n||s.priority<n.priority)&&(n=s);if(!n)return;this.load(n)}}load(e){e.state="loading",this.activeRequests+=1;const t=this.provider;if(t.loadTexture){t.loadTexture(e.id).then(n=>this.completeTextureLoad(e,t,n),n=>this.failTextureLoad(e,t,n));return}this.loader.load(t.url(e.id),n=>this.completeTextureLoad(e,t,n),void 0,n=>this.failTextureLoad(e,t,n))}completeTextureLoad(e,t,n){if(this.activeRequests=Math.max(0,this.activeRequests-1),this.disposed||this.provider!==t||this.textures.get(e.key)!==e){this.releaseTexture(n),this.pumpQueue();return}n.colorSpace=qt,n.wrapS=ci,n.wrapT=ci,n.minFilter=wn,n.magFilter=wt,n.anisotropy=this.maxAnisotropy,e.texture=n,e.byteSize=ub(n,this.provider.estimatedTextureBytes),e.state="ready",e.attempts=0,e.retryAt=0,e.lastUsedFrame=this.frame,this.materialsDirty=!0,this.pumpQueue()}failTextureLoad(e,t,n){this.activeRequests=Math.max(0,this.activeRequests-1),!this.disposed&&this.provider===t&&this.textures.get(e.key)===e&&(e.state="error",e.attempts+=1,e.retryAt=performance.now()+Math.min(3e4,1e3*2**(e.attempts-1)),this.lastError=ob(n),this.warnedProviderId!==t.id&&(this.warnedProviderId=t.id,console.warn(`[影像图层 ${t.id}] ${this.lastError}`))),this.pumpQueue()}syncMaterials(e){var t;this.fallbackCount=0,this.displayedMinimumLevel=null,this.displayedMaximumLevel=null;for(const n of e){const r=this.renderTiles.get(Pt(n.id));if(!r)continue;const s=this.findReadyAncestor(n.id),a=(s==null?void 0:s.key)??"";s&&s.id.level<n.id.level&&(this.fallbackCount+=1),s&&(this.displayedMinimumLevel=this.displayedMinimumLevel===null?s.id.level:Math.min(this.displayedMinimumLevel,s.id.level),this.displayedMaximumLevel=this.displayedMaximumLevel===null?s.id.level:Math.max(this.displayedMaximumLevel,s.id.level));const o=r.mesh.material.uniforms;if(!o)continue;if(a!==r.textureKey){r.textureKey=a,o.tileTexture.value=(s==null?void 0:s.texture)??null,o.hasTexture.value=s!==void 0;const _=s?n.id.level-s.id.level:0,v=1/2**_,m=s?n.id.x-s.id.x*2**_:0,p=s?n.id.y-s.id.y*2**_:0;o.uvScale.value.set(v,v),o.uvOffset.value.set(m*v,p*v)}const l=(t=this.terrain)==null?void 0:t.resolveTexture(n.id),c=l?`${l.key}|${l.parentKey}`:"";if(c===r.terrainKey)continue;r.terrainKey=c,o.terrainTexture.value=(l==null?void 0:l.texture)??null,o.terrainParentTexture.value=(l==null?void 0:l.parentTexture)??null,o.hasTerrain.value=l!==void 0,o.hasTerrainParent.value=(l==null?void 0:l.parentTexture)!==null&&(l==null?void 0:l.parentTexture)!==void 0,o.terrainUvScale.value.setScalar((l==null?void 0:l.scale)??1),o.terrainUvOffset.value.set((l==null?void 0:l.offsetX)??0,(l==null?void 0:l.offsetY)??0),o.terrainParentUvScale.value.setScalar((l==null?void 0:l.parentScale)??1),o.terrainParentUvOffset.value.set((l==null?void 0:l.parentOffsetX)??0,(l==null?void 0:l.parentOffsetY)??0),o.terrainTexelSize.value.set(1/((l==null?void 0:l.width)??1),1/((l==null?void 0:l.height)??1));const u=2**((l==null?void 0:l.sourceLevel)??n.id.level),h=Math.PI-(n.id.y+.5)/2**n.id.level*Math.PI*2,d=1/Math.cosh(h),f=Math.PI*2*this.ellipsoid.equatorialRadius;o.terrainMetersPerTexel.value.set(f*d/(u*((l==null?void 0:l.width)??1)),f*d/(u*((l==null?void 0:l.height)??1)))}}findReadyAncestor(e){var t,n;const r=Math.min(0,Math.round(this.provider.levelOffset??0)),s=Math.min(((n=(t=this.provider).maximumSourceLevel)==null?void 0:n.call(t,e.level))??e.level+r,this.provider.maxLevel,e.level);for(let a=s;a>=this.provider.minLevel;a-=1){const o=e.level-a,l=this.textures.get(Pt({level:a,x:Math.floor(e.x/2**o),y:Math.floor(e.y/2**o)}));if((l==null?void 0:l.state)==="ready"&&l.texture)return l.lastUsedFrame=this.frame,l}}evictTextures(){if(this.suspended)return;const e=this.residentTextureBytes();if(this.textures.size<=this.maxCachedTiles&&e<=this.maxTextureBytes)return;const t=new Set([...this.renderTiles.values()].map(s=>s.textureKey).filter(Boolean)),n=[...this.textures.values()].filter(s=>s.state!=="loading"&&!t.has(s.key)).sort((s,a)=>s.lastUsedFrame-a.lastUsedFrame);let r=e;for(;this.textures.size>this.maxCachedTiles||r>this.maxTextureBytes;){const s=n.shift();if(!s)break;this.releaseTexture(s.texture),r-=s.byteSize,this.textures.delete(s.key)}}residentTextureBytes(){let e=0;for(const t of this.textures.values())t.state==="ready"&&(e+=t.byteSize);return e}releaseTexture(e){e&&!this.suspended&&e.dispose()}}function ob(i){return(i instanceof Error?i.message:String(i??"纹理请求失败")).replace(/([?&](?:key|token|access_token)=)[^&\s]+/gi,"$1***")}function Bh(i,e){const t=Math.max(0,i.level-e);return{level:e,x:Math.floor(i.x/2**t),y:Math.floor(i.y/2**t)}}function lb(i){const e=Math.max(2,Math.round(i)),t=[],n=[],r=[],s=[];for(let u=0;u<=e;u+=1)for(let h=0;h<=e;h+=1)t.push(h/e,u/e,0),n.push(h/e,u/e),s.push(0);const a=e+1;for(let u=0;u<e;u+=1)for(let h=0;h<e;h+=1){const d=u*a+h,f=d+1,_=d+a,v=_+1;r.push(d,_,f,f,_,v)}const o=[];for(let u=0;u<=e;u+=1)o.push(u);for(let u=1;u<=e;u+=1)o.push(u*a+e);for(let u=e-1;u>=0;u-=1)o.push(e*a+u);for(let u=e-1;u>=1;u-=1)o.push(u*a);const l=t.length/3;for(const u of o)t.push(t[u*3]??0,t[u*3+1]??0,0),n.push(n[u*2]??0,n[u*2+1]??0),s.push(1);for(let u=0;u<o.length;u+=1){const h=(u+1)%o.length,d=o[u],f=o[h],_=l+u,v=l+h;r.push(d,_,f,f,_,v)}const c=new ni;return c.setAttribute("position",new At(t,3)),c.setAttribute("uv",new At(n,2)),c.setAttribute("skirt",new At(s,1)),c.setIndex(r),c}function cb(i){return new et().setHSL(.53,.56,Math.min(.3,.19+i*.009))}function Wf(i){return Math.ceil(i*i*4*4/3)}function ub(i,e){const t=i.image,n=(t==null?void 0:t.naturalWidth)??(t==null?void 0:t.width)??0,r=(t==null?void 0:t.naturalHeight)??(t==null?void 0:t.height)??0;return n>0&&r>0?Math.ceil(n*r*4*4/3):e??Wf(256)}function qo(i,e,t){e.set(Math.fround(i.x),Math.fround(i.y),Math.fround(i.z)),t.set(i.x-e.x,i.y-e.y,i.z-e.z)}class hb{constructor(e,t,n={}){L(this,"object3d",new Mr),L(this,"provider"),L(this,"exaggeration"),L(this,"ellipsoid"),L(this,"baseSegments"),L(this,"maxConcurrentRequests"),L(this,"maxCachedTiles"),L(this,"maxResourceBytes"),L(this,"showDebugSurface"),L(this,"geometries",new Map),L(this,"records",new Map),L(this,"renderTiles",new Map),L(this,"visibleKeys",new Set),L(this,"cameraHigh",new U),L(this,"cameraLow",new U),L(this,"frame",0),L(this,"activeRequests",0),L(this,"fallbackCount",0),L(this,"disposed",!1),L(this,"suspended",!1),L(this,"enabled",!0),L(this,"_revision",0),L(this,"lastSelection",null),L(this,"materialsDirty",!0),L(this,"stitchedEdges",0),L(this,"coverageReady",!1),this.ellipsoid=e,this.provider=t,this.baseSegments=Math.max(16,Math.round(n.segments??64)),this.maxConcurrentRequests=Math.max(1,Math.round(n.maxConcurrentRequests??6)),this.maxCachedTiles=Math.max(32,Math.round(n.maxCachedTiles??384)),this.maxResourceBytes=Math.max(16*1024*1024,Math.round(n.maxResourceBytes??96*1024*1024)),this.exaggeration=Math.max(0,n.exaggeration??1),this.showDebugSurface=n.showDebugSurface??!1,this.object3d.renderOrder=0}get revision(){return this._revision}get stats(){const e={ready:0,loading:0,queued:0,errors:0};for(const t of this.records.values())t.state==="error"?e.errors+=1:e[t.state]+=1;return{...e,fallbacks:this.fallbackCount,resourceBytes:this.residentResourceBytes(),stitchedEdges:this.stitchedEdges,coverageReady:this.coverageReady}}update(e,t){if(this.disposed)return this.stats;if(t&&$o(t,this.cameraHigh,this.cameraLow),!this.enabled)return this.stats;const n=e!==this.lastSelection;return n&&(this.frame+=1,this.lastSelection=e,this.showDebugSurface&&this.syncRenderTiles(e),this.queueVisibleTiles(e)),(n||this.materialsDirty)&&this.refreshCoverage(e),this.pumpQueue(),this.showDebugSurface&&(n||this.materialsDirty)&&this.syncMaterials(e),(n||this.materialsDirty)&&(this.evictTiles(),this.materialsDirty=!1),this.stats}resolveTexture(e){var t;if(!this.enabled||!this.coverageReady)return;const n=this.findReadyAncestor(e);if(!(n!=null&&n.data))return;const r=e.level-n.id.level,s=1/2**r,a=this.findReadyAncestor(e,n.id.level-1),o=a?e.level-a.id.level:0,l=a?1/2**o:1;return{key:n.key,texture:n.data.texture,scale:s,offsetX:(e.x-n.id.x*2**r)*s,offsetY:(e.y-n.id.y*2**r)*s,sourceLevel:n.id.level,width:n.data.width,height:n.data.height,parentKey:(a==null?void 0:a.key)??"",parentTexture:((t=a==null?void 0:a.data)==null?void 0:t.texture)??null,parentScale:l,parentOffsetX:a?(e.x-a.id.x*2**o)*l:0,parentOffsetY:a?(e.y-a.id.y*2**o)*l:0}}sampleHeight(e,t){if(!this.enabled)return null;const n=ue.clamp(t,-Rn,Rn);for(let r=this.provider.maxLevel;r>=this.provider.minLevel;r-=1){const s=2**r,a=((e+180)/360*s%s+s)%s,o=(1-Math.asinh(Math.tan(ue.degToRad(n)))/Math.PI)*.5*s,l=Math.min(s-1,Math.floor(a)),c=Math.min(s-1,Math.max(0,Math.floor(o))),u=this.records.get(Pt({level:r,x:l,y:c}));if(!((u==null?void 0:u.state)!=="ready"||!u.data))return u.lastUsedFrame=this.frame,Vf(u.data,a-l,o-c)*this.exaggeration}return null}maximumHeight(e){if(!this.enabled)return 0;const t=this.heightRange(e);return t?Math.max(0,t.maximumHeight):null}heightRange(e){if(!this.enabled)return{minimumHeight:0,maximumHeight:0};const t=this.findReadyAncestor(e);return t!=null&&t.data?{minimumHeight:t.data.minimumHeight*this.exaggeration-2,maximumHeight:t.data.maximumHeight*this.exaggeration+2}:null}dispose(){var e;if(!this.disposed){this.disposed=!0;for(const t of this.renderTiles.values())t.mesh.material.dispose();for(const t of this.records.values())this.releaseTexture((e=t.data)==null?void 0:e.texture);for(const t of this.geometries.values())t.dispose();this.renderTiles.clear(),this.records.clear(),this.geometries.clear(),this.object3d.clear()}}setEnabled(e){this.enabled!==e&&(this.enabled=e,this.object3d.visible=e,this.lastSelection=null,this.materialsDirty=!0,this.coverageReady=!e,this._revision+=1)}handleContextLost(){this.suspended=!0}handleContextRestored(){this.suspended=!1;for(const e of this.records.values())e.data&&(e.data.texture.needsUpdate=!0);for(const e of this.renderTiles.values())e.mesh.material.needsUpdate=!0;this.materialsDirty=!0,this.pumpQueue()}syncRenderTiles(e){const t=new Set(e.map(n=>Pt(n.id)));for(const[n,r]of this.renderTiles)t.has(n)||(this.object3d.remove(r.mesh),r.mesh.material.dispose(),this.renderTiles.delete(n));for(const n of e){const r=Pt(n.id);if(this.renderTiles.has(r))continue;const s=new ii(this.geometryForLevel(n.id.level),this.createMaterial(n.id));s.frustumCulled=!1,s.renderOrder=0,s.onBeforeRender=(a,o,l)=>{$o(l.position,this.cameraHigh,this.cameraLow)},this.renderTiles.set(r,{mesh:s,terrainKey:""}),this.object3d.add(s)}}geometryForLevel(e){const t=Math.max(this.baseSegments,Math.round(1024/2**e));let n=this.geometries.get(t);return n||(n=fb(t),this.geometries.set(t,n)),n}queueVisibleTiles(e){this.visibleKeys.clear();for(const n of this.records.values())n.state==="queued"&&(n.priority=Number.POSITIVE_INFINITY);const t=[...e].sort((n,r)=>r.id.level-n.id.level||r.screenPixels-n.screenPixels);for(let n=0;n<t.length;n+=1){const r=t[n];if(!r)continue;const s=Math.min(r.id.level,this.provider.maxLevel);if(s<this.provider.minLevel)continue;const a=Math.max(this.provider.minLevel,s-2);for(let l=a;l<=s;l+=1){const c=db(r.id,l);this.visibleKeys.add(Pt(c)),this.queueTile(c,(l-this.provider.minLevel)*t.length+n)}const o=this.findReadyAncestor(r.id);o&&this.visibleKeys.add(o.key)}for(const[n,r]of this.records)this.visibleKeys.has(n)||r.state==="ready"||r.state==="loading"||this.records.delete(n)}refreshCoverage(e){this.coverageReady=e.length===0||e.every(t=>Math.min(t.id.level,this.provider.maxLevel)<this.provider.minLevel?!0:this.findReadyAncestor(t.id)!==void 0)}queueTile(e,t){const n=Pt(e),r=this.records.get(n);if(r){r.lastUsedFrame=this.frame,r.state==="queued"&&(r.priority=Math.min(r.priority,t));return}this.records.set(n,{id:e,key:n,state:"queued",priority:t,lastUsedFrame:this.frame,data:null})}pumpQueue(){if(!(!this.enabled||this.suspended||this.disposed))for(;this.activeRequests<this.maxConcurrentRequests;){if(this.residentResourceBytes()>=this.maxResourceBytes)return;let e;for(const t of this.records.values())t.state==="queued"&&(!e||t.priority<e.priority)&&(e=t);if(!e)return;this.load(e)}}load(e){e.state="loading",this.activeRequests+=1,this.provider.loadTile(e.id).then(t=>{this.activeRequests=Math.max(0,this.activeRequests-1),this.disposed||this.records.get(e.key)!==e?this.releaseTexture(t.texture):(e.data=t,e.state="ready",e.lastUsedFrame=this.frame,this.stitchLoadedTerrain(e),this._revision+=1,this.materialsDirty=!0),this.pumpQueue()},()=>{this.activeRequests=Math.max(0,this.activeRequests-1),!this.disposed&&this.records.get(e.key)===e&&(e.state="error"),this.pumpQueue()})}syncMaterials(e){this.fallbackCount=0;for(const t of e){const n=this.renderTiles.get(Pt(t.id));if(!n)continue;const r=this.resolveTexture(t.id);r&&r.key.split("/")[0]!==String(t.id.level)&&(this.fallbackCount+=1);const s=(r==null?void 0:r.key)??"";if(s===n.terrainKey)continue;n.terrainKey=s;const a=n.mesh.material.uniforms;a.terrainTexture.value=(r==null?void 0:r.texture)??null,a.hasTerrain.value=r!==void 0,a.terrainUvScale.value.setScalar((r==null?void 0:r.scale)??1),a.terrainUvOffset.value.set((r==null?void 0:r.offsetX)??0,(r==null?void 0:r.offsetY)??0),a.terrainTexelSize.value.set(1/((r==null?void 0:r.width)??1),1/((r==null?void 0:r.height)??1))}}findReadyAncestor(e,t=Math.min(e.level,this.provider.maxLevel)){const n=Math.min(e.level,this.provider.maxLevel,t);for(let r=n;r>=this.provider.minLevel;r-=1){const s=e.level-r,a=this.records.get(Pt({level:r,x:Math.floor(e.x/2**s),y:Math.floor(e.y/2**s)}));if((a==null?void 0:a.state)==="ready"&&a.data)return a.lastUsedFrame=this.frame,a}}evictTiles(){var e;if(this.suspended)return;let t=this.residentResourceBytes();if(this.records.size<=this.maxCachedTiles&&t<=this.maxResourceBytes)return;const n=new Set(this.visibleKeys);for(const s of this.renderTiles.values())s.terrainKey&&n.add(s.terrainKey);const r=[...this.records.values()].filter(s=>s.state!=="loading"&&!n.has(s.key)).sort((s,a)=>s.lastUsedFrame-a.lastUsedFrame);for(;this.records.size>this.maxCachedTiles||t>this.maxResourceBytes;){const s=r.shift();if(!s)break;this.releaseTexture((e=s.data)==null?void 0:e.texture),t-=zh(s.data),this.records.delete(s.key)}}residentResourceBytes(){let e=0;for(const t of this.records.values())e+=zh(t.data);return e}releaseTexture(e){e&&!this.suspended&&e.dispose()}stitchLoadedTerrain(e){if(!e.data)return;const t=new Map,n=[];let r;for(const a of this.records.values()){if(a.state!=="ready"||!a.data)continue;const o={id:a.id,data:a.data};n.push(o),t.set(o,a),a===e&&(r=o)}if(!r)return;const s=Wy(r,n);this.stitchedEdges+=s.stitchedEdges;for(const a of s.modified){const o=t.get(a),l=s.bounds.get(a);!(o!=null&&o.data)||!l||(o.data={...o.data,minimumHeight:l.minimumHeight,maximumHeight:l.maximumHeight})}}createMaterial(e){const t=2**e.level,n=-Math.PI+(e.x+.5)/t*Math.PI*2,r=Math.PI*2/t,s=Math.PI-(e.y+.5)/t*Math.PI*2,a=-Math.PI*2/t,o=Math.atan(Math.sinh(s)),l=Math.sin(n),c=Math.cos(n),u=Math.sin(o),h=Math.cos(o),d=this.ellipsoid.cartographicToCartesian({longitude:ue.radToDeg(n),latitude:ue.radToDeg(o)}),f=new U,_=new U;$o(d,f,_);const v=this.ellipsoid.equatorialRadius,m=this.ellipsoid.polarRadius,p=1-m*m/(v*v),b=1-p*u*u;return new ui({uniforms:{sag_ellipsoidRadii:{value:new Fe(this.ellipsoid.equatorialRadius,this.ellipsoid.polarRadius)},sag_heightOffset:{value:0},sag_cameraHigh:{value:this.cameraHigh},sag_cameraLow:{value:this.cameraLow},sag_originHigh:{value:f},sag_originLow:{value:_},sag_east:{value:new U(c,0,-l)},sag_north:{value:new U(-u*l,h,-u*c)},sag_up:{value:new U(h*l,u,h*c)},sag_curvatureRadii:{value:new Fe(v/Math.sqrt(b),v*(1-p)/b**1.5)},sag_useLocalCoordinates:{value:e.level>=18},tileLongitudeSinCos:{value:new Fe(l,c)},tileLongitudeSpan:{value:r},tileLatitudeSinCos:{value:new Fe(u,h)},tileMercatorSinhCosh:{value:new Fe(Math.sinh(s),Math.cosh(s))},tileMercatorSpan:{value:a},terrainTexture:{value:null},terrainUvScale:{value:new Fe(1,1)},terrainUvOffset:{value:new Fe(0,0)},terrainTexelSize:{value:new Fe(1,1)},hasTerrain:{value:!1},terrainExaggeration:{value:this.exaggeration}},vertexShader:`
        varying vec3 v_globeNormal;
        varying float v_height;
        uniform vec3 sag_originHigh;
        uniform vec3 sag_originLow;
        uniform vec3 sag_east;
        uniform vec3 sag_north;
        uniform vec3 sag_up;
        uniform vec2 sag_curvatureRadii;
        uniform bool sag_useLocalCoordinates;
        uniform vec2 tileLongitudeSinCos;
        uniform float tileLongitudeSpan;
        uniform vec2 tileLatitudeSinCos;
        uniform vec2 tileMercatorSinhCosh;
        uniform float tileMercatorSpan;
        uniform sampler2D terrainTexture;
        uniform vec2 terrainUvScale;
        uniform vec2 terrainUvOffset;
        uniform vec2 terrainTexelSize;
        uniform bool hasTerrain;
        uniform float terrainExaggeration;
        #include <common>
        #include <logdepthbuf_pars_vertex>
        ${Dc}
        void main() {
          float deltaLongitude = (position.x - 0.5) * tileLongitudeSpan;
          vec2 longitudeSinCos = vec2(
            tileLongitudeSinCos.x * cos(deltaLongitude) + tileLongitudeSinCos.y * sin(deltaLongitude),
            tileLongitudeSinCos.y * cos(deltaLongitude) - tileLongitudeSinCos.x * sin(deltaLongitude)
          );
          float deltaMercator = (position.y - 0.5) * tileMercatorSpan;
          float sinhDelta = 0.5 * (exp(deltaMercator) - exp(-deltaMercator));
          float coshDelta = 0.5 * (exp(deltaMercator) + exp(-deltaMercator));
          float sinhMercator = tileMercatorSinhCosh.x * coshDelta + tileMercatorSinhCosh.y * sinhDelta;
          float cosLatitude = inversesqrt(1.0 + sinhMercator * sinhMercator);
          float sinLatitude = sinhMercator * cosLatitude;
          vec2 terrainUv = terrainUvOffset + uv * terrainUvScale;
          vec2 terrainSampleUv = 0.5 * terrainTexelSize +
            terrainUv * (vec2(1.0) - terrainTexelSize);
          float heightMeters = hasTerrain
            ? texture2D(terrainTexture, terrainSampleUv).r * terrainExaggeration
            : 0.0;
          v_height = heightMeters;
          v_globeNormal = normalize(vec3(cosLatitude * longitudeSinCos.x, sinLatitude, cosLatitude * longitudeSinCos.y));
          if (sag_useLocalCoordinates) {
            float deltaLatitude =
              tileLatitudeSinCos.y * deltaMercator -
              0.5 * tileLatitudeSinCos.x * tileLatitudeSinCos.y * deltaMercator * deltaMercator;
            float latitudeMidpoint = 0.5 * deltaLatitude;
            float midpointCosLatitude =
              tileLatitudeSinCos.y * cos(latitudeMidpoint) -
              tileLatitudeSinCos.x * sin(latitudeMidpoint);
            float eastMeters = sag_curvatureRadii.x * midpointCosLatitude * deltaLongitude;
            float northMeters = sag_curvatureRadii.y * deltaLatitude;
            float upMeters = -0.5 * (
              eastMeters * eastMeters / sag_curvatureRadii.x +
              northMeters * northMeters / sag_curvatureRadii.y
            );
            vec3 localWorld =
              sag_east * eastMeters +
              sag_north * northMeters +
              sag_up * (upMeters + heightMeters);
            gl_Position = sag_projectLocalToEye(localWorld, sag_originHigh, sag_originLow);
          } else {
            gl_Position = sag_projectGeodeticTrig(
              longitudeSinCos,
              vec2(sinLatitude, cosLatitude),
              heightMeters
            );
          }
          #include <logdepthbuf_vertex>
        }
      `,fragmentShader:`
        varying vec3 v_globeNormal;
        varying float v_height;
        #include <logdepthbuf_pars_fragment>
        void main() {
          float light = 0.55 + 0.45 * max(dot(normalize(v_globeNormal), normalize(vec3(-0.35, 0.55, 1.0))), 0.0);
          float elevation = clamp((v_height + 500.0) / 5000.0, 0.0, 1.0);
          vec3 base = mix(vec3(0.08, 0.20, 0.16), vec3(0.42, 0.38, 0.29), elevation);
          gl_FragColor = vec4(base * light, 1.0);
          #include <logdepthbuf_fragment>
          #include <colorspace_fragment>
        }
      `,depthWrite:!0,depthTest:!0,toneMapped:!1})}}function zh(i){return i?i.heights.byteLength+i.width*i.height*4:0}function db(i,e){const t=Math.max(0,i.level-e);return{level:e,x:Math.floor(i.x/2**t),y:Math.floor(i.y/2**t)}}function fb(i){const e=Math.max(2,Math.round(i)),t=[],n=[],r=[];for(let o=0;o<=e;o+=1)for(let l=0;l<=e;l+=1)t.push(l/e,o/e,0),n.push(l/e,o/e);const s=e+1;for(let o=0;o<e;o+=1)for(let l=0;l<e;l+=1){const c=o*s+l,u=c+1,h=c+s,d=h+1;r.push(c,h,u,u,h,d)}const a=new ni;return a.setAttribute("position",new At(t,3)),a.setAttribute("uv",new At(n,2)),a.setIndex(r),a}function $o(i,e,t){e.set(Math.fround(i.x),Math.fround(i.y),Math.fround(i.z)),t.set(i.x-e.x,i.y-e.y,i.z-e.z)}class pb{constructor(e,t,n=Ya.WGS84,r){L(this,"target",new U),L(this,"enabled",!0),L(this,"enableDamping",!0),L(this,"dampingFactor",.1),L(this,"orbitSpeed",.38),L(this,"lookSpeed",1),L(this,"tiltSpeed",1),L(this,"zoomSpeed",.42),L(this,"minDistance",1),L(this,"maxDistance",Number.POSITIVE_INFINITY),L(this,"minimumTiltDegrees",0),L(this,"maximumTiltDegrees",85),L(this,"camera"),L(this,"element"),L(this,"ellipsoid"),L(this,"coordinates"),L(this,"terrain"),L(this,"pointer",new Fe),L(this,"orbitVelocity",new Fe),L(this,"lookVelocity",new Fe),L(this,"tiltVelocity",0),L(this,"zoomVelocity",0),L(this,"pointerId",null),L(this,"dragMode",null),L(this,"animation",null),L(this,"terrainRevision",-1),L(this,"disposed",!1),L(this,"onPointerDown",s=>{if(!this.enabled||this.pointerId!==null)return;const a=mb(s.button);a&&(s.preventDefault(),this.cancelAnimation(),this.pointerId=s.pointerId,this.dragMode=a,this.pointer.set(s.clientX,s.clientY),this.element.setPointerCapture(s.pointerId))}),L(this,"onPointerMove",s=>{if(!this.enabled||s.pointerId!==this.pointerId||!this.dragMode)return;s.preventDefault();const a=s.clientX-this.pointer.x,o=s.clientY-this.pointer.y;if(this.pointer.set(s.clientX,s.clientY),this.dragMode==="globe"){const l=this.globeOrbitRadiansPerPixel();this.orbitVelocity.x+=-a*l*this.inputGain(),this.orbitVelocity.y+=-o*l*this.inputGain()}else this.dragMode==="look"?(this.lookVelocity.x+=-a*.003*this.lookSpeed*this.inputGain(),this.lookVelocity.y+=-o*.003*this.lookSpeed*this.inputGain()):this.tiltVelocity+=-o*.003*this.tiltSpeed*this.inputGain()}),L(this,"onPointerUp",s=>{s.pointerId===this.pointerId&&(this.element.hasPointerCapture(s.pointerId)&&this.element.releasePointerCapture(s.pointerId),this.pointerId=null,this.dragMode=null)}),L(this,"onWheel",s=>{if(!this.enabled)return;s.preventDefault(),this.cancelAnimation();const a=gb(s);this.zoomVelocity+=ue.clamp(a,-4,4)*this.zoomSpeed*this.inputGain()}),L(this,"onContextMenu",s=>s.preventDefault()),this.camera=e,this.element=t,this.ellipsoid=n,this.coordinates=new Nf(n),this.terrain=r,this.element.style.touchAction="none",this.element.addEventListener("pointerdown",this.onPointerDown),this.element.addEventListener("pointermove",this.onPointerMove),this.element.addEventListener("pointerup",this.onPointerUp),this.element.addEventListener("pointercancel",this.onPointerUp),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("contextmenu",this.onContextMenu)}update(e=performance.now()){var t;if(this.disposed)return!1;let n=this.updateAnimation(e);if(!this.enabled||this.animation)return n;this.orbitVelocity.lengthSq()>1e-22&&(n=this.orbitAroundGlobe(this.orbitVelocity.x,this.orbitVelocity.y)||n),this.lookVelocity.lengthSq()>1e-12&&(n=this.orbitAroundSurface(this.lookVelocity.x,this.lookVelocity.y)||n),Math.abs(this.tiltVelocity)>1e-7&&(n=this.tiltAroundSurface(this.tiltVelocity)||n),Math.abs(this.zoomVelocity)>1e-7&&(this.zoomAlongView(this.zoomVelocity),n=!0),this.enforceDistance(),this.decayVelocities();const r=this.terrain!==void 0&&this.terrain.revision!==this.terrainRevision;return(n||r||!this.validTarget())&&this.updateTargetFromView(),this.terrainRevision=((t=this.terrain)==null?void 0:t.revision)??-1,n}getViewState(){const e=this.coordinates.worldToGeodetic(this.camera.position),t=this.validTarget()??this.surfaceFocus();if(!t)return{cameraLongitude:e.longitude,cameraLatitude:e.latitude,cameraAltitude:e.height,focusLongitude:null,focusLatitude:null,heading:null,pitch:null};const n=this.coordinates.worldToGeodetic(t),r=this.localFrame(n.longitude,n.latitude),s=this.camera.getWorldDirection(new U),a=ue.radToDeg(Math.asin(ue.clamp(s.dot(r.up),-1,1))),o=_b(ue.radToDeg(Math.atan2(s.dot(r.east),s.dot(r.north))));return{cameraLongitude:e.longitude,cameraLatitude:e.latitude,cameraAltitude:e.height,focusLongitude:n.longitude,focusLatitude:n.latitude,heading:o,pitch:a}}flyTo(e){const t=this.destinationCamera(e),n=Math.max(0,e.duration??1800);if(this.resetVelocities(),n===0){this.camera.position.copy(t.position),this.camera.quaternion.copy(t.quaternion),this.camera.up.copy(t.up),this.target.copy(t.target),this.enforceDistance();return}this.animation={startTime:performance.now(),duration:n,startPosition:this.camera.position.clone(),endPosition:t.position,startQuaternion:this.camera.quaternion.clone(),endQuaternion:t.quaternion,startUp:this.camera.up.clone(),endUp:t.up,endTarget:t.target}}cancelAnimation(){this.animation=null}dispose(){this.disposed||(this.disposed=!0,this.element.removeEventListener("pointerdown",this.onPointerDown),this.element.removeEventListener("pointermove",this.onPointerMove),this.element.removeEventListener("pointerup",this.onPointerUp),this.element.removeEventListener("pointercancel",this.onPointerUp),this.element.removeEventListener("wheel",this.onWheel),this.element.removeEventListener("contextmenu",this.onContextMenu))}orbitAroundGlobe(e,t){const n=new bi().setFromAxisAngle(new U(0,1,0),e),r=new U(1,0,0).applyQuaternion(this.camera.quaternion).normalize(),s=new bi().setFromAxisAngle(r,t).multiply(n),a=this.camera.position.clone().applyQuaternion(s),o=Math.acos(ue.clamp(a.y/a.length(),-1,1));return o<.015||o>Math.PI-.015?(this.orbitVelocity.set(0,0),!1):(this.camera.position.copy(a),this.camera.quaternion.premultiply(s).normalize(),this.camera.up.applyQuaternion(s).normalize(),this.target.applyQuaternion(s),this.stabilizeHorizon(this.target,this.camera.up),!0)}tiltAroundSurface(e){return this.orbitAroundSurface(0,e)}orbitAroundSurface(e,t){const n=this.surfacePivot();if(!n)return!1;const r=this.surfaceNormal(n),s=this.camera.position.clone().sub(n),a=new bi().setFromAxisAngle(r,e),o=s.applyQuaternion(a),l=r.clone().cross(o.clone().normalize());if(l.lengthSq()<=1e-12){l.set(1,0,0).applyQuaternion(this.camera.quaternion).applyQuaternion(a).normalize();const m=o.clone().applyAxisAngle(l,1e-4).clone().negate().normalize(),p=r.clone().addScaledVector(m,-r.dot(m)).normalize(),b=this.camera.up.clone().applyQuaternion(a);b.addScaledVector(m,-b.dot(m)).normalize(),p.dot(b)<0&&l.negate()}else l.normalize();const c=Math.acos(ue.clamp(o.clone().normalize().dot(r),-1,1)),u=ue.degToRad(this.minimumTiltDegrees),h=ue.degToRad(this.maximumTiltDegrees);let d=t;c<u?d=t>0?Math.min(t,u-c):0:c>h?d=t<0?Math.max(t,h-c):0:d=ue.clamp(t,u-c,h-c),Math.abs(d)<1e-7&&(d=0),(d===0||Math.abs(d)<Math.abs(t)*.999)&&(this.lookVelocity.y=0,this.tiltVelocity=0);const f=new bi().setFromAxisAngle(l,d),_=o.clone().applyQuaternion(f);if(Math.abs(e)<1e-10&&Math.abs(d)<1e-10)return!1;this.camera.position.copy(n).add(_);const v=this.camera.up.clone().applyQuaternion(a).applyQuaternion(f);return this.stabilizeHorizon(n,v),this.target.copy(n),!0}tiltDegrees(e,t){return ue.radToDeg(Math.acos(ue.clamp(e.clone().normalize().dot(t),-1,1)))}zoomAlongView(e){const t=this.camera.getWorldDirection(new U),n=Math.max(.1,this.altitudeAboveSurface()),r=Math.exp(ue.clamp(e*.18,-.7,.7)),s=n*(r-1);this.camera.position.addScaledVector(t,-s)}updateAnimation(e){const t=this.animation;if(!t)return!1;const n=Math.max(0,e-t.startTime),r=ue.clamp(n/t.duration,0,1),s=r<.5?4*r*r*r:1-(-2*r+2)**3/2;return this.camera.position.lerpVectors(t.startPosition,t.endPosition,s),this.camera.quaternion.slerpQuaternions(t.startQuaternion,t.endQuaternion,s),this.camera.up.lerpVectors(t.startUp,t.endUp,s).normalize(),r>=1&&(this.target.copy(t.endTarget),this.animation=null,this.enforceDistance()),!0}destinationCamera(e){var t;const n=((t=this.terrain)==null?void 0:t.sampleHeight(e.longitude,e.latitude))??0,r=this.ellipsoid.cartographicToCartesian({longitude:e.longitude,latitude:e.latitude,height:n}),s=this.localFrame(e.longitude,e.latitude),a=ue.degToRad(e.heading??0),o=Math.max(-89.9,this.minimumTiltDegrees-90),l=Math.min(-.1,this.maximumTiltDegrees-90),c=ue.degToRad(ue.clamp(e.pitch??-90,o,Math.max(o,l))),u=s.north.clone().multiplyScalar(Math.cos(a)).addScaledVector(s.east,Math.sin(a)).multiplyScalar(Math.cos(c)).addScaledVector(s.up,Math.sin(c)).normalize(),h=n+Math.max(.1,e.altitude);let d=0,f=Math.max(1,Math.max(.1,e.altitude)/Math.max(.05,-u.dot(s.up)));for(;this.coordinates.worldToGeodetic(r.clone().addScaledVector(u,-f)).height<h&&f<this.ellipsoid.equatorialRadius*64;)f*=2;for(let T=0;T<36;T+=1){const M=(d+f)*.5;this.coordinates.worldToGeodetic(r.clone().addScaledVector(u,-M)).height<h?d=M:f=M}const _=f,v=r.clone().addScaledVector(u,-_),m=s.up.clone().addScaledVector(u,-s.up.dot(u));m.lengthSq()<=1e-10&&m.copy(s.north),m.normalize();const p=new _t().lookAt(v,r,m),b=new bi().setFromRotationMatrix(p);return{position:v,quaternion:b,up:m,target:r}}updateTargetFromView(){const e=this.surfaceFocus();e&&this.target.copy(e)}surfaceFocus(){const e=this.camera.getWorldDirection(new U),t=vb(this.camera.position,e,this.ellipsoid);if(!t)return this.validTarget();if(!this.terrain)return t;let n=0,r=this.camera.position.distanceTo(t);const s=this.coordinates.worldToGeodetic(this.camera.position),a=Math.max(0,this.terrain.sampleHeight(s.longitude,s.latitude)??0);if(s.height<=a)return this.validTarget()??t;for(let o=0;o<18;o+=1){const l=(n+r)*.5,c=this.camera.position.clone().addScaledVector(e,l),u=this.coordinates.worldToGeodetic(c),h=Math.max(0,this.terrain.sampleHeight(u.longitude,u.latitude)??0);u.height>h?n=l:r=l}return this.camera.position.clone().addScaledVector(e,r)}surfacePivot(){return this.validTarget()??this.surfaceFocus()}validTarget(){return this.target.length()>this.ellipsoid.polarRadius*.5?this.target.clone():null}enforceDistance(){const e=this.camera.position.length();let t=!1;e<this.minDistance?(this.camera.position.setLength(this.minDistance),t=!0):e>this.maxDistance&&(this.camera.position.setLength(this.maxDistance),t=!0),t&&this.target.lengthSq()>0&&this.stabilizeHorizon(this.target,this.camera.up)}stabilizeHorizon(e,t){const n=e.clone().sub(this.camera.position).normalize(),r=this.surfaceNormal(e),s=r.addScaledVector(n,-r.dot(n)),a=Math.sin(ue.degToRad(1))**2;if(s.lengthSq()<a&&s.copy(t).addScaledVector(n,-t.dot(n)),s.lengthSq()<=1e-10){const o=this.coordinates.worldToGeodetic(e);s.copy(this.localFrame(o.longitude,o.latitude).north)}this.camera.up.copy(s.normalize()),this.camera.lookAt(e)}altitudeAboveSurface(){var e;const t=this.coordinates.worldToGeodetic(this.camera.position),n=((e=this.terrain)==null?void 0:e.sampleHeight(t.longitude,t.latitude))??0;return t.height-Math.max(0,n)}surfaceNormal(e){const t=this.ellipsoid.equatorialRadius**2,n=this.ellipsoid.polarRadius**2;return new U(e.x/t,e.y/n,e.z/t).normalize()}localFrame(e,t){const n=ue.degToRad(e),r=ue.degToRad(t),s=Math.sin(n),a=Math.cos(n),o=Math.sin(r),l=Math.cos(r);return{east:new U(a,0,-s),north:new U(-o*s,l,-o*a),up:new U(l*s,o,l*a)}}decayVelocities(){if(!this.enableDamping){this.resetVelocities();return}const e=1-ue.clamp(this.dampingFactor,.01,1);this.orbitVelocity.multiplyScalar(e),this.lookVelocity.multiplyScalar(e),this.tiltVelocity*=e,this.zoomVelocity*=e,this.orbitVelocity.lengthSq()<1e-22&&this.orbitVelocity.set(0,0),this.lookVelocity.lengthSq()<1e-12&&this.lookVelocity.set(0,0),Math.abs(this.tiltVelocity)<1e-7&&(this.tiltVelocity=0),Math.abs(this.zoomVelocity)<1e-7&&(this.zoomVelocity=0)}inputGain(){return this.enableDamping?ue.clamp(this.dampingFactor,.01,1):1}globeOrbitRadiansPerPixel(){const e=Math.max(.05,this.altitudeAboveSurface()),t=Math.max(1,this.element.clientHeight),n=2*e*Math.tan(ue.degToRad(this.camera.fov)*.5)/t,r=Math.max(this.ellipsoid.polarRadius,this.target.length()),s=Math.max(.01,this.orbitSpeed)/.38;return ue.clamp(n/r*s,1e-11,.003*Math.max(.01,this.orbitSpeed))}resetVelocities(){this.orbitVelocity.set(0,0),this.lookVelocity.set(0,0),this.tiltVelocity=0,this.zoomVelocity=0}}function mb(i){return i===0?"globe":i===1?"tilt":i===2?"look":null}function gb(i){const e=i.deltaMode===WheelEvent.DOM_DELTA_LINE?16:i.deltaMode===WheelEvent.DOM_DELTA_PAGE?Math.max(1,window.innerHeight):1;return i.deltaY*e/100}function _b(i){return(i%360+360)%360}function vb(i,e,t){const n=new U(1/t.equatorialRadius,1/t.polarRadius,1/t.equatorialRadius),r=i.clone().multiply(n),s=e.clone().multiply(n),a=s.lengthSq(),o=2*r.dot(s),l=r.lengthSq()-1,c=o*o-4*a*l;if(c<0||a<=0)return null;const u=Math.sqrt(c),h=(-o-u)/(2*a),d=(-o+u)/(2*a),f=h>=0?h:d>=0?d:-1;return f>=0?i.clone().addScaledVector(e,f):null}class xb{constructor(e){L(this,"scene",new G_),L(this,"camera",new pi(50,1,.02,1e8)),L(this,"renderer"),L(this,"controls"),L(this,"ellipsoid",Ya.WGS84),L(this,"coordinates",new Nf(this.ellipsoid)),L(this,"lod"),L(this,"grid"),L(this,"imagery"),L(this,"terrain"),L(this,"container"),L(this,"onStats"),L(this,"frameHandle",null),L(this,"lastStatsSignature",""),L(this,"viewportWidth",0),L(this,"viewportHeight",0),L(this,"rendererPixelRatio",1),L(this,"requestedPixelRatio"),L(this,"maxDrawingBufferPixels"),L(this,"resizeObserver"),L(this,"navigation"),L(this,"terrainMaximumSurfaceDisplacement"),L(this,"lodSelection",null),L(this,"lodSelectionTerrainRevision",-1),L(this,"lodSelectionViewportWidth",0),L(this,"lodSelectionViewportHeight",0),L(this,"lodSelectionMinimumLevel"),L(this,"observedTerrainRevision",-1),L(this,"terrainRevisionRefreshAt",0),L(this,"lodCameraPosition",new U),L(this,"lodCameraQuaternion",new bi),L(this,"contextLost",!1),L(this,"imageryLayers",new Map),L(this,"imageryLayerOptions"),L(this,"onContextLost",E=>{var N;E.preventDefault(),this.contextLost=!0;for(const j of this.imageryLayers.values())j.handleContextLost();(N=this.terrain)==null||N.handleContextLost()}),L(this,"onContextRestored",()=>{var E;this.contextLost=!1;for(const N of this.imageryLayers.values())N.handleContextRestored();(E=this.terrain)==null||E.handleContextRestored(),this.grid.handleContextRestored(),this.lodSelection=null,this.lastStatsSignature=""});var t,n,r,s,a,o,l,c,u,h,d,f,_;this.container=e.container,this.requestedPixelRatio=Math.max(.5,e.pixelRatio??window.devicePixelRatio),this.maxDrawingBufferPixels=Math.max(1e6,Math.round(e.maxDrawingBufferPixels??8e6)),this.onStats=e.onStats,this.navigation={rotateSpeed:Math.max(.01,((t=e.navigation)==null?void 0:t.rotateSpeed)??.4),minRotateSpeed:Math.max(1e-8,((n=e.navigation)==null?void 0:n.minRotateSpeed)??1e-6),zoomSpeed:Math.max(.01,((r=e.navigation)==null?void 0:r.zoomSpeed)??.5),minZoomSpeed:Math.max(1e-9,((s=e.navigation)==null?void 0:s.minZoomSpeed)??1e-8),dampingFactor:ue.clamp(((a=e.navigation)==null?void 0:a.dampingFactor)??.12,0,1),minAltitude:Math.max(.05,((o=e.navigation)==null?void 0:o.minAltitude)??.25),zoomAltitudeGain:Math.max(.1,((l=e.navigation)==null?void 0:l.zoomAltitudeGain)??5),lookSpeed:Math.max(.05,((c=e.navigation)==null?void 0:c.lookSpeed)??1),tiltSpeed:Math.max(.05,((u=e.navigation)==null?void 0:u.tiltSpeed)??1)};const v=((h=e.lod)==null?void 0:h.tilingScheme)??new ry,m=Math.max(0,((d=e.terrainLayer)==null?void 0:d.exaggeration)??1);this.terrainMaximumSurfaceDisplacement=((f=e.lod)==null?void 0:f.maximumSurfaceDisplacement)??(e.terrain===!1||e.terrain===void 0?0:12e3*m),this.lod=new Qy({...e.lod,tilingScheme:v,maximumSurfaceDisplacement:this.terrainMaximumSurfaceDisplacement}),this.terrain=e.terrain===!1||e.terrain===void 0?null:new hb(this.ellipsoid,e.terrain,e.terrainLayer),this.lod.setSurfaceDisplacementSource(this.terrain??void 0),this.grid=new rb(this.ellipsoid,{...e.grid,terrain:this.terrain??void 0}),this.renderer=new ey({antialias:!0,logarithmicDepthBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setClearColor(e.clearColor??463645,1),this.renderer.outputColorSpace=qt,this.renderer.domElement.addEventListener("webglcontextlost",this.onContextLost,!1),this.renderer.domElement.addEventListener("webglcontextrestored",this.onContextRestored,!1),this.container.appendChild(this.renderer.domElement),this.imageryLayerOptions={...e.raster,terrain:this.terrain??void 0,maxAnisotropy:((_=e.raster)==null?void 0:_.maxAnisotropy)??this.renderer.capabilities.getMaxAnisotropy()};const p=Math.min(1e3,this.ellipsoid.polarRadius*.001),b=this.ellipsoid.equatorialRadius-p,T=this.ellipsoid.polarRadius-p,M=new Ra(b,96,64);M.scale(1,T/b,1);const A=new Ea({color:1525340}),C=new ii(M,A);C.renderOrder=0;const D=new ii(new Ra(this.ellipsoid.equatorialRadius*1.018,64,48),new Ea({color:5425151,transparent:!0,opacity:.09,side:Kt,depthWrite:!1}));D.scale.y=this.ellipsoid.polarRadius/this.ellipsoid.equatorialRadius,D.renderOrder=3,this.imagery=e.imagery===!1||e.imagery===void 0?null:new Oh(this.ellipsoid,e.imagery,this.imageryLayerOptions),this.imagery&&this.imageryLayers.set("base",this.imagery),this.scene.add(C,D),this.terrain&&this.scene.add(this.terrain.object3d),this.imagery&&this.scene.add(this.imagery.object3d),this.scene.add(this.grid.object3d);const B=this.ellipsoid.equatorialRadius,x=e.initialView??{longitude:105,latitude:32,altitude:B*1.35};this.ellipsoid.cartographicToCartesian({longitude:x.longitude,latitude:x.latitude,height:x.altitude},this.camera.position),this.camera.lookAt(0,0,0),this.controls=new pb(this.camera,this.renderer.domElement,this.ellipsoid,this.terrain??void 0),this.controls.enableDamping=!0,this.controls.dampingFactor=this.navigation.dampingFactor,this.controls.orbitSpeed=this.navigation.rotateSpeed,this.controls.lookSpeed=this.navigation.lookSpeed,this.controls.tiltSpeed=this.navigation.tiltSpeed,this.controls.zoomSpeed=this.navigation.zoomSpeed,this.controls.minDistance=B+this.navigation.minAltitude,this.controls.maxDistance=B*16,this.controls.target.set(0,0,0),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize()}start(){if(this.frameHandle!==null)return;const e=()=>{var t,n,r,s,a;if(this.frameHandle=requestAnimationFrame(e),this.contextLost)return;this.resize(),this.updateNavigationSensitivity();const o=this.controls.update(),l=this.getCameraLevel();for(const C of this.imageryLayers.values())C.visible&&((n=(t=C.provider).setViewLevel)==null||n.call(t,l));const c=(r=this.imagery)==null?void 0:r.provider.minimumLodLevelOffset,u=c===void 0?null:this.controls.getViewState().pitch;let h=c!==void 0&&u!==null&&u<=-55?Math.floor(l)+c:void 0;const d=h,f=((s=this.terrain)==null?void 0:s.revision)??-1,_=performance.now();f!==this.observedTerrainRevision&&(this.observedTerrainRevision=f,this.terrainRevisionRefreshAt=_+100);const v=this.renderer.domElement.clientHeight,m=this.renderer.domElement.clientWidth,p=o||!this.camera.position.equals(this.lodCameraPosition)||!this.camera.quaternion.equals(this.lodCameraQuaternion),b=f!==this.lodSelectionTerrainRevision&&_>=this.terrainRevisionRefreshAt;if(this.lodSelection===null||p||m!==this.lodSelectionViewportWidth||v!==this.lodSelectionViewportHeight||d!==this.lodSelectionMinimumLevel||b){let C=this.lod.select(this.camera,v,h);for(;h!==void 0&&h>this.lod.minLevel&&C.tiles.length>=this.lod.maxTiles&&Mb(C.stats)<h;)h-=1,C=this.lod.select(this.camera,v,h);this.lodSelection=C,this.lodSelectionTerrainRevision=f,this.lodSelectionViewportWidth=m,this.lodSelectionViewportHeight=v,this.lodSelectionMinimumLevel=d,this.lodCameraPosition.copy(this.camera.position),this.lodCameraQuaternion.copy(this.camera.quaternion)}const T=this.lodSelection,M=((a=this.terrain)==null?void 0:a.update(T.tiles,this.camera.position))??null;let A=null;for(const C of this.imageryLayers.values()){if(!C.visible)continue;const D=C.update(T.tiles,this.camera.position);C===this.imagery&&(A=D)}this.grid.update(T.tiles,this.camera.position),this.emitStats(T.stats,A,M,l),this.renderer.render(this.scene,this.camera)};this.frameHandle=requestAnimationFrame(e)}stop(){this.frameHandle!==null&&(cancelAnimationFrame(this.frameHandle),this.frameHandle=null)}dispose(){var e;this.stop(),this.resizeObserver.disconnect(),this.controls.dispose();for(const t of this.imageryLayers.values())t.dispose();this.imageryLayers.clear(),(e=this.terrain)==null||e.dispose(),this.grid.dispose(),this.scene.traverse(t=>{if(!(t instanceof ii))return;t.geometry.dispose();const n=Array.isArray(t.material)?t.material:[t.material];for(const r of n)r.dispose()}),this.renderer.domElement.removeEventListener("webglcontextlost",this.onContextLost,!1),this.renderer.domElement.removeEventListener("webglcontextrestored",this.onContextRestored,!1),this.contextLost||this.renderer.dispose(),this.renderer.domElement.remove()}setImageryProvider(e){var t;(t=this.imagery)==null||t.setProvider(e),this.lastStatsSignature=""}addImageryLayer(e,t,n={}){if(this.imageryLayers.has(e))throw new Error(`Imagery layer already exists: ${e}`);const r=new Oh(this.ellipsoid,t,{...this.imageryLayerOptions,...n,terrain:this.terrain??void 0,surfaceOffset:n.surfaceOffset??(n.overlay?.35:.1)});return this.imageryLayers.set(e,r),this.scene.add(r.object3d),this.lastStatsSignature="",r}removeImageryLayer(e){if(e==="base")return!1;const t=this.imageryLayers.get(e);return t?(this.scene.remove(t.object3d),t.dispose(),this.imageryLayers.delete(e),this.lastStatsSignature="",!0):!1}getImageryLayer(e){return this.imageryLayers.get(e)}setTerrainEnabled(e){var t;(t=this.terrain)==null||t.setEnabled(e),this.lod.setMaximumSurfaceDisplacement(e?this.terrainMaximumSurfaceDisplacement:0),this.lodSelection=null,this.lastStatsSignature=""}flyTo(e){this.controls.flyTo(e)}getCameraViewState(){return this.controls.getViewState()}getCameraLevel(){const e=this.cameraAltitude();return Math.log2(2*Math.PI*this.ellipsoid.equatorialRadius*this.focalPixels()/(this.lod.targetPixels*e))}resize(){const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight),n=Math.min(this.requestedPixelRatio,2,Math.sqrt(this.maxDrawingBufferPixels/(e*t)));e===this.viewportWidth&&t===this.viewportHeight&&Math.abs(n-this.rendererPixelRatio)<.01||(this.viewportWidth=e,this.viewportHeight=t,this.rendererPixelRatio=n,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1))}updateNavigationSensitivity(){this.ellipsoid.equatorialRadius,this.camera.position.length();const e=this.surfaceRadiusInDirection(this.camera.position),t=this.terrainHeightUnderCamera(),n=Math.max(this.navigation.minAltitude,this.altitudeForCameraLevel(this.lod.maxLevel)),r=this.altitudeForCameraLevel(this.lod.minLevel);this.controls.minDistance=e+t+n,this.controls.maxDistance=e+r,this.controls.orbitSpeed=this.navigation.rotateSpeed,this.controls.zoomSpeed=this.navigation.zoomSpeed}cameraAltitude(){return Math.max(.001,this.camera.position.length()-this.surfaceRadiusInDirection(this.camera.position)-this.terrainHeightUnderCamera())}focalPixels(){return Math.max(1,this.renderer.domElement.clientHeight)/(2*Math.tan(ue.degToRad(this.camera.fov)*.5))}altitudeForCameraLevel(e){return 2*Math.PI*this.ellipsoid.equatorialRadius*this.focalPixels()/(this.lod.targetPixels*2**e)}surfaceRadiusInDirection(e){const t=e.length();if(t<=0)return this.ellipsoid.equatorialRadius;const n=e.x/t,r=e.y/t,s=e.z/t,a=this.ellipsoid.equatorialRadius,o=this.ellipsoid.polarRadius;return 1/Math.sqrt((n*n+s*s)/(a*a)+r*r/(o*o))}terrainHeightUnderCamera(){if(!this.terrain)return 0;const e=this.coordinates.worldToGeodetic(this.camera.position);return Math.max(0,this.terrain.sampleHeight(e.longitude,e.latitude)??0)}emitStats(e,t,n,r){if(!this.onStats)return;const s=t?`${t.ready},${t.loading},${t.queued},${t.errors},${t.fallbacks},${t.textureBytes},${t.desiredMinimumLevel},${t.desiredMaximumLevel},${t.displayedMinimumLevel},${t.displayedMaximumLevel}`:"none",a=Math.round(r*10)/10,o=n?`${n.ready},${n.loading},${n.queued},${n.errors},${n.fallbacks},${n.resourceBytes},${n.stitchedEdges},${n.coverageReady}`:"none",l=`${e.selected}|${e.visited}|${e.horizonCulled}|${e.frustumCulled}|${[...e.levels].join(";")}|${s}|${o}|${a}`;l!==this.lastStatsSignature&&(this.lastStatsSignature=l,this.onStats({...e,cameraLevel:a,imagery:t,terrain:n}))}}function Mb(i){const e=[...i.levels.keys()];return e.length>0?Math.min(...e):Number.POSITIVE_INFINITY}const Sb="./public/layer-catalog.schema.json",yb=1,bb="google-satellite",Tb={levelOffset:-1.7},Eb=[{id:"google-satellite",name:"Google 卫星影像",kind:"xyz-raster",urlTemplate:"https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",subdomains:["0","1","2","3"],minLevel:0,maxLevel:20,tileSize:256,attribution:"Google Maps",termsUrl:"https://developers.google.com/maps/documentation/tile/policies",status:"experimental",note:"兼容旧版 XYZ 端点；生产环境应迁移到需要 API Key 与会话令牌的 Google Map Tiles API。"},{id:"google-roadmap",name:"Google 道路地图",kind:"xyz-raster",urlTemplate:"https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",subdomains:["0","1","2","3"],minLevel:0,maxLevel:20,tileSize:256,attribution:"Google Maps",termsUrl:"https://developers.google.com/maps/documentation/tile/policies",status:"experimental",coordinateReference:"gcj02-webmercator-in-china",note:"兼容旧版 XYZ 端点；中国区道路数据使用 GCJ-02，与 WGS84 地表存在位置偏移。"},{id:"google-hybrid",name:"Google 卫星混合图",kind:"xyz-raster",urlTemplate:"https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",subdomains:["0","1","2","3"],minLevel:0,maxLevel:20,tileSize:256,attribution:"Google Maps",termsUrl:"https://developers.google.com/maps/documentation/tile/policies",status:"experimental",coordinateReference:"gcj02-webmercator-in-china",note:"兼容旧版 XYZ 端点；中国区注记使用 GCJ-02，当前尚未执行 WGS84 反纠偏。"},{id:"google-terrain-map",name:"Google 地形地图",kind:"xyz-raster",urlTemplate:"https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",subdomains:["0","1","2","3"],minLevel:0,maxLevel:20,tileSize:256,attribution:"Google Maps",termsUrl:"https://developers.google.com/maps/documentation/tile/policies",status:"experimental",coordinateReference:"gcj02-webmercator-in-china",note:"这是地形制图底图，不是 Terrain-RGB 高程；中国区道路与注记使用 GCJ-02。"},{id:"osm-standard",name:"OpenStreetMap 标准地图",kind:"xyz-raster",urlTemplate:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",minLevel:0,maxLevel:19,tileSize:256,attribution:"© OpenStreetMap contributors",termsUrl:"https://operations.osmfoundation.org/policies/tiles/",status:"stable",note:"只用于正常交互浏览；必须显示署名并遵守缓存、Referer 与禁止批量下载要求。"},{id:"osm-humanitarian",name:"HOT 人道主义地图（OSM 数据）",kind:"xyz-raster",urlTemplate:"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",subdomains:["a","b","c"],minLevel:0,maxLevel:19,tileSize:256,attribution:"© OpenStreetMap contributors · Tiles style by HOT",termsUrl:"https://www.hotosm.org/",status:"experimental",note:"第三方 OSM 栅格样式，不属于 OSMF 标准瓦片服务。"},{id:"osm-vector",name:"OpenStreetMap 官方矢量瓦片",kind:"mvt",urlTemplate:"https://vector.openstreetmap.org/${OSM_VECTOR_VERSION}/{z}/{x}/{y}.mvt",requires:["OSM_VECTOR_VERSION"],minLevel:0,maxLevel:14,attribution:"© OpenStreetMap contributors",termsUrl:"https://operations.osmfoundation.org/policies/vector/",status:"planned",note:"已进入图层目录，但要等原生 GPU MVT 样式渲染器接入后启用。"},{id:"tianditu-imagery",name:"天地图影像底图",kind:"wmts-raster",urlTemplate:"https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}",subdomains:["0","1","2","3","4","5","6","7"],requires:["TIANDITU_TOKEN"],minLevel:1,maxLevel:18,tileSize:256,attribution:"天地图",status:"stable"},{id:"tianditu-imagery-labels",name:"天地图影像中文注记",kind:"wmts-raster",urlTemplate:"https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}",subdomains:["0","1","2","3","4","5","6","7"],requires:["TIANDITU_TOKEN"],minLevel:1,maxLevel:18,tileSize:256,attribution:"天地图",status:"stable"},{id:"tianditu-vector",name:"天地图矢量底图（栅格服务）",kind:"wmts-raster",urlTemplate:"https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}",subdomains:["0","1","2","3","4","5","6","7"],requires:["TIANDITU_TOKEN"],minLevel:1,maxLevel:18,tileSize:256,attribution:"天地图",status:"stable",note:"名称中的“矢量”是天地图产品类型，当前接口返回已绘制栅格瓦片；不是客户端 MVT。"},{id:"tianditu-vector-labels",name:"天地图矢量中文注记",kind:"wmts-raster",urlTemplate:"https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}",subdomains:["0","1","2","3","4","5","6","7"],requires:["TIANDITU_TOKEN"],minLevel:1,maxLevel:18,tileSize:256,attribution:"天地图",status:"stable"},{id:"tianditu-terrain",name:"天地图地形晕渲",kind:"wmts-raster",urlTemplate:"https://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}",subdomains:["0","1","2","3","4","5","6","7"],requires:["TIANDITU_TOKEN"],minLevel:1,maxLevel:14,tileSize:256,attribution:"天地图",status:"stable",note:"这是地形晕渲底图，不是 Terrain-RGB 高程。"},{id:"tianditu-terrain-labels",name:"天地图地形中文注记",kind:"wmts-raster",urlTemplate:"https://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}",subdomains:["0","1","2","3","4","5","6","7"],requires:["TIANDITU_TOKEN"],minLevel:1,maxLevel:14,tileSize:256,attribution:"天地图",status:"stable"},{id:"esri-vector-basemap",name:"Esri 矢量底图（兼容栅格化）",kind:"rasterized-vector-style",styleUrl:"https://www.arcgis.com/sharing/rest/content/items/e6621c30972e4eb7967ad862a4da977d/resources/styles/root.json",sourceId:"esri",minLevel:0,maxLevel:20,tileSize:512,minimumLodLevelOffset:-1,showCountryLabels:!0,attribution:"Esri",status:"stable",note:"MVT 在 CPU/Canvas 按样式绘制为纹理；保留为 ArcGIS Style 兼容渲染路径。"},{id:"maptiler-streets",name:"MapTiler Streets（兼容栅格化）",kind:"rasterized-vector-style",styleUrl:"https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_KEY}",sourceId:"maptiler_planet_v4",requires:["MAPTILER_KEY"],minLevel:0,maxLevel:20,tileSize:512,attribution:"MapTiler · OpenStreetMap contributors",status:"experimental",note:"通过 Mapbox Style v8 source.url 解析矢量 TileJSON，再由兼容 Canvas 路径栅格化。"},{id:"maptiler-hybrid-raster",name:"MapTiler Hybrid 卫星混合图",kind:"xyz-raster",urlTemplate:"https://api.maptiler.com/maps/hybrid-v4/256/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}",requires:["MAPTILER_KEY"],minLevel:0,maxLevel:20,tileSize:256,attribution:"MapTiler · OpenStreetMap contributors",termsUrl:"https://www.maptiler.com/cloud/",status:"stable",note:"直接使用 MapTiler TileJSON 返回的 256px XYZ 栅格模板。"}],wb=[{id:"google-satellite",name:"Google 卫星影像",kind:"imagery",role:"base",sourceId:"google-satellite",visible:!0,exclusiveGroup:"basemap"},{id:"google-roadmap",name:"Google 道路地图",kind:"imagery",role:"base",sourceId:"google-roadmap",exclusiveGroup:"basemap"},{id:"google-hybrid",name:"Google 卫星混合图",kind:"imagery",role:"base",sourceId:"google-hybrid",exclusiveGroup:"basemap"},{id:"google-terrain-map",name:"Google 地形地图",kind:"imagery",role:"base",sourceId:"google-terrain-map",exclusiveGroup:"basemap"},{id:"osm-standard",name:"OpenStreetMap 标准地图",kind:"imagery",role:"base",sourceId:"osm-standard",exclusiveGroup:"basemap"},{id:"osm-humanitarian",name:"HOT 人道主义地图",kind:"imagery",role:"base",sourceId:"osm-humanitarian",exclusiveGroup:"basemap"},{id:"osm-vector",name:"OpenStreetMap 官方矢量瓦片（待原生渲染）",kind:"vector",role:"base",sourceId:"osm-vector",exclusiveGroup:"basemap"},{id:"tianditu-imagery",name:"天地图影像",kind:"imagery",role:"base",sourceId:"tianditu-imagery",exclusiveGroup:"basemap",annotationLayerIds:["tianditu-imagery-labels"]},{id:"tianditu-imagery-labels",name:"天地图影像中文注记",kind:"annotation",role:"annotation",sourceId:"tianditu-imagery-labels",parentLayerId:"tianditu-imagery"},{id:"tianditu-vector",name:"天地图矢量底图（栅格）",kind:"imagery",role:"base",sourceId:"tianditu-vector",exclusiveGroup:"basemap",annotationLayerIds:["tianditu-vector-labels"]},{id:"tianditu-vector-labels",name:"天地图矢量中文注记",kind:"annotation",role:"annotation",sourceId:"tianditu-vector-labels",parentLayerId:"tianditu-vector"},{id:"tianditu-terrain",name:"天地图地形晕渲",kind:"imagery",role:"base",sourceId:"tianditu-terrain",exclusiveGroup:"basemap",annotationLayerIds:["tianditu-terrain-labels"]},{id:"tianditu-terrain-labels",name:"天地图地形中文注记",kind:"annotation",role:"annotation",sourceId:"tianditu-terrain-labels",parentLayerId:"tianditu-terrain"},{id:"esri-vector-basemap",name:"Esri 矢量底图（兼容渲染）",kind:"rasterized-vector",role:"base",sourceId:"esri-vector-basemap",exclusiveGroup:"basemap"},{id:"maptiler-streets",name:"MapTiler Streets（兼容渲染）",kind:"rasterized-vector",role:"base",sourceId:"maptiler-streets",exclusiveGroup:"basemap"},{id:"maptiler-hybrid-raster",name:"MapTiler Hybrid 卫星混合图",kind:"imagery",role:"base",sourceId:"maptiler-hybrid-raster",exclusiveGroup:"basemap"}],Ab={$schema:Sb,version:yb,defaultBaseLayerId:bb,defaults:Tb,sources:Eb,layers:wb},Rb={token:"d653b1efc0cf0a21f19693a0fb4ba37c"},Cb={tianditu:Rb},Lb={class:"demo-hud"},Pb={class:"demo-controls","aria-label":"地图显示设置"},Db={key:0,value:"tianditu-vector"},Ib={key:1,value:"tianditu-imagery"},Ub={class:"terrain-toggle"},Nb=["disabled"],Fb=["aria-label","title"],Ob=["aria-label","title"],Bb=Sd({__name:"GlobeDemo",setup(i){var b;const e=ir(null),t=ir(null),n=ir(!1),r=ir(!1);let s=null;const a="9sj9L8h86fYuBTxg4YXP",o=(b=Cb.tianditu)==null?void 0:b.token,l=!!a,c=ir(l),u=ir("tianditu-vector");let h=null,d;const f=()=>{if(!s||!h)return;const T=d.layers.find(M=>M.id===u.value);if(T)try{s.setImageryProvider(h.createRasterProvider(T.sourceId,{levelOffset:T.levelOffset}))}catch{u.value="osm-standard"}},_=()=>{s==null||s.setTerrainEnabled(c.value)},v=()=>{r.value=!r.value},m=()=>{n.value=document.fullscreenElement===t.value},p=async()=>{t.value&&(document.fullscreenElement===t.value?await document.exitFullscreen():t.value.requestFullscreen&&await t.value.requestFullscreen())};return Td(async()=>{if(!e.value)return;document.addEventListener("fullscreenchange",m),d=Ab,h=new By(d.sources,{defaultLevelOffset:d.defaults.levelOffset??_n,variables:{TIANDITU_TOKEN:o,MAPTILER_KEY:void 0,OSM_VECTOR_VERSION:void 0}});const M=new ly(d.layers.map(x=>({...x,levelOffset:x.levelOffset??d.defaults.levelOffset??_n}))).values().filter(x=>x.role==="base"),A="tianditu-vector",C=M.find(x=>x.id===A)??M.find(x=>x.id===d.defaultBaseLayerId)??M.find(x=>x.id==="osm-standard")??M[0];if(!C)return;const D=h.createRasterProvider(C.sourceId,{levelOffset:C.levelOffset}),B=c.value?new zy({id:"terrain-rgb-demo",tileJsonUrl:`https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${a}`,scheme:"xyz",encoding:"mapbox",maxLevel:14,attribution:"MapTiler / GeoVIS"}):void 0;s=new xb({container:e.value,imagery:D,terrain:B,initialView:{longitude:105,latitude:32,altitude:86e5},navigation:{rotateSpeed:.38,minRotateSpeed:1e-6,zoomSpeed:.42,minZoomSpeed:1e-8,zoomAltitudeGain:5,lookSpeed:1,tiltSpeed:1,dampingFactor:.1,minAltitude:.25},lod:{minLevel:2,maxLevel:27,targetPixels:128,collapseFactor:.7,maxTiles:480,minimumHorizonDetailFactor:.08,horizonDetailExponent:.5,maximumSurfaceDisplacement:12e3},terrainLayer:{segments:64,maxConcurrentRequests:4,maxCachedTiles:256,maxResourceBytes:96*1024*1024,showDebugSurface:!1,exaggeration:1},raster:{segments:16,maxConcurrentRequests:10,maxCachedTiles:2048,maxTextureBytes:192*1024*1024,surfaceOffset:.1}}),s.start()}),Ed(()=>{document.removeEventListener("fullscreenchange",m),s==null||s.dispose()}),(T,M)=>(Mt(),Et("div",{ref_key:"globeWrap",ref:t,class:Fa(["globe-demo-wrap",{"is-minimized":r.value}])},[de("div",{ref_key:"globeHost",ref:e,class:"globe-host","aria-label":"SpringAndAutumnGIS 三维地球演示"},null,512),de("div",Lb,[M[6]||(M[6]=de("div",{class:"hud-pill"},"实时渲染",-1)),M[7]||(M[7]=de("div",{class:"hud-data"},[de("span",null,"WGS84"),de("strong",null,"LOD 2–27")],-1)),de("div",Pb,[de("label",null,[M[4]||(M[4]=de("span",null,"底图",-1)),Yc(de("select",{"onUpdate:modelValue":M[0]||(M[0]=A=>u.value=A),onChange:f},[yt(o)?(Mt(),Et("option",Db,"天地图矢量")):ei("",!0),yt(o)?(Mt(),Et("option",Ib,"天地图影像")):ei("",!0),M[2]||(M[2]=de("option",{value:"osm-standard"},"OpenStreetMap",-1)),M[3]||(M[3]=de("option",{value:"google-satellite"},"Google 卫星",-1))],544),[[mg,u.value]])]),de("label",Ub,[Yc(de("input",{"onUpdate:modelValue":M[1]||(M[1]=A=>c.value=A),type:"checkbox",disabled:!yt(l),onChange:_},null,40,Nb),[[pg,c.value]]),M[5]||(M[5]=de("span",null,"地形",-1))]),de("button",{class:"demo-icon-button",type:"button","aria-label":r.value?"展开引擎":"最小化引擎",title:r.value?"展开引擎":"最小化引擎",onClick:v},zt(r.value?"＋":"−"),9,Fb),de("button",{class:"demo-icon-button",type:"button","aria-label":n.value?"退出全屏":"进入全屏",title:n.value?"退出全屏":"进入全屏",onClick:p},zt(n.value?"⛶":"□"),9,Ob)])])],2))}}),zb=(i,e)=>{const t=i.__vccOpts||i;for(const[n,r]of e)t[n]=r;return t},Vb=zb(Bb,[["__scopeId","data-v-7a264756"]]),Hb={showHero:!0,showAbout:!0,showEngineDemo:!0,showWorks:!1,showArticles:!0,showTechnology:!0,showNotes:!0,showFooterContact:!0,showCooperation:!1,showUniversityProjects:!1,showConsulting:!1,showCaseStudies:!0,showCommunity:!1,showNews:!1},Gb={name:"SpringAutumn GIS",brand:"春秋GIS",contact:{name:"凡语春秋",email:"spring@springautumngis.com",phone:"18679593530",record:"黔，xxxxx"}},kb={years:"10+",projects:"100+",institutions:"50+"},Wb={page:Hb,site:Gb,stats:kb},Xb={class:"site-shell"},qb={class:"topbar"},$b={class:"nav","aria-label":"主导航"},Yb={key:0,href:"#about"},jb={key:1,href:"#engine"},Kb={key:2,href:"#articles"},Zb={key:3,href:"#technology"},Jb={key:4,href:"#notes"},Qb={class:"nav-actions"},eT={key:0,class:"hero section-shell"},tT={class:"hero-content"},iT={class:"cta-row"},nT={key:1,id:"about",class:"trust section-shell"},rT={key:2,id:"engine",class:"engine section-shell"},sT={class:"demo-frame"},aT={key:1,class:"demo-placeholder"},oT={key:3,id:"articles",class:"works section-shell"},lT={class:"card-grid works-grid"},cT={class:"card-body"},uT={class:"tag"},hT={key:4,id:"technology",class:"technology section-shell"},dT={class:"technology-list"},fT={class:"technology-index"},pT={key:5,id:"notes",class:"notes section-shell"},mT={class:"notes-list"},gT={class:"note-date"},_T={class:"note-content"},vT={key:0,class:"footer"},xT={class:"footer-grid"},MT={class:"copyright"},Vh="https://github.com/xiangsongwen00/SpringAndAutumnGIS.git",ST=Sd({__name:"App",setup(i){const e=Wb,t=[{title:"古地图如何进入数字地图",tag:"历史地理",desc:"记录古舆图、州郡界线与历史文献在数字空间中的整理和表达方法。",bg:"linear-gradient(135deg, rgba(91,192,235,0.7), rgba(14,124,147,0.35))"},{title:"行政区划变迁的地图表达",tag:"时空分析",desc:"从时间轴、空间关系和资料来源出发，整理行政区划变迁的可视化思路。",bg:"linear-gradient(135deg, rgba(76,159,112,0.7), rgba(14,124,147,0.3))"},{title:"地方志中的空间信息",tag:"地方志",desc:"尝试把地方志文献、村落信息与空间坐标放在同一张可阅读的地图中。",bg:"linear-gradient(135deg, rgba(242,166,90,0.65), rgba(14,124,147,0.35))"}],n=[{index:"01",title:"WGS84 三维经纬网",desc:"关注椭球坐标、相机距离与 LOD 调度之间的关系。"},{index:"02",title:"瓦片与地形数据",desc:"整理 XYZ / WMTS、Terrain-RGB 解码以及祖先瓦片回退。"},{index:"03",title:"Vue 与 WebGL 实践",desc:"用 Vue 组织页面，用 Three.js 和自研引擎验证三维地图交互。"}],r=[{date:"2026-09-01",title:"WGS84 三维经纬网 LOD 与球面细节调度",summary:"总结经纬网分层、屏幕空间误差、瓦片选择与渲染性能控制的工程化思路。"},{date:"2026-08-21",title:"Terrain-RGB 高程解码与祖先瓦片回退策略",summary:"梳理高程解码、地形贴合和过渡层处理的实践方案，适合历史地理数据叠加。"},{date:"2026-08-06",title:"历史地图与 GIS 技术的交叉表达：从文献到空间叙事",summary:"围绕古地图、地方志、时空分析题材，整理可视化叙事的设计与实现路径。"}],s=a=>{const o=document.getElementById(a);o&&o.scrollIntoView({behavior:"smooth",block:"start"})};return(a,o)=>(Mt(),Et("div",Xb,[de("header",qb,[o[3]||(o[3]=lo('<div class="brand-wrap"><div class="brand-mark">春</div><div class="brand-text"><span class="brand-cn">春秋GIS</span><small class="brand-en">SpringAutumn GIS</small></div></div>',1)),de("nav",$b,[yt(e).page.showAbout?(Mt(),Et("a",Yb,"关于")):ei("",!0),yt(e).page.showEngineDemo?(Mt(),Et("a",jb,"引擎")):ei("",!0),yt(e).page.showArticles?(Mt(),Et("a",Kb,"文章")):ei("",!0),yt(e).page.showTechnology?(Mt(),Et("a",Zb,"技术")):ei("",!0),yt(e).page.showNotes?(Mt(),Et("a",Jb,"笔记")):ei("",!0)]),de("div",Qb,[de("button",{class:"primary-btn",type:"button",onClick:o[0]||(o[0]=l=>s("engine"))},"查看引擎")])]),de("main",null,[yt(e).page.showHero?(Mt(),Et("section",eT,[o[7]||(o[7]=lo('<div class="hero-bg" aria-hidden="true"><span class="orb orb-a"></span><span class="orb orb-b"></span><span class="orb orb-c"></span><div class="grid-overlay"></div><div class="map-overlay"></div></div>',1)),de("div",tT,[o[4]||(o[4]=de("div",{class:"eyebrow"},"历史地理 · GIS 技术整理 · 个人研究笔记",-1)),o[5]||(o[5]=de("h1",null,[jd(" 关注历史，"),de("span",null,"关注地理信息科学")],-1)),o[6]||(o[6]=de("p",{class:"lede"}," SpringAndAutumnGIS 是一个基于 WGS84 三维经纬网、地形高度、地图渲染 与空间分析能力组合的轻量引擎研究与展示平台，聚焦历史地理信息与 GIS 技术沉淀。 ",-1)),de("div",iT,[de("button",{class:"primary-btn",type:"button",onClick:o[1]||(o[1]=l=>s("engine"))},"查看引擎演示"),de("button",{class:"secondary-btn",type:"button",onClick:o[2]||(o[2]=l=>s("notes"))},"阅读技术笔记")])]),o[8]||(o[8]=de("div",{class:"hero-panel"},[de("div",{class:"stamp"},"春秋"),de("div",{class:"mini-card"},[de("span",{class:"mini-tag"},"实时能力"),de("h3",null,"3D GIS Engine"),de("ul",null,[de("li",null,"WGS84 三维经纬网"),de("li",null,"Terrain-RGB 高程解码"),de("li",null,"Web Mercator/XYZ")])])],-1))])):ei("",!0),yt(e).page.showAbout?(Mt(),Et("section",nT,[...o[9]||(o[9]=[de("div",{class:"section-header"},[de("span",{class:"kicker"},"About"),de("h2",null,"从历史地理到时空可视化")],-1),de("div",{class:"about-copy"},[de("p",null,"这里记录我对历史地理、地图表达和地理信息科学的长期学习与实践。"),de("p",null,"从资料整理、坐标转换到三维渲染，尽量把可以复用的思路、代码和判断写下来。")],-1)])])):ei("",!0),yt(e).page.showEngineDemo?(Mt(),Et("section",rT,[o[11]||(o[11]=de("div",{class:"section-header align-left"},[de("span",{class:"kicker"},"Engine Demo"),de("h2",null,"真实 3D GIS 引擎展示")],-1)),de("div",sT,[de("div",{class:"demo-toolbar"},[o[10]||(o[10]=de("span",null,"SpringAndAutumnGIS 实时演示",-1)),de("a",{href:Vh,target:"_blank",rel:"noreferrer"},"查看引擎源码")]),yt(e).page.showEngineDemo?(Mt(),qd(Vb,{key:0})):(Mt(),Et("div",aT," 引擎演示已按配置关闭，当前仅展示页面结构与设计样式。 "))])])):ei("",!0),yt(e).page.showArticles?(Mt(),Et("section",oT,[o[12]||(o[12]=de("div",{class:"section-header"},[de("span",{class:"kicker"},"Articles"),de("h2",null,"我的文章")],-1)),de("div",lT,[(Mt(),Et(fi,null,so(t,l=>de("article",{class:"feature-card",key:l.title},[de("div",{class:"card-image",style:Na({background:l.bg})},null,4),de("div",cT,[de("span",uT,zt(l.tag),1),de("h3",null,zt(l.title),1),de("p",null,zt(l.desc),1)])])),64))])])):ei("",!0),yt(e).page.showTechnology?(Mt(),Et("section",hT,[o[13]||(o[13]=de("div",{class:"section-header"},[de("span",{class:"kicker"},"Technology"),de("h2",null,"我的技术")],-1)),de("div",dT,[(Mt(),Et(fi,null,so(n,l=>de("article",{key:l.title,class:"technology-item"},[de("span",fT,zt(l.index),1),de("div",null,[de("h3",null,zt(l.title),1),de("p",null,zt(l.desc),1)])])),64))])])):ei("",!0),yt(e).page.showNotes?(Mt(),Et("section",pT,[o[14]||(o[14]=de("div",{class:"section-header"},[de("span",{class:"kicker"},"Notes"),de("h2",null,"历史地理个人笔记与技术整理")],-1)),de("div",mT,[(Mt(),Et(fi,null,so(r,l=>de("article",{class:"note-item",key:l.title},[de("span",gT,zt(l.date),1),de("div",_T,[de("h3",null,zt(l.title),1),de("p",null,zt(l.summary),1)])])),64))])])):ei("",!0)]),yt(e).page.showFooterContact?(Mt(),Et("footer",vT,[de("div",xT,[o[17]||(o[17]=lo('<div><div class="brand-wrap footer-brand"><div class="brand-mark">春</div><div class="brand-text"><span class="brand-cn">春秋GIS</span><small class="brand-en">SpringAutumn GIS</small></div></div><p>关注历史，关注地理信息科学。以 GIS 技术承载历史地理信息的研究、展示与可视化探索。</p></div><div><h4>导航</h4><ul><li><a href="#about">关于</a></li><li><a href="#engine">引擎</a></li><li><a href="#articles">文章</a></li><li><a href="#technology">技术</a></li><li><a href="#notes">笔记</a></li></ul></div>',2)),de("div",null,[o[16]||(o[16]=de("h4",null,"联系",-1)),de("ul",null,[de("li",null,zt(yt(e).site.contact.name),1),de("li",null,zt(yt(e).site.contact.email),1),de("li",null,zt(yt(e).site.contact.phone),1)]),de("a",{class:"github-support",href:Vh,target:"_blank",rel:"noreferrer"},[...o[15]||(o[15]=[de("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[de("path",{fill:"currentColor",d:"M12 .6a11.4 11.4 0 0 0-3.6 22.2c.57.1.78-.25.78-.55v-2.1c-3.18.7-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.14 1.17A10.9 10.9 0 0 1 12 6.05c.97 0 1.94.13 2.85.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.4-2.67 5.36-5.22 5.65.41.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A11.4 11.4 0 0 0 12 .6Z"})],-1),de("span",null,"引擎技术支持",-1)])])])]),de("div",MT,"© 2026 SpringAutumn GIS · 备案号："+zt(yt(e).site.contact.record),1)])):ei("",!0)]))}});xg(ST).mount("#app");
