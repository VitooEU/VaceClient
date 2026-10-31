import{r as u,i as x,a as B,b as g,g as G,p as J,u as O,t as W,k as Y,j as z,a6 as D,T as Z}from"./globals-DcyCeelM.js";import{w as N,r as K}from"./permission-service-CiSMdE-M.js";let X={data:""},Q=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||X,ee=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,te=/\/\*[^]*?\*\/|  +/g,I=/\n+/g,A=(e,t)=>{let r="",s="",c="";for(let a in e){let o=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+o+";":s+=a[1]=="f"?A(o,a):a+"{"+A(o,a[1]=="k"?"":t)+"}":typeof o=="object"?s+=A(o,t?t.replace(/([^,])+/g,i=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,n=>/&/.test(n)?n.replace(/&/g,i):i?i+" "+n:n)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),c+=A.p?A.p(a,o):a+":"+o+";")}return r+(t&&c?t+"{"+c+"}":c)+s},y={},H=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+H(e[r]);return t}return e},re=(e,t,r,s,c)=>{let a=H(e),o=y[a]||(y[a]=(n=>{let l=0,d=11;for(;l<n.length;)d=101*d+n.charCodeAt(l++)>>>0;return"go"+d})(a));if(!y[o]){let n=a!==e?e:(l=>{let d,m,h=[{}];for(;d=ee.exec(l.replace(te,""));)d[4]?h.shift():d[3]?(m=d[3].replace(I," ").trim(),h.unshift(h[0][m]=h[0][m]||{})):h[0][d[1]]=d[2].replace(I," ").trim();return h[0]})(e);y[o]=A(c?{["@keyframes "+o]:n}:n,r?"":"."+o)}let i=r&&y.g?y.g:null;return r&&(y.g=y[o]),((n,l,d,m)=>{m?l.data=l.data.replace(m,n):l.data.indexOf(n)===-1&&(l.data=d?n+l.data:l.data+n)})(y[o],t,s,i),o},ae=(e,t,r)=>e.reduce((s,c,a)=>{let o=t[a];if(o&&o.call){let i=o(r),n=i&&i.props&&i.props.className||/^go/.test(i)&&i;o=n?"."+n:i&&typeof i=="object"?i.props?"":A(i,""):i===!1?"":i}return s+c+(o??"")},"");function T(e){let t=this||{},r=e.call?e(t.p):e;return re(r.unshift?r.raw?ae(r,[].slice.call(arguments,1),t.p):r.reduce((s,c)=>Object.assign(s,c&&c.call?c(t.p):c),{}):r,Q(t.target),t.g,t.o,t.k)}let U,M,P;T.bind({g:1});let b=T.bind({k:1});function oe(e,t,r,s){A.p=t,U=e,M=r,P=s}function w(e,t){let r=this||{};return function(){let s=arguments;function c(a,o){let i=Object.assign({},a),n=i.className||c.className;r.p=Object.assign({theme:M&&M()},i),r.o=/ *go\d+/.test(n),i.className=T.apply(r,s)+(n?" "+n:"");let l=e;return e[0]&&(l=i.as||e,delete i.as),P&&l[0]&&P(i),U(l,i)}return c}}var se=e=>typeof e=="function",j=(e,t)=>se(e)?e(t):e,ie=(()=>{let e=0;return()=>(++e).toString()})(),V=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ne=20,q=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,ne)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return q(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(a=>a.id===s||s===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let c=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+c}))}}},$=[],k={toasts:[],pausedAt:void 0},E=e=>{k=q(k,e),$.forEach(t=>{t(k)})},ce={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},le=(e={})=>{let[t,r]=u.useState(k),s=u.useRef(k);u.useEffect(()=>(s.current!==k&&r(k),$.push(r),()=>{let a=$.indexOf(r);a>-1&&$.splice(a,1)}),[]);let c=t.toasts.map(a=>{var o,i,n;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((o=e[a.type])==null?void 0:o.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((i=e[a.type])==null?void 0:i.duration)||(e==null?void 0:e.duration)||ce[a.type],style:{...e.style,...(n=e[a.type])==null?void 0:n.style,...a.style}}});return{...t,toasts:c}},ue=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||ie()}),L=e=>(t,r)=>{let s=ue(t,e,r);return E({type:2,toast:s}),s.id},p=(e,t)=>L("blank")(e,t);p.error=L("error");p.success=L("success");p.loading=L("loading");p.custom=L("custom");p.dismiss=e=>{E({type:3,toastId:e})};p.remove=e=>E({type:4,toastId:e});p.promise=(e,t,r)=>{let s=p.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(c=>{let a=t.success?j(t.success,c):void 0;return a?p.success(a,{id:s,...r,...r==null?void 0:r.success}):p.dismiss(s),c}).catch(c=>{let a=t.error?j(t.error,c):void 0;a?p.error(a,{id:s,...r,...r==null?void 0:r.error}):p.dismiss(s)}),e};var de=(e,t)=>{E({type:1,toast:{id:e,height:t}})},pe=()=>{E({type:5,time:Date.now()})},S=new Map,fe=1e3,me=(e,t=fe)=>{if(S.has(e))return;let r=setTimeout(()=>{S.delete(e),E({type:4,toastId:e})},t);S.set(e,r)},ge=e=>{let{toasts:t,pausedAt:r}=le(e);u.useEffect(()=>{if(r)return;let a=Date.now(),o=t.map(i=>{if(i.duration===1/0)return;let n=(i.duration||0)+i.pauseDuration-(a-i.createdAt);if(n<0){i.visible&&p.dismiss(i.id);return}return setTimeout(()=>p.dismiss(i.id),n)});return()=>{o.forEach(i=>i&&clearTimeout(i))}},[t,r]);let s=u.useCallback(()=>{r&&E({type:6,time:Date.now()})},[r]),c=u.useCallback((a,o)=>{let{reverseOrder:i=!1,gutter:n=8,defaultPosition:l}=o||{},d=t.filter(v=>(v.position||l)===(a.position||l)&&v.height),m=d.findIndex(v=>v.id===a.id),h=d.filter((v,C)=>C<m&&v.visible).length;return d.filter(v=>v.visible).slice(...i?[h+1]:[0,h]).reduce((v,C)=>v+(C.height||0)+n,0)},[t]);return u.useEffect(()=>{t.forEach(a=>{if(a.dismissed)me(a.id,a.removeDelay);else{let o=S.get(a.id);o&&(clearTimeout(o),S.delete(a.id))}})},[t]),{toasts:t,handlers:{updateHeight:de,startPause:pe,endPause:s,calculateOffset:c}}},he=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ve=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ye=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,be=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${he} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ve} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ye} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ae=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,we=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ae} 1s linear infinite;
`,xe=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ke=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ee=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${xe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ke} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,_e=w("div")`
  position: absolute;
