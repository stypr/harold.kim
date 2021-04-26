<template>
  <NavBar />
  <Container />
  <div class="menu-bottom">
    <a href="//github.com/stypr/harold.kim">Made with &hearts;</a><br />
    <small>{{ GIT_HASH }}</small>
  </div>
  <ClientOnly>
    <Dyn component="Background" />
  </ClientOnly>
</template>
<script setup lang="ts">
import { useSiteData } from 'vitepress'
import Container from './Container.vue';
import NavBar from './NavBar.vue';

const GIT_HASH = useSiteData().value.customData.commit
console.log("--- Designed by stypr (https://harold.kim/) ---");
</script>