<template>
  <div class="container-wrapper">
    <div class="container">
      <div class="side-wrapper">
        <ul>
          <li v-for="(item, index) in Slider" :key="index" :class="{'active': activeName === item.name }"
          @click="SliderClick(index, item.name)">
            <a href="javascript:;">{{item.title}}</a>
          </li>
        </ul>
      </div>
      <div class="main-wrapper">
        <div class="main-header">
          <div class="load-data" style="margin-right: 35px" @click="loadData">加载数据</div>
          <div class="login-out" @click="LoginOut">退出登录</div>
        </div>
        <div class="path">
          <ul>
            <li v-for="(item, index) in path" :key="index">
              <a href="javascript:;" @click="pathTo(item, index)">{{item}}</a>
              <span>/</span>
            </li>
          </ul>
        </div>
        <div class="content" :class="{'bgColor': !homeRouter}">
          <div class="card-wrapper" v-if="homeRouter">
            <div class="card-title">
              <h1>Administrator</h1>
            </div>
            <div class="card-content">
              <div class="avatar">
                <img src="../../static/img/avatar.jpg">
              </div>
              <div class="card-text">
                <p>欢迎登陆</p>
                <p>{{userName}}</p>
              </div>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </div>
      <transition name="fade">
        <del-window v-if="delShow" @cancel="delShow = false" @comfirmHandelClick="confirmlBtn"
                    title="加载数据" tip-text="加载数据，将重置抽奖数据！" confirm-text="确定"></del-window>
      </transition>
    </div>
  </div>
</template>

<script>
import delWindow from './baseCom/delWindow'
export default {
  name: 'home',
  data () {
    return {
      Slider: [
        {name: 'lotterySet', title: '抽奖设置'},
        {name: 'prizeSet', title: '奖品设置'},
        {name: 'personSet', title: '人员设置'},
        {name: 'lotteryList', title: '中奖名单'}
      ],
      ind: '',
      userName: '',
      activeName: '',
      homeRouter: false,
      path: [],
      delShow: false
    }
  },
  mounted () {
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName')
    }
    if (this.$route.name === 'home') {
      this.homeRouter = true
      this.path = ['Home']
    } else {
      if (localStorage.getItem('lotteryActiveName')) {
        this.activeName = localStorage.getItem('lotteryActiveName')
      }
      if (localStorage.getItem('lotteryPath')) {
        this.path = JSON.parse(localStorage.getItem('lotteryPath'))
      }
    }
  },
  watch: {
    '$route' (to) {
      localStorage.setItem('lotteryActiveName', to.name)
      let reg = /(^[a-z])/
      let str = to.name.match(reg)[0]
      let arr = []
      if (to.name === 'home') {
        this.homeRouter = true
        if (localStorage.getItem('lotteryPath')) {
          arr = JSON.parse(localStorage.getItem('lotteryPath'))
          arr.length = 0
          arr.push(to.name.replace(str, str.toUpperCase()))
          localStorage.setItem('lotteryPath', JSON.stringify(arr))
          this.path = JSON.parse(localStorage.getItem('lotteryPath'))
        }
      } else {
        this.homeRouter = false
        if (localStorage.getItem('lotteryPath')) {
          arr = JSON.parse(localStorage.getItem('lotteryPath'))
          arr[1] = to.name.replace(str, str.toUpperCase())
          localStorage.setItem('lotteryPath', JSON.stringify(arr))
          this.path = JSON.parse(localStorage.getItem('lotteryPath'))
        }
      }
      if (localStorage.getItem('lotteryActiveName')) {
        this.activeName = localStorage.getItem('lotteryActiveName')
      }
    }
  },
  methods: {
    SliderClick (index, name) {
      this.$router.push({name: name})
    },
    pathTo (name, ind) {
      if (ind === this.path.length - 1) {
        return true
      }
      let reg = /^[A-Z]/
      let str = name.match(reg)[0]
      this.$router.push({name: name.replace(str, str.toLowerCase())})
    },
    LoginOut () {
      localStorage.removeItem('userName')
      this.$router.push({name: 'login'})
    },
    loadData () {
      this.delShow = true
    },
    confirmlBtn () {
      this.$post('/pyapi/console', {key: 'reloadconfig'})
        .then(response => {
          if (response[1] === 200) {
            alert('加载成功！')
            this.delShow = false
          } else if (response[1] === 403) {
            alert(response[2])
          }
        })
        .catch(err => {
          alert('数据加载出错，请稍后重试！')
          console.log(err)
        })
    }
  },
  components: {
    delWindow
  }
}
</script>

