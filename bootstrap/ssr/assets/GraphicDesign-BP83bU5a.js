import { ref, mergeProps, useSSRContext, unref, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { g as ge } from "../ssr.js";
import { N as Navbar } from "./Navbar-DKjwHpMh.js";
import { F as Footer } from "./Footer-BNllGzeY.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
import "axios";
const _sfc_main$1 = {
  __name: "GraphicDesignCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([
      "/assets/images/graphic-carousel/maburas-scaled.jpg",
      "/assets/images/graphic-carousel/Mkay-aqua-new-logo-scaled.jpg",
      "/assets/images/graphic-carousel/lifas-kitchen-scaled.jpg",
      "/assets/images/graphic-carousel/km-collection-scaled.jpg",
      "/assets/images/graphic-carousel/Nonos-candy-shop-final-black-bg-scaled.jpg",
      "/assets/images/graphic-carousel/massango-logo 2.png"
    ]);
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto mt-8 px-0" }, _attrs))} data-v-22444185><div class="relative" data-v-22444185><img${ssrRenderAttr("src", images.value[activeIndex.value])} class="w-full h-96 object-cover rounded-lg" alt="Website screenshot" data-v-22444185><button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-22444185> ‹ </button><button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-22444185> › </button></div><div class="overflow-x-auto mt-4" data-v-22444185><div class="flex mt-4 gap-2 justify-center min-w-max px-2" data-v-22444185><!--[-->`);
      ssrRenderList(images.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{
          "border-blue-500": index === activeIndex.value,
          "border-transparent": index !== activeIndex.value
        }, "w-24 h-16 object-cover rounded cursor-pointer border-2"])}" data-v-22444185>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Services/GraphicDesignCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const GraphicDesignCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-22444185"]]);
const _sfc_main = {
  __name: "GraphicDesign",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    const props = __props;
    console.log("SEO Data received:", props.seo);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Navbar, { seo: __props.seo }, null, _parent));
      _push(ssrRenderComponent(unref(ge), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-31fd4037${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-31fd4037${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-31fd4037${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-31fd4037${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-31fd4037${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-31fd4037${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-31fd4037${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-31fd4037${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-31fd4037${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-31fd4037${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-31fd4037${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-31fd4037${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-31fd4037${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-31fd4037${_scopeId}><meta name="robots" content="index, follow" data-v-31fd4037${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-31fd4037${_scopeId}><meta name="theme-color" content="#0d6efd" data-v-31fd4037${_scopeId}>`);
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
      _push(`<section id="apply" class="cta" data-v-31fd4037><div class="container" data-aos="zoom-in" data-v-31fd4037><div class="text-center text-white" data-v-31fd4037><h1 class="fw-bold" data-v-31fd4037>Graphic Design</h1><p data-v-31fd4037> we believe in the power of visual storytelling to captivate audiences and leave a lasting impression. Our expert graphic designers specialize in creating eye-catching designs that reflect your brand identity and convey your message with impact.</p></div></div></section><section data-v-31fd4037><div class="container mt-5 my-5 py-5 px-4" data-v-31fd4037><div class="row" data-v-31fd4037><div class="col-md-6" data-v-31fd4037><img${ssrRenderAttr("src", __props.seo.sec_img)} alt="Web design" class="rounded-lg shadow-md" loading="lazy" style="${ssrRenderStyle({ "width": "500px", "height": "400px", "object-fit": "cover" })}" data-v-31fd4037></div><div class="col-md-6 align-self-center" data-v-31fd4037><h2 class="fw-bold" data-v-31fd4037>Graphic design process</h2><p data-v-31fd4037>Discover the essence of your brand with Penda Graphics’ meticulously crafted graphic design process. Beginning with in-depth discussions and research, we delve into your brand’s identity and objectives, laying the foundation for our creative journey. Through brainstorming and ideation, we explore diverse concepts and styles, refining them into visually striking designs. Collaboration with our team ensures alignment with your vision, as we meticulously craft each detail to perfection. With your feedback, we make revisions until we achieve the ideal design. Upon approval, we finalize the design and deliver the files, ready for use across various platforms. Our commitment extends beyond delivery, providing ongoing support to ensure your designs continue to reflect your brand’s essence</p></div></div></div></section><section class="py-5 banner-image" data-v-31fd4037><div class="container px-4" data-v-31fd4037><div class="row" data-v-31fd4037><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-31fd4037><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-31fd4037><div class="icon-circle" data-v-31fd4037><i class="fas fa-paint-brush" data-v-31fd4037></i></div><div data-v-31fd4037><h3 class="fw-bold mb-1" data-v-31fd4037>Creative Concepts</h3><p class="mb-0" data-v-31fd4037>We bring your ideas to life with unique designs.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-31fd4037><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-31fd4037><div class="icon-circle" data-v-31fd4037><i class="fas fa-vector-square" data-v-31fd4037></i></div><div data-v-31fd4037><h3 class="fw-bold mb-1" data-v-31fd4037>Precision Design</h3><p class="mb-0" data-v-31fd4037>Every detail is carefully crafted for visual impact.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-31fd4037><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-31fd4037><div class="icon-circle" data-v-31fd4037><i class="fas fa-bullhorn" data-v-31fd4037></i></div><div data-v-31fd4037><h3 class="fw-bold mb-1" data-v-31fd4037>Brand Messaging</h3><p class="mb-0" data-v-31fd4037>Clear, consistent communication that resonates.</p></div></div></div></div></div></section><section data-v-31fd4037><div class="container mt-5 my-5 py-5 px-4" data-v-31fd4037><div class="row" data-v-31fd4037><div class="col-md-6" data-v-31fd4037><div class="mt-5" data-v-31fd4037><h1 class="fw-bold" data-v-31fd4037>Case Studies</h1><p data-v-31fd4037>Discover how we’ve helped businesses of all sizes elevate their presence, forge strong connections with their audience, and leave a lasting impression in their respective industries. With every case study, we invite you to witness the artistry and innovation behind our logo designs, where each mark is a testament to our passion for visual storytelling and brand strategy </p></div></div><div class="col-md-6" data-v-31fd4037>`);
      _push(ssrRenderComponent(GraphicDesignCarousel, null, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/GraphicDesign.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GraphicDesign = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31fd4037"]]);
export {
  GraphicDesign as default
};
