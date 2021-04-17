<template>
    <div class="donate" style="padding: 30px;">
        <DonateList />
    </div>
</template>
<script>
import DonateList from '/src/components/DonateList.md'

export default {
  setup() {
    return {
      content: '">',
    };
  },
  components: {
      DonateList,
  }
}
</script>
