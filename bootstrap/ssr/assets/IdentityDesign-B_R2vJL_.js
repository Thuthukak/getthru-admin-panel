import { ref, mergeProps, useSSRContext, resolveComponent, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, N as Navbar } from "./Navbar-B2dw1uDe.js";
import { F as Footer } from "./Footer-Cv32ksWL.js";
import "axios";
const _sfc_main$1 = {
  __name: "IdentityDesignCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([
      "/assets/images/identity-carousel/Logo-mockup-scaled.jpg",
      "/assets/images/identity-carousel/bakili-2.jpg",
      "/assets/images/identity-carousel/bakili-3.jpg",
      "/assets/images/identity-carousel/bakili-4.jpg",
      "/assets/images/identity-carousel/bakili-5.jpg",
      "/assets/images/identity-carousel/bakili-business-cards.jpg"
    ]);
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto mt-8" }, _attrs))} data-v-a8b197f8><div class="relative" data-v-a8b197f8><img${ssrRenderAttr("src", images.value[activeIndex.value])} class="w-full h-96 object-cover rounded-lg" alt="Website screenshot" data-v-a8b197f8><button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-a8b197f8> ‹ </button><button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-a8b197f8> › </button></div><div class="overflow-x-auto mt-4" data-v-a8b197f8><div class="flex mt-4 gap-2 justify-center min-w-max px-2" data-v-a8b197f8><!--[-->`);
      ssrRenderList(images.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{
          "border-blue-500": index === activeIndex.value,
          "border-transparent": index !== activeIndex.value
        }, "w-24 h-16 object-cover rounded cursor-pointer border-2"])}" data-v-a8b197f8>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Services/IdentityDesignCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const IdentityDesignCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a8b197f8"]]);
const _sfc_main = {
  __name: "IdentityDesign",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Navbar, { seo: __props.seo }, null, _parent));
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-bca635a3${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-bca635a3${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-bca635a3${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-bca635a3${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-bca635a3${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-bca635a3${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-bca635a3${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-bca635a3${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-bca635a3${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-bca635a3${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-bca635a3${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-bca635a3${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-bca635a3${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-bca635a3${_scopeId}><meta name="robots" content="index, follow" data-v-bca635a3${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-bca635a3${_scopeId}><meta name="theme-color" content="#0d6efd" data-v-bca635a3${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.seo.title), 1),
              createVNode("meta", {
                name: "description",
                content: __props.seo.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: __props.seo.keywords
              }, null, 8, ["content"]),
              createVNode("link", {
                rel: "canonical",
                href: __props.seo.canonical_url
              }, null, 8, ["href"]),
              createVNode("meta", {
                property: "og:title",
                content: __props.seo.og_title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: __props.seo.og_description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: __props.seo.og_image
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: __props.seo.og_url
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: __props.seo.og_type
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:site_name",
                content: __props.seo.og_site_name
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:card",
                content: __props.seo.twitter_card
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:title",
                content: __props.seo.og_title
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: __props.seo.og_description
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:image",
                content: __props.seo.og_image
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: "index, follow"
              }),
              createVNode("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
              }),
              createVNode("meta", {
                name: "theme-color",
                content: "#0d6efd"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section id="apply" class="cta" data-v-bca635a3><div class="container px-5" data-aos="zoom-in" data-v-bca635a3><div class="text-center text-white" data-v-bca635a3><h1 class="fw-bold" data-v-bca635a3>Identity Design</h1><p data-v-bca635a3>Your brand identity is more than a logo — it’s your voice, your style, your first impression. We create cohesive, memorable brand systems that resonate, connect, and last.</p></div></div></section><section data-v-bca635a3><div class="container mt-5 my-5 py-5 px-4" data-v-bca635a3><div class="row" data-v-bca635a3><div class="col-md-5" data-v-bca635a3><img${ssrRenderAttr("src", __props.seo.sec_img)} alt="Web design" class="shadow-lg rounded align-self-center" loading="lazy" style="${ssrRenderStyle({ "width": "400px", "height": "400px", "object-fit": "cover" })}" data-v-bca635a3></div><div class="col-md-7 align-self-center" data-v-bca635a3><h2 class="fw-bold mb-3" data-v-bca635a3>Build a Brand People Remember</h2><p data-v-bca635a3>We design complete visual identities that go beyond aesthetics — they tell your story. From logos and color palettes to business cards and brand guidelines, every element works together to create a consistent, professional image that builds trust and leaves a lasting impression.</p></div></div></div></section><section class="py-5 banner-image" data-v-bca635a3><div class="container px-4" data-v-bca635a3><div class="row" data-v-bca635a3><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-bca635a3><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-bca635a3><div class="icon-circle" data-v-bca635a3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: "signature" }, null, _parent));
      _push(`</div><div data-v-bca635a3><h3 class="fw-bold mb-1" data-v-bca635a3>Logo Design</h3><p class="mb-0" data-v-bca635a3>We craft distinctive logos that capture your brand’s essence and stand the test of time.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-bca635a3><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-bca635a3><div class="icon-circle" data-v-bca635a3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: "palette" }, null, _parent));
      _push(`</div><div data-v-bca635a3><h3 class="fw-bold mb-1" data-v-bca635a3>Color &amp; Typography</h3><p class="mb-0" data-v-bca635a3>We develop consistent color schemes and font pairings that align with your brand personality.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-bca635a3><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-bca635a3><div class="icon-circle" data-v-bca635a3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: "id-badge" }, null, _parent));
      _push(`</div><div data-v-bca635a3><h3 class="fw-bold mb-1" data-v-bca635a3>Brand Collateral</h3><p class="mb-0" data-v-bca635a3>From business cards to letterheads, we design cohesive materials that strengthen your identity.</p></div></div></div></div></div></section><section data-v-bca635a3><div class="container mt-5 my-5 py-5 px-4" data-v-bca635a3><div class="row" data-v-bca635a3><div class="col-md-6 align-self-center" data-v-bca635a3><div class="mt-5" data-v-bca635a3><h1 class="fw-bold mb-3" data-v-bca635a3>Case Study</h1><p data-v-bca635a3>Experience the transformation of Bakili, an innovative IT company, through our bespoke identity design. From crafting captivating business colors to developing a distinctive logo and designing professional business cards, we’ve meticulously curated every element to reflect Bakili’s unique vision and values. Witness the seamless fusion of creativity and functionality as we bring Bakili’s brand identity to life, setting them apart in the competitive tech landscape</p></div></div><div class="col-md-6" data-v-bca635a3>`);
      _push(ssrRenderComponent(IdentityDesignCarousel, null, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/IdentityDesign.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IdentityDesign = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bca635a3"]]);
export {
  IdentityDesign as default
};
