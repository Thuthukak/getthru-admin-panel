import { mergeProps, reactive, ref, computed, watch, onMounted, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  setup() {
    const formData = reactive({
      name: "",
      surname: "",
      phone: "",
      alternativePhone: "",
      email: "",
      location: "",
      otherLocation: "",
      address: "",
      serviceType: "",
      package: "",
      installationDate: "",
      paymentPeriod: "",
      depositPayment: "",
      howDidYouKnow: "",
      otherKnow: "",
      comments: ""
    });
    const isSubmitting = ref(false);
    const statusMessage = ref("");
    const statusType = ref("");
    const showStatus = ref(false);
    const availablePackages = ref([]);
    const isLoadingPackages = ref(false);
    const showOtherLocation = computed(() => formData.location === "Other");
    const showOtherKnow = computed(() => formData.howDidYouKnow === "Other");
    const minDate = computed(() => {
      const today = /* @__PURE__ */ new Date();
      return today.toISOString().split("T")[0];
    });
    watch(() => formData.serviceType, async (newServiceType) => {
      if (newServiceType) {
        await loadPackages(newServiceType);
        formData.package = "";
      } else {
        availablePackages.value = [];
        formData.package = "";
      }
    });
    const loadPackages = async (serviceType) => {
      isLoadingPackages.value = true;
      try {
        const response = await fetch(`/api/packages/${encodeURIComponent(serviceType)}`);
        if (response.ok) {
          const data = await response.json();
          availablePackages.value = data.packages || [];
        } else {
          availablePackages.value = [];
          console.error("Failed to load packages:", response.statusText);
        }
      } catch (error) {
        console.error("Error loading packages:", error);
        availablePackages.value = [];
      } finally {
        isLoadingPackages.value = false;
      }
    };
    const formatPrice = (price) => {
      return parseFloat(price).toFixed(2);
    };
    const getPackageDescription = (packageName) => {
      const descriptions = {
        "Basic": "Unlimited 10/10Mbps",
        "Standard": "Unlimited 20/20Mbps",
        "Premium": "Unlimited 30/30Mbps"
      };
      return descriptions[packageName] || "";
    };
    const validateForm = () => {
      const requiredFields = [
        "name",
        "surname",
        "phone",
        "email",
        "location",
        "address",
        "serviceType",
        "package",
        "installationDate",
        "paymentPeriod",
        "depositPayment"
      ];
      for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === "") {
          return false;
        }
      }
      if (formData.location === "Other" && (!formData.otherLocation || formData.otherLocation.trim() === "")) {
        return false;
      }
      if (formData.howDidYouKnow === "Other" && (!formData.otherKnow || formData.otherKnow.trim() === "")) {
        return false;
      }
      return true;
    };
    const displayStatus = (message, type) => {
      statusMessage.value = message;
      statusType.value = type;
      showStatus.value = true;
      if (type === "success") {
        setTimeout(() => {
          showStatus.value = false;
        }, 5e3);
      }
    };
    const resetForm = () => {
      Object.keys(formData).forEach((key) => {
        formData[key] = "";
      });
      availablePackages.value = [];
    };
    const submitForm = async () => {
      var _a, _b;
      if (!validateForm()) {
        displayStatus("Please fill in all required fields.", "error");
        return;
      }
      isSubmitting.value = true;
      try {
        const csrfToken = ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ((_b = window.Laravel) == null ? void 0 : _b.csrfToken);
        const response = await fetch("/api/reg-form-submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          const result = await response.json();
          displayStatus("Order placed successfully! We'll contact you soon.", "success");
          resetForm();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit form");
        }
      } catch (error) {
        displayStatus("There was an error submitting the form. Please try again.", "error");
        console.error("Error submitting form:", error);
      } finally {
        isSubmitting.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", (e) => {
        if (showStatus.value && !e.target.closest(".status-message")) {
          showStatus.value = false;
        }
      });
    });
    return {
      formData,
      isSubmitting,
      statusMessage,
      statusType,
      showStatus,
      showOtherLocation,
      showOtherKnow,
      availablePackages,
      isLoadingPackages,
      minDate,
      formatPrice,
      getPackageDescription,
      submitForm
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 min-h-screen" }, _attrs))} data-v-cd57c444><div class="container mx-auto px-6 py-5" style="${ssrRenderStyle({ "max-width": "800px" })}" data-v-cd57c444><div class="bg-blue-500 shadow mb-6 rounded-lg overflow-hidden" data-v-cd57c444><img src="/assets/images/getthruformbanner.jpeg" alt="GetThru Logo" class="w-full h-full object-cover" data-v-cd57c444></div><div class="mb-6 bg-white rounded-lg shadow p-6" data-v-cd57c444><h4 class="text-xl font-semibold fw-bold mb-4 text-gray-800 border-b pb-2" data-v-cd57c444> Customer Contact Details </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-cd57c444><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Name *</label><input${ssrRenderAttr("value", $setup.formData.name)} type="text" placeholder="Enter your name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Surname *</label><input${ssrRenderAttr("value", $setup.formData.surname)} type="text" placeholder="Enter your surname" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Phone Number *</label><input${ssrRenderAttr("value", $setup.formData.phone)} type="tel" placeholder="Enter your phone number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Alternative Number</label><input${ssrRenderAttr("value", $setup.formData.alternativePhone)} type="tel" placeholder="Enter alternative phone number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div><div class="md:col-span-2" data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Email *</label><input${ssrRenderAttr("value", $setup.formData.email)} type="email" placeholder="Enter your email address" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div><div class="md:col-span-2" data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-3" data-v-cd57c444>Location *</label><div class="space-y-3" data-v-cd57c444><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.location, "Nhlazatje")) ? " checked" : ""} type="radio" value="Nhlazatje" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Nhlazatje</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.location, "Elukwatini")) ? " checked" : ""} type="radio" value="Elukwatini" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Elukwatini</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.location, "Tjakastad")) ? " checked" : ""} type="radio" value="Tjakastad" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Tjakastad</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.location, "Other")) ? " checked" : ""} type="radio" value="Other" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Other</span></label></div><div style="${ssrRenderStyle($setup.showOtherLocation ? null : { display: "none" })}" class="mt-3" data-v-cd57c444><input${ssrRenderAttr("value", $setup.formData.otherLocation)} type="text" placeholder="Enter your location" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div></div><div class="md:col-span-2" data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Home Street Address *</label><input${ssrRenderAttr("value", $setup.formData.address)} type="text" placeholder="Enter your home street address" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div></div></div><div class="mb-6 bg-white rounded-lg shadow p-6" data-v-cd57c444><h4 class="text-xl font-semibold mb-4 fw-bold text-gray-800 border-b pb-2" data-v-cd57c444> Internet Solution Details </h4><div class="space-y-6" data-v-cd57c444><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-3" data-v-cd57c444>Service Type *</label><div class="space-y-3" data-v-cd57c444><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.serviceType, "Home Internet")) ? " checked" : ""} type="radio" value="Home Internet" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Home Internet</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.serviceType, "Business Internet")) ? " checked" : ""} type="radio" value="Business Internet" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Business Internet</span></label></div></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-3" data-v-cd57c444>Select Package *</label><div class="space-y-3" data-v-cd57c444>`);
  if ($setup.availablePackages.length > 0) {
    _push(`<!--[-->`);
    ssrRenderList($setup.availablePackages, (pkg) => {
      _push(`<label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.package, pkg.package)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", pkg.package)} class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>${ssrInterpolate(pkg.package)} - R${ssrInterpolate($setup.formatPrice(pkg.price))} `);
      if ($setup.getPackageDescription(pkg.package)) {
        _push(`<span class="text-gray-600 text-sm" data-v-cd57c444> (${ssrInterpolate($setup.getPackageDescription(pkg.package))}) </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></label>`);
    });
    _push(`<!--]-->`);
  } else if ($setup.formData.serviceType && $setup.isLoadingPackages) {
    _push(`<div class="text-gray-500" data-v-cd57c444> Loading packages... </div>`);
  } else if ($setup.formData.serviceType) {
    _push(`<div class="text-gray-500" data-v-cd57c444> No packages available for selected service type. </div>`);
  } else {
    _push(`<div class="text-gray-500" data-v-cd57c444> Please select a service type first. </div>`);
  }
  _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-cd57c444><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-1" data-v-cd57c444>Preferred Installation Date *</label><input${ssrRenderAttr("value", $setup.formData.installationDate)} type="date"${ssrRenderAttr("min", $setup.minDate)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-3" data-v-cd57c444>Preferred Subscription Payment Period *</label><p class="text-sm text-gray-600 mb-3" data-v-cd57c444>This is the time of the month you would prefer to pay your monthly connection payment.</p><div class="space-y-3" data-v-cd57c444><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.paymentPeriod, "1st of every month")) ? " checked" : ""} type="radio" value="1st of every month" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>1st of every month</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.paymentPeriod, "15th of every month")) ? " checked" : ""} type="radio" value="15th of every month" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>15th of every month</span></label></div></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-medium mb-3" data-v-cd57c444>Deposit Payment *</label><p class="text-sm text-gray-600 mb-3" data-v-cd57c444>To secure your order we require 50% upfront deposit payment, how do you prefer to pay? (The full deposit amount is R950 once off)</p><div class="space-y-3" data-v-cd57c444><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.depositPayment, "EFT Payment")) ? " checked" : ""} type="radio" value="EFT Payment" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>EFT Payment</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.depositPayment, "Card")) ? " checked" : ""} type="radio" value="Card" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Pay using our secure options</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.depositPayment, "Bank deposit")) ? " checked" : ""} type="radio" value="Bank deposit" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Bank deposit</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.depositPayment, "Pay later")) ? " checked" : ""} type="radio" value="Pay later" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Pay later</span></label></div></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-large mb-3" data-v-cd57c444>How do you know about us?</label><div class="space-y-3" data-v-cd57c444><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.howDidYouKnow, "Social Media")) ? " checked" : ""} type="radio" value="Social Media" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Social Media</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.howDidYouKnow, "Through a friend")) ? " checked" : ""} type="radio" value="Through a friend" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Through a friend</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.howDidYouKnow, "Saw a poster")) ? " checked" : ""} type="radio" value="Saw a poster" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Saw a poster</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.howDidYouKnow, "Through one of our agents")) ? " checked" : ""} type="radio" value="Through one of our agents" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Through one of our agents</span></label><label class="custom-radio-container" data-v-cd57c444><input${ssrIncludeBooleanAttr(ssrLooseEqual($setup.formData.howDidYouKnow, "Other")) ? " checked" : ""} type="radio" value="Other" class="custom-radio-input" data-v-cd57c444><span class="custom-radio-checkmark" data-v-cd57c444></span><span class="custom-radio-text" data-v-cd57c444>Other</span></label></div><div style="${ssrRenderStyle($setup.showOtherKnow ? null : { display: "none" })}" class="mt-3" data-v-cd57c444><input${ssrRenderAttr("value", $setup.formData.otherKnow)} type="text" placeholder="If other, how do you know about us?" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-cd57c444></div></div><div data-v-cd57c444><label class="block text-gray-700 text-lg fw-bold font-large mb-1" data-v-cd57c444>Additional Comments</label><textarea placeholder="Enter your comments" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical" data-v-cd57c444>${ssrInterpolate($setup.formData.comments)}</textarea></div></div></div><div class="flex" data-v-cd57c444><button${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} class="${ssrRenderClass([[
    "font-semibold py-2 px-3 rounded shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    $setup.isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:shadow-xl"
  ], "text-white"])}" data-v-cd57c444>${ssrInterpolate($setup.isSubmitting ? "Submitting..." : "Submit")}</button></div><div style="${ssrRenderStyle($setup.showStatus ? null : { display: "none" })}" class="${ssrRenderClass([
    "mt-4 p-4 border rounded-lg text-center shadow-md",
    $setup.statusType === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
  ])}" data-v-cd57c444>${ssrInterpolate($setup.statusMessage)}</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/RegistrationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RegistrationForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cd57c444"]]);
export {
  RegistrationForm as default
};
