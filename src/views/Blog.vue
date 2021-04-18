<template>
  <div class="blog padded">
    <h1>&#128218; Posts</h1>
    <ul id="list-post">
      <span v-if="!(posts.length && !posts_error)"> Loading... </span>
      <li v-for="post in sortedPosts" :key="post.dates">
        <b>{{ post.created_at }}</b>
        &nbsp;<span class="category">{{ post.category }}</span>
        &nbsp;<span v-for="tag in post.tag" class="tag">{{ tag }}</span><br />
        <router-link :to="post.path.substring(0)">{{ post.title }}</router-link
        ><br /><br />
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
  </div>
</template>
<script type="module">
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
    document.title = 'harold.kim » Blog';
    this.getPosts();
    this.getGists();
  },
  methods: {
    getPosts() {
      this.axios.get("/blog.json").then((response) => {
        this.posts = response.data;
      });
    },
    updateGists(response) {
      for (var i in response.data) {
        // retrieve languages
        let _lang = new Set();
        Object.keys(response.data[i].files).forEach((key) => {
          _lang.add(response.data[i].files[key].language);
        });

        this.gists.push({
          created_at: new Date(response.data[i].created_at)
            .toISOString()
            .substr(0, 10),
          description: response.data[i].description,
          url: response.data[i].html_url,
          language: Array.from(_lang),
        });
      }
      this.$store.gists = this.gists;
      this.gists_error = false;
    },
    getGists() {
      if (this.$store.gists) {
        // console.log("[*] Load from cache");
        this.gists = this.$store.gists;
      } else {
        this.axios
          .get("https://api.github.com/users/stypr/gists.json")
          .then((response) => {
            this.updateGists(response);
          })
          .catch((error) => {
            //console.log("[*] Using fallback for gists");
            this.axios
              .get("/gists.json")
              .then((response) => {
                // this.a.a = 1;
                this.updateGists(response);
              })
              .catch((error) => {
                this.gists_error = true;
              });
          });
      }
    },
  },
  computed: {
    sortedPosts: function () {
      this.posts.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return this.posts;
    },
  },
  components: {},
};
</script>
