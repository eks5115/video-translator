import Vue from 'vue';
import Content from '../content.vue';

const div =document.createElement('div');
div.setAttribute('id', 'vt-content');
document.getElementsByTagName('body').item(0).appendChild(div);

let vue = new Vue({
  el: '#vt-content',
  render: h => h(Content)
});
