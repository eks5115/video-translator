<template>
  <div id="app">
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-row>
          <el-switch
            v-model="isEnabled"
            active-text="Enable VT"
            inactive-text="Disable VT"
            @change="handleEnableChange"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <hr />
        </el-row>
        <el-row>
          <span>language: </span>
          <el-cascader
            :options="languageOptions"
            v-model="dialectValue"
            @change="handleDialectChange"
            placeholder="please select">
          </el-cascader>
          <hr />
        </el-row>
        <el-row>
          <span>mode: </span>
          <el-radio v-model="speechMode" label="continue" @change="handleSpeechModeChange">continue</el-radio>
          <el-radio v-model="speechMode" label="break" @change="handleSpeechModeChange">break</el-radio>
          <hr />
        </el-row>

      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
  import ElMain from "../node_modules/element-ui/packages/main/src/main";
  import ElHeader from "../node_modules/element-ui/packages/header/src/main";
  import ElFooter from "../node_modules/element-ui/packages/footer/src/main";
  import ElRadio from "../node_modules/element-ui/packages/radio/src/radio";
  import ElButton from "../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElButton,
      ElRadio,
      ElFooter,
      ElHeader,
      ElMain},
    name: 'app',

    data () {
      return {
        msg: 'Welcome to Your Vue.js Appj',
        contentPort: {},
        speechMode: 'continue',
        isEnabled: true,
        languageOptions: [],
        dialectOptions: [],
        dialectValue: ['English', 'en-US'],
        languages:
          [['Afrikaans',       ['af-ZA']],
            ['Bahasa Indonesia',['id-ID']],
            ['Bahasa Melayu',   ['ms-MY']],
            ['Català',          ['ca-ES']],
            ['Čeština',         ['cs-CZ']],
            ['Deutsch',         ['de-DE']],
            ['English',         ['en-AU', 'Australia'],
              ['en-CA', 'Canada'],
              ['en-IN', 'India'],
              ['en-NZ', 'New Zealand'],
              ['en-ZA', 'South Africa'],
              ['en-GB', 'United Kingdom'],
              ['en-US', 'United States']],
            ['Español',         ['es-AR', 'Argentina'],
              ['es-BO', 'Bolivia'],
              ['es-CL', 'Chile'],
              ['es-CO', 'Colombia'],
              ['es-CR', 'Costa Rica'],
              ['es-EC', 'Ecuador'],
              ['es-SV', 'El Salvador'],
              ['es-ES', 'España'],
              ['es-US', 'Estados Unidos'],
              ['es-GT', 'Guatemala'],
              ['es-HN', 'Honduras'],
              ['es-MX', 'México'],
              ['es-NI', 'Nicaragua'],
              ['es-PA', 'Panamá'],
              ['es-PY', 'Paraguay'],
              ['es-PE', 'Perú'],
              ['es-PR', 'Puerto Rico'],
              ['es-DO', 'República Dominicana'],
              ['es-UY', 'Uruguay'],
              ['es-VE', 'Venezuela']],
            ['Euskara',         ['eu-ES']],
            ['Français',        ['fr-FR']],
            ['Galego',          ['gl-ES']],
            ['Hrvatski',        ['hr_HR']],
            ['IsiZulu',         ['zu-ZA']],
            ['Íslenska',        ['is-IS']],
            ['Italiano',        ['it-IT', 'Italia'],
              ['it-CH', 'Svizzera']],
            ['Magyar',          ['hu-HU']],
            ['Nederlands',      ['nl-NL']],
            ['Norsk bokmål',    ['nb-NO']],
            ['Polski',          ['pl-PL']],
            ['Português',       ['pt-BR', 'Brasil'],
              ['pt-PT', 'Portugal']],
            ['Română',          ['ro-RO']],
            ['Slovenčina',      ['sk-SK']],
            ['Suomi',           ['fi-FI']],
            ['Svenska',         ['sv-SE']],
            ['Türkçe',          ['tr-TR']],
            ['български',       ['bg-BG']],
            ['Pусский',         ['ru-RU']],
            ['Српски',          ['sr-RS']],
            ['한국어',            ['ko-KR']],
            ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
              ['cmn-Hans-HK', '普通话 (香港)'],
              ['cmn-Hant-TW', '中文 (台灣)'],
              ['yue-Hant-HK', '粵語 (香港)']],
            ['日本語',           ['ja-JP']],
            ['Lingua latīna',   ['la']]]

    }
    },
    created: function () {

      let list = [];

      for (let i = 0; i < this.languages.length; i++) {
        this.languageOptions[i] = {
          value: this.languages[i][0],
          label: this.languages[i][0],
          children: []
        };

        list = this.languages[i];

        for (let j = 1; j < list.length; j++) {
          if (!list[j][1]) {
            list[j][1] = list[0];
          }
          this.languageOptions[i].children[j-1] = {value:list[j][0], label:list[j][1]};
        }

      }

      // load properties
      let that = this;
      chrome.storage.sync.get(['isEnabled', 'dialect', 'speechMode'], function (result) {

        if (result) {

          that.isEnabled = result.isEnabled;

          if (result.dialect) {
            that.dialectValue = result.dialect;
          }

          if (result.speechMode) {
            that.speechMode = result.speechMode;
          }

        }

      });
    },
    computed: {
    },
    methods: {
      handleEnableChange(value) {
        let that = this;

        chrome.storage.sync.set({isEnabled: value}, function() {
          that.$message.success('save success!');
        });

        let action = value ? 'START' : 'STOP';

        chrome.tabs.query({active: true, currentWindow: true}, function (tab) {

          let vtPort = chrome.tabs.connect(tab[0].id, {
            name: 'vt'
          });

          vtPort.postMessage({
            action: action, payload: {}
          });
        });
      },
      handleDialectChange(value) {
        let that = this;
        chrome.storage.sync.set({dialect: value}, function() {
          that.$message.success('save success!');
          chrome.tabs.query({active: true}, function (tab) {
            chrome.tabs.sendMessage(tab[0].id, {action: 'DIALECT', payload: {lang:value[1]}});
          });
        });

      },
      handleSpeechModeChange(value) {
        let that = this;
        chrome.storage.sync.set({speechMode: value}, function() {
          that.$message.success('save success!');
        });
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  body {
    width: 400px;
    height: 400px;
  }
</style>
