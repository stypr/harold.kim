<template>
  <div class="contact padded">
    <ContactMarkdown />
  </div>
</template>
<script>
import ContactMarkdown from "/src/components/Contact.md";

export default {
  setup() {
    return {};
  },
  components: {
    ContactMarkdown,
  },
};
</script>
