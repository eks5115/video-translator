import Vue from 'vue';
import App from '../main.vue';
import { Container, Header, Main, Footer, Row, Button, Switch, Cascader, Radio, Message} from 'element-ui';

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Row.name, Row);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.component(Cascader.name, Cascader);
Vue.component(Radio.name, Radio);
Vue.component(Message.name, Message);

Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  render: h => h(App)
});
