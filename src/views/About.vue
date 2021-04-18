<template>
  <div class="about padded">
    <AboutMarkdown />
  </div>
</template>
<script>
import AboutMarkdown from "/src/components/About.md";

export default {
  setup() {
    return {};
  },
  components: {
    AboutMarkdown,
  },
};
</script>