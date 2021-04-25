<template>
  <AsyncComponent></AsyncComponent>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  props: ['component'],
  setup(props) {
    const AsyncComponent = defineAsyncComponent(() => import(`./components/${props.component}.vue`));
    // const AsyncComponent = defineAsyncComponent(() => import(`./components/${props.component}.vue`));
    return { AsyncComponent };
  }
}
</script>
