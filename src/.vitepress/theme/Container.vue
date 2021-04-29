<template>
  <div class="container hidden" :class="{ 'display': !isRoot }">
    <div class="padded" ref="container">
      <a href="/blog/" class="back" v-if="post_view">&laquo; Article List</a>
      <Content />
      <div id="disqus_thread" :class="{ 'hidden': !post_view }"></div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vitepress";

export default {
  data() {
    return {
      post_view: false,
    }
  },
  computed: {
    isRoot() {
      let route = useRoute();
      if (route.path) {
        return route.path === "/" || route.path === "/index.html";
      } else {
        return false;
      }
    },
  },
  methods: {
    jumpContainer() {
      this.$nextTick(() => {
        this.$refs.container.scrollIntoView({ behavior: 'smooth' });
      });
    },
    loadDisqus() {
      // Disqus
      if(typeof DISQUS !== 'undefined'){
        // Reset DISQUS since it is already loaded.
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = location.href;
          }
        });
      }else{
        // Dynamically load DISQUS on BlogPost
        var d = document, s = d.createElement('script');
            s.src = 'https://haroldie.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
      }
    }
  },
  updated(){
    this.jumpContainer();
    let route = useRoute();
    if(route.path){
      if(route.path.startsWith("/blog/") && route.path !== '/blog/' && route.path !== '/blog/index.html'){
        this.post_view = true;
        this.loadDisqus();
      }else{
        this.post_view = false;
      }
    }else{
      this.post_view = false;
    }
  },
  mounted(){
    this.jumpContainer();
    let route = useRoute();
    if(route.path){
      if(route.path.startsWith("/blog/") && route.path !== '/blog/' && route.path !== '/blog/index.html'){
        this.post_view = true;
        this.loadDisqus();
      }else{
        this.post_view = false;
      }
    }else{
      this.post_view = false;
    }
  }
};
</script>
