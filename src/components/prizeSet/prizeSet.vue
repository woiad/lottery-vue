<template>
  <div class="prize-container">
    <div class="add">
      <button class="but primary" @click="addClick">添加</button>
    </div>
    <div class="table">
      <table>
        <thead>
        <th>奖品名称</th>
        <th>奖品数量</th>
        <th>抽奖等级</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in prizeData" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.num}}</td>
          <td>{{item.level}}</td>
          <td>
            <button class="but but-set" @click="prizeModify(item.id, 'modifier')">修改</button>
            <button class="but but-del" @click="prizeDel(item.id)">删除</button>
          </td>
        </tr>
        <tr v-if="prizeData.length === 0" style="height: 40px;font-size: 14px;font-weight: 700;">
          <th colspan="4">暂无数据</th>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pop">
      <transition name="fade">
        <div class="add-pop" v-if="addShow">
          <pop-window :title="title" @cancel="cancel" @ok="submitPrize">
            <div class="list" slot="content">
              <div class="item">
                <label>奖品名称：</label>
                <input v-model="addPrize.name">
              </div>
              <div class="item">
                <label>奖品数量：</label>
                <input v-model="addPrize.num">
              </div>
              <div class="item">
                <label>奖品等级：</label>
                <k-select :select-data="level" @changeSelect="changeSelect" :selected="addPrize.level"></k-select>
              </div>
            </div>
          </pop-window>
        </div>
      </transition>
      <transition name="fade">
        <del-window v-if="delShow" @cancel="delShow = false" @comfirmHandelClick="delBtn"></del-window>
      </transition>
    </div>
  </div>
</template>

<script>
import popWindow from '../baseCom/pupUpWindows'
import kSelect from '../baseCom/k-select'
import delWindow from '../baseCom/delWindow'
import md5 from 'js-md5'
export default {
  name: 'prizeSet',
  data () {
    return {
      prizeData: [],
      title: '添加奖品',
      addPrize: {
        name: '',
        level: 0,
        num: ''
      },
      popType: '',
      level: [1, 2, 3, 4, 5, 6],
      addShow: false,
      oldMd5: '',
      id: '',
      delShow: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$post('/pyapi/console', {key: 'prize_show'})
        .then(response => {
          this.prizeData = response
        })
        .catch(err => {
          console.log(err)
        })
    },
    addClick () {
      this.addShow = true
      this.title = '添加奖品'
      this.popType = 'add'
    },
    cancel () {
      this.addShow = false
      this.addPrize.name = ''
      this.addPrize.num = ''
      this.addPrize.level = 0
    },
    changeSelect (num) {
      this.addPrize.level = num
    },
    submitPrize () {
      if (this.addPrize.name === '' || this.addPrize.level === '' || this.addPrize.num === '') {
        alert('请填写完整，在提交！')
        return true
      }
      if (this.popType !== 'add') {
        let newMd5 = md5(JSON.stringify(this.addPrize))
        if (newMd5 === this.oldMd5) {
          alert('请修改数据后，在提交！')
        } else {
          this.$post('/pyapi/console', {key: 'prize_update', id: this.id, content: JSON.stringify(this.addPrize)})
            .then(response => {
              if (response[1] === 200) {
                alert('修改成功！')
                this.cancel()
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
              alert('修改出错，请稍后重试！')
            })
        }
      } else {
        this.$post('/pyapi/console', {key: 'prize_add', content: JSON.stringify(this.addPrize)})
          .then(response => {
            if (response[1] === 200) {
              alert('添加成功！')
              this.init()
              this.cancel()
            } else {
              alert(response[0] + ':' + response[2])
            }
          })
          .catch(err => {
            alert('添加出错，请稍后重试！')
            console.log(err)
          })
      }
    },
    prizeModify (id, type) {
      this.popType = type
      this.title = '修改奖品'
      for (let i in this.prizeData) {
        if (this.prizeData[i].id === id) {
          this.id = id
          this.addShow = true
          this.addPrize.name = this.prizeData[i].name
          this.addPrize.num = this.prizeData[i].num
          this.addPrize.level = this.prizeData[i].level
          this.oldMd5 = md5(JSON.stringify(this.addPrize))
        }
      }
    },
    prizeDel (id) {
      this.delShow = true
      this.id = id
    },
    delBtn () {
      this.$post('/pyapi/console', {key: 'prize_del', id: this.id})
        .then(response => {
          if (response[1] === 200) {
            alert('删除成功！')
            this.delShow = false
            this.init()
          }
        })
        .catch(err => {
          alert('删除出错，请稍后重试！')
          console.log(err)
        })
    }
  },
  components: {
    popWindow,
    kSelect,
    delWindow
  }
}
</script>

<style scoped>
  .prize-container .but{width: 60px;height: 25px;line-height: 25px;outline: none;border: none;
    border-radius: 4px;color: #fff;background: #2d8cf0;cursor: pointer;}
  .prize-container .primary{width: 80px;}
  .prize-container table{width: 100%;border-spacing: 0;border: 1px solid #dcdee2;margin: 15px 0;}
  .prize-container table thead th{height: 40px;line-height: 40px;background: #f8f8f9;
    text-align: left;font-weight: 700;font-size: 14px;color: #515a6e;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;border-right: 1px solid #e8eaec;}
  .prize-container table thead th:last-child{width: 200px;border-right: none;}
  .prize-container table tbody tr td:last-child{border-right: none;}
  .prize-container table tbody tr:last-child td{border-bottom: none;}
  .prize-container table tbody td{height: 35px;line-height: 35px;background: #fff;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;font-size: 14px;
    border-right: 1px solid #e8eaec}
  .prize-container table tbody .but-del{margin-left: 15px;background-color: #ed4014;}
  .prize-container .but:hover{opacity: .9;}
  .prize-container .list{padding: 14px 16px;}
  .prize-container .item{height: 30px;line-height: 30px;margin-bottom: 10px;}
  .prize-container label{display: inline-block;margin-right: 15px;font-size: 14px;vertical-align: middle;}
  .prize-container input{display: inline-block;height: 20px;width: 200px;outline: none;border-bottom: 1px solid #dcdee2;border-top: none;border-left: none;border-right: none;}
  .prize-container .switch{display: inline-block;vertical-align: middle;}
  .prize-container select{width: 100px;height: 30px;line-height: 30px;background: #fff;border: 1px solid #dcdee2;border-radius: 4px;outline: none;}
  .prize-container select:hover{border-color: #57a3f3;}
  .prize-container select option{background: #fff;}
  .fade-enter-active, .fade-leave-active{transition: opacity .5s;}
  .fade-enter, .fade-leave-to{opacity: 0}
</style>
