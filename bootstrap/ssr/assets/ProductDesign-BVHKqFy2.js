import { ref, mergeProps, useSSRContext, resolveComponent, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { N as Navbar } from "./Navbar-DKjwHpMh.js";
import { F as Footer } from "./Footer-BNllGzeY.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
const _sfc_main$1 = {
  __name: "ProductDesignCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([
      "/assets/images/product-carousel/LABEL-EXTRA-HOT-v2-scaled.jpg",
      "/assets/images/product-carousel/LABEL-LEMON-AND-HERB-v2-scaled.jpg",
      "/assets/images/product-carousel/LABEL-ORIGINAL-HOT-v2-scaled.jpg",
      "/assets/images/product-carousel/LABEL-XX-MILD-v2-scaled.jpg",
      "/assets/images/product-carousel/mabura-site-image-lemon.jpg",
      "/assets/images/product-carousel/Sauce-mockups-website-image1.jpg"
    ]);
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto mt-8 px-0" }, _attrs))} data-v-c95ed302><div class="relative" data-v-c95ed302><img${ssrRenderAttr("src", images.value[activeIndex.value])} class="w-full h-96 object-cover rounded-lg" alt="Website screenshot" data-v-c95ed302><button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-c95ed302> ‹ </button><button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded shadow" data-v-c95ed302> › </button></div><div class="overflow-x-auto mt-4" data-v-c95ed302><div class="flex mt-4 gap-2 justify-center min-w-max px-2" data-v-c95ed302><!--[-->`);
      ssrRenderList(images.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{
          "border-blue-500": index === activeIndex.value,
          "border-transparent": index !== activeIndex.value
        }, "w-24 h-16 object-cover rounded cursor-pointer border-2"])}" data-v-c95ed302>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Services/ProductDesignCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductDesignCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c95ed302"]]);
const _sfc_main = {
  __name: "ProductDesign",
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
            _push2(`<title data-v-a9d568ad${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-a9d568ad${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-a9d568ad${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-a9d568ad${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-a9d568ad${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-a9d568ad${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-a9d568ad${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-a9d568ad${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-a9d568ad${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-a9d568ad${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-a9d568ad${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-a9d568ad${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-a9d568ad${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-a9d568ad${_scopeId}><meta name="robots" content="index, follow" data-v-a9d568ad${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-a9d568ad${_scopeId}><meta name="theme-color" content="#0d6efd" data-v-a9d568ad${_scopeId}>`);
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
      _push(`<section id="apply" class="cta" data-v-a9d568ad><div class="container px-5" data-aos="zoom-in" data-v-a9d568ad><div class="text-center text-white" data-v-a9d568ad><h1 class="fw-bold" data-v-a9d568ad>Product Design</h1><p data-v-a9d568ad> we believe in the power of visual storytelling to captivate audiences and leave a lasting impression. Our expert graphic designers specialize in creating eye-catching designs that reflect your brand identity and convey your message with impact.</p></div></div></section><section data-v-a9d568ad><div class="container mt-5 my-5 py-5 px-4" data-v-a9d568ad><div class="row" data-v-a9d568ad><div class="col-md-5" data-v-a9d568ad><img${ssrRenderAttr("src", __props.seo.sec_img)} alt="Web design" class="align-self-center" loading="lazy" style="${ssrRenderStyle({ "width": "400px", "height": "400px", "object-fit": "cover" })}" data-v-a9d568ad></div><div class="col-md-7 align-self-center" data-v-a9d568ad><h2 class="fw-bold mb-3" data-v-a9d568ad>Product Design That Connects</h2><p data-v-a9d568ad>We craft visually compelling and functional product designs that captivate your audience and communicate your brand’s identity. From packaging to mockups, every detail is designed to make your product stand out on the shelf and in the digital space.</p><p data-v-a9d568ad>Whether you&#39;re launching a new product or refreshing an existing one, our design process ensures a perfect balance of creativity, usability, and brand alignment.</p></div></div></div></section><section class="py-5 banner-image" data-v-a9d568ad><div class="container px-4" data-v-a9d568ad><div class="row" data-v-a9d568ad><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-a9d568ad><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-a9d568ad><div class="icon-circle" data-v-a9d568ad>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: "lightbulb" }, null, _parent));
      _push(`</div><div data-v-a9d568ad><h3 class="fw-bold mb-1" data-v-a9d568ad>Innovative Ideas</h3><p class="mb-0" data-v-a9d568ad>We explore unique design directions that give your product a creative edge.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-a9d568ad><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-a9d568ad><div class="icon-circle" data-v-a9d568ad>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: "palette" }, null, _parent));
      _push(`</div><div data-v-a9d568ad><h3 class="fw-bold mb-1" data-v-a9d568ad>Packaging Design</h3><p class="mb-0" data-v-a9d568ad>Our packaging solutions blend functionality and style to elevate your brand.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-a9d568ad><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-a9d568ad><div class="icon-circle" data-v-a9d568ad>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: "desktop" }, null, _parent));
      _push(`</div><div data-v-a9d568ad><h3 class="fw-bold mb-1" data-v-a9d568ad>Mockups &amp; Visualization</h3><p class="mb-0" data-v-a9d568ad>We create realistic product mockups so you can visualize before production.</p></div></div></div></div></div></section><section data-v-a9d568ad><div class="container mt-5 my-5 py-5 px-4" data-v-a9d568ad><div class="row" data-v-a9d568ad><div class="col-md-6" data-v-a9d568ad><div class="mt-5" data-v-a9d568ad><h1 class="fw-bold mb-3" data-v-a9d568ad>Case Study</h1><h5 class="fw-bold" data-v-a9d568ad>The Success Story of Maburas Hot Sauce</h5><p data-v-a9d568ad>Embark on a fiery journey through our creative collaboration with Mabura Hot Sauce — a bold brand bursting with flavor and attitude. Our mission? To bottle up that intensity in a visual identity that sizzles.</p><p data-v-a9d568ad>We kicked things off with a custom-designed logo, blending heat, heritage, and heart into a mark that instantly communicates flavor and fire. Next came a colorful lineup of labels, each one tailored to the unique personality of Mabura’s sauces — from the blazing heat of Habanero to the bright zing of Jalapeño. Every shade, every font, every flame-inspired detail was crafted to stand out on the shelf and ignite curiosity.</p><p data-v-a9d568ad>To turn up the heat even more, we designed a bold marketing poster — a visual explosion of spice, flavor, and attitude — to help Mabura command attention both online and on the streets.</p></div></div><div class="col-md-6" data-v-a9d568ad>`);
      _push(ssrRenderComponent(ProductDesignCarousel, null, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/ProductDesign.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductDesign = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a9d568ad"]]);
export {
  ProductDesign as default
};
