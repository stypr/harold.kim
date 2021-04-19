<template>
  <div class="donate padded">
    <ProjectMarkdown />
  </div>
</template>
<style>
  @media (max-width: 800px){
    tbody tr {
      margin-bottom: 40px;
      display: block;
    }
    h2 {
      padding-top: 20px;
      padding-bottom: 10px;
    }
    td {
      display: block;
      width: 100%;
      margin: 0;
    }
    td img {
      width:100%;
      height: calc((100vw - 20px) * 0.5625);
    }
    td:nth-child(2) {
      display: none;
    }
    h2 {
      margin: 0;
    }
    br {
      content: "";
      margin: 0em;
      display: block;
      font-size: 24%;
    }
  }
</style>
<script>
import ProjectMarkdown from "/src/components/Project.md";

export default {
  setup() {
    return {};
  },
  components: {
    ProjectMarkdown,
  },
};
</script>