<template>
    <div class="donate padded">
        <ServiceMarkdown />
    </div>
</template>
<script>
import ServiceMarkdown from '/src/components/Service.md'

export default {
  setup() {
    return {
    };
  },
  components: {
      ServiceMarkdown,
  }
}
</script>