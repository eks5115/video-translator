<template>
  <div id="vt-subtitle">
    <span id="finalValue" class="final">{{ finalValue }}</span>
    <span id="interimValue" class="interim">{{ interimValue }}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        finalValue: '',
        interimValue: '',
        msg: 'Welcome to subtitle'
      }
    }
  }
</script>

<style lang="scss">
  #vt-subtitle {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: fixed;
    top: 100px;
    right: 100px;
    background-color: black;
    color: white;
    opacity: 0.88;
    font-size: 16px;
  }
  .final {
    color: white;
    padding-right: 3px;
  }
  .interim {
    color: gray;
  }
</style>
