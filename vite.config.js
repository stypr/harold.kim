import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';

const {gitDescribe, gitDescribeSync} = require('git-describe');
VUE_APP_GIT_HASH = [gitDescribeSync().hash];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true,
    })
  ],
  define: {
    'VUE_APP_GIT_HASH': VUE_APP_GIT_HASH
  }
});
