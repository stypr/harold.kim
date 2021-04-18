import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md';
import fs from 'fs';
import { gitDescribe, gitDescribeSync } from 'git-describe';

// Generate git commit id
VUE_APP_GIT_HASH = [gitDescribeSync().hash];

// Generate blog json and make sure all blog posts are accessible (BlogPost.vue)
blog_dir = "./src/components/blog/";
blog_json = "./public/blog.json";
blog_render = "./src/views/BlogPost.vue";
blog_posts = [];
fs.readdirSync(blog_dir, {
  encoding: 'utf8',
  flag: 'r'
}).forEach(file => {
  if(file.indexOf(".md", file.length - 3) === -1) return;
  data = fs.readFileSync(blog_dir + file).toString().split("---")[1];
  parsed = {};
  parsed.title      = /title: (.+)\n/g.exec(data)[1];
  parsed.created_at = new Date(/date: (.+)\n/g.exec(data)[1]).toISOString().substr(0, 10);
  parsed.tag        = /tag: (.+)\n/g.exec(data)[1].trim().split(",");
  parsed.category   = /category: (.+)\n/g.exec(data)[1];
  parsed.secret     = (/secret: (.+)\n/g.exec(data)[1] === 'true');
  parsed.file       = file; // filename
  parsed.path       = "/blog/".concat(parsed.created_at.substring(0, 8).replace(/-/g, '/') +
                        parsed.title.replace(/[^0-9A-Za-z\-\_가-힣]/g, '-')).toLowerCase()
  if (parsed.secret === false) {
    blog_posts.push(parsed);
  }
});
fs.writeFileSync(blog_json, JSON.stringify(blog_posts));
// Populate blog information on blog post.
blog_list = fs.readFileSync(blog_render).toString();
comment_start = "<!-- list-start -->";
comment_end = "<!-- list-end -->";
modified_content = blog_list.split(comment_start)[0] + comment_start;
for (var i in blog_posts) {
  post_filename = blog_posts[i].file.split(".")[0]
  modified_content += `<${post_filename} v-if="post_path == '${post_filename}.md'" />`
}
modified_content += comment_end + blog_list.split(comment_end)[1];
fs.writeFileSync(blog_render, modified_content);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true,
    }),
    ViteComponents({
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: path => path.endsWith('.md'),
    })
  ],
  define: {
    'VUE_APP_GIT_HASH': VUE_APP_GIT_HASH
  }
});