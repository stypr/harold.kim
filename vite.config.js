import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md';
import fs from 'fs';
import {gitDescribe, gitDescribeSync} from 'git-describe';

// Generate git commit id
VUE_APP_GIT_HASH = [gitDescribeSync().hash];

// Generate blog json
BLOG_DIR = "./src/components/blog/"
BLOG_JSON = "./public/blog.json"
BLOG_LIST = "./src/views/BlogPost.vue"
blog_posts = []
fs.readdirSync(BLOG_DIR, {encoding:'utf8', flag:'r'}).forEach(file => {
  data = fs.readFileSync(BLOG_DIR + file).toString();
  _info = data.split("---")[1];
  _info_title = /title: (.+)\n/g.exec(_info)[1];
  _info_tag = /tag: (.+)\n/g.exec(_info)[1].trim().split(",");
  _info_date = new Date(/date: (.+)\n/g.exec(_info)[1]).toISOString().substr(0, 10);
  _info_category = /category: (.+)\n/g.exec(_info)[1];
  _info_secret = (/secret: (.+)\n/g.exec(_info)[1] === 'true');
  _info_file = file;
  _info_path =  "/blog/".concat(_info_date.substring(0, 8).replace(/-/g,'/') +
                _info_title.replace(/[^0-9A-Za-z\-\_가-힣]/g, '-')).toLowerCase()

  _info_info = {
    title: _info_title,
    created_at: _info_date,
    tag: _info_tag,
    category: _info_category,
    secret: _info_secret,
    path: _info_path,
    file: _info_file,
  }
  if (_info_info.secret === false){
    blog_posts.push(_info_info);
  }
});
fs.writeFileSync(BLOG_JSON, JSON.stringify(blog_posts))

// Populate blog information on blog post.
_list = fs.readFileSync(BLOG_LIST).toString();
_content = _list.split("<!-- list-start -->")[0] + "<!-- list-start -->"
for(var i in blog_posts){
  _content_filename = blog_posts[i].file.split(".")[0];
  _content += `<${_content_filename} v-if="post_path == '${_content_filename}.md'" />`
}
_content += "<!-- list-end -->" + _list.split("<!-- list-end -->")[1];
console.log(_content);
fs.writeFileSync(BLOG_LIST, _content);


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
