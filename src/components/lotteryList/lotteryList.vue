<template>
  <div class="lotteryList-wrapper">
    <div class="table">
      <table>
        <thead>
        <th>奖项名称</th>
        <th>员工姓名</th>
        <th>员工工号</th>
        <th>员工奖品</th>
        <th>员工图片</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="index">
            <td>{{item.level}}</td>
            <td>{{item.name}}</td>
            <td>{{item.jobnum}}</td>
            <td>{{item.pz}}</td>
            <td><img :src= " 'http://113.105.246.230:5110/' + item.picdir" style="display: block;padding: 10px 0;width: 55px;height: 55px;border-radius: 50%;"></td>
          </tr>
          <tr v-if="listData.length === 0" style="height: 40px;font-size: 14px;font-weight: 700;">
            <th colspan="7">暂无数据</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lotteryList',
  data () {
    return {
      listData: [],
      levelNum: '',
      pzList: [],
      level: ['特等奖', '一等奖', '二等奖', '三等奖', '随机1', '随机2']
    }
  },
  created () {
    this.init()
    setInterval(() => {
      this.init('show_win_list')
    }, 3000)
  },
  methods: {
    init () {
      this.$post('/pyapi/console', {key: 'show_win_list'})
        .then(res => {
          this.listData = []
          let data = {}
          for (let i in res) {
            data[this.level[i - 1]] = res[i]
          }
          this.recursion(data, data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    recursion (data, res) {
      for (let i in data) {
        if (i in res) {
          this.levelNum = i
        }
        if (data[i].name) {
          data[i].level = this.levelNum
          this.listData.push(data[i])
        } else {
          this.recursion(data[i], res)
        }
      }
      return true
    }
  }
}
</script>

<style scoped>
  .lotteryList-wrapper{width: 100%;height: 100%;overflow-y: scroll;}
  .lotteryList-wrapper table{width: 100%;border-spacing: 0;border: 1px solid #dcdee2;margin: 15px 0 50px;}
  .lotteryList-wrapper table thead th{height: 40px;line-height: 40px;background: #f8f8f9;
    text-align: left;font-weight: 700;font-size: 14px;color: #515a6e;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;border-right: 1px solid #e8eaec;}
  .lotteryList-wrapper table thead th:last-child{width: 200px;border-right: none;}
  .lotteryList-wrapper table tbody tr td:last-child{border-right: none;}
  .lotteryList-wrapper table tbody tr:last-child td{border-bottom: none;}
  .lotteryList-wrapper table tbody td{height: 35px;line-height: 35px;background: #fff;border-bottom: 1px solid #e8eaec;box-sizing: border-box;padding-left: 18px;font-size: 14px;
    border-right: 1px solid #e8eaec}
</style>
