<template>
  <div class="container hidden" :class="{ 'display': !isRoot }" :key="exec">
    <div class="padded">
      <Content />
    </div>
  </div>
</template>
<script>
import { useRoute } from "vitepress";

export default {
  data() {
    return {
      exec: false,
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
  mounted(){
    this.exec = true
  }
};
</script>
