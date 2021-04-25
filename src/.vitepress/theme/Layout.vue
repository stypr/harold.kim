<template>
  <div class="menu-left" :key="loaded">
    <div id="nav">
      <a
        v-bind:class="{'router-link-exact-active': menu.link == route.path || (menu.link == '/blog/' && route.path.match(/^\/blog/)) }"
        v-bind:href="menu.link"
        v-for="menu in $site.themeConfig.nav"
        v-bind:key="menu"
      >
        {{ menu.text }}<br />
      </a>
    </div>
  </div>

  <div
    class="container"
    v-bind:class="{'hidden': isRoot}"
  >
    <div class="padded">
      <Content />
    </div>
  </div>

  <div
    class="menu-bottom"
    style="letter-spacing: 0.1em; text-transform: none; text-align: center"
  >
    <a href="//github.com/stypr/harold.kim">Made with &hearts;</a><br />
    <small>{{ GIT_HASH }}</small>
  </div>

  <ClientOnly>
    <Dyn component="Background" />
  </ClientOnly>

</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useSiteData, useRoute } from 'vitepress'
const route = useRoute()
const GIT_HASH = useSiteData().value.customData.commit

const isRoot = computed(() => {
  if(route.path){
    return route.path === "/";
  }else{
    return true;
  }
})

// onUpdate
watch(route, () => {
  console.log(route.path);
})

console.log("--- Designed by stypr (https://harold.kim/) ---");
</script>