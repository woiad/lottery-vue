<template>
  <div class="person-set-wrapper">
    <div class="add">
      <button class="but primary" @click="addClick">添加员工</button>
    </div>
    <div class="search">
      <input placeholder="输入员工姓名搜素" v-model="searchName" v-on:input="inputName"
              @keyup.enter="submitName">
      <div class="search-icon"></div>
      <div class="draw" v-if="personName.length !== 0">
        <ul>
          <li v-for="(item, index) in personName" :key="index" @click="choseName(item.username)">{{item.username}}</li>
        </ul>
      </div>
    </div>
    <div class="table">
      <table>
        <thead>
        <th>员工姓名</th>
        <th>入职时间</th>
        <th>员工部门</th>
        <th>员工工号</th>
        <th>是否离职</th>
        <th>员工图片</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in showPersonData" :key="index">
          <td>{{item.username}}</td>
          <td>{{item.entrytime}}</td>
          <td>{{item.department}}</td>
          <td>{{item.jobnumber}}</td>
          <td>{{item.leavejob === 1 ? '否' : '是'}}</td>
          <td><img :src= " 'http://113.105.246.230:5110/' + item.picdir" style="display: block;padding: 10px 0;width: 55px;height: 55px;border-radius: 50%;"></td>
          <td>
            <button class="but but-set" @click="personModify(item.id, '修改员工资料')">修改</button>
            <button class="but but-del" @click="personDel(item.id)">删除</button>
          </td>
        </tr>
        <tr v-if="personData.length === 0" style="height: 40px;font-size: 14px;font-weight: 700;">
          <th colspan="7">暂无数据</th>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="page" style="margin-top: 20px;">
      <page @pageNumChange="pageNumChange" :pageNumber="pageNum" v-if="pageNum > 1"></page>
    </div>
    <div class="pop">
      <transition name="fade">
        <pop-window :title="popTitle" v-if="popShow" @cancel="cancel" @ok="submitData">
          <div class="item-wrapper" slot="content">
            <div class="item" v-if="popTitle === '添加员工'">
              <label>员工姓名：</label>
              <input v-model="popData.username" placeholder="请输入员工姓名">
            </div>
            <div class="item">
              <label>入职时间：</label>
              <el-date-picker v-model="popData.entrytime" type="date" format="yyyy 年 MM 月 dd 日"
                              placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="item">
              <label>员工部门：</label>
              <k-select :select-data="selectData" selectTip="请选择员工部门" :selected="popData.department"
              @changeSelect="departSelect"></k-select>
            </div>
            <div class="item">
              <label>员工编号：</label>
              <input v-model="popData.jobnumber" placeholder="请输入员工编号">
            </div>
            <div class="item">
              <label>是否离职:（是0 否1）</label>
              <k-select :select-data="leaveData" selectTip="1" :selected="popData.leavejob"
              @changeSelect="leaveSelect"></k-select>
            </div>
            <div class="item" v-if="popTitle === '添加员工'">
              <label>上传图片：</label>
              <up-pictrue @picPath="setPicPath"></up-pictrue>
            </div>
            <div class="item" v-if="popTitle === '添加员工'">
              <input v-model="popData.picdir" placeholder="上传图片后路径自动填写">
            </div>
          </div>
        </pop-window>
      </transition>
    </div>
    <transition name="fade">
      <del-window v-if="delShow" @cancel="delShow = false" @comfirmHandelClick="delBtn"></del-window>
    </transition>
  </div>
</template>

