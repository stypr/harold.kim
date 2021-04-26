import Layout from './Layout.vue'
import Dyn from '/Dyn.vue'
import './styles.css'
import './codes.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // app.use(store);
    app.component('Dyn', Dyn);
  }
}