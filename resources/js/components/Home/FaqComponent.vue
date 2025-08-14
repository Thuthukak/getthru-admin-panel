<template>
  <section class="p-4" itemscope itemtype="https://schema.org/FAQPage">
    <!-- Category Navigation -->
    <div class="mb-6">
      <div class="text-center mb-4">
        <h2 class="h4 mb-3">Browse by Service Category</h2>
        <p class="text-muted">Select a category to view relevant questions and answers</p>
      </div>
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 rounded text-white transition-all duration-200 hover:scale-105',
            selectedCategory === cat ? 'bg-blue-600 shadow-lg' : 'bg-gray-500 hover:bg-gray-600'
          ]"
          :aria-label="`View ${cat} questions`"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- FAQ Items -->
    <div class="max-w-4xl mx-auto mt-5">
      <div class="mb-4">
        <h3 class="h5 text-center mb-4 text-primary">
          {{ selectedCategory }} - Frequently Asked Questions
        </h3>
      </div>
      
      <div 
        v-for="(item, index) in filteredFaqs" 
        :key="index" 
        class="mb-4 border rounded-lg shadow-sm bg-white"
        itemscope 
        itemtype="https://schema.org/Question"
      >
        <button
          class="w-full text-left font-semibold text-lg flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-200"
          @click="toggle(index)"
          :aria-expanded="activeIndex === index"
          :aria-controls="`answer-${index}`"
        >
          <span itemprop="name">{{ item.question }}</span>
          <span 
            class="text-2xl font-bold text-blue-600 transform transition-transform duration-200"
            :class="{ 'rotate-45': activeIndex === index }"
          >
            +
          </span>
        </button>
        
        <transition name="fade">
          <div 
            v-if="activeIndex === index" 
            :id="`answer-${index}`"
            class="px-4 pb-4"
            itemscope 
            itemtype="https://schema.org/Answer"
          >
            <div class="border-t pt-3">
              <p itemprop="text" class="text-gray-700 leading-relaxed">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>    
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = [
  'Web Design',
  'Graphic Design',
  'Identity Design',
  'Product Design',
  'E-Commerce Solutions',
  'Digital Marketing',
]

const selectedCategory = ref('Web Design')
const activeIndex = ref(null)

