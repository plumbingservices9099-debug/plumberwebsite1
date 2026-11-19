import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function prerenderPreviewPlugin(): Plugin {
  return {
    name: 'prerender-preview-routing',
    configurePreviewServer(server) {
      const distDir = path.resolve(__dirname, 'dist');
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.method !== 'GET') return next();
        const urlPath = req.url.split('?')[0].split('#')[0];
        if (path.extname(urlPath)) return next();

        const cleanPath = urlPath.replace(/^\/+|\/+$/g, '');
        const candidateHtml = cleanPath
          ? path.join(distDir, cleanPath, 'index.html')
          : path.join(distDir, 'index.html');

        if (fs.existsSync(candidateHtml)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(fs.readFileSync(candidateHtml, 'utf-8'));
          return;
        }

        const notFoundHtml = path.join(distDir, '404.html');
        if (fs.existsSync(notFoundHtml)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(fs.readFileSync(notFoundHtml, 'utf-8'));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prerenderPreviewPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
