webpackJsonp([7],{HXTo:function(t,e){},JGCu:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"lotteryList",data:function(){return{listData:[],levelNum:"",pzList:[],level:["特等奖","一等奖","二等奖","三等奖","随机1","随机2"]}},created:function(){var t=this;this.init(),setInterval(function(){t.init("show_win_list")},3e3)},methods:{init:function(){var t=this;this.$post("/pyapi/console",{key:"show_win_list"}).then(function(e){t.listData=[];var i={};for(var n in e)i[t.level[n-1]]=e[n];t.recursion(i,i)}).catch(function(t){console.log(t)})},recursion:function(t,e){for(var i in t)i in e&&(this.levelNum=i),t[i].name?(t[i].level=this.levelNum,this.listData.push(t[i])):this.recursion(t[i],e);return!0}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"lotteryList-wrapper"},[i("div",{staticClass:"table"},[i("table",[t._m(0),t._v(" "),i("tbody",[t._l(t.listData,function(e,n){return i("tr",{key:n},[i("td",[t._v(t._s(e.level))]),t._v(" "),i("td",[t._v(t._s(e.name))]),t._v(" "),i("td",[t._v(t._s(e.jobnum))]),t._v(" "),i("td",[t._v(t._s(e.pz))]),t._v(" "),i("td",[i("img",{staticStyle:{display:"block",padding:"10px 0",width:"55px",height:"55px","border-radius":"50%"},attrs:{src:"http://113.105.246.230:5110/"+e.picdir}})])])}),t._v(" "),0===t.listData.length?i("tr",{staticStyle:{height:"40px","font-size":"14px","font-weight":"700"}},[i("th",{attrs:{colspan:"7"}},[t._v("暂无数据")])]):t._e()],2)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("th",[t._v("奖项名称")]),t._v(" "),i("th",[t._v("员工姓名")]),t._v(" "),i("th",[t._v("员工工号")]),t._v(" "),i("th",[t._v("员工奖品")]),t._v(" "),i("th",[t._v("员工图片")])])}]};var a=i("VU/8")(n,s,!1,function(t){i("HXTo")},"data-v-15fcf813",null);e.default=a.exports}});
//# sourceMappingURL=7.896718abf7fba321d64f.js.map