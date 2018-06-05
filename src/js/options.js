import Vue from 'vue'
import App from '../App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//   console.log('1234');
// });

chrome.tabs.query({active: true}, function (tab) {
  console.log(tab[0]);
  chrome.tabs.sendMessage(tab[0].id, {action: 'GET_DIMENSION'});
});