<style scoped>
  .container-wrapper{width: 100%;height: 100%;overflow: hidden;}
  .container-wrapper .container{display: flex;width: 100%;height: 100%}
  .container-wrapper .container .side-wrapper{flex: 200px 0 0;height: 100%;border-right: 1px solid #d7dde4;}
  .container-wrapper .container .side-wrapper li{list-style: none;height: 50px;border-right: 2px solid transparent;}
  .container-wrapper .container .side-wrapper li.active{background: #f0faff;border-right: 2px solid #2d8cf0;}
  .container-wrapper .container .side-wrapper li a{display: block;width: 100%;height: 50px;line-height: 50px;
  box-sizing: border-box;padding: 0 34px;font-size: 14px;color: #515a6e;text-decoration: none;
  transition: color .25s linear;}
  .container-wrapper .container .side-wrapper li.active a{color: #2d8cf0;}
  .container-wrapper .container .side-wrapper li a:hover{color: #2d8cf0;}
  .container-wrapper .container .main-wrapper{flex: 1 0 0;background: #f5f7f9;}
  .container-wrapper .container .main-wrapper .main-header{width: 100%;height: 50px;display: flex;line-height: 50px;
  box-sizing: border-box;padding: 0 10px;box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 2px;justify-content: center;background: #fff;}
  .container-wrapper .container .main-wrapper .main-header > div{font-size: 14px;color: #515a6e;cursor: pointer;}
  .container-wrapper .container .main-wrapper .main-header > div:hover{color: #2d8cf0;}
  .container-wrapper .container .main-wrapper .main-header .login-out{position: absolute;right: 10px;}
  .container-wrapper .container .main-wrapper .path{width: 100%;margin: 16px;height: 22px;line-height: 22px;}
  .container-wrapper .container .main-wrapper .path li{list-style: none;float: left;}
  .container-wrapper .container .main-wrapper .path li a{color: #515a6e;text-decoration: none;transition: color .25s;}
  .container-wrapper .container .main-wrapper .path li a:hover{color: #2d8cf0}
  .container-wrapper .container .main-wrapper .path li:last-child a{color: #515a6e;font-weight: 700;}
  .container-wrapper .container .main-wrapper .path li:last-child a:hover{color: #515a6e}
  .container-wrapper .container .main-wrapper .path li:last-child span{display: none;}
  .container-wrapper .container .main-wrapper .path li span{margin: 0 8px;color: #dcdee2;}
  .container-wrapper .container .main-wrapper .content{margin: 16px;height: calc(100% - 100px);padding: 10px;}
  .container-wrapper .container .main-wrapper .content.bgColor{background: #fff;}
  .container-wrapper .container .main-wrapper .content .card-wrapper{width: 400px;height: 230px;padding: 16px;border-radius: 4px;
  background: #fff;box-sizing: border-box;border: 1px solid transparent;}
  .container-wrapper .container .main-wrapper .content .card-wrapper:hover{box-shadow: 0 1px 6px rgba(0,0,0,.2);border-color: #eee;}
  .container-wrapper .container .main-wrapper .content .card-wrapper .card-title{border-bottom: 1px solid #e8eaec}
  .container-wrapper .container .main-wrapper .content .card-wrapper .card-title h1{font-size: 16px;font-weight: 700;padding-bottom: 10px;}
  .container-wrapper .container .main-wrapper .content .card-wrapper .card-content{display: flex;height: 200px;justify-content: center;align-items: center}
  .container-wrapper .container .main-wrapper .content .card-wrapper .card-content .avatar img{width: 100px;height: 100px;border-radius: 50%;}
  .container-wrapper .container .main-wrapper .content .card-wrapper .card-content .card-text{color: #515a6e;margin-left: 15px;}
  .fade-enter-active, .fade-leave-active{transition: opacity .5s;opacity: 1}
  .fade-enter, .fade-leave-to{opacity: 0;}
</style>
