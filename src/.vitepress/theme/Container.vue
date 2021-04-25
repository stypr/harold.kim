<template>
  <div class="container hidden" :class="{ 'display': !isRoot }" :key="exec">
    <div class="padded">
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
      exec: false,
      post_view: false,
    }
  },
  computed: {
    isRoot() {
      let route = useRoute();
      if (route.path) {
        return route.path === "/";
      } else {
        return true;
      }
    },
  },
  methods: {
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
  mounted(){
    this.exec = true
  },
  updated(){
    let route = useRoute();
    if(route.path.startsWith("/blog/") && route.path !== '/blog/'){
      this.post_view = true;
      this.loadDisqus();
    }else{
      this.post_view = false;
    }
  }
};
</script>
