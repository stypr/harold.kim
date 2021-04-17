<template>
  <div class="notfound padded">
    <NotFoundMarkdown />
  </div>
</template>

<script>
  import NotFoundMarkdown from '/src/components/NotFound.md'
  export default {
    name: 'NotFound',
    components: {
        NotFoundMarkdown,
    }
  }
</script>
