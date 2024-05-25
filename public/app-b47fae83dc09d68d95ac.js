(self["webpackChunkprotonvpn_com"] = self["webpackChunkprotonvpn_com"] || []).push([[3524],{

/***/ 20128:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;
exports.T = void 0;
const endsWithSuffixes = (suffixes, input) => {
  for (const suffix of suffixes) {
    if (input.endsWith(suffix)) return true;
  }
  return false;
};
const suffixes = [`.html`, `.json`, `.js`, `.map`, `.txt`, `.xml`, `.pdf`];
const applyTrailingSlashOption = (input, option = `always`) => {
  if (input === `/`) return input;
  const hasTrailingSlash = input.endsWith(`/`);
  if (endsWithSuffixes(suffixes, input)) {
    return input;
  }
  if (option === `always`) {
    return hasTrailingSlash ? input : `${input}/`;
  }
  if (option === `never`) {
    return hasTrailingSlash ? input.slice(0, -1) : input;
  }
  return input;
};
exports.T = applyTrailingSlashOption;

/***/ }),

/***/ 58567:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;
__webpack_unused_export__ = exports.z_ = void 0;
var _scrollHandler = __webpack_require__(59771);
exports.z_ = _scrollHandler.ScrollHandler;
var _useScrollRestoration = __webpack_require__(47757);
__webpack_unused_export__ = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ 59771:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(36827);
exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;
var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(14834));
var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(54700));
var React = _interopRequireWildcard(__webpack_require__(11855));
var _propTypes = _interopRequireDefault(__webpack_require__(5821));
var _sessionStorage = __webpack_require__(58643);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";
var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);
  function ScrollHandler() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;
    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;
      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };
    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };
    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));
      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };
    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;
      if (!shouldUpdateScroll) {
        return true;
      }

      // Hack to allow accessing this._stateStorage.
      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };
    return _this;
  }
  var _proto = ScrollHandler.prototype;
  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;
    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }
    this._isTicking = false;
  };
  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
      key = _this$props$location.key,
      hash = _this$props$location.hash;
    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    /** If a hash is present in the browser url as the component mounts (i.e. the user is navigating
     * from an external website) then scroll to the hash instead of any previously stored scroll
     * position. */
    if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    } else if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
      hash = _this$props$location2.hash,
      key = _this$props$location2.key;
    var scrollPosition;
    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */

    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };
  return ScrollHandler;
}(React.Component);
exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ 58643:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";
var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}
  var _proto = SessionStorage.prototype;
  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);
    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (false) {}
      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }
      return 0;
    }
  };
  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);
    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }
      if (false) {}
    }
  };
  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };
  return SessionStorage;
}();
exports.SessionStorage = SessionStorage;

/***/ }),

/***/ 47757:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;
var _scrollHandler = __webpack_require__(59771);
var _react = __webpack_require__(11855);
var _reachRouter = __webpack_require__(98855);
function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ 7683:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.onInitialClientRender = void 0;
var _gatsbyScript = __webpack_require__(68736);
var _injectPartytownSnippet = __webpack_require__(51768);
// Makes sure off-main-thread scripts are loaded in `gatsby develop`
const onInitialClientRender = () => {
  if (true) {
    return;
  }
  (0, _injectPartytownSnippet.injectPartytownSnippet)(_gatsbyScript.collectedScriptsByPage.get(window.location.pathname));

  // Clear scripts after we've used them to avoid leaky behavior
  _gatsbyScript.collectedScriptsByPage.delete(window.location.pathname);
};

// Client-side navigation (CSR, e.g. Gatsby Link navigations) are broken upstream in Partytown.
// We need an official API from Partytown for handling re-configuration and on-demand script loading.
// Until then, `off-main-thread` scripts load only on server-side navigation (SSR).
// See https://github.com/BuilderIO/partytown/issues/74 for more details.
exports.onInitialClientRender = onInitialClientRender;
//# sourceMappingURL=gatsby-browser.js.map

/***/ }),

/***/ 27401:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.getForwards = getForwards;
function getForwards(collectedScripts) {
  return collectedScripts === null || collectedScripts === void 0 ? void 0 : collectedScripts.flatMap(script => (script === null || script === void 0 ? void 0 : script.forward) || []);
}
//# sourceMappingURL=get-forwards.js.map

/***/ }),

/***/ 51768:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.injectPartytownSnippet = injectPartytownSnippet;
var _integration = __webpack_require__(4990);
var _getForwards = __webpack_require__(27401);
// Adapted from https://github.com/BuilderIO/partytown/blob/main/src/react/snippet.tsx to only include CSR logic
function injectPartytownSnippet(collectedScripts) {
  if (!collectedScripts.length) {
    return;
  }
  const existingSnippet = document.querySelector(`script[data-partytown]`);
  const existingSandbox = document.querySelector(`iframe[src*="~partytown/partytown-sandbox-sw"]`);
  if (existingSnippet) {
    existingSnippet.remove();
  }
  if (existingSandbox) {
    existingSandbox.remove();
  }
  const forwards = (0, _getForwards.getForwards)(collectedScripts);
  const snippet = document.createElement(`script`);
  snippet.dataset.partytown = ``;
  snippet.innerHTML = (0, _integration.partytownSnippet)({
    forward: forwards
  });
  document.head.appendChild(snippet);
}
//# sourceMappingURL=inject-partytown-snippet.js.map

/***/ }),

/***/ 98855:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseContext: function() { return /* binding */ m; },
/* harmony export */   Link: function() { return /* binding */ A; },
/* harmony export */   Location: function() { return /* binding */ G; },
/* harmony export */   LocationContext: function() { return /* binding */ d; },
/* harmony export */   LocationProvider: function() { return /* binding */ z; },
/* harmony export */   Match: function() { return /* binding */ Q; },
/* harmony export */   Redirect: function() { return /* binding */ R; },
/* harmony export */   Router: function() { return /* binding */ oe; },
/* harmony export */   ServerLocation: function() { return /* binding */ J; },
/* harmony export */   createHistory: function() { return /* binding */ i; },
/* harmony export */   createMemorySource: function() { return /* binding */ c; },
/* harmony export */   globalHistory: function() { return /* binding */ l; },
/* harmony export */   insertParams: function() { return /* binding */ P; },
/* harmony export */   isRedirect: function() { return /* binding */ g; },
/* harmony export */   match: function() { return /* binding */ x; },
/* harmony export */   navigate: function() { return /* binding */ p; },
/* harmony export */   pick: function() { return /* binding */ w; },
/* harmony export */   redirectTo: function() { return /* binding */ v; },
/* harmony export */   resolve: function() { return /* binding */ k; },
/* harmony export */   shallowCompare: function() { return /* binding */ D; },
/* harmony export */   startsWith: function() { return /* binding */ C; },
/* harmony export */   useBaseContext: function() { return /* binding */ f; },
/* harmony export */   useLocation: function() { return /* binding */ se; },
/* harmony export */   useLocationContext: function() { return /* binding */ y; },
/* harmony export */   useMatch: function() { return /* binding */ ue; },
/* harmony export */   useNavigate: function() { return /* binding */ ie; },
/* harmony export */   useParams: function() { return /* binding */ ce; },
/* harmony export */   validateRedirect: function() { return /* binding */ T; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32371);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5821);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92018);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);}return e;},o.apply(this,arguments);}function a(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t.indexOf(r=a[n])>=0||(o[r]=e[r]);return o;}const s=e=>{const{search:t,hash:r,href:n,origin:o,protocol:a,host:s,hostname:i,port:c}=e.location;let{pathname:l}=e.location;return!l&&n&&u&&(l=new URL(n).pathname),{pathname:encodeURI(decodeURI(l)),search:t,hash:r,href:n,origin:o,protocol:a,host:s,hostname:i,port:c,state:e.history.state,key:e.history.state&&e.history.state.key||"initial"};},i=(e,t)=>{let r=[],n=s(e),a=!1,i=()=>{};return{get location(){return n;},get transitioning(){return a;},_onTransitionComplete(){a=!1,i();},listen(t){r.push(t);const o=()=>{n=s(e),t({location:n,action:"POP"});};return e.addEventListener("popstate",o),()=>{e.removeEventListener("popstate",o),r=r.filter(e=>e!==t);};},navigate(t,_temp){let{state:c,replace:u=!1}=_temp===void 0?{}:_temp;if("number"==typeof t)e.history.go(t);else{c=o({},c,{key:Date.now()+""});try{a||u?e.history.replaceState(c,null,t):e.history.pushState(c,null,t);}catch(r){e.location[u?"replace":"assign"](t);}}n=s(e),a=!0;const l=new Promise(e=>i=e);return r.forEach(e=>e({location:n,action:"PUSH"})),l;}};},c=function(e){if(e===void 0){e="/";}const t=e.indexOf("?"),r={pathname:t>-1?e.substr(0,t):e,search:t>-1?e.substr(t):""};let n=0;const o=[r],a=[null];return{get location(){return o[n];},addEventListener(e,t){},removeEventListener(e,t){},history:{get entries(){return o;},get index(){return n;},get state(){return a[n];},pushState(e,t,r){const[s,i=""]=r.split("?");n++,o.push({pathname:s,search:i.length?"?"+i:i}),a.push(e);},replaceState(e,t,r){const[s,i=""]=r.split("?");o[n]={pathname:s,search:i},a[n]=e;},go(e){const t=n+e;t<0||t>a.length-1||(n=t);}}};},u=!("undefined"==typeof window||!window.document||!window.document.createElement),l=i(u?window:c()),{navigate:p}=l;function h(e,r){return react__WEBPACK_IMPORTED_MODULE_0__.createServerContext?function(e,r){if(r===void 0){r=null;}return globalThis.__SERVER_CONTEXT||(globalThis.__SERVER_CONTEXT={}),globalThis.__SERVER_CONTEXT[e]||(globalThis.__SERVER_CONTEXT[e]=react__WEBPACK_IMPORTED_MODULE_0__.createServerContext(e,r)),globalThis.__SERVER_CONTEXT[e];}(e,r):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(r);}const m=h("Base",{baseuri:"/",basepath:"/"}),d=h("Location"),f=()=>react__WEBPACK_IMPORTED_MODULE_0__.useContext(m),y=()=>react__WEBPACK_IMPORTED_MODULE_0__.useContext(d);function E(e){this.uri=e;}const g=e=>e instanceof E,v=e=>{throw new E(e);};function b(t){const{to:r,replace:n=!0,state:o,noThrow:a,baseuri:s}=t;react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{Promise.resolve().then(()=>{const e=k(r,s);p(P(e,t),{replace:n,state:o});});},[]);const i=k(r,s);return a||v(P(i,t)),null;}const R=t=>{const r=y(),{baseuri:n}=f();/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(b,o({},r,{baseuri:n},t));};R.propTypes={from:(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),to:(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired};const C=(e,t)=>e.substr(0,t.length)===t,w=(e,t)=>{let r,o;const[a]=t.split("?"),s=N(a),i=""===s[0],c=j(e);for(let e=0,a=c.length;e<a;e++){let a=!1;const u=c[e].route;if(u.default){o={route:u,params:{},uri:t};continue;}const l=N(u.path),p={},h=Math.max(s.length,l.length);let m=0;for(;m<h;m++){const e=l[m],t=s[m];if($(e)){p[e.slice(1)||"*"]=s.slice(m).map(decodeURIComponent).join("/");break;}if(void 0===t){a=!0;break;}const r=O.exec(e);if(r&&!i){const e=-1===U.indexOf(r[1]);invariant__WEBPACK_IMPORTED_MODULE_1___default()(e,"<Router> dynamic segment \""+r[1]+"\" is a reserved name. Please use a different name in path \""+u.path+"\".");const o=decodeURIComponent(t);p[r[1]]=o;}else if(e!==t){a=!0;break;}}if(!a){r={route:u,params:p,uri:"/"+s.slice(0,m).join("/")};break;}}return r||o||null;},x=(e,t)=>w([{path:e}],t),k=(e,t)=>{if(C(e,"/"))return e;const[r,n]=e.split("?"),[o]=t.split("?"),a=N(r),s=N(o);if(""===a[0])return L(o,n);if(!C(a[0],".")){const e=s.concat(a).join("/");return L(("/"===o?"":"/")+e,n);}const i=s.concat(a),c=[];for(let e=0,t=i.length;e<t;e++){const t=i[e];".."===t?c.pop():"."!==t&&c.push(t);}return L("/"+c.join("/"),n);},P=(e,t)=>{const[r,n=""]=e.split("?");let o="/"+N(r).map(e=>{const r=O.exec(e);return r?t[r[1]]:e;}).join("/");const{location:{search:a=""}={}}=t,s=a.split("?")[1]||"";return o=L(o,n,s),o;},T=(e,t)=>{const r=e=>_(e);return N(e).filter(r).sort().join("/")===N(t).filter(r).sort().join("/");},O=/^:(.+)/,_=e=>O.test(e),$=e=>e&&"*"===e[0],S=(e,t)=>({route:e,score:e.default?0:N(e.path).reduce((e,t)=>(e+=4,(e=>""===e)(t)?e+=1:_(t)?e+=2:$(t)?e-=5:e+=3,e),0),index:t}),j=e=>e.map(S).sort((e,t)=>e.score<t.score?1:e.score>t.score?-1:e.index-t.index),N=e=>e.replace(/(^\/+|\/+$)/g,"").split("/"),L=function(e){for(var _len=arguments.length,t=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){t[_key-1]=arguments[_key];}return e+((t=t.filter(e=>e&&e.length>0))&&t.length>0?"?"+t.join("&"):"");},U=["uri","path"],D=(e,t)=>{const r=Object.keys(e);return r.length===Object.keys(t).length&&r.every(r=>t.hasOwnProperty(r)&&e[r]===t[r]);},M=e=>e.replace(/(^\/+|\/+$)/g,""),I=t=>r=>{if(!r)return null;if(r.type===react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&r.props.children)return react__WEBPACK_IMPORTED_MODULE_0__.Children.map(r.props.children,I(t));if(invariant__WEBPACK_IMPORTED_MODULE_1___default()(r.props.path||r.props.default||r.type===R,"<Router>: Children of <Router> must have a `path` or `default` prop, or be a `<Redirect>`. None found on element type `"+r.type+"`"),invariant__WEBPACK_IMPORTED_MODULE_1___default()(!!(r.type!==R||r.props.from&&r.props.to),"<Redirect from=\""+r.props.from+"\" to=\""+r.props.to+"\"/> requires both \"from\" and \"to\" props when inside a <Router>."),invariant__WEBPACK_IMPORTED_MODULE_1___default()(!(r.type===R&&!T(r.props.from,r.props.to)),"<Redirect from=\""+r.props.from+" to=\""+r.props.to+"\"/> has mismatched dynamic segments, ensure both paths have the exact same dynamic segments."),r.props.default)return{value:r,default:!0};const o=r.type===R?r.props.from:r.props.path,a="/"===o?t:M(t)+"/"+M(o);return{value:r,default:r.props.default,path:r.props.children?M(a)+"/*":a};},V=["innerRef"],q=["to","state","replace","getProps"],X=["key"];let{forwardRef:B}=/*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)));void 0===B&&(B=e=>e);const K=()=>{},A=B((t,r)=>{let{innerRef:n}=t,s=a(t,V);const{baseuri:i}=f(),{location:c}=y(),{to:u,state:l,replace:h,getProps:m=K}=s,d=a(s,q),E=k(u,i),g=encodeURI(E),v=c.pathname===g,b=C(c.pathname,g);/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",o({ref:r||n,"aria-current":v?"page":void 0},d,m({isCurrent:v,isPartiallyCurrent:b,href:E,location:c}),{href:E,onClick:e=>{if(d.onClick&&d.onClick(e),(e=>!e.defaultPrevented&&0===e.button&&!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey))(e)){e.preventDefault();let t=h;if("boolean"!=typeof h&&v){const e=a(o({},c.state),X);t=D(o({},l),e);}p(E,{state:l,replace:t});}}}));});A.displayName="Link",A.propTypes={to:(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired};let F=/*#__PURE__*/function(_e$Component){function F(){var _this;for(var _len2=arguments.length,e=new Array(_len2),_key2=0;_key2<_len2;_key2++){e[_key2]=arguments[_key2];}_this=_e$Component.call.apply(_e$Component,[this].concat(e))||this,_this.displayName="ReactUseErrorBoundary";return _this;}(0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(F,_e$Component);var _proto=F.prototype;_proto.componentDidCatch=function componentDidCatch(){var _this$props;this.setState({}),(_this$props=this.props).onError.apply(_this$props,arguments);};_proto.render=function render(){return this.props.children;};return F;}(react__WEBPACK_IMPORTED_MODULE_0__.Component);const W=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({componentDidCatch:{current:void 0},error:void 0,setError:()=>!1});function H(_ref){let{children:t}=_ref;const[r,n]=react__WEBPACK_IMPORTED_MODULE_0__.useState(),o=react__WEBPACK_IMPORTED_MODULE_0__.useRef(),a=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({componentDidCatch:o,error:r,setError:n}),[r]);/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(W.Provider,{value:a},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(F,{error:r,onError:(e,t)=>{n(e),null==o.current||o.current(e,t);}},t));}H.displayName="ReactUseErrorBoundaryContext";const z=function(t){var r,n;function a(r){/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(H,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(t,o({key:"WrappedComponent"},r)));}return a.displayName="WithErrorBoundary("+(null!=(r=null!=(n=t.displayName)?n:t.name)?r:"Component")+")",a;}(_ref2=>{let{history:t=l,children:r}=_ref2;const{location:n}=t,[o,a]=react__WEBPACK_IMPORTED_MODULE_0__.useState({location:n}),[s]=function(t){const r=react__WEBPACK_IMPORTED_MODULE_0__.useContext(W);r.componentDidCatch.current=void 0;const n=react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{r.setError(void 0);},[]);return[r.error,n];}();if(react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{t._onTransitionComplete();},[o.location]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{let e=!1;const r=t.listen(_ref3=>{let{location:t}=_ref3;Promise.resolve().then(()=>{requestAnimationFrame(()=>{e||a({location:t});});});});return()=>{e=!0,r();};},[]),s){if(!g(s))throw s;p(s.uri,{replace:!0});}/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(d.Provider,{value:o},"function"==typeof r?r(o):r||null);}),G=_ref4=>{let{children:t}=_ref4;const r=y();return r?t(r):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(z,null,t);},J=_ref5=>{let{url:t,children:r}=_ref5;const n=t.indexOf("?");let o,a="";return n>-1?(o=t.substring(0,n),a=t.substring(n)):o=t,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(d.Provider,{value:{location:{pathname:o,search:a,hash:""}}},r);},Q=_ref6=>{let{path:e,children:t}=_ref6;const{baseuri:r}=f(),{location:n}=y(),a=k(e,r),s=x(a,n.pathname);return t({location:n,match:s?o({},s.params,{uri:s.uri,path:e}):null});},Y=["uri","location","component"],Z=["children","style","component","uri","location"],ee=t=>{let{uri:r,location:n,component:s}=t,i=a(t,Y);/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(re,o({},i,{component:s,uri:r,location:n}));};let te=0;const re=t=>{let{children:r,style:n,component:s="div",uri:i,location:c}=t,u=a(t,Z);const l=react__WEBPACK_IMPORTED_MODULE_0__.useRef(),p=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!0),h=react__WEBPACK_IMPORTED_MODULE_0__.useRef(i),m=react__WEBPACK_IMPORTED_MODULE_0__.useRef(c.pathname),d=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1);react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>(te++,f(),()=>{te--,0===te&&(p.current=!0);}),[]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{let e=!1,t=!1;i!==h.current&&(h.current=i,e=!0),c.pathname!==m.current&&(m.current=c.pathname,t=!0),d.current=e||t&&c.pathname===i,d.current&&f();},[i,c]);const f=react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{var e; true&&(p.current?p.current=!1:(e=l.current,d.current&&e&&e.focus()));},[]);/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(s,o({style:o({outline:"none"},n),tabIndex:"-1",ref:l},u),r);},ne=["location","primary","children","basepath","baseuri","component"],oe=t=>{const r=f(),n=y();/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ae,o({},r,n,t));};function ae(t){const{location:r,primary:n=!0,children:s,basepath:i,component:c="div"}=t,u=a(t,ne),l=react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(s).reduce((e,t)=>{const r=I(i)(t);return e.concat(r);},[]),{pathname:p}=r,h=w(l,p);if(h){const{params:t,uri:a,route:s,route:{value:l}}=h,p=s.default?i:s.path.replace(/\*$/,""),d=o({},t,{uri:a,location:r}),f=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(l,d,l.props.children?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(oe,{location:r,primary:n},l.props.children):void 0),y=n?ee:c,E=n?o({uri:a,location:r,component:c},u):u;/*#__PURE__*/return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(m.Provider,{value:{baseuri:a,basepath:p}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(y,E,f));}return null;}const se=()=>{const e=y();if(!e)throw new Error("useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");return e.location;},ie=()=>{throw new Error("useNavigate is removed. Use import { navigate } from 'gatsby' instead");},ce=()=>{const e=f();if(!e)throw new Error("useParams hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");const t=se(),r=x(e.basepath,t.pathname);return r?r.params:null;},ue=e=>{if(!e)throw new Error("useMatch(path: string) requires an argument of a string to match against");const t=f();if(!t)throw new Error("useMatch hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");const r=se(),n=k(e,t.baseuri),a=x(n,r.pathname);return a?o({},a.params,{uri:a.uri,path:e}):null;};

/***/ }),

/***/ 56763:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  defaultLocale: function() { return /* reexport */ defaultLocale; },
  localeCodes: function() { return /* reexport */ localeCodes; },
  localeWithoutDefaultCodes: function() { return /* reexport */ localeWithoutDefaultCodes; },
  locales: function() { return /* reexport */ locales_locales; },
  localesPme: function() { return /* reexport */ locales; },
  localesVpn: function() { return /* reexport */ locales_vpn_locales; },
  prismicToProton: function() { return /* reexport */ prismicToProton; },
  protonToName: function() { return /* reexport */ protonToName; }
});

// UNUSED EXPORTS: isAllPagesShouldBeTranslated, isBlog, isLocaleCode, isLocaleWithoutDefaultCode, isNotOfficialLocaleCode, localesWithoutDefault, notOfficialLocaleCodes, notOfficialLocales, protonToCrowdin, protonToPrismic, protonToWordpress, wordpressToProton

;// CONCATENATED MODULE: ../../packages/localization/src/locales-pme.ts
const locales=[{code:'en',crowdinCode:'en',flagCode:'en',prismicCode:'en-us',wpCode:'en_US',name:'English',blog:true,allPagesShouldBeTranslated:true},{code:'de',crowdinCode:'de',flagCode:'de',prismicCode:'de-de',wpCode:'de_DE',name:'Deutsch',blog:false,allPagesShouldBeTranslated:true},{code:'fr',crowdinCode:'fr',flagCode:'fr',prismicCode:'fr-fr',wpCode:'fr_FR',name:'Français',blog:true,allPagesShouldBeTranslated:true},{code:'es-es',crowdinCode:'es-es',flagCode:'es',prismicCode:'es-es',wpCode:'es_ES',name:'Español (España)',blog:false,allPagesShouldBeTranslated:true},{code:'es-419',crowdinCode:'es-419',flagCode:'mx',prismicCode:'es-la',wpCode:'es_LA',name:'Español (Latinoamérica)',blog:false,allPagesShouldBeTranslated:true},{code:'it',crowdinCode:'it',flagCode:'it',prismicCode:'it-it',wpCode:'it_IT',name:'Italiano',blog:false,allPagesShouldBeTranslated:true},{code:'nl',crowdinCode:'nl',flagCode:'nl',prismicCode:'nl-nl',wpCode:'nl_NL',name:'Nederlands',blog:false,allPagesShouldBeTranslated:true},{code:'pl',crowdinCode:'pl',flagCode:'pl',prismicCode:'pl',wpCode:'pl_PL',name:'Polski',blog:false,allPagesShouldBeTranslated:true},{code:'pt-br',crowdinCode:'pt-br',flagCode:'br',prismicCode:'pt-br',wpCode:'pt_BR',name:'Português (Brasil)',blog:false,allPagesShouldBeTranslated:true},{code:'ru',crowdinCode:'ru',flagCode:'ru',prismicCode:'ru',wpCode:'ru_RU',name:'Русский',blog:false,allPagesShouldBeTranslated:true},{code:'tr',crowdinCode:'tr',flagCode:'tr',prismicCode:'tr',wpCode:'tr_TR',name:'Türkçe',blog:false,allPagesShouldBeTranslated:true},{code:'cs',crowdinCode:'cs',flagCode:'cs',prismicCode:'cs-cz',wpCode:'cs_CZ',name:'Čeština',blog:false,allPagesShouldBeTranslated:true},{code:'da',crowdinCode:'da',flagCode:'da',prismicCode:'da-dk',wpCode:'da_DK',name:'Dansk',blog:false,allPagesShouldBeTranslated:true},{code:'fi',crowdinCode:'fi',flagCode:'fi',prismicCode:'fi',wpCode:'fi',name:'Suomi',blog:false,allPagesShouldBeTranslated:true},{code:'pt',crowdinCode:'pt-pt',flagCode:'pt',prismicCode:'pt-pt',wpCode:'pt_PT',name:'Português (Portugal)',blog:false,allPagesShouldBeTranslated:true},{code:'ro',crowdinCode:'ro',flagCode:'ro',prismicCode:'ro',wpCode:'ro_RO',name:'Română',blog:false,allPagesShouldBeTranslated:true},{code:'sv',crowdinCode:'sv-se',flagCode:'sv',prismicCode:'sv-se',wpCode:'sv_SE',name:'Svenska',blog:false,allPagesShouldBeTranslated:true}];
;// CONCATENATED MODULE: ../../packages/localization/src/locales-vpn.ts
const locales_vpn_locales=[{code:'en',crowdinCode:'en',flagCode:'en',prismicCode:'en-us',wpCode:'en_US',name:'English',blog:true,allPagesShouldBeTranslated:true},{code:'de',crowdinCode:'de',flagCode:'de',prismicCode:'de-de',wpCode:'de_DE',name:'Deutsch',blog:false,allPagesShouldBeTranslated:true},{code:'fr',crowdinCode:'fr',flagCode:'fr',prismicCode:'fr-fr',wpCode:'fr_FR',name:'Français',blog:false,allPagesShouldBeTranslated:true},{code:'es-es',crowdinCode:'es-es',flagCode:'es',prismicCode:'es-es',wpCode:'es_ES',name:'Español (España)',blog:false,allPagesShouldBeTranslated:true},{code:'es-419',crowdinCode:'es-419',flagCode:'mx',prismicCode:'es-la',wpCode:'es_LA',name:'Español (Latinoamérica)',blog:false,allPagesShouldBeTranslated:true},{code:'it',crowdinCode:'it',flagCode:'it',prismicCode:'it-it',wpCode:'it_IT',name:'Italiano',blog:false,allPagesShouldBeTranslated:true},{code:'nl',crowdinCode:'nl',flagCode:'nl',prismicCode:'nl-nl',wpCode:'nl_NL',name:'Nederlands',blog:false,allPagesShouldBeTranslated:true},{code:'pl',crowdinCode:'pl',flagCode:'pl',prismicCode:'pl',wpCode:'pl_PL',name:'Polski',blog:false,allPagesShouldBeTranslated:true},{code:'pt-br',crowdinCode:'pt-br',flagCode:'br',prismicCode:'pt-br',wpCode:'pt_BR',name:'Português (Brasil)',blog:false,allPagesShouldBeTranslated:true},{code:'ru',crowdinCode:'ru',flagCode:'ru',prismicCode:'ru',wpCode:'ru_RU',name:'Русский',blog:false,allPagesShouldBeTranslated:true},{code:'tr',crowdinCode:'tr',flagCode:'tr',prismicCode:'tr',wpCode:'tr_TR',name:'Türkçe',blog:false,allPagesShouldBeTranslated:true},{code:'cs',crowdinCode:'cs',flagCode:'cs',prismicCode:'cs-cz',wpCode:'cs_CZ',name:'Čeština',blog:false,allPagesShouldBeTranslated:true},{code:'ko',crowdinCode:'ko',flagCode:'ko',prismicCode:'ko-kr',wpCode:'ko_KR',name:'한국어',blog:false,allPagesShouldBeTranslated:true},{code:'ja',crowdinCode:'ja',flagCode:'ja',prismicCode:'ja-jp',wpCode:'ja',name:'日本語',blog:false,allPagesShouldBeTranslated:true}];
;// CONCATENATED MODULE: ../../packages/localization/src/locales.ts
const website="protonvpn-com";const locales_locales=(()=>{switch(website){case'proton-me':return locales;case'protonvpn-com':return locales_vpn_locales;default:throw new Error("[@protonme/localization]: No locales available for \""+website+"\"");}})();
;// CONCATENATED MODULE: ../../packages/localization/src/computes.ts
const defaultLocale=locales_locales[0];const localesWithoutDefault=locales_locales.slice(1);const notOfficialLocales=locales_locales.filter(locale=>!locale.allPagesShouldBeTranslated);const localeCodes=locales_locales.map(locale=>locale.code);const localeWithoutDefaultCodes=localesWithoutDefault.map(locale=>locale.code);const notOfficialLocaleCodes=notOfficialLocales.map(locale=>locale.code);const isLocaleCode=code=>localeCodes.includes(code||'');const isLocaleWithoutDefaultCode=code=>localeWithoutDefaultCodes.includes(code||'');const isNotOfficialLocaleCode=code=>notOfficialLocaleCodes.includes(code||'');const mapString=(key,value)=>locales_locales.reduce((acc,locale)=>{acc[locale[key]]=locale[value];return acc;},{});const prismicToProtonMap=mapString('prismicCode','code');const protonToPrismicMap=mapString('code','prismicCode');const wordpressToProtonMap=mapString('wpCode','code');const protonToWordpressMap=mapString('code','wpCode');const protonToNameMap=mapString('code','name');const protonToCrowdinMap=mapString('code','crowdinCode');const prismicToProton=prismicCode=>prismicToProtonMap[prismicCode];const protonToPrismic=code=>protonToPrismicMap[code];const wordpressToProton=wpCode=>wordpressToProtonMap[wpCode];const protonToWordpress=code=>protonToWordpressMap[code];const protonToName=code=>protonToNameMap[code];const protonToCrowdin=code=>protonToCrowdinMap[code];const mapBoolean=(key,value)=>locales_locales.reduce((acc,locale)=>{acc[locale[key]]=locale[value];return acc;},{});const isBlogMap=mapBoolean('code','blog');const isAllPagesShouldBeTranslatedMap=mapBoolean('code','allPagesShouldBeTranslated');const isBlog=code=>isBlogMap[code]||false;const isAllPagesShouldBeTranslated=code=>isAllPagesShouldBeTranslatedMap[code]||false;
;// CONCATENATED MODULE: ../../packages/localization/src/index.ts


/***/ }),

/***/ 93061:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NF: function() { return /* binding */ DOWNLOAD_LINKS; },
/* harmony export */   ZE: function() { return /* binding */ products; },
/* harmony export */   eZ: function() { return /* binding */ RESOURCES; },
/* harmony export */   m_: function() { return /* binding */ EXTERNAL_LINKS; },
/* harmony export */   ow: function() { return /* binding */ FALLBACK_ORIGIN; },
/* harmony export */   q7: function() { return /* binding */ INTERNAL_LINKS; }
/* harmony export */ });
const products=['business','calendar','drive','mail','pass','vpn'];const DOWNLOAD_LINKS={MAIL:{ANDROID:'https://proton.me/download/MailAndroid/ProtonMail-Android.apk',APP_STORE:'https://apps.apple.com/us/app/proton-mail-encrypted-email/id979659905',GOOGLE_PLAY:'https://play.google.com/store/apps/details?id=ch.protonmail.android'},CALENDAR:{ANDROID:'https://proton.me/download/CalendarAndroid/ProtonCalendar-Android.apk',APP_STORE:'https://apps.apple.com/us/app/proton-calendar-secure-events/id1514709943',GOOGLE_PLAY:'https://play.google.com/store/apps/details?id=me.proton.android.calendar'},DRIVE:{ANDROID:'https://proton.me/download/DriveAndroid/ProtonDrive-Android.apk',APP_STORE:'https://apps.apple.com/us/app/proton-drive-cloud-storage/id1509667851',GOOGLE_PLAY:'https://play.google.com/store/apps/details?id=me.proton.android.drive'},PASS:{APP_STORE:'https://apps.apple.com/us/app/proton-pass-password-manager/id6443490629',GOOGLE_PLAY:'https://play.google.com/store/apps/details?id=proton.android.pass',CHROME_WEB_STORE:'https://chrome.google.com/webstore/detail/proton-pass-free-password/ghmbeldphafepmbegfdlkpapadhbakde',FIREFOX_ADD_ONS:'https://addons.mozilla.org/en-US/firefox/addon/proton-pass/'},BRIDGE:{MACOS:'https://proton.me/download/bridge/Bridge-Installer.dmg',WINDOWS:'https://proton.me/download/bridge/Bridge-Installer.exe'},IMPORT_EXPORT:{LINUX:'https://proton.me/download/ie/PKGBUILD',MACOS:'https://proton.me/download/ie/Import-Export-app.dmg',WINDOWS:'https://proton.me/download/ie/Import-Export-app-installer.exe'},VPN:{ANDROID:{CHROMEBOOK:'https://play.google.com/store/apps/details?id=ch.protonvpn.android',FDROID:'https://f-droid.org/en/packages/ch.protonvpn.android/',GITHUB:'https://protonvpn.com/blog/download-android-app-on-github/'},APP_STORE:'https://apps.apple.com/us/app/proton-vpn-fast-secure/id1437005085',GOOGLE_PLAY:'https://play.google.com/store/apps/details?id=ch.protonvpn.android',LINUX:'https://protonvpn.com/support/linux-vpn-setup/',CHROME_WEB_STORE:'https://chromewebstore.google.com/detail/proton-vpn-a-swiss-vpn-yo/jplgfhpmjnbigmhklmmbgecoobifkmpa',FIREFOX_ADD_ONS:'https://addons.mozilla.org/en-US/firefox/addon/proton-vpn-firefox-extension/'}};const INTERNAL_LINKS={BUSINESS:'/business',BUSINESS_PLANS:'/business/plans',PRICING:'/pricing',PASS_PRICING:'https://account.proton.me/pass/signup',PASS_BUSINESS:'https://account.proton.me/pass/signup/business',PRICING_EXPERIMENT:'/pricing?ref=hdrbtncta',MAIL_PRICING:'/mail/pricing',DRIVE_PRICING:'/drive/pricing',MAIL:'/mail',CALENDAR:'/calendar',DRIVE:'/drive',VPN:'https://protonvpn.com',PASS:'/pass',FAMILY:'/family',PME_BLOG_FEED:'/blog/feed'};const EXTERNAL_LINKS={DRIVE_SIGN_UP:'https://account.proton.me/drive/signup?ref=hdrbtndrctcta'};const RESOURCES={FACEBOOK:'https://www.facebook.com/Proton',INSTAGRAM:'https://www.instagram.com/protonprivacy/',LINKEDIN:'https://www.linkedin.com/company/protonprivacy/',MASTODON:'https://mastodon.social/@protonprivacy',REDDIT:{PME:'https://www.reddit.com/r/ProtonMail/',VPN:'https://www.reddit.com/r/ProtonVPN/'},TWITTER:{PME:'https://twitter.com/intent/user?screen_name=ProtonPrivacy',VPN:'https://twitter.com/intent/user?screen_name=ProtonVPN'},WIKIPEDIA:'https://en.wikipedia.org/wiki/ProtonMail',YOUTUBE:'https://www.youtube.com/@ProtonAG?sub_confirmation=1'};const FALLBACK_ORIGIN=(()=>{switch("protonvpn-com"){case'proton-me':return'https://proton.me';case'protonvpn-com':return'https://protonvpn.com';default:throw new Error("ERROR [@protonme/routing]: Unhandeled process.env.WEBSITE of \""+"protonvpn-com"+"\". Make sure env variable WEBSITE is set and handeled.");}})();

/***/ }),

/***/ 22422:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  NF: function() { return /* reexport */ constants/* DOWNLOAD_LINKS */.NF; },
  ow: function() { return /* reexport */ constants/* FALLBACK_ORIGIN */.ow; },
  q7: function() { return /* reexport */ constants/* INTERNAL_LINKS */.q7; },
  IK: function() { return /* reexport */ locale_addLocale; },
  lX: function() { return /* reexport */ getProtonAccountUrl; },
  uQ: function() { return /* reexport */ getProtonUrl_getProtonUrl; },
  Aj: function() { return /* reexport */ getRelativePath; },
  $m: function() { return /* reexport */ isActive; },
  pw: function() { return /* reexport */ protonLink; }
});

// UNUSED EXPORTS: EXTERNAL_LINKS, RESOURCES, buildPath, getCtaHref, getLocaleFromAccountUrlPathname, getLocaleFromAccountUrlSearchParams, getParameterizedLink, getPrimaryB2cShortcutLink, getProductFromAccountUrlPathname, getProductFromAccountUrlSearchParams, getSignInLink, isBlog, isProtonAccountUrl, isSupportWP, isWP, products

