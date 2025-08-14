import { _ as _export_sfc, N as Navbar } from "./Navbar-B2dw1uDe.js";
import { resolveComponent, withCtx, createVNode, createBlock, toDisplayString, openBlock, Fragment, renderList, computed, onMounted, useSSRContext } from "vue";
import { g as ge } from "../ssr.js";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
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
const _sfc_main = {
  name: "AboutUS",
  components: { Navbar, Head: ge },
  props: {
    seo: {
      type: Object,
      required: true
    },
    structuredData: {
      type: Object,
      required: true
    },
    businessInfo: {
      type: Object,
      required: true
    },
    socialMedia: {
      type: Object,
      required: true
    },
    images: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const structuredDataJson = computed(() => {
      return JSON.stringify(props.structuredData);
    });
    onMounted(() => {
      if (props.businessInfo.location.coordinates) {
        const { lat, lng } = props.businessInfo.location.coordinates;
      }
      Object.entries(props.socialMedia).forEach(([platform, url]) => {
      });
    });
    return {
      structuredDataJson
    };
  },
  data() {
    return {
      currentYear: (/* @__PURE__ */ new Date()).getFullYear()
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_Navbar = resolveComponent("Navbar");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-0b19f45d${_scopeId}>${ssrInterpolate($props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", $props.seo.description)} data-v-0b19f45d${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $props.seo.keywords)} data-v-0b19f45d${_scopeId}><link rel="canonical"${ssrRenderAttr("href", $props.seo.canonical_url)} data-v-0b19f45d${_scopeId}><meta property="og:title"${ssrRenderAttr("content", $props.seo.og_title)} data-v-0b19f45d${_scopeId}><meta property="og:description"${ssrRenderAttr("content", $props.seo.og_description)} data-v-0b19f45d${_scopeId}><meta property="og:image"${ssrRenderAttr("content", $props.seo.og_image)} data-v-0b19f45d${_scopeId}><meta property="og:url"${ssrRenderAttr("content", $props.seo.og_url)} data-v-0b19f45d${_scopeId}><meta property="og:type"${ssrRenderAttr("content", $props.seo.og_type)} data-v-0b19f45d${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", $props.seo.og_site_name)} data-v-0b19f45d${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", $props.seo.twitter_card)} data-v-0b19f45d${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", $props.seo.twitter_title)} data-v-0b19f45d${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", $props.seo.twitter_description)} data-v-0b19f45d${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", $props.seo.twitter_image)} data-v-0b19f45d${_scopeId}><meta name="robots"${ssrRenderAttr("content", $props.seo.robots)} data-v-0b19f45d${_scopeId}><meta name="author"${ssrRenderAttr("content", $props.seo.author)} data-v-0b19f45d${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-0b19f45d${_scopeId}><meta name="theme-color"${ssrRenderAttr("content", $props.seo.theme_color)} data-v-0b19f45d${_scopeId}><meta name="msapplication-TileColor"${ssrRenderAttr("content", $props.seo.msapplication_TileColor)} data-v-0b19f45d${_scopeId}><meta name="apple-mobile-web-app-capable"${ssrRenderAttr("content", $props.seo.apple_mobile_web_app_capable)} data-v-0b19f45d${_scopeId}><meta name="apple-mobile-web-app-status-bar-style"${ssrRenderAttr("content", $props.seo.apple_mobile_web_app_status_bar_style)} data-v-0b19f45d${_scopeId}><meta name="geo.region"${ssrRenderAttr("content", $props.seo.geo_region)} data-v-0b19f45d${_scopeId}><meta name="geo.placename"${ssrRenderAttr("content", $props.seo.geo_placename)} data-v-0b19f45d${_scopeId}><meta name="geo.position"${ssrRenderAttr("content", $props.seo.geo_position)} data-v-0b19f45d${_scopeId}><meta name="ICBM"${ssrRenderAttr("content", $props.seo.ICBM)} data-v-0b19f45d${_scopeId}><meta name="last-modified"${ssrRenderAttr("content", $props.seo.last_modified)} data-v-0b19f45d${_scopeId}><meta property="article:published_time"${ssrRenderAttr("content", $props.seo.published_time)} data-v-0b19f45d${_scopeId}><meta property="article:modified_time"${ssrRenderAttr("content", $props.seo.modified_time)} data-v-0b19f45d${_scopeId}><!--[-->`);
        ssrRenderList($props.seo.preload_images, (image) => {
          _push2(`<link rel="preload"${ssrRenderAttr("href", image)} as="image" data-v-0b19f45d${_scopeId}>`);
        });
        _push2(`<!--]-->`);
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
          }, null, 8, ["href"]),
          createVNode("meta", {
            property: "og:title",
            content: $props.seo.og_title
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:description",
            content: $props.seo.og_description
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:image",
            content: $props.seo.og_image
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:url",
            content: $props.seo.og_url
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:type",
            content: $props.seo.og_type
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:site_name",
            content: $props.seo.og_site_name
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:card",
            content: $props.seo.twitter_card
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:title",
            content: $props.seo.twitter_title
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:description",
            content: $props.seo.twitter_description
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:image",
            content: $props.seo.twitter_image
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "robots",
            content: $props.seo.robots
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "author",
            content: $props.seo.author
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
          }),
          createVNode("meta", {
            name: "theme-color",
            content: $props.seo.theme_color
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "msapplication-TileColor",
            content: $props.seo.msapplication_TileColor
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "apple-mobile-web-app-capable",
            content: $props.seo.apple_mobile_web_app_capable
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "apple-mobile-web-app-status-bar-style",
            content: $props.seo.apple_mobile_web_app_status_bar_style
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "geo.region",
            content: $props.seo.geo_region
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "geo.placename",
            content: $props.seo.geo_placename
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "geo.position",
            content: $props.seo.geo_position
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "ICBM",
            content: $props.seo.ICBM
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "last-modified",
            content: $props.seo.last_modified
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "article:published_time",
            content: $props.seo.published_time
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "article:modified_time",
            content: $props.seo.modified_time
          }, null, 8, ["content"]),
          (openBlock(true), createBlock(Fragment, null, renderList($props.seo.preload_images, (image) => {
            return openBlock(), createBlock("link", {
              key: image,
              rel: "preload",
              href: image,
              as: "image"
            }, null, 8, ["href"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_Navbar, { seo: $props.seo }, null, _parent));
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title data-v-0b19f45d${_scopeId}>${ssrInterpolate($props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", $props.seo.description)} data-v-0b19f45d${_scopeId}><meta name="keywords"${ssrRenderAttr("content", $props.seo.keywords)} data-v-0b19f45d${_scopeId}><link rel="canonical"${ssrRenderAttr("href", $props.seo.canonical_url)} data-v-0b19f45d${_scopeId}><meta property="og:title"${ssrRenderAttr("content", $props.seo.og_title)} data-v-0b19f45d${_scopeId}><meta property="og:description"${ssrRenderAttr("content", $props.seo.og_description)} data-v-0b19f45d${_scopeId}><meta property="og:image"${ssrRenderAttr("content", $props.seo.og_image)} data-v-0b19f45d${_scopeId}><meta property="og:url"${ssrRenderAttr("content", $props.seo.og_url)} data-v-0b19f45d${_scopeId}><meta property="og:type"${ssrRenderAttr("content", $props.seo.og_type)} data-v-0b19f45d${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", $props.seo.og_site_name)} data-v-0b19f45d${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", $props.seo.twitter_card)} data-v-0b19f45d${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", $props.seo.og_title)} data-v-0b19f45d${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", $props.seo.og_description)} data-v-0b19f45d${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", $props.seo.og_image)} data-v-0b19f45d${_scopeId}><meta name="robots" content="index, follow" data-v-0b19f45d${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-0b19f45d${_scopeId}><meta name="theme-color" content="#0d6efd" data-v-0b19f45d${_scopeId}>`);
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
          }, null, 8, ["href"]),
          createVNode("meta", {
            property: "og:title",
            content: $props.seo.og_title
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:description",
            content: $props.seo.og_description
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:image",
            content: $props.seo.og_image
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:url",
            content: $props.seo.og_url
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:type",
            content: $props.seo.og_type
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:site_name",
            content: $props.seo.og_site_name
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:card",
            content: $props.seo.twitter_card
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:title",
            content: $props.seo.og_title
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:description",
            content: $props.seo.og_description
          }, null, 8, ["content"]),
          createVNode("meta", {
            name: "twitter:image",
            content: $props.seo.og_image
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
  _push(`<section class="hero-section" data-v-0b19f45d><div class="container text-center py-5" data-v-0b19f45d><h1 class="display-4 fw-bold mb-3" data-v-0b19f45d>Crafting Digital Experiences</h1><p class="lead fs-4 mb-4 mx-auto" style="${ssrRenderStyle({ "max-width": "700px" })}" data-v-0b19f45d> Where creativity meets strategy to transform your brand&#39;s digital presence </p><div class="d-flex justify-content-center gap-3" data-v-0b19f45d><a href="/#portfolio" class="btn btn-light align-self-center py-3" data-v-0b19f45d>View Our Work</a><a href="/contact-us" class="btn btn-outline-light" data-v-0b19f45d>Get in Touch</a></div></div></section><section class="py-5" data-v-0b19f45d><div class="container" data-v-0b19f45d><div class="row align-items-center" data-v-0b19f45d><div class="col-lg-6 mb-4 mb-lg-0" data-v-0b19f45d><h2 class="section-title fw-bold" data-v-0b19f45d>Our Story</h2><p data-v-0b19f45d> Founded with a passion for visual storytelling, Penda Graphics has evolved from a boutique design studio into a comprehensive digital solutions provider. Our journey began with creating impactful graphic designs—logos that capture brand essence, print materials that command attention, and packaging that sells products before they&#39;re even touched. </p><p data-v-0b19f45d> Today, we&#39;ve expanded our expertise to embrace the full digital ecosystem. We craft engaging websites, develop powerful web applications, and implement strategic digital marketing campaigns that drive meaningful results for businesses across industries. </p><p data-v-0b19f45d> Through every transformation, our core mission remains unchanged: to help brands communicate their unique value through exceptional design and technical innovation. </p></div><div class="col-lg-6" data-v-0b19f45d><div class="position-relative" data-v-0b19f45d><img${ssrRenderAttr("src", $props.seo.sec_img)} alt="Penda Graphics creative process" class="img-fluid rounded-4 shadow-md" data-v-0b19f45d><div class="position-absolute top-0 start-0 translate-middle bg-primary rounded-circle p-3" style="${ssrRenderStyle({ "width": "80px", "height": "80px" })}" data-v-0b19f45d><div class="text-center text-white" data-v-0b19f45d><small class="d-block" data-v-0b19f45d>SINCE</small><span class="fw-bold" data-v-0b19f45d>2019</span></div></div></div></div></div></div></section><section class="py-5 accent-bg" data-v-0b19f45d><div class="container" data-v-0b19f45d><h2 class="section-title fw-bold text-center mb-5" data-v-0b19f45d>Our Evolution</h2><div class="row justify-content-center" data-v-0b19f45d><div class="col-lg-8" data-v-0b19f45d><div class="journey-line" data-v-0b19f45d><div class="journey-item" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d>Design Foundation</h5><p data-v-0b19f45d> Started as a specialized graphic design studio creating brand identities and print collateral for local businesses. </p></div><div class="journey-item" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d>Digital Expansion</h5><p data-v-0b19f45d> Extended services to include responsive website design and development, helping clients establish their digital presence. </p></div><div class="journey-item" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d>Marketing Integration</h5><p data-v-0b19f45d> Added digital marketing capabilities to help clients not just exist online, but thrive through strategic campaigns and content. </p></div><div class="journey-item" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d>Technical Innovation</h5><p data-v-0b19f45d> Mastered web application development, creating custom solutions that solve business challenges and enhance operations. </p></div><div class="journey-item" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d>Today &amp; Beyond</h5><p data-v-0b19f45d> Operating as a full-service digital partner, blending creativity, strategy, and technology to deliver comprehensive solutions. </p></div></div></div></div></div></section><section class="py-5" data-v-0b19f45d><div class="container" data-v-0b19f45d><h2 class="section-title fw-bold text-center" data-v-0b19f45d>What We Offer</h2><p class="text-center mb-5" style="${ssrRenderStyle({ "max-width": "700px", "margin": "0 auto" })}" data-v-0b19f45d> Our comprehensive suite of services is designed to elevate your brand at every digital touchpoint </p><div class="row g-4" data-v-0b19f45d><div class="col-md-4" data-v-0b19f45d><div class="service-card h-100 p-4 text-center" data-v-0b19f45d><div class="service-icon" style="${ssrRenderStyle({ "background-color": "rgba(99, 102, 241, 0.1)" })}" data-v-0b19f45d>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "pencil-ruler"],
    class: "fa-2x",
    style: { "color": "#000000" }
  }, null, _parent));
  _push(`</div><h5 class="fw-bold mb-3" data-v-0b19f45d><a href="/services/identity-design" data-v-0b19f45d>Brand &amp; Visual Identity</a></h5><p class="mb-0" data-v-0b19f45d> Logo design, brand guidelines, stationery, marketing collateral, and comprehensive visual systems that tell your brand&#39;s story. </p></div></div><div class="col-md-4" data-v-0b19f45d><div class="service-card h-100 p-4 text-center" data-v-0b19f45d><div class="service-icon" style="${ssrRenderStyle({ "background-color": "rgba(99, 102, 241, 0.1)" })}" data-v-0b19f45d>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "laptop-code"],
    class: "fa-2x",
    style: { "color": "#000000" }
  }, null, _parent));
  _push(`</div><h5 class="fw-bold mb-3" data-v-0b19f45d><a href="/services/web-design" data-v-0b19f45d>Web Design &amp; Development</a></h5><p class="mb-0" data-v-0b19f45d> Responsive websites with intuitive user experiences, optimized for performance across all devices and platforms. </p></div></div><div class="col-md-4" data-v-0b19f45d><div class="service-card h-100 p-4 text-center" data-v-0b19f45d><div class="service-icon" style="${ssrRenderStyle({ "background-color": "rgba(99, 102, 241, 0.1)" })}" data-v-0b19f45d>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "code"],
    class: "fa-2x",
    style: { "color": "#000000" }
  }, null, _parent));
  _push(`</div><h5 class="fw-bold mb-3" data-v-0b19f45d><a href="/services/web-design" data-v-0b19f45d>Web Applications</a></h5><p class="mb-0" data-v-0b19f45d> Custom web applications and software solutions that streamline operations, enhance customer experiences, and solve business challenges. </p></div></div><div class="col-md-4" data-v-0b19f45d><div class="service-card h-100 p-4 text-center" data-v-0b19f45d><div class="service-icon" style="${ssrRenderStyle({ "background-color": "rgba(99, 102, 241, 0.1)" })}" data-v-0b19f45d>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "shopping-cart"],
    class: "fa-2x",
    style: { "color": "#000000" }
  }, null, _parent));
  _push(`</div><h5 class="fw-bold mb-3" data-v-0b19f45d><a href="/services/e-commerce" data-v-0b19f45d>E-commerce Solutions</a></h5><p class="mb-0" data-v-0b19f45d> Online stores built for conversions, with secure payment gateways, inventory management, and seamless shopping experiences. </p></div></div><div class="col-md-4" data-v-0b19f45d><div class="service-card h-100 p-4 text-center" data-v-0b19f45d><div class="service-icon" style="${ssrRenderStyle({ "background-color": "rgba(99, 102, 241, 0.1)" })}" data-v-0b19f45d>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "bullhorn"],
    class: "fa-2x",
    style: { "color": "#000000" }
  }, null, _parent));
  _push(`</div><h5 class="fw-bold mb-3" data-v-0b19f45d><a href="/services/digital-marketing" data-v-0b19f45d>Digital Marketing</a></h5><p class="mb-0" data-v-0b19f45d> Strategic campaigns across search, social, and email channels to drive traffic, generate leads, and increase brand awareness. </p></div></div><div class="col-md-4" data-v-0b19f45d><div class="service-card h-100 p-4 text-center" data-v-0b19f45d><div class="service-icon" style="${ssrRenderStyle({ "background-color": "rgba(99, 102, 241, 0.1)" })}" data-v-0b19f45d>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, {
    icon: ["fas", "box-open"],
    class: "fa-2x",
    style: { "color": "#000000" }
  }, null, _parent));
  _push(`</div><h5 class="fw-bold mb-3" data-v-0b19f45d><a href="/services/product-design" data-v-0b19f45d>Print &amp; Packaging</a></h5><p class="mb-0" data-v-0b19f45d> Eye-catching print materials and product packaging designed to stand out in physical spaces and on retail shelves. </p></div></div></div></div></section><section class="py-5" data-v-0b19f45d><div class="container" data-v-0b19f45d><div class="row align-items-center" data-v-0b19f45d><div class="col-lg-6 order-lg-2 mb-4 mb-lg-0" data-v-0b19f45d><img${ssrRenderAttr("src", $props.seo.sec_img2)} alt="Our collaborative process" class="img-fluid" data-v-0b19f45d></div><div class="col-lg-6 order-lg-1" data-v-0b19f45d><h2 class="section-title fw-bold" data-v-0b19f45d>Our Approach</h2><div class="mb-4" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d><i class="fas fa-search text-primary me-2" data-v-0b19f45d></i> Discover</h5><p data-v-0b19f45d>We begin by understanding your business goals, audience needs, and competitive landscape to establish a clear direction.</p></div><div class="mb-4" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d><i class="fas fa-lightbulb text-primary me-2" data-v-0b19f45d></i> Create</h5><p data-v-0b19f45d>Our team develops concepts and solutions that align with your objectives, iterating based on collaboration and feedback.</p></div><div class="mb-4" data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d><i class="fas fa-rocket text-primary me-2" data-v-0b19f45d></i> Deliver</h5><p data-v-0b19f45d>We implement polished solutions with precision, ensuring they work flawlessly across all intended channels and platforms.</p></div><div data-v-0b19f45d><h5 class="fw-bold" data-v-0b19f45d><i class="fas fa-chart-line text-primary me-2" data-v-0b19f45d></i> Optimize</h5><p data-v-0b19f45d>Through continuous analysis and refinement, we ensure your digital assets and campaigns perform at their best over time.</p></div></div></div></div></section><section class="py-5" data-v-0b19f45d><div class="container" data-v-0b19f45d><div class="cta-section p-5" data-v-0b19f45d><div class="row align-items-center" data-v-0b19f45d><div class="col-lg-8 mb-4 mb-lg-0" data-v-0b19f45d><h2 class="fw-bold" data-v-0b19f45d>Ready to Transform Your Digital Presence?</h2><p class="lead mb-0" data-v-0b19f45d>Let&#39;s create experiences that engage your audience and drive business growth.</p></div><div class="col-lg-4 text-lg-end" data-v-0b19f45d><a href="/contact-us" class="btn btn-light btn-lg" data-v-0b19f45d>Get Started</a></div></div></div></div></section><footer class="py-5" data-v-0b19f45d><div class="container" data-v-0b19f45d><div class="row" data-v-0b19f45d><div class="col-lg-4 mb-4 mb-lg-0" data-v-0b19f45d><h5 class="fw-bold mb-3" data-v-0b19f45d>Penda Graphics</h5><p data-v-0b19f45d>Transforming brands through design and digital innovation since 2019.</p><div class="d-flex gap-3 mt-4" data-v-0b19f45d><a href="https://web.facebook.com/Penda.graphix" class="text-white" data-v-0b19f45d><i class="fab fa-facebook-f" data-v-0b19f45d></i></a><a href="https://www.instagram.com/penda_graphics/" class="text-white" data-v-0b19f45d><i class="fab fa-instagram" data-v-0b19f45d></i></a></div></div><div class="col-lg-2 col-md-4 mb-4 mb-md-0" data-v-0b19f45d><h6 class="fw-bold mb-3" data-v-0b19f45d>Services</h6><ul class="list-unstyled" data-v-0b19f45d><li class="mb-2" data-v-0b19f45d><a href="/services/web-design" class="text-white-50 text-decoration-none" data-v-0b19f45d>Web Design</a></li><li class="mb-2" data-v-0b19f45d><a href="/services/graphic-design" class="text-white-50 text-decoration-none" data-v-0b19f45d>Graphic Design</a></li><li class="mb-2" data-v-0b19f45d><a href="/services/product-design" class="text-white-50 text-decoration-none" data-v-0b19f45d>Product Design</a></li><li class="mb-2" data-v-0b19f45d><a href="/services/digital-marketing" class="text-white-50 text-decoration-none" data-v-0b19f45d>Digital Marketing</a></li></ul></div><div class="col-lg-2 col-md-4 mb-4 mb-md-0" data-v-0b19f45d><h6 class="fw-bold mb-3" data-v-0b19f45d>Company</h6><ul class="list-unstyled" data-v-0b19f45d><li class="mb-2" data-v-0b19f45d><a href="#" class="text-white-50 text-decoration-none" data-v-0b19f45d>About</a></li><li class="mb-2" data-v-0b19f45d><a href="/#portfolio" class="text-white-50 text-decoration-none" data-v-0b19f45d>Portfolio</a></li></ul></div><div class="col-lg-4 col-md-4" data-v-0b19f45d><h6 class="fw-bold mb-3" data-v-0b19f45d>Contact</h6><ul class="list-unstyled" data-v-0b19f45d><li class="mb-2" data-v-0b19f45d><i class="fas fa-map-marker-alt me-2 text-primary" data-v-0b19f45d></i> Birch Acres, Kempton Park</li><li class="mb-2" data-v-0b19f45d><a href="tel:+27738114652" data-v-0b19f45d><i class="fas fa-phone me-2 text-primary" data-v-0b19f45d></i><span class="text-white" data-v-0b19f45d>+27 73 811 4652</span></a></li><li class="mb-2" data-v-0b19f45d><a href="mailto:info@pendagraphics.co.za" data-v-0b19f45d><i class="fas fa-envelope me-2 text-primary" data-v-0b19f45d></i><span class="text-white" data-v-0b19f45d>info@pendagraphics.co.za</span></a></li></ul></div></div><hr class="my-4 bg-white-50" data-v-0b19f45d><div class="row" data-v-0b19f45d><div class="col-md-12 text-center" data-v-0b19f45d><p class="small text-white-50 mb-0" data-v-0b19f45d>© ${ssrInterpolate($data.currentYear)} Penda Graphics. All rights reserved.</p></div></div></div></footer><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AboutUS.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AboutUS = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0b19f45d"]]);
export {
  AboutUS as default
};
