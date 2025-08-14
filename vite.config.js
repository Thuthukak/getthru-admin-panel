import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, ssrBuild }) => {
    const isSSRBuild = ssrBuild || process.argv.includes('--ssr');
    
    const baseConfig = {
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css', 
                    'resources/js/app.js',
                    'resources/js/admin.js'
                ],
                ssr: 'resources/js/ssr.js',
                refresh: true,
            }),
            tailwindcss(),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                '@': '/resources/js',
            },
        },
    };

    // Add runtime compiler alias only for non-SSR builds
    if (!isSSRBuild) {
        baseConfig.resolve.alias.vue = 'vue/dist/vue.esm-bundler.js';
    }

    // Add SSR-specific config
    if (isSSRBuild) {
        baseConfig.ssr = {
            noExternal: ['ziggy-js', '@inertiajs/vue3'],
        };
    }

    return baseConfig;
});