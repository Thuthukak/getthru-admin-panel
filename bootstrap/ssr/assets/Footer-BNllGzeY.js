import { ref, resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Footer",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    const form = ref({
      email: ""
    });
    const currentYear = ref((/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<!--[--><footer class="bg-shape-primary text-white py-5" data-v-d45926e3><div class="container px-4" data-v-d45926e3><div class="row" data-v-d45926e3><div class="col-md-4 mb-4 mb-md-0" data-v-d45926e3><img${ssrRenderAttr("src", (_a = __props.seo) == null ? void 0 : _a.og_image)} alt="Logo" class="w-60 mb-3" data-v-d45926e3><p class="text-white" data-v-d45926e3>Transforming brands through design and digital innovation since 2019.</p></div><div class="col-md-4 mb-4 mb-md-0" data-v-d45926e3><h5 class="mb-3" data-v-d45926e3>Contact Us</h5><ul class="list-unstyled" data-v-d45926e3><li class="d-flex align-items-center mb-2" data-v-d45926e3><div class="text-white p-2 d-flex align-items-center justify-content-center me-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3><i class="fas fa-map-marker-alt" data-v-d45926e3></i></div><span data-v-d45926e3>Kempton Park, Johannesburg</span></li><li class="d-flex align-items-center mb-2" data-v-d45926e3><div class="text-white p-2 d-flex align-items-center justify-content-center me-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3><i class="fas fa-phone" data-v-d45926e3></i></div><span data-v-d45926e3><a class="text-white" href="tel:+27738114652" data-v-d45926e3>+27 73 811 4652</a></span></li><li class="d-flex align-items-center" data-v-d45926e3><div class="text-white p-2 d-flex align-items-center justify-content-center me-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3><i class="fas fa-envelope" data-v-d45926e3></i></div><span data-v-d45926e3><a class="text-white" href="mailto:info@pendagraphics.co.za" data-v-d45926e3>info@pendagraphics.co.za</a></span></li></ul></div><div class="col-md-4" data-v-d45926e3><h5 class="mb-3" data-v-d45926e3>Find us on social media</h5><div class="d-flex gap-2" data-v-d45926e3><a href="https://web.facebook.com/Penda.graphix" class="text-white p-2 d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "facebook"] }, null, _parent));
      _push(`</a><a href="https://www.instagram.com/penda_graphics/" class="text-white p-2 d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "instagram"] }, null, _parent));
      _push(`</a><a href="https://www.youtube.com/@PendaGraphics" class="text-white p-2 d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "youtube"] }, null, _parent));
      _push(`</a><a href="https://www.tiktok.com/@pendagraphics?_t=ZM-8xCbzWLUJ7Q&amp;_r=1" class="text-white p-2 d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" data-v-d45926e3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "tiktok"] }, null, _parent));
      _push(`</a></div><div class="mt-3" data-v-d45926e3> Subscribe to our newsletter</div><form data-v-d45926e3><div class="input-group mb-3 mt-2" data-v-d45926e3><input type="email"${ssrRenderAttr("value", form.value.email)} class="form-control" placeholder="Enter your email" data-v-d45926e3><button class="btn btn-primary" type="submit" data-v-d45926e3>Subscribe</button></div></form></div></div></div></footer><div class="bg-white text-black text-center py-3" data-v-d45926e3><p class="mb-0" data-v-d45926e3>Penda Graphics © ${ssrInterpolate(currentYear.value)}. All rights reserved.</p></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d45926e3"]]);
export {
  Footer as F
};
