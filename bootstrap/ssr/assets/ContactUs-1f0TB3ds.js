import { ref, reactive, onMounted, resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, N as Navbar } from "./Navbar-B2dw1uDe.js";
import { F as Footer } from "./Footer-Cv32ksWL.js";
import "axios";
const _sfc_main = {
  __name: "ContactUs",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    structuredData: String,
    contactInfo: Object
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const isSubmitting = ref(false);
    const submitted = ref(false);
    const errors = reactive({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    onMounted(() => {
      if (props.structuredData) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = props.structuredData;
        document.head.appendChild(script);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Navbar, { seo: __props.seo }, null, _parent));
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<title data-v-6894cba3${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-6894cba3${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-6894cba3${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-6894cba3${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-6894cba3${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-6894cba3${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-6894cba3${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-6894cba3${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-6894cba3${_scopeId}><meta property="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-6894cba3${_scopeId}><meta property="twitter:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-6894cba3${_scopeId}><meta property="twitter:title"${ssrRenderAttr("content", __props.seo.twitter_title || __props.seo.og_title)} data-v-6894cba3${_scopeId}><meta property="twitter:description"${ssrRenderAttr("content", __props.seo.twitter_description || __props.seo.og_description)} data-v-6894cba3${_scopeId}><meta property="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-6894cba3${_scopeId}><meta name="contact:phone"${ssrRenderAttr("content", (_a = __props.contactInfo) == null ? void 0 : _a.phone)} data-v-6894cba3${_scopeId}><meta name="contact:email"${ssrRenderAttr("content", (_b = __props.contactInfo) == null ? void 0 : _b.email)} data-v-6894cba3${_scopeId}><meta name="geo.region" content="ZA-GP" data-v-6894cba3${_scopeId}><meta name="geo.placename" content="Kempton Park" data-v-6894cba3${_scopeId}><meta name="geo.position" content="-26.052120488886704;28.182524335456343" data-v-6894cba3${_scopeId}><meta name="ICBM" content="-26.052120488886704, 28.182524335456343" data-v-6894cba3${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-6894cba3${_scopeId}>`);
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
              createVNode("meta", {
                property: "og:type",
                content: __props.seo.og_type
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: __props.seo.og_url
              }, null, 8, ["content"]),
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
                property: "og:site_name",
                content: __props.seo.og_site_name
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "twitter:card",
                content: __props.seo.twitter_card
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "twitter:url",
                content: __props.seo.og_url
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "twitter:title",
                content: __props.seo.twitter_title || __props.seo.og_title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "twitter:description",
                content: __props.seo.twitter_description || __props.seo.og_description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "twitter:image",
                content: __props.seo.og_image
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "contact:phone",
                content: (_c = __props.contactInfo) == null ? void 0 : _c.phone
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "contact:email",
                content: (_d = __props.contactInfo) == null ? void 0 : _d.email
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "geo.region",
                content: "ZA-GP"
              }),
              createVNode("meta", {
                name: "geo.placename",
                content: "Kempton Park"
              }),
              createVNode("meta", {
                name: "geo.position",
                content: "-26.052120488886704;28.182524335456343"
              }),
              createVNode("meta", {
                name: "ICBM",
                content: "-26.052120488886704, 28.182524335456343"
              }),
              createVNode("link", {
                rel: "canonical",
                href: __props.seo.canonical_url
              }, null, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen bg-gray-50" data-v-6894cba3><div class="banner py-16" data-v-6894cba3><div class="container mx-auto px-4" data-v-6894cba3><h1 class="text-4xl fw-bold font-bold text-white text-center" data-v-6894cba3>Contact Us</h1><p class="text-xl text-blue-100 text-center mt-4" data-v-6894cba3> We&#39;d love to hear from you. Get in touch with our team. </p></div></div><div class="container mx-auto px-4 py-12" data-v-6894cba3><div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-6894cba3><div class="bg-white p-8 rounded-lg shadow-md" data-v-6894cba3><h2 class="text-2xl fw-bold font-semibold text-gray-800 mb-8" data-v-6894cba3>Get In Touch</h2><div class="space-y-6 mt-4" data-v-6894cba3><div class="flex items-start" data-v-6894cba3><div class="bg-blue-100 p-2 rounded-full mr-4" data-v-6894cba3><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6894cba3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-6894cba3></path></svg></div><div data-v-6894cba3><h3 class="text-lg font-medium text-gray-800" data-v-6894cba3>Phone</h3><p class="my-blue mt-1" data-v-6894cba3><a href="tel:+27738114652" data-v-6894cba3>+27 73 811 4652</a></p></div></div><div class="flex items-start" data-v-6894cba3><div class="bg-blue-100 p-2 rounded-full mr-4" data-v-6894cba3><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6894cba3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-6894cba3></path></svg></div><div data-v-6894cba3><h3 class="text-lg font-medium text-gray-800" data-v-6894cba3>Email</h3><p class="my-blue mt-1" data-v-6894cba3><a href="mailto:info@pendagraphics.co.za" data-v-6894cba3>info@pendagraphics.co.za</a></p></div></div><div class="flex items-start" data-v-6894cba3><div class="bg-blue-100 p-2 rounded-full mr-4" data-v-6894cba3><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6894cba3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-6894cba3></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-6894cba3></path></svg></div><div data-v-6894cba3><h3 class="text-lg font-medium text-gray-800" data-v-6894cba3>Address</h3><p class="my-blue mt-1" data-v-6894cba3>Birch Acres</p><p class="my-blue" data-v-6894cba3>Kempton Park</p></div></div><div class="flex items-start" data-v-6894cba3><div class="bg-blue-100 p-2 rounded-full mr-4" data-v-6894cba3><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6894cba3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6894cba3></path></svg></div><div data-v-6894cba3><h3 class="text-lg font-medium text-gray-800" data-v-6894cba3>Business Hours</h3><p class="my-blue mt-1" data-v-6894cba3>Monday - Friday: 9am - 5pm</p><p class="my-blue" data-v-6894cba3>Saturday &amp; Sunday: Closed</p></div></div></div><div class="mt-8" data-v-6894cba3><h3 class="text-lg font-medium text-gray-800 mb-4" data-v-6894cba3>Follow Us</h3><div class="flex space-x-4" data-v-6894cba3><a href="https://web.facebook.com/Penda.graphix" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition" data-v-6894cba3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "facebook"],
        class: "text-blue-600"
      }, null, _parent));
      _push(`</a><a href="https://www.instagram.com/penda_graphics/" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition" data-v-6894cba3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "instagram"],
        class: "text-blue-600"
      }, null, _parent));
      _push(`</a><a href="https://www.youtube.com/@PendaGraphics" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition" data-v-6894cba3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "youtube"],
        class: "text-blue-600"
      }, null, _parent));
      _push(`</a><a href="https://www.tiktok.com/@pendagraphics?_t=ZM-8xCbzWLUJ7Q&amp;_r=1" class="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition" data-v-6894cba3>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "tiktok"],
        class: "text-blue-600"
      }, null, _parent));
      _push(`</a></div></div></div><div class="bg-white p-8 rounded-lg shadow-md" data-v-6894cba3><h2 class="text-2xl font-semibold fw-bold text-gray-800 mb-6" data-v-6894cba3>Send Us a Message</h2><form class="space-y-6 mt-4" data-v-6894cba3><div data-v-6894cba3><label for="name" class="block text-sm font-medium text-gray-700 mb-1" data-v-6894cba3>Full Name</label><input type="text" id="name"${ssrRenderAttr("value", form.value.name)} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your Name" required data-v-6894cba3>`);
      if (errors.name) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-6894cba3>${ssrInterpolate(errors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-6894cba3><label for="email" class="block text-sm font-medium text-gray-700 mb-1" data-v-6894cba3>Email Address</label><input type="email" id="email"${ssrRenderAttr("value", form.value.email)} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your.email@example.com" required data-v-6894cba3>`);
      if (errors.email) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-6894cba3>${ssrInterpolate(errors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-6894cba3><label for="subject" class="block text-sm font-medium text-gray-700 mb-1" data-v-6894cba3>Subject</label><input type="text" id="subject"${ssrRenderAttr("value", form.value.subject)} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Web design" required data-v-6894cba3>`);
      if (errors.subject) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-6894cba3>${ssrInterpolate(errors.subject)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-6894cba3><label for="message" class="block text-sm font-medium text-gray-700 mb-1" data-v-6894cba3>Message</label><textarea id="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Please describe your enquiry in detail..." required data-v-6894cba3>${ssrInterpolate(form.value.message)}</textarea>`);
      if (errors.message) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-6894cba3>${ssrInterpolate(errors.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-6894cba3><button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded hover:from-blue-700 hover:to-indigo-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-6894cba3>`);
      if (isSubmitting.value) {
        _push(`<span data-v-6894cba3>Sending...</span>`);
      } else {
        _push(`<span data-v-6894cba3>Send Message</span>`);
      }
      _push(`</button></div></form>`);
      if (submitted.value) {
        _push(`<div class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded" data-v-6894cba3> Thank you for your message! We&#39;ll get back to you as soon as possible. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="container mx-auto px-4 py-12" data-v-6894cba3><div class="bg-white p-6 rounded-lg shadow-md" data-v-6894cba3><h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center" data-v-6894cba3>Find Us</h2><div class="h-64 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden" data-v-6894cba3><div class="w-full h-full relative" data-v-6894cba3><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28675.459433962693!2d28.182524335456343!3d-26.052120488886704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956c9e7dd28a2d%3A0x23a8745861e3d627!2sBirch%20Acres%2C%20Kempton%20Park%2C%201618!5e0!3m2!1sen!2sza!4v1747170368580!5m2!1sen!2sza" style="${ssrRenderStyle({ "position": "absolute", "top": "0", "left": "0", "width": "100%", "height": "100%", "border-radius": "0.375rem" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-v-6894cba3></iframe></div></div></div></div></div>`);
      _push(ssrRenderComponent(Footer, { seo: __props.seo }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ContactUs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContactUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6894cba3"]]);
export {
  ContactUs as default
};
