import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Admin/Dashboard/Dashboard.vue';
import Installations from './components/Admin/Dashboard/Installation/Installations.vue';
import Quotations from './components/Admin/Dashboard/Quotations/Quotations.vue';
import Profile from './components/Admin/Dashboard/Profile/Profile.vue';
import Settings from './components/Admin/Dashboard/Settings/Settings.vue';
import Services from './components/Admin/Dashboard/Services/Services.vue';
import Invoice from './components/Admin/Dashboard/Invoices/Invoice.vue';
import Packages from './components/Admin/Dashboard/Packages/Packages.vue';


const routes = [
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/installation', component: Installations },
    { path: '/admin/quotations', component: Quotations },
    { path: '/admin/profile', component: Profile },
    { path: '/admin/settings', component: Settings },
    { path: '/admin/services', component: Services },
    { path: '/admin/invoices', component: Invoice },
    { path: '/admin/packages', component: Packages },
    

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