// EXTERNAL MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(15553);
// EXTERNAL MODULE: ../../packages/localization/src/index.ts + 4 modules
var src = __webpack_require__(56763);
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/testIsDownload.ts
const downloadExtensions=['.apk','.exe','.dmg','PKGBUILD','.pol','.deb','.rpm','.txt','.pdf'];const testIsDownload=restParts=>{const lastPart=restParts[restParts.length-1];const isDownload=lastPart?downloadExtensions.some(extension=>lastPart.endsWith(extension)):false;return isDownload;};
// EXTERNAL MODULE: ../../packages/routing/src/constants.ts
var constants = __webpack_require__(93061);
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/getSanitizedUrl.ts
/**
 * Helper to sanitize Prismic URLs.
 * Prismic might pass "https:///foo/bar" instead of "/foo/bar".
 * This helper can be removed once we go away from Prismic and are sure we get clean URLs.
 */const getSanitizedUrl=url=>{let sanitizedUrl;if(typeof url==='string'){// catch http(s):/// hrefs (Prismic might return https:///foo/bar)
const isBadFormattedPrismicLink=/^http(s?):\/\/\//g.test(url);if(isBadFormattedPrismicLink){sanitizedUrl=new URL(url.substring(url.indexOf('//')+2),constants/* FALLBACK_ORIGIN */.ow);}else{sanitizedUrl=new URL(url,constants/* FALLBACK_ORIGIN */.ow);}}else{sanitizedUrl=new URL(url.href,constants/* FALLBACK_ORIGIN */.ow);}// replace www. from proton.me and protonvpn.com
if(sanitizedUrl.hostname==='www.proton.me'||sanitizedUrl.hostname==='www.protonvpn.com'){sanitizedUrl=new URL(sanitizedUrl.href.replace('www.',''));}// force https but don't overwrite alternative protocols (e.g. mailto:)
sanitizedUrl.protocol=sanitizedUrl.protocol==='http:'?'https:':sanitizedUrl.protocol;return sanitizedUrl;};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/getDefaultPathname.ts
const getDefaultPathname=(restParts,context)=>{const baseParts=[''].concat((0,toConsumableArray/* default */.A)(context?[context]:[]),(0,toConsumableArray/* default */.A)(restParts));return baseParts.join('/');};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/getProduct.ts
const products=['mail','calendar','drive','pass','vpn'];const getProduct=(restParts,website)=>{// protonvpn.com urls are always vpn product
if(website!==null&&website!==void 0&&website.includes('protonvpn-com')){return'vpn';}if(restParts.length===0){return null;}// if any url part contains a product we return it
return products.find(product=>restParts.some(part=>part===product))||null;};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/getWebsite.ts
const getWebsite=(url,project)=>{if(url.origin==='https://proton.me'){return'proton-me'+(project?"-"+project:'');}if(url.origin==='https://protonvpn.com'){return'protonvpn-com'+(project?"-"+project:'');}return null;};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/testIsB2B.ts
const testIsB2B=restParts=>{const isB2B=restParts.length>=1&&restParts[0]==='business';return isB2B;};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/testIsPreview.ts
const testIsPreview=restParts=>{const isPreview=restParts.length===1&&restParts[0]==='preview';return isPreview;};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/testIsPricing.ts
const testIsPricing=restParts=>{const lastPart=restParts[restParts.length-1];const isPricing=lastPart==='pricing'||lastPart==='plans';return isPricing;};
;// CONCATENATED MODULE: ../../packages/routing/src/helpers/parseProtonUrl.ts
const contexts=['','blog','support'];const getLocalesWithoutDefaultCode=website=>(website!==null&&website!==void 0&&website.includes('protonvpn-com')?src.localesVpn:src.localesPme).slice(1).map(locale=>locale.code);const parseProtonUrl=protonUrl=>{const parts=protonUrl.pathname.split('/').filter(part=>part!=='');const context=contexts.find(part=>part===parts[0]);const website=getWebsite(protonUrl,context);const localesWithoutDefaultCode=getLocalesWithoutDefaultCode(website);const localeIndex=context?1:0;const isLocalized=localesWithoutDefaultCode.includes(parts[localeIndex]);const locale=isLocalized?parts[localeIndex]:src.defaultLocale.code;// works as long as projects share same default locale ;)
const restIndex=isLocalized?localeIndex+1:localeIndex;const restParts=parts.slice(restIndex);const defaultPathname=getDefaultPathname(restParts,context);const defaultUrl=new URL(defaultPathname+protonUrl.search+protonUrl.hash,protonUrl.origin);const product=getProduct(restParts,website);const isCurrentOrigin=!!( true&&website!==null&&website!==void 0&&website.includes("protonvpn-com"));const isB2B=testIsB2B(restParts);const isPricing=testIsPricing(restParts);const isPreview=testIsPreview(restParts);const isDownload=testIsDownload(restParts);return{locale,defaultUrl,website,product,isCurrentOrigin,isB2B,isPricing,isDownload,isPreview};};
;// CONCATENATED MODULE: ../../packages/routing/src/getProtonUrl.ts
const getProtonUrl_getProtonUrl=url=>{const sanitizedUrl=getSanitizedUrl(url);// proton urls
// Test against "origin" and NOT "hostname" otherwise it will fail on TOR. (GS-2257)
// This is because when we serve on TOR we search and replace "https://proton.me" with "https://protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion/" in all files we serve.
// See nginx configuration: https://gitlab.protontech.ch/kubernetes/stacks/appedge-apache/-/blob/master/proton.me/values.yaml?ref_type=heads#L15-19
if(sanitizedUrl.origin==='https://proton.me'||sanitizedUrl.origin==='https://protonvpn.com'){const protonUrlProperties=parseProtonUrl(sanitizedUrl);const protonUrl=Object.assign(sanitizedUrl,protonUrlProperties);return protonUrl;}// external url
return undefined;};
;// CONCATENATED MODULE: ../../packages/routing/src/locale.ts
const testIsOfficialLocaleCode=(locale,protonUrl)=>{var _protonUrl$website;const localeCodes=((_protonUrl$website=protonUrl.website)!==null&&_protonUrl$website!==void 0&&_protonUrl$website.includes('protonvpn-com')?src.localesVpn:src.localesPme).map(locale=>locale.code);return localeCodes.some(code=>code===locale);};const locale_addLocale=function(protonUrl,locale,overwriteExistingLocales,forceBlogAndSupport){var _copy$website,_copy$website2,_copy$defaultUrl,_copy$defaultUrl3,_copy$website3,_copy$website4;if(locale===void 0){locale=src.defaultLocale.code;}if(overwriteExistingLocales===void 0){overwriteExistingLocales=false;}if(forceBlogAndSupport===void 0){forceBlogAndSupport=false;}const copy=getProtonUrl_getProtonUrl(protonUrl.href);if(!copy){return protonUrl;}// protonUrl already contains known locale
if(copy.locale!==src.defaultLocale.code){if(overwriteExistingLocales&&copy.defaultUrl){return locale_addLocale(copy.defaultUrl,locale,overwriteExistingLocales);}return copy;}// prevent default locale from being added
if(locale===src.defaultLocale.code){return copy;}// prevent not official local to localize blog and support
if(!forceBlogAndSupport&&!testIsOfficialLocaleCode(locale,copy)&&copy.website&&((_copy$website=copy.website)!==null&&_copy$website!==void 0&&_copy$website.includes('blog')||(_copy$website2=copy.website)!==null&&_copy$website2!==void 0&&_copy$website2.includes('support'))){return copy;}// special exception for /blog/feed not to localize
if(((_copy$defaultUrl=copy.defaultUrl)===null||_copy$defaultUrl===void 0?void 0:_copy$defaultUrl.pathname)==='/blog/feed'){return copy;}// special exception for download files not to localize
if(downloadExtensions.some(ext=>{var _copy$defaultUrl2;return(_copy$defaultUrl2=copy.defaultUrl)===null||_copy$defaultUrl2===void 0?void 0:_copy$defaultUrl2.pathname.endsWith(ext);})){return copy;}const urlParts=((_copy$defaultUrl3=copy.defaultUrl)===null||_copy$defaultUrl3===void 0?void 0:_copy$defaultUrl3.pathname.split('/').filter(part=>part!==''))||[];const newUrlParts=!((_copy$website3=copy.website)!==null&&_copy$website3!==void 0&&_copy$website3.includes('blog')||(_copy$website4=copy.website)!==null&&_copy$website4!==void 0&&_copy$website4.includes('support'))?['',locale].concat((0,toConsumableArray/* default */.A)(urlParts.slice(0))):['',copy.website.includes('blog')?'blog':'support',locale].concat((0,toConsumableArray/* default */.A)(urlParts.slice(1)));copy.pathname=newUrlParts.join('/');return copy;};
;// CONCATENATED MODULE: ../../packages/routing/src/getRelativePath.ts
/**
 * Returns a relative pathname of the provided URL.
 * Url doesn't matter, it will just return a relative URL of it.
 * Example:
 * ```txt
 * https://foo.bar/aaa/bb/c => /aaa/bb/c
 * ```
 */const getRelativePath=url=>{if(typeof url==='string'){const newUrl=new URL(url,constants/* FALLBACK_ORIGIN */.ow);return newUrl.pathname+newUrl.search+newUrl.hash;}return url.pathname+url.search+url.hash;};
;// CONCATENATED MODULE: ../../packages/routing/src/account.ts
// account url can handle all locales
const localesWithoutDefault=[].concat((0,toConsumableArray/* default */.A)(src.localesPme.slice(1)),(0,toConsumableArray/* default */.A)(src.localesVpn.slice(1)));const isProtonAccountUrl=url=>url.hostname==='account.proton.me'||url.hostname==='account.protonvpn.com';const getProductFromAccountUrlPathname=url=>{const product=url.pathname.split('/').find(path=>constants/* products */.ZE.includes(path));return product||'';};const getProductFromAccountUrlSearchParams=function(url,searchParamKey){if(searchParamKey===void 0){searchParamKey='product';}// find product name in any param
// if (!searchParamKey) {
//     const searchParamValues = Array.from(url.searchParams.values());
//     const product = searchParamValues.find((searchParamValue) =>
//         KNOWN_PRODUCT_PARMS.filter(product => product !== "generic").includes(searchParamValue)
//     );
//     return product;
// }
const searchParamValue=url.searchParams.get(searchParamKey);const product=constants/* products */.ZE.find(product=>product===searchParamValue);return product||'';};const getLocaleFromAccountUrlPathname=url=>{const locale=localesWithoutDefault.find(locale=>url.pathname.split('/')[1]===locale.code);return(locale===null||locale===void 0?void 0:locale.code)||'';};const getLocaleFromAccountUrlSearchParams=function(url,searchParamKey){if(searchParamKey===void 0){searchParamKey='language';}const searchParamValue=url.searchParams.get(searchParamKey);const locale=localesWithoutDefault.find(locale=>locale.code===searchParamValue);return(locale===null||locale===void 0?void 0:locale.code)||'';};const getProtonAccountUrl=(accountUrl,currentUrl)=>{if(!isProtonAccountUrl(accountUrl)){return accountUrl;}const localeInAccountUrl=getLocaleFromAccountUrlPathname(accountUrl);const productInAccountUrl=getProductFromAccountUrlPathname(accountUrl);const language=getLocaleFromAccountUrlSearchParams(accountUrl)||localeInAccountUrl||getLocaleFromAccountUrlSearchParams(currentUrl)||getLocaleFromAccountUrlPathname(currentUrl)||'';const product=getProductFromAccountUrlSearchParams(accountUrl)||productInAccountUrl||getProductFromAccountUrlSearchParams(currentUrl)||getProductFromAccountUrlPathname(currentUrl)||'';const newAccountUrl=new URL(accountUrl);const newPathname=((language?"/"+language:'')+(product?"/"+product:'')+newAccountUrl.pathname.replace(localeInAccountUrl&&"/"+localeInAccountUrl,'').replace(productInAccountUrl&&"/"+productInAccountUrl,'').replace(/\/generic\//,'/').replace(/\/generic$/,'').replace(/(^$|^\/$)/,product?'/':'/login')).replace(/\/$/,'').replace('es-419','es');newAccountUrl.searchParams.delete('product');newAccountUrl.searchParams.delete('language');return new URL(newAccountUrl.origin+newPathname+newAccountUrl.search);};
;// CONCATENATED MODULE: ../../packages/routing/src/isActive.ts
const matchUrl=(destinationUrl,currentUrl)=>{return(destinationUrl===null||destinationUrl===void 0?void 0:destinationUrl.isCurrentOrigin)&&(destinationUrl===null||destinationUrl===void 0?void 0:destinationUrl.defaultUrl.pathname)&&(currentUrl===null||currentUrl===void 0?void 0:currentUrl.defaultUrl.pathname)&&(destinationUrl===null||destinationUrl===void 0?void 0:destinationUrl.defaultUrl.pathname)===(currentUrl===null||currentUrl===void 0?void 0:currentUrl.defaultUrl.pathname)&&(destinationUrl===null||destinationUrl===void 0?void 0:destinationUrl.website)===(currentUrl===null||currentUrl===void 0?void 0:currentUrl.website);};// What is parentUrls doing??? 🐰🕳️
const isActive=function(destinationUrl,currentUrl,parentUrls){if(parentUrls===void 0){parentUrls=[];}if(matchUrl(currentUrl,destinationUrl)){return true;}return parentUrls.some(url=>matchUrl(destinationUrl,getProtonUrl_getProtonUrl(url)));};
;// CONCATENATED MODULE: ../../packages/routing/src/getPrimaryB2cShortcutLink.ts
const linkPricing=constants/* INTERNAL_LINKS */.q7.PRICING;const linkPricingExperiment=constants/* INTERNAL_LINKS */.q7.PRICING_EXPERIMENT;const linkMail=constants/* INTERNAL_LINKS */.q7.MAIL;const linkDrive=constants/* INTERNAL_LINKS */.q7.DRIVE;const linkPass=constants/* INTERNAL_LINKS */.q7.PASS_PRICING;const linkPassBusiness=constants/* INTERNAL_LINKS */.q7.PASS_BUSINESS;const linkHomePageDriveCta=constants/* EXTERNAL_LINKS */.m_.DRIVE_SIGN_UP;// 🦕 TODO: Move to shared
const getPrimaryB2cShortcutLink=url=>{if((url===null||url===void 0?void 0:url.product)==='drive'){return(url===null||url===void 0?void 0:url.defaultUrl.pathname)==='/drive'?linkHomePageDriveCta:linkDrive+linkPricing+'?ref=hdrbtndrctcta';}if((url===null||url===void 0?void 0:url.product)==='pass'){const isPassBusiness=url===null||url===void 0?void 0:url.defaultUrl.pathname.startsWith('/business/pass');const passLink=isPassBusiness?linkPassBusiness:linkPass;const passUrl=new URL(passLink);const passRef=isPassBusiness?'hdrpssbizcta':'hdrbtnpsscta';return((url===null||url===void 0?void 0:url.locale)!==defaultLocale.code?passUrl.origin+"/"+(url===null||url===void 0?void 0:url.locale)+passUrl.pathname:passLink)+("?ref="+passRef);}if((url===null||url===void 0?void 0:url.product)==='mail'||(url===null||url===void 0?void 0:url.product)==='calendar'||url!==null&&url!==void 0&&url.defaultUrl.pathname.startsWith('/easyswitch')){return linkMail+linkPricing+'?ref=hdrbtnnbxcta';}if((url===null||url===void 0?void 0:url.defaultUrl.pathname)==='/'){return linkMail+linkPricingExperiment;}return linkPricing+'?ref=hdrbtncta';};
;// CONCATENATED MODULE: ../../packages/routing/src/buildPath.ts
/**
 * Only used by Gatsby to build pages.
 * Can be removed once we move away from Gatsby.
 */const buildPath=function(basePathname,locale){if(locale===void 0){locale=defaultLocale.code;}const protonUrl=getProtonUrl(basePathname);const withLocale=addLocale(protonUrl,locale,true,true);return withLocale.pathname;};
;// CONCATENATED MODULE: ../../packages/routing/src/getCtaHref.ts
const KNOWN_PRODUCT_PARMS=(/* unused pure expression or super */ null && (['vpn','mail','drive','calendar','generic','business','pass']));const isTime=time=>{return Date.now()>time?true:false;};// 🦕 TODO: Move to proton-me
const getCtaHref=(_ref,_ref2)=>{let{pageType,months,currency,product,selectedProduct,enableFreeTrialFlow}=_ref;let{key,locale,ref,coupon}=_ref2;const EXPERIMENT_END=Date.UTC(2023,2,17,14,0,0);const isExperimentActive=!isTime(EXPERIMENT_END);const productParam=KNOWN_PRODUCT_PARMS.includes(product)?product:selectedProduct;if(['Mail'].includes(pageType||'')&&key==='free'&&enableFreeTrialFlow&&isExperimentActive){return"https://account.proton.me/"+(locale===defaultLocale.code?'':locale+"/")+productParam+"/trial"+(ref?"?ref="+ref:'');}return"https://account.proton.me/"+productParam+"/signup?plan="+key+"&billing="+months+"&minimumCycle="+months+"&currency="+currency+(ref?"&ref="+ref:'')+(coupon?"&coupon="+coupon:'');};
;// CONCATENATED MODULE: ../../packages/routing/src/protonLink.ts
const protonLink=(linkAttributes,_ref)=>{let{currentUrl}=_ref;const url=getProtonUrl_getProtonUrl(linkAttributes.href)||new URL(linkAttributes.href,constants/* FALLBACK_ORIGIN */.ow);const getLocalUrl=url=>locale_addLocale(url,currentUrl.locale).href.replace(currentUrl.origin,'');if((url===null||url===void 0?void 0:url.protocol)==='mailto:'||(url===null||url===void 0?void 0:url.protocol)==='tel:'){return{href:url===null||url===void 0?void 0:url.href};}if((url===null||url===void 0?void 0:url.hostname)==='account.proton.me'||(url===null||url===void 0?void 0:url.hostname)==='account.protonvpn.com'){return{rel:'noopener noreferrer',href:getProtonAccountUrl(url,currentUrl).href};}// External link, always open in a new tab
if((url===null||url===void 0?void 0:url.hostname)!==currentUrl.hostname){return{href:url.href,target:'_blank',rel:'noopener noreferrer'};}if((url===null||url===void 0?void 0:url.hash)!==''){// check if hash is related to the current page or an other page
// 'https://proton.me/#' is matching anchors to current page once gone through getProtonUrl() helper
if(currentUrl.pathname.endsWith(url===null||url===void 0?void 0:url.pathname)||url!==null&&url!==void 0&&url.href.startsWith("https://"+currentUrl.hostname+"/#")){return{href:url===null||url===void 0?void 0:url.hash};}}// Internal link but with explicit target _blank
if(linkAttributes.target==='_blank'){return{href:getLocalUrl(url),target:'_blank',rel:'noopener noreferrer'};}// internal link using gatsby router
return{href:getLocalUrl(url)};};
;// CONCATENATED MODULE: ../../packages/routing/src/index.ts


/***/ }),

/***/ 66718:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ci: function() { return /* binding */ PREFERRED_LANGUAGE_COOKIE; },
  eB: function() { return /* binding */ setPreferredLanguage; }
});

// UNUSED EXPORTS: PreferredLanguage, getBrowserLanguage, setLanguageMessageCookie

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
// EXTERNAL MODULE: ../../packages/localization/src/index.ts + 4 modules
var src = __webpack_require__(56763);
// EXTERNAL MODULE: ../../packages/routing/src/index.ts + 18 modules
var routing_src = __webpack_require__(22422);
// EXTERNAL MODULE: ../../packages/ttag/src/index.ts + 2 modules
var ttag_src = __webpack_require__(96764);
// EXTERNAL MODULE: ../../packages/shared/helpers/cookies.ts
var cookies = __webpack_require__(23417);
// EXTERNAL MODULE: ../../packages/shared/hooks/useCookie.ts
var hooks_useCookie = __webpack_require__(60458);
// EXTERNAL MODULE: ../../packages/shared/modules/framework/changeCurrentLocale.ts
var framework_changeCurrentLocale = __webpack_require__(67726);
// EXTERNAL MODULE: ../../packages/shared/modules/framework/useFramework.ts + 6 modules
var framework_useFramework = __webpack_require__(78912);
// EXTERNAL MODULE: ../../packages/shared/helpers/background.ts
var background = __webpack_require__(22208);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(63159);
;// CONCATENATED MODULE: ../../packages/shared/components/Notification/Notification.tsx
var _templateObject;const Notification_Notification=_ref=>{let{backgroundColor='white',icon:Icon,show,content,// Disabled because we want an empty function as fallback to reduce redundant code
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClose=()=>{},onTimeOver,timeout=15000}=_ref;const showState=show;useEffect(()=>{if(showState){const timer=setTimeout(()=>{onTimeOver&&onTimeOver();},timeout);return()=>{clearTimeout(timer);};}},[onTimeOver,show,showState,timeout]);if(show){return/*#__PURE__*/_jsxs("div",{className:classnames(getBackgroundColorClass(backgroundColor),showState?'flex':'hidden','fixed bottom-12 z-notification w-3/4 items-start justify-between rounded-lg p-6 shadow-l md:left-12 md:w-1/2 xl:left-24 xl:w-1/3'),role:"status","aria-live":"polite","data-test":"notification",children:[Icon&&/*#__PURE__*/_jsx("div",{className:"w-fit rounded-full bg-purple-50 p-4",children:/*#__PURE__*/_jsx(Icon,{className:"h-4 w-4"})}),/*#__PURE__*/_jsx("div",{className:classnames('flex-1',Icon?'px-6':'pr-6'),children:content}),/*#__PURE__*/_jsxs("button",{onClick:onClose,"data-test":"close",children:[/*#__PURE__*/_jsx("span",{className:"sr-only",children:c('Action').t(_templateObject||(_templateObject=_taggedTemplateLiteralLoose(["Close notification"])))}),/*#__PURE__*/_jsx("span",{"aria-hidden":"true",children:/*#__PURE__*/_jsx(XMarkIcon,{className:"h-4 w-4"})})]})]});}return null;};
;// CONCATENATED MODULE: ../../packages/shared/components/LanguageSwitcher/PreferredLanguage.tsx
var PreferredLanguage_templateObject;const PREFERRED_LANGUAGE_COOKIE='PreferredLanguage';const SESSION_LANGUAGE_COOKIE='LangMessage';const SHOULD_REDIRECT_TO_PREFERRED_LANG=true;const getBrowserLanguage=()=>{if(typeof navigator==="undefined"){return null;}// we need to split by , and ; to cover .split(/,|;/)
// example: en-CA,en;q=0.8,en-US;q=0.6,de-DE;q=0.4,de;q=0.2
const lang_raw=navigator&&navigator.language&&navigator.language.split(/,|;/)[0];const lang=lang_raw?lang_raw.toLowerCase():'';// check if we have exact match
if(isLocaleCode(lang)){return lang;}// split it by -|_ 0 is language, 1 can be script/region, 2 can be region (if has script)
const lang_region=lang.split(/_|-/)[0];// check if we have just region
if(isLocaleCode(lang_region)){return lang_region;}// check if is special case pt-br (we return this even for just pt)
if(lang_region==='pt'){return'pt-br';}return null;};const setPreferredLanguage=lang=>{const d=new Date();d.setTime(d.getTime()+100*365*24*60*60*1000);(0,cookies/* setCookie */.TV)({cookieName:PREFERRED_LANGUAGE_COOKIE,cookieValue:lang,expirationDate:d.toUTCString(),path:'/',samesite:cookies/* CookieSameSiteAttribute */.qh.Lax,secure:true});};const setLanguageMessageCookie=()=>{setCookie({cookieName:SESSION_LANGUAGE_COOKIE,cookieValue:'1',path:'/',samesite:CookieSameSiteAttribute.Lax,secure:true});};const PreferredLanguage=_ref=>{let{enable_switch_language_prompt=true}=_ref;const{currentUrl,routing:{navigate}}=useFramework();const[preferredLocale]=useCookie(PREFERRED_LANGUAGE_COOKIE);const browserLocale=getBrowserLanguage();const{0:showNotification,1:setShowNotification}=useState(false);const{0:showWPNotification,1:setShowWPNotification}=useState(isWP(currentUrl.pathname)&&currentUrl.locale!==defaultLocale.code&&hasValue(preferredLocale));const seenMessage=()=>{setLanguageMessageCookie();setShowNotification(false);};const handlePreferredLanguage=browserLocale=>{changeCurrentLocale(currentUrl,navigate,browserLocale,'l10n_discoverybanner');};const languageLink=languageClickName=>{return/*#__PURE__*/_jsx("span",{role:"button",className:"cursor-pointer text-purple-500 underline",onClick:()=>handlePreferredLanguage(browserLocale),onKeyDown:()=>handlePreferredLanguage(browserLocale),tabIndex:0,"aria-pressed":"false",children:languageClickName});};const localizedMessages={en:/*#__PURE__*/_jsxs(_Fragment,{children:["To see this page in English, click ",languageLink('here'),"."]}),de:/*#__PURE__*/_jsxs(_Fragment,{children:["Um diese Seite auf Deutsch zu sehen, klicken Sie ",languageLink('hier'),"."]}),'es-es':/*#__PURE__*/_jsxs(_Fragment,{children:["Para ver esta p\xE1gina en espa\xF1ol, haz clic ",languageLink('aquí'),"."]}),fr:/*#__PURE__*/_jsxs(_Fragment,{children:["Pour voir cette page en fran\xE7ais, cliquez ",languageLink('ici'),"."]}),ru:/*#__PURE__*/_jsxs(_Fragment,{children:["\u0427\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u044D\u0442\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435, \u043D\u0430\u0436\u043C\u0438\u0442\u0435 ",languageLink('здесь'),"."]}),it:/*#__PURE__*/_jsxs(_Fragment,{children:["Per vedere questa pagina in italiano, clicca ",languageLink('qui'),"."]}),pl:/*#__PURE__*/_jsxs(_Fragment,{children:["Aby zobaczy\u0107 t\u0119 stron\u0119 w j\u0119zyku polskim, kliknij ",languageLink('tutaj'),"."]}),nl:/*#__PURE__*/_jsxs(_Fragment,{children:["Om deze pagina in het Nederlands te zien, klik ",languageLink('hier'),"."]}),'pt-br':/*#__PURE__*/_jsxs(_Fragment,{children:["Para ver esta p\xE1gina em portugu\xEAs, clique ",languageLink('aqui'),"."]}),es:/*#__PURE__*/_jsxs(_Fragment,{children:["Para ver esta p\xE1gina en espa\xF1ol, haga clic ",languageLink('aquí'),"."]}),tr:/*#__PURE__*/_jsxs(_Fragment,{children:["Bu sayfay\u0131 T\xFCrk\xE7e olarak g\xF6r\xFCnt\xFClemek i\xE7in ",languageLink('buraya')," t\u0131klay\u0131n."]}),cs:/*#__PURE__*/_jsxs(_Fragment,{children:["Pro zobrazen\xED t\xE9to str\xE1nky v \u010De\u0161tin\u011B klikn\u011Bte ",languageLink('zde')]}),da:/*#__PURE__*/_jsxs(_Fragment,{children:["For at se denne side p\xE5 dansk, klik ",languageLink('her')]}),ro:/*#__PURE__*/_jsxs(_Fragment,{children:["Pentru a vedea aceast\u0103 pagin\u0103 \xEEn rom\xE2n\u0103, face\u021Bi clic ",languageLink('aici')]}),pt:/*#__PURE__*/_jsxs(_Fragment,{children:["Para ver esta p\xE1gina em portugu\xEAs de Portugal, clique ",languageLink('aqui')]}),fi:/*#__PURE__*/_jsxs(_Fragment,{children:["N\xE4hd\xE4ksesi t\xE4m\xE4n sivun suomeksi, klikkaa ",languageLink('tästä')]}),sv:/*#__PURE__*/_jsxs(_Fragment,{children:["F\xF6r att se denna sida p\xE5 svenska, klicka ",languageLink('här')]})};const messageContent=browserLocale&&hasValue(browserLocale)&&localizedMessages[browserLocale]||null;useEffect(()=>{if(!enable_switch_language_prompt)return;// when we have preferred currentUrl.locale we redirect to it, no redirect for WP
// no redirects for !enable_switch_language_prompt
// check if is not already current and we have it
if(preferredLocale&&preferredLocale!==currentUrl.locale&&isLocaleCode(preferredLocale)&&!isWP(currentUrl.pathname)){SHOULD_REDIRECT_TO_PREFERRED_LANG&&changeCurrentLocale(currentUrl,navigate,preferredLocale);}// check if conditions for dispalying message are met
const isMessage=(currentLocale,preferredLocale)=>{const browserLanguage=getBrowserLanguage();// message was seen
if(getCookie(SESSION_LANGUAGE_COOKIE))return false;// visitor already has preferred currentUrl.locale set
if(preferredLocale&&isLocaleCode(preferredLocale))return false;// we display message only if there is no cookie language, and browser lang is different then landing page lang and we need to have the browser language
if(hasValue(browserLanguage)&&browserLanguage!==currentLocale)return true;return false;};setShowNotification(isMessage(currentUrl.locale,preferredLocale));},[currentUrl.locale,currentUrl.pathname,enable_switch_language_prompt,preferredLocale]);if(!enable_switch_language_prompt){return null;}if(isWP(currentUrl.pathname)){return/*#__PURE__*/_jsx(Notification,{show:showWPNotification,icon:FlagIcon,content:c('OnlyEnglishPageMessage').t(PreferredLanguage_templateObject||(PreferredLanguage_templateObject=_taggedTemplateLiteralLoose(["We are sorry! This page is available only in English."]))),onClose:()=>setShowWPNotification(false),onTimeOver:()=>setShowWPNotification(false)});}return/*#__PURE__*/_jsx(Notification,{show:showNotification,content:messageContent,onClose:()=>seenMessage(),onTimeOver:()=>seenMessage(),timeout:30000});};

/***/ }),

/***/ 91053:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _i: function() { return /* binding */ consumeSessionRef; },
/* harmony export */   u: function() { return /* binding */ useUrlWithSessionRef; }
/* harmony export */ });
/* unused harmony export useSessionRef */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
const key='ref';const readValue=()=>{try{return window.sessionStorage.getItem(key)||undefined;}catch{return undefined;}};const setValue=value=>{try{if(value===undefined){window.sessionStorage.removeItem(key);}else{window.sessionStorage.setItem(key,value);}}catch{// abandon and forget
}};const useUrlWithSessionRef=inputUrl=>{const{0:stateRef,1:setStateRef}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();const url=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{const url=new URL(inputUrl.href);// copy
setStateRef(url.searchParams.get('ref')||undefined);url.searchParams.delete('ref');return url;},[inputUrl.href]);const linkHandler=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async()=>{if(stateRef!==undefined){setValue(stateRef);}},[stateRef]);return{url,linkHandler};};const consumeSessionRef=()=>{const ref=readValue();setValue(undefined);return ref;};const useSessionRef=()=>{return useMemo(()=>readValue(),[]);};

/***/ }),

/***/ 56202:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: function() { return /* binding */ API_HEADERS; },
/* harmony export */   R: function() { return /* binding */ BRIDGE_LINUX_ENDPOINT; }
/* harmony export */ });
/* harmony import */ var _protonme_slim_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42728);
const API_HEADERS={'Content-Type':'application/json',Accept:'application/vnd.protonmail.v1+json','x-pm-appversion':_protonme_slim_api__WEBPACK_IMPORTED_MODULE_0__.xPmAppversion};const BRIDGE_LINUX_ENDPOINT='https://proton.me/download/current_version_linux.json';

/***/ }),

/***/ 22208:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HD: function() { return /* binding */ isDark; },
/* harmony export */   Wf: function() { return /* binding */ getCtaColor; },
/* harmony export */   bx: function() { return /* binding */ getTextColorClass; },
/* harmony export */   e$: function() { return /* binding */ getBackgroundColorClass; },
/* harmony export */   wG: function() { return /* binding */ getProductGradient; }
/* harmony export */ });
/* unused harmony exports backgroundColors, backgroundImages, productBackgrounds, getBackgroundImageClass */
/**
 * Return the corresponding background color class, background image,
 * or text color depending on background name received from Prismic
 */const backgroundColors={white:'bg-white',purple:'bg-purple-25','purple to white vertical gradient':'bg-gradient-to-b from-purple-25 to-white','white to purple vertical gradient':'bg-gradient-to-b from-white to-purple-25','dark purple':'bg-purple-900','dark purple (800-white)':'bg-[#251F47]','dark purple (800)':'bg-purple-800','dark purple gradient':'bg-gradient-to-t from-purple-900 to-purple-800 text-white','p-shadow':'bg-white','p-slice-shadow':'bg-white'};const backgroundImages={'mail-shadow':'background background-mail-shadow','home-shadow':'background background-home-shadow pb-28 lg:pb-36','p-shadow':'background background-p-shadow','p-slice-shadow':'background background-p-slice-shadow'};const textColors={'dark purple':'text-white','dark purple gradient':'text-white','dark purple (800)':'text-white'};const darkColors=['dark purple','dark purple (800)','dark purple gradient'];const productBackgrounds={mail:'background-gradient-mail',vpn:'background-gradient-vpn',drive:'background-gradient-drive',calendar:'background-gradient-calendar',pass:'background-gradient-pass',none:''};const getBackgroundColorClass=color=>{if(color){return backgroundColors[color.toLowerCase()]||'';}return'';};const getBackgroundImageClass=background=>{if(background){return backgroundImages[background.toLowerCase()]||'';}return'';};const getTextColorClass=function(background,fallback){if(fallback===void 0){fallback='text-purple-800';}if(background){return textColors[background.toLowerCase()]||fallback;}return'';};const isDark=background=>{if(background){return darkColors.includes(background.toLowerCase());}return false;};const getProductGradient=function(product,fallback){if(fallback===void 0){fallback='';}if(!product){return fallback;}return productBackgrounds[product.toLowerCase()]||fallback;};const getCtaColor=function(product,fallback){if(fallback===void 0){fallback=undefined;}if(!product&&fallback){return fallback;}if(product==='none'){return'primary';}return product;};

/***/ }),

/***/ 23417:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ri: function() { return /* binding */ getCookie; },
/* harmony export */   TV: function() { return /* binding */ setCookie; },
/* harmony export */   Yj: function() { return /* binding */ deleteCookie; },
/* harmony export */   f5: function() { return /* binding */ checkCookie; },
/* harmony export */   qh: function() { return /* binding */ CookieSameSiteAttribute; }
/* harmony export */ });
/* unused harmony exports getCookies, applyCookiefilter, setAdditionalCookieValue */
const getCookies=()=>{try{return document.cookie.split(';').map(item=>item.trim());}catch(e){return[];}};const getCookie=function(name,cookies){var _match;if(cookies===void 0){cookies=document.cookie;}return(_match=("; "+cookies).match(";\\s*"+name+"=([^;]+)"))===null||_match===void 0?void 0:_match[1];};const checkCookie=(name,value)=>{return getCookies().some(cookie=>cookie.includes(name+"="+value));};let CookieSameSiteAttribute=/*#__PURE__*/function(CookieSameSiteAttribute){CookieSameSiteAttribute["Lax"]="lax";CookieSameSiteAttribute["Strict"]="strict";CookieSameSiteAttribute["None"]="none";return CookieSameSiteAttribute;}({});const setCookie=_ref=>{let{cookieName,cookieValue:maybeCookieValue,expirationDate:maybeExpirationDate,path,cookieDomain,samesite=CookieSameSiteAttribute.Strict,secure=true}=_ref;const cookieValue=maybeCookieValue===undefined?'':maybeCookieValue;let expirationDate=maybeExpirationDate;if(expirationDate==='max'){/* https://en.wikipedia.org/wiki/Year_2038_problem */expirationDate=new Date(2147483647000).toUTCString();}expirationDate=maybeCookieValue===undefined?new Date(0).toUTCString():expirationDate;document.cookie=[cookieName+"="+cookieValue,expirationDate&&"expires="+expirationDate,cookieDomain&&"domain="+cookieDomain,path&&"path="+path,secure&&'secure',samesite&&"samesite="+samesite].filter(Boolean).join(';');};const deleteCookie=function(cookieName,path,cookieDomain){if(path===void 0){path='/';}if(cookieDomain===void 0){cookieDomain="."+window.location.hostname;}setCookie({cookieName,cookieValue:undefined,path,cookieDomain});};const applyCookiefilter=(cookieName,callback)=>{var _getCookie;const cookies=((_getCookie=getCookie(cookieName))===null||_getCookie===void 0?void 0:_getCookie.split(','))||[];const filtered=cookies.filter(callback);setCookie({cookieName,cookieValue:filtered.join(','),cookieDomain:"."+window.location.hostname,path:'/',expirationDate:'max',secure:true});};const setAdditionalCookieValue=(cookieName,key,value)=>{var _getCookie2;const cookies=((_getCookie2=getCookie(cookieName))===null||_getCookie2===void 0?void 0:_getCookie2.split(','))||[];const filtered=cookies.filter(cookie=>!cookie.includes(key));filtered.push(key+":"+value);setCookie({cookieName,cookieValue:filtered.join(','),cookieDomain:"."+window.location.hostname,path:'/',expirationDate:'max',secure:true});};

/***/ }),

/***/ 89797:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: function() { return /* binding */ hasValue; }
/* harmony export */ });
const hasValue=value=>{if(value!==undefined&&value!==null&&value!==''&&value!=='none'){return typeof value==='string'?(value||'').replace(/<[^>]*[^/]>/g,'')!=='':true;}return false;};

/***/ }),

/***/ 41087:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: function() { return /* binding */ simplify; }
/* harmony export */ });
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1642);
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_0__);
const simplify=ヾO_oゞ=>ヾO_oゞ===null||ヾO_oゞ===void 0?void 0:ヾO_oゞ.replaceAll(' ','').toLowerCase();

/***/ }),

/***/ 60458:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: function() { return /* binding */ useCookie; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
/* harmony import */ var _helpers_cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23417);
const useCookie=(name,defaultValue)=>{const{0:value,1:setValue}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{const cookie=(0,_helpers_cookies__WEBPACK_IMPORTED_MODULE_1__/* .getCookie */ .Ri)(name);setValue(cookie);},[name]);const updateCookie=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(newCookie=>{setValue(newCookie.cookieValue);(0,_helpers_cookies__WEBPACK_IMPORTED_MODULE_1__/* .setCookie */ .TV)({cookieName:name,path:'/',samesite:_helpers_cookies__WEBPACK_IMPORTED_MODULE_1__/* .CookieSameSiteAttribute */ .qh.None,secure:true,...newCookie});},[name]);const deleteCookie=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{setValue(undefined);(0,_helpers_cookies__WEBPACK_IMPORTED_MODULE_1__/* .deleteCookie */ .Yj)(name);},[name]);return[value,updateCookie,deleteCookie];};

/***/ }),

/***/ 7044:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  V: function() { return /* binding */ getOsLabel; },
  A: function() { return /* binding */ useUADetails; }
});

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
;// CONCATENATED MODULE: ../../node_modules/.pnpm/ua-parser-js@2.0.0-beta.2/node_modules/ua-parser-js/src/main/ua-parser.mjs
// Generated ESM version of ua-parser-js
// DO NOT EDIT THIS FILE!
// Source: /src/main/ua-parser.js

/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v2.0.0-beta.2
   Copyright © 2012-2023 Faisal Salman <f@faisalman.com>
   AGPLv3 License *//*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

