<template>
  <div class="pop-wrapper">
    <div class="content-wrapper">
      <div class="pop-title">
        <h1>{{title}}</h1>
      </div>
      <slot name="content"></slot>
      <div class="footer">
        <button class="cancel" @click="cancel">{{cancelText}}</button>
        <button class="confirm" @click="ok">{{okText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pupUpWindows',
  props: {
    title: {
      type: String,
      default: '修改抽奖设置'
    },
    width: {
      type: String,
      default: '520px'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '提交'
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    ok () {
      this.$emit('ok')
    }
  }
}
</script>

<style scoped>
  .pop-wrapper{position: fixed;display: flex;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0, 0, 0, .5);
  justify-content: center;align-items: center;z-index: 200}
  .pop-wrapper .content-wrapper{width: 400px;background: #fff;
  border-radius: 6px;box-shadow: 0 4px 12px rgba(0,0,0,.15)}
  .pop-wrapper .content-wrapper .pop-title{padding: 14px 16px;border-bottom: 1px solid #e8eaec;}
  .pop-wrapper .content-wrapper .pop-title h1{font-size: 14px; font-weight: 700;}
  .pop-wrapper .footer{border-top: 1px solid #e8eaec;text-align: right;padding: 12px 18px;}
  .pop-wrapper .footer button{width: 60px;height: 35px;margin-top: 10px;border-radius: 4px;outline: none;line-height: 35px;cursor: pointer;border: none;font-size: 14px;}
  .pop-wrapper .footer button.cancel{background: #fff;color: #515a6e;}
  .pop-wrapper .footer button.cancel:hover{color: #57a3f3;}
  .pop-wrapper .footer button.confirm{background-color: #2d8cf0;color: #fff;margin-right: 10px}
  .pop-wrapper .footer button.confirm:hover{opacity: .9;}
</style>
