import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';
import '../css/custom.css';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { Head } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-js';


// Bootstrap import
import * as bootstrap from 'bootstrap';

// FontAwesome setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faBars,
    faMoon,
    faSun,
    faGlobe,
    faUser,
    faBell,
    faCog,
    faHome,
    faTrash,
    faFilePdf,
    faSignOutAlt,
    faCalendarAlt,
    faClipboardList,
    faEye,
    faSpinner,
    faPaperPlane,
    faMailForward,
    faEnvelope,
    faPaintBrush,
    faFileInvoiceDollar,
    faCheck,
    faLightbulb,
    faPalette,
    faDesktop,
    faSignature,
    faIdBadge,
    faPencilRuler,
    faLaptopCode,
    faCode,
    faShoppingCart,
    faBullhorn,
    faBoxOpen,
    faEdit,
    faPenAlt,
    faPen,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import {
    faTiktok,
    faYoutube,
    faInstagram,
    faFacebook
} from "@fortawesome/free-brands-svg-icons";

// Add icons to library
library.add(
    faBars,
    faFacebook,
    faInstagram,
    faYoutube,
    faTiktok,
    faMoon,
    faFileInvoiceDollar,
    faSun,
    faGlobe,
    faUser,
    faBell,
    faCog,
    faTrash,
    faEye,
    faFilePdf,
    faHome,
    faSignOutAlt,
    faClipboardList,
    faCalendarAlt,
    faSpinner,
    faEnvelope,
    faMailForward,
    faPaperPlane,
    faPaintBrush,
    faCheck,
    faCheckCircle,
    faLightbulb,
    faPalette,
    faDesktop,
    faSignature,
    faIdBadge,
    faPencilRuler,
    faLaptopCode,
    faCode,
    faShoppingCart,
    faBullhorn,
    faBoxOpen,
    faEdit,
    faPen,
    faPenAlt
);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Make bootstrap available globally if needed
window.bootstrap = bootstrap;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .component('Head', Head)
            .component("font-awesome-icon", FontAwesomeIcon)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});