<template>
  <div class="del-windows">
    <div class="del-wrapper">
      <div class="del-content">
        <div class="del-header">
          <div class="icon">
            <img src="../../../static/img/error.png">
          </div>
          <div class="text">{{title}}</div>
        </div>
        <div class="close" @click="cancel">x</div>
        <p>{{tipText}}</p>
        <div class="footer">
          <button class="del-but" @click="confirmlBtn">{{confirmText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'delWindow',
  props: {
    title: {
      type: String,
      default: '删除确认'
    },
    tipText: {
      type: String,
      default: '该数据一经删除，无法恢复'
    },
    confirmText: {
      type: String,
      default: '删除'
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirmlBtn () {
      this.$emit('comfirmHandelClick')
    }
  }
}
</script>

<style scoped>
  .del-wrapper{position: fixed;left: 0;right: 0;bottom: 0;top: 0;background: rgba(0, 0, 0, .5);}
  .del-wrapper .del-content{position: relative;width: 360px;top: 50%;margin-top: -75px;left: 50%;margin-left: -180px;height: 150px;border-radius: 6px;background: #fff;}
  .del-wrapper .del-content .del-header{display: flex;padding: 14px 16px;border-bottom: 1px solid #e9eaec;color: rgb(255, 102, 0);justify-content: center;}
  .del-wrapper .del-content .icon{width: 22px;height: 22px;margin-right: 5px;}
  .del-wrapper .del-content .icon img{max-width: 100%;}
  .del-wrapper .del-content .close{width: 11px;height: 30px;position: absolute;right: 16px;top: 14px;color: rgb(198, 198, 198);font-size: 16px;cursor: pointer;}
  .del-wrapper .del-content p{padding: 16px;text-align: center;font-size: 14px;}
  .del-wrapper .del-content .footer{border-top: 1px solid #e9eaec;margin-top: 0;text-align: center;}
  .del-wrapper .del-content .footer .del-but{width: 80%;margin-top: 5px;height: 36px;text-align: center;color: #fff;
    background: #ed3f14;border-radius: 6px;outline: none;cursor: pointer;border: none;}
</style>
