import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import glsl from 'vite-plugin-glsl';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl({
      warnDuplicatedImports: false,
      compress: false
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@shaders': path.resolve(__dirname, 'src/shaders'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      // Add more aliases as needed
    },
  },
})
