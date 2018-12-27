<template>
  <div class="up-pictrue-container">
    <div class="up-area" :style="{'width': picWidth, 'height': picHeight}">
      <form method="post" enctype="multipart/form-data" action="http://113.105.246.230:5110/uploadfile"
            :style="{'width': picWidth, 'height': picHeight}" id="form">
        <input type="file" name="file" :id="inputFileId" @change="readFile" class="inputFile"/>
        <div class="up-but" @click.prevent="openFile">
          <div>
            <button class="but" style="outline: none"></button>
          </div>
        </div>
        <button @click.prevent="submit" :disabled="imageData === '' " class="submit-but">上传</button>
      </form>
    </div>
    <div class="up-picture" :id="showPicId" :style="{'width': picWidth, 'height': picHeight, 'line-height': picHeight}"
         v-show="imageData">
      <div class="marsk">
        <div class="del" @click="handleRemove">
          <img src="../../../static/img/delete.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../util/index'
import axios from 'axios'
export default {
  name: 'up-pictrue',
  data () {
    return {
      inputFileId: 'upImg',
      showPicId: 'showImg',
      picUrl: '',
      visible: false,
      imageData: ''
    }
  },
  props: {
    picWidth: {
      type: String,
      default: '58px'
    },
    picHeight: {
      String,
      default: '58px'
    }
  },
  mounted () {
    if (typeof FileReader === 'undefined') {
      alert('你的浏览器不支持 FileReader, 请更换浏览器！')
    }
  },
  methods: {
    readFile () {
      let myForm = new FormData()
      this.imageData = util.getId(this.inputFileId).files[0]
      myForm.append('image', this.imageData)
      console.log(myForm.getAll('image'))
      if (!util.nameReg(myForm.getAll('image')[0].type)) {
        alert('上传失败：图片格式要求为jpeg！')
        this.imageData = ''
        return true
      }
      if (myForm.getAll('image')[0].size > 1048576) { // 限制图片大小为1m
        alert('上传失败：图片大小超过1m')
        this.imageData = ''
        return true
      }
      let reader = new FileReader() // 调用FileReader对象
      reader.readAsDataURL(this.imageData)
      let upPicture = util.getId(this.showPicId)
      let targetName = upPicture.lastChild.tagName.toLowerCase()
      let img = new Image()
      let _this = this
      reader.onload = function (e) {
        if (targetName === 'img') {
          upPicture.lastChild.src = e.target.result
          return true
        } else {
          img.src = e.target.result
          img.style.width = _this.picWidth
          img.style.height = _this.picHeight
          img.style.borderRadius = '4px'
          upPicture.appendChild(img)
        }
      }
    },
    openFile () {
      if (util.getId(this.inputFileId).files.length === 1) {
        util.getId(this.inputFileId).value = ''
      }
      util.getId(this.inputFileId).click()
    },
    handleRemove () {
      let upPicture = util.getId(this.showPicId)
      console.dir(upPicture)
      upPicture.removeChild(upPicture.lastChild)
      this.imageData = ''
    },
    submit () {
      let myForm = new FormData()
      if (this.imageData) {
        myForm.append('image', this.imageData)
      }
      console.dir(myForm)
      const instance = axios.create({
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      instance.post('/uploadfile', myForm)
        .then(res => {
          if (res.data[1] === 200) {
            alert('文件上传成功！')
            console.log(res.data[2])
            this.$emit('picPath', res.data[2])
          } else {
            alert('文件上传出错，请重新上传！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .up-pictrue-container{
    display: inline-block;
    text-align: left;
  }
  .up-picture{
    position: relative;
    margin-left: 15px;
    display: inline-block;
    vertical-align: top;
    height: 120px;
    line-height: 120px;
    cursor: pointer;
    color: #fff;
    font-size: 25px;
  }
  .up-picture .marsk{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
    text-align: center;
  }
  .up-picture:hover .marsk{
    display: block
  }
  .up-area{
    display: inline-block;
    width: 220px;
    height: 120px;
    text-align: center;
    cursor: pointer;
  }
  .inputFile{
    width: 10px;
    height: 58px;
    color: #fff;
    display: none;
  }
  .up-area .up-but{
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }
  .up-area .up-but:hover{
    border-color: #2d8cf0;
  }
  .but{width: 20px;height: 20px;line-height: 35px;text-align: center;cursor: pointer;border-radius: 4px;
  color: #515a6e;background: url("../../../static/img/相机.png");border: none;background-repeat: no-repeat;}
  .but:hover{color: #57a3f3;border-color: #57a3f3;}
  form{ position: relative;}
  .submit-but{position: absolute;top: 36px;left: 157px;outline: none;width: 70px;height: 25px;line-height: 25px;text-align: center;border-radius: 4px;
  border: 1px solid #2d8cf0;background: #57a3f3;color: #fff;cursor: pointer;}
  .submit-but[disabled]{color: #c5c8ce;background-color: #f7f7f7;border-color: #dcdee2;cursor: not-allowed;}
</style>
