<template>
  <div class="switch-container" :class="[turn]">
    <input class="switch-checkbox" :id="ID" type="checkbox">
    <label class="switch-label" :for="ID" @click="changSwitch">
      <span class="switch-inner" :data-on="dataOn" :data-off="dataOff"></span>
      <span class="switch-switch"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'k-switch',
  props: {
    ID: {
      type: String,
      default: 'onoffswitch'
    },
    turn: {
      type: String,
      default: 'off'
    },
    dataOn: {
      type: String,
      default: 'ON'
    },
    dataOff: {
      type: String,
      default: 'OFF'
    }
  },
  methods: {
    changSwitch () {
      this.$emit('changeSwitch', this.ID)
    }
  }
}
</script>

<style scoped>
  .switch-container{position: relative;float: left;width: 56px;margin: 0;user-select: none;}
  .switch-container .switch-checkbox{display: none;}
  .switch-container .switch-label{display: block;height: 22px;overflow: hidden;cursor: pointer;border: 1px solid #ccc;
  border-radius: 20px;background-color: #ccc;}
  .switch-container .switch-inner{display: block;width: 200%;margin-left: -56px;transition: margin .3s ease-in 0s}
  .switch-container .switch-inner::before, .switch-container .switch-inner::after{display: block;
  float: right;width: 50%;height: 22px;padding: 0;line-height: 22px;font-size: 12px;color: white;
  font-family: Trebuchet, Arial, sans-serif;font-weight: bold;box-sizing: border-box;}
  .switch-container .switch-inner::after{content: attr(data-on);padding-left: 10px;background-color: #2d8cf0;color: #fff;}
  .switch-container .switch-inner::before{content: attr(data-off);padding-right: 3px;background-color: #ccc;color: #fff;
  text-align: right;}
  .switch-container .switch-switch{position: absolute;display: block;width: 22px;height: 22px;background: #fff;
  top: 1px;bottom: 0;right: 32px;border-radius: 20px;transition: all .3s ease-in 0s}
  .switch-container.on .switch-label .switch-switch{right: 0}
  .switch-container.on .switch-label .switch-inner{margin-left: 0}
  .switch-container.off .switch-label .switch-switch{right: 32px}
  .switch-container.off .switch-label .switch-inner{margin-left: -56px}
</style>
