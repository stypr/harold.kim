<template>
  <router-link to="/blog" class="back" v-if="post_path">&laquo; Article List</router-link>
  <div class="blog-post padded" ref="post">
    <!-- list-start --><asisctf-gameshop v-if="post_path == 'asisctf-gameshop.md'" /><asisctf-moehost v-if="post_path == 'asisctf-moehost.md'" /><bctf2018 v-if="post_path == 'bctf2018.md'" /><eccube-vulnerability v-if="post_path == 'eccube-vulnerability.md'" /><harekaze2019 v-if="post_path == 'harekaze2019.md'" /><kisa-bugbounty v-if="post_path == 'kisa-bugbounty.md'" /><kve-2018 v-if="post_path == 'kve-2018.md'" /><qemu-notes v-if="post_path == 'qemu-notes.md'" /><ridi-2019 v-if="post_path == 'ridi-2019.md'" /><tmctf2018 v-if="post_path == 'tmctf2018.md'" /><twctf2018 v-if="post_path == 'twctf2018.md'" /><volgactf-lazy-admin v-if="post_path == 'volgactf-lazy-admin.md'" /><welcome v-if="post_path == 'welcome.md'" /><!-- list-end -->
    <NotFound v-if="post_error" />
  </div>
  <div id="disqus_thread" v-if="!post_error"></div>
</template>
<script type="module">
import axios from 'axios';
var d = document, s = d.createElement('script');
    s.src = 'https://haroldie.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);

export default {
  data() {
    return {
        post_path: '',
        post_error: false,
    };
  },
  mounted() {
    this.axios.get('/blog.json').then(response => {
      let q = response.data.filter((r) => r.path == location.pathname);
      if(q[0]){
          this.post_path = q[0].file;
      }else{
          this.post_error = true;
      }
      if(typeof DISQUS !== 'undefined'){
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = location.href;
          }
        });
      }
    })
  },
}
</script>
