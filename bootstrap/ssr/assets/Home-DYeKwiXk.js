import { ref, computed, mergeProps, useSSRContext, onMounted, withCtx, unref, createVNode, toDisplayString, withModifiers, createBlock, openBlock, Fragment, renderList, createCommentVNode, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as ge } from "../ssr.js";
import { L as Layout } from "./HomeLayout-CrP_jKzf.js";
import { _ as _export_sfc, E as EstimateModal } from "./Navbar-B2dw1uDe.js";
import axios from "axios";
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
import "./Footer-Cv32ksWL.js";
const _sfc_main$2 = {
  __name: "Portfolio",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedCategory = ref("All");
    const zoomedImage = ref(null);
    const categories = [
      "All",
      "Web Design",
      "Product Design",
      "Graphic Design",
      "Digital Marketing",
      "Identity Design",
      "Logo Design"
    ];
    const items = ref([
      {
        id: 1,
        category: "Web Design",
        title: "Landing Page Design",
        description: "Modern and responsive E-commerce website.",
        image: "/assets/images/portfolio/kmcollect.jpg",
        link: "#"
      },
      {
        id: 2,
        category: "Product Design",
        title: "Mobile App Mockup",
        description: "Clean and intuitive mobile UI design.",
        image: "/assets/images/portfolio/mabura.jpg",
        link: "#"
      },
      {
        id: 3,
        category: "Logo Design",
        title: "Mkay Aqua",
        description: "Eye-catching poster for music event.",
        image: "/assets/images/portfolio/mkay-aqua.jpg",
        link: "#"
      },
      {
        id: 4,
        category: "Logo Design",
        title: "ETAERC",
        description: "ETAERC Logo",
        image: "/assets/images/portfolio/ETAERC_Logov2.png",
        link: "#"
      },
      {
        id: 5,
        category: "Identity Design",
        title: "Logo & Branding",
        description: "Custom branding for tech startup.",
        image: "/assets/images/portfolio/bakili.jpg",
        link: "#"
      },
      {
        id: 6,
        category: "Web Design",
        title: "Ramohlale Industries",
        description: "Custom website for an industrial company.",
        image: "/assets/images/portfolio/ramohlale.jpg",
        link: "#"
      },
      {
        id: 7,
        category: "Logo Design",
        title: "Logos",
        description: "Mahloma Tsebo Solutions",
        image: "/assets/images/portfolio/Mahloma_Tsebo_logo_color darkerPurple@2x-80.jpg",
        link: "#"
      },
      {
        id: 8,
        category: "Web Design",
        title: "SHAPE CRM",
        description: "A custom CRM Application for a international scholarships and internships.",
        image: "/assets/images/portfolio/Screenshot 2025-07-25 at 22.55.57.png",
        link: "#"
      },
      {
        id: 9,
        category: "Graphic Design",
        title: "Graphic asset",
        description: "Mahloma Tsebo Solutions",
        image: "/assets/images/portfolio/1.png",
        link: "#"
      },
      {
        id: 10,
        category: "Digital Marketing",
        title: "Social Media Campaign",
        description: "Ad creatives and strategy.",
        image: "/assets/images/portfolio/seo.jpg",
        link: "#"
      },
      {
        id: 11,
        category: "Logo Design",
        title: "Seloko Guest lodge logo",
        description: "Seloko Guest lodge logo",
        image: "/assets/images/portfolio/Seloko.png",
        link: "#"
      },
      {
        id: 12,
        category: "Product Design",
        title: "MK Aqua bottle Mockup",
        description: "MK Aqua bottle Mockup",
        image: "/assets/images/portfolio/mk_aqua_bottle.jpeg",
        link: "#"
      }
    ]);
    const filteredItems = computed(() => {
      if (selectedCategory.value === "All") return items.value;
      return items.value.filter((i) => i.category === selectedCategory.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-blue section portfolio" }, _attrs))} data-v-b40966cf><div data-v-b40966cf><h2 class="fw-bold text-center mb-4 mt-4" data-v-b40966cf>Portfolio</h2></div><div class="portfolio container my-5" data-v-b40966cf><div class="tabs d-flex flex-wrap justify-content-center mb-4" data-v-b40966cf><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<button class="${ssrRenderClass(["btn m-2", selectedCategory.value === cat ? "btn-primary" : "btn-outline-primary"])}" data-v-b40966cf>${ssrInterpolate(cat)}</button>`);
      });
      _push(`<!--]--></div><div class="row" data-v-b40966cf><!--[-->`);
      ssrRenderList(filteredItems.value, (item) => {
        _push(`<div class="col-md-4 mb-4" data-v-b40966cf><div class="portfolio-item position-relative overflow-hidden rounded shadow-sm" data-v-b40966cf><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="w-100 h-100 object-cover" data-v-b40966cf><div class="overlay d-flex flex-column justify-content-center align-items-center text-white text-center px-3" data-v-b40966cf><h5 data-v-b40966cf>${ssrInterpolate(item.title)}</h5><p class="small" data-v-b40966cf>${ssrInterpolate(item.description)}</p><div class="d-flex gap-2" data-v-b40966cf><button class="btn btn-sm btn-light" data-v-b40966cf>Zoom</button><a${ssrRenderAttr("href", item.link)} target="_blank" class="btn btn-sm btn-light" data-v-b40966cf>Visit</a></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (zoomedImage.value) {
        _push(`<div class="modal-backdrop" data-v-b40966cf><img${ssrRenderAttr("src", zoomedImage.value)} class="zoomed-img" data-v-b40966cf></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Portfolio.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Portfolio = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b40966cf"]]);
const _sfc_main$1 = {
  props: {
    aboutImage: String
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "about",
    class: "about"
  }, _attrs))}><div class="container my-5 py-5 px-4"><div class="row"><div class="col-md-6 col-lg-6"><div><img${ssrRenderAttr("src", $props.aboutImage)} alt="Penda Graphics Logo - Professional Digital Design Company" class="w-100 rounded" style="${ssrRenderStyle({ "height": "400px", "object-fit": "cover" })}" loading="lazy" width="400" height="400"></div></div><div class="col-md-6 col-lg-6"><div class="about-content mt-5"><h2 class="about-title fw-bold">About Us</h2><p> Celebrated as the pinnacle of digital excellence in our city, Penda Graphics is a team of passionate professionals committed to crafting unparalleled digital experiences. We specialize in delivering innovative solutions and visually stunning, user-friendly websites tailored to the unique needs of our clients. With a strong focus on design, creativity, and cutting-edge technology, we elevate brands and leave a lasting impact through our unmatched expertise and dedication to quality. </p><a href="/about-us" class="btn btn-primary mt-2">Discover More</a></div></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/About.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    heroImages: Object,
    aboutImage: String,
    services: Array,
    seo: Object,
    structuredData: String
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const isModalOpen = ref(false);
    const isSubmitting = ref(false);
    const submitted = ref(false);
    onMounted(() => {
      if (props.structuredData) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = props.structuredData;
        document.head.appendChild(script);
      }
    });
    const submitForm = async () => {
      if (isSubmitting.value) return;
      isSubmitting.value = true;
      try {
        const response = await axios.post("/contact-form", form.value);
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          submitted.value = true;
          form.value = {
            name: "",
            email: "",
            subject: "",
            message: ""
          };
        }
        alert("Thank you! Your message has been sent successfully.");
      } catch (error) {
        console.error("Form submission error:", error);
        alert("Sorry, there was an error sending your message. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };
    const openQuoteModal = () => {
      isModalOpen.value = true;
    };
    const closeQuoteModal = () => {
      isModalOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Layout, { seo: __props.seo }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ge), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title data-v-1568ba98${_scopeId2}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-1568ba98${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-1568ba98${_scopeId2}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-1568ba98${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-1568ba98${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-1568ba98${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-1568ba98${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-1568ba98${_scopeId2}><meta property="og:type" content="website" data-v-1568ba98${_scopeId2}><meta property="og:site_name" content="Penda Graphics" data-v-1568ba98${_scopeId2}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-1568ba98${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-1568ba98${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-1568ba98${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-1568ba98${_scopeId2}><meta name="robots" content="index, follow" data-v-1568ba98${_scopeId2}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-1568ba98${_scopeId2}><meta name="theme-color" content="#0d6efd" data-v-1568ba98${_scopeId2}>`);
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
                      content: "website"
                    }),
                    createVNode("meta", {
                      property: "og:site_name",
                      content: "Penda Graphics"
                    }),
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
            }, _parent2, _scopeId));
            _push2(`<section class="about py-5 bg-light bg-md-white" data-v-1568ba98${_scopeId}><div class="container px-4" data-v-1568ba98${_scopeId}><div class="row align-items-center" data-v-1568ba98${_scopeId}><div class="col-md-6" data-v-1568ba98${_scopeId}><div class="content" data-v-1568ba98${_scopeId}><h1 class="fw-bold" data-v-1568ba98${_scopeId}>Empowering Your Brand with Stunning Designs &amp; Websites</h1><p class="mt-4 text-secondary" data-v-1568ba98${_scopeId}> We are a team of passionate designers and developers dedicated to creating exceptional digital experiences for our clients. </p><button class="btn btn-primary rounded" data-v-1568ba98${_scopeId}>Get A Quote</button></div></div><div class="col-md-6 d-none d-md-block" data-v-1568ba98${_scopeId}><div class="row" data-v-1568ba98${_scopeId}><div class="col-md-6" data-v-1568ba98${_scopeId}><div class="card border-0 shadow rounded mt-5" data-v-1568ba98${_scopeId}><img${ssrRenderAttr("src", __props.heroImages.left)} alt="Professional web design showcase - Modern website interface" class="w-100 rounded" style="${ssrRenderStyle({ "height": "400px", "object-fit": "cover" })}" width="300" height="400" data-v-1568ba98${_scopeId}></div></div><div class="col-md-6" data-v-1568ba98${_scopeId}><div class="row" data-v-1568ba98${_scopeId}><div class="col-md-12" data-v-1568ba98${_scopeId}><div class="card border-0 shadow" data-v-1568ba98${_scopeId}><img${ssrRenderAttr("src", __props.heroImages.top)} alt="Creative graphic design portfolio - Brand identity showcase" class="w-100 rounded" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}" width="300" height="200" data-v-1568ba98${_scopeId}></div></div><div class="col-md-12 mt-4" data-v-1568ba98${_scopeId}><div class="card border-0 shadow" data-v-1568ba98${_scopeId}><img${ssrRenderAttr("src", __props.heroImages.right)} alt="Digital marketing success - Analytics and growth visualization" class="w-100 rounded" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}" width="300" height="200" data-v-1568ba98${_scopeId}></div></div></div></div></div></div></div></div></section><section class="py-5" data-v-1568ba98${_scopeId}><div class="container px-4" data-v-1568ba98${_scopeId}><h2 class="fw-bold mb-4 text-center" data-v-1568ba98${_scopeId}>Our Featured Services</h2><div class="row" data-v-1568ba98${_scopeId}><!--[-->`);
            ssrRenderList(__props.services, (service, index) => {
              _push2(`<div class="col-md-4 col-sm-6 mb-4" data-v-1568ba98${_scopeId}><article class="card p-3 service-card border-0" data-v-1568ba98${_scopeId}><div class="d-flex align-items-center mb-2" data-v-1568ba98${_scopeId}><img${ssrRenderAttr("src", service.icon)}${ssrRenderAttr("alt", `${service.title} service icon`)} style="${ssrRenderStyle({ "height": "50px", "width": "50px", "object-fit": "cover" })}" class="me-3" loading="lazy" width="50" height="50" data-v-1568ba98${_scopeId}><h3 class="card-title mb-0 h4" data-v-1568ba98${_scopeId}><a${ssrRenderAttr("href", service.url)} class="text-decoration-none" data-v-1568ba98${_scopeId}>${ssrInterpolate(service.title)}</a></h3></div><p data-v-1568ba98${_scopeId}>${ssrInterpolate(service.description)}</p><a${ssrRenderAttr("href", service.url)} class="btn btn-primary mt-2" data-v-1568ba98${_scopeId}>Discover More</a></article></div>`);
            });
            _push2(`<!--]--></div></div></section><section id="portfolio" aria-labelledby="portfolio-heading" data-v-1568ba98${_scopeId}><div class="container" data-v-1568ba98${_scopeId}>`);
            _push2(ssrRenderComponent(Portfolio, null, null, _parent2, _scopeId));
            _push2(`</div></section><section aria-labelledby="about-heading" data-v-1568ba98${_scopeId}><div class="container mt-4" data-v-1568ba98${_scopeId}>`);
            _push2(ssrRenderComponent(About, { aboutImage: __props.aboutImage }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="py-5 text-center bg-dark text-white" aria-labelledby="contact-heading" data-v-1568ba98${_scopeId}><div class="container px-4" data-v-1568ba98${_scopeId}><div class="row" data-v-1568ba98${_scopeId}><div class="col-md-6" data-v-1568ba98${_scopeId}><h2 id="contact-heading" class="fw-bold text-left" data-v-1568ba98${_scopeId}>Let&#39;s work together</h2><p class="text-left" data-v-1568ba98${_scopeId}> We&#39;re excited to hear about your vision and explore how we can bring it to life. Whether you&#39;re looking to build a modern website, create a strong visual identity, or launch a compelling marketing campaign — we&#39;re here to help. </p><p class="text-left" data-v-1568ba98${_scopeId}> Fill out the form with your project details, goals, and any specific requirements you have in mind. One of our team members will review your message and get back to you promptly to discuss the next steps. </p><p class="text-left" data-v-1568ba98${_scopeId}> Let&#39;s turn your ideas into powerful digital experiences — together. </p></div><div class="col-md-6" data-v-1568ba98${_scopeId}><form class="p-4 shadow rounded bg-white" novalidate data-v-1568ba98${_scopeId}><div class="mb-3" data-v-1568ba98${_scopeId}><label for="name" class="visually-hidden" data-v-1568ba98${_scopeId}>Name</label><input id="name" type="text"${ssrRenderAttr("value", form.value.name)} class="form-control" placeholder="Enter your name" required aria-required="true" data-v-1568ba98${_scopeId}></div><div class="mb-3" data-v-1568ba98${_scopeId}><label for="email" class="visually-hidden" data-v-1568ba98${_scopeId}>Email</label><input id="email" type="email"${ssrRenderAttr("value", form.value.email)} class="form-control" placeholder="Enter your email" required aria-required="true" data-v-1568ba98${_scopeId}></div><div class="mb-3" data-v-1568ba98${_scopeId}><label for="subject" class="visually-hidden" data-v-1568ba98${_scopeId}>Subject</label><input id="subject" type="text"${ssrRenderAttr("value", form.value.subject)} class="form-control" placeholder="Subject" required aria-required="true" data-v-1568ba98${_scopeId}></div><div class="mb-3" data-v-1568ba98${_scopeId}><label for="message" class="visually-hidden" data-v-1568ba98${_scopeId}>Message</label><textarea id="message" class="form-control" rows="4" placeholder="Enter your message" required aria-required="true" data-v-1568ba98${_scopeId}>${ssrInterpolate(form.value.message)}</textarea></div><div class="text-end" data-v-1568ba98${_scopeId}><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-1568ba98${_scopeId}>`);
            if (isSubmitting.value) {
              _push2(`<span data-v-1568ba98${_scopeId}>Sending...</span>`);
            } else {
              _push2(`<span data-v-1568ba98${_scopeId}>Send Message</span>`);
            }
            _push2(`</button></div></form>`);
            if (submitted.value) {
              _push2(`<div class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded" data-v-1568ba98${_scopeId}> Thank you for your message! We&#39;ll get back to you as soon as possible. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section>`);
          } else {
            return [
              createVNode(unref(ge), null, {
                default: withCtx(() => [
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
                    content: "website"
                  }),
                  createVNode("meta", {
                    property: "og:site_name",
                    content: "Penda Graphics"
                  }),
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
                ]),
                _: 1
              }),
              createVNode("section", { class: "about py-5 bg-light bg-md-white" }, [
                createVNode("div", { class: "container px-4" }, [
                  createVNode("div", { class: "row align-items-center" }, [
                    createVNode("div", { class: "col-md-6" }, [
                      createVNode("div", { class: "content" }, [
                        createVNode("h1", { class: "fw-bold" }, "Empowering Your Brand with Stunning Designs & Websites"),
                        createVNode("p", { class: "mt-4 text-secondary" }, " We are a team of passionate designers and developers dedicated to creating exceptional digital experiences for our clients. "),
                        createVNode("button", {
                          onClick: withModifiers(openQuoteModal, ["prevent"]),
                          class: "btn btn-primary rounded"
                        }, "Get A Quote")
                      ])
                    ]),
                    createVNode("div", { class: "col-md-6 d-none d-md-block" }, [
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-md-6" }, [
                          createVNode("div", { class: "card border-0 shadow rounded mt-5" }, [
                            createVNode("img", {
                              src: __props.heroImages.left,
                              alt: "Professional web design showcase - Modern website interface",
                              class: "w-100 rounded",
                              style: { "height": "400px", "object-fit": "cover" },
                              width: "300",
                              height: "400"
                            }, null, 8, ["src"])
                          ])
                        ]),
                        createVNode("div", { class: "col-md-6" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-md-12" }, [
                              createVNode("div", { class: "card border-0 shadow" }, [
                                createVNode("img", {
                                  src: __props.heroImages.top,
                                  alt: "Creative graphic design portfolio - Brand identity showcase",
                                  class: "w-100 rounded",
                                  style: { "height": "200px", "object-fit": "cover" },
                                  width: "300",
                                  height: "200"
                                }, null, 8, ["src"])
                              ])
                            ]),
                            createVNode("div", { class: "col-md-12 mt-4" }, [
                              createVNode("div", { class: "card border-0 shadow" }, [
                                createVNode("img", {
                                  src: __props.heroImages.right,
                                  alt: "Digital marketing success - Analytics and growth visualization",
                                  class: "w-100 rounded",
                                  style: { "height": "200px", "object-fit": "cover" },
                                  width: "300",
                                  height: "200"
                                }, null, 8, ["src"])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-5" }, [
                createVNode("div", { class: "container px-4" }, [
                  createVNode("h2", { class: "fw-bold mb-4 text-center" }, "Our Featured Services"),
                  createVNode("div", { class: "row" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.services, (service, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "col-md-4 col-sm-6 mb-4"
                      }, [
                        createVNode("article", { class: "card p-3 service-card border-0" }, [
                          createVNode("div", { class: "d-flex align-items-center mb-2" }, [
                            createVNode("img", {
                              src: service.icon,
                              alt: `${service.title} service icon`,
                              style: { "height": "50px", "width": "50px", "object-fit": "cover" },
                              class: "me-3",
                              loading: "lazy",
                              width: "50",
                              height: "50"
                            }, null, 8, ["src", "alt"]),
                            createVNode("h3", { class: "card-title mb-0 h4" }, [
                              createVNode("a", {
                                href: service.url,
                                class: "text-decoration-none"
                              }, toDisplayString(service.title), 9, ["href"])
                            ])
                          ]),
                          createVNode("p", null, toDisplayString(service.description), 1),
                          createVNode("a", {
                            href: service.url,
                            class: "btn btn-primary mt-2"
                          }, "Discover More", 8, ["href"])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", {
                id: "portfolio",
                "aria-labelledby": "portfolio-heading"
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode(Portfolio)
                ])
              ]),
              createVNode("section", { "aria-labelledby": "about-heading" }, [
                createVNode("div", { class: "container mt-4" }, [
                  createVNode(About, { aboutImage: __props.aboutImage }, null, 8, ["aboutImage"])
                ])
              ]),
              createVNode("section", {
                class: "py-5 text-center bg-dark text-white",
                "aria-labelledby": "contact-heading"
              }, [
                createVNode("div", { class: "container px-4" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-md-6" }, [
                      createVNode("h2", {
                        id: "contact-heading",
                        class: "fw-bold text-left"
                      }, "Let's work together"),
                      createVNode("p", { class: "text-left" }, " We're excited to hear about your vision and explore how we can bring it to life. Whether you're looking to build a modern website, create a strong visual identity, or launch a compelling marketing campaign — we're here to help. "),
                      createVNode("p", { class: "text-left" }, " Fill out the form with your project details, goals, and any specific requirements you have in mind. One of our team members will review your message and get back to you promptly to discuss the next steps. "),
                      createVNode("p", { class: "text-left" }, " Let's turn your ideas into powerful digital experiences — together. ")
                    ]),
                    createVNode("div", { class: "col-md-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "p-4 shadow rounded bg-white",
                        novalidate: ""
                      }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "name",
                            class: "visually-hidden"
                          }, "Name"),
                          withDirectives(createVNode("input", {
                            id: "name",
                            type: "text",
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            class: "form-control",
                            placeholder: "Enter your name",
                            required: "",
                            "aria-required": "true"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.name]
                          ])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "email",
                            class: "visually-hidden"
                          }, "Email"),
                          withDirectives(createVNode("input", {
                            id: "email",
                            type: "email",
                            "onUpdate:modelValue": ($event) => form.value.email = $event,
                            class: "form-control",
                            placeholder: "Enter your email",
                            required: "",
                            "aria-required": "true"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.email]
                          ])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "subject",
                            class: "visually-hidden"
                          }, "Subject"),
                          withDirectives(createVNode("input", {
                            id: "subject",
                            type: "text",
                            "onUpdate:modelValue": ($event) => form.value.subject = $event,
                            class: "form-control",
                            placeholder: "Subject",
                            required: "",
                            "aria-required": "true"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.subject]
                          ])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "message",
                            class: "visually-hidden"
                          }, "Message"),
                          withDirectives(createVNode("textarea", {
                            id: "message",
                            class: "form-control",
                            "onUpdate:modelValue": ($event) => form.value.message = $event,
                            rows: "4",
                            placeholder: "Enter your message",
                            required: "",
                            "aria-required": "true"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.message]
                          ])
                        ]),
                        createVNode("div", { class: "text-end" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "btn btn-primary",
                            disabled: isSubmitting.value
                          }, [
                            isSubmitting.value ? (openBlock(), createBlock("span", { key: 0 }, "Sending...")) : (openBlock(), createBlock("span", { key: 1 }, "Send Message"))
                          ], 8, ["disabled"])
                        ])
                      ], 32),
                      submitted.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
                      }, " Thank you for your message! We'll get back to you as soon as possible. ")) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(EstimateModal, {
        isOpen: isModalOpen.value,
        onClose: closeQuoteModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1568ba98"]]);
export {
  Home as default
};
