import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullhorn, faComments, faHeart, faHome, faMicrophone, faUser, faUserSecret, faRetweet,  } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome, faTwitterSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



library.add(faUserSecret, 
  faHome, 
  faComments,
  faUser, 
  faBullhorn, 
  faMicrophone,
  faHeart,
  faFontAwesome,
  faTwitterSquare,
  faTwitter,
  faRetweet
  )



createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .use(Chartkick.use(Chart))
  .mount("#app");
