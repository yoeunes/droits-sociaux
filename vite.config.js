import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Plugin to generate Jekyll-compatible manifest
function jekyllManifest() {
  return {
    name: 'jekyll-manifest',
    writeBundle(options, bundle) {
      const manifest = {};

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' || chunk.type === 'chunk') {
          // Extract original name from hashed filename
          const match = fileName.match(/^(.+?)(?:-[a-zA-Z0-9]+)?(\.[^.]+)$/);
          if (match) {
            const baseName = match[1].replace('assets/', '');
            const ext = match[2];
            const key = `${baseName}${ext}`;
            manifest[key] = `/${fileName}`;
          }
        }
      }

      // Write manifest for Jekyll
      const manifestPath = resolve(options.dir, '.vite-manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

      // Also write to _data for Jekyll to read
      const dataDir = resolve(__dirname, '_data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(resolve(dataDir, 'assets.json'), JSON.stringify(manifest, null, 2));
    }
  };
}

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';

  return {
    // Base URL for assets
    base: '/',

    // Build configuration
    build: {
      outDir: '_site/assets',
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/js/main.js'),
          styles: resolve(__dirname, 'src/css/main.css'),
        },
        output: {
          entryFileNames: isDev ? '[name].js' : '[name]-[hash].js',
          chunkFileNames: isDev ? '[name].js' : '[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name.split('.').pop();
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
              return isDev ? 'img/[name][extname]' : 'img/[name]-[hash][extname]';
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return isDev ? 'fonts/[name][extname]' : 'fonts/[name]-[hash][extname]';
            }
            return isDev ? '[name][extname]' : '[name]-[hash][extname]';
          },
        },
      },
      // Minification
      minify: mode === 'production' ? 'esbuild' : false,
      // Source maps for development
      sourcemap: isDev,
      // CSS code splitting
      cssCodeSplit: false,
    },

    // CSS configuration
    css: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          ...(mode === 'production' ? [require('cssnano')({ preset: 'default' })] : []),
        ],
      },
      devSourcemap: true,
    },

    // Development server
    server: {
      port: 3000,
      strictPort: true,
      origin: 'http://localhost:3000',
      // HMR configuration
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
      // Watch for changes
      watch: {
        usePolling: false,
        interval: 100,
      },
      // Proxy Jekyll server
      proxy: {
        // Proxy all non-asset requests to Jekyll
      },
    },

    // Preview server (for production preview)
    preview: {
      port: 4173,
    },

    // Resolve aliases
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@css': resolve(__dirname, 'src/css'),
        '@js': resolve(__dirname, 'src/js'),
        '@img': resolve(__dirname, 'src/img'),
      },
    },

    // Plugins
    plugins: [
      jekyllManifest(),
    ],

    // Define environment variables
    define: {
      __DEV__: isDev,
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [],
    },
  };
});
