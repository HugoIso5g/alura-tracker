import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import routes from './routes';
import { store, key } from './store/index';

createApp(App)
        .use(routes)
        .use(store,key)
        .mount('#app')
