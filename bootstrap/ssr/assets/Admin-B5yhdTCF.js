import { L as Layout } from "./HomeLayout-CrP_jKzf.js";
import { resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, ref, useSSRContext } from "vue";
import axios from "axios";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./Navbar-B2dw1uDe.js";
import "./Footer-Cv32ksWL.js";
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
  const _component_Layout = resolveComponent("Layout");
  _push(ssrRenderComponent(_component_Layout, mergeProps({ seo: $props.seo }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container-fluid p-0" data-v-e1e24b7e${_scopeId}><div class="row min-vh-100 m-0" data-v-e1e24b7e${_scopeId}><div class="col-md-8 d-none d-md-block p-0" data-v-e1e24b7e${_scopeId}><img${ssrRenderAttr("src", $props.seo.hero_image)} alt="Hero Image" class="w-100 min-vh-100 object-fit-cover" data-v-e1e24b7e${_scopeId}></div><div class="col-md-4 d-flex align-items-center justify-content-center p-0" data-v-e1e24b7e${_scopeId}><div class="w-100 bg-white p-4" data-v-e1e24b7e${_scopeId}><h2 class="text-center fw-bold mb-3" data-v-e1e24b7e${_scopeId}>${ssrInterpolate($setup.isLogin ? "Admin Login" : "Register as Admin")}</h2><form data-v-e1e24b7e${_scopeId}><div class="mb-3" data-v-e1e24b7e${_scopeId}><label class="form-label" data-v-e1e24b7e${_scopeId}>Email</label><input${ssrRenderAttr("value", $setup.form.email)} type="email" class="form-control" data-v-e1e24b7e${_scopeId}></div><div class="mb-3" data-v-e1e24b7e${_scopeId}><label class="form-label" data-v-e1e24b7e${_scopeId}>Password</label><input${ssrRenderAttr("value", $setup.form.password)} type="password" class="form-control" data-v-e1e24b7e${_scopeId}></div>`);
        if (!$setup.isLogin) {
          _push2(`<div class="mb-3" data-v-e1e24b7e${_scopeId}><label class="form-label" data-v-e1e24b7e${_scopeId}>Confirm Password</label><input${ssrRenderAttr("value", $setup.form.password_confirmation)} type="password" class="form-control" data-v-e1e24b7e${_scopeId}></div>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.isLogin) {
          _push2(`<div class="mb-3 text-end" data-v-e1e24b7e${_scopeId}><a href="forgot-password" class="text-decoration-none text-primary" data-v-e1e24b7e${_scopeId}>Forgot Password?</a></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (!$setup.isLogin) {
          _push2(`<div class="mb-3" data-v-e1e24b7e${_scopeId}><label class="form-label" data-v-e1e24b7e${_scopeId}>Full Name</label><input${ssrRenderAttr("value", $setup.form.name)} type="text" class="form-control" data-v-e1e24b7e${_scopeId}></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (!$setup.isLogin) {
          _push2(`<div class="mb-3" data-v-e1e24b7e${_scopeId}><label class="form-label" data-v-e1e24b7e${_scopeId}>Phone Number</label><input${ssrRenderAttr("value", $setup.form.phone)} type="text" class="form-control" data-v-e1e24b7e${_scopeId}></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<button type="submit" class="btn btn-primary w-100" data-v-e1e24b7e${_scopeId}>${ssrInterpolate($setup.isLogin ? "Login" : "Register")}</button></form><div class="text-center mt-3" data-v-e1e24b7e${_scopeId}><p class="text-primary" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-e1e24b7e${_scopeId}>${ssrInterpolate($setup.isLogin ? "Don't have an account? Sign up" : "Already have an account? Login")}</p></div></div></div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "container-fluid p-0" }, [
            createVNode("div", { class: "row min-vh-100 m-0" }, [
              createVNode("div", { class: "col-md-8 d-none d-md-block p-0" }, [
                createVNode("img", {
                  src: $props.seo.hero_image,
                  alt: "Hero Image",
                  class: "w-100 min-vh-100 object-fit-cover"
                }, null, 8, ["src"])
              ]),
              createVNode("div", { class: "col-md-4 d-flex align-items-center justify-content-center p-0" }, [
                createVNode("div", { class: "w-100 bg-white p-4" }, [
                  createVNode("h2", { class: "text-center fw-bold mb-3" }, toDisplayString($setup.isLogin ? "Admin Login" : "Register as Admin"), 1),
                  createVNode("form", {
                    onSubmit: withModifiers($setup.handleSubmit, ["prevent"])
                  }, [
                    createVNode("div", { class: "mb-3" }, [
                      createVNode("label", { class: "form-label" }, "Email"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                        type: "email",
                        class: "form-control"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, $setup.form.email]
                      ])
                    ]),
                    createVNode("div", { class: "mb-3" }, [
                      createVNode("label", { class: "form-label" }, "Password"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                        type: "password",
                        class: "form-control"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, $setup.form.password]
                      ])
                    ]),
                    !$setup.isLogin ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-3"
                    }, [
                      createVNode("label", { class: "form-label" }, "Confirm Password"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => $setup.form.password_confirmation = $event,
                        type: "password",
                        class: "form-control"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, $setup.form.password_confirmation]
                      ])
                    ])) : createCommentVNode("", true),
                    $setup.isLogin ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-3 text-end"
                    }, [
                      createVNode("a", {
                        href: "forgot-password",
                        class: "text-decoration-none text-primary"
                      }, "Forgot Password?")
                    ])) : createCommentVNode("", true),
                    !$setup.isLogin ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mb-3"
                    }, [
                      createVNode("label", { class: "form-label" }, "Full Name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => $setup.form.name = $event,
                        type: "text",
                        class: "form-control"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, $setup.form.name]
                      ])
                    ])) : createCommentVNode("", true),
                    !$setup.isLogin ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "mb-3"
                    }, [
                      createVNode("label", { class: "form-label" }, "Phone Number"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => $setup.form.phone = $event,
                        type: "text",
                        class: "form-control"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, $setup.form.phone]
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("button", {
                      type: "submit",
                      class: "btn btn-primary w-100"
                    }, toDisplayString($setup.isLogin ? "Login" : "Register"), 1)
                  ], 40, ["onSubmit"]),
                  createVNode("div", { class: "text-center mt-3" }, [
                    createVNode("p", {
                      onClick: $setup.toggleForm,
                      class: "text-primary",
                      style: { "cursor": "pointer" }
                    }, toDisplayString($setup.isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"), 9, ["onClick"])
                  ])
                ])
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e1e24b7e"]]);
export {
  Admin as default
};