/* jshint esversion: 6 */ 
/* globals window */


    
    //////////////
    // Constants
    /////////////

    var LIBVERSION  = '2.0.0-beta.2',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major',
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded',
        USER_AGENT  = 'user-agent',
        UA_MAX_LENGTH = 500,
        BRANDS      = 'brands',
        FORMFACTOR  = 'formFactor',
        FULLVERLIST = 'fullVersionList',
        PLATFORM    = 'platform',
        PLATFORMVER = 'platformVersion',
        BITNESS     = 'bitness',
        CH_HEADER   = 'sec-ch-ua',
        CH_HEADER_FULL_VER_LIST = CH_HEADER + '-full-version-list',
        CH_HEADER_ARCH      = CH_HEADER + '-arch',
        CH_HEADER_BITNESS   = CH_HEADER + '-' + BITNESS,
        CH_HEADER_FORM_FACTOR = CH_HEADER + '-form-factor',
        CH_HEADER_MOBILE    = CH_HEADER + '-' + MOBILE,
        CH_HEADER_MODEL     = CH_HEADER + '-' + MODEL,
        CH_HEADER_PLATFORM  = CH_HEADER + '-' + PLATFORM,
        CH_HEADER_PLATFORM_VER = CH_HEADER_PLATFORM + '-version',
        CH_ALL_VALUES       = [BRANDS, FULLVERLIST, MOBILE, MODEL, PLATFORM, PLATFORMVER, ARCHITECTURE, FORMFACTOR, BITNESS],
        UA_BROWSER  = 'browser',
        UA_CPU      = 'cpu',
        UA_DEVICE   = 'device',
        UA_ENGINE   = 'engine',
        UA_OS       = 'os',
        UA_RESULT   = 'result',
        AMAZON      = 'Amazon',
        APPLE       = 'Apple',
        ASUS        = 'ASUS',
        BLACKBERRY  = 'BlackBerry',
        GOOGLE      = 'Google',
        HUAWEI      = 'Huawei',
        LENOVO      = 'Lenovo',
        LG          = 'LG',
        MICROSOFT   = 'Microsoft',
        MOTOROLA    = 'Motorola',
        SAMSUNG     = 'Samsung',
        SHARP       = 'Sharp',
        SONY        = 'Sony',
        XIAOMI      = 'Xiaomi',
        ZEBRA       = 'Zebra',
        PREFIX_MOBILE  = 'Mobile ',
        SUFFIX_BROWSER = ' Browser',
        CHROME      = 'Chrome',
        EDGE        = 'Edge',
        FIREFOX     = 'Firefox',
        OPERA       = 'Opera',
        FACEBOOK    = 'Facebook',
        SOGOU       = 'Sogou',
        WINDOWS     = 'Windows';
   
    var isWindow            = typeof window !== UNDEF_TYPE,
        NAVIGATOR           = (isWindow && window.navigator) ? 
                                window.navigator : 
                                undefined,
        NAVIGATOR_UADATA    = (NAVIGATOR && NAVIGATOR.userAgentData) ? 
                                NAVIGATOR.userAgentData : 
                                undefined;

    ///////////
    // Helper
    //////////

    var extend = function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                mergedRegexes[i] = extensions[i] && extensions[i].length % 2 === 0 ? extensions[i].concat(regexes[i]) : regexes[i];
            }
            return mergedRegexes;
        },
        enumerize = function (arr) {
            var enums = {};
            for (var i=0; i<arr.length; i++) {
                enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
        },
        has = function (str1, str2) {
            if (typeof str1 === OBJ_TYPE && str1.length > 0) {
                for (var i in str1) {
                    if (lowerize(str1[i]) == lowerize(str2)) return true;
                }
                return false;
            }
            return isString(str1) ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
        isExtensions = function (obj) {
            for (var prop in obj) {
                return /^(browser|cpu|device|engine|os)$/.test(prop);
            }
        },
        isString = function (val) {
            return typeof val === STR_TYPE;
        },
        itemListToArray = function (header) {
            if (!header) return undefined;
            var arr = [];
            var tokens = strip(/\\?\"/g, header).split(',');
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].indexOf(';') > -1) {
                    var token = trim(tokens[i]).split(';v=');
                    arr[i] = { brand : token[0], version : token[1] };
                } else {
                    arr[i] = trim(tokens[i]);
                }
            }
            return arr;
        },
        lowerize = function (str) {
            return isString(str) ? str.toLowerCase() : str;
        },
        majorize = function (version) {
            return isString(version) ? strip(/[^\d\.]/g, version).split('.')[0] : undefined;
        },
        setProps = function (arr) {
            for (var i in arr) {
                var propName = arr[i];
                if (typeof propName == OBJ_TYPE && propName.length == 2) {
                    this[propName[0]] = propName[1];
                } else {
                    this[propName] = undefined;
                }
            }
            return this;
        },
        strip = function (pattern, str) {
            return isString(str) ? str.replace(pattern, EMPTY) : str;
        },
        stripQuotes = function (str) {
            return strip(/\\?\"/g, str); 
        },
        trim = function (str, len) {
            if (isString(str)) {
                str = strip(/^\s\s*/, str);
                return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
    };

    ///////////////
    // Map helper
    //////////////

    var rgxMapper = function (ua, arrays) {

            if(!ua || !arrays) return;

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    if (!regex[j]) { break; }
                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length === 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length === 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length === 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        strMapper = function (str, map) {

            for (var i in map) {
                // check if current value is array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return map.hasOwnProperty('*') ? map['*'] : str;
    };

    ///////////////
    // String map
    //////////////

    var windowsVersionMap = {
            'ME'        : '4.90',
            'NT 3.11'   : 'NT3.51',
            'NT 4.0'    : 'NT4.0',
            '2000'      : 'NT 5.0',
            'XP'        : ['NT 5.1', 'NT 5.2'],
            'Vista'     : 'NT 6.0',
            '7'         : 'NT 6.1',
            '8'         : 'NT 6.2',
            '8.1'       : 'NT 6.3',
            '10'        : ['NT 6.4', 'NT 10.0'],
            'RT'        : 'ARM'
        },
        
        formFactorMap = {
            'embedded'  : 'Automotive',
            'mobile'    : 'Mobile',
            'tablet'    : ['Tablet', 'EInk'],
            'smarttv'   : 'TV',
            'wearable'  : ['VR', 'XR', 'Watch'],
            '?'         : ['Desktop', 'Unknown'],
            '*'         : undefined
    };

    //////////////
    // Regex map
    /////////////

    var defaultRegexes = {

        browser : [[

            // Most common regardless engine
            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
            ], [VERSION, [NAME, PREFIX_MOBILE + 'Chrome']], [
            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
            ], [VERSION, [NAME, 'Edge']], [

            // Presto based
            /(opera mini)\/([-\w\.]+)/i,                                        // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,                 // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i                           // Opera
            ], [NAME, VERSION], [
            /opios[\/ ]+([\w\.]+)/i                                             // Opera mini on iphone >= 8.0
            ], [VERSION, [NAME, OPERA+' Mini']], [
            /\bop(?:rg)?x\/([\w\.]+)/i                                          // Opera GX
            ], [VERSION, [NAME, OPERA+' GX']], [
            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
            ], [VERSION, [NAME, OPERA]], [

            // Mixed
            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i            // Baidu
            ], [VERSION, [NAME, 'Baidu']], [
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,             // Avant/IEMobile/SlimBrowser
            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo
            /(heytap|ovi)browser\/([\d\.]+)/i,                                  // HeyTap/Ovi
            /(weibo)__([\d\.]+)/i                                               // Weibo
            ], [NAME, VERSION], [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i                 // UCBrowser
            ], [VERSION, [NAME, 'UCBrowser']], [
            /microm.+\bqbcore\/([\w\.]+)/i,                                     // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i                                        // WeChat
            ], [VERSION, [NAME, 'WeChat']], [
            /konqueror\/([\w\.]+)/i                                             // Konqueror
            ], [VERSION, [NAME, 'Konqueror']], [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i                       // IE11
            ], [VERSION, [NAME, 'IE']], [
            /ya(?:search)?browser\/([\w\.]+)/i                                  // Yandex
            ], [VERSION, [NAME, 'Yandex']], [
            /slbrowser\/([\w\.]+)/i                                             // Smart Lenovo Browser
            ], [VERSION, [NAME, 'Smart ' + LENOVO + SUFFIX_BROWSER]], [
            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
            ], [[NAME, /(.+)/, '$1 Secure' + SUFFIX_BROWSER], VERSION], [
            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
            ], [VERSION, [NAME, FIREFOX+' Focus']], [
            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
            ], [VERSION, [NAME, OPERA+' Touch']], [
            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
            ], [VERSION, [NAME, 'Coc Coc']], [
            /dolfin\/([\w\.]+)/i                                                // Dolphin
            ], [VERSION, [NAME, 'Dolphin']], [
            /coast\/([\w\.]+)/i                                                 // Opera Coast
            ], [VERSION, [NAME, OPERA+' Coast']], [
            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
            ], [VERSION, [NAME, 'MIUI' + SUFFIX_BROWSER]], [
            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, PREFIX_MOBILE + FIREFOX]], [
            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
            ], [[NAME, '360' + SUFFIX_BROWSER]], [
            /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
            ], [[NAME, /(.+)/, '$1' + SUFFIX_BROWSER], VERSION], [              // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
            /samsungbrowser\/([\w\.]+)/i                                        // Samsung Internet
            ], [VERSION, [NAME, SAMSUNG + ' Internet']], [
            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [
            /metasr[\/ ]?([\d\.]+)/i                                            // Sogou Explorer
            ], [VERSION, [NAME, SOGOU + ' Explorer']], [
            /(sogou)mo\w+\/([\d\.]+)/i                                          // Sogou Mobile
            ], [[NAME, SOGOU + ' Mobile'], VERSION], [
            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,                   // Tesla
            /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i                        // QQBrowser/2345 Browser
            ], [NAME, VERSION], [
            /(lbbrowser)/i,                                                     // LieBao Browser
            /\[(linkedin)app\]/i                                                // LinkedIn App for iOS & Android
            ], [NAME], [

            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
            ], [[NAME, FACEBOOK], VERSION], [
            /(Klarna)\/([\w\.]+)/i,                                             // Klarna Shopping Browser for iOS & Android
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,                             // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,                                  // Naver InApp
            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
            /(alipay)client\/([\w\.]+)/i,                                       // Alipay
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i                     // Chromium/Instagram/Snapchat
            ], [NAME, VERSION], [
            /\bgsa\/([\w\.]+) .*safari\//i                                      // Google Search Appliance on iOS
            ], [VERSION, [NAME, 'GSA']], [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i                        // TikTok
            ], [VERSION, [NAME, 'TikTok']], [

            /headlesschrome(?:\/([\w\.]+)| )/i                                  // Chrome Headless
            ], [VERSION, [NAME, CHROME+' Headless']], [

            / wv\).+(chrome)\/([\w\.]+)/i                                       // Chrome WebView
            ], [[NAME, CHROME+' WebView'], VERSION], [

            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i           // Android Browser
            ], [VERSION, [NAME, 'Android' + SUFFIX_BROWSER]], [

            /chrome\/([\w\.]+) mobile/i                                         // Chrome Mobile
            ], [VERSION, [NAME, PREFIX_MOBILE + 'Chrome']], [

            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i       // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i                 // Safari Mobile
            ], [VERSION, [NAME, PREFIX_MOBILE + 'Safari']], [
            /iphone .*mobile(?:\/\w+ | ?)safari/i
            ], [[NAME, PREFIX_MOBILE + 'Safari']], [
            /version\/([\w\.\,]+) .*(safari)/i                                  // Safari
            ], [VERSION, NAME], [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i                      // Safari < 3.0
            ], [NAME, [VERSION, '1']], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i                        // Firefox Mobile
            ], [[NAME, PREFIX_MOBILE + FIREFOX], VERSION], [
            /(navigator|netscape\d?)\/([-\w\.]+)/i                              // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
            ], [VERSION, [NAME, FIREFOX+' Reality']], [
            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,                         // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i,                                             // Links
            /panasonic;(viera)/i                                                // Panasonic Viera
            ], [NAME, VERSION], [
            
            /(cobalt)\/([\w\.]+)/i                                              // Cobalt
            ], [NAME, [VERSION, /[^\d\.]+./, EMPTY]]
        ],

        cpu : [[

            /\b(?:(amd|x|x86[-_]?|wow|win)64)\b/i                               // AMD64 (x64)
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i,                                                     // IA32 (quicktime)
            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
            ], [[ARCHITECTURE, 'ia32']], [

            /\b(aarch64|arm(v?8e?l?|_?64))\b/i                                  // ARM64
            ], [[ARCHITECTURE, 'arm64']], [

            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
            ], [[ARCHITECTURE, 'armhf']], [

            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                            // PowerPC
            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, lowerize]]
        ],

        device : [[

            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////

            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i                          // iPod/iPhone
            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
            /\((ipad);[-\w\),; ]+apple/i,                                       // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [
            /(macintosh);/i
            ], [MODEL, [VENDOR, APPLE]], [

            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [

            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

            // Xiaomi
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,                  // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,                                           // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,                             // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,                   // Xiaomi Redmi
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,        // Xiaomi Redmi 'numeric' models
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,                     // Redmi Pad
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i                        // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

            // Realme
            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ], [MODEL, [VENDOR, LENOVO], [TYPE, TABLET]], [

            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

            // Google
            /(pixel c)\b/i                                                      // Google Pixel C
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i                         // Google Pixel
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

            // Sony
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,                             // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i                                      // BlackBerry PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i                                                    // BlackBerry 10
            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

            // HTC
            /(nexus 9)/i                                                        // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,                         // HTC

            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i         // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
                
            // Ulefone
            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
            ], [MODEL, [VENDOR, 'Ulefone'], [TYPE, MOBILE]], [

            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,                                                 // HP iPAQ
            /(asus)-?(\w+)/i,                                                   // Asus
            /(microsoft); (lumia[\w ]+)/i,                                      // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,                                          // Lenovo
            /(jolla)/i,                                                         // Jolla
            /(oppo) ?([\w ]+) bui/i                                             // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /(kobo)\s(ereader|touch)/i,                                         // Kobo
            /(archos) (gamepad2?)/i,                                            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
            /(kindle)\/([\w\.]+)/i                                              // Kindle
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(surface duo)/i                                                    // Surface Duo
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i                                 // Fairphone
            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
            /(shield[\w ]+) b/i                                                 // Nvidia Shield Tablets
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
            /(sprint) (\w+)/i                                                   // Sprint Phones
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
            /droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i               // Zebra
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

            ///////////////////
            // SMARTTVS
            ///////////////////

            /smart-tv.+(samsung)/i                                              // Samsung
            ], [VENDOR, [TYPE, SMARTTV]], [
            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i        // LG SmartTV
            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
            /(apple) ?tv/i                                                      // Apple TV
            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
            /droid.+aft(\w+)( bui|\))/i                                         // Fire TV
            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i                                               // Sharp
            ], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],[
            /(bravia[\w ]+)( bui|\))/i                                          // Sony
            ], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [
            /(mitv-\w{5}) bui/i                                                 // Xiaomi
            ], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [
            /Hbbtv.*(technisat) (.*);/i                                         // TechniSAT
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,                          // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i         // HbbTV devices
            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i                   // SmartTV from Unidentified Vendors
            ], [[TYPE, SMARTTV]], [

            ///////////////////
            // CONSOLES
            ///////////////////

            /(ouya)/i,                                                          // Ouya
            /(nintendo) (\w+)/i                                                 // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
            /droid.+; (shield) bui/i                                            // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
            /(playstation \w+)/i                                                // Playstation
            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i                                // Microsoft Xbox
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

            ///////////////////
            // WEARABLES
            ///////////////////

            /((pebble))app/i                                                    // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i                              // Apple Watch
            ], [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]], [
            /droid.+; (glass) \d/i                                              // Google Glass
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
            /droid.+; (wt63?0{2,3})\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [
            /(quest( 2| pro)?)/i                                                // Oculus Quest
            ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [

            ///////////////////
            // EMBEDDED
            ///////////////////

            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i                              // Tesla
            ], [VENDOR, [TYPE, EMBEDDED]], [
            /(aeobc)\b/i                                                        // Echo Dot
            ], [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]], [

            ////////////////////
            // MIXED (GENERIC)
            ///////////////////

            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i    // Android Phones from Unidentified Vendors
            ], [MODEL, [TYPE, MOBILE]], [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i       // Android Tablets from Unidentified Vendors
            ], [MODEL, [TYPE, TABLET]], [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i                      // Unidentifiable Tablet
            ], [[TYPE, TABLET]], [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i    // Unidentifiable Mobile
            ], [[TYPE, MOBILE]], [
            /(android[-\w\. ]{0,9});.+buil/i                                    // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, EDGE+'HTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,                           // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,                                      // iCab
            /\b(libweb)/i
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows
            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i             // Windows Phone
            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
            /windows nt 6\.2; (arm)/i,                                        // Windows RT
            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ], [[VERSION, strMapper, windowsVersionMap], [NAME, WINDOWS]], [

            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,              // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i                             // Mac OS
            ], [[NAME, 'macOS'], [VERSION, /_/g, '.']], [

            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i                    // Android-x86/HarmonyOS
            ], [VERSION, NAME], [                                               // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,                                     // Tizen/KaiOS
            /\((series40);/i                                                    // Series 40
            ], [NAME, VERSION], [
            /\(bb(10);/i                                                        // BlackBerry 10
            ], [VERSION, [NAME, BLACKBERRY]], [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i         // Symbian
            ], [VERSION, [NAME, 'Symbian']], [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ], [VERSION, [NAME, FIREFOX+' OS']], [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
            ], [VERSION, [NAME, 'webOS']], [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i                              // watchOS
            ], [VERSION, [NAME, 'watchOS']], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, CHROME+'cast']], [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i                                  // Chromium OS
            ], [[NAME, "Chrome OS"], VERSION],[

            // Smart TVs
            /panasonic;(viera)/i,                                               // Panasonic Viera
            /(netrange)mmh/i,                                                   // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,                                         // NetTV

            // Console
            /(nintendo|playstation) (\w+)/i,                                    // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,                                         // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,                            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,                                           // Mint
            /(mageia|vectorlinux)[; ]/i,                                        // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                                                                                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,                                         // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,                                                // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i                                                    // Haiku
            ], [NAME, VERSION], [
            /(sunos) ?([\w\.\d]*)/i                                             // Solaris
            ], [[NAME, 'Solaris'], VERSION], [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,                              // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,                                  // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i                                                // UNIX
            ], [NAME, VERSION]
        ]
    };

    /////////////////
    // Factories
    ////////////////

    var defaultProps = (function () {
            var props = { init : {}, isIgnore : {}, isIgnoreRgx : {}, toString : {}};
            setProps.call(props.init, [
                [UA_BROWSER, [NAME, VERSION, MAJOR]],
                [UA_CPU, [ARCHITECTURE]],
                [UA_DEVICE, [TYPE, MODEL, VENDOR]],
                [UA_ENGINE, [NAME, VERSION]],
                [UA_OS, [NAME, VERSION]]
            ]);
            setProps.call(props.isIgnore, [
                [UA_BROWSER, [VERSION, MAJOR]],
                [UA_ENGINE, [VERSION]],
                [UA_OS, [VERSION]]
            ]);
            setProps.call(props.isIgnoreRgx, [
                [UA_BROWSER, / ?browser$/i],
                [UA_OS, / ?os$/i]
            ]);
            setProps.call(props.toString, [
                [UA_BROWSER, [NAME, VERSION]],
                [UA_CPU, [ARCHITECTURE]],
                [UA_DEVICE, [VENDOR, MODEL]],
                [UA_ENGINE, [NAME, VERSION]],
                [UA_OS, [NAME, VERSION]]
            ]);
            return props;
    })();

    var createIData = function (item, itemType) {

        var init_props = defaultProps.init[itemType],
            is_ignoreProps = defaultProps.isIgnore[itemType] || 0,
            is_ignoreRgx = defaultProps.isIgnoreRgx[itemType] || 0,
            toString_props = defaultProps.toString[itemType] || 0;

        function IData () {
            setProps.call(this, init_props);
        }

        IData.prototype.getItem = function () {
            return item;
        };

        IData.prototype.withClientHints = function () {

            // nodejs / non-client-hints browsers
            if (!NAVIGATOR_UADATA) {
                return item
                        .parseCH()
                        .get();
            }

            // browsers based on chromium 85+
            return NAVIGATOR_UADATA
                    .getHighEntropyValues(CH_ALL_VALUES)
                    .then(function (res) {
                        return item
                                .setCH(new UACHData(res, false))
                                .parseCH()
                                .get();
            });
        };

        IData.prototype.withFeatureCheck = function () {
            return item.detectFeature().get();
        };

        if (itemType != UA_RESULT) {
            IData.prototype.is = function (strToCheck) {
                var is = false;
                for (var i in this) {
                    if (this.hasOwnProperty(i) && !has(is_ignoreProps, i) && lowerize(is_ignoreRgx ? strip(is_ignoreRgx, this[i]) : this[i]) == lowerize(is_ignoreRgx ? strip(is_ignoreRgx, strToCheck) : strToCheck)) {
                        is = true;
                        if (strToCheck != UNDEF_TYPE) break;
                    } else if (strToCheck == UNDEF_TYPE && is) {
                        is = !is;
                        break;
                    }
                }
                return is;
            };
            IData.prototype.toString = function () {
                var str = EMPTY;
                for (var i in toString_props) {
                    if (typeof(this[toString_props[i]]) !== UNDEF_TYPE) {
                        str += (str ? ' ' : EMPTY) + this[toString_props[i]];
                    }
                }
                return str || UNDEF_TYPE;
            };
        }

        if (!NAVIGATOR_UADATA) {
            IData.prototype.then = function (cb) { 
                var that = this;
                var IDataResolve = function () {
                    for (var prop in that) {
                        if (that.hasOwnProperty(prop)) {
                            this[prop] = that[prop];
                        }
                    }
                };
                IDataResolve.prototype = {
                    is : IData.prototype.is,
                    toString : IData.prototype.toString
                };
                var resolveData = new IDataResolve();
                cb(resolveData);
                return resolveData;
            };
        }

        return new IData();
    };

    /////////////////
    // Constructor
    ////////////////

    function UACHData (uach, isHttpUACH) {
        uach = uach || {};
        setProps.call(this, CH_ALL_VALUES);
        if (isHttpUACH) {
            setProps.call(this, [
                [BRANDS, itemListToArray(uach[CH_HEADER])],
                [FULLVERLIST, itemListToArray(uach[CH_HEADER_FULL_VER_LIST])],
                [MOBILE, /\?1/.test(uach[CH_HEADER_MOBILE])],
                [MODEL, stripQuotes(uach[CH_HEADER_MODEL])],
                [PLATFORM, stripQuotes(uach[CH_HEADER_PLATFORM])],
                [PLATFORMVER, stripQuotes(uach[CH_HEADER_PLATFORM_VER])],
                [ARCHITECTURE, stripQuotes(uach[CH_HEADER_ARCH])],
                [FORMFACTOR, itemListToArray(uach[CH_HEADER_FORM_FACTOR])],
                [BITNESS, stripQuotes(uach[CH_HEADER_BITNESS])]
            ]);
        } else {
            for (var prop in uach) {
                if(this.hasOwnProperty(prop) && typeof uach[prop] !== UNDEF_TYPE) this[prop] = uach[prop];
            }
        }
    }

    function UAItem (itemType, ua, rgxMap, uaCH) {

        this.get = function (prop) {
            if (!prop) return this.data;
            return this.data.hasOwnProperty(prop) ? this.data[prop] : undefined;
        };

        this.set = function (prop, val) {
            this.data[prop] = val;
            return this;
        };

        this.setCH = function (ch) {
            this.uaCH = ch;
            return this;
        };

        this.detectFeature = function () {
            if (NAVIGATOR && NAVIGATOR.userAgent == this.ua) {
                switch (this.itemType) {
                    case UA_BROWSER:
                        // Brave-specific detection
                        if (NAVIGATOR.brave && typeof NAVIGATOR.brave.isBrave == FUNC_TYPE) {
                            this.set(NAME, 'Brave');
                        }
                        break;
                    case UA_DEVICE:
                        // Chrome-specific detection: check for 'mobile' value of navigator.userAgentData
                        if (!this.get(TYPE) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[MOBILE]) {
                            this.set(TYPE, MOBILE);
                        }
                        // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
                        if (this.get(MODEL) == 'Macintosh' && NAVIGATOR && typeof NAVIGATOR.standalone !== UNDEF_TYPE && NAVIGATOR.maxTouchPoints && NAVIGATOR.maxTouchPoints > 2) {
                            this.set(MODEL, 'iPad')
                                .set(TYPE, TABLET);
                        }
                        break;
                    case UA_OS:
                        // Chrome-specific detection: check for 'platform' value of navigator.userAgentData
                        if (!this.get(NAME) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[PLATFORM]) {
                            this.set(NAME, NAVIGATOR_UADATA[PLATFORM]);
                        }
                        break;
                    case UA_RESULT:
                        var data = this.data;
                        var detect = function (itemType) {
                            return data[itemType]
                                    .getItem()
                                    .detectFeature()
                                    .get();
                        };
                        this.set(UA_BROWSER, detect(UA_BROWSER))
                            .set(UA_CPU, detect(UA_CPU))
                            .set(UA_DEVICE, detect(UA_DEVICE))
                            .set(UA_ENGINE, detect(UA_ENGINE))
                            .set(UA_OS, detect(UA_OS));
                }
            }
            return this;
        };

        this.parseUA = function () {
            if (this.itemType != UA_RESULT) {
                rgxMapper.call(this.data, this.ua, this.rgxMap);
            }
            if (this.itemType == UA_BROWSER) {
                this.set(MAJOR, majorize(this.get(VERSION)));
            }
            return this;
        };

        this.parseCH = function () {
            var uaCH = this.uaCH,
                rgxMap = this.rgxMap;
    
            switch (this.itemType) {
                case UA_BROWSER:
                    var brands = uaCH[FULLVERLIST] || uaCH[BRANDS], prevName;
                    if (brands) {
                        for (var i in brands) {
                            var brandName = strip(/(Google|Microsoft) /, brands[i].brand || brands[i]),
                                brandVersion = brands[i].version;
                            if (!/not.a.brand/i.test(brandName) && (!prevName || (/chrom/i.test(prevName) && !/chromi/i.test(brandName)))) {
                                this.set(NAME, brandName)
                                    .set(VERSION, brandVersion)
                                    .set(MAJOR, majorize(brandVersion));
                                prevName = brandName;
                            }
                        }
                    }
                    break;
                case UA_CPU:
                    var archName = uaCH[ARCHITECTURE];
                    if (archName) {
                        if (archName && uaCH[BITNESS] == '64') archName += '64';
                        rgxMapper.call(this.data, archName + ';', rgxMap);
                    }
                    break;
                case UA_DEVICE:
                    if (uaCH[MOBILE]) {
                        this.set(TYPE, MOBILE);
                    }
                    if (uaCH[MODEL]) {
                        this.set(MODEL, uaCH[MODEL]);
                    }
                    // Xbox-Specific Detection
                    if (uaCH[MODEL] == 'Xbox') {
                        this.set(TYPE, CONSOLE)
                            .set(VENDOR, MICROSOFT);
                    }
                    if (uaCH[FORMFACTOR]) {
                        var ff;
                        if (typeof uaCH[FORMFACTOR] !== 'string') {
                            var idx = 0;
                            while (!ff && idx < uaCH[FORMFACTOR].length) {
                                ff = strMapper(uaCH[FORMFACTOR][idx++], formFactorMap);
                            }
                        } else {
                            ff = strMapper(uaCH[FORMFACTOR], formFactorMap);
                        }
                        this.set(TYPE, ff);
                    }
                    break;
                case UA_OS:
                    var osName = uaCH[PLATFORM];
                    if(osName) {
                        var osVersion = uaCH[PLATFORMVER];
                        if (osName == WINDOWS) osVersion = (parseInt(majorize(osVersion), 10) >= 13 ? '11' : '10');
                        this.set(NAME, osName)
                            .set(VERSION, osVersion);
                    }
                    // Xbox-Specific Detection
                    if (this.get(NAME) == WINDOWS && uaCH[MODEL] == 'Xbox') {
                        this.set(NAME, 'Xbox')
                            .set(VERSION, undefined);
                    }           
                    break;
                case UA_RESULT:
                    var data = this.data;
                    var parse = function (itemType) {
                        return data[itemType]
                                .getItem()
                                .setCH(uaCH)
                                .parseCH()
                                .get();
                    };
                    this.set(UA_BROWSER, parse(UA_BROWSER))
                        .set(UA_CPU, parse(UA_CPU))
                        .set(UA_DEVICE, parse(UA_DEVICE))
                        .set(UA_ENGINE, parse(UA_ENGINE))
                        .set(UA_OS, parse(UA_OS));
            }
            return this;
        };

        setProps.call(this, [
            ['itemType', itemType],
            ['ua', ua],
            ['uaCH', uaCH],
            ['rgxMap', rgxMap],
            ['data', createIData(this, itemType)]
        ]);

        return this;
    }

    function UAParser (ua, extensions, headers) {

        if (typeof ua === OBJ_TYPE) {
            if (isExtensions(ua)) {
                if (typeof extensions === OBJ_TYPE) {
                    headers = extensions;               // case UAParser(extensions, headers)           
                }
                extensions = ua;                        // case UAParser(extensions)
            } else {
                headers = ua;                           // case UAParser(headers)
                extensions = undefined;
            }
            ua = undefined;
        } else if (typeof ua === STR_TYPE && !isExtensions(extensions)) {
            headers = extensions;                       // case UAParser(ua, headers)
            extensions = undefined;
        }
        
        if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions, headers).getResult();
        }

        var userAgent = typeof ua === STR_TYPE ? ua :                                       // Passed user-agent string
                            ((NAVIGATOR && NAVIGATOR.userAgent) ? NAVIGATOR.userAgent :     // navigator.userAgent
                                (headers && headers[USER_AGENT] ? headers[USER_AGENT] :     // User-Agent from passed headers
                                    EMPTY)),                                                // empty string

            httpUACH = new UACHData(headers, true),
            regexMap = extensions ? 
                        extend(defaultRegexes, extensions) : 
                        defaultRegexes,

            createItemFunc = function (itemType) {
                if (itemType == UA_RESULT) {
                    return function () {
                        return new UAItem(itemType, userAgent, regexMap, httpUACH)
                                    .set('ua', userAgent)
                                    .set(UA_BROWSER, this.getBrowser())
                                    .set(UA_CPU, this.getCPU())
                                    .set(UA_DEVICE, this.getDevice())
                                    .set(UA_ENGINE, this.getEngine())
                                    .set(UA_OS, this.getOS())
                                    .get();
                    };
                } else {
                    return function () {
                        return new UAItem(itemType, userAgent, regexMap[itemType], httpUACH)
                                    .parseUA()
                                    .get();
                    };
                }
            };
            
        // public methods
        setProps.call(this, [
            ['getBrowser', createItemFunc(UA_BROWSER)],
            ['getCPU', createItemFunc(UA_CPU)],
            ['getDevice', createItemFunc(UA_DEVICE)],
            ['getEngine', createItemFunc(UA_ENGINE)],
            ['getOS', createItemFunc(UA_OS)],
            ['getResult', createItemFunc(UA_RESULT)],
            ['getUA', function () { return userAgent; }],
            ['setUA', function (ua) {
                if (isString(ua))
                    userAgent = ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
                return this;
            }]
        ])
        .setUA(userAgent);

        return this;
    }

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    
;// CONCATENATED MODULE: ../../node_modules/.pnpm/ua-parser-js@2.0.0-beta.2/node_modules/ua-parser-js/src/enums/ua-parser-enums.mjs
// Generated ESM version of ua-parser-js/enums
// DO NOT EDIT THIS FILE!
// Source: /src/enums/ua-parser-enums.js

///////////////////////////////////////////////
/*  Enums for UAParser.js v2.0.0-beta.2
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const Browser = Object.freeze({
    _2345_EXPLORER: '2345Explorer',
    _360: '360 Browser',
    ALIPAY: 'Alipay',
    AMAYA: 'Amaya',
    ANDROID: 'Android Browser',
    ARORA: 'Arora',
    AVANT: 'Avant',
    AVAST: 'Avast Secure Browser',
    AVG: 'AVG Secure Browser',
    BAIDU: 'Baidu Browser',
    BASILISK: 'Basilisk',
    BLAZER: 'Blazer',
    BOLT: 'Bolt',
    BOWSER: 'Bowser',
    BRAVE: 'Brave',
    CAMINO: 'Camino',
    CHIMERA: 'Chimera',
    CHROME: 'Chrome',
    CHROME_HEADLESS: 'Chrome Headless',
    CHROME_MOBILE: 'Mobile Chrome',
    CHROME_WEBVIEW: 'Chrome WebView',
    CHROMIUM: 'Chromium',
    COBALT: 'Cobalt',
    COC_COC: 'Coc Coc',
    COMODO_DRAGON: 'Comodo Dragon',
    CONKEROR: 'Conkeror',
    DILLO: 'Dillo',
    DOLPHIN: 'Dolphin',
    DORIS: 'Doris',
    DUCKDUCKGO: 'DuckDuckGo',
    EDGE: 'Edge',
    EPIPHANY: 'Epiphany',
    FACEBOOK: 'Facebook',
    FALKON: 'Falkon',
    FIREBIRD: 'Firebird',
    FIREFOX: 'Firefox',
    FIREFOX_FOCUS: 'Firefox Focus',
    FIREFOX_MOBILE: 'Mobile Firefox',
    FIREFOX_REALITY: 'Firefox Reality',
    FENNEC: 'Fennec',
    FLOCK: 'Flock',
    FLOW: 'Flow',
    GO: 'Go Browser',
    GOOGLE_SEARCH: 'GSA',
    HEYTAP: 'HeyTap',
    HUAWEI: 'Huawei Browser',
    ICAB: 'iCab',
    ICE: 'ICE Browser',
    ICEAPE: 'IceApe',
    ICECAT: 'IceCat',
    ICEDRAGON: 'IceDragon',
    ICEWEASEL: 'IceWeasel',
    IE: 'IE',
    INSTAGRAM: 'Instagram',
    IRIDIUM: 'Iridium',
    IRON: 'Iron',
    JASMINE: 'Jasmine',
    KONQUEROR: 'Konqueror',
    KAKAO: 'KakaoTalk',
    KHTML: 'KHTML',
    K_MELEON: 'K-Meleon',
    KLAR: 'Klar',
    KLARNA: 'Klarna',
    KINDLE: 'Kindle',
    LENOVO: 'Smart Lenovo Browser',
    LIEBAO: 'LBBROWSER',
    LINE: 'Line',
    LINKEDIN: 'LinkedIn',
    LINKS: 'Links',
    LUNASCAPE: 'Lunascape',
    LYNX: 'Lynx',
    MAEMO: 'Maemo Browser',
    MAXTHON: 'Maxthon',
    MIDORI: 'Midori',
    MINIMO: 'Minimo',
    MIUI: 'MIUI Browser',
    MOZILLA: 'Mozilla',
    MOSAIC: 'Mosaic',
    NAVER: 'Naver',
    NETFRONT: 'NetFront',
    NETSCAPE: 'Netscape',
    NETSURF: 'Netsurf',
    NOKIA: 'Nokia Browser',
    OBIGO: 'Obigo',
    OCULUS: 'Oculus Browser',
    OMNIWEB: 'OmniWeb',
    OPERA: 'Opera',
    OPERA_COAST: 'Opera Coast',
    OPERA_MINI: 'Opera Mini',
    OPERA_MOBI: 'Opera Mobi',
    OPERA_TABLET: 'Opera Tablet',
    OPERA_TOUCH: 'Opera Touch',
    OVI: 'OviBrowser',
    PALEMOON: 'PaleMoon',
    PHANTOMJS: 'PhantomJS',
    PHOENIX: 'Phoenix',
    POLARIS: 'Polaris',
    PUFFIN: 'Puffin',
    QQ: 'QQBrowser',
    QQ_LITE: 'QQBrowserLite',
    QUARK: 'Quark',
    QUPZILLA: 'QupZilla',
    REKONQ: 'rekonq',
    ROCKMELT: 'Rockmelt',
    SAFARI: 'Safari',
    SAFARI_MOBILE: 'Mobile Safari',
    SAILFISH: 'Sailfish Browser',
    SAMSUNG: 'Samsung Internet',
    SEAMONKEY: 'SeaMonkey',
    SILK: 'Silk',
    SKYFIRE: 'Skyfire',
    SLEIPNIR: 'Sleipnir',
    SLIMBROWSER: 'SlimBrowser',
    SNAPCHAT: 'Snapchat',
    SOGOU_EXPLORER: 'Sogou Explorer',
    SOGOU_MOBILE: 'Sogou Mobile',
    SWIFTFOX: 'Swiftfox',
    TESLA: 'Tesla',
    TIKTOK: 'TikTok',
    TIZEN: 'Tizen Browser',
    UC: 'UCBrowser',
    UP: 'UP.Browser',
    VIERA: 'Viera',
    VIVALDI: 'Vivaldi',
    VIVO: 'Vivo Browser',
    W3M: 'w3m',
    WATERFOX: 'Waterfox',
    WEBKIT: 'WebKit',
    WECHAT: 'WeChat',
    WEIBO: 'Weibo',
    WHALE: 'Whale',
    YANDEX: 'Yandex'

    // TODO : test!
});

const CPU = Object.freeze({
    ARM : 'arm',
    ARM_64: 'arm64',
    ARM_HF: 'armhf',
    AVR: 'avr',
    AVR_32: 'avr32',
    IA64: 'ia64',
    IRIX: 'irix',
    IRIX_64: 'irix64',
    MIPS: 'mips',
    MIPS_64: 'mips64',
    M68K: '68k',
    PA_RISC: 'pa-risc',
    PPC: 'ppc',
    SPARC: 'sparc',
    SPARC_64: 'sparc64',
    X86: 'ia32',
    X86_64: 'amd64'
});

const Device = Object.freeze({
    CONSOLE: 'console',
    DESKTOP: 'desktop',
    EMBEDDED: 'embedded',
    MOBILE: 'mobile',
    SMARTTV: 'smarttv',
    TABLET: 'tablet',
    WEARABLE: 'wearable'
});

const Vendor = Object.freeze({
    ACER: 'Acer',
    ALCATEL: 'Alcatel',
    APPLE: 'Apple',
    AMAZON: 'Amazon',
    ARCHOS: 'Archos',
    ASUS: 'ASUS',
    ATT: 'AT&T',
    BENQ: 'BenQ',
    BLACKBERRY: 'BlackBerry',
    DELL: 'Dell',
    ESSENTIAL: 'Essential',
    FACEBOOK: 'Facebook',
    FAIRPHONE: 'Fairphone',
    GEEKSPHONE: 'GeeksPhone',
    GENERIC: 'Generic',
    GOOGLE: 'Google',
    HP: 'HP',
    HTC: 'HTC',
    HUAWEI: 'Huawei',
    INFINIX: 'Infinix',
    JOLLA: 'Jolla',
    KOBO: 'Kobo',
    LENOVO: 'Lenovo',
    LG: 'LG',
    MEIZU: 'Meizu',
    MICROSOFT: 'Microsoft',
    MOTOROLA: 'Motorola',
    NEXIAN: 'Nexian',
    NINTENDO: 'Nintendo',
    NOKIA: 'Nokia',
    NVIDIA: 'Nvidia',
    ONEPLUS: 'OnePlus',
    OPPO: 'OPPO',
    OUYA: 'Ouya',
    PALM: 'Palm',
    PANASONIC: 'Panasonic',
    PEBBLE: 'Pebble',
    POLYTRON: 'Polytron',
    REALME: 'Realme',
    RIM: 'RIM',
    ROKU: 'Roku',
    SAMSUNG: 'Samsung',
    SHARP: 'Sharp',
    SIEMENS: 'Siemens',
    SONY: 'Sony',
    SPRINT: 'Sprint',
    TECHNISAT: 'TechniSAT',
    TECNO: 'Tecno',
    TESLA: 'Tesla',
    ULEFONE: 'Ulefone',
    VIVO: 'Vivo',
    VODAFONE: 'Vodafone',
    XBOX: 'Xbox',
    XIAOMI: 'Xiaomi',
    ZEBRA: 'Zebra',
    ZTE: 'ZTE',

    // TODO : test!
});

const Engine = Object.freeze({
    AMAYA: 'Amaya',
    BLINK: 'Blink',
    EDGEHTML: 'EdgeHTML',
    FLOW: 'Flow',
    GECKO: 'Gecko',
    GOANNA: 'Goanna',
    ICAB: 'iCab',
    KHTML: 'KHTML',
    LIBWEB: 'LibWeb',
    LINKS: 'Links',
    LYNX: 'Lynx',
    NETFRONT: 'NetFront',
    NETSURF: 'NetSurf',
    PRESTO: 'Presto',
    TASMAN: 'Tasman',
    TRIDENT: 'Trident',
    W3M: 'w3m',
    WEBKIT: 'WebKit'
});

const OS = Object.freeze({
    AIX: 'AIX',
    AMIGA_OS: 'Amiga OS',
    ANDROID: 'Android',
    ANDROID_X86: 'Android-x86',
    ARCH: 'Arch',
    BADA: 'Bada',
    BEOS: 'BeOS',
    BLACKBERRY: 'BlackBerry',
    CENTOS: 'CentOS',
    CHROME_OS: 'Chrome OS',
    CHROMECAST: 'Chromecast',
    CONTIKI: 'Contiki',
    DEBIAN: 'Debian',
    DEEPIN: 'Deepin',
    DRAGONFLY: 'DragonFly',
    ELEMENTARY_OS: 'elementary OS',
    FEDORA: 'Fedora',
    FIREFOX_OS: 'Firefox OS',
    FREEBSD: 'FreeBSD',
    FUCHSIA: 'Fuchsia',
    GENTOO: 'Gentoo',
    GHOSTBSD: 'GhostBSD',
    GNU: 'GNU',
    HAIKU: 'Haiku',
    HARMONYOS: 'HarmonyOS',
    HP_UX: 'HP-UX',
    HURD: 'Hurd',
    IOS: 'iOS',
    JOLI: 'Joli',
    KAIOS: 'KaiOS',
    LINPUS: 'Linpus',
    LINSPIRE: 'Linspire',
    LINUX: 'Linux',
    MACOS: 'macOS',
    MAEMO: 'Maemo',
    MAGEIA: 'Mageia',
    MANDRIVA: 'Mandriva',
    MANJARO: 'Manjaro',
    MEEGO: 'MeeGo',
    MINIX: 'Minix',
    MINT: 'Mint',
    MORPH_OS: 'Morph OS',
    NETBSD: 'NetBSD',
    NETRANGE: 'NetRange',
    NETTV: 'NetTV',
    NINTENDO: 'Nintendo',
    OPENBSD: 'OpenBSD',
    OPENVMS: 'OpenVMS',
    OS2: 'OS/2',
    PALM: 'Palm',
    PC_BSD: 'PC-BSD',
    PCLINUXOS: 'PCLinuxOS',
    PLAN9: 'Plan9',
    PLAYSTATION: 'PlayStation',
    QNX: 'QNX',
    RASPBIAN: 'Raspbian',
    REDHAT: 'RedHat',
    RIM_TABLET_OS: 'RIM Tablet OS',
    RISC_OS: 'RISC OS',
    SABAYON: 'Sabayon',
    SAILFISH: 'Sailfish',
    SERENITYOS: 'SerenityOS',
    SERIES40: 'Series40',
    SLACKWARE: 'Slackware',
    SOLARIS: 'Solaris',
    SUSE: 'SUSE',
    SYMBIAN: 'Symbian',
    TIZEN: 'Tizen',
    UBUNTU: 'Ubuntu',
    UNIX: 'Unix',
    VECTORLINUX: 'VectorLinux',
    VIERA: 'Viera',
    WATCHOS: 'watchOS',
    WEBOS: 'WebOS',
    WINDOWS: 'Windows',
    WINDOWS_MOBILE: 'Windows Mobile',
    WINDOWS_PHONE: 'Windows Phone',
    XBOX: 'Xbox',
    ZENWALK: 'Zenwalk'

    // TODO : test!
});


// EXTERNAL MODULE: ../../packages/shared/helpers/simplify.ts
var simplify = __webpack_require__(41087);
;// CONCATENATED MODULE: ../../packages/shared/hooks/useUADetails.ts
// @ts-ignore
const getOsLabel=os=>{// The OS string we have is not necessarily the one we need to display
switch((0,simplify/* simplify */.C)(os)){case'windows':return OS.WINDOWS;case'macos':return OS.MACOS;case'linux':return OS.LINUX;case'android':return OS.ANDROID;case'ios':return OS.IOS;default:return os;}};const useUADetails=function(skip){if(skip===void 0){skip=false;}const{0:uaDetails,1:setUADetails}=(0,react.useState)({os:undefined,browser:undefined,engine:undefined,device:undefined});(0,react.useEffect)(()=>{if(skip)return undefined;const getUADetails=async()=>{const parser=new UAParser();const result=await parser.getResult().withClientHints();const{os,browser,engine,device}=result;setUADetails({os,browser,engine,device:device.type?device:{type:'desktop'}});};void getUADetails();},[skip]);return uaDetails;};