<script>
import popWindow from '../baseCom/pupUpWindows'
import kSelect from '../baseCom/k-select'
import page from '../baseCom/page'
import upPictrue from '../baseCom/up-pictrue'
import delWindow from '../baseCom/delWindow'
import md5 from 'js-md5'
export default {
  name: 'personSet',
  data () {
    return {
      personData: [],
      showPersonData: [],
      listImg: [],
      popTitle: '添加员工',
      popShow: false,
      personId: '',
      baseMd5: '',
      popData: {
        username: '',
        entrytime: '',
        department: 0,
        jobnumber: '',
        leavejob: 1,
        picdir: ''
      },
      selectData: ['销售部', '资源部', '总经办', '市场部', '技术部', '财务部', '行政部'],
      leaveData: ['0', '1'],
      delShow: false,
      searchName: '',
      personName: [],
      dropShow: false,
      pageNum: 1,
      page: 1
    }
  },
  mounted () {
    this.init('all')
  },
  methods: {
    init (type) {
      this.$post('/pyapi/console', {key: 'ps_show', content: type})
        .then(response => {
          if (type === 'all') {
            this.personData = response
            this.pageNum = Math.ceil(response.length / 10)
            this.showPersonData = this.personData.slice((this.page - 1) * 10, (this.page * 10))
          } else if (type === 'listimg') {
            this.listImg = response
          } else {
            this.personData = response
            this.pageNum = Math.ceil(response.length / 10)
            this.showPersonData = this.personData.slice((this.page - 1) * 10, (this.page * 10))
          }
        })
        .catch(res => {
          alert('数据加载有误，请稍后重试！')
          console.log(res)
        })
    },
    setPicPath (path) {
      this.popData.picdir = path
    },
    addClick () {
      this.popTitle = '添加员工'
      this.popShow = true
    },
    departSelect (type) {
      this.popData.department = type
    },
    leaveSelect (type) {
      this.popData.leavejob = type
    },
    personModify (id, text) {
      this.popShow = true
      this.personId = id
      this.popTitle = text
      this.personData.forEach((item) => {
        if (item.id === this.personId) {
          this.popData.username = item.username
          this.popData.entrytime = item.entrytime
          this.popData.department = item.department
          this.popData.jobnumber = item.jobnumber
          this.popData.leavejob = item.leavejob
          this.popData.picdir = item.picdir
          this.baseMd5 = md5(JSON.stringify(this.popData))
        }
      })
    },
    personDel (id) {
      this.personId = id
      this.delShow = true
    },
    cancel () {
      this.popShow = false
      this.popData.username = ''
      this.popData.entrytime = ''
      this.popData.department = 0
      this.popData.jobnumber = ''
      this.popData.leavejob = 0
      this.popData.picdir = ''
    },
    submitData () {
      let reg = /\d{4}-\d{2}-\d{2}/g
      if (!this.popData.username || !this.popData.entrytime || this.popData.department === 0 ||
        !this.popData.jobnumber || !this.popData.leavejob || !this.popData.picdir) {
        alert('请填写完整资料')
        return true
      }
      if (!reg.test(this.popData.entrytime)) {
        alert('入职时间格式不正确！')
        return true
      }
      if (this.popTitle === '添加员工') {
        this.$post('/pyapi/console', {key: 'ps_add', content: JSON.stringify(this.popData)})
          .then(response => {
            if (response[1] === 200) {
              alert('添加成功！')
              this.cancel()
              this.init('all')
            } else if (response[1] === 403) {
              alert(response[2])
            }
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let newMd5 = md5(JSON.stringify(this.popData))
        if (newMd5 === this.baseMd5) {
          alert('请修改数据后在提交！')
        } else {
          this.$post('/pyapi/console', {key: 'ps_update', content: JSON.stringify(this.popData), id: this.personId})
            .then(response => {
              if (response[1] === 200) {
                alert('修改成功！')
                this.init('all')
                this.cancel()
              } else if (response[1] === 403) {
                alert(response[2])
              }
              console.log(response)
            })
            .catch(err => {
              alert('提交有误，请稍后重新提交')
              console.log(err)
            })
        }
      }
    },
    delBtn () {
      this.$post('/pyapi/console', {key: 'ps_del', id: this.personId})
        .then(response => {
          if (response[1] === 200) {
            alert('删除成功！')
            this.delShow = false
            this.$post('/pyapi/console', {key: 'ps_show', content: 'all'})
              .then(response => {
                if (response.length % 10 === 0) {
                  this.page = Math.ceil(response.length / 10)
                }
                this.personData = response
                this.pageNum = Math.ceil(response.length / 10)
                this.showPersonData = this.personData.slice((this.page - 1) * 10, (this.page * 10))
              })
              .catch(res => {
                alert('数据加载有误，请稍后重试！')
                console.log(res)
              })
          } else if (response[1] === 403) {
            alert(response[2])
          }
        })
        .catch(err => {
          alert('删除出错，请稍后重试！')
          console.log(err)
        })
    },
    choseName (name) {
      this.searchName = name
      this.personName = []
      this.init(this.searchName)
    },
    inputName () {
      let reg = RegExp(this.searchName, 'gi')
      this.personName = this.personData.filter(item => {
        if (reg.test(item.username)) {
          return item
        }
      })
    },
    submitName () {
      if (!this.searchName) {
        this.init('all')
      } else {
        this.init(this.searchName)
      }
      this.personName = []
    },
    leave () {
      this.personName = []
    },
    pageNumChange (num) {
      this.page = num
      this.showPersonData = this.personData.slice((this.page - 1) * 10, this.page * 10)
    }
  },
  components: {
    popWindow,
    kSelect,
    page,
    upPictrue,
    delWindow
  }
}
</script>

<style scoped>
  .person-set-wrapper{position: relative;width: 100%;height: 100%;overflow-y: scroll;padding-right: 14px;}
  .person-set-wrapper .add{display: inline-block;}
  .person-set-wrapper .but{width: 60px;height: 32px;line-height: 32px;outline: none;border: none;
    border-radius: 4px;color: #fff;background: #2d8cf0;cursor: pointer;}
  .person-set-wrapper .primary{width: 80px;}
  .person-set-wrapper .search{position: relative;display: inine-block;float: right;}
  .person-set-wrapper .search input{width: 250px;padding: 4px 7px;height: 32px;line-height: 32px;outline: none;color: #515a6e;
  border-radius: 4px;border: 1px solid #dcdee1;box-sizing: border-box;transition: all .2s linear;}
  .person-set-wrapper .search input:hover{border-color: #57a3f3;}
  .person-set-wrapper .search input:focus{border-color: #57a3f3;box-shadow: 0 0 0 2px rgba(45,140,240,.2);}
  .person-set-wrapper .search .search-icon{position: absolute;top: 7px;right: 10px;width: 16px;height: 16px;background-image: url('../../../static/img/search.png');
  background-repeat: no-repeat;}
  .person-set-wrapper .draw{width: 100%;position: absolute;top: 32px;max-height: 200px;background: #fff;z-index: 10;border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);color: #515a6e;overflow-y: scroll;}
  .person-set-wrapper .draw li{list-style: none;padding: 4px 16px 0;font-size: 14px;line-height: 20px;box-sizing: border-box;cursor: pointer;}
  .person-set-wrapper .draw li:hover{background: #f3f3f3;}
  .person-set-wrapper table{width: 100%;border-spacing: 0;border: 1px solid #dcdee2;margin: 15px 0;}
  .person-set-wrapper table thead th{height: 40px;line-height: 40px;background: #f8f8f9;
    text-align: left;font-weight: 700;font-size: 14px;color: #515a6e;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;border-right: 1px solid #e8eaec;}
  .person-set-wrapper table thead th:last-child{width: 200px;border-right: none;}
  .person-set-wrapper table tbody tr td:last-child{border-right: none;}
  .person-set-wrapper table tbody tr:last-child td{border-bottom: none;}
  .person-set-wrapper table tbody td{height: 35px;line-height: 35px;background: #fff;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;font-size: 14px;
    border-right: 1px solid #e8eaec}
  .person-set-wrapper table tbody .but{height: 25px;line-height: 25px;}
  .person-set-wrapper table tbody .but-del{margin-left: 15px;background-color: #ed4014;}
  .person-set-wrapper .but:hover{opacity: .9;}
  .person-set-wrapper .item-wrapper{width: 100%;padding: 14px 16px;box-sizing: border-box;}
  .person-set-wrapper .item-wrapper .item{margin-top: 10px;}
  .person-set-wrapper .item-wrapper .item:first-child{margin-top: 0;}
  .person-set-wrapper .item-wrapper .item label{display: block;margin-bottom: 8px;vertical-align: center;font-size: 14px;color: #17233d;}
  .person-set-wrapper .item-wrapper .item input{display: block;width: 260px;height: 30px;padding: 0 8px;line-height: 30px;outline: none;border: 1px solid #dcdee2;
  color: #515a6e;border-radius: 4px;}
  .person-set-wrapper .item-wrapper .item input:hover{border-color: #57a3f3;}
  .fade-enter-active, .fade-leave-active{transition: opacity .5s;}
  .fade-enter, .fade-leave-to{opacity: 0}
</style>
