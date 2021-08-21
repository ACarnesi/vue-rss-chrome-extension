import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import devtools from '@vue/devtools'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faRss, faCogs, faBackward, faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faRss, faCogs, faBackward, faEllipsisV, faPlusCircle);

if (process.env.NODE_ENV === 'development') {
    devtools.connect(/* host, port */)
}

createApp(App)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');