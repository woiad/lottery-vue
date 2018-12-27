<template>
  <div class="lottery-device-wrapper">
    <div class="title"></div>
    <div class="side-bar">
      <div class="nav" @click="drawerShow = true"></div>
      <div class="text">
        {{prizeDesc}}
      </div>
    </div>
    <div class="audio-wrapper">
      <div class="audio-btn" id="audioBtn">
        <img src="../../../static/img/music.svg">
      </div>
      <audio src="../static/music/play.wav" id="music"></audio>
    </div>
    <transition name="slide">
      <div class="drawer-wrapper" v-if="drawerShow">
        <div class="close" @click="drawerShow = false"></div>
        <div class="draw-container">
          <ul>
            <li v-for="(item, index) in prizeLevel" :key="index" @click="choseLottery(item.title, item.level)">{{item.title}}</li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="state" id="state"></div>
    <div class="lottery" @click="lotteryClick">
      <img :src=prizeButSrc  id="prize_img">
    </div>
    <transition name="fade">
      <div class="tip_list" v-show="lotteryTipShow" id="tip_list">
        <div class="tip_title">
          {{prizeDesc}}中奖名单
        </div>
        <div id="leafContainer"></div>
        <div class="btn">
          <button class="back" @click="back">返回抽奖</button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="box-wrapper" v-show="boxShow">
        <div class="box" id="box">
          <li v-for="(item, index) in luckyNum" :key="index">
            <img :src="item.src">
          </li>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import util from '../../util/index'
