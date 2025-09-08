import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { N as Navbar } from "./Navbar-DKjwHpMh.js";
import { F as Footer } from "./Footer-BNllGzeY.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
const _sfc_main = {
  __name: "DigitalMarketing",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Navbar, { seo: __props.seo }, null, _parent));
      _push(`<section id="apply" class="cta" data-v-611cd769><div class="container px-5" data-aos="zoom-in" data-v-611cd769><div class="text-center text-white" data-v-611cd769><h1 class="fw-bold" data-v-611cd769>Digital Marketing That Delivers Results</h1><p data-v-611cd769>We craft targeted campaigns that boost visibility, drive traffic, and convert clicks into loyal customers — all tailored to your brand’s goals and audience..</p></div></div></section><section data-v-611cd769><div class="container mt-5 my-5 py-5 px-4" data-v-611cd769><div class="row" data-v-611cd769><div class="col-md-5" data-v-611cd769><img${ssrRenderAttr("src", __props.seo.sec_img)} alt="Web design" class="shadow-lg rounded align-self-center" loading="lazy" style="${ssrRenderStyle({ "width": "500px", "height": "400px", "object-fit": "cover" })}" data-v-611cd769></div><div class="col-md-7 align-self-center" data-v-611cd769><h2 class="fw-bold mb-3" data-v-611cd769> Reach the Right People, the Right Way</h2><p data-v-611cd769>We don’t just post and pray — we strategize. From SEO and social media to email campaigns and paid ads, we use data-driven tactics to grow your audience, increase engagement, and drive real business results. It&#39;s marketing with purpose and measurable impact. </p></div></div></div></section><section class="py-5 banner-image" data-v-611cd769><div class="container px-4" data-v-611cd769><div class="row" data-v-611cd769><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-611cd769><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-611cd769><div data-v-611cd769><h3 class="fw-bold mb-1" data-v-611cd769>Organic SEO</h3><p class="mb-0" data-v-611cd769>Let us help you achieve top rankings on the first page of Google and other leading search engines.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-611cd769><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-611cd769><div data-v-611cd769><h3 class="fw-bold mb-1" data-v-611cd769>Google Ads</h3><p class="mb-0" data-v-611cd769>Expertly manage and implement all Google AdWords features for optimal performance.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-611cd769><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-611cd769><div data-v-611cd769><h3 class="fw-bold mb-1" data-v-611cd769>Social Media</h3><p class="mb-0" data-v-611cd769>Our dedicated team will oversee your brand’s presence across all major social media platforms and networks.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-611cd769><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-611cd769><div data-v-611cd769><h3 class="fw-bold mb-1" data-v-611cd769>Web Design</h3><p class="mb-0" data-v-611cd769>We specialize in creating professional, user-friendly websites and graphic designs tailored to enhance your business’s online presence.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-611cd769><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-611cd769><div data-v-611cd769><h3 class="fw-bold mb-1" data-v-611cd769>Brand Strategy</h3><p class="mb-0" data-v-611cd769>We strategically position your brand across various platforms, ensuring it stands out and outperforms your competitors.</p></div></div></div><div class="col-md-4 col-sm-6 mt-4 mb-4" data-v-611cd769><div class="p-3 border-0 text-white d-flex align-items-center justify-content-between gap-3 icon-box" data-v-611cd769><div data-v-611cd769><h3 class="fw-bold mb-1" data-v-611cd769>Auto Lead Generation</h3><p class="mb-0" data-v-611cd769>Our main goal is to ensure that you consistently receive a steady stream of leads and grow your business.</p></div></div></div></div></div></section>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services/DigitalMarketing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DigitalMarketing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-611cd769"]]);
export {
  DigitalMarketing as default
};
