<template>
    <div class="donate padded">
        <DonateMarkdown />
    </div>
</template>
<script>
import DonateMarkdown from '/src/components/Donate.md'

export default {
  setup() {
    return {
    };
  },
  components: {
      DonateMarkdown,
  }
}
</script>