/***/ }),

/***/ 94775:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: function() { return /* binding */ buildConfig; }
/* harmony export */ });
/* harmony import */ var _constants_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56202);
const fetchWithCreds=(input,init)=>{return fetch(input,{...init,credentials:'include'});};const buildConfig=api=>({url:api+"/feature/v2/frontend",clientKey:'-',// set by the server
appName:'-',// set by the server
refreshInterval:600,// refreshInterval in seconds, 10 mins
customHeaders:_constants_api__WEBPACK_IMPORTED_MODULE_0__/* .API_HEADERS */ .Q,disableMetrics:true,fetch:fetchWithCreds});

/***/ }),

/***/ 55795:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: function() { return /* binding */ IsUnleashReadyContext; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
const IsUnleashReadyContext=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);

/***/ }),

/***/ 29448:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: function() { return /* binding */ ExperimentCode; }
/* harmony export */ });
let ExperimentCode=/*#__PURE__*/function(ExperimentCode){ExperimentCode["PricingPageFreeModal"]="PricingPageFreeModal";ExperimentCode["SingleSignupPage"]="SingleSignupPage";ExperimentCode["VpnIntroPricing"]="VpnIntroPricing";ExperimentCode["ExitPoints1"]="ExitPoints1";return ExperimentCode;}({});

/***/ }),

/***/ 67726:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: function() { return /* binding */ changeCurrentLocale; }
/* harmony export */ });
/* harmony import */ var _protonme_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22422);
const changeCurrentLocale=(currentUrl,navigate,locale,ref)=>{if(currentUrl.isPreview){return;}const newUrl=(0,_protonme_routing__WEBPACK_IMPORTED_MODULE_0__/* .addLocale */ .IK)(currentUrl,locale,true);const href=newUrl.href.replace(newUrl.origin,'');void navigate(href,{state:{ref}});};

/***/ }),

/***/ 64284:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AY: function() { return /* binding */ defaultLocalizationContext; },
/* harmony export */   Pq: function() { return /* binding */ defaultFrameworkValue; },
/* harmony export */   U9: function() { return /* binding */ simpleNavigateFunction; }
/* harmony export */ });
/* harmony import */ var _protonme_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56763);
/* harmony import */ var _protonme_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22422);
const simpleNavigateFunction=async to=>{if(window){window.location.href=to;}};const pageBuiltInLanguages={};_protonme_localization__WEBPACK_IMPORTED_MODULE_0__.locales.forEach(locale=>{pageBuiltInLanguages[locale.code]=true;});const defaultLocalizationContext={isLocalizedPageInDefaultLang:false,isDefaultPageOfLocalizedFallbacks:false,pageBuiltInLanguages};const defaultFrameworkValue={currentUrl:(0,_protonme_routing__WEBPACK_IMPORTED_MODULE_1__/* .getProtonUrl */ .uQ)('/'),routing:{navigate:simpleNavigateFunction},localization:defaultLocalizationContext,unleash:undefined};

/***/ }),

/***/ 20921:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: function() { return /* binding */ FrameworkProvider; },
/* harmony export */   y: function() { return /* binding */ FrameworkContext; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
/* harmony import */ var _protonme_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22422);
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64284);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63159);
const FrameworkContext=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(_default__WEBPACK_IMPORTED_MODULE_2__/* .defaultFrameworkValue */ .Pq);const FrameworkProvider=_ref=>{let{children,...value}=_ref;// currentUrl when passed to framework provider is string
// ONLY here we then transform it from string to ProtonURL and enforce ProtonURL string since we know it has to be a ProtonURL (aka CurrentURL).
// undefined is at this point not an opiton. We may provide a fallback with e.g. getProtonUrl("/").
// const protonUrl = (getProtonUrl(value.currentUrl) || getProtonUrl("/")) as ProtonURL;
const currentUrl=(0,_protonme_routing__WEBPACK_IMPORTED_MODULE_1__/* .getProtonUrl */ .uQ)((0,_protonme_routing__WEBPACK_IMPORTED_MODULE_1__/* .getRelativePath */ .Aj)(value.currentUrl));return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(FrameworkContext.Provider,{value:{...value,currentUrl},children:children});};

/***/ }),

/***/ 78912:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  u: function() { return /* binding */ useFramework; }
});

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
;// CONCATENATED MODULE: ../../node_modules/.pnpm/nanostores@0.9.3/node_modules/nanostores/listen-keys/index.js
function listenKeys(store, keys, listener) {
  let keysSet = new Set([...keys, undefined])
  return store.listen((value, changed) => {
    if (keysSet.has(changed)) {
      listener(value, changed)
    }
  })
}

;// CONCATENATED MODULE: ../../node_modules/.pnpm/@nanostores+react@0.7.1_nanostores@0.9.3_react@18.2.0/node_modules/@nanostores/react/index.js



function useStore(store, opts = {}) {
  let subscribe = (0,react.useCallback)(
    onChange =>
      opts.keys
        ? listenKeys(store, opts.keys, onChange)
        : store.listen(onChange),
    [opts.keys, store]
  )

  let get = store.get.bind(store)

  return (0,react.useSyncExternalStore)(subscribe, get, get)
}

// EXTERNAL MODULE: ../../packages/routing/src/index.ts + 18 modules
var src = __webpack_require__(22422);
;// CONCATENATED MODULE: ../../node_modules/.pnpm/nanostores@0.9.3/node_modules/nanostores/atom/index.js


let listenerQueue = []

let atom = (initialValue, level) => {
  let listeners = []
  let store = {
    get() {
      if (!store.lc) {
        store.listen(() => {})()
      }
      return store.value
    },
    l: level || 0,
    lc: 0,
    listen(listener, listenerLevel) {
      store.lc = listeners.push(listener, listenerLevel || store.l) / 2

      return () => {
        let index = listeners.indexOf(listener)
        if (~index) {
          listeners.splice(index, 2)
          store.lc--
          if (!store.lc) store.off()
        }
      }
    },
    notify(changedKey) {
      let runListenerQueue = !listenerQueue.length
      for (let i = 0; i < listeners.length; i += 2) {
        listenerQueue.push(
          listeners[i],
          store.value,
          changedKey,
          listeners[i + 1]
        )
      }

      if (runListenerQueue) {
        for (let i = 0; i < listenerQueue.length; i += 4) {
          let skip = false
          for (let j = i + 7; j < listenerQueue.length; j += 4) {
            if (listenerQueue[j] < listenerQueue[i + 3]) {
              skip = true
              break
            }
          }

          if (skip) {
            listenerQueue.push(
              listenerQueue[i],
              listenerQueue[i + 1],
              listenerQueue[i + 2],
              listenerQueue[i + 3]
            )
          } else {
            listenerQueue[i](listenerQueue[i + 1], listenerQueue[i + 2])
          }
        }
        listenerQueue.length = 0
      }
    },
    off() {}, /* It will be called on last listener unsubscribing.
                 We will redefine it in onMount and onStop. */
    set(data) {
      if (store.value !== data) {
        store.value = data
        store.notify()
      }
    },
    subscribe(cb, listenerLevel) {
      let unbind = store.listen(cb, listenerLevel)
      cb(store.value)
      return unbind
    },
    value: initialValue
  }

  if (false) {}

  return store
}

// EXTERNAL MODULE: ../../packages/shared/modules/framework/default.ts
var framework_default = __webpack_require__(64284);
// EXTERNAL MODULE: ../../packages/ttag/src/index.ts + 2 modules
var ttag_src = __webpack_require__(96764);
// EXTERNAL MODULE: ../../node_modules/.pnpm/unleash-proxy-client@3.3.2/node_modules/unleash-proxy-client/build/main.esm.js
var main_esm = __webpack_require__(80992);
// EXTERNAL MODULE: ../../packages/shared/modules/feature-flags/config.ts
var feature_flags_config = __webpack_require__(94775);
;// CONCATENATED MODULE: ../../packages/shared/modules/feature-flags/startUnleash.tsx
// Start the Unleash client without the React provider, more suited with Astro
const startUnleash=api=>{const config=(0,feature_flags_config/* buildConfig */.f)(api);const client=new main_esm/* UnleashClient */.cn(config);void client.start();return client;};
;// CONCATENATED MODULE: ../../packages/shared/modules/framework/astro/initFramework.ts
const routing={navigate:framework_default/* simpleNavigateFunction */.U9};const initFrameworkServer=_ref=>{let{currentUrl,localization,translations}=_ref;setFrameworkStore({currentUrl,routing,localization,unleash:undefined});init($frameworkStore.get().currentUrl.locale,translations);};const initFrameworkClient=_ref2=>{let{currentUrl:inputCurrentUrl,localization,translations,unleashApi}=_ref2;// Ultra basic Unleash setup, but ensure a request to account and set Session-Id cookie
const unleash=startUnleash(unleashApi);const currentUrl=(0,src/* getProtonUrl */.uQ)((0,src/* getRelativePath */.Aj)(inputCurrentUrl));(0,ttag_src/* init */.Ts)(currentUrl.locale,translations);return{currentUrl,routing,localization,unleash};};
;// CONCATENATED MODULE: ../../packages/shared/modules/framework/astro/FrameworkStore.ts
let globalFrameworkValue=undefined;// Running logic at script load is not a super satisfying
// But it's the only consistent way we found to initialize the store with the context on the client side
// Ensuring that any islands (therefore React components) loads first with the default context causing hydration issues and CLS
if(globalThis.window&&globalThis.window.frameworkContext){globalFrameworkValue=initFrameworkClient(globalThis.window.frameworkContext);}const FrameworkStore_$frameworkStore=atom(globalFrameworkValue||framework_default/* defaultFrameworkValue */.Pq);const FrameworkStore_setFrameworkStore=value=>{const currentUrl=getProtonUrl(getRelativePath(value.currentUrl));FrameworkStore_$frameworkStore.set({...value,currentUrl});};
// EXTERNAL MODULE: ../../packages/shared/modules/framework/gatsby/FrameworkContext.tsx
var FrameworkContext = __webpack_require__(20921);
;// CONCATENATED MODULE: ../../packages/shared/modules/framework/useFramework.ts
const renameProps=value=>{const{currentUrl,routing,localization}=value;return{currentUrl,routing,localization};};const useFramework=()=>{const contextValue=(0,react.useContext)(FrameworkContext/* FrameworkContext */.y);const storeValue=useStore(FrameworkStore_$frameworkStore);if(contextValue!==framework_default/* defaultFrameworkValue */.Pq){return renameProps(contextValue);}return renameProps(storeValue);};

/***/ }),

/***/ 78656:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26425);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "postCoreReportsBug")) __webpack_require__.d(__webpack_exports__, { postCoreReportsBug: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.postCoreReportsBug; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "postCoreReportsForm")) __webpack_require__.d(__webpack_exports__, { postCoreReportsForm: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.postCoreReportsForm; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87916);


/***/ }),

/***/ 87916:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export postCoreReportsAbuse */
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/core/v4/reports/abuse
 * @description Proton Slim API to send abuse formular.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/core/#tag/Reports/operation/post_core-%7B_version%7D-reports-abuse
 */const postCoreReportsAbuse=async body=>{const formData=new FormData();Object.entries(body).forEach(_ref=>{let[key,value]=_ref;if(key&&typeof value!=='undefined'){formData.append(key,value);}});const response=await fetchHelper('/core/v4/reports/abuse',{method:'POST',body:formData});// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 26425:
/***/ (function() {



/***/ }),

/***/ 18152:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postCoreReportsBug: function() { return /* reexport safe */ _post__WEBPACK_IMPORTED_MODULE_1__.h; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94081);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "postCoreReportsBug")) __webpack_require__.d(__webpack_exports__, { postCoreReportsBug: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.postCoreReportsBug; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "postCoreReportsForm")) __webpack_require__.d(__webpack_exports__, { postCoreReportsForm: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.postCoreReportsForm; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38884);


/***/ }),

/***/ 38884:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: function() { return /* binding */ postCoreReportsBug; }
/* harmony export */ });
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/core/v4/reports/bug
 * @description Proton Slim API to send bug formular.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/core/#tag/Reports/operation/post_core-%7B_version%7D-reports-bug
 */const postCoreReportsBug=async body=>{const response=await (0,_helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__/* .fetchHelper */ .Z)('/core/v4/reports/bug',{method:'POST',body:JSON.stringify(body)});// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 94081:
/***/ (function() {



/***/ }),

/***/ 59172:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postCoreReportsForm: function() { return /* reexport safe */ _post__WEBPACK_IMPORTED_MODULE_1__.j; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32533);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "postCoreReportsForm")) __webpack_require__.d(__webpack_exports__, { postCoreReportsForm: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.postCoreReportsForm; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71184);


/***/ }),

/***/ 71184:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: function() { return /* binding */ postCoreReportsForm; }
/* harmony export */ });
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/core/v4/reports/form/{portal_id}/{form_id}
 * @description Proton Slim API to send special forms, e.g. "Contact Sales" form.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/core/#tag/Reports/operation/post_core-%7B_version%7D-reports-form-%7Bportal_id%7D-%7Bform_id%7D
 */const postCoreReportsForm=async(portal_id,form_id,body)=>{const response=await (0,_helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__/* .fetchHelper */ .Z)("/core/v4/reports/form/"+portal_id+"/"+form_id,{method:'POST',body:JSON.stringify(body)});// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 32533:
/***/ (function() {



/***/ }),

/***/ 22399:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27114);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76085);


/***/ }),

/***/ 76085:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export postDataStats */
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/data/v1/stats
 * @description Proton Slim API response containing status if posting stat was successfull.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/data/#tag/Data/operation/post_data-v1-stats
 */const postDataStats=async body=>{const response=await fetchHelper('/data/v1/stats',{method:'POST',body:JSON.stringify(body)});// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 27114:
/***/ (function() {



/***/ }),

/***/ 14032:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getPaymentsPlansDefault */
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/payments/v4/plans/default
 * @description Proton Slim API response containing the free plan.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/payments/#tag/Plans/operation/get_payments-v4-plans-default
 */const getPaymentsPlansDefault=async()=>{const response=await fetchHelper('/payments/v4/plans/default');// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 85884:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26061);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14032);


/***/ }),

/***/ 26061:
/***/ (function() {



/***/ }),

/***/ 79787:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: function() { return /* binding */ getPaymentsPlans; }
/* harmony export */ });
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/payments/v4/plans
 * @description Proton Slim API response containing all paid plans.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/payments/#tag/Plans/operation/get_payments-v4-plans
 */const getPaymentsPlans=async()=>{const response=await (0,_helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__/* .fetchHelper */ .Z)('/payments/v4/plans');// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 62755:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPaymentsPlans: function() { return /* reexport safe */ _get__WEBPACK_IMPORTED_MODULE_1__.C; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73350);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79787);


/***/ }),

/***/ 73350:
/***/ (function() {



/***/ }),

/***/ 85210:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   putPaymentsSubscriptionCheck: function() { return /* reexport safe */ _put__WEBPACK_IMPORTED_MODULE_1__.c; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43659);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _put__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10271);


/***/ }),

/***/ 10271:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: function() { return /* binding */ putPaymentsSubscriptionCheck; }
/* harmony export */ });
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/payments/v4/subscription/check
 * @description Proton Slim API response containing discount information for the requested PlanID/CouponCode/Cycle.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/payments/#tag/Subscriptions/operation/post_payments-v4-subscription-check
 */const putPaymentsSubscriptionCheck=async body=>{const response=await (0,_helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__/* .fetchHelper */ .Z)('/payments/v4/subscription/check',{method:'PUT',body:JSON.stringify(body)});// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 43659:
/***/ (function() {



/***/ }),

/***/ 25313:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: function() { return /* binding */ getVpnLoads; }
/* harmony export */ });
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/vpn/loads
 * @description Proton Slim API response containing loads of all servers.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/vpn/#tag/VPN/operation/get_vpn-loads
 */const getVpnLoads=async()=>{const response=await (0,_helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__/* .fetchHelper */ .Z)('/vpn/loads');// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 60577:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVpnLoads: function() { return /* reexport safe */ _get__WEBPACK_IMPORTED_MODULE_1__.e; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42548);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25313);


/***/ }),

/***/ 42548:
/***/ (function() {



/***/ }),

/***/ 40471:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: function() { return /* binding */ getVpnLocation; }
/* harmony export */ });
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/vpn/location
 * @description Proton Slim API response containing basic visitor location information.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/vpn/#tag/VPN/operation/get_vpn-location
 */const getVpnLocation=async()=>{const response=await (0,_helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__/* .fetchHelper */ .Z)('/vpn/location');// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 25071:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVpnLocation: function() { return /* reexport safe */ _get__WEBPACK_IMPORTED_MODULE_1__.s; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67034);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40471);


/***/ }),

/***/ 67034:
/***/ (function() {



/***/ }),

/***/ 28280:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getVpnLogicals */
/* harmony import */ var _helpers_fetchHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81410);
/**
 * @api /api/vpn/logicals
 * @description Proton Slim API response containing all vpn servers.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/vpn/#tag/VPN/operation/get_vpn-logicals
 */const getVpnLogicals=async params=>{const searchParams=new URLSearchParams();if(params){Object.entries(params).forEach(_ref=>{let[name,value]=_ref;searchParams.append(name,String(value));});}const search=searchParams.toString();const response=await fetchHelper("/vpn/logicals"+(search?"?"+search:''));// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};

/***/ }),

/***/ 55188:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74789);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_0__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _types__WEBPACK_IMPORTED_MODULE_0__.getVpnServersCount; } });
/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28280);


/***/ }),

/***/ 74789:
/***/ (function() {



/***/ }),

/***/ 87687:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  getVpnServersCount: function() { return /* reexport */ getVpnServersCount; }
});

// EXTERNAL MODULE: ../../packages/slim-api/src/endpoints/vpn.servers-count/types.ts
var types = __webpack_require__(97143);
// EXTERNAL MODULE: ../../packages/slim-api/src/helpers/fetchHelper.ts
var fetchHelper = __webpack_require__(81410);
;// CONCATENATED MODULE: ../../packages/slim-api/src/endpoints/vpn.servers-count/get.ts
/**
 * @api /api/vpn/servers-count
 * @description Proton Slim API response containing main counts of countries and servers.
 * @docs https://protonmail.gitlab-pages.protontech.ch/Slim-API/vpn/#tag/VPN/operation/get_vpn-servers-count
 */const getVpnServersCount=async()=>{const response=await (0,fetchHelper/* fetchHelper */.Z)('/vpn/servers-count');// in case of 4xx
if(!response.ok){throw new Error(response.statusText);}const json=await response.json();return json;};
;// CONCATENATED MODULE: ../../packages/slim-api/src/endpoints/vpn.servers-count/index.ts


/***/ }),

/***/ 97143:
/***/ (function() {



/***/ }),

/***/ 81410:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: function() { return /* binding */ fetchHelper; }
/* harmony export */ });
/* harmony import */ var _x_pm_appversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99232);
const fetchHelper=async(input,init)=>{// ensure that ProxyAgent is only imported and set during SSR
let dispatcher;if(typeof window==='undefined'&&({}).http_proxy){const{ProxyAgent}=await import(/* webpackIgnore: true */'undici');dispatcher=new ProxyAgent(({}).http_proxy);}const inputHref=input.toString();const url=new URL(inputHref.includes('https://')?inputHref:"/api"+inputHref,"https://account.protonvpn.com/api");return fetch(url,{...init,headers:{...(init===null||init===void 0?void 0:init.headers),accept:'application/vnd.protonmail.v1+json',...(!((init===null||init===void 0?void 0:init.body)instanceof FormData)&&{// content-type will be set automatically if body is form-data
'content-type':'application/json;charset=utf-8'}),'x-pm-appversion':_x_pm_appversion__WEBPACK_IMPORTED_MODULE_0__/* .xPmAppversion */ .J},credentials:'include',// @ts-ignore
dispatcher});};

/***/ }),

/***/ 99232:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: function() { return /* binding */ xPmAppversion; }
/* harmony export */ });
var _process$env$CI_COMMI;
/*
 * Sets "x-pm-appversion" depending on git tag
 * If git tag is "v1.2.3+protonvpn-com" the xPmAppversion will be "web-static-protonvpncom@1.2.3"
 * Fallback is always "web-static@0.0.0"
 */

const versionApp = (_process$env$CI_COMMI = "v10.41.10+protonvpn-com") === null || _process$env$CI_COMMI === void 0 ? void 0 : _process$env$CI_COMMI.match(/^[vV](\d+)\.(\d+)\.(\d+)\+(.*)$/);
const app = versionApp ? "web-static-" + versionApp[4].replace('-', '') : 'web-static';
const version = versionApp ? versionApp[1] + "." + versionApp[2] + "." + versionApp[3] : '0.0.0';
const xPmAppversion = app + "@" + version;

/***/ }),

/***/ 42728:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPaymentsPlans: function() { return /* reexport safe */ _endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__.getPaymentsPlans; },
/* harmony export */   getVpnLoads: function() { return /* reexport safe */ _endpoints_vpn_loads__WEBPACK_IMPORTED_MODULE_8__.getVpnLoads; },
/* harmony export */   getVpnLocation: function() { return /* reexport safe */ _endpoints_vpn_location__WEBPACK_IMPORTED_MODULE_9__.getVpnLocation; },
/* harmony export */   getVpnServersCount: function() { return /* reexport safe */ _endpoints_vpn_servers_count__WEBPACK_IMPORTED_MODULE_11__.getVpnServersCount; },
/* harmony export */   postCoreReportsBug: function() { return /* reexport safe */ _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.postCoreReportsBug; },
/* harmony export */   postCoreReportsForm: function() { return /* reexport safe */ _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__.postCoreReportsForm; },
/* harmony export */   putPaymentsSubscriptionCheck: function() { return /* reexport safe */ _endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__.putPaymentsSubscriptionCheck; },
/* harmony export */   xPmAppversion: function() { return /* reexport safe */ _helpers_x_pm_appversion__WEBPACK_IMPORTED_MODULE_0__.J; }
/* harmony export */ });
/* harmony import */ var _helpers_x_pm_appversion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99232);
/* harmony import */ var _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78656);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "postCoreReportsBug")) __webpack_require__.d(__webpack_exports__, { postCoreReportsBug: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.postCoreReportsBug; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "postCoreReportsForm")) __webpack_require__.d(__webpack_exports__, { postCoreReportsForm: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.postCoreReportsForm; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _endpoints_core_reports_abuse__WEBPACK_IMPORTED_MODULE_1__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18152);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__, "postCoreReportsForm")) __webpack_require__.d(__webpack_exports__, { postCoreReportsForm: function() { return _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.postCoreReportsForm; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _endpoints_core_reports_bug__WEBPACK_IMPORTED_MODULE_2__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59172);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _endpoints_core_reports_form__WEBPACK_IMPORTED_MODULE_3__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22399);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__, "getPaymentsPlans")) __webpack_require__.d(__webpack_exports__, { getPaymentsPlans: function() { return _endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__.getPaymentsPlans; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _endpoints_data_stats__WEBPACK_IMPORTED_MODULE_4__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62755);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _endpoints_payments_plans__WEBPACK_IMPORTED_MODULE_5__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(85884);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__.getVpnServersCount; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__, "putPaymentsSubscriptionCheck")) __webpack_require__.d(__webpack_exports__, { putPaymentsSubscriptionCheck: function() { return _endpoints_payments_plans_default__WEBPACK_IMPORTED_MODULE_6__.putPaymentsSubscriptionCheck; } });
/* harmony import */ var _endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(85210);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__, "getVpnLoads")) __webpack_require__.d(__webpack_exports__, { getVpnLoads: function() { return _endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__.getVpnLoads; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_payments_subscription_check__WEBPACK_IMPORTED_MODULE_7__.getVpnServersCount; } });
/* harmony import */ var _endpoints_vpn_loads__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(60577);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_vpn_loads__WEBPACK_IMPORTED_MODULE_8__, "getVpnLocation")) __webpack_require__.d(__webpack_exports__, { getVpnLocation: function() { return _endpoints_vpn_loads__WEBPACK_IMPORTED_MODULE_8__.getVpnLocation; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_vpn_loads__WEBPACK_IMPORTED_MODULE_8__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_vpn_loads__WEBPACK_IMPORTED_MODULE_8__.getVpnServersCount; } });
/* harmony import */ var _endpoints_vpn_location__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25071);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_vpn_location__WEBPACK_IMPORTED_MODULE_9__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_vpn_location__WEBPACK_IMPORTED_MODULE_9__.getVpnServersCount; } });
/* harmony import */ var _endpoints_vpn_logicals__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(55188);
/* harmony reexport (checked) */ if(__webpack_require__.o(_endpoints_vpn_logicals__WEBPACK_IMPORTED_MODULE_10__, "getVpnServersCount")) __webpack_require__.d(__webpack_exports__, { getVpnServersCount: function() { return _endpoints_vpn_logicals__WEBPACK_IMPORTED_MODULE_10__.getVpnServersCount; } });
/* harmony import */ var _endpoints_vpn_servers_count__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(87687);


/***/ }),

/***/ 96764:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  IK: function() { return /* binding */ src_addLocale; },
  c: function() { return /* binding */ c; },
  Ts: function() { return /* reexport */ init; },
  pD: function() { return /* binding */ msgid; },
  Ym: function() { return /* binding */ src_useLocale; }
});

// UNUSED EXPORTS: gettext, jt, ngettext, setDedent, setDefaultLang, t, useLocales

// EXTERNAL MODULE: ../../node_modules/.pnpm/ttag@1.7.29_babel-plugin-macros@3.1.0/node_modules/ttag/index.js
var ttag = __webpack_require__(66270);
var ttag_default = /*#__PURE__*/__webpack_require__.n(ttag);
;// CONCATENATED MODULE: ../../packages/ttag/src/ttag.ts
/* eslint-disable import/no-default-export */ // Gatsby can't work without the "* as", Vite in dev mode can't work with
// So that file is a compatibility layer to make everyone happy
// Don't touch unless the situation changed and you know what you are doing
const exportTtag=(ttag_default())?(ttag_default()):ttag;/* harmony default export */ var src_ttag = (exportTtag);
// EXTERNAL MODULE: ../../packages/localization/src/index.ts + 4 modules
var src = __webpack_require__(56763);
;// CONCATENATED MODULE: ../../packages/ttag/src/init.ts
/* eslint-disable react-hooks/rules-of-hooks */const{useLocale,addLocale}=src_ttag;const init=(locale,translations)=>{if(locale===src.defaultLocale.code){useLocale(locale);}else if(locale&&translations){addLocale(locale,translations);useLocale(locale);}};
;// CONCATENATED MODULE: ../../packages/ttag/src/index.ts
/*
 * Really really ugly stuff going on here!
 * ttag is bundled with commonjs but Vite accept it only with this import: `import * as ttag from 'ttag'`
 * (beware, the error with Vite only appears in built version)
 * but if we do that way, ttag code parser fails to extract translations
 * to leverage that issue, we create a ttag alias in Vite config pointing to that file
 * it imports the original ttag the right way for vite and export it the way it works for extractions
 */const t=src_ttag.t;const jt=src_ttag.jt;const msgid=src_ttag.msgid;const gettext=src_ttag.gettext;const ngettext=src_ttag.ngettext;const src_addLocale=src_ttag.addLocale;const src_useLocale=src_ttag.useLocale;const setDedent=src_ttag.setDedent;const setDefaultLang=src_ttag.setDefaultLang;const useLocales=src_ttag.useLocales;const c=src_ttag.c;

/***/ }),

/***/ 75847:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ri: function() { return /* binding */ getCookie; },
/* harmony export */   TV: function() { return /* binding */ setCookie; },
/* harmony export */   Yj: function() { return /* binding */ deleteCookie; },
/* harmony export */   f5: function() { return /* binding */ checkCookie; },
/* harmony export */   qh: function() { return /* binding */ CookieSameSiteAttribute; }
/* harmony export */ });
/* unused harmony export getCookies */
const getCookies=()=>{try{return document.cookie.split(';').map(item=>item.trim());}catch(e){return[];}};const getCookie=function(name,cookies){var _match;if(cookies===void 0){cookies=document.cookie;}return(_match=("; "+cookies).match(";\\s*"+name+"=([^;]+)"))===null||_match===void 0?void 0:_match[1];};const checkCookie=(name,value)=>{return getCookies().some(cookie=>cookie.includes(name+"="+value));};let CookieSameSiteAttribute=/*#__PURE__*/function(CookieSameSiteAttribute){CookieSameSiteAttribute["Lax"]="lax";CookieSameSiteAttribute["Strict"]="strict";CookieSameSiteAttribute["None"]="none";return CookieSameSiteAttribute;}({});const setCookie=_ref=>{let{cookieName,cookieValue:maybeCookieValue,expirationDate:maybeExpirationDate,path,cookieDomain,samesite,secure=true}=_ref;const cookieValue=maybeCookieValue===undefined?'':maybeCookieValue;let expirationDate=maybeExpirationDate;if(expirationDate==='max'){/* https://en.wikipedia.org/wiki/Year_2038_problem */expirationDate=new Date(2147483647000).toUTCString();}expirationDate=maybeCookieValue===undefined?new Date(0).toUTCString():expirationDate;document.cookie=[cookieName+"="+cookieValue,expirationDate&&"expires="+expirationDate,cookieDomain&&"domain="+cookieDomain,path&&"path="+path,secure&&'secure',samesite&&"samesite="+samesite].filter(Boolean).join(';');};const deleteCookie=function(cookieName,path){if(path===void 0){path='/';}setCookie({cookieName,cookieValue:undefined,path});};

/***/ }),

/***/ 47369:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

exports.components={"component---src-modules-prismic-templates-landing-page-tsx":()=>Promise.all(/* import() | component---src-modules-prismic-templates-landing-page-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(2471)]).then(__webpack_require__.bind(__webpack_require__, 4525)),"component---src-modules-prismic-templates-text-based-tsx":()=>Promise.all(/* import() | component---src-modules-prismic-templates-text-based-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(587)]).then(__webpack_require__.bind(__webpack_require__, 87395)),"component---src-pages-403-tsx":()=>Promise.all(/* import() | component---src-pages-403-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(9838)]).then(__webpack_require__.bind(__webpack_require__, 10212)),"component---src-pages-404-tsx":()=>Promise.all(/* import() | component---src-pages-404-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(1453)]).then(__webpack_require__.bind(__webpack_require__, 65811)),"component---src-pages-business-contact-tsx":()=>Promise.all(/* import() | component---src-pages-business-contact-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(199), __webpack_require__.e(6968), __webpack_require__.e(8318)]).then(__webpack_require__.bind(__webpack_require__, 59553)),"component---src-pages-business-signup-tsx":()=>Promise.all(/* import() | component---src-pages-business-signup-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(199), __webpack_require__.e(6968), __webpack_require__.e(1158)]).then(__webpack_require__.bind(__webpack_require__, 85930)),"component---src-pages-sitemap-tsx":()=>Promise.all(/* import() | component---src-pages-sitemap-tsx */[__webpack_require__.e(1869), __webpack_require__.e(4223), __webpack_require__.e(5296)]).then(__webpack_require__.bind(__webpack_require__, 46917))};

/***/ }),

/***/ 75949:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports=[{plugin:__webpack_require__(7558),options:{"plugins":[]}},{plugin:__webpack_require__(7683),options:{"plugins":[]}}];

/***/ }),

/***/ 46840:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const plugins=__webpack_require__(75949);const{getResourceURLsForPathname,loadPage,loadPageSync}=(__webpack_require__(7587)/* .publicLoader */ .Zf);exports.N=function(api,args,defaultReturn,argTransform){if(args===void 0){args={};}// Hooks for gatsby-cypress's API handler
if(false){}let results=plugins.map(plugin=>{if(!plugin.plugin[api]){return undefined;}args.getResourceURLsForPathname=getResourceURLsForPathname;args.loadPage=loadPage;args.loadPageSync=loadPageSync;const result=plugin.plugin[api](args,plugin.options);if(result&&argTransform){args=argTransform({args,result,plugin});}return result;});// Filter out undefined results.
results=results.filter(result=>typeof result!=="undefined");if(results.length>0){return results;}else if(defaultReturn){return[defaultReturn];}else{return[];}};exports.v=(api,args,defaultReturn)=>plugins.reduce((previous,next)=>next.plugin[api]?previous.then(()=>next.plugin[api](args,next.options)):previous,Promise.resolve());

/***/ }),

/***/ 50208:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;
__webpack_unused_export__=()=>"";

/***/ }),

/***/ 10011:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ _cache_emitter; }
});

;// CONCATENATED MODULE: ../../node_modules/.pnpm/mitt@1.2.0/node_modules/mitt/dist/mitt.es.js
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ var mitt_es = (mitt);
//# sourceMappingURL=mitt.es.js.map

;// CONCATENATED MODULE: ./.cache/emitter.js
const emitter=mitt_es();/* harmony default export */ var _cache_emitter = (emitter);

/***/ }),

/***/ 14819:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Yl: function() { return /* binding */ findMatchPath; },
  Hh: function() { return /* binding */ findPath; },
  UA: function() { return /* binding */ grabMatchParams; },
  QX: function() { return /* binding */ setMatchPaths; }
});

// UNUSED EXPORTS: cleanPath

// EXTERNAL MODULE: ../../node_modules/.pnpm/@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs
var index_modern = __webpack_require__(98855);
// EXTERNAL MODULE: ./.cache/strip-prefix.js
var strip_prefix = __webpack_require__(33817);
;// CONCATENATED MODULE: ./.cache/normalize-page-path.js
/* harmony default export */ var normalize_page_path = (pathAndSearch=>{if(pathAndSearch===undefined){return pathAndSearch;}let[path,search=""]=pathAndSearch.split("?");if(search){search="?"+search;}if(path==="/"){return"/"+search;}if(path.charAt(path.length-1)==="/"){return path.slice(0,-1)+search;}return path+search;});
// EXTERNAL MODULE: ./.cache/redirect-utils.js + 1 modules
var redirect_utils = __webpack_require__(5180);
;// CONCATENATED MODULE: ./.cache/find-path.js
const pathCache=new Map();let matchPaths=[];const trimPathname=rawPathname=>{let newRawPathname=rawPathname;const queryIndex=rawPathname.indexOf("?");if(queryIndex!==-1){const[path,qs]=rawPathname.split("?");newRawPathname=path+"?"+encodeURIComponent(qs);}const pathname=decodeURIComponent(newRawPathname);// Remove the pathPrefix from the pathname.
const trimmedPathname=(0,strip_prefix/* default */.A)(pathname,decodeURIComponent(""))// Remove any hashfragment
.split("#")[0];return trimmedPathname;};function absolutify(path){// If it's already absolute, return as-is
if(path.startsWith("/")||path.startsWith("https://")||path.startsWith("http://")){return path;}// Calculate path relative to current location, adding a trailing slash to
// match behavior of @reach/router
return new URL(path,window.location.href+(window.location.href.endsWith("/")?"":"/")).pathname;}/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */const setMatchPaths=value=>{matchPaths=value;};/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */const findMatchPath=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(_ref=>{let{path,matchPath}=_ref;return{path:matchPath,originalPath:path};});const path=(0,index_modern.pick)(pickPaths,trimmedPathname);if(path){return normalize_page_path(path.route.originalPath);}return null;};/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */const grabMatchParams=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(_ref2=>{let{path,matchPath}=_ref2;return{path:matchPath,originalPath:path};});const path=(0,index_modern.pick)(pickPaths,trimmedPathname);if(path){return path.params;}return{};};// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));if(pathCache.has(trimmedPathname)){return pathCache.get(trimmedPathname);}const redirect=(0,redirect_utils/* maybeGetBrowserRedirect */.X)(rawPathname);if(redirect){return findPath(redirect.toPath);}let foundPath=findMatchPath(trimmedPathname);if(!foundPath){foundPath=cleanPath(rawPathname);}pathCache.set(trimmedPathname,foundPath);return foundPath;};/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */const cleanPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));let foundPath=trimmedPathname;if(foundPath==="/index.html"){foundPath="/";}foundPath=normalize_page_path(foundPath);return foundPath;};

/***/ }),

/***/ 44165:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  N_: function() { return /* reexport */ index_modern/* Link */.N_; },
  G: function() { return /* reexport */ static_query/* StaticQueryContext */.G; },
  oo: function() { return /* reexport */ index_modern/* navigate */.oo; },
  GR: function() { return /* reexport */ static_query/* useStaticQuery */.GR; }
});

// UNUSED EXPORTS: PageRenderer, Script, ScriptStrategy, Slice, StaticQuery, collectedScriptsByPage, graphql, parsePath, prefetchPathname, scriptCache, scriptCallbackCache, useScrollRestoration, withAssetPrefix, withPrefix

