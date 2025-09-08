import { L as Layout } from "./HomeLayout-D-i_yXWv.js";
import "../ssr.js";
import { resolveComponent, withCtx, createVNode, toDisplayString, ref, useSSRContext } from "vue";
import axios from "axios";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Navbar-DKjwHpMh.js";
import "./Footer-BNllGzeY.js";
import "@vue/server-renderer";
import "@inertiajs/core";
import "es-toolkit";
import "es-toolkit/compat";
import "@inertiajs/core/server";
import "qs";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  components: {
    Layout
  },
  props: {
    seo: Object
  },
  setup() {
    const isLogin = ref(true);
    const form = ref({
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      phone: ""
    });
    const toggleForm = () => {
      isLogin.value = !isLogin.value;
    };
    const handleSubmit = async () => {
      try {
        const endpoint = isLogin.value ? "/login" : "/register";
        const response = await axios.post(endpoint, form.value);
        console.log(response.data);
        if (isLogin.value) {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/admin/dashboard";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return {
      isLogin,
      form,
      toggleForm,
      handleSubmit
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-b28e5aed${_scopeId}>${ssrInterpolate($props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", $props.seo.description)} data-v-b28e5aed${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $props.seo.keywords)} data-v-b28e5aed${_scopeId}><link rel="canonical"${ssrRenderAttr("href", $props.seo.canonical_url)} data-v-b28e5aed${_scopeId}>`);
      } else {
        return [
          createVNode("title", null, toDisplayString($props.seo.title), 1),
          createVNode("meta", {
            name: "description",
            content: $props.seo.description
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "keywords",
            content: $props.seo.keywords
          }, null, 8, ["content"]),
          createVNode("link", {
            rel: "canonical",
            href: $props.seo.canonical_url
          }, null, 8, ["href"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="container-fluid p-0" data-v-b28e5aed><div class="row min-vh-100 m-0" data-v-b28e5aed><div class="col-md-8 d-none d-md-block p-0" data-v-b28e5aed><img${ssrRenderAttr("src", $props.seo.hero_image)} alt="Hero Image" class="w-100 min-vh-100 object-fit-cover" data-v-b28e5aed></div><div class="col-md-4 d-flex align-items-center justify-content-center p-0" data-v-b28e5aed><div class="w-100 bg-white p-4" data-v-b28e5aed><h2 class="text-center fw-bold mb-3" data-v-b28e5aed>${ssrInterpolate($setup.isLogin ? "Admin Login" : "Register as Admin")}</h2><form data-v-b28e5aed><div class="mb-3" data-v-b28e5aed><label class="form-label" data-v-b28e5aed>Email</label><input${ssrRenderAttr("value", $setup.form.email)} type="email" class="form-control" data-v-b28e5aed></div><div class="mb-3" data-v-b28e5aed><label class="form-label" data-v-b28e5aed>Password</label><input${ssrRenderAttr("value", $setup.form.password)} type="password" class="form-control" data-v-b28e5aed></div>`);
  if (!$setup.isLogin) {
    _push(`<div class="mb-3" data-v-b28e5aed><label class="form-label" data-v-b28e5aed>Confirm Password</label><input${ssrRenderAttr("value", $setup.form.password_confirmation)} type="password" class="form-control" data-v-b28e5aed></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.isLogin) {
    _push(`<div class="mb-3 text-end" data-v-b28e5aed><a href="forgot-password" class="text-decoration-none text-primary" data-v-b28e5aed>Forgot Password?</a></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$setup.isLogin) {
    _push(`<div class="mb-3" data-v-b28e5aed><label class="form-label" data-v-b28e5aed>Full Name</label><input${ssrRenderAttr("value", $setup.form.name)} type="text" class="form-control" data-v-b28e5aed></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$setup.isLogin) {
    _push(`<div class="mb-3" data-v-b28e5aed><label class="form-label" data-v-b28e5aed>Phone Number</label><input${ssrRenderAttr("value", $setup.form.phone)} type="text" class="form-control" data-v-b28e5aed></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button type="submit" class="btn btn-primary w-100" data-v-b28e5aed>${ssrInterpolate($setup.isLogin ? "Login" : "Register")}</button></form><div class="text-center mt-3" data-v-b28e5aed><p class="text-primary" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-b28e5aed>${ssrInterpolate($setup.isLogin ? "Don't have an account? Sign up" : "Already have an account? Login")}</p></div></div></div></div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b28e5aed"]]);
export {
  Admin as default
};
