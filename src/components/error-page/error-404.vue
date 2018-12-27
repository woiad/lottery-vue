<template>
  <div class="error-wrapper">
    <div class="error-404">
      <div class="title-404">
        <p>404</p>
      </div>
      <div class="text">
        <p>YOU  LOOK  LOST</p>
      </div>
      <div class="jump">
        <a class="to-index" @click="goHome">返回首页</a>
        <a class="to-back" @click="goBack">返回上一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-404',
  methods: {
    goHome () {
      this.$router.push({name: 'home'})
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .error-wrapper{display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;}
  .error-wrapper .error-404{padding: 16px;border: 1px solid #e9eaec;border-radius: 4px;transition: all .25s linear}
  .error-wrapper .error-404:hover{box-shadow: 0 1px 6px rgba(0,0,0,.2);border-color: #eee;}
  .error-wrapper .error-404 .title-404{margin-top: 40px;font-size: 240px;font-weight: 700;text-align: center;
  height: 260px;line-height: 260px;color: #2d8cf0;}
  .error-wrapper .error-404 .text{letter-spacing: 12px;text-align: center;font-weight: 500;color: #dcdee2;font-size: 30px}
  .error-wrapper .error-404 .jump{padding: 20px 0; margin-bottom: 20px;text-align: center;}
  .error-wrapper .error-404 .jump a{display: inline-block;width: 200px;height: 36px;vertical-align: center;line-height: 36px;
  transition: all .25s linear;cursor: pointer;font-size: 14px;}
  .error-wrapper .error-404 .jump a.to-index{color: #495060;}
  .error-wrapper .error-404 .jump a.to-index:hover{color: #57a3f3;}
  .error-wrapper .error-404 .jump a.to-back{background: #57a3f3;color: #fff;}
  .error-wrapper .error-404 .jump a.to-back:hover{opacity: .8;}
</style>