// EXTERNAL MODULE: ./.cache/loader.js + 1 modules
var loader = __webpack_require__(7587);
// EXTERNAL MODULE: ./.cache/public-page-renderer.js
var public_page_renderer = __webpack_require__(41641);
// EXTERNAL MODULE: ../../node_modules/.pnpm/gatsby-react-router-scroll@6.13.1_@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__m7skaa2zobcfqallz5aeytkc5m/node_modules/gatsby-react-router-scroll/index.js
var gatsby_react_router_scroll = __webpack_require__(58567);
// EXTERNAL MODULE: ../../node_modules/.pnpm/gatsby-link@5.13.1_@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__react@18.2.0___isvwdqwgnuc4uklm3j4swxtgfm/node_modules/gatsby-link/dist/index.modern.mjs
var index_modern = __webpack_require__(3977);
// EXTERNAL MODULE: ./.cache/static-query.js + 1 modules
var static_query = __webpack_require__(52933);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
// EXTERNAL MODULE: ./.cache/create-content-digest-browser-shim.js
var create_content_digest_browser_shim = __webpack_require__(50208);
// EXTERNAL MODULE: ./.cache/slice/context.js
var context = __webpack_require__(9564);
;// CONCATENATED MODULE: ./.cache/slice/server-slice-renderer.js
const server_slice_renderer_ServerSliceRenderer=_ref=>{let{sliceId,children}=_ref;const contents=[/*#__PURE__*/React.createElement("slice-start",{id:sliceId+"-1"}),/*#__PURE__*/React.createElement("slice-end",{id:sliceId+"-1"})];if(children){// if children exist, we split the slice into a before and after piece
// see renderSlices in render-html
contents.push(children);contents.push(/*#__PURE__*/React.createElement("slice-start",{id:sliceId+"-2"}),/*#__PURE__*/React.createElement("slice-end",{id:sliceId+"-2"}));}return contents;};
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(63159);
;// CONCATENATED MODULE: ./.cache/slice/server-slice.js
const getSliceId=(sliceName,sliceProps)=>{if(!Object.keys(sliceProps).length){return sliceName;}const propsString=createContentDigest(sliceProps);return sliceName+"-"+propsString;};const server_slice_ServerSlice=_ref=>{let{sliceName,allowEmpty,children,...sliceProps}=_ref;const slicesMap=useContext(SlicesMapContext);const slicesProps=useContext(SlicesPropsContext);const concreteSliceName=slicesMap[sliceName];if(!concreteSliceName){if(allowEmpty){return null;}else{throw new Error("Slice \""+concreteSliceName+"\" for \""+sliceName+"\" slot not found");}}const sliceId=getSliceId(concreteSliceName,sliceProps);// set props on context object for static-entry to return
let sliceUsage=slicesProps[sliceId];if(!sliceUsage){slicesProps[sliceId]=sliceUsage={props:sliceProps,sliceName:concreteSliceName,hasChildren:!!children};}else{if(children){sliceUsage.hasChildren=true;}}return/*#__PURE__*/_jsx(ServerSliceRenderer,{sliceId:sliceId,children:children});};
;// CONCATENATED MODULE: ./.cache/slice/inline-slice.js
const inline_slice_InlineSlice=_ref=>{let{sliceName,allowEmpty,children,...sliceProps}=_ref;const slicesMap=useContext(SlicesMapContext);const slicesResultsMap=useContext(SlicesResultsContext);const concreteSliceName=slicesMap[sliceName];const slice=slicesResultsMap.get(concreteSliceName);if(!slice){if(allowEmpty){return null;}else{throw new Error("Slice \""+concreteSliceName+"\" for \""+sliceName+"\" slot not found");}}return/*#__PURE__*/_jsx(slice.component,{sliceContext:slice.sliceContext,data:slice.data,...sliceProps,children:children});};
;// CONCATENATED MODULE: ./.cache/slice.js
"use client";function Slice(props){if(true){// we use sliceName internally, so remap alias to sliceName
const internalProps={...props,sliceName:props.alias};delete internalProps.alias;delete internalProps.__renderedByLocation;const slicesContext=useContext(SlicesContext);// validate props
const propErrors=validateSliceProps(props);if(Object.keys(propErrors).length){throw new SlicePropsError(slicesContext.renderEnvironment==="browser",internalProps.sliceName,propErrors,props.__renderedByLocation);}if(slicesContext.renderEnvironment==="server"){return/*#__PURE__*/_jsx(ServerSlice,{...internalProps});}else if(slicesContext.renderEnvironment==="browser"){// in the browser, we'll just render the component as is
return/*#__PURE__*/_jsx(InlineSlice,{...internalProps});}else if(slicesContext.renderEnvironment==="engines"||slicesContext.renderEnvironment==="dev-ssr"){// if we're in SSR, we'll just render the component as is
return/*#__PURE__*/_jsx(InlineSlice,{...internalProps});}else if(slicesContext.renderEnvironment==="slices"){// we are not yet supporting nested slices
let additionalContextMessage="";// just in case generating additional contextual information fails, we still want the base message to show
// and not show another cryptic error message
try{additionalContextMessage="\n\nSlice component \""+slicesContext.sliceRoot.name+"\" ("+slicesContext.sliceRoot.componentPath+") tried to render <Slice alias=\""+props.alias+"\"/>";}catch{// don't need to handle it, we will just skip the additional context message if we fail to generate it
}throw new Error("Nested slices are not supported."+additionalContextMessage+"\n\nSee https://gatsbyjs.com/docs/reference/built-in-components/gatsby-slice#nested-slices");}else{throw new Error("Slice context \""+slicesContext.renderEnvironment+"\" is not supported.");}}else{}}let SlicePropsError=/*#__PURE__*/(/* unused pure expression or super */ null && (function(_Error){function SlicePropsError(inBrowser,sliceName,propErrors,renderedByLocation){var _this;const errors=Object.entries(propErrors).map(_ref=>{let[key,value]=_ref;return"not serializable \""+value+"\" type passed to \""+key+"\" prop";}).join(", ");const name="SlicePropsError";let stack="";let message="";if(inBrowser){// They're just (kinda) kidding, I promise... You can still work here <3
//   https://www.gatsbyjs.com/careers/
const fullStack=React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getCurrentStack();// remove the first line of the stack trace
const stackLines=fullStack.trim().split("\n").slice(1);stackLines[0]=stackLines[0].trim();stack="\n"+stackLines.join("\n");message="Slice \""+sliceName+"\" was passed props that are not serializable ("+errors+").";}else{// we can't really grab any extra info outside of the browser, so just print what we can
message=name+": Slice \""+sliceName+"\" was passed props that are not serializable ("+errors+").";const stackLines=new Error().stack.trim().split("\n").slice(2);stack=message+"\n"+stackLines.join("\n");}_this=_Error.call(this,message)||this;_this.name=name;if(stack){_this.stack=stack;}else{Error.captureStackTrace(_this,SlicePropsError);}if(renderedByLocation){_this.forcedLocation={...renderedByLocation,functionName:"Slice"};}return _this;}_inheritsLoose(SlicePropsError,_Error);return SlicePropsError;}(/*#__PURE__*/_wrapNativeSuper(Error))));const validateSliceProps=function(props,errors,seenObjects,path){if(errors===void 0){errors={};}if(seenObjects===void 0){seenObjects=[];}if(path===void 0){path=null;}// recursively validate all props
for(const[name,value]of Object.entries(props)){if(value===undefined||value===null||!path&&name==="children"){continue;}const propPath=path?path+"."+name:name;if(typeof value==="function"){errors[propPath]=typeof value;}else if(typeof value==="object"&&seenObjects.indexOf(value)<=0){seenObjects.push(value);validateSliceProps(value,errors,seenObjects,propPath);}}return errors;};
;// CONCATENATED MODULE: ./.cache/gatsby-browser-entry.js
const prefetchPathname=loader/* default */.Ay.enqueue;function graphql(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls "+"are supposed to only be evaluated at compile time, and then compiled away. "+"Unfortunately, something went wrong and the query was left in the compiled code.\n\n"+"Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.");}

/***/ }),

/***/ 7587:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Wi: function() { return /* binding */ PageResourceStatus; },
  N5: function() { return /* binding */ ProdLoader; },
  Ay: function() { return /* binding */ loader; },
  Rh: function() { return /* binding */ getSliceResults; },
  LE: function() { return /* binding */ getStaticQueryResults; },
  Zf: function() { return /* binding */ publicLoader; },
  iC: function() { return /* binding */ setLoader; }
});

// UNUSED EXPORTS: BaseLoader

// EXTERNAL MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js + 1 modules
var inheritsLoose = __webpack_require__(32371);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(15553);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react-server-dom-webpack@0.0.0-experimental-c8b778b7f-20220825_react@18.2.0_webpack@5.91.0/node_modules/react-server-dom-webpack/index.js
var react_server_dom_webpack = __webpack_require__(40034);
;// CONCATENATED MODULE: ./.cache/prefetch.js
const support=function(feature){if(typeof document==="undefined"){return false;}const fakeLink=document.createElement("link");try{if(fakeLink.relList&&typeof fakeLink.relList.supports==="function"){return fakeLink.relList.supports(feature);}}catch(err){return false;}return false;};const linkPrefetchStrategy=function(url,options){return new Promise((resolve,reject)=>{if(typeof document==="undefined"){reject();return;}const link=document.createElement("link");link.setAttribute("rel","prefetch");link.setAttribute("href",url);Object.keys(options).forEach(key=>{link.setAttribute(key,options[key]);});link.onload=resolve;link.onerror=reject;const parentElement=document.getElementsByTagName("head")[0]||document.getElementsByName("script")[0].parentNode;parentElement.appendChild(link);});};const xhrPrefetchStrategy=function(url){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open("GET",url,true);req.onload=()=>{if(req.status===200){resolve();}else{reject();}};req.send(null);});};const supportedPrefetchStrategy=support("prefetch")?linkPrefetchStrategy:xhrPrefetchStrategy;const preFetched={};const prefetch=function(url,options){return new Promise(resolve=>{if(preFetched[url]){resolve();return;}supportedPrefetchStrategy(url,options).then(()=>{resolve();preFetched[url]=true;}).catch(()=>{});// 404s are logged to the console anyway
});};/* harmony default export */ var _cache_prefetch = (prefetch);
// EXTERNAL MODULE: ./.cache/emitter.js + 1 modules
var emitter = __webpack_require__(10011);
// EXTERNAL MODULE: ./.cache/find-path.js + 1 modules
var find_path = __webpack_require__(14819);
;// CONCATENATED MODULE: ./.cache/loader.js
/**
 * Available resource loading statuses
 */const PageResourceStatus={/**
   * At least one of critical resources failed to load
   */Error:"error",/**
   * Resources loaded successfully
   */Success:"success"};const preferDefault=m=>m&&m.default||m;const stripSurroundingSlashes=s=>{s=s[0]==="/"?s.slice(1):s;s=s.endsWith("/")?s.slice(0,-1):s;return s;};const createPageDataUrl=rawPath=>{const[path,maybeSearch]=rawPath.split("?");const fixedPath=path==="/"?"index":stripSurroundingSlashes(path);return ""+"/page-data/"+fixedPath+"/page-data.json"+(maybeSearch?"?"+maybeSearch:"");};/**
 * Utility to check the path that goes into doFetch for e.g. potential malicious intentions.
 * It checks for "//" because with this you could do a fetch request to a different domain.
 */const shouldAbortFetch=rawPath=>rawPath.startsWith("//");function doFetch(url,method){if(method===void 0){method="GET";}return new Promise(resolve=>{const req=new XMLHttpRequest();req.open(method,url,true);req.onreadystatechange=()=>{if(req.readyState==4){resolve(req);}};req.send(null);});}const doesConnectionSupportPrefetch=()=>{if("connection"in navigator&&typeof navigator.connection!=="undefined"){if((navigator.connection.effectiveType||"").includes("2g")){return false;}if(navigator.connection.saveData){return false;}}return true;};// Regex that matches common search crawlers
const BOT_REGEX=/bot|crawler|spider|crawling/i;const toPageResources=function(pageData,component,head){var _pageData$slicesMap;if(component===void 0){component=null;}const page={componentChunkName:pageData.componentChunkName,path:pageData.path,webpackCompilationHash:pageData.webpackCompilationHash,matchPath:pageData.matchPath,staticQueryHashes:pageData.staticQueryHashes,getServerDataError:pageData.getServerDataError,slicesMap:(_pageData$slicesMap=pageData.slicesMap)!==null&&_pageData$slicesMap!==void 0?_pageData$slicesMap:{}};return{component,head,json:pageData.result,page};};function waitForResponse(response){return new Promise(resolve=>{try{const result=response.readRoot();resolve(result);}catch(err){if(Object.hasOwnProperty.call(err,"_response")&&Object.hasOwnProperty.call(err,"_status")){setTimeout(()=>{waitForResponse(response).then(resolve);},200);}else{throw err;}}});}let BaseLoader=/*#__PURE__*/function(){function BaseLoader(loadComponent,matchPaths){this.inFlightNetworkRequests=new Map();// Map of pagePath -> Page. Where Page is an object with: {
//   status: PageResourceStatus.Success || PageResourceStatus.Error,
//   payload: PageResources, // undefined if PageResourceStatus.Error
// }
// PageResources is {
//   component,
//   json: pageData.result,
//   page: {
//     componentChunkName,
//     path,
//     webpackCompilationHash,
//     staticQueryHashes
//   },
//   staticQueryResults
// }
this.pageDb=new Map();this.inFlightDb=new Map();this.staticQueryDb={};this.pageDataDb=new Map();this.partialHydrationDb=new Map();this.slicesDataDb=new Map();this.sliceInflightDb=new Map();this.slicesDb=new Map();this.isPrefetchQueueRunning=false;this.prefetchQueued=[];this.prefetchTriggered=new Set();this.prefetchCompleted=new Set();this.loadComponent=loadComponent;(0,find_path/* setMatchPaths */.QX)(matchPaths);}var _proto=BaseLoader.prototype;_proto.memoizedGet=function memoizedGet(url){let inFlightPromise=this.inFlightNetworkRequests.get(url);if(!inFlightPromise){inFlightPromise=doFetch(url,"GET");this.inFlightNetworkRequests.set(url,inFlightPromise);}// Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
return inFlightPromise.then(response=>{this.inFlightNetworkRequests.delete(url);return response;}).catch(err=>{this.inFlightNetworkRequests.delete(url);throw err;});};_proto.setApiRunner=function setApiRunner(apiRunner){this.apiRunner=apiRunner;this.prefetchDisabled=apiRunner("disableCorePrefetching").some(a=>a);};_proto.fetchPageDataJson=function fetchPageDataJson(loadObj){const{pagePath,retries=0}=loadObj;const url=createPageDataUrl(pagePath);return this.memoizedGet(url).then(req=>{const{status,responseText}=req;// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.path===undefined){throw new Error("not a valid pageData response");}const maybeSearch=pagePath.split("?")[1];if(maybeSearch&&!jsonPayload.path.includes(maybeSearch)){jsonPayload.path+="?"+maybeSearch;}return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:jsonPayload});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404/500 page and it doesn't exist, we're done
if(pagePath==="/404.html"||pagePath==="/500.html"){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return this.fetchPageDataJson(Object.assign(loadObj,{pagePath:"/404.html",notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return this.fetchPageDataJson(Object.assign(loadObj,{pagePath:"/500.html",internalServerError:true}));}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return this.fetchPageDataJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});};_proto.fetchPartialHydrationJson=function fetchPartialHydrationJson(loadObj){const{pagePath,retries=0}=loadObj;const url=createPageDataUrl(pagePath).replace(".json","-rsc.json");return this.memoizedGet(url).then(req=>{const{status,responseText}=req;// Handle 200
if(status===200){try{return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:responseText});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404/500 page and it doesn't exist, we're done
if(pagePath==="/404.html"||pagePath==="/500.html"){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return this.fetchPartialHydrationJson(Object.assign(loadObj,{pagePath:"/404.html",notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return this.fetchPartialHydrationJson(Object.assign(loadObj,{pagePath:"/500.html",internalServerError:true}));}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return this.fetchPartialHydrationJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});};_proto.loadPageDataJson=function loadPageDataJson(rawPath){const pagePath=(0,find_path/* findPath */.Hh)(rawPath);if(this.pageDataDb.has(pagePath)){const pageData=this.pageDataDb.get(pagePath);if(true){return Promise.resolve(pageData);}}return this.fetchPageDataJson({pagePath}).then(pageData=>{this.pageDataDb.set(pagePath,pageData);return pageData;});};_proto.loadPartialHydrationJson=function loadPartialHydrationJson(rawPath){const pagePath=(0,find_path/* findPath */.Hh)(rawPath);if(this.partialHydrationDb.has(pagePath)){const pageData=this.partialHydrationDb.get(pagePath);if(true){return Promise.resolve(pageData);}}return this.fetchPartialHydrationJson({pagePath}).then(pageData=>{this.partialHydrationDb.set(pagePath,pageData);return pageData;});};_proto.loadSliceDataJson=function loadSliceDataJson(sliceName){if(this.slicesDataDb.has(sliceName)){const jsonPayload=this.slicesDataDb.get(sliceName);return Promise.resolve({sliceName,jsonPayload});}const url=""+"/slice-data/"+sliceName+".json";return doFetch(url,"GET").then(res=>{const jsonPayload=JSON.parse(res.responseText);this.slicesDataDb.set(sliceName,jsonPayload);return{sliceName,jsonPayload};});};_proto.findMatchPath=function findMatchPath(rawPath){return (0,find_path/* findMatchPath */.Yl)(rawPath);}// TODO check all uses of this and whether they use undefined for page resources not exist
;_proto.loadPage=function loadPage(rawPath){const pagePath=(0,find_path/* findPath */.Hh)(rawPath);if(this.pageDb.has(pagePath)){const page=this.pageDb.get(pagePath);if(true){if(page.error){return Promise.resolve({error:page.error,status:page.status});}return Promise.resolve(page.payload);}}if(this.inFlightDb.has(pagePath)){return this.inFlightDb.get(pagePath);}const loadDataPromises=[this.loadAppData(),this.loadPageDataJson(pagePath)];if(false){}const inFlightPromise=Promise.all(loadDataPromises).then(allData=>{const[appDataResponse,pageDataResponse,rscDataResponse]=allData;if(pageDataResponse.status===PageResourceStatus.Error||(rscDataResponse===null||rscDataResponse===void 0?void 0:rscDataResponse.status)===PageResourceStatus.Error){return{status:PageResourceStatus.Error};}let pageData=pageDataResponse.payload;const{componentChunkName,staticQueryHashes:pageStaticQueryHashes=[],slicesMap={}}=pageData;const finalResult={};const dedupedSliceNames=Array.from(new Set(Object.values(slicesMap)));const loadSlice=slice=>{if(this.slicesDb.has(slice.name)){return this.slicesDb.get(slice.name);}else if(this.sliceInflightDb.has(slice.name)){return this.sliceInflightDb.get(slice.name);}const inFlight=this.loadComponent(slice.componentChunkName).then(component=>{return{component:preferDefault(component),sliceContext:slice.result.sliceContext,data:slice.result.data};});this.sliceInflightDb.set(slice.name,inFlight);inFlight.then(results=>{this.slicesDb.set(slice.name,results);this.sliceInflightDb.delete(slice.name);});return inFlight;};return Promise.all(dedupedSliceNames.map(sliceName=>this.loadSliceDataJson(sliceName))).then(slicesData=>{const slices=[];const dedupedStaticQueryHashes=(0,toConsumableArray/* default */.A)(pageStaticQueryHashes);for(const{jsonPayload,sliceName}of Object.values(slicesData)){slices.push({name:sliceName,...jsonPayload});for(const staticQueryHash of jsonPayload.staticQueryHashes){if(!dedupedStaticQueryHashes.includes(staticQueryHash)){dedupedStaticQueryHashes.push(staticQueryHash);}}}const loadChunkPromises=[Promise.all(slices.map(loadSlice)),this.loadComponent(componentChunkName,"head")];if(true){loadChunkPromises.push(this.loadComponent(componentChunkName));}// In develop we have separate chunks for template and Head components
// to enable HMR (fast refresh requires single exports).
// In production we have shared chunk with both exports. Double loadComponent here
// will be deduped by webpack runtime resulting in single request and single module
// being loaded for both `component` and `head`.
// get list of components to get
const componentChunkPromises=Promise.all(loadChunkPromises).then(components=>{const[sliceComponents,headComponent,pageComponent]=components;finalResult.createdAt=new Date();for(const sliceComponent of sliceComponents){if(!sliceComponent||sliceComponent instanceof Error){finalResult.status=PageResourceStatus.Error;finalResult.error=sliceComponent;}}if( true&&(!pageComponent||pageComponent instanceof Error)){finalResult.status=PageResourceStatus.Error;finalResult.error=pageComponent;}let pageResources;if(finalResult.status!==PageResourceStatus.Error){finalResult.status=PageResourceStatus.Success;if(pageDataResponse.notFound===true||(rscDataResponse===null||rscDataResponse===void 0?void 0:rscDataResponse.notFound)===true){finalResult.notFound=true;}pageData=Object.assign(pageData,{webpackCompilationHash:appDataResponse?appDataResponse.webpackCompilationHash:""});if(typeof(rscDataResponse===null||rscDataResponse===void 0?void 0:rscDataResponse.payload)==="string"){pageResources=toPageResources(pageData,null,headComponent);pageResources.partialHydration=rscDataResponse.payload;const readableStream=new ReadableStream({start(controller){const te=new TextEncoder();controller.enqueue(te.encode(rscDataResponse.payload));},pull(controller){// close on next read when queue is empty
controller.close();},cancel(){}});return waitForResponse((0,react_server_dom_webpack.createFromReadableStream)(readableStream)).then(result=>{pageResources.partialHydration=result;return pageResources;});}else{pageResources=toPageResources(pageData,pageComponent,headComponent);}}// undefined if final result is an error
return pageResources;});// get list of static queries to get
const staticQueryBatchPromise=Promise.all(dedupedStaticQueryHashes.map(staticQueryHash=>{// Check for cache in case this static query result has already been loaded
if(this.staticQueryDb[staticQueryHash]){const jsonPayload=this.staticQueryDb[staticQueryHash];return{staticQueryHash,jsonPayload};}return this.memoizedGet(""+"/page-data/sq/d/"+staticQueryHash+".json").then(req=>{const jsonPayload=JSON.parse(req.responseText);return{staticQueryHash,jsonPayload};}).catch(()=>{throw new Error("We couldn't load \""+""+"/page-data/sq/d/"+staticQueryHash+".json\"");});})).then(staticQueryResults=>{const staticQueryResultsMap={};staticQueryResults.forEach(_ref=>{let{staticQueryHash,jsonPayload}=_ref;staticQueryResultsMap[staticQueryHash]=jsonPayload;this.staticQueryDb[staticQueryHash]=jsonPayload;});return staticQueryResultsMap;});return Promise.all([componentChunkPromises,staticQueryBatchPromise]).then(_ref2=>{let[pageResources,staticQueryResults]=_ref2;let payload;if(pageResources){payload={...pageResources,staticQueryResults};finalResult.payload=payload;emitter/* default */.A.emit("onPostLoadPageResources",{page:payload,pageResources:payload});}this.pageDb.set(pagePath,finalResult);if(finalResult.error){return{error:finalResult.error,status:finalResult.status};}return payload;})// when static-query fail to load we throw a better error
.catch(err=>{return{error:err,status:PageResourceStatus.Error};});});});inFlightPromise.then(()=>{this.inFlightDb.delete(pagePath);}).catch(error=>{this.inFlightDb.delete(pagePath);throw error;});this.inFlightDb.set(pagePath,inFlightPromise);return inFlightPromise;}// returns undefined if the page does not exists in cache
;_proto.loadPageSync=function loadPageSync(rawPath,options){if(options===void 0){options={};}const pagePath=(0,find_path/* findPath */.Hh)(rawPath);if(this.pageDb.has(pagePath)){var _options;const pageData=this.pageDb.get(pagePath);if(pageData.payload){return pageData.payload;}if((_options=options)!==null&&_options!==void 0&&_options.withErrorDetails){return{error:pageData.error,status:pageData.status};}}return undefined;};_proto.shouldPrefetch=function shouldPrefetch(pagePath){// Skip prefetching if we know user is on slow or constrained connection
if(!doesConnectionSupportPrefetch()){return false;}// Don't prefetch if this is a crawler bot
if(navigator.userAgent&&BOT_REGEX.test(navigator.userAgent)){return false;}// Check if the page exists.
if(this.pageDb.has(pagePath)){return false;}return true;};_proto.prefetch=function prefetch(pagePath){if(!this.shouldPrefetch(pagePath)){return{then:resolve=>resolve(false),abort:()=>{}};}if(this.prefetchTriggered.has(pagePath)){return{then:resolve=>resolve(true),abort:()=>{}};}const defer={resolve:null,reject:null,promise:null};defer.promise=new Promise((resolve,reject)=>{defer.resolve=resolve;defer.reject=reject;});this.prefetchQueued.push([pagePath,defer]);const abortC=new AbortController();abortC.signal.addEventListener("abort",()=>{const index=this.prefetchQueued.findIndex(_ref3=>{let[p]=_ref3;return p===pagePath;});// remove from the queue
if(index!==-1){this.prefetchQueued.splice(index,1);}});if(!this.isPrefetchQueueRunning){this.isPrefetchQueueRunning=true;setTimeout(()=>{this._processNextPrefetchBatch();},3000);}return{then:(resolve,reject)=>defer.promise.then(resolve,reject),abort:abortC.abort.bind(abortC)};};_proto._processNextPrefetchBatch=function _processNextPrefetchBatch(){const idleCallback=window.requestIdleCallback||(cb=>setTimeout(cb,0));idleCallback(()=>{const toPrefetch=this.prefetchQueued.splice(0,4);const prefetches=Promise.all(toPrefetch.map(_ref4=>{let[pagePath,dPromise]=_ref4;// Tell plugins with custom prefetching logic that they should start
// prefetching this path.
if(!this.prefetchTriggered.has(pagePath)){this.apiRunner("onPrefetchPathname",{pathname:pagePath});this.prefetchTriggered.add(pagePath);}// If a plugin has disabled core prefetching, stop now.
if(this.prefetchDisabled){return dPromise.resolve(false);}return this.doPrefetch((0,find_path/* findPath */.Hh)(pagePath)).then(()=>{if(!this.prefetchCompleted.has(pagePath)){this.apiRunner("onPostPrefetchPathname",{pathname:pagePath});this.prefetchCompleted.add(pagePath);}dPromise.resolve(true);});}));if(this.prefetchQueued.length){prefetches.then(()=>{setTimeout(()=>{this._processNextPrefetchBatch();},3000);});}else{this.isPrefetchQueueRunning=false;}});};_proto.doPrefetch=function doPrefetch(pagePath){const pageDataUrl=createPageDataUrl(pagePath);if(false){}else{return _cache_prefetch(pageDataUrl,{crossOrigin:"anonymous",as:"fetch"}).then(()=>// This was just prefetched, so will return a response from
// the cache instead of making another request to the server
this.loadPageDataJson(pagePath));}};_proto.hovering=function hovering(rawPath){this.loadPage(rawPath);};_proto.getResourceURLsForPathname=function getResourceURLsForPathname(rawPath){const pagePath=(0,find_path/* findPath */.Hh)(rawPath);const page=this.pageDataDb.get(pagePath);if(page){const pageResources=toPageResources(page.payload);return[].concat((0,toConsumableArray/* default */.A)(createComponentUrls(pageResources.page.componentChunkName)),[createPageDataUrl(pagePath)]);}else{return null;}};_proto.isPageNotFound=function isPageNotFound(rawPath){const pagePath=(0,find_path/* findPath */.Hh)(rawPath);const page=this.pageDb.get(pagePath);return!page||page.notFound;};_proto.loadAppData=function loadAppData(retries){if(retries===void 0){retries=0;}return this.memoizedGet(""+"/page-data/app-data.json").then(req=>{const{status,responseText}=req;let appData;if(status!==200&&retries<3){// Retry 3 times incase of non-200 responses
return this.loadAppData(retries+1);}// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.webpackCompilationHash===undefined){throw new Error("not a valid app-data response");}appData=jsonPayload;}catch(err){// continue regardless of error
}}return appData;});};return BaseLoader;}();const createComponentUrls=componentChunkName=>(window.___chunkMapping[componentChunkName]||[]).map(chunk=>""+chunk);let ProdLoader=/*#__PURE__*/function(_BaseLoader2){function ProdLoader(asyncRequires,matchPaths,pageData){var _this;const loadComponent=function(chunkName,exportType){if(exportType===void 0){exportType="components";}if(true){exportType="components";}if(!asyncRequires[exportType][chunkName]){throw new Error("We couldn't find the correct component chunk with the name \""+chunkName+"\"");}return asyncRequires[exportType][chunkName]()// loader will handle the case when component is error
.catch(err=>err);};_this=_BaseLoader2.call(this,loadComponent,matchPaths)||this;if(pageData){_this.pageDataDb.set((0,find_path/* findPath */.Hh)(pageData.path),{pagePath:pageData.path,payload:pageData,status:"success"});}return _this;}(0,inheritsLoose/* default */.A)(ProdLoader,_BaseLoader2);var _proto2=ProdLoader.prototype;_proto2.doPrefetch=function doPrefetch(pagePath){return _BaseLoader2.prototype.doPrefetch.call(this,pagePath).then(result=>{if(result.status!==PageResourceStatus.Success){return Promise.resolve();}const pageData=result.payload;const chunkName=pageData.componentChunkName;const componentUrls=createComponentUrls(chunkName);return Promise.all(componentUrls.map(_cache_prefetch)).then(()=>pageData);});};_proto2.loadPageDataJson=function loadPageDataJson(rawPath){return _BaseLoader2.prototype.loadPageDataJson.call(this,rawPath).then(data=>{if(data.notFound){if(shouldAbortFetch(rawPath)){return data;}// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,"HEAD").then(req=>{if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});};_proto2.loadPartialHydrationJson=function loadPartialHydrationJson(rawPath){return _BaseLoader2.prototype.loadPartialHydrationJson.call(this,rawPath).then(data=>{if(data.notFound){if(shouldAbortFetch(rawPath)){return data;}// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,"HEAD").then(req=>{if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});};return ProdLoader;}(BaseLoader);let instance;const setLoader=_loader=>{instance=_loader;};const publicLoader={enqueue:rawPath=>instance.prefetch(rawPath),// Real methods
getResourceURLsForPathname:rawPath=>instance.getResourceURLsForPathname(rawPath),loadPage:rawPath=>instance.loadPage(rawPath),// TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
loadPageSync:function(rawPath,options){if(options===void 0){options={};}return instance.loadPageSync(rawPath,options);},prefetch:rawPath=>instance.prefetch(rawPath),isPageNotFound:rawPath=>instance.isPageNotFound(rawPath),hovering:rawPath=>instance.hovering(rawPath),loadAppData:()=>instance.loadAppData()};/* harmony default export */ var loader = (publicLoader);function getStaticQueryResults(){if(instance){return instance.staticQueryDb;}else{return{};}}function getSliceResults(){if(instance){return instance.slicesDb;}else{return{};}}

/***/ }),

/***/ 55645:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ page_renderer; }
});

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
// EXTERNAL MODULE: ../../node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js
var prop_types = __webpack_require__(5821);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./.cache/api-runner-browser.js
var api_runner_browser = __webpack_require__(46840);
// EXTERNAL MODULE: ./.cache/find-path.js + 1 modules
var find_path = __webpack_require__(14819);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(15553);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(44165);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs
var index_modern = __webpack_require__(98855);
// EXTERNAL MODULE: ./.cache/react-dom-utils.js
var react_dom_utils = __webpack_require__(58280);
;// CONCATENATED MODULE: ./.cache/head/components/fire-callback-in-effect.js
/*
 * Calls callback in an effect and renders children
 */function FireCallbackInEffect(_ref){let{children,callback}=_ref;(0,react.useEffect)(()=>{callback();});return children;}
;// CONCATENATED MODULE: ./.cache/head/constants.js
const constants_VALID_NODE_NAMES=["link","meta","style","title","base","noscript","script","html","body"];
;// CONCATENATED MODULE: ./.cache/head/utils.js
/**
 * Filter the props coming from a page down to just the ones that are relevant for head.
 * This e.g. filters out properties that are undefined during SSR.
 */function filterHeadProps(input){return{location:{pathname:input.location.pathname},params:input.params,data:input.data||{},serverData:input.serverData,pageContext:input.pageContext};}/**
 * Throw error if Head export is not a valid function
 */function headExportValidator(head){if(typeof head!=="function")throw new Error("Expected \"Head\" export to be a function got \""+typeof head+"\".");}/**
 * Warn once for same messsage
 */let warnOnce=_=>{};if(false){}/**
 * Warn for invalid tags in Head which may have been directly added or introduced by `wrapRootElement`
 * @param {string} tagName
 */function warnForInvalidTag(tagName){if(false){}}function createWarningForInvalidTag(tagName){return"<"+tagName+"> is not a valid head element. Please use one of the following: "+VALID_NODE_NAMES.join(", ")+".\n\nAlso make sure that wrapRootElement in gatsby-ssr/gatsby-browser doesn't contain UI elements: https://gatsby.dev/invalid-head-elements";}/**
 * When a `nonce` is present on an element, browsers such as Chrome and Firefox strip it out of the
 * actual HTML attributes for security reasons *when the element is added to the document*. Thus,
 * given two equivalent elements that have nonces, `Element,isEqualNode()` will return false if one
 * of those elements gets added to the document. Although the `element.nonce` property will be the
 * same for both elements, the one that was added to the document will return an empty string for
 * its nonce HTML attribute value.
 *
 * This custom `isEqualNode()` function therefore removes the nonce value from the `newTag` before
 * comparing it to `oldTag`, restoring it afterwards.
 *
 * For more information, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1211471#c12
 */function isEqualNode(oldTag,newTag){if(oldTag instanceof HTMLElement&&newTag instanceof HTMLElement){const nonce=newTag.getAttribute("nonce");// Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
// be stripped if there is no content security policy response header that includes a nonce.
if(nonce&&!oldTag.getAttribute("nonce")){const cloneTag=newTag.cloneNode(true);cloneTag.setAttribute("nonce","");cloneTag.nonce=nonce;return nonce===oldTag.nonce&&oldTag.isEqualNode(cloneTag);}}return oldTag.isEqualNode(newTag);}function diffNodes(_ref){let{oldNodes,newNodes,onStale,onNew}=_ref;for(const existingHeadElement of oldNodes){const indexInNewNodes=newNodes.findIndex(e=>isEqualNode(e,existingHeadElement));if(indexInNewNodes===-1){onStale(existingHeadElement);}else{// this node is re-created as-is, so we keep old node, and remove it from list of new nodes (as we handled it already here)
newNodes.splice(indexInNewNodes,1);}}// remaing new nodes didn't have matching old node, so need to be added
for(const newNode of newNodes){onNew(newNode);}}function getValidHeadNodesAndAttributes(rootNode,htmlAndBodyAttributes){if(htmlAndBodyAttributes===void 0){htmlAndBodyAttributes={html:{},body:{}};}const seenIds=new Map();const validHeadNodes=[];// Filter out non-element nodes before looping since we don't care about them
for(const node of rootNode.childNodes){var _node$attributes,_node$attributes$id;const nodeName=node.nodeName.toLowerCase();const id=(_node$attributes=node.attributes)===null||_node$attributes===void 0?void 0:(_node$attributes$id=_node$attributes.id)===null||_node$attributes$id===void 0?void 0:_node$attributes$id.value;if(!isElementType(node))continue;if(isValidNodeName(nodeName)){// <html> and <body> tags are treated differently, in that we don't render them, we only extract the attributes and apply them separetely
if(nodeName==="html"||nodeName==="body"){for(const attribute of node.attributes){const isStyleAttribute=attribute.name==="style";// Merge attributes for same nodeName from previous loop iteration
htmlAndBodyAttributes[nodeName]={...htmlAndBodyAttributes[nodeName]};if(!isStyleAttribute){htmlAndBodyAttributes[nodeName][attribute.name]=attribute.value;}// If there is already a style attribute, we need to merge them as otherwise the last one will "win"
if(isStyleAttribute){var _htmlAndBodyAttribute;htmlAndBodyAttributes[nodeName].style=""+((_htmlAndBodyAttribute=htmlAndBodyAttributes[nodeName])!==null&&_htmlAndBodyAttribute!==void 0&&_htmlAndBodyAttribute.style?htmlAndBodyAttributes[nodeName].style:"")+attribute.value+" ";}}}else{let clonedNode=node.cloneNode(true);clonedNode.setAttribute("data-gatsby-head",true);// // This is hack to make script tags work
if(clonedNode.nodeName.toLowerCase()==="script"){clonedNode=massageScript(clonedNode);}// Duplicate ids are not allowed in the head, so we need to dedupe them
if(id){if(!seenIds.has(id)){validHeadNodes.push(clonedNode);seenIds.set(id,validHeadNodes.length-1);}else{var _validHeadNodes$index;const indexOfPreviouslyInsertedNode=seenIds.get(id);(_validHeadNodes$index=validHeadNodes[indexOfPreviouslyInsertedNode].parentNode)===null||_validHeadNodes$index===void 0?void 0:_validHeadNodes$index.removeChild(validHeadNodes[indexOfPreviouslyInsertedNode]);validHeadNodes[indexOfPreviouslyInsertedNode]=clonedNode;}}else{validHeadNodes.push(clonedNode);}}}else{warnForInvalidTag(nodeName);}if(node.childNodes.length){validHeadNodes.push.apply(validHeadNodes,(0,toConsumableArray/* default */.A)(getValidHeadNodesAndAttributes(node,htmlAndBodyAttributes).validHeadNodes));}}return{validHeadNodes,htmlAndBodyAttributes};}function massageScript(node){const script=document.createElement("script");for(const attr of node.attributes){script.setAttribute(attr.name,attr.value);}script.innerHTML=node.innerHTML;return script;}function isValidNodeName(nodeName){return constants_VALID_NODE_NAMES.includes(nodeName);}/*
 * For Head, we only care about element nodes(type = 1), so this util is used to skip over non-element nodes
 * For Node type, see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
 */function isElementType(node){return node.nodeType===1;}/**
 * Removes all the head elements that were added by `Head`
 */function removePrevHeadElements(){const prevHeadNodes=document.querySelectorAll("[data-gatsby-head]");for(const node of prevHeadNodes){node.parentNode.removeChild(node);}}function applyHtmlAndBodyAttributes(htmlAndBodyAttributes){if(!htmlAndBodyAttributes)return;const{html,body}=htmlAndBodyAttributes;const htmlElement=document.querySelector("html");if(htmlElement){Object.entries(html).forEach(_ref2=>{let[attributeName,attributeValue]=_ref2;htmlElement.setAttribute(attributeName,attributeValue);});}const bodyElement=document.querySelector("body");if(bodyElement){Object.entries(body).forEach(_ref3=>{let[attributeName,attributeValue]=_ref3;bodyElement.setAttribute(attributeName,attributeValue);});}}function removeHtmlAndBodyAttributes(htmlAndBodyattributeList){if(!htmlAndBodyattributeList)return;const{html,body}=htmlAndBodyattributeList;if(html){const htmlElement=document.querySelector("html");html.forEach(attributeName=>{if(htmlElement){htmlElement.removeAttribute(attributeName);}});}if(body){const bodyElement=document.querySelector("body");body.forEach(attributeName=>{if(bodyElement){bodyElement.removeAttribute(attributeName);}});}}
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(63159);
;// CONCATENATED MODULE: ./.cache/head/head-export-handler-for-browser.js
const hiddenRoot=document.createElement("div");const keysOfHtmlAndBodyAttributes={html:[],body:[]};const onHeadRendered=()=>{var _document$head2;const{validHeadNodes,htmlAndBodyAttributes}=getValidHeadNodesAndAttributes(hiddenRoot);keysOfHtmlAndBodyAttributes.html=Object.keys(htmlAndBodyAttributes.html);keysOfHtmlAndBodyAttributes.body=Object.keys(htmlAndBodyAttributes.body);applyHtmlAndBodyAttributes(htmlAndBodyAttributes);/**
   * The rest of the code block below is a diffing mechanism to ensure that
   * the head elements aren't duplicted on every re-render.
   */const existingHeadElements=document.querySelectorAll("[data-gatsby-head]");if(existingHeadElements.length===0){var _document$head;(_document$head=document.head).append.apply(_document$head,(0,toConsumableArray/* default */.A)(validHeadNodes));return;}const newHeadNodes=[];diffNodes({oldNodes:existingHeadElements,newNodes:validHeadNodes,onStale:node=>node.parentNode.removeChild(node),onNew:node=>newHeadNodes.push(node)});(_document$head2=document.head).append.apply(_document$head2,newHeadNodes);};if(false){}function headHandlerForBrowser(_ref){let{pageComponent,staticQueryResults,pageComponentProps}=_ref;(0,react.useEffect)(()=>{if(pageComponent!==null&&pageComponent!==void 0&&pageComponent.Head){headExportValidator(pageComponent.Head);const{render}=(0,react_dom_utils/* reactDOMUtils */.n)();const HeadElement=/*#__PURE__*/(0,jsx_runtime.jsx)(pageComponent.Head,{...filterHeadProps(pageComponentProps)});const WrapHeadElement=(0,api_runner_browser/* apiRunner */.N)("wrapRootElement",{element:HeadElement},HeadElement,_ref2=>{let{result}=_ref2;return{element:result};}).pop();render(/*#__PURE__*/ // just a hack to call the callback after react has done first render
// Note: In dev, we call onHeadRendered twice( in FireCallbackInEffect and after mutualution observer dectects initail render into hiddenRoot) this is for hot reloading
// In Prod we only call onHeadRendered in FireCallbackInEffect to render to head
(0,jsx_runtime.jsx)(FireCallbackInEffect,{callback:onHeadRendered,children:/*#__PURE__*/(0,jsx_runtime.jsx)(gatsby_browser_entry/* StaticQueryContext */.G.Provider,{value:staticQueryResults,children:/*#__PURE__*/(0,jsx_runtime.jsx)(index_modern.LocationProvider,{children:WrapHeadElement})})}),hiddenRoot);}return()=>{removePrevHeadElements();removeHtmlAndBodyAttributes(keysOfHtmlAndBodyAttributes);};});}
;// CONCATENATED MODULE: ./.cache/page-renderer.js
// Renders page
function PageRenderer(props){const pageComponentProps={...props,params:{...(0,find_path/* grabMatchParams */.UA)(props.location.pathname),...props.pageResources.json.pageContext.__params}};const preferDefault=m=>m&&m.default||m;let pageElement;if(props.pageResources.partialHydration){pageElement=props.pageResources.partialHydration;}else{pageElement=/*#__PURE__*/(0,react.createElement)(preferDefault(props.pageResources.component),{...pageComponentProps,key:props.path||props.pageResources.page.path});}const pageComponent=props.pageResources.head;headHandlerForBrowser({pageComponent,staticQueryResults:props.pageResources.staticQueryResults,pageComponentProps});const wrappedPage=(0,api_runner_browser/* apiRunner */.N)("wrapPageElement",{element:pageElement,props:pageComponentProps},pageElement,_ref=>{let{result}=_ref;return{element:result,props:pageComponentProps};}).pop();return wrappedPage;}PageRenderer.propTypes={location:(prop_types_default()).object.isRequired,pageResources:(prop_types_default()).object.isRequired,data:(prop_types_default()).object,pageContext:(prop_types_default()).object.isRequired};/* harmony default export */ var page_renderer = (PageRenderer);

/***/ }),

/***/ 82894:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js + 1 modules
var inheritsLoose = __webpack_require__(32371);
// EXTERNAL MODULE: ./.cache/api-runner-browser.js
var api_runner_browser = __webpack_require__(46840);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs
var index_modern = __webpack_require__(98855);
// EXTERNAL MODULE: ../../node_modules/.pnpm/gatsby-react-router-scroll@6.13.1_@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__m7skaa2zobcfqallz5aeytkc5m/node_modules/gatsby-react-router-scroll/index.js
var gatsby_react_router_scroll = __webpack_require__(58567);
// EXTERNAL MODULE: ./.cache/static-query.js + 1 modules
var static_query = __webpack_require__(52933);
// EXTERNAL MODULE: ./.cache/slice/context.js
var context = __webpack_require__(9564);
// EXTERNAL MODULE: ./.cache/loader.js + 1 modules
var loader = __webpack_require__(7587);
// EXTERNAL MODULE: ./.cache/redirect-utils.js + 1 modules
var redirect_utils = __webpack_require__(5180);
// EXTERNAL MODULE: ./.cache/emitter.js + 1 modules
var emitter = __webpack_require__(10011);
;// CONCATENATED MODULE: ./.cache/route-announcer-props.js
// This is extracted to separate module because it's shared
// between browser and SSR code
const RouteAnnouncerProps={id:"gatsby-announcer",style:{position:"absolute",top:0,width:1,height:1,padding:0,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",border:0},"aria-live":"assertive","aria-atomic":"true"};
// EXTERNAL MODULE: ../../node_modules/.pnpm/gatsby-link@5.13.1_@gatsbyjs+reach-router@2.0.1_react-dom@18.2.0_react@18.2.0__react@18.2.0___isvwdqwgnuc4uklm3j4swxtgfm/node_modules/gatsby-link/dist/index.modern.mjs
var dist_index_modern = __webpack_require__(3977);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(63159);
;// CONCATENATED MODULE: ./.cache/navigation.js
function maybeRedirect(pathname){const redirect=(0,redirect_utils/* maybeGetBrowserRedirect */.X)(pathname);const{hash,search}=window.location;if(redirect!=null){window.___replace(redirect.toPath+search+hash);return true;}else{return false;}}// Catch unhandled chunk loading errors and force a restart of the app.
let nextRoute="";window.addEventListener("unhandledrejection",event=>{if(/loading chunk \d* failed./i.test(event.reason)){if(nextRoute){window.location.pathname=nextRoute;}}});const onPreRouteUpdate=(location,prevLocation)=>{if(!maybeRedirect(location.pathname)){nextRoute=location.pathname;(0,api_runner_browser/* apiRunner */.N)("onPreRouteUpdate",{location,prevLocation});}};const onRouteUpdate=(location,prevLocation)=>{if(!maybeRedirect(location.pathname)){(0,api_runner_browser/* apiRunner */.N)("onRouteUpdate",{location,prevLocation});if(false){}}};const navigation_navigate=function(to,options){if(options===void 0){options={};}// Support forward/backward navigation with numbers
// navigate(-2) (jumps back 2 history steps)
// navigate(2)  (jumps forward 2 history steps)
if(typeof to==="number"){index_modern.globalHistory.navigate(to);return;}const{pathname,search,hash}=(0,dist_index_modern/* parsePath */.Rr)(to);const redirect=(0,redirect_utils/* maybeGetBrowserRedirect */.X)(pathname);// If we're redirecting, just replace the passed in pathname
// to the one we want to redirect to.
if(redirect){to=redirect.toPath+search+hash;}// If we had a service worker update, no matter the path, reload window and
// reset the pathname whitelist
if(window.___swUpdated){window.location=pathname+search+hash;return;}// Start a timer to wait for a second before transitioning and showing a
// loader in case resources aren't around yet.
const timeoutId=setTimeout(()=>{emitter/* default */.A.emit("onDelayedLoadPageResources",{pathname});(0,api_runner_browser/* apiRunner */.N)("onRouteUpdateDelayed",{location:window.location});},1000);loader/* default */.Ay.loadPage(pathname+search).then(pageResources=>{// If no page resources, then refresh the page
// Do this, rather than simply `window.location.reload()`, so that
// pressing the back/forward buttons work - otherwise when pressing
// back, the browser will just change the URL and expect JS to handle
// the change, which won't always work since it might not be a Gatsby
// page.
if(!pageResources||pageResources.status===loader/* PageResourceStatus */.Wi.Error){window.history.replaceState({},"",location.href);window.location=pathname;clearTimeout(timeoutId);return;}// If the loaded page has a different compilation hash to the
// window, then a rebuild has occurred on the server. Reload.
if( true&&pageResources){if(pageResources.page.webpackCompilationHash!==window.___webpackCompilationHash){// Purge plugin-offline cache
if("serviceWorker"in navigator&&navigator.serviceWorker.controller!==null&&navigator.serviceWorker.controller.state==="activated"){navigator.serviceWorker.controller.postMessage({gatsbyApi:"clearPathResources"});}window.location=pathname+search+hash;}}(0,index_modern.navigate)(to,options);clearTimeout(timeoutId);});};function shouldUpdateScroll(prevRouterProps,_ref){let{location}=_ref;const{pathname,hash}=location;const results=(0,api_runner_browser/* apiRunner */.N)("shouldUpdateScroll",{prevRouterProps,// `pathname` for backwards compatibility
pathname,routerProps:{location},getSavedScrollPosition:args=>[0,// FIXME this is actually a big code smell, we should fix this
// eslint-disable-next-line @babel/no-invalid-this
this._stateStorage.read(args,args.key)]});if(results.length>0){// Use the latest registered shouldUpdateScroll result, this allows users to override plugin's configuration
// @see https://github.com/gatsbyjs/gatsby/issues/12038
return results[results.length-1];}if(prevRouterProps){const{location:{pathname:oldPathname}}=prevRouterProps;if(oldPathname===pathname){// Scroll to element if it exists, if it doesn't, or no hash is provided,
// scroll to top.
return hash?decodeURI(hash.slice(1)):[0,0];}}return true;}function init(){// The "scroll-behavior" package expects the "action" to be on the location
// object so let's copy it over.
index_modern.globalHistory.listen(args=>{args.location.action=args.action;});window.___push=to=>navigation_navigate(to,{replace:false});window.___replace=to=>navigation_navigate(to,{replace:true});window.___navigate=(to,options)=>navigation_navigate(to,options);}let RouteAnnouncer=/*#__PURE__*/function(_React$Component){function RouteAnnouncer(props){var _this;_this=_React$Component.call(this,props)||this;_this.announcementRef=/*#__PURE__*/react.createRef();return _this;}(0,inheritsLoose/* default */.A)(RouteAnnouncer,_React$Component);var _proto=RouteAnnouncer.prototype;_proto.componentDidUpdate=function componentDidUpdate(prevProps,nextProps){requestAnimationFrame(()=>{let pageName="new page at "+this.props.location.pathname;if(document.title){pageName=document.title;}const pageHeadings=document.querySelectorAll("#gatsby-focus-wrapper h1");if(pageHeadings&&pageHeadings.length){pageName=pageHeadings[0].textContent;}const newAnnouncement="Navigated to "+pageName;if(this.announcementRef.current){const oldAnnouncement=this.announcementRef.current.innerText;if(oldAnnouncement!==newAnnouncement){this.announcementRef.current.innerText=newAnnouncement;}}});};_proto.render=function render(){return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{...RouteAnnouncerProps,ref:this.announcementRef});};return RouteAnnouncer;}(react.Component);const compareLocationProps=(prevLocation,nextLocation)=>{var _prevLocation$state,_nextLocation$state;if(prevLocation.href!==nextLocation.href){return true;}if((prevLocation===null||prevLocation===void 0?void 0:(_prevLocation$state=prevLocation.state)===null||_prevLocation$state===void 0?void 0:_prevLocation$state.key)!==(nextLocation===null||nextLocation===void 0?void 0:(_nextLocation$state=nextLocation.state)===null||_nextLocation$state===void 0?void 0:_nextLocation$state.key)){return true;}return false;};// Fire on(Pre)RouteUpdate APIs
let RouteUpdates=/*#__PURE__*/function(_React$Component2){function RouteUpdates(props){var _this2;_this2=_React$Component2.call(this,props)||this;onPreRouteUpdate(props.location,null);return _this2;}(0,inheritsLoose/* default */.A)(RouteUpdates,_React$Component2);var _proto2=RouteUpdates.prototype;_proto2.componentDidMount=function componentDidMount(){onRouteUpdate(this.props.location,null);};_proto2.shouldComponentUpdate=function shouldComponentUpdate(nextProps){if(compareLocationProps(this.props.location,nextProps.location)){onPreRouteUpdate(nextProps.location,this.props.location);return true;}return false;};_proto2.componentDidUpdate=function componentDidUpdate(prevProps){if(compareLocationProps(prevProps.location,this.props.location)){onRouteUpdate(this.props.location,prevProps.location);}};_proto2.render=function render(){return/*#__PURE__*/(0,jsx_runtime.jsxs)(react.Fragment,{children:[this.props.children,/*#__PURE__*/(0,jsx_runtime.jsx)(RouteAnnouncer,{location:location})]});};return RouteUpdates;}(react.Component);
// EXTERNAL MODULE: ./.cache/page-renderer.js + 4 modules
var page_renderer = __webpack_require__(55645);
// EXTERNAL MODULE: ./.cache/_this_is_virtual_fs_path_/$virtual/async-requires.js
var async_requires = __webpack_require__(47369);
;// CONCATENATED MODULE: ../../node_modules/.pnpm/shallow-compare@1.2.2/node_modules/shallow-compare/es/index.js
// Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
function shallowDiffers(a, b) {
  for (var i in a) {
    if (!(i in b)) return true;
  }for (var _i in b) {
    if (a[_i] !== b[_i]) return true;
  }return false;
}

/* harmony default export */ var es = (function (instance, nextProps, nextState) {
  return shallowDiffers(instance.props, nextProps) || shallowDiffers(instance.state, nextState);
});
;// CONCATENATED MODULE: ./.cache/ensure-resources.js
let EnsureResources=/*#__PURE__*/function(_React$Component){function EnsureResources(props){var _this;_this=_React$Component.call(this)||this;const{location,pageResources}=props;_this.state={location:{...location},pageResources:pageResources||loader/* default */.Ay.loadPageSync(location.pathname+location.search,{withErrorDetails:true})};return _this;}(0,inheritsLoose/* default */.A)(EnsureResources,_React$Component);EnsureResources.getDerivedStateFromProps=function getDerivedStateFromProps(_ref,prevState){let{location}=_ref;if(prevState.location.href!==location.href){const pageResources=loader/* default */.Ay.loadPageSync(location.pathname+location.search,{withErrorDetails:true});return{pageResources,location:{...location}};}return{location:{...location}};};var _proto=EnsureResources.prototype;_proto.loadResources=function loadResources(rawPath){loader/* default */.Ay.loadPage(rawPath).then(pageResources=>{if(pageResources&&pageResources.status!==loader/* PageResourceStatus */.Wi.Error){this.setState({location:{...window.location},pageResources});}else{window.history.replaceState({},"",location.href);window.location=rawPath;}});};_proto.shouldComponentUpdate=function shouldComponentUpdate(nextProps,nextState){// Always return false if we're missing resources.
if(!nextState.pageResources){this.loadResources(nextProps.location.pathname+nextProps.location.search);return false;}if(false){}// Check if the component or json have changed.
if(this.state.pageResources!==nextState.pageResources){return true;}if(this.state.pageResources.component!==nextState.pageResources.component){return true;}if(this.state.pageResources.json!==nextState.pageResources.json){return true;}// Check if location has changed on a page using internal routing
// via matchPath configuration.
if(this.state.location.key!==nextState.location.key&&nextState.pageResources.page&&(nextState.pageResources.page.matchPath||nextState.pageResources.page.path)){return true;}return es(this,nextProps,nextState);};_proto.render=function render(){if(false){ var _this$state$pageResou; }return this.props.children(this.state);};return EnsureResources;}(react.Component);/* harmony default export */ var ensure_resources = (EnsureResources);
// EXTERNAL MODULE: ./.cache/strip-prefix.js
var strip_prefix = __webpack_require__(33817);
;// CONCATENATED MODULE: ./.cache/_this_is_virtual_fs_path_/$virtual/match-paths.json
var match_paths_namespaceObject = [];
// EXTERNAL MODULE: ./.cache/react-dom-utils.js
var react_dom_utils = __webpack_require__(58280);
;// CONCATENATED MODULE: ./.cache/production-app.js
// Generated during bootstrap
const production_app_loader=new loader/* ProdLoader */.N5(async_requires,match_paths_namespaceObject,window.pageData);(0,loader/* setLoader */.iC)(production_app_loader);production_app_loader.setApiRunner(api_runner_browser/* apiRunner */.N);const{render,hydrate}=(0,react_dom_utils/* reactDOMUtils */.n)();window.asyncRequires=async_requires;window.___emitter=emitter/* default */.A;window.___loader=loader/* publicLoader */.Zf;init();const reloadStorageKey="gatsby-reload-compilation-hash-match";(0,api_runner_browser/* apiRunnerAsync */.v)("onClientEntry").then(()=>{// Let plugins register a service worker. The plugin just needs
// to return true.
if((0,api_runner_browser/* apiRunner */.N)("registerServiceWorker").filter(Boolean).length>0){__webpack_require__(83094);}// In gatsby v2 if Router is used in page using matchPaths
// paths need to contain full path.
// For example:
//   - page have `/app/*` matchPath
//   - inside template user needs to use `/app/xyz` as path
// Resetting `basepath`/`baseuri` keeps current behaviour
// to not introduce breaking change.
// Remove this in v3
const RouteHandler=props=>/*#__PURE__*/(0,jsx_runtime.jsx)(index_modern.BaseContext.Provider,{value:{baseuri:"/",basepath:"/"},children:/*#__PURE__*/(0,jsx_runtime.jsx)(page_renderer/* default */.A,{...props})});const DataContext=/*#__PURE__*/react.createContext({});const slicesContext={renderEnvironment:"browser"};let GatsbyRoot=/*#__PURE__*/function(_React$Component){function GatsbyRoot(){return _React$Component.apply(this,arguments)||this;}(0,inheritsLoose/* default */.A)(GatsbyRoot,_React$Component);var _proto=GatsbyRoot.prototype;_proto.render=function render(){const{children}=this.props;return/*#__PURE__*/(0,jsx_runtime.jsx)(index_modern.Location,{children:_ref=>{let{location}=_ref;return/*#__PURE__*/(0,jsx_runtime.jsx)(ensure_resources,{location:location,children:_ref2=>{let{pageResources,location}=_ref2;const staticQueryResults=(0,loader/* getStaticQueryResults */.LE)();const sliceResults=(0,loader/* getSliceResults */.Rh)();return/*#__PURE__*/(0,jsx_runtime.jsx)(static_query/* StaticQueryContext */.G.Provider,{value:staticQueryResults,children:/*#__PURE__*/(0,jsx_runtime.jsx)(context/* SlicesContext */.j$.Provider,{value:slicesContext,children:/*#__PURE__*/(0,jsx_runtime.jsx)(context/* SlicesResultsContext */.dd.Provider,{value:sliceResults,children:/*#__PURE__*/(0,jsx_runtime.jsx)(context/* SlicesMapContext */.Jr.Provider,{value:pageResources.page.slicesMap,children:/*#__PURE__*/(0,jsx_runtime.jsx)(DataContext.Provider,{value:{pageResources,location},children:children})})})})});}});}});};return GatsbyRoot;}(react.Component);let LocationHandler=/*#__PURE__*/function(_React$Component2){function LocationHandler(){return _React$Component2.apply(this,arguments)||this;}(0,inheritsLoose/* default */.A)(LocationHandler,_React$Component2);var _proto2=LocationHandler.prototype;_proto2.render=function render(){return/*#__PURE__*/(0,jsx_runtime.jsx)(DataContext.Consumer,{children:_ref3=>{let{pageResources,location}=_ref3;return/*#__PURE__*/(0,jsx_runtime.jsx)(RouteUpdates,{location:location,children:/*#__PURE__*/(0,jsx_runtime.jsx)(gatsby_react_router_scroll/* ScrollContext */.z_,{location:location,shouldUpdateScroll:shouldUpdateScroll,children:/*#__PURE__*/(0,jsx_runtime.jsx)(index_modern.Router,{basepath:"",location:location,id:"gatsby-focus-wrapper",children:/*#__PURE__*/(0,jsx_runtime.jsx)(RouteHandler,{path:pageResources.page.path==="/404.html"||pageResources.page.path==="/500.html"?(0,strip_prefix/* default */.A)(location.pathname,""):encodeURI((pageResources.page.matchPath||pageResources.page.path).split("?")[0]),...this.props,location:location,pageResources:pageResources,...pageResources.json})})})});}});};return LocationHandler;}(react.Component);const{pagePath,location:browserLoc}=window;// Explicitly call navigate if the canonical path (window.pagePath)
// is different to the browser path (window.location.pathname). SSR
// page paths might include search params, while SSG and DSG won't.
// If page path include search params we also compare query params.
// But only if NONE of the following conditions hold:
//
// - The url matches a client side route (page.matchPath)
// - it's a 404 page
// - it's the offline plugin shell (/offline-plugin-app-shell-fallback/)
if(pagePath&&""+pagePath!==browserLoc.pathname+(pagePath.includes("?")?browserLoc.search:"")&&!(production_app_loader.findMatchPath((0,strip_prefix/* default */.A)(browserLoc.pathname,""))||pagePath.match(/^\/(404|500)(\/?|.html)$/)||pagePath.match(/^\/offline-plugin-app-shell-fallback\/?$/))){(0,index_modern.navigate)(""+pagePath+(!pagePath.includes("?")?browserLoc.search:"")+browserLoc.hash,{replace:true});}// It's possible that sessionStorage can throw an exception if access is not granted, see https://github.com/gatsbyjs/gatsby/issues/34512
const getSessionStorage=()=>{try{return sessionStorage;}catch{return null;}};loader/* publicLoader */.Zf.loadPage(browserLoc.pathname+browserLoc.search).then(page=>{var _page$page;const sessionStorage=getSessionStorage();if(page!==null&&page!==void 0&&(_page$page=page.page)!==null&&_page$page!==void 0&&_page$page.webpackCompilationHash&&page.page.webpackCompilationHash!==window.___webpackCompilationHash){// Purge plugin-offline cache
if("serviceWorker"in navigator&&navigator.serviceWorker.controller!==null&&navigator.serviceWorker.controller.state==="activated"){navigator.serviceWorker.controller.postMessage({gatsbyApi:"clearPathResources"});}// We have not matching html + js (inlined `window.___webpackCompilationHash`)
// with our data (coming from `app-data.json` file). This can cause issues such as
// errors trying to load static queries (as list of static queries is inside `page-data`
// which might not match to currently loaded `.js` scripts).
// We are making attempt to reload if hashes don't match, but we also have to handle case
// when reload doesn't fix it (possibly broken deploy) so we don't end up in infinite reload loop
if(sessionStorage){const isReloaded=sessionStorage.getItem(reloadStorageKey)==="1";if(!isReloaded){sessionStorage.setItem(reloadStorageKey,"1");window.location.reload(true);return;}}}if(sessionStorage){sessionStorage.removeItem(reloadStorageKey);}if(!page||page.status===loader/* PageResourceStatus */.Wi.Error){const message="page resources for "+browserLoc.pathname+" not found. Not rendering React";// if the chunk throws an error we want to capture the real error
// This should help with https://github.com/gatsbyjs/gatsby/issues/19618
if(page&&page.error){console.error(message);throw page.error;}throw new Error(message);}const SiteRoot=(0,api_runner_browser/* apiRunner */.N)("wrapRootElement",{element:/*#__PURE__*/(0,jsx_runtime.jsx)(LocationHandler,{})},/*#__PURE__*/(0,jsx_runtime.jsx)(LocationHandler,{}),_ref4=>{let{result}=_ref4;return{element:result};}).pop();const App=function App(){const onClientEntryRanRef=react.useRef(false);react.useEffect(()=>{if(!onClientEntryRanRef.current){onClientEntryRanRef.current=true;if(performance.mark){performance.mark("onInitialClientRender");}(0,api_runner_browser/* apiRunner */.N)("onInitialClientRender");}},[]);return/*#__PURE__*/(0,jsx_runtime.jsx)(GatsbyRoot,{children:SiteRoot});};const focusEl=document.getElementById("gatsby-focus-wrapper");// Client only pages have any empty body so we just do a normal
// render to avoid React complaining about hydration mis-matches.
let defaultRenderer=render;if(focusEl&&focusEl.children.length){defaultRenderer=hydrate;}const renderer=(0,api_runner_browser/* apiRunner */.N)("replaceHydrateFunction",undefined,defaultRenderer)[0];function runRender(){const rootElement=typeof window!=="undefined"?document.getElementById("___gatsby"):null;renderer(/*#__PURE__*/(0,jsx_runtime.jsx)(App,{}),rootElement);}// https://github.com/madrobby/zepto/blob/b5ed8d607f67724788ec9ff492be297f64d47dfc/src/zepto.js#L439-L450
// TODO remove IE 10 support
const doc=document;if(doc.readyState==="complete"||doc.readyState!=="loading"&&!doc.documentElement.doScroll){setTimeout(function(){runRender();},0);}else{const handler=function(){doc.removeEventListener("DOMContentLoaded",handler,false);window.removeEventListener("load",handler,false);runRender();};doc.addEventListener("DOMContentLoaded",handler,false);window.addEventListener("load",handler,false);}return;});});

/***/ }),

