import { ref, computed, mergeProps, useSSRContext, onMounted, resolveComponent, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { L as Layout } from "./HomeLayout-CrP_jKzf.js";
import { _ as _export_sfc } from "./Navbar-B2dw1uDe.js";
import "./Footer-Cv32ksWL.js";
import "axios";
const _sfc_main$1 = {
  __name: "FaqComponent",
  __ssrInlineRender: true,
  setup(__props) {
    const categories = [
      "Web Design",
      "Graphic Design",
      "Identity Design",
      "Product Design",
      "E-Commerce Solutions",
      "Digital Marketing"
    ];
    const selectedCategory = ref("Web Design");
    const activeIndex = ref(null);
    const faqs = ref([
      // Web Design FAQs
      {
        category: "Web Design",
        question: "Do you build responsive websites?",
        answer: "Yes, all our websites are mobile-friendly and fully responsive across devices including smartphones, tablets, and desktops. We ensure your website looks and functions perfectly on all screen sizes."
      },
      {
        category: "Web Design",
        question: "Can you redesign my current website?",
        answer: "Absolutely. We specialize in modernizing existing websites while preserving your brand identity and improving user experience, performance, and search engine optimization."
      },
      {
        category: "Web Design",
        question: "What is responsive web design?",
        answer: "Responsive web design is an approach to designing websites that ensures they adapt and display properly across different devices and screen sizes, including desktops, laptops, tablets, and smartphones."
      },
      {
        category: "Web Design",
        question: "How much does web design cost in South Africa?",
        answer: "The cost of web design in South Africa varies depending on complexity, features, and customization. Basic websites start from R8,000, while complex e-commerce sites can range from R25,000+. Contact us for a personalized quote."
      },
      {
        category: "Web Design",
        question: "Should I pay up front for web design?",
        answer: "Yes, you pay a 50% deposit upfront to secure your project slot. The remaining balance is due when the website is completed and approved."
      },
      {
        category: "Web Design",
        question: "How long does it take to build a website?",
        answer: "Website development typically takes 2-8 weeks depending on complexity. Simple websites take 2-3 weeks, while complex e-commerce sites may take 6-8 weeks."
      },
      // Product Design FAQs
      {
        category: "Product Design",
        question: "Do you offer product design services?",
        answer: "Yes, we specialize in creating visually appealing and functional product designs that align with your brand identity and market positioning."
      },
      {
        category: "Product Design",
        question: "What is product design?",
        answer: "Product design is the process of creating new products or improving existing ones to meet user needs. It combines creativity, engineering, and user-centered design principles."
      },
      {
        category: "Product Design",
        question: "What types of products do you design?",
        answer: "We design everything from packaging and labels to product mockups and prototypes, ensuring your product stands out in both physical and digital marketplaces."
      },
      {
        category: "Product Design",
        question: "Why is product design important?",
        answer: "Product design directly impacts market success by meeting user needs, differentiating from competitors, enhancing brand reputation, and driving sales and customer satisfaction."
      },
      {
        category: "Product Design",
        question: "Is there a minimum order quantity?",
        answer: "No, there is no minimum order quantity for product design services. We work with businesses of all sizes."
      },
      {
        category: "Product Design",
        question: "How much does product design cost?",
        answer: "Product design costs vary based on complexity and scope. Simple packaging design starts from R3,000, while comprehensive product design projects range from R8,000+."
      },
      // Graphic Design FAQs
      {
        category: "Graphic Design",
        question: "What types of graphic designs do you offer?",
        answer: "We offer comprehensive graphic design services including logos, flyers, brochures, business cards, packaging, promotional materials, and digital graphics."
      },
      {
        category: "Graphic Design",
        question: "Can you create custom designs?",
        answer: "Yes, we create 100% custom designs tailored to your brand identity, target audience, and business objectives."
      },
      {
        category: "Graphic Design",
        question: "What file formats will I receive?",
        answer: "You will receive designs in multiple formats including vector files (.AI, .EPS, .SVG) for scalability and raster formats (.PNG, .JPG) for web and print use."
      },
      {
        category: "Graphic Design",
        question: "How much do graphic design services cost?",
        answer: "Graphic design pricing varies by project complexity. Logo design starts from R1,500, flyers from R500, and comprehensive brand packages from R8,000."
      },
      {
        category: "Graphic Design",
        question: "Can I request revisions to the designs?",
        answer: "Yes, we include up to 3 revision rounds in our standard packages. Additional revisions are available at R300 per round."
      },
      // E-Commerce Solutions FAQs
      {
        category: "E-Commerce Solutions",
        question: "Do you offer payment gateway integration?",
        answer: "Yes, we integrate with major South African payment gateways including PayFast, PayGate, PayPal, and Stripe for secure online transactions."
      },
      {
        category: "E-Commerce Solutions",
        question: "What features should I look for in an e-commerce solution?",
        answer: "Essential features include mobile responsiveness, secure payment processing, inventory management, order tracking, SEO optimization, and integration with business systems."
      },
      {
        category: "E-Commerce Solutions",
        question: "How do you ensure payment security?",
        answer: "We implement SSL encryption, PCI compliance, fraud detection measures, and use only trusted payment gateways to protect customer payment information."
      },
      {
        category: "E-Commerce Solutions",
        question: "Do you provide ongoing support?",
        answer: "Yes, we offer ongoing support including product updates, inventory management, technical maintenance, security updates, and performance optimization."
      },
      {
        category: "E-Commerce Solutions",
        question: "How do I measure e-commerce success?",
        answer: "Key metrics include website traffic, conversion rates, average order value, customer acquisition cost, and return on investment. We provide analytics setup and reporting."
      },
      // Digital Marketing FAQs
      {
        category: "Digital Marketing",
        question: "Do you manage social media accounts?",
        answer: "Yes, we provide comprehensive social media management including content creation, posting schedules, engagement, and growth strategies across multiple platforms."
      },
      {
        category: "Digital Marketing",
        question: "What digital marketing services do you offer?",
        answer: "We offer SEO, social media marketing, content marketing, email marketing, Google Ads, Facebook advertising, and comprehensive digital strategy development."
      },
      {
        category: "Digital Marketing",
        question: "How do you ensure campaign success?",
        answer: "We set clear KPIs, create strategic plans, monitor performance continuously, and provide regular optimization to maximize ROI and achieve your marketing goals."
      },
      {
        category: "Digital Marketing",
        question: "Can you create custom landing pages?",
        answer: "Yes, we design and develop custom landing pages optimized for conversions, aligned with your brand identity, and tailored to specific marketing campaigns."
      },
      {
        category: "Digital Marketing",
        question: "What is the difference between organic and paid traffic?",
        answer: "Organic traffic comes from unpaid search results and content marketing, while paid traffic comes from advertisements. Both are important for comprehensive digital marketing success."
      },
      // Identity Design FAQs
      {
        category: "Identity Design",
        question: "What identity design services do you offer?",
        answer: "We provide complete brand identity solutions including logo design, color palettes, typography selection, brand guidelines, and marketing collateral design."
      },
      {
        category: "Identity Design",
        question: "Can you create custom identity designs?",
        answer: "Yes, we create unique, custom brand identities that reflect your business values, target audience, and market positioning."
      },
      {
        category: "Identity Design",
        question: "What file formats will I receive?",
        answer: "You will receive comprehensive brand assets in vector formats (SVG, EPS, AI) and raster formats (PNG, JPG) suitable for all applications."
      },
      {
        category: "Identity Design",
        question: "What is the cost of identity design services?",
        answer: "Identity design packages start from R3,500 for basic logo design and range to R15,000+ for comprehensive brand identity systems."
      },
      {
        category: "Identity Design",
        question: "What services are included in identity design?",
        answer: "Services include logo design, color palette development, typography selection, brand guidelines creation, business card design, and brand strategy consultation."
      },
      {
        category: "Identity Design",
        question: "How will I receive the final assets?",
        answer: "You will receive a comprehensive brand identity package with all necessary files, brand guidelines, and usage instructions delivered digitally."
      },
      {
        category: "Identity Design",
        question: "What if I'm not satisfied with the initial concepts?",
        answer: "Client satisfaction is our priority. We include multiple concept presentations and revision rounds to ensure the final design exceeds your expectations."
      }
    ]);
    const filteredFaqs = computed(
      () => faqs.value.filter((faq) => faq.category === selectedCategory.value)
    );
    computed(() => {
      filteredFaqs.value;
      const otherCategories = categories.filter((cat) => cat !== selectedCategory.value);
      return otherCategories.slice(0, 4).map((cat) => {
        const categoryFaqs = faqs.value.filter((faq) => faq.category === cat);
        return categoryFaqs.length > 0 ? categoryFaqs[0].question : null;
      }).filter(Boolean);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "p-4",
        itemscope: "",
        itemtype: "https://schema.org/FAQPage"
      }, _attrs))} data-v-eadeef3f><div class="mb-6" data-v-eadeef3f><div class="text-center mb-4" data-v-eadeef3f><h2 class="h4 mb-3" data-v-eadeef3f>Browse by Service Category</h2><p class="text-muted" data-v-eadeef3f>Select a category to view relevant questions and answers</p></div><div class="flex flex-wrap gap-3 justify-center" data-v-eadeef3f><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded text-white transition-all duration-200 hover:scale-105",
          selectedCategory.value === cat ? "bg-blue-600 shadow-lg" : "bg-gray-500 hover:bg-gray-600"
        ])}"${ssrRenderAttr("aria-label", `View ${cat} questions`)} data-v-eadeef3f>${ssrInterpolate(cat)}</button>`);
      });
      _push(`<!--]--></div></div><div class="max-w-4xl mx-auto mt-5" data-v-eadeef3f><div class="mb-4" data-v-eadeef3f><h3 class="h5 text-center mb-4 text-primary" data-v-eadeef3f>${ssrInterpolate(selectedCategory.value)} - Frequently Asked Questions </h3></div><!--[-->`);
      ssrRenderList(filteredFaqs.value, (item, index) => {
        _push(`<div class="mb-4 border rounded-lg shadow-sm bg-white" itemscope itemtype="https://schema.org/Question" data-v-eadeef3f><button class="w-full text-left font-semibold text-lg flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-200"${ssrRenderAttr("aria-expanded", activeIndex.value === index)}${ssrRenderAttr("aria-controls", `answer-${index}`)} data-v-eadeef3f><span itemprop="name" data-v-eadeef3f>${ssrInterpolate(item.question)}</span><span class="${ssrRenderClass([{ "rotate-45": activeIndex.value === index }, "text-2xl font-bold text-blue-600 transform transition-transform duration-200"])}" data-v-eadeef3f> + </span></button>`);
        if (activeIndex.value === index) {
          _push(`<div${ssrRenderAttr("id", `answer-${index}`)} class="px-4 pb-4" itemscope itemtype="https://schema.org/Answer" data-v-eadeef3f><div class="border-t pt-3" data-v-eadeef3f><p itemprop="text" class="text-gray-700 leading-relaxed" data-v-eadeef3f>${ssrInterpolate(item.answer)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/FaqComponent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FaqComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-eadeef3f"]]);
const _sfc_main = {
  __name: "Faq",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    structuredData: String
  },
  setup(__props) {
    const props = __props;
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
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-07cf1e68${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-07cf1e68${_scopeId}><meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-07cf1e68${_scopeId}><meta name="author" content="Penda Graphics" data-v-07cf1e68${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-07cf1e68${_scopeId}><link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical_url)} data-v-07cf1e68${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-07cf1e68${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-07cf1e68${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-07cf1e68${_scopeId}><meta property="og:url"${ssrRenderAttr("content", __props.seo.og_url)} data-v-07cf1e68${_scopeId}><meta property="og:type"${ssrRenderAttr("content", __props.seo.og_type)} data-v-07cf1e68${_scopeId}><meta property="og:site_name"${ssrRenderAttr("content", __props.seo.og_site_name)} data-v-07cf1e68${_scopeId}><meta name="twitter:card"${ssrRenderAttr("content", __props.seo.twitter_card)} data-v-07cf1e68${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.seo.og_title)} data-v-07cf1e68${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.seo.og_description)} data-v-07cf1e68${_scopeId}><meta name="twitter:image"${ssrRenderAttr("content", __props.seo.og_image)} data-v-07cf1e68${_scopeId}><meta name="robots" content="index, follow" data-v-07cf1e68${_scopeId}><meta name="googlebot" content="index, follow" data-v-07cf1e68${_scopeId}><meta name="language" content="en-US" data-v-07cf1e68${_scopeId}><meta name="geo.region" content="ZA" data-v-07cf1e68${_scopeId}><meta name="geo.country" content="South Africa" data-v-07cf1e68${_scopeId}><meta name="geo.placename" content="Johannesburg, Gauteng" data-v-07cf1e68${_scopeId}>`);
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
                name: "author",
                content: "Penda Graphics"
              }),
              createVNode("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
              }),
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
                name: "googlebot",
                content: "index, follow"
              }),
              createVNode("meta", {
                name: "language",
                content: "en-US"
              }),
              createVNode("meta", {
                name: "geo.region",
                content: "ZA"
              }),
              createVNode("meta", {
                name: "geo.country",
                content: "South Africa"
              }),
              createVNode("meta", {
                name: "geo.placename",
                content: "Johannesburg, Gauteng"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Layout, { seo: __props.seo }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section id="apply" class="cta" data-v-07cf1e68${_scopeId}><div class="container" data-aos="zoom-in" data-v-07cf1e68${_scopeId}><div class="text-center text-white" data-v-07cf1e68${_scopeId}><h1 class="fw-bold" data-v-07cf1e68${_scopeId}>Frequently Asked Questions</h1><p class="mt-3 fs-5" data-v-07cf1e68${_scopeId}>Get answers to common questions about our web design, branding, and digital marketing services</p></div></div></section><section class="banner-image" data-v-07cf1e68${_scopeId}><div class="container mt-5 my-5 py-5 px-4" data-v-07cf1e68${_scopeId}><nav aria-label="breadcrumb" class="mb-4" data-v-07cf1e68${_scopeId}><ol class="breadcrumb" data-v-07cf1e68${_scopeId}><li class="breadcrumb-item" data-v-07cf1e68${_scopeId}><a href="/" data-v-07cf1e68${_scopeId}>Home</a></li><li class="breadcrumb-item active" aria-current="page" data-v-07cf1e68${_scopeId}>FAQ</li></ol></nav><div class="row justify-content-center mb-5" data-v-07cf1e68${_scopeId}><div class="col-lg-8" data-v-07cf1e68${_scopeId}><div class="text-center mb-4" data-v-07cf1e68${_scopeId}><h2 class="h3 mb-3" data-v-07cf1e68${_scopeId}>Common Questions About Our Design Services</h2><p class="text-muted" data-v-07cf1e68${_scopeId}> We&#39;ve compiled answers to the most frequently asked questions about our web design, graphic design, branding, e-commerce, and digital marketing services in South Africa. </p></div></div></div>`);
            _push2(ssrRenderComponent(FaqComponent, null, null, _parent2, _scopeId));
            _push2(`<div class="mb-5 mt-5 px-4" data-v-07cf1e68${_scopeId}><div class="row justify-content-center" data-v-07cf1e68${_scopeId}><div class="col-lg-8" data-v-07cf1e68${_scopeId}><div class="text-center bg-light rounded p-4" data-v-07cf1e68${_scopeId}><h3 class="h4 mb-3" data-v-07cf1e68${_scopeId}>Still Have Questions?</h3><p class="text-muted mb-3" data-v-07cf1e68${_scopeId}> If you can&#39;t find the answer you&#39;re looking for, our team is ready to help you with personalized advice. </p><div class="d-flex align-items-center gap-2 flex-wrap justify-content-center" data-v-07cf1e68${_scopeId}><h5 class="mb-0 fw-bold" data-v-07cf1e68${_scopeId}>Can&#39;t find what you&#39;re looking for?</h5><a href="/contact-us" class="btn btn-primary" data-v-07cf1e68${_scopeId}>Contact Us Today</a></div></div></div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", {
                id: "apply",
                class: "cta"
              }, [
                createVNode("div", {
                  class: "container",
                  "data-aos": "zoom-in"
                }, [
                  createVNode("div", { class: "text-center text-white" }, [
                    createVNode("h1", { class: "fw-bold" }, "Frequently Asked Questions"),
                    createVNode("p", { class: "mt-3 fs-5" }, "Get answers to common questions about our web design, branding, and digital marketing services")
                  ])
                ])
              ]),
              createVNode("section", { class: "banner-image" }, [
                createVNode("div", { class: "container mt-5 my-5 py-5 px-4" }, [
                  createVNode("nav", {
                    "aria-label": "breadcrumb",
                    class: "mb-4"
                  }, [
                    createVNode("ol", { class: "breadcrumb" }, [
                      createVNode("li", { class: "breadcrumb-item" }, [
                        createVNode("a", { href: "/" }, "Home")
                      ]),
                      createVNode("li", {
                        class: "breadcrumb-item active",
                        "aria-current": "page"
                      }, "FAQ")
                    ])
                  ]),
                  createVNode("div", { class: "row justify-content-center mb-5" }, [
                    createVNode("div", { class: "col-lg-8" }, [
                      createVNode("div", { class: "text-center mb-4" }, [
                        createVNode("h2", { class: "h3 mb-3" }, "Common Questions About Our Design Services"),
                        createVNode("p", { class: "text-muted" }, " We've compiled answers to the most frequently asked questions about our web design, graphic design, branding, e-commerce, and digital marketing services in South Africa. ")
                      ])
                    ])
                  ]),
                  createVNode(FaqComponent),
                  createVNode("div", { class: "mb-5 mt-5 px-4" }, [
                    createVNode("div", { class: "row justify-content-center" }, [
                      createVNode("div", { class: "col-lg-8" }, [
                        createVNode("div", { class: "text-center bg-light rounded p-4" }, [
                          createVNode("h3", { class: "h4 mb-3" }, "Still Have Questions?"),
                          createVNode("p", { class: "text-muted mb-3" }, " If you can't find the answer you're looking for, our team is ready to help you with personalized advice. "),
                          createVNode("div", { class: "d-flex align-items-center gap-2 flex-wrap justify-content-center" }, [
                            createVNode("h5", { class: "mb-0 fw-bold" }, "Can't find what you're looking for?"),
                            createVNode("a", {
                              href: "/contact-us",
                              class: "btn btn-primary"
                            }, "Contact Us Today")
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07cf1e68"]]);
export {
  Faq as default
};
