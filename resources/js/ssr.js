import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-js';
import { Head } from '@inertiajs/vue3';

// FontAwesome setup - SAME as app.js
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
} from "@fortawesome/free-solid-svg-icons";
import { 
    faTiktok,
    faYoutube,
    faInstagram,
    faFacebook
} from "@fortawesome/free-brands-svg-icons";

// Add icons to library - SAME as app.js
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
    faBoxOpen
);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                })
                .component('Head', Head)
                .component("font-awesome-icon", FontAwesomeIcon); // Add FontAwesome component
        },
    })
);