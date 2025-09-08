import { ref, mergeProps, useSSRContext, unref, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { N as Navbar } from "./Navbar-DKjwHpMh.js";
import { F as Footer } from "./Footer-BNllGzeY.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { g as ge } from "../ssr.js";
import "axios";
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
const _sfc_main$1 = {
  __name: "WebDesignCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([
      "/assets/images/web-carousel/ramo-home.jpg",
      "/assets/images/web-carousel/ramo-services.jpg",
      "/assets/images/web-carousel/km-home-page.jpg",
      "/assets/images/web-carousel/km-shop-page.jpg",
      "/assets/images/web-carousel/km-login-page.jpg"
    ]);
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto mt-8 px-0" }, _attrs))} data-v-e2072713><div class="relative" data-v-e2072713><img${ssrRenderAttr("src", images.value[activeIndex.value])} class="w-full h-96 object-cover rounded-lg" alt="Website screenshot" data-v-e2072713><button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-e2072713> ‹ </button><button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-e2072713> › </button></div><div class="overflow-x-auto mt-4" data-v-e2072713><div class="flex gap-2 justify-center min-w-max px-2" data-v-e2072713><!--[-->`);
      ssrRenderList(images.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{
          "border-blue-500": index === activeIndex.value,
          "border-transparent": index !== activeIndex.value
        }, "w-20 h-12 sm:w-24 sm:h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0"])}" data-v-e2072713>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Services/WebDesignCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WebDesignCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2072713"]]);
const _sfc_main = {
  __name: "WebDesign",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Navbar, { seo: __props.seo }, null, _parent));
      _push(ssrRenderComponent(unref(ge), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-67942148${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-67942148${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-67942148${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-67942148${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-67942148${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-67942148${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-67942148${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-67942148${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-67942148${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-67942148${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-67942148${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-67942148${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-67942148${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-67942148${_scopeId}><meta name="robots" content="index, follow" data-v-67942148${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-67942148${_scopeId}><meta name="theme-color" content="#0d6efd" data-v-67942148${_scopeId}>`);
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
      _push(`<section id="apply" class="cta" data-v-67942148><div class="container" data-aos="zoom-in" data-v-67942148><div class="text-center text-white" data-v-67942148><h1 class="fw-bold" data-v-67942148>Website Design</h1><p data-v-67942148> At Penda Graphics, our web design services combine creativity and functionality to give your brand an unforgettable digital presence</p></div></div></section><section data-v-67942148><div class="container mt-5 my-5 py-5 px-4" data-v-67942148><div class="row" data-v-67942148><div class="col-md-6" data-v-67942148><img${ssrRenderAttr("src", __props.seo.sec_img)} alt="Web design" class="rounded-lg shadow-md" loading="lazy" style="${ssrRenderStyle({ "width": "500px", "height": "400px", "object-fit": "cover" })}" data-v-67942148></div><div class="col-md-6 align-self-center" data-v-67942148><h2 class="fw-bold" data-v-67942148>Websites That Work — and Wow</h2><p data-v-67942148>We design custom websites that blend beauty with functionality. Whether you need a sleek portfolio, a lead-generating landing page, or a powerful business site, our designs are fast, responsive, and built to impress — on any device.</p><h5 data-v-67942148>Our website design services include:</h5><ul class="list-disc pl-6 space-y-2 mt-3" data-v-67942148><li data-v-67942148>Custom website design tailored to your brand</li><li data-v-67942148>Responsive, mobile-friendly layouts</li><li data-v-67942148>SEO-optimized structure</li><li data-v-67942148>Modern UI/UX design practices</li><li data-v-67942148>Fast loading times and performance optimization</li></ul></div></div></div></section><section class="py-5 banner-image" data-v-67942148><div class="container px-4" data-v-67942148><div class="row" data-v-67942148><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-67942148><div class="p-3 border-0" data-v-67942148><div class="align-items-center mb-2 text-white" data-v-67942148><h4 class="fw-bold" data-v-67942148>Modern &amp; Clean</h4><p data-v-67942148>At Website Design Solutions, we craft websites using cutting-edge trends and technologies to meet the demands of today’s digital landscape.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-67942148><div class="p-3 border-0" data-v-67942148><div class="align-items-center mb-2 text-white" data-v-67942148><h4 class="fw-bold" data-v-67942148>Easy to use</h4><p data-v-67942148>User Experience (UX) has emerged as a critical aspect in website design, influencing how visitors interact, comprehend, and engage with your company’s online presence.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-67942148><div class="p-3 border-0" data-v-67942148><div class="align-items-center mb-2 text-white" data-v-67942148><h4 class="fw-bold" data-v-67942148>Responsive Design</h4><p data-v-67942148>A responsive website dynamically adjusts its layout and features to suit the screen size and browser specifications, ensuring optimal functionality and preserving its visual appeal across various devices.</p></div></div></div><div class="col-md-4 col-sm-6 mb-4" data-v-67942148><div class="p-3 border-0" data-v-67942148><div class="align-items-center mb-2 text-white" data-v-67942148><h4 class="fw-bold" data-v-67942148>Quick Turnaround Time</h4><p data-v-67942148>We utilize cutting-edge technology tools to expedite the development process, enabling us to meet our clients’ deadlines efficiently and effectively.</p></div></div></div><div class="col-md-4 col-sm-6 mb-4" data-v-67942148><div class="p-3 border-0" data-v-67942148><div class="align-items-center mb-2 text-white" data-v-67942148><h4 class="fw-bold" data-v-67942148>SEO Friendly</h4><p data-v-67942148>We strategically position your brand across various platforms, ensuring it stands out and outperforms your competitors.</p></div></div></div><div class="col-md-4 col-sm-6 mb-4" data-v-67942148><div class="p-3 border-0" data-v-67942148><div class="align-items-center mb-2 text-white" data-v-67942148><h4 class="fw-bold" data-v-67942148>Tech Support</h4><p data-v-67942148>Quick technical support to enure the smooth running of you website and respond to enquiries on content changes.</p></div></div></div></div></div></section><section data-v-67942148><div class="container mt-5 my-5 py-5 px-4" data-v-67942148><div class="row" data-v-67942148><div class="col-md-6 align-self-center" data-v-67942148><h1 class="fw-bold" data-v-67942148>Case Studies</h1><p data-v-67942148>Dive into our collection of captivating web design case studies, showcasing our expertise in crafting exceptional online experiences for a diverse range of clients. From startups to established brands, our portfolio highlights our ability to blend creativity with functionality, resulting in websites that not only engage users but also drive tangible results. </p></div><div class="col-md-6" data-v-67942148>`);
      _push(ssrRenderComponent(WebDesignCarousel, null, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/WebDesign.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WebDesign = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-67942148"]]);
export {
  WebDesign as default
};