/***/ 19799:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7587);
/* harmony import */ var _page_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55645);
const ProdPageRenderer=_ref=>{let{location}=_ref;const pageResources=_loader__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.loadPageSync(location.pathname);if(!pageResources){return null;}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_page_renderer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A,{location,pageResources,...pageResources.json});};/* harmony default export */ __webpack_exports__["default"] = (ProdPageRenderer);

/***/ }),

/***/ 41641:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const preferDefault=m=>m&&m.default||m;if(false){}else if(true){module.exports=preferDefault(__webpack_require__(19799));}else{}

/***/ }),

/***/ 58280:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: function() { return /* binding */ reactDOMUtils; }
/* harmony export */ });
const map=new WeakMap();function reactDOMUtils(){const reactDomClient=__webpack_require__(75541);const render=(Component,el)=>{let root=map.get(el);if(!root){map.set(el,root=reactDomClient.createRoot(el));}root.render(Component);};const hydrate=(Component,el)=>reactDomClient.hydrateRoot(el,Component);return{render,hydrate};}

/***/ }),

/***/ 5180:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  X: function() { return /* binding */ maybeGetBrowserRedirect; }
});

;// CONCATENATED MODULE: ./.cache/redirects.json
var redirects_namespaceObject = [];
;// CONCATENATED MODULE: ./.cache/redirect-utils.js
// Convert to a map for faster lookup in maybeRedirect()
const redirectMap=new Map();const redirectIgnoreCaseMap=new Map();redirects_namespaceObject.forEach(redirect=>{if(redirect.ignoreCase){redirectIgnoreCaseMap.set(redirect.fromPath,redirect);}else{redirectMap.set(redirect.fromPath,redirect);}});function maybeGetBrowserRedirect(pathname){let redirect=redirectMap.get(pathname);if(!redirect){redirect=redirectIgnoreCaseMap.get(pathname.toLowerCase());}return redirect;}

/***/ }),

/***/ 83094:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46840);
if(window.location.protocol!=="https:"&&window.location.hostname!=="localhost"){console.error("Service workers can only be used over HTTPS, or on localhost for development");}else if("serviceWorker"in navigator){navigator.serviceWorker.register(""+"/sw.js").then(function(reg){reg.addEventListener("updatefound",()=>{(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .N)("onServiceWorkerUpdateFound",{serviceWorker:reg});// The updatefound event implies that reg.installing is set; see
// https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
const installingWorker=reg.installing;console.log("installingWorker",installingWorker);installingWorker.addEventListener("statechange",()=>{switch(installingWorker.state){case"installed":if(navigator.serviceWorker.controller){// At this point, the old content will have been purged and the fresh content will
// have been added to the cache.
// We set a flag so Gatsby Link knows to refresh the page on next navigation attempt
window.___swUpdated=true;// We call the onServiceWorkerUpdateReady API so users can show update prompts.
(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .N)("onServiceWorkerUpdateReady",{serviceWorker:reg});// If resources failed for the current page, reload.
if(window.___failedResources){console.log("resources failed, SW updated - reloading");window.location.reload();}}else{// At this point, everything has been precached.
// It's the perfect time to display a "Content is cached for offline use." message.
console.log("Content is now available offline!");// Post to service worker that install is complete.
// Delay to allow time for the event listener to be added --
// otherwise fetch is called too soon and resources aren't cached.
(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .N)("onServiceWorkerInstalled",{serviceWorker:reg});}break;case"redundant":console.error("The installing service worker became redundant.");(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .N)("onServiceWorkerRedundant",{serviceWorker:reg});break;case"activated":(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .N)("onServiceWorkerActive",{serviceWorker:reg});break;}});});}).catch(function(e){console.error("Error during service worker registration:",e);});}

/***/ }),

/***/ 9564:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Jr: function() { return /* binding */ SlicesMapContext; },
/* harmony export */   dd: function() { return /* binding */ SlicesResultsContext; },
/* harmony export */   j$: function() { return /* binding */ SlicesContext; }
/* harmony export */ });
/* unused harmony export SlicesPropsContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
const SlicesResultsContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});const SlicesContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});const SlicesMapContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});const SlicesPropsContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});

/***/ }),

/***/ 52933:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  G: function() { return /* binding */ StaticQueryContext; },
  GR: function() { return /* binding */ useStaticQuery; }
});

// UNUSED EXPORTS: StaticQuery

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
;// CONCATENATED MODULE: ./.cache/context-utils.js
// Ensure serverContext is not created more than once as React will throw when creating it more than once
// https://github.com/facebook/react/blob/dd2d6522754f52c70d02c51db25eb7cbd5d1c8eb/packages/react/src/ReactServerContext.js#L101
const createServerContext=function(name,defaultValue){if(defaultValue===void 0){defaultValue=null;}/* eslint-disable no-undef */if(!globalThis.__SERVER_CONTEXT){globalThis.__SERVER_CONTEXT={};}if(!globalThis.__SERVER_CONTEXT[name]){globalThis.__SERVER_CONTEXT[name]=react.createServerContext(name,defaultValue);}return globalThis.__SERVER_CONTEXT[name];};function createServerOrClientContext(name,defaultValue){if(react.createServerContext){return createServerContext(name,defaultValue);}return/*#__PURE__*/react.createContext(defaultValue);}
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(63159);
;// CONCATENATED MODULE: ./.cache/static-query.js
const StaticQueryContext=createServerOrClientContext("StaticQuery",{});function StaticQueryDataRenderer(_ref){let{staticQueryData,data,query,render}=_ref;const finalData=data?data.data:staticQueryData[query]&&staticQueryData[query].data;return/*#__PURE__*/_jsxs(React.Fragment,{children:[finalData&&render(finalData),!finalData&&/*#__PURE__*/_jsx("div",{children:"Loading (StaticQuery)"})]});}let warnedAboutStaticQuery=false;// TODO(v6): Remove completely
const StaticQuery=props=>{const{data,query,render,children}=props;if(false){}return/*#__PURE__*/_jsx(StaticQueryContext.Consumer,{children:staticQueryData=>/*#__PURE__*/_jsx(StaticQueryDataRenderer,{data:data,query:query,render:render||children,staticQueryData:staticQueryData})});};const useStaticQuery=query=>{var _context$query;if(typeof react.useContext!=="function"&&"production"==="development"){}const context=react.useContext(StaticQueryContext);// query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
// to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
// catch the misuse of the API and give proper direction
if(isNaN(Number(query))){throw new Error("useStaticQuery was called with a string but expects to be called using `graphql`. Try this:\n\nimport { useStaticQuery, graphql } from 'gatsby';\n\nuseStaticQuery(graphql`"+query+"`);\n");}if((_context$query=context[query])!==null&&_context$query!==void 0&&_context$query.data){return context[query].data;}else{throw new Error("The result of this StaticQuery could not be fetched.\n\n"+"This is likely a bug in Gatsby and if refreshing the page does not fix it, "+"please open an issue in https://github.com/gatsbyjs/gatsby/issues");}};

/***/ }),

/***/ 33817:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* binding */ stripPrefix; }
/* harmony export */ });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */function stripPrefix(str,prefix){if(prefix===void 0){prefix="";}if(!prefix){return str;}if(str===prefix){return"/";}if(str.startsWith(prefix+"/")){return str.slice(prefix.length);}return str;}

/***/ }),

