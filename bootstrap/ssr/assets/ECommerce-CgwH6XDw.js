import { ref, mergeProps, useSSRContext, resolveComponent, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { N as Navbar } from "./Navbar-DKjwHpMh.js";
import { F as Footer } from "./Footer-BNllGzeY.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
const _sfc_main$1 = {
  __name: "ECommerceCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([
      "/assets/images/e-commerce-carousel/km-collection-scaled1.jpg",
      "/assets/images/e-commerce-carousel/km-home-page1.jpg",
      "/assets/images/e-commerce-carousel/km-shop-page1.jpg",
      "/assets/images/e-commerce-carousel/km-login-page1.jpg"
    ]);
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto mt-8" }, _attrs))} data-v-afb4f970><div class="relative" data-v-afb4f970><img${ssrRenderAttr("src", images.value[activeIndex.value])} class="w-full h-96 object-cover rounded-lg" alt="Website screenshot" data-v-afb4f970><button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-afb4f970> ‹ </button><button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-afb4f970> › </button></div><div class="overflow-x-auto mt-4" data-v-afb4f970><div class="flex mt-4 gap-2 justify-center min-w-max px-2" data-v-afb4f970><!--[-->`);
      ssrRenderList(images.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{
          "border-blue-500": index === activeIndex.value,
          "border-transparent": index !== activeIndex.value
        }, "w-24 h-16 object-cover rounded cursor-pointer border-2"])}" data-v-afb4f970>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Services/ECommerceCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ECommerceCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-afb4f970"]]);
const _sfc_main = {
  __name: "ECommerce",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Navbar, { seo: __props.seo }, null, _parent));
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-05429bdf${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-05429bdf${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-05429bdf${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-05429bdf${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-05429bdf${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-05429bdf${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-05429bdf${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-05429bdf${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-05429bdf${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-05429bdf${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-05429bdf${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-05429bdf${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-05429bdf${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-05429bdf${_scopeId}><meta name="robots" content="index, follow" data-v-05429bdf${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-05429bdf${_scopeId}><meta name="theme-color" content="#0d6efd" data-v-05429bdf${_scopeId}>`);
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
      _push(`<section id="apply" class="cta" data-v-05429bdf><div class="container px-5" data-aos="zoom-in" data-v-05429bdf><div class="text-center text-white" data-v-05429bdf><h1 class="fw-bold" data-v-05429bdf>E-Commerce Solutions</h1><p data-v-05429bdf>We build powerful, user-friendly online stores designed to convert. From sleek product pages to secure checkout experiences, our solutions help you grow, scale, and succeed in the digital marketplace.</p></div></div></section><section data-v-05429bdf><div class="container mt-5 my-5 py-5 px-4" data-v-05429bdf><div class="row" data-v-05429bdf><div class="col-md-5" data-v-05429bdf><img${ssrRenderAttr("src", __props.seo.sec_img)} alt="Web design" class="shadow-lg rounded align-self-center" loading="lazy" style="${ssrRenderStyle({ "width": "500px", "height": "400px", "object-fit": "cover" })}" data-v-05429bdf></div><div class="col-md-7 align-self-center" data-v-05429bdf><h2 class="fw-bold mb-3" data-v-05429bdf>Sell Smarter, Not Harder</h2><p data-v-05429bdf>We design and develop e-commerce platforms that do more than look good — they perform. Whether you&#39;re launching a new store or upgrading an existing one, we focus on intuitive navigation, mobile responsiveness, and seamless checkout experiences that turn visitors into loyal customers. </p></div></div></div></section><section class="py-5 banner-image" data-v-05429bdf><div class="container px-4" data-v-05429bdf><div class="row" data-v-05429bdf><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-05429bdf><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-05429bdf><div class="icon-circle" data-v-05429bdf><i class="fas fa-shopping-cart" data-v-05429bdf></i></div><div data-v-05429bdf><h3 class="fw-bold mb-1" data-v-05429bdf>Seamless Shopping</h3><p class="mb-0" data-v-05429bdf>We create intuitive storefronts that make browsing and buying effortless for your customers.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-05429bdf><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-05429bdf><div class="icon-circle" data-v-05429bdf><i class="fas fa-lock" data-v-05429bdf></i></div><div data-v-05429bdf><h3 class="fw-bold mb-1" data-v-05429bdf>Secure Checkout</h3><p class="mb-0" data-v-05429bdf>Our checkout systems are built for trust, with safe payment gateways and customer data protection.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-05429bdf><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-05429bdf><div class="icon-circle" data-v-05429bdf><i class="fas fa-chart-line" data-v-05429bdf></i></div><div data-v-05429bdf><h3 class="fw-bold mb-1" data-v-05429bdf>Scalable Growth</h3><p class="mb-0" data-v-05429bdf>From small shops to enterprise stores, we build e-commerce solutions that grow with your business.</p></div></div></div></div></div></section><section data-v-05429bdf><div class="container mt-5 my-5 py-5 px-4" data-v-05429bdf><div class="row" data-v-05429bdf><div class="col-md-6 align-self-center" data-v-05429bdf><div class="mt-5" data-v-05429bdf><h1 class="fw-bold mb-3" data-v-05429bdf>Case Study</h1><p data-v-05429bdf>Step into the world of KM Collection and witness the evolution of their online presence through our e-commerce solution case study. Tasked with revolutionizing their digital platform, we embarked on a journey to elevate KM Collection’s online shopping experience. Our team meticulously crafted a bespoke e-commerce solution tailored to their unique needs and brand identity. Central to our strategy was the seamless integration of user-friendly navigation, captivating product displays, and secure payment gateways, ensuring a frictionless shopping journey for customers.</p></div></div><div class="col-md-6" data-v-05429bdf>`);
      _push(ssrRenderComponent(ECommerceCarousel, null, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/ECommerce.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ECommerce = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-05429bdf"]]);
export {
  ECommerce as default
};
