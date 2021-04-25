import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import Dyn from '/Dyn.vue'
import './styles.css'
import './codes.css'

export default {
  Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    // app.use(store);
    app.use(router);
    app.component('Dyn', Dyn);
  }
};
