
function randomInteger (min, max) {
  return parseInt(Math.random() * (max - min) - 1) + min
}
function randomFloat (min, max) {
  return min + Math.random() * (max - min)
}
function durationValue (value) {
  return value + 's'
}
function createLeaf () {
  let srcs = '../static/img/color' + randomInteger(1, 10) + '.png'
  let tops = '-100px'
  let lefts = '' + randomInteger(0, document.body.clientWidth) + 'px'
  let imgSpinName = (Math.random() < 0.5) ? 'leftRotation' : 'rightRotation'
  let divName = 'fade,drop'
  let aniDuration = durationValue(randomFloat(5, 11))
  let imgSpinDuration = durationValue(randomFloat(4, 8))
  let leafDelay = durationValue(randomFloat(0, 5))
  var leafDiv = document.createElement('div')
  var leafImage = document.createElement('img')
  leafImage.src = srcs
  leafDiv.style.top = tops
  leafDiv.style.left = lefts
  leafDiv.style.webkitAnimationName = divName
  leafImage.style.webkitAnimationName = imgSpinName
  leafDiv.style.webkitAnimationDuration = aniDuration + ',' + aniDuration
  leafDiv.style.webkitAnimationDelay = leafDelay + ',' + leafDelay
  leafImage.style.webkitAnimationDuration = imgSpinDuration
  leafDiv.appendChild(leafImage)
  return leafDiv
}
export default createLeaf