const faqs = ref([
  // Web Design FAQs
  {
    category: 'Web Design',
    question: 'Do you build responsive websites?',
    answer: 'Yes, all our websites are mobile-friendly and fully responsive across devices including smartphones, tablets, and desktops. We ensure your website looks and functions perfectly on all screen sizes.',
  },
  {
    category: 'Web Design',
    question: 'Can you redesign my current website?',
    answer: 'Absolutely. We specialize in modernizing existing websites while preserving your brand identity and improving user experience, performance, and search engine optimization.',
  },
  {
    category: 'Web Design',
    question: 'What is responsive web design?',
    answer: 'Responsive web design is an approach to designing websites that ensures they adapt and display properly across different devices and screen sizes, including desktops, laptops, tablets, and smartphones.',
  },
  {
    category: 'Web Design',
    question: 'How much does web design cost in South Africa?',
    answer: 'The cost of web design in South Africa varies depending on complexity, features, and customization. Basic websites start from R8,000, while complex e-commerce sites can range from R25,000+. Contact us for a personalized quote.',
  },
  {
    category: 'Web Design',
    question: 'Should I pay up front for web design?',
    answer: 'Yes, you pay a 50% deposit upfront to secure your project slot. The remaining balance is due when the website is completed and approved.',
  },
  {
    category: 'Web Design',
    question: 'How long does it take to build a website?',
    answer: 'Website development typically takes 2-8 weeks depending on complexity. Simple websites take 2-3 weeks, while complex e-commerce sites may take 6-8 weeks.',
  },

  // Product Design FAQs
  {
    category: 'Product Design',
    question: 'Do you offer product design services?',
    answer: 'Yes, we specialize in creating visually appealing and functional product designs that align with your brand identity and market positioning.',
  },
  {
    category: 'Product Design',
    question: 'What is product design?',
    answer: 'Product design is the process of creating new products or improving existing ones to meet user needs. It combines creativity, engineering, and user-centered design principles.',
  },
  {
    category: 'Product Design',
    question: 'What types of products do you design?',
    answer: 'We design everything from packaging and labels to product mockups and prototypes, ensuring your product stands out in both physical and digital marketplaces.',
  },
  {
    category: 'Product Design',
    question: 'Why is product design important?',
    answer: 'Product design directly impacts market success by meeting user needs, differentiating from competitors, enhancing brand reputation, and driving sales and customer satisfaction.',
  },
  {
    category: 'Product Design',
    question: 'Is there a minimum order quantity?',
    answer: 'No, there is no minimum order quantity for product design services. We work with businesses of all sizes.',
  },
  {
    category: 'Product Design',
    question: 'How much does product design cost?',
    answer: 'Product design costs vary based on complexity and scope. Simple packaging design starts from R3,000, while comprehensive product design projects range from R8,000+.',
  },

  // Graphic Design FAQs
  {
    category: 'Graphic Design',
    question: 'What types of graphic designs do you offer?',
    answer: 'We offer comprehensive graphic design services including logos, flyers, brochures, business cards, packaging, promotional materials, and digital graphics.',
  },
  {
    category: 'Graphic Design',
    question: 'Can you create custom designs?',
    answer: 'Yes, we create 100% custom designs tailored to your brand identity, target audience, and business objectives.',
  },
  {
    category: 'Graphic Design',
    question: 'What file formats will I receive?',
    answer: 'You will receive designs in multiple formats including vector files (.AI, .EPS, .SVG) for scalability and raster formats (.PNG, .JPG) for web and print use.',
  },
  {
    category: 'Graphic Design',
    question: 'How much do graphic design services cost?',
    answer: 'Graphic design pricing varies by project complexity. Logo design starts from R1,500, flyers from R500, and comprehensive brand packages from R8,000.',
  },
  {
    category: 'Graphic Design',
    question: 'Can I request revisions to the designs?',
    answer: 'Yes, we include up to 3 revision rounds in our standard packages. Additional revisions are available at R300 per round.',
  },

  // E-Commerce Solutions FAQs
  {
    category: 'E-Commerce Solutions',
    question: 'Do you offer payment gateway integration?',
    answer: 'Yes, we integrate with major South African payment gateways including PayFast, PayGate, PayPal, and Stripe for secure online transactions.',
  },
  {
    category: 'E-Commerce Solutions',
    question: 'What features should I look for in an e-commerce solution?',
    answer: 'Essential features include mobile responsiveness, secure payment processing, inventory management, order tracking, SEO optimization, and integration with business systems.',
  },
  {
    category: 'E-Commerce Solutions',
    question: 'How do you ensure payment security?',
    answer: 'We implement SSL encryption, PCI compliance, fraud detection measures, and use only trusted payment gateways to protect customer payment information.',
  },
  {
    category: 'E-Commerce Solutions',
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer ongoing support including product updates, inventory management, technical maintenance, security updates, and performance optimization.',
  },
  {
    category: 'E-Commerce Solutions',
    question: 'How do I measure e-commerce success?',
    answer: 'Key metrics include website traffic, conversion rates, average order value, customer acquisition cost, and return on investment. We provide analytics setup and reporting.',
  },

  // Digital Marketing FAQs
  {
    category: 'Digital Marketing',
    question: 'Do you manage social media accounts?',
    answer: 'Yes, we provide comprehensive social media management including content creation, posting schedules, engagement, and growth strategies across multiple platforms.',
  },
  {
    category: 'Digital Marketing',
    question: 'What digital marketing services do you offer?',
    answer: 'We offer SEO, social media marketing, content marketing, email marketing, Google Ads, Facebook advertising, and comprehensive digital strategy development.',
  },
  {
    category: 'Digital Marketing',
    question: 'How do you ensure campaign success?',
    answer: 'We set clear KPIs, create strategic plans, monitor performance continuously, and provide regular optimization to maximize ROI and achieve your marketing goals.',
  },
  {
    category: 'Digital Marketing',
    question: 'Can you create custom landing pages?',
    answer: 'Yes, we design and develop custom landing pages optimized for conversions, aligned with your brand identity, and tailored to specific marketing campaigns.',
  },
  {
    category: 'Digital Marketing',
    question: 'What is the difference between organic and paid traffic?',
    answer: 'Organic traffic comes from unpaid search results and content marketing, while paid traffic comes from advertisements. Both are important for comprehensive digital marketing success.',
  },

  // Identity Design FAQs
  {
    category: 'Identity Design',
    question: 'What identity design services do you offer?',
    answer: 'We provide complete brand identity solutions including logo design, color palettes, typography selection, brand guidelines, and marketing collateral design.',
  },
  {
    category: 'Identity Design',
    question: 'Can you create custom identity designs?',
    answer: 'Yes, we create unique, custom brand identities that reflect your business values, target audience, and market positioning.',
  },
  {
    category: 'Identity Design',
    question: 'What file formats will I receive?',
    answer: 'You will receive comprehensive brand assets in vector formats (SVG, EPS, AI) and raster formats (PNG, JPG) suitable for all applications.',
  },
  {
    category: 'Identity Design',
    question: 'What is the cost of identity design services?',
    answer: 'Identity design packages start from R3,500 for basic logo design and range to R15,000+ for comprehensive brand identity systems.',
  },
  {
    category: 'Identity Design',
    question: 'What services are included in identity design?',
    answer: 'Services include logo design, color palette development, typography selection, brand guidelines creation, business card design, and brand strategy consultation.',
  },
  {
    category: 'Identity Design',
    question: 'How will I receive the final assets?',
    answer: 'You will receive a comprehensive brand identity package with all necessary files, brand guidelines, and usage instructions delivered digitally.',
  },
  {
    category: 'Identity Design',
    question: 'What if I\'m not satisfied with the initial concepts?',
    answer: 'Client satisfaction is our priority. We include multiple concept presentations and revision rounds to ensure the final design exceeds your expectations.',
  },
])

const filteredFaqs = computed(() =>
  faqs.value.filter((faq) => faq.category === selectedCategory.value)
)

// Generate related questions based on current category
const relatedQuestions = computed(() => {
  const currentCategoryFaqs = filteredFaqs.value
  const otherCategories = categories.filter(cat => cat !== selectedCategory.value)
  
  return otherCategories.slice(0, 4).map(cat => {
    const categoryFaqs = faqs.value.filter(faq => faq.category === cat)
    return categoryFaqs.length > 0 ? categoryFaqs[0].question : null
  }).filter(Boolean)
})

function toggle(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, max-height 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 200px;
}

.rotate-45 {
  transform: rotate(45deg);
}

button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>