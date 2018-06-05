<template>
  <div id="vt-content">
    <subtitle ref="subtitle"></subtitle>
  </div>
</template>

<script>

  import Subtitle from './components/subtitle.vue';

  export default {
    components: {
      Subtitle
    },
    data () {
      return {
        recognition: {},
        final_transcript: ''
      }
    },
    created: function () {
      let that = this;

      //Wait for some one connect to it
      chrome.runtime.onConnect.addListener(function(port) {
        if(port.name === 'vt') {
          //This is how you add listener to a port.
          port.onMessage.addListener(function(message) {
            try {
              if(message.action === 'START') {
                that.recognition.stop();
                setTimeout(function () {
                  that.recognition.start();
                }, 800);
              } else if(message.action === 'STOP') {
                that.recognition.stop();
              } else if(message.action === 'DIALECT') {
                that.recognition.stop();
                setTimeout(800, function () {
                  that.recognition.lang = message.payload.lang;
                  that.recognition.start();
                });
              }
            } catch (e) {

            }
          });
        }
      });


      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = function () {
        console.log('start');
        chrome.storage.sync.set({isEnabled: true}, function() {

        });
      };

      this.recognition.onend = function () {
        console.log('end');
        chrome.storage.sync.set({isEnabled: false}, function() {

        });
      };

      this.recognition.onerror = function(event) {
        console.log(event);
        if (event.error == 'no-speech') {

        }
        if (event.error == 'audio-capture') {

        }
        if (event.error == 'not-allowed') {

        }
      };

      this.recognition.onresult = function(event) {
        let interim_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            that.final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        if (that.final_transcript.trim().length > 0) {
          that.$refs.subtitle.$data.finalValue = that.final_transcript;
          that.$refs.subtitle.$data.interimValue = '';
        }

        if (interim_transcript.trim().length > 0) {
          that.$refs.subtitle.$data.interimValue = interim_transcript;
        }
      };

      chrome.storage.sync.get(['isEnabled', 'dialect', 'activeTabId'], function (result) {

        if (result) {

          if (result.dialect) {
            that.recognition.lang = result.dialect[1];
          } else {
            that.recognition.lang = 'en-US';
          }

        }

      });
    },
    methods: {
      changeMsg(value) {
        this.msg = value;
      }
    }
  }
</script>

<style lang="scss">
#vt-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: absolute;
  top: 0;
  z-index: 100;
  background-color: black;
}
</style>
