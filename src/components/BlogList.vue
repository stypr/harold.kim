<template>
  <h1>&#128218; Posts</h1>
  <ul id="list-post">
    <span v-if="!(posts.length && !posts_error)"> Loading... </span>
    <li v-for="post in sortedPosts" :key="post.dates">
      <b>{{ post.created_at }}</b>
      &nbsp;<span class="category">{{ post.category }}</span><br />
      <a :href="post.filename">{{ post.title }}</a><br /><br />
    </li>
  </ul>
  <h1>&#128210; Gists</h1>
  <ul id="list-gist">
    <span v-if="gists_error">
      Ouch! We couldn't load the gists. How about checking stypr's
      <a href="//github.com/stypr">gists</a> instead?
    </span>
    <span v-if="!(gists.length && !gists_error)"> Loading... </span>
    <li v-for="gist in gists" :key="gist.created_at">
      <b>{{ gist.created_at }}</b>
      &nbsp;<span v-for="language in gist.language" class="tag">{{ language }}</span
      ><br />
      <a :href="gist.url">{{ gist.description }}</a
      ><br /><br />
    </li>
  </ul>
</template>

<script type="module">
import { useSiteData } from 'vitepress'

export default {
  setup() {
    return {};
  },
  data() {
    return {
      posts: [],
      gists: [],
      posts_error: false,
      gists_error: false,
    };
  },
  mounted() {
    this.getPosts();
    this.getGists();
  },
  methods: {
    getPosts() {
      this.posts = useSiteData().value.customData.posts;
    },
    updateGists(response) {
      for (var i in response) {
        // retrieve languages
        let _lang = new Set();
        Object.keys(response[i].files).forEach((key) => {
          let _tmp = response[i].files[key].language;
          if(_tmp){
            _lang.add(response[i].files[key].language);
          }
        });
        this.gists.push({
          created_at: new Date(response[i].created_at)
            .toISOString()
            .substr(0, 10),
          description: response[i].description,
          url: response[i].html_url,
          language: Array.from(_lang),
        });
      }
      this.gists_error = false;
    },
    getGists() {
      try {
        let response = useSiteData().value.customData.gists;
        this.updateGists(response);
      }catch(error){
        // console.log(error);
        this.gists_error = true;
      };
    },
  },
  computed: {
    sortedPosts: function () {
      this.posts.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return this.posts;
    },
  }
};
</script>
