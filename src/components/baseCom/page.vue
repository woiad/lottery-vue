<template>
  <div class="page-wrapper">
    <button class="pre page" @click="prePage" :disabled="currentPage === 1"></button>
    <ul>
      <li class="page" v-for="(item,key) in pageNum" :key="key" :class="{'active': currentPage === item}"
          @click="pageChange(item)">{{item}}</li>
    </ul>
    <button class="next page" @click="nextPage" :disabled="currentPage === pageNumber"></button>
    <div class="elevator">
      <span>跳至</span>
      <input v-model="jumpPage" @keyup.enter="inpEnter"/>
      <span>页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      pageNum: [],
      jumpPage: 1,
      currentPage: 1
    }
  },
  props: {
    pageNumber: {
      type: Number,
      default: 10
    }
  },
  mounted () {
    this.page()
  },
  watch: {
    pageNumber (val) {
      this.page()
    }
  },
  methods: {
    page () {
      this.pageNum = []
      if (this.currentPage + 4 <= this.pageNumber) {
        for (let i = 1; i < this.currentPage + 4; i++) {
          this.pageNum.push(i)
          if (i === this.currentPage + 4 - 1 && this.currentPage + 4 !== this.pageNumber) {
            this.pageNum.push('...')
          }
        }
        this.pageNum.push(this.pageNumber)
      } else {
        for (let i = 1; i < this.currentPage + 4; i++) {
          if (i === 2 && this.pageNumber >= 7) {
            this.pageNum.push('...')
          } else if (i < this.pageNumber) {
            this.pageNum.push(i)
          }
        }
        this.pageNum.push(this.pageNumber)
      }
      let num = this.pageNum.length - 9
      if (this.pageNum.length > 9 && this.currentPage + 4 <= this.pageNumber) {
        for (let j = 0; j < num; j++) {
          this.pageNum.splice(0, 1)
        }
      } else {
        for (let j = 0; j < num; j++) {
          this.pageNum.splice(2, 1)
        }
      }
      this.$emit('pageNumChange', this.currentPage)
    },
    pageChange (num) {
      if (!isNaN(num)) {
        this.currentPage = num
        this.page()
      }
    },
    prePage () {
      this.currentPage--
      this.page()
    },
    nextPage () {
      this.currentPage++
      this.page()
    },
    inpEnter () {
      if (this.jumpPage === '' || Number(this.jumpPage) > this.pageNumber || Number(this.jumpPage) < 1 ||
      isNaN(this.jumpPage)) {
        this.jumpPage = 1
      }
      this.currentPage = Number(this.jumpPage)
      this.page()
    }
  }
}
</script>

<style scoped>
  .page-wrapper{width: 100%;text-align: center;font-size: 14px;color: #515a6e;}
  .page-wrapper .page{display: inline-block;width: 32px;height: 32px;margin-right: 4px;vertical-align: middle;border-radius: 6px;
    border: 1px solid #dcdee2;text-align: center;line-height: 32px;cursor: pointer;}
  .page-wrapper ul{display: inline-block;}
  .page-wrapper .page.active{border-color: #57a3f3;color: #57a3f3;}
  .page-wrapper .page:hover{border-color: #57a3f3;color: #57a3f3;}
  .page-wrapper button{outline: none;background-position: center center;background-repeat: no-repeat;}
  .page-wrapper button.pre{background-image: url('../../../static/img/arrow-left.png');}
  .page-wrapper button.next{background-image: url('../../../static/img/arrow-right.png')}
  .page-wrapper button[disabled]{cursor: not-allowed;}
  .page-wrapper button[disabled]:hover{color: #515a6e;border-color: #dcdee2;}
  .page-wrapper .elevator {display: inline-block;vertical-align: middle;}
  .page-wrapper .elevator input{width:50px;height: 32px;margin: 0 8px;line-height: 32px;padding: 0 7px;outline: none;border: 1px solid #dcdee2;border-radius: 6px;
  box-sizing: border-box;}
  .page-wrapper .elevator input:hover{border-color: #57a3f3;}
  .page-wrapper .elevator input:focus{box-shadow: 0 0 0 2px rgba(45,140,240,.2);border-color: #57a3f3;}
</style>