import createLeaf from '../../util/colorBarindex'
export default {
  name: 'lotteryDevice',
  data () {
    return {
      boxShow: false,
      cylic: '',
      luckyNum: [],
      drawerShow: false,
      prizeDesc: '请选择奖项开始抽奖',
      lotteryTipShow: false,
      prizeButSrc: '../static/img/prize_start.png',
      luckyer: [],
      prizeLevel: [
        {title: '特等奖', level: 1}, {title: '一等奖', level: 2},
        {title: '二等奖', level: 3}, {title: '三等奖', level: 4},
        {title: '随机一', level: 5}, {title: '随机二', level: 6}
      ],
      level: 1,
      listImg: [],
      camera: '',
      scene: '',
      renderer: '',
      controls: '',
      objects: [],
      targets: { table: [], sphere: [], helix: [], grid: [] },
      targetsdh: { table: [], sphere: [], helix: [], grid: [] },
      imgNum: 0
    }
  },
  mounted () {
    this.$post('/pyapi/console', {key: 'ps_show', content: 'listimg'})
      .then(response => {
        this.listImg = response
        this.init()
        this.animate()
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    init () {
      let personArr = []
      for (let i = 0; i < this.listImg.length; i++) {
        let obj = {}
        obj.image = 'http://113.105.246.230:5110/' + this.listImg[i].picdir
        obj.name = this.listImg[i].username
        obj.pos_x = i % 20 + 1
        obj.pos_y = Math.floor(i / 20) + 1
        personArr.push(obj)
      }
      let table = []
      for (let a = 0; a < personArr.length; a++) {
        table.push(personArr[a])
      }
      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 4000)
      this.camera.position.z = 3000

      this.scene = new THREE.Scene()
      // table
      for (let b = 0; b < table.length; b++) {
        let element = document.createElement('div')
        element.className = 'element'
        // element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

        let img = document.createElement('img')
        img.className = 'avatar'
        img.src = table[b].image
        element.appendChild(img)

        let tabobj = new THREE.CSS3DObject(element)
        tabobj.position.x = Math.random() * 4000 - 2000
        tabobj.position.y = Math.random() * 4000 - 2000
        tabobj.position.z = Math.random() * 4000 - 2000
        this.scene.add(tabobj)

        this.objects.push(tabobj)

        //

        let trgobj = new THREE.Object3D()
        trgobj.position.x = (table[b].pos_x * 140) - 1330
        trgobj.position.y = -(table[b].pos_y * 180) + 990

        this.targets.table.push(trgobj)
      }

      // sphere

      let vector = new THREE.Vector3()
      for (let j = 0, l = this.objects.length; j < l; j++) {
        let phi = Math.acos(-1 + (2 * j) / l)
        let theta = Math.sqrt(l * Math.PI) * phi

        let sphereobj = new THREE.Object3D()
        sphereobj.position.x = 800 * Math.cos(theta) * Math.sin(phi)
        sphereobj.position.y = 800 * Math.sin(theta) * Math.sin(phi)
        sphereobj.position.z = 800 * Math.cos(phi)
        vector.copy(sphereobj.position).multiplyScalar(2)
        sphereobj.lookAt(vector)
        this.targets.sphere.push(sphereobj)
        let sptrgobj = new THREE.Object3D()
        sptrgobj.position.x = 9000 * Math.cos(theta) * Math.sin(phi)
        sptrgobj.position.y = 9000 * Math.sin(theta) * Math.sin(phi)
        sptrgobj.position.z = 9000 * Math.cos(phi)
        vector.copy(sptrgobj.position).multiplyScalar(2)
        sptrgobj.lookAt(vector)
        this.targetsdh.sphere.push(sptrgobj)
      }

      // grid
      for (let k = 0; k < this.objects.length; k++) {
        let gridobj = new THREE.Object3D()
        gridobj.position.x = ((k % 5) * 400) - 800 // 400 图片的左右僵局 800  x轴中心点
        gridobj.position.y = (-(Math.floor(k / 5) % 5) * 300) + 500 // 500 y轴的中心点
        gridobj.position.z = (Math.floor(k / 25)) * 200 - 800 // 300 调整 片间距 800 z轴中心点

        this.targets.grid.push(gridobj)
      }
      //
      this.renderer = new THREE.CSS3DRenderer() // 渲染器
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.domElement.style.position = 'absolute'
      util.getId('state').appendChild(this.renderer.domElement)

      // 鼠标控制

      this.controls = new THREE.TrackballControls(this.camera) // 控制器
      this.controls.rotateSpeed = 0.5
      this.controls.minDistance = 500
      this.controls.maxDistance = 6000
      this.controls.addEventListener('change', this.render)

      this.transform(this.targets.grid, 3000)

      //
      window.addEventListener('resize', this.onWindowResize, false)
    },
    transform (targets, duration) {
      TWEEN.removeAll()

      for (let i = 0; i < this.objects.length; i++) {
        let object = this.objects[i]
        let target = targets[i]

        new TWEEN.Tween(object.position)
          .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
          // .easing( TWEEN.Easing.Exponential.InOut )
          .start()

        new TWEEN.Tween(object.rotation)
          .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
          // .easing( TWEEN.Easing.Exponential.InOut )
          .start()
      }
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.render()
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    },
    animate () {
      if (this.boxShow) {
        this.scene.rotation.x += 0.008
        this.scene.rotation.y += 0.008
      } else {
        this.scene.rotation.x += 0
        this.scene.rotation.y += 0.008
      }
      requestAnimationFrame(this.animate)
      TWEEN.update()
      this.controls.update()
      // 渲染循环
      this.render()
    },
    lotteryClick () {
      this.setImgNum()
      if (this.prizeDesc === '请选择奖项开始抽奖') {
        alert('请选择奖项！')
        return true
      }
      let audio = util.getId('music')
      if (this.prizeButSrc === '../static/img/prize_start.png') {
        let text = this.setLocalStorage()
        if (text) {
          alert(text)
          return true
        }
        this.setLuckyImgPath()
        this.prizeButSrc = '../static/img/prize_stop.png'
        this.transform(this.targets.sphere, 1000)
        setTimeout(() => {
          this.boxShow = true
        }, 800)
        audio.src = '../static/music/play.wav'
        audio.play()
        util.getId('audioBtn').classList.add('rotating')
      } else {
        this.luck()
        this.prizeButSrc = '../static/img/prize_start.png'
        clearInterval(this.cylic)
        audio.src = '../static/music/lucky.wav'
        audio.play()
        this.transform(this.targets.grid, 1000)
        for (let i = 0; i < 50; i++) {
          util.getId('leafContainer').appendChild(createLeaf())
        }
        setTimeout(() => {
          this.lotteryTipShow = true
          this.luckPeople()
        }, 1000)
      }
    },
    setImgNum () {
      this.$post('/pyapi/console', {key: 'prize_show'})
        .then(response => {
          if (response[1] === 403) {
            alert(response[0] + response[1])
          } else {
            for (let i = 0; i < response.length; i++) {
              if (this.level === response[i].level) {
                this.imgNum = response[i].num
                this.$nextTick(() => {
                  util.getId('box').style.marginLeft = '-' + Math.floor((response[i].num * 120 + 15 * response[i].num) / 2) + 'px'
                })
              }
            }
          }
        })
        .catch(err => {
          alert('err:' + err)
        })
    },
    setLuckyImgPath () {
      this.cylic = setInterval(() => {
        this.luckyNum = []
        for (let i = 0; i < this.imgNum; i++) {
          let obj = {}
          obj.src = 'http://113.105.246.230:5110/' + this.listImg[this.setRandom()].picdir
          this.luckyNum.push(obj)
        }
      }, 150)
    },
    setRandom () {
      return Math.floor(Math.random() * this.listImg.length)
    },
    choseLottery (text, level) {
      this.level = level
      this.prizeDesc = text
      this.drawerShow = false
    },
    luck () {
      this.$post('/pyapi/console', {key: 'luck', content: this.level})
        .then(response => {
          if (response[1] === 403) {
            alert('error:' + response[2])
            return true
          }
          for (let i = 0; i < response.length; i++) {
            this.luckyNum[i].src = 'http://113.105.246.230:5110/' + response[i].picdir
          }
          this.luckyer = response
        })
        .catch(err => {
          console.log(err)
        })
    },
    luckPeople () {
      let times = 0
      for (let i = 0; i < this.luckyer.length; i++) {
        let _this = this
        setTimeout(function () {
          var div = document.createElement('div')
          div.className = 'list'
          div.style.opacity = 0
          div.style.animation = 'move 2s ease-in-out'
          div.style.animationDelay = i * 0.5 + 's'
          var img = document.createElement('img')
          img.className = 'list_img'
          img.src = 'http://113.105.246.230:5110/' + _this.luckyer[i].picdir
          div.appendChild(img)
          var p = document.createElement('p')
          p.className = 'list_name'
          p.innerHTML = '姓名：' + _this.luckyer[i].name
          var p1 = document.createElement('p')
          p1.className = 'list_name'
          p1.innerHTML = '工号：' + _this.luckyer[i].jobnum
          var p2 = document.createElement('p')
          p2.className = 'list_name'
          p2.innerHTML = '奖品：' + _this.luckyer[i].pz
          div.appendChild(p)
          div.appendChild(p1)
          div.appendChild(p2)
          if (_this.luckyer.length > 20) {
            div.style.width = '100px'
            div.style.height = '100px'
            img.style.width = '45px'
            img.style.height = '45px'
            img.style.marginTop = '15px'
          }
          div.addEventListener('animationend', function () {
            times++
            div.style.opacity = 1
            if (times === _this.luckyer.length) {
              setTimeout(function () {
                alert('本次抽奖完毕，请返回进行下等级抽奖')
              }, 500)
            }
          }, false)
          util.getId('tip_list').appendChild(div)
        }, 500)
      }
    },
    back () {
      this.boxShow = false
      this.lotteryTipShow = false
      this.luckyer = []
      this.luckyNum = []
      util.getId('audioBtn').classList.remove('rotating')
      util.getId('music').pause()
      let classNameList = document.getElementsByClassName('list')
      while (classNameList.length > 0) {
        classNameList[0].remove()
      }
    },
    setLocalStorage () {
      let levelArr = []
      if (localStorage.getItem('lotteryLevel')) {
        levelArr = JSON.parse(localStorage.getItem('lotteryLevel'))
        for (let i = 0; i < levelArr.length; i++) {
          if (this.level === levelArr[i]) {
            return '请选择下一奖项抽奖！'
          }
        }
        if (levelArr[levelArr.length - 1] !== this.level - 1) {
          return '请按照奖项顺序抽奖!'
        }
        levelArr.push(this.level)
        localStorage.setItem('lotteryLevel', JSON.stringify(levelArr))
      } else {
        if (this.level !== 1) {
          return '请按照奖项顺序抽奖!'
        } else {
          levelArr.push(this.level)
          localStorage.setItem('lotteryLevel', JSON.stringify(levelArr))
        }
      }
    }
  }
}
</script>

<style>
  @import '../../../static/css/colorBarindex.css';
  .lottery-device-wrapper{position: relative;width: 100%;height: 100%;overflow: hidden;transition: all .3s linear;background-repeat: no-repeat;
  background-image: url("../../../static/img/bg02.jpg");background-size: 100% 100%;background-position-x: 25px;}
  .lottery-device-wrapper .all-scren{position: absolute;width: 16px;height: 16px;background-image: url('../../../static/img/all-scren.png');
  background-repeat: no-repeat;top: 20px;right: 30px;cursor: pointer;z-index: 20;}
  .lottery-device-wrapper .title{position: absolute;width: 460px;height: 70px;left: 50%;margin-left: -230px;top: 30px;
  background-image: url("../../../static/img/title.png");background-size: 100% 100%;}
  .lottery-device-wrapper .side-bar{position: relative;width: 25px;height: 100%;background-image: url("../../../static/img/side01.png");background-repeat: no-repeat;background-size: 100% 100%;}
  .lottery-device-wrapper .side-bar .nav{position: absolute;width: 16px;height: 16px;left: 50%;margin-left: -8px;top: 20px;background: url("../../../static/img/nav.png");
  cursor: pointer;z-index: 20;}
  .lottery-device-wrapper .side-bar .text{position: absolute;top: 50px;left: 5px;font-size: 14px;color: #fbf177;}
  .lottery-device-wrapper .audio-wrapper{position: absolute;width: 20px;width: 25px;height: 25px;top: 20px; left: 35px;cursor: pointer;z-index: 30;}
  .lottery-device-wrapper .audio-wrapper .audio-btn{width: 25px;height: 25px; border-radius: 50%;}
  .lottery-device-wrapper .audio-wrapper .audio-btn img{max-width: 100%;}
  .lottery-device-wrapper .rotating{animation: rotate 1.5s infinite linear;}
  .lottery-device-wrapper .drawer-wrapper{position: absolute;width: 200px;height: 100%;left: 0; top: 0;background-color: #bb1c33;z-index: 250;}
  .lottery-device-wrapper .drawer-wrapper .close{position: absolute;width: 15px;height: 15px;top: -1px;right: -2px;border-radius: 50%;
  background-image: url("../../../static/img/close.png");background-color: #6E0106;cursor: pointer;z-index: 20}
  .lottery-device-wrapper .drawer-wrapper .draw-container{width: 100%;height: 100%;}
  .lottery-device-wrapper .drawer-wrapper .draw-container li{width: 100%;height: 58px;line-height: 58px;padding: 0 55px;box-sizing: border-box;cursor: pointer;
  color: #e8bb50;font-size: 14px;}
  .slide-enter-active, .slide-leave-active{transition: all .5s linear;transform: translateX(0px);}
  .slide-enter, .slide-leave-to{transform: translate(-200px)}
  .state{width: 100%;height: 100%;position: absolute;top: 0;}
  .element{width: 100px;height: 100px;text-align: center;cursor: pointer;}
  .element:hover {box-shadow: 0px 0px 12px rgba(0,255,255,0.75);border: 1px solid rgba(127,255,255,0.75);border-radius: 50%;}
  .element img{max-width: 100%  ;border-radius: 50%;}
  .lottery-device-wrapper .lottery{position: absolute;bottom: 20px;width: 150px;height: 50px;left: 50%;margin-left: -75px;text-align: center;cursor: pointer;
    transition: all .25s linear;transform: translateZ(0);perspective: 800px;z-index: 200;}
  .lottery-device-wrapper .lottery img{max-width: 100%;transform: translateZ(0);transition: all .25s linear;}
  .lottery-device-wrapper .lottery:hover img{transform: translateZ(200px);}
  .tip_list{position: absolute;top: 0;left: 0;bottom: 0;right: 0;padding: 126px 21px; display: flex;justify-content: center;align-items: center;perspective: 1000px;
    z-index: 300;flex-wrap: wrap;background: url('../../../static/img/tip_list_bg.jpg') no-repeat;background-size: 100% 100%;
    box-sizing: border-box; animation: fade .25s linear;perspective: 800px;}
  .tip_list .tip_title{position: absolute;top: 95px;font-size: 20px;color: #fff;}
  .tip_list .list{width: 200px;height: 200px;margin: 10px 10px 0 0;background: #fff;background: url('../../../static/img/list_bg.jpg') no-repeat;
    background-size: 100% 100%;text-align: center;transform: translateZ(-10px);transition: all .3s linear;}
  .tip_list .list:hover{box-shadow: 0 1px 6px #fbf177;transform: translateZ(10px);}
  .tip_list .list_img{max-width: 100%;width: 60px;height: 60px;border-radius: 50%;margin-top: 26px;}
  .tip_list .list_name{font-size: 16px;color: red;margin-top: 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .tip_list .btn{position: absolute;bottom: 10px;perspective: 1000px;}
  .tip_list .btn button{width: 120px;height: 30px;padding: 0;line-height: 30px;text-align: center;outline: none;
    background: linear-gradient(to bottom, #ffac49, #d26200);border-radius: 10px;color: #fff;border: none;
    transition: all .25s linear;transform: translateZ(0);cursor: pointer;opacity: 1}
  .tip_list .btn button:disabled{cursor: not-allowed;color: #c5c8ce;background: #f7f7f7;border: 1px solid #dcdee2;}
  .tip_list .btn button:hover{transform: translateZ(100px);}
  .box{position: absolute;top: 37%;left: 50%;}
  .box img{float: left;display: block;width: 120px;height: 120px;border-radius: 10px;}
  .box li{float: left;width: 120px;height: 120px;list-style: none;margin-left: 15px;}
  .fade-enter-active, .fade-leave-active{transition: opacity .5s;opacity: 1}
  .fade-enter, .fade-leave-to{opacity: 0;}
  @keyframes rotate {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  @keyframes move { /* 中奖名单出现 */
    0%{
      transform: translateZ(-10000px) rotateY(0deg);
      opacity: 0;
    }
    20%{
      transform: translateZ(-8000px) rotateY(180deg);
      opacity: .2;
    }
    40%{
      transform: translateZ(-6000px) rotateY(360deg);
      opacity: .4;
    }
    60%{
      transform: translateZ(-4000px) rotateY(180deg);
      opacity: .6;
    }
    80%{
      transform: translateZ(-2000px) rotateY(360deg);
      opacity: .8;
    }
    90%{
      transform: translateZ(0px) rotateY(180deg);
      opacity: .9;
    }
    100%{
      transform: translateZ(200px) rotateY(360deg);
      opacity: 1;
    }

  }
  @-webkit-keyframes move {
    0%{
      transform: translateZ(-10000px) rotateY(0deg);
      opacity: 0;
    }
    20%{
      transform: translateZ(-8000px) rotateY(180deg);
      opacity: .2;
    }
    40%{
      transform: translateZ(-6000px) rotateY(360deg);
      opacity: .4;
    }
    60%{
      transform: translateZ(-4000px) rotateY(180deg);
      opacity: .6;
    }
    80%{
      transform: translateZ(-2000px) rotateY(360deg);
      opacity: .8;
    }
    90%{
      transform: translateZ(0px) rotateY(180deg);
      opacity: .9;
    }
    100%{
      transform: translateZ(200px) rotateY(360deg);
      opacity: 1;
    }
  }
  @-moz-keyframes move {
    0%{
      transform: translateZ(-10000px) rotateY(0deg);
      opacity: 0;
    }
    20%{
      transform: translateZ(-8000px) rotateY(180deg);
      opacity: .2;
    }
    40%{
      transform: translateZ(-6000px) rotateY(360deg);
      opacity: .4;
    }
    60%{
      transform: translateZ(-4000px) rotateY(180deg);
      opacity: .6;
    }
    80%{
      transform: translateZ(-2000px) rotateY(360deg);
      opacity: .8;
    }
    90%{
      transform: translateZ(0px) rotateY(180deg);
      opacity: .9;
    }
    100%{
      transform: translateZ(200px) rotateY(360deg);
      opacity: 1;
    }
  }
</style>
