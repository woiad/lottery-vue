<template>
  <div class="select-contaner">
    <div class="select-wrapper" @click="packUp">
      <span>{{selectText}}</span>
      <span class="arrow" :class="{'arrow-up': drapShow}"></span>
      <div class="draw" v-if="drapShow">
        <ul>
          <li v-for="(item, index) in selectData" :key="index" @click="chose(item)" :class="{'active': item === selectText}">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'k-select',
  props: {
    selectData: {
      type: Array,
      default: () => {
        return []
      }
    },
    selected: {
      default: 0
    },
    selectTip: {
      type: String,
      default: '请选择等级'
    }
  },
  data () {
    return {
      selectText: this.selected || this.selectTip,
      drapShow: false
    }
  },
  methods: {
    packUp () {
      this.drapShow = !this.drapShow
    },
    chose (item) {
      this.selectText = item
      this.$emit('changeSelect', this.selectText)
    }
  }
}
</script>

<style scoped>
  .select-contaner{display: inline-block;vertical-align: middle;}
  .select-wrapper{position: relative;width: 200px;height: 32px;border: 1px solid #dcdee2;
  border-radius: 4px;padding: 0 8px;line-height: 32px;cursor: pointer}
  .select-wrapper:hover{border-color: #57a3f3;box-shadow: 0 0 0 2px rgba(45,140,240,.2);}
  .select-wrapper span{font-size: 14px;}
  .select-wrapper .arrow{width: 14px;height: 14px;position: absolute;top: 50%;margin-top: -7px;right: 10px;background-image: url('../../../static/img/arrow3.png');
  transition: all .25s linear;}
  .select-wrapper .arrow.arrow-up{transform: rotate(180deg);}
  .select-wrapper .draw{position: absolute;width: 100%;top: 32px;left: 0;box-shadow: 0 1px 6px rgba(0,0,0,.2);z-index: 20;background: #fff;}
  .select-wrapper .draw li{list-style: none;width: 100%;padding: 4px 16px 0;background: #fff;font-size: 14px;
  line-height: 20px;border-radius: 4px;box-sizing: border-box;color: #515a6e;}
  .select-wrapper .draw li.active{background: #f3f3f3;color: #2d8cf0;}
  .select-wrapper .draw li:hover{background: #f3f3f3;}
</style>
