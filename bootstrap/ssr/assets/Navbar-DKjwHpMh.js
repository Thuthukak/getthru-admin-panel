import axios from "axios";
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { useSSRContext, resolveComponent } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  name: "EstimateModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  data() {
    return {
      services: [],
      name: "",
      email: "",
      additionalDetails: "",
      submitted: false,
      submitting: false,
      loading: true,
      error: null,
      emailWarning: null
    };
  },
  computed: {
    hasSelectedServices() {
      return this.services.some((service) => service.selected);
    },
    totalEstimate() {
      return this.services.reduce((sum, service) => {
        return sum + (service.selected ? service.price : 0);
      }, 0);
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchServices();
      }
    }
  },
  methods: {
    fetchServices() {
      this.loading = true;
      this.error = null;
      axios.get("/api/services").then((response) => {
        this.services = response.data.map((service) => ({
          ...service,
          price: parseFloat(service.base_price),
          selected: false
        }));
      }).catch((error) => {
        console.error("Error fetching services:", error);
        this.error = "Failed to load services. Please try again later.";
      }).finally(() => {
        this.loading = false;
      });
    },
    toggleService(id) {
      const serviceIndex = this.services.findIndex((service) => service.id === id);
      if (serviceIndex !== -1) {
        this.services[serviceIndex].selected = !this.services[serviceIndex].selected;
      }
    },
    handleSubmit() {
      if (!this.hasSelectedServices || !this.name || !this.email || this.submitting) return;
      this.submitting = true;
      this.error = null;
      const selectedServices = this.services.filter((s) => s.selected).map((service) => ({
        id: service.id,
        price: service.price
      }));
      const requestData = {
        name: this.name,
        email: this.email,
        selectedServices,
        totalEstimate: this.totalEstimate,
        additionalDetails: this.additionalDetails
      };
      axios.post("/api/estimates", requestData).then((response) => {
        if (response.data.email_warning) {
          this.emailWarning = response.data.email_warning;
        }
        this.submitted = true;
      }).catch((error) => {
        console.error("Error submitting estimate request:", error);
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat().join("\n");
          alert(`Validation errors:
${errorMessages}`);
        } else if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("There was a problem submitting your request. Please try again or contact us directly.");
        }
      }).finally(() => {
        this.submitting = false;
      });
    },
    resetForm() {
      this.submitted = false;
      this.submitting = false;
      this.name = "";
      this.email = "";
      this.additionalDetails = "";
      this.emailWarning = null;
      this.error = null;
      this.services.forEach((service) => {
        service.selected = false;
      });
    },
    closeModal() {
      this.resetForm();
      this.$emit("close");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-aec4ed00>`);
  ssrRenderTeleport(_push, (_push2) => {
    if ($props.isOpen) {
      _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-aec4ed00><div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col" data-v-aec4ed00><div class="modal-header-color text-white px-6 py-4 flex justify-between items-center" data-v-aec4ed00><h3 class="text-xl fw-bold font-bold" data-v-aec4ed00>Request Project Estimate</h3><button class="text-white hover:text-gray-200" data-v-aec4ed00><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-aec4ed00><path d="M18 6 6 18" data-v-aec4ed00></path><path d="m6 6 12 12" data-v-aec4ed00></path></svg></button></div><div class="p-6 overflow-y-auto flex-1" data-v-aec4ed00>`);
      if (!$data.submitted) {
        _push2(`<div data-v-aec4ed00>`);
        if ($data.loading) {
          _push2(`<div class="flex justify-center items-center py-12" data-v-aec4ed00><svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-aec4ed00><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-aec4ed00></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-aec4ed00></path></svg></div>`);
        } else if ($data.submitting) {
          _push2(`<div class="flex justify-center items-center py-12" data-v-aec4ed00><div class="text-center" data-v-aec4ed00><svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-aec4ed00><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-aec4ed00></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-aec4ed00></path></svg><p class="text-gray-600" data-v-aec4ed00>Submitting your request...</p></div></div>`);
        } else {
          _push2(`<div data-v-aec4ed00><div class="mb-4" data-v-aec4ed00><h4 class="text-lg font-semibold mb-2 text-gray-800" data-v-aec4ed00>Select Services You&#39;re Interested In</h4><p class="text-sm text-gray-600 mb-3" data-v-aec4ed00>Choose the services you&#39;d like us to include in your custom estimate.</p><div class="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2" data-v-aec4ed00><!--[-->`);
          ssrRenderList($data.services, (service) => {
            _push2(`<div class="${ssrRenderClass([
              "border rounded-lg p-3 cursor-pointer transition-all",
              service.selected ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
            ])}" data-v-aec4ed00><div class="flex items-center justify-between" data-v-aec4ed00><div class="flex items-center" data-v-aec4ed00><div class="${ssrRenderClass([
              "w-5 h-5 rounded border-2 mr-3 flex items-center justify-center",
              service.selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
            ])}" data-v-aec4ed00>`);
            if (service.selected) {
              _push2(`<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-aec4ed00><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-aec4ed00></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><span class="font-medium text-gray-800" data-v-aec4ed00>${ssrInterpolate(service.name)}</span></div></div>`);
            if (service.description) {
              _push2(`<p class="text-sm text-gray-600 mt-1 ml-8" data-v-aec4ed00>${ssrInterpolate(service.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div><div class="bg-blue-50 p-3 rounded-lg mb-4" data-v-aec4ed00><div class="flex items-center mb-2" data-v-aec4ed00><svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-aec4ed00><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" data-v-aec4ed00></path></svg><span class="font-medium text-blue-800" data-v-aec4ed00>About Your Estimate</span></div><p class="text-sm text-blue-700" data-v-aec4ed00> We&#39;ll review your selected services and send you a detailed, personalized quote via email within 24 hours. </p></div><div class="mb-4" data-v-aec4ed00><h4 class="text-lg font-semibold mb-2 text-gray-800" data-v-aec4ed00>Your Contact Details</h4><div class="space-y-3" data-v-aec4ed00><div data-v-aec4ed00><label class="block text-gray-700 text-sm font-medium mb-1" data-v-aec4ed00>Full Name</label><input type="text"${ssrRenderAttr("value", $data.name)} placeholder="Enter your full name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required data-v-aec4ed00></div><div data-v-aec4ed00><label class="block text-gray-700 text-sm font-medium mb-1" data-v-aec4ed00>Email Address</label><input type="email"${ssrRenderAttr("value", $data.email)} placeholder="Enter your email address" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required data-v-aec4ed00></div><div data-v-aec4ed00><label class="block text-gray-700 text-sm font-medium mb-1" data-v-aec4ed00>Additional Details (Optional)</label><textarea placeholder="Tell us more about your project requirements..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-16 resize-none" data-v-aec4ed00>${ssrInterpolate($data.additionalDetails)}</textarea></div></div></div><button${ssrIncludeBooleanAttr(!$options.hasSelectedServices || !$data.name || !$data.email || $data.submitting) ? " disabled" : ""} class="${ssrRenderClass([
            "w-full py-3 px-6 rounded font-bold text-white transition-colors",
            $options.hasSelectedServices && $data.name && $data.email && !$data.submitting ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
          ])}" data-v-aec4ed00>`);
          if ($data.submitting) {
            _push2(`<span data-v-aec4ed00>Sending Request...</span>`);
          } else if (!$options.hasSelectedServices && (!$data.name || !$data.email)) {
            _push2(`<span data-v-aec4ed00>Select Services &amp; Fill Contact Details</span>`);
          } else if (!$options.hasSelectedServices) {
            _push2(`<span data-v-aec4ed00>Please Select At Least One Service</span>`);
          } else if (!$data.name || !$data.email) {
            _push2(`<span data-v-aec4ed00>Please Fill In Contact Details</span>`);
          } else {
            _push2(`<span data-v-aec4ed00>Send Estimate Request</span>`);
          }
          _push2(`</button></div>`);
        }
        _push2(`</div>`);
      } else {
        _push2(`<div class="text-center py-6" data-v-aec4ed00><div class="flex justify-center mb-4" data-v-aec4ed00><div class="${ssrRenderClass([
          "p-3 rounded-full inline-flex",
          $data.emailWarning ? "bg-yellow-100" : "bg-green-100"
        ])}" data-v-aec4ed00>`);
        if (!$data.emailWarning) {
          _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600" data-v-aec4ed00><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" data-v-aec4ed00></path><polyline points="14 2 14 8 20 8" data-v-aec4ed00></polyline><path d="m9 15 2 2 4-4" data-v-aec4ed00></path></svg>`);
        } else {
          _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600" data-v-aec4ed00><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" data-v-aec4ed00></path><path d="M12 9v4" data-v-aec4ed00></path><path d="m12 17 .01 0" data-v-aec4ed00></path></svg>`);
        }
        _push2(`</div></div><h4 class="${ssrRenderClass([
          "text-xl font-bold mb-2",
          $data.emailWarning ? "text-yellow-800" : "text-gray-800"
        ])}" data-v-aec4ed00>${ssrInterpolate($data.emailWarning ? "Request Received!" : "Request Sent Successfully!")}</h4>`);
        if ($data.emailWarning) {
          _push2(`<div class="mb-4" data-v-aec4ed00><div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4" data-v-aec4ed00><p class="text-yellow-800 text-sm font-medium mb-2" data-v-aec4ed00>⚠️ Email Delivery Issue</p><p class="text-yellow-700 text-sm" data-v-aec4ed00>${ssrInterpolate($data.emailWarning)}</p></div><p class="text-gray-600" data-v-aec4ed00> Your request has been saved to our system. We will contact you directly at <strong data-v-aec4ed00>${ssrInterpolate($data.email)}</strong> within 24 hours with your detailed quote. </p></div>`);
        } else {
          _push2(`<div data-v-aec4ed00><p class="text-gray-600 mb-6" data-v-aec4ed00> Thank you! We&#39;ve received your estimate request and will send you a detailed quote at <strong data-v-aec4ed00>${ssrInterpolate($data.email)}</strong> within 24 hours. </p></div>`);
        }
        _push2(`<button class="${ssrRenderClass([
          "font-bold py-2 px-6 rounded text-white",
          $data.emailWarning ? "bg-yellow-600 hover:bg-yellow-700" : "bg-indigo-600 hover:bg-indigo-700"
        ])}" data-v-aec4ed00> Close </button></div>`);
      }
      _push2(`</div></div></div>`);
    } else {
      _push2(`<!---->`);
    }
  }, "body", false, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/EstimateModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const EstimateModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-aec4ed00"]]);
const _sfc_main = {
  name: "Navbar",
  components: {
    EstimateModal
  },
  props: {
    seo: Object
  },
  data() {
    return {
      isDropdownOpen: false,
      isMobileMenuOpen: false,
      isMobileServicesOpen: false,
      isModalOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (!this.isMobileMenuOpen) {
        this.isMobileServicesOpen = false;
      }
    },
    toggleMobileServices() {
      this.isMobileServicesOpen = !this.isMobileServicesOpen;
    },
    openQuoteModal() {
      this.isModalOpen = true;
    },
    closeQuoteModal() {
      this.isModalOpen = false;
    },
    // Close dropdowns when clicking outside
    handleClickOutside(event) {
      if (!event.target.closest(".dropdown-container")) {
        this.isDropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_EstimateModal = resolveComponent("EstimateModal");
  _push(`<!--[--><nav class="bg-shape-primary shadow-md sticky top-0 z-50" data-v-e566941a><div class="container mx-auto px-4" data-v-e566941a><div class="hidden md:flex justify-between items-center py-4" data-v-e566941a><a href="/" class="text-xl font-bold" data-v-e566941a><img${ssrRenderAttr("src", $props.seo.og_image)} alt="Logo" class="w-40 h-auto" data-v-e566941a></a><div class="flex space-x-6 items-center" data-v-e566941a><a href="/" class="nav-item" data-v-e566941a>Home</a><a href="/about-us" class="nav-item" data-v-e566941a>About Us</a><div class="relative dropdown-container" data-v-e566941a><button class="nav-item dropdown flex items-center" data-v-e566941a> Services <svg class="${ssrRenderClass([{ "rotate-180": $data.isDropdownOpen }, "w-4 h-4 ml-1 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e566941a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-e566941a></path></svg></button>`);
  if ($data.isDropdownOpen) {
    _push(`<div class="absolute left-0 top-full bg-white shadow-lg py-2 w-48 rounded-lg z-50 border" data-v-e566941a><a href="/services/web-design" class="dropdown-item" data-v-e566941a>Web Design</a><a href="/services/graphic-design" class="dropdown-item" data-v-e566941a>Graphic Design</a><a href="/services/product-design" class="dropdown-item" data-v-e566941a>Product Design</a><a href="/services/identity-design" class="dropdown-item" data-v-e566941a>Identity Design</a><a href="/services/e-commerce" class="dropdown-item" data-v-e566941a>E-Commerce</a><a href="/services/digital-marketing" class="dropdown-item" data-v-e566941a>Digital Marketing</a></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><a href="/faq" class="nav-item" data-v-e566941a>FAQ</a><a href="/contact-us" class="nav-item" data-v-e566941a>Contact Us</a><button class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition cursor-pointer" data-v-e566941a> Get Free Quote </button></div></div><div class="md:hidden flex justify-between items-center py-3" data-v-e566941a><a href="/" class="text-xl font-bold" data-v-e566941a><img${ssrRenderAttr("src", $props.seo.og_image)} alt="Logo" class="w-32 h-auto" data-v-e566941a></a><div class="flex items-center space-x-3" data-v-e566941a><button class="bg-blue-500 px-3 py-1.5 rounded text-white text-sm hover:bg-blue-600 transition" data-v-e566941a> Quote </button><button class="p-2 rounded-lg hover:bg-gray-100 transition" data-v-e566941a><svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e566941a>`);
  if (!$data.isMobileMenuOpen) {
    _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-e566941a></path>`);
  } else {
    _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-e566941a></path>`);
  }
  _push(`</svg></button></div></div>`);
  if ($data.isMobileMenuOpen) {
    _push(`<div class="md:hidden bg-white border-t border-gray-200" data-v-e566941a><div class="py-2 space-y-1" data-v-e566941a><a href="/" class="mobile-nav-item" data-v-e566941a>Home</a><a href="/about-us" class="mobile-nav-item" data-v-e566941a>About Us</a><div data-v-e566941a><button class="mobile-nav-item mobile-services-button" data-v-e566941a><span data-v-e566941a>Services</span><svg class="${ssrRenderClass([{ "rotate-180": $data.isMobileServicesOpen }, "w-4 h-4 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e566941a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-e566941a></path></svg></button>`);
    if ($data.isMobileServicesOpen) {
      _push(`<div class="bg-gray-50 border-l-2 border-blue-500 ml-4" data-v-e566941a><a href="/services/web-design" class="mobile-sub-item" data-v-e566941a>Web Design</a><a href="/services/graphic-design" class="mobile-sub-item" data-v-e566941a>Graphic Design</a><a href="/services/product-design" class="mobile-sub-item" data-v-e566941a>Product Design</a><a href="/services/identity-design" class="mobile-sub-item" data-v-e566941a>Identity Design</a><a href="/services/e-commerce" class="mobile-sub-item" data-v-e566941a>E-Commerce</a><a href="/services/digital-marketing" class="mobile-sub-item" data-v-e566941a>Digital Marketing</a></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><a href="/faq" class="mobile-nav-item" data-v-e566941a>FAQ</a><a href="/contact-us" class="mobile-nav-item" data-v-e566941a>Contact Us</a></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></nav>`);
  _push(ssrRenderComponent(_component_EstimateModal, {
    isOpen: $data.isModalOpen,
    onClose: $options.closeQuoteModal
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Home/Navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e566941a"]]);
export {
  EstimateModal as E,
  Navbar as N
};
