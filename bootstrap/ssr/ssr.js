import { ref, shallowRef, defineComponent, markRaw, h, onMounted, onUnmounted, computed, createSSRApp, reactive, watch } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createHeadManager, router, mergeDataIntoQueryString, shouldIntercept, setupProgress } from "@inertiajs/core";
import { cloneDeep, isEqual } from "es-toolkit";
import { has, set, get } from "es-toolkit/compat";
import createServer from "@inertiajs/core/server";
import { stringify, parse } from "qs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faMoon, faFileInvoiceDollar, faSun, faGlobe, faUser, faBell, faCog, faTrash, faEye, faFilePdf, faHome, faSignOutAlt, faClipboardList, faCalendarAlt, faSpinner, faEnvelope, faMailForward, faPaperPlane, faPaintBrush, faCheck, faLightbulb, faPalette, faDesktop, faSignature, faIdBadge, faPencilRuler, faLaptopCode, faCode, faShoppingCart, faBullhorn, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
var G = { created() {
  if (!this.$options.remember) return;
  Array.isArray(this.$options.remember) && (this.$options.remember = { data: this.$options.remember }), typeof this.$options.remember == "string" && (this.$options.remember = { data: [this.$options.remember] }), typeof this.$options.remember.data == "string" && (this.$options.remember = { data: [this.$options.remember.data] });
  let e2 = this.$options.remember.key instanceof Function ? this.$options.remember.key.call(this) : this.$options.remember.key, r = router.restore(e2), n2 = this.$options.remember.data.filter((o2) => !(this[o2] !== null && typeof this[o2] == "object" && this[o2].__rememberable === false)), s2 = (o2) => this[o2] !== null && typeof this[o2] == "object" && typeof this[o2].__remember == "function" && typeof this[o2].__restore == "function";
  n2.forEach((o2) => {
    this[o2] !== void 0 && r !== void 0 && r[o2] !== void 0 && (s2(o2) ? this[o2].__restore(r[o2]) : this[o2] = r[o2]), this.$watch(o2, () => {
      router.remember(n2.reduce((a, l) => ({ ...a, [l]: cloneDeep(s2(l) ? this[l].__remember() : this[l]) }), {}), e2);
    }, { immediate: true, deep: true });
  });
} }, V = G;
function x(e2, r) {
  let n2 = typeof e2 == "string" ? e2 : null, s2 = (typeof e2 == "string" ? r : e2) ?? {}, o2 = n2 ? router.restore(n2) : null, a = typeof s2 == "function" ? cloneDeep(s2()) : cloneDeep(s2), l = null, f = null, m = (t) => t, v = reactive({ ...o2 ? o2.data : cloneDeep(a), isDirty: false, errors: o2 ? o2.errors : {}, hasErrors: false, processing: false, progress: null, wasSuccessful: false, recentlySuccessful: false, data() {
    return Object.keys(a).reduce((t, i2) => set(t, i2, get(this, i2)), {});
  }, transform(t) {
    return m = t, this;
  }, defaults(t, i2) {
    if (typeof s2 == "function") throw new Error("You cannot call `defaults()` when using a function to define your form data.");
    return typeof t > "u" ? (a = cloneDeep(this.data()), this.isDirty = false) : a = typeof t == "string" ? set(cloneDeep(a), t, i2) : Object.assign({}, cloneDeep(a), t), this;
  }, reset(...t) {
    let i2 = typeof s2 == "function" ? cloneDeep(s2()) : cloneDeep(a), h2 = cloneDeep(i2);
    return t.length === 0 ? (a = h2, Object.assign(this, i2)) : t.filter((p) => has(h2, p)).forEach((p) => {
      set(a, p, get(h2, p)), set(this, p, get(i2, p));
    }), this;
  }, setError(t, i2) {
    return Object.assign(this.errors, typeof t == "string" ? { [t]: i2 } : t), this.hasErrors = Object.keys(this.errors).length > 0, this;
  }, clearErrors(...t) {
    return this.errors = Object.keys(this.errors).reduce((i2, h2) => ({ ...i2, ...t.length > 0 && !t.includes(h2) ? { [h2]: this.errors[h2] } : {} }), {}), this.hasErrors = Object.keys(this.errors).length > 0, this;
  }, submit(...t) {
    let i2 = typeof t[0] == "object", h2 = i2 ? t[0].method : t[0], p = i2 ? t[0].url : t[1], u = (i2 ? t[1] : t[2]) ?? {}, F = m(this.data()), T = { ...u, onCancelToken: (c) => {
      if (l = c, u.onCancelToken) return u.onCancelToken(c);
    }, onBefore: (c) => {
      if (this.wasSuccessful = false, this.recentlySuccessful = false, clearTimeout(f), u.onBefore) return u.onBefore(c);
    }, onStart: (c) => {
      if (this.processing = true, u.onStart) return u.onStart(c);
    }, onProgress: (c) => {
      if (this.progress = c, u.onProgress) return u.onProgress(c);
    }, onSuccess: async (c) => {
      this.processing = false, this.progress = null, this.clearErrors(), this.wasSuccessful = true, this.recentlySuccessful = true, f = setTimeout(() => this.recentlySuccessful = false, 2e3);
      let w = u.onSuccess ? await u.onSuccess(c) : null;
      return a = cloneDeep(this.data()), this.isDirty = false, w;
    }, onError: (c) => {
      if (this.processing = false, this.progress = null, this.clearErrors().setError(c), u.onError) return u.onError(c);
    }, onCancel: () => {
      if (this.processing = false, this.progress = null, u.onCancel) return u.onCancel();
    }, onFinish: (c) => {
      if (this.processing = false, this.progress = null, l = null, u.onFinish) return u.onFinish(c);
    } };
    h2 === "delete" ? router.delete(p, { ...T, data: F }) : router[h2](p, F, T);
  }, get(t, i2) {
    this.submit("get", t, i2);
  }, post(t, i2) {
    this.submit("post", t, i2);
  }, put(t, i2) {
    this.submit("put", t, i2);
  }, patch(t, i2) {
    this.submit("patch", t, i2);
  }, delete(t, i2) {
    this.submit("delete", t, i2);
  }, cancel() {
    l && l.cancel();
  }, __rememberable: n2 === null, __remember() {
    return { data: this.data(), errors: this.errors };
  }, __restore(t) {
    Object.assign(this, t.data), this.setError(t.errors);
  } });
  return watch(v, (t) => {
    v.isDirty = !isEqual(v.data(), a), n2 && router.remember(cloneDeep(t.__remember()), n2);
  }, { immediate: true, deep: true }), v;
}
var y = ref(null), d = ref(null), I = shallowRef(null), A = ref(null), E = null, ie = defineComponent({ name: "Inertia", props: { initialPage: { type: Object, required: true }, initialComponent: { type: Object, required: false }, resolveComponent: { type: Function, required: false }, titleCallback: { type: Function, required: false, default: (e2) => e2 }, onHeadUpdate: { type: Function, required: false, default: () => () => {
} } }, setup({ initialPage: e2, initialComponent: r, resolveComponent: n2, titleCallback: s2, onHeadUpdate: o2 }) {
  y.value = r ? markRaw(r) : null, d.value = e2, A.value = null;
  let a = typeof window > "u";
  return E = createHeadManager(a, s2, o2), a || (router.init({ initialPage: e2, resolveComponent: n2, swapComponent: async (l) => {
    y.value = markRaw(l.component), d.value = l.page, A.value = l.preserveState ? A.value : Date.now();
  } }), router.on("navigate", () => E.forceUpdate())), () => {
    if (y.value) {
      y.value.inheritAttrs = !!y.value.inheritAttrs;
      let l = h(y.value, { ...d.value.props, key: A.value });
      return I.value && (y.value.layout = I.value, I.value = null), y.value.layout ? typeof y.value.layout == "function" ? y.value.layout(h, l) : (Array.isArray(y.value.layout) ? y.value.layout : [y.value.layout]).concat(l).reverse().reduce((f, m) => (m.inheritAttrs = !!m.inheritAttrs, h(m, { ...d.value.props }, () => f))) : l;
    }
  };
} }), B = ie, q = { install(e2) {
  router.form = x, Object.defineProperty(e2.config.globalProperties, "$inertia", { get: () => router }), Object.defineProperty(e2.config.globalProperties, "$page", { get: () => d.value }), Object.defineProperty(e2.config.globalProperties, "$headManager", { get: () => E }), e2.mixin(V);
} };
async function K({ id: e2 = "app", resolve: r, setup: n2, title: s2, progress: o2 = {}, page: a, render: l }) {
  let f = typeof window > "u", m = f ? null : document.getElementById(e2), v = a || JSON.parse(m.dataset.page), t = (p) => Promise.resolve(r(p)).then((u) => u.default || u), i2 = [], h$1 = await Promise.all([t(v.component), router.decryptHistory().catch(() => {
  })]).then(([p]) => n2({ el: m, App: B, props: { initialPage: v, initialComponent: p, resolveComponent: t, titleCallback: s2, onHeadUpdate: f ? (u) => i2 = u : null }, plugin: q }));
  if (!f && o2 && setupProgress(o2), f) {
    let p = await l(createSSRApp({ render: () => h("div", { id: e2, "data-page": JSON.stringify(v), innerHTML: h$1 ? l(h$1) : "" }) }));
    return { head: i2, body: p };
  }
}
defineComponent({ name: "Deferred", props: { data: { type: [String, Array], required: true } }, render() {
  let e2 = Array.isArray(this.$props.data) ? this.$props.data : [this.$props.data];
  if (!this.$slots.fallback) throw new Error("`<Deferred>` requires a `<template #fallback>` slot");
  return e2.every((r) => this.$page.props[r] !== void 0) ? this.$slots.default() : this.$slots.fallback();
} });
var he = defineComponent({ props: { title: { type: String, required: false } }, data() {
  return { provider: this.$headManager.createProvider() };
}, beforeUnmount() {
  this.provider.disconnect();
}, methods: { isUnaryTag(e2) {
  return ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].indexOf(e2.type) > -1;
}, renderTagStart(e2) {
  e2.props = e2.props || {}, e2.props.inertia = e2.props["head-key"] !== void 0 ? e2.props["head-key"] : "";
  let r = Object.keys(e2.props).reduce((n2, s2) => {
    let o2 = e2.props[s2];
    return ["key", "head-key"].includes(s2) ? n2 : o2 === "" ? n2 + ` ${s2}` : n2 + ` ${s2}="${o2}"`;
  }, "");
  return `<${e2.type}${r}>`;
}, renderTagChildren(e2) {
  return typeof e2.children == "string" ? e2.children : e2.children.reduce((r, n2) => r + this.renderTag(n2), "");
}, isFunctionNode(e2) {
  return typeof e2.type == "function";
}, isComponentNode(e2) {
  return typeof e2.type == "object";
}, isCommentNode(e2) {
  return /(comment|cmt)/i.test(e2.type.toString());
}, isFragmentNode(e2) {
  return /(fragment|fgt|symbol\(\))/i.test(e2.type.toString());
}, isTextNode(e2) {
  return /(text|txt)/i.test(e2.type.toString());
}, renderTag(e2) {
  if (this.isTextNode(e2)) return e2.children;
  if (this.isFragmentNode(e2)) return "";
  if (this.isCommentNode(e2)) return "";
  let r = this.renderTagStart(e2);
  return e2.children && (r += this.renderTagChildren(e2)), this.isUnaryTag(e2) || (r += `</${e2.type}>`), r;
}, addTitleElement(e2) {
  return this.title && !e2.find((r) => r.startsWith("<title")) && e2.push(`<title inertia>${this.title}</title>`), e2;
}, renderNodes(e2) {
  return this.addTitleElement(e2.flatMap((r) => this.resolveNode(r)).map((r) => this.renderTag(r)).filter((r) => r));
}, resolveNode(e2) {
  return this.isFunctionNode(e2) ? this.resolveNode(e2.type()) : this.isComponentNode(e2) ? (console.warn("Using components in the <Head> component is not supported."), []) : this.isTextNode(e2) && e2.children ? e2 : this.isFragmentNode(e2) && e2.children ? e2.children.flatMap((r) => this.resolveNode(r)) : this.isCommentNode(e2) ? [] : e2;
} }, render() {
  this.provider.update(this.renderNodes(this.$slots.default ? this.$slots.default() : []));
} }), ge = he;
defineComponent({ name: "Link", props: { as: { type: String, default: "a" }, data: { type: Object, default: () => ({}) }, href: { type: [String, Object], required: true }, method: { type: String, default: "get" }, replace: { type: Boolean, default: false }, preserveScroll: { type: Boolean, default: false }, preserveState: { type: Boolean, default: null }, only: { type: Array, default: () => [] }, except: { type: Array, default: () => [] }, headers: { type: Object, default: () => ({}) }, queryStringArrayFormat: { type: String, default: "brackets" }, async: { type: Boolean, default: false }, prefetch: { type: [Boolean, String, Array], default: false }, cacheFor: { type: [Number, String, Array], default: 0 }, onStart: { type: Function, default: (e2) => {
} }, onProgress: { type: Function, default: () => {
} }, onFinish: { type: Function, default: () => {
} }, onBefore: { type: Function, default: () => {
} }, onCancel: { type: Function, default: () => {
} }, onSuccess: { type: Function, default: () => {
} }, onError: { type: Function, default: () => {
} }, onCancelToken: { type: Function, default: () => {
} } }, setup(e2, { slots: r, attrs: n2 }) {
  let s2 = ref(0), o2 = ref(null), a = e2.prefetch === true ? ["hover"] : e2.prefetch === false ? [] : Array.isArray(e2.prefetch) ? e2.prefetch : [e2.prefetch], l = e2.cacheFor !== 0 ? e2.cacheFor : a.length === 1 && a[0] === "click" ? 0 : 3e4;
  onMounted(() => {
    a.includes("mount") && F();
  }), onUnmounted(() => {
    clearTimeout(o2.value);
  });
  let f = typeof e2.href == "object" ? e2.href.method : e2.method.toLowerCase(), m = f !== "get" ? "button" : e2.as.toLowerCase(), v = computed(() => mergeDataIntoQueryString(f, typeof e2.href == "object" ? e2.href.url : e2.href || "", e2.data, e2.queryStringArrayFormat)), t = computed(() => v.value[0]), i2 = computed(() => v.value[1]), h$1 = computed(() => ({ a: { href: t.value }, button: { type: "button" } })), p = { data: i2.value, method: f, replace: e2.replace, preserveScroll: e2.preserveScroll, preserveState: e2.preserveState ?? f !== "get", only: e2.only, except: e2.except, headers: e2.headers, async: e2.async }, u = { ...p, onCancelToken: e2.onCancelToken, onBefore: e2.onBefore, onStart: (g) => {
    s2.value++, e2.onStart(g);
  }, onProgress: e2.onProgress, onFinish: (g) => {
    s2.value--, e2.onFinish(g);
  }, onCancel: e2.onCancel, onSuccess: e2.onSuccess, onError: e2.onError }, F = () => {
    router.prefetch(t.value, p, { cacheFor: l });
  }, T = { onClick: (g) => {
    shouldIntercept(g) && (g.preventDefault(), router.visit(t.value, u));
  } }, c = { onMouseenter: () => {
    o2.value = setTimeout(() => {
      F();
    }, 75);
  }, onMouseleave: () => {
    clearTimeout(o2.value);
  }, onClick: T.onClick }, w = { onMousedown: (g) => {
    shouldIntercept(g) && (g.preventDefault(), F());
  }, onMouseup: (g) => {
    g.preventDefault(), router.visit(t.value, u);
  }, onClick: (g) => {
    shouldIntercept(g) && g.preventDefault();
  } };
  return () => h(m, { ...n2, ...h$1.value[m] || {}, "data-loading": s2.value > 0 ? "" : void 0, ...a.includes("hover") ? c : a.includes("click") ? w : T }, r);
} });
defineComponent({ name: "WhenVisible", props: { data: { type: [String, Array] }, params: { type: Object }, buffer: { type: Number, default: 0 }, as: { type: String, default: "div" }, always: { type: Boolean, default: false } }, data() {
  return { loaded: false, fetching: false, observer: null };
}, unmounted() {
  var _a;
  (_a = this.observer) == null ? void 0 : _a.disconnect();
}, mounted() {
  this.observer = new IntersectionObserver((e2) => {
    if (!e2[0].isIntersecting || (this.$props.always || this.observer.disconnect(), this.fetching)) return;
    this.fetching = true;
    let r = this.getReloadParams();
    router.reload({ ...r, onStart: (n2) => {
      var _a;
      this.fetching = true, (_a = r.onStart) == null ? void 0 : _a.call(r, n2);
    }, onFinish: (n2) => {
      var _a;
      this.loaded = true, this.fetching = false, (_a = r.onFinish) == null ? void 0 : _a.call(r, n2);
    } });
  }, { rootMargin: `${this.$props.buffer}px` }), this.observer.observe(this.$el.nextSibling);
}, methods: { getReloadParams() {
  if (this.$props.data) return { only: Array.isArray(this.$props.data) ? this.$props.data : [this.$props.data] };
  if (!this.$props.params) throw new Error("You must provide either a `data` or `params` prop.");
  return this.$props.params;
} }, render() {
  let e2 = [];
  return (this.$props.always || !this.loaded) && e2.push(h(this.$props.as)), this.loaded ? this.$slots.default && e2.push(this.$slots.default()) : e2.push(this.$slots.fallback ? this.$slots.fallback() : null), e2;
} });
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function e() {
  return e = Object.assign ? Object.assign.bind() : function(t) {
    for (var r = 1; r < arguments.length; r++) {
      var e2 = arguments[r];
      for (var i2 in e2) ({}).hasOwnProperty.call(e2, i2) && (t[i2] = e2[i2]);
    }
    return t;
  }, e.apply(null, arguments);
}
class i {
  constructor(t, r, e2) {
    var i2, n2;
    this.name = t, this.definition = r, this.bindings = null != (i2 = r.bindings) ? i2 : {}, this.wheres = null != (n2 = r.wheres) ? n2 : {}, this.config = e2;
  }
  get template() {
    const t = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t ? "/" : t;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t, r;
    return null != (t = null == (r = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r.map((t2) => ({ name: t2.replace(/{|\??}/g, ""), required: !/\?}$/.test(t2) }))) ? t : [];
  }
  matchesUrl(r) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const i2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t, r2, e3, i3) => {
      var n3;
      const s3 = `(?<${e3}>${(null == (n3 = this.wheres[e3]) ? void 0 : n3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return i3 ? `(${r2}${s3})?` : `${r2}${s3}`;
    }).replace(/^\w+:\/\//, ""), [n2, s2] = r.replace(/^\w+:\/\//, "").split("?"), o2 = null != (e2 = new RegExp(`^${i2}/?$`).exec(n2)) ? e2 : new RegExp(`^${i2}/?$`).exec(decodeURI(n2));
    if (o2) {
      for (const t in o2.groups) o2.groups[t] = "string" == typeof o2.groups[t] ? decodeURIComponent(o2.groups[t]) : o2.groups[t];
      return { params: o2.groups, query: parse(s2) };
    }
    return false;
  }
  compile(t) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (r, e2, i2) => {
      var n2, s2;
      if (!i2 && [null, void 0].includes(t[e2])) throw new Error(`Ziggy error: '${e2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[e2] && !new RegExp(`^${i2 ? `(${this.wheres[e2]})?` : this.wheres[e2]}$`).test(null != (s2 = t[e2]) ? s2 : "")) throw new Error(`Ziggy error: '${e2}' parameter '${t[e2]}' does not match required format '${this.wheres[e2]}' for route '${this.name}'.`);
      return encodeURI(null != (n2 = t[e2]) ? n2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class n extends String {
  constructor(t, r, n2 = true, s2) {
    if (super(), this.t = null != s2 ? s2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = e({}, this.t, { absolute: n2 }), t) {
      if (!this.t.routes[t]) throw new Error(`Ziggy error: route '${t}' is not in the route list.`);
      this.i = new i(t, this.t.routes[t], this.t), this.o = this.u(r);
    }
  }
  toString() {
    const t = Object.keys(this.o).filter((t2) => !this.i.parameterSegments.some(({ name: r }) => r === t2)).filter((t2) => "_query" !== t2).reduce((t2, r) => e({}, t2, { [r]: this.o[r] }), {});
    return this.i.compile(this.o) + stringify(e({}, t, this.o._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t2, r) => "boolean" == typeof t2 ? Number(t2) : r(t2) });
  }
  h(t) {
    t ? this.t.absolute && t.startsWith("/") && (t = this.l().host + t) : t = this.m();
    let r = {};
    const [n2, s2] = Object.entries(this.t.routes).find(([e2, n3]) => r = new i(e2, n3, this.t).matchesUrl(t)) || [void 0, void 0];
    return e({ name: n2 }, r, { route: s2 });
  }
  m() {
    const { host: t, pathname: r, search: e2 } = this.l();
    return (this.t.absolute ? t + r : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + e2;
  }
  current(t, r) {
    const { name: n2, params: s2, query: o2, route: u } = this.h();
    if (!t) return n2;
    const h2 = new RegExp(`^${t.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r) || !h2) return h2;
    const a = new i(n2, u, this.t);
    r = this.u(r, a);
    const l = e({}, s2, o2);
    if (Object.values(r).every((t2) => !t2) && !Object.values(l).some((t2) => void 0 !== t2)) return true;
    const c = (t2, r2) => Object.entries(t2).every(([t3, e2]) => Array.isArray(e2) && Array.isArray(r2[t3]) ? e2.every((e3) => r2[t3].includes(e3)) : "object" == typeof e2 && "object" == typeof r2[t3] && null !== e2 && null !== r2[t3] ? c(e2, r2[t3]) : r2[t3] == e2);
    return c(r, l);
  }
  l() {
    var t, r, e2, i2, n2, s2;
    const { host: o2 = "", pathname: u = "", search: h2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t = null == (r = this.t.location) ? void 0 : r.host) ? t : o2, pathname: null != (e2 = null == (i2 = this.t.location) ? void 0 : i2.pathname) ? e2 : u, search: null != (n2 = null == (s2 = this.t.location) ? void 0 : s2.search) ? n2 : h2 };
  }
  get params() {
    const { params: t, query: r } = this.h();
    return e({}, t, r);
  }
  get routeParams() {
    return this.h().params;
  }
  get queryParams() {
    return this.h().query;
  }
  has(t) {
    return this.t.routes.hasOwnProperty(t);
  }
  u(t = {}, r = this.i) {
    null != t || (t = {}), t = ["string", "number"].includes(typeof t) ? [t] : t;
    const i2 = r.parameterSegments.filter(({ name: t2 }) => !this.t.defaults[t2]);
    return Array.isArray(t) ? t = t.reduce((t2, r2, n2) => e({}, t2, i2[n2] ? { [i2[n2].name]: r2 } : "object" == typeof r2 ? r2 : { [r2]: "" }), {}) : 1 !== i2.length || t[i2[0].name] || !t.hasOwnProperty(Object.values(r.bindings)[0]) && !t.hasOwnProperty("id") || (t = { [i2[0].name]: t }), e({}, this.$(r), this.p(t, r));
  }
  $(t) {
    return t.parameterSegments.filter(({ name: t2 }) => this.t.defaults[t2]).reduce((t2, { name: r }, i2) => e({}, t2, { [r]: this.t.defaults[r] }), {});
  }
  p(t, { bindings: r, parameterSegments: i2 }) {
    return Object.entries(t).reduce((t2, [n2, s2]) => {
      if (!s2 || "object" != typeof s2 || Array.isArray(s2) || !i2.some(({ name: t3 }) => t3 === n2)) return e({}, t2, { [n2]: s2 });
      if (!s2.hasOwnProperty(r[n2])) {
        if (!s2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${n2}' parameter is missing route model binding key '${r[n2]}'.`);
        r[n2] = "id";
      }
      return e({}, t2, { [n2]: s2[r[n2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function s(t, r, e2, i2) {
  const s2 = new n(t, r, e2, i2);
  return t ? s2.toString() : s2;
}
const o = { install(t, r) {
  const e2 = (t2, e3, i2, n2 = r) => s(t2, e3, i2, n2);
  parseInt(t.version) > 2 ? (t.config.globalProperties.route = e2, t.provide("route", e2)) : t.mixin({ methods: { route: e2 } });
} };
library.add(
  faBars,
  faFacebook,
  faInstagram,
  faYoutube,
  faTiktok,
  faMoon,
  faFileInvoiceDollar,
  faSun,
  faGlobe,
  faUser,
  faBell,
  faCog,
  faTrash,
  faEye,
  faFilePdf,
  faHome,
  faSignOutAlt,
  faClipboardList,
  faCalendarAlt,
  faSpinner,
  faEnvelope,
  faMailForward,
  faPaperPlane,
  faPaintBrush,
  faCheck,
  faLightbulb,
  faPalette,
  faDesktop,
  faSignature,
  faIdBadge,
  faPencilRuler,
  faLaptopCode,
  faCode,
  faShoppingCart,
  faBullhorn,
  faBoxOpen
);
const appName = "Get Thru";
createServer(
  (page) => K({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/AboutUS.vue": () => import("./assets/AboutUS-Dg8wjral.js"), "./Pages/Admin.vue": () => import("./assets/Admin-CRYcioWO.js"), "./Pages/ContactUs.vue": () => import("./assets/ContactUs-BI4gxjFg.js"), "./Pages/Faq.vue": () => import("./assets/Faq-ycKjW54R.js"), "./Pages/Home.vue": () => import("./assets/Home-DTGq8frK.js"), "./Pages/RegistrationForm.vue": () => import("./assets/RegistrationForm-CsE5kTAr.js"), "./Pages/Services/DigitalMarketing.vue": () => import("./assets/DigitalMarketing-oGfUiA92.js"), "./Pages/Services/ECommerce.vue": () => import("./assets/ECommerce-CgwH6XDw.js"), "./Pages/Services/GraphicDesign.vue": () => import("./assets/GraphicDesign-BP83bU5a.js"), "./Pages/Services/IdentityDesign.vue": () => import("./assets/IdentityDesign-DOFBUEiV.js"), "./Pages/Services/ProductDesign.vue": () => import("./assets/ProductDesign-BVHKqFy2.js"), "./Pages/Services/WebDesign.vue": () => import("./assets/WebDesign-BJTZj-DG.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(o, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      }).component("Head", ge).component("font-awesome-icon", FontAwesomeIcon);
    }
  })
);
export {
  ge as g
};
