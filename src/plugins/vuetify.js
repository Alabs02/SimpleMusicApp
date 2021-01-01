import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi' || 'fa',
  },

  theme: {
    themes: {
      light: {
        primary: '#2f356d',
        secondary: '#707cef',
        accent: '#f7f5f6',
        white: '#ffffff',
        black: '#212121',
        btnColor: '#f65e3c',
      }
    }
  },
});

export default vuetify