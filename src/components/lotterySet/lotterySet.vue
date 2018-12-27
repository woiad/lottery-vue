<template>
  <div class="lottery-set-wrapper">
    <div class="table">
      <table>
        <thead>
          <th>奖项ID</th>
          <th>奖项名称</th>
          <th>抽奖数量</th>
          <th>时间值(分钟)</th>
          <th>时间开关</th>
          <th>离职开关</th>
          <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in lotteryData" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.num}}</td>
          <td>{{item.time}}</td>
          <td>{{item.time_status}}</td>
          <td>{{item.quit_status}}</td>
          <td><button class="but-set" @click="setLottery(item.id)">设置</button></td>
        </tr>
        <tr v-if="lotteryData.length === 0" style="height: 40px;font-size: 14px;font-weight: 700;">
          <th colspan="7">暂无数据</th>
        </tr>
        </tbody>
      </table>
    </div>
    <transition name="fade">
      <div class="pop" v-if="modalShow">
        <pop-windows @cancel="cancel" @ok="submitData">
          <div class="pop-content" slot="content">
            <div class="item">
              <label>抽奖人数：</label>
              <input v-model="setData.num">
            </div>
            <div class="item">
              <label>时间开关</label>
              <div class="switch"><k-switch ID="timeonoff" :turn="setData.time_status" @changeSwitch="changeSwitch"></k-switch></div>
            </div>
            <div class="item">
              <label>时间值：</label>
              <select v-model="setData.time">
                <option v-for="(item, index) in timeNum" :key="index" :selected="item === setData.time">{{item}}</option>
              </select>
            </div>
            <div class="item">
              <label>离职开关：</label>
              <div class="switch"><k-switch ID="leaveonoff" :turn="setData.quit_status" @changeSwitch="changeSwitch"></k-switch></div>
            </div>
          </div>
        </pop-windows>
      </div>
    </transition>
  </div>
</template>

<script>
import popWindows from '../baseCom/pupUpWindows'
import kSwitch from '../baseCom/k-switch'
import md5 from 'js-md5'
export default {
  name: 'lotterySet',
  data () {
    return {
      lotteryData: [],
      timeNum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      modalShow: false,
      id: '',
      setData: {
        num: '',
        time_status: '',
        time: '0',
        quit_status: ''
      },
      oldMd5: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$post('/pyapi/console', {key: 'show_level'})
        .then(response => {
          this.lotteryData = response
        })
        .catch(err => {
          console.log(err)
        })
    },
    setLottery (id) {
      this.modalShow = !this.modalShow
      for (let i in this.lotteryData) {
        if (id === this.lotteryData[i].id) {
          this.id = id
          this.setData.num = '' + this.lotteryData[i].num
          this.setData.time_status = this.lotteryData[i].time_status
          this.setData.time = '' + this.lotteryData[i].time
          this.setData.quit_status = this.lotteryData[i].quit_status
          this.oldMd5 = md5(JSON.stringify(this.setData))
        }
      }
    },
    submitData () {
      let changeMd5 = md5(JSON.stringify(this.setData))
      if (changeMd5 === this.oldMd5) {
        alert('奖品设置未修改，请修改后在提交！')
      } else {
        this.$post('/pyapi/console', {key: 'update_level', content: JSON.stringify(this.setData), id: this.id})
          .then(response => {
            alert('修改成功!')
            this.init()
            this.cancel()
          })
          .catch(err => {
            alert('修改有误！')
            console.log(err)
          })
      }
    },
    cancel () {
      this.modalShow = !this.modalShow
    },
    changeSwitch (type) {
      if (type === 'timeonoff') {
        if (this.setData.time_status === 'on') {
          this.setData.time_status = 'off'
        } else {
          this.setData.time_status = 'on'
        }
      } else if (type === 'leaveonoff') {
        if (this.setData.quit_status === 'off') {
          this.setData.quit_status = 'on'
        } else {
          this.setData.quit_status = 'off'
        }
      }
    }
  },
  components: {
    popWindows,
    kSwitch
  }
}
</script>

<style scoped>
  .lottery-set-wrapper{width: 100%;height: 100%;overflow: hidden}
  .lottery-set-wrapper table{width: 100%;border-spacing: 0;border: 1px solid #dcdee2;margin: 15px 0;}
  .lottery-set-wrapper table thead th{height: 40px;line-height: 40px;background: #f8f8f9;
  text-align: left;font-weight: 700;font-size: 14px;color: #515a6e;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;border-right: 1px solid #e8eaec;}
  .lottery-set-wrapper table thead th:last-child{width: 100px;border-right: none;}
  .lottery-set-wrapper table tbody tr td:last-child{border-right: none;}
  .lottery-set-wrapper table tbody tr:last-child td{border-bottom: none;}
  .lottery-set-wrapper table tbody td{height: 35px;line-height: 35px;background: #fff;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;font-size: 14px;
  border-right: 1px solid #e8eaec}
  .lottery-set-wrapper table tbody .but-set{width: 60px;height: 25px;line-height: 25px;outline: none;border: none;
  border-radius: 4px;color: #fff;background: #2d8cf0;cursor: pointer;}
  .pop-content{padding: 16px 14px;}
  .pop-content .item{height: 30px;line-height: 30px;margin-bottom: 10px;}
  .pop-content label{display: inline-block;margin-right: 15px;font-size: 14px;vertical-align: middle;}
  .pop-content input{display: inline-block;height: 20px;width: 200px;outline: none;border-bottom: 1px solid #dcdee2;border-top: none;border-left: none;border-right: none;}
  .pop-content .switch{display: inline-block;vertical-align: middle;}
  .pop-content select{width: 100px;height: 30px;line-height: 30px;background: #fff;border: 1px solid #dcdee2;border-radius: 4px;outline: none;}
  .pop-content select:hover{border-color: #57a3f3;}
  .pop-content select option{background: #fff;}
  .fade-enter-active, .fade-leave-active{transition: opacity .5s;}
  .fade-enter, .fade-leave-to{opacity: 0}
</style>