/***/ 7558:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  onClientEntry: function() { return /* binding */ onClientEntry; },
  shouldUpdateScroll: function() { return /* binding */ shouldUpdateScroll; },
  wrapPageElement: function() { return /* reexport */ wrapPageElement; }
});

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(44165);
// EXTERNAL MODULE: ../../packages/localization/src/index.ts + 4 modules
var src = __webpack_require__(56763);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var react = __webpack_require__(11855);
// EXTERNAL MODULE: ../../packages/shared/modules/framework/useFramework.ts + 6 modules
var useFramework = __webpack_require__(78912);
;// CONCATENATED MODULE: ../../packages/shared/components/zendesk/hooks/useZendeskUnit.ts
const useZendeskUnit=()=>{const{currentUrl}=(0,useFramework/* useFramework */.u)();const isProtonVpn=currentUrl.website==='protonvpn-com';const isBusinessVPNUnit=isProtonVpn&&/^\/business(\/|\/?$)(?!(contact|signup)(\/|\/?$))/.test(currentUrl.pathname);if(isBusinessVPNUnit){return{type:'VPNBUSINESS',iframeUrl:'/zendesk/vpn/business.html',widgetApperanceDelay:10000};}const isBusinessUnit=/^\/business(\/|\/?$)(?!(contact|pass)(\/|\/?$))/.test(currentUrl.pathname);if(isBusinessUnit&&!isProtonVpn){return{type:'BUSINESS',iframeUrl:'/zendesk/business.html',widgetApperanceDelay:20000};}const isDriveUnit=/^\/drive\/pricing(\/|\/?$)/.test(currentUrl.pathname);if(isDriveUnit){return{type:'DRIVE',iframeUrl:'/zendesk/drive.html',widgetApperanceDelay:0};}return null;};
;// CONCATENATED MODULE: ../../packages/shared/components/zendesk/components/Delay.tsx
// This is a helper component to safely load children component with a defined delay
const Delay=_ref=>{let{children,timeout}=_ref;const{0:isVisible,1:setIsVisible}=(0,react.useState)(false);(0,react.useEffect)(()=>{const timer=setTimeout(()=>{setIsVisible(true);},timeout);return()=>{clearTimeout(timer);};},[timeout]);if(!timeout){return children;}if(!isVisible){return null;}return children;};/* harmony default export */ var components_Delay = (Delay);
// EXTERNAL MODULE: ../../packages/shared/hooks/useUADetails.ts + 2 modules
var useUADetails = __webpack_require__(7044);
// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(63159);
;// CONCATENATED MODULE: ../../packages/shared/components/zendesk/components/Zendesk.tsx
const Zendesk=_ref=>{let{locale,url}=_ref;// Set width/height of iframe when chat is opened or closed
const OPENED_STYLE={width:'374px',height:'572px'};const CLOSED_STYLE={width:'144px',height:'70px'};const{0:iframeStyle,1:setIframeStyle}=(0,react.useState)(CLOSED_STYLE);// Ensure Zendesk is only returned if available and on desktop devices
const unit=useZendeskUnit();const{os}=(0,useUADetails/* useUADetails */.A)();const isMobile=!!(os!==null&&os!==void 0&&os.name)&&['Android','iOS'].includes(os.name);if(!unit||isMobile){return null;}// Overwrite & update Zendesk widget
const iframeRef=ref=>{(async(_ref$contentWindow$zE,_ref$contentWindow2,_ref$contentWindow$zE2,_ref$contentWindow3,_ref$contentWindow$zE3,_ref$contentWindow4,_ref$contentWindow$zE4,_ref$contentWindow5)=>{// Abort if no ref is available
if(ref===null||ref.contentWindow===null){return;}// Wait for Zendesk widget to connect
const isZendeskReady=new Promise(resolve=>{var _ref$contentWindow;(_ref$contentWindow=ref.contentWindow)===null||_ref$contentWindow===void 0?void 0:_ref$contentWindow.addEventListener('message',event=>{if(event.data==='zendesk:connected'){resolve(true);}},false);});await isZendeskReady;// Close Zendesk widget initally
(_ref$contentWindow$zE=(_ref$contentWindow2=ref.contentWindow).zE)===null||_ref$contentWindow$zE===void 0?void 0:_ref$contentWindow$zE.call(_ref$contentWindow2,'webWidget','close');// Update Zendesk widget settings
(_ref$contentWindow$zE2=(_ref$contentWindow3=ref.contentWindow).zE)===null||_ref$contentWindow$zE2===void 0?void 0:_ref$contentWindow$zE2.call(_ref$contentWindow3,'webWidget','setLocale',locale);(_ref$contentWindow$zE3=(_ref$contentWindow4=ref.contentWindow).zE)===null||_ref$contentWindow$zE3===void 0?void 0:_ref$contentWindow$zE3.call(_ref$contentWindow4,'webWidget','updatePath',{url:url});(_ref$contentWindow$zE4=(_ref$contentWindow5=ref.contentWindow).zE)===null||_ref$contentWindow$zE4===void 0?void 0:_ref$contentWindow$zE4.call(_ref$contentWindow5,'webWidget:on','userEvent',event=>{if(event.action==='Web Widget Opened'){setIframeStyle(OPENED_STYLE);}if(event.action==='Web Widget Minimised'){setIframeStyle(CLOSED_STYLE);}});})().catch(error=>{console.error('Zendesk:',error);});};return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{id:"zendesk",children:/*#__PURE__*/(0,jsx_runtime.jsx)(components_Delay,{timeout:unit.widgetApperanceDelay,children:/*#__PURE__*/(0,jsx_runtime.jsx)("iframe",{title:"Zendesk",src:unit.iframeUrl,ref:iframeRef,className:"fixed bottom-0 right-0 z-zendesk max-h-full w-80 max-w-full",style:iframeStyle,sandbox:"allow-scripts allow-same-origin allow-popups allow-forms"})})});};/* harmony default export */ var components_Zendesk = (Zendesk);
// EXTERNAL MODULE: ../../packages/shared/constants/api.ts
var api = __webpack_require__(56202);
// EXTERNAL MODULE: ../../packages/shared/helpers/cookies.ts
var cookies = __webpack_require__(23417);
// EXTERNAL MODULE: ../../packages/shared/helpers/hasValue.ts
var hasValue = __webpack_require__(89797);
// EXTERNAL MODULE: ../../packages/shared/components/LanguageSwitcher/PreferredLanguage.tsx + 1 modules
var PreferredLanguage = __webpack_require__(66718);
// EXTERNAL MODULE: ../../packages/shared/components/link/useUrlWithSessionRef.ts
var useUrlWithSessionRef = __webpack_require__(91053);
;// CONCATENATED MODULE: ../../packages/shared/modules/analytics-beacon/useAnalyticsBeacon.ts
const useAnalyticsBeacon=()=>{const{currentUrl,routing:{state}}=(0,useFramework/* useFramework */.u)();(0,react.useEffect)(()=>{try{// Here framework url is wrong, Astro being proxified behind Apache, url is localhost
// As this script is 100% frontend, window.location is available and correct
const url=window.location;if((!state||(state===null||state===void 0?void 0:state.prevPage)!==undefined)&&(0,hasValue/* hasValue */.a)(url.origin)&&(0,hasValue/* hasValue */.a)(url.pathname)){var _document;const pagePath=url.pathname.endsWith('/')?url.pathname.slice(0,-1):url.pathname;const urlParams=new URLSearchParams(url.search);urlParams.append('load','ajax');const preferredLanguage=(0,cookies/* getCookie */.Ri)(PreferredLanguage/* PREFERRED_LANGUAGE_COOKIE */.Ci);urlParams.append('lang',preferredLanguage||currentUrl.locale);const ref=(0,useUrlWithSessionRef/* consumeSessionRef */._i)();if(ref){urlParams.append('ref',ref);}const query=urlParams.toString();const prevPage=state!==null&&state!==void 0&&state.prevPage?""+url.origin+state.prevPage:(_document=document)===null||_document===void 0?void 0:_document.referrer;void fetch(""+url.origin+pagePath+"?"+query,{headers:prevPage?{...api/* API_HEADERS */.Q,'X-PM-Referer':prevPage}:api/* API_HEADERS */.Q,method:'GET'});}}catch(e){console.error(e);}},[state,currentUrl.locale]);};
;// CONCATENATED MODULE: ../../packages/shared/modules/analytics-beacon/AnalyticsBeacon.tsx
const AnalyticsBeacon=()=>{useAnalyticsBeacon();return null;};
// EXTERNAL MODULE: ../../node_modules/.pnpm/@unleash+proxy-client-react@4.2.2_unleash-proxy-client@3.3.2/node_modules/@unleash/proxy-client-react/dist/unleash-react.js
var unleash_react = __webpack_require__(80712);
;// CONCATENATED MODULE: ../../packages/shared/hooks/useTrafficType.ts
// This list is obviously doomed to be obsolete, don't hesitate to update
const mostPopularSearchEngineDomains=['google','bing','yahoo','baidu','yandex','duckduckgo','ask.com','ecosia'];// Very basic logic, don't hesitate to extend it
const getTrafficType=url=>{const visitorId=(0,cookies/* getCookie */.Ri)('visitorId')||url.searchParams.get('visitorId');if(visitorId){return'paid';}const refferrer=window.document.referrer;if(refferrer){const refUrl=new URL(refferrer);const domainMatch=mostPopularSearchEngineDomains.some(domain=>refUrl.hostname.includes(domain));if(domainMatch){return'organic';}}return'direct';};const useTrafficType=()=>{const{currentUrl}=(0,useFramework/* useFramework */.u)();const{0:trafficType,1:setTrafficType}=(0,react.useState)();(0,react.useEffect)(()=>{setTrafficType(getTrafficType(currentUrl));},// No dependencies, once set, we keep it for the session
// On Astro, we may want to create some session storage to maintain the initial type
// eslint-disable-next-line react-hooks/exhaustive-deps
[]);return trafficType;};
// EXTERNAL MODULE: ../../packages/shared/modules/feature-flags/config.ts
var config = __webpack_require__(94775);
// EXTERNAL MODULE: ../../packages/shared/modules/feature-flags/context/IsUnleashReadyContext.ts
var IsUnleashReadyContext = __webpack_require__(55795);
// EXTERNAL MODULE: ../../packages/shared/modules/feature-flags/types.ts
var types = __webpack_require__(29448);
;// CONCATENATED MODULE: ../../packages/shared/modules/feature-flags/utils/experiments.ts
const purgeExperiments=experiments=>{const purgedExperiments={};for(const k in experiments){if(k in types/* ExperimentCode */.n){const key=k;purgedExperiments[key]=experiments[key];}}return purgedExperiments;};const extractExperiments=cookieValue=>{return cookieValue.split(',').reduce((acc,code)=>{const[key,value]=code.split(':');acc[key]=value;return acc;},{});};const experimentToCookieString=experiments=>{const experimentStringArray=Object.entries(experiments).map(_ref=>{let[experimentKey,experimentValue]=_ref;return experimentKey+":"+experimentValue;}).join(',');return experimentStringArray;};const storeExperimentsInCookie=experiments=>{const cookieDomain="."+window.location.hostname;// .proton.me/black/pink
const cookieValue=experimentToCookieString(experiments);if(!cookieValue){return;}(0,cookies/* setCookie */.TV)({cookieName:'Features',cookieValue,cookieDomain,path:'/',expirationDate:'max',secure:true});};
;// CONCATENATED MODULE: ../../packages/shared/modules/feature-flags/utils/fetchExperiment.ts
const fetchExperiment=()=>{var _document;const{origin,state,pathname}=window.location;const urlParams=new URLSearchParams(window.location.search);urlParams.append('load','experiment');const query=urlParams.toString();const pagePath=pathname.endsWith('/')?pathname.slice(0,-1):pathname;const prevPage=state!==null&&state!==void 0&&state.prevPage?""+origin+state.prevPage:(_document=document)===null||_document===void 0?void 0:_document.referrer;return fetch(""+origin+pagePath+"?"+query,{headers:prevPage?{...api/* API_HEADERS */.Q,'X-PM-Referer':prevPage}:api/* API_HEADERS */.Q,method:'GET',credentials:'include'});};
;// CONCATENATED MODULE: ../../packages/shared/modules/feature-flags/UnleashProvider.tsx
const UnleashProvider=_ref=>{var _device$device2;let{children,website}=_ref;const device=(0,useUADetails/* useUADetails */.A)();const trafficType=useTrafficType();const{0:isReady,1:setReady}=(0,react.useState)(false);const client=(0,react.useMemo)(()=>{return new unleash_react/* UnleashClient */.cn((0,config/* buildConfig */.f)("https://account.protonvpn.com/api"||0));},// eslint-disable-next-line react-hooks/exhaustive-deps
[website]);(0,react.useEffect)(()=>{const run=async()=>{var _device$device;if(!((_device$device=device.device)!==null&&_device$device!==void 0&&_device$device.type)||!trafficType||website==='test'){return;}await client.updateContext({deviceType:device.device.type,trafficType});client.on('ready',()=>{(0,react.startTransition)(()=>setReady(true));const allFlags=client.getAllToggles();const formattedFlags=allFlags.reduce((acc,curr)=>{var _curr$variant$payload;if(curr.enabled&&(_curr$variant$payload=curr.variant.payload)!==null&&_curr$variant$payload!==void 0&&_curr$variant$payload.value){return{...acc,[curr.name]:curr.variant.payload.value};}return acc;},{});let purgedLocalExperiments={};const featuresCookie=(0,cookies/* getCookie */.Ri)('Features');if(featuresCookie){const localExperiments=extractExperiments(featuresCookie);purgedLocalExperiments=purgeExperiments(localExperiments);}storeExperimentsInCookie({...purgedLocalExperiments,...formattedFlags});void fetchExperiment();});await client.start();};void run();return()=>{client.stop();};},[client,(_device$device2=device.device)===null||_device$device2===void 0?void 0:_device$device2.type,trafficType,website]);return/*#__PURE__*/(0,jsx_runtime.jsx)(IsUnleashReadyContext/* IsUnleashReadyContext */.r.Provider,{value:isReady,children:/*#__PURE__*/(0,jsx_runtime.jsx)(unleash_react/* FlagProvider */.UU,{unleashClient:client,startClient:false,children:children})});};
// EXTERNAL MODULE: ../../packages/shared/modules/framework/default.ts
var framework_default = __webpack_require__(64284);
// EXTERNAL MODULE: ../../packages/shared/modules/framework/gatsby/FrameworkContext.tsx
var FrameworkContext = __webpack_require__(20921);
// EXTERNAL MODULE: ../../packages/ttag/src/index.ts + 2 modules
var ttag_src = __webpack_require__(96764);
;// CONCATENATED MODULE: ../../packages/shared/hooks/useInitTtag.ts
const useInitTtag=(locale,translations)=>{(0,react.useMemo)(()=>{if(locale===src.defaultLocale.code){// eslint-disable-next-line react-hooks/rules-of-hooks
(0,ttag_src/* useLocale */.Ym)(locale);}else if(locale&&translations){if(typeof translations==='object'){(0,ttag_src/* addLocale */.IK)(locale,translations);}else{try{(0,ttag_src/* addLocale */.IK)(locale,JSON.parse(translations));}catch(e){console.error('Failed to parse ttag translations to JSON');console.error(e);}}// eslint-disable-next-line react-hooks/rules-of-hooks
(0,ttag_src/* useLocale */.Ym)(locale);}},[locale,translations]);};
// EXTERNAL MODULE: ./src/helpers/cookies.ts
var helpers_cookies = __webpack_require__(75847);
;// CONCATENATED MODULE: ./src/elements/AffiliateCookie.tsx
const PRIORITY_CLICK='P';const NORMAL_CLICK='N';const LOW_PRIORITY_CLICK='L';const isBrowser=typeof window!=='undefined';const checkDeepLink=(visitorId,offerId)=>{return offerId&&!visitorId.endsWith("-"+offerId)?visitorId+"-"+offerId:visitorId;};const setNormalCookies=_ref=>{let{cookieDomain,visitorId,hfp,affiliate,affiliateId,offerId}=_ref;if(visitorId&&/^[a-zA-Z0-9.@=_-]+$/.test(visitorId)){const d=new Date();d.setTime(d.getTime()+30*24*60*60*1000);const fullVisitorId=checkDeepLink(visitorId,offerId);(0,helpers_cookies/* setCookie */.TV)({cookieName:'visitorId',cookieValue:fullVisitorId,expirationDate:d.toUTCString(),path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.None,secure:true});if(hfp==='true'){(0,helpers_cookies/* setCookie */.TV)({cookieName:'offer',cookieValue:'bestdeal',path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.Lax,secure:true});}else if(hfp==='false'){(0,helpers_cookies/* deleteCookie */.Yj)('offer');}if(affiliate&&/^[a-zA-Z0-9]+$/.test(affiliate)){(0,helpers_cookies/* setCookie */.TV)({cookieName:'affiliate',cookieValue:affiliate,path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.Lax,secure:true});}if(affiliateId&&/^[a-zA-Z0-9]+$/.test(affiliateId)){(0,helpers_cookies/* setCookie */.TV)({cookieName:'affiliateId',cookieValue:affiliateId,expirationDate:d.toUTCString(),path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.None,secure:true});}}};// check if first click from history cookie is valid by priority and expiration
const isFirstClickPriorityValid=(cookie_value,priority)=>{const historyRecords=getHistoryRecords(cookie_value);const firstDetails=getRecordDetails(historyRecords.first);// check if is priority the first one
const cookiePriority=firstDetails.priority;const d=new Date(firstDetails.clickTime*1000);const cookieExpireTime=d.setTime(d.getTime()+40*24*60*60*1000);if(cookiePriority===priority&&cookieExpireTime>new Date().getTime()){return true;}return false;};// get records from history cookie
const getHistoryRecords=cookieValue=>{const historyCookieRecoreds=decodeURIComponent(cookieValue).split(',');return{first:historyCookieRecoreds[0]||'',last:historyCookieRecoreds[1]||''};};// get record details of a click
const getRecordDetails=record=>{const recordDetails=record.split(':');return{priority:recordDetails[0]||'',clickTime:parseInt(recordDetails[1],10)||0,clickVisitorId:recordDetails[2]||''};};const getPriorityLevel=priority=>{if(priority==='true'){return PRIORITY_CLICK;}if(priority==='false'){return LOW_PRIORITY_CLICK;}return NORMAL_CLICK;};const AffiliateCookie=()=>{(0,react.useEffect)(()=>{if(isBrowser){const urlParams=new URLSearchParams(window.location.search);const visitorId=urlParams.get('visitorId');const hfp=urlParams.get('hfp');const affiliate=urlParams.get('spl');const affiliateId=urlParams.get('aap');const offerId=urlParams.get('offer_id');const cookieDomain="."+window.location.hostname;const priority=urlParams.get('p');// make last click record
const lastPriority=getPriorityLevel(priority);const lastTime=new Date().getTime();const d=new Date();d.setTime(lastTime+40*24*60*60*1000);const expiresLast=d.toUTCString();const lastVisitorId=checkDeepLink(visitorId||'',offerId);const lastClick=[lastPriority,lastTime,lastVisitorId].join(':');// if there is a history cookie, we keep the current visitorId and update the historycookie
if(visitorId&&/^[a-zA-Z0-9.@=_-]+$/.test(visitorId)){const historyCookie=(0,helpers_cookies/* getCookie */.Ri)('history');if(historyCookie&&isFirstClickPriorityValid(historyCookie,PRIORITY_CLICK)){// update history cookie with lates click
const currentRecords=getHistoryRecords(historyCookie);const newHistory=[currentRecords.first,lastClick].join(',').replace(/^;/g,'');const winningDetails=getRecordDetails(currentRecords.first);(0,helpers_cookies/* setCookie */.TV)({cookieName:'history',cookieValue:encodeURIComponent(newHistory),expirationDate:expiresLast,path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.None,secure:true});// check if visitor cookie is not tempered
if(!(0,helpers_cookies/* checkCookie */.f5)('visitorId',winningDetails.clickVisitorId)&&winningDetails.priority===PRIORITY_CLICK){const wd=new Date();wd.setTime(winningDetails.clickTime*1000+40*24*60*60*1000);(0,helpers_cookies/* setCookie */.TV)({cookieName:'visitorId',cookieValue:winningDetails.clickVisitorId,expirationDate:wd.toUTCString(),path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.None,secure:true});}}else if(lastPriority!==LOW_PRIORITY_CLICK||!(0,helpers_cookies/* getCookie */.Ri)('visitorId')||isFirstClickPriorityValid((0,helpers_cookies/* getCookie */.Ri)('history')||'',LOW_PRIORITY_CLICK)){// we set normal cookies in is Normal or Priority (1st time),
// or Low priority (as 1st visit - no exsisting visitorId cookie)
// or Low priority as returning if it was 1st click (is in history as first click)
setNormalCookies({cookieDomain,visitorId,hfp,affiliate,affiliateId,offerId});// in case of priority we should update history, or delete it only if there is nomore valid history record
if(lastPriority!==NORMAL_CLICK){// set the history set record for winning
(0,helpers_cookies/* setCookie */.TV)({cookieName:'history',cookieValue:encodeURIComponent(lastClick),expirationDate:expiresLast,path:'/',cookieDomain,samesite:helpers_cookies/* CookieSameSiteAttribute */.qh.None,secure:true});}else if(!(isFirstClickPriorityValid((0,helpers_cookies/* getCookie */.Ri)('history')||'',PRIORITY_CLICK)||isFirstClickPriorityValid((0,helpers_cookies/* getCookie */.Ri)('history')||'',LOW_PRIORITY_CLICK))){(0,helpers_cookies/* deleteCookie */.Yj)('history','/');}}window.history.replaceState({},document.title,window.location.pathname);}}},[]);return null;};/* harmony default export */ var elements_AffiliateCookie = (AffiliateCookie);
;// CONCATENATED MODULE: ./src/containers/PageProviders.tsx
const PageProviders=_ref=>{let{pageContext:{locale=src.defaultLocale.code,translations,...localizationContext},location,children}=_ref;useInitTtag(locale,translations);// Safe url creation, location.href can be undefined
const currentUrl=location.href||location.pathname||'/';const routing={navigate: gatsby_browser_entry/* navigate */.oo,state:location.state};const localization={...framework_default/* defaultLocalizationContext */.AY,...localizationContext};return/*#__PURE__*/(0,jsx_runtime.jsx)(UnleashProvider,{website:"vpn",children:/*#__PURE__*/(0,jsx_runtime.jsxs)(FrameworkContext/* FrameworkProvider */.U,{currentUrl:currentUrl,routing:routing,localization:localization,unleash:undefined,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(elements_AffiliateCookie,{}),children,/*#__PURE__*/(0,jsx_runtime.jsx)(AnalyticsBeacon,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(components_Zendesk,{locale:locale,url:location.href})]})});};/* harmony default export */ var containers_PageProviders = (PageProviders);
;// CONCATENATED MODULE: ./src/modules/gatsby/wrapPageElement.tsx
const wrapPageElement=_ref=>{let{element,props:{location,pageContext}}=_ref;return/*#__PURE__*/(0,jsx_runtime.jsx)(containers_PageProviders,{location:location,pageContext:pageContext,children:element});};
;// CONCATENATED MODULE: ./gatsby-browser.js
const shouldUpdateScroll=()=>{if(typeof window.location.hash==='string'){// It should only scroll to the top of the page in case there is no anchor
if(!window.location.hash.length>0){window.scrollTo(0,0);}return false;}return true;};const onClientEntry=()=>{const{href,pathname,search}=window.location;if(!href.startsWith('https://protonvpn.com')){if(pathname==='/preview'){const params=new URLSearchParams(search);const token=params.get('token');const documentId=params.get('documentId');if(token&&documentId){var _urlFromToken$pathnam;const urlFromToken=new URL(token);const releaseId=(_urlFromToken$pathnam=urlFromToken.pathname.split('/previews/'))===null||_urlFromToken$pathnam===void 0?void 0:_urlFromToken$pathnam[1];window.location.search="?id="+documentId+(releaseId?"&release="+releaseId:'');}}}};

/***/ }),

/***/ 92018:
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 66838:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-server-dom-webpack.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var k=__webpack_require__(11855),l={stream:!0},n=new Map,p=Symbol.for("react.element"),q=Symbol.for("react.lazy"),r=Symbol.for("react.default_value"),t=k.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ContextRegistry;function u(a){t[a]||(t[a]=k.createServerContext(a,r));return t[a]}function v(a,b,c){this._status=a;this._value=b;this._response=c}v.prototype.then=function(a){0===this._status?(null===this._value&&(this._value=[]),this._value.push(a)):a()};
function w(a){switch(a._status){case 3:return a._value;case 1:var b=JSON.parse(a._value,a._response._fromJSON);a._status=3;return a._value=b;case 2:b=a._value;for(var c=b.chunks,d=0;d<c.length;d++){var e=n.get(c[d]);if(null!==e)throw e;}c=__webpack_require__(b.id);b="*"===b.name?c:""===b.name?c.__esModule?c.default:c:c[b.name];a._status=3;return a._value=b;case 0:throw a;default:throw a._value;}}function x(){var a=y(this,0);return w(a)}function z(a,b){return new v(3,b,a)}
function A(a){if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}function C(a,b){if(0===a._status){var c=a._value;a._status=4;a._value=b;A(c)}}function D(a,b){a._chunks.forEach(function(a){C(a,b)})}function y(a,b){var c=a._chunks,d=c.get(b);d||(d=new v(0,null,a),c.set(b,d));return d}
function E(a,b,c){switch(c[0]){case "$":if("$"===c)return p;if("$"===c[1]||"@"===c[1])return c.substring(1);b=parseInt(c.substring(1),16);a=y(a,b);return w(a);case "@":return b=parseInt(c.substring(1),16),a=y(a,b),{$$typeof:q,_payload:a,_init:w}}return c}function F(a){D(a,Error("Connection closed."))}
function G(a,b){if(""!==b){var c=b[0],d=b.indexOf(":",1),e=parseInt(b.substring(1,d),16);d=b.substring(d+1);switch(c){case "J":b=a._chunks;(c=b.get(e))?0===c._status&&(a=c._value,c._status=1,c._value=d,A(a)):b.set(e,new v(1,d,a));break;case "M":b=a._chunks;c=b.get(e);d=JSON.parse(d,a._fromJSON);var f=a._bundlerConfig;d=f?f[d.id][d.name]:d;f=d.chunks;for(var h=0;h<f.length;h++){var g=f[h];if(void 0===n.get(g)){var B=__webpack_require__.e(g),m=n.set.bind(n,g,null),J=n.set.bind(n,g);B.then(m,J);n.set(g,
B)}}c?0===c._status&&(a=c._value,c._status=2,c._value=d,A(a)):b.set(e,new v(2,d,a));break;case "P":a._chunks.set(e,z(a,u(d).Provider));break;case "S":c=JSON.parse(d);a._chunks.set(e,z(a,Symbol.for(c)));break;case "E":b=JSON.parse(d);c=Error(b.message);c.stack=b.stack;b=a._chunks;(d=b.get(e))?C(d,c):b.set(e,new v(4,c,a));break;default:throw Error("Error parsing the data. It's probably an error code or network corruption.");}}}
function H(a){return function(b,c){return"string"===typeof c?E(a,this,c):"object"===typeof c&&null!==c?(b=c[0]===p?{$$typeof:p,type:c[1],key:c[2],ref:null,props:c[3],_owner:null}:c,b):c}}function I(a){var b=new TextDecoder,c=new Map;a={_bundlerConfig:a,_chunks:c,readRoot:x,_partialRow:"",_stringDecoder:b};a._fromJSON=H(a);return a}
function K(a,b){function c(b){var h=b.value;if(b.done)F(a);else{b=h;h=a._stringDecoder;for(var g=b.indexOf(10);-1<g;){var f=a._partialRow;var m=b.subarray(0,g);m=h.decode(m);G(a,f+m);a._partialRow="";b=b.subarray(g+1);g=b.indexOf(10)}a._partialRow+=h.decode(b,l);return e.read().then(c,d)}}function d(b){D(a,b)}var e=b.getReader();e.read().then(c,d)}__webpack_unused_export__=function(a,b){var c=I(b&&b.moduleMap?b.moduleMap:null);a.then(function(a){K(c,a.body)},function(a){D(c,a)});return c};
exports.createFromReadableStream=function(a,b){b=I(b&&b.moduleMap?b.moduleMap:null);K(b,a);return b};
__webpack_unused_export__=function(a,b){function c(){for(var b=a.responseText,c=f,d=b.indexOf("\n",c);-1<d;)c=e._partialRow+b.substring(c,d),G(e,c),e._partialRow="",c=d+1,d=b.indexOf("\n",c);e._partialRow+=b.substring(c);f=b.length}function d(){D(e,new TypeError("Network error"))}var e=I(b&&b.moduleMap?b.moduleMap:null),f=0;a.addEventListener("progress",c);a.addEventListener("load",function(){c();F(e)});a.addEventListener("error",d);a.addEventListener("abort",d);a.addEventListener("timeout",d);return e};


/***/ }),

/***/ 40034:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(66838);
} else {}


/***/ }),

/***/ 56584:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ }),

/***/ 22815:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(56584);
} else {}


/***/ }),

