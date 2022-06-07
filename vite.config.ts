import { defineConfig } from 'vite'
import path from 'path'

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'rxts',
      fileName: (format) => `rxts.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        // 'vue'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // vue: 'Vue',
        },
      },
    },
  },
})