`,Se=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Le=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Fe=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Le} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$e=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?u.createElement(Fe,null,t):t:r==="blank"?null:u.createElement(Se,null,u.createElement(we,{...s}),r!=="loading"&&u.createElement(_e,null,r==="error"?u.createElement(be,{...s}):u.createElement(Ee,{...s})))},je=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Te=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ce="0%{opacity:0;} 100%{opacity:1;}",Oe="0%{opacity:1;} 100%{opacity:0;}",De=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Me=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Pe=(e,t)=>{let r=e.includes("top")?1:-1,[s,c]=V()?[Ce,Oe]:[je(r),Te(r)];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(c)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ze=u.memo(({toast:e,position:t,style:r,children:s})=>{let c=e.height?Pe(e.position||t||"top-center",e.visible):{opacity:0},a=u.createElement($e,{toast:e}),o=u.createElement(Me,{...e.ariaProps},j(e.message,e));return u.createElement(De,{className:e.className,style:{...c,...r,...e.style}},typeof s=="function"?s({icon:a,message:o}):u.createElement(u.Fragment,null,a,o))});oe(u.createElement);var Ne=({id:e,className:t,style:r,onHeightUpdate:s,children:c})=>{let a=u.useCallback(o=>{if(o){let i=()=>{let n=o.getBoundingClientRect().height;s(e,n)};i(),new MutationObserver(i).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return u.createElement("div",{ref:a,className:t,style:r},c)},Ie=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},c=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:V()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...c}},Re=T`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,F=16,Be=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:c,containerStyle:a,containerClassName:o})=>{let{toasts:i,handlers:n}=ge(r);return u.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:F,left:F,right:F,bottom:F,pointerEvents:"none",...a},className:o,onMouseEnter:n.startPause,onMouseLeave:n.endPause},i.map(l=>{let d=l.position||t,m=n.calculateOffset(l,{reverseOrder:e,gutter:s,defaultPosition:t}),h=Ie(d,m);return u.createElement(Ne,{id:l.id,key:l.id,onHeightUpdate:n.updateHeight,className:l.visible?Re:"",style:h},l.type==="custom"?j(l.message,l):c?c(l):u.createElement(ze,{toast:l,position:d}))}))};class f{static async beginLogin(){try{return await x("begin_login")}catch(t){throw console.error("Failed to begin login:",t),t}}static async removeAccount(t){try{await x("remove_account",{accountId:t})}catch(r){throw console.error("Failed to remove account:",r),r}}static async getActiveAccount(){try{return await x("get_active_account")}catch(t){throw console.error("Failed to get active account:",t),t}}static async setActiveAccount(t){try{await x("set_active_account",{accountId:t})}catch(r){throw console.error("Failed to set active account:",r),r}}static async getAccounts(){try{return await x("get_accounts")}catch(t){throw console.error("Failed to get accounts:",t),t}}static async cancelLogin(){try{await x("cancel_login")}catch(t){throw console.error("Failed to cancel login:",t),t}}static async isFlatpak(){try{return await x("is_flatpak")}catch(t){return console.error("Failed to check Flatpak status:",t),!1}}}function R(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null){if("message"in e&&typeof e.message=="string")return e.message;if("error"in e&&typeof e.error=="string")return e.error;try{return JSON.stringify(e)}catch{return"[Unable to parse error object]"}}return String(e)}const _=e=>{const t=(e==null?void 0:e.id)??null,r=(e==null?void 0:e.username)??null;Promise.all([N.setTrait("mojang_uuid",t),N.setTrait("mojang_username",r)]).then(()=>{console.log(t?`[AuthStore] Flagsmith mojang traits set for ${t}`:"[AuthStore] Flagsmith mojang traits cleared (no active account).")}).catch(s=>{console.error("[AuthStore] Error updating Flagsmith mojang traits:",s)}),K().catch(s=>{console.error("[AuthStore] Error refreshing permissions:",s)})},Ve=B((e,t)=>({accounts:[],activeAccount:null,accountsLoaded:!1,isLoading:!1,error:null,initializeAccounts:async()=>{try{e({isLoading:!0,error:null});const r=await f.getAccounts(),s={id:"c0ffee00-0000-0000-0000-000000000000",username:"Steve",minecraft_username:"Steve",active:!0,access_token:"offline"},c=r.find(n=>n.active)??(r.length>0?r[0]:s),a=r.length>0?r:[s];e({accounts:a,activeAccount:c,accountsLoaded:!0});let o=c;try{const n=await f.getActiveAccount();n&&(o=n)}catch(n){console.warn("Active account refresh failed, keeping cached account:",n)}const i=a.map(n=>({...n,active:o?n.id===o.id:!1}));e({accounts:i,activeAccount:o,isLoading:!1}),_(o)}catch(r){console.error("Failed to initialize accounts:",r);const s={id:"c0ffee00-0000-0000-0000-000000000000",username:"Steve",minecraft_username:"Steve",active:!0,access_token:"offline"};e({accounts:[s],activeAccount:s,isLoading:!1,accountsLoaded:!0}),_(s)}},addAccount:async()=>{e({isLoading:!0,error:null});const[r,s]=await Promise.all([G().catch(()=>({use_browser_based_login:!1})),f.isFlatpak().catch(()=>!1)]),c=s||r.use_browser_based_login,a=(async()=>{const o=await f.beginLogin();if(!o)throw new Error(g.t("auth.errors.login_cancelled"));const i=await f.getAccounts(),n=await f.getActiveAccount();return _(n),{newAccount:o,accounts:i,activeAccount:n}})();c||p.promise(a,{loading:g.t("auth.loading.browser_sign_in"),success:({newAccount:o})=>g.t("auth.success.account_added",{username:o.username}),error:o=>o.message},{loading:{duration:5e4},success:{duration:1500},error:{duration:1500}});try{const{newAccount:o,accounts:i,activeAccount:n}=await a;c&&p.success(g.t("auth.success.account_added",{username:o.username}),{duration:1500});const l=i.map(d=>({...d,active:n?d.id===n.id:!1}));e({accounts:l,activeAccount:n,isLoading:!1,error:null})}catch(o){const i=R(o);c&&!i.includes(g.t("auth.errors.login_cancelled"))&&p.error(i||g.t("auth.errors.login_failed"),{duration:1500}),i.includes(g.t("auth.errors.login_cancelled"))?(console.log("Account add cancelled by user."),e({isLoading:!1,error:null})):(console.error("Failed to add account:",o),e({error:g.t("auth.errors.add_account",{error:i}),isLoading:!1}))}},removeAccount:async r=>{var s;try{e({isLoading:!0,error:null});const c=((s=t().activeAccount)==null?void 0:s.id)===r;await f.removeAccount(r);const a=await f.getAccounts(),o=await f.getActiveAccount(),i=a.map(n=>({...n,active:o?n.id===o.id:!1}));e({accounts:i,activeAccount:o,isLoading:!1}),c&&_(o)}catch(c){console.error("Failed to remove account:",c),e({error:g.t("auth.errors.remove_account",{error:R(c)}),isLoading:!1})}},setActiveAccount:async r=>{const s=t().activeAccount,c=t().accounts;try{e({isLoading:!0,error:null}),await f.setActiveAccount(r);const a=await f.getActiveAccount(),o=t().accounts.map(i=>({...i,active:i.id===r}));e({accounts:o,activeAccount:a,isLoading:!1}),_(a)}catch(a){console.error("Failed to set active account:",a);const o=a instanceof Error?a.message:String(a.message??a);if(o.includes("invalid_grant")||o.includes("expired")){try{await f.removeAccount(r);const n=await f.getAccounts(),l=await f.getActiveAccount(),d=n.map(m=>({...m,active:l?m.id===l.id:!1}));e({accounts:d,activeAccount:l,isLoading:!1,error:null}),_(l)}catch(n){console.error("Failed to remove expired account:",n),e({accounts:c,activeAccount:s,isLoading:!1})}p.error(g.t("auth.errors.session_expired"),{duration:5e3})}else{if(s)try{await f.setActiveAccount(s.id)}catch(n){console.error("Failed to revert active account in backend:",n)}e({accounts:c,activeAccount:s,error:g.t("auth.errors.set_active",{error:o}),isLoading:!1}),p.error(g.t("auth.errors.switch_failed",{error:o}),{duration:3e3})}}}})),qe=B()(J(e=>({selectedSkinId:null,setSelectedSkinId:t=>e({selectedSkinId:t}),skinRevision:0,bumpSkinRevision:()=>e(t=>({skinRevision:t.skinRevision+1}))}),{name:"skin-store",partialize:e=>({selectedSkinId:e.selectedSkinId})}));function Ge(){const e=O(c=>c.accentColor);O(c=>c.borderRadius);const t=O(c=>c.isBackgroundAnimationEnabled),r=u.useRef(null),s=W({accentColor:e.value});return u.useEffect(()=>{if(!t)return;document.querySelectorAll('[id^="toast-"]').forEach(a=>{Y.to(a,{backgroundColor:`${e.value}30`,borderColor:`${e.value}80`,borderBottomColor:e.value,duration:.2,ease:"power2.out"})})},[e,t]),z.jsx("div",{ref:r,children:z.jsx(Be,{position:"bottom-right",toastOptions:{className:`${Z}`,style:s,success:{style:{...s,...D("success",e.value)},iconTheme:{primary:"#059669",secondary:"#d1fae5"}},error:{style:{...s,...D("error",e.value)},iconTheme:{primary:"#dc2626",secondary:"#fee2e2"}},loading:{style:{...s,...D("default",e.value)},iconTheme:{primary:e.value,secondary:"#ffffff"},duration:1/0},duration:3e3}})})}export{Ge as G,f as M,qe as a,p as c,R as p,Ve as u};