/***/ 78549:
/***/ (function(module) {

!function(n,t){if(true)module.exports=t();else { var e, r; }}(this,(()=>(()=>{var n={44:(n,t)=>{"use strict";var r=/(\w+)[-_].*/;function e(n,t){if(t[n])return t[n];var e=n.match(r);if(!e)throw new Error("Can't find lang or lcale with code "+n);return t[e[1]]}function f(n){return n>1}function u(n){return 1!==n}function o(n){return 0}var a={ach:{n:2,f},af:{n:2,f:u},ak:{n:2,f},am:{n:2,f},an:{n:2,f:u},ar:{n:6,f:function(n){return 0===n?0:1===n?1:2===n?2:n%100>=3&&n%100<=10?3:n%100>=11?4:5}},arn:{n:2,f},ast:{n:2,f:u},ay:{n:1,f:o},az:{n:2,f:u},be:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},bg:{n:2,f:u},bn:{n:2,f:u},bo:{n:1,f:o},br:{n:2,f},brx:{n:2,f:u},bs:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},ca:{n:2,f:u},cgg:{n:1,f:o},cs:{n:3,f:function(n){return 1===n?0:n>=2&&n<=4?1:2}},csb:{n:3,f:function(n){return 1===n?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},cy:{n:4,f:function(n){return 1===n?0:2===n?1:8!==n&&11!==n?2:3}},da:{n:2,f:u},de:{n:2,f:u},doi:{n:2,f:u},dz:{n:1,f:o},el:{n:2,f:u},en:{n:2,f:u},eo:{n:2,f:u},es:{n:2,f:u},et:{n:2,f:u},eu:{n:2,f:u},fa:{n:1,f:o},ff:{n:2,f:u},fi:{n:2,f:u},fil:{n:2,f},fo:{n:2,f:u},fr:{n:2,f:function(n){return n<=-2||n>=2}},fur:{n:2,f:u},fy:{n:2,f:u},ga:{n:5,f:function(n){return 1===n?0:2===n?1:n<7?2:n<11?3:4}},gd:{n:4,f:function(n){return 1===n||11===n?0:2===n||12===n?1:n>2&&n<20?2:3}},gl:{n:2,f:u},gu:{n:2,f:u},gun:{n:2,f},ha:{n:2,f:u},he:{n:2,f:u},hi:{n:2,f:u},hne:{n:2,f:u},hr:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},hu:{n:2,f:u},hy:{n:2,f:u},id:{n:1,f:o},is:{n:2,f:function(n){return n%10!=1||n%100==11}},it:{n:2,f:u},ja:{n:1,f:o},jbo:{n:1,f:o},jv:{n:2,f:function(n){return 0!==n}},ka:{n:1,f:o},kab:{n:2,f:u},kk:{n:2,f:u},km:{n:1,f:o},kn:{n:2,f:u},ko:{n:1,f:o},ku:{n:2,f:u},kw:{n:4,f:function(n){return 1===n?0:2===n?1:3===n?2:3}},ky:{n:1,f:o},lb:{n:2,f:u},ln:{n:2,f},lo:{n:1,f:o},lt:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&(n%100<10||n%100>=20)?1:2}},lv:{n:3,f:function(n){return n%10==1&&n%100!=11?0:0!==n?1:2}},mai:{n:2,f:u},mfe:{n:2,f},mg:{n:2,f},mi:{n:2,f},mk:{n:2,f:function(n){return 1===n||n%10==1?0:1}},ml:{n:2,f:u},mn:{n:2,f:u},mni:{n:2,f:u},mnk:{n:3,f:function(n){return 0===n?0:1===n?1:2}},mr:{n:2,f:u},ms:{n:1,f:o},mt:{n:4,f:function(n){return 1===n?0:0===n||n%100>1&&n%100<11?1:n%100>10&&n%100<20?2:3}},my:{n:1,f:o},nah:{n:2,f:u},nap:{n:2,f:u},nb:{n:2,f:u},ne:{n:2,f:u},nl:{n:2,f:u},nn:{n:2,f:u},no:{n:2,f:u},nso:{n:2,f:u},oc:{n:2,f},or:{n:2,f:u},pa:{n:2,f:u},pap:{n:2,f:u},pl:{n:3,f:function(n){return 1===n?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},pms:{n:2,f:u},ps:{n:2,f:u},pt:{n:2,f:u},rm:{n:2,f:u},ro:{n:3,f:function(n){return 1===n?0:0===n||n%100>0&&n%100<20?1:2}},ru:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},rw:{n:2,f:u},sah:{n:1,f:o},sat:{n:2,f:u},sco:{n:2,f:u},sd:{n:2,f:u},se:{n:2,f:u},si:{n:2,f:u},sk:{n:3,f:function(n){return 1===n?0:n>=2&&n<=4?1:2}},sl:{n:4,f:function(n){return n%100==1?1:n%100==2?2:n%100==3||n%100==4?3:0}},so:{n:2,f:u},son:{n:2,f:u},sq:{n:2,f:u},sr:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},su:{n:1,f:o},sv:{n:2,f:u},sw:{n:2,f:u},ta:{n:2,f:u},te:{n:2,f:u},tg:{n:2,f},th:{n:1,f:o},ti:{n:2,f},tk:{n:2,f:u},tr:{n:2,f},tt:{n:1,f:o},ug:{n:1,f:o},uk:{n:3,f:function(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2}},ur:{n:2,f:u},uz:{n:2,f},vi:{n:1,f:o},wa:{n:2,f},wo:{n:1,f:o},yo:{n:2,f:u},zh:{n:1,f:o}},i={};t.getNPlurals=function(n){return e(n,a).n},t.getPluralFunc=function(n){if(i[n])return i[n];var t=e(n,a),r=function(n,r){return r[+t.f(n)]};return i[n]=r,r}},429:(n,t,r)=>{n.exports=r(44)}},t={};function r(e){var f=t[e];if(void 0!==f)return f.exports;var u=t[e]={exports:{}};return n[e](u,u.exports,r),u.exports}r.d=(n,t)=>{for(var e in t)r.o(t,e)&&!r.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})},r.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),r.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})};var e={};return(()=>{"use strict";function n(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.push.apply(r,e)}return r}function t(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?n(Object(e),!0).forEach((function(n){f(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):n(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function f(n,t,r){return(t=function(n){var t=function(n,t){if("object"!=typeof n||null===n)return n;var r=n[Symbol.toPrimitive];if(void 0!==r){var e=r.call(n,"string");if("object"!=typeof e)return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(n);return"symbol"==typeof t?t:String(t)}(t))in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}r.r(e),r.d(e,{TTag:()=>E,_:()=>z,addLocale:()=>T,c:()=>I,gettext:()=>M,jt:()=>H,msgid:()=>$,ngettext:()=>N,setDedent:()=>q,setDefaultLang:()=>B,t:()=>R,useLocale:()=>U,useLocales:()=>G});const u=function n(r){return e.withOptions=e=>n(t(t({},r),e)),e;function e(n,...t){const e="string"==typeof n?[n]:n.raw,{escapeSpecialCharacters:f=Array.isArray(n)}=r;let u="";for(let n=0;n<e.length;n++){let r=e[n];f&&(r=r.replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`").replace(/\\\$/g,"$").replace(/\\{/g,"{")),u+=r,n<t.length&&(u+=t[n])}const o=u.split("\n");let a=null;for(const n of o){const t=n.match(/^(\s+)\S+/);if(t){const n=t[1].length;a=a?Math.min(a,n):n}}if(null!==a){const n=a;u=o.map((t=>" "===t[0]||"\t"===t[0]?t.slice(n):t)).join("\n")}return u.trim().replace(/\\n/g,"\n")}}({});var o=r(429);function a(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var e,f,u,o,a=[],i=!0,c=!1;try{if(u=(r=r.call(n)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(e=u.call(r)).done)&&(a.push(e.value),a.length!==t);i=!0);}catch(n){c=!0,f=n}finally{try{if(!i&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(c)throw f}}return a}}(n,t)||function(n,t){if(n){if("string"==typeof n)return i(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(n,t):void 0}}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(n,t){(null==t||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}var c,s=function(n,t){for(var r=[],e=t.length,f=n.length,u=0;u<f;u++){var o=u<e?"${".concat(u,"}"):"";r.push(n[u]+o)}return r.join("")},l=function(){return{values:[],index:-1,toString:function(){return this.index=(this.index+1)%this.values.length,this.values[this.index].toString()}}},g=function(n){return n.replace(/\s/g,"")},d={},v=(c=function(n){return new RegExp("\\$\\{(?:[\\s]+?|\\s?)".concat(n,"(?:[\\s]+?|\\s?)}"))},function(n){return d[n]||(d[n]=c(n)),d[n]}),h=function(n,t){return t.reduce((function(n,t,r){return n.replace(v(r),t)}),n)},p=function(n,t){var r=t.length-1;return n.reduce((function(n,e,f){return n+e+(f<=r?t[f]:"")}),"")},m=function(n,t){return n.reduce((function(n,r,e){return void 0!==t[e]?n.concat(r,t[e]):n.concat(r)}),[])},y={},b=/\splural ?=?([\s\S]*);?/,w=/\$\{\s*([.\w+\[\]])*\s*\}/g;function L(n){for(var t=[],r=0,e=Object.entries(n);r<e.length;r++){var f=a(e[r],2),u=f[0];f[1],n.hasOwnProperty(u)&&t.push(u)}return t}function x(n,t){return n.replace(w,(function(n){return"${".concat(t[g(n)],"}")}))}function j(n){var t={},r=n.match(w);if(!r)return null;for(var e=0;e<r.length;e++){var f=g(r[e]);t[f]=t[f]||l(),t[f].values.push(e)}return t}function O(n){var t=j(n.msgid);if(!t)return n;var r={msgid:x(n.msgid,t)};n.msgid_plural&&(r.msgid_plural=x(n.msgid_plural,t)),r.msgstr=[];for(var e=n.msgstr,f=0;f<e.length;f++)r.msgstr.push(x(e[f],t));return r.comments=n.comments,r}function P(n,t){var r=j(n);return r?[x(n,r),t.map((function(n){return x(n,r)}))]:[n,t]}function S(){var n={locales:{},currentLocales:[],currentLocale:"en",dedent:!0,defaultLang:"en"};this.addLocale=function(t,r){if(r.translations)r=function(n){for(var t={},r=L(n.translations),e=0;e<r.length;e++){for(var f=r[e],u=n.translations[f],o={},a=L(u),i=0;i<a.length;i++){var c=O(u[a[i]]);o[c.msgid]=c}t[f]=o}return n.translations=t,n}(r);else{if(!r.contexts)throw new Error("Invalid locale data format");r=function(n){for(var t={headers:n.headers},r={},e=L(n.contexts),f=0;f<e.length;f++){for(var u=e[f],o={},i=L(n.contexts[u]),c=0;c<i.length;c++){var s=i[c],l=a(P(s,n.contexts[u][s]),2),g=l[0],d=l[1];o[g]=d}r[u]=o}return t.contexts=r,t}(r)}n.locales[t]=r},this.setCurrentLocale=function(t){n.currentLocale=t},this.setDedent=function(t){n.dedent=t},this.setCurrentLocales=function(t){n.currentLocales=t},this.getAvailLocales=function(){return n.locales},this.getCurrentLocales=function(){return n.currentLocales},this.getCurrentLocale=function(){return n.currentLocale},this.isDedent=function(){return n.dedent},this.setDefaultLang=function(t){n.defaultLang=t},this.getDefaultPluralFn=function(){return(0,o.getPluralFunc)(n.defaultLang)},this.getDefaultPluralFormsCount=function(){return(0,o.getNPlurals)(n.defaultLang)},this.getCurrentLocaleHeaders=function(){return n.locales[n.currentLocale].headers}}function D(n){this.getContext=function(){return n}}var k=function(n){return n instanceof D?n.getContext():""};function C(n){if(!n)return!1;for(var t=0;t<n.length;t++)if(!n[t].length)return!1;return!0}var A=/(\${\s*\d+\s*})/g,_=/\${\s*(\d+)\s*}/;function $(n){if(n&&n.reduce){for(var t=arguments.length,r=new Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];var f=new String(p(n,r));return f._strs=n,f._exprs=r,f}return n}function E(){var n=new S,t=function(t){return n.isDedent()?"string"!=typeof(r=t)||-1===r.indexOf("\n")?r:u(r):t;var r},r=function(t,r,e){var f,u=n.getAvailLocales()[t];if(!u)return null;if(u.translations){var o=u.translations[e]||u.translations[""],a=o&&o[r];if(a&&(!(f=a)||!f.comments||"fuzzy"!==f.comments.flag)&&C(a.msgstr))return a.msgstr}if(u.contexts){var i=u.contexts[e]||u.contexts[""],c=i&&i[r];if(c&&C(c))return c}return null},e=function(t,e){var f=n.getCurrentLocales();if(f.length)for(var u=0;u<f.length;u++){var o=r(f[u],t,e);if(o)return n.setCurrentLocale(f[u]),o}return r(n.getCurrentLocale(),t,e)};function f(n){var r=n;if(n&&n.reduce){for(var f=arguments.length,u=new Array(f>1?f-1:0),o=1;o<f;o++)u[o-1]=arguments[o];var a=t(s(n,u)),i=k(this),c=e(a,i);r=c?h(c[0],u):p(n,u)}return t(r)}function a(n){for(var r=arguments.length,f=new Array(r>1?r-1:0),u=1;u<r;u++)f[u-1]=arguments[u];if(n&&n.reduce){var o=t(s(n,f)),a=k(this),i=e(o,a);return i?i[0].split(A).map((function(n){var t=n.match(_);return t?f[+t[1]]:n})):m(n,f)}return n}function i(){for(var r=arguments.length,f=new Array(r),u=0;u<r;u++)f[u]=arguments[u];var a=t(s(f[0]._strs,f[0]._exprs)),i=f[f.length-1],c=f.slice(1,-1);c.unshift(f[0].toString());var l=e(a,k(this));if(l){var g=function(n){var t=n.getCurrentLocaleHeaders(),r=t.language||t.Language;if(r)return(0,o.getPluralFunc)(r);var e=function(n){var t=n["plural-forms"]||n["Plural-Forms"];if(!t)throw new Error('po. data should include "language" or "plural-form" header for ngettext');var r=b.exec(t)[1];return";"===r[r.length-1]&&(r=r.slice(0,-1)),r}(t);return function(n){var t=y[n];return t||(t=new Function("n","args",function(n){return"return args[+ (".concat(n,")];")}(n)),y[n]=t),t}(e)}(n);return t(h(g(i,l),f[0]._exprs))}var d=n.getDefaultPluralFn();return t(d(i,c))}function c(n){var t=k(this),r=e(n,t);return r?r[0]:n}return{_:c,addLocale:function(t,r){n.addLocale(t,r)},c:function(n){var t=new D(n);return{t:f.bind(t),jt:a.bind(t),gettext:c.bind(t),ngettext:i.bind(t)}},gettext:c,jt:a,ngettext:i,setDedent:function(t){n.setDedent(Boolean(t))},setDefaultLang:function(t){n.setDefaultLang(t)},t:f,useLocale:function(t){n.setCurrentLocale(t)},useLocales:function(t){n.setCurrentLocales(t)}}}var F=new E,z=F._,T=F.addLocale,I=F.c,M=F.gettext,H=F.jt,N=F.ngettext,q=F.setDedent,B=F.setDefaultLang,R=F.t,U=F.useLocale,G=F.useLocales})(),e})()));

/***/ }),

/***/ 66270:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable global-require */

if (true) {
    module.exports = __webpack_require__(78549);
} else {}


/***/ }),

/***/ 14834:
/***/ (function(module) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 54700:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(13191);
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 36827:
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 13191:
/***/ (function(module) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4990:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const PartytownSnippet = "/* Partytown 0.7.6 - MIT builder.io */\n!function(t,e,n,i,r,o,a,d,s,c,p,l){function u(){l||(l=1,\"/\"==(a=(o.lib||\"/~partytown/\")+(o.debug?\"debug/\":\"\"))[0]&&(s=e.querySelectorAll('script[type=\"text/partytown\"]'),i!=t?i.dispatchEvent(new CustomEvent(\"pt1\",{detail:t})):(d=setTimeout(f,1e4),e.addEventListener(\"pt0\",w),r?h(1):n.serviceWorker?n.serviceWorker.register(a+(o.swPath||\"partytown-sw.js\"),{scope:a}).then((function(t){t.active?h():t.installing&&t.installing.addEventListener(\"statechange\",(function(t){\"activated\"==t.target.state&&h()}))}),console.error):f())))}function h(t){c=e.createElement(t?\"script\":\"iframe\"),t||(c.setAttribute(\"style\",\"display:block;width:0;height:0;border:0;visibility:hidden\"),c.setAttribute(\"aria-hidden\",!0)),c.src=a+\"partytown-\"+(t?\"atomics.js?v=0.7.6\":\"sandbox-sw.html?\"+Date.now()),e.body.appendChild(c)}function f(n,r){for(w(),i==t&&(o.forward||[]).map((function(e){delete t[e.split(\".\")[0]]})),n=0;n<s.length;n++)(r=e.createElement(\"script\")).innerHTML=s[n].innerHTML,e.head.appendChild(r);c&&c.parentNode.removeChild(c)}function w(){clearTimeout(d)}o=t.partytown||{},i==t&&(o.forward||[]).map((function(e){p=t,e.split(\".\").map((function(e,n,i){p=p[i[n]]=n+1<i.length?\"push\"==i[n+1]?[]:p[i[n]]||{}:function(){(t._ptf=t._ptf||[]).push(i,arguments)}}))})),\"complete\"==e.readyState?u():(t.addEventListener(\"DOMContentLoaded\",u),t.addEventListener(\"load\",u))}(window,document,navigator,top,window.crossOriginIsolated);";

const createSnippet = (config, snippetCode) => {
    const { forward = [], ...filteredConfig } = config || {};
    const configStr = JSON.stringify(filteredConfig, (k, v) => {
        if (typeof v === 'function') {
            v = String(v);
            if (v.startsWith(k + '(')) {
                v = 'function ' + v;
            }
        }
        return v;
    });
    return [
        `!(function(w,p,f,c){`,
        Object.keys(filteredConfig).length > 0
            ? `c=w[p]=Object.assign(w[p]||{},${configStr});`
            : `c=w[p]=w[p]||{};`,
        `c[f]=(c[f]||[])`,
        forward.length > 0 ? `.concat(${JSON.stringify(forward)})` : ``,
        `})(window,'partytown','forward');`,
        snippetCode,
    ].join('');
};

/**
 * The `type` attribute for Partytown scripts, which does two things:
 *
 * 1. Prevents the `<script>` from executing on the main thread.
 * 2. Is used as a selector so the Partytown library can find all scripts to execute in a web worker.
 *
 * @public
 */
const SCRIPT_TYPE = `text/partytown`;

/**
 * Function that returns the Partytown snippet as a string, which can be
 * used as the innerHTML of the inlined Partytown script in the head.
 *
 * @public
 */
const partytownSnippet = (config) => createSnippet(config, PartytownSnippet);

exports.SCRIPT_TYPE = SCRIPT_TYPE;
exports.partytownSnippet = partytownSnippet;


/***/ }),

/***/ 52915:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(90918);
var tryToString = __webpack_require__(48884);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 99708:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(50337);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 61712:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(1618);
var toAbsoluteIndex = __webpack_require__(84645);
var lengthOfArrayLike = __webpack_require__(62699);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 35627:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 92760:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(15259);
var isCallable = __webpack_require__(90918);
var classofRaw = __webpack_require__(35627);
var wellKnownSymbol = __webpack_require__(11492);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 28215:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(54616);
var ownKeys = __webpack_require__(56950);
var getOwnPropertyDescriptorModule = __webpack_require__(7618);
var definePropertyModule = __webpack_require__(25312);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 4814:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(68251);
var definePropertyModule = __webpack_require__(25312);
var createPropertyDescriptor = __webpack_require__(74661);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 74661:
/***/ (function(module) {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 80211:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(90918);
var definePropertyModule = __webpack_require__(25312);
var makeBuiltIn = __webpack_require__(18844);
var defineGlobalProperty = __webpack_require__(88848);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 88848:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 68251:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(912);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 40060:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);
var isObject = __webpack_require__(50337);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 10847:
/***/ (function(module) {

"use strict";

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 71095:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);
var userAgent = __webpack_require__(10847);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 57172:
/***/ (function(module) {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 90887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);
var getOwnPropertyDescriptor = (__webpack_require__(7618).f);
var createNonEnumerableProperty = __webpack_require__(4814);
var defineBuiltIn = __webpack_require__(80211);
var defineGlobalProperty = __webpack_require__(88848);
var copyConstructorProperties = __webpack_require__(28215);
var isForced = __webpack_require__(70691);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 912:
/***/ (function(module) {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 13069:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(912);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 21510:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(13069);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 58581:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(68251);
var hasOwn = __webpack_require__(54616);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 7159:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(13069);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 7970:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);
var isCallable = __webpack_require__(90918);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 60251:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(52915);
var isNullOrUndefined = __webpack_require__(2124);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 97851:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);
var toObject = __webpack_require__(19766);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 29182:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 54616:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);
var toObject = __webpack_require__(19766);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 70614:
/***/ (function(module) {

"use strict";

module.exports = {};


/***/ }),

/***/ 10804:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(68251);
var fails = __webpack_require__(912);
var createElement = __webpack_require__(40060);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 80326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);
var fails = __webpack_require__(912);
var classof = __webpack_require__(35627);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 88491:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);
var isCallable = __webpack_require__(90918);
var store = __webpack_require__(33932);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 24456:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(3835);
var global = __webpack_require__(29182);
var isObject = __webpack_require__(50337);
var createNonEnumerableProperty = __webpack_require__(4814);
var hasOwn = __webpack_require__(54616);
var shared = __webpack_require__(33932);
var sharedKey = __webpack_require__(31750);
var hiddenKeys = __webpack_require__(70614);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 90918:
/***/ (function(module) {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 70691:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(912);
var isCallable = __webpack_require__(90918);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 2124:
/***/ (function(module) {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 50337:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(90918);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 51580:
/***/ (function(module) {

"use strict";

module.exports = false;


/***/ }),

/***/ 88379:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(50337);
var classof = __webpack_require__(35627);
var wellKnownSymbol = __webpack_require__(11492);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};


/***/ }),

/***/ 44878:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(7970);
var isCallable = __webpack_require__(90918);
var isPrototypeOf = __webpack_require__(31340);
var USE_SYMBOL_AS_UID = __webpack_require__(23003);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 62699:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(55861);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 18844:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);
var fails = __webpack_require__(912);
var isCallable = __webpack_require__(90918);
var hasOwn = __webpack_require__(54616);
var DESCRIPTORS = __webpack_require__(68251);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(58581).CONFIGURABLE);
var inspectSource = __webpack_require__(88491);
var InternalStateModule = __webpack_require__(24456);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 32436:
/***/ (function(module) {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 25312:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(68251);
var IE8_DOM_DEFINE = __webpack_require__(10804);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(85065);
var anObject = __webpack_require__(99708);
var toPropertyKey = __webpack_require__(1322);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7618:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(68251);
var call = __webpack_require__(21510);
var propertyIsEnumerableModule = __webpack_require__(2674);
var createPropertyDescriptor = __webpack_require__(74661);
var toIndexedObject = __webpack_require__(1618);
var toPropertyKey = __webpack_require__(1322);
var hasOwn = __webpack_require__(54616);
var IE8_DOM_DEFINE = __webpack_require__(10804);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 76727:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(56233);
var enumBugKeys = __webpack_require__(57172);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 22766:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 31340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 56233:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);
var hasOwn = __webpack_require__(54616);
var toIndexedObject = __webpack_require__(1618);
var indexOf = (__webpack_require__(61712).indexOf);
var hiddenKeys = __webpack_require__(70614);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 2674:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 5665:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(21510);
var isCallable = __webpack_require__(90918);
var isObject = __webpack_require__(50337);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 56950:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(7970);
var uncurryThis = __webpack_require__(7159);
var getOwnPropertyNamesModule = __webpack_require__(76727);
var getOwnPropertySymbolsModule = __webpack_require__(22766);
var anObject = __webpack_require__(99708);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 15594:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(99708);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 32427:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(21510);
var hasOwn = __webpack_require__(54616);
var isPrototypeOf = __webpack_require__(31340);
var regExpFlags = __webpack_require__(15594);

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
};


/***/ }),

/***/ 20651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isNullOrUndefined = __webpack_require__(2124);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 31750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var shared = __webpack_require__(57444);
var uid = __webpack_require__(9799);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 33932:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IS_PURE = __webpack_require__(51580);
var globalThis = __webpack_require__(29182);
var defineGlobalProperty = __webpack_require__(88848);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.36.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 57444:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var store = __webpack_require__(33932);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 4882:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(71095);
var fails = __webpack_require__(912);
var global = __webpack_require__(29182);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 84645:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(69486);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 1618:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(80326);
var requireObjectCoercible = __webpack_require__(20651);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 69486:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var trunc = __webpack_require__(32436);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 55861:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(69486);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 19766:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var requireObjectCoercible = __webpack_require__(20651);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 4304:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(21510);
var isObject = __webpack_require__(50337);
var isSymbol = __webpack_require__(44878);
var getMethod = __webpack_require__(60251);
var ordinaryToPrimitive = __webpack_require__(5665);
var wellKnownSymbol = __webpack_require__(11492);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 1322:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(4304);
var isSymbol = __webpack_require__(44878);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 15259:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(11492);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 17172:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(92760);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 48884:
/***/ (function(module) {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9799:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7159);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 23003:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4882);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 85065:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(68251);
var fails = __webpack_require__(912);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 3835:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);
var isCallable = __webpack_require__(90918);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 11492:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(29182);
var shared = __webpack_require__(57444);
var hasOwn = __webpack_require__(54616);
var uid = __webpack_require__(9799);
var NATIVE_SYMBOL = __webpack_require__(4882);
var USE_SYMBOL_AS_UID = __webpack_require__(23003);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 63741:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(90887);
var call = __webpack_require__(21510);
var uncurryThis = __webpack_require__(7159);
var requireObjectCoercible = __webpack_require__(20651);
var isCallable = __webpack_require__(90918);
var isNullOrUndefined = __webpack_require__(2124);
var isRegExp = __webpack_require__(88379);
var toString = __webpack_require__(17172);
var getMethod = __webpack_require__(60251);
var getRegExpFlags = __webpack_require__(32427);
var getSubstitution = __webpack_require__(97851);
var wellKnownSymbol = __webpack_require__(11492);
var IS_PURE = __webpack_require__(51580);

var REPLACE = wellKnownSymbol('replace');
var $TypeError = TypeError;
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (!isNullOrUndefined(searchValue)) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) {
        return call(replacer, searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return replace(toString(O), searchValue, replaceValue);
      }
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = indexOf(string, searchString);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});


/***/ }),

/***/ 1642:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
__webpack_require__(63741);


/***/ }),

/***/ 32371:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ _inheritsLoose; }
});

;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

/***/ }),

/***/ 15553:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ _toConsumableArray; }
});

;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ../../node_modules/.pnpm/@babel+runtime@7.24.4/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

/***/ }),

/***/ 80712:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_1___namespace_cache;
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UU: function() { return /* binding */ I; },
/* harmony export */   _P: function() { return /* binding */ O; },
/* harmony export */   cn: function() { return /* reexport safe */ unleash_proxy_client__WEBPACK_IMPORTED_MODULE_0__.cn; },
/* harmony export */   rn: function() { return /* binding */ K; }
/* harmony export */ });
/* unused harmony exports FlagContext, default, useFlags, useFlagsStatus, useUnleashClient, useUnleashContext */
/* harmony import */ var unleash_proxy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80992);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11855);




const f = react__WEBPACK_IMPORTED_MODULE_1__.createContext(null), A = {
  bootstrap: [],
  disableRefresh: !0,
  disableMetrics: !0,
  url: "http://localhost",
  appName: "offline",
  clientKey: "not-used"
}, P = "startTransition", v = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_1___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_1___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_1__, 2)))[P] || ((e) => e()), I = ({
  config: e,
  children: t,
  unleashClient: o,
  startClient: s = !0
}) => {
  const c = e || A, r = react__WEBPACK_IMPORTED_MODULE_1__.useRef(
    o || new unleash_proxy_client__WEBPACK_IMPORTED_MODULE_0__/* .UnleashClient */ .cn(c)
  ), [l, u] = react__WEBPACK_IMPORTED_MODULE_1__.useState(
    !!(o ? e != null && e.bootstrap && (e == null ? void 0 : e.bootstrapOverride) !== !1 : c.bootstrap && c.bootstrapOverride !== !1)
  ), [n, b] = react__WEBPACK_IMPORTED_MODULE_1__.useState(null);
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    !c && !o && console.error(
      `You must provide either a config or an unleash client to the flag provider.
        If you are initializing the client in useEffect, you can avoid this warning
        by checking if the client exists before rendering.`
    );
    const a = (y) => {
      v(() => {
        b((U) => U || y);
      });
    }, g = (y) => {
      v(() => {
        b(null);
      });
    };
    let p;
    const x = () => {
      p = setTimeout(() => {
        v(() => {
          u(!0);
        });
      }, 0);
    };
    return r.current.on("ready", x), r.current.on("error", a), r.current.on("recovered", g), s && (r.current.stop(), r.current.start()), function() {
      r.current && (r.current.off("error", a), r.current.off("ready", x), r.current.off("recovered", g), r.current.stop()), p && clearTimeout(p);
    };
  }, []);
  const F = async (a) => {
    await r.current.updateContext(a);
  }, m = (a) => r.current.isEnabled(a), T = (a) => r.current.getVariant(a), S = (a, g, p) => r.current.on(a, g, p), H = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
    () => ({
      on: S,
      updateContext: F,
      isEnabled: m,
      getVariant: T,
      client: r.current,
      flagsReady: l,
      flagsError: n,
      setFlagsReady: u,
      setFlagsError: b
    }),
    [l, n]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.createElement(f.Provider, { value: H }, t);
}, O = (e) => {
  const { isEnabled: t, client: o } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(f), [s, c] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!!t(e)), r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  return r.current = s, (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!o)
      return;
    const l = () => {
      const n = t(e);
      n !== r.current && (r.current = n, c(!!n));
    }, u = () => {
      const n = t(e);
      r.current = n, c(n);
    };
    return o.on("update", l), o.on("ready", u), () => {
      o.off("update", l), o.off("ready", u);
    };
  }, [o]), s;
}, z = () => {
  const { client: e } = i(f), [t, o] = h(e.getAllToggles());
  return E(() => {
    const s = () => {
      o(e.getAllToggles());
    };
    return e.on("update", s), () => {
      e.off("update", s);
    };
  }, []), t;
}, B = () => {
  const { flagsReady: e, flagsError: t } = i(f);
  return { flagsReady: e, flagsError: t };
}, C = (e, t) => {
  var s, c, r, l;
  return !(e.name === (t == null ? void 0 : t.name) && e.enabled === (t == null ? void 0 : t.enabled) && e.feature_enabled === (t == null ? void 0 : t.feature_enabled) && ((s = e.payload) == null ? void 0 : s.type) === ((c = t == null ? void 0 : t.payload) == null ? void 0 : c.type) && ((r = e.payload) == null ? void 0 : r.value) === ((l = t == null ? void 0 : t.payload) == null ? void 0 : l.value));
}, K = (e) => {
  const { getVariant: t, client: o } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(f), [s, c] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(t(e)), r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    name: s.name,
    enabled: s.enabled
  });
  return r.current = s, (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!o)
      return;
    const l = () => {
      const n = t(e);
      C(r.current, n) && (c(n), r.current = n);
    }, u = () => {
      const n = t(e);
      r.current.name = n == null ? void 0 : n.name, r.current.enabled = n == null ? void 0 : n.enabled, c(n);
    };
    return o.on("update", l), o.on("ready", u), () => {
      o.off("update", l), o.off("ready", u);
    };
  }, [o]), s || {};
}, L = () => {
  const { updateContext: e } = i(f);
  return e;
}, Y = () => {
  const { client: e } = i(f);
  return e;
};

//# sourceMappingURL=unleash-react.js.map


/***/ }),

/***/ 3977:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N_: function() { return /* binding */ E; },
/* harmony export */   Rr: function() { return /* binding */ a; },
/* harmony export */   oo: function() { return /* binding */ g; }
/* harmony export */ });
/* unused harmony exports withAssetPrefix, withPrefix */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5821);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98855);
/* harmony import */ var gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20128);
"use client"
;function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}function a(t){let e=t||"/",n="",r="";const o=e.indexOf("#");-1!==o&&(r=e.slice(o),e=e.slice(0,o));const s=e.indexOf("?");return-1!==s&&(n=e.slice(s),e=e.slice(0,s)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r}}const c=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=t=>{if("string"==typeof t)return!(t=>c.test(t))(t)},p=()=> false?0:"",h=()=> false?0:"";function f(t,e=p()){var n;if(!l(t))return t;if(t.startsWith("./")||t.startsWith("../"))return t;const r=null!=(n=null!=e?e:h())?n:"/";return`${null!=r&&r.endsWith("/")?r.slice(0,-1):r}${t.startsWith("/")?t:`/${t}`}`}const u=t=>null==t?void 0:t.startsWith("/"),_=()=> true?"never":0;function d(t,e){const{pathname:n,search:r,hash:o}=a(t);return`${(0,gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__/* .applyTrailingSlashOption */ .T)(n,e)}${r}${o}`}const m=(t,e)=>"number"==typeof t?t:l(t)?u(t)?function(t){const e=f(t),n=_();return"always"===n||"never"===n?d(e,n):e}(t):function(t,e){if(u(t))return t;const r=_(),o=(0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.resolve)(t,e);return"always"===r||"never"===r?d(o,r):o}(t,e):t,y=["to","getProps","onClick","onMouseEnter","activeClassName","activeStyle","innerRef","partiallyActive","state","replace","_location"];function v(t){return f(t,h())}const b={activeClassName:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,activeStyle:prop_types__WEBPACK_IMPORTED_MODULE_3__.object,partiallyActive:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool};function w(t){/*#__PURE__*/return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Location,null,({location:n})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(P,i({},t,{_location:n})))}class P extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(t){super(t),this.defaultGetProps=({isPartiallyCurrent:t,isCurrent:e})=>(this.props.partiallyActive?t:e)?{className:[this.props.className,this.props.activeClassName].filter(Boolean).join(" "),style:i({},this.props.style,this.props.activeStyle)}:null;let e=!1;"undefined"!=typeof window&&window.IntersectionObserver&&(e=!0),this.state={IOSupported:e},this.abortPrefetch=null,this.handleRef=this.handleRef.bind(this)}_prefetch(){let t=window.location.pathname+window.location.search;this.props._location&&this.props._location.pathname&&(t=this.props._location.pathname+this.props._location.search);const e=a(m(this.props.to,t)),n=e.pathname+e.search;if(t!==n)return ___loader.enqueue(n)}componentWillUnmount(){if(!this.io)return;const{instance:t,el:e}=this.io;this.abortPrefetch&&this.abortPrefetch.abort(),t.unobserve(e),t.disconnect()}handleRef(t){this.props.innerRef&&Object.prototype.hasOwnProperty.call(this.props.innerRef,"current")?this.props.innerRef.current=t:this.props.innerRef&&this.props.innerRef(t),this.state.IOSupported&&t&&(this.io=((t,e)=>{const n=new window.IntersectionObserver(n=>{n.forEach(n=>{t===n.target&&e(n.isIntersecting||n.intersectionRatio>0)})});return n.observe(t),{instance:n,el:t}})(t,t=>{t?this.abortPrefetch=this._prefetch():this.abortPrefetch&&this.abortPrefetch.abort()}))}render(){const t=this.props,{to:n,getProps:r=this.defaultGetProps,onClick:s,onMouseEnter:c,state:p,replace:h,_location:f}=t,u=function(t,e){if(null==t)return{};var n,r,o={},s=Object.keys(t);for(r=0;r<s.length;r++)e.indexOf(n=s[r])>=0||(o[n]=t[n]);return o}(t,y); true||0;const _=m(n,f.pathname);return l(_)?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Link,i({to:_,state:p,getProps:r,innerRef:this.handleRef,onMouseEnter:t=>{c&&c(t);const e=a(_);___loader.hovering(e.pathname+e.search)},onClick:t=>{if(s&&s(t),!(0!==t.button||this.props.target||t.defaultPrevented||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)){t.preventDefault();let e=h;const n=encodeURI(_)===f.pathname;"boolean"!=typeof h&&n&&(e=!0),window.___navigate(_,{state:p,replace:e})}return!0}},u)):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",i({href:_},u))}}P.propTypes=i({},b,{onClick:prop_types__WEBPACK_IMPORTED_MODULE_3__.func,to:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,replace:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,state:prop_types__WEBPACK_IMPORTED_MODULE_3__.object});const E=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((t,n)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(w,i({innerRef:n},t))),g=(t,e)=>{window.___navigate(m(t,window.location.pathname),e)};
//# sourceMappingURL=index.modern.mjs.map


/***/ }),

/***/ 68736:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Script: function() { return /* binding */ f; },
/* harmony export */   ScriptStrategy: function() { return /* binding */ c; },
/* harmony export */   collectedScriptsByPage: function() { return /* binding */ l; },
/* harmony export */   scriptCache: function() { return /* binding */ u; },
/* harmony export */   scriptCallbackCache: function() { return /* binding */ d; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11855);
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98855);
"use client"
;function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o.apply(this,arguments)}const a=new Map,l={get:t=>a.get(t)||[],set(t,e){const n=a.get(t)||[];n.push(e),a.set(t,n)},delete(t){a.delete(t)}},s="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(t){const e=Date.now();return setTimeout(function(){t({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-e))}})},1)};var c;!function(t){t.postHydrate="post-hydrate",t.idle="idle",t.offMainThread="off-main-thread"}(c||(c={}));const i=new Set(["src","strategy","dangerouslySetInnerHTML","children","onLoad","onError"]),u=new Set,d=new Map;function f(e){/*#__PURE__*/return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Location,null,()=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(p,e))}function p(n){const{src:a,strategy:i=c.postHydrate}=n||{},{pathname:u}=(0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.useLocation)();if((0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{let t;switch(i){case c.postHydrate:t=y(n);break;case c.idle:s(()=>{t=y(n)});break;case c.offMainThread:{const t=b(n);l.set(u,t)}}return()=>{const{script:e,loadCallback:n,errorCallback:r}=t||{};n&&(null==e||e.removeEventListener("load",n)),r&&(null==e||e.removeEventListener("error",r)),null==e||e.remove()}},[]),i===c.offMainThread){const e=m(n),r=b(n);return"undefined"==typeof window&&l.set(u,r),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("script",e?o({type:"text/partytown","data-strategy":i,crossOrigin:"anonymous"},r,{dangerouslySetInnerHTML:{__html:m(n)}}):o({type:"text/partytown",src:h(a),"data-strategy":i,crossOrigin:"anonymous"},r))}return null}function y(t){const{id:e,src:n,strategy:r=c.postHydrate,onLoad:a,onError:l}=t||{},s=e||n,i=["load","error"],f={load:a,error:l};if(s){for(const t of i)if(null!=f&&f[t]){var p;const e=d.get(s)||{},{callbacks:n=[]}=(null==e?void 0:e[t])||{};var y,h;n.push(null==f?void 0:f[t]),null!=e&&null!=(p=e[t])&&p.event?null==f||null==(y=f[t])||y.call(f,null==e||null==(h=e[t])?void 0:h.event):d.set(s,o({},e,{[t]:{callbacks:n}}))}if(u.has(s))return null}const v=m(t),k=b(t),w=document.createElement("script");e&&(w.id=e),w.dataset.strategy=r;for(const[t,e]of Object.entries(k))w.setAttribute(t,e);v&&(w.textContent=v),n&&(w.src=n);const C={};if(s){for(const t of i){const e=e=>g(e,s,t);w.addEventListener(t,e),C[`${t}Callback`]=e}u.add(s)}return document.body.appendChild(w),{script:w,loadCallback:C.loadCallback,errorCallback:C.errorCallback}}function m(t){const{dangerouslySetInnerHTML:e,children:n=""}=t||{},{__html:r=""}=e||{};return r||n}function b(t){const e={};for(const[n,r]of Object.entries(t))i.has(n)||(e[n]=r);return e}function h(t){if(t)return`/__third-party-proxy?url=${encodeURIComponent(t)}`}function g(t,e,n){const r=d.get(e)||{};for(const e of(null==r||null==(o=r[n])?void 0:o.callbacks)||[]){var o;e(t)}d.set(e,{[n]:{event:t}})}
//# sourceMappingURL=index.modern.mjs.map


/***/ }),

/***/ 80992:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: function() { return /* binding */ k; }
/* harmony export */ });
/* unused harmony exports EVENTS, InMemoryStorageProvider, LocalStorageProvider, resolveFetch */
var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};var e=function(){return e=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},e.apply(this,arguments)};function r(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function a(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))}function n(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(c){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}"function"==typeof SuppressedError&&SuppressedError;var o={exports:{}};function i(){}i.prototype={on:function(t,e,r){var n=this.e||(this.e={});return(n[t]||(n[t]=[])).push({fn:e,ctx:r}),this},once:function(t,e,r){var n=this;function o(){n.off(t,o),e.apply(r,arguments)}return o._=e,this.on(t,o,r)},emit:function(t){for(var e=[].slice.call(arguments,1),r=((this.e||(this.e={}))[t]||[]).slice(),n=0,o=r.length;n<o;n++)r[n].fn.apply(r[n].ctx,e);return this},off:function(t,e){var r=this.e||(this.e={}),n=r[t],o=[];if(n&&e)for(var i=0,s=n.length;i<s;i++)n[i].fn!==e&&n[i].fn._!==e&&o.push(n[i]);return o.length?r[t]=o:delete r[t],this}},o.exports=i;var s=o.exports.TinyEmitter=i,a=function(t){var e=t[1];return null!=e},c=function(){},u=function(){function t(t){var e=t.onError,r=t.onSent,n=t.appName,o=t.metricsInterval,i=t.disableMetrics,s=void 0!==i&&i,a=t.url,u=t.clientKey,h=t.fetch,l=t.headerName,p=t.customHeaders,f=void 0===p?{}:p;this.onError=e,this.onSent=r||c,this.disabled=s,this.metricsInterval=1e3*o,this.appName=n,this.url=a instanceof URL?a:new URL(a),this.clientKey=u,this.bucket=this.createEmptyBucket(),this.fetch=h,this.headerName=l,this.customHeaders=f}return t.prototype.start=function(){var t=this;if(this.disabled)return!1;"number"==typeof this.metricsInterval&&this.metricsInterval>0&&setTimeout((function(){t.startTimer(),t.sendMetrics()}),2e3)},t.prototype.stop=function(){this.timer&&(clearTimeout(this.timer),delete this.timer)},t.prototype.createEmptyBucket=function(){return{start:new Date,stop:null,toggles:{}}},t.prototype.getHeaders=function(){var t,e=((t={})[this.headerName]=this.clientKey,t.Accept="application/json",t["Content-Type"]="application/json",t);return Object.entries(this.customHeaders).filter(a).forEach((function(t){var r=t[0],n=t[1];return e[r]=n})),e},t.prototype.sendMetrics=function(){return r(this,void 0,void 0,(function(){var t,e,r;return n(this,(function(n){switch(n.label){case 0:if(t="".concat(this.url,"/client/metrics"),e=this.getPayload(),this.bucketIsEmpty(e))return[2];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this.fetch(t,{cache:"no-cache",method:"POST",headers:this.getHeaders(),body:JSON.stringify(e)})];case 2:return n.sent(),this.onSent(e),[3,4];case 3:return r=n.sent(),console.error("Unleash: unable to send feature metrics",r),this.onError(r),[3,4];case 4:return[2]}}))}))},t.prototype.count=function(t,e){return!(this.disabled||!this.bucket)&&(this.assertBucket(t),this.bucket.toggles[t][e?"yes":"no"]++,!0)},t.prototype.countVariant=function(t,e){return!(this.disabled||!this.bucket)&&(this.assertBucket(t),this.bucket.toggles[t].variants[e]?this.bucket.toggles[t].variants[e]+=1:this.bucket.toggles[t].variants[e]=1,!0)},t.prototype.assertBucket=function(t){if(this.disabled||!this.bucket)return!1;this.bucket.toggles[t]||(this.bucket.toggles[t]={yes:0,no:0,variants:{}})},t.prototype.startTimer=function(){var t=this;this.timer=setInterval((function(){t.sendMetrics()}),this.metricsInterval)},t.prototype.bucketIsEmpty=function(t){return 0===Object.keys(t.bucket.toggles).length},t.prototype.getPayload=function(){var t=e(e({},this.bucket),{stop:new Date});return this.bucket=this.createEmptyBucket(),{bucket:t,appName:this.appName,instanceId:"browser"}},t}(),h=function(){function t(){this.store=new Map}return t.prototype.save=function(t,e){return r(this,void 0,void 0,(function(){return n(this,(function(r){return this.store.set(t,e),[2]}))}))},t.prototype.get=function(t){return r(this,void 0,void 0,(function(){return n(this,(function(e){return[2,this.store.get(t)]}))}))},t}(),l=function(){function t(){this.prefix="unleash:repository"}return t.prototype.save=function(t,e){return r(this,void 0,void 0,(function(){var r,o;return n(this,(function(n){r=JSON.stringify(e),o="".concat(this.prefix,":").concat(t);try{window.localStorage.setItem(o,r)}catch(t){console.error(t)}return[2]}))}))},t.prototype.get=function(t){try{var e="".concat(this.prefix,":").concat(t),r=window.localStorage.getItem(e);return r?JSON.parse(r):void 0}catch(t){console.error(t)}},t}();let p;const f=new Uint8Array(16);function d(){if(!p&&(p="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!p))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return p(f)}const v=[];for(let t=0;t<256;++t)v.push((t+256).toString(16).slice(1));var m={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function y(t,e,r){if(m.randomUUID&&!e&&!t)return m.randomUUID();const n=(t=t||{}).random||(t.rng||d)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e){r=r||0;for(let t=0;t<16;++t)e[r+t]=n[t];return e}return function(t,e=0){return v[t[e+0]]+v[t[e+1]]+v[t[e+2]]+v[t[e+3]]+"-"+v[t[e+4]]+v[t[e+5]]+"-"+v[t[e+6]]+v[t[e+7]]+"-"+v[t[e+8]]+v[t[e+9]]+"-"+v[t[e+10]]+v[t[e+11]]+v[t[e+12]]+v[t[e+13]]+v[t[e+14]]+v[t[e+15]]}(n)}var g=function(){function t(){}return t.prototype.generateEventId=function(){return y()},t.prototype.createImpressionEvent=function(t,r,n,o,i,s){var a=this.createBaseEvent(t,r,n,o,i);return s?e(e({},a),{variant:s}):a},t.prototype.createBaseEvent=function(t,e,r,n,o){return{eventType:n,eventId:this.generateEventId(),context:t,enabled:e,featureName:r,impressionData:o}},t}(),b=["userId","sessionId","remoteAddress","currentTime"],w=function(t){return b.includes(t)},E={INIT:"initialized",ERROR:"error",READY:"ready",UPDATE:"update",IMPRESSION:"impression",SENT:"sent",RECOVERED:"recovered"},I="isEnabled",S="getVariant",x={name:"disabled",enabled:!1,feature_enabled:!1},T="repo",R=function(){try{if("undefined"!=typeof window&&"fetch"in window)return fetch.bind(window);if("fetch"in globalThis)return fetch.bind(globalThis)}catch(t){console.error('Unleash failed to resolve "fetch"',t)}},k=function(o){function i(t){var r=t.storageProvider,n=t.url,i=t.clientKey,s=t.disableRefresh,a=void 0!==s&&s,c=t.refreshInterval,p=void 0===c?30:c,f=t.metricsInterval,d=void 0===f?30:f,v=t.disableMetrics,m=void 0!==v&&v,y=t.appName,b=t.environment,w=void 0===b?"default":b,I=t.context,S=t.fetch,x=void 0===S?R():S,T=t.createAbortController,k=void 0===T?function(){try{if("undefined"!=typeof window&&"AbortController"in window)return function(){return new window.AbortController};if("fetch"in globalThis)return function(){return new globalThis.AbortController}}catch(t){console.error('Unleash failed to resolve "AbortController" factory',t)}}():T,O=t.bootstrap,N=t.bootstrapOverride,A=void 0===N||N,D=t.headerName,C=void 0===D?"Authorization":D,U=t.customHeaders,P=void 0===U?{}:U,j=t.impressionDataAll,H=void 0!==j&&j,M=t.usePOSTrequests,_=void 0!==M&&M,K=o.call(this)||this;if(K.toggles=[],K.etag="",K.readyEventEmitted=!1,K.usePOSTrequests=!1,K.started=!1,!n)throw new Error("url is required");if(!i)throw new Error("clientKey is required");if(!y)throw new Error("appName is required.");return K.eventsHandler=new g,K.impressionDataAll=H,K.toggles=O&&O.length>0?O:[],K.url=n instanceof URL?n:new URL(n),K.clientKey=i,K.headerName=C,K.customHeaders=P,K.storage=r||("undefined"!=typeof window?new l:new h),K.refreshInterval=a?0:1e3*p,K.context=e({appName:y,environment:w},I),K.usePOSTrequests=_,K.sdkState="initializing",K.ready=new Promise((function(t){K.init().then(t).catch((function(e){console.error(e),K.sdkState="error",K.emit(E.ERROR,e),t()}))})),x||console.error('Unleash: You must either provide your own "fetch" implementation or run in an environment where "fetch" is available.'),k||console.error('Unleash: You must either provide your own "AbortController" implementation or run in an environment where "AbortController" is available.'),K.fetch=x,K.createAbortController=k,K.bootstrap=O&&O.length>0?O:void 0,K.bootstrapOverride=A,K.metrics=new u({onError:K.emit.bind(K,E.ERROR),onSent:K.emit.bind(K,E.SENT),appName:y,metricsInterval:d,disableMetrics:m,url:K.url,clientKey:i,fetch:x,headerName:C,customHeaders:P}),K}return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}(i,o),i.prototype.getAllToggles=function(){return function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))}([],this.toggles,!0)},i.prototype.isEnabled=function(t){var e,r=this.toggles.find((function(e){return e.name===t})),n=!!r&&r.enabled;if(this.metrics.count(t,n),(null==r?void 0:r.impressionData)||this.impressionDataAll){var o=this.eventsHandler.createImpressionEvent(this.context,n,t,I,null!==(e=null==r?void 0:r.impressionData)&&void 0!==e?e:void 0);this.emit(E.IMPRESSION,o)}return n},i.prototype.getVariant=function(t){var r,n=this.toggles.find((function(e){return e.name===t})),o=(null==n?void 0:n.enabled)||!1,i=n?n.variant:x;if(i.name&&this.metrics.countVariant(t,i.name),this.metrics.count(t,o),(null==n?void 0:n.impressionData)||this.impressionDataAll){var s=this.eventsHandler.createImpressionEvent(this.context,o,t,S,null!==(r=null==n?void 0:n.impressionData)&&void 0!==r?r:void 0,i.name);this.emit(E.IMPRESSION,s)}return e(e({},i),{feature_enabled:o})},i.prototype.updateToggles=function(){return r(this,void 0,void 0,(function(){var t=this;return n(this,(function(e){switch(e.label){case 0:return this.timerRef||this.readyEventEmitted?[4,this.fetchToggles()]:[3,2];case 1:return e.sent(),[3,4];case 2:return this.started?[4,new Promise((function(e){var r=function(){t.fetchToggles().then((function(){t.off(E.READY,r),e()}))};t.once(E.READY,r)}))]:[3,4];case 3:e.sent(),e.label=4;case 4:return[2]}}))}))},i.prototype.updateContext=function(t){return r(this,void 0,void 0,(function(){var r;return n(this,(function(n){switch(n.label){case 0:return(t.appName||t.environment)&&console.warn("appName and environment are static. They can't be updated with updateContext."),r={environment:this.context.environment,appName:this.context.appName,sessionId:this.context.sessionId},this.context=e(e({},r),t),[4,this.updateToggles()];case 1:return n.sent(),[2]}}))}))},i.prototype.getContext=function(){return e({},this.context)},i.prototype.setContextField=function(t,r){var n,o;if(w(t))this.context=e(e({},this.context),((n={})[t]=r,n));else{var i=e(e({},this.context.properties),((o={})[t]=r,o));this.context=e(e({},this.context),{properties:i})}this.updateToggles()},i.prototype.removeContextField=function(t){var r;w(t)?this.context=e(e({},this.context),((r={})[t]=void 0,r)):"object"==typeof this.context.properties&&delete this.context.properties[t],this.updateToggles()},i.prototype.init=function(){return r(this,void 0,void 0,(function(){var t,r;return n(this,(function(n){switch(n.label){case 0:return[4,this.resolveSessionId()];case 1:return t=n.sent(),this.context=e({sessionId:t},this.context),r=this,[4,this.storage.get(T)];case 2:return r.toggles=n.sent()||[],!this.bootstrap||!this.bootstrapOverride&&0!==this.toggles.length?[3,4]:[4,this.storage.save(T,this.bootstrap)];case 3:n.sent(),this.toggles=this.bootstrap,this.emit(E.READY),n.label=4;case 4:return this.sdkState="healthy",this.emit(E.INIT),[2]}}))}))},i.prototype.start=function(){return r(this,void 0,void 0,(function(){var t,e=this;return n(this,(function(r){switch(r.label){case 0:return this.started=!0,this.timerRef?(console.error("Unleash SDK has already started, if you want to restart the SDK you should call client.stop() before starting again."),[2]):[4,this.ready];case 1:return r.sent(),this.metrics.start(),t=this.refreshInterval,[4,this.fetchToggles()];case 2:return r.sent(),t>0&&(this.timerRef=setInterval((function(){return e.fetchToggles()}),t)),[2]}}))}))},i.prototype.stop=function(){this.timerRef&&(clearInterval(this.timerRef),this.timerRef=void 0),this.metrics.stop()},i.prototype.resolveSessionId=function(){return r(this,void 0,void 0,(function(){var t;return n(this,(function(e){switch(e.label){case 0:return this.context.sessionId?[2,this.context.sessionId]:[4,this.storage.get("sessionId")];case 1:return(t=e.sent())?[3,3]:(t=Math.floor(1e9*Math.random()),[4,this.storage.save("sessionId",t)]);case 2:e.sent(),e.label=3;case 3:return[2,t]}}))}))},i.prototype.getHeaders=function(){var t,e=this.usePOSTrequests,r=((t={})[this.headerName]=this.clientKey,t.Accept="application/json",t);return e&&(r["Content-Type"]="application/json"),this.etag&&(r["If-None-Match"]=this.etag),Object.entries(this.customHeaders).filter(a).forEach((function(t){var e=t[0],n=t[1];return r[e]=n})),r},i.prototype.storeToggles=function(t){return r(this,void 0,void 0,(function(){return n(this,(function(e){switch(e.label){case 0:return this.toggles=t,this.emit(E.UPDATE),[4,this.storage.save(T,t)];case 1:return e.sent(),[2]}}))}))},i.prototype.fetchToggles=function(){return r(this,void 0,void 0,(function(){var t,e,r,o,i,s,c,u;return n(this,(function(n){switch(n.label){case 0:if(!this.fetch)return[3,9];this.abortController&&this.abortController.abort(),this.abortController=this.createAbortController&&this.createAbortController(),t=this.abortController?this.abortController.signal:void 0,n.label=1;case 1:return n.trys.push([1,7,8,9]),e=this.usePOSTrequests,r=e?this.url:function(t,e){var r=new URL(t.toString());return Object.entries(e).filter(a).forEach((function(t){var e=t[0],n=t[1];"properties"===e&&n?Object.entries(n).filter(a).forEach((function(t){var e=t[0],n=t[1];return r.searchParams.append("properties[".concat(e,"]"),n)})):r.searchParams.append(e,n)})),r}(this.url,this.context),o=e?"POST":"GET",i=e?JSON.stringify({context:this.context}):void 0,[4,this.fetch(r.toString(),{method:o,cache:"no-cache",headers:this.getHeaders(),body:i,signal:t})];case 2:return s=n.sent(),"error"===this.sdkState&&s.status<400&&(this.sdkState="healthy",this.emit(E.RECOVERED)),s.ok&&304!==s.status?(this.etag=s.headers.get("ETag")||"",[4,s.json()]):[3,5];case 3:return c=n.sent(),[4,this.storeToggles(c.toggles)];case 4:return n.sent(),"healthy"!==this.sdkState&&(this.sdkState="healthy"),this.bootstrap||this.readyEventEmitted||(this.emit(E.READY),this.readyEventEmitted=!0),[3,6];case 5:s.ok||304===s.status||(console.error("Unleash: Fetching feature toggles did not have an ok response"),this.sdkState="error",this.emit(E.ERROR,{type:"HttpError",code:s.status})),n.label=6;case 6:return[3,9];case 7:return u=n.sent(),console.error("Unleash: unable to fetch feature toggles",u),this.sdkState="error",this.emit(E.ERROR,u),[3,9];case 8:return this.abortController=null,[7];case 9:return[2]}}))}))},i}(s);
//# sourceMappingURL=main.esm.js.map


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [1869,6593], function() { return __webpack_exec__(82894); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);