webpackJsonp([4],{gvOZ:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("mvHQ"),i=e.n(s),n=e("tG27"),o={name:"k-switch",props:{ID:{type:String,default:"onoffswitch"},turn:{type:String,default:"off"},dataOn:{type:String,default:"ON"},dataOff:{type:String,default:"OFF"}},methods:{changSwitch:function(){this.$emit("changeSwitch",this.ID)}}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"switch-container",class:[t.turn]},[e("input",{staticClass:"switch-checkbox",attrs:{id:t.ID,type:"checkbox"}}),t._v(" "),e("label",{staticClass:"switch-label",attrs:{for:t.ID},on:{click:t.changSwitch}},[e("span",{staticClass:"switch-inner",attrs:{"data-on":t.dataOn,"data-off":t.dataOff}}),t._v(" "),e("span",{staticClass:"switch-switch"})])])},staticRenderFns:[]};var l=e("VU/8")(o,c,!1,function(t){e("wodK")},"data-v-284c973f",null).exports,r=e("NC6I"),u=e.n(r),h={name:"lotterySet",data:function(){return{lotteryData:[],timeNum:[0,1,2,3,4,5,6,7,8,9,10],modalShow:!1,id:"",setData:{num:"",time_status:"",time:"0",quit_status:""},oldMd5:""}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.$post("/pyapi/console",{key:"show_level"}).then(function(a){t.lotteryData=a}).catch(function(t){console.log(t)})},setLottery:function(t){for(var a in this.modalShow=!this.modalShow,this.lotteryData)t===this.lotteryData[a].id&&(this.id=t,this.setData.num=""+this.lotteryData[a].num,this.setData.time_status=this.lotteryData[a].time_status,this.setData.time=""+this.lotteryData[a].time,this.setData.quit_status=this.lotteryData[a].quit_status,this.oldMd5=u()(i()(this.setData)))},submitData:function(){var t=this;u()(i()(this.setData))===this.oldMd5?alert("奖品设置未修改，请修改后在提交！"):this.$post("/pyapi/console",{key:"update_level",content:i()(this.setData),id:this.id}).then(function(a){alert("修改成功!"),t.init(),t.cancel()}).catch(function(t){alert("修改有误！"),console.log(t)})},cancel:function(){this.modalShow=!this.modalShow},changeSwitch:function(t){"timeonoff"===t?"on"===this.setData.time_status?this.setData.time_status="off":this.setData.time_status="on":"leaveonoff"===t&&("off"===this.setData.quit_status?this.setData.quit_status="on":this.setData.quit_status="off")}},components:{popWindows:n.a,kSwitch:l}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"lottery-set-wrapper"},[e("div",{staticClass:"table"},[e("table",[t._m(0),t._v(" "),e("tbody",[t._l(t.lotteryData,function(a,s){return e("tr",{key:s},[e("td",[t._v(t._s(a.id))]),t._v(" "),e("td",[t._v(t._s(a.name))]),t._v(" "),e("td",[t._v(t._s(a.num))]),t._v(" "),e("td",[t._v(t._s(a.time))]),t._v(" "),e("td",[t._v(t._s(a.time_status))]),t._v(" "),e("td",[t._v(t._s(a.quit_status))]),t._v(" "),e("td",[e("button",{staticClass:"but-set",on:{click:function(e){t.setLottery(a.id)}}},[t._v("设置")])])])}),t._v(" "),0===t.lotteryData.length?e("tr",{staticStyle:{height:"40px","font-size":"14px","font-weight":"700"}},[e("th",{attrs:{colspan:"7"}},[t._v("暂无数据")])]):t._e()],2)])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.modalShow?e("div",{staticClass:"pop"},[e("pop-windows",{on:{cancel:t.cancel,ok:t.submitData}},[e("div",{staticClass:"pop-content",attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"item"},[e("label",[t._v("抽奖人数：")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.setData.num,expression:"setData.num"}],domProps:{value:t.setData.num},on:{input:function(a){a.target.composing||t.$set(t.setData,"num",a.target.value)}}})]),t._v(" "),e("div",{staticClass:"item"},[e("label",[t._v("时间开关")]),t._v(" "),e("div",{staticClass:"switch"},[e("k-switch",{attrs:{ID:"timeonoff",turn:t.setData.time_status},on:{changeSwitch:t.changeSwitch}})],1)]),t._v(" "),e("div",{staticClass:"item"},[e("label",[t._v("时间值：")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.setData.time,expression:"setData.time"}],on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.setData,"time",a.target.multiple?e:e[0])}}},t._l(t.timeNum,function(a,s){return e("option",{key:s,domProps:{selected:a===t.setData.time}},[t._v(t._s(a))])}),0)]),t._v(" "),e("div",{staticClass:"item"},[e("label",[t._v("离职开关：")]),t._v(" "),e("div",{staticClass:"switch"},[e("k-switch",{attrs:{ID:"leaveonoff",turn:t.setData.quit_status},on:{changeSwitch:t.changeSwitch}})],1)])])])],1):t._e()])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",[t._v("奖项ID")]),t._v(" "),e("th",[t._v("奖项名称")]),t._v(" "),e("th",[t._v("抽奖数量")]),t._v(" "),e("th",[t._v("时间值(分钟)")]),t._v(" "),e("th",[t._v("时间开关")]),t._v(" "),e("th",[t._v("离职开关")]),t._v(" "),e("th",[t._v("操作")])])}]};var _=e("VU/8")(h,v,!1,function(t){e("rX0N")},"data-v-3e1863e3",null);a.default=_.exports},rX0N:function(t,a){},wodK:function(t,a){}});
//# sourceMappingURL=4.9e3adc91ae67bc8e6bae.js.